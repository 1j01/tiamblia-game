SimpleActor = require "./abstract/SimpleActor.coffee"
{addEntityClass} = require "skele2d"

r = -> Math.random()*2-1

module.exports = class Rabbit extends SimpleActor
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
		@c = "#FFF"

	step: (world)->
		if @grounded
			# @vx*=0.99
			if Math.random() < 0.1
				@dir = r()
			if Math.random() < 0.1
				@vy = -5
		else
			if Math.abs(@xp-@x) < 1
				@t++
				if @t>15
					@dir = r()
			else
				@t=0
		
		@vx += (@dir *= 1.1)/5
		@xp=@x

		@move_x = @dir*0.2
		@move_y = -1
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)
	
	draw: (ctx)->
		ctx.save()
		ctx.translate(@width/2,@height/2)
		ctx.rotate(@vx/15)
		ctx.fillStyle=@c
		ctx.fillRect(0,0,@width,@height)
		ctx.beginPath()
		ctx.arc(0,0,@height/2,Math.PI,Math.PI*2.2,false)
		ctx.fill()
		ctx.beginPath()
		ctx.arc(@dir*@width/2,0,@height/3,Math.PI,Math.PI*2.2,false)
		ctx.fill()
		ctx.restore()
