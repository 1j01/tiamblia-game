
# Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
# SimpleActors have rectangular collision boxes and basic physics.

class @SimpleActor extends Entity
	gravity = 0.5
	constructor: ->
		super
		@vx = 0
		@vy = 0
		@width = 10
		@height = 40
		@jump_height = 50
		@walk_speed = 4
		@run_speed = 4
		@move_x = 0
		@jump = no
		@grounded = no
		@facing_x = 0
	
	step: (world)->
		@grounded = no
		return if @y > 400
		@vx += @move_x
		@vy += gravity
		@vx *= 0.9
		# @vy *= 0.99
		move_x = @vx
		move_y = @vy
		@facing_x = sign(move_x) unless move_x is 0
		resolution = 0.5
		while abs(move_x) > resolution
			go = sign(move_x) * resolution
			if world.collision({x: @x + go, y: @y + @height})
				@vx *= 0.99
				# TODO: clamber over tiny divots and maybe even stones and twigs
				if world.collision({x: @x + go, y: @y + @height - 1})
					break
				else
					@y -= 1
			move_x -= go
			@x += go
		while abs(move_y) > resolution
			go = sign(move_y) * resolution
			if world.collision({@x, y: @y + go + @height})
				@vy *= 0.9 # as opposed to `@vy = 0` so the actor sticks to the ground when going downhill
				@grounded = yes
				break
			move_y -= go
			@y += go
		# @jump_height = @y - view.toWorld(editor.mouse).y
		if @grounded and @jump
			@vy = -sqrt(2 * gravity * @jump_height)
