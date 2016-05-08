
class @GranddaddyLonglegs extends Entity
	add_Entity_class(@)
	constructor: ->
		super
		@structure.addPoint("body")
		for leg_pair_n in [1..4]
			for side in ["left", "right"]
				previous = "body"
				for segment in ["upper", "middle", "lower"]
					previous = @structure.addSegment(
						from: previous
						name: "#{segment} #{side} leg #{leg_pair_n}"
						length: 50
						# NOTE: opiliones (harvestmen) (granddaddy longlegses) (granddaddies-longlegs?))
						# often have vastly more spindly legs
						width: switch segment
							when "upper" then 4
							when "middle" then 3
							when "lower" then 2
					)
	
	draw: (ctx)->
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = "#2c1c0a" #"brown"
			ctx.stroke()
		ctx.beginPath()
		ctx.translate(@structure.points.body.x, @structure.points.body.y)
		ctx.scale(1, 0.7)
		ctx.arc(0, 0, 10, 0, TAU)
		ctx.fillStyle = "#2c1c0a" #"#C15723" #"brown"
		ctx.fill()
