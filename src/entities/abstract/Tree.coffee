
class @Tree extends Entity
	constructor: ->
		super
		@leaf_point_names = []
		@structure.addPoint("base")
		@bbox_padding = 60
	
	branch: ({from, to, juice, angle})->
		name = to
		length = sqrt(juice * 1000) * (random() + 1)
		width = sqrt(juice * 20) + 1
		@structure.addSegment({from, name, length, width, color: "#926B2E"})
		@structure.points[name].x = @structure.points[from].x + sin(angle) * length
		@structure.points[name].y = @structure.points[from].y + cos(angle) * length
		if --juice > 0
			# @branch({from: name, to: "#{to}-1", juice, angle: angle + (random() - 1/2) * TAU/4})
			# @branch({from: name, to: "#{to}-2", juice, angle: angle + (random() - 1/2) * TAU/4})
			@branch({from: name, to: "#{to}-a", juice, angle: angle + random() * TAU/8})
			@branch({from: name, to: "#{to}-b", juice, angle: angle - random() * TAU/8})
			if random() < 0.2
				@branch({from: name, to: "#{to}-c", juice, angle})
		else
			leaf_point = @structure.points[name]
			leaf = @leaf(leaf_point)
			@leaf_point_names.push(name) if leaf?
	
	leaf: (leaf)->
		leaf.radius = random() * 15 + 15
		leaf.scale_x = 2
		leaf.scale_y = 1
		leaf.color = "#627318" #"#363D1B"
		leaf
	
	draw: (ctx)->
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = segment.color
			ctx.stroke()
		
		for leaf_point_name in @leaf_point_names
			leaf = @structure.points[leaf_point_name]
			ctx.beginPath()
			ctx.arc(leaf.x, leaf.y, leaf.radius, 0, TAU)
			# ctx.save()
			# ctx.beginPath()
			# ctx.translate(leaf.x, leaf.y)
			# ctx.scale(leaf.scale_x, leaf.scale_y)
			# ctx.arc(0, 0, leaf.radius, 0, TAU)
			# ctx.fillStyle = leaf.color
			# ctx.fill()
			# ctx.restore()
