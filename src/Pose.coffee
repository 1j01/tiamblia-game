
class @Pose
	constructor: (def)->
		@points = {}
		# if points?
		# 	{points} = points if points.points
		if def?
			{points} = def
			for point_name, {x, y} of points
				@points[point_name] = {x, y}
	
	@lerp: (a, b, b_ness)->
		# NOTE: no checks for matching sets of points
		result = new Pose
		for point_name, point_a of a.points
			point_b = b.points[point_name]
			result.points[point_name] = lerpPoints(point_a, point_b, b_ness)
		result
	
	@alterPoints: (pose, fn)->
		result = new Pose
		for point_name, point of pose.points
			new_point = fn(point)
			new_point[k] ?= v for k, v of point
			result.points[point_name] = new_point
		result
	
	@copy: (pose)->
		Pose.alterPoints(pose, (-> {}))
	
	@horizontallyFlip: (pose, center_x=0)->
		Pose.alterPoints pose, (point)->
			x: center_x - point.x
			y: point.y
	
	@verticallyFlip: (pose, center_y=0)->
		Pose.alterPoints pose, (point)->
			x: point.x
			y: center_y - point.y
