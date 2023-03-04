Terrain = require("../abstract/Terrain.coffee")
{addEntityClass} = require("skele2d")

module.exports = class Water extends Terrain
	addEntityClass(@)
	constructor: ->
		super()
		@bbox_padding = 30
		@solid = false
	
	draw: (ctx, view)->
		ctx.beginPath()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "hsla(200, 100%, 50%, 0.5)"
		ctx.fill()
