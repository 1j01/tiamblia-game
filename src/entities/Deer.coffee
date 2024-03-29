SimpleActor = require "./abstract/SimpleActor.coffee"
Entity = require "./abstract/Entity.coffee"
{addEntityClass} = require "skele2d"
hsl_to_rgb_hex = require "../hsl-to-rgb-hex.js"

TAU = Math.PI * 2
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
		@x_prev = 0 # previous x position
		@linger_time = 0 # I guess this was trying to
		# avoid getting stuck for too long on a cliff, a hill too steep to climb.
		# I don't know if it works with the new game, after porting from tiamblia-original.
		@leg_rotation = 0 # leg rotation
		@smoothed_facing_x = @facing_x = 1
		@rideable = true
		# hex is for lil-gui based entity properties editor
		@body_color = hsl_to_rgb_hex("hsla("+(Math.random()*20)+","+(10)+"%,"+(50+Math.random()*20)+"%,1)")
		@ground_angle = 0
		@ground_angle_smoothed = 0
		# smoothed_facing_x and ground_angle_smoothed, huh? inconsistent naming scheme

	step: (world)->
		if @grounded
			# Note: ground_angle  and ground_angle_smoothed are used by Player while riding
			@ground_angle = @find_ground_angle(world) ? 0
			@ground_angle = Math.atan2(Math.sin(@ground_angle), Math.cos(@ground_angle))
			@ground_angle_smoothed += (@ground_angle-@ground_angle_smoothed)/5
			if Math.random() < 0.01
				@move_x = r()
				if Math.abs(@move_x) < 0.3
					@move_x = 0
		else
			@ground_angle = 0
			@ground_angle_smoothed += (@ground_angle-@ground_angle_smoothed)/10
			if Math.abs(@x_prev-@x) < 1
				@linger_time++
				if @linger_time > 15
					@move_x = r()
					if Math.abs(@move_x) < 0.3
						@move_x = 0
					@linger_time=0
			else
				@linger_time=0
		
		@leg_rotation += Math.abs(@vx)/5
		@x_prev = @x

		# swim upwards always if in water
		@move_y = -1
		# run SimpleActor physics, which uses @move_x/y and @jump
		super(world)

		@smoothed_facing_x += (@facing_x-@smoothed_facing_x)/10
		return
	
	draw: (ctx)->
		ctx.save()
		# ctx.translate(@x,@y+@height*3/4)
		ctx.translate(0,@height*3/4)
		ctx.rotate(@ground_angle_smoothed)
		
		ctx.beginPath()
		ctx.fillStyle=@body_color
		ctx.arc(0,-@height/2,@height/3,0,TAU,true)
		ctx.fill()
		
		ctx.scale(@smoothed_facing_x,1)
		# ctx.rotate(@vx/-10)
		# legs
		ctx.strokeStyle="#a55"
		ctx.beginPath()
		ctx.moveTo(-@width/2,-@height/2)
		ctx.lineTo(Math.cos(@leg_rotation)*10-@width/2,@height/2+Math.sin(@leg_rotation)*8)
		ctx.moveTo(-@width/2,-@height/2)
		ctx.lineTo(Math.cos(@leg_rotation+TAU/2)*10-@width/2,@height/2+Math.sin(@leg_rotation+TAU/2)*8)
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(@width/2,-@height/2)
		ctx.lineTo(Math.cos(@leg_rotation+0.1)*10+@width/2,@height/2+Math.sin(@leg_rotation)*8)
		ctx.moveTo(@width/2,-@height/2)
		ctx.lineTo(Math.cos(@leg_rotation+TAU/2+0.2)*10+@width/2,@height/2+Math.sin(@leg_rotation+TAU/2)*8)
		ctx.stroke()
		
		ctx.fillStyle=@body_color
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
		# eye
		ctx.fillStyle="#000"
		ctx.beginPath()
		ctx.arc(0,0,1,0,TAU,true)
		ctx.fill()
		ctx.restore() # /head
		
		# body
		ctx.fillRect(@width/-2,@height/-1,@width,@height*3/4)

		ctx.restore()

		return
