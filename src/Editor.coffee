
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
# TODO: undo/redo, saving/loading

class @Editor
	constructor: (@entities)->
		@selected_entities = []
		@hovered_entities = []
		@mouse_down_last = no
		@selection_box = null
		# @selection_box = {x1: 0, y1: 0, x2: 0, y2: 0}
		
		addEventListener "keydown", (e)=>
			# console.log e.keyCode
			switch e.keyCode
				when 46 # Delete
					# @editing_entity.destroy()
					for entity in @selected_entities
						index = @entities.indexOf(entity)
						@entities.splice(index, 1) if index >= 0
					@selected_entities = []
				when 90 # Z
					if e.ctrlKey
						if e.shiftKey then redo() else undo()
				when 89 # Y
					redo() if e.ctrlKey
				when 88 # X
					cut() if e.ctrlKey
				when 67 # C
					copy() if e.ctrlKey
				when 86 # V
					paste() if e.ctrlKey
	
	step: (mouse)->
		
		entity_within_selection_box = (entity)=>
			relative_x1 = @selection_box.x1 - entity.x
			relative_y1 = @selection_box.y1 - entity.y
			relative_x2 = @selection_box.x2 - entity.x
			relative_y2 = @selection_box.y2 - entity.y
			relative_min_x = Math.min(relative_x1, relative_x2)
			relative_max_x = Math.max(relative_x1, relative_x2)
			relative_min_y = Math.min(relative_y1, relative_y2)
			relative_max_y = Math.max(relative_y1, relative_y2)
			return false if Object.keys(entity.structure.segments).length is 0
			for segment_name, segment of entity.structure.segments
				unless (
					relative_min_x <= segment.a.x <= relative_max_x and
					relative_min_y <= segment.a.y <= relative_max_y and
					relative_min_x <= segment.b.x <= relative_max_x and
					relative_min_y <= segment.b.y <= relative_max_y
				)
					return false
			return true
		
		if @selection_box
			@selection_box.x2 = mouse.x
			@selection_box.y2 = mouse.y
			@hovered_entities = (entity for entity in @entities when entity_within_selection_box(entity))
			if not mouse.down
				@selected_entities = (entity for entity in @hovered_entities)
				@selection_box = null
		else
			@hovered_entities = []
			for entity in @entities
				relative_mouse = {x: mouse.x - entity.x, y: mouse.y - entity.y}
				for segment_name, segment of entity.structure.segments
					if distToSegment(relative_mouse, segment.a, segment.b) < (segment.width ? 5)
						@hovered_entities = [entity]
		
			if mouse.down and not @mouse_down_last
				if @hovered_entities.length
					@selected_entities = (entity for entity in @hovered_entities)
				else
					@selected_entities = []
					@selection_box = {x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y}
				
		
		for entity in @selected_entities
			entity.structure.stepLayout()
		
		@mouse_down_last = mouse.down
	
	draw: (ctx)->
		# @editing_entity?.debugDraw(ctx)
		# @hovering_entity?.debugDraw(ctx)
		
		draw_points = (entity)->
			for point_name, point of entity.structure.points
				ctx.beginPath()
				ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
				ctx.fillStyle = "red"
				ctx.fill()
		
		draw_segments = (entity)->
			for segment_name, segment of entity.structure.segments
				ctx.beginPath()
				ctx.moveTo(segment.a.x, segment.a.y)
				ctx.lineTo(segment.b.x, segment.b.y)
				ctx.strokeStyle = "#fa0"
				ctx.stroke()
		
		for entity in @selected_entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			draw_points(entity)
			draw_segments(entity)
			ctx.restore()
		
		for entity in @hovered_entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			ctx.globalAlpha = 0.5
			draw_segments(entity)
			ctx.restore()
		
		if @selection_box?
			ctx.save()
			ctx.beginPath()
			ctx.translate(0.5, 0.5)
			ctx.rect(@selection_box.x1, @selection_box.y1, @selection_box.x2 - @selection_box.x1, @selection_box.y2 - @selection_box.y1)
			ctx.fillStyle = "rgba(0, 155, 255, 0.1)"
			ctx.strokeStyle = "rgba(0, 155, 255, 0.4)"
			ctx.fill()
			ctx.stroke()
			ctx.restore()
