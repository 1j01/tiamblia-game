GrassyTerrain = require("../abstract/GrassyTerrain.coffee")
{addEntityClass} = require("skele2d")

module.exports = class LushGrass extends GrassyTerrain
	addEntityClass(@)
	constructor: ->
		super()
		@color = "#4d8e2c"
		@color_dark = "#46a517"
		@color_light = "#7fcc37"
