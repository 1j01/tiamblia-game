Entity = require("./abstract/Entity.coffee")
{addEntityClass} = require("skele2d")
{distanceToLineSegment} = require("skele2d").helpers
TAU = Math.PI * 2

closestPointOnLineSegment = (point, a, b)->
	# https://stackoverflow.com/a/3122532/2624876
	a_to_p = {x: point.x - a.x, y: point.y - a.y}
	a_to_b = {x: b.x - a.x, y: b.y - a.y}
	atb2 = a_to_b.x**2 + a_to_b.y**2
	atp_dot_atb = a_to_p.x*a_to_b.x + a_to_p.y*a_to_b.y
	t = atp_dot_atb / atb2
	return {x: a.x + a_to_b.x*t, y: a.y + a_to_b.y*t}

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
		t = performance.now()/500
		for point_name, point of @structure.points
			point.fx = 0
			point.fy = 0
		for point_name, point of @structure.points
			otherwise_attached = false
			for other_point_name, other_point of @structure.points when other_point_name isnt point_name
				if other_point.attachment
					otherwise_attached = true
					break
			lift_feet = Math.sin(t + point_index/3) < 0 and otherwise_attached
			if lift_feet
				point.attachment = null
			attachment_entity = if point.attachment then world.getEntityByID(point.attachment.entity_id)
			if attachment_entity
				attachment_world = attachment_entity.toWorld(point.attachment.point)
				attachment_local = @fromWorld(attachment_world)
				point.x = attachment_local.x
				point.y = attachment_local.y
			else
				# point.x += point.vx
				# point.y += point.vy
				hit = collision(point)
				if hit
					point.vx = 0
					point.vy = 0

					# Project the point back to the surface of the ground.
					# This is done by finding the closest point on the polygon's edges.
					closest_distance = Infinity
					closest_segment = null
					point_in_hit_space = hit.fromWorld(@toWorld(point))
					for segment_name, segment of hit.structure.segments
						dist = distanceToLineSegment(point_in_hit_space, segment.a, segment.b)
						if dist < closest_distance
							closest_distance = dist
							closest_segment = segment
					if closest_segment
						closest_point_in_hit_space = closestPointOnLineSegment(point_in_hit_space, closest_segment.a, closest_segment.b)
						closest_point_local = @fromWorld(hit.toWorld(closest_point_in_hit_space))
						point.x = closest_point_local.x
						point.y = closest_point_local.y

					unless lift_feet
						point.attachment = {entity_id: hit.id, point: hit.fromWorld(@toWorld(point))}
				else
					point.vy += 0.05
					# @structure.stepLayout({gravity: 0.005, collision})
					# @structure.stepLayout() for [0..10]
					# @structure.stepLayout({collision}) for [0..4]
					point.x += point.vx
					point.y += point.vy
			
			# angular constraint pivoting on this point
			relative_angle = Math.sin(Math.sin(t)*Math.PI/4) * Math.PI/5
			prev_point = Object.values(@structure.points)[point_index-1]
			next_point = Object.values(@structure.points)[point_index+1]
			if prev_point and next_point
				@accumulate_angular_constraint_forces(prev_point, next_point, point, relative_angle)

			point_index += 1
		
		# apply forces
		for point_name, point of @structure.points
			point.vx += point.fx
			point.vy += point.fy

		# constrain distances
		for i in [0...4]
			for point_name, point of @structure.points
				attachment_entity = if point.attachment then world.getEntityByID(point.attachment.entity_id)
				if attachment_entity
					attachment_world = attachment_entity.toWorld(point.attachment.point)
					attachment_local = @fromWorld(attachment_world)
					point.x = attachment_local.x
					point.y = attachment_local.y
			for segment_name, segment of @structure.segments
				delta_x = segment.a.x - segment.b.x
				delta_y = segment.a.y - segment.b.y
				delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
				diff = (delta_length - segment.length) / delta_length
				if isFinite(diff)
					segment.a.x -= delta_x * 0.5 * diff
					segment.a.y -= delta_y * 0.5 * diff
					segment.b.x += delta_x * 0.5 * diff
					segment.b.y += delta_y * 0.5 * diff
				else
					console.warn("diff is not finite, for Caterpillar distance constraint")

	
	accumulate_angular_constraint_forces: (point_a, point_b, pivot, relative_angle)->
		angle_a = Math.atan2(point_a.y - point_b.y, point_a.x - point_b.x)
		angle_b = Math.atan2(pivot.y - point_b.y, pivot.x - point_b.x)
		angle_diff = (angle_a - angle_b) - relative_angle

		# angle_diff *= 0.9
		# distance = Math.hypot(point_a.x - point_b.x, point_a.y - point_b.y)
		distance_a = Math.hypot(point_a.x - pivot.x, point_a.y - pivot.y)
		distance_b = Math.hypot(point_b.x - pivot.x, point_b.y - pivot.y)
		# angle_diff /= Math.max(1, (distance / 5) ** 2.4)

		old_point_a = {x: point_a.x, y: point_a.y}
		old_point_b = {x: point_b.x, y: point_b.y}

		# Rotate around pivot.
		rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]]
		rot_matrix_inverse = [[Math.cos(-angle_diff), Math.sin(-angle_diff)], [-Math.sin(-angle_diff), Math.cos(-angle_diff)]]
		for point in [point_a, point_b]
			# Translate and rotate.
			[point.x, point.y] = [point.x, point.y].map((value, index) =>
				(if point is point_a then rot_matrix else rot_matrix_inverse)[index][0] * (point.x - pivot.x) +
				(if point is point_a then rot_matrix else rot_matrix_inverse)[index][1] * (point.y - pivot.y)
			)
			# Translate back.
			point.x += pivot.x
			point.y += pivot.y

		f = 0.5
		f_a = f / Math.max(1, distance_a)
		f_b = f / Math.max(1, distance_b)

		# Turn difference in position into velocity.
		point_a.fx += (point_a.x - old_point_a.x) * f_a unless point_a.attachment
		point_a.fy += (point_a.y - old_point_a.y) * f_a unless point_a.attachment
		point_b.fx += (point_b.x - old_point_b.x) * f_b unless point_b.attachment
		point_b.fy += (point_b.y - old_point_b.y) * f_b unless point_b.attachment

		# Opposite force on pivot.
		pivot.fx -= (point_a.x - old_point_a.x) * f_a unless pivot.attachment
		pivot.fy -= (point_a.y - old_point_a.y) * f_a unless pivot.attachment
		pivot.fx -= (point_b.x - old_point_b.x) * f_b unless pivot.attachment
		pivot.fy -= (point_b.y - old_point_b.y) * f_b unless pivot.attachment

		# Restore old position.
		point_a.x = old_point_a.x
		point_a.y = old_point_a.y
		point_b.x = old_point_b.x
		point_b.y = old_point_b.y

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
			# ctx.fillStyle = if point.attachment then "lime" else color
			ctx.fillStyle = color
			ctx.fill()
			ctx.clip()
			# highlight
			ctx.beginPath()
			ctx.arc(point.x + point.radius/3, point.y - point.radius/3, point.radius/2, 0, TAU)
			ctx.fillStyle = "rgba(255, 255, 155, 0.5)"
			ctx.fill()
			ctx.restore()
			# eye
			if point_name is "head"
				ctx.beginPath()
				ctx.arc(point.x, point.y, point.radius/2, 0, TAU)
				ctx.fillStyle = "black"
				ctx.fill()
				# highlight
				ctx.beginPath()
				ctx.arc(point.x + point.radius/6, point.y - point.radius/6, point.radius/5, 0, TAU)
				ctx.fillStyle = "white"
				ctx.fill()
