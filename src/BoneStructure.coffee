
class @BoneStructure extends Structure
	
	addPoint: (name)->
		if @points[name]
			throw new Error "point/segment '#{name}' already exists adding point '#{name}'"
		@points[name] = {x: 0, y: 0, name}
	
	addSegment: (def)->
		{from, to, name} = def
		to ?= name
		if @segments[name]
			throw new Error "segment '#{name}' already exists adding segment '#{name}'"
		if @points[to]
			throw new Error "point/segment '#{name}' already exists adding segment '#{name}'"
		unless @points[from]
			throw new Error "point/segment '#{from}' does not exist yet adding segment '#{name}'"
		@points[to] = {x: 0, y: 0, name: to}
		@segments[name] = {a: @points[from], b: @points[to], from, to, name}
		@segments[name][k] = v for k, v of def
		return name
	
	autoLayout: ->
		ys = {}
		y = 0
		for point_name, point of @points
			side = point_name.match(/left|right/)?[0]
			if side
				sideless_point_name = point_name.replace(/left|right/, "")
				if ys[sideless_point_name]
					y = ys[sideless_point_name]
				else
					y += 10
					ys[sideless_point_name] = y
				if side is "left"
					point.x = -5.5
				if side is "right"
					point.x = +5.5
				point.x *= 0.7 if point_name.match(/lower/)
			point.y = y
		
		for [0..2000]
			@stepLayout(center: yes, repel: yes)
		for [0..4000]
			@stepLayout()
	
	stepLayout: ({center, repel}={})->
		forces = {}
		
		center_around = {x: 0, y: 0}
		
		for point_name, point of @points
			forces[point_name] = {x: 0, y: 0}
			
			if center
				dx = center_around.x - point.x
				dy = center_around.y - point.y
				dist = sqrt(dx * dx + dy * dy)
				forces[point_name].x += dx * dist / 100000
				forces[point_name].y += dy * dist / 100000
			
			if repel
				for other_point_name, other_point of @points
					dx = other_point.x - point.x
					dy = other_point.y - point.y
					dist = sqrt(dx * dx + dy * dy)
					delta_dist = 5 - dist
					unless delta_dist is 0
						forces[point_name].x += dx / delta_dist / 1000
						forces[point_name].y += dy / delta_dist / 1000
		
		for segment_name, segment of @segments
			dx = segment.a.x - segment.b.x
			dy = segment.a.y - segment.b.y
			dist = sqrt(dx * dx + dy * dy)
			delta_dist = dist - (segment.length ? 50)
			delta_dist = min(delta_dist, 100)
			forces[segment.a.name].x -= dx * delta_dist / 1000
			forces[segment.a.name].y -= dy * delta_dist / 1000
			forces[segment.b.name].x += dx * delta_dist / 1000
			forces[segment.b.name].y += dy * delta_dist / 1000

		for point_name, force of forces
			@points[point_name].x += force.x
			@points[point_name].y += force.y
