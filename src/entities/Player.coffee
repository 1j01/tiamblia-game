SimpleActor = require "./abstract/SimpleActor.coffee"
Entity = require "./abstract/Entity.coffee"
{Pose} = require "skele2d"
Bow = require "./items/Bow.coffee"
Arrow = require "./items/Arrow.coffee"
Deer = require "./Deer.coffee"
keyboard = require "../keyboard.coffee"
{addEntityClass} = require "skele2d"
{distance, distanceToLineSegment} = require("skele2d").helpers
TAU = Math.PI * 2

gamepad_aiming = false
gamepad_detect_threshold = 0.5 # axis value (not a deadzone! just switching from mouse to gamepad)
gamepad_deadzone = 0.1 # axis value
gamepad_jump_prev = false
gamepad_mount_prev = false
mouse_detect_threshold = 30 # pixels radius (movement can occur over any number of frames)
mouse_detect_from = {x: 0, y: 0}
addEventListener "mousemove", (e) ->
	if Math.hypot(e.clientX - mouse_detect_from.x, e.clientY - mouse_detect_from.y) > mouse_detect_threshold
		gamepad_aiming = false
		mouse_detect_from.x = e.clientX
		mouse_detect_from.y = e.clientY

module.exports = class Player extends SimpleActor
	addEntityClass(@)
	Entity.initAnimation(@)
	constructor: ->
		super()
		@structure.addPoint("head")
		@structure.addSegment(
			from: "head"
			name: "neck"
			length: 5
		)
		@structure.addSegment(
			from: "neck"
			name: "sternum"
			length: 2
		)
		@structure.addSegment(
			from: "sternum"
			name: "left shoulder"
			length: 2
		)
		@structure.addSegment(
			from: "sternum"
			name: "right shoulder"
			length: 2
		)
		@structure.addSegment(
			from: "left shoulder"
			to: "left elbow"
			name: "upper left arm"
			length: 10
		)
		@structure.addSegment(
			from: "right shoulder"
			to: "right elbow"
			name: "upper right arm"
			length: 10
		)
		@structure.addSegment(
			from: "left elbow"
			to: "left hand"
			name: "lower left arm"
			length: 10
		)
		@structure.addSegment(
			from: "right elbow"
			to: "right hand"
			name: "lower right arm"
			length: 10
		)
		@structure.addSegment(
			from: "sternum"
			to: "pelvis"
			name: "torso"
			length: 20
		)
		@structure.addSegment(
			from: "pelvis"
			name: "left hip"
			length: 2
		)
		@structure.addSegment(
			from: "pelvis"
			name: "right hip"
			length: 2
		)
		@structure.addSegment(
			from: "left hip"
			to: "left knee"
			name: "upper left leg"
			length: 10
		)
		@structure.addSegment(
			from: "right hip"
			to: "right knee"
			name: "upper right leg"
			length: 10
		)
		@structure.addSegment(
			from: "left knee"
			to: "left foot"
			name: "lower left leg"
			length: 10
		)
		@structure.addSegment(
			from: "right knee"
			to: "right foot"
			name: "lower right leg"
			length: 10
		)
		# for abc in "ABC"
		# 	hair_from = "head"
		# 	for i in [0..5]
		# 		@structure.addSegment(
		# 			from: "head"
		# 			name: "hair #{abc} #{i}"
		# 			length: 2
		# 		)
		# TODO: adjust proportions? https://en.wikipedia.org/wiki/Body_proportions
		# TODO: add some constraints to hips, shoulders, and neck
		# TODO: min/max_length for pseudo-3D purposes
		@bbox_padding = 10
		
		@holding_bow = null
		@holding_arrow = null
		@riding = null
		
		@bow_drawn_to = 0
		
		@run_animation_position = 0
		@subtle_idle_animation_position = 0
		@other_idle_animation_position = 0
		@idle_animation = null
		@idle_timer = 0
		@real_facing_x = @facing_x

		@hairs = (({x: 0, y: 0, vx: 0, vy: 0} for [0..5]) for [0..5])

	step: (world, view, mouse)->
		{sternum} = @structure.points
		from_point_in_world = @toWorld(sternum)
		
		# mouse controls
		mouse_in_world = view.toWorld(mouse)
		aim_angle = Math.atan2(mouse_in_world.y - from_point_in_world.y, mouse_in_world.x - from_point_in_world.x)
		mouse_prime_bow = mouse.RMB.down
		mouse_draw_bow = mouse.LMB.down
		# keyboard controls
		left = keyboard.isHeld("KeyA") or keyboard.isHeld("ArrowLeft")
		right = keyboard.isHeld("KeyD") or keyboard.isHeld("ArrowRight")
		up = keyboard.isHeld("KeyW") or keyboard.isHeld("ArrowUp") # applies to swimming/climbing
		down = keyboard.isHeld("KeyS") or keyboard.isHeld("ArrowDown")
		@jump = keyboard.wasJustPressed("KeyW") or keyboard.wasJustPressed("ArrowUp")
		mount_dismount = keyboard.wasJustPressed("KeyS") or keyboard.wasJustPressed("ArrowDown")
		# gamepad controls
		gamepad_draw_bow = false
		gamepad_prime_bow = false
		for gamepad in (try navigator.getGamepads()) ? [] when gamepad
			left or= gamepad.axes[0] < -0.5
			right or= gamepad.axes[0] > 0.5
			up or= gamepad.axes[1] < -0.5
			down or= gamepad.axes[1] > 0.5
			@jump or= gamepad.buttons[0].pressed and not gamepad_jump_prev
			mount_dismount or= gamepad.buttons[1].pressed and not gamepad_mount_prev
			gamepad_jump_prev = gamepad.buttons[0].pressed
			gamepad_mount_prev = gamepad.buttons[1].pressed
			gamepad_draw_bow = gamepad.buttons[7].pressed
			# gamepad_prime_bow = gamepad.buttons[4].pressed

			if Math.hypot(gamepad.axes[2], gamepad.axes[3]) > gamepad_detect_threshold
				gamepad_aiming = true
			if gamepad_aiming
				aim_angle = Math.atan2(gamepad.axes[3], gamepad.axes[2])
				# Reverse aiming can feel more natural, like drawing back the bow
				# even though it's not the control to draw the bow
				# TODO: It should be an option.
				aim_angle += Math.PI
				draw_back_distance = Math.hypot(gamepad.axes[2], gamepad.axes[3])
				draw_back_distance = Math.max(0, draw_back_distance - gamepad_deadzone)
				gamepad_prime_bow = draw_back_distance > 0.3

		# Note: You're allowed to prime and draw the bow without an arrow.
		prime_bow = @holding_bow and (mouse_prime_bow or gamepad_prime_bow)
		draw_bow = prime_bow and (mouse_draw_bow or gamepad_draw_bow)
		
		# TODO: configurable controls
		@move_x = right - left
		@move_y = down - up
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)
		
		pick_up_any = (EntityClass, prop)=>
			@[prop] = null if @[prop]?.destroyed
			return if @[prop]
			# this is ridiculously complicated
			for entity in world.getEntitiesOfType(EntityClass)
				from_point_in_entity_space = entity.fromWorld(from_point_in_world)
				moving_too_fast = no
				# Arrow defines getAverageVelocity
				# Bow doesn't move, and we're not handling picking up anything else yet
				if entity.getAverageVelocity?
					[vx, vy] = entity.getAverageVelocity()
					if Math.abs(vx) + Math.abs(vy) > 2
						moving_too_fast = yes
				unless moving_too_fast
					for segment_name, segment of entity.structure.segments
						dist = distanceToLineSegment(from_point_in_entity_space, segment.a, segment.b)
						if dist < 50
							pickup_item = entity
			# TODO: pickup animation
			@[prop] = pickup_item if pickup_item
		
		pick_up_any Bow, "holding_bow"
		pick_up_any Arrow, "holding_arrow"
		# Note: Arrow checks for "holding_arrow" property to prevent solving for collisions while held
		
		if mount_dismount
			if @riding
				@riding = null
			else
				closest_dist = Infinity
				closest_steed = null
				for entity in world.getEntitiesOfType(Deer)
					from_point_in_entity_space = entity.fromWorld(from_point_in_world)
					for segment_name, segment of entity.structure.segments
						dist = distanceToLineSegment(from_point_in_entity_space, segment.a, segment.b)
						if dist < closest_dist
							closest_dist = dist
							closest_steed = entity
				if closest_dist < 30
					@riding = closest_steed

		if @riding
			# @riding.move_x = @move_x
			@riding.dir = @move_x # old code...
			@riding.jump = @jump
			@facing_x = @riding.facing_x
			offset_distance = 20
			@x = @riding.x + Math.sin(@riding.ground_angle_smoothed) * offset_distance
			@y = @riding.y - Math.cos(@riding.ground_angle_smoothed) * offset_distance - 10
			@vx = @riding.vx
			@vy = @riding.vy

		prevent_idle = =>
			@idle_timer = 0
			@idle_animation = null
		
		if @riding
			new_pose = Player.poses[if prime_bow then "Riding Aiming" else "Riding"] ? @structure.getPose()
		else if @move_x is 0
			@idle_timer += 1
			subtle_idle_animation = Player.animations["Idle"]
			
			if @idle_timer > 1000
				@idle_animation = "Yawn"
				@idle_timer = 0
				@other_idle_animation_position = 0
			
			other_idle_animation = @idle_animation and Player.animations[@idle_animation]
			
			if other_idle_animation
				@other_idle_animation_position += 1 / 25
				if @other_idle_animation_position > other_idle_animation.length
					@idle_animation = null
				new_pose = Pose.lerpAnimationLoop(other_idle_animation, @other_idle_animation_position)
			else if subtle_idle_animation
				@subtle_idle_animation_position += 1 / 25
				new_pose = Pose.lerpAnimationLoop(subtle_idle_animation, @subtle_idle_animation_position)
			else
				new_pose = Player.poses["Stand"] ? @structure.getPose()
		else
			prevent_idle()
			if Player.animations["Run"]
				@run_animation_position += Math.abs(@move_x) / 5 * @facing_x * @real_facing_x
				new_pose = Pose.lerpAnimationLoop(Player.animations["Run"], @run_animation_position)
			else
				new_pose = @structure.getPose()
		
		if @real_facing_x < 0
			new_pose = Pose.horizontallyFlip(new_pose)
		
		head_x_before_posing = @structure.points["head"].x
		head_y_before_posing = @structure.points["head"].y

		# rotate the pose based on the ground angle
		# TODO: balance the character better; lean while running; keep feet out of the ground
		# I may need to define new poses to do this well.
		ground_angle = @riding?.ground_angle_smoothed ? @find_ground_angle(world)
		@ground_angle = ground_angle
		if ground_angle? and isFinite(ground_angle)
			# there's no helper for rotation yet
			# and we wanna do it a little custom anyway
			# rotating some points more than others
			new_pose = Pose.copy(new_pose)
			center = new_pose.points["pelvis"]
			center = {x: center.x, y: center.y} # copy
			for point_name, point of new_pose.points
				if @riding
					factor = 1
				else
					# With this constant this small, it's almost like a conditional
					# of whether the point is below the pelvis or not.
					# With a larger number, it would bend the knees backwards.
					max_y_diff = 2
					# how much to rotate this point
					factor = Math.max(0, Math.min(1, (point.y - center.y) / max_y_diff))
					# It's a bit much on steep slopes, so let's reduce it.
					# This is still enough to keep the feet from floating,
					# although the feet go into the ground significantly.
					factor *= 0.8
				# translate
				point.x -= center.x
				point.y -= center.y
				# rotate
				{x, y} = point
				point.x = x * Math.cos(ground_angle) - y * Math.sin(ground_angle)
				point.y = x * Math.sin(ground_angle) + y * Math.cos(ground_angle)
				# while we've got the x and y from before the rotation handy,
				# let's use them to apply the factor, using linear interpolation
				point.x += (x - point.x) * (1 - factor)
				point.y += (y - point.y) * (1 - factor)
				# translate back
				point.x += center.x
				point.y += center.y

		@structure.setPose(Pose.lerp(@structure.getPose(), new_pose, 0.3))
		
		# (her dominant eye is, of course, *whichever one she would theoretically be using*)
		# (given this)
		primary_hand = @structure.points["right hand"]
		secondary_hand = @structure.points["left hand"]
		primary_elbow = @structure.points["right elbow"]
		secondary_elbow = @structure.points["left elbow"]
		
		@real_facing_x = @facing_x

		if prime_bow
			# Restore head position, in order to do linear interpolation.
			# In this state, the head is not controlled by the pose, but by the bow aiming.
			@structure.points["head"].x = head_x_before_posing
			@structure.points["head"].y = head_y_before_posing

		# TODO: transition (both ways) between primed and not
		# also maybe relax the "primed" state when running and not drawn back
		if @holding_bow
			bow = @holding_bow
			bow.x = @x
			bow.y = @y
			
			arm_span = @structure.segments["upper right arm"].length + @structure.segments["lower right arm"].length
			max_draw_distance = 6
			# max_draw_distance = arm_span / 2.5 #- bow.fistmele
			bow.draw_distance += ((max_draw_distance * draw_bow) - bow.draw_distance) / 15
			
			draw_to = arm_span - bow.fistmele - bow.draw_distance
			
			if draw_bow
				# TODO: use better transition to allow for greater control over release velocity
				bow.draw_distance += (5 - bow.draw_distance) / 5
				@bow_drawn_to = draw_to
			else
				if prime_bow and @holding_arrow and bow.draw_distance > 2 and not world.collision(
					@holding_arrow.toWorld(@holding_arrow.structure.points["tip"])
				) and not world.collision(
					@holding_arrow.toWorld(@holding_arrow.structure.points["nock"])
				)
					force = bow.draw_distance * 2
					@holding_arrow.setVelocity(
						Math.cos(aim_angle) * force + @vx
						Math.sin(aim_angle) * force + @vy
					)
					@holding_arrow = null
				bow.draw_distance = 0
				# FIXME: this should be an ease-in transition, not ease-out
				@bow_drawn_to += (arm_span - bow.fistmele - @bow_drawn_to) / 10
			
			if prime_bow
				prevent_idle()
				bow_angle = aim_angle
				primary_hand.x = sternum.x + @bow_drawn_to * Math.cos(aim_angle)
				primary_hand.y = sternum.y + @bow_drawn_to * Math.sin(aim_angle)
				primary_elbow.x = sternum.x + 5 * Math.cos(aim_angle)
				primary_elbow.y = sternum.y + 5 * Math.sin(aim_angle)
				# primary_elbow.y = sternum.y - 3
				secondary_hand.x = sternum.x + arm_span * Math.cos(aim_angle)
				secondary_hand.y = sternum.y + arm_span * Math.sin(aim_angle)
				secondary_elbow.x = sternum.x + 15 * Math.cos(aim_angle)
				secondary_elbow.y = sternum.y + 15 * Math.sin(aim_angle)
				# make head look along aim path
				angle = (aim_angle - Math.PI / 2) %% (Math.PI * 2)
				@real_facing_x = if angle < Math.PI then -1 else 1
				{head, neck} = @structure.points
				new_head_x = neck.x + 5 * Math.cos(angle + if angle < Math.PI then Math.PI else 0)
				new_head_y = neck.y + 5 * Math.sin(angle + if angle < Math.PI then Math.PI else 0)
				head.x += (new_head_x - head.x) / 5
				head.y += (new_head_y - head.y) / 5
			else
				bow_angle = Math.atan2(secondary_hand.y - secondary_elbow.y, secondary_hand.x - secondary_elbow.x)
			
			primary_hand_in_bow_space = bow.fromWorld(@toWorld(primary_hand))
			secondary_hand_in_bow_space = bow.fromWorld(@toWorld(secondary_hand))
			bow.structure.points.grip.x = secondary_hand_in_bow_space.x
			bow.structure.points.grip.y = secondary_hand_in_bow_space.y
			if prime_bow
				bow.structure.points.serving.x = sternum.x + draw_to * Math.cos(aim_angle)
				bow.structure.points.serving.y = sternum.y + draw_to * Math.sin(aim_angle)
			else
				bow.structure.points.serving.x = bow.structure.points.grip.x - bow.fistmele * Math.cos(bow_angle)
				bow.structure.points.serving.y = bow.structure.points.grip.y - bow.fistmele * Math.sin(bow_angle)
		
		if @holding_arrow
			arrow = @holding_arrow
			arrow.lodging_constraints.length = 0 # pull it out if it's lodged in an object
			arrow.x = @x
			arrow.y = @y
			primary_hand_in_arrow_space = arrow.fromWorld(@toWorld(primary_hand))
			secondary_hand_in_arrow_space = arrow.fromWorld(@toWorld(secondary_hand))
			if prime_bow
				arrow.structure.points.nock.x = sternum.x + draw_to * Math.cos(aim_angle)
				arrow.structure.points.nock.y = sternum.y + draw_to * Math.sin(aim_angle)
				arrow.structure.points.tip.x = sternum.x + (draw_to + arrow.length) * Math.cos(aim_angle)
				arrow.structure.points.tip.y = sternum.y + (draw_to + arrow.length) * Math.sin(aim_angle)
			else
				angle = Math.atan2(primary_hand.y - sternum.y, primary_hand.x - sternum.x)
				arrow_angle = angle - (TAU/4 + 0.2) * @real_facing_x
				hold_offset = -5
				arrow.structure.points.nock.x = primary_hand_in_arrow_space.x + hold_offset * Math.cos(arrow_angle)
				arrow.structure.points.nock.y = primary_hand_in_arrow_space.y + hold_offset * Math.sin(arrow_angle)
				arrow.structure.points.tip.x = primary_hand_in_arrow_space.x + (hold_offset + arrow.length) * Math.cos(arrow_angle)
				arrow.structure.points.tip.y = primary_hand_in_arrow_space.y + (hold_offset + arrow.length) * Math.sin(arrow_angle)

			# Cancel implicit velocity from moving the arrow's "current positions"
			# (This updates the "previous positions" that imply velocity.)
			arrow.setVelocity(0, 0)
		
		# Hair physics
		# head_pos = @structure.points.head
		# head_pos = new_pose.points.head
		# head_pos = @structure.getPose().points.head
		{head, neck} = @structure.points
		head_angle = Math.atan2(head.y - neck.y, head.x - neck.x)

		hair_iterations = 10
		for points in @hairs
			for point in points
				point.vx -= @vx # simulate relative velocity
				point.vy -= @vy # simulate relative velocity
		for [0..hair_iterations]
			for points in @hairs
				for point in points
					point.prev_x = point.x
					point.prev_y = point.y
					# point.vx -= @vx / hair_iterations # simulate relative velocity
					# point.vy -= @vy / hair_iterations # simulate relative velocity

			for points, hair_index in @hairs
				# points[0].x = head_pos.x + hair_index
				# points[0].y = head_pos.y
				a = head_angle + hair_index / @hairs.length * Math.PI
				points[0].x = head.x + Math.cos(a) * 5
				points[0].y = head.y + Math.sin(a) * 5
				seg_length = 5
				for i in [1...points.length]
					points[i].vy += 0.5 / hair_iterations
					# points[i].vx += 0.02 * (Math.random() - 0.5)
					# points[i].vy -= @vy / hair_iterations # simulate relative velocity
					# points[i].vx -= @vx / hair_iterations # simulate relative velocity
					points[i].x += points[i].vx
					points[i].y += points[i].vy
					# points[i].x -= @vx / hair_iterations # simulate relative velocity
					# points[i].y -= @vy / hair_iterations # simulate relative velocity
					delta_x = points[i].x - points[i-1].x
					delta_y = points[i].y - points[i-1].y
					delta_length = Math.hypot(delta_x, delta_y)
					diff = (delta_length - seg_length) / delta_length
					if isFinite(diff) and delta_length > seg_length
						points[i].x -= delta_x * 0.5 * diff
						points[i].y -= delta_y * 0.5 * diff
						points[i-1].x += delta_x * 0.5 * diff
						points[i-1].y += delta_y * 0.5 * diff
						# points[i].x -= delta_x * diff
						# points[i].y -= delta_y * diff
					else
						console.warn("diff is not finite, for hair segment distance constraint")
			
			for points in @hairs
				for point in points
					point.vx = point.x - point.prev_x
					point.vy = point.y - point.prev_y
	
	draw: (ctx)->
		{head, sternum, pelvis, "left knee": left_knee, "right knee": right_knee, "left shoulder": left_shoulder, "right shoulder": right_shoulder} = @structure.points
		# ^that's kinda ugly, should we just name segments and points with underscores instead of spaces?
		# or should I just alias structure.points as a one-char-var and do p["left shoulder"]? that could work, but I would still use {}= when I could honestly, so...
		
		skin_color = "#6B422C"
		hair_color = "#000000"
		eye_color = "#000000"
		dress_color = "#AAFFFF"
		
		# TODO: depth
		# @drawStructure
		# 	segments:
		# 		torso: ->
		# 	points:
		# 		head: ->
		
		# trailing hair
		for hair_points in @hairs
			ctx.beginPath()
			ctx.moveTo(hair_points[0].x, hair_points[0].y)
			for point in hair_points[1...]
				ctx.lineTo(point.x, point.y)
			ctx.lineWidth = 2
			ctx.lineCap = "round"
			ctx.strokeStyle = hair_color
			ctx.stroke()
		
		# limbs
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = 3
			ctx.lineCap = "round"
			ctx.strokeStyle = skin_color
			ctx.stroke()
		
		# dress
		ctx.beginPath()
		ctx.save()
		ctx.translate(sternum.x, sternum.y)
		torso_angle = Math.atan2(pelvis.y - sternum.y, pelvis.x - sternum.x) - TAU/4
		torso_length = distance(pelvis, sternum)
		ctx.rotate(torso_angle)
		left_leg_angle = Math.atan2(left_knee.y - pelvis.y, left_knee.x - pelvis.x) - torso_angle
		right_leg_angle = Math.atan2(right_knee.y - pelvis.y, right_knee.x - pelvis.x) - torso_angle
		left_shoulder_angle = Math.atan2(left_shoulder.y - sternum.y, left_shoulder.x - sternum.x) - torso_angle
		right_shoulder_angle = Math.atan2(right_shoulder.y - sternum.y, right_shoulder.x - sternum.x) - torso_angle
		shoulder_distance = distance(left_shoulder, sternum)
		min_shoulder_cos = Math.min(Math.cos(left_shoulder_angle), Math.cos(right_shoulder_angle))
		max_shoulder_cos = Math.max(Math.cos(left_shoulder_angle), Math.cos(right_shoulder_angle))
		if Math.cos(left_shoulder_angle) < Math.cos(right_shoulder_angle)
			min_cos_shoulder_angle = left_shoulder_angle
			max_cos_shoulder_angle = right_shoulder_angle
		else
			min_cos_shoulder_angle = right_shoulder_angle
			max_cos_shoulder_angle = left_shoulder_angle
		ctx.lineTo(-2 + Math.min(0, 1 * min_shoulder_cos), Math.sin(min_cos_shoulder_angle) * shoulder_distance - 1.5)
		ctx.lineTo(+2 + Math.max(0, 1 * max_shoulder_cos), Math.sin(max_cos_shoulder_angle) * shoulder_distance - 1.5)
		min_cos = Math.min(Math.cos(left_leg_angle), Math.cos(right_leg_angle))
		max_cos = Math.max(Math.cos(left_leg_angle), Math.cos(right_leg_angle))
		min_sin = Math.min(Math.sin(left_leg_angle), Math.sin(right_leg_angle))
		max_sin = Math.max(Math.sin(left_leg_angle), Math.sin(right_leg_angle))
		ctx.lineTo(+4 + Math.max(0, 1 * max_cos), torso_length/2)
		ctx.lineTo(+4 + Math.max(0, 9 * max_cos), torso_length + Math.max(5, 7 * max_sin))
		ctx.lineTo(-4 + Math.min(0, 9 * min_cos), torso_length + Math.max(5, 7 * max_sin))
		ctx.lineTo(-4 + Math.min(0, 1 * min_cos), torso_length/2)
		ctx.fillStyle = dress_color
		ctx.fill()
		ctx.restore()
		
		# head, including top of hair
		ctx.save()
		ctx.translate(head.x, head.y)
		ctx.rotate(Math.atan2(head.y - sternum.y, head.x - sternum.x) - TAU/4)
		# head
		ctx.save()
		ctx.scale(0.9, 1)
		ctx.beginPath()
		ctx.arc(0, 0, 5.5, 0, TAU)
		ctx.fillStyle = skin_color
		ctx.fill()
		ctx.restore()
		# top of hair
		# ctx.beginPath()
		# ctx.arc(0, 0, 5.5, 0, TAU/2)
		# ctx.fillStyle = hair_color
		# ctx.fill()
		# eyes
		# TODO: refactor 5.5 and 0.9. Make hair defined in terms of head, not vice versa, and use variables.
		ctx.arc(0, 0, 5.5*0.9, 0, TAU)
		ctx.clip()
		eye_spacing = 0.6 # radians
		turn_limit = TAU/8 # radians, TAU/4 = head facing completely sideways, only one eye visible
		ctx.fillStyle = eye_color
		@smoothed_facing_x_for_eyes ?= 0
		@smoothed_facing_x_for_eyes += (@real_facing_x - @smoothed_facing_x_for_eyes) / 5
		for eye_signature in [-1, 1]
			# 3D projection in one axis
			head_rotation_angle = @smoothed_facing_x_for_eyes * turn_limit
			eye_x = Math.sin(eye_spacing * eye_signature - head_rotation_angle) * 5.5*0.9
			ctx.beginPath()
			ctx.arc(eye_x, -1, 1, 0, TAU)
			ctx.fill()
		# /head
		ctx.restore()

		# debug draw
		# show the ground angle
		# ctx.beginPath()
		# ctx.moveTo(0, 0)
		# ctx.lineTo(100 * Math.cos(@ground_angle), 100 * Math.sin(@ground_angle))
		# ctx.strokeStyle = "red"
		# ctx.stroke()
