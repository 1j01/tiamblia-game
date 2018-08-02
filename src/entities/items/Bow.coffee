Entity = require "../abstract/Entity.coffee"
{addEntityClass} = require "skele2d/source/helpers.coffee"
TAU = Math.PI * 2

module.exports = class Bow extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		
		@height = 30
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
	
	initLayout: ->
		@structure.points.serving.x -= @fistmele
		@layout()
	
	step: (world)->
		@layout()
	
	layout: ->
		{top, bottom, grip, serving} = @structure.points
		
		bow_angle = Math.atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
		top.x = grip.x + @height/2 * Math.cos(bow_angle) - @fistmele * Math.sin(-bow_angle)
		top.y = grip.y + @height/2 * Math.sin(bow_angle) - @fistmele * Math.cos(bow_angle)
		bottom.x = grip.x - @height/2 * Math.cos(bow_angle) - @fistmele * Math.sin(-bow_angle)
		bottom.y = grip.y - @height/2 * Math.sin(bow_angle) - @fistmele * Math.cos(bow_angle)
	
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
		bow_angle = Math.atan2(grip.y - serving.y, grip.x - serving.x) - TAU/4
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
