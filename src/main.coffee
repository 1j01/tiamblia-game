
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

view = new View
viewToWorldX = (x)-> (x - canvas.width / 2) / view.scale + view.center_x
viewToWorldY = (y)-> (y - canvas.height / 2) / view.scale + view.center_y

@editor = new Editor(world)
try
	editor.load()
catch e
	console?.error? "Failed to load save:", e

mouse = {x: -Infinity, y: -Infinity, down: no}
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

addEventListener "mousemove", (e)->
	mouse.x = e.clientX
	mouse.y = e.clientY

addEventListener "mousedown", (e)->
	mouse.down = true
	mouse.clicked = true

addEventListener "mouseup", (e)->
	mouse.down = false

handle_scroll = (e)->
	zoom_factor = 1.2
	if e.detail < 0 or e.wheelDelta > 0
		view.scale_to *= zoom_factor
	else
		view.scale_to /= zoom_factor

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
	view.step()
	editor.step(mouse, view)
	
	ctx.save()
	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.translate(-view.center_x, -view.center_x)
	ctx.scale(view.scale, view.scale)
	
	world.draw(ctx, view)
	editor.draw(ctx, view)
	
	ctx.restore()
	
	editor.drawAbsolute(ctx)
	mouse.clicked = false
