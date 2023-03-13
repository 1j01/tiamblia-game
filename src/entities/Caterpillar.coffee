Entity = require("./abstract/Entity.coffee")
{addEntityClass} = require("skele2d")
{distance} = require("skele2d").helpers
TAU = Math.PI * 2

module.exports = class Caterpillar extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		# relying on key order, so points must not be named with simple numbers
		# as numeric keys are sorted before other keys
		@structure.addPoint("head")
		previous = "head"
		for i in [1...10]
			previous = @structure.addSegment(
				from: previous
				to: "part_#{i}"
				name: "part_#{i}"
				length: 5
				width: 4
			)
		
		i = 0
		for point_name, point of @structure.points
			point.vx = 0
			point.vy = 0
			point.attachment = null
			point.radius = 5 - i*0.1
			i += 1
		
		@structure.points.head.radius = 7
		
		@bbox_padding = 15
	
	initLayout: ->
		for segment_name, segment of @structure.segments
			segment.b.x = segment.a.x + segment.length

	step: (world)->
		# stop at end of the world
		for point_name, point of @structure.points
			if point.y > 400
				return
		
		# move
		collision = (point)=> world.collision(@toWorld(point))
		point_index = 0
		for point_name, point of @structure.points
			if point.attachment
				attachment_world = point.attachment.entity.toWorld(point.attachment.point)
				attachment_local = @fromWorld(attachment_world)
				point.x = attachment_local.x
				point.y = attachment_local.y
			else
				# point.x += point.vx
				# point.y += point.vy
				ground = collision(point)
				if ground
					point.vx = 0
					point.vy = 0
					point.attachment = {entity: ground, point: ground.fromWorld(@fromWorld(point))}
				else
					# point.vy += 0.5
					@structure.stepLayout({gravity: 0.005, collision})
					# @structure.stepLayout() for [0..10]
					# @structure.stepLayout({collision}) for [0..4]
					
					# angular constraint pivoting on this point
					relative_angle = Math.sin(performance.now()/1000) * Math.PI/10
					prev_point = Object.values(@structure.points)[point_index-1]
					next_point = Object.values(@structure.points)[point_index+1]
					if prev_point and next_point
						@constrain_angle(prev_point, next_point, point, relative_angle)

			point_index += 1
	
	constrain_angle: (point_a, point_b, pivot, relative_angle)->
		angle_a = Math.atan2(point_a.y - point_b.y, point_a.x - point_b.x)
		angle_b = Math.atan2(pivot.y - point_b.y, pivot.x - point_b.x)
		angle_diff = (angle_a - angle_b) - relative_angle

		angle_diff *= 0.1

		# Rotate around pivot.
		rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]]
		for point in [point_a, point_b]
			# Translate and rotate.
			[point.x, point.y] = [point.x, point.y].map((value, index) =>
				rot_matrix[index][0] * (point.x - pivot.x) +
				rot_matrix[index][1] * (point.y - pivot.y)
			)
			# Translate back.
			point.x += pivot.x
			point.y += pivot.y

	draw: (ctx)->
		color = "green"
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = color
			ctx.stroke()
		# for point_name, point of @structure.points
		# reverse order to draw head on top
		keys = Object.keys(@structure.points)
		for i in [keys.length-1..0]
			point_name = keys[i]
			point = @structure.points[point_name]
			# body part
			ctx.save()
			ctx.beginPath()
			ctx.arc(point.x, point.y, point.radius, 0, TAU)
			ctx.fillStyle = color
			ctx.fill()
			ctx.clip()
			# highlight
			ctx.beginPath()
			ctx.arc(point.x + point.radius/3, point.y - point.radius/3, point.radius/2, 0, TAU)
			ctx.fillStyle = "rgba(255, 255, 155, 0.5)"
			ctx.fill()
			ctx.restore()
