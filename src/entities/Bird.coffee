SimpleActor = require "./abstract/SimpleActor.coffee"
{addEntityClass} = require "skele2d"

r = -> Math.random()*2-1

module.exports = class Bird extends SimpleActor
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
	
		@width = 8
		@height = 8
		@flap = 0
		@flap_timer = r()*15
		@wingspan = 10
		@go_x = r()*5
		@go_y = 0

	step: (world)->
		for i in [0..50]
			x=r()*50
			y=r()*70
			if world.collision({x: @x+x, y: @y+y})
				@go_y-=y/30
				@go_x-=x/(10+Math.abs(@go_y))
				
		if @flap_timer < 0
			if @go_y < -1
				@vy-=5
				@flap_timer=15
			else
				@vy-=1
				@flap_timer=15
		
		@go_x*=0.95
		@go_y*=0.7
		@vx+=(@go_x-@vx)/2
		@vy+=0.1
		@x+=@vx
		@y+=@vy
		@flap_timer--
		# run SimpleActor physics, which uses @move_x and @jump
		# super(world)
		return
	
	draw: (ctx)->
		ctx.strokeStyle="#000"
		ctx.beginPath()
		f=2.8
		ctx.moveTo(0,0)
		ctx.lineTo(0+Math.cos(@flap-f)*@wingspan,0+Math.sin(@flap-f)*@wingspan)
		ctx.moveTo(0,0)
		ctx.lineTo(0-Math.cos(@flap-f)*@wingspan,0+Math.sin(@flap-f)*@wingspan)
		ctx.stroke()
		@flap_timer=-1 if @flap_timer < 0
		@flap+=@flap_timer/20
		@flap+=(-@flap-0.1)*0.1
		return
