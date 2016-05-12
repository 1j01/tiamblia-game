
# Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
# SimpleActors have rectangular collision boxes and basic physics.

class @SimpleActor extends Entity
	constructor: ->
		super
		@vx = 0
		@vy = 0
		@width = 10
		@height = 40
		@jump_height = 10
		@walk_speed = 4
		@run_speed = 4
	
	step: (world)->
		@vy += 0.5
		# @x += @vx *= 0.9
		# @y += @vy *= 0.99
		move_x = @vx
		move_y = @vy
		resolution = 0.5
		while abs(move_x) > resolution
			go = sign(move_x) * resolution
			if world.collision({x: @x + go, y: @y + @height})
				@vx *= 0.9
				break
			move_x -= go
			@x += go
		while abs(move_y) > resolution
			go = sign(move_y) * resolution
			if world.collision({@x, y: @y + go + @height})
				@vy = 0
				break
			move_y -= go
			@y += go
		return
