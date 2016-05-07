
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
		torso_angle = Math.atan2(hip.y - neck.y, hip.x - neck.x) - Math.PI/2
		# left_leg_angle = Math.atan2(upper_left_leg.y - hip.y, upper_left_leg.x - hip.x) #- Math.PI/2
		# right_leg_angle = Math.atan2(upper_right_leg.y - hip.y, upper_right_leg.x - hip.x) #- Math.PI/2
		ctx.rotate(torso_angle)
		dx = hip.x - neck.x
		dy = hip.y - neck.y
		dist = Math.sqrt(dx * dx + dy * dy)
		# ctx.moveTo(-5, 0)
		# ctx.lineTo(+5, 0)
		ctx.moveTo(-3, 0)
		ctx.lineTo(+3, 0)
		# ctx.lineTo(+10, dist + 5)
		# ctx.lineTo(-10, dist + 5)
		# ctx.lineTo(+3 + 8 * Math.cos(left_leg_angle), dist + 5 * Math.sin(left_leg_angle))
		# ctx.lineTo(-3 + 8 * Math.cos(right_leg_angle), dist + 5 * Math.sin(right_leg_angle))
		
		# # left_leg_angle = Math.atan2(upper_left_leg.y - hip.y, upper_left_leg.x - hip.x) - torso_angle
		# # right_leg_angle = Math.atan2(upper_right_leg.y - hip.y, upper_right_leg.x - hip.x) - torso_angle
		# # # left_leg_angle = Math.min(1, Math.max(-1, left_leg_angle))
		# # ctx.lineTo(+3 + 8 * Math.cos(left_leg_angle), dist + 5 * Math.sin(left_leg_angle))
		# # ctx.lineTo(-3 + 8 * Math.cos(right_leg_angle), dist + 5 * Math.sin(right_leg_angle))
		# leg_angle_1 = Math.atan2(upper_left_leg.y - hip.y, upper_left_leg.x - hip.x) - torso_angle
		# leg_angle_2 = Math.atan2(upper_right_leg.y - hip.y, upper_right_leg.x - hip.x) - torso_angle
		# min_leg_angle = Math.min(leg_angle_1, leg_angle_2)
		# max_leg_angle = Math.max(leg_angle_1, leg_angle_2)
		# # # min_leg_angle = Math.max(min_leg_angle, 0)
		# # # max_leg_angle = Math.min(max_leg_angle, 0)
		# # console.log min_leg_angle, max_leg_angle
		# 
		# # ctx.lineTo(+3 + 8 * Math.cos(min_leg_angle), dist + 5 * Math.sin(min_leg_angle))
		# # ctx.lineTo(-3 + 8 * Math.cos(max_leg_angle), dist + 5 * Math.sin(max_leg_angle))
		# # ctx.lineTo(+3 + Math.max(0, 8 * Math.cos(min_leg_angle)), dist + 5 * Math.sin(min_leg_angle))
		# # ctx.lineTo(-3 + Math.min(0, 8 * Math.cos(max_leg_angle)), dist + 5 * Math.sin(max_leg_angle))
		# ctx.lineTo(+3 + Math.max(0, 8 * Math.cos(min_leg_angle)), dist + Math.max(3, 5 * Math.sin(min_leg_angle)))
		# ctx.lineTo(-3 + Math.min(0, 8 * Math.cos(max_leg_angle)), dist + Math.max(3, 5 * Math.sin(max_leg_angle)))
		# # ctx.lineTo(-8 + right_leg_angle, dist + 5)
		
		leg_angle_1 = Math.atan2(upper_left_leg.y - hip.y, upper_left_leg.x - hip.x) - torso_angle
		leg_angle_2 = Math.atan2(upper_right_leg.y - hip.y, upper_right_leg.x - hip.x) - torso_angle
		
		min_cos = Math.min(Math.cos(leg_angle_1), Math.cos(leg_angle_2))
		max_cos = Math.max(Math.cos(leg_angle_1), Math.cos(leg_angle_2))
		min_sin = Math.min(Math.sin(leg_angle_1), Math.sin(leg_angle_2))
		max_sin = Math.max(Math.sin(leg_angle_1), Math.sin(leg_angle_2))
		# ctx.lineTo(+3 + Math.max(0, 10 * max_cos), dist + Math.max(5, 7 * max_sin))
		# ctx.lineTo(-3 + Math.min(0, 10 * min_cos), dist + Math.max(5, 7 * max_sin))
		# ctx.lineTo(+4, dist/2)
		# ctx.lineTo(+4 + Math.max(0, 9 * max_cos), dist + Math.max(5, 7 * max_sin))
		# ctx.lineTo(-4 + Math.min(0, 9 * min_cos), dist + Math.max(5, 7 * max_sin))
		# ctx.lineTo(-4, dist/2)
		ctx.lineTo(+4 + Math.max(0, 1 * max_cos), dist/2)
		ctx.lineTo(+4 + Math.max(0, 9 * max_cos), dist + Math.max(5, 7 * max_sin))
		ctx.lineTo(-4 + Math.min(0, 9 * min_cos), dist + Math.max(5, 7 * max_sin))
		ctx.lineTo(-4 + Math.min(0, 1 * min_cos), dist/2)

		ctx.restore()
		ctx.closePath()
		# neck
		# hip
		ctx.fillStyle = "#ddffff"
		ctx.fill()
		
		# head
		ctx.save()
		ctx.beginPath()
		ctx.translate(head.x, head.y)
		ctx.rotate(Math.atan2(head.y - neck.y, head.x - neck.x) - Math.PI/2)
		ctx.scale(0.9, 1)
		ctx.arc(0, 0, 6, 0, Math.PI * 2)
		ctx.fillStyle = "#6B422C" # "#C15723" #"brown"
		ctx.fill()
		ctx.restore()
