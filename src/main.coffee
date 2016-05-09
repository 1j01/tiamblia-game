
seedrandom("A world")

world = new World

gdll = new GranddaddyLonglegs
world.entities.push gdll
gdll.x = 200
gdll.y = 50
gdll.structure.autoLayout()

player = new Player
world.entities.push player
player.x = -100
player.y = 0
player.structure.autoLayout()

terrain = new Terrain
world.entities.push terrain
terrain.x = 0
terrain.y = 0
terrain.generate()

tree = new Tree
world.entities.push tree
tree.x = -200
tree.y = -50
# tree.generate()

canvas = document.createElement("canvas")
document.body.appendChild(canvas)
ctx = canvas.getContext("2d")

@view = new View

@editor = new Editor(world)
try
	editor.load()
catch e
	console?.error? "Failed to load save:", e

mouse = {
	x: -Infinity, y: -Infinity
	LMB: {down: no, pressed: no}
	MMB: {down: no, pressed: no}
	RMB: {down: no, pressed: no}
}
# mouse.setCursor = (cursor)->
# 	# console.log cursor
# 	if cursor is "grab"
# 		canvas.style.cursor = "-moz-grab"
# 		canvas.style.cursor = "-webkit-grab"
# 	if cursor is "grabbing"
# 		canvas.style.cursor = "-moz-grabbing"
# 		canvas.style.cursor = "-webkit-grabbing"
# 	canvas.style.cursor = cursor
# 	# console.log canvas.style.cursor

mouse_drag_start_in_world = null

addEventListener "mousemove", (e)->
	mouse.x = e.clientX
	mouse.y = e.clientY

addEventListener "mousedown", (e)->
	MB = mouse["#{"LMR"[e.button]}MB"]
	MB.down = true
	MB.pressed = true

addEventListener "mouseup", (e)->
	MB = mouse["#{"LMR"[e.button]}MB"]
	MB.down = false

handle_scroll = (e)->
	mouse.x = e.clientX
	mouse.y = e.clientY
	pivot = view.toWorld(mouse)
	zoom_factor = 1.2
	current_scale = view.scale
	new_scale_to =
		if e.detail < 0 or e.wheelDelta > 0
			view.scale_to * zoom_factor
		else
			view.scale_to / zoom_factor
	
	# view.scale = new_scale_to
	# view.toWorld(mouse)
	view.scale = current_scale
	view.scale_to = new_scale_to

addEventListener "mousewheel", handle_scroll
addEventListener "DOMMouseScroll", handle_scroll

do animate = ->
	
	requestAnimationFrame(animate)
	
	canvas.width = innerWidth unless canvas.width is innerWidth
	canvas.height = innerHeight unless canvas.height is innerHeight
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	# mouse.setCursor("default")
	# if editor.dragging_entity
	# 	canvas.classList.add("dragging")
	# else
	# 	canvas.classList.remove("dragging")
	if editor.entities_bar.hovered_cell
		canvas.classList.add("grabbable")
	else
		canvas.classList.remove("grabbable")
	
	world.step()
	view.width = canvas.width
	view.height = canvas.height
	# view.center_x_to = player.x
	# view.center_y_to = player.y
	view.step()
	editor.step(mouse, view)
	
	world.drawBackground(ctx, view)
	ctx.save()
	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.scale(view.scale, view.scale)
	ctx.translate(-view.center_x, -view.center_y)
	
	world.draw(ctx, view)
	editor.draw(ctx, view)
	
	ctx.restore()
	
	editor.drawAbsolute(ctx)
	mouse.LMB.pressed = false
	mouse.MMB.pressed = false
	mouse.RMB.pressed = false

# index = 0
# setInterval ->
# 	entity = world.entities[index %% world.entities.length]
# 	editor.selected_entities = [entity]
# 	view.center_x_to = entity.x
# 	view.center_y_to = entity.y
# 	index += 1
# , 1500
