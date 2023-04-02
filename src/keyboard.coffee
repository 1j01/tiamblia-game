
keys = {}
prev_keys = {}
addEventListener "keydown", (e)-> keys[e.code] = true
addEventListener "keyup", (e)-> delete keys[e.code]

keyboard =
	wasJustPressed: (code)->
		return keys[code]? and not prev_keys[code]?
	isHeld: (code)->
		return keys[code]?
	resetForNextStep: ->
		prev_keys = {}
		prev_keys[k] = v for k, v of keys
		return

module.exports = keyboard
