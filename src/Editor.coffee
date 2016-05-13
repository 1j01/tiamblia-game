
# TODO: animation editing
# TODO: reasonable terrain editing
# TODO: shift+select (and alternatively ctrl+select)

fs = require? "fs"
path = require? "path"

class @Editor
	constructor: (@world, @view)->
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
		@clipboard = {}
		@entities_bar = new EntitiesBar(@)
		if fs?
			@save_path = "world.json"
			# @save_path = path.join(nw.App.dataPath, "world.json")
		
		@mouse = {
			x: -Infinity, y: -Infinity
			LMB: {down: no, pressed: no}
			MMB: {down: no, pressed: no}
			RMB: {down: no, pressed: no}
			double_clicked: no
		}
		@mouse_drag_start_in_world = null
		
		addEventListener "mousemove", (e)=>
			@mouse.x = e.clientX
			@mouse.y = e.clientY
		
		addEventListener "mousedown", (e)=>
			MB = @mouse["#{"LMR"[e.button]}MB"]
			MB.down = true
			MB.pressed = true
		
		addEventListener "mouseup", (e)=>
			MB = @mouse["#{"LMR"[e.button]}MB"]
			MB.down = false
		
		addEventListener "dblclick", (e)=>
			MB = @mouse["#{"LMR"[e.button]}MB"]
			MB.pressed = true
			@mouse.double_clicked = true
			# TODO: reject double clicks where the first click was not on the same entity
		
		handle_scroll = (e)=>
			# TODO: zoom to/from mouse, i.e. keep the mouse's position anchored in the world
			@mouse.x = e.clientX
			@mouse.y = e.clientY
			pivot = @view.toWorld(@mouse)
			zoom_factor = 1.2
			current_scale = @view.scale
			new_scale_to =
				if e.detail < 0 or e.wheelDelta > 0
					@view.scale_to * zoom_factor
				else
					@view.scale_to / zoom_factor
			
			# @view.scale = new_scale_to
			# @view.toWorld(@mouse)
			@view.scale = current_scale
			@view.scale_to = new_scale_to
		
		addEventListener "mousewheel", handle_scroll
		addEventListener "DOMMouseScroll", handle_scroll
		
		addEventListener "keydown", (e)=>
			# console.log e.keyCode
			switch e.keyCode
				when 46 # Delete
					@delete()
				when 90 # Z
					if e.ctrlKey
						if e.shiftKey then @redo() else @undo()
				when 89 # Y
					@redo() if e.ctrlKey
				when 88 # X
					@cut() if e.ctrlKey
				when 67 # C
					@copy() if e.ctrlKey
				when 86 # V
					@paste() if e.ctrlKey
				when 65 # A
					@selectAll() if e.ctrlKey
	
	save: ->
		json = JSON.stringify(@world, null, "\t")
		if fs?
			fs.writeFileSync @save_path, json
		else
			localStorage["Tiamblia World"] = json
	
	load: ->
		if fs?
			json = fs.readFileSync(@save_path)
		else
			json = localStorage["Tiamblia World"]
		if json
			@world.fromJSON(JSON.parse(json)) if json
		else
			req = new XMLHttpRequest()
			req.addEventListener "load", (e)=>
				json = req.responseText
				@world.fromJSON(JSON.parse(json)) if json
			req.open("GET", "world.json")
			req.send()
	
	discardSave: ->
		if fs?
			fs.unlinkSync(@save_path)
		else
			delete localStorage["Tiamblia World"]
	
	toJSON: ->
		selected_entity_ids = (entity.id for entity in @selected_entities)
		editing_entity_id = @editing_entity?.id
		selected_point_names = []
		if @editing_entity?
			for point_name, point of @editing_entity.structure.points
				if point in @selected_points
					selected_point_names.push(point_name)
		{@world, selected_entity_ids, editing_entity_id, selected_point_names}
	
	fromJSON: (state)->
		@world.fromJSON(state.world)
		@hovered_entities = []
		@hovered_points = []
		@selected_entities = []
		@selected_points = []
		for entity_id in state.selected_entity_ids
			entity = @world.getEntityByID(entity_id)
			@selected_entities.push entity if entity?
		@editing_entity = @world.getEntityByID(state.editing_entity_id)
		if @editing_entity?
			for point_name in state.selected_point_names
				@selected_points.push(@editing_entity.structure.points[point_name])
	
	undoable: (fn)->
		@undos.push(JSON.stringify(@))
		@redos = []
		if fn?
			do fn
			@save()
	
	undo: ->
		@undo_or_redo(@undos, @redos)
	
	redo: ->
		@undo_or_redo(@redos, @undos)
	
	undo_or_redo: (undos, redos)->
		return if undos.length is 0
		redos.push(JSON.stringify(@))
		@fromJSON(JSON.parse(undos.pop()))
		@save()
	
	selectAll: ->
		if @editing_entity
			@selected_points = (point for point_name, point of @editing_entity.structure.points)
		else
			@selected_entities = (entity for entity in @world.entities)
	
	delete: ->
		if @selected_points.length
			plural = @selected_points.length > 1
			@undoable =>
				for segment_name, segment of @editing_entity.structure.segments
					if (segment.a in @selected_points) or (segment.b in @selected_points)
						delete @editing_entity.structure.segments[segment_name]
				for point_name, point of @editing_entity.structure.points
					if point in @selected_points
						delete @editing_entity.structure.points[point_name]
				@selected_points = []
				@dragging_points = []
			try
				@editing_entity.draw(document.createElement("canvas").getContext("2d"), new View)
			catch e
				@undo()
				if plural
					alert("Entity needs one or more of those points to render")
				else
					alert("Entity needs that point to render")
				return
			try
				ent_def = JSON.parse(JSON.stringify(@editing_entity))
				@editing_entity.step(@world)
				@editing_entity.fromJSON(ent_def)
			catch e
				@undo()
				console.warn "Entity failed to step after deletion, with", e
				if plural
					alert("Entity needs one or more of those points to step")
				else
					alert("Entity needs that point to step")
				return
		else
			@undoable =>
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
	
	cut: ->
		@copy()
		@delete()
	
	copy: ->
		if @selected_points.length
			alert("Copying points is not supported")
			# clipboard.point_positions = {}
		else
			@clipboard.entities =
				for entity in @selected_entities
					json: JSON.stringify(entity)
	
	paste: ->
		@undoable =>
			@selected_entities = []
			new_entities =
				for {json} in @clipboard.entities
					ent_def = JSON.parse(json)
					delete ent_def.id
					entity = Entity.fromJSON(ent_def)
					@world.entities.push(entity)
					@selected_entities.push(entity)
					entity
			
			centroids =
				for entity in new_entities
					centroid = {x: 0, y: 0}
					divisor = 0
					for point_name, point of entity.structure.points
						centroid.x += point.x
						centroid.y += point.y
						divisor += 1
					centroid.x /= divisor
					centroid.y /= divisor
					centroid_in_world = entity.toWorld(centroid)
					centroid_in_world
			
			center = {x: 0, y: 0}
			for centroid in centroids
				center.x += centroid.x
				center.y += centroid.y
			center.x /= centroids.length
			center.y /= centroids.length
			
			mouse_in_world = @view.toWorld(@mouse)
			
			for entity in new_entities
				entity.x += mouse_in_world.x - center.x
				entity.y += mouse_in_world.y - center.y
	
	step: ->
		
		mouse_in_use = @entities_bar.step(@mouse)
		if mouse_in_use
			@hovered_entities = []
			return
		
		mouse_in_world = @view.toWorld(@mouse)
		
		# min_grab_dist = (5 + 5 / Math.min(@view.scale, 1)) / 2
		# min_grab_dist = 8 / Math.min(@view.scale, 5)
		min_grab_dist = 8 / @view.scale
		# console.log @view.scale, min_grab_dist
		
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
		
		@view.center_x -= @view_drag_momentum.x
		@view.center_y -= @view_drag_momentum.y
		@view.center_x_to = @view.center_x
		@view.center_y_to = @view.center_y
		@view_drag_momentum.x *= 0.8
		@view_drag_momentum.y *= 0.8
		
		if @view_drag_start_in_world
			if @mouse.MMB.down
				@view.center_x -= mouse_in_world.x - @view_drag_start_in_world.x
				@view.center_y -= mouse_in_world.y - @view_drag_start_in_world.y
				@view.center_x_to = @view.center_x
				@view.center_y_to = @view.center_y
				@view_drag_momentum.x = 0
				@view_drag_momentum.y = 0
			else
				@view_drag_momentum.x = mouse_in_world.x - @view_drag_start_in_world.x
				@view_drag_momentum.y = mouse_in_world.y - @view_drag_start_in_world.y
				@view_drag_start_in_world = null
		else if @mouse.MMB.pressed
			@view_drag_start_in_world = {x: mouse_in_world.x, y: mouse_in_world.y}
		else if @mouse.double_clicked
			if @hovered_entities.length
				if @hovered_entities[0] in @selected_entities
					if @mouse.double_clicked
						@editing_entity = @hovered_entities[0]
						@selected_entities = [@editing_entity]
			else
				# TODO: don't exit editing mode if the entity being edited is hovered
				# except there needs to be a visual indication of hover for the editing entity
				# (there would be with the cursor if you could drag segments)
				# unless @editing_entity? and @distanceToEntity(@editing_entity, mouse_in_world) < min_grab_dist
				@editing_entity = null
				@selected_entities = []
				@selected_points = []
				@dragging_entities = []
				@dragging_points = []
		else if @dragging_entities.length
			if @mouse.LMB.down
				for entity, i in @dragging_entities
					entity.x = mouse_in_world.x + @drag_offsets[i].x
					entity.y = mouse_in_world.y + @drag_offsets[i].y
			else
				@save()
				for entity, i in @dragging_entities
					if entity.vx? and entity.vy?
						entity.vx = (mouse_in_world.x + @drag_offsets[i].x - entity.x) / 3
						entity.vy = (mouse_in_world.y + @drag_offsets[i].y - entity.y) / 3
				@dragging_entities = []
		else if @dragging_points.length
			if @mouse.LMB.down
				local_mouse_position = @editing_entity.fromWorld(mouse_in_world)
				for point, i in @dragging_points
					point.x = local_mouse_position.x + @drag_offsets[i].x
					point.y = local_mouse_position.y + @drag_offsets[i].y
			else
				@dragging_points = []
				@save()
		else if @dragging_segments.length
			if @mouse.LMB.down
				# TODO
			else
				@dragging_segments = []
				@save()
		else if @selection_box
			if @mouse.LMB.down
				@selection_box.x2 = mouse_in_world.x
				@selection_box.y2 = mouse_in_world.y
				if @editing_entity
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
				closest_dist = Infinity
				for entity in @world.entities
					dist = @distanceToEntity(entity, mouse_in_world)
					if dist < min_grab_dist and dist < closest_dist
						@hovered_entities = [entity]
						closest_dist = dist
			
			if @mouse.LMB.pressed
				@dragging_points = []
				@dragging_segments = []
				
				if @hovered_points.length
					if @hovered_points[0] in @selected_points
						@dragPoints(@selected_points, mouse_in_world)
					else
						@dragPoints(@hovered_points, mouse_in_world)
				else
					@selected_points = []
					
					if @hovered_entities.length
						if @hovered_entities[0] in @selected_entities
							@dragEntities(@selected_entities, mouse_in_world)
						else
							@dragEntities(@hovered_entities, mouse_in_world)
					else
						@selection_box = {x1: mouse_in_world.x, y1: mouse_in_world.y, x2: mouse_in_world.x, y2: mouse_in_world.y}
		
		if @editing_entity
			if @editing_entity.structure instanceof BoneStructure
			# TODO: and if there isn't an animation frame loaded
				@editing_entity.structure.stepLayout() for [0..250]
				# TODO: save afterwards at some point
		
		@mouse.LMB.pressed = false
		@mouse.MMB.pressed = false
		@mouse.RMB.pressed = false
		@mouse.double_clicked = false
	
	distanceToEntity: (entity, from_point_in_world)->
		from_point = entity.fromWorld(from_point_in_world)
		closest_dist = Infinity
		
		for segment_name, segment of entity.structure.segments
			dist = distanceToSegment(from_point, segment.a, segment.b)
			# dist = max(0, dist - segment.width / 2) if segment.width?
			closest_dist = min(closest_dist, dist)
			
		for point_name, point of entity.structure.points
			dist = distance(from_point, point)
			# dist = max(0, dist - segment.radius) if segment.radius?
			closest_dist = min(closest_dist, dist)
		
		closest_dist
	
	dragPoints: (points, mouse_in_world)->
		@selected_points = (point for point in points)
		@undoable()
		@dragging_points = (point for point in points)
		local_mouse_position = @editing_entity.fromWorld(mouse_in_world)
		@drag_offsets =
			for point in @dragging_points
				x: point.x - local_mouse_position.x
				y: point.y - local_mouse_position.y
	
	dragEntities: (entities, mouse_in_world)->
		@selected_entities = (entity for entity in entities)
		@undoable()
		@dragging_entities = (entity for entity in entities)
		@drag_offsets =
			for entity in @dragging_entities
				if mouse_in_world?
					x: entity.x - mouse_in_world.x
					y: entity.y - mouse_in_world.y
				else
					{x: 0, y: 0}
	
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
