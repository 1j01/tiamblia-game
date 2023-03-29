Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class GeneticPlant extends Tree
	addEntityClass(@)
	constructor: ->
		super()

		@bbox_padding = 60

		@random_index = 0
		@random_values = []

		@dna = {
			branch_color: "hsl(#{Math.floor(Math.pow(Math.random(), 2)*360)}, #{Math.floor(Math.random()*50+50)}%, #{Math.floor(Math.random()*50+50)}%)"
			leaf_color: "hsl(#{(Math.floor(Math.pow(Math.random(), 2)*360+200)%360)}, #{Math.floor(Math.random()*50+50)}%, #{Math.floor(Math.random()*50+50)}%)"
			leaf_size: Math.random()*10+5
			leaf_shape_params: (Math.random()*2-1 for [0...4])
			trunk_width_min: Math.random()*15+2
			trunk_width_range: Math.random()*10
			branch_length_min: Math.random()*10+1
			branch_length_range: Math.random()*10
			random_angle: Math.random()*1.5
		}

		@init()

	init: ->
		delete @structure.points[k] for k of @structure.points
		delete @structure.segments[k] for k of @structure.segments
		@structure.addPoint("base") # Tree does this but we have to redo it because we deleted the points
		@trunk_width = @dna.trunk_width_min + Math.random() * @dna.trunk_width_range
		@branch(from: "base", to: "1", juice: Math.random()*10+5, width: @trunk_width, length: @dna.branch_length_min + Math.random() * @dna.branch_length_range, angle: -TAU/2)

	fromJSON: (def) ->
		super(def)
		@init()

	random: ->
		@random_index++
		return @random_values[@random_index] ?= Math.random()

	branch: ({from, to, juice, angle, width, length})->
		name = to
		angle += (Math.random()*2-1)*@dna.random_angle
		length = @dna.branch_length_min + Math.random() * @dna.branch_length_range
		@structure.addSegment({from, name, length, width, color: @dna.branch_color})
		@structure.points[name].x = @structure.points[from].x + Math.sin(angle) * length
		@structure.points[name].y = @structure.points[from].y + Math.cos(angle) * length
		juice -= 0.3
		if juice > 0
			@branch({from: name, to: "#{to}-a", juice, angle, width: juice, length})
			if Math.random() < 0.1 - juice / 200
				@branch({from: name, to: "#{to}-b", juice, angle: angle + (Math.random() - 1/2) * TAU/4, width: juice, length})
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
		
		for point_name, leaf of @structure.points when leaf.is_leaf
			@drawLeaf(ctx,leaf.x,leaf.y)
		return

	drawLeaf: (ctx,x,y)->
		ctx.save()
		l=@random()/2
		ctx.translate(x,y)
		ctx.rotate(@random()*TAU)
		ctx.scale(l,l)
		ctx.beginPath()
		# ctx.moveTo(0,0)
		# ctx.bezierCurveTo(@dna.leaf_shape_params[0],@dna.leaf_shape_params[1],@dna.leaf_shape_params[2],@dna.leaf_shape_params[3],0,1)
		ctx.arc(0,0,@dna.leaf_size,0,TAU)
		ctx.fillStyle = @dna.leaf_color
		ctx.fill()
		ctx.restore()
		return
