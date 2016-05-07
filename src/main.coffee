
entities = []
gdll = new GranddaddyLonglegs
entities.push gdll
gdll.x = 500
gdll.y = 500
gdll.structure.autoLayout()

player = new Player
entities.push player
player.x = 100
player.y = 400
player.structure.autoLayout()

canvas = document.createElement("canvas")
document.body.appendChild(canvas)
ctx = canvas.getContext("2d")

view = new View

editor = new Editor(entities)

mouse = {x: -Infinity, y: -Infinity, down: no}

addEventListener "mousemove", (e)->
	mouse.x = e.clientX
	mouse.y = e.clientY

addEventListener "mousedown", (e)->
	mouse.down = true

addEventListener "mouseup", (e)->
	mouse.down = false

# addEventListener "mouseout", (e)->
# 	mouse.x = -Infinity
# 	mouse.y = -Infinity

do animate = ->
	
	requestAnimationFrame(animate)
	
	canvas.width = innerWidth unless canvas.width is innerWidth
	canvas.height = innerHeight unless canvas.height is innerHeight
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	for entity in entities
		entity.step()
	
	for entity in entities
		ctx.save()
		ctx.translate(entity.x, entity.y)
		entity.draw(ctx)
		ctx.restore()
	
	editor.step(mouse)
	editor.draw(ctx)
