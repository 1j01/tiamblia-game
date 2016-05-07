
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
	constructor: (@entities, @view)->
		@selected_entities = []
		@hovered_entities = []
		@mouse_down_last = no
		@selection_box = null
		@editing_entity = null
		@dragging_point = null
		@dragging_segment = null
		
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
		
		if @dragging_point
			if mouse.down
				relative_mouse = {x: mouse.x - @editing_entity.x, y: mouse.y - @editing_entity.y}
				dx = relative_mouse.x - @dragging_point.x
				dy = relative_mouse.y - @dragging_point.y
				if @editing_entity.structure instanceof BoneStructure
					# prevent physics breaking by limiting the movement of an individual point
					dist = Math.sqrt(dx * dx + dy * dy)
					max_point_drag_dist = 200
					drag_entity_dist = Math.max(0, dist - max_point_drag_dist)
					drag_point_dist = Math.max(0, dist - drag_entity_dist)
					@dragging_point.x += dx / dist * drag_point_dist
					@dragging_point.y += dy / dist * drag_point_dist
					for point_name, point of @editing_entity.structure.points
						point.x += dx / dist * drag_entity_dist
						point.y += dy / dist * drag_entity_dist
				else
					@dragging_point.x = relative_mouse.x
					@dragging_point.y = relative_mouse.y
			else
				@dragging_point = null
		else if @dragging_segment
			if mouse.down
				# TODO
			else
				@dragging_segment = null
		else if @selection_box
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
				@dragging_point = null
				@dragging_segment = null
				if @editing_entity
					relative_mouse = {x: mouse.x - @editing_entity.x, y: mouse.y - @editing_entity.y}
					closest_dist = Infinity
					for point_name, point of @editing_entity.structure.points
						dist = Math.sqrt(dist2(relative_mouse, point))
						if dist < (5 + 5 / @view.scale) / 2 and dist < closest_dist
							closest_dist = dist
							@dragging_point = point
					unless @dragging_point
						closest_dist = Infinity
						for segment_name, segment of @editing_entity.structure.segments
							dist = distToSegment(relative_mouse, segment.a, segment.b)
							if dist < (segment.width ? 5) and dist < closest_dist
								closest_dist = dist
								@dragging_segment = segment
						unless @dragging_segment
							@editing_entity = null
				unless @editing_entity
					if @hovered_entities.length
						if @hovered_entities[0] in @selected_entities
							@editing_entity = @hovered_entities[0]
						else
							@selected_entities = (entity for entity in @hovered_entities)
					else
						@editing_entity = null
						@selected_entities = []
						@selection_box = {x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y}
		
		if @editing_entity
			if @editing_entity.structure instanceof BoneStructure
				# TODO: and if there isn't an animation frame loaded
				@editing_entity.structure.stepLayout() for [0..250]
		
		@mouse_down_last = mouse.down
	
	draw: (ctx)->
		
		draw_points = (entity, radius, fillStyle)=>
			for point_name, point of entity.structure.points
				ctx.beginPath()
				ctx.arc(point.x, point.y, radius / @view.scale, 0, Math.PI * 2)
				ctx.fillStyle = fillStyle
				ctx.fill()
				# ctx.fillText(point_name, point.x + radius * 2, point.y)
		
		draw_segments = (entity, lineWidth, strokeStyle)=>
			for segment_name, segment of entity.structure.segments
				ctx.beginPath()
				ctx.moveTo(segment.a.x, segment.a.y)
				ctx.lineTo(segment.b.x, segment.b.y)
				ctx.lineWidth = lineWidth / @view.scale
				ctx.lineCap = "round"
				ctx.strokeStyle = strokeStyle
				ctx.stroke()
		
		if @editing_entity
			ctx.save()
			ctx.translate(@editing_entity.x, @editing_entity.y)
			draw_points(@editing_entity, 3, "rgba(255, 0, 0, 1)")
			draw_segments(@editing_entity, 1, "rgba(255, 170, 0, 1)")
			ctx.restore()
		
		for entity in @selected_entities when entity isnt @editing_entity
			ctx.save()
			ctx.translate(entity.x, entity.y)
			draw_points(entity, 2, "rgba(255, 170, 0, 1)")
			draw_segments(entity, 1, "rgba(255, 170, 0, 1)")
			ctx.restore()
		
		for entity in @hovered_entities when entity not in @selected_entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			draw_segments(entity, 1, "rgba(255, 170, 0, 0.5)")
			ctx.restore()
		
		if @selection_box?
			ctx.save()
			ctx.beginPath()
			ctx.translate(0.5, 0.5) if @view.scale is 1
			ctx.rect(@selection_box.x1, @selection_box.y1, @selection_box.x2 - @selection_box.x1, @selection_box.y2 - @selection_box.y1)
			ctx.fillStyle = "rgba(0, 155, 255, 0.1)"
			ctx.strokeStyle = "rgba(0, 155, 255, 0.4)"
			ctx.lineWidth = 1 / @view.scale
			ctx.fill()
			ctx.stroke()
			ctx.restore()
