
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
