
seedrandom("A world")

world = new World

terrain = new Terrain
world.entities.push terrain
terrain.x = 0
terrain.y = 0
terrain.generate()

canvas = document.createElement("canvas")
document.body.appendChild(canvas)
ctx = canvas.getContext("2d")

@view = new View

mouse = {
	x: -Infinity, y: -Infinity
	LMB: {down: no, pressed: no}
	MMB: {down: no, pressed: no}
	RMB: {down: no, pressed: no}
	double_clicked: no
}
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

addEventListener "dblclick", (e)->
	MB = mouse["#{"LMR"[e.button]}MB"]
	MB.pressed = true
	mouse.double_clicked = true

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

@editor = new Editor(world, view, mouse)
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
	mouse.double_clicked = false

# index = 0
# setInterval ->
# 	entity = world.entities[index %% world.entities.length]
# 	editor.selected_entities = [entity]
# 	view.center_x_to = entity.x
# 	view.center_y_to = entity.y
# 	index += 1
# , 1500
