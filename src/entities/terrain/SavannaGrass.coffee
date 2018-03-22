
class @SavannaGrass extends Terrain
	addEntityClass(@)
	constructor: ->
		super()
		@bbox_padding = 30
		@grass_tiles = new Map
		@grass_tiles.fromJSON = (map_obj)=>
		@grass_tiles.toJSON = (map_obj)=> {}
		@structure.onchange = =>
			@grass_tiles.forEach (tile)=>
				for shade in ["dark", "light"]
					for blade in tile["#{shade}_blades"]
						delete blade.visible
	
	draw: (ctx, view)->
		
		rect_contains_any_points = (x, y, width, height)=>
			contains_any_points = no
			for point_name, point of @structure.points
				if (
					x <= point.x <= x + width and
					y <= point.y <= y + height
				)
					contains_any_points = yes
			contains_any_points
		
		rect_is_empty = (x, y, width, height)=>
			center_point = {x: @x + x + width/2, y: @y + y + height/2}
			view_point = view.fromWorld(center_point)
			center_of_rect_is_in_polygon = ctx.isPointInPath(view_point.x, view_point.y)
			for segment_name, segment of @structure.segments
				if (
					lineSegmentsIntersect(x, y, x, y + height, segment.a.x, segment.a.y, segment.b.x, segment.b.y) or
					lineSegmentsIntersect(x, y, x + width, y, segment.a.x, segment.a.y, segment.b.x, segment.b.y) or
					lineSegmentsIntersect(x + width, y, x + width, y + height, segment.a.x, segment.a.y, segment.b.x, segment.b.y) or
					lineSegmentsIntersect(x, y + height, x + width, y + height, segment.a.x, segment.a.y, segment.b.x, segment.b.y)
				)
					# return center_of_rect_is_in_polygon
					return no
			return not center_of_rect_is_in_polygon
		
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
		# and order tufts of grass based on y (along with the layers of triangles)?
		dark_blades = []
		light_blades = []
		bbox = @bbox()
		tile_size = 300
		# first_tile_x = floor(bbox.x / tile_size) * tile_size
		# last_tile_x = ceil((bbox.x + bbox.width) / tile_size) * tile_size
		# first_tile_y = floor(bbox.y / tile_size) * tile_size
		# last_tile_y = ceil((bbox.y + bbox.height) / tile_size) * tile_size
		# first_tile_x = (bbox.x // tile_size) * tile_size
		# last_tile_x = ((bbox.x + bbox.width) // tile_size) * tile_size
		# first_tile_y = (bbox.y // tile_size) * tile_size
		# last_tile_y = ((bbox.y + bbox.height) // tile_size) * tile_size
		# first_tile_xi = bbox.x // tile_size
		# last_tile_xi = (bbox.x + bbox.width) // tile_size
		# first_tile_yi = bbox.y // tile_size
		# last_tile_yi = (bbox.y + bbox.height) // tile_size
		# first_tile_x = first_tile_x * tile_size
		# last_tile_x = last_tile_x * tile_size
		# first_tile_y = first_tile_y * tile_size
		# last_tile_y = last_tile_y * tile_size
		# for tile_x in [first_tile_x..last_tile_x] by tile_size
		# 	tile_x -= @x
		# 	for tile_y in [first_tile_y..last_tile_y] by tile_size
		# 		tile_name = "(#{tile_x}, #{tile_y})"
		# 		tile_y -= @y
		
		left = bbox.x - @x
		top = bbox.y - @y
		right = left + bbox.width
		bottom = top + bbox.height
		first_tile_xi = left // tile_size
		last_tile_xi = right // tile_size
		first_tile_yi = top // tile_size
		last_tile_yi = bottom // tile_size
		
		for tile_xi in [first_tile_xi..last_tile_xi]
			for tile_yi in [first_tile_yi..last_tile_yi]
				tile_name = "(#{tile_xi}, #{tile_yi})"
				# tile_x = @x + tile_xi * tile_size
				# tile_y = @y + tile_yi * tile_size
				# tile_x = tile_xi * tile_size - @x
				# tile_y = tile_yi * tile_size - @y
				tile_x = tile_xi * tile_size
				tile_y = tile_yi * tile_size
				
				tile = @grass_tiles.get(tile_name)
				contains_any_points = rect_contains_any_points(tile_x, tile_y, tile_size, tile_size)
				unless (not contains_any_points) and rect_is_empty(tile_x, tile_y, tile_size, tile_size)
					unless tile?
						tile = {
							dark_blades: []
							light_blades: []
						}
						for [0..350]
							x = tile_x + random() * tile_size
							y = tile_y + random() * tile_size
							for j in [0..random()*3+1]
								shade = if random() < 0.5 then "dark" else "light"
								tile["#{shade}_blades"].push({x, y})
								x += (random() + 1) * 3
						@grass_tiles.set(tile_name, tile)
					
					# ctx.strokeStyle = "#f0f"
					# ctx.strokeRect(tile_x, tile_y, tile_size, tile_size)
					# ctx.fillStyle = "rgba(255, 0, 255, 0.1)"
					# ctx.fillRect(tile_x, tile_y, tile_size, tile_size)
					# # ctx.fillStyle = "rgba(255, 0, 255, 0.4)"
					# # ctx.fillRect(tile_x + tile_size/8, tile_y + tile_size/8, tile_size * 3/4, tile_size * 3/4)
					
					for shade in ["dark", "light"]
						for blade in tile["#{shade}_blades"]
							point = @toWorld(blade)
							if view.testRect(point.x, point.y - 10, 0, 10, 15)
								view_point = view.fromWorld(point)
								if blade.visible ?= ctx.isPointInPath(view_point.x, view_point.y)
								# if (not contains_any_points) or ctx.isPointInPath(view_point.x, view_point.y)
									(if shade is "dark" then dark_blades else light_blades).push(blade)
		
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
