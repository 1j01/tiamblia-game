
class @Bow extends Entity
	addEntityClass(@)
	constructor: ->
		super
		
		@height = 25
		@fistmele = 6
		
		@draw_distance = 0
		
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
		@structure.addSegment(
			from: "grip"
			name: "serving"
			length: @fistmele
		)
		for point_name, point of @structure.points
			point.vx = 0
			point.vy = 0
		
		@bbox_padding = 20
		# @floating_time = 0
	
	initLayout: ->
		@structure.points.serving.x -= @fistmele
		@layout()
	
	step: (world)->
		# @floating_time += 1
		# @structure.points["top"].vy -= 0.2 if Math.sin(@floating_time / 100000) > 0
		# collision = (point)=> world.collision(@toWorld(point))
		# @structure.stepLayout({gravity: 0.5, collision})
		# @structure.stepLayout() for [0..10]
		# @structure.stepLayout({collision}) for [0..4]
		@layout()
	
	layout: ->
		{top, bottom, grip, serving} = @structure.points
		
		bow_angle = atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
		top.x = grip.x + @height/2 * cos(bow_angle) - @fistmele * sin(-bow_angle)
		top.y = grip.y + @height/2 * sin(bow_angle) - @fistmele * cos(bow_angle)
		bottom.x = grip.x - @height/2 * cos(bow_angle) - @fistmele * sin(-bow_angle)
		bottom.y = grip.y - @height/2 * sin(bow_angle) - @fistmele * cos(bow_angle)
	
	draw: (ctx)->
		{top, bottom, grip, serving} = @structure.points
		ctx.beginPath()
		ctx.moveTo(top.x, top.y)
		ctx.lineTo(serving.x, serving.y)
		ctx.lineTo(bottom.x, bottom.y)
		ctx.lineWidth = 0.5
		ctx.lineCap = "round"
		ctx.strokeStyle = "white"
		ctx.stroke()
		ctx.beginPath()
		center_x = (top.x + bottom.x)/2
		center_y = (top.y + bottom.y)/2
		bow_angle = atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
		ctx.save()
		ctx.translate(grip.x, grip.y)
		ctx.rotate(bow_angle)
		arc_r = @fistmele
		
		ctx.beginPath()
		ctx.save()
		ctx.translate(0, -arc_r)
		
		ctx.save()
		ctx.scale(@height/2/arc_r+0.1, 1)
		ctx.arc(0, -0.5, arc_r, 0, TAU/2)
		ctx.restore()
		
		ctx.save()
		ctx.scale(@height/2/arc_r, 0.7)
		ctx.arc(0, 0, arc_r-0.1, TAU/2, 0, yes)
		ctx.restore()
		
		ctx.closePath()
		
		ctx.fillStyle = "#AB7939"
		ctx.fill()
		
		ctx.restore()
		ctx.restore()
