
@[k] = Math[k] for k in Object.getOwnPropertyNames(Math)
@TAU = PI * 2

distanceSquared = (v, w)-> (v.x - w.x) ** 2 + (v.y - w.y) ** 2
@distance = (v, w)-> sqrt(distanceSquared(v, w))

distanceToSegmentSquared = (p, v, w)->
	l2 = distanceSquared(v, w)
	return distanceSquared(p, v) if l2 is 0
	t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
	t = max(0, min(1, t))
	distanceSquared(p, {
		x: v.x + t * (w.x - v.x)
		y: v.y + t * (w.y - v.y)
	})
@distanceToSegment = (p, v, w)->
	sqrt(distanceToSegmentSquared(p, v, w))

@entity_classes = {}
@add_Entity_class = (constructor)->
	entity_classes[constructor.name] = constructor
