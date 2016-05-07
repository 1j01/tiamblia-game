
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
	
	step: ->
		# @structure.stepLayout()
	
	draw: (ctx)->
		@debugDraw(ctx)
