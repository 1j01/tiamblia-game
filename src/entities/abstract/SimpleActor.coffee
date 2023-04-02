
# Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
# SimpleActors have rectangular collision boxes and basic physics.

{Terrain} = require "skele2d"
{lineSegmentsIntersect} = require("skele2d").helpers
Entity = require "./Entity.coffee"

module.exports = class SimpleActor extends Entity
	gravity = 0.5
	constructor: ->
		super()
		@vx = 0
		@vy = 0
		@width = 10
		@height = 40
		@jump_height = 50
		@walk_speed = 4
		@run_speed = 6
		@move_x = 0
		@move_y = 0
		@jump = no
		@grounded = no
		@facing_x = 0

	find_ground_angle: (world)->
		a = {x: @x, y: @y}
		b = {x: @x, y: @y + 2 + @height} # slightly further down than collision code uses
		for entity in world.entities when entity instanceof Terrain
			if entity.structure.pointInPolygon(entity.fromWorld(b))
				# console.log "found ground"
				# find line segment intersecting ab
				e_a = entity.fromWorld(a)
				e_b = entity.fromWorld(b)
				for segment_name, segment of entity.structure.segments
					if lineSegmentsIntersect(e_a.x, e_a.y, e_b.x, e_b.y, segment.a.x, segment.a.y, segment.b.x, segment.b.y)
						# find the angle
						angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x)
						# console.log "angle", angle
						if Math.cos(angle) < 0
							angle -= Math.PI
							angle = (angle + Math.PI * 2) % (Math.PI * 2)
						return angle
		# console.log "no ground found"

	step: (world)->
		return if @y > 400
		
		# TODO: Boolean, not for @submerged though; that I could rename @water or something
		@grounded = world.collision({@x, y: @y + 1 + @height}) #or world.collision({@x, y: @y + @vy + @height}) or world.collision({@x, y: @y + 4 + @height})
		@submerged = world.collision({@x, y: @y + @height * 0.9}, types: (entity)=>
			entity.constructor.name is "Water"
		)
		more_submerged = @submerged and world.collision({@x, y: @y + @height * 0.4}, types: (entity)=>
			entity.constructor.name is "Water"
		)

		if @grounded
			# if Math.abs(@vx) >= 1
			# 	@vx -= Math.sign(@vx)
			# else
			# 	@vx = 0
			# @vx += @move_x
			if @move_x is 0
				@vx *= 0.7
			else
				@vx += @move_x
			if @jump
				@vy = -Math.sqrt(2 * gravity * @jump_height)
		else
			@vx += @move_x * 0.7
		@vx = Math.min(@run_speed, Math.max(-@run_speed, @vx))
		@vy += gravity
		if @submerged
			@vy += @move_y * 0.7 if more_submerged or @move_y > 0
			@vy *= 0.8
			@vx *= 0.8
			if not more_submerged
				@submerged.makeWaves({x: @x, y: @y + @height * 0.9}, @width/2, @vy)

		# @vy *= 0.99
		move_x = @vx
		move_y = @vy
		# checking @vy and not just not @jump because Rabbit currently uses @vy to jump
		if @grounded and @vy >= 0
			# follow hills downward
			# This prevents awkward situations where you can't jump
			# because you just left the ground (by running forwards)
			move_y += Math.abs(@vx)
		@facing_x = Math.sign(move_x) unless move_x is 0
		resolution = 0.5
		while Math.abs(move_x) > resolution
			go = Math.sign(move_x) * resolution
			if world.collision({x: @x + go, y: @y + @height})
				@vx *= 0.99
				# TODO: clamber over tiny divots and maybe even stones and twigs
				# This only handles going at a 45 degree angle,
				# but stops on tiny 2-unit-high obstacles if it's > 45 degrees
				if world.collision({x: @x + go, y: @y + @height - 1})
					break
				else
					@y -= 1
					@vy = 0 if @vy > 0
			move_x -= go
			@x += go
		if Math.abs(move_y) > resolution
			@grounded = no
		while Math.abs(move_y) > resolution
			go = Math.sign(move_y) * resolution
			if world.collision({@x, y: @y + go + @height})
				if @constructor.name is "Player"
					# 1 is the granularity of the stepping code here.
					# If gravity is 0.5, vy may accumulate to 1 before moving,
					# so we can't use gravity as the threshold.
					if @vy > 1
						@landing_momentum = Math.max(@landing_momentum, @vy)
						# console.log "landing_momentum", @landing_momentum, "vy", @vy
				@vy = 0
				@grounded = yes
				break
			move_y -= go
			@y += go
		# @jump_height = @y - view.toWorld(editor.mouse).y
		
		# if @jump
		# 	console.log world.collision({@x, y: @y + i + @height}) for i in [0..5]
		# 	console.log @vy, world.collision({@x, y: @y + @vy + @height})
		
		# console.log "RES", world.collision({@x, y: @y + resolution + @height})
		
		# @grounded = world.collision({@x, y: @y + 1 + @height}) #or world.collision({@x, y: @y + @vy + @height}) or world.collision({@x, y: @y + 4 + @height})
		# 
		# if @grounded and @jump
		# 	@vy = -Math.sqrt(2 * gravity * @jump_height)

		return
