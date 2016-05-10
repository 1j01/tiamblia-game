
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
		@id = uuid()
		@_class_ = Object.getPrototypeOf(@).constructor.name
	
	toWorld: (point)->
		x: point.x + @x
		y: point.y + @y
	
	fromWorld: (point)->
		x: point.x - @x
		y: point.y - @y
	
	step: ->
	draw: (ctx)->
