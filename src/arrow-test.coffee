
ArcheryTarget = require "./entities/items/ArcheryTarget.coffee"
Arrow = require "./entities/items/Arrow.coffee"


# Note: It helps to disable gravity for this test for symmetry,
# and to disable some conditions on lodging and enable visualization of the lodging constraints.

off_angle = 0
module.exports = window.enable_arrow_test_scene = ->
	addEventListener "mousemove", (e) ->
		off_angle = Math.atan2(e.clientY - innerHeight / 2, e.clientX - innerWidth / 2)

	addEventListener "mousedown", (e) ->
		if e.button is 1 # middle click
			window.create_arrow_test_scene()
	
	window.create_arrow_test_scene()
	# setTimeout window.create_arrow_test_scene, 1000

module.exports = window.create_arrow_test_scene = ->

	world = window.the_world

	world.entities.length = []
	
	arrows = []
	for target_angle in [-Math.PI..Math.PI] by Math.PI / 8
		target = new ArcheryTarget()
		target.x = 200 * Math.cos(target_angle)
		target.y = 200 * Math.sin(target_angle)
		target.structure.points.a.x = -100 * Math.cos(target_angle)
		target.structure.points.a.y = -100 * Math.sin(target_angle)
		target.structure.points.b.x = 100 * Math.cos(target_angle)
		target.structure.points.b.y = 100 * Math.sin(target_angle)
		world.entities.push(target)
		
		# Create arrows shooting at the target from various angles
		for arrow_angle in [-Math.PI..Math.PI] by Math.PI / 16
			arrow = new Arrow()
			arrow.x = target.x - 50 * Math.cos(arrow_angle)
			arrow.y = target.y - 50 * Math.sin(arrow_angle)
			arrow.structure.points.nock.x = -10 * Math.cos(arrow_angle + off_angle)
			arrow.structure.points.nock.y = -10 * Math.sin(arrow_angle + off_angle)
			arrow.structure.points.tip.x = 10 * Math.cos(arrow_angle + off_angle)
			arrow.structure.points.tip.y = 10 * Math.sin(arrow_angle + off_angle)
			arrow.setVelocity(
				5 * Math.cos(arrow_angle)
				5 * Math.sin(arrow_angle)
			)
			arrows.push(arrow)
	
	world.entities.push(arrows...)
		

window.create_arrow_volley = ({x = 0, y = 0, angle_min = -Math.PI*3/4, angle_max = -Math.PI/4, speed_min = 5, speed_max = 20, count = 100}={}) ->
	world = window.the_world
	arrows = []
	for i in [0...count]
		arrow = new Arrow()
		arrow.x = x
		arrow.y = y
		arrow_angle = Math.random() * (angle_max - angle_min) + angle_min
		arrow_speed = Math.random() * (speed_max - speed_min) + speed_min
		arrow.structure.points.nock.x = -10 * Math.cos(arrow_angle)
		arrow.structure.points.nock.y = -10 * Math.sin(arrow_angle)
		arrow.structure.points.tip.x = 10 * Math.cos(arrow_angle)
		arrow.structure.points.tip.y = 10 * Math.sin(arrow_angle)
		arrow.setVelocity(
			arrow_speed * Math.cos(arrow_angle)
			arrow_speed * Math.sin(arrow_angle)
		)
		arrows.push(arrow)
	world.entities.push(arrows...)
