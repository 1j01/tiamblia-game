Entity = require "../abstract/Entity.coffee"
{addEntityClass} = require "skele2d"
{lineSegmentsIntersect, distanceToLineSegment} = require("skele2d").helpers
TAU = Math.PI * 2

closestPointOnLineSegment = (point, a, b)->
	# https://stackoverflow.com/a/3122532/2624876
	a_to_p = {x: point.x - a.x, y: point.y - a.y}
	a_to_b = {x: b.x - a.x, y: b.y - a.y}
	atb2 = a_to_b.x**2 + a_to_b.y**2
	atp_dot_atb = a_to_p.x*a_to_b.x + a_to_p.y*a_to_b.y
	t = atp_dot_atb / atb2
	return {x: a.x + a_to_b.x*t, y: a.y + a_to_b.y*t}


debug_drawings = new Map # Arrow to function(ctx)

window.debug_drawings = debug_drawings

module.exports = class Arrow extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		
		@length = 20
		
		@structure.addPoint("tip")
		@structure.addSegment(
			from: "tip"
			to: "nock"
			name: "shaft"
			length: @length
		)
		for point_name, point of @structure.points
			point.prev_x = point.x
			point.prev_y = point.y
			point.ax = 0
			point.ay = 0
		
		@bbox_padding = 20

		# When the arrow hits something, a constraint will be added between
		# a point on the object, and a point on the arrow which may slide somewhat along the shaft.
		@lodging_constraints = []
	
	initLayout: ->
		@structure.points.tip.x += @length
		@structure.points.tip.prev_x = @structure.points.tip.x

	@steps_per_frame = 2

	setVelocity: (vx, vy)->
		@structure.points.tip.prev_x = @structure.points.tip.x - vx / Arrow.steps_per_frame
		@structure.points.tip.prev_y = @structure.points.tip.y - vy / Arrow.steps_per_frame
		@structure.points.nock.prev_x = @structure.points.nock.x - vx / Arrow.steps_per_frame
		@structure.points.nock.prev_y = @structure.points.nock.y - vy / Arrow.steps_per_frame

	getAverageVelocity: ->
		{tip, nock} = @structure.points
		vx = (tip.x - tip.prev_x + nock.x - nock.prev_x) / 2 * Arrow.steps_per_frame
		vy = (tip.y - tip.prev_y + nock.y - nock.prev_y) / 2 * Arrow.steps_per_frame
		return [vx, vy]

	step: (world)->
		for [0..Arrow.steps_per_frame]
			@substep(world, 1 / Arrow.steps_per_frame)
		
		# Interact with water
		{tip, nock} = @structure.points
		for point in [tip, nock]
			water = world.collision(@toWorld(point), types: (entity)=>
				entity.constructor.name is "Water"
			)
			too_far_under_water = water and world.collision(@toWorld({x: point.x, y: point.y - 5}), types: (entity)=>
				entity.constructor.name is "Water"
			)
			if water and not too_far_under_water
				vy = (point.y - point.prev_y) * Arrow.steps_per_frame
				vx = (point.x - point.prev_x) * Arrow.steps_per_frame
				# Make ripples in water
				water.makeWaves(@toWorld(point), 2, vy)
				# Skip off water
				if 4 > vy > 2 and Math.abs(vx) > 0.4
					vy *= -0.3
					point.prev_y = point.y - vy / Arrow.steps_per_frame
			# Slow down in water
			if water
				point.prev_x += (point.x - point.prev_x) * 0.1
				point.prev_y += (point.y - point.prev_y) * 0.1


	substep: (world, delta_time)->

		{tip, nock} = @structure.points
		
		# Accumulate forces as acceleration.
		# (First, reset acceleration to zero.)
		for point in [tip, nock]
			point.ax = 0
			point.ay = 0

		# Gravity
		tip.ay += 0.1
		nock.ay += 0.1

		# If dropped completely sideways, it should end up lying on the ground
		# but the fletching should introduce some drag in that direction,
		# leading to a slight rotation.
		# However the fletching shouldn't introduce much drag in the direction of travel.

		# Introduce drag on fletched side, perpendicular to the arrow shaft.
		# First, find the angle of the arrow shaft, and the current velocity.
		angle = Math.atan2(tip.y - nock.y, tip.x - nock.x)
		[nock_vx, nock_vy] = [nock.x - nock.prev_x, nock.y - nock.prev_y]
		# Then, calculate the rotation matrix to rotate the velocity to the horizontal coordinate system.
		rot_matrix1 = [[Math.cos(angle), Math.sin(angle)], [-Math.sin(angle), Math.cos(angle)]]
		# Apply the rotation to the velocity.
		[nock_vx, nock_vy] = [nock_vx, nock_vy].map((val, idx) => rot_matrix1[idx][0] * nock_vx + rot_matrix1[idx][1] * nock_vy)
		# Then, calculate drag force based on the nock's velocity.
		# drag_force_x = -nock_vx * Math.abs(nock_vx) * 0.04 # tangent to arrow shaft
		# drag_force_y = -nock_vy * Math.abs(nock_vy) * 0.3 # perpendicular to arrow shaft
		drag_force_x = 0 # tangent to arrow shaft
		drag_force_y = -nock_vy * Arrow.steps_per_frame * 0.002 # perpendicular to arrow shaft
		# Then, calculate the rotation matrix to rotate the force back to the original coordinate system.
		rot_matrix2 = [[Math.cos(-angle), Math.sin(-angle)], [-Math.sin(-angle), Math.cos(-angle)]]
		# Apply the rotation to the force.
		[drag_force_x, drag_force_y] = [drag_force_x, drag_force_y].map((val, idx) => rot_matrix2[idx][0] * drag_force_x + rot_matrix2[idx][1] * drag_force_y)
		# Apply the force.
		if isFinite(drag_force_x) and isFinite(drag_force_y)
			nock.ax += drag_force_x
			nock.ay += drag_force_y
		else
			console.warn("NaN in drag force calculation")

		# Perform Verlet integration.
		for point in [tip, nock]
			original_pos = {x: point.x, y: point.y}
			# Ideally I would like to allow the arrow to move while lodged,
			# and adjust the depth and angle of lodging (with some stiffness),
			# and maybe allow it to become dislodged, but it was causing numerical instability.
			unless @lodging_constraints.length
				point.x += point.x - point.prev_x + point.ax * delta_time ** 2
				point.y += point.y - point.prev_y + point.ay * delta_time ** 2
			point.prev_x = original_pos.x
			point.prev_y = original_pos.y

		# Apply constraints.

		# check if player is holding the arrow
		held = world.entities.some((entity) => entity.holding_arrow is @)

		# Note: can't require Player here (to use instanceof check) because of circular dependency
		hit = world.collision(@toWorld(tip), types: (entity)=>
			entity.constructor.name not in ["Arrow", "Player", "Bow"]
		)
		if hit and not @lodging_constraints.length and not held
			# collision() doesn't give us the line segment that we hit.
			# We want to know the segment point in order to add a lodging constraint at the intersection point.
			tip_relative = hit.fromWorld(@toWorld(tip))
			nock_relative = hit.fromWorld(@toWorld(nock))
			hit_segment = undefined
			surface_angle = undefined
			relative_angle = undefined
			incident_speed = undefined # speed along the surface normal (i.e. towards the surface), ignoring motion along the surface
			heading_angle_of_incidence = undefined
			facing_angle_of_incidence = undefined
			hit_segment_position_ratio = 0
			arrow_segment_position_ratio = 0 # AKA depth ratio
			for segment_name, segment of hit.structure.segments
				if lineSegmentsIntersect(tip_relative.x, tip_relative.y, nock_relative.x, nock_relative.y, segment.a.x, segment.a.y, segment.b.x, segment.b.y)
					surface_angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x)
					arrow_angle = Math.atan2(tip_relative.y - nock_relative.y, tip_relative.x - nock_relative.x)
					relative_angle = arrow_angle - surface_angle
					normal = surface_angle + Math.PI / 2
					vx = tip.x - tip.prev_x
					vy = tip.y - tip.prev_y
					heading_angle = Math.atan2(vy, vx)
					incident_speed = Math.abs(Math.cos(normal) * vx + Math.sin(normal) * vy)
					# incident_speed = Math.abs(Math.sin(-surface_angle) * vx + Math.cos(-surface_angle) * vy) # alternative
					heading_angle_of_incidence = Math.abs(Math.abs((heading_angle - surface_angle) %% (Math.PI)) - Math.PI/2)
					facing_angle_of_incidence = Math.abs(Math.abs((arrow_angle - surface_angle) %% (Math.PI)) - Math.PI/2)
					# window.debug_max_facing_angle_of_incidence = Math.max(window.debug_max_facing_angle_of_incidence ? 0, facing_angle_of_incidence) # should be Math.PI/2 on arrow test scene
					# window.debug_max_heading_angle_of_incidence = Math.max(window.debug_max_heading_angle_of_incidence ? 0, heading_angle_of_incidence) # should be Math.PI/2 on arrow test scene

					# Arrows coming in at a grazing angle should bounce off.
					# Arrows coming straight towards the surface but not facing forward should bounce off.
					# Arrows going slow should bounce off.
					# A combination of speed, angle of incidence, and arrow angle is needed.

					# Arrows going fast enough towards the surface (i.e. in the axis perpendicular to the surface) should lodge.
					# The time subdivision shouldn't affect the speed threshold.
					incident_speed_global_scale = incident_speed * Arrow.steps_per_frame
					if incident_speed_global_scale < 2
						# console.log "not lodging, incident_speed_global_scale too low", incident_speed_global_scale
						continue
					if facing_angle_of_incidence > Math.PI / 4 # 45 degrees
						# console.log "not lodging, arrow is not facing head-on enough"
						continue
					if hit.constructor.name is "Rock"
						# console.log "not lodging, hit rock"
						continue
					
					hit_segment = segment
					# find position ratios of the intersection point on each segment
					p1 = segment.a
					p2 = segment.b
					p3 = tip_relative
					p4 = nock_relative
					# at segment.a = 0, at segment.b = 1
					hit_segment_position_ratio =
						((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x))
					# at tip = 0, at nock = 1
					arrow_segment_position_ratio =
						-((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x))
					# console.log "found intersection", hit_segment_position_ratio, arrow_segment_position_ratio
					break
			# I'm only allowing one lodging constraint per arrow for now.
			# Ideally I would like to allow the arrow to pin an enemy to the ground,
			# using multiple constraints, but this will probably require the whole game to be
			# simulated together with something like Verlet integration, so that the
			# enemy's limb can be constrained in a stable way.
			# But maybe with specific targets it can be enabled to work.
			# Also, TODO: bounce off if the angle is not perpendicular enough
			# (i.e. angle of incidence is too high)
			if hit_segment and @lodging_constraints.length == 0
				constraint = {
					hit_entity_id: hit.id
					hit_segment_name: Object.keys(hit.structure.segments)[Object.values(hit.structure.segments).indexOf(hit_segment)]
					relative_angle
					hit_segment_position_ratio
					arrow_segment_position_ratio
					incident_speed
					heading_angle_of_incidence
					facing_angle_of_incidence
				}
				@lodging_constraints.push(constraint)
		
		# Ideally I would like to allow the arrow to move while lodged,
		# and adjust the depth and angle of lodging (with some stiffness),
		# and maybe allow it to become dislodged, but it was causing numerical instability.
		if not @lodging_constraints.length and not held
			# Collide with the ground.
			for point in [tip, nock]
				hit = world.collision(@toWorld(point))
				if hit
					coefficient_of_restitution = if hit.constructor.name is "Rock" then 0.5 else 0.1
					coefficient_of_friction = 0.1

					vx = point.x - point.prev_x
					vy = point.y - point.prev_y
					speed = Math.hypot(vx, vy)

					# if not debug_drawings.has(@)
					# 	debug_drawings.set(@, [])
					# debug_drawings.get(@).push({
					# 	type: "line"
					# 	a: {x: point.x, y: point.y}
					# 	b: {x: point.x + vx, y: point.y + vy}
					# 	color: "yellow"
					# })
					# # debug_drawings.get(@).push({
					# # 	type: "circle"
					# # 	center: {x: point.x, y: point.y}
					# # 	radius: 5
					# # 	color: "yellow"
					# # })

					# Project the point back to the surface of the polygon.
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
						# debug_drawings.get(@).push({
						# 	type: "circle"
						# 	center: {x: point.x, y: point.y}
						# 	radius: 5
						# 	color: "lime"
						# })

					# bounce off the surface, reflecting the angle
					if speed > 0
						vx = point.x - point.prev_x
						vy = point.y - point.prev_y
						# console.log("hit.constructor.name", hit.constructor.name, "coefficient_of_restitution", coefficient_of_restitution)
						# heading_angle = Math.atan2(vy, vx)
						surface_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x)
						# a = surface_angle * 2 - heading_angle
						# a = if a >= TAU then a - TAU else if a < 0 then a + TAU else a
						# new_vx = Math.cos(a) * speed * coefficient_of_restitution
						# new_vy = Math.sin(a) * speed * coefficient_of_restitution

						# Rotate the velocity vector to the surface normal.
						rot_matrix1 = [
							[Math.cos(surface_angle), -Math.sin(surface_angle)]
							[Math.sin(surface_angle), Math.cos(surface_angle)]
						]
						[rotated_vx, rotated_vy] = [vx, vy].map((val, idx) => rot_matrix1[idx][0] * vx + rot_matrix1[idx][1] * vy)
						# Reflect the velocity vector.
						rotated_vx *= -coefficient_of_restitution
						rotated_vy *= (1 - coefficient_of_friction)
						# Rotate the velocity vector back to the original direction.
						rot_matrix2 = [
							[Math.cos(-surface_angle), -Math.sin(-surface_angle)]
							[Math.sin(-surface_angle), Math.cos(-surface_angle)]
						]
						[new_vx, new_vy] = [rotated_vx, rotated_vy].map((val, idx) => rot_matrix2[idx][0] * rotated_vx + rot_matrix2[idx][1] * rotated_vy)

						# console.log("old vx, vy", vx, vy, "new vx, vy", new_vx, new_vy)
						point.prev_x = point.x - new_vx
						point.prev_y = point.y - new_vy
						# At this point, the other particle's velocity has not been updated,
						# and it will often cancel out the bounce even for a perfectly elastic collision.
						# That's not good enough.
						# Transfer energy along the arrow shaft,
						# by constraining the distance between the two points.
						# What this does is cancel the velocity of the other point,
						# implicit in it having moved forwards in time,
						# but only in the direction that it needs to.
						# In contrast to the normal distance constraint, I'm not
						# going to symmetrically move both points, but rather keep the
						# collided point stationary so it doesn't get pushed back into the surface,
						# and move the other point fully rather than halfway.
						other_point = if point is tip then nock else tip
						delta_x = point.x - other_point.x
						delta_y = point.y - other_point.y
						delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
						diff = (delta_length - @length) / delta_length
						if isFinite(diff)
							other_point.x += delta_x * diff
							other_point.y += delta_y * diff
						else
							console.warn("diff is not finite, for momentary distance constraint")

		# Constrain when lodged in an object.
		for {hit_entity_id, hit_segment_name, relative_angle, arrow_segment_position_ratio, hit_segment_position_ratio} in @lodging_constraints
			hit_entity = world.getEntityByID(hit_entity_id)
			if not hit_entity # no longer exists
				@lodging_constraints = []
				break
			hit_segment = hit_entity.structure.segments[hit_segment_name]

			hit_segment_pos = hit_entity.toWorld({
				x: hit_segment.a.x + (hit_segment.b.x - hit_segment.a.x) * hit_segment_position_ratio
				y: hit_segment.a.y + (hit_segment.b.y - hit_segment.a.y) * hit_segment_position_ratio
			})
			arrow_shaft_pos = @toWorld({
				x: tip.x + (nock.x - tip.x) * arrow_segment_position_ratio
				y: tip.y + (nock.y - tip.y) * arrow_segment_position_ratio
			})
			pos_diff = {
				x: hit_segment_pos.x - arrow_shaft_pos.x
				y: hit_segment_pos.y - arrow_shaft_pos.y
			}
			if isNaN(pos_diff.x) or isNaN(pos_diff.y)
				console.warn("pos_diff has NaN")
				continue
			# TODO: for non-static objects,
			# move the object equally in the opposite direction (each only halfway)
			# And integrate all physics in the same loop, for Verlet integration.
			tip.x += pos_diff.x
			tip.y += pos_diff.y
			nock.x += pos_diff.x
			nock.y += pos_diff.y
			
			arrow_angle = Math.atan2(tip.y - nock.y, tip.x - nock.x)
			hit_segment_angle = Math.atan2(hit_segment.b.y - hit_segment.a.y, hit_segment.b.x - hit_segment.a.x)
			angle_diff = (arrow_angle - hit_segment_angle) - relative_angle

			# Rotate the arrow.
			arrow_shaft_pos_local = @fromWorld(arrow_shaft_pos) # redundant calculation
			# Rotate the arrow around the arrow shaft attachment point.
			rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]]
			for point in [tip, nock]
				# Translate and rotate the arrow.
				[point.x, point.y] = [point.x, point.y].map((val, idx) =>
					rot_matrix[idx][0] * (point.x - arrow_shaft_pos_local.x) +
					rot_matrix[idx][1] * (point.y - arrow_shaft_pos_local.y)
				)
				# Translate the arrow back to its original position.
				point.x += arrow_shaft_pos_local.x
				point.y += arrow_shaft_pos_local.y

		# Constrain arrow length, moving both points symmetrically.
		# I learned this from:
		# http://web.archive.org/web/20080410171619/http://www.teknikus.dk/tj/gdc2001.htm
		delta_x = tip.x - nock.x
		delta_y = tip.y - nock.y
		delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
		diff = (delta_length - @length) / delta_length
		if isFinite(diff)
			tip.x -= delta_x * 0.5 * diff
			tip.y -= delta_y * 0.5 * diff
			nock.x += delta_x * 0.5 * diff
			nock.y += delta_y * 0.5 * diff
		else
			console.warn("diff is not finite, for distance constraint")
	
	draw: (ctx)->
		{tip, nock} = @structure.points
		ctx.beginPath()
		ctx.moveTo(tip.x, tip.y)
		ctx.lineTo(nock.x, nock.y)
		ctx.lineWidth = 1
		ctx.lineCap = "round"
		ctx.strokeStyle = "#74552B"
		ctx.stroke()
		angle = Math.atan2(tip.y - nock.y, tip.x - nock.x) + TAU/4
		
		ctx.save()
		ctx.translate(tip.x, tip.y)
		ctx.rotate(angle)
		ctx.beginPath()
		ctx.moveTo(0, -2)
		ctx.lineTo(-2, 2)
		ctx.lineTo(0, 1)
		ctx.lineTo(+2, 2)
		ctx.fillStyle = "#2D1813"
		ctx.fill()
		ctx.restore()
		
		ctx.save()
		ctx.translate(nock.x, nock.y)
		ctx.rotate(angle)
		ctx.beginPath()
		ctx.translate(0, -4)
		ctx.moveTo(0, 0)
		ctx.lineTo(-2, 2)
		ctx.lineTo(-2, 4)
		ctx.lineTo(0, 3)
		ctx.lineTo(+2, 4)
		ctx.lineTo(+2, 2)
		ctx.fillStyle = "#B1280A"
		ctx.fill()
		ctx.restore()

		return unless window.debug_mode
		
		if debug_drawings.get(@)
			for drawing in debug_drawings.get(@)
				if drawing.type is "line"
					ctx.beginPath()
					ctx.moveTo(drawing.a.x, drawing.a.y)
					ctx.lineTo(drawing.b.x, drawing.b.y)
					ctx.lineWidth = 1
					ctx.lineCap = "round"
					ctx.strokeStyle = drawing.color ? "#FF0000"
					ctx.stroke()
				else if drawing.type is "circle"
					ctx.beginPath()
					ctx.arc(drawing.center.x, drawing.center.y, drawing.radius, 0, TAU)
					ctx.lineWidth = 1
					ctx.strokeStyle = drawing.color ? "#FF0000"
					ctx.stroke()
				else
					console.error("Unknown debug drawing type: #{drawing.type}")

		for {hit_entity_id, hit_segment_name, relative_angle, arrow_segment_position_ratio, hit_segment_position_ratio, incident_speed, facing_angle_of_incidence, heading_angle_of_incidence} in @lodging_constraints
			hit_entity = window.the_world.getEntityByID(hit_entity_id)
			if not hit_entity # no longer exists
				continue
			hit_segment = hit_entity.structure.segments[hit_segment_name]

			if not hit_entity.toWorld
				console.error("Need to fix serialization of references to entities (and segments) with something like resurrect.js!")
				@lodging_constraints.length = 0
				break
			hit_segment_a_local = @fromWorld(hit_entity.toWorld(hit_segment.a))
			hit_segment_b_local = @fromWorld(hit_entity.toWorld(hit_segment.b))
			ctx.beginPath()
			ctx.moveTo(hit_segment_a_local.x, hit_segment_a_local.y)
			ctx.lineTo(hit_segment_b_local.x, hit_segment_b_local.y)
			ctx.lineWidth = 1
			ctx.lineCap = "round"
			ctx.strokeStyle = "#FF0000"
			ctx.stroke()

			hit_segment_pos = hit_entity.toWorld({
				x: hit_segment.a.x + (hit_segment.b.x - hit_segment.a.x) * hit_segment_position_ratio
				y: hit_segment.a.y + (hit_segment.b.y - hit_segment.a.y) * hit_segment_position_ratio
			})
			arrow_shaft_pos = @toWorld({
				x: tip.x + (nock.x - tip.x) * arrow_segment_position_ratio
				y: tip.y + (nock.y - tip.y) * arrow_segment_position_ratio
			})
			hit_segment_pos_local = @fromWorld(hit_segment_pos)
			arrow_shaft_pos_local = @fromWorld(arrow_shaft_pos) # redundant calc but whatever

			ctx.beginPath()
			ctx.moveTo(hit_segment_pos_local.x, hit_segment_pos_local.y)
			ctx.lineTo(arrow_shaft_pos_local.x, arrow_shaft_pos_local.y)
			ctx.lineWidth = 1
			ctx.lineCap = "round"
			ctx.strokeStyle = "#00FF00"
			ctx.stroke()

			# misc debug for colorizing based on a variable like
			# incident_speed, facing_angle_of_incidence, heading_angle_of_incidence, relative_angle
			ctx.beginPath()
			ctx.moveTo(tip.x, tip.y)
			ctx.lineTo(nock.x, nock.y)
			ctx.lineWidth = 2
			ctx.lineCap = "round"
			ctx.strokeStyle = "hsl(50, 100%, #{facing_angle_of_incidence * 20}%)"
			ctx.stroke()


