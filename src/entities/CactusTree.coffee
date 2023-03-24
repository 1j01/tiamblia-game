Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class CactusTree extends Tree
	addEntityClass(@)
	constructor: ->
		super()

		@bbox_padding = 60

		@trunk_width = 10+Math.floor(Math.random()*5)
		@random_index = 0
		@random_values = []

		@branch(from: "base", to: "1", juice: Math.random()*2+3, width: @trunk_width, length: 9, angle: -TAU/2)

	random: ->
		@random_index++
		return @random_values[@random_index] ?= Math.random()

	branch: ({from, to, juice, angle, width, length})->
		name = to
		angle+=(Math.random()*2-1)*0.7
		@structure.addSegment({from, name, length, width, color: "green"})
		@structure.points[name].x = @structure.points[from].x + Math.sin(angle) * length
		@structure.points[name].y = @structure.points[from].y + Math.cos(angle) * length
		juice -= 1
		if juice > 0
			@branch({from: name, to: "#{to}-a", juice, angle, width, length})
			if Math.random() < 0.1
				@branch({from: name, to: "#{to}-b", juice, angle: angle + (Math.random() - 1/2) * TAU/4, width, length})
		else
			leaf_point = @structure.points[name]
			@leaf(leaf_point)
		return
	
	leaf: (leaf)->
		leaf.is_leaf = true
		return leaf
	
	draw: (ctx)->
		@random_index = 0
		
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = segment.color
			ctx.stroke()
			# Highlights
			ctx.lineWidth = segment.width*0.1
			ctx.lineCap = "round"
			ctx.strokeStyle = "rgba(255,255,255,0.5)"
			angle = Math.atan2(segment.b.y-segment.a.y, segment.b.x-segment.a.x) + TAU/4
			dir = {x: segment.b.x-segment.a.x, y: segment.b.y-segment.a.y}
			length = Math.hypot(dir.x, dir.y)
			dir.x /= length
			dir.y /= length
			for i in [-1..1] by 0.4
				ctx.save()
				o = (segment.width/2 - ctx.lineWidth/2)*i
				lengthen = segment.width/2 * Math.sqrt(1 - i*i) - ctx.lineWidth/2
				# lengthen = Math.sin(performance.now()/1000+i)*segment.width/2
				ctx.translate(Math.cos(angle)*o, Math.sin(angle)*o)
				ctx.beginPath()
				# ctx.moveTo(segment.a.x, segment.a.y)
				# ctx.lineTo(segment.b.x, segment.b.y)
				ctx.moveTo(segment.a.x - dir.x*lengthen, segment.a.y - dir.y*lengthen)
				ctx.lineTo(segment.b.x + dir.x*lengthen, segment.b.y + dir.y*lengthen)
				ctx.stroke()
				ctx.restore()
		
		for point_name, leaf of @structure.points when leaf.is_leaf
			@drawLeaf(ctx,leaf.x,leaf.y)
		return

	drawLeaf: (ctx,x,y)->
		ctx.beginPath()
		ctx.arc(x,y,2,0,TAU,true)
		ctx.fillStyle = "pink"
		ctx.fill()
