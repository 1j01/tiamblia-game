Terrain = require("../abstract/Terrain.coffee")
{addEntityClass} = require("skele2d")
{distanceToLineSegment} = require("skele2d").helpers

closestPointOnLineSegment = (point, a, b)->
	# https://stackoverflow.com/a/3122532/2624876
	a_to_p = {x: point.x - a.x, y: point.y - a.y}
	a_to_b = {x: b.x - a.x, y: b.y - a.y}
	atb2 = a_to_b.x**2 + a_to_b.y**2
	atp_dot_atb = a_to_p.x*a_to_b.x + a_to_p.y*a_to_b.y
	t = atp_dot_atb / atb2
	return {x: a.x + a_to_b.x*t, y: a.y + a_to_b.y*t}

module.exports = class Water extends Terrain
	addEntityClass(@)
	constructor: ->
		super()
		@bbox_padding = 30
		@solid = false
		@waves_y = [] # indexed by x starting from @min_x
		@waves_vy = [] # indexed by x starting from @min_x
		@min_x = Infinity
		@max_x = -Infinity
		@min_y = Infinity
		@max_y = -Infinity
		@structure.onchange = =>
			@waves_y = []
			@waves_vy
			@min_x = Infinity
			@max_x = -Infinity
			@min_y = Infinity
			@max_y = -Infinity
			for point_name, point of @structure.points
				@min_x = Math.min(@min_x, point.x)
				@max_x = Math.max(@max_x, point.x)
				@min_y = Math.min(@min_y, point.y)
				@max_y = Math.max(@max_y, point.y)
			@min_x = Math.floor(@min_x)
			@max_x = Math.ceil(@max_x)
			@min_y = Math.floor(@min_y)
			@max_y = Math.ceil(@max_y)

			for x in [@min_x...@max_x]
				@waves_y[x - @min_x] = 0
				@waves_vy[x - @min_x] = 0
			
			# detect polygon vertex order
			double_area = 0
			for segment_name, segment of @structure.segments
				double_area += (segment.b.x - segment.a.x) * (segment.b.y + segment.a.y)
			@ccw = double_area > 0
		@bubbles = []
	
	toJSON: ->
		def = {}
		def[k] = v for k, v of super() when k not in ["ccw", "min_x", "max_x", "min_y", "max_y"]
		def

	makeWaves: (world_pos, radius=5, velocity_y=5)->
		local_pos = @fromWorld(world_pos)
		for x in [Math.round(local_pos.x - radius)...Math.round(local_pos.x + radius)]
			@waves_vy[x - @min_x] = velocity_y * (1 - Math.abs(x - local_pos.x) / radius)
		for [0..Math.min(20, radius*Math.abs(velocity_y))]
			angle = Math.random() * Math.PI * 2
			@bubbles.push({
				x: local_pos.x + Math.cos(angle) * radius
				# y: local_pos.y + Math.sin(angle) * radius
				y: (@waves_vy[Math.round(local_pos.x) - @min_x] ? 0) + @min_y
				vx: Math.cos(angle) * (1 * Math.random())
				vy: Math.sin(angle) * (1 * Math.random()) + Math.min(10, Math.abs(velocity_y/3))
				radius: Math.random() * 2 #(2 + Math.min(2, Math.abs(velocity_y/3)))
				life: Math.random() * 100 + 10
			})
		return

	step: ->
		neighboring = []
		for x in [@min_x...@max_x]
			neighboring[x - @min_x] = (@waves_y[x - @min_x - 1] ? 0) + (@waves_y[x - @min_x + 1] ? 0)
		for x in [@min_x...@max_x]
			@waves_vy[x - @min_x] += (neighboring[x - @min_x] - @waves_y[x - @min_x] * 2) * 0.4
			@waves_vy[x - @min_x] *= 0.99
			@waves_vy[x - @min_x] -= @waves_y[x - @min_x] * 0.2
			@waves_y[x - @min_x] += @waves_vy[x - @min_x]
		
		for bubble in @bubbles by -1
			bubble.life -= 1
			bubble.x += bubble.vx
			bubble.y += bubble.vy
			waves_x = Math.round(bubble.x) - @min_x
			if @waves_y[waves_x]?
				# bubble.vy -= ./1 * Math.sign(bubble.y - (@waves_y[waves_x] + @min_y))
				# bubble.y = @waves_y[waves_x] + @min_y
				# bubble.y += (@waves_y[waves_x] + @min_y - bubble.y) * 0.1
				bubble.vy += (@waves_vy[waves_x] ? 0) * 0.1
				bubble.vy -= 0.3
				bubble.vy += (Math.max(bubble.y, @waves_y[waves_x] + @min_y) - bubble.y) * 0.4
				bubble.y = Math.max(bubble.y, @waves_y[waves_x] + @min_y)
				# Note: the below code to constrain the bubble to the polygon
				# ALSO constrains y similarly to the above line.
				# If I want to allow the bubbles to go above the waves,
				# I could probably tweak the below constraint to just not constrain y
				# when the bubble is above the polygon.
			else
				bubble.life -= 2
				bubble.vx *= 0.5
				bubble.vy *= 0.5
			
			# constrain to polygon, taking into account dynamic waves
			if not @structure.pointInPolygon(bubble)
				if not @structure.pointInPolygon({x: bubble.x, y: bubble.y + (@waves_y[waves_x] ? 0)})
					closest_distance = Infinity
					closest_segment = null
					for segment_name, segment of @structure.segments
						dist = distanceToLineSegment(bubble, segment.a, segment.b)
						if dist < closest_distance
							closest_distance = dist
							closest_segment = segment
					if closest_segment
						closest_point = closestPointOnLineSegment(bubble, closest_segment.a, closest_segment.b)
						bubble.x = closest_point.x
						if bubble.y < @min_y
							closest_point.y += (@waves_y[waves_x] ? 0)
							closest_point.y = Math.max(closest_point.y, bubble.y)
						bubble.y = closest_point.y

			# pop bubble (unfortunately, this doesn't use pop())
			# (haha it could if I sorted the bubbles by life)
			# (but that would obviously be worthless, and only confuse the code)
			if bubble.life <= 0
				@bubbles.splice(@bubbles.indexOf(bubble), 1)
		return

	draw: (ctx, view)->
		wave_center_y = @min_y
		ctx.save()
		ctx.beginPath()
		for x in [@min_x...@max_x]
			ctx.lineTo(x, @waves_y[x - @min_x] + wave_center_y)
		ctx.lineTo(@max_x, @max_y)
		ctx.lineTo(@min_x, @max_y)
		ctx.closePath()
		# ctx.strokeStyle = if @ccw? then (if @ccw then "lime" else "yellow") else "red"
		# ctx.stroke()
		ctx.clip()

		ctx.beginPath()
		for point_name, point of @structure.points
			if point.y < wave_center_y + 2
				if (point.x > (@min_x + @max_x) / 2) == @ccw
					ctx.lineTo(point.x, point.y)
					ctx.lineTo(point.x, point.y - 50)
				else
					ctx.lineTo(point.x, point.y - 50)
					ctx.lineTo(point.x, point.y)
			else
				ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "hsla(200, 100%, 50%, 0.5)"
		ctx.fill()

		ctx.clip()
		# For debugging, disable ctx.clip() and uncomment this to escape the other clip:
		# ctx.restore()
		# ctx.save()

		# Draw reflections by drawing the canvas upside down on top of itself

		# Undo the entity space transform
		ctx.translate(-@x, -@y)
		# Undo the view transform which looks like this:
		#   ctx.translate(canvas.width / 2, canvas.height / 2)
		#   ctx.scale(view.scale, view.scale)
		#   ctx.translate(-view.center_x, -view.center_y)
		ctx.translate(view.center_x, view.center_y)
		ctx.scale(1 / view.scale, 1 / view.scale)
		ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)
		# We're now in canvas space

		# We need to know the y coordinate of the reflecting line in canvas space
		reflecting_line_y = (@y + wave_center_y - view.center_y) * view.scale + ctx.canvas.height / 2

		# Debug
		# ctx.beginPath()
		# ctx.moveTo(0, reflecting_line_y)
		# ctx.lineTo(ctx.canvas.width, reflecting_line_y)
		# ctx.strokeStyle = "red"
		# ctx.stroke()

		ctx.globalAlpha = 0.2
		ctx.translate(0, reflecting_line_y * 2)
		ctx.scale(1, -1)

		# ctx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height)
		# Optimization: draw only the part of the canvas that's visible
		bbox_min = view.fromWorld({x: @min_x + @x, y: @min_y + @y})
		bbox_max = view.fromWorld({x: @max_x + @x, y: @max_y + @y})
		# Invert the y coordinates over the reflecting line
		bbox_min.y = reflecting_line_y * 2 - bbox_min.y
		bbox_max.y = reflecting_line_y * 2 - bbox_max.y
		ctx.drawImage(ctx.canvas,
			bbox_min.x, bbox_min.y,
			bbox_max.x - bbox_min.x, bbox_max.y - bbox_min.y,
			bbox_min.x, bbox_min.y,
			bbox_max.x - bbox_min.x, bbox_max.y - bbox_min.y)
		
		# Note that the reflections can't draw what's beyond the canvas,
		# which can cause an artifact when the top of the water is near the top of the canvas.
		# This could be fixed by drawing the game world in a larger canvas and then
		# cropping it to the normal viewport size.

		ctx.restore()

		@draw_bubbles(ctx, view)

		return
	
	draw_bubbles: (ctx, view)->
		for bubble in @bubbles
			ctx.save()
			ctx.translate(bubble.x, bubble.y)
			# ctx.translate(bubble.x, wave_center_y + 2)
			ctx.beginPath()
			ctx.arc(0, 0, bubble.radius, 0, Math.PI * 2)
			# ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
			# ctx.lineWidth = 1
			# ctx.stroke()
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
			ctx.fill()
			ctx.restore()
		return

