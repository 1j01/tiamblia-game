
# TODO: animation editing
# TODO: reasonable terrain editing
# TODO: drag entities
# TODO: cursors
# TODO: shift+select (and alternatively ctrl+select)
# TODO: select multiple points the same ways as entities
# TODO: save to a file instead of just localStorage
# (will need a server or nw.js/electron)

class @Editor
	constructor: (@world)->
		@selected_entities = []
		@hovered_entities = []
		@selection_box = null
		@editing_entity = null
		@dragging_point = null
		@dragging_segment = null
		@dragging_entity = null
		@undos = []
		@redos = []
		@entities_bar = new EntitiesBar(@)
		
		addEventListener "keydown", (e)=>
			# console.log e.keyCode
			switch e.keyCode
				when 46 # Delete
					@undoable =>
						# @editing_entity.destroy()
						for entity in @selected_entities
							index = @world.entities.indexOf(entity)
							@world.entities.splice(index, 1) if index >= 0
						@selected_entities = []
						@editing_entity = null
				when 90 # Z
					if e.ctrlKey
						if e.shiftKey then @redo() else @undo()
				when 89 # Y
					@redo() if e.ctrlKey
				when 88 # X
					TODO: cut() if e.ctrlKey
				when 67 # C
					TODO: copy() if e.ctrlKey
				when 86 # V
					TODO: paste() if e.ctrlKey
				when 65 # A
					TODO: select_all() if e.ctrlKey
	
	save: ->
		json = JSON.stringify(@world)
		localStorage["Tiamblia World"] = json
	
	load: ->
		json = localStorage["Tiamblia World"]
		@world.fromJSON(JSON.parse(json)) if json
	
	discardSave: ->
		delete localStorage["Tiamblia World"]
	
	undoable: (fn)->
		# TODO: store the current selection and editing entity in the undo state
		@undos.push(JSON.stringify(@world))
		@redos = []
		if fn?
			do fn
			@save()
	
	undo: ->
		return if @undos.length is 0
		selected_entity_ids = (entity.id for entity in @selected_entities)
		editing_entity_id = @editing_entity?.id
		@redos.push(JSON.stringify(@world))
		@world.fromJSON(JSON.parse(@undos.pop()))
		@hovered_entities = []
		@selected_entities = []
		for id in selected_entity_ids
			entity = @world.getEntityByID(id)
			@selected_entities.push entity if entity?
		@editing_entity = @world.getEntityByID(editing_entity_id)
		@save()
	
	redo: ->
		return if @redos.length is 0
		selected_entity_ids = (entity.id for entity in @selected_entities)
		editing_entity_id = @editing_entity?.id
		@undos.push(JSON.stringify(@world))
		@world.fromJSON(JSON.parse(@redos.pop()))
		@hovered_entities = []
		for id in selected_entity_ids
			entity = @world.getEntityByID(id)
			@selected_entities.push entity if entity?
		@editing_entity = @world.getEntityByID(editing_entity_id)
		@save()
	
	step: (mouse, view)->
		
		mouse_in_use = @entities_bar.step(mouse)
		if mouse_in_use
			@hovered_entities = []
			return
		
		mouse_in_world = view.toWorld(mouse)
		
		entity_within_selection_box = (entity)=>
			relative_x1 = @selection_box.x1 - entity.x
			relative_y1 = @selection_box.y1 - entity.y
			relative_x2 = @selection_box.x2 - entity.x
			relative_y2 = @selection_box.y2 - entity.y
			relative_min_x = min(relative_x1, relative_x2)
			relative_max_x = max(relative_x1, relative_x2)
			relative_min_y = min(relative_y1, relative_y2)
			relative_max_y = max(relative_y1, relative_y2)
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
		
		
		if @dragging_entity
			# mouse.setCursor("grabbing")
			if mouse.down
				@dragging_entity.x = mouse_in_world.x
				@dragging_entity.y = mouse_in_world.y
			else
				@dragging_entity = null
				@save()
		else if @dragging_point
			if mouse.down
				# TODO: add helper in Entity
				relative_mouse = {
					x: mouse_in_world.x - @editing_entity.x
					y: mouse_in_world.y - @editing_entity.y
				}
				if @editing_entity.structure instanceof BoneStructure
					# try to prevent physics breaking by limiting the movement of an individual point
					# FIXME: physics can still break under some conditions so fix this in a different way
					# plus dragging the GranddaddyLonglegs by its head feels really glitchy now
					dist = distance(relative_mouse, @dragging_point)
					dx = relative_mouse.x - @dragging_point.x
					dy = relative_mouse.y - @dragging_point.y
					max_point_drag_dist = 200
					drag_entity_dist = max(0, dist - max_point_drag_dist)
					drag_point_dist = max(0, dist - drag_entity_dist)
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
				@save()
		else if @dragging_segment
			if mouse.down
				# TODO
			else
				@dragging_segment = null
				@save()
		else if @selection_box
			@selection_box.x2 = mouse_in_world.x
			@selection_box.y2 = mouse_in_world.y
			@hovered_entities = (entity for entity in @world.entities when entity_within_selection_box(entity))
			if not mouse.down
				@selected_entities = (entity for entity in @hovered_entities)
				@selection_box = null
		else
			@hovered_entities = []
			for entity in @world.entities
				relative_mouse = {
					x: mouse_in_world.x - entity.x
					y: mouse_in_world.y - entity.y
				}
				for segment_name, segment of entity.structure.segments
					if distanceToSegment(relative_mouse, segment.a, segment.b) < (segment.width ? if entity.structure instanceof PolygonStructure then 10 else 5) / view.scale
						@hovered_entities = [entity]
			
			if mouse.clicked
				@dragging_point = null
				@dragging_segment = null
				if @editing_entity
					relative_mouse = {
						x: mouse_in_world.x - @editing_entity.x
						y: mouse_in_world.y - @editing_entity.y
					}
					closest_dist = Infinity
					# min_grab_dist = (5 + 5 / Math.min(view.scale, 1)) / 2
					# min_grab_dist = 8 / Math.min(view.scale, 5)
					min_grab_dist = 8 / view.scale
					# console.log view.scale, min_grab_dist
					for point_name, point of @editing_entity.structure.points
						dist = distance(relative_mouse, point)
						if dist < min_grab_dist and dist < closest_dist
							closest_dist = dist
							@dragging_point = point
					unless @dragging_point
						closest_dist = Infinity
						for segment_name, segment of @editing_entity.structure.segments
							dist = distanceToSegment(relative_mouse, segment.a, segment.b)
							if dist < (segment.width ? 5) and dist < closest_dist
								closest_dist = dist
								@dragging_segment = segment
					if @dragging_point or @dragging_segment
						@undoable()
					else
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
						@selection_box = {x1: mouse_in_world.x, y1: mouse_in_world.y, x2: mouse_in_world.x, y2: mouse_in_world.y}
		
		if @editing_entity
			if @editing_entity.structure instanceof BoneStructure
				# TODO: and if there isn't an animation frame loaded
				@editing_entity.structure.stepLayout() for [0..250]
	
	draw: (ctx, view)->
		
		draw_points = (entity, radius, fillStyle)=>
			for point_name, point of entity.structure.points
				ctx.beginPath()
				ctx.arc(point.x, point.y, radius / view.scale, 0, TAU)
				ctx.fillStyle = fillStyle
				ctx.fill()
				# ctx.fillText(point_name, point.x + radius * 2, point.y)
		
		draw_segments = (entity, lineWidth, strokeStyle)=>
			for segment_name, segment of entity.structure.segments
				ctx.beginPath()
				ctx.moveTo(segment.a.x, segment.a.y)
				ctx.lineTo(segment.b.x, segment.b.y)
				ctx.lineWidth = lineWidth / view.scale
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
			draw_points(entity, 2, "rgba(255, 170, 0, 0.2)")
			draw_segments(entity, 1, "rgba(255, 170, 0, 0.5)")
			ctx.restore()
		
		if @selection_box?
			ctx.save()
			ctx.beginPath()
			ctx.translate(0.5, 0.5) if view.scale is 1
			ctx.rect(@selection_box.x1, @selection_box.y1, @selection_box.x2 - @selection_box.x1, @selection_box.y2 - @selection_box.y1)
			ctx.fillStyle = "rgba(0, 155, 255, 0.1)"
			ctx.strokeStyle = "rgba(0, 155, 255, 0.8)"
			ctx.lineWidth = 1 / view.scale
			ctx.fill()
			ctx.stroke()
			ctx.restore()
	
	drawAbsolute: (ctx)->
		@entities_bar.drawAbsolute(ctx)
