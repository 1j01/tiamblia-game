
class @World
	constructor: ->
		@entities = []
	
	toJSON: ->
		entities: for entity in @entities
			ent_def = entity.toJSON()
			ent_def._class_ = Object.getPrototypeOf(entity).constructor.name
			ent_def
	
	fromJSON: (def)->
		unless def.entities instanceof Array
			throw new Error "Expected entities to be an array, got #{object.entities}"
		@entities = for ent_def in def.entities
			unless typeof ent_def._class_ is "string"
				throw new Error "Expected entitiy to have a _class_, _class_ is #{ent_def._class_}"
			# console.log "create entity", ent_def._class_, ent_def
			entity = new window[ent_def._class_]
			entity[k] = v for k, v of ent_def when k not in ["_class_", "structure"]
			entity.fromJSON(ent_def)
			entity
	
	getEntityByID: (id)->
		for entity in @entities
			return entity if entity.id is id
	
	step: ->
		for entity in @entities
			entity.step()
	
	draw: (ctx, view)->
		for entity in @entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			entity.draw(ctx, view)
			ctx.restore()
