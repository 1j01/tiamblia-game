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
		@c2 = "#DDD"
		@eye_color = "#000"

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
		@dir = Math.max(-10,Math.min(10,@dir))
		@xp=@x

		@move_x = @dir*0.2
		@move_y = -1
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)
	
	draw: (ctx)->
		ctx.save() # body center transform
		ctx.translate(@width/2,@height/2)
		ctx.fillStyle=@c2
		# ctx.fillRect(0,0,@width,@height)
		ctx.beginPath()
		ctx.arc(0,0,@height/2,Math.PI*0.9,Math.PI*2.1,false) # body
		ctx.fill()
		ctx.fillStyle=@c
		ctx.save() # head transform
		ctx.translate(@facing_x*@width/3,-@height/3)
		ctx.beginPath()
		ctx.arc(0,0,@height/3,Math.PI*0.9,Math.PI*2.1,false) # head
		ctx.fill()
		ctx.fillStyle=@eye_color
		ctx.beginPath()
		ctx.arc(0,0,1,0,Math.PI*2,false) # eye
		ctx.fill()
		ctx.fillStyle=@c
		ctx.beginPath()
		ctx.save() # ear transform
		ctx.translate(-@facing_x*@width/9,-@height/6)
		# ctx.rotate(Math.sin(performance.now()/1000))
		ctx.rotate(-Math.min(Math.PI/3, Math.max(-Math.PI/3, @vx/3)))
		ctx.scale(1, 3)
		ctx.arc(0,-@height/9,1,0,Math.PI*2,false) # ear
		ctx.fill()
		ctx.restore() # end ear transform
		ctx.restore() # end head transform
		ctx.fillStyle=@c
		ctx.beginPath()
		ctx.arc(-@facing_x*@width/2,0,@height/5,0,Math.PI*2,false) # tail
		ctx.fill()
		ctx.restore() # end body center transform
