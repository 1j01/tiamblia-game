
# TODO: drag cursor

class @EntitiesBar
	constructor: (@editor)->
		# @cell_height = 20
		# @entity_class_names = Object.keys(entity_classes)
		# @height = @entity_class_names.length * @cell_height
		x = 10
		y = 10
		cell_height = 20
		@cells = []
		for entity_class_name, EntityClass of entity_classes
			@cells.push {
				EntityClass
				name: entity_class_name
				height: cell_height
				x, y
			}
			y += cell_height
		
		@hovered_cell = null
		@dragging_entity = null
	
	step: (mouse)->
		@hovered_cell = null
		for cell in @cells
			if (
				cell.y <= mouse.y <= cell.y + cell.height and
				cell.x <= mouse.x <= cell.x + cell.width
			)
				@hovered_cell = cell
		if mouse.clicked and @hovered_cell
			@editor.undoable =>
				# FIXME: entity appears at (0, 0) before being dragged
				# should instead only be created once dragged
				entity = new @hovered_cell.EntityClass
				@editor.world.entities.push entity
				@editor.dragging_entity = entity
				@editor.selected_entities = [entity]
		else
			@dragging_entity = null
		# @dragging_entity?
		@hovered_cell?
	
	drawAbsolute: (ctx)->
		# x = 0
		# y = 10
		# for entity_class_name in @entity_class_names
		# 	ctx.fillStyle = "black"
		# 	ctx.font = "#{@cell_height}px sans-serif"
		# 	ctx.fillText(entity_class_name, 10, y + @cell_height)
		# 	y += @cell_height
		for cell in @cells
			ctx.font = "#{cell.height}px sans-serif"
			cell.width = ctx.measureText(cell.name).width
			if cell is @hovered_cell
				# ctx.fillStyle = "black"
				# ctx.fillRect(cell.x, cell.y, cell.width, cell.height)
				ctx.fillStyle = "white"
			else
				ctx.fillStyle = "black"
			ctx.fillText(cell.name, cell.x, cell.y + cell.height)

