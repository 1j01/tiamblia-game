
@[k] = Math[k] for k in Object.getOwnPropertyNames(Math)
@TAU = PI * 2

distanceSquared = (v, w)-> (v.x - w.x) ** 2 + (v.y - w.y) ** 2
@distance = (v, w)-> sqrt(distanceSquared(v, w))

distanceToLineSegmentSquared = (p, v, w)->
	l2 = distanceSquared(v, w)
	return distanceSquared(p, v) if l2 is 0
	t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
	t = max(0, min(1, t))
	distanceSquared(p, {
		x: v.x + t * (w.x - v.x)
		y: v.y + t * (w.y - v.y)
	})
@distanceToLineSegment = (p, v, w)->
	sqrt(distanceToLineSegmentSquared(p, v, w))

@lineSegmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4)->
	a_dx = x2 - x1
	a_dy = y2 - y1
	b_dx = x4 - x3
	b_dy = y4 - y3
	s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy)
	t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy)
	(0 <= s <= 1 and 0 <= t <= 1)

@lerpPoints = (a, b, b_ness)->
	# x: a.x + (b.x - a.x) * b_ness
	# y: a.y + (b.y - a.y) * b_ness
	result = {}
	for k, v of a
		if typeof v is "number"
			result[k] = v + (b[k] - v) * b_ness
		else
			result[k] = v
	result

@lerpStructures = (a, b, b_ness)->
	StructureClass = a.constructor
	unless a.constructor is b.constructor
		throw new Error "Mismatching structure types passed to lerpStructure: #{a.constructor.name} and #{b.constructor.name}"
	# NOTE: no checks for matching sets of points or segments
	result = new StructureClass
	for point_name, point_a of a.points
		point_b = b.points[point_name]
		result.points[point_name] = lerpPoints(point_a, point_b, b_ness)
	for segment_name, segment of a.segments
		new_segment = {}
		new_segment[k] = v for k, v of segment
		new_segment.a = result.points[segment.a.name]
		new_segment.b = result.points[segment.b.name]
		result.segments[segment_name] = new_segment
	result

@alterStructurePoints = (structure, fn)->
	StructureClass = structure.constructor
	result = new StructureClass
	for point_name, point of structure.points
		new_point = fn(point)
		new_point[k] ?= v for k, v of point
		result.points[point_name] = new_point
	for segment_name, segment of structure.segments
		new_segment = {}
		new_segment[k] = v for k, v of segment
		new_segment.a = result.points[segment.a.name]
		new_segment.b = result.points[segment.b.name]
		result.segments[segment_name] = new_segment
	result

@copyStructure = (structure)->
	@alterStructurePoints(structure, (-> {}))

@flipStructureHorizontally = (structure, center_x=0)->
	alterStructurePoints structure, (point)->
		x: center_x - point.x
		y: point.y

@flipStructureVertically = (structure, center_y=0)->
	alterStructurePoints structure, (point)->
		x: point.x
		y: center_y - point.y

@entity_classes = {}
@addEntityClass = (constructor)->
	entity_classes[constructor.name] = constructor
