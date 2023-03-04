Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class PuffTree extends Tree
	addEntityClass(@)
	constructor: ->
		super()
		# @branch(from: "base", to: "1", juice: 5, angle: -TAU/2)
	
		@bbox_padding = 180

		@species = "kaoyu"
		@trunk_width = 10+Math.floor(Math.random()*5)
		@random_seed = performance.now()+Date.now()+Math.random()

	draw: (ctx)->
		Math.seedrandom(@random_seed)
		@drawBranch(ctx,0,0,0,Math.random()*10+5,@trunk_width,9)
		ctx.lineWidth=1
	
	drawBranch: (ctx,x,y,angle,life,thickness,seg_length)->
		ctx.strokeStyle="#89594A"
		ctx.lineWidth=thickness
		ctx.lineCap="round"
		ctx.beginPath()
		ctx.moveTo(x,y)
		angle+=(Math.random()*2-1)*0.7
		x+=Math.sin(angle)*seg_length
		y-=Math.cos(angle)*seg_length
		ctx.lineTo(x,y)
		ctx.stroke()
		#thickness=(life-thickness)/2
		thickness=life
		if (life-=0.3) > 0
		#if thickness>~~~--thickness
			#angle+=(Math.random()*2-1)/50
			@drawBranch(ctx,x,y,angle,life,thickness,seg_length)
			# if Math.random() > 0.1 and life > 0.1
			# 	@drawBranch(ctx,x,y,angle+(Math.random()*2-1)/5,life,thickness,seg_length)
		else
			@drawLeaf(ctx,x,y,angle,life,thickness+4,seg_length)
		ctx.lineCap="butt"
	
	drawLeaf: (ctx,x,y,angle,life,thickness,seg_length)->
		ctx.save()
		l=Math.random()/2
		ctx.fillStyle="hsla("+(150-l*50)+","+(50)+"%,"+(50+l*20)+"%,1)"
		ctx.beginPath()
		ctx.arc(x,y,10+Math.random()*5,0,Math.PI*2,true)
		ctx.fill()
		for i in [0..10]
			l=Math.random()/2
			ctx.fillStyle="hsla("+(150-l*50)+","+(50)+"%,"+(50+l*20)+"%,1)"
			ctx.beginPath()
			r1=Math.PI*2*Math.random()
			r2=Math.random()*15
			ctx.arc(x+Math.sin(r1)*r2,y+Math.cos(r1)*r2,5+Math.random()*5,0,Math.PI*2,true)
			ctx.fill()
		###
		ctx.strokeStyle="#1a5"
		ctx.lineWidth=thickness
		ctx.lineCap="round"
		ctx.beginPath()
		ctx.moveTo(x,y)
		angle+=(Math.random()*2-1)/2
		x+=Math.sin(angle+Math.PI)*seg_length/4
		y-=Math.cos(angle+Math.PI)*seg_length/4
		ctx.lineTo(x,y)
		ctx.stroke()
		###
		ctx.restore()
	
	
