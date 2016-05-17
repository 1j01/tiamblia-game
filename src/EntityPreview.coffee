
class @EntityPreview
	constructor: (@entity, {max_width, max_height})->
		@view = new View
		entity_bbox = @entity.bbox()
		center_y = entity_bbox.y + entity_bbox.height / 2
		height = min(entity_bbox.height, max_height)
		scale = height / entity_bbox.height
		@view = new View
		@view.width = max_width
		@view.height = height
		@view.scale = scale
		@view.center_x = 0
		@view.center_y = center_y
		@view.is_preview = true
		@canvas = document.createElement("canvas")
		@ctx = @canvas.getContext("2d")
	
	update: ->
		@canvas.width = @view.width
		@canvas.height = @view.height
		@ctx.save()
		@ctx.translate(@view.width/2, @view.height/2)
		@ctx.scale(@view.scale, @view.scale)
		@ctx.translate(-@view.center_x, -@view.center_y)
		@entity.draw(@ctx, @view)
		@ctx.restore()
