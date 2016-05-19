
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
		@id = uuid()
		EntityClass = Object.getPrototypeOf(@).constructor
		EntityClass.poses = {}
		EntityClass.animations = {}
		@_class_ = EntityClass.name
		@bbox_padding = 2
		# TODO: depth system
		# @drawing_pieces = {}
	
	# @animationize: (EntityClass)->
	# 	EntityClass.poses = {}
	# 	EntityClass.animations = {}
	
	@fromJSON: (def)->
		unless typeof def._class_ is "string"
			console.error "Erroneous entity definition:", def
			throw new Error "Expected entity to have a string _class_, _class_ is #{def._class_}"
		unless entity_classes[def._class_]
			throw new Error "Entity class '#{def._class_}' does not exist"
		entity = new entity_classes[def._class_]
		entity.fromJSON(def)
		entity
	
	fromJSON: (def)->
		if def._class_ isnt @_class_
			throw new Error "Tried to initialize #{@_class_} entity from JSON with _class_ #{JSON.stringify(def._class_)}"
		for k, v of def when k isnt "_class_"
			if @[k]?.fromJSON
				@[k].fromJSON(v)
			else
				@[k] = v
	
	toWorld: (point)->
		x: point.x + @x
		y: point.y + @y
	
	fromWorld: (point)->
		x: point.x - @x
		y: point.y - @y
	
	bbox: ->
		min_point = {x: +Infinity, y: +Infinity}
		max_point = {x: -Infinity, y: -Infinity}
		for point_name, point of @structure.points
			min_point.x = min(min_point.x, point.x)
			min_point.y = min(min_point.y, point.y)
			max_point.x = max(max_point.x, point.x)
			max_point.y = max(max_point.y, point.y)
		min_point.x = 0 unless isFinite(min_point.x)
		min_point.y = 0 unless isFinite(min_point.y)
		max_point.x = 0 unless isFinite(max_point.x)
		max_point.y = 0 unless isFinite(max_point.y)
		min_point.x -= @bbox_padding
		min_point.y -= @bbox_padding
		max_point.x += @bbox_padding
		max_point.y += @bbox_padding
		min_point_in_world = @toWorld(min_point)
		max_point_in_world = @toWorld(max_point)
		x: min_point_in_world.x
		y: min_point_in_world.y
		width: max_point_in_world.x - min_point_in_world.x
		height: max_point_in_world.y - min_point_in_world.y
	
	animate: ()->
		@structure = lerpStructures()
	
	step: (world)->
	draw: (ctx)->
	
	# TODO: function to call into the depth system
	# drawStructure: (drawing_functions)->
	# 	for point_name, fn of drawing_functions.points
	# 		fn(@structure.points[point_name])
	# 	for segment_name, fn of drawing_functions.segments
	# 		fn(@structure.segments[segment_name])
