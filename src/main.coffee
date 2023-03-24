
Math.seedrandom("A world")

{View, Mouse, Editor} = require "skele2d"
World = require "./World.coffee"
keyboard = require "./keyboard.coffee"
sort_entities = require "./sort-entities.coffee"
randomize_entities = require "./randomize-entities.coffee"
require "./arrow-test.coffee"

# require each entity to add it to the entity registry
require "./entities/Caterpillar.coffee"
SavannaGrass = require "./entities/terrain/SavannaGrass.coffee"
require "./entities/terrain/LushGrass.coffee"
require "./entities/terrain/Rock.coffee"
require "./entities/terrain/Water.coffee"
require "./entities/CactusTree.coffee"
require "./entities/PuffTree.coffee"
require "./entities/SavannaTreeA.coffee"
require "./entities/Cloud.coffee"
require "./entities/Butterfly.coffee"
require "./entities/Bird.coffee"
require "./entities/Frog.coffee"
require "./entities/Rabbit.coffee"
require "./entities/Deer.coffee"
require "./entities/GranddaddyLonglegs.coffee"
Player = require "./entities/Player.coffee"
require "./entities/items/Bow.coffee"
require "./entities/items/Arrow.coffee"
require "./entities/items/ArcheryTarget.coffee"

world = new World

window.the_world = world

terrain = new SavannaGrass
world.entities.push terrain
terrain.x = 0
terrain.y = 0
terrain.generate()

bottom_of_world = 300

canvas = document.createElement("canvas")
document.body.appendChild(canvas)
ctx = canvas.getContext("2d")

view = new View
view_to = new View
view_smoothness = 7
mouse = new Mouse(canvas)

editor = new Editor(world, view, view_to, canvas, mouse)
window.the_editor = editor

welcome = document.getElementById("welcome")
disable_welcome_message = (try localStorage["tiamblia.disable_welcome_message"]) is "true"
if disable_welcome_message
	welcome.remove()
else
	# hacky way to make it play by default instead of edit
	# but not mess up the editor's undo state that it creates when you start playing
	world_loaded = false
	_fromJSON = world.fromJSON
	world.fromJSON = (json) ->
		_fromJSON.call(world, json)
		editor.toggleEditing() if editor.editing
		world.fromJSON = _fromJSON
		world_loaded = true

try
	editor.load()
catch e
	console?.error? "Failed to load save:", e

try
	view_to.center_x = view.center_x = parseFloat(localStorage.view_center_x) unless isNaN(localStorage.view_center_x)
	view_to.center_y = view.center_y = parseFloat(localStorage.view_center_y) unless isNaN(localStorage.view_center_y)
	view_to.scale = view.scale = parseFloat(localStorage.view_scale) unless isNaN(localStorage.view_scale)

setInterval ->
	if editor.editing
		# TODO: should probably only save if you pan/zoom
		localStorage.view_center_x = view.center_x
		localStorage.view_center_y = view.center_y
		localStorage.view_scale = view_to.scale
, 200

redraw = ->

	world.drawBackground(ctx, view)
	ctx.save()
	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.scale(view.scale, view.scale)
	ctx.translate(-view.center_x, -view.center_y)
	
	world.draw(ctx, view)
	editor.draw(ctx, view) if editor.editing
	
	ctx.restore()

# This is useful when debugging.
# You can set a "watch" in the Firefox debugger to `window.do_a_redraw()`
# and then see how entities are changed while stepping through simulation code.
# (In Chrome this doesn't work, the canvas doesn't update, as of 2023.)
window.do_a_redraw = redraw

gamepad_start_prev = false

do animate = ->
	return if window.CRASHED
	requestAnimationFrame(animate)
	Math.seedrandom(performance.now())
	
	# Hide welcome message after you start playing or toggle editing.
	unless disable_welcome_message
		if the_world.entities.some((entity) -> entity instanceof Player and entity.jump) or (editor.editing and world_loaded)
			if welcome and welcome.style.opacity isnt "0"
				welcome.style.opacity = 0
				welcome.style.pointerEvents = "none"
				welcome.addEventListener "transitionend", ->
					welcome.remove()

	canvas.width = innerWidth unless canvas.width is innerWidth
	canvas.height = innerHeight unless canvas.height is innerHeight
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	for gamepad in (try navigator.getGamepads()) ? [] when gamepad
		if gamepad.buttons[9].pressed and not gamepad_start_prev
			editor.toggleEditing()
		gamepad_start_prev = gamepad.buttons[9].pressed

	if editor.editing and (editor.entities_bar.hovered_cell or ((editor.hovered_points.length or editor.hovered_entities.length) and not editor.selection_box))
		canvas.classList.add("grabbable")
	else
		canvas.classList.remove("grabbable")
	
	if editor.editing
		# Not sorting while game is running for performance reasons.
		# TODO: run only when an entity is added in the editor.
		# (I could also use the relative sorts list to sort only the added entity,
		# and this could be useful for gameplay code that might want to add entities.)
		sort_entities(world)

		# Fix hair attachment when dragging after simulating.
		# A better fix would be to have an event that fires while dragging
		# (or otherwise moving an entity, such as with the arrow keys, which isn't supported yet.)
		for entity in world.entities
			if entity instanceof Player
				entity.hair_initialized = false

	unless editor.editing
		for entity in world.entities # when entity isnt editor.editing_entity and entity not in editor.dragging_entities
			entity.step(world, view, mouse)
		
		# TODO: allow margin of offcenteredness
		player = world.getEntitiesOfType(Player)[0]
		if player
			view_to.center_x = player.x
			view_to.center_y = player.y
			# clamp view so you can't see below the bottom of the world
			# view_to.center_y = Math.min(view_to.center_y, bottom_of_world - canvas.height / 2 / view.scale)
	
	view.width = canvas.width
	view.height = canvas.height
	
	view.easeTowards(view_to, view_smoothness)
	if player and not editor.editing
		# clamp view so you can't see below the bottom of the world even while zooming out
		view.center_y = Math.min(view.center_y, bottom_of_world - canvas.height / 2 / view.scale)

	editor.step() if editor.editing
	mouse.resetForNextStep()
	
	redraw()

	editor.updateGUI()
	
	# So that the editor will give new random entities each time you pull one into the world
	# (given that some entities use seedrandom, and fix the seed)
	# Also for the below entity randomizing feature.
	Math.seedrandom(performance.now())

	# A little tool to randomize entities by pressing 'r'
	if editor.editing and keyboard.wasJustPressed("KeyR")
		editor.undoable -> randomize_entities(editor.selected_entities)

	# End of frame. Nothing must use wasJustPressed after this.
	keyboard.resetForNextStep()
