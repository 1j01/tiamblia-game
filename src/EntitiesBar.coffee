
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
			cell_preview = new EntityPreview(preview_entity, max_width: 200, max_height: max_cell_preview_height)
			cell_el = document.createElement("article")
			cell_el.className = "cell grabbable"
			name_el = document.createElement("h1")
			name_el.className = "name"
			name_el.textContent = cell_name
			cell_el.appendChild(name_el)
			cell_el.appendChild(cell_preview.canvas)
			
			cell = {
				EntityClass
				name: cell_name
				preview: cell_preview
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
	
	update: ->
		show = @editor.dragging_entities.length is 0 and not @editor.editing_entity
		@element.classList[if show then "add" else "remove"]("visible")
		for cell in @cells
			cell.preview.update()
