{Structure} = require "skele2d"

module.exports = randomize_entities = (entities) ->
	for entity in entities
		# Use two new entities to detect what properties get randomized,
		# and change only those.
		# (If you just used one new entity, you couldn't distinguish between
		# properties that were different because they were randomized at construction,
		# or because they were manually modified, such as by posing an entity,
		# or modified by simulation, although that's less important.)
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
