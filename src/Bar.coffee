
class @Bar
	constructor: (@editor)->
		@element = document.createElement("div")
		@element.className = "bar sidebar"
		document.body.appendChild(@element)
