Entity = require "../abstract/Entity.coffee"
{addEntityClass} = require "skele2d"
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
			if world.collision(@toWorld(tip))
				tip.vx = 0
				tip.vy = 0
				nock.vx = 0
				nock.vy = 0
				break # don't move the arrow any further
			if world.collision(@toWorld(nock))
				nock.vx *= 0.1
				nock.vy *= 0.1
			tip.x += tip.vx / steps
			tip.y += tip.vy / steps
			nock.x += nock.vx / steps
			nock.y += nock.vy / steps

			# Introduce drag on fletched side, perpendicular to the arrow shaft.
			# First, find the angle of the arrow shaft.
			angle = Math.atan2(tip.y - nock.y, tip.x - nock.x)
			# Then, rotate the nock's velocity to a coordinate system where the arrow shaft is horizontal.
			nock_vx = nock.vx * Math.cos(angle) + nock.vy * Math.sin(angle)
			nock_vy = nock.vx * Math.sin(angle) - nock.vy * Math.cos(angle)
			# Then, apply drag to the nock's velocity.
			# nock_vx *= 0.9999
			# Then, rotate the nock's velocity back to the original coordinate system,
			# applying it to the particle.
			nock.vx = nock_vx * Math.cos(angle) - nock_vy * Math.sin(angle)
			nock.vy = nock_vx * Math.sin(angle) + nock_vy * Math.cos(angle)

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
