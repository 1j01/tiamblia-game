
Entity = require "./entities/abstract/Entity.coffee"
Terrain = require "./entities/abstract/Terrain.coffee"
Water = require "./entities/terrain/Water.coffee"
{distanceToLineSegment} = require("skele2d").helpers

module.exports = class World
	constructor: ->
		@entities = []
	
	@format: "Tiamblia World"
	@formatVersion: 4
	toJSON: ->
		format: World.format
		formatVersion: World.formatVersion
		entities: @entities

	fromJSON: (def)->
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

		# Note: it's a good idea to bump the version number when adding new features
		# that won't be supported by older versions, even without upgrade code,
		# but this is more important for applications, or games with level sharing.
		# For Tiamblia, the format is only authored by the game developer (me),
		# and people coming to see the demo and messing around with the editor,
		# who should be using the latest version of the game anyway,
		# so it's not as important, and I'm not bothering, basically as a policy.
		# The worst it can do is cause some confusion when stepping back in git history.

		# Handle format versions newer than supported
		# This could offer a choice to the user to try to load the world anyway, but that's not implemented.
		if def.formatVersion > World.formatVersion
			throw new Error "The format version #{def.formatVersion} is too new for this version of the game."
		# Just in case the format version format changes to a string like X.Y.Z or something
		if def.formatVersion isnt World.formatVersion
			throw new Error "Unsupported format version #{def.formatVersion}"
		
		# Validate the current version of the format
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
			# (resolveReferences only handles top-level references as a special case)
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
							# throw new Error "Entity references must be at the top level of an entity, but found #{path_to_value} = #{JSON.stringify(value)} #{get_more_context()[0]} #{JSON.stringify(get_more_context()[1])}"
							# Player class has a workaround for this for holding_arrows, so don't throw an error.
							console.warn "Entity references should only be at the top level of an entity, but found #{path_to_value} = #{JSON.stringify(value)}", ...get_more_context()
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
		return
	
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
		for entity in @entities
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
		for b_x, bucket_row of @collision_buckets
			for b_y, entities of bucket_row
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

	optimizeTerrain: ->
		# Divides terrain into smaller polygons horizontally,
		# so it can fit into the collision buckets.
		# This happens at the start of the game.
		old_terrain_entities = @getEntitiesOfType(Terrain)
		# Exempt water because 1. it's transparent, so overlapping polygons will not avoid rendering artifacts,
		# and 2. it renders reflections using drawImage, which is expensive,
		# and 3. it's not solid, so some collision checks will be skipped anyway.
		for old_terrain_entity in old_terrain_entities when old_terrain_entity not instanceof Water
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
				# PolyK has some problems when the cut line is exactly on a point.
				# So we'll offset it a small amount.
				# This may lead to tiny polygons if the terrain is doubly optimized,
				# but ideally, the world editing workflow should involve resetting
				# the simulation, so that terrain is not saved as split polygons,
				# and in general so unnecessary changes are not made to the world,
				# so that git diffs are small and there's less confusion,
				# such as unknowingly saving the player with an idle animation just about to start.
				
				cut_x = bucket_x * bucket_width
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
				
				# Overlap the polygons, both to avoid rendering artifacts,
				# and for collision detection, particularly for the Caterpillar,
				# as it's currently implemented (it has no thickness, and ends up
				# crawling into the seams between polygons).
				# Note that the overlap is least effective when zoomed out.
				# TODO: Ideally we'd use a constant overlap in viewport coordinates,
				# not world coordinates, for the rendering part.
				# As for Caterpillars, they fall off the terrain when meeting a seam,
				# because they project points outside of one polygon, landing inside another.
				# TODO: handle projection recursively in Caterpillar,
				# or rewrite with a proper physics engine.
				overlap = 0.5
				for polygon_coords in polygons
					min_x = Infinity
					max_x = -Infinity
					for i in [0...polygon_coords.length] by 2
						min_x = Math.min(min_x, polygon_coords[i])
						max_x = Math.max(max_x, polygon_coords[i])
					offset_dir = if Math.abs(min_x - cut_x) < epsilon then -1 else 1
					for i in [0...polygon_coords.length] by 2
						if Math.abs(polygon_coords[i] - cut_x) < epsilon
							polygon_coords[i] += offset_dir * overlap

			new_terrain_entities = []
			for sliced_points_flat in polygons
				sliced_points = []
				for i in [0...sliced_points_flat.length] by 2
					sliced_points.push({x: sliced_points_flat[i], y: sliced_points_flat[i+1]})
				# Relying on the specific serialization format of PolygonStructure.
				# It stores points as an array, unlike the base class Structure, which supports named points.
				ent_def = Object.assign(JSON.parse(JSON.stringify(old_terrain_entity)), {
					structure: {points: sliced_points}
				})
				delete ent_def.id
				new_terrain_entity = Entity.fromJSON(ent_def)
				new_terrain_entities.push(new_terrain_entity)
			@entities.splice(@entities.indexOf(old_terrain_entity), 1, ...new_terrain_entities)
		return

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

		# no bucketization (to compare FPS, also disable updateCollisionBuckets)
		# entities = @entities
		# one dimensional bucketization
		# b_x = Math.floor(point.x/bucket_width)
		# entities = @collision_buckets[b_x] ? []
		# two dimensional bucketization
		b_x = Math.floor(point.x/bucket_width)
		b_y = Math.floor(point.y/bucket_height)
		entities = (@collision_buckets[b_x] ? {})[b_y] ? []

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
					return entity
			else
				for segment_name, segment of entity.structure.segments
					dist = distanceToLineSegment(local_point, segment.a, segment.b)
					if dist < lineThickness
						return entity
		return null
