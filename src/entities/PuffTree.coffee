Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class PuffTree extends Tree
	addEntityClass(@)
	constructor: ->
		super()
		@branch(from: "base", to: "1", juice: Math.random()*10+5, width: @trunk_width, length: 9, angle: -TAU/2)
	
		@bbox_padding = 30

		@trunk_width = 10+Math.floor(Math.random()*5)
		@random_seed = performance.now()+Date.now()+Math.random()

	branch: ({from, to, juice, angle, width, length})->
		name = to
		angle+=(Math.random()*2-1)*0.7
		@structure.addSegment({from, name, length, width, color: "#89594A"})
		@structure.points[name].x = @structure.points[from].x + Math.sin(angle) * length
		@structure.points[name].y = @structure.points[from].y + Math.cos(angle) * length
		juice -= 0.3
		if juice > 0
			@branch({from: name, to: "#{to}-a", juice, angle, width: juice, length})
			# if Math.random() < 0.2
			# 	@branch({from: name, to: "#{to}-b", juice, angle: angle + (Math.random() - 1/2) * TAU/4, width: juice, length})
		else
			leaf_point = @structure.points[name]
			@leaf(leaf_point)
	
	leaf: (leaf)->
		leaf.is_leaf = true
		leaf
	
	draw: (ctx)->
		Math.seedrandom(@random_seed)
		
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = segment.color
			ctx.stroke()
		
		for point_name, leaf of @structure.points when leaf.is_leaf
			@drawLeaf(ctx,leaf.x,leaf.y)

	drawLeaf: (ctx,x,y)->
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
		ctx.restore()
	
	
