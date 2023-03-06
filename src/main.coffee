
Math.seedrandom("A world")

{View, Mouse, Editor, Structure} = require "skele2d"
World = require "./World.coffee"
keyboard = require "./keyboard.coffee"
sort_entities = require "./sort-entities.coffee"
require "./arrow-test.coffee"

# Why are these here?
require "./entities/abstract/SimpleActor.coffee"
require "./entities/abstract/Tree.coffee"
# require each entity to add it to the entity registry
SavannaGrass = require "./entities/terrain/SavannaGrass.coffee"
require "./entities/terrain/Rock.coffee"
require "./entities/terrain/Water.coffee"
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

editor = @editor = new Editor(world, view, view_to, canvas, mouse)
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

window.do_a_redraw = redraw

gamepad_start_prev = false

do animate = ->
	return if window.CRASHED
	requestAnimationFrame(animate)
	Math.seedrandom(performance.now())
	
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
	# And also for the below.
	Math.seedrandom(performance.now())

	# A little tool to randomize entities by pressing 'r'
	if editor.editing and keyboard.wasJustPressed("KeyR")
		editor.undoable ->
			for entity in editor.selected_entities
				new_entity_a = new entity.constructor()
				new_entity_b = new entity.constructor()
				apply_differences = (a, b, cur)->
					for own key, val_a of a when key isnt "id"
						val_b = b[key]
						if val_a instanceof Structure
							# Replace the structure wholesale.
							# Avoids issues with trees, which would get split up with floating branches.
							if JSON.stringify(val_a) isnt JSON.stringify(val_b)
								cur[key] = val_a
						else if Array.isArray(val_a)
							# Replace the array wholesale.
							# That way it can shrink, and can't leave blanks in the middle.
							# If e.g. a = [1, 0, 1] and b = [1, 0, 1, 0, 1] and cur = []
							# the "object" path could leave cur = [, , , 0, 1], I think.
							if JSON.stringify(val_a) isnt JSON.stringify(val_b)
								cur[key] = val_a
						else if (
							typeof val_a is "object" and val_a isnt null and
							typeof val_b is "object" and val_b isnt null and
							typeof cur[key] is "object" and cur[key] isnt null
						)
							apply_differences(val_a, val_b, cur[key])
						else if val_a isnt val_b
							cur[key] = val_a
					return
				apply_differences(new_entity_a, new_entity_b, entity)
			return

	# End of frame. Nothing must use wasJustPressed after this.
	keyboard.resetForNextStep()
