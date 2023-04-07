SimpleActor = require "./abstract/SimpleActor.coffee"
{addEntityClass} = require "skele2d"

TAU = Math.PI * 2
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
		@body_color = "#FFF"
		@body_shadow_color = "#DDD"
		@eye_color = "#000"
		@alive = true
		@smoothed_facing_x = @facing_x = 1

	step: (world)->
		if not @alive
			return
		
		if @grounded
			# @vx*=0.99
			if Math.random() < 0.1
				@dir = r()
			if Math.random() < 0.1
				@vy = -5
			else if Math.abs(@vx) > 1
				@vy = -3
		else
			if Math.abs(@xp-@x) < 1
				@t++
				if @t>15
					@dir = r()
			else
				@t=0
		
		@vx += (@dir *= 1.1)/15
		@dir = Math.max(-10,Math.min(10,@dir))
		if Math.abs(@vx) < 0.1
			@dir = 0
		@xp=@x

		@move_x = @dir*0.02
		@move_y = -1
		# run SimpleActor physics, which uses @move_x and @jump
		super(world)

		@smoothed_facing_x += (@facing_x - @smoothed_facing_x) / 5

		@stepLayout()
		return

	initLayout: ->
		@stepLayout()
		return

	stepLayout: ->
		# Align skeleton to the body
		@structure.points.head.x = @width/2 + @facing_x * @width/2
		@structure.points.head.y = @height * 0.5
		@structure.points.body.x = @width/2 - @facing_x * @width/2
		@structure.points.body.y = @height
		return
	
	draw: (ctx, view)->
		ctx.save() # body center transform
		ctx.translate(@width/2,@height)
		
		# for cute hopping, rotate based on the angle of movement
		if @vx isnt 0
			angle = Math.atan2(@vy,Math.abs(@vx))
			# Reduce the angle if it's too big, in a soft way
			if Math.abs(angle) > 1
				angle = Math.pow(Math.abs(angle), 0.5) * Math.sign(angle)
			ctx.rotate(angle / 2)

		ctx.beginPath()
		ctx.fillStyle=@body_color
		ctx.arc(-@smoothed_facing_x*@width/2,0,@height/5,0,TAU,false) # tail
		ctx.fill()
		ctx.beginPath()
		ctx.fillStyle=@body_shadow_color
		ctx.arc(0,0,@height/2,TAU*0.45,TAU*1.05,false) # body
		ctx.fill()
		ctx.fillStyle=@body_color
		ctx.save() # head transform
		ctx.translate(@smoothed_facing_x*@width/3,-@height/3)
		ctx.beginPath()
		head_radius = @height/3
		ctx.arc(0,0,head_radius,TAU*0.45,TAU*1.05,false) # head
		ctx.fill()
		ctx.save() # head clip
		ctx.clip()
		ctx.beginPath()
		eye_radius = 1
		eye_y = -1
		eye_spacing = 1 # radians
		turn_limit = TAU/5 # radians, TAU/4 = head facing completely sideways, only one eye visible
		ctx.fillStyle = @eye_color
		for eye_signature in [-1, 1]
			# 3D projection in one axis
			head_rotation_angle = @smoothed_facing_x * turn_limit * -1
			eye_x = Math.sin(eye_spacing * eye_signature - head_rotation_angle) * head_radius
			back_of_head = Math.cos(eye_spacing * eye_signature - head_rotation_angle) < 0
			# continue if back_of_head # don't draw eyes on the back of the head
			if back_of_head
				# non-physical kludge to make the eyes transition away when going behind the head
				eye_x += Math.cos(eye_spacing * eye_signature - head_rotation_angle) * head_radius * eye_signature * -1
			ctx.beginPath()
			ctx.arc(eye_x, eye_y, eye_radius, 0, TAU)
			ctx.fill()
		ctx.beginPath()
		ctx.restore() # end head clip
		ctx.fill()
		ctx.fillStyle=@body_color
		ctx.beginPath()
		ctx.save() # ear transform and above-eyes clip
		above_eyes_y = eye_y - eye_radius
		ctx.rect(-@width*5,above_eyes_y-@height*10,@width*10,@height*10)
		# ctx.lineWidth = 1 / view.scale
		# ctx.strokeStyle = "#F0F"
		# ctx.stroke()
		ctx.clip()
		ctx.beginPath()
		ctx.translate(-@smoothed_facing_x*@width/9,-@height/6)
		# ctx.rotate(Math.sin(performance.now()/1000))
		ctx.rotate(-Math.min(TAU/6, Math.max(-TAU/6, @vx/3)))
		ctx.scale(1, 3)
		ctx.arc(0,-@height/9,1,0,TAU,false) # ear
		ctx.fill()
		ctx.restore() # end ear transform and above-eyes clip
		ctx.restore() # end head transform
		ctx.restore() # end body center transform
		return
