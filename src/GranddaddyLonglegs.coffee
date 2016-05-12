
class @GranddaddyLonglegs extends Entity
	add_Entity_class(@)
	constructor: ->
		super
		@structure.addPoint("body")
		# @feet = []
		@foot_point_names = []
		for leg_pair_n in [1..4]
			for side in ["left", "right"]
				previous = "body"
				for segment in ["upper", "middle", "lower"]
					foot_name = if segment is "lower"
						"#{side} foot #{leg_pair_n}"
					previous = @structure.addSegment(
						from: previous
						to: foot_name
						name: "#{segment} #{side} leg #{leg_pair_n}"
						length: 50
						# NOTE: opiliones (harvestmen) (granddaddy longlegses) (granddaddies-longlegs?))
						# often have vastly more spindly legs
						width: switch segment
							when "upper" then 4
							when "middle" then 3
							when "lower" then 2
					)
					if foot_name?
						# @feet.push(@structure.points[foot_name])
						@foot_point_names.push(foot_name)
		
		@step_index = 0
		@step_timer = 0
		# @next_foot_positions = ({x: 0, y: 0} for point_name in @foot_point_names)
		@next_foot_positions = {}
		for point_name in @foot_point_names
			@next_foot_positions[point_name] = {x: 0, y: 0}
	
	step: (world, terrain)->
		collision = (point)=>
			# terrain.structure.pointInPolygon(terrain.fromWorld(@toWorld(point)))
			terrain.structure.pointInPolygon(@toWorld(point))
		# for point_name, point of @structure.points
		# 	point.y += (random() - 1/2) * 30
		# 	point.x += (random() - 1/2) * 30
		if ++@step_timer >= 10
			@step_timer = 0
			@step_index += 1
			# current_foot_pos = @feet[@step_index %% @feet.length]
			current_foot_name = @foot_point_names[@step_index %% @foot_point_names.length]
			current_foot_pos = @structure.points[current_foot_name]
			# console.log @feet, @step_index, current_foot_pos
			# console.log @foot_point_names, @step_index, current_foot_name, current_foot_pos
			next_foot_pos = {x: current_foot_pos.x, y: current_foot_pos.y}
			next_foot_pos.x += 50
			next_foot_pos.y -= 50
			for [0..50]
				next_foot_pos.y += 5
				# console.log collision(next_foot_pos)
				# window.collision = collision
				if collision(next_foot_pos)
					next_foot_pos.y -= 5
					break
			# current_foot_pos.x = next_foot_pos.x
			# current_foot_pos.y = next_foot_pos.y
			@next_foot_positions[current_foot_name] = next_foot_pos
		# console.log @next_foot_positions
		for foot_name in @foot_point_names
			foot_point = @structure.points[foot_name]
			next_foot_pos = @next_foot_positions[foot_name]
			# console.log foot_name, next_foot_pos
			foot_point.x += (next_foot_pos.x - foot_point.x) / 5
			foot_point.y += (next_foot_pos.y - foot_point.y) / 5
		@structure.points["body"].x += 2
		@structure.points["body"].y -= 2
		@structure.stepLayout() for [0..100]
	
	draw: (ctx)->
		for segment_name, segment of @structure.segments
			ctx.beginPath()
			ctx.moveTo(segment.a.x, segment.a.y)
			ctx.lineTo(segment.b.x, segment.b.y)
			ctx.lineWidth = segment.width
			ctx.lineCap = "round"
			ctx.strokeStyle = "#2c1c0a" #"brown"
			ctx.stroke()
		ctx.beginPath()
		ctx.translate(@structure.points.body.x, @structure.points.body.y)
		ctx.scale(1, 0.7)
		ctx.arc(0, 0, 10, 0, TAU)
		ctx.fillStyle = "#2c1c0a" #"#C15723" #"brown"
		ctx.fill()
