
class @GranddaddyLonglegs extends Entity
	addEntityClass(@)
	constructor: ->
		super
		@structure.addPoint("body")
		# @feet = []
		@foot_point_names = []
		@legs = []
		for leg_pair_n in [1..4]
			for side in ["left", "right"]
				leg = {point_names_by_segment_name: {}}
				@legs.push(leg)
				previous = "body"
				for segment_name in ["upper", "middle", "lower"]
					point_name =
						if segment_name is "lower"
							foot_point_name = "#{side} foot #{leg_pair_n}"
						else
							foot_point_name = undefined
							"#{segment_name} #{side} leg #{leg_pair_n}"
					previous = @structure.addSegment(
						from: previous
						to: foot_point_name
						name: "#{segment_name} #{side} leg #{leg_pair_n}"
						length: 50
						# NOTE: opiliones (harvestmen) (granddaddy longlegses) (granddaddies-longlegs?))
						# often have vastly more spindly legs
						width: switch segment_name
							when "upper" then 4
							when "middle" then 3
							when "lower" then 2
					)
					leg.point_names_by_segment_name[segment_name] = point_name
					leg.foot_point_name = foot_point_name
					if foot_point_name?
						# @feet.push(@structure.points[foot_point_name])
						@foot_point_names.push(foot_point_name)
		
		@step_index = 0
		@step_timer = 0
		# @next_foot_positions = ({x: 0, y: 0} for point_name in @foot_point_names)
		@next_foot_positions = {}
		for point_name in @foot_point_names
			@next_foot_positions[point_name] = {x: 0, y: 0}
		
		# for point_name, point of @structure.points
		# 	point.vx = 0
		# 	point.vy = 0
		
		@bbox_padding = 20
	
	step: (world)->
		return if @toWorld(@structure.points[@foot_point_names[0]]).y > 400
		# for point_name, point of @structure.points
		# 	point.y += (random() - 1/2) * 30
		# 	point.x += (random() - 1/2) * 30
		if ++@step_timer >= 10
			@step_timer = 0
			@step_index += 1
			# current_foot_pos = @feet[@step_index %% @feet.length]
			current_foot_point_name = @foot_point_names[@step_index %% @foot_point_names.length]
			current_foot_pos = @structure.points[current_foot_point_name]
			# console.log @feet, @step_index, current_foot_pos
			# console.log @foot_point_names, @step_index, current_foot_point_name, current_foot_pos
			next_foot_pos = {x: current_foot_pos.x, y: current_foot_pos.y}
			next_foot_pos.x += 50
			next_foot_pos.y -= 50
			for [0..50]
				next_foot_pos.y += 5
				# console.log collision(next_foot_pos)
				# window.collision = collision
				if world.collision(@toWorld(next_foot_pos))
					next_foot_pos.y -= 5
					break
			# current_foot_pos.x = next_foot_pos.x
			# current_foot_pos.y = next_foot_pos.y
			@next_foot_positions[current_foot_point_name] = next_foot_pos
		# console.log @next_foot_positions
		for leg in @legs
			foot_point = @structure.points[leg.foot_point_name]
			next_foot_pos = @next_foot_positions[leg.foot_point_name]
			# console.log foot_point_name, next_foot_pos
			# console.log leg.point_names_by_segment_name, leg
			for segment_name, point_name of leg.point_names_by_segment_name
				@structure.points[point_name].vx += (next_foot_pos.x - foot_point.x) / 200
				# console.log point_name, point_name in @foot_point_names
				unless point_name in @foot_point_names
					@structure.points[point_name].vy -= 0.5
			dist = distance(next_foot_pos, foot_point)
			foot_point.vx += (next_foot_pos.x - foot_point.x) / dist / 2
			foot_point.vy += (next_foot_pos.y - foot_point.y) / dist / 2
		# @structure.points["body"].x += 2
		@structure.points["body"].vy -= 1.5
		# @structure.stepLayout() for [0..100]
		collision = (point)=> world.collision(@toWorld(point))
		@structure.stepLayout({gravity: 0.5, collision})
		@structure.stepLayout() for [0..10]
		@structure.stepLayout({collision}) for [0..4]
	
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
