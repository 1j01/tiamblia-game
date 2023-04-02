Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

# Standard Normal variate using Box-Muller transform.
gaussianRandom = (mean=0, standardDeviation=1, random=Math.random)=>
	u = 1 - random() # Converting [0,1) to (0,1)
	v = random()
	z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(TAU * v)
	# Transform to the desired mean and standard deviation:
	return z * standardDeviation + mean

module.exports = class GeneticPlant extends Tree
	addEntityClass(@)
	constructor: ->
		super()

		@bbox_padding = 60

		@random_index = 0
		@random_values = []

		@dna = {
			branch_color_hue_avg: gaussianRandom(20, 40)
			branch_color_hue_range: if Math.random() < 0.7 then 0 else gaussianRandom(5, 20)
			branch_color_saturation_avg: Math.random()*50+50
			branch_color_saturation_range: if Math.random() < 0.7 then 0 else Math.random()*50
			branch_color_lightness_avg: gaussianRandom(50, 15)
			branch_color_lightness_range: if Math.random() < 0.7 then 0 else Math.random()*50
			leaf_color_hue_avg: gaussianRandom(120, 40)
			leaf_color_hue_range: if Math.random() < 0.5 then 0 else gaussianRandom(5, 30)
			leaf_color_saturation_avg: Math.random()*50+50
			leaf_color_saturation_range: if Math.random() < 0.5 then 0 else Math.random()*50
			leaf_color_lightness_avg: gaussianRandom(50, 15)
			leaf_color_lightness_range: if Math.random() < 0.5 then 0 else Math.random()*50
			
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
			trunk_length_min: Math.random()*20+1
			trunk_length_range: Math.random()*20
			branch_width_target_min: Math.random()*10+1
			branch_width_target_range: Math.random()*3
			branch_length_target_min: Math.random()*10+1
			branch_length_target_range: Math.random()*3
			branch_width_change_factor_max: 1-Math.random()*0.1
			branch_width_change_factor_range: Math.random()*0.2
			branch_length_change_factor_max: 1-Math.random()*0.2
			branch_length_change_factor_range: Math.random()*0.2

			angle_change_max: Math.random()*1.5
			angle_tend_upward: Math.random()*2
			branching_angle_min: Math.random()*TAU/4
			branching_angle_range: Math.random()*TAU/4
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
			length: @dna.trunk_length_min + Math.random() * @dna.trunk_length_range
			angle: -TAU/4
		})
		return

	fromJSON: (def) ->
		super(def)
		# in main.coffee I have a dev helper that creates clones with the same DNA
		# using Entity.fromJSON with just the class name and dna property
		if def.dna and not def.structure
			@init()
		return

	random: ->
		# Cached random values for determinism at runtime, not needed during initialization
		@random_index++
		return @random_values[@random_index] ?= Math.random()
	
	gaussianRandom: (mean=0, standardDeviation=1)=>
		return gaussianRandom(mean, standardDeviation, => @random())

	branch: ({from, to, juice, angle, width, length})->
		name = to
		angle += (Math.random()*2-1)*@dna.angle_change_max

		dir = {x: Math.cos(angle), y: Math.sin(angle)}
		dir.y -= @dna.angle_tend_upward
		angle = Math.atan2(dir.y, dir.x)
		
		hue = (@dna.branch_color_hue_avg + (@random() - 0.5) * @dna.branch_color_hue_range) %% 360
		saturation = Math.min(100, Math.max(0, @dna.branch_color_saturation_avg + (@random() - 0.5) * @dna.branch_color_saturation_range))
		lightness = Math.min(100, Math.max(0, @dna.branch_color_lightness_avg + (@random() - 0.5) * @dna.branch_color_lightness_range))
		color = "hsl(#{hue}, #{saturation}%, #{lightness}%)"

		@structure.addSegment({from, name, length, width, color})
		@structure.points[name].x = @structure.points[from].x + Math.cos(angle) * length
		@structure.points[name].y = @structure.points[from].y + Math.sin(angle) * length
		branch_width_change_factor = @dna.branch_width_change_factor_max - Math.random() * @dna.branch_width_change_factor_range
		branch_length_change_factor = @dna.branch_length_change_factor_max - Math.random() * @dna.branch_length_change_factor_range
		# Note this will have an averaging effect since the target is randomized each time
		# It will tend towards the middle of the range, as opposed to if the specific target was chosen at the start
		# It will also wobble (random walk) around the range.
		width_target = @dna.branch_width_target_min + Math.random() * @dna.branch_width_target_range
		length_target = @dna.branch_length_target_min + Math.random() * @dna.branch_length_target_range
		width += (width_target - width) * branch_width_change_factor
		length += (length_target - length) * branch_length_change_factor
		juice -= 0.3
		if juice > 0
			@branch({from: name, to: "#{to}-a", juice, angle, width, length})
			if Math.random() < 0.1 - juice / 200
				side = if Math.random() < 0.5 then -1 else 1
				branch_angle = angle + side * (@dna.branching_angle_min + Math.random() * @dna.branching_angle_range)
				@branch({from: name, to: "#{to}-b", juice, angle: branch_angle, width, length})
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
			hue = (@dna.leaf_color_hue_avg + (@random() - 0.5) * @dna.leaf_color_hue_range) %% 360
			saturation = Math.min(100, Math.max(0, @dna.leaf_color_saturation_avg + (@random() - 0.5) * @dna.leaf_color_saturation_range))
			lightness = Math.min(100, Math.max(0, @dna.leaf_color_lightness_avg + (@random() - 0.5) * @dna.leaf_color_lightness_range))
			ctx.fillStyle = "hsl(#{hue}, #{saturation}%, #{lightness}%)"
			ctx.fill()
			ctx.restore()
		ctx.restore()
		return
