
class @World
	constructor: ->
		@entities = []
	
	fromJSON: (def)->
		unless def.entities instanceof Array
			throw new Error "Expected entities to be an array, got #{def.entities}"
		@entities = (Entity.fromJSON(ent_def) for ent_def in def.entities)
	
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
		# ctx.fillStyle = "#32C8FF"
		# {x, y} = view.toWorld({x: 0, y: 0})
		# {x: width, y: height} = view.toWorld({x: view.width, y: view.height})
		# ctx.fillRect(x, y, width-x, height-y)
		for entity in @entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			entity.draw(ctx, view)
			ctx.restore()
