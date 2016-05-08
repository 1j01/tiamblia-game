
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
		@id = uuid()
		@_class_ = Object.getPrototypeOf(@).constructor.name
	
	step: ->
	draw: (ctx)->
