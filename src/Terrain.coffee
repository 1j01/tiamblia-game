
class @Terrain extends Entity
	constructor: ->
		@structure = new PolygonStructure
		@simplex = new SimplexNoise
	
	generate: ->
		width = 5000
		left = -2500
		right = left + width
		max_height = 200
		bottom = 300
		res = 20
		@structure.addVertex(right, bottom, "lower-right")
		@structure.addVertex(left, bottom, "lower-left")
		for x in [left..right] by res
			noise =
				@simplex.noise2D(x / 2400, 0) +
				@simplex.noise2D(x / 500, 10) / 5 +
				@simplex.noise2D(x / 50, 30) / 100
			@structure.addVertex(x, bottom - (noise + 1) * max_height)
	
	draw: (ctx)->
		ctx.beginPath()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "green"
		ctx.fill()
