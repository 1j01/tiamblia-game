Tree = require "./abstract/Tree.coffee"
{addEntityClass} = require "skele2d"
TAU = Math.PI * 2

module.exports = class SavannaTreeA extends Tree
	addEntityClass(@)
	constructor: ->
		super()
		@branch(from: "base", to: "1", juice: 5, angle: -TAU/2)
	
	leaf: (leaf)->
		leaf.radius = Math.random() * 15 + 15
		leaf.scale_x = 2
		leaf.scale_y = 1
		leaf.color = "#627318" #"#363D1B"
		leaf.is_leaf = true
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
		
		for point_name, leaf of @structure.points when leaf.is_leaf
			# ctx.beginPath()
			# ctx.arc(leaf.x, leaf.y, leaf.radius, 0, TAU)
			ctx.save()
			ctx.beginPath()
			ctx.translate(leaf.x, leaf.y)
			ctx.scale(leaf.scale_x, leaf.scale_y)
			ctx.arc(0, 0, leaf.radius, 0, TAU)
			ctx.fillStyle = leaf.color
			ctx.fill()
			ctx.restore()
