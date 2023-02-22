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
	
	initLayout: ->
		@structure.points.tip.x += @length
	
	step: (world)->
		# If dropped completely sideways, it should end up lying on the ground
		# but the fletching should introduce some drag in that direction,
		# leading to a slight rotation.
		# However the fletching shouldn't introduce much drag in the direction of travel.
		
		{tip, nock} = @structure.points
		
		tip.vy += 0.1
		nock.vy += 0.1
		steps = 10
		for [0..steps]
			hit = world.collision(@toWorld(tip))
			if hit
				# collision() doesn't give us the line segment that we hit.
				# We want to know how deep the arrow is in the wall, to tell
				# if it should stay planted or bounce off.
				tip_relative = hit.fromWorld(@toWorld(tip))
				nock_relative = hit.fromWorld(@toWorld(nock))
				depth = 0
				normal = undefined
				for segment_name, segment of hit.structure.segments
					# console.log(distanceToLineSegment(tip_relative, segment.a, segment.b))
					if lineSegmentsIntersect(tip_relative.x, tip_relative.y, nock_relative.x, nock_relative.y, segment.a.x, segment.a.y, segment.b.x, segment.b.y)
						depth = distanceToLineSegment(tip_relative, segment.a, segment.b)
						normal = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x)
						break
				# console.log(depth)
				if depth > 3
					# The arrow is too deep in the wall to bounce off.
					# It should stay planted.
					tip.vx = 0
					tip.vy = 0
					nock.vx = 0
					nock.vy = 0
					break # don't move the arrow any further
				else
					# @handle_bounce(tip, normal)
					""
			if world.collision(@toWorld(nock))
				# Bouncing isn't as important for the trailing end of the arrow.
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
