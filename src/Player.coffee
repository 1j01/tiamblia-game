
class @Player extends SimpleActor
	addEntityClass(@)
	Entity.initAnimation(@)
	constructor: ->
		super
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
		# FIXME: arms are too long compared to legs
		# TODO: add some constraints to hips, shoulders, and neck
		# TODO: min/max_length for psuedo-3D purposes
		@bbox_padding = 10
		
		@run_animation_position = 0
		@idle_animation_position = 0
		@idle_timer = 0
		@smoothed_vy = 0
		@hair_x_scales = [1,1,1,1,1,1,1,1,1]
	
	step: ->
		left = keyboard.isHeld("A") or keyboard.isHeld("left")
		right = keyboard.isHeld("D") or keyboard.isHeld("right")
		@jump = keyboard.wasPressed("W") or keyboard.wasPressed("up")
		# TODO: gamepad support
		# TODO: configurable controls
		@move_x = right - left
		super
		
		if @move_x is 0
			@idle_timer += 1
			idle_animation = Player.animations["Sorta Dance"]
			if @idle_timer > 100 and idle_animation
				@idle_animation_position += 1 / 10
				new_pose = Pose.lerpAnimationLoop(idle_animation, @idle_animation_position)
				if (@idle_animation_position / idle_animation.length) % 4 < 2
					@facing_x = -1
				else
					@facing_x = +1
			else
				new_pose = Player.poses["Stand"] ? @structure.getPose()
		else
			@idle_timer = 0
			if Player.animations["Run"]
				@run_animation_position += @move_x / 5
				new_pose = Pose.lerpAnimationLoop(Player.animations["Run"], @run_animation_position)
			else
				@structure.getPose()
		
		new_pose =
			if @facing_x < 0
				Pose.horizontallyFlip(new_pose)
			else
				new_pose
		
		@structure.setPose(Pose.lerp(@structure.getPose(), new_pose, 0.3))
	
	draw: (ctx)->
		{head, sternum, pelvis, "left knee": left_knee, "right knee": right_knee, "left shoulder": left_shoulder, "right shoulder": right_shoulder} = @structure.points
		# ^that's kinda ugly, should we just name segments and points with underscores instead of spaces?
		# or should I just alias structure.points as a one-char-var and to p["left sholder"]? that's probably good
		
		skin_color = "#6B422C"
		hair_color = "#000000"
		dress_color = "#AAFFFF"
		
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = 3
			ctx.lineCap = "round"
			ctx.strokeStyle = skin_color
			ctx.stroke()
		
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
		ctx.translate(-@facing_x * 0.3, 0)
		@smoothed_vy += ((@vy * not @grounded) - @smoothed_vy) / 5
		
		for hxs, i in @hair_x_scales by -1
			if i is 0
				@hair_x_scales[i] += (-@facing_x - hxs) / 2
			else
				@hair_x_scales[i] += (@hair_x_scales[i-1] - hxs) / 2
			
			ctx.save()
			# ctx.translate(0,-@height*0.74)
			ctx.scale(hxs, 1)
			ctx.fillStyle = hair_color
			r = @hair_x_scales[i] * @vx / 40 - Math.min(0.5, Math.max(0, @smoothed_vy/20))
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
		
		# dress
		ctx.beginPath()
		ctx.save()
		ctx.translate(sternum.x, sternum.y)
		torso_angle = atan2(pelvis.y - sternum.y, pelvis.x - sternum.x) - TAU/4
		dx = pelvis.x - sternum.x
		dy = pelvis.y - sternum.y
		torso_length = sqrt(dx * dx + dy * dy)
		ctx.rotate(torso_angle)
		left_leg_angle = atan2(left_knee.y - pelvis.y, left_knee.x - pelvis.x) - torso_angle
		right_leg_angle = atan2(right_knee.y - pelvis.y, right_knee.x - pelvis.x) - torso_angle
		left_shoulder_angle = atan2(left_shoulder.y - sternum.y, left_shoulder.x - sternum.x) - torso_angle
		right_shoulder_angle = atan2(right_shoulder.y - sternum.y, right_shoulder.x - sternum.x) - torso_angle
		shoulder_distance = distance(left_shoulder, sternum)
		min_shoulder_cos = min(cos(left_shoulder_angle), cos(right_shoulder_angle))
		max_shoulder_cos = max(cos(left_shoulder_angle), cos(right_shoulder_angle))
		if cos(left_shoulder_angle) < cos(right_shoulder_angle)
			min_cos_shoulder_angle = left_shoulder_angle
			max_cos_shoulder_angle = right_shoulder_angle
		else
			min_cos_shoulder_angle = right_shoulder_angle
			max_cos_shoulder_angle = left_shoulder_angle
		ctx.lineTo(-2 + min(0, 1 * min_shoulder_cos), sin(min_cos_shoulder_angle) * shoulder_distance - 1.5)
		ctx.lineTo(+2 + max(0, 1 * max_shoulder_cos), sin(max_cos_shoulder_angle) * shoulder_distance - 1.5)
		min_cos = min(cos(left_leg_angle), cos(right_leg_angle))
		max_cos = max(cos(left_leg_angle), cos(right_leg_angle))
		min_sin = min(sin(left_leg_angle), sin(right_leg_angle))
		max_sin = max(sin(left_leg_angle), sin(right_leg_angle))
		ctx.lineTo(+4 + max(0, 1 * max_cos), torso_length/2)
		ctx.lineTo(+4 + max(0, 9 * max_cos), torso_length + max(5, 7 * max_sin))
		ctx.lineTo(-4 + min(0, 9 * min_cos), torso_length + max(5, 7 * max_sin))
		ctx.lineTo(-4 + min(0, 1 * min_cos), torso_length/2)
		ctx.fillStyle = dress_color
		ctx.fill()
		ctx.restore()
		
		# head and hair
		ctx.save()
		ctx.translate(head.x, head.y)
		ctx.rotate(atan2(head.y - sternum.y, head.x - sternum.x) - TAU/4)
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
		# /head
		ctx.restore()
