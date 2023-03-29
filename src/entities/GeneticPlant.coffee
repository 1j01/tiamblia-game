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
			
			leaf_size_min: Math.random()*20+2
			leaf_size_range: Math.random()*20
			leaf_aspect: Math.random()*2+0.1
			leaf_bottom_aspect: Math.random()*0.5+1
			leaf_pointedness: Math.random()
			leaf_anti_pointedness: Math.random()*2-1
			leaf_rotation_range: Math.random()*TAU

			leaf_bunch_min: Math.random()*5+1
			leaf_bunch_range: Math.random()*5
			leaf_bunch_spread_min: Math.random()*15+1
			leaf_bunch_spread_range: Math.random()*15

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
		@branch({
			from: "base"
			to: "1"
			juice: Math.random()*10+5
			width: @dna.trunk_width_min + Math.random() * @dna.trunk_width_range
			length: @dna.branch_length_min + Math.random() * @dna.branch_length_range
			angle: -TAU/2
		})

	fromJSON: (def) ->
		super(def)
		# in main.coffee I have a dev helper that creates clones with the same DNA
		# using Entity.fromJSON with just the class name and dna property
		if def.dna and not def.structure
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
			leaf_point.segment_name = name
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
			@drawLeaf(ctx, leaf)
		return

	drawLeaf: (ctx, leaf)->
		segment = @structure.segments[leaf.segment_name]
		angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x) + TAU/4
		num_leaves = @dna.leaf_bunch_min + @random() * @dna.leaf_bunch_range
		spread = @dna.leaf_bunch_spread_min + @random() * @dna.leaf_bunch_spread_range
		ctx.save()
		ctx.translate(leaf.x, leaf.y)
		ctx.rotate(angle)
		for [0..num_leaves]
			size = @dna.leaf_size_min + @random() * @dna.leaf_size_range
			offset = @random() * spread
			ctx.translate(0, offset)
			ctx.save()
			ctx.rotate(@random()*@dna.leaf_rotation_range)
			ctx.beginPath()
			ctx.scale(size, size)
			w = @dna.leaf_aspect
			wb = w * @dna.leaf_bottom_aspect
			h = 1
			p = @dna.leaf_pointedness
			ap = @dna.leaf_anti_pointedness
			ctx.translate(0, -h)
			ctx.moveTo(0, 0)
			ctx.bezierCurveTo(w,p, w,h-ap, 0,h)
			ctx.bezierCurveTo(-wb,h-ap, -wb,p, 0,0)
			
			ctx.closePath()
			ctx.fillStyle = @dna.leaf_color
			ctx.fill()
			ctx.restore()
		ctx.restore()
		return
