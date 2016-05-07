
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
	
	step: ->
		# @structure.stepLayout()
	
	debugDraw: (ctx)->
		for point_name, point of @structure.points
			ctx.beginPath()
			ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
			ctx.fillStyle = "red"
			ctx.fill()
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.strokeStyle = "#fa0"
			ctx.stroke()
	
	draw: (ctx)->
		# ctx.save()
		# ctx.translate(@x, @y)
		@debugDraw(ctx)
		# ctx.restore()
