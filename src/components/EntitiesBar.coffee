
class @EntitiesBar extends React.Component
	constructor: ->
		super
		@state = {visible: no}
		@cells = []
		# cell_preview_width = 200
		# max_cell_preview_height = 100
		@entity_previews = []
		for entity_class_name, EntityClass of entity_classes
			cell_name = entity_class_name.replace(/[a-z][A-Z]/g, (m)-> "#{m[0]} #{m[1]}")
			preview_entity = new EntityClass
			if preview_entity.structure instanceof BoneStructure
				unless preview_entity instanceof Tree
					preview_entity.structure.autoLayout() # because we don't have animations or anything yet
			# cell_preview = E EntityPreview, entity: preview_entity, max_width: cell_preview_width, max_height: max_cell_preview_height
			cell = {
				EntityClass
				name: cell_name
				# preview: cell_preview
				preview_entity
			}
			@cells.push(cell)
	
	render: ->
		{editor} = @props
		{visible} = @state
		cell_preview_width = 200
		max_cell_preview_height = 100
		@entity_previews = []
		E ".bar.sidebar.entities-bar", class: {visible},
			for cell, i in @cells
				E "article.cell.grabbable",
					key: i
					# ref: (react_el)=>
					# 	cell.react_el = react_el
					onMouseDown: do (cell)=> (e)=>
						editor.selected_entities = []
						mouse_start = {x: e.clientX, y: e.clientY}
						addEventListener "mousemove", onmousemove = (e)=>
							if distance(mouse_start, {x: e.clientX, y: e.clientY}) > 4
								editor.undoable =>
									entity = new cell.EntityClass
									if entity.structure instanceof BoneStructure
										unless entity instanceof Tree
											entity.structure.autoLayout() # because we don't have animations or anything yet
									editor.world.entities.push(entity)
									editor.dragEntities([entity])
									removeEventListener "mousemove", onmousemove
									removeEventListener "mouseup", onmouseup
						addEventListener "mouseup", onmouseup = (e)=>
							removeEventListener "mousemove", onmousemove
							removeEventListener "mouseup", onmouseup
					E "h1.name", cell.name
					# cell.preview
					E EntityPreview,
						entity: cell.preview_entity
						max_width: cell_preview_width
						max_height: max_cell_preview_height
						ref: (ep)=>
							@entity_previews.push(ep) if ep?
	
	# componentDidMount: ->
	# 	{editor} = @props
	# 	cell_el = @refs.undefined
	# 	return
	# 	for cell 
	# 	cell_el.addEventListener "mousedown", (e)=>
	# 		editor.selected_entities = []
	# 		mouse_start = {x: e.clientX, y: e.clientY}
	# 		addEventListener "mousemove", onmousemove = (e)=>
	# 			if distance(mouse_start, {x: e.clientX, y: e.clientY}) > 4
	# 				editor.undoable =>
	# 					entity = new cell.EntityClass
	# 					if entity.structure instanceof BoneStructure
	# 						unless entity instanceof Tree
	# 							entity.structure.autoLayout() # because we don't have animations or anything yet
	# 					editor.world.entities.push(entity)
	# 					editor.dragEntities([entity])
	# 					removeEventListener "mousemove", onmousemove
	# 					removeEventListener "mouseup", onmouseup
	# 		addEventListener "mouseup", onmouseup = (e)=>
	# 			removeEventListener "mousemove", onmousemove
	# 			removeEventListener "mouseup", onmouseup
	
	update: (show)->
		{editor} = @props
		
		show = show and editor.dragging_entities.length is 0 and not editor.editing_entity
		if show isnt @state.visible
			@setState visible: show
		
		# for cell in @cells
		# 	cell.preview.update()
		
		if show
			for entity_preview in @entity_previews
				entity_preview.update()
