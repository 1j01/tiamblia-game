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
			@leaf(leaf_point)
		return
	
	leaf: (leaf)->
		leaf.is_leaf = true
		return leaf
	
	draw: (ctx)->
		@random_index = 0
		
		for segment_name, segment of @structure.segments
			prev_segment = null
			break for prev_segment_name, prev_segment of @structure.segments when prev_segment.b is segment.a
			next_segment = null
			break for next_segment_name, next_segment of @structure.segments when next_segment.a is segment.b
			from_angle = Math.atan2(prev_segment.b.y-prev_segment.a.y, prev_segment.b.x-prev_segment.a.x)
			to_angle = Math.atan2(next_segment.b.y-next_segment.a.y, next_segment.b.x-next_segment.a.x)
			angle = Math.atan2(segment.b.y-segment.a.y, segment.b.x-segment.a.x)

			if isNaN(from_angle)
				from_angle = angle
			if isNaN(to_angle)
				to_angle = angle

			# Draw bezier
			cp_inset = 0.2 * segment.length
			cp1 = {x: segment.a.x + Math.cos(from_angle) * cp_inset, y: segment.a.y + Math.sin(from_angle) * cp_inset}
			cp2 = {x: segment.b.x + Math.cos(to_angle) * cp_inset, y: segment.b.y + Math.sin(to_angle) * cp_inset}
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			# ctx.strokeStyle = segment.color
			ctx.strokeStyle = "hsl(#{~~(@random()*360)}, 50%, 50%)"
			ctx.stroke()

			continue

			# ctx.beginPath()
			# ctx.moveTo(segment.a.x, segment.a.y)
			# ctx.lineTo(segment.b.x, segment.b.y)
			# ctx.lineWidth = segment.width
			# ctx.lineCap = "round"
			# ctx.strokeStyle = segment.color
			# ctx.stroke()
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
				# lengthen = Math.sin(performance.now()/1000+i)*segment.width/2
				ctx.translate(Math.cos(angle)*o, Math.sin(angle)*o)
				ctx.beginPath()
				# ctx.moveTo(segment.a.x, segment.a.y)
				# ctx.lineTo(segment.b.x, segment.b.y)
				ctx.moveTo(segment.a.x - dir.x*lengthen, segment.a.y - dir.y*lengthen)
				# ctx.lineTo(segment.b.x + dir.x*lengthen, segment.b.y + dir.y*lengthen)
				ctx.bezierCurveTo(
					segment.a.x + perp.x*bulge*i, segment.a.y + perp.y*bulge*i,
					segment.b.x + perp.x*bulge*i, segment.b.y + perp.y*bulge*i,
					segment.b.x + dir.x*lengthen, segment.b.y + dir.y*lengthen
				)
				ctx.stroke()
				ctx.restore()
		
		for point_name, leaf of @structure.points when leaf.is_leaf
			@drawLeaf(ctx,leaf.x,leaf.y)
		return

	drawLeaf: (ctx,x,y)->
		# ctx.beginPath()
		# ctx.arc(x,y,2,0,TAU,true)
		# ctx.fillStyle = "pink"
		# ctx.fill()
