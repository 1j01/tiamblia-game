
# TODO: drag cursor

class @EntitiesBar
	constructor: (@editor)->
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
		@mouse_start = null
	
	step: (mouse)->
		@hovered_cell = null
		for cell in @cells
			if (
				cell.y <= mouse.y <= cell.y + cell.height and
				cell.x <= mouse.x <= cell.x + cell.width
			)
				@hovered_cell = cell
		if @mouse_start and mouse.down
			if distance(@mouse_start, mouse) > 4
				@editor.undoable =>
					entity = new @mouse_start.cell.EntityClass
					if entity.structure instanceof BoneStructure
						unless entity instanceof Tree
							entity.structure.autoLayout() # because we don't have animations or anything yet
					@editor.world.entities.push entity
					@editor.dragging_entity = entity
					@editor.selected_entities = [entity]
					@mouse_start = null
		else if mouse.clicked and @hovered_cell
			@mouse_start = {x: mouse.x, y: mouse.y, cell: @hovered_cell}
			@editor.selected_entities = []
		else
			@mouse_start = null
		return no if @editor.dragging_entity?
		@hovered_cell? or @mouse_start?
	
	drawAbsolute: (ctx)->
		return if @editor.dragging_entity?
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

