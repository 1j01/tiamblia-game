
class @Player extends Entity
	constructor: ->
		super
		@structure.addPoint("head")
		@structure.addSegment(
			from: "head"
			name: "neck"
			length: 5
		)
		@structure.addSegment(
			from: "neck"
			name: "upper left arm"
			length: 10
		)
		@structure.addSegment(
			from: "neck"
			name: "upper right arm"
			length: 10
		)
		@structure.addSegment(
			from: "upper left arm"
			name: "lower left arm"
			length: 10
		)
		@structure.addSegment(
			from: "upper right arm"
			name: "lower right arm"
			length: 10
		)
		@structure.addSegment(
			from: "neck"
			name: "hip"
			length: 20
		)
		@structure.addSegment(
			from: "hip"
			name: "upper left leg"
			length: 10
		)
		@structure.addSegment(
			from: "hip"
			name: "upper right leg"
			length: 10
		)
		@structure.addSegment(
			from: "upper left leg"
			name: "lower left leg"
			length: 10
		)
		@structure.addSegment(
			from: "upper right leg"
			name: "lower right leg"
			length: 10
		)
	
	draw: (ctx)->
		{head, neck, hip} = @structure.points
		
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = 3
			ctx.lineCap = "round"
			ctx.strokeStyle = "#6B422C"
			ctx.stroke()
		
		# dress
		ctx.beginPath()
		# ctx.moveTo(neck.x - 5, neck.y)
		# ctx.lineTo(neck.x + 5, neck.y)
		# ctx.lineTo(hip.x + 10, hip.y + 5)
		# ctx.lineTo(hip.x - 10, hip.y + 5)
		ctx.save()
		ctx.translate(neck.x, neck.y)
		ctx.rotate(Math.atan2(hip.y - neck.y, hip.x - neck.x) - Math.PI/2)
		dx = hip.x - neck.x
		dy = hip.y - neck.y
		dist = Math.sqrt(dx * dx + dy * dy)
		ctx.moveTo(-5, 0)
		ctx.lineTo(+5, 0)
		ctx.lineTo(+10, dist + 5)
		ctx.lineTo(-10, dist + 5)
		ctx.restore()
		ctx.closePath()
		# neck
		# hip
		ctx.fillStyle = "#ddffff"
		ctx.fill()
		
		# head
		ctx.save()
		ctx.beginPath()
		ctx.translate(head.x, head.y)
		ctx.scale(0.9, 1)
		ctx.arc(0, 0, 6, 0, Math.PI * 2)
		ctx.fillStyle = "#6B422C" # "#C15723" #"brown"
		ctx.fill()
		ctx.restore()
