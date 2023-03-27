
Entity = require "./entities/abstract/Entity.coffee"
Terrain = require "./entities/abstract/Terrain.coffee"
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
		
		# Initialize the world
		@entities = (Entity.fromJSON(ent_def) for ent_def in def.entities)
		for entity in @entities
			entity.resolveReferences(@)
	
	getEntityByID: (id)->
		for entity in @entities
			return entity if entity.id is id
	
	getEntitiesOfType: (Class)->
		entity for entity in @entities when entity instanceof Class
	
	drawBackground: (ctx, view)->
		ctx.fillStyle = "#32C8FF"
		ctx.fillRect(0, 0, view.width, view.height)
	
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
			ctx.restore = ->
				n_saved_states--
				_restore.apply(this, arguments)
			try
				entity.draw(ctx, view, @)
			catch error
				console.error "Error drawing entity #{entity.constructor.name} #{entity.id}:", error
				while n_saved_states
					ctx.restore()
			ctx.save = _save
			ctx.restore = _restore
			ctx.restore()
	
	collision: (point, {types=[Terrain], lineThickness=5}={})->
		# lineThickness doesn't apply to polygons like Terrain
		# also it's kind of a hack, because different entities could need different lineThicknesses
		# and different segments within an entity too
		
		if typeof types is "function"
			filter = types
		else
			filter = (entity)=> types.some((type)=> (entity instanceof type) and (entity.solid ? true))
		
		for entity in @entities when filter(entity)
			local_point = entity.fromWorld(point)
			if entity.structure.pointInPolygon?
				if entity.structure.pointInPolygon(local_point)
					return entity
			else
				for segment_name, segment of entity.structure.segments
					dist = distanceToLineSegment(local_point, segment.a, segment.b)
					if dist < lineThickness
						return entity
		null
