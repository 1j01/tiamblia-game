Terrain = require("../abstract/Terrain.coffee")
{addEntityClass} = require("skele2d")

module.exports = class Water extends Terrain
	addEntityClass(@)
	constructor: ->
		super()
		@bbox_padding = 30
		@solid = false
		@waves_y = [] # indexed by x starting from @min_x
		@waves_vy = [] # indexed by x starting from @min_x
		@min_x = Infinity
		@max_x = -Infinity
		@min_y = Infinity
		@max_y = -Infinity
		@structure.onchange = =>
			@waves_y = []
			@waves_vy
			@min_x = Infinity
			@max_x = -Infinity
			@min_y = Infinity
			@max_y = -Infinity
			for point_name, point of @structure.points
				@min_x = Math.min(@min_x, point.x)
				@max_x = Math.max(@max_x, point.x)
				@min_y = Math.min(@min_y, point.y)
				@max_y = Math.max(@max_y, point.y)
			@min_x = Math.floor(@min_x)
			@max_x = Math.ceil(@max_x)
			@min_y = Math.floor(@min_y)
			@max_y = Math.ceil(@max_y)

			for x in [@min_x...@max_x]
				@waves_y[x - @min_x] = 0
				@waves_vy[x - @min_x] = 0
	
	makeWaves: (world_pos, radius=5, velocity_y=5)->
		local_pos = @fromWorld(world_pos)
		for x in [Math.round(local_pos.x - radius)...Math.round(local_pos.x + radius)]
			@waves_vy[x - @min_x] = velocity_y * (1 - Math.abs(x - local_pos.x) / radius)

	step: ->
		neighboring = []
		for x in [@min_x...@max_x]
			neighboring[x - @min_x] = (@waves_y[x - @min_x - 1] ? 0) + (@waves_y[x - @min_x + 1] ? 0)
		for x in [@min_x...@max_x]
			@waves_vy[x - @min_x] += (neighboring[x - @min_x] - @waves_y[x - @min_x] * 2) * 0.4
			@waves_vy[x - @min_x] *= 0.99
			@waves_vy[x - @min_x] -= @waves_y[x - @min_x] * 0.2
			@waves_y[x - @min_x] += @waves_vy[x - @min_x]

	draw: (ctx, view)->
		wave_center_y = @min_y + 10
		ctx.save()
		ctx.beginPath()
		for x in [@min_x...@max_x]
			ctx.lineTo(x, @waves_y[x - @min_x] + wave_center_y)
		ctx.lineTo(@max_x, @max_y)
		ctx.lineTo(@min_x, @max_y)
		ctx.closePath()
		# ctx.strokeStyle = "red"
		# ctx.stroke()
		ctx.clip()

		ctx.beginPath()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "hsla(200, 100%, 50%, 0.5)"
		ctx.fill()

		ctx.restore()
