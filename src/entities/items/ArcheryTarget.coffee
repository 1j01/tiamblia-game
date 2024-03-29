Entity = require "../abstract/Entity.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class ArcheryTarget extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		
		@structure.addPoint("a")
		@structure.addSegment(
			from: "a"
			to: "b"
			name: "target"
			length: 100
		)
		@bbox_padding = 20
	
	initLayout: ->
		@structure.points.b.y += 100
		return
	
	draw: (ctx)->
		{a, b} = @structure.points
		angle = Math.atan2(b.y - a.y, b.x - a.x)
		diameter = Math.hypot(b.x - a.x, b.y - a.y)
		radius = diameter / 2
		center = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}
		ctx.save()
		ctx.translate(center.x, center.y)
		ctx.rotate(Math.atan2(b.y - a.y, b.x - a.x))
		ctx.scale(1, 1/3)
		# Draw concentric circles
		colors = ["#fff", "#000", "#0af", "#f00", "#ff0"]
		for color, i in colors
			ctx.beginPath()
			ctx.arc(0, 0, (1 - i / colors.length) * radius, 0, TAU)
			ctx.fillStyle = color
			ctx.fill()
		ctx.restore()
		return
