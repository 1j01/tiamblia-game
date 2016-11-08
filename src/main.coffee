
seedrandom("A world")

world = new World

terrain = new SavannaGrass
world.entities.push terrain
terrain.x = 0
terrain.y = 0
terrain.generate()

canvas = document.createElement("canvas")
document.body.appendChild(canvas)
ctx = canvas.getContext("2d")

@view = new View
@mouse = new Mouse(view, canvas)

@editor = new Editor(world, view, canvas)
try
	editor.load()
catch e
	console?.error? "Failed to load save:", e

do animate = ->
	return if window.CRASHED
	requestAnimationFrame(animate)
	
	canvas.width = innerWidth unless canvas.width is innerWidth
	canvas.height = innerHeight unless canvas.height is innerHeight
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	if editor.entities_bar.hovered_cell or ((editor.hovered_points.length or editor.hovered_entities.length) and not editor.selection_box)
		canvas.classList.add("grabbable")
	else
		canvas.classList.remove("grabbable")
	
	for entity in world.entities when entity isnt editor.editing_entity and entity not in editor.dragging_entities
		entity.step(world)
	
	view.width = canvas.width
	view.height = canvas.height
	# view.center_x_to = player.x
	# view.center_y_to = player.y
	view.step()
	editor.step()
	mouse.endStep()
	
	world.drawBackground(ctx, view)
	ctx.save()
	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.scale(view.scale, view.scale)
	ctx.translate(-view.center_x, -view.center_y)
	
	world.draw(ctx, view)
	editor.draw(ctx, view)
	
	ctx.restore()
	
	editor.updateGUI()
	
	keyboard.endStep()

# index = 0
# setInterval ->
# 	entity = world.entities[index %% world.entities.length]
# 	editor.selected_entities = [entity]
# 	view.center_x_to = entity.x
# 	view.center_y_to = entity.y
# 	index += 1
# , 1500
