
class @EntitiesBar extends Bar
	constructor: ->
		super
		@element.classList.add("entities-bar")
		@cells = []
		
		cell_preview_width = 200
		max_cell_preview_height = 100
		for entity_class_name, EntityClass of entity_classes
			cell_name = entity_class_name.replace(/[a-z][A-Z]/g, (m)-> "#{m[0]} #{m[1]}")
			preview_entity = new EntityClass
			if preview_entity.structure instanceof BoneStructure
				unless preview_entity instanceof Tree
					preview_entity.structure.autoLayout() # because we don't have animations or anything yet
			preview_entity_bbox = preview_entity.bbox()
			preview_center_y = preview_entity_bbox.y + preview_entity_bbox.height / 2
			cell_preview_height = min(preview_entity_bbox.height, max_cell_preview_height)
			preview_scale = cell_preview_height / preview_entity_bbox.height
			preview_view = new View
			preview_view.width = cell_preview_width
			preview_view.height = cell_preview_height
			preview_view.scale = preview_scale
			preview_view.center_x = 0
			preview_view.center_y = preview_center_y
			preview_view.is_preview = true
			preview_canvas = document.createElement("canvas")
			preview_ctx = preview_canvas.getContext("2d")
			cell_el = document.createElement("article")
			cell_el.className = "cell grabbable"
			name_el = document.createElement("h1")
			name_el.className = "name"
			name_el.textContent = cell_name
			cell_el.appendChild(name_el)
			cell_el.appendChild(preview_canvas)
			
			cell = {
				EntityClass
				preview_entity
				name: cell_name
				preview_width: cell_preview_width
				preview_height: cell_preview_height
				preview_view
				preview_canvas
				preview_ctx
				element: cell_el
			}
			
			do (cell, cell_el)->
				cell_el.addEventListener "mousedown", (e)=>
					@editor.selected_entities = []
					mouse_start = {x: e.clientX, y: e.clientY}
					addEventListener "mousemove", onmousemove = (e)=>
						if distance(mouse_start, {x: e.clientX, y: e.clientY}) > 4
							@editor.undoable =>
								entity = new cell.EntityClass
								if entity.structure instanceof BoneStructure
									unless entity instanceof Tree
										entity.structure.autoLayout() # because we don't have animations or anything yet
								@editor.world.entities.push(entity)
								@editor.dragEntities([entity])
								removeEventListener "mousemove", onmousemove
								removeEventListener "mouseup", onmouseup
					addEventListener "mouseup", onmouseup = (e)=>
						removeEventListener "mousemove", onmousemove
						removeEventListener "mouseup", onmouseup
			
			@element.appendChild(cell_el)
			@cells.push(cell)
	
	draw: ->
		show = @editor.dragging_entities.length is 0
		@element.classList[if show then "add" else "remove"]("visible")
		for cell in @cells
			cell.preview_canvas.width = cell.preview_width
			cell.preview_canvas.height = cell.preview_height
			cell.preview_ctx.save()
			cell.preview_ctx.translate(cell.preview_width/2, cell.preview_height/2)
			cell.preview_ctx.scale(cell.preview_view.scale, cell.preview_view.scale)
			cell.preview_ctx.translate(-cell.preview_view.center_x, -cell.preview_view.center_y)
			cell.preview_entity.draw(cell.preview_ctx, cell.preview_view)
			cell.preview_ctx.restore()
