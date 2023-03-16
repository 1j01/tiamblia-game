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

average = (v) ->
	return v.reduce(((a,b) => a+b), 0)/v.length

smoothOut = (array, variance) ->
	t_average = average(array)*variance
	ret = new Array(array.length)
	for i in [0...array.length]
		do ->
			prev = if i > 0 then ret[i-1] else array[i]
			next = if i < array.length then array[i] else array[i-1]
			ret[i] = average([t_average, average([prev, array[i], next])])
	return ret

module.exports = class Caterpillar extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		# relying on key order, so points & segments must not be named with simple numbers,
		# since numeric keys are sorted before other keys
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
		
		points_list = Object.values(@structure.points)
		for point, point_index in points_list
			point.vx = 0
			point.vy = 0
			point.attachment = null
			point.radius = 5 - point_index*0.1
			point.away_from_ground = {x: 0, y: 0}
			point.smoothed_normal = {x: 0, y: 0}
		
		@structure.points.head.radius = 7
		
		@bbox_padding = 15
	
	initLayout: ->
		for segment_name, segment of @structure.segments
			segment.b.x = segment.a.x + segment.length

	step: (world)->
		points_list = Object.values(@structure.points)
		segments_list = Object.values(@structure.segments)

		# stop at end of the world
		for point in points_list
			if point.y + @y > 400
				return
		
		# reset/init
		for point in points_list
			point.fx = 0
			point.fy = 0
			point.away_from_ground ?= {x: 0, y: 0}
			point.smoothed_normal ?= {x: 0, y: 0}

		# smooth out away_from_ground normals, making the caterpillar
		# hopefully pick a side of a tree branch to be on
		variance = 1
		smoothed_normals_x = smoothOut((point.away_from_ground.x for point in points_list), variance)
		smoothed_normals_y = smoothOut((point.away_from_ground.y for point in points_list), variance)
		for point, point_index in points_list
			point.away_from_ground.x = smoothed_normals_x[point_index]
			point.away_from_ground.y = smoothed_normals_y[point_index]
		
		# move
		collision = (point)=> world.collision(@toWorld(point), types: (entity)=>
			entity.constructor.name not in ["Arrow", "Bow", "Water", "Caterpillar"]
		)
		t = performance.now()/1000
		for point, point_index in points_list
			otherwise_attached = 0
			for other_point in points_list when other_point isnt point
				if other_point.attachment
					otherwise_attached += 1
			# lift_feet = Math.sin(t + point_index/points_list.length*Math.PI) < 0 and otherwise_attached >= 2
			# if point_index > 3 and point_index < points_list.length - 3
			# 	lift_feet = true # don't let the middle of the caterpillar act as feet
			dist_to_previous = if point_index > 0 then Math.hypot(point.x - points_list[point_index-1].x, point.y - points_list[point_index-1].y) else 0
			lift_feet = dist_to_previous > 10 # in case it's stretching out a lot, release some constraints
			lift_feet = true if point_index is 0 # head doesn't have feet
			if lift_feet
				point.attachment = null
			attachment_entity = if point.attachment then world.getEntityByID(point.attachment.entity_id)
			if attachment_entity
				attachment_world = attachment_entity.toWorld(point.attachment.point)
				attachment_local = @fromWorld(attachment_world)
				crawl_speed = 0 + 2 * (otherwise_attached > 4) # also affected by fixity parameter
				# Reverse crawl direction if point.attachment.ground_angle points head-to-tail
				# (or more specifically, along the head-to-second-point vector)
				head_heading = Math.atan2(points_list[0].y - points_list[1].y, points_list[0].x - points_list[1].x)
				if Math.cos(point.attachment.ground_angle - head_heading) < 0
					crawl_speed *= -1

				# point.x = attachment_local.x
				# point.y = attachment_local.y
				# Move attachment point along the ground, using ground angle.
				# Test multiple angles in order to wrap around corners.
				for angle_offset in [TAU/5..-TAU/5] by -TAU/15
				# for angle_offset in [TAU/3..-TAU/3] by -TAU/10
					part_in_world = @toWorld(point)
					forward_vector = {
						x: Math.cos(point.attachment.ground_angle + angle_offset) * crawl_speed
						y: Math.sin(point.attachment.ground_angle + angle_offset) * crawl_speed
					}
					# search towards the ground, in the direction it was last found
					leg_length = point.radius + 2 # WET
					leg_vector = {
						x: -point.away_from_ground.x * leg_length
						y: -point.away_from_ground.y * leg_length
					}
					test_point_world = {
						x: part_in_world.x + forward_vector.x + leg_vector.x
						y: part_in_world.y + forward_vector.y + leg_vector.y
					}

					hit = world.collision(test_point_world, types: (entity)=>
						entity.constructor.name not in ["Arrow", "Bow", "Water", "Caterpillar"]
					)
					if hit
						# Project the point back to the surface of the ground.
						# This is done by finding the closest point on the polygon's edges.
						closest_distance = Infinity
						closest_segment = null
						point_in_hit_space = hit.fromWorld(test_point_world)
						for segment_name, segment of hit.structure.segments
							dist = distanceToLineSegment(point_in_hit_space, segment.a, segment.b)
							if dist < closest_distance and Math.hypot(segment.a.x - segment.b.x, segment.a.y - segment.b.y) > 0.1
								closest_distance = dist
								closest_segment = segment
						if closest_segment
							closest_point_in_hit_space = closestPointOnLineSegment(point_in_hit_space, closest_segment.a, closest_segment.b)
							closest_point_world = hit.toWorld(closest_point_in_hit_space)
							closest_point_local = @fromWorld(closest_point_world)

							# point.x = closest_point_local.x
							# point.y = closest_point_local.y
							unless lift_feet
								ground_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x)
								if isNaN(ground_angle)
									console.warn("ground_angle is NaN")
									ground_angle = 0
								candidates =
									for side in [0, 1]
										normal_angle = ground_angle + TAU/4
										normal_angle += TAU/2 if side
										normal = {
											x: Math.cos(normal_angle)
											y: Math.sin(normal_angle)
										}
										attachment_hit_space = {
											x: closest_point_in_hit_space.x + normal.x * leg_length
											y: closest_point_in_hit_space.y + normal.y * leg_length
										}
										attachment_hit_space.score = Math.hypot(attachment_hit_space.x - point_in_hit_space.x, attachment_hit_space.y - point_in_hit_space.y)
										attachment_hit_space.normal = normal
										attachment_hit_space
								candidates.sort((a, b)=> b.score - a.score)
								attachment_hit_space = candidates[0]
								point.attachment = {entity_id: hit.id, point: attachment_hit_space, ground_angle}
								point.away_from_ground = attachment_hit_space.normal
							break
				
				if not hit and otherwise_attached >= 2
					point.attachment = null
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
					point_world = @toWorld(point)
					point_in_hit_space = hit.fromWorld(point_world)
					for segment_name, segment of hit.structure.segments
						dist = distanceToLineSegment(point_in_hit_space, segment.a, segment.b)
						if dist < closest_distance and Math.hypot(segment.a.x - segment.b.x, segment.a.y - segment.b.y) > 0.1
							closest_distance = dist
							closest_segment = segment
					if closest_segment
						closest_point_in_hit_space = closestPointOnLineSegment(point_in_hit_space, closest_segment.a, closest_segment.b)
						closest_point_world = hit.toWorld(closest_point_in_hit_space)
						closest_point_local = @fromWorld(closest_point_world)
						normal = {x: closest_point_world.x - point_world.x, y: closest_point_world.y - point_world.y}
						normal_length = Math.hypot(normal.x, normal.y)
						normal.x /= normal_length
						normal.y /= normal_length
						unless isFinite(normal.x) and isFinite(normal.y)
							console.warn("NaN in normal")
							normal = {x: 0, y: 0}

						point.x = closest_point_local.x
						point.y = closest_point_local.y
						unless lift_feet
							ground_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x)
							if isNaN(ground_angle)
								console.warn("ground_angle is NaN")
								ground_angle = 0
							point.attachment = {entity_id: hit.id, point: closest_point_in_hit_space, ground_angle}
							point.away_from_ground = normal
				else
					point.vy += 0.5
					point.vx *= 0.99
					point.vy *= 0.99
					# @structure.stepLayout({gravity: 0.005, collision})
					# @structure.stepLayout() for [0..10]
					# @structure.stepLayout({collision}) for [0..4]
					point.x += point.vx
					point.y += point.vy
			
			# angular constraint pivoting on this point
			relative_angle = (Math.sin(Math.sin(t)*Math.PI/4) - 0.5) * Math.PI/points_list.length/2
			point.relative_angle = relative_angle
			prev_point = points_list[point_index-1]
			next_point = points_list[point_index+1]
			if prev_point and next_point
				@accumulate_angular_constraint_forces(prev_point, next_point, point, relative_angle)
		
		# apply forces
		for point in points_list
			point.vx += point.fx
			point.vy += point.fy
			point.x += point.fx
			point.y += point.fy

		# Interact with water
		for point in points_list
			water = world.collision(@toWorld(point), types: (entity)=>
				entity.constructor.name is "Water"
			)
			too_far_under_water = water and world.collision(@toWorld({x: point.x, y: point.y - point.radius}), types: (entity)=>
				entity.constructor.name is "Water"
			)
			if water and not too_far_under_water
				# Make ripples in water
				water.makeWaves(@toWorld(point), point.radius, point.vy/2)
				# Skip off water (as if this will ever matter)
				if 4 > point.vy > 2 and Math.abs(point.vx) > 0.4
					point.vy *= -0.3
			# Slow down in water, and buoy
			if water
				point.vx -= point.vx * 0.1
				point.vy -= point.vy * 0.1
				point.vy -= 0.45

		# constrain distances
		for i in [0...4]
			for point, point_index in points_list
				attachment_entity = if point.attachment then world.getEntityByID(point.attachment.entity_id)
				if attachment_entity
					attachment_world = attachment_entity.toWorld(point.attachment.point)
					attachment_local = @fromWorld(attachment_world)
					fixity = 0.1 # also affects crawling speed
					point.x += (attachment_local.x - point.x) * fixity
					point.y += (attachment_local.y - point.y) * fixity
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
					segment.a.vx -= delta_x * 0.5 * diff
					segment.a.vy -= delta_y * 0.5 * diff
					segment.b.vx += delta_x * 0.5 * diff
					segment.b.vy += delta_y * 0.5 * diff
				else
					console.warn("diff is not finite, for Caterpillar distance constraint")
			# self-collision
			for point, point_index in points_list
				for other_point, other_point_index in points_list #when point_index isnt other_point_index
					if Math.abs(point_index - other_point_index) < 3
						continue
					delta_x = point.x - other_point.x
					delta_y = point.y - other_point.y
					delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
					target_min_length = point.radius - other_point.radius
					if delta_length < target_min_length
						diff = (delta_length - target_min_length) / delta_length
						if isFinite(diff)
							diff *= 50
							point.x -= delta_x * 0.5 * diff
							point.y -= delta_y * 0.5 * diff
							other_point.x += delta_x * 0.5 * diff
							other_point.y += delta_y * 0.5 * diff
							point.vx -= delta_x * 0.5 * diff
							point.vy -= delta_y * 0.5 * diff
							other_point.vx += delta_x * 0.5 * diff
							other_point.vy += delta_y * 0.5 * diff
							if Math.random() < 0.5
								point.attachment = null
								other_point.attachment = null
						else
							console.warn("diff is not finite, for Caterpillar self-collision constraint")

	
	accumulate_angular_constraint_forces: (point_a, point_b, pivot, relative_angle)->
		angle_a = Math.atan2(point_a.y - point_b.y, point_a.x - point_b.x)
		angle_b = Math.atan2(pivot.y - point_b.y, pivot.x - point_b.x)
		angle_diff = (angle_a - angle_b) - relative_angle

		# angle_diff *= 0.9
		distance = Math.hypot(point_a.x - point_b.x, point_a.y - point_b.y)
		# distance_a = Math.hypot(point_a.x - pivot.x, point_a.y - pivot.y)
		# distance_b = Math.hypot(point_b.x - pivot.x, point_b.y - pivot.y)
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
		# using individual distances can cause spinning (overall angular momentum from nothing)
		# f_a = f / Math.max(1, Math.max(0, distance_a - 3) ** 1)
		# f_b = f / Math.max(1, Math.max(0, distance_b - 3) ** 1)
		# using the combined distance conserves overall angular momentum,
		# to say nothing of the physicality of the rest of this system
		# but it's a clear difference in zero gravity
		f_a = f / Math.max(1, Math.max(0, distance - 6) ** 1)
		f_b = f / Math.max(1, Math.max(0, distance - 6) ** 1)

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

	draw: (ctx, view, world)->
		color = "green"
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = color
			ctx.stroke()
		# for point, point_index in points_list
		# reverse order to draw head on top
		keys = Object.keys(@structure.points)
		for i in [keys.length-1..0]
			point_name = keys[i]
			point = @structure.points[point_name]
			# legs
			if point_name isnt "head"
				point.smoothed_normal ?= {x: 0, y: 0}
				point.smoothed_normal.x += ((point.away_from_ground?.x ? 0) - point.smoothed_normal.x) * 0.1
				point.smoothed_normal.y += ((point.away_from_ground?.y ? 0) - point.smoothed_normal.y) * 0.1
				leg_length = point.radius + 2 # WET
				ctx.save()
				ctx.translate(point.x, point.y)
				ctx.rotate(Math.sin(performance.now() / 80 + i) * 0.1)
				ctx.beginPath()
				ctx.moveTo(0, 0)
				ctx.lineTo(-point.smoothed_normal.x * leg_length, -point.smoothed_normal.y * leg_length)
				ctx.lineWidth = 1
				ctx.lineCap = "round"
				ctx.strokeStyle = color
				ctx.stroke()
				ctx.restore()
			# body part
			ctx.save()
			ctx.beginPath()
			ctx.arc(point.x, point.y, point.radius, 0, TAU)
			# ctx.fillStyle = if point.attachment then "lime" else color
			# ctx.fillStyle = "hsla(#{(point.relative_angle ? 0) * 10 * 180 / Math.PI}, 100%, 50%, 0.5)"
			# ctx.fillStyle = "hsla(#{(point.relative_angle ? 0) * 10 * 180 / Math.PI}, 100%, 50%, #{if point.attachment then 1 else 0.3})"
			ctx.fillStyle = color
			ctx.fill()
			ctx.clip()
			# highlight
			ctx.beginPath()
			ctx.arc(point.x + point.radius/3, point.y - point.radius/3, point.radius/2, 0, TAU)
			# ctx.fillStyle = "rgba(255, 255, 155, 0.5)"
			ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
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
		
		for point in Object.values(@structure.points)
			if (try localStorage["tiamblia.debug_caterpillar"]) is "true"
				# draw line from point to attachment
				if point.attachment
					entity = world.getEntityByID(point.attachment.entity_id)
					attachment_local = @fromWorld(entity.toWorld(point.attachment.point))
					ctx.beginPath()
					ctx.moveTo(point.x, point.y)
					ctx.lineTo(attachment_local.x, attachment_local.y)
					ctx.lineWidth = 1
					ctx.lineCap = "round"
					ctx.strokeStyle = "red"
					ctx.stroke()
				# draw normal
				if point.away_from_ground
					ctx.beginPath()
					ctx.moveTo(point.x, point.y)
					ctx.lineTo(point.x + point.away_from_ground.x * 10, point.y + point.away_from_ground.y * 10)
					ctx.lineWidth = 1
					ctx.lineCap = "round"
					ctx.strokeStyle = "lime"
					ctx.stroke()

