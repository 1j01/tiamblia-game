
class @Mouse
	constructor: (canvas)->
		@x = -Infinity
		@y = -Infinity
		@LMB = {down: no, pressed: no, released: no}
		@MMB = {down: no, pressed: no, released: no}
		@RMB = {down: no, pressed: no, released: no}
		@double_clicked = no
		
		addEventListener "mousemove", (e)=>
			mouse.x = e.clientX
			mouse.y = e.clientY
		
		canvas.addEventListener "mousedown", (e)=>
			MB = mouse["#{"LMR"[e.button]}MB"]
			MB.down = true
			MB.pressed = true
		
		addEventListener "mouseup", (e)=>
			MB = mouse["#{"LMR"[e.button]}MB"]
			MB.down = false
			MB.released = true
		
		canvas.addEventListener "dblclick", (e)=>
			MB = mouse["#{"LMR"[e.button]}MB"]
			MB.pressed = true
			mouse.double_clicked = true
	
	endStep: ->
		mouse.LMB.pressed = false
		mouse.MMB.pressed = false
		mouse.RMB.pressed = false
		mouse.LMB.released = false
		mouse.MMB.released = false
		mouse.RMB.released = false
		mouse.double_clicked = false
