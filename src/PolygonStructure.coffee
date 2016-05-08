
class @PolygonStructure extends Structure
	constructor: ->
		super
		@id_counter = 0
		@last_point_name = null
		@first_point_name = null
	
	# toJSON: ->
	# 	{@points}
	# 
	# fromJSON: (def)->
	# 	@points = def.points
	# 	@segments = {}
	# 	@id_counter = 0
	# 	@first_point_name = null
	# 	@last_point_name = null
	# 	for point_name, point of @points
	# 		if @first_point_name?
	# 			@segments[++@id_counter] = {
	# 				a: @points[@last_point_name]
	# 				b: @points[point_name]
	# 			}
	# 		else
	# 			@first_point_name = point_name
	# 		@last_point_name = point_name
	# 	
	# 	@segments.closing = {
	# 		a: @points[@first_point_name]
	# 		b: @points[@last_point_name]
	# 	}
	
	toJSON: ->
		# for point_name, point of @points
		# 	point_def = {}
		# 	point_def[k] = v for k, v of point when k isnt "name"
		# 	point_def
		points: ({x, y} for point_name, {x, y} of @points)
	
	fromJSON: (def)->
		@points = {}
		@segments = {}
		@id_counter = 0
		@first_point_name = null
		@last_point_name = null
		for {x, y} in def.points
			@addVertex(x, y)
	
	addVertex: (x, y)->
		from = @last_point_name
		name = ++@id_counter
		@first_point_name ?= name
		if @points[name]
			throw new Error "point/segment '#{name}' already exists adding vertex '#{name}'"
		@points[name] = {x, y, name}
		if @points[from]
			@segments[name] = {a: @points[from], b: @points[name]}
			@segments["closing"] = {a: @points[@last_point_name], b: @points[@first_point_name]}
		@last_point_name = name
	
	pointInPolygon: (x, y)->
		inside = no
		# for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		# 	xi = vs[i][0], yi = vs[i][1]
		# 	xj = vs[j][0], yj = vs[j][1]
		for segment_name, segment of @segments
			xi = segment.a.x
			yi = segment.a.y
			xj = segment.b.x
			yj = segment.b.y
			intersect =
				((yi > y) isnt (yj > y)) and
				(x < (xj - xi) * (y - yi) / (yj - yi) + xi)
			inside = not inside if intersect
		
		inside
