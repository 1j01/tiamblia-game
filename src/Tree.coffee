
class @Tree extends Entity
	add_Entity_class(@)
	constructor: ->
		super
		@structure.addPoint("base")
		@branch(from: "base", to: "1", juice: 5)
	
	branch: ({from, to, juice})->
		name = to#if isNaN(from) then 1 else from + 1
		@structure.addSegment({
			from, name
			length: 50
			width: sqrt(juice * 10) + 1
		})
		@structure.points[name].x = @structure.points[from].x + (random() - 1/2) * 30
		@structure.points[name].y = @structure.points[from].y - 20 - random() * sqrt(juice * 10)
		if --juice > 0
			@branch({from: name, to: "#{to}-a", juice})
			@branch({from: name, to: "#{to}-b", juice})
	
	draw: (ctx)->
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = "brown"
			ctx.stroke()