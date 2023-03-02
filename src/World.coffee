
Entity = require "./entities/abstract/Entity.coffee"
Terrain = require "./entities/abstract/Terrain.coffee"
{distanceToLineSegment} = require("skele2d").helpers

module.exports = class World
	constructor: ->
		@entities = []
	
	toJSON: ->
		formatVersion: 1
		entities: @entities

	fromJSON: (def)->
		unless def.entities instanceof Array
			throw new Error "Expected entities to be an array, got #{def.entities}"
		# upgrade old versions of the format
		if not def.formatVersion
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
			entity.draw(ctx, view)
			ctx.restore()
	
	collision: (point, {types=[Terrain], lineThickness=5}={})->
		# lineThickness doesn't apply to polygons like Terrain
		# also it's kind of a hack, because different entities could need different lineThicknesses
		# and different segments within an entity too
		
		if typeof types is "function"
			filter = types
		else
			filter = (entity)=> types.some((type)=> entity instanceof type)
		
		for entity in @entities when filter(entity)
			if entity.structure.pointInPolygon?
				if entity.structure.pointInPolygon(entity.fromWorld(point))
					return entity
			else
				local_point = entity.fromWorld(point)
				for segment_name, segment of entity.structure.segments
					dist = distanceToLineSegment(local_point, segment.a, segment.b)
					if dist < lineThickness
						return entity
		null
