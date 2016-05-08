
class @PolygonStructure
	constructor: ->
		@points = {}
		@segments = {}
		@point_id_counter = 1
		@last_name = null
		@first_name = null
	
	addVertex: (x, y, name)->
		from = @last_name
		name ?= ++@point_id_counter
		@first_name ?= name
		if @points[name]
			throw new Error "point/segment '#{name}' already exists adding vertex '#{name}'"
		@points[name] = {x, y, name}
		if @points[from]
			@segments[name] = {a: @points[from], b: @points[name]}
			@segments["closing"] = {a: @points[@last_name], b: @points[@first_name]}
		@last_name = name
	
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
