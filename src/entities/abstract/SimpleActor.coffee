
# Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
# SimpleActors have rectangular collision boxes and basic physics.

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
		@jump = no
		@grounded = no
		@facing_x = 0
	
	step: (world)->
		return if @y > 400
		
		@grounded = world.collision({@x, y: @y + 1 + @height}) #or world.collision({@x, y: @y + @vy + @height}) or world.collision({@x, y: @y + 4 + @height})
		
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
			@vy += Math.abs(@vx)
			if @jump
				@vy = -Math.sqrt(2 * gravity * @jump_height)
		else
			@vx += @move_x * 0.7
		@vx = Math.min(@run_speed, Math.max(-@run_speed, @vx))
		@vy += gravity
		@grounded = no
		# @vy *= 0.99
		move_x = @vx
		move_y = @vy
		@facing_x = Math.sign(move_x) unless move_x is 0
		resolution = 0.5
		while Math.abs(move_x) > resolution
			go = Math.sign(move_x) * resolution
			if world.collision({x: @x + go, y: @y + @height})
				@vx *= 0.99
				# TODO: clamber over tiny divots and maybe even stones and twigs
				if world.collision({x: @x + go, y: @y + @height - 1})
					break
				else
					@y -= 1
					@vy = 0 if @vy > 0
			move_x -= go
			@x += go
		while Math.abs(move_y) > resolution
			go = Math.sign(move_y) * resolution
			if world.collision({@x, y: @y + go + @height})
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
