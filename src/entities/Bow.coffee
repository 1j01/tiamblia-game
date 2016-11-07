
class @Bow extends Entity
	addEntityClass(@)
	constructor: ->
		super
		@structure.addPoint("top")
		@structure.addSegment(
			from: "top"
			to: "bottom"
			name: "bow"
			length: 25
		)
		for point_name, point of @structure.points
			point.vx = 0
			point.vy = 0
			point.x += Math.random() * 5
			point.y += Math.random() * 5
		
		@bbox_padding = 20
		@floating_time = 0
	
	step: (world)->
		@floating_time += 1
		# @structure.points["top"].vy -= 0.2 if Math.sin(@floating_time / 100000) > 0
		collision = (point)=> world.collision(@toWorld(point))
		@structure.stepLayout({gravity: 0.1, collision})
		@structure.stepLayout() for [0..10]
		@structure.stepLayout({collision}) for [0..4]
	
	draw: (ctx)->
		{bow} = @structure.segments
		ctx.beginPath()
		ctx.moveTo(bow.a.x, bow.a.y)
		ctx.lineTo(bow.b.x, bow.b.y)
		ctx.lineWidth = 1
		ctx.lineCap = "round"
		ctx.strokeStyle = "white"
		ctx.stroke()
		ctx.beginPath()
		center_x = (bow.a.x + bow.b.x)/2
		center_y = (bow.a.y + bow.b.y)/2
		bow_length = distance(bow.a, bow.b)
		bow_angle = atan2(bow.a.y - bow.b.y, bow.a.x - bow.b.x) - TAU/4
		ctx.save()
		ctx.translate(center_x, center_y)
		ctx.rotate(bow_angle + TAU/4)
		arc_r = 10
		ctx.scale(bow_length/2/arc_r, 1)
		ctx.arc(0, 0, arc_r, 0, TAU/2)
		ctx.lineWidth = 2
		ctx.strokeStyle = "#AB7939"
		ctx.stroke()
		ctx.restore()
