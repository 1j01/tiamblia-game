SimpleActor = require "./abstract/SimpleActor.coffee"
Entity = require "./abstract/Entity.coffee"
{Pose} = require "skele2d"
Bow = require "./items/Bow.coffee"
Arrow = require "./items/Arrow.coffee"
keyboard = require "../keyboard.coffee"
{addEntityClass} = require "skele2d"
{distance, distanceToLineSegment} = require("skele2d").helpers
TAU = Math.PI * 2

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
			to: "left elbo"
			name: "upper left arm"
			length: 10
		)
		@structure.addSegment(
			from: "right shoulder"
			to: "right elbo"
			name: "upper right arm"
			length: 10
		)
		@structure.addSegment(
			from: "left elbo"
			to: "left hand"
			name: "lower left arm"
			length: 10
		)
		@structure.addSegment(
			from: "right elbo"
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
		
		@bow_drawn_to = 0
		
		@run_animation_position = 0
		@subtle_idle_animation_position = 0
		@other_idle_animation_position = 0
		@idle_animation = null
		@idle_timer = 0
		@smoothed_vy = 0
		@hair_x_scales = [1,1,1,1,1,1,1,1,1]
		@real_facing_x = @facing_x
	
	step: (world, view, mouse)->
		left = keyboard.isHeld("KeyA") or keyboard.isHeld("ArrowLeft")
		right = keyboard.isHeld("KeyD") or keyboard.isHeld("ArrowRight")
		@jump = keyboard.wasJustPressed("KeyW") or keyboard.wasJustPressed("ArrowUp")
		# TODO: gamepad support
		# TODO: configurable controls
		@move_x = right - left
		super(world)
		
		{sternum} = @structure.points
		from_point_in_world = @toWorld(sternum)
		
		mouse_in_world = view.toWorld(mouse)
		aim_angle = Math.atan2(mouse_in_world.y - from_point_in_world.y, mouse_in_world.x - from_point_in_world.x)
		
		pick_up_any = (EntityClass, prop)=>
			@[prop] = null if @[prop]?.destroyed
			return if @[prop]
			# this is ridiculously complicated
			for entity in world.getEntitiesOfType(EntityClass)
				from_point_in_entity_space = entity.fromWorld(from_point_in_world)
				moving_too_fast = no
				for point_name, point of entity.structure.points
					if point.vx? and point.vy?
						if Math.abs(point.vx) + Math.abs(point.vy) > 2
							moving_too_fast = yes
							break
				unless moving_too_fast
					for segment_name, segment of entity.structure.segments
						dist = distanceToLineSegment(from_point_in_entity_space, segment.a, segment.b)
						if dist < 50
							pickup_item = entity
			# TODO: pickup animation
			@[prop] = pickup_item if pickup_item
		
		pick_up_any Bow, "holding_bow"
		pick_up_any Arrow, "holding_arrow"
		
		prevent_idle = =>
			@idle_timer = 0
			@idle_animation = null
		
		if @move_x is 0
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

		@structure.setPose(Pose.lerp(@structure.getPose(), new_pose, 0.3))
		
		# (her dominant eye is, of course, *whichever one she would theoretically be using*)
		# (given this)
		primary_hand = @structure.points["right hand"]
		secondary_hand = @structure.points["left hand"]
		primary_elbo = @structure.points["right elbo"]
		secondary_elbo = @structure.points["left elbo"]
		
		prime_bow = @holding_bow and mouse.RMB.down # and @holding_arrow
		draw_bow = prime_bow and mouse.LMB.down
		
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
				if prime_bow and @holding_arrow and bow.draw_distance > 2
					force = bow.draw_distance * 2
					for point_name, point of @holding_arrow.structure.points
						point.vx = Math.cos(aim_angle) * force
						point.vy = Math.sin(aim_angle) * force
					@holding_arrow = null
				bow.draw_distance = 0
				# FIXME: this should be an ease-in transition, not ease-out
				@bow_drawn_to += (arm_span - bow.fistmele - @bow_drawn_to) / 10
			
			if prime_bow
				prevent_idle()
				bow_angle = aim_angle
				primary_hand.x = sternum.x + @bow_drawn_to * Math.cos(aim_angle)
				primary_hand.y = sternum.y + @bow_drawn_to * Math.sin(aim_angle)
				primary_elbo.x = sternum.x + 5 * Math.cos(aim_angle)
				primary_elbo.y = sternum.y + 5 * Math.sin(aim_angle)
				# primary_elbo.y = sternum.y - 3
				secondary_hand.x = sternum.x + arm_span * Math.cos(aim_angle)
				secondary_hand.y = sternum.y + arm_span * Math.sin(aim_angle)
				secondary_elbo.x = sternum.x + 15 * Math.cos(aim_angle)
				secondary_elbo.y = sternum.y + 15 * Math.sin(aim_angle)
				# make head look along aim path
				angle = (aim_angle - Math.PI / 2) %% (Math.PI * 2)
				@real_facing_x = if angle < Math.PI then -1 else 1
				{head, neck} = @structure.points
				new_head_x = neck.x + 5 * Math.cos(angle + if angle < Math.PI then Math.PI else 0)
				new_head_y = neck.y + 5 * Math.sin(angle + if angle < Math.PI then Math.PI else 0)
				head.x += (new_head_x - head.x) / 5
				head.y += (new_head_y - head.y) / 5
			else
				bow_angle = Math.atan2(secondary_hand.y - secondary_elbo.y, secondary_hand.x - secondary_elbo.x)
			
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
			arrow.x = @x
			arrow.y = @y
			primary_hand_in_arrow_space = arrow.fromWorld(@toWorld(primary_hand))
			secondary_hand_in_arrow_space = arrow.fromWorld(@toWorld(secondary_hand))
			arrow.structure.points.nock.vx = 0
			arrow.structure.points.nock.vy = 0
			arrow.structure.points.tip.vx = 0
			arrow.structure.points.tip.vy = 0
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
		# TODO: better, less fake hair physics
		ctx.save()
		ctx.translate(head.x, head.y)
		ctx.translate(-@real_facing_x * 0.3, 0)
		@smoothed_vy += ((@vy * not @grounded) - @smoothed_vy) / 5
		
		for hxs, i in @hair_x_scales by -1
			if i is 0
				@hair_x_scales[i] += (-@real_facing_x - hxs) / 3
			else
				# x = @real_facing_x * i/@hair_x_scales.length * 2
				# @hair_x_scales[i] += (@hair_x_scales[i-1] + x - hxs) / 2
				# @hair_x_scales[i] += (x - hxs) / 2
				@hair_x_scales[i] += (@hair_x_scales[i-1] - hxs) / 3
			
			ctx.save()
			ctx.scale(hxs, 1)
			ctx.fillStyle = hair_color
			r = @hair_x_scales[i] * @vx / 45 - Math.max(0, @smoothed_vy/25)
			l = 5
			w = 1
			ctx.rotate(r)
			ctx.fillRect(0-w, -2, 5+w, l)
			ctx.translate(0, l)
			ctx.rotate(r)
			ctx.fillRect(1-w, -2, 4+w, l)
			ctx.translate(0, l)
			ctx.rotate(r)
			ctx.fillRect(2-w, -2, 3+w, l)
			ctx.translate(0, l)
			ctx.rotate(r)
			ctx.fillRect(3-w, -2, 2+w, l)
			ctx.translate(0, l)
			ctx.restore()
		
		ctx.restore()
		
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
		# Also, it's weird that the eyes are defined in terms of the hair... but it was easy!
		# @hair_x_scales is basically different smoothing functions on the facing direction — including delay.
		ctx.arc(0, 0, 5.5*0.9, 0, TAU)
		ctx.clip()
		ctx.beginPath()
		ctx.arc(@hair_x_scales[0] * 5, -1, 1, 0, TAU)
		ctx.fillStyle = eye_color
		ctx.fill()
		ctx.beginPath()
		ctx.arc(@hair_x_scales[2] * 1, -1, 1, 0, TAU)
		ctx.fillStyle = eye_color
		ctx.fill()
		# /head
		ctx.restore()
