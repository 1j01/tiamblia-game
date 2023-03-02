
ArcheryTarget = require "./entities/items/ArcheryTarget.coffee"
Arrow = require "./entities/items/Arrow.coffee"


# Note: It helps to disable gravity for this test for symmetry,
# and to disable some conditions on lodging and enable visualization of the lodging constraints.

off_angle = 0
addEventListener "mousemove", (e) ->
	off_angle = Math.atan2(e.clientY - innerHeight / 2, e.clientX - innerWidth / 2)

addEventListener "mousedown", (e) ->
	if e.button is 1 # middle click
		window.create_arrow_test_scene()

module.exports = window.create_arrow_test_scene = ->

	# setTimeout window.create_arrow_test_scene, 1000

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
		
