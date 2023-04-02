SimpleActor = require "./abstract/SimpleActor.coffee"
{addEntityClass} = require "skele2d"

TAU = Math.PI * 2
r = -> Math.random()*2-1

module.exports = class Frog extends SimpleActor
	addEntityClass(@)
	
	constructor: ->
		super()
		@structure.addPoint("head")
		@structure.addSegment(
			from: "head"
			name: "body"
			length: 5
		)
		@bbox_padding = 20
	
		@width = 8; @height = 8
		@xp = 0; @t = 0
		@lr = 0
		@dir = 0
		@c = "hsla("+(150-Math.random()*50)+","+(50+Math.random()*50)+"%,"+(50-Math.random()*20)+"%,1)"

	step: (world)->
		if @grounded
			@vx*=0.1
			if Math.random() > 0.1
				# jump
				@vy = Math.random()*-5
				@dir = r()
				@t=0
		else
			@vx += @dir *= 2
			if @xp is @x
				@t++
				if @t>5
					@dir = r()
			else
				@t=0
		
		@xp=@x

		@move_x = @dir*0.2
		@move_y = 0
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)
		return
	
	draw: (ctx)->
		ctx.save()
		ctx.rotate(@vx/5)
		ctx.fillStyle=@c
		#ctx.fillRect(@x,@y,@width,@height)
		ctx.beginPath()
		ctx.arc(@width/2,@height/4-@vy,@height/2,0,TAU/2,false)
		ctx.arc(@width/2,@height,@height/2,TAU/2,TAU,false)
		ctx.fill()
		ctx.restore()
		return
