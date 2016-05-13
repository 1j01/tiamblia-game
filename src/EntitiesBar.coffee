
class @EntitiesBar
	constructor: (@editor)->
		x = 10
		y = 10
		padding_height = 20
		cell_text_height = 25
		max_cell_preview_height = 100
		cell_preview_height = 50
		@cells = []
		for entity_class_name, EntityClass of entity_classes
			preview_entity = new EntityClass
			if preview_entity.structure instanceof BoneStructure
				unless preview_entity instanceof Tree
					preview_entity.structure.autoLayout() # because we don't have animations or anything yet
			preview_entity_bbox = preview_entity.bbox()
			preview_center_y = preview_entity_bbox.y + preview_entity_bbox.height / 2
			cell_preview_height = min(preview_entity_bbox.height, max_cell_preview_height)
			preview_scale = cell_preview_height / preview_entity_bbox.height
			cell_height = cell_preview_height + cell_text_height + padding_height
			@cells.push {
				EntityClass
				preview_entity
				name: entity_class_name.replace(/[a-z][A-Z]/g, (m)-> "#{m[0]} #{m[1]}")
				height: cell_height
				padding_height
				preview_height: cell_preview_height
				text_height: cell_text_height
				preview_scale
				preview_center_y
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
				# cell.x <= mouse.x <= cell.x + cell.width
				0 <= mouse.x <= @width
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
					@editor.dragEntities([entity])
					@mouse_start = null
		else if mouse.LMB.pressed and @hovered_cell
			@mouse_start = {x: mouse.x, y: mouse.y, cell: @hovered_cell}
			@editor.selected_entities = []
		else
			@mouse_start = null
		return no if @editor.dragging_entities.length
		@hovered_cell? or @mouse_start?
	
	drawAbsolute: (ctx)->
		show_gui = @editor.dragging_entities.length is 0
		@gui_alpha += (show_gui - @gui_alpha) / 3
		@width = 0
		@width = Math.max(@width, cell.width) for cell in @cells
		@width = 0 if isNaN(@width) # because we calculate cell.width(s) below
		@height = 0
		@height += cell.height for cell in @cells
		@width += @cells[0].x * 2
		@height += @cells[0].y * 2
		ctx.save()
		grd1 = ctx.createLinearGradient(0, 0, 0, @height*2)
		grd1.addColorStop(0, "rgba(0, 0, 0, 0.2)");
		grd1.addColorStop(1, "rgba(0, 0, 0, 0)")
		grd2 = ctx.createLinearGradient(0, 0, @width*2, 0)
		grd2.addColorStop(0, "rgba(0, 0, 0, 0.5)");
		grd2.addColorStop(1, "rgba(0, 0, 0, 0)")
		ctx.globalAlpha = @gui_alpha
		ctx.fillStyle = grd1
		ctx.fillRect(0, 0, @width, @height*2)
		ctx.fillStyle = grd2
		ctx.fillRect(0, 0, @width*2, @height)
		
		for cell in @cells
			# ctx.fillStyle = "rgba(50, 200, 255, 0.8)" #"rgb(61, 168, 216)" #"rgba(50, 200, 255, 0.9)" #"rgba(255, 255, 255, 0.5)"
			if cell is @hovered_cell
				ctx.fillStyle = "rgba(50, 200, 255, 1)"
			else
				ctx.fillStyle = "rgba(50, 200, 255, 0.7)"
			ctx.fillRect(cell.x, cell.y + cell.padding_height, @width - cell.x * 2, cell.preview_height)
			
			# TODO: draw the entity preview to a canvas so it can fade in/out better
			# (and won't be affected by entities that decide to use globalAlpha)
			ctx.save()
			ctx.translate(@width/2, cell.y + cell.padding_height + cell.preview_height/2)
			ctx.scale(cell.preview_scale, cell.preview_scale)
			ctx.translate(0, -cell.preview_center_y)
			fake_view = testRect: -> yes
			cell.preview_entity.draw(ctx, fake_view)
			ctx.restore()
			
			ctx.font = "20px sans-serif"
			ctx.textBaseline = "bottom"
			ctx.textAlign = "center"
			cell.width = ctx.measureText(cell.name).width
			if cell is @hovered_cell
				ctx.fillStyle = "rgb(255, 255, 255)"
			else
				ctx.fillStyle = "rgb(200, 200, 200)"
			ctx.fillText(cell.name, @width/2, cell.y + cell.height)
		
		ctx.restore()
