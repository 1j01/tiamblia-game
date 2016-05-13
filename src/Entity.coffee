
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
		@id = uuid()
		@_class_ = Object.getPrototypeOf(@).constructor.name
		# TODO: depth system
		# @drawing_pieces = {}
	
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
	
	step: (world)->
	draw: (ctx)->
	
	# TODO: function to call into the depth system
	# drawStructure: (drawing_functions)->
	# 	for point_name, fn of drawing_functions.points
	# 		fn(@structure.points[point_name])
	# 	for segment_name, fn of drawing_functions.segments
	# 		fn(@structure.segments[segment_name])
