SimpleActor = require "./abstract/SimpleActor.coffee"
{addEntityClass} = require "skele2d"

r = -> Math.random()*2-1

module.exports = class Butterfly extends SimpleActor
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

		@width = 4; @height = 4
		@go_x = r()*5; @go_y = r()*5
		@t = r()*5; @flap = r()*5; @flap_timer = r()*15
		@c1 = "hsla("+(Math.random()*360)+",100%,"+(50+Math.random()*50)+"%,1)"
		@c2 = "hsla("+(Math.random()*360)+",100%,"+(50+Math.random()*50)+"%,1)"

	step: (world)->
		for i in [0..50]
			x=r()*50
			y=r()*70
			if world.collision({x: @x+x, y: @y+y})
				@go_y-=y/50
				@go_x-=x/(50+Math.abs(@go_y))
		if @flap_timer < 0
			if @go_y < -1
				@vy-=5
				@flap_timer=15
			else
				@vy-=1
				@flap_timer=15
		
		@go_x*=0.9
		@go_y*=0.9
		@go_x+=r()/2
		@go_y+=r()/2
		@vx+=(@go_x-@vx/2)/3
		@vy+=(@go_y-@vy/2)/3
		@vy+=0.01
		@x+=@vx
		@y+=@vy
		@flap=Math.cos(@t+=0.5)
		# run SimpleActor physics, which uses @move_x and @jump
		# super(world)
	
	draw: (ctx)->
		ctx.beginPath()
		f=2.8
		
		ctx.strokeStyle=@c1
		ctx.moveTo(0,0)
		ctx.lineTo(0+Math.cos(@flap-f)*@width,0+Math.sin(@flap-f)*@width)
		ctx.moveTo(0,0)
		ctx.lineTo(0-Math.cos(@flap-f)*@width,0+Math.sin(@flap-f)*@width)
		ctx.stroke()
		ctx.beginPath()
		
		ctx.strokeStyle=@c2
		ctx.moveTo(0,0)
		ctx.lineTo(0+Math.cos(@flap+f)*@width,0+Math.sin(@flap+f)*@width)
		ctx.moveTo(0,0)
		ctx.lineTo(0-Math.cos(@flap+f)*@width,0+Math.sin(@flap+f)*@width)
		ctx.stroke()
		ctx.beginPath()
		
		@flap_timer=-1 if @flap_timer < 0
		@flap+=@flap_timer/20
		@flap+=(-@flap-0.1)*0.1
