
Entity = require "./entities/abstract/Entity.coffee"
Terrain = require "./entities/abstract/Terrain.coffee"
{distanceToLineSegment} = require("skele2d").helpers
hsl_to_rgb_hex = require "./hsl-to-rgb-hex.js"

# Actually treat it as a segment, not an infinite line
# unlike copies of this function in some other files
closestPointOnLineSegment = (point, a, b)->
	# https://stackoverflow.com/a/3122532/2624876
	a_to_p = {x: point.x - a.x, y: point.y - a.y}
	a_to_b = {x: b.x - a.x, y: b.y - a.y}
	atb2 = a_to_b.x**2 + a_to_b.y**2
	atp_dot_atb = a_to_p.x*a_to_b.x + a_to_p.y*a_to_b.y
	t = atp_dot_atb / atb2
	t = Math.max(0, Math.min(1, t))
	return {x: a.x + a_to_b.x*t, y: a.y + a_to_b.y*t}

module.exports = class World
	constructor: ->
		@entities = []
		@derived_colliders = []
	
	@format: "Tiamblia World"
	@formatVersion: 14
	toJSON: ->
		format: World.format
		formatVersion: World.formatVersion
		entities: @entities

	fromJSON: (def)->
		# ------------- DON'T PANIC -------------
		# File format versioning is easy!
		# The long comments below and error handling are to help you learn.
		# (And because I like to be thorough.)
		# It's not a complicated process.
		# ---------------------------------------

		if def.format isnt World.format
			if def.format
				throw new Error "Expected format to be \"#{World.format}\", got #{def.format}"
			else
				# As long as we support versions 3 or earlier, we can't rely on the format name being present.
				# If you're copying this code for a new format, you can uncomment this.
				# throw new Error "Missing format name. Expected property \"format\" to be \"#{World.format}\"."

		# If you want to drop support for old versions of the format, you can handle it like so:
		# minimum_supported_version = 3
		# if not def.formatVersion
		# 	throw new Error "This format is too old; it's missing a format version number. Expected property \"formatVersion\" to be an integer."
		# if def.formatVersion < minimum_supported_version
		# 	throw new Error "The format version #{def.formatVersion} is too old for this version of the game.
		# 	There is no automatic upgrade path for versions older than #{minimum_supported_version}."

		# Upgrade old versions of the format
		upgrading_from_version = def.formatVersion
		if not def.formatVersion
			if def.entities not instanceof Array
				throw new Error "Expected entities to be an array, got #{def.entities}"
			def.formatVersion = 1
			# Arrow now uses prev_x/prev_y instead of of vx/vy for velocity
			# (Velocity is now implicit in the difference between prev_x/prev_y and x/y)
			for ent_def in def.entities when ent_def._class_ is "Arrow"
				ent_def.structure.points.nock.prev_x = ent_def.structure.points.nock.x - ent_def.structure.points.nock.vx
				ent_def.structure.points.nock.prev_y = ent_def.structure.points.nock.y - ent_def.structure.points.nock.vy
				ent_def.structure.points.tip.prev_x = ent_def.structure.points.tip.x - ent_def.structure.points.tip.vx
				ent_def.structure.points.tip.prev_y = ent_def.structure.points.tip.y - ent_def.structure.points.tip.vy
				delete ent_def.structure.points.nock.vx
				delete ent_def.structure.points.nock.vy
				delete ent_def.structure.points.tip.vx
				delete ent_def.structure.points.tip.vy
		if def.formatVersion is 1
			def.formatVersion = 2
			# spell-checker: disable
			# "elbo" is now "elbow" in Player's segment names
			# do regex replace on JSON, since it's way simpler, and handles references too
			def.entities = JSON.parse(JSON.stringify(def.entities).replace(/\belbo\b/g, 'elbow'))
			# spell-checker: enable
			# Note that the animation data also requires this rename, but there's no automatic upgrade system yet
		if def.formatVersion is 2
			def.formatVersion = 3
			# Removed leaf_point_names from Tree, and added is_leaf property to points
			for ent_def in def.entities when ent_def._class_.includes("Tree")
				for point_name, point_def of ent_def.structure.points
					point_def.is_leaf = point_name in ent_def.leaf_point_names
				delete ent_def.leaf_point_names
		if def.formatVersion is 3
			def.formatVersion = 4
			# Caterpillar's structure has changed. Delete the old one and let it be recreated.
			# This may cause the caterpillar to be in a different position than it was before,
			# but I don't care enough to do a detailed upgrade.
			# You know what? I'll center it on the old position, in case the points
			# strayed far away from the entity's position.
			for ent_def in def.entities when ent_def._class_ is "Caterpillar"
				average_x = 0
				average_y = 0
				for point_name, point_def of ent_def.structure.points
					average_x += point_def.x
					average_y += point_def.y
				average_x /= Object.keys(ent_def.structure.points).length
				average_y /= Object.keys(ent_def.structure.points).length
				ent_def.x += average_x
				ent_def.y += average_y
				delete ent_def.structure
			# Player's holding_arrow is now holding_arrows, and is an array
			for ent_def in def.entities when ent_def._class_ is "Player"
				ent_def.holding_arrows = []
				if ent_def.holding_arrow
					ent_def.holding_arrows.push ent_def.holding_arrow
				delete ent_def.holding_arrow
		if def.formatVersion is 4
			def.formatVersion = 5
			# `intangible` was never meant to be serialized if it was `intangible_because_optimized`
			# and this caused a problem with the auto spawn dev tool 
			for ent_def in def.entities
				if ent_def.intangible_because_optimized
					delete ent_def.intangible
					delete ent_def.intangible_because_optimized
		if def.formatVersion is 5
			def.formatVersion = 6
			# Remove cruft from Player: reaching_for_segment, reaching_for_segment, reaching_for_entity, reaching_with_secondary_hand, ground_angle, smoothed_vy, hair_x_scales
			for ent_def in def.entities when ent_def._class_ is "Player"
				delete ent_def.reaching_for_segment
				delete ent_def.reaching_for_entity
				delete ent_def.reaching_with_secondary_hand
				delete ent_def.ground_angle
				delete ent_def.smoothed_vy
				delete ent_def.hair_x_scales
		if def.formatVersion is 6
			def.formatVersion = 7
			# Rename color properties to include "color" to be picked up by the entity inspector/editor
			# and convert hsl[a] to rgb hex when appropriate, using hsl_to_rgb_hex
			to_hex_if_hsl = (color) ->
				if color.match(/hsl/i)
					return hsl_to_rgb_hex(color)
				return color
			# Rabbit: c -> body_color, c2 -> body_shadow_color
			# Butterfly: c1 -> color_1, c2 -> color_2
			# Frog: c -> body_color
			# Deer: c -> body_color
			for ent_def in def.entities when ent_def._class_ in ["Frog", "Deer", "Rabbit"]
				ent_def.body_color = to_hex_if_hsl(ent_def.c)
				delete ent_def.c
			# c2 differs between Rabbit and Butterfly
			for ent_def in def.entities when ent_def._class_ is "Rabbit"
				ent_def.body_shadow_color = to_hex_if_hsl(ent_def.c2)
				delete ent_def.c2
			for ent_def in def.entities when ent_def._class_ is "Butterfly"
				ent_def.color_1 = to_hex_if_hsl(ent_def.c1)
				delete ent_def.c1
				ent_def.color_2 = to_hex_if_hsl(ent_def.c2)
				delete ent_def.c2
		if def.formatVersion is 7
			def.formatVersion = 8
			# Fix botched entity references in Player when naively defining a toJSON overload.
			# Entity defines a limited system for resolving references to other Entities:
			###
			resolveReferences: (world)->
				if @_refs_
					for k, id of @_refs_
						@[k] = world.getEntityByID(id)
					delete @_refs_
			
			toJSON: ->
				obj = {}
				for k, v of @ when k isnt "_refs_"
					if v instanceof Entity
						obj._refs_ ?= {}
						obj._refs_[k] = v.id
					else
						obj[k] = v
				obj
			###
			# I temporarily overrode toJSON without taking _refs_ into account,
			# so we need to construct _refs_ here based on accidentally serialized entity references.
			for ent_def in def.entities when ent_def._class_ is "Player"
				ent_def._refs_ ?= {}
				# grounded and riding are from hit tests, which now return Terrain entities
				# for prop in ["reaching_for_entity", "holding_bow", "riding", "grounded", "submerged"]
				# we can do this more generally just as easily, or easier
				for prop of ent_def
					if ent_def[prop]?._class_
						ent_def._refs_[prop] = ent_def[prop].id
						delete ent_def[prop]
		if def.formatVersion is 8
			def.formatVersion = 9
			# Player now serializes references as _recursive_refs_: [[key_path, id], ...] where key_path is an array of keys
			# instead of _refs: {key: id, ...} which only worked for top-level entity references.
			# This is to fix incorrect serialization of holding_arrows, which is an array of entities,
			# which had a workaround of ad-hoc resolving references using the id of the accidentally serialized entity.
			# We need to convert _refs to _recursive_refs_ here, but also fix up holding_arrows.
			for ent_def in def.entities when ent_def._class_ is "Player"
				if ent_def._refs_
					ent_def._recursive_refs_ = []
					for key, id of ent_def._refs_
						ent_def._recursive_refs_.push([[key], id])
					delete ent_def._refs_
				if ent_def.holding_arrows
					ent_def._recursive_refs_ ?= []
					for arrow_def, i in ent_def.holding_arrows
						ent_def._recursive_refs_.push([["holding_arrows", i], arrow_def.id])
					# Keep the object so the references can be resolved into it,
					# but clear it of the accidentally serialized entities.
					ent_def.holding_arrows = []
		if def.formatVersion is 9
			def.formatVersion = 10
			# Remove cruft from serialization
			# GrassyTerrain: grass_tiles Map is derived state.
			# Previously it was serialized as an empty object, now it's omitted.
			for ent_def in def.entities when ent_def._class_ in ["GrassyTerrain", "LushGrass", "SavannaGrass"]
				delete ent_def.grass_tiles
			# Water: waves was renamed waves_y, but most files have the new property already.
			# (waves_y has been, since its introduction, created automatically.)
			# Water: ccw, min_x, max_x, min_y, max_y are all derived from the polygon
			for ent_def in def.entities when ent_def._class_ is "Water"
				if ent_def.waves and not ent_def.waves_y
					ent_def.waves_y = ent_def.waves
				delete ent_def.waves
				delete ent_def.ccw
				delete ent_def.min_x
				delete ent_def.max_x
				delete ent_def.min_y
				delete ent_def.max_y
		if def.formatVersion is 10
			def.formatVersion = 11
			# Deer: dir_pl -> smoothed_facing_x, dir_p is renamed/removed in favor of facing_x from SimpleActor
			# I believe the 'l' stood for "linearly interpolated", but I'm not sure about the 'p'.
			# Maybe 'p' meant "positive(/negative)"? or "pointing", as in a facing direction?
			# I copied this code from an era where I used single-letter variable names.
			# Those were the days... where I can't understand my code from.
			for ent_def in def.entities when ent_def._class_ is "Deer"
				ent_def.smoothed_facing_x = ent_def.dir_pl if ent_def.dir_pl?
				delete ent_def.dir_pl
				ent_def.facing_x = ent_def.dir_p if ent_def.dir_p?
				delete ent_def.dir_p
		if def.formatVersion is 11
			def.formatVersion = 12
			# Deer: dir is removed in favor of move_x from SimpleActor
			for ent_def in def.entities when ent_def._class_ is "Deer"
				ent_def.move_x = ent_def.dir if ent_def.dir?
				delete ent_def.dir
		if def.formatVersion is 12
			def.formatVersion = 13
			# Deer: xp -> x_prev, t -> idle_timer, lr -> leg_rotation
			for ent_def in def.entities when ent_def._class_ is "Deer"
				ent_def.x_prev = ent_def.xp if ent_def.xp?
				delete ent_def.xp
				ent_def.idle_timer = ent_def.t if ent_def.t?
				delete ent_def.t
				ent_def.leg_rotation = ent_def.lr if ent_def.lr?
				delete ent_def.lr
		if def.formatVersion is 13
			def.formatVersion = 14
			# Player: real_facing_x -> upper_body_facing_x and lower_body_facing_x, prev_real_facing_x -> prev_upper_body_prev_facing_x
			for ent_def in def.entities when ent_def._class_ is "Player"
				ent_def.upper_body_facing_x = ent_def.real_facing_x if ent_def.real_facing_x?
				ent_def.lower_body_facing_x = ent_def.real_facing_x if ent_def.real_facing_x?
				delete ent_def.real_facing_x
				ent_def.prev_upper_body_facing_x = ent_def.prev_real_facing_x if ent_def.prev_real_facing_x?
				delete ent_def.prev_real_facing_x

		# TODO: remove more cruft from serialization
		# can't do this until we own Terrain, right now it's part of Skele2D.
		# # Terrain: width, max_height, left, right, bottom
		# # These are pretty silly to serialize (or store), since we can use the bounding box
		# for ent_def in def.entities when ent_def._class_ is "Terrain"
		# 	delete ent_def.width
		# 	delete ent_def.max_height
		# 	delete ent_def.left
		# 	delete ent_def.right
		# 	delete ent_def.bottom

		# Note: it's a good idea to bump the version number when adding new features
		# that won't be supported by older versions, even without upgrade code,
		# but this is more important for applications, or games with level sharing.
		# For Tiamblia, the format is only authored by the game developer (me),
		# and people coming to see the demo and messing around with the editor,
		# who should be using the latest version of the game anyway,
		# so it's not as important, and I'm not bothering, basically as a policy.
		# The worst it can do is cause some confusion when stepping back in git history.
		
		# Also note: if you forget to upgrade something,
		# you should generally add a new version upgrade at the end.
		# If you add it earlier, it won't be run on worlds that were saved
		# with newer versions of the game.

		# Similarly, if an upgrade step is buggy, it may be better to add a new one
		# at the end that fixes the damage, rather than fixing the buggy one,
		# if only so there is only one upgrade path to the current version,
		# because theoretically an intermediate upgrade could rely on the broken data,
		# although it's unlikely.
		# That said, if information is lost in the buggy upgrade,
		# it's probably better to fix the buggy one.
		# If there is ever a scenario where an intermediate upgrade step
		# relies on the broken data, AND information is lost in the buggy upgrade,
		# one could extract data before the buggy upgrade, and then reapply it
		# after the buggy upgrade, if available, but it still will be lost in files
		# saved with the buggy upgrade, so you have to deal with both cases.
		# Or you could update the intermediate upgrade steps to handle both cases.
		# It just depends which is easier, and easier to get right.

		# Handle format versions newer than supported
		# This could offer a choice to the user to try to load the world anyway, but that's not implemented.
		if def.formatVersion > World.formatVersion
			if def.formatVersion > upgrading_from_version
				throw new Error "You forgot to update World.formatVersion to #{def.formatVersion} when adding an upgrade step!"
			throw new Error "The format version #{def.formatVersion} is too new for this version of the game."
		# Just in case the format version format changes to a string like X.Y.Z or something
		if def.formatVersion isnt World.formatVersion
			throw new Error "Unsupported format version #{def.formatVersion}"
		
		# Validate the current version of the format
		# Note: if any validation becomes invalid here,
		# you may want to "archive" it in the last upgrade step where it was valid,
		# so that it can still validate worlds saved with that version or earlier.
		if def.entities not instanceof Array
			throw new Error "Expected entities to be an array, got #{def.entities}"
		for ent_def, i in def.entities
			if typeof ent_def._class_ isnt "string"
				throw new Error "Expected entities[#{i}]._class_ to be a string, got #{ent_def._class_}"
			if typeof ent_def.id isnt "string"
				throw new Error "Expected entities[#{i}].id to be a string, got #{ent_def.id}"
			if typeof ent_def.x isnt "number"
				throw new Error "Expected entities[#{i}].x to be a number, got #{ent_def.x}"
			if typeof ent_def.y isnt "number"
				throw new Error "Expected entities[#{i}].y to be a number, got #{ent_def.y}"
			if typeof ent_def.structure isnt "object"
				throw new Error "Expected entities[#{i}].structure to be an object, got #{ent_def.structure}"
			# Ensure there are no entity references not at the top level of an entity
			# Entity::resolveReferences only handles top-level references as a special case.
			# Player::resolveReferences actually overloads it with a more general solution,
			# but it's not yet improved in skele2d, which owns Entity (currently).
			# In either case, _class_ should not appear except at the top level of an entity,
			# since references are serialized with just the id.
			dot_or_bracket = (key)=>
				if key.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)
					return ".#{key}"
				else if key.match(/^[0-9]+$/)
					return "[#{key}]"
				else
					return "[#{JSON.stringify(key)}]"
			search_object = (obj, path_to_obj, get_more_context)=>
				# console.debug "search_object(", obj, ",", JSON.stringify(path_to_obj), ")"
				if typeof obj is "object" and obj isnt null
					for key, value of obj	
						path_to_value = "#{path_to_obj}#{dot_or_bracket(key)}"
						# console.debug "search_object: #{path_to_value} = #{JSON.stringify(value)}"
						if key is "_class_"
							throw new Error "Entity references must be at the top level of an entity, but found #{path_to_value} = #{JSON.stringify(value)} #{get_more_context()[0]} #{JSON.stringify(get_more_context()[1])}"
							# console.error "Entity references should only be at the top level of an entity, but found #{path_to_value} = #{JSON.stringify(value)}", ...get_more_context()
						if typeof value is "object" and value isnt null
							search_object(value, path_to_value, get_more_context)
				return
			for top_key, top_value of ent_def
				search_object(top_value, "entities[#{i}]#{dot_or_bracket(top_key)}", -> ["where entities[#{i}] is #{ent_def._class_}", ent_def])
		
		# Initialize the world
		@entities = (Entity.fromJSON(ent_def) for ent_def in def.entities)
		for entity in @entities
			entity.resolveReferences(@)
		
		return
	
	getEntityByID: (id)->
		for entity in @entities
			return entity if entity.id is id
		return null
	
	getEntitiesOfType: (Class)->
		return (entity for entity in @entities when entity instanceof Class)
	
	drawBackground: (ctx, view)->
		ctx.fillStyle = "#32C8FF"
		ctx.fillRect(0, 0, view.width, view.height)
		if not @bg
			@bg = document.createElement("canvas")
			@bg.width = 5000
			@bg.height = 800
			@drawMountains(@bg.getContext("2d"))
		ctx.drawImage(@bg,(-view.center_x-5000/2)/2,500-view.center_y/5)
		return
	
	drawMountains: (ctx)->
		green = off
		if green
			ctx.fillStyle = "hsla(155,#{90 - (Math.random() * 6)}%,#{59 - (Math.random() * 6)}%,1)"
		else
			ctx.fillStyle = "hsla(205,#{90 - (Math.random() * 6)}%,#{69 - (Math.random() * 6)}%,1)"
		ctx.fillRect 0, 100, ctx.canvas.width, ctx.canvas.height
		i = 0
		while i < 3
			#ctx.globalAlpha=0.4
			#y=ctx.canvas.height-(3-i)*100-200
			if green
				ctx.fillStyle = "hsla(155,#{80 - (i * 10) - (Math.random() * 6)}%,#{65 - (i * 0) - (Math.random() * 6)}%,1)"
			else
				ctx.fillStyle = "hsla(205,#{80 - (i * 10) - (Math.random() * 6)}%,#{65 - (i * 0) - (Math.random() * 6)}%,1)"
			x = -Math.random() * 50
			while x < ctx.canvas.width
				y = i * 100 + 100
				w = ((Math.random() * 50 + 50) * i + 10) * 5
				h = (Math.random() * 50 * i + 10 + w / 2) / 2
				if Math.random() < 0.2
					# if Math.random() < 0.2
					# 	#ctx.fillStyle="hsla(155,"+(80-i*10-Math.random()*6)+"%,"+(65-i*0-Math.random()*6)+"%,1)"
					ctx.beginPath()
					ctx.moveTo x, y
					ctx.lineTo x + w, y
					ctx.lineTo x + w / 2, y - h
					ctx.fill()
				x += w * Math.random()
			i += 0.1
	
	draw: (ctx, view)->
		# ctx.fillStyle = "#32C8FF"
		# {x, y} = view.toWorld({x: 0, y: 0})
		# {x: width, y: height} = view.toWorld({x: view.width, y: view.height})
		# ctx.fillRect(x, y, width-x, height-y)
		for entity in @entities
			ctx.save()
			ctx.translate(entity.x, entity.y)
			_save = ctx.save
			_restore = ctx.restore
			n_saved_states = 0
			ctx.save = ->
				n_saved_states++
				_save.apply(this, arguments)
				return
			ctx.restore = ->
				n_saved_states--
				_restore.apply(this, arguments)
				return
			try
				entity.draw(ctx, view, @)
			catch error
				console.error "Error drawing entity #{entity.constructor.name} #{entity.id}:", error
				while n_saved_states
					ctx.restore()
			ctx.save = _save
			ctx.restore = _restore
			ctx.restore()
		return
	
	bucket_width = 100
	bucket_height = 100
	updateCollisionBuckets: ->
		@collision_buckets = {}
		for entity in [...@entities, ...@derived_colliders] when not entity.intangible
			# For PolygonStructure, we can use the bounding box of the structure
			# which ignores bbox_padding which shouldn't apply to polygons.
			# For BoneStructure, bbox_padding makes lineThickness in collision detection work
			# when entities are near the collision bucket boundary.
			# TODO: separate bbox padding for visual and collision purposes.
			if entity.structure.bbox_max
				bbox_min_world = entity.toWorld(entity.structure.bbox_min)
				bbox_max_world = entity.toWorld(entity.structure.bbox_max)
				bbox = {
					x: bbox_min_world.x
					y: bbox_min_world.y
					width: bbox_max_world.x - bbox_min_world.x
					height: bbox_max_world.y - bbox_min_world.y
				}
			else
				bbox = entity.bbox()
			bx1 = Math.floor(bbox.x/bucket_width)
			bx2 = Math.floor((bbox.x+bbox.width)/bucket_width)
			for bxi in [bx1..bx2]
				# one dimensional bucketization
				# @collision_buckets[bxi] ?= []
				# @collision_buckets[bxi].push(entity)
				# two dimensional bucketization
				@collision_buckets[bxi] ?= {}
				by1 = Math.floor(bbox.y/bucket_height)
				by2 = Math.floor((bbox.y+bbox.height)/bucket_height)
				for byi in [by1..by2]
					@collision_buckets[bxi][byi] ?= []
					@collision_buckets[bxi][byi].push(entity)
		return

	drawCollisionBuckets: (ctx, view)->
		ctx.lineWidth = 1 / view.scale
		ctx.strokeStyle = "#FFFF00"
		ctx.fillStyle = "rgba(255, 255, 0, 0.2)"
		for b_x, bucket_column of @collision_buckets
			for b_y, entities of bucket_column
				# ctx.strokeRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
				# ctx.fillRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
				ctx.fillRect(b_x*bucket_width+1/view.scale, b_y*bucket_height+1/view.scale, bucket_width-2/view.scale, bucket_height-2/view.scale)
				for entity in entities
					# bbox = entity.bbox()
					# ctx.fillRect(bbox.x, bbox.y, bbox.width, bbox.height)
					# draw line from entity center to bucket center
					entity_bbox = entity.bbox()
					entity_cx = entity_bbox.x + entity_bbox.width/2
					entity_cy = entity_bbox.y + entity_bbox.height/2
					ctx.beginPath()
					ctx.moveTo(entity_cx, entity_cy)
					ctx.lineTo(b_x*bucket_width+bucket_width/2, b_y*bucket_height+bucket_height/2)
					ctx.stroke()
		return

	drawCollisionHeatMap: (ctx, view)->
		ctx.lineWidth = 1 / view.scale
		ctx.strokeStyle = "#FF0000"
		for b_x, bucket_column of @hit_test_counts
			for b_y, hit_test_count of bucket_column
				if hit_test_count > 0
					# The stroke is useful to see low hit counts
					ctx.strokeRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
					ctx.fillStyle = "rgba(255, 0, 0, #{hit_test_count/100})"
					# ctx.fillRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
					ctx.fillRect(b_x*bucket_width+1/view.scale, b_y*bucket_height+1/view.scale, bucket_width-2/view.scale, bucket_height-2/view.scale)
		return

	resetCollisionHeatMap: ->
		@hit_test_counts = {}
		return

	optimizeTerrain: ->
		# Divides terrain into smaller polygons horizontally,
		# so it can fit into the collision buckets.
		# This happens at the start of the game.
		# Instead of creating new entities of the same type as the original,
		# we'll leave the original entity for visual purposes,
		# and store the derived colliders separately from entities, without serialization.
		# This strategy allows perfect visual fidelity without hacks,
		# and prevents the possibility of losing the original polygons
		# by saving after starting the simulation, or doubly optimizing, creating slivers.

		# First, undo any previous optimization.
		# TODO: rename "old" -> "original"/"source"/"base"/"parent"/something,
		# since it's no longer replaced entirely.
		@derived_colliders = []
		old_terrain_entities = @getEntitiesOfType(Terrain)
		for old_terrain_entity in old_terrain_entities
			if old_terrain_entity.intangible_because_optimized
				delete old_terrain_entity.intangible
				delete old_terrain_entity.intangible_because_optimized
		
		for old_terrain_entity in old_terrain_entities
			# Prevent optimization if there's not many points
			# This could be more nuanced, taking into account the area vs bounding box,
			# or the number of buckets the polygon would occupy,
			# or the ratio of the bounding box area to the sum of bounding boxes of split polygons.
			# We don't need to optimize optimizeTerrain itself much because it's only run once,
			# so running the splitting algorithm small polygons is not a big deal.
			min_points = 10
			if Object.keys(old_terrain_entity.structure.points).length < min_points
				continue

			old_points = Object.values(old_terrain_entity.structure.points)
			old_points_flat = []
			for point in old_points
				old_points_flat.push(point.x, point.y)
			# PolygonStructure has bbox_min and bbox_max properties
			# which are in local coordinates.
			# We'll use them instead of entity.bbox() because
			# we don't want bbox_padding to affect the optimization.
			# But we still want world coordinates.
			bbox_min_world = old_terrain_entity.toWorld(old_terrain_entity.structure.bbox_min)
			bbox_max_world = old_terrain_entity.toWorld(old_terrain_entity.structure.bbox_max)
			bucket_x_min = Math.floor(bbox_min_world.x/bucket_width)
			bucket_x_max = Math.floor(bbox_max_world.x/bucket_width)
			polygons = [old_points_flat]
			for bucket_x in [bucket_x_min..bucket_x_max]
				# Cut in the middle of the bucket, because the terrain
				# will land into two buckets anyways, right?
				# I did this when I was overlapping the polygons for rendering and to
				# prevent caterpillars from crawling through the cracks.
				# With the overlap, the polygons would fit into 3 buckets,
				# even though they were only slightly wider than 1 bucket,
				# unless offset by more than the overlap.
				# The overlap is no longer needed, and I've removed it.
				# TODO: can I fit the polygons into 1 bucket now?
				cut_x = bucket_x * bucket_width + bucket_width/2 - old_terrain_entity.x

				# PolyK has some problems when the cut line is exactly on a point.
				# So we'll offset it a small amount.
				# This may lead to tiny polygons if the terrain is doubly optimized,
				# but ideally, the world editing workflow should involve resetting
				# the simulation, so that terrain is not saved as split polygons,
				# and in general so unnecessary changes are not made to the world,
				# so that git diffs are small and there's less confusion,
				# such as unknowingly saving the player with an idle animation just about to start.
				epsilon = 0.0001
				while polygons.some((polygon_coords) =>
					polygon_coords.some((coord, i) =>
						i % 2 is 0 and Math.abs(coord - cut_x) < epsilon
					)
				)
					# I tried using https://www.npmjs.com/package/nextafter
					# for a minimal offset, but it still got TypeError: i0 is undefined.
					# cut_x = nextAfter(cut_x, Infinity)
					cut_x += epsilon
				try
					# TODO: non-arbitrary y values, or at least bigger
					polygons = polygons.flatMap((polygon) -> PolyK.Slice(polygon, cut_x, -99999, cut_x, 99999))
				catch error
					console.warn "Error optimizing terrain:", error

			if polygons.length is 1
				continue

			old_terrain_entity.intangible = true
			old_terrain_entity.intangible_because_optimized = true

			for sliced_points_flat in polygons
				sliced_points = []
				for i in [0...sliced_points_flat.length] by 2
					sliced_points.push({x: sliced_points_flat[i], y: sliced_points_flat[i+1]})
				# Relying on the specific serialization format of PolygonStructure.
				# It stores points as an array, unlike the base class Structure, which supports named points.
				# Also, this doesn't need to be the original entity class,
				# we could probably just use the base class Terrain.
				# We shouldn't need to do anything special to make it invisible,
				# since it's not going in the world.entities array.
				ent_def = Object.assign(JSON.parse(JSON.stringify(old_terrain_entity)), {
					structure: {points: sliced_points}
					intangible: false
					intangible_because_optimized: false
					entity_collider_is_derived_from: old_terrain_entity
				})
				delete ent_def.id
				new_terrain_entity = Entity.fromJSON(ent_def)
				@derived_colliders.push(new_terrain_entity)
		return

	count_hit_tests = (try localStorage["tiamblia.count_hit_tests"]) is "true"
	collision: (point, {types=[Terrain], lineThickness=5}={})->
		# lineThickness doesn't apply to polygons like Terrain
		# also it's kind of a hack, because different entities could need different lineThicknesses
		# and different segments within an entity too
		# Also note that lineThickness > bbox_padding could have false negatives
		# at collision bucket boundaries.
		# The bbox_padding was originally meant for framing entity previews (and maybe culling rendering).
		# As of writing all entities have bbox_padding > 5, so this shouldn't be a problem.

		if not @collision_buckets
			console.warn "Collision detection called before collision buckets were initialized."
			@updateCollisionBuckets()

		# no bucketization (to compare FPS, also disable updateCollisionBuckets and perhaps optimizeTerrain)
		# entities = @entities
		# one dimensional bucketization
		# b_x = Math.floor(point.x/bucket_width)
		# entities = @collision_buckets[b_x] ? []
		# two dimensional bucketization
		b_x = Math.floor(point.x/bucket_width)
		b_y = Math.floor(point.y/bucket_height)
		entities = (@collision_buckets[b_x] ? {})[b_y] ? []

		if count_hit_tests
			@hit_test_counts ?= {}
			@hit_test_counts[b_x] ?= {}
			@hit_test_counts[b_x][b_y] ?= 0
			@hit_test_counts[b_x][b_y]++

		for entity in entities
			if typeof types is "function"
				if not types(entity)
					continue
			else
				match = false
				for type in types
					if (entity instanceof type) and (entity.solid ? true)
						match = true
						break
				if not match
					continue
			local_point = entity.fromWorld(point)
			if entity.structure.pointInPolygon?
				if entity.structure.pointInPolygon(local_point)
					if entity.entity_collider_is_derived_from
						return entity.entity_collider_is_derived_from
					return entity
			else
				for segment_name, segment of entity.structure.segments
					dist = distanceToLineSegment(local_point, segment.a, segment.b)
					if dist < lineThickness
						return entity
		return null

	# This is used for picking up nearby items in Player.
	closest: (point_in_world_space, EntityClass, filter)=>
		closest_dist = Infinity
		closest_entity = null
		closest_segment = null
		for entity in @getEntitiesOfType(EntityClass) when filter?(entity) or not filter
			point_in_entity_space = entity.fromWorld(point_in_world_space)
			for segment_name, segment of entity.structure.segments
				dist = distanceToLineSegment(point_in_entity_space, segment.a, segment.b)
				if dist < closest_dist
					closest_dist = dist
					closest_entity = entity
					closest_segment = segment
		return {closest_entity, closest_dist, closest_segment}

	# This is used for collision response in Caterpillar and Arrow.
	projectPointOutside: (point_in_world_space, {types=[Terrain], outsideEntity}={})->
		# Ideally it should use joined polygons, with a boolean polygon union operation,
		# so that it projects to the overall boundary of the terrain, even across different types of terrain,
		# and prevents potential strange responses at crevices between different polygons.
		closest_distance = Infinity
		closest_segment = null
		hit = outsideEntity ? @collision(point_in_world_space, {types})
		if not hit
			return null
		point_in_hit_space = hit.fromWorld(point_in_world_space)
		for segment_name, segment of hit.structure.segments
			dist = distanceToLineSegment(point_in_hit_space, segment.a, segment.b)
			if dist < closest_distance and Math.hypot(segment.a.x - segment.b.x, segment.a.y - segment.b.y) > 0.1
				closest_distance = dist
				closest_segment = segment
		if closest_segment
			closest_point_in_hit_space = closestPointOnLineSegment(point_in_hit_space, closest_segment.a, closest_segment.b)
			closest_point_in_world = hit.toWorld(closest_point_in_hit_space)
			return {closest_point_in_world, closest_point_in_hit_space, closest_segment}
		return null
