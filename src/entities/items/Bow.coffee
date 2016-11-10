
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
		# bow_angle = atan2(top.y - bottom.y, top.x - bottom.x) - TAU/4
		bow_angle = atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
		# top.x = grip.x + @fistmele * sin(bow_angle) + @height/2 * cos(bow_angle)
		# top.y = grip.y + @fistmele * cos(bow_angle) + @height/2 * sin(bow_angle)
		# bottom.x = grip.x + @fistmele * sin(bow_angle) - @height/2 * cos(bow_angle)
		# bottom.y = grip.y + @fistmele * cos(bow_angle) - @height/2 * sin(bow_angle)
		# top.x = grip.x + @height/2 * cos(bow_angle)
		# top.y = grip.y + @height/2 * sin(bow_angle)
		# bottom.x = grip.x - @height/2 * cos(bow_angle)
		# bottom.y = grip.y - @height/2 * sin(bow_angle)
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
		# ctx.translate(center_x, center_y)
		# ctx.translate(serving.x, serving.y)
		ctx.translate(grip.x, grip.y)
		# ctx.rotate(bow_angle + TAU/4)
		ctx.rotate(bow_angle)
		arc_r = @fistmele
		# ctx.scale(@height/2/arc_r, 1)
		# ctx.arc(0, -arc_r, arc_r, 0, TAU/2)
		
		# kappa = .5522848
		# ox = (w / 2) * kappa # control point offset horizontal
		# oy = (h / 2) * kappa # control point offset vertical
		# # xe = x + w,          # x-end
		# # ye = y + h,          # y-end
		# # xm = x + w / 2,      # x-middle
		# # ym = y + h / 2;      # y-middle
		# xe = top.x
		# ye = top.y
		# 
		# 
		# ctx.beginPath()
		# ctx.moveTo(x, ym)
		# ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
		# ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
		# ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
		# ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
		# ctx.stroke()
		# ctx.lineWidth = 0.5
		# ctx.strokeStyle = "#AB7939"
		# ctx.stroke()
		ctx.beginPath()
		ctx.save()
		ctx.translate(0, -arc_r)
		
		ctx.save()
		ctx.scale(@height/2/arc_r+0.1, 1)
		ctx.arc(0, -0.5, arc_r, 0, TAU/2)
		ctx.restore()
		
		ctx.save()
		ctx.scale(@height/2/arc_r, 0.7)
		# ctx.arc(0, -arc_r, arc_r, 0, TAU/2, yes)
		# ctx.arc(0, -arc_r, arc_r, 0, TAU/2)
		ctx.arc(0, 0, arc_r-0.1, TAU/2, 0, yes)
		ctx.restore()
		
		ctx.closePath()
		
		ctx.fillStyle = "#AB7939"
		ctx.fill()
		# ctx.strokeStyle = "#AB7939"
		# ctx.stroke()
		
		ctx.restore()
		ctx.restore()
