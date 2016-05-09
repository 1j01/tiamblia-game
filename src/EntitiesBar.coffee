
class @EntitiesBar
	constructor: (@editor)->
		x = 10
		y = 10
		cell_height = 25
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
		@gui_alpha = 0
	
	step: (mouse)->
		@hovered_cell = null
		for cell in @cells
			if (
				cell.y <= mouse.y <= cell.y + cell.height and
				cell.x <= mouse.x <= cell.x + cell.width
			)
				@hovered_cell = cell
		if @mouse_start and mouse.LMB.down
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
		else if mouse.LMB.pressed and @hovered_cell
			@mouse_start = {x: mouse.x, y: mouse.y, cell: @hovered_cell}
			@editor.selected_entities = []
		else
			@mouse_start = null
		# if @hovered_cell
		# 	mouse.setCursor("grab")
		return no if @editor.dragging_entity?
		@hovered_cell? or @mouse_start?
	
	drawAbsolute: (ctx)->
		show_gui = not @editor.dragging_entity?
		@gui_alpha += (show_gui - @gui_alpha) / 3
		width = 0
		width = Math.max(width, cell.width) for cell in @cells
		width = 0 if isNaN(width) # because we calculate cell.width(s) below
		height = @cells.length * @cells[0].height
		width += @cells[0].x * 2
		height += @cells[0].y * 2
		# ctx.
		grd1 = ctx.createLinearGradient(0, 0, 0, height*2)
		grd1.addColorStop(0, "rgba(0, 0, 0, 0.1)");
		grd1.addColorStop(1, "rgba(0, 0, 0, 0)")
		grd2 = ctx.createLinearGradient(0, 0, width*2, 0)
		grd2.addColorStop(0, "rgba(0, 0, 0, 0.4)");
		grd2.addColorStop(1, "rgba(0, 0, 0, 0)")
		ctx.globalAlpha = @gui_alpha
		ctx.fillStyle = grd1
		ctx.fillRect(0, 0, width, height*2)
		ctx.fillStyle = grd2
		ctx.fillRect(0, 0, width*2, height)
		ctx.globalAlpha = 1
		for cell in @cells
			ctx.font = "20px sans-serif"
			ctx.textBaseline = "bottom"
			cell.width = ctx.measureText(cell.name).width
			if cell is @hovered_cell
				# ctx.fillStyle = "rgba(0, 0, 0, #{@gui_alpha}"
				# ctx.fillRect(cell.x, cell.y, cell.width, cell.height)
				ctx.fillStyle = "rgba(255, 255, 255, #{@gui_alpha})"
			else
				# ctx.fillStyle = "rgba(255, 255, 255, #{@gui_alpha*0.6})"
				ctx.fillStyle = "rgba(200, 200, 200, #{@gui_alpha})"
			ctx.fillText(cell.name, cell.x, cell.y + cell.height)

