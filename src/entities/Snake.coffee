Entity = require("./abstract/Entity.coffee")
{addEntityClass} = require("skele2d")
{distanceToLineSegment, closestPointOnLineSegment} = require("skele2d").helpers
PIXI = require "pixi.js-legacy"
TAU = Math.PI * 2


snake_texture = PIXI.Texture.from('assets/snake.png')
snake_texture.rotate = PIXI.groupD8.MIRROR_HORIZONTAL

module.exports = class Snake extends Entity
	addEntityClass(@)
	constructor: ->
		super()
		# relying on key order, so points & segments must not be named with simple numbers,
		# since numeric keys are sorted before other keys
		@structure.addPoint("head")
		previous_part_name = "head"
		for i in [1...20]
			part_name = "part_#{i}"
			previous_part_name = @structure.addSegment(
				from: previous_part_name
				to: part_name
				name: part_name
				length: 50
				width: 40
			)
		
		parts_list = Object.values(@structure.points).filter((part)=> part.name.match(/head|part/))
		for part, part_index in parts_list
			part.radius = 50 #- part_index*0.1
			part.vx = 0
			part.vy = 0
		
		@structure.points.head.radius *= 1.2
		
		@bbox_padding = 150
		return
	
	toJSON: ->
		def = {}
		def[k] = v for k, v of @ when not k.startsWith("$_")
		return def

	initLayout: ->
		for segment_name, segment of @structure.segments
			segment.b.x = segment.a.x + segment.length
		return

	step: (world)->
		parts_list = Object.values(@structure.points).filter((part)=> part.name.match(/head|part/))

		# stop at end of the world
		for part in parts_list
			if part.y + @y > 400
				return
		
		# reset/init
		for part in parts_list
			part.fx = 0
			part.fy = 0

		# move
		collision = (point)=> world.collision(@toWorld(point), types: (entity)=>
			entity.constructor.name not in ["Water", "Snake"]
		)
		t = performance.now()/1000
		for part, part_index in parts_list
			# part.x += part.vx
			# part.y += part.vy
			hit = collision(part)
			if hit
				part.vx = 0
				part.vy = 0
				# Project the part's position back to the surface of the ground.
				# This is done by finding the closest point on the polygon's edges.
				closest_distance = Infinity
				closest_segment = null
				part_world = @toWorld(part)
				part_in_hit_space = hit.fromWorld(part_world)
				for segment_name, segment of hit.structure.segments
					dist = distanceToLineSegment(part_in_hit_space, segment.a, segment.b)
					if dist < closest_distance and Math.hypot(segment.a.x - segment.b.x, segment.a.y - segment.b.y) > 0.1
						closest_distance = dist
						closest_segment = segment
				if closest_segment
					closest_point_in_hit_space = closestPointOnLineSegment(part_in_hit_space, closest_segment.a, closest_segment.b)
					closest_point_world = hit.toWorld(closest_point_in_hit_space)
					closest_point_local = @fromWorld(closest_point_world)
					part.x = closest_point_local.x
					part.y = closest_point_local.y
			else
				part.vy += 0.5
				part.vx *= 0.99
				part.vy *= 0.99
				# @structure.stepLayout({gravity: 0.005, collision})
				# @structure.stepLayout() for [0..10]
				# @structure.stepLayout({collision}) for [0..4]
				part.x += part.vx
				part.y += part.vy
			
			# angular constraint pivoting on this part
			relative_angle = (Math.sin(Math.sin(t)*Math.PI/4) - 0.5) * Math.PI/parts_list.length/2
			part.relative_angle = relative_angle
			prev_part = parts_list[part_index-1]
			next_part = parts_list[part_index+1]
			if prev_part and next_part
				@accumulate_angular_constraint_forces(prev_part, next_part, part, relative_angle)
		
		# apply forces
		for part in parts_list
			part.vx += part.fx
			part.vy += part.fy
			part.x += part.fx
			part.y += part.fy

		# Interact with water
		for part in parts_list
			water = world.collision(@toWorld(part), types: (entity)=>
				entity.constructor.name is "Water"
			)
			too_far_under_water = water and world.collision(@toWorld({x: part.x, y: part.y - part.radius}), types: (entity)=>
				entity.constructor.name is "Water"
			)
			if water and not too_far_under_water
				# Make ripples in water
				water.makeWaves(@toWorld(part), part.radius, part.vy/2)
				# Skip off water (as if this will ever matter)
				if 4 > part.vy > 2 and Math.abs(part.vx) > 0.4
					part.vy *= -0.3
			# Slow down in water, and buoy
			if water
				part.vx -= part.vx * 0.1
				part.vy -= part.vy * 0.1
				part.vy -= 0.45

		# constrain distances
		for i in [0...4]
			for segment_name, segment of @structure.segments
				delta_x = segment.a.x - segment.b.x
				delta_y = segment.a.y - segment.b.y
				delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
				diff = (delta_length - segment.length) / delta_length
				if isFinite(diff)
					segment.a.x -= delta_x * 0.5 * diff
					segment.a.y -= delta_y * 0.5 * diff
					segment.b.x += delta_x * 0.5 * diff
					segment.b.y += delta_y * 0.5 * diff
					segment.a.vx -= delta_x * 0.5 * diff
					segment.a.vy -= delta_y * 0.5 * diff
					segment.b.vx += delta_x * 0.5 * diff
					segment.b.vy += delta_y * 0.5 * diff
				else
					console.warn("diff is not finite, for Snake distance constraint")
			# self-collision
			for part, part_index in parts_list
				for other_part, other_part_index in parts_list #when part_index isnt other_part_index
					if Math.abs(part_index - other_part_index) < 3
						continue
					delta_x = part.x - other_part.x
					delta_y = part.y - other_part.y
					delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
					target_min_length = part.radius + other_part.radius
					if delta_length < target_min_length
						diff = (delta_length - target_min_length) / delta_length
						if isFinite(diff)
							part.x -= delta_x * 0.5 * diff
							part.y -= delta_y * 0.5 * diff
							other_part.x += delta_x * 0.5 * diff
							other_part.y += delta_y * 0.5 * diff
							part.vx -= delta_x * 0.5 * diff
							part.vy -= delta_y * 0.5 * diff
							other_part.vx += delta_x * 0.5 * diff
							other_part.vy += delta_y * 0.5 * diff
						else
							console.warn("diff is not finite, for Snake self-collision constraint")
		
		return
	
	accumulate_angular_constraint_forces: (a, b, pivot, relative_angle)->
		angle_a = Math.atan2(a.y - b.y, a.x - b.x)
		angle_b = Math.atan2(pivot.y - b.y, pivot.x - b.x)
		angle_diff = (angle_a - angle_b) - relative_angle

		# angle_diff *= 0.9
		distance = Math.hypot(a.x - b.x, a.y - b.y)
		# distance_a = Math.hypot(a.x - pivot.x, a.y - pivot.y)
		# distance_b = Math.hypot(b.x - pivot.x, b.y - pivot.y)
		# angle_diff /= Math.max(1, (distance / 5) ** 2.4)

		old_a = {x: a.x, y: a.y}
		old_b = {x: b.x, y: b.y}

		# Rotate around pivot.
		rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]]
		rot_matrix_inverse = [[Math.cos(-angle_diff), Math.sin(-angle_diff)], [-Math.sin(-angle_diff), Math.cos(-angle_diff)]]
		for point in [a, b]
			# Translate and rotate.
			[point.x, point.y] = [point.x, point.y].map((value, index) =>
				(if point is a then rot_matrix else rot_matrix_inverse)[index][0] * (point.x - pivot.x) +
				(if point is a then rot_matrix else rot_matrix_inverse)[index][1] * (point.y - pivot.y)
			)
			# Translate back.
			point.x += pivot.x
			point.y += pivot.y

		f = 0.5
		# using individual distances can cause spinning (overall angular momentum from nothing)
		# f_a = f / Math.max(1, Math.max(0, distance_a - 3) ** 1)
		# f_b = f / Math.max(1, Math.max(0, distance_b - 3) ** 1)
		# using the combined distance conserves overall angular momentum,
		# to say nothing of the physicality of the rest of this system
		# but it's a clear difference in zero gravity
		f_a = f / Math.max(1, Math.max(0, distance - 6) ** 1)
		f_b = f / Math.max(1, Math.max(0, distance - 6) ** 1)

		# Turn difference in position into velocity.
		a.fx += (a.x - old_a.x) * f_a
		a.fy += (a.y - old_a.y) * f_a
		b.fx += (b.x - old_b.x) * f_b
		b.fy += (b.y - old_b.y) * f_b

		# Opposite force on pivot.
		pivot.fx -= (a.x - old_a.x) * f_a
		pivot.fy -= (a.y - old_a.y) * f_a
		pivot.fx -= (b.x - old_b.x) * f_b
		pivot.fy -= (b.y - old_b.y) * f_b

		# Restore old position.
		a.x = old_a.x
		a.y = old_a.y
		b.x = old_b.x
		b.y = old_b.y
		
		return

	destroy: ->
		@$_container?.destroy()
		@$_container = null
		if @$_ticker
			@$_ticker.remove(@$_tick)
			@$_ticker = null
			@$_tick = null
		return

	pixiUpdate: (stage, ticker)->
		if @$_container
			return

		rope_points = []

		for point_name, point of @structure.points
			rope_points.push(new PIXI.Point(point.x, point.y))

		strip = new PIXI.SimpleRope(snake_texture, rope_points)

		@$_container = new PIXI.Container()
		@$_container.x = @x
		@$_container.y = @y

		stage.addChild(@$_container)

		@$_container.addChild(strip)

		@$_ticker = ticker
		@$_ticker.add @$_tick = (delta)=>
			@$_container.x = @x
			@$_container.y = @y
			for part, i in Object.values(@structure.points)
				rope_points[i].x = part.x
				rope_points[i].y = part.y
			
			return
		return
