
class @Terrain extends Entity
	constructor: ->
		@structure = new PolygonStructure
		@simplex = new SimplexNoise
	
	generate: ->
		@width = 5000
		@left = -2500
		@right = @left + @width
		@max_height = 400
		@bottom = 300
		res = 20
		@structure.addVertex(@right, @bottom, "lower-right")
		@structure.addVertex(@left, @bottom, "lower-left")
		for x in [@left..@right] by res
			noise =
				@simplex.noise2D(x / 2400, 0) +
				@simplex.noise2D(x / 500, 10) / 5 +
				@simplex.noise2D(x / 50, 30) / 100
			@structure.addVertex(x, @bottom - (noise + 1) / 2 * @max_height)
	
	draw: (ctx, view)->
		ctx.beginPath()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		# ctx.fillStyle = "green"
		ctx.fillStyle = "#C29853"
		ctx.fill()
		# for i in [0..500]
		# 	x = @simplex.noise2D(i, 525) * @width
		# 	y = @bottom - @simplex.noise2D(i, 321) * @max_height
		# 	for j in [0..(@simplex.noise2D(x / 2400, 0)+2)]
		# 		ctx.beginPath()
		# 		ctx.moveTo(x, y)
		# 		ctx.lineTo(x + @simplex.noise2D(i-x+y+78, j-y+549)*5, y - (2 + @simplex.noise2D(i*40.45, j+340)) * 10)
		# 		ctx.strokeStyle = "#D6AE77"
		# 		ctx.stroke()
		# 		x += (@simplex.noise2D(i+x+y, j+y) + 1) * 3
		Math.seedrandom(5)
		random = Math.random
		for i in [0..@width]
			x = @left + random() * @width
			y = @bottom - random() * @max_height
			# FIXME: floating pieces of grass caused by finicky pointInPolygon
			if view.testRect(x, y, 0, 10, 15) and @structure.pointInPolygon(x, y)
				for j in [0..random()*3+1]
					ctx.beginPath()
					ctx.moveTo(x, y)
					ctx.lineTo(x + @simplex.noise2D(i-x+y+78+Date.now()/2000, j-y+549)*5, y - (2 + @simplex.noise2D(i*40.45, j+340)) * 10)
					ctx.strokeStyle = "#D6AE77"
					ctx.strokeStyle = "#B7863E" if random() < 0.5
					ctx.stroke()
					x += (@simplex.noise2D(i+x+y, j+y) + 1) * 3
			else
				for j in [0..random()*3+1]
					random()
