
class @GranddaddyLonglegs extends Entity
	constructor: ->
		super
		@structure.addPoint("body")
		for side in ["left", "right"]
			for n in [1..4]
				previous = "body"
				for segment in ["upper", "middle", "lower"]
					previous = @structure.addSegment(
						from: previous
						name: "#{side} #{segment} leg #{n}"
						length: 50
						width: switch segment
							when "upper" then 6
							when "middle" then 5
							when "lower" then 3
					)
	
	draw: (ctx)->
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = "#6B422C" # "#2c1c0a" #"brown"
			ctx.stroke()
		ctx.beginPath()
		# ctx.arc(@structure.points.body.x, @structure.points.body.y, 10, 0, Math.PI * 2)
		ctx.translate(@structure.points.body.x, @structure.points.body.y)
		ctx.scale(1, 0.7)
		ctx.arc(0, 0, 10, 0, Math.PI * 2)
		# ctx.arc(@structure.points.body.x, @structure.points.body.y - 7, 5, 0, Math.PI * 2)
		ctx.fillStyle = "#6B422C" # "#C15723" #"brown"
		ctx.fill()
