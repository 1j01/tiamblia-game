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

# Actually treat it as a segment, not an infinite line
# unlike copies of this function in other files
closestPointOnLineSegment = (point, a, b)->
	# https://stackoverflow.com/a/3122532/2624876
	a_to_p = {x: point.x - a.x, y: point.y - a.y}
	a_to_b = {x: b.x - a.x, y: b.y - a.y}
	atb2 = a_to_b.x**2 + a_to_b.y**2
	atp_dot_atb = a_to_p.x*a_to_b.x + a_to_p.y*a_to_b.y
	t = atp_dot_atb / atb2
	t = Math.max(0, Math.min(1, t))
	return {x: a.x + a_to_b.x*t, y: a.y + a_to_b.y*t}

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
		@holding_arrows = []
		@riding = null
		
		@bow_drawn_to = 0
		
		@run_animation_position = 0
		@subtle_idle_animation_position = 0
		@other_idle_animation_position = 0
		@idle_animation = null
		@idle_timer = 0
		@real_facing_x = @facing_x = 1
		@landing_momentum = 0 # for bending knees when landing

		@hairs = (({x: 0, y: 0, vx: 0, vy: 0} for [0..4]) for [0..5])
		@hair_initialized = false

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
		
		crouch = down and not @riding

		# TODO: configurable controls
		@move_x = right - left
		@move_y = down - up
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)
		
		closest_entity_to_world_point = (point_in_world_space, EntityClass, filter)=>
			closest_dist = Infinity
			closest_entity = null
			closest_segment = null
			for entity in world.getEntitiesOfType(EntityClass) when filter?(entity) or not filter
				point_in_entity_space = entity.fromWorld(point_in_world_space)
				for segment_name, segment of entity.structure.segments
					dist = distanceToLineSegment(point_in_entity_space, segment.a, segment.b)
					if dist < closest_dist
						closest_dist = dist
						closest_entity = entity
						closest_segment = segment
			return {closest_entity, closest_dist, closest_segment}

		pick_up_distance_threshold = 10
		@pick_up_timer ?= 0
		@pick_up_timer -= 1
		pick_up_any = (EntityClass, prop, use_secondary_hand=false, hold_many=false)=>
			# Skele2D editor sets entity.destroyed if you delete an entity
			if hold_many
				@[prop] = @[prop].filter((entity)-> not entity.destroyed)
			else
				@[prop] = null if @[prop]?.destroyed
			
			return if @pick_up_timer > 0

			return if @[prop] and not hold_many

			entity_filter = (entity)=>
				if hold_many and @[prop].includes(entity)
					return false

				moving_too_fast = no
				# Arrow defines getAverageVelocity
				# Bow doesn't move, and we're not handling picking up anything else yet
				if entity.getAverageVelocity?
					[vx, vy] = entity.getAverageVelocity()
					if Math.abs(vx) + Math.abs(vy) > 2
						moving_too_fast = yes
				return not moving_too_fast

			primary_hand = @structure.points["right hand"]
			secondary_hand = @structure.points["left hand"]
			primary_shoulder = @structure.points["right shoulder"]
			secondary_shoulder = @structure.points["left shoulder"]
			hand = if use_secondary_hand then secondary_hand else primary_hand
			shoulder = if use_secondary_hand then secondary_shoulder else primary_shoulder
			hand_world = @toWorld(hand)
			shoulder_world = @toWorld(shoulder)

			# Checking from both these locations ensures
			# it won't try to reach towards something it can't reach
			# when it could reach something else.
			# For example, if there's an item just out of reach below the hand
			# with the arm extended downwards, but another item above the shoulder, within reach,
			# the item within reach is further from the hand than the one out of reach,
			# but it's closer to the shoulder.
			# Later logic can decide to not actually reach towards anything out of reach,
			# or to reach towards a nearby item as long as you're moving towards it.
			near_hand = closest_entity_to_world_point(hand_world, EntityClass, entity_filter)
			near_shoulder = closest_entity_to_world_point(shoulder_world, EntityClass, entity_filter)

			nearest = if near_hand.closest_dist < near_shoulder.closest_dist then near_hand else near_shoulder

			if nearest.closest_dist < 50
				# Animates the hand reaching for the entity
				@reaching_for_entity = nearest.closest_entity
				@reaching_for_segment = nearest.closest_segment
				@reaching_with_secondary_hand = use_secondary_hand
				# If the hand is close enough to an item, pick it up
				if near_hand.closest_dist < pick_up_distance_threshold
					if hold_many
						@[prop].push(near_hand.closest_entity)
					else
						@[prop] = near_hand.closest_entity
					@pick_up_timer = 10
		
		@reaching_for_entity = null
		@reaching_for_segment = null
		@reaching_with_secondary_hand = false
		pick_up_any Bow, "holding_bow", true, false
		pick_up_any Arrow, "holding_arrows", false, true
		# Note: Arrow checks "holding_arrows" property to prevent solving for collisions while held
		
		if mount_dismount
			if @riding
				@riding = null
			else
				search_result = closest_entity_to_world_point(from_point_in_world, Deer)
				if search_result.closest_dist < 30
					@riding = search_result.closest_entity

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
		
		more_submerged = @submerged and world.collision({@x, y: @y + @height * 0.5}, types: (entity)=>
			entity.constructor.name is "Water"
		)

		if @riding
			new_pose = Player.poses[if prime_bow then "Riding Aiming" else "Riding"] ? @structure.getPose()
		else if more_submerged
			if @move_x isnt 0 and Player.animations["Swim"]
				@run_animation_position += 0.1
				new_pose = Pose.lerpAnimationLoop(Player.animations["Swim"], @run_animation_position)
			else if Player.animations["Tread Water"]
				@run_animation_position -= 0.1 * @move_y
				new_pose = Pose.lerpAnimationLoop(Player.animations["Tread Water"], @run_animation_position)
			else
				new_pose = Player.poses["Stand"] ? @structure.getPose()
		else if @grounded
			if @move_x is 0
				if crouch
					new_pose = Player.poses["Crouch"]
					# There's no idle animation for crouching
					prevent_idle()
				else
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
		else
			prevent_idle()
			new_pose = Player.poses["Jumping"] ? Player.poses["Stand"] ? @structure.getPose()
		
		if @real_facing_x < 0
			new_pose = Pose.horizontallyFlip(new_pose)
		
		# Avoid mutating the pose/animation data
		new_pose = Pose.copy(new_pose)

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

				# Also, squash when landing.
				# TODO: less head bobbing action, more knee bending
				@landing_momentum ?= 0
				@landing_momentum *= 0.9
				gravity = 0.5
				squat_factor = Math.min(1, Math.max(0, @landing_momentum - gravity))
				point.y += squat_factor * (1 - factor) * 15

		# (her dominant eye is, of course, *whichever one she would theoretically be using*)
		# (given this)
		primary_hand = @structure.points["right hand"]
		secondary_hand = @structure.points["left hand"]
		primary_elbow = @structure.points["right elbow"]
		secondary_elbow = @structure.points["left elbow"]

		# Make hand reach for items
		if @reaching_for_entity
			hand = if @reaching_with_secondary_hand then secondary_hand else primary_hand
			pose_primary_shoulder = new_pose.points["right shoulder"]
			pose_secondary_shoulder = new_pose.points["left shoulder"]
			pose_shoulder = if @reaching_with_secondary_hand then pose_secondary_shoulder else pose_primary_shoulder
			hand_world = @toWorld(hand)
			pose_shoulder_world = @toWorld(pose_shoulder)
			hand_world_soon = {x: hand_world.x + @vx, y: hand_world.y + @vy}
			pose_shoulder_world_soon = {x: pose_shoulder_world.x + @vx, y: pose_shoulder_world.y + @vy}
			a_world = @reaching_for_entity.toWorld(@reaching_for_segment.a)
			b_world = @reaching_for_entity.toWorld(@reaching_for_segment.b)
			c_world = closestPointOnLineSegment(hand_world, a_world, b_world)
			c_world_soon = closestPointOnLineSegment(hand_world_soon, a_world, b_world)
			# assuming the arms are the same length haha
			arm_span = @structure.segments["upper right arm"].length + @structure.segments["lower right arm"].length
			dx = c_world.x - pose_shoulder_world.x
			dy = c_world.y - pose_shoulder_world.y
			distance_from_shoulder = Math.hypot(dx, dy)
			dx_soon = c_world_soon.x - pose_shoulder_world_soon.x
			dy_soon = c_world_soon.y - pose_shoulder_world_soon.y
			distance_from_shoulder_soon = Math.hypot(dx_soon, dy_soon)
		
			# if the item is too far away, don't just reach as far as possible
			# UNLESS we're approaching the item
			within_reach = distance_from_shoulder < arm_span + pick_up_distance_threshold * 0.9
			# Note that the gravity force accumulates below the threshold for movement
			# so we need a threshold at least as high as that, or it will alternate.
			moving = Math.abs(@vx) > 1 or Math.abs(@vy) > 1
			moving_towards_item = moving and distance_from_shoulder - distance_from_shoulder_soon > 0.1
			
			if within_reach or moving_towards_item
				# bring the hand as close as possible to the item
				# (the general pose lerp will handle animating it as movement)

				distance_from_shoulder = Math.max(1, distance_from_shoulder) # avoid divide by zero
				reach_distance = Math.min(arm_span, distance_from_shoulder)
				reach_point_world = {
					x: pose_shoulder_world.x + reach_distance * dx/distance_from_shoulder
					y: pose_shoulder_world.y + reach_distance * dy/distance_from_shoulder
				}
				reach_point_local = @fromWorld(reach_point_world)
				hand_x = reach_point_local.x
				hand_y = reach_point_local.y
				# basic inverse kinematics for the elbow
				# Place the elbow at the midpoint between the hand and the shoulder
				elbow_x = (hand_x + pose_shoulder.x) / 2
				elbow_y = (hand_y + pose_shoulder.y) / 2
				# Then offset it to keep the segments the right length
				arm_angle = Math.atan2(hand_y - pose_shoulder.y, hand_x - pose_shoulder.x)
				arm_extension = Math.hypot(hand_x - pose_shoulder.x, hand_y - pose_shoulder.y)
				offset_angle = arm_angle + Math.PI / 2
				offset_distance = Math.abs(arm_span - arm_extension)
				if Math.sin(offset_angle) < 0
					offset_angle += Math.PI
				elbow_x += Math.cos(offset_angle) * offset_distance
				elbow_y += Math.sin(offset_angle) * offset_distance
				# Update the pose
				pose_hand = new_pose.points[if @reaching_with_secondary_hand then "left hand" else "right hand"]
				pose_elbow = new_pose.points[if @reaching_with_secondary_hand then "left elbow" else "right elbow"]
				pose_hand.x = hand_x
				pose_hand.y = hand_y
				pose_elbow.x = elbow_x
				pose_elbow.y = elbow_y

		# This does a lot of the grunt work of smoothing things out
		@structure.setPose(Pose.lerp(@structure.getPose(), new_pose, 0.3))
		
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
				arrow = @holding_arrows[0]
				if prime_bow and arrow and bow.draw_distance > 2 and not world.collision(
					arrow.toWorld(arrow.structure.points["tip"])
				) and not world.collision(
					arrow.toWorld(arrow.structure.points["nock"])
				)
					force = bow.draw_distance * 2
					arrow.setVelocity(
						Math.cos(aim_angle) * force + @vx
						Math.sin(aim_angle) * force + @vy
					)
					index = @holding_arrows.indexOf(arrow)
					@holding_arrows.splice(index, 1) if index >= 0
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
				# This is a little hairy.
				# lerp_factor = 1 - 0.3 # 0.3 is the lerp factor used for the rest of the pose
				# We want to use a slower lerp when the head is flipping from one side to the other
				# at the threshold when you aim upwards.
				# We need to move the head quickly when the body/neck moves vertically,
				# such as when crouching, or when starting priming the bow while riding a horse.
				# Otherwise the neck will stretch or look weird.
				# However, just changing the lerp factor temporarily still lets the
				# neck stretch, temporarily, during the transition. @FIXME
				@facing_turn_timer ?= 0
				transition_duration = 50
				if @prev_real_facing_x != @real_facing_x
					@facing_turn_timer = transition_duration
				@facing_turn_timer -= 1
				lerp_factor = 1 #- 0.3
				if @facing_turn_timer > 0
					target_lerp_factor = 0.001
					# lerp the lerp factor so there's not a sudden jump at the end of the timer
					meta_lerp_factor = @facing_turn_timer / transition_duration
					lerp_factor += (target_lerp_factor - lerp_factor) * meta_lerp_factor
				head.x += (new_head_x - head.x) * lerp_factor
				head.y += (new_head_y - head.y) * lerp_factor
				# drop extra arrows
				@holding_arrows.length = 1 if @holding_arrows.length > 1
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
		
		for arrow, arrow_index in @holding_arrows
			arrow.lodging_constraints.length = 0 # pull it out if it's lodged in an object
			arrow.x = @x
			arrow.y = @y
			# um, this coordinate transform is pointless because of the above,
			# but whatever, it shows intent, right?
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
				# near fletching, good for one arrow
				hold_offset = -5
				# hold a bit more centered when there's more arrows
				hold_offset -= Math.min(@holding_arrows.length - 1, 3)
				# fan out the arrows, squeezing them together subtly more when moving
				fan_angle = ((arrow_index % 2) - 1/2) * arrow_index * 0.4
				if @holding_arrows.length > 3
					fan_angle *= Math.pow(0.9, @holding_arrows.length)
				if Math.abs(@vx) > 2
					fan_angle *= 0.7
				arrow_angle += fan_angle
				# pseudo-randomly stagger the arrows
				hold_offset += Math.sin(arrow_index ** 1.2) * Math.pow(arrow_index, 0.9) * 0.3
				# jostle the arrows while moving
				arrow_angle += Math.sin(@x / 10 + arrow_index * 0.1) * Math.cos(@y / 10 + arrow_index * 0.5) * 0.01 * @vx

				arrow.structure.points.nock.x = primary_hand_in_arrow_space.x + hold_offset * Math.cos(arrow_angle)
				arrow.structure.points.nock.y = primary_hand_in_arrow_space.y + hold_offset * Math.sin(arrow_angle)
				arrow.structure.points.tip.x = primary_hand_in_arrow_space.x + (hold_offset + arrow.length) * Math.cos(arrow_angle)
				arrow.structure.points.tip.y = primary_hand_in_arrow_space.y + (hold_offset + arrow.length) * Math.sin(arrow_angle)

			# Cancel implicit velocity from moving the arrow's "current positions"
			# (This updates the "previous positions" that imply velocity.)
			arrow.setVelocity(0, 0)
		
		# Hair physics
		@simulate_hair(world)

		@prev_real_facing_x = @real_facing_x
	
	simulate_hair: (world)->
		{head, neck} = @structure.points
		head_angle = Math.atan2(head.y - neck.y, head.x - neck.x)
		head_global = @toWorld(head)

		hair_iterations = 1
		air_friction = 0.2
		water_friction = 0.2
		hair_length = 30

		for [0..hair_iterations]
			for points in @hairs
				for point in points
					point.prev_x = point.x
					point.prev_y = point.y

			for points, hair_index in @hairs
				a = head_angle + hair_index / @hairs.length * Math.PI - Math.PI/2
				back_x = Math.sin(head_angle) * 2 * @real_facing_x
				back_y = Math.cos(head_angle) * 2 * @real_facing_x
				points[0].x = head_global.x + Math.cos(a) * 3 + back_x
				points[0].y = head_global.y + Math.sin(a) * 3 + back_y
				seg_length = (hair_length + (Math.cos(a - head_angle) - 0.5) * 5) / points.length
				for i in [1...points.length]
					if not @hair_initialized
						points[i].x = points[i-1].x
						points[i].y = points[i-1].y + seg_length
						points[i].prev_x = points[i].x
						points[i].prev_y = points[i].y
					gravity = 0.5
					submerged = world?.collision(points[i], types: (entity)=>
						entity.constructor.name is "Water"
					)
					buoyancy = if submerged then 0.6 else 0
					fluid_friction = if submerged then water_friction else air_friction
					points[i].vy += (gravity - buoyancy) / hair_iterations
					points[i].vx *= (1 - fluid_friction)
					points[i].vy *= (1 - fluid_friction)
					if submerged
						# points[i].vx += Math.sin(performance.now() / 1000 + i/30 + hair_index/10 + Math.sin(points[i].x/100 + points[i].y/100)) * 0.1
						# points[i].vy += Math.cos(performance.now() / 1000 + i/30 + hair_index/10 + Math.cos(points[i].x/150 + points[i].y/200)) * 0.05
						points[i].vx += Math.sin(Math.sin(performance.now() ** 1.2 / 1000 + Math.sin(points[i].y / 30))*40 + points[i].x + Math.sin(points[i].y / 30)) * 0.05
						points[i].vy += Math.cos(Math.sin(performance.now() ** 1.2 / 1000 + Math.sin(points[i].y / 30))*40 + points[i].x + Math.sin(points[i].y / 30)) * 0.05
					points[i].x += points[i].vx
					points[i].y += points[i].vy
					delta_x = points[i].x - points[i-1].x
					delta_y = points[i].y - points[i-1].y
					delta_length = Math.hypot(delta_x, delta_y)
					diff = (delta_length - seg_length) / delta_length
					if isFinite(diff) and delta_length > seg_length
						points[i].x -= delta_x * diff
						points[i].y -= delta_y * diff
					else if not isFinite(diff)
						console.warn("diff is not finite, for hair segment distance constraint")
			
			for points in @hairs
				for point in points
					point.vx = point.x - point.prev_x
					point.vy = point.y - point.prev_y

			@hair_initialized = true
	
	draw: (ctx, view)->
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
		if view.is_preview or not @hair_initialized
			@simulate_hair()
			if not view.is_preview
				@hair_initialized = false # so it will move when you drag the entity
		for hair_points, hair_index in @hairs
			ctx.beginPath()
			# ctx.moveTo(hair_points[0].x, hair_points[0].y)
			local_point = @fromWorld(hair_points[0])
			ctx.moveTo(local_point.x, local_point.y)
			for point in hair_points[1...]
				# ctx.lineTo(point.x, point.y)
				local_point = @fromWorld(point)
				ctx.lineTo(local_point.x, local_point.y)
			ctx.lineWidth = 2
			ctx.lineCap = "round"
			ctx.lineJoin = "round"
			ctx.strokeStyle = hair_color
			# ctx.strokeStyle = "hsla(#{hair_index / @hairs.length * 360}, 100%, 50%, 0.5)"
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
		ctx.beginPath()
		ctx.arc(0, 0, 5.5, 0, TAU/2)
		ctx.fillStyle = hair_color
		ctx.fill()
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
