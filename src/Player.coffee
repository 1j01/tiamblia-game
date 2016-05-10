
class @Player extends Entity
	add_Entity_class(@)
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
			name: "left sholder"
			length: 2
		)
		@structure.addSegment(
			from: "sternum"
			name: "right sholder"
			length: 2
		)
		@structure.addSegment(
			from: "left sholder"
			to: "left elbo"
			name: "upper left arm"
			length: 10
		)
		@structure.addSegment(
			from: "right sholder"
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
			to: "hip"
			name: "torso"
			length: 20
		)
		@structure.addSegment(
			from: "hip"
			to: "left knee"
			name: "upper left leg"
			length: 10
		)
		@structure.addSegment(
			from: "hip"
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
	
	draw: (ctx)->
		{head, sternum, hip, "left knee": left_knee, "right knee": right_knee, "left sholder": left_sholder, "right sholder": right_sholder} = @structure.points
		
		# sternum ?= {x: 0, y: 0}
		# left_sholder ?= {x: 0, y: 0}
		# right_sholder ?= {x: 0, y: 0}
		
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
		ctx.translate(sternum.x, sternum.y)
		torso_angle = atan2(hip.y - sternum.y, hip.x - sternum.x) - TAU/4
		dx = hip.x - sternum.x
		dy = hip.y - sternum.y
		torso_length = sqrt(dx * dx + dy * dy)
		ctx.rotate(torso_angle)
		leg_angle_1 = atan2(left_knee.y - hip.y, left_knee.x - hip.x) - torso_angle
		leg_angle_2 = atan2(right_knee.y - hip.y, right_knee.x - hip.x) - torso_angle
		sholder_angle_1 = atan2(left_sholder.y - sternum.y, left_sholder.x - sternum.x) - torso_angle
		sholder_angle_2 = atan2(right_sholder.y - sternum.y, right_sholder.x - sternum.x) - torso_angle
		sholder_distance = distance(left_sholder, sternum)
		min_cos = min(cos(sholder_angle_1), cos(sholder_angle_2))
		max_cos = max(cos(sholder_angle_1), cos(sholder_angle_2))
		# ctx.lineTo(+3 + max(0, 1 * max_cos), sin(sholder_angle_1))
		# ctx.lineTo(-3 + min(0, 1 * min_cos), sin(sholder_angle_2))
		# ctx.lineTo(-3, sin(sholder_angle_2))
		# ctx.lineTo(+3, sin(sholder_angle_1))
		ctx.lineTo(-2 + min(0, 1 * min_cos), sin(sholder_angle_2) * sholder_distance - 1.5)
		ctx.lineTo(+2 + max(0, 1 * max_cos), sin(sholder_angle_1) * sholder_distance - 1.5)
		# ctx.lineTo(-2 + min(0, 1 * min_cos), sin(sholder_angle_2) - 1)
		# ctx.lineTo(+2 + max(0, 1 * max_cos), sin(sholder_angle_1) - 1)
		# ctx.moveTo(-3, 0)
		# ctx.lineTo(+3, 0)
		min_cos = min(cos(leg_angle_1), cos(leg_angle_2))
		max_cos = max(cos(leg_angle_1), cos(leg_angle_2))
		min_sin = min(sin(leg_angle_1), sin(leg_angle_2))
		max_sin = max(sin(leg_angle_1), sin(leg_angle_2))
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
