
class @World
	constructor: ->
		@entities = []
	
	fromJSON: (def)->
		unless def.entities instanceof Array
			throw new Error "Expected entities to be an array, got #{def.entities}"
		@entities = for ent_def in def.entities
			unless typeof ent_def._class_ is "string"
				console.error "Erroneous entity definition:", ent_def
				throw new Error "Expected entity to have a string _class_, _class_ is #{ent_def._class_}"
			unless entity_classes[ent_def._class_]
				throw new Error "Entity class '#{ent_def._class_}' does not exist"
			entity = new entity_classes[ent_def._class_]
			for k, v of ent_def when k isnt "_class_"
				if entity[k]?.fromJSON
					entity[k].fromJSON(v)
				else
					entity[k] = v
			entity.fromJSON?(ent_def)
			entity
	
	getEntityByID: (id)->
		for entity in @entities
			return entity if entity.id is id
	
	step: ->
		for entity in @entities
			entity.step()
	
	drawBackground: (ctx, view)->
		ctx.fillStyle = "#32C8FF"
		ctx.fillRect(0, 0, view.width, view.height)
	
	draw: (ctx, view)->
		# ctx.fillStyle = "#32C8FF" # "#96B8E6" # "#32C8FF"
		# # ctx.fillRect(-view.center_x, -view.center_y, view.width, view.height)
		# # ctx.fillRect(-view.width/2, -view.height/2, view.width, view.height)
		# {x, y} = view.toWorld({x: 10, y: 10})
		# {x: width, y: height} = view.toWorld({x: view.width, y: view.height})
		# ctx.fillRect(x, y, width, height)
		for entity in @entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			entity.draw(ctx, view)
			ctx.restore()
