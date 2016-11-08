
class @Arrow extends Entity
	addEntityClass(@)
	constructor: ->
		super
		@structure.addPoint("tip")
		@structure.addSegment(
			from: "tip"
			to: "nock"
			name: "shaft"
			length: 20
		)
		for point_name, point of @structure.points
			point.vx = 0
			point.vy = 0
			point.x += Math.random() * 5
			point.y += Math.random() * 5
		
		@bbox_padding = 20
	
	step: (world)->
		collision = (point)=> world.collision(@toWorld(point))
		@structure.stepLayout({gravity: 0.1, collision})
		@structure.stepLayout() for [0..10]
		@structure.stepLayout({collision}) for [0..4]
	
	draw: (ctx)->
		{tip, nock} = @structure.points
		ctx.beginPath()
		ctx.moveTo(tip.x, tip.y)
		ctx.lineTo(nock.x, nock.y)
		ctx.lineWidth = 1
		ctx.lineCap = "round"
		ctx.strokeStyle = "#74552B"
		ctx.stroke()
		angle = atan2(tip.y - nock.y, tip.x - nock.x) + TAU/4
		
		ctx.save()
		ctx.translate(tip.x, tip.y)
		ctx.rotate(angle)
		ctx.beginPath()
		ctx.moveTo(0, -2)
		ctx.lineTo(-2, 2)
		ctx.lineTo(0, 1)
		ctx.lineTo(+2, 2)
		ctx.fillStyle = "#2D1813"
		ctx.fill()
		ctx.restore()
		
		ctx.save()
		ctx.translate(nock.x, nock.y)
		ctx.rotate(angle)
		ctx.beginPath()
		ctx.translate(0, -4)
		ctx.moveTo(0, 0)
		ctx.lineTo(-2, 2)
		ctx.lineTo(-2, 4)
		ctx.lineTo(0, 3)
		ctx.lineTo(+2, 4)
		ctx.lineTo(+2, 2)
		ctx.fillStyle = "#B1280A"
		ctx.fill()
		ctx.restore()
