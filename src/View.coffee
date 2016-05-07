
class @View
	constructor: ->
		@center_x = 0
		@center_y = 0
		@scale = 1
		@center_x_to = 0
		@center_y_to = 0
		@scale_to = 1
		@width = 1
		@height = 1
		@follow_smoothness = 4
		@zoom_smoothness = 4
	
	step: ->
		@center_x += (@center_x_to - @center_x) / @follow_smoothness
		@center_y += (@center_y_to - @center_y) / @follow_smoothness
		@scale += (@scale_to - @scale) / @zoom_smoothness
	
	worldToViewX: (x)->
	worldToViewY: (y)->
	viewToWorldX: (x)->
	viewToWorldY: (y)->
