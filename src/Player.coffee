
class @Player extends Entity
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
			name: "upper left arm"
			length: 10
		)
		@structure.addSegment(
			from: "neck"
			name: "upper right arm"
			length: 10
		)
		@structure.addSegment(
			from: "upper left arm"
			name: "lower left arm"
			length: 10
		)
		@structure.addSegment(
			from: "upper right arm"
			name: "lower right arm"
			length: 10
		)
		@structure.addSegment(
			from: "neck"
			name: "hip"
			length: 20
		)
		@structure.addSegment(
			from: "hip"
			name: "upper left leg"
			length: 10
		)
		@structure.addSegment(
			from: "hip"
			name: "upper right leg"
			length: 10
		)
		@structure.addSegment(
			from: "upper left leg"
			name: "lower left leg"
			length: 10
		)
		@structure.addSegment(
			from: "upper right leg"
			name: "lower right leg"
			length: 10
		)
	
	draw: (ctx)->
		{head, neck, hip} = @structure.points
		upper_left_leg = @structure.points["upper left leg"]
		upper_right_leg = @structure.points["upper right leg"]
		
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = 3
			ctx.lineCap = "round"
			ctx.strokeStyle = "#6B422C"
			ctx.stroke()
		
		# dress
		ctx.beginPath()
		ctx.save()
		ctx.translate(neck.x, neck.y)
		torso_angle = atan2(hip.y - neck.y, hip.x - neck.x) - TAU/4
		dx = hip.x - neck.x
		dy = hip.y - neck.y
		torso_length = sqrt(dx * dx + dy * dy)
		ctx.rotate(torso_angle)
		leg_angle_1 = atan2(upper_left_leg.y - hip.y, upper_left_leg.x - hip.x) - torso_angle
		leg_angle_2 = atan2(upper_right_leg.y - hip.y, upper_right_leg.x - hip.x) - torso_angle
		ctx.moveTo(-3, 0)
		ctx.lineTo(+3, 0)
		min_cos = min(cos(leg_angle_1), cos(leg_angle_2))
		max_cos = max(cos(leg_angle_1), cos(leg_angle_2))
		min_sin = min(sin(leg_angle_1), sin(leg_angle_2))
		max_sin = max(sin(leg_angle_1), sin(leg_angle_2))
		ctx.lineTo(+4 + max(0, 1 * max_cos), torso_length/2)
		ctx.lineTo(+4 + max(0, 9 * max_cos), torso_length + max(5, 7 * max_sin))
		ctx.lineTo(-4 + min(0, 9 * min_cos), torso_length + max(5, 7 * max_sin))
		ctx.lineTo(-4 + min(0, 1 * min_cos), torso_length/2)
		ctx.fillStyle = "#ddffff"
		ctx.fill()
		ctx.restore()
		
		# head
		ctx.save()
		ctx.beginPath()
		ctx.translate(head.x, head.y)
		ctx.rotate(atan2(head.y - neck.y, head.x - neck.x) - TAU/4)
		ctx.scale(0.9, 1)
		ctx.arc(0, 0, 6, 0, TAU)
		ctx.fillStyle = "#6B422C"
		ctx.fill()
		ctx.restore()
