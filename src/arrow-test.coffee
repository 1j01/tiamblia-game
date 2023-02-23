
ArcheryTarget = require "./entities/items/ArcheryTarget.coffee"
Arrow = require "./entities/items/Arrow.coffee"


# Note: It helps to disable gravity for this test

module.exports = window.create_arrow_test_scene = ->
	world = window.the_world

	arrows = []
	for target_angle in [-Math.PI..Math.PI] by Math.PI / 8
		target = new ArcheryTarget()
		target.x = 600 * Math.cos(target_angle)
		target.y = 600 * Math.sin(target_angle)
		target.structure.points.a.x = -100 * Math.cos(target_angle)
		target.structure.points.a.y = -100 * Math.sin(target_angle)
		target.structure.points.b.x = 100 * Math.cos(target_angle)
		target.structure.points.b.y = 100 * Math.sin(target_angle)
		world.entities.push(target)
		
		# Create arrows shooting at the target from various angles
		for arrow_angle in [-Math.PI..Math.PI] by Math.PI / 8
			arrow = new Arrow()
			arrow.x = target.x - 100 * Math.cos(arrow_angle)
			arrow.y = target.y - 100 * Math.sin(arrow_angle)
			arrow.structure.points.nock.x = -10 * Math.cos(arrow_angle)
			arrow.structure.points.nock.y = -10 * Math.sin(arrow_angle)
			arrow.structure.points.tip.x = 10 * Math.cos(arrow_angle)
			arrow.structure.points.tip.y = 10 * Math.sin(arrow_angle)
			arrow.structure.points.nock.vx = 5 * Math.cos(arrow_angle)
			arrow.structure.points.nock.vy = 5 * Math.sin(arrow_angle)
			arrow.structure.points.tip.vx = 5 * Math.cos(arrow_angle)
			arrow.structure.points.tip.vy = 5 * Math.sin(arrow_angle)
			arrows.push(arrow)
	
	world.entities.push(arrows...)
		
