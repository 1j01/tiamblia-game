Terrain = require "./entities/abstract/Terrain.coffee"
Water = require "./entities/terrain/Water.coffee"
Cloud = require "./entities/Cloud.coffee"
Deer = require "./entities/Deer.coffee"
Player = require "./entities/Player.coffee"
Bow = require "./entities/items/Bow.coffee"
Arrow = require "./entities/items/Arrow.coffee"
ArcheryTarget = require "./entities/items/ArcheryTarget.coffee"

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
	# Note: there's also a special rule that makes sure there's nothing between the player and the deer.
	[c(Player), c(Deer)]
	# It looks best holding the arrow in front of the bow.
	[c(Arrow), c(Player)]
	# [c(Player), c(Bow)] # can look better in some cases, but not while aiming or turning
	[c(Bow), c(Player)]
	[c(Arrow), c(Bow)]

	# Water is transparent, and it should discolor any entities submerged in it.
	# [c(Water), anything_other_than_c(Terrain)]
	# For the reflection effect, the water should be drawn after the terrain too.
	[c(Water), anything_other_than_c(Water)]
	
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

module.exports = sort_entities = (world)->
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

	# If there are any Deer, make sure there are no trees or anything between them and the Player.
	# This is a special case because it can't be expressed as "A goes above B".
	# Trees should be allowed to go above or below both the player and steed, but not between them.
	# This rule moves the Deer closer to the Player in depth.
	steeds = world.getEntitiesOfType(Deer)
	players = world.getEntitiesOfType(Player)
	for steed in steeds
		player = players[0]
		player_index = world.entities.indexOf(player)
		steed_index = world.entities.indexOf(steed)
		if player and player_index - steed_index > 1
			non_steed_between = false
			for entity in world.entities.slice(steed_index + 1, player_index)
				if entity not instanceof Deer
					non_steed_between = true
					break
			if non_steed_between
				world.entities.splice(world.entities.indexOf(steed), 1)
				world.entities.splice(world.entities.indexOf(player), 0, steed)
				console.log "Sorted #{steed.constructor.name} closer to #{player.constructor.name}"

	changed = world.entities.some (entity, i) -> entity isnt before_sort[i]
	if changed
		console.log "Sort changed"
		console.log "Before: #{before_sort.map((e) -> e.constructor.name).join(", ")}"
		console.log "After: #{world.entities.map((e) -> e.constructor.name).join(", ")}"
	return

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
