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
		
		parts_list = Object.values(@structure.points)
		for part, part_index in parts_list
			part.vx = 0
			part.vy = 0
			part.attachment = null
			part.radius = 5 - part_index*0.1
			part.away_from_ground = {x: 0, y: 0}
			part.smoothed_normal = {x: 0, y: 0}
		
		@structure.points.head.radius = 7
		
		@bbox_padding = 15
	
	initLayout: ->
		for segment_name, segment of @structure.segments
			segment.b.x = segment.a.x + segment.length

	step: (world)->
		parts_list = Object.values(@structure.points)
		segments_list = Object.values(@structure.segments)

		# stop at end of the world
		for part in parts_list
			if part.y + @y > 400
				return
		
		# reset/init
		for part in parts_list
			part.fx = 0
			part.fy = 0
			part.away_from_ground ?= {x: 0, y: 0}
			part.smoothed_normal ?= {x: 0, y: 0}

		# smooth out away_from_ground normals, making the caterpillar
		# hopefully pick a side of a tree branch to be on
		# variance = 1
		# smoothed_normals_x = smoothOut((part.away_from_ground.x for part in parts_list), variance)
		# smoothed_normals_y = smoothOut((part.away_from_ground.y for part in parts_list), variance)
		# for part, part_index in parts_list
		# 	part.away_from_ground.x = smoothed_normals_x[part_index]
		# 	part.away_from_ground.y = smoothed_normals_y[part_index]
		
		# move
		collision = (point)=> world.collision(@toWorld(point), types: (entity)=>
			entity.constructor.name not in ["Arrow", "Bow", "Water", "Caterpillar"]
		)
		t = performance.now()/1000
		for part, part_index in parts_list
			otherwise_attached = 0
			for other_part in parts_list when other_part isnt part
				if other_part.attachment
					otherwise_attached += 1
			# lift_feet = Math.sin(t + part_index/parts_list.length*Math.PI) < 0 and otherwise_attached >= 2
			# if part_index > 3 and part_index < parts_list.length - 3
			# 	lift_feet = true # don't let the middle of the caterpillar act as feet
			dist_to_previous = if part_index > 0 then Math.hypot(part.x - parts_list[part_index-1].x, part.y - parts_list[part_index-1].y) else 0
			lift_feet = dist_to_previous > 10 # in case it's stretching out a lot, release some constraints
			lift_feet = true if part_index is 0 # head doesn't have feet
			if lift_feet
				part.attachment = null
			attachment_entity = if part.attachment then world.getEntityByID(part.attachment.entity_id)
			if attachment_entity
				attachment_world = attachment_entity.toWorld(part.attachment.point)
				attachment_local = @fromWorld(attachment_world)
				crawl_speed = 0 + 2 * (otherwise_attached > 4) # also affected by fixity parameter
				# Reverse crawl direction if part.attachment.ground_angle points head-to-tail
				# (or more specifically, along the head-to-second-part vector)
				head_heading = Math.atan2(parts_list[0].y - parts_list[1].y, parts_list[0].x - parts_list[1].x)
				if Math.cos(part.attachment.ground_angle - head_heading) < 0
					crawl_speed *= -1

				# part.x = attachment_local.x
				# part.y = attachment_local.y
				# Move attachment point along the ground, using ground angle.
				# Test multiple angles in order to wrap around corners.
				for angle_offset in [TAU/5..-TAU/5] by -TAU/15
				# for angle_offset in [TAU/3..-TAU/3] by -TAU/10
					part_in_world = @toWorld(part)
					forward_vector = {
						x: Math.cos(part.attachment.ground_angle + angle_offset) * crawl_speed
						y: Math.sin(part.attachment.ground_angle + angle_offset) * crawl_speed
					}
					# search towards the ground, in the direction it was last found
					leg_length = part.radius + 2 # WET
					leg_vector = {
						x: -part.away_from_ground.x * leg_length
						y: -part.away_from_ground.y * leg_length
					}
					test_point_world = {
						x: part_in_world.x + forward_vector.x + leg_vector.x
						y: part_in_world.y + forward_vector.y + leg_vector.y
					}

					hit = world.collision(test_point_world, types: (entity)=>
						entity.constructor.name not in ["Arrow", "Bow", "Water", "Caterpillar"]
					)
					if hit
						# Project the part's position back to the surface of the ground.
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

							# part.x = closest_point_local.x
							# part.y = closest_point_local.y
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
								part.attachment = {entity_id: hit.id, point: attachment_hit_space, ground_angle}
								part.away_from_ground = attachment_hit_space.normal
							break
				
				if not hit and otherwise_attached >= 2
					part.attachment = null
			else
				# part.x += part.vx
				# part.y += part.vy
				hit = collision(part)
				if hit
					part.vx = 0
					part.vy = 0

					# Project the part's position back to the surface of the ground.
					# This is done by finding the closest point on the polygon's edges.
					closest_distance = Infinity
					closest_segment = null
					part_world = @toWorld(part)
					part_in_hit_space = hit.fromWorld(part_world)
					for segment_name, segment of hit.structure.segments
						dist = distanceToLineSegment(part_in_hit_space, segment.a, segment.b)
						if dist < closest_distance and Math.hypot(segment.a.x - segment.b.x, segment.a.y - segment.b.y) > 0.1
							closest_distance = dist
							closest_segment = segment
					if closest_segment
						closest_point_in_hit_space = closestPointOnLineSegment(part_in_hit_space, closest_segment.a, closest_segment.b)
						closest_point_world = hit.toWorld(closest_point_in_hit_space)
						closest_point_local = @fromWorld(closest_point_world)
						normal = {x: closest_point_world.x - part_world.x, y: closest_point_world.y - part_world.y}
						normal_length = Math.hypot(normal.x, normal.y)
						normal.x /= normal_length
						normal.y /= normal_length
						unless isFinite(normal.x) and isFinite(normal.y)
							console.warn("NaN in normal")
							normal = {x: 0, y: 0}

						part.x = closest_point_local.x
						part.y = closest_point_local.y
						unless lift_feet
							ground_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x)
							if isNaN(ground_angle)
								console.warn("ground_angle is NaN")
								ground_angle = 0
							part.attachment = {entity_id: hit.id, point: closest_point_in_hit_space, ground_angle}
							part.away_from_ground = normal
				else
					part.vy += 0.5
					part.vx *= 0.99
					part.vy *= 0.99
					# @structure.stepLayout({gravity: 0.005, collision})
					# @structure.stepLayout() for [0..10]
					# @structure.stepLayout({collision}) for [0..4]
					part.x += part.vx
					part.y += part.vy
			
			# angular constraint pivoting on this part
			relative_angle = (Math.sin(Math.sin(t)*Math.PI/4) - 0.5) * Math.PI/parts_list.length/2
			part.relative_angle = relative_angle
			prev_part = parts_list[part_index-1]
			next_part = parts_list[part_index+1]
			if prev_part and next_part
				@accumulate_angular_constraint_forces(prev_part, next_part, part, relative_angle)
		
		# apply forces
		for part in parts_list
			part.vx += part.fx
			part.vy += part.fy
			part.x += part.fx
			part.y += part.fy

		# Interact with water
		for part in parts_list
			water = world.collision(@toWorld(part), types: (entity)=>
				entity.constructor.name is "Water"
			)
			too_far_under_water = water and world.collision(@toWorld({x: part.x, y: part.y - part.radius}), types: (entity)=>
				entity.constructor.name is "Water"
			)
			if water and not too_far_under_water
				# Make ripples in water
				water.makeWaves(@toWorld(part), part.radius, part.vy/2)
				# Skip off water (as if this will ever matter)
				if 4 > part.vy > 2 and Math.abs(part.vx) > 0.4
					part.vy *= -0.3
			# Slow down in water, and buoy
			if water
				part.vx -= part.vx * 0.1
				part.vy -= part.vy * 0.1
				part.vy -= 0.45

		# constrain distances
		for i in [0...4]
			for part, part_index in parts_list
				attachment_entity = if part.attachment then world.getEntityByID(part.attachment.entity_id)
				if attachment_entity
					attachment_world = attachment_entity.toWorld(part.attachment.point)
					attachment_local = @fromWorld(attachment_world)
					fixity = 0.1 # also affects crawling speed
					part.x += (attachment_local.x - part.x) * fixity
					part.y += (attachment_local.y - part.y) * fixity
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
			for part, part_index in parts_list
				for other_part, other_part_index in parts_list #when part_index isnt other_part_index
					if Math.abs(part_index - other_part_index) < 3
						continue
					delta_x = part.x - other_part.x
					delta_y = part.y - other_part.y
					delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
					target_min_length = part.radius - other_part.radius
					if delta_length < target_min_length
						diff = (delta_length - target_min_length) / delta_length
						if isFinite(diff)
							diff *= 50
							part.x -= delta_x * 0.5 * diff
							part.y -= delta_y * 0.5 * diff
							other_part.x += delta_x * 0.5 * diff
							other_part.y += delta_y * 0.5 * diff
							part.vx -= delta_x * 0.5 * diff
							part.vy -= delta_y * 0.5 * diff
							other_part.vx += delta_x * 0.5 * diff
							other_part.vy += delta_y * 0.5 * diff
							if Math.random() < 0.5
								part.attachment = null
								other_part.attachment = null
						else
							console.warn("diff is not finite, for Caterpillar self-collision constraint")

	
	accumulate_angular_constraint_forces: (a, b, pivot, relative_angle)->
		angle_a = Math.atan2(a.y - b.y, a.x - b.x)
		angle_b = Math.atan2(pivot.y - b.y, pivot.x - b.x)
		angle_diff = (angle_a - angle_b) - relative_angle

		# angle_diff *= 0.9
		distance = Math.hypot(a.x - b.x, a.y - b.y)
		# distance_a = Math.hypot(a.x - pivot.x, a.y - pivot.y)
		# distance_b = Math.hypot(b.x - pivot.x, b.y - pivot.y)
		# angle_diff /= Math.max(1, (distance / 5) ** 2.4)

		old_a = {x: a.x, y: a.y}
		old_b = {x: b.x, y: b.y}

		# Rotate around pivot.
		rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]]
		rot_matrix_inverse = [[Math.cos(-angle_diff), Math.sin(-angle_diff)], [-Math.sin(-angle_diff), Math.cos(-angle_diff)]]
		for point in [a, b]
			# Translate and rotate.
			[point.x, point.y] = [point.x, point.y].map((value, index) =>
				(if point is a then rot_matrix else rot_matrix_inverse)[index][0] * (point.x - pivot.x) +
				(if point is a then rot_matrix else rot_matrix_inverse)[index][1] * (point.y - pivot.y)
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
		a.fx += (a.x - old_a.x) * f_a unless a.attachment
		a.fy += (a.y - old_a.y) * f_a unless a.attachment
		b.fx += (b.x - old_b.x) * f_b unless b.attachment
		b.fy += (b.y - old_b.y) * f_b unless b.attachment

		# Opposite force on pivot.
		pivot.fx -= (a.x - old_a.x) * f_a unless pivot.attachment
		pivot.fy -= (a.y - old_a.y) * f_a unless pivot.attachment
		pivot.fx -= (b.x - old_b.x) * f_b unless pivot.attachment
		pivot.fy -= (b.y - old_b.y) * f_b unless pivot.attachment

		# Restore old position.
		a.x = old_a.x
		a.y = old_a.y
		b.x = old_b.x
		b.y = old_b.y

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
		# for part, part_index in parts_list
		# reverse order to draw head on top
		keys = Object.keys(@structure.points)
		for i in [keys.length-1..0]
			part_name = keys[i]
			part = @structure.points[part_name]
			# legs
			if part_name isnt "head"
				part.smoothed_normal ?= {x: 0, y: 0}
				part.smoothed_normal.x += ((part.away_from_ground?.x ? 0) - part.smoothed_normal.x) * 0.1
				part.smoothed_normal.y += ((part.away_from_ground?.y ? 0) - part.smoothed_normal.y) * 0.1
				leg_length = part.radius + 2 # WET
				ctx.save()
				ctx.translate(part.x, part.y)
				ctx.rotate(Math.sin(performance.now() / 80 + i) * 0.1)
				ctx.beginPath()
				ctx.moveTo(0, 0)
				ctx.lineTo(-part.smoothed_normal.x * leg_length, -part.smoothed_normal.y * leg_length)
				ctx.lineWidth = 1
				ctx.lineCap = "round"
				ctx.strokeStyle = color
				ctx.stroke()
				ctx.restore()
			# body part
			ctx.save()
			ctx.beginPath()
			ctx.arc(part.x, part.y, part.radius, 0, TAU)
			# ctx.fillStyle = if part.attachment then "lime" else color
			# ctx.fillStyle = "hsla(#{(part.relative_angle ? 0) * 10 * 180 / Math.PI}, 100%, 50%, 0.5)"
			# ctx.fillStyle = "hsla(#{(part.relative_angle ? 0) * 10 * 180 / Math.PI}, 100%, 50%, #{if part.attachment then 1 else 0.3})"
			ctx.fillStyle = color
			ctx.fill()
			ctx.clip()
			# highlight
			ctx.beginPath()
			ctx.arc(part.x + part.radius/3, part.y - part.radius/3, part.radius/2, 0, TAU)
			# ctx.fillStyle = "rgba(255, 255, 155, 0.5)"
			ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
			ctx.fill()
			ctx.restore()
			# eye
			if part_name is "head"
				ctx.beginPath()
				ctx.arc(part.x, part.y, part.radius/2, 0, TAU)
				ctx.fillStyle = "black"
				ctx.fill()
				# highlight
				ctx.beginPath()
				ctx.arc(part.x + part.radius/6, part.y - part.radius/6, part.radius/5, 0, TAU)
				ctx.fillStyle = "white"
				ctx.fill()
		
		for part in Object.values(@structure.points)
			if (try localStorage["tiamblia.debug_caterpillar"]) is "true"
				# draw line from part to attachment
				if part.attachment
					entity = world.getEntityByID(part.attachment.entity_id)
					attachment_local = @fromWorld(entity.toWorld(part.attachment.point))
					ctx.beginPath()
					ctx.moveTo(part.x, part.y)
					ctx.lineTo(attachment_local.x, attachment_local.y)
					ctx.lineWidth = 1
					ctx.lineCap = "round"
					ctx.strokeStyle = "red"
					ctx.stroke()
				# draw normal
				if part.away_from_ground
					ctx.beginPath()
					ctx.moveTo(part.x, part.y)
					ctx.lineTo(part.x + part.away_from_ground.x * 10, part.y + part.away_from_ground.y * 10)
					ctx.lineWidth = 1
					ctx.lineCap = "round"
					ctx.strokeStyle = "lime"
					ctx.stroke()

