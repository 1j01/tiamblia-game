
keys = {}
addEventListener "keydown", (e)->
	keys[e.keyCode] = true
	console.log e.keyCode
addEventListener "keyup", (e)->
	delete keys[e.keyCode]

class @Player extends SimpleActor
	addEntityClass(@)
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
		# FIXME: arms are too long compared to legs
		# TODO: add some constraints to hips, shoulders, and neck
		# TODO: min/max_length for psuedo-3D purposes
		@bbox_padding = 10
	
	step: ->
		left = keys[65]? or keys[37]?
		right = keys[68]? or keys[39]?
		@jump = keys[87]? or keys[38]?
		# TODO: press to jump
		# TODO: gamepad support
		# TODO: configurable controls
		@move_x = right - left
		super
	
	draw: (ctx)->
		ctx.scale(-1, 1) if @facing_x > 0
		{head, sternum, pelvis, "left knee": left_knee, "right knee": right_knee, "left shoulder": left_shoulder, "right shoulder": right_shoulder} = @structure.points
		# ^that's kinda ugly, should we just name segments and points with underscores instead of spaces?
		# or should I just alias structure.points as a one-char-var and to p["left sholder"]? that's probably good
		
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = 3
			ctx.lineCap = "round"
			ctx.strokeStyle = "#6B422C"
			ctx.stroke()
		
		# TODO: depth
		# @drawStructure
		# 	segments:
		# 		torso: ->
		# 	points:
		# 		head: ->
		
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
		ctx.fillStyle = "#AAFFFF"
		ctx.fill()
		ctx.restore()
		
		# head
		ctx.save()
		ctx.beginPath()
		ctx.translate(head.x, head.y)
		ctx.rotate(atan2(head.y - sternum.y, head.x - sternum.x) - TAU/4)
		ctx.scale(0.9, 1)
		ctx.arc(0, 0, 5.5, 0, TAU)
		ctx.fillStyle = "#6B422C"
		ctx.fill()
		ctx.restore()
