
class @SavannaGrass extends Terrain
	addEntityClass(@)
	constructor: ->
		super
		@bbox_padding = 20
		# @grass_tiles = new Map
	
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
		bbox = @bbox()
		tile_size = 300
		# first_tile_x = floor(bbox.x / tile_size) * tile_size
		# last_tile_x = ceil((bbox.x + bbox.width) / tile_size) * tile_size
		# first_tile_y = floor(bbox.y / tile_size) * tile_size
		# last_tile_y = ceil((bbox.y + bbox.height) / tile_size) * tile_size
		first_tile_x = (bbox.x // tile_size) * tile_size - @x
		last_tile_x = ((bbox.x + bbox.width) // tile_size) * tile_size - @x
		first_tile_y = (bbox.y // tile_size) * tile_size - @y
		last_tile_y = ((bbox.y + bbox.height) // tile_size) * tile_size - @y
		for tile_x in [first_tile_x..last_tile_x] by tile_size
			for tile_y in [first_tile_y..last_tile_y] by tile_size
				for [0..350]
					x = tile_x + random() * tile_size
					y = tile_y + random() * tile_size
					# TODO: order tufts of grass based on y?
					point = @toWorld({x, y})
					if view.testRect(point.x, point.y - 10, 0, 10, 15)
						for j in [0..random()*3+1]
							dark = random() < 0.5
							point = @toWorld({x, y})
							view_point = view.fromWorld(point)
							if ctx.isPointInPath(view_point.x, view_point.y)
								(if dark then dark_blades else light_blades).push({x, y})
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
