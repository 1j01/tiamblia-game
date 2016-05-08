
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

canvas = document.createElement("canvas")
document.body.appendChild(canvas)
ctx = canvas.getContext("2d")

view = new View
viewToWorldX = (x)-> (x - canvas.width / 2) / view.scale + view.center_x
viewToWorldY = (y)-> (y - canvas.height / 2) / view.scale + view.center_y

editor = new Editor(world, view)

mouse = {x: -Infinity, y: -Infinity, down: no}

addEventListener "mousemove", (e)->
	mouse.x = viewToWorldX(e.clientX)
	mouse.y = viewToWorldY(e.clientY)

addEventListener "mousedown", (e)->
	mouse.down = true

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
	
	world.step()
	view.width = canvas.width
	view.height = canvas.height
	view.step()
	editor.step(mouse)
	
	ctx.save()
	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.translate(-view.center_x, -view.center_x)
	ctx.scale(view.scale, view.scale)
	
	world.draw(ctx, view)
	editor.draw(ctx, view)
	
	ctx.restore()
