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
	
	drawBranch: (ctx,x,y,r,life,w,sl)->
		ctx.strokeStyle="#89594A"
		ctx.lineWidth=w
		ctx.lineCap="round"
		ctx.beginPath()
		ctx.moveTo(x,y)
		r+=(Math.random()*2-1)*0.7
		x+=Math.sin(r)*sl
		y-=Math.cos(r)*sl
		ctx.lineTo(x,y)
		ctx.stroke()
		#w=(life-w)/2
		w=life
		if (life-=0.3) > 0
		#if w>~~~--w
			#r+=(Math.random()*2-1)/50
			@drawBranch(ctx,x,y,r,life,w,sl)
			if Math.random() > 0.1 and life > 0.1
				@drawBranch(ctx,x,y,r+(Math.random()*2-1)/5,life,w,sl)
		else
			@drawLeaf(ctx,x,y,r,life,w+4,sl)
		ctx.lineCap="butt"
	
	drawLeaf: (ctx,x,y,r,life,w,sl)->
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
		ctx.lineWidth=w
		ctx.lineCap="round"
		ctx.beginPath()
		ctx.moveTo(x,y)
		r+=(Math.random()*2-1)/2
		x+=Math.sin(r+Math.PI)*sl/4
		y-=Math.cos(r+Math.PI)*sl/4
		ctx.lineTo(x,y)
		ctx.stroke()
		###
		ctx.restore()
	
	
