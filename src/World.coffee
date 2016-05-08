
class @World
	constructor: ->
		@entities = []
	
	step: ->
		for entity in @entities
			entity.step()
	
	draw: (ctx, view)->
		for entity in @entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			entity.draw(ctx, view)
			ctx.restore()
