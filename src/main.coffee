
Math.seedrandom("A world")

{View, Mouse, Editor, Entity, Terrain} = require "skele2d"
Stats = require "stats.js"
{GUI} = require "lil-gui"
World = require "./World.coffee"
keyboard = require "./keyboard.coffee"
sort_entities = require "./sort-entities.coffee"
randomize_entities = require "./randomize-entities.coffee"
require "./arrow-test.coffee"

# require each entity to add it to the entity registry
GeneticPlant = require "./entities/GeneticPlant.coffee"
CactusTree = require "./entities/CactusTree.coffee"
require "./entities/Caterpillar.coffee"
SavannaGrass = require "./entities/terrain/SavannaGrass.coffee"
require "./entities/terrain/LushGrass.coffee"
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

	show_terrain_polygons = (try localStorage["tiamblia.debug_terrain"]) is "true"
	if show_terrain_polygons
		for entity in world.entities
			if entity instanceof Terrain
				ctx.translate(entity.x, entity.y)
				ctx.strokeStyle = if entity.solid is false then "blue" else "red"
				ctx.fillStyle = if entity.solid is false then "rgba(0, 0, 255, 0.2)" else "rgba(255, 0, 0, 0.2)"
				ctx.lineWidth = 1 / view.scale
				ctx.beginPath()
				points = Object.values(entity.structure.points)
				ctx.moveTo(points[0].x, points[0].y)
				for point in points
					ctx.lineTo(point.x, point.y)
				ctx.closePath()
				ctx.stroke()
				ctx.fill()
				ctx.translate(-entity.x, -entity.y)
	
	show_collision_buckets = (try localStorage["tiamblia.show_collision_buckets"]) is "true"
	if show_collision_buckets
		world.updateCollisionBuckets() if editor.editing # normally happens while simulating
		world.drawCollisionBuckets(ctx, view)

	ctx.restore()

# This is useful when debugging.
# You can set a "watch" in the Firefox debugger to `window.do_a_redraw()`
# and then see how entities are changed while stepping through simulation code.
# (In Chrome this doesn't work, the canvas doesn't update, as of 2023.)
window.do_a_redraw = redraw

gamepad_start_prev = false

stats = new Stats
stats.showPanel(0)

# UI for development features, accessible with '~'/'`' key
gui = new GUI()
gui.hide()
option_names_to_keys = {
	"Disable welcome message, start in edit mode": "tiamblia.disable_welcome_message"
	"Show performance stats": "tiamblia.show_stats"
	"Debug Caterpillar class": "tiamblia.debug_caterpillar"
	"Debug Arrow class": "tiamblia.debug_arrow"
	"Debug Terrain class": "tiamblia.debug_terrain"
	"Show collision buckets": "tiamblia.show_collision_buckets"
	"Show point names": "Skele2D show names"
	"Show point indices": "Skele2D show indices"
	"Allow posing animatable entities in world": "Skele2D allow posing animatable entities in world"
	"Disable constraint solving while editing": "Skele2D disable constraint solving"
}
options = {}
tiamblia_folder = gui.addFolder("Tiamblia")
skele2d_folder = gui.addFolder("Skele2D")
for name, storage_key of option_names_to_keys then do (name, storage_key) ->
	options[name] = (try localStorage[storage_key]) is "true"
	folder = if storage_key.indexOf("Skele2D") is 0 then skele2d_folder else tiamblia_folder
	folder.add(options, name).onChange (value) ->
		localStorage[storage_key] = value

options["Auto-spawn entities"] = (try localStorage["tiamblia.auto_spawn"]) ? ""
tiamblia_folder.add(options, "Auto-spawn entities").onChange (value) ->
	localStorage["tiamblia.auto_spawn"] = value

options["Clear Auto-Save"] = ->
	localStorage.removeItem("Skele2D World")
	alert "Cleared Skele2D World. Refresh the page to start over."
skele2d_folder.add(options, "Clear Auto-Save")

terrain_optimized = false

do animate = ->
	return if window.CRASHED
	show_stats = (try localStorage["tiamblia.show_stats"]) is "true"
	if show_stats
		document.body.appendChild(stats.dom) unless stats.dom.parentNode
	else
		stats.dom.remove()
	stats.begin()
	requestAnimationFrame(animate)
	Math.seedrandom(performance.now())

	# Spawn entities for dev purposes, especially for flora.
	# This helps to see the space of randomization.
	class_names = (try localStorage["tiamblia.auto_spawn"]) ? ""
	class_names = if class_names.length > 0 then class_names.split(",") else []
	try
		for class_name in class_names
			min_instances = 10
			if world.entities.filter((entity) -> entity.constructor.name is class_name).length < min_instances
				ent = Entity.fromJSON({_class_: class_name})
				ent.x = Math.random() * 1000
				ent.y = bottom_of_world
				while world.collision(ent)
					ent.y -= 3
				world.entities.push(ent)
				if ent.dna
					# show examples of the same species beside it
					for i in [0...3]
						clone = Entity.fromJSON({_class_: class_name, dna: JSON.parse(JSON.stringify(ent.dna))})
						clone.x = ent.x + 100 * (i + 1)
						clone.y = bottom_of_world
						while world.collision(clone)
							clone.y -= 3
						world.entities.push(clone)
	catch error
		console?.error? "Failed to auto-spawn entities:", error

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
		
		terrain_optimized = false

	unless editor.editing

		if not terrain_optimized
			world.optimizeTerrain()
			terrain_optimized = true

		world.updateCollisionBuckets()

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

	# A little tool to randomize entities by pressing 'R'
	if editor.editing and keyboard.wasJustPressed("KeyR")
		if editor.selected_entities.length
			editor.undoable -> randomize_entities(editor.selected_entities)
		else
			class_names = ((try localStorage["tiamblia.auto_spawn"]) or "").split(",")
			new_entities = world.entities.filter((entity) -> entity.constructor.name not in class_names)
			if new_entities.length isnt world.entities.length
				editor.undoable -> world.entities = new_entities

	# Toggle development UI with backtick/tilde (`/~)
	if keyboard.wasJustPressed("Backquote")
		gui.show(gui._hidden)

	# End of frame. Nothing must use wasJustPressed after this.
	keyboard.resetForNextStep()

	stats.end()
