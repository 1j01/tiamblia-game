
class @Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
	
	# toJSON: ->
	# 	console.trace @structure
	# 	def = {}
	# 	def[k] = v for k, v of @
	# 	def.structure = @structure.toJSON()
	# 	def
	toJSON: ->
		@
	
	fromJSON: (def)->
		# console.log "Entity fromJSON", def, @structure
		@[k] = v for k, v of def when k isnt "structure"
		@structure.fromJSON(def.structure)
	
	step: ->
	draw: (ctx)->
