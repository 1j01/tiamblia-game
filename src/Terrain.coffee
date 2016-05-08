
class @Terrain extends Entity
	add_Entity_class(@)
	constructor: ->
		super
		@structure = new PolygonStructure
		@simplex = new SimplexNoise
		@seed = random()
	
	toJSON: ->
		def = {}
		def[k] = v for k, v of @ when k isnt "simplex"
		def
	
	generate: ->
		@width = 5000
		@left = -2500
		@right = @left + @width
		@max_height = 400
		@bottom = 300
		res = 20
		@structure.addVertex(@right, @bottom)
		@structure.addVertex(@left, @bottom)
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
		ctx.fillStyle = "#C29853"
		ctx.fill()
		Math.seedrandom(5)
		random = Math.random
		# TODO: try layers of chained triangles
		# like https://jsfiddle.net/evarildo/ds2ajjks/
		dark_blades = []
		light_blades = []
		for i in [0..@width]
			x = @left + random() * @width
			y = @bottom - random() * @max_height
			# TODO: order tufts of grass based on y?
			if view.testRect(x, y - 10, 0, 10, 15)
				for j in [0..random()*3+1]
					dark = random() < 0.5
					point = {x, y}
					view_point = view.fromWorld(point)
					if ctx.isPointInPath(view_point.x, view_point.y)
						(if dark then dark_blades else light_blades).push(point)
					# x += (@simplex.noise2D(i+x+y, j+y) + 1) * 3
					x += (random() + 1) * 3
			else
				for j in [0..random()*3+1]
					random()
					random()
		
		ctx.beginPath()
		for {x, y} in dark_blades
			ctx.moveTo(x, y)
			ctx.lineTo(
				x + @simplex.noise2D(-x+y+78+Date.now()/2000, y+549)*5
				y - (2 + @simplex.noise2D(y*40.45, x+340)) * 10
			)
		ctx.strokeStyle = "#B7863E"
		ctx.stroke()
		
		ctx.beginPath()
		for {x, y} in light_blades
			ctx.moveTo(x, y)
			ctx.lineTo(
				x + @simplex.noise2D(-x+y+78+Date.now()/2000, y+549)*5
				y - (2 + @simplex.noise2D(y*40.45, x+340)) * 10
			)
		ctx.strokeStyle = "#D6AE77"
		ctx.stroke()
		
