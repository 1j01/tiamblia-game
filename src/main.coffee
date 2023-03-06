
Math.seedrandom("A world")

{View, Mouse, Editor, Structure} = require "skele2d"
World = require "./World.coffee"
keyboard = require "./keyboard.coffee"
require "./arrow-test.coffee"

Entity = require "./entities/abstract/Entity.coffee"
Terrain = require "./entities/abstract/Terrain.coffee"
# Why are these here?
require "./entities/abstract/SimpleActor.coffee"
require "./entities/abstract/Tree.coffee"
# require each entity to add it to the entity registry
SavannaGrass = require "./entities/terrain/SavannaGrass.coffee"
require "./entities/terrain/Rock.coffee"
Water = require "./entities/terrain/Water.coffee"
require "./entities/PuffTree.coffee"
require "./entities/SavannaTreeA.coffee"
Cloud = require "./entities/Cloud.coffee"
require "./entities/Butterfly.coffee"
require "./entities/Bird.coffee"
require "./entities/Frog.coffee"
require "./entities/Rabbit.coffee"
Deer = require "./entities/Deer.coffee"
require "./entities/GranddaddyLonglegs.coffee"
Player = require "./entities/Player.coffee"
Bow = require "./entities/items/Bow.coffee"
Arrow = require "./entities/items/Arrow.coffee"
ArcheryTarget = require "./entities/items/ArcheryTarget.coffee"

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

c = (entity_class) -> (entity) -> entity instanceof entity_class
anything_other_than_c = (entity_class) -> (entity) -> entity not instanceof entity_class
relative_sorts = [
	# [A, B] denotes A in front of B
	# If the filters result in true for a pair and its reverse,
	# it will be handled below and shouldn't cause instability.

	# The one background element.
	[anything_other_than_c(Cloud), c(Cloud)]
	# The archery target is effectively a line, but displayed as an oval, implying perspective.
	# Arrows need to be visible when sticking into the target.
	[c(Arrow), c(ArcheryTarget)]
	# For riding, player's legs go in front; it's implied that one goes behind,
	# by posing the legs on top of each other.
	[c(Player), c(Deer)]
	# It looks best holding the arrow in front of the bow.
	[c(Arrow), c(Player)]
	# [c(Player), c(Bow)] # can look better in some cases, but not while aiming or turning
	[c(Bow), c(Player)]
	[c(Arrow), c(Bow)]
	# Water is transparent, and it should discolor any entities submerged in it.
	[c(Water), anything_other_than_c(Terrain)]
	
	# This may end up being too general
	# I'm keeping it at the end so any rules can override it
	[anything_other_than_c(Terrain), c(Terrain)]
]
compare_entities = (a, b) ->
	# This comparator is intransitive, so it can't be used for sort().
	for [a_filter, b_filter] in relative_sorts
		if a_filter(a) and b_filter(b) and not b_filter(a) and not a_filter(b)
			return 1
		if b_filter(a) and a_filter(b) and not a_filter(a) and not b_filter(b)
			return -1
	# If we get here, we don't know which should be in front.
	return 0

sort_entities = ->
	before_sort = world.entities.slice()
	# world.entities.sort(compare_entities)
	# sort() is stable, but it will fail to sort [a, b, c] if there is only a rule for [a, c]
	# It takes 0 to mean "equal", not "unknown".
	# We need a sorting algorithm that compares more than just adjacent pairs,
	# and gives a total ordering, with an intransitive comparator.

	# Bubble sort doesn't work either.
	# n = world.entities.length
	# loop
	# 	new_n = 0
	# 	for i in [1...n]
	# 		a = world.entities[i - 1]
	# 		b = world.entities[i]
	# 		if compare_entities(a, b) > 0
	# 			world.entities[i - 1] = b
	# 			world.entities[i] = a
	# 			new_n = i
	# 	n = new_n
	# 	break if n <= 1

	# An insertion sort that DOESN'T work with an intransitive comparator:
	# i = 1
	# while i < world.entities.length
	# 	x = world.entities[i]
	# 	j = i - 1
	# 	while j >= 0 and compare_entities(world.entities[j], x) > 0
	# 		world.entities[j + 1] = world.entities[j]
	# 		j -= 1
	# 	world.entities[j + 1] = x
	# 	i += 1

	# An insertion sort that DOES work with an intransitive comparator:
	# new_list = []
	# for entity in world.entities
	# 	inserted = false
	# 	for i in [0...new_list.length]
	# 		if compare_entities(entity, new_list[i]) < 0
	# 			new_list.splice(i, 0, entity)
	# 			inserted = true
	# 			break
	# 	new_list.push(entity) unless inserted
	# world.entities = new_list

	# Topological sort is better because it can tell us if there is a cycle, i.e. inconsistency.
	world.entities = topological_sort(world.entities, compare_entities)

	changed = world.entities.some (entity, i) -> entity isnt before_sort[i]
	if changed
		console.log "Sort changed"
		console.log "Before: #{before_sort.map((e) -> e.constructor.name).join(", ")}"
		console.log "After: #{world.entities.map((e) -> e.constructor.name).join(", ")}"

# topological_sort = (array, comparator) ->
# 	# Create an empty dictionary to hold the graph.
# 	graph = {}

# 	# Add each entity to the graph.
# 	for entity in array
# 		graph[entity] = []

# 	# For each pair of array, check if one should come before the other.
# 	for i in [0..array.length-1]
# 		for j in [i+1..array.length-1]
# 			result = comparator(array[i], array[j])
# 			if result == 1
# 				# If entity i should come before entity j, add an edge from i to j.
# 				graph[array[i]].push(array[j])
# 			else if result == -1
# 				# If entity j should come before entity i, add an edge from j to i.
# 				graph[array[j]].push(array[i])

# 	# Create a dictionary to hold the number of incoming edges for each node.
# 	in_degrees = {}
# 	for node, neighbors of graph
# 		in_degrees[node] = 0
# 	for node, neighbors of graph
# 		for neighbor in neighbors
# 			in_degrees[neighbor] += 1

# 	# Initialize a queue with nodes that have no incoming edges.
# 	queue = []
# 	for node, in_degree of in_degrees
# 		if in_degree == 0
# 			queue.push(node)

# 	# Perform the topological sort.
# 	result = []
# 	while queue.length > 0
# 		# Get the next node from the queue.
# 		node = queue.shift()
# 		result.push(node)

# 		# Remove the node and its outgoing edges from the graph.
# 		for neighbor in graph[node]
# 			in_degrees[neighbor] -= 1
# 			if in_degrees[neighbor] == 0
# 				queue.push(neighbor)

# 	# Check if the sort was successful (i.e., all nodes were visited).
# 	if result.length == array.length
# 		return result
# 	else
# 		throw new Error("Graph contains cycle: #{JSON.stringify(graph)}")

# topological_sort = (array, comparator) ->
# 	# Build a map of array that depend on each item
# 	dependencies = new Map()
# 	for item in array
# 		dependencies.set(item, [])
# 		for other_item in array
# 			if comparator(item, other_item) > 0
# 				dependencies.get(item).push(other_item)
	
# 	# Perform topological sort using Kahn's algorithm
# 	sorted_array = []
# 	no_incoming_edges = []
# 	for [item, edges] from dependencies
# 		if edges.length == 0
# 			no_incoming_edges.push(item)
# 	while no_incoming_edges.length > 0
# 		item = no_incoming_edges.shift()
# 		sorted_array.push(item)
# 		for edge in dependencies.get(item)
# 			incoming_edges = dependencies.get(edge)
# 			incoming_edges.splice(incoming_edges.indexOf(item), 1)
# 			if incoming_edges.length == 0
# 				no_incoming_edges.push(edge)
	
# 	# Check for cycles
# 	if sorted_array.length < array.length
# 		throw new Error("Cycle detected. Comparator must not be consistent.")

# 	return sorted_array

topological_sort = (array, comparator) ->
	# Construct the adjacency list and reverse adjacency list
	adjacency_list = new Map()
	reverse_adjacency_list = new Map()
	for node in array
		adjacency_list.set(node, [])
		reverse_adjacency_list.set(node, [])
	for i in [0...array.length]
		for j in [(i+1)...array.length]
			comparison = comparator(array[i], array[j])
			if comparison < 0
				adjacency_list.get(array[i]).push(array[j])
				reverse_adjacency_list.get(array[j]).push(array[i])
			else if comparison > 0
				adjacency_list.get(array[j]).push(array[i])
				reverse_adjacency_list.get(array[i]).push(array[j])

	# Perform the topological sort using Kahn's algorithm
	in_degree = new Map()
	for [node, neighbors] from reverse_adjacency_list
		in_degree.set(node, neighbors.length)
	queue = []
	for [node, degree] from in_degree
		if degree == 0
			queue.push(node)
	result = []
	while queue.length > 0
		node = queue.shift()
		result.push(node)
		for neighbor in adjacency_list.get(node)
			in_degree.set(neighbor, in_degree.get(neighbor) - 1)
			if in_degree.get(neighbor) == 0
				queue.push(neighbor)

	# Check for cycles and throw an error if found
	if result.length != array.length
		for item in array
			if not result.includes(item)
				cycle = [item]
				current = adjacency_list.get(item)[0]
				while current != item
					cycle.push(current)
					current = adjacency_list.get(current)[0]
				cycle.push(item)
				cycle = cycle.map((item)=> if "#{item}" is "[object Object]" then item.constructor.name else item).join(" > ")
				throw new Error("Comparator is inconsistent. Cycle: " + cycle)

	# Return the topologically sorted array
	return result

window.topological_sort = topological_sort

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
		sort_entities()

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
