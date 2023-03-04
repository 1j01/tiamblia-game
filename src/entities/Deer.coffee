SimpleActor = require "./abstract/SimpleActor.coffee"
Entity = require "./abstract/Entity.coffee"
{addEntityClass} = require "skele2d"

r = -> Math.random()*2-1

module.exports = class Deer extends SimpleActor
	addEntityClass(@)
	# Entity.initAnimation(@)
	
	constructor: ->
		super()
		@structure.addPoint("head")
		@structure.addSegment(
			from: "head"
			name: "neck"
			length: 5
		)
		@bbox_padding = 30
		
		@width = 27; @height = 18
		@xp = 0; @t = 0
		@lr = 0
		@dir = 0; @dir_p = 1; @dir_pl = 1
		@rideable = true
		@c = "hsla("+(Math.random()*20)+","+(10)+"%,"+(50+Math.random()*20)+"%,1)"

	step: (world)->
		if @grounded
			if Math.random() < 0.01
				@dir = r()
		else
			if Math.abs(@xp-@x) < 1
				@t++
				if @t > 15
					@dir = r()
					@t=0
			else
				@t=0
			
		
		@vx += (@dir)/5
		@lr += Math.abs(@vx)/5
		@xp = @x


		@move_x = @dir*0.2
		@move_y = -1
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)
	
	draw: (ctx)->
		@dir_p=-1 if @dir < -0.3
		@dir_p=1 if @dir > 0.3
		@dir_pl += (@dir_p-@dir_pl)/10
		ctx.save()
		# ctx.translate(@x,@y+@height*3/4)
		ctx.translate(0,@height*3/4)
		
		ctx.beginPath()
		ctx.fillStyle=@c
		ctx.arc(0,-@height/2,@height/3,0,Math.PI*2,true)
		ctx.fill()
		
		ctx.scale(@dir_pl,1)
		# ctx.rotate(@vx/-10)
		# legs
		ctx.strokeStyle="#a55"
		ctx.beginPath()
		ctx.moveTo(-@width/2,-@height/2)
		ctx.lineTo(Math.cos(@lr)*10-@width/2,@height/2+Math.sin(@lr)*8)
		ctx.moveTo(-@width/2,-@height/2)
		ctx.lineTo(Math.cos(@lr+Math.PI)*10-@width/2,@height/2+Math.sin(@lr+Math.PI)*8)
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(@width/2,-@height/2)
		ctx.lineTo(Math.cos(@lr+0.1)*10+@width/2,@height/2+Math.sin(@lr)*8)
		ctx.moveTo(@width/2,-@height/2)
		ctx.lineTo(Math.cos(@lr+Math.PI+0.2)*10+@width/2,@height/2+Math.sin(@lr+Math.PI)*8)
		ctx.stroke()
		
		ctx.fillStyle=@c
		ctx.save() # head
		ctx.translate(@width/2,@height*-3/4)
		ctx.rotate(-0.4+Math.cos(@x/50))
		ctx.fillRect(-5,-5,15,8)
		ctx.translate(12,0)
		ctx.rotate(0.6-Math.cos(@x/50)/2)
		# ctx.fillRect(-5,-5,15,8)
		ctx.beginPath()
		ctx.moveTo(-5,-5)
		ctx.lineTo(-5,3)
		ctx.lineTo(10,1)
		ctx.lineTo(10,-2)
		ctx.fill()
		ctx.restore()
		
		# body
		ctx.fillRect(@width/-2,@height/-1,@width,@height*3/4)

		ctx.restore()
