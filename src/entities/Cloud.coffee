Entity = require("./abstract/Entity.coffee")
{addEntityClass} = require("skele2d")
TAU = Math.PI * 2

module.exports = class Cloud extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		@structure.addPoint("body")
		
		@bbox_padding = 80
	
		@width = 45+Math.random()*50
		@height = 35+Math.random()*10
		@simplex = new SimplexNoise()
		@t = 0
		@intangible = true

	toJSON: ->
		def = {}
		def[k] = v for k, v of @ when k isnt "simplex"
		def
	
	step: (world)->
		@x++
		@t+=0.001
		# if @x > terrain.width+300
		# 	@poof=true

	draw: (ctx)->
		ctx.fillStyle="#A9D9FA"
		for i in [0..20]
			ctx.beginPath()
			ctx.arc(
				@simplex.noise2D(5+i,@t+i*3.92)*@width+@width/2,
				@simplex.noise2D(26+i,@t+i*2.576)*@height+@height/2,
				Math.abs(@simplex.noise2D(73+i*5.2,@t+i)*@width),
				# @simplex.noise2D(68+i,@t)*-TAU,
				# @simplex.noise2D(20+i,@t)*TAU,
				0,TAU,
				false
			)
			ctx.fill()
