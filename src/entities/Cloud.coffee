Entity = require("./abstract/Entity.coffee")
{addEntityClass} = require("skele2d")

module.exports = class Cloud extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		@structure.addPoint("body")
		
		@bbox_padding = 80
	
		@width = 45+Math.random()*50
		@height = 35+Math.random()*10
		# @simplex = new SimplexNoise()
		@t = 0

	step: (world)->
		@x++
		@t+=0.001
		# if @x > terrain.width+300
		# 	@poof=true

	draw: (ctx)->
		ctx.fillStyle="#A9D9FA"
		for i in [0..20]
			ctx.beginPath()
			# ctx.arc(
			# 	@simplex.noise(5+i,@t+i*3.92)*@width+@width/2,
			# 	@simplex.noise(26+i,@t+i*2.576)*@height+@height/2,
			# 	Math.abs(@simplex.noise(73+i*5.2,@t+i)*@width),
			# 	# @simplex.noise(68+i,@t)*-Math.PI*2,
			# 	# @simplex.noise(20+i,@t)*Math.PI*2,
			# 	0,Math.PI*2,
			# 	false
			# )
			ctx.arc(
				Math.sin(@t+i**1.2)*@width+@width/2,
				Math.sin(@t+i-i**1.1)*@height+@height/2,
				Math.abs(Math.sin(@t+i**1.3))*@width,
				0,Math.PI*2,
				false
			)
			ctx.fill()
