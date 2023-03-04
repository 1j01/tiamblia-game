Terrain = require("../abstract/Terrain.coffee")
{addEntityClass} = require("skele2d")

module.exports = class Water extends Terrain
	addEntityClass(@)
	constructor: ->
		super()
		@bbox_padding = 30
		@solid = false
		@waves = {} # (local) x to y
		@structure.onchange = =>
			@waves = {}
			min_x = Infinity
			max_x = -Infinity
			for point_name, point of @structure.points
				min_x = Math.min(min_x, point.x)
				max_x = Math.max(max_x, point.x)
			for x in [Math.floor(min_x)..Math.ceil(max_x)]
				@waves[x] = 0
	
	makeWaves: (world_pos)->
		local_pos = @fromWorld(world_pos)
		@waves[Math.round(local_pos.x)] = 50

	step: ->
		for k in Object.keys(@waves)
			x = Number(k)
			@waves[x] *= 0.9
		for k in Object.keys(@waves)
			x = Number(k)
			@waves[x] += @waves[x - 1] * 0.1 if @waves[x - 1]?
		for k in Object.keys(@waves) by -1
			x = Number(k)
			@waves[x] += @waves[x + 1] * 0.1 if @waves[x + 1]?

	draw: (ctx, view)->
		min_y = Infinity
		max_y = -Infinity
		min_x = Infinity
		max_x = -Infinity
		for point_name, point of @structure.points
			min_y = Math.min(min_y, point.y)
			max_y = Math.max(max_y, point.y)
			min_x = Math.min(min_x, point.x)
			max_x = Math.max(max_x, point.x)
		ctx.save()
		ctx.beginPath()
		for x, y of @waves
			ctx.lineTo(x, min_y - y)
		# ctx.lineTo(max_x, max_y)
		# ctx.lineTo(min_x, max_y)
		# ctx.closePath()
		ctx.strokeStyle = "red"
		ctx.stroke()

		ctx.beginPath()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "hsla(200, 100%, 50%, 0.5)"
		ctx.fill()

		ctx.restore()
