
class @View
	constructor: ->
		@center_x = 0
		@center_y = 0
		@scale = 1
		# @zoom = 0
		@center_x_to = 0
		@center_y_to = 0
		# @zoom_to = 0
		@scale_to = 1
		@width = 1
		@height = 1
		@follow_smoothness = 7
		@zoom_smoothness = 7
		# Object.defineProperty @, "scale",
		# 	# get: => Math.log2(@zoom)
		# 	# set: (value)=> @zoom = Math.pow(2, value)
		# 	get: => Math.pow(2, @zoom)
		# 	set: (value)=> @zoom = Math.log2(value)
		# Object.defineProperty @, "zoom",
		# 	# get: => Math.log2(@scale)
		# 	# set: (value)=> @scale = Math.exp(2, value)
		# 	get: => Math.pow(@scale, 2)
		# 	set: (value)=> @scale = Math.log2(value)
		# 	# set: (value)=> @scale = Math.pow(value, 1/2)
	
	step: ->
		console.log @zoom, @zoom_to, @scale, @scale_to
		# zooming and following transitions don't work correctly together
		# (because of how I've set up the translation and scaling)
		# @center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness)
		# @center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness)
		# this actually helps, but doesn't get us all the way:
		# @center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness) * (@scale_to / @scale)
		# @center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness) * (@scale_to / @scale)
		# this makes it considerably worse:
		# @center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness) / @scale
		# @center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness) / @scale
		# this doesn't work and causes horrible alternation when zoomed in:
		# @center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness) * @scale_to
		# @center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness) * @scale_to
		# nope:
		# @center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness * (@scale_to / @scale))
		# @center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness * (@scale_to / @scale))
		# perfect:
		# @center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness / (@scale_to / @scale))
		# @center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness / (@scale_to / @scale))
		# see, kids? that's called "math"
		@center_x += (@center_x_to - @center_x) / (1 + @follow_smoothness / @scale_to * @scale)
		@center_y += (@center_y_to - @center_y) / (1 + @follow_smoothness / @scale_to * @scale)
		
		# @zoom += (@zoom_to - @zoom) / (1 + @zoom_smoothness)
		@scale += (@scale_to - @scale) / (1 + @zoom_smoothness)
	
	testRect: (x, y, width, height, padding=0)->
		@center_x - @width / 2 / @scale - padding <= x <= @center_x + @width / 2 / @scale + padding and
		@center_y - @height / 2 / @scale - padding <= y <= @center_y + @height / 2 / @scale + padding
	
	toWorld: (point)->
		# x: (point.x + @center_x - @width / 2) / @scale
		# y: (point.y + @center_y - @height / 2) / @scale
		x: (point.x - @width / 2) / @scale + @center_x
		y: (point.y - @height / 2) / @scale + @center_y
	
	fromWorld: (point)->
		# x: point.x * @scale + @center_x + @width / 2
		# y: point.y * @scale + @center_y + @height / 2
		x: (point.x - @center_x) * @scale + @width / 2
		y: (point.y - @center_y) * @scale + @height / 2
