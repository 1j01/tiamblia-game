
class @Arrow extends Entity
	addEntityClass(@)
	constructor: ->
		super
		
		@length = 20
		
		@structure.addPoint("tip")
		@structure.addSegment(
			from: "tip"
			to: "nock"
			name: "shaft"
			length: @length
		)
		for point_name, point of @structure.points
			point.vx = 0
			point.vy = 0
		
		@bbox_padding = 20
	
	initLayout: ->
		@structure.points.tip.x += @length
	
	step: (world)->
		# TODO: more physical physics, i.e. if dropped completely sideways, maybe end up lying on the ground
		# and when going into the ground, maybe rotate a bit from the momentum
		
		{tip, nock} = @structure.points
		
		tip.vy += 0.1
		# nock.vy += 0.1
		steps = 10
		for [0..steps]
			if world.collision(@toWorld(tip))
				tip.vx = 0
				tip.vy = 0
				nock.vx = 0
				nock.vy = 0
				# nock.vx /= 2
				# nock.vy /= 2
				break
			tip.x += tip.vx / steps
			tip.y += tip.vy / steps
		
		# if tip.vx is 0 and tip.vy is 0
		# nock.x += nock.vx
		# nock.y += nock.vy
		# original_nock_x = nock.x
		# original_nock_y = nock.y
		angle = atan2(tip.y - nock.y, tip.x - nock.x)
		nock.x = tip.x - cos(angle) * @length
		nock.y = tip.y - sin(angle) * @length
		# nock.vx += (nock.x - original_nock_x - nock.vx) / 15
		# nock.vy += (nock.y - original_nock_y - nock.vy) / 15
	
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
