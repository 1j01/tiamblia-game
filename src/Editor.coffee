
# TODO: animation editing
# TODO: reasonable terrain editing
# TODO: shift+select (and alternatively ctrl+select)

fs = require? "fs"
path = require? "path"

class @Editor
	constructor: (@world)->
		@selected_entities = []
		@hovered_entities = []
		@selected_points = []
		@hovered_points = []
		@selection_box = null
		@editing_entity = null
		@last_click_time = null
		@dragging_points = []
		@dragging_segments = []
		@dragging_entities = []
		@drag_offsets = []
		@view_drag_start_in_world = null
		@view_drag_momentum = {x: 0, y: 0}
		@undos = []
		@redos = []
		@entities_bar = new EntitiesBar(@)
		if fs?
			@save_path = "world.json"
			# @save_path = path.join(nw.App.dataPath, "world.json")
		
		addEventListener "keydown", (e)=>
			# console.log e.keyCode
			switch e.keyCode
				when 46 # Delete
					@undoable =>
						unless @selected_points.length
							# @editing_entity.destroy()
							for entity in @selected_entities
								index = @world.entities.indexOf(entity)
								@world.entities.splice(index, 1) if index >= 0
							@selected_entities = []
							# @selected_segments = []
							@selected_points = []
							@dragging_points = []
							# @dragging_segments = []
							@dragging_entities = []
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
		json = JSON.stringify(@world, null, "\t")
		if fs?
			fs.writeFileSync @save_path, json
		else
			localStorage["Tiamblia World"] = json
	
	load: ->
		if fs?
			json = fs.readFileSync @save_path
		else
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
		@hovered_points = []
		@selected_entities = []
		@selected_points = []
		for id in selected_entity_ids
			entity = @world.getEntityByID(id)
			@selected_entities.push entity if entity?
		# TODO: save for selected points
		@editing_entity = @world.getEntityByID(editing_entity_id)
		@save()
		# TODO: DRY
	
	redo: ->
		return if @redos.length is 0
		selected_entity_ids = (entity.id for entity in @selected_entities)
		editing_entity_id = @editing_entity?.id
		@undos.push(JSON.stringify(@world))
		@world.fromJSON(JSON.parse(@redos.pop()))
		@hovered_entities = []
		@hovered_points = []
		@selected_entities = []
		@selected_points = []
		for id in selected_entity_ids
			entity = @world.getEntityByID(id)
			@selected_entities.push entity if entity?
		# TODO: save for selected points
		@editing_entity = @world.getEntityByID(editing_entity_id)
		@save()
		# TODO: DRY
	
	step: (mouse, view)->
		
		mouse_in_use = @entities_bar.step(mouse)
		if mouse_in_use
			@hovered_entities = []
			return
		
		mouse_in_world = view.toWorld(mouse)
		
		point_within_selection_box = (entity, point)=>
			relative_x1 = @selection_box.x1 - entity.x
			relative_y1 = @selection_box.y1 - entity.y
			relative_x2 = @selection_box.x2 - entity.x
			relative_y2 = @selection_box.y2 - entity.y
			relative_min_x = min(relative_x1, relative_x2)
			relative_max_x = max(relative_x1, relative_x2)
			relative_min_y = min(relative_y1, relative_y2)
			relative_max_y = max(relative_y1, relative_y2)
			relative_min_x <= point.x <= relative_max_x and
			relative_min_y <= point.y <= relative_max_y and
			relative_min_x <= point.x <= relative_max_x and
			relative_min_y <= point.y <= relative_max_y
		
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
		
		view.center_x -= @view_drag_momentum.x
		view.center_y -= @view_drag_momentum.y
		view.center_x_to = view.center_x
		view.center_y_to = view.center_y
		@view_drag_momentum.x *= 0.8
		@view_drag_momentum.y *= 0.8
		
		if @view_drag_start_in_world
			if mouse.MMB.down
				view.center_x -= mouse_in_world.x - @view_drag_start_in_world.x
				view.center_y -= mouse_in_world.y - @view_drag_start_in_world.y
				view.center_x_to = view.center_x
				view.center_y_to = view.center_y
				@view_drag_momentum.x = 0
				@view_drag_momentum.y = 0
			else
				@view_drag_momentum.x = mouse_in_world.x - @view_drag_start_in_world.x
				@view_drag_momentum.y = mouse_in_world.y - @view_drag_start_in_world.y
				@view_drag_start_in_world = null
		else if mouse.MMB.pressed
			@view_drag_start_in_world = {x: mouse_in_world.x, y: mouse_in_world.y}
		else if mouse.double_clicked
			if @hovered_entities.length
				if @hovered_entities[0] in @selected_entities
					if mouse.double_clicked
						@editing_entity = @hovered_entities[0]
						@selected_entities = [@editing_entity]
			else
				@editing_entity = null
				@selected_entities = []
				@selected_points = []
				@dragging_entities = []
				@dragging_points = []
		else if @dragging_entities.length
			if mouse.LMB.down
				for entity, i in @dragging_entities
					entity.x = mouse_in_world.x + @drag_offsets[i].x
					entity.y = mouse_in_world.y + @drag_offsets[i].y
			else
				@dragging_entities = []
				@save()
		else if @dragging_points.length
			if mouse.LMB.down
				local_mouse_position = @editing_entity.fromWorld(mouse_in_world)
				for point, i in @dragging_points
					point.x = local_mouse_position.x + @drag_offsets[i].x
					point.y = local_mouse_position.y + @drag_offsets[i].y
			else
				@dragging_points = []
				@save()
		else if @dragging_segments.length
			if mouse.LMB.down
				# TODO
			else
				@dragging_segments = []
				@save()
		else if @selection_box
			if mouse.LMB.down
				@selection_box.x2 = mouse_in_world.x
				@selection_box.y2 = mouse_in_world.y
				if @editing_entity
					# TODO
					@hovered_points = (point for point_name, point of @editing_entity.structure.points when point_within_selection_box(@editing_entity, point))
				else
					@hovered_entities = (entity for entity in @world.entities when entity_within_selection_box(entity))
			else
				if @editing_entity
					@selected_points = (entity for entity in @hovered_points)
				else
					@selected_entities = (entity for entity in @hovered_entities)
				@selection_box = null
		else
			@hovered_entities = []
			@hovered_points = []
			if @editing_entity
				local_mouse_position = @editing_entity.fromWorld(mouse_in_world)
				closest_dist = Infinity
				# min_grab_dist = (5 + 5 / Math.min(view.scale, 1)) / 2
				# min_grab_dist = 8 / Math.min(view.scale, 5)
				min_grab_dist = 8 / view.scale
				# console.log view.scale, min_grab_dist
				for point_name, point of @editing_entity.structure.points
					dist = distance(local_mouse_position, point)
					if dist < min_grab_dist and dist < closest_dist
						closest_dist = dist
						@hovered_points = [point]
				unless @hovered_points.length
					closest_dist = Infinity
					for segment_name, segment of @editing_entity.structure.segments
						dist = distanceToSegment(local_mouse_position, segment.a, segment.b)
						if dist < (segment.width ? 5) and dist < closest_dist
							closest_dist = dist
							@hovered_segments = [segment]
			else
				for entity in @world.entities
					local_mouse_position = entity.fromWorld(mouse_in_world)
					for segment_name, segment of entity.structure.segments
						if distanceToSegment(local_mouse_position, segment.a, segment.b) < (segment.width ? if entity.structure instanceof PolygonStructure then 10 else 5) / view.scale
							@hovered_entities = [entity]
			
			if mouse.LMB.pressed
				@dragging_points = []
				@dragging_segments = []
				
				if @hovered_points.length # or @hovered_segment
					unless @hovered_points[0] in @selected_points
						@selected_points = (point for point in @hovered_points)
					# @selected_segments = (segment for segment in @hovered_segments)
					@undoable()
					@dragging_points = (point for point in @selected_points)
					# @dragging_segments = (segment for segment in @hovered_segments)
					local_mouse_position = @editing_entity.fromWorld(mouse_in_world)
					@drag_offsets =
						for point in @dragging_points
							x: point.x - local_mouse_position.x
							y: point.y - local_mouse_position.y
				else
					# @editing_entity = null
					@selected_points = []
					
					if @hovered_entities.length
						if @hovered_entities[0] in @selected_entities
							# @selected_entities = (entity for entity in @selected_entities)
							@undoable()
							@dragging_entities = (entity for entity in @selected_entities)
							@drag_offsets =
								for entity in @selected_entities
									x: entity.x - mouse_in_world.x
									y: entity.y - mouse_in_world.y
						else
							@selected_entities = (entity for entity in @hovered_entities)
							@undoable()
							@dragging_entities = (entity for entity in @hovered_entities)
							@drag_offsets =
								for entity in @dragging_entities
									x: entity.x - mouse_in_world.x
									y: entity.y - mouse_in_world.y
					else
						@selection_box = {x1: mouse_in_world.x, y1: mouse_in_world.y, x2: mouse_in_world.x, y2: mouse_in_world.y}
		
		if @editing_entity
			if @editing_entity.structure instanceof BoneStructure
			# TODO: and if there isn't an animation frame loaded
				@editing_entity.structure.stepLayout() for [0..250]
				# TODO: save afterwards at some point
	
	draw: (ctx, view)->
		
		draw_points = (entity, radius, fillStyle)=>
			for point_name, point of entity.structure.points
				ctx.beginPath()
				ctx.arc(point.x, point.y, radius / view.scale, 0, TAU)
				# ctx.lineWidth = 1 / view.scale
				# ctx.strokeStyle = "black"
				# ctx.stroke()
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
		
		if @editing_entity?
			ctx.save()
			ctx.translate(@editing_entity.x, @editing_entity.y)
			# draw_points(@selected_points, 2, "rgba(255, 170, 0, 0.2)")
			for point in @selected_points
				ctx.beginPath()
				ctx.arc(point.x, point.y, 3 / view.scale, 0, TAU)
				ctx.fillStyle = "rgba(255, 0, 0, 1)"
				ctx.fill()
				ctx.lineWidth = 1.5 / view.scale
				ctx.strokeStyle = "rgba(255, 170, 0, 1)"
				ctx.stroke()
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
