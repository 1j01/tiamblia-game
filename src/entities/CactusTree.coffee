Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class CactusTree extends Tree
	addEntityClass(@)
	constructor: ->
		super()

		@bbox_padding = 30

		@trunk_width = 10+Math.floor(Math.random()*5)
		@random_index = 0
		@random_values = []

		@branch(from: "base", to: "1", juice: Math.random()*10+3, width: @trunk_width, length: 15, angle: -TAU/2, splits: 0)

	random: ->
		@random_index++
		return @random_values[@random_index] ?= Math.random()

	branch: ({from, to, juice, angle, width, length, splits})->
		name = to
		# angle+=(Math.random()*2-1)*0.7
		@structure.addSegment({from, name, length, width, color: "green"})
		@structure.points[name].x = @structure.points[from].x + Math.sin(angle) * length
		@structure.points[name].y = @structure.points[from].y + Math.cos(angle) * length
		juice -= 1
		if splits > 0
			width *= 0.97
		else if juice < 3
			width *= 0.9
		else if juice > 5
			# Cacti trunks can actually get thicker going up
			# until it reaches the branching point
			width *= 1.1
		if juice > 0
			dir = {x: Math.cos(angle), y: Math.sin(angle)}
			# TODO: refactor angle calculations
			# so that this uses y; it's unintuitive right now
			dir.x -= 3
			angle = Math.atan2(dir.y, dir.x)
			will_split = Math.random() < 0.5 and splits is 0 and juice > 3
			if will_split
				branch_juice = juice / 3
				branch_width = width * 0.7
				@branch({from: name, to: "#{to}-b", juice: branch_juice, angle: angle + TAU/5, width: branch_width, length, splits: splits + 1})
				@branch({from: name, to: "#{to}-c", juice: branch_juice, angle: angle - TAU/5, width: branch_width, length, splits: splits + 1})
				width *= 0.8
			@branch({from: name, to: "#{to}-a", juice, angle, width, length, splits: splits + will_split})
		else
			leaf_point = @structure.points[name]
			leaf_point.radius = width/2
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
			ctx.strokeStyle = "rgba(255,255,155,0.5)"
			angle = Math.atan2(segment.b.y-segment.a.y, segment.b.x-segment.a.x) + TAU/4
			dir = {x: segment.b.x-segment.a.x, y: segment.b.y-segment.a.y}
			length = Math.hypot(dir.x, dir.y)
			dir.x /= length
			dir.y /= length
			perp = {x: -dir.y, y: dir.x}
			i_to = 0.8
			i_from = -i_to
			lines = 4
			for i in [i_from..i_to] by (i_to-i_from)/lines
				ctx.save()
				o = (segment.width/2 - ctx.lineWidth/2)*i
				lengthen = segment.width/2 * Math.sqrt(1 - i*i) - ctx.lineWidth/2
				bulge = segment.width*0.1
				ctx.translate(Math.cos(angle)*o, Math.sin(angle)*o)
				ctx.beginPath()
				ctx.moveTo(segment.a.x - dir.x*lengthen, segment.a.y - dir.y*lengthen)
				ctx.bezierCurveTo(
					segment.a.x + perp.x*bulge*i, segment.a.y + perp.y*bulge*i,
					segment.b.x + perp.x*bulge*i, segment.b.y + perp.y*bulge*i,
					segment.b.x + dir.x*lengthen, segment.b.y + dir.y*lengthen
				)
				ctx.stroke()
				ctx.restore()
		
		# Spikes
		for segment_name, segment of @structure.segments
			# disable spikes for performance
			# and because they're not quite right
			break
			angle = Math.atan2(segment.b.y-segment.a.y, segment.b.x-segment.a.x) + TAU/4
			dir = {x: segment.b.x-segment.a.x, y: segment.b.y-segment.a.y}
			length = Math.hypot(dir.x, dir.y)
			dir.x /= length
			dir.y /= length
			perp = {x: -dir.y, y: dir.x}
			i_to = 0.8
			i_from = -i_to
			lines = 4
			for i in [i_from..i_to] by (i_to-i_from)/lines
				ctx.lineWidth = segment.width*0.05
				ctx.lineCap = "round"
				ctx.strokeStyle = "rgba(255,255,255)"
				ctx.save()
				o = (segment.width/2 - ctx.lineWidth/2)*i
				shift = segment.width/2 * Math.sqrt(1 - i*i) - ctx.lineWidth/2
				bulge = segment.width*0.1
				ctx.translate(Math.cos(angle)*o, Math.sin(angle)*o)
				j_from = 0
				j_to = 1
				spikes = 5
				for j in [j_from...j_to] by (j_to-j_from)/spikes
					ctx.save()
					ctx.translate(
						segment.a.x + dir.x*shift + (segment.b.x - segment.a.x)*j,
						segment.a.y + dir.y*shift + (segment.b.y - segment.a.y)*j
					)
					ctx.rotate(angle + TAU/10*i)
					ctx.beginPath()
					ctx.moveTo(0,0)
					ctx.lineTo(0,segment.width*0.1)
					ctx.stroke()
					ctx.restore()

				ctx.restore()
		
		for point_name, leaf of @structure.points when leaf.is_leaf
			@drawLeaf(ctx, leaf)
		return

	drawLeaf: (ctx, {x, y, radius=5})->
		# draw flowers
		for [0..2+@random()*3]
			ctx.save()
			ctx.translate(x,y)
			ctx.rotate(@random()*TAU/2+TAU/2)
			ctx.beginPath()
			ctx.translate(@random()*radius, 0)
			ctx.moveTo(0,0)
			ctx.translate(@random()*radius, 0)
			ctx.lineTo(0,0)
			ctx.lineWidth = 0.5
			ctx.strokeStyle = "salmon"
			ctx.stroke()
			ctx.scale(0.5+@random()*0.5,1)
			ctx.beginPath()
			ctx.arc(0,0,2,0,TAU,true)
			ctx.fillStyle = "pink"
			ctx.fill()
			ctx.restore()
