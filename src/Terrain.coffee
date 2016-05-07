
class @Terrain extends Entity
	constructor: ->
		@structure = new PolygonStructure
	
	generate: ->
		width = 5000
		left = -2500
		right = left + width
		max_height = 200
		bottom = 300
		res = 50
		@structure.addVertex(right, bottom, "lower-right")
		@structure.addVertex(left, bottom, "lower-left")
		for x in [left..right] by res
			@structure.addVertex(x, bottom - Math.random() * max_height)
	
	draw: (ctx)->
		ctx.beginPath()
		# ctx.moveTo()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "green"
		ctx.fill()
