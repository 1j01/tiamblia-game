
class @Bow extends Entity
	addEntityClass(@)
	constructor: ->
		super
		@structure.addPoint("grip")
		@structure.addSegment(
			from: "grip"
			to: "top"
			name: "upper limb"
			length: 10
		)
		@structure.addSegment(
			from: "grip"
			to: "bottom"
			name: "lower limb"
			length: 10
		)
		@fistmele = 6
		@structure.addSegment(
			from: "grip"
			name: "serving"
			length: @fistmele
		)
		for point_name, point of @structure.points
			point.vx = 0
			point.vy = 0
			point.x += Math.random() * 5
			point.y += Math.random() * 5
		
		@bbox_padding = 20
		# @floating_time = 0
	
	step: (world)->
		# @floating_time += 1
		# @structure.points["top"].vy -= 0.2 if Math.sin(@floating_time / 100000) > 0
		# collision = (point)=> world.collision(@toWorld(point))
		# @structure.stepLayout({gravity: 0.5, collision})
		# @structure.stepLayout() for [0..10]
		# @structure.stepLayout({collision}) for [0..4]
		
		{top, bottom, grip, serving} = @structure.points
		
		# center_x = (top.x + bottom.x)/2
		# center_y = (top.y + bottom.y)/2
		bow_length = distance(top, bottom)
		# bow_angle = atan2(top.y - bottom.y, top.x - bottom.x) - TAU/4
		bow_angle = atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
		top.x = grip.x + @fistmele * sin(bow_angle) + bow_length/2 * cos(bow_angle)
		top.y = grip.y + @fistmele * cos(bow_angle) + bow_length/2 * sin(bow_angle)
		bottom.x = grip.x + @fistmele * sin(bow_angle) - bow_length/2 * cos(bow_angle)
		bottom.y = grip.y + @fistmele * cos(bow_angle) - bow_length/2 * sin(bow_angle)
	
	draw: (ctx)->
		{top, bottom, grip, serving} = @structure.points
		ctx.beginPath()
		ctx.moveTo(top.x, top.y)
		ctx.lineTo(serving.x, serving.y)
		ctx.lineTo(bottom.x, bottom.y)
		ctx.lineWidth = 1
		ctx.lineCap = "round"
		ctx.strokeStyle = "white"
		ctx.stroke()
		ctx.beginPath()
		center_x = (top.x + bottom.x)/2
		center_y = (top.y + bottom.y)/2
		bow_length = distance(top, bottom)
		# bow_angle = atan2(top.y - bottom.y, top.x - bottom.x) - TAU/4
		bow_angle = atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
		ctx.save()
		# ctx.translate(center_x, center_y)
		# ctx.translate(serving.x, serving.y)
		ctx.translate(grip.x, grip.y)
		# ctx.rotate(bow_angle + TAU/4)
		ctx.rotate(bow_angle)
		arc_r = @fistmele
		ctx.scale(bow_length/2/arc_r, 1)
		ctx.arc(0, -arc_r, arc_r, 0, TAU/2)
		ctx.lineWidth = 2
		ctx.strokeStyle = "#AB7939"
		ctx.stroke()
		ctx.restore()
