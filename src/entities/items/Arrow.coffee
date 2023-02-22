Entity = require "../abstract/Entity.coffee"
{addEntityClass} = require "skele2d"
{lineSegmentsIntersect, distanceToLineSegment} = require("skele2d").helpers
TAU = Math.PI * 2

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
			point.vx = 0
			point.vy = 0
		
		@bbox_padding = 20

		# When the arrow hits something, a constraint will be added between
		# a point on the object, and a point on the arrow which may slide somewhat along the shaft.
		@lodging_constraints = []
	
	initLayout: ->
		@structure.points.tip.x += @length
	
	step: (world)->
		{tip, nock} = @structure.points
		
		# Update the previous position.
		# This is used for deciding whether the player can pick up an arrow.
		tip.prev_x = tip.x
		tip.prev_y = tip.y
		nock.prev_x = nock.x
		nock.prev_y = nock.y
		
		# If dropped completely sideways, it should end up lying on the ground
		# but the fletching should introduce some drag in that direction,
		# leading to a slight rotation.
		# However the fletching shouldn't introduce much drag in the direction of travel.
		
		tip.vy += 0.1
		nock.vy += 0.1
		steps = 10
		for [0..steps]
			# hit = world.collision(@toWorld(tip), types: (entity)=> entity not instanceof Arrow)
			# Can't require Player here because of circular dependency
			hit = world.collision(@toWorld(tip), types: (entity)=>
				entity.constructor.name not in ["Arrow", "Player", "Bow"]
			)
			if hit
				# collision() doesn't give us the line segment that we hit.
				# We want to know how deep the arrow is in the wall, to tell
				# if it should stay planted or bounce off.
				tip_relative = hit.fromWorld(@toWorld(tip))
				nock_relative = hit.fromWorld(@toWorld(nock))
				arrow_angle = Math.atan2(tip_relative.y - nock_relative.y, tip_relative.x - nock_relative.x)
				hit_segment = undefined
				normal = undefined
				relative_angle = undefined
				# depth = 0
				hit_segment_position_ratio = 0
				arrow_segment_position_ratio = 0 # AKA depth ratio
				for segment_name, segment of hit.structure.segments
					# console.log(distanceToLineSegment(tip_relative, segment.a, segment.b))
					if lineSegmentsIntersect(tip_relative.x, tip_relative.y, nock_relative.x, nock_relative.y, segment.a.x, segment.a.y, segment.b.x, segment.b.y)
						# depth = distanceToLineSegment(tip_relative, segment.a, segment.b)
						normal = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x)
						relative_angle = arrow_angle - normal
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
						break
				# console.log(depth)
				# if depth > 3
				# 	# The arrow is too deep in the wall to bounce off.
				# 	# It should stay planted.
				# 	tip.vx = 0
				# 	tip.vy = 0
				# 	nock.vx = 0
				# 	nock.vy = 0
				# 	break # don't move the arrow any further
				# else
				# 	# @handle_bounce(tip, normal)
				# 	""
				if hit_segment
					constraint = {
						hit_entity: hit
						hit_segment
						relative_angle
						hit_segment_position_ratio
						arrow_segment_position_ratio
					}
					@lodging_constraints.push(constraint)
					# if @lodging_constraints.length > 10
					# 	@lodging_constraints.shift()
					# Keep only one constraint, for now.
					@lodging_constraints.length = 1
						
			if world.collision(@toWorld(nock))
				# Bouncing isn't as important for the tail end.
				nock.vx *= 0.1
				nock.vy *= 0.1
			tip.x += tip.vx / steps
			tip.y += tip.vy / steps
			nock.x += nock.vx / steps
			nock.y += nock.vy / steps

			# Introduce drag on fletched side, perpendicular to the arrow shaft.
			# First, find the angle of the arrow shaft.
			angle = Math.atan2(tip.y - nock.y, tip.x - nock.x)
			# Then, calculate the rotation matrix to rotate the velocity to the horizontal coordinate system.
			rot_matrix1 = [[Math.cos(angle), Math.sin(angle)], [-Math.sin(angle), Math.cos(angle)]]
			# Apply the rotation to the velocity.
			[nock_vx, nock_vy] = [nock.vx, nock.vy].map((val, idx) => rot_matrix1[idx][0] * nock.vx + rot_matrix1[idx][1] * nock.vy)
			# Then, apply drag to the nock's velocity.
			nock_vy *= 0.999
			# Then, calculate the rotation matrix to rotate the velocity back to the original coordinate system.
			rot_matrix2 = [[Math.cos(-angle), Math.sin(-angle)], [-Math.sin(-angle), Math.cos(-angle)]]
			# Apply the rotation to the velocity and update the particle's velocity.
			[nock.vx, nock.vy] = [nock_vx, nock_vy].map((val, idx) => rot_matrix2[idx][0] * nock_vx + rot_matrix2[idx][1] * nock_vy)

			# Constrain when lodged in an object.
			for {hit_entity, hit_segment, relative_angle, arrow_segment_position_ratio, hit_segment_position_ratio} in @lodging_constraints
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
				# move the object equally in the opposite direction.
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
			tip.x -= delta_x * 0.5 * diff
			tip.y -= delta_y * 0.5 * diff
			nock.x += delta_x * 0.5 * diff
			nock.y += delta_y * 0.5 * diff
		
		# This was a decent attempt at making the arrow point in the direction it's moving,
		# but it's not very physical.
		# angle = Math.atan2(tip.y - nock.y, tip.x - nock.x)
		# nock.x = tip.x - Math.cos(angle) * @length
		# nock.y = tip.y - Math.sin(angle) * @length
	
	handle_bounce: (particle, normal, elasticity = 1) ->
		# Bounce the particle off a surface with a given normal angle.
		# First, calculate the rotation matrix to rotate the velocity to the horizontal coordinate system.
		rot_matrix1 = [[Math.cos(normal), Math.sin(normal)], [-Math.sin(normal), Math.cos(normal)]]
		# Apply the rotation to the velocity.
		[particle_vx, particle_vy] = [particle.vx, particle.vy].map((val, idx) => rot_matrix1[idx][0] * particle.vx + rot_matrix1[idx][1] * particle.vy)
		# Then, apply the bounce.
		particle_vy *= -elasticity
		# Then, calculate the rotation matrix to rotate the velocity back to the original coordinate system.
		rot_matrix2 = [[Math.cos(-normal), Math.sin(-normal)], [-Math.sin(-normal), Math.cos(-normal)]]
		# Apply the rotation to the velocity and update the particle's velocity.
		[particle.vx, particle.vy] = [particle_vx, particle_vy].map((val, idx) => rot_matrix2[idx][0] * particle_vx + rot_matrix2[idx][1] * particle_vy)

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
		
		for {hit_entity, hit_segment, relative_angle, arrow_segment_position_ratio, hit_segment_position_ratio} in @lodging_constraints
			
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


