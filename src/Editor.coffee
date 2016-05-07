
dist2 = (v, w)-> (v.x - w.x) ** 2 + (v.y - w.y) ** 2
distToSegmentSquared = (p, v, w)->
	l2 = dist2(v, w)
	return dist2(p, v) if l2 is 0
	t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
	t = Math.max(0, Math.min(1, t))
	dist2(p, {
		x: v.x + t * (w.x - v.x)
		y: v.y + t * (w.y - v.y)
	})
distToSegment = (p, v, w)->
	Math.sqrt(distToSegmentSquared(p, v, w))

# TODO: animation editing
# TODO: marquee selection, undo/redo, saving/loading

class @Editor
	constructor: (@entities)->
		@editing_entity = null
		@hovering_entity = null
		@mouse_down_last = no
		
		addEventListener "keydown", (e)=>
			console.log e.keyCode
			if e.keyCode is 46 # Delete
				# @editing_entity.destroy()
				index = @entities.indexOf(@editing_entity)
				@entities.splice(index, 1) if index >= 0
				@editing_entity = null
			# 90 # Z
			# 89 # Y
			# 88 # X
			# 67 # C
			# 86 # V
	
	step: (mouse)->
		@hovering_entity = null
		for entity in @entities
			relative_mouse = {x: mouse.x - entity.x, y: mouse.y - entity.y}
			for segment_name, segment of entity.structure.segments
				# console.log distToSegment(mouse, segment.a, segment.b)
				if distToSegment(relative_mouse, segment.a, segment.b) < (segment.width ? 5)
					@hovering_entity = entity
		
		if mouse.down and not @mouse_down_last
			@editing_entity = @hovering_entity
		
		@editing_entity?.structure.stepLayout()
		# console.log @editing_entity, @hovering_entity
		
		@mouse_down_last = mouse.down
	
	draw: (ctx)->
		# @editing_entity?.debugDraw(ctx)
		# @hovering_entity?.debugDraw(ctx)
		
		if @editing_entity?
			ctx.save()
			ctx.translate(@editing_entity.x, @editing_entity.y)
			@editing_entity.debugDraw(ctx)
			ctx.restore()
		
		if @hovering_entity?
			ctx.save()
			ctx.translate(@hovering_entity.x, @hovering_entity.y)
			@hovering_entity.debugDraw(ctx)
			ctx.restore()
