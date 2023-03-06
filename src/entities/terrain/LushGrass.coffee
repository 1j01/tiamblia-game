GrassyTerrain = require("../abstract/GrassyTerrain.coffee")
{addEntityClass} = require("skele2d")

module.exports = class LushGrass extends GrassyTerrain
	addEntityClass(@)
	constructor: ->
		super()
		@color = "#57c122"
		@color_dark = "#46a517"
		@color_light = "#8eeb4a"
