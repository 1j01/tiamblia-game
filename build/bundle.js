/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var distanceSquared, distanceToLineSegmentSquared;

distanceSquared = function(v, w) {
  return Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2);
};

exports.distance = function(v, w) {
  return Math.sqrt(distanceSquared(v, w));
};

distanceToLineSegmentSquared = function(p, v, w) {
  var l2, t;
  l2 = distanceSquared(v, w);
  if (l2 === 0) {
    return distanceSquared(p, v);
  }
  t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return distanceSquared(p, {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y)
  });
};

exports.distanceToLineSegment = function(p, v, w) {
  return Math.sqrt(distanceToLineSegmentSquared(p, v, w));
};

exports.lineSegmentsIntersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a_dx, a_dy, b_dx, b_dy, s, t;
  a_dx = x2 - x1;
  a_dy = y2 - y1;
  b_dx = x4 - x3;
  b_dy = y4 - y3;
  s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  return (0 <= s && s <= 1) && (0 <= t && t <= 1);
};

exports.lerpPoints = function(a, b, b_ness) {
  var k, result, v;
  result = {};
  for (k in a) {
    v = a[k];
    if (typeof v === "number") {
      result[k] = v + (b[k] - v) * b_ness;
    } else {
      result[k] = v;
    }
  }
  return result;
};

exports.entity_classes = {};

exports.addEntityClass = function(constructor) {
  return exports.entity_classes[constructor.name] = constructor;
};

// TODO: consistent name formatting (camelCase instead of snake_case, at least for the exports/API)
exports.rename_object_key = function(object, old_key, new_key) {
  var k, new_object, results, v;
  new_object = {};
  for (k in object) {
    v = object[k];
    if (k === old_key) {
      new_object[new_key] = v;
    } else {
      new_object[k] = v;
    }
  }
// return new_object
  for (k in object) {
    v = object[k];
    delete object[k];
  }
  results = [];
  for (k in new_object) {
    v = new_object[k];
    results.push(object[k] = v);
  }
  return results;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(28);
} else {}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {// Generated by CoffeeScript 1.9.1
(function() {
  var E, React, add, hyphenate, is_plainish_object, ref,
    slice = [].slice;

  React = (ref = this.React) != null ? ref : __webpack_require__(1);

  is_plainish_object = function(o) {
    return (o != null) && typeof o === "object" && !(o instanceof Array || React.isValidElement(o));
  };

  add = function(from, arg) {
    var i, k, len, thing, to, v;
    to = arg.to;
    if (from instanceof Array) {
      for (i = 0, len = from.length; i < len; i++) {
        thing = from[i];
        add(thing, {
          to: to
        });
      }
      return true;
    } else if (is_plainish_object(from)) {
      for (k in from) {
        v = from[k];
        if (v) {
          to.push(hyphenate(k));
        }
      }
      return true;
    } else if (from != null) {
      to.push(from);
    }
    return false;
  };

  hyphenate = function(v) {
    return ("" + v).replace(/_/g, "-").replace(/([a-z])([A-Z])/g, function(m, az, AZ) {
      return az + "-" + (AZ.toLowerCase());
    });
  };

  E = function() {
    var addAttr, args, aria_k, aria_v, attr_args, attr_k, attr_v, child_arg, child_args, class_names, data_k, data_v, element_type, final_attributes, final_child_args, i, len, partial_selector, selector, unhandled, was_dynamic, will_have_been_dynamic;
    element_type = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (element_type == null) {
      element_type = "";
    }
    if (is_plainish_object(args[0])) {
      attr_args = args[0], child_args = 2 <= args.length ? slice.call(args, 1) : [];
    } else {
      child_args = 1 <= args.length ? slice.call(args, 0) : [];
      attr_args = null;
    }
    switch (typeof element_type) {
      case "string":
        selector = element_type;
        element_type = "div";
        partial_selector = selector.replace(/^[a-z][a-z0-9\-_]*/i, function(match) {
          element_type = match;
          return "";
        });
        final_attributes = {};
        class_names = [];
        addAttr = function(attr_k, attr_v, aria) {
          if (!(attr_v === false && !aria)) {
            return final_attributes[attr_k] = attr_v;
          }
        };
        for (attr_k in attr_args) {
          attr_v = attr_args[attr_k];
          if (attr_k === "class" || attr_k === "className" || attr_k === "classes" || attr_k === "classNames" || attr_k === "classList") {
            add(attr_v, {
              to: class_names
            });
          } else if (attr_k === "data") {
            for (data_k in attr_v) {
              data_v = attr_v[data_k];
              addAttr("data-" + (hyphenate(data_k)), data_v);
            }
          } else if (attr_k === "aria") {
            for (aria_k in attr_v) {
              aria_v = attr_v[aria_k];
              addAttr("aria-" + (hyphenate(aria_k)), aria_v, true);
            }
          } else if (attr_k.match(/^data/)) {
            addAttr(hyphenate(attr_k), attr_v);
          } else if (attr_k.match(/^aria/)) {
            addAttr(hyphenate(attr_k), attr_v, true);
          } else {
            addAttr(attr_k, attr_v);
          }
        }
        if (partial_selector) {
          unhandled = partial_selector.replace(/\.([a-z][a-z0-9\-_]*)/gi, function(m, className) {
            class_names.push(className);
            return "";
          }).replace(/#([a-z][a-z0-9\-_]*)/gi, function(m, id) {
            final_attributes.id = id;
            return "";
          });
        }
        if (unhandled) {
          throw new Error("Unhandled selector fragment '" + unhandled + "' in selector: '" + selector + "'");
        }
        if (class_names.length) {
          final_attributes.className = class_names.join(" ");
        }
        break;
      case "function":
        final_attributes = attr_args;
        break;
      default:
        throw new Error("Invalid first argument to ReactScript: " + element_type);
    }
    final_child_args = [];
    was_dynamic = false;
    for (i = 0, len = child_args.length; i < len; i++) {
      child_arg = child_args[i];
      will_have_been_dynamic = add(child_arg, {
        to: final_child_args
      });
      was_dynamic || (was_dynamic = will_have_been_dynamic);
    }
    if (was_dynamic) {
      return React.createElement(element_type, final_attributes, final_child_args);
    } else {
      return React.createElement.apply(React, [element_type, final_attributes].concat(slice.call(final_child_args)));
    }
  };

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = E;
  } else {
    this.ReactScript = E;
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(37)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

/*
fs = require? "fs"
path = require? "path"
 * XXX: hack for webpack
 * TODO: use ifdef conditionals or something
fs = null if not fs.readFileSync
path = null if not path.join

module.exports = class Entity
	constructor: ->
		@structure = new BoneStructure
		@x = 0
		@y = 0
		@id = uuid()

		@bbox_padding = 2
 * TODO: depth system
 * @drawing_pieces = {}

		@_class_ = @constructor.name

	@initAnimation: (EntityClass)->
		EntityClass.poses = {}
		EntityClass.animations = {}
		EntityClass.animation_json_path = "./animations/#{EntityClass.name}.json"
		Entity.loadAnimations(EntityClass)

	@loadAnimations: (EntityClass)->
		animationsFromJSON = ({poses, animations})->
			EntityClass.poses = {}
			EntityClass.animations = {}
			for pose_name, pose of poses
				EntityClass.poses[pose_name] = new Pose(pose)
			for animation_name, animation of animations
				EntityClass.animations[animation_name] = (new Pose(pose) for pose in animation)

		if fs?
			try
				json = fs.readFileSync(EntityClass.animation_json_path)
			catch e
				throw e unless e.code is "ENOENT"
		else
			json = localStorage["Tiamblia #{EntityClass.name} animations"]
		if json
			animationsFromJSON(JSON.parse(json)) if json
		else
			req = new XMLHttpRequest
			req.addEventListener "load", (e)=>
				json = req.responseText
				animationsFromJSON(JSON.parse(json)) if json
			req.open("GET", EntityClass.animation_json_path)
			req.send()

	@saveAnimations: (EntityClass)->
		{poses, animations} = EntityClass
		json = JSON.stringify({poses, animations}, null, "\t")
		if fs?
			try
				fs.mkdirSync(path.dirname(EntityClass.animation_json_path))
			catch e
				throw e unless e.code is "EEXIST"
			fs.writeFileSync(EntityClass.animation_json_path, json)
		else
			localStorage["Tiamblia #{EntityClass.name} animations"] = json

	@fromJSON: (def)->
		unless typeof def._class_ is "string"
			console.error "Erroneous entity definition:", def
			throw new Error "Expected entity to have a string _class_, _class_ is #{def._class_}"
		unless entity_classes[def._class_]
			throw new Error "Entity class '#{def._class_}' does not exist"
		entity = new entity_classes[def._class_]
		entity.fromJSON(def)
		entity

	fromJSON: (def)->
		if def._class_ isnt @_class_
			throw new Error "Tried to initialize #{@_class_} entity from JSON with _class_ #{JSON.stringify(def._class_)}"
		for k, v of def when k isnt "_class_"
			if @[k]?.fromJSON
				@[k].fromJSON(v)
			else
				@[k] = v

	resolveReferences: (world)->
		if @_refs_
			for k, id of @_refs_
				@[k] = world.getEntityByID(id)
			delete @_refs_

	toJSON: ->
		obj = {}
		for k, v of @ when k isnt "_refs_"
			if v instanceof Entity
				obj._refs_ ?= {}
				obj._refs_[k] = v.id
			else
				obj[k] = v
		obj

	toWorld: (point)->
		x: point.x + @x
		y: point.y + @y

	fromWorld: (point)->
		x: point.x - @x
		y: point.y - @y

	bbox: ->
		min_point = {x: +Infinity, y: +Infinity}
		max_point = {x: -Infinity, y: -Infinity}
		for point_name, point of @structure.points
			min_point.x = Math.min(min_point.x, point.x)
			min_point.y = Math.min(min_point.y, point.y)
			max_point.x = Math.max(max_point.x, point.x)
			max_point.y = Math.max(max_point.y, point.y)
		min_point.x = 0 unless isFinite(min_point.x)
		min_point.y = 0 unless isFinite(min_point.y)
		max_point.x = 0 unless isFinite(max_point.x)
		max_point.y = 0 unless isFinite(max_point.y)
		min_point.x -= @bbox_padding
		min_point.y -= @bbox_padding
		max_point.x += @bbox_padding
		max_point.y += @bbox_padding
		min_point_in_world = @toWorld(min_point)
		max_point_in_world = @toWorld(max_point)
		x: min_point_in_world.x
		y: min_point_in_world.y
		width: max_point_in_world.x - min_point_in_world.x
		height: max_point_in_world.y - min_point_in_world.y

 * animate: ()->
 * 	@structure.setPose(Pose.lerp(various_poses))

	initLayout: ->
		EntityClass = @constructor
		if EntityClass.poses
			default_pose = EntityClass.poses["Default"] ? EntityClass.poses["Stand"] ? EntityClass.poses["Standing"] ? EntityClass.poses["Idle"]
			if default_pose
				@structure.setPose(default_pose)
				return
		ys = {}
		y = 0
		for point_name, point of @structure.points
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
			@structure.stepLayout(center: yes, repel: yes)
		for [0..4000]
			@structure.stepLayout()

	step: (world)->
	draw: (ctx)->

 * TODO: function to call into the depth system
 * drawStructure: (drawing_functions)->
 * 	for point_name, fn of drawing_functions.points
 * 		fn(@structure.points[point_name])
 * 	for segment_name, fn of drawing_functions.segments
 * 		fn(@structure.segments[segment_name])
 */


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var BoneStructure, Entity, Pose, entity_classes, fs, path;

fs =  true ? __webpack_require__(14) : undefined;

path =  true ? __webpack_require__(15) : undefined;

if (!fs.readFileSync) {
  // XXX: hack for webpack
  // TODO: use ifdef conditionals or something
  fs = null;
}

if (!path.join) {
  path = null;
}

Pose = __webpack_require__(5);

BoneStructure = __webpack_require__(16);

({entity_classes} = __webpack_require__(0));

module.exports = Entity = class Entity {
  constructor() {
    this.structure = new BoneStructure;
    this.x = 0;
    this.y = 0;
    this.id = uuid();
    this.bbox_padding = 2;
    // TODO: depth system
    // @drawing_pieces = {}
    this._class_ = this.constructor.name;
  }

  static initAnimation(EntityClass) {
    EntityClass.poses = {};
    EntityClass.animations = {};
    EntityClass.animation_json_path = `./animations/${EntityClass.name}.json`;
    return Entity.loadAnimations(EntityClass);
  }

  static loadAnimations(EntityClass) {
    var animationsFromJSON, e, json, req;
    animationsFromJSON = function({poses, animations}) {
      var animation, animation_name, pose, pose_name, results;
      EntityClass.poses = {};
      EntityClass.animations = {};
      for (pose_name in poses) {
        pose = poses[pose_name];
        EntityClass.poses[pose_name] = new Pose(pose);
      }
      results = [];
      for (animation_name in animations) {
        animation = animations[animation_name];
        results.push(EntityClass.animations[animation_name] = (function() {
          var i, len, results1;
          results1 = [];
          for (i = 0, len = animation.length; i < len; i++) {
            pose = animation[i];
            results1.push(new Pose(pose));
          }
          return results1;
        })());
      }
      return results;
    };
    if (fs != null) {
      try {
        json = fs.readFileSync(EntityClass.animation_json_path);
      } catch (error) {
        e = error;
        if (e.code !== "ENOENT") {
          throw e;
        }
      }
    } else {
      json = localStorage[`Skele2D ${EntityClass.name} animations`];
    }
    if (json) {
      if (json) {
        return animationsFromJSON(JSON.parse(json));
      }
    } else {
      req = new XMLHttpRequest;
      req.addEventListener("load", (e) => {
        json = req.responseText;
        if (json) {
          return animationsFromJSON(JSON.parse(json));
        }
      });
      req.open("GET", EntityClass.animation_json_path);
      return req.send();
    }
  }

  static saveAnimations(EntityClass) {
    var animations, e, json, poses;
    ({poses, animations} = EntityClass);
    json = JSON.stringify({poses, animations}, null, "\t");
    if (fs != null) {
      try {
        fs.mkdirSync(path.dirname(EntityClass.animation_json_path));
      } catch (error) {
        e = error;
        if (e.code !== "EEXIST") {
          throw e;
        }
      }
      return fs.writeFileSync(EntityClass.animation_json_path, json);
    } else {
      return localStorage[`Skele2D ${EntityClass.name} animations`] = json;
    }
  }

  static fromJSON(def) {
    var entity;
    if (typeof def._class_ !== "string") {
      console.error("Erroneous entity definition:", def);
      throw new Error(`Expected entity to have a string _class_, _class_ is ${def._class_}`);
    }
    if (!entity_classes[def._class_]) {
      throw new Error(`Entity class '${def._class_}' does not exist`);
    }
    entity = new entity_classes[def._class_];
    entity.fromJSON(def);
    return entity;
  }

  fromJSON(def) {
    var k, ref, results, v;
    if (def._class_ !== this._class_) {
      throw new Error(`Tried to initialize ${this._class_} entity from JSON with _class_ ${JSON.stringify(def._class_)}`);
    }
    results = [];
    for (k in def) {
      v = def[k];
      if (k !== "_class_") {
        if ((ref = this[k]) != null ? ref.fromJSON : void 0) {
          results.push(this[k].fromJSON(v));
        } else {
          results.push(this[k] = v);
        }
      }
    }
    return results;
  }

  resolveReferences(world) {
    var id, k, ref;
    if (this._refs_) {
      ref = this._refs_;
      for (k in ref) {
        id = ref[k];
        this[k] = world.getEntityByID(id);
      }
      return delete this._refs_;
    }
  }

  toJSON() {
    var k, obj, ref, v;
    obj = {};
    ref = this;
    for (k in ref) {
      v = ref[k];
      if (k !== "_refs_") {
        if (v instanceof Entity) {
          if (obj._refs_ == null) {
            obj._refs_ = {};
          }
          obj._refs_[k] = v.id;
        } else {
          obj[k] = v;
        }
      }
    }
    return obj;
  }

  toWorld(point) {
    return {
      x: point.x + this.x,
      y: point.y + this.y
    };
  }

  fromWorld(point) {
    return {
      x: point.x - this.x,
      y: point.y - this.y
    };
  }

  bbox() {
    var max_point, max_point_in_world, min_point, min_point_in_world, point, point_name, ref;
    min_point = {
      x: +2e308,
      y: +2e308
    };
    max_point = {
      x: -2e308,
      y: -2e308
    };
    ref = this.structure.points;
    for (point_name in ref) {
      point = ref[point_name];
      min_point.x = Math.min(min_point.x, point.x);
      min_point.y = Math.min(min_point.y, point.y);
      max_point.x = Math.max(max_point.x, point.x);
      max_point.y = Math.max(max_point.y, point.y);
    }
    if (!isFinite(min_point.x)) {
      min_point.x = 0;
    }
    if (!isFinite(min_point.y)) {
      min_point.y = 0;
    }
    if (!isFinite(max_point.x)) {
      max_point.x = 0;
    }
    if (!isFinite(max_point.y)) {
      max_point.y = 0;
    }
    min_point.x -= this.bbox_padding;
    min_point.y -= this.bbox_padding;
    max_point.x += this.bbox_padding;
    max_point.y += this.bbox_padding;
    min_point_in_world = this.toWorld(min_point);
    max_point_in_world = this.toWorld(max_point);
    return {
      x: min_point_in_world.x,
      y: min_point_in_world.y,
      width: max_point_in_world.x - min_point_in_world.x,
      height: max_point_in_world.y - min_point_in_world.y
    };
  }

  
  // animate: ()->
  // 	@structure.setPose(Pose.lerp(various_poses))
  initLayout() {
    var EntityClass, default_pose, i, j, point, point_name, ref, ref1, ref2, ref3, ref4, results, side, sideless_point_name, y, ys;
    EntityClass = this.constructor;
    if (EntityClass.poses) {
      default_pose = (ref = (ref1 = (ref2 = EntityClass.poses["Default"]) != null ? ref2 : EntityClass.poses["Stand"]) != null ? ref1 : EntityClass.poses["Standing"]) != null ? ref : EntityClass.poses["Idle"];
      if (default_pose) {
        this.structure.setPose(default_pose);
        return;
      }
    }
    ys = {};
    y = 0;
    ref3 = this.structure.points;
    for (point_name in ref3) {
      point = ref3[point_name];
      side = (ref4 = point_name.match(/left|right/)) != null ? ref4[0] : void 0;
      if (side) {
        sideless_point_name = point_name.replace(/left|right/, "");
        if (ys[sideless_point_name]) {
          y = ys[sideless_point_name];
        } else {
          y += 10;
          ys[sideless_point_name] = y;
        }
        if (side === "left") {
          point.x = -5.5;
        }
        if (side === "right") {
          point.x = +5.5;
        }
        if (point_name.match(/lower/)) {
          point.x *= 0.7;
        }
      }
      point.y = y;
    }
    for (var i = 0; i <= 2000; i++) {
      this.structure.stepLayout({
        center: true,
        repel: true
      });
    }
    results = [];
    for (var j = 0; j <= 4000; j++) {
      results.push(this.structure.stepLayout());
    }
    return results;
  }

  step(world) {}

  draw(ctx) {}

};


// TODO: function to call into the depth system
// drawStructure: (drawing_functions)->
// 	for point_name, fn of drawing_functions.points
// 		fn(@structure.points[point_name])
// 	for segment_name, fn of drawing_functions.segments
// 		fn(@structure.segments[segment_name])


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Pose, lerpPoints,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

({lerpPoints} = __webpack_require__(0));

module.exports = Pose = class Pose {
  constructor(def) {
    var point_name, points, x, y;
    this.points = {};
    // if points?
    // 	{points} = points if points.points
    if (def != null) {
      ({points} = def);
      for (point_name in points) {
        ({x, y} = points[point_name]);
        this.points[point_name] = {x, y};
      }
    }
  }

  static lerp(a, b, b_ness) {
    var point_a, point_b, point_name, ref, result;
    // NOTE: no checks for matching sets of points
    result = new Pose;
    ref = a.points;
    for (point_name in ref) {
      point_a = ref[point_name];
      point_b = b.points[point_name];
      result.points[point_name] = lerpPoints(point_a, point_b, b_ness);
    }
    return result;
  }

  static lerpAnimationLoop(frames, soft_index) {
    var a, b;
    a = frames[modulo(~~soft_index + 0, frames.length)];
    b = frames[modulo(~~soft_index + 1, frames.length)];
    return Pose.lerp(a, b, modulo(soft_index, 1));
  }

  static alterPoints(pose, fn) {
    var k, new_point, point, point_name, ref, result, v;
    result = new Pose;
    ref = pose.points;
    for (point_name in ref) {
      point = ref[point_name];
      new_point = fn(point);
      for (k in point) {
        v = point[k];
        if (new_point[k] == null) {
          new_point[k] = v;
        }
      }
      result.points[point_name] = new_point;
    }
    return result;
  }

  static copy(pose) {
    return Pose.alterPoints(pose, (function() {
      return {};
    }));
  }

  static horizontallyFlip(pose, center_x = 0) {
    return Pose.alterPoints(pose, function(point) {
      return {
        x: center_x - point.x,
        y: point.y
      };
    });
  }

  static verticallyFlip(pose, center_y = 0) {
    return Pose.alterPoints(pose, function(point) {
      return {
        x: point.x,
        y: center_y - point.y
      };
    });
  }

};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(27);
} else {}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, PolygonStructure, TAU, Terrain;

Entity = __webpack_require__(4);

PolygonStructure = __webpack_require__(44);

TAU = Math.PI * 2;

module.exports = Terrain = class Terrain extends Entity {
  constructor() {
    super();
    this.structure = new PolygonStructure;
    this.simplex = new SimplexNoise;
    this.seed = Math.random();
  }

  initLayout() {
    var i, non_squished_point_y_component, point_x, point_y, radius, ref, ref1, results, theta;
    radius = 30;
    results = [];
    for (theta = i = 0, ref = TAU, ref1 = TAU / 15; ref1 !== 0 && (ref1 > 0 ? i <= ref : i >= ref); theta = i += ref1) {
      point_x = Math.sin(theta) * radius;
      point_y = Math.cos(theta) * radius;
      non_squished_point_y_component = Math.max(point_y, -radius * 0.5);
      point_y = non_squished_point_y_component + (point_y - non_squished_point_y_component) * 0.4;
      // point_y = non_squished_point_y_component + pow(0.9, point_y - non_squished_point_y_component)
      // point_y = non_squished_point_y_component + pow(point_y - non_squished_point_y_component, 0.9)
      results.push(this.structure.addVertex(point_x, point_y));
    }
    return results;
  }

  toJSON() {
    var def, k, ref, v;
    def = {};
    ref = this;
    for (k in ref) {
      v = ref[k];
      if (k !== "simplex") {
        def[k] = v;
      }
    }
    return def;
  }

  generate() {
    var i, noise, ref, ref1, ref2, res, results, x;
    this.width = 5000;
    this.left = -2500;
    this.right = this.left + this.width;
    this.max_height = 400;
    this.bottom = 300;
    res = 20;
    this.structure.clear();
    this.structure.addVertex(this.right, this.bottom);
    this.structure.addVertex(this.left, this.bottom);
    results = [];
    for (x = i = ref = this.left, ref1 = this.right, ref2 = res; ref2 !== 0 && (ref2 > 0 ? i <= ref1 : i >= ref1); x = i += ref2) {
      noise = this.simplex.noise2D(x / 2400, 0) + this.simplex.noise2D(x / 500, 10) / 5 + this.simplex.noise2D(x / 50, 30) / 100;
      results.push(this.structure.addVertex(x, this.bottom - (noise + 1) / 2 * this.max_height));
    }
    return results;
  }

  draw(ctx, view) {
    var point, point_name, ref;
    ctx.beginPath();
    ref = this.structure.points;
    for (point_name in ref) {
      point = ref[point_name];
      ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    ctx.fillStyle = "#a5f";
    return ctx.fill();
  }

};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/*
Entity = require "./Entity.coffee"

module.exports = class Terrain extends Entity
	constructor: ->
		super()
		@structure = new PolygonStructure
		@simplex = new SimplexNoise
		@seed = random()

	initLayout: ->
		radius = 30
		for theta in [0..TAU] by TAU/15
			point_x = Math.sin(theta) * radius
			point_y = Math.cos(theta) * radius
			non_squished_point_y_component = Math.max(point_y, -radius*0.5)
			point_y = non_squished_point_y_component + (point_y - non_squished_point_y_component) * 0.4
 * point_y = non_squished_point_y_component + pow(0.9, point_y - non_squished_point_y_component)
 * point_y = non_squished_point_y_component + pow(point_y - non_squished_point_y_component, 0.9)
			@structure.addVertex(point_x, point_y)

	toJSON: ->
		def = {}
		def[k] = v for k, v of @ when k isnt "simplex"
		def

	generate: ->
		@width = 5000
		@left = -2500
		@right = @left + @width
		@max_height = 400
		@bottom = 300
		res = 20
		@structure.clear()
		@structure.addVertex(@right, @bottom)
		@structure.addVertex(@left, @bottom)
		for x in [@left..@right] by res
			noise =
				@simplex.noise2D(x / 2400, 0) +
				@simplex.noise2D(x / 500, 10) / 5 +
				@simplex.noise2D(x / 50, 30) / 100
			@structure.addVertex(x, @bottom - (noise + 1) / 2 * @max_height)

	draw: (ctx, view)->
		ctx.beginPath()
		for point_name, point of @structure.points
			ctx.lineTo(point.x, point.y)
		ctx.closePath()
		ctx.fillStyle = "#a5f"
		ctx.fill()
 */


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var View;

module.exports = View = class View {
  constructor() {
    this.center_x = 0;
    this.center_y = 0;
    this.scale = 1;
    this.width = 1;
    this.height = 1;
  }

  easeTowards(to_view, smoothness) {
    this.center_x += (to_view.center_x - this.center_x) / (1 + smoothness / to_view.scale * this.scale);
    this.center_y += (to_view.center_y - this.center_y) / (1 + smoothness / to_view.scale * this.scale);
    return this.scale += (to_view.scale - this.scale) / (1 + smoothness);
  }

  testRect(x, y, width, height, padding = 0) {
    return (this.center_x - this.width / 2 / this.scale - padding <= x && x <= this.center_x + this.width / 2 / this.scale + padding) && (this.center_y - this.height / 2 / this.scale - padding <= y && y <= this.center_y + this.height / 2 / this.scale + padding);
  }

  toWorld(point) {
    return {
      // x: (point.x + @center_x - @width / 2) / @scale
      // y: (point.y + @center_y - @height / 2) / @scale
      x: (point.x - this.width / 2) / this.scale + this.center_x,
      y: (point.y - this.height / 2) / this.scale + this.center_y
    };
  }

  fromWorld(point) {
    return {
      // x: point.x * @scale + @center_x + @width / 2
      // y: point.y * @scale + @center_y + @height / 2
      x: (point.x - this.center_x) * this.scale + this.width / 2,
      y: (point.y - this.center_y) * this.scale + this.height / 2
    };
  }

};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {}

module.exports = emptyObject;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Component, E, Entity, EntityPreview, View;

({Component} = __webpack_require__(1));

E = __webpack_require__(2);

Entity = __webpack_require__(4);

View = __webpack_require__(9);

module.exports = EntityPreview = class EntityPreview extends Component {
  constructor(props) {
    var center_x, center_y, entity, entity_bbox, height, max_height, max_width, scale;
    super();
    ({entity, max_width, max_height} = props);
    this.entity = Entity.fromJSON(JSON.parse(JSON.stringify(entity)));
    this.entity.facing_x = 1;
    this.view = new View;
    entity_bbox = this.entity.bbox();
    center_x = entity_bbox.x + entity_bbox.width / 2 - this.entity.x;
    center_y = entity_bbox.y + entity_bbox.height / 2 - this.entity.y;
    height = Math.min(entity_bbox.height, max_height);
    scale = height / entity_bbox.height;
    this.view = new View;
    this.view.width = max_width;
    this.view.height = height;
    this.view.scale = scale;
    this.view.center_x = center_x;
    this.view.center_y = center_y;
    this.view.is_preview = true;
  }

  render() {
    return E("canvas", {
      ref: (canvas) => {
        this.canvas = canvas;
      }
    });
  }

  update() {
    var center_x, center_y, ctx, entity_bbox;
    entity_bbox = this.entity.bbox();
    center_x = entity_bbox.x + entity_bbox.width / 2 - this.entity.x;
    center_y = entity_bbox.y + entity_bbox.height / 2 - this.entity.y;
    this.view.center_x = center_x;
    this.view.center_y = center_y;
    ctx = this.canvas.getContext("2d");
    this.canvas.width = this.view.width;
    this.canvas.height = this.view.height;
    ctx.save();
    ctx.translate(this.view.width / 2, this.view.height / 2);
    ctx.scale(this.view.scale, this.view.scale);
    ctx.translate(-this.view.center_x, -this.view.center_y);
    this.entity.draw(ctx, this.view);
    return ctx.restore();
  }

};


/***/ }),
/* 14 */
/***/ (function(module, exports) {



/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(39)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var BoneStructure, Structure;

Structure = __webpack_require__(17);

module.exports = BoneStructure = class BoneStructure extends Structure {
  addPoint(name) {
    if (this.points[name]) {
      throw new Error(`point/segment '${name}' already exists adding point '${name}'`);
    }
    return this.points[name] = {
      x: 0,
      y: 0,
      name
    };
  }

  addSegment(def) {
    var from, k, name, to, v;
    ({from, to, name} = def);
    if (to == null) {
      to = name;
    }
    if (this.segments[name]) {
      throw new Error(`segment '${name}' already exists adding segment '${name}'`);
    }
    if (this.points[to]) {
      throw new Error(`point/segment '${name}' already exists adding segment '${name}'`);
    }
    if (!this.points[from]) {
      throw new Error(`point/segment '${from}' does not exist yet adding segment '${name}'`);
    }
    this.points[to] = {
      x: 0,
      y: 0,
      name: to
    };
    this.segments[name] = {
      a: this.points[from],
      b: this.points[to],
      from,
      to,
      name
    };
    for (k in def) {
      v = def[k];
      if (v != null) {
        this.segments[name][k] = v;
      }
    }
    return name;
  }

  stepLayout({center, repel, gravity, collision, velocity} = {}) {
    var center_around, delta_dist, dist, dx, dy, force, forces, go, move_x, move_y, other_point, other_point_name, point, point_name, ref, ref1, ref2, ref3, resolution, results, segment, segment_name;
    forces = {};
    center_around = {
      x: 0,
      y: 0
    };
    ref = this.points;
    for (point_name in ref) {
      point = ref[point_name];
      forces[point_name] = {
        x: 0,
        y: 0
      };
      if (center) {
        dx = center_around.x - point.x;
        dy = center_around.y - point.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        forces[point_name].x += dx * dist / 100000;
        forces[point_name].y += dy * dist / 100000;
      }
      if (repel) {
        ref1 = this.points;
        for (other_point_name in ref1) {
          other_point = ref1[other_point_name];
          dx = other_point.x - point.x;
          dy = other_point.y - point.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          delta_dist = 5 - dist;
          if (delta_dist !== 0) {
            forces[point_name].x += dx / delta_dist / 1000;
            forces[point_name].y += dy / delta_dist / 1000;
          }
        }
      }
      if (gravity) {
        forces[point_name].y += gravity;
      }
    }
    ref2 = this.segments;
    for (segment_name in ref2) {
      segment = ref2[segment_name];
      dx = segment.a.x - segment.b.x;
      dy = segment.a.y - segment.b.y;
      dist = Math.sqrt(dx * dx + dy * dy);
      delta_dist = dist - ((ref3 = segment.length) != null ? ref3 : 50);
      delta_dist = Math.min(delta_dist, 100);
      forces[segment.a.name].x -= dx * delta_dist / 1000;
      forces[segment.a.name].y -= dy * delta_dist / 1000;
      forces[segment.b.name].x += dx * delta_dist / 1000;
      forces[segment.b.name].y += dy * delta_dist / 1000;
    }
    results = [];
    for (point_name in forces) {
      force = forces[point_name];
      point = this.points[point_name];
      if (collision) {
        if (point.vx == null) {
          point.vx = 0;
        }
        if (point.vy == null) {
          point.vy = 0;
        }
        point.vx += force.x;
        point.vy += force.y;
        move_x = point.vx;
        move_y = point.vy;
        resolution = 0.5;
        while (Math.abs(move_x) > resolution) {
          go = Math.sign(move_x) * resolution;
          if (collision({
            x: point.x + go,
            y: point.y
          })) {
            point.vx *= 0.99;
            if (collision({
              x: point.x + go,
              y: point.y - 1
            })) {
              break;
            } else {
              point.y -= 1;
            }
          }
          move_x -= go;
          point.x += go;
        }
        results.push((function() {
          var results1;
          results1 = [];
          while (Math.abs(move_y) > resolution) {
            go = Math.sign(move_y) * resolution;
            if (collision({
              x: point.x,
              y: point.y + go
            })) {
              point.vy *= 0.9; // as opposed to `point.vy = 0` so it sticks to the ground when going downhill
              break;
            }
            move_y -= go;
            results1.push(point.y += go);
          }
          return results1;
        })());
      } else {
        point.x += force.x;
        results.push(point.y += force.y);
      }
    }
    return results;
  }

};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Pose, Structure;

Pose = __webpack_require__(5);

module.exports = Structure = class Structure {
  constructor() {
    this.clear();
  }

  clear() {
    this.points = {};
    return this.segments = {};
  }

  toJSON() {
    var k, points, ref, segment, segment_name, segments, v;
    ({points} = this);
    segments = {};
    ref = this.segments;
    for (segment_name in ref) {
      segment = ref[segment_name];
      segments[segment_name] = {};
      for (k in segment) {
        v = segment[k];
        if (k !== "a" && k !== "b") {
          segments[segment_name][k] = v;
        }
      }
    }
    return {points, segments};
  }

  fromJSON(def) {
    var k, ref, results, seg_def, segment, segment_name, v;
    this.points = def.points;
    this.segments = {};
    ref = def.segments;
    results = [];
    for (segment_name in ref) {
      seg_def = ref[segment_name];
      segment = {};
      for (k in seg_def) {
        v = seg_def[k];
        segment[k] = v;
      }
      segment.a = this.points[segment.from];
      segment.b = this.points[segment.to];
      results.push(this.segments[segment_name] = segment);
    }
    return results;
  }

  setPose(pose) {
    var point, point_name, ref, results;
    ref = pose.points;
    results = [];
    for (point_name in ref) {
      point = ref[point_name];
      // console.log point_name, point, @points[point_name]
      this.points[point_name].x = point.x;
      results.push(this.points[point_name].y = point.y);
    }
    return results;
  }

  getPose() {
    return new Pose(this);
  }

};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var keyCodeFor, keyboard, keys, prev_keys, specialKeys;

specialKeys = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': 189,
  '=': 187,
  ';': 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
};

keyCodeFor = function(keyName) {
  var ref;
  return (ref = specialKeys[keyName.toLowerCase()]) != null ? ref : keyName.toUpperCase().charCodeAt(0);
};

keys = {};

prev_keys = {};

addEventListener("keydown", function(e) {
  return keys[e.keyCode] = true;
});

addEventListener("keyup", function(e) {
  return delete keys[e.keyCode];
});

keyboard = {
  wasJustPressed: function(keyName) {
    return (keys[keyCodeFor(keyName)] != null) && (prev_keys[keyCodeFor(keyName)] == null);
  },
  isHeld: function(keyName) {
    return keys[keyCodeFor(keyName)] != null;
  },
  resetForNextStep: function() {
    var k, results, v;
    prev_keys = {};
    results = [];
    for (k in keys) {
      v = keys[k];
      results.push(prev_keys[k] = v);
    }
    return results;
  }
};

module.exports = keyboard;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
// SimpleActors have rectangular collision boxes and basic physics.
var Entity, SimpleActor;

Entity = __webpack_require__(3);

module.exports = SimpleActor = (function() {
  var gravity;

  class SimpleActor extends Entity {
    constructor() {
      super();
      this.vx = 0;
      this.vy = 0;
      this.width = 10;
      this.height = 40;
      this.jump_height = 50;
      this.walk_speed = 4;
      this.run_speed = 6;
      this.move_x = 0;
      this.jump = false;
      this.grounded = false;
      this.facing_x = 0;
    }

    step(world) {
      var go, move_x, move_y, resolution, results;
      if (this.y > 400) {
        return;
      }
      this.grounded = world.collision({
        x: this.x,
        y: this.y + 1 + this.height //or world.collision({@x, y: @y + @vy + @height}) or world.collision({@x, y: @y + 4 + @height})
      });
      if (this.grounded) {
        // if Math.abs(@vx) >= 1
        // 	@vx -= Math.sign(@vx)
        // else
        // 	@vx = 0
        // @vx += @move_x
        if (this.move_x === 0) {
          this.vx *= 0.7;
        } else {
          this.vx += this.move_x;
        }
        this.vy += Math.abs(this.vx);
        if (this.jump) {
          this.vy = -Math.sqrt(2 * gravity * this.jump_height);
        }
      } else {
        this.vx += this.move_x * 0.7;
      }
      this.vx = Math.min(this.run_speed, Math.max(-this.run_speed, this.vx));
      this.vy += gravity;
      this.grounded = false;
      // @vy *= 0.99
      move_x = this.vx;
      move_y = this.vy;
      if (move_x !== 0) {
        this.facing_x = Math.sign(move_x);
      }
      resolution = 0.5;
      while (Math.abs(move_x) > resolution) {
        go = Math.sign(move_x) * resolution;
        if (world.collision({
          x: this.x + go,
          y: this.y + this.height
        })) {
          this.vx *= 0.99;
          // TODO: clamber over tiny divots and maybe even stones and twigs
          if (world.collision({
            x: this.x + go,
            y: this.y + this.height - 1
          })) {
            break;
          } else {
            this.y -= 1;
            if (this.vy > 0) {
              this.vy = 0;
            }
          }
        }
        move_x -= go;
        this.x += go;
      }
      results = [];
      while (Math.abs(move_y) > resolution) {
        go = Math.sign(move_y) * resolution;
        if (world.collision({
          x: this.x,
          y: this.y + go + this.height
        })) {
          this.vy = 0;
          this.grounded = true;
          break;
        }
        move_y -= go;
        results.push(this.y += go);
      }
      return results;
    }

  };

  gravity = 0.5;

  return SimpleActor;

}).call(this);

// @jump_height = @y - view.toWorld(editor.mouse).y

// if @jump
// 	console.log world.collision({@x, y: @y + i + @height}) for i in [0..5]
// 	console.log @vy, world.collision({@x, y: @y + @vy + @height})

// console.log "RES", world.collision({@x, y: @y + resolution + @height})

// @grounded = world.collision({@x, y: @y + 1 + @height}) #or world.collision({@x, y: @y + @vy + @height}) or world.collision({@x, y: @y + 4 + @height})

// if @grounded and @jump
// 	@vy = -Math.sqrt(2 * gravity * @jump_height)


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, TAU, Tree;

Entity = __webpack_require__(3);

TAU = Math.PI * 2;

module.exports = Tree = class Tree extends Entity {
  constructor() {
    super();
    this.leaf_point_names = [];
    this.structure.addPoint("base");
    this.bbox_padding = 60;
  }

  initLayout() {}

  branch({from, to, juice, angle}) {
    var leaf, leaf_point, length, name, width;
    name = to;
    length = Math.sqrt(juice * 1000) * (Math.random() + 1);
    width = Math.sqrt(juice * 20) + 1;
    this.structure.addSegment({
      from,
      name,
      length,
      width,
      color: "#926B2E"
    });
    this.structure.points[name].x = this.structure.points[from].x + Math.sin(angle) * length;
    this.structure.points[name].y = this.structure.points[from].y + Math.cos(angle) * length;
    if (--juice > 0) {
      // @branch({from: name, to: "#{to}-1", juice, angle: angle + (Math.random() - 1/2) * TAU/4})
      // @branch({from: name, to: "#{to}-2", juice, angle: angle + (Math.random() - 1/2) * TAU/4})
      this.branch({
        from: name,
        to: `${to}-a`,
        juice,
        angle: angle + Math.random() * TAU / 8
      });
      this.branch({
        from: name,
        to: `${to}-b`,
        juice,
        angle: angle - Math.random() * TAU / 8
      });
      if (Math.random() < 0.2) {
        return this.branch({
          from: name,
          to: `${to}-c`,
          juice,
          angle
        });
      }
    } else {
      leaf_point = this.structure.points[name];
      leaf = this.leaf(leaf_point);
      if (leaf != null) {
        return this.leaf_point_names.push(name);
      }
    }
  }

  leaf(leaf) {
    leaf.radius = Math.random() * 15 + 15;
    leaf.scale_x = 2;
    leaf.scale_y = 1;
    leaf.color = "#627318"; //"#363D1B"
    return leaf;
  }

  draw(ctx) {
    var i, leaf, leaf_point_name, len, ref, ref1, results, segment, segment_name;
    ref = this.structure.segments;
    for (segment_name in ref) {
      segment = ref[segment_name];
      ctx.beginPath();
      ctx.moveTo(segment.a.x, segment.a.y);
      ctx.lineTo(segment.b.x, segment.b.y);
      ctx.lineWidth = segment.width;
      ctx.lineCap = "round";
      ctx.strokeStyle = segment.color;
      ctx.stroke();
    }
    ref1 = this.leaf_point_names;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      leaf_point_name = ref1[i];
      leaf = this.structure.points[leaf_point_name];
      ctx.beginPath();
      results.push(ctx.arc(leaf.x, leaf.y, leaf.radius, 0, TAU));
    }
    return results;
  }

};

// ctx.save()
// ctx.beginPath()
// ctx.translate(leaf.x, leaf.y)
// ctx.scale(leaf.scale_x, leaf.scale_y)
// ctx.arc(0, 0, leaf.radius, 0, TAU)
// ctx.fillStyle = leaf.color
// ctx.fill()
// ctx.restore()


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Bow, Entity, TAU, addEntityClass;

Entity = __webpack_require__(3);

({addEntityClass} = __webpack_require__(0));

TAU = Math.PI * 2;

module.exports = Bow = (function() {
  class Bow extends Entity {
    constructor() {
      var point, point_name, ref;
      super();
      this.height = 30;
      this.fistmele = 6;
      this.draw_distance = 0;
      this.structure.addPoint("grip");
      this.structure.addSegment({
        from: "grip",
        to: "top",
        name: "upper limb",
        length: 10
      });
      this.structure.addSegment({
        from: "grip",
        to: "bottom",
        name: "lower limb",
        length: 10
      });
      this.structure.addSegment({
        from: "grip",
        name: "serving",
        length: this.fistmele
      });
      ref = this.structure.points;
      for (point_name in ref) {
        point = ref[point_name];
        point.vx = 0;
        point.vy = 0;
      }
      this.bbox_padding = 20;
    }

    initLayout() {
      this.structure.points.serving.x -= this.fistmele;
      return this.layout();
    }

    step(world) {
      return this.layout();
    }

    layout() {
      var bottom, bow_angle, grip, serving, top;
      ({top, bottom, grip, serving} = this.structure.points);
      bow_angle = Math.atan2(grip.y - serving.y, grip.x - serving.x) - TAU / 4;
      top.x = grip.x + this.height / 2 * Math.cos(bow_angle) - this.fistmele * Math.sin(-bow_angle);
      top.y = grip.y + this.height / 2 * Math.sin(bow_angle) - this.fistmele * Math.cos(bow_angle);
      bottom.x = grip.x - this.height / 2 * Math.cos(bow_angle) - this.fistmele * Math.sin(-bow_angle);
      return bottom.y = grip.y - this.height / 2 * Math.sin(bow_angle) - this.fistmele * Math.cos(bow_angle);
    }

    draw(ctx) {
      var arc_r, bottom, bow_angle, center_x, center_y, grip, serving, top;
      ({top, bottom, grip, serving} = this.structure.points);
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(serving.x, serving.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.beginPath();
      center_x = (top.x + bottom.x) / 2;
      center_y = (top.y + bottom.y) / 2;
      bow_angle = Math.atan2(grip.y - serving.y, grip.x - serving.x) - TAU / 4;
      ctx.save();
      ctx.translate(grip.x, grip.y);
      ctx.rotate(bow_angle);
      arc_r = this.fistmele;
      ctx.beginPath();
      ctx.save();
      ctx.translate(0, -arc_r);
      ctx.save();
      ctx.scale(this.height / 2 / arc_r + 0.1, 1);
      ctx.arc(0, -0.5, arc_r, 0, TAU / 2);
      ctx.restore();
      ctx.save();
      ctx.scale(this.height / 2 / arc_r, 0.7);
      ctx.arc(0, 0, arc_r - 0.1, TAU / 2, 0, true);
      ctx.restore();
      ctx.closePath();
      ctx.fillStyle = "#AB7939";
      ctx.fill();
      ctx.restore();
      return ctx.restore();
    }

  };

  addEntityClass(Bow);

  return Bow;

}).call(this);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var Arrow, Entity, TAU, addEntityClass;

Entity = __webpack_require__(3);

({addEntityClass} = __webpack_require__(0));

TAU = Math.PI * 2;

module.exports = Arrow = (function() {
  class Arrow extends Entity {
    constructor() {
      var point, point_name, ref;
      super();
      this.length = 20;
      this.structure.addPoint("tip");
      this.structure.addSegment({
        from: "tip",
        to: "nock",
        name: "shaft",
        length: this.length
      });
      ref = this.structure.points;
      for (point_name in ref) {
        point = ref[point_name];
        point.vx = 0;
        point.vy = 0;
      }
      this.bbox_padding = 20;
    }

    initLayout() {
      return this.structure.points.tip.x += this.length;
    }

    step(world) {
      var angle, i, nock, ref, steps, tip;
      // TODO: more physical physics, i.e. if dropped completely sideways, maybe end up lying on the ground
      ({tip, nock} = this.structure.points);
      tip.vy += 0.1;
      steps = 10;
      for (i = 0, ref = steps; (0 <= ref ? i <= ref : i >= ref); 0 <= ref ? i++ : i--) {
        if (world.collision(this.toWorld(tip))) {
          tip.vx = 0;
          tip.vy = 0;
          nock.vx = 0;
          nock.vy = 0;
          break;
        }
        tip.x += tip.vx / steps;
        tip.y += tip.vy / steps;
      }
      angle = Math.atan2(tip.y - nock.y, tip.x - nock.x);
      nock.x = tip.x - Math.cos(angle) * this.length;
      return nock.y = tip.y - Math.sin(angle) * this.length;
    }

    draw(ctx) {
      var angle, nock, tip;
      ({tip, nock} = this.structure.points);
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(nock.x, nock.y);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#74552B";
      ctx.stroke();
      angle = Math.atan2(tip.y - nock.y, tip.x - nock.x) + TAU / 4;
      ctx.save();
      ctx.translate(tip.x, tip.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-2, 2);
      ctx.lineTo(0, 1);
      ctx.lineTo(+2, 2);
      ctx.fillStyle = "#2D1813";
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(nock.x, nock.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.translate(0, -4);
      ctx.moveTo(0, 0);
      ctx.lineTo(-2, 2);
      ctx.lineTo(-2, 4);
      ctx.lineTo(0, 3);
      ctx.lineTo(+2, 4);
      ctx.lineTo(+2, 2);
      ctx.fillStyle = "#B1280A";
      ctx.fill();
      return ctx.restore();
    }

  };

  addEntityClass(Arrow);

  return Arrow;

}).call(this);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Editor, Mouse, Player, SavannaGrass, View, World, animate, canvas, ctx, e, editor, keyboard, mouse, terrain, view, view_smoothness, view_to, world;

Math.seedrandom("A world");

View = __webpack_require__(9);

Mouse = __webpack_require__(25);

Editor = __webpack_require__(26);

World = __webpack_require__(50);

keyboard = __webpack_require__(18);

SavannaGrass = __webpack_require__(51);

__webpack_require__(52);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(53);

__webpack_require__(54);

Player = __webpack_require__(55);

__webpack_require__(21);

__webpack_require__(22);

world = new World;

terrain = new SavannaGrass;

world.entities.push(terrain);

terrain.x = 0;

terrain.y = 0;

terrain.generate();

canvas = document.createElement("canvas");

document.body.appendChild(canvas);

ctx = canvas.getContext("2d");

view = new View;

view_to = new View;

view_smoothness = 7;

mouse = new Mouse(canvas);

editor = this.editor = new Editor(world, view, view_to, canvas, mouse);

try {
  editor.load();
} catch (error) {
  e = error;
  if (typeof console !== "undefined" && console !== null) {
    if (typeof console.error === "function") {
      console.error("Failed to load save:", e);
    }
  }
}

try {
  if (!isNaN(localStorage.view_center_x)) {
    view_to.center_x = view.center_x = parseFloat(localStorage.view_center_x);
  }
  if (!isNaN(localStorage.view_center_y)) {
    view_to.center_y = view.center_y = parseFloat(localStorage.view_center_y);
  }
  if (!isNaN(localStorage.view_scale)) {
    view_to.scale = view.scale = parseFloat(localStorage.view_scale);
  }
} catch (error) {}

setInterval(function() {
  if (editor.editing) {
    // TODO: should probably only save if you pan/zoom
    localStorage.view_center_x = view.center_x;
    localStorage.view_center_y = view.center_y;
    return localStorage.view_scale = view_to.scale;
  }
}, 200);

(animate = function() {
  var entity, i, len, player, ref;
  if (window.CRASHED) {
    return;
  }
  requestAnimationFrame(animate);
  if (canvas.width !== innerWidth) {
    canvas.width = innerWidth;
  }
  if (canvas.height !== innerHeight) {
    canvas.height = innerHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (editor.editing && (editor.entities_bar.hovered_cell || ((editor.hovered_points.length || editor.hovered_entities.length) && !editor.selection_box))) {
    canvas.classList.add("grabbable");
  } else {
    canvas.classList.remove("grabbable");
  }
  if (!editor.editing) {
    ref = world.entities;
    // when entity isnt editor.editing_entity and entity not in editor.dragging_entities
    for (i = 0, len = ref.length; i < len; i++) {
      entity = ref[i];
      entity.step(world, view, mouse);
    }
    
    // TODO: allow margin of offcenterednses
    player = world.getEntitiesOfType(Player)[0];
    if (player) {
      view_to.center_x = player.x;
      view_to.center_y = player.y;
    }
  }
  view.width = canvas.width;
  view.height = canvas.height;
  view.easeTowards(view_to, view_smoothness);
  if (editor.editing) {
    editor.step();
  }
  mouse.resetForNextStep();
  world.drawBackground(ctx, view);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(view.scale, view.scale);
  ctx.translate(-view.center_x, -view.center_y);
  world.draw(ctx, view);
  if (editor.editing) {
    editor.draw(ctx, view);
  }
  ctx.restore();
  editor.updateGUI();
  return keyboard.resetForNextStep();
})();


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var Mouse;

module.exports = Mouse = class Mouse {
  constructor(canvas) {
    this.x = -2e308;
    this.y = -2e308;
    this.LMB = {
      down: false,
      pressed: false,
      released: false
    };
    this.MMB = {
      down: false,
      pressed: false,
      released: false
    };
    this.RMB = {
      down: false,
      pressed: false,
      released: false
    };
    this.double_clicked = false;
    
    // TODO: maybe have an init / initListeners / addListeners method?
    // doesn't seem good to add listeners in a constructor
    addEventListener("mousemove", (e) => {
      this.x = e.clientX;
      return this.y = e.clientY;
    });
    canvas.addEventListener("mousedown", (e) => {
      var MB;
      MB = this[`${"LMR"[e.button]}MB`];
      MB.down = true;
      return MB.pressed = true;
    });
    addEventListener("mouseup", (e) => {
      var MB;
      MB = this[`${"LMR"[e.button]}MB`];
      MB.down = false;
      return MB.released = true;
    });
    canvas.addEventListener("dblclick", (e) => {
      var MB;
      MB = this[`${"LMR"[e.button]}MB`];
      MB.pressed = true;
      return this.double_clicked = true;
    });
  }

  resetForNextStep() {
    this.LMB.pressed = false;
    this.MMB.pressed = false;
    this.RMB.pressed = false;
    this.LMB.released = false;
    this.MMB.released = false;
    this.RMB.released = false;
    return this.double_clicked = false;
  }

};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

  // TODO: reasonable terrain editing
  // TODO: shift+select (and alternatively ctrl+select)
var AnimBar, BoneStructure, E, Editor, EntitiesBar, Entity, Pose, ReactDOM, TAU, Terrain, TerrainBar, distance, distanceToLineSegment, entity_classes, fs, path,
  indexOf = [].indexOf;

ReactDOM = __webpack_require__(6);

E = __webpack_require__(2);

EntitiesBar = __webpack_require__(38);

AnimBar = __webpack_require__(40);

TerrainBar = __webpack_require__(43);

Terrain = __webpack_require__(7);

Entity = __webpack_require__(4);

Pose = __webpack_require__(5);

BoneStructure = __webpack_require__(16);

({distanceToLineSegment, distance, entity_classes} = __webpack_require__(0));

TAU = Math.PI * 2;

__webpack_require__(45);

fs =  true ? __webpack_require__(14) : undefined;

path =  true ? __webpack_require__(15) : undefined;

if (!fs.readFileSync) {
  // XXX: hack for webpack
  // TODO: use ifdef conditionals or something
  fs = null;
}

if (!path.join) {
  path = null;
}

module.exports = Editor = class Editor {
  constructor(world, view1, view_to, canvas, mouse) {
    var handle_scroll;
    this.world = world;
    this.view = view1;
    this.view_to = view_to;
    this.mouse = mouse;
    this.editing = true;
    this.selected_entities = [];
    this.hovered_entities = [];
    this.selected_points = [];
    this.hovered_points = [];
    this.selection_box = null;
    this.editing_entity = null;
    this.editing_entity_anim_name = null;
    // @editing_entity_pose_name = null
    // @editing_entity_animation_name = null
    this.editing_entity_animation_frame_index = null;
    this.dragging_points = [];
    this.dragging_segments = [];
    this.dragging_entities = [];
    this.drag_offsets = [];
    this.view_drag_start_in_world = null;
    this.view_drag_momentum = {
      x: 0,
      y: 0
    };
    this.last_click_time = null;
    this.sculpt_mode = false;
    this.brush_size = 50;
    // @sculpt_adding = no
    // @sculpt_removing = no
    this.sculpt_additive = true;
    this.sculpting = false;
    this.undos = [];
    this.redos = [];
    this.clipboard = {};
    this.warning_message = null;
    this.show_warning = false;
    this.warning_tid = -1;
    this.react_root_el = document.createElement("div");
    this.react_root_el.className = "react-root";
    document.body.appendChild(this.react_root_el);
    this.renderDOM();
    if (fs != null) {
      this.save_path = "world.json";
    }
    // @save_path = path.join(nw.App.dataPath, "world.json")
    this.grab_start = null;
    addEventListener("contextmenu", (e) => {
      var entity, menu, modifyPose, ref, ref1;
      e.preventDefault();
      if (!this.editing) {
        return;
      }
      // TODO: context menus outside of NW.js, in the browser
      menu = new nw.Menu;
      
      // if @selected_entities.length is 0
      if (this.hovered_entities.length && (ref = this.hovered_entities[0], indexOf.call(this.selected_entities, ref) < 0)) {
        this.selected_entities = (function() {
          var j, len, ref1, results;
          ref1 = this.hovered_entities;
          results = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            entity = ref1[j];
            results.push(entity);
          }
          return results;
        }).call(this);
      }
      menu.append(new nw.MenuItem({
        label: 'Undo',
        click: () => {
          return this.undo();
        },
        enabled: this.undos.length
      }));
      menu.append(new nw.MenuItem({
        label: 'Redo',
        click: () => {
          return this.redo();
        },
        enabled: this.redos.length
      }));
      menu.append(new nw.MenuItem({
        type: 'separator'
      }));
      menu.append(new nw.MenuItem({
        label: 'Cut',
        click: () => {
          return this.cut();
        },
        enabled: this.selected_entities.length
      }));
      menu.append(new nw.MenuItem({
        label: 'Copy',
        click: () => {
          return this.copy();
        },
        enabled: this.selected_points.length || this.selected_entities.length
      }));
      menu.append(new nw.MenuItem({
        label: 'Paste',
        click: () => {
          return this.paste();
        },
        enabled: this.editing_entity ? this.clipboard.point_positions != null : (ref1 = this.clipboard.entities) != null ? ref1.length : void 0
      }));
      menu.append(new nw.MenuItem({
        label: 'Delete',
        click: () => {
          return this.delete();
        },
        enabled: this.selected_entities.length
      }));
      menu.append(new nw.MenuItem({
        label: 'Select All',
        click: () => {
          return this.selectAll();
        },
        enabled: this.world.entities.length
      }));
      menu.append(new nw.MenuItem({
        type: 'separator'
      }));
      if (this.editing_entity) {
        modifyPose = (fn) => {
          var EntityClass, frame_index, new_pose, old_pose;
          EntityClass = entity_classes[this.editing_entity._class_];
          frame_index = this.editing_entity_animation_frame_index;
          if (frame_index != null) {
            old_pose = EntityClass.animations[this.editing_entity_anim_name][frame_index];
          } else {
            old_pose = this.editing_entity.structure.getPose();
          }
          new_pose = fn(old_pose);
          this.editing_entity.structure.setPose(new_pose);
          if (frame_index != null) {
            EntityClass.animations[this.editing_entity_anim_name][frame_index] = new_pose;
          } else {
            EntityClass.poses[this.editing_entity_anim_name] = new_pose;
          }
          return Entity.saveAnimations(EntityClass);
        };
        
        // TODO: allow flipping the current pose, just don't save it? or save the world where it's stored?
        // also, allow flipping terrain
        menu.append(new nw.MenuItem({
          label: 'Flip Pose Horizontally',
          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose",
          click: () => {
            return modifyPose(Pose.horizontallyFlip);
          }
        }));
        menu.append(new nw.MenuItem({
          label: 'Flip Pose Vertically',
          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose",
          click: () => {
            return modifyPose(Pose.verticallyFlip);
          }
        }));
        menu.append(new nw.MenuItem({
          type: 'separator'
        }));
        menu.append(new nw.MenuItem({
          label: 'Finish Editing Entity',
          click: () => {
            return this.finishEditingEntity();
          }
        }));
      } else {
        menu.append(new nw.MenuItem({
          label: 'Edit Entity',
          click: () => {
            return this.editEntity(this.selected_entities[0]);
          },
          enabled: this.selected_entities.length
        }));
      }
      menu.popup(e.x, e.y);
      return false;
    });
    handle_scroll = (e) => {
      var current_center_x, current_center_y, current_scale, mouse_after_preliminary_scale, pivot, zoom_factor;
      if (e.target !== canvas) {
        return;
      }
      zoom_factor = 1.2;
      current_scale = this.view.scale;
      current_center_x = this.view.center_x;
      current_center_y = this.view.center_y;
      this.view.scale = this.view_to.scale;
      this.view.center_x = this.view_to.center_x;
      this.view.center_y = this.view_to.center_y;
      pivot = this.view.toWorld({
        x: e.clientX,
        y: e.clientY
      });
      this.view_to.scale = e.detail < 0 || e.wheelDelta > 0 ? this.view_to.scale * zoom_factor : this.view_to.scale / zoom_factor;
      this.view.scale = this.view_to.scale;
      mouse_after_preliminary_scale = this.view.toWorld({
        x: e.clientX,
        y: e.clientY
      });
      this.view_to.center_x += pivot.x - mouse_after_preliminary_scale.x;
      this.view_to.center_y += pivot.y - mouse_after_preliminary_scale.y;
      this.view.scale = current_scale;
      this.view.center_x = current_center_x;
      return this.view.center_y = current_center_y;
    };
    addEventListener("mousewheel", handle_scroll);
    addEventListener("DOMMouseScroll", handle_scroll);
    addEventListener("keydown", (e) => {
      // console.log e.keyCode
      if (e.target.tagName.match(/input|textarea|select|button/i)) {
        return;
      }
      switch (e.keyCode) {
        case 32:
        case 80: // Space or P
          return this.toggleEditing();
        case 46: // Delete
          return this.delete();
        case 90: // Z
          if (e.ctrlKey) {
            if (e.shiftKey) {
              return this.redo();
            } else {
              return this.undo();
            }
          }
          break;
        case 89: // Y
          if (e.ctrlKey) {
            return this.redo();
          }
          break;
        case 88: // X
          if (e.ctrlKey) {
            return this.cut();
          }
          break;
        case 67: // C
          if (e.ctrlKey) {
            return this.copy();
          }
          break;
        case 86: // V
          if (e.ctrlKey) {
            return this.paste();
          }
          break;
        case 65: // A
          if (e.ctrlKey) {
            return this.selectAll();
          }
      }
    });
  }

  save() {
    var json;
    json = JSON.stringify(this.world, null, "\t");
    if (fs != null) {
      return fs.writeFileSync(this.save_path, json);
    } else {
      return localStorage["Skele2D World"] = json;
    }
  }

  load() {
    var json, req;
    if (fs != null) {
      json = fs.readFileSync(this.save_path);
    } else {
      json = localStorage["Skele2D World"];
    }
    if (json) {
      if (json) {
        return this.world.fromJSON(JSON.parse(json));
      }
    } else {
      req = new XMLHttpRequest();
      req.addEventListener("load", (e) => {
        json = req.responseText;
        if (json) {
          return this.world.fromJSON(JSON.parse(json));
        }
      });
      req.open("GET", "world.json");
      return req.send();
    }
  }

  discardSave() {
    if (fs != null) {
      return fs.unlinkSync(this.save_path);
    } else {
      return delete localStorage["Skele2D World"];
    }
  }

  savePose() {
    var EntityClass;
    if (this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose") {
      EntityClass = entity_classes[this.editing_entity._class_];
      if (this.editing_entity_animation_frame_index != null) {
        EntityClass.animations[this.editing_entity_anim_name][this.editing_entity_animation_frame_index] = this.editing_entity.structure.getPose();
      } else {
        EntityClass.poses[this.editing_entity_anim_name] = this.editing_entity.structure.getPose();
      }
      return Entity.saveAnimations(EntityClass);
    }
  }

  toJSON() {
    var editing_entity_id, entity, point, point_name, ref, ref1, selected_entity_ids, selected_point_names;
    // TODO: make animation stuff undoable
    selected_entity_ids = (function() {
      var j, len, ref, results;
      ref = this.selected_entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        results.push(entity.id);
      }
      return results;
    }).call(this);
    editing_entity_id = (ref = this.editing_entity) != null ? ref.id : void 0;
    selected_point_names = [];
    if (this.editing_entity != null) {
      ref1 = this.editing_entity.structure.points;
      for (point_name in ref1) {
        point = ref1[point_name];
        if (indexOf.call(this.selected_points, point) >= 0) {
          selected_point_names.push(point_name);
        }
      }
    }
    return {world: this.world, selected_entity_ids, editing_entity_id, selected_point_names};
  }

  fromJSON(state) {
    var entity, entity_id, j, k, len, len1, point_name, ref, ref1, results;
    this.world.fromJSON(state.world);
    this.hovered_entities = [];
    this.hovered_points = [];
    this.selected_entities = [];
    this.selected_points = [];
    ref = state.selected_entity_ids;
    for (j = 0, len = ref.length; j < len; j++) {
      entity_id = ref[j];
      entity = this.world.getEntityByID(entity_id);
      if (entity != null) {
        this.selected_entities.push(entity);
      }
    }
    this.editing_entity = this.world.getEntityByID(state.editing_entity_id);
    if (this.editing_entity != null) {
      ref1 = state.selected_point_names;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        point_name = ref1[k];
        results.push(this.selected_points.push(this.editing_entity.structure.points[point_name]));
      }
      return results;
    }
  }

  undoable(fn) {
    this.undos.push(JSON.stringify(this));
    this.redos = [];
    if (fn != null) {
      fn();
      return this.save();
    }
  }

  undo() {
    return this.undo_or_redo(this.undos, this.redos);
  }

  redo() {
    return this.undo_or_redo(this.redos, this.undos);
  }

  undo_or_redo(undos, redos) {
    if (undos.length === 0) {
      return;
    }
    redos.push(JSON.stringify(this));
    this.fromJSON(JSON.parse(undos.pop()));
    return this.save();
  }

  selectAll() {
    var entity, point, point_name;
    if (this.editing_entity) {
      return this.selected_points = (function() {
        var ref, results;
        ref = this.editing_entity.structure.points;
        results = [];
        for (point_name in ref) {
          point = ref[point_name];
          results.push(point);
        }
        return results;
      }).call(this);
    } else {
      return this.selected_entities = (function() {
        var j, len, ref, results;
        ref = this.world.entities;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          entity = ref[j];
          results.push(entity);
        }
        return results;
      }).call(this);
    }
  }

  delete() {
    var e, ent_def, plural;
    if (this.selected_points.length) {
      plural = this.selected_points.length > 1;
      this.undoable(() => {
        var point, point_name, ref, ref1, ref2, ref3, segment, segment_name;
        ref = this.editing_entity.structure.segments;
        for (segment_name in ref) {
          segment = ref[segment_name];
          if ((ref1 = segment.a, indexOf.call(this.selected_points, ref1) >= 0) || (ref2 = segment.b, indexOf.call(this.selected_points, ref2) >= 0)) {
            delete this.editing_entity.structure.segments[segment_name];
          }
        }
        ref3 = this.editing_entity.structure.points;
        for (point_name in ref3) {
          point = ref3[point_name];
          if (indexOf.call(this.selected_points, point) >= 0) {
            delete this.editing_entity.structure.points[point_name];
          }
        }
        this.selected_points = [];
        return this.dragging_points = [];
      });
      try {
        this.editing_entity.draw(document.createElement("canvas").getContext("2d"), new View);
      } catch (error) {
        e = error;
        this.undo();
        if (plural) {
          alert("Entity needs one or more of those points to render");
        } else {
          alert("Entity needs that point to render");
        }
        return;
      }
      try {
        ent_def = JSON.parse(JSON.stringify(this.editing_entity));
        this.editing_entity.step(this.world);
        return this.editing_entity.fromJSON(ent_def);
      } catch (error) {
        e = error;
        this.undo();
        console.warn("Entity failed to step after deletion, with", e);
        if (plural) {
          alert("Entity needs one or more of those points to step");
        } else {
          alert("Entity needs that point to step");
        }
      }
    } else {
      return this.undoable(() => {
        var entity, index, j, len, ref;
        ref = this.selected_entities;
        for (j = 0, len = ref.length; j < len; j++) {
          entity = ref[j];
          // entity.destroy()
          entity.destroyed = true;
          index = this.world.entities.indexOf(entity);
          if (index >= 0) {
            this.world.entities.splice(index, 1);
          }
        }
        this.selected_entities = [];
        return this.finishEditingEntity();
      });
    }
  }

  cut() {
    this.copy();
    return this.delete();
  }

  copy() {
    var entity;
    if (this.selected_points.length) {
      return alert("Copying points is not supported");
    } else {
      // clipboard.point_positions = {}
      return this.clipboard.entities = (function() {
        var j, len, ref, results;
        ref = this.selected_entities;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          entity = ref[j];
          results.push({
            json: JSON.stringify(entity)
          });
        }
        return results;
      }).call(this);
    }
  }

  paste() {
    if (this.editing_entity) {
      return alert("Pasting points is not supported");
    } else {
      return this.undoable(() => {
        var center, centroid, centroid_in_world, centroids, divisor, ent_def, entity, j, json, k, len, len1, mouse_in_world, new_entities, point, point_name, results;
        this.selected_entities = [];
        new_entities = (function() {
          var j, len, ref, results;
          ref = this.clipboard.entities;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            ({json} = ref[j]);
            ent_def = JSON.parse(json);
            delete ent_def.id;
            entity = Entity.fromJSON(ent_def);
            this.world.entities.push(entity);
            this.selected_entities.push(entity);
            results.push(entity);
          }
          return results;
        }).call(this);
        centroids = (function() {
          var j, len, ref, results;
          results = [];
          for (j = 0, len = new_entities.length; j < len; j++) {
            entity = new_entities[j];
            centroid = {
              x: 0,
              y: 0
            };
            divisor = 0;
            ref = entity.structure.points;
            for (point_name in ref) {
              point = ref[point_name];
              centroid.x += point.x;
              centroid.y += point.y;
              divisor += 1;
            }
            centroid.x /= divisor;
            centroid.y /= divisor;
            centroid_in_world = entity.toWorld(centroid);
            results.push(centroid_in_world);
          }
          return results;
        })();
        center = {
          x: 0,
          y: 0
        };
        for (j = 0, len = centroids.length; j < len; j++) {
          centroid = centroids[j];
          center.x += centroid.x;
          center.y += centroid.y;
        }
        center.x /= centroids.length;
        center.y /= centroids.length;
        mouse_in_world = this.view.toWorld(this.mouse);
        results = [];
        for (k = 0, len1 = new_entities.length; k < len1; k++) {
          entity = new_entities[k];
          entity.x += mouse_in_world.x - center.x;
          results.push(entity.y += mouse_in_world.y - center.y);
        }
        return results;
      });
    }
  }

  toggleEditing() {
    this.editing = !this.editing;
    return this.renderDOM();
  }

  step() {
    var base, base1, closest_dist, closest_entity, dist, dx, dy, entity, entity_within_selection_box, i, j, k, l, len, len1, len2, len3, local_mouse_position, m, min_grab_dist, mouse_in_world, n, point, point_name, point_within_selection_box, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, segment, segment_name;
    mouse_in_world = this.view.toWorld(this.mouse);
    if (this.mouse.LMB.released) {
      if (this.dragging_points.length) {
        this.dragging_points = [];
        this.savePose();
        this.save();
      }
      if (this.dragging_entities.length) {
        this.save();
        ref = this.dragging_entities;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          entity = ref[i];
          if ((entity.vx != null) && (entity.vy != null)) {
            entity.vx = (mouse_in_world.x + this.drag_offsets[i].x - entity.x) / 3;
            entity.vy = (mouse_in_world.y + this.drag_offsets[i].y - entity.y) / 3;
          }
        }
        this.dragging_entities = [];
      }
      if (this.selection_box) {
        if (this.editing_entity) {
          this.selected_points = (function() {
            var k, len1, ref1, results;
            ref1 = this.hovered_points;
            results = [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              entity = ref1[k];
              results.push(entity);
            }
            return results;
          }).call(this);
        } else {
          this.selected_entities = (function() {
            var k, len1, ref1, results;
            ref1 = this.hovered_entities;
            results = [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              entity = ref1[k];
              results.push(entity);
            }
            return results;
          }).call(this);
        }
        this.selection_box = null;
      }
    }
    
    // min_grab_dist = (5 + 5 / Math.min(@view.scale, 1)) / 2
    // min_grab_dist = 8 / Math.min(@view.scale, 5)
    min_grab_dist = 8 / this.view.scale;
    // console.log @view.scale, min_grab_dist
    point_within_selection_box = (entity, point) => {
      var ref1, ref2, ref3, ref4, relative_max_x, relative_max_y, relative_min_x, relative_min_y, relative_x1, relative_x2, relative_y1, relative_y2;
      relative_x1 = this.selection_box.x1 - entity.x;
      relative_y1 = this.selection_box.y1 - entity.y;
      relative_x2 = this.selection_box.x2 - entity.x;
      relative_y2 = this.selection_box.y2 - entity.y;
      relative_min_x = Math.min(relative_x1, relative_x2);
      relative_max_x = Math.max(relative_x1, relative_x2);
      relative_min_y = Math.min(relative_y1, relative_y2);
      relative_max_y = Math.max(relative_y1, relative_y2);
      return (relative_min_x <= (ref1 = point.x) && ref1 <= relative_max_x) && (relative_min_y <= (ref2 = point.y) && ref2 <= relative_max_y) && (relative_min_x <= (ref3 = point.x) && ref3 <= relative_max_x) && (relative_min_y <= (ref4 = point.y) && ref4 <= relative_max_y);
    };
    entity_within_selection_box = (entity) => {
      var ref1, ref2, ref3, ref4, ref5, relative_max_x, relative_max_y, relative_min_x, relative_min_y, relative_x1, relative_x2, relative_y1, relative_y2, segment, segment_name;
      relative_x1 = this.selection_box.x1 - entity.x;
      relative_y1 = this.selection_box.y1 - entity.y;
      relative_x2 = this.selection_box.x2 - entity.x;
      relative_y2 = this.selection_box.y2 - entity.y;
      relative_min_x = Math.min(relative_x1, relative_x2);
      relative_max_x = Math.max(relative_x1, relative_x2);
      relative_min_y = Math.min(relative_y1, relative_y2);
      relative_max_y = Math.max(relative_y1, relative_y2);
      if (Object.keys(entity.structure.segments).length === 0) {
        return false;
      }
      ref1 = entity.structure.segments;
      for (segment_name in ref1) {
        segment = ref1[segment_name];
        if (!((relative_min_x <= (ref2 = segment.a.x) && ref2 <= relative_max_x) && (relative_min_y <= (ref3 = segment.a.y) && ref3 <= relative_max_y) && (relative_min_x <= (ref4 = segment.b.x) && ref4 <= relative_max_x) && (relative_min_y <= (ref5 = segment.b.y) && ref5 <= relative_max_y))) {
          return false;
        }
      }
      return true;
    };
    this.view.center_x -= this.view_drag_momentum.x;
    this.view.center_y -= this.view_drag_momentum.y;
    this.view_to.center_x -= this.view_drag_momentum.x;
    this.view_to.center_y -= this.view_drag_momentum.y;
    this.view_drag_momentum.x *= 0.8;
    this.view_drag_momentum.y *= 0.8;
    this.dragging_points = (function() {
      var k, len1, ref1, results;
      ref1 = this.dragging_points;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        point = ref1[k];
        results.push(this.editing_entity.structure.points[point.name]);
      }
      return results;
    }).call(this);
    this.selected_points = (function() {
      var k, len1, ref1, results;
      ref1 = this.selected_points;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        point = ref1[k];
        results.push(this.editing_entity.structure.points[point.name]);
      }
      return results;
    }).call(this);
    if (this.view_drag_start_in_world) {
      if (this.mouse.MMB.down) {
        this.view.center_x -= mouse_in_world.x - this.view_drag_start_in_world.x;
        this.view.center_y -= mouse_in_world.y - this.view_drag_start_in_world.y;
        this.view_to.center_x = this.view.center_x;
        this.view_to.center_y = this.view.center_y;
        this.view_drag_momentum.x = 0;
        this.view_drag_momentum.y = 0;
      } else {
        this.view_drag_momentum.x = mouse_in_world.x - this.view_drag_start_in_world.x;
        this.view_drag_momentum.y = mouse_in_world.y - this.view_drag_start_in_world.y;
        this.view_drag_start_in_world = null;
      }
    } else if (this.mouse.MMB.pressed) {
      this.view_drag_start_in_world = {
        x: mouse_in_world.x,
        y: mouse_in_world.y
      };
    } else if (this.mouse.double_clicked) {
      // TODO: reject double clicks where the first click was not on the same entity
      // TODO: reject double click and drag
      if (this.hovered_entities.length) {
        if (ref1 = this.hovered_entities[0], indexOf.call(this.selected_entities, ref1) >= 0) {
          this.editEntity(this.hovered_entities[0]);
        }
      } else {
        // TODO: don't exit editing mode if the entity being edited is hovered
        // except there needs to be a visual indication of hover for the editing entity
        // (there would be with the cursor if you could drag segments)
        // unless @editing_entity? and @distanceToEntity(@editing_entity, mouse_in_world) < min_grab_dist
        this.finishEditingEntity();
      }
    } else if (this.dragging_entities.length) {
      ref2 = this.dragging_entities;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        entity = ref2[i];
        entity.x = mouse_in_world.x + this.drag_offsets[i].x;
        entity.y = mouse_in_world.y + this.drag_offsets[i].y;
      }
    } else if (this.dragging_points.length) {
      local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);
      ref3 = this.dragging_points;
      for (i = l = 0, len2 = ref3.length; l < len2; i = ++l) {
        point = ref3[i];
        point.x = local_mouse_position.x + this.drag_offsets[i].x;
        point.y = local_mouse_position.y + this.drag_offsets[i].y;
      }
      if (typeof (base = this.editing_entity.structure).onchange === "function") {
        base.onchange();
      }
    } else if (this.dragging_segments.length) {

    // TODO
    } else if (this.selection_box) {
      this.selection_box.x2 = mouse_in_world.x;
      this.selection_box.y2 = mouse_in_world.y;
      if (this.editing_entity) {
        this.hovered_points = (function() {
          var ref4, results;
          ref4 = this.editing_entity.structure.points;
          results = [];
          for (point_name in ref4) {
            point = ref4[point_name];
            if (point_within_selection_box(this.editing_entity, point)) {
              results.push(point);
            }
          }
          return results;
        }).call(this);
      } else {
        this.hovered_entities = (function() {
          var len3, m, ref4, results;
          ref4 = this.world.entities;
          results = [];
          for (m = 0, len3 = ref4.length; m < len3; m++) {
            entity = ref4[m];
            if (entity_within_selection_box(entity)) {
              results.push(entity);
            }
          }
          return results;
        }).call(this);
      }
    } else if (this.grab_start) {
      if (this.mouse.LMB.down) {
        if (distance(this.mouse, this.grab_start) > 2) {
          if (this.selected_points.length) {
            this.dragPoints(this.selected_points, this.grab_start_in_world);
          } else if (this.selected_entities.length) {
            this.dragEntities(this.selected_entities, this.grab_start_in_world);
          }
          this.grab_start = null;
        }
      } else {
        this.grab_start = null;
      }
    } else if (this.sculpting) {
      if (this.mouse.LMB.down) {
        // if @sculpt_additive

        // else

        local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);
        ref4 = this.editing_entity.structure.points;
        for (point_name in ref4) {
          point = ref4[point_name];
          dx = point.x - local_mouse_position.x;
          dy = point.y - local_mouse_position.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.brush_size) {
            // TODO: additive/subtractative/legit behavior
            point.x += dx / 10;
            point.y += dy / 10;
          }
        }
        if (typeof (base1 = this.editing_entity.structure).onchange === "function") {
          base1.onchange();
        }
      } else {
        this.sculpting = false;
      }
    } else {
      this.hovered_entities = [];
      this.hovered_points = [];
      if (this.editing_entity) {
        local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);
        if (this.editing_entity instanceof Terrain && this.sculpt_mode) {
          this.sculpt_additive = this.editing_entity.structure.pointInPolygon(local_mouse_position);
        } else {
          closest_dist = 2e308;
          ref5 = this.editing_entity.structure.points;
          for (point_name in ref5) {
            point = ref5[point_name];
            dist = distance(local_mouse_position, point);
            if (dist < min_grab_dist && dist < closest_dist) {
              closest_dist = dist;
              this.hovered_points = [point];
            }
          }
          if (!this.hovered_points.length) {
            closest_dist = 2e308;
            ref6 = this.editing_entity.structure.segments;
            for (segment_name in ref6) {
              segment = ref6[segment_name];
              dist = distanceToLineSegment(local_mouse_position, segment.a, segment.b);
              if (dist < ((ref7 = segment.width) != null ? ref7 : 5) && dist < closest_dist) {
                closest_dist = dist;
                this.hovered_segments = [segment];
              }
            }
          }
        }
      } else {
        closest_dist = 2e308;
        closest_entity = null;
        ref8 = this.world.entities;
        for (m = 0, len3 = ref8.length; m < len3; m++) {
          entity = ref8[m];
          dist = this.distanceToEntity(entity, mouse_in_world);
          if (dist < min_grab_dist && (dist < closest_dist || (!(entity instanceof Terrain) && closest_entity instanceof Terrain))) {
            closest_entity = entity;
            closest_dist = dist;
          }
        }
        if (closest_entity != null) {
          this.hovered_entities = [closest_entity];
        }
      }
      if (this.mouse.LMB.pressed) {
        this.dragging_points = [];
        this.dragging_segments = [];
        if (this.editing_entity instanceof Terrain && this.sculpt_mode) {
          this.undoable();
          this.sculpting = true;
        } else {
          if (this.hovered_points.length) {
            if (ref9 = this.hovered_points[0], indexOf.call(this.selected_points, ref9) >= 0) {
              this.grabPoints(this.selected_points, mouse_in_world);
            } else {
              this.grabPoints(this.hovered_points, mouse_in_world);
            }
          } else {
            this.selected_points = [];
            if (this.hovered_entities.length) {
              if (ref10 = this.hovered_entities[0], indexOf.call(this.selected_entities, ref10) >= 0) {
                this.grabEntities(this.selected_entities, mouse_in_world);
              } else {
                this.grabEntities(this.hovered_entities, mouse_in_world);
              }
            } else {
              this.selection_box = {
                x1: mouse_in_world.x,
                y1: mouse_in_world.y,
                x2: mouse_in_world.x,
                y2: mouse_in_world.y
              };
            }
          }
        }
      }
    }
    if (this.editing_entity) {
      if (this.editing_entity.structure instanceof BoneStructure) {
        results = [];
        for (var n = 0; n <= 250; n++) {
          // TODO: and if there isn't an animation frame loaded
          results.push(this.editing_entity.structure.stepLayout());
        }
        return results;
      }
    }
  }

  // TODO: save afterwards at some point
  editEntity(entity) {
    this.editing_entity = entity;
    return this.selected_entities = [entity];
  }

  finishEditingEntity() {
    this.editing_entity = null;
    this.selected_entities = [];
    this.selected_points = [];
    this.dragging_entities = [];
    return this.dragging_points = [];
  }

  distanceToEntity(entity, from_point_in_world) {
    var closest_dist, dist, from_point, point, point_name, ref, ref1, segment, segment_name;
    from_point = entity.fromWorld(from_point_in_world);
    closest_dist = 2e308;
    ref = entity.structure.segments;
    for (segment_name in ref) {
      segment = ref[segment_name];
      dist = distanceToLineSegment(from_point, segment.a, segment.b);
      // dist = Math.max(0, dist - segment.width / 2) if segment.width?
      closest_dist = Math.min(closest_dist, dist);
    }
    ref1 = entity.structure.points;
    for (point_name in ref1) {
      point = ref1[point_name];
      dist = distance(from_point, point);
      // dist = Math.max(0, dist - segment.radius) if segment.radius?
      closest_dist = Math.min(closest_dist, dist);
    }
    return closest_dist;
  }

  grabPoints(points, mouse_in_world) {
    var EntityClass, local_mouse_position, point;
    if (this.editing_entity && this.editing_entity_anim_name === "Current Pose") {
      EntityClass = entity_classes[this.editing_entity._class_];
      if ((EntityClass.poses != null) || (EntityClass.animations != null)) {
        this.warn("No pose is selected. Select a pose to edit.");
        return;
      }
    }
    this.grab_start = {
      x: this.mouse.x,
      y: this.mouse.y
    };
    this.grab_start_in_world = mouse_in_world;
    this.selected_points = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = points.length; j < len; j++) {
        point = points[j];
        results.push(point);
      }
      return results;
    })();
    local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);
    return this.drag_offsets = (function() {
      var j, len, ref, results;
      ref = this.dragging_points;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        point = ref[j];
        results.push({
          x: point.x - local_mouse_position.x,
          y: point.y - local_mouse_position.y
        });
      }
      return results;
    }).call(this);
  }

  dragPoints(points, mouse_in_world) {
    var local_mouse_position, point;
    this.selected_points = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = points.length; j < len; j++) {
        point = points[j];
        results.push(point);
      }
      return results;
    })();
    this.undoable();
    this.dragging_points = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = points.length; j < len; j++) {
        point = points[j];
        results.push(point);
      }
      return results;
    })();
    local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);
    return this.drag_offsets = (function() {
      var j, len, ref, results;
      ref = this.dragging_points;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        point = ref[j];
        results.push({
          x: point.x - local_mouse_position.x,
          y: point.y - local_mouse_position.y
        });
      }
      return results;
    }).call(this);
  }

  grabEntities(entities, mouse_in_world) {
    var entity;
    this.grab_start = {
      x: this.mouse.x,
      y: this.mouse.y
    };
    this.grab_start_in_world = mouse_in_world;
    this.selected_entities = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = entities.length; j < len; j++) {
        entity = entities[j];
        results.push(entity);
      }
      return results;
    })();
    return this.drag_offsets = (function() {
      var j, len, ref, results;
      ref = this.dragging_entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        if (mouse_in_world != null) {
          results.push({
            x: entity.x - mouse_in_world.x,
            y: entity.y - mouse_in_world.y
          });
        } else {
          results.push({
            x: 0,
            y: 0
          });
        }
      }
      return results;
    }).call(this);
  }

  dragEntities(entities, mouse_in_world) {
    var entity;
    this.selected_entities = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = entities.length; j < len; j++) {
        entity = entities[j];
        results.push(entity);
      }
      return results;
    })();
    this.undoable();
    this.dragging_entities = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = entities.length; j < len; j++) {
        entity = entities[j];
        results.push(entity);
      }
      return results;
    })();
    return this.drag_offsets = (function() {
      var j, len, ref, results;
      ref = this.dragging_entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        if (mouse_in_world != null) {
          results.push({
            x: entity.x - mouse_in_world.x,
            y: entity.y - mouse_in_world.y
          });
        } else {
          results.push({
            x: 0,
            y: 0
          });
        }
      }
      return results;
    }).call(this);
  }

  draw(ctx, view) {
    var bbox, draw_points, draw_segments, entity, j, k, l, len, len1, len2, len3, m, mouse_in_world, point, ref, ref1, ref2, ref3;
    draw_points = (entity, radius, fillStyle) => {
      var point, point_name, ref, results;
      ref = entity.structure.points;
      results = [];
      for (point_name in ref) {
        point = ref[point_name];
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius / view.scale, 0, TAU);
        // ctx.lineWidth = 1 / view.scale
        // ctx.strokeStyle = "black"
        // ctx.stroke()
        ctx.fillStyle = fillStyle;
        results.push(ctx.fill());
      }
      return results;
    };
    // ctx.fillText(point_name, point.x + radius * 2, point.y)
    draw_segments = (entity, lineWidth, strokeStyle) => {
      var ref, results, segment, segment_name;
      ref = entity.structure.segments;
      results = [];
      for (segment_name in ref) {
        segment = ref[segment_name];
        ctx.beginPath();
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
        ctx.lineWidth = lineWidth / view.scale;
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeStyle;
        results.push(ctx.stroke());
      }
      return results;
    };
    if (this.editing_entity) {
      ctx.save();
      ctx.translate(this.editing_entity.x, this.editing_entity.y);
      // unless @editing_entity instanceof Terrain and @sculpt_mode
      draw_points(this.editing_entity, 3, "rgba(255, 0, 0, 1)");
      draw_segments(this.editing_entity, 1, "rgba(255, 170, 0, 1)");
      ctx.restore();
    }
    ref = this.selected_entities;
    for (j = 0, len = ref.length; j < len; j++) {
      entity = ref[j];
      if (!(entity !== this.editing_entity)) {
        continue;
      }
      ctx.save();
      ctx.translate(entity.x, entity.y);
      draw_points(entity, 2, "rgba(255, 170, 0, 1)");
      draw_segments(entity, 1, "rgba(255, 170, 0, 1)");
      ctx.restore();
    }
    ref1 = this.hovered_entities;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      entity = ref1[k];
      if (!(indexOf.call(this.selected_entities, entity) < 0)) {
        continue;
      }
      ctx.save();
      ctx.translate(entity.x, entity.y);
      draw_points(entity, 2, "rgba(255, 170, 0, 0.2)");
      draw_segments(entity, 1, "rgba(255, 170, 0, 0.5)");
      ctx.restore();
    }
    if (this.editing_entity != null) {
      if (this.editing_entity instanceof Terrain && this.sculpt_mode) {
        mouse_in_world = this.view.toWorld(this.mouse);
        ctx.beginPath();
        // ctx.arc(mouse_in_world.x, mouse_in_world.y, @brush_size / view.scale, 0, TAU)
        ctx.arc(mouse_in_world.x, mouse_in_world.y, this.brush_size, 0, TAU);
        // ctx.lineWidth = 1.5 / view.scale
        // ctx.strokeStyle = "rgba(255, 170, 0, 1)"
        // ctx.stroke()
        ctx.fillStyle = "rgba(0, 155, 255, 0.1)";
        ctx.strokeStyle = "rgba(0, 155, 255, 0.8)";
        ctx.lineWidth = 1 / view.scale;
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.save();
        ctx.translate(this.editing_entity.x, this.editing_entity.y);
        ref2 = this.selected_points;
        // draw_points(@selected_points, 2, "rgba(255, 170, 0, 0.2)")
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          point = ref2[l];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3 / view.scale, 0, TAU);
          ctx.fillStyle = "rgba(255, 0, 0, 1)";
          ctx.fill();
          ctx.lineWidth = 1.5 / view.scale;
          ctx.strokeStyle = "rgba(255, 170, 0, 1)";
          ctx.stroke();
        }
        ctx.restore();
      }
    }
    ref3 = this.selected_entities;
    for (m = 0, len3 = ref3.length; m < len3; m++) {
      entity = ref3[m];
      ctx.strokeStyle = "rgba(255, 170, 0, 1)";
      bbox = entity.bbox();
      ctx.lineWidth = 1 / view.scale;
      ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    if (this.selection_box != null) {
      ctx.save();
      ctx.beginPath();
      if (view.scale === 1) {
        ctx.translate(0.5, 0.5);
      }
      ctx.rect(this.selection_box.x1, this.selection_box.y1, this.selection_box.x2 - this.selection_box.x1, this.selection_box.y2 - this.selection_box.y1);
      ctx.fillStyle = "rgba(0, 155, 255, 0.1)";
      ctx.strokeStyle = "rgba(0, 155, 255, 0.8)";
      ctx.lineWidth = 1 / view.scale;
      ctx.fill();
      ctx.stroke();
      return ctx.restore();
    }
  }

  warn(message, timeout = 2000) {
    this.warning_message = message;
    this.show_warning = true;
    this.renderDOM();
    clearTimeout(this.warning_tid);
    return this.warning_tid = setTimeout(() => {
      this.show_warning = false;
      return this.renderDOM();
    }, timeout);
  }

  renderDOM() {
    var react_root;
    react_root = E(".editor", E(EntitiesBar, {
      editor: this,
      ref: (entities_bar) => {
        this.entities_bar = entities_bar;
      }
    }), E(AnimBar, {
      editor: this,
      ref: (anim_bar) => {
        this.anim_bar = anim_bar;
      }
    }), E(TerrainBar, {
      editor: this,
      ref: (terrain_bar) => {
        this.terrain_bar = terrain_bar;
      }
    }), E(".warning", {
      class: (this.show_warning ? "show" : void 0)
    }, this.warning_message));
    return ReactDOM.render(react_root, this.react_root_el);
  }

  updateGUI() {
    var show;
    if (!this.editing_entity) {
      this.editing_entity_anim_name = "Current Pose";
      this.editing_entity_animation_frame_index = null;
    }
    show = this.editing;
    this.entities_bar.update(show);
    this.anim_bar.update(show);
    return this.terrain_bar.update(show);
  }

};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.2
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(10),ba=__webpack_require__(1),m=__webpack_require__(30),p=__webpack_require__(31),v=__webpack_require__(12),da=__webpack_require__(32),ea=__webpack_require__(33),fa=__webpack_require__(34),ha=__webpack_require__(11);
function A(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}ba?void 0:A("227");
function ia(a,b,c,d,e,f,g,h,k){this._hasCaughtError=!1;this._caughtError=null;var n=Array.prototype.slice.call(arguments,3);try{b.apply(c,n)}catch(r){this._caughtError=r,this._hasCaughtError=!0}}
var B={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){ia.apply(B,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){B.invokeGuardedCallback.apply(this,arguments);if(B.hasCaughtError()){var n=B.clearCaughtError();B._hasRethrowError||(B._hasRethrowError=!0,B._rethrowError=n)}},rethrowCaughtError:function(){return ka.apply(B,arguments)},hasCaughtError:function(){return B._hasCaughtError},clearCaughtError:function(){if(B._hasCaughtError){var a=
B._caughtError;B._caughtError=null;B._hasCaughtError=!1;return a}A("198")}};function ka(){if(B._hasRethrowError){var a=B._rethrowError;B._rethrowError=null;B._hasRethrowError=!1;throw a;}}var la=null,ma={};
function na(){if(la)for(var a in ma){var b=ma[a],c=la.indexOf(a);-1<c?void 0:A("96",a);if(!oa[c]){b.extractEvents?void 0:A("97",a);oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;pa.hasOwnProperty(h)?A("99",h):void 0;pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&qa(k[e],g,h);e=!0}else f.registrationName?(qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:A("98",d,a)}}}}
function qa(a,b,c){ra[a]?A("100",a):void 0;ra[a]=b;sa[a]=b.eventTypes[c].dependencies}var oa=[],pa={},ra={},sa={};function ta(a){la?A("101"):void 0;la=Array.prototype.slice.call(a);na()}function ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ma.hasOwnProperty(c)&&ma[c]===d||(ma[c]?A("102",c):void 0,ma[c]=d,b=!0)}b&&na()}
var va={plugins:oa,eventNameDispatchConfigs:pa,registrationNameModules:ra,registrationNameDependencies:sa,possibleRegistrationNames:null,injectEventPluginOrder:ta,injectEventPluginsByName:ua},wa=null,xa=null,ya=null;function za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=ya(d);B.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function Aa(a,b){null==b?A("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function Ba(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Ca=null;
function Da(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)za(a,b,c[e],d[e]);else c&&za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function Ea(a){return Da(a,!0)}function Fa(a){return Da(a,!1)}var Ga={injectEventPluginOrder:ta,injectEventPluginsByName:ua};
function Ha(a,b){var c=a.stateNode;if(!c)return null;var d=wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?A("231",b,typeof c):void 0;
return c}function Ia(a,b){null!==a&&(Ca=Aa(Ca,a));a=Ca;Ca=null;a&&(b?Ba(a,Ea):Ba(a,Fa),Ca?A("95"):void 0,B.rethrowCaughtError())}function Ja(a,b,c,d){for(var e=null,f=0;f<oa.length;f++){var g=oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=Aa(e,g))}Ia(e,!1)}var Ka={injection:Ga,getListener:Ha,runEventsInBatch:Ia,runExtractedEventsInBatch:Ja},La=Math.random().toString(36).slice(2),C="__reactInternalInstance$"+La,Ma="__reactEventHandlers$"+La;
function Na(a){if(a[C])return a[C];for(;!a[C];)if(a.parentNode)a=a.parentNode;else return null;a=a[C];return 5===a.tag||6===a.tag?a:null}function Oa(a){if(5===a.tag||6===a.tag)return a.stateNode;A("33")}function Pa(a){return a[Ma]||null}var Qa={precacheFiberNode:function(a,b){b[C]=a},getClosestInstanceFromNode:Na,getInstanceFromNode:function(a){a=a[C];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:Oa,getFiberCurrentPropsFromNode:Pa,updateFiberProps:function(a,b){a[Ma]=b}};
function F(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Ra(a,b,c){for(var d=[];a;)d.push(a),a=F(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}function Sa(a,b,c){if(b=Ha(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a)}function Ta(a){a&&a.dispatchConfig.phasedRegistrationNames&&Ra(a._targetInst,Sa,a)}
function Ua(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?F(b):null;Ra(b,Sa,a)}}function Va(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ha(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a))}function Xa(a){a&&a.dispatchConfig.registrationName&&Va(a._targetInst,null,a)}function Ya(a){Ba(a,Ta)}
function Za(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=F(h))g++;h=0;for(var k=f;k;k=F(k))h++;for(;0<g-h;)e=F(e),g--;for(;0<h-g;)f=F(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=F(e);f=F(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=F(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=F(d)}for(d=0;d<e.length;d++)Va(e[d],"bubbled",a);for(a=c.length;0<a--;)Va(c[a],"captured",b)}
var $a={accumulateTwoPhaseDispatches:Ya,accumulateTwoPhaseDispatchesSkipTarget:function(a){Ba(a,Ua)},accumulateEnterLeaveDispatches:Za,accumulateDirectDispatches:function(a){Ba(a,Xa)}};function ab(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var bb={animationend:ab("Animation","AnimationEnd"),animationiteration:ab("Animation","AnimationIteration"),animationstart:ab("Animation","AnimationStart"),transitionend:ab("Transition","TransitionEnd")},cb={},db={};m.canUseDOM&&(db=document.createElement("div").style,"AnimationEvent"in window||(delete bb.animationend.animation,delete bb.animationiteration.animation,delete bb.animationstart.animation),"TransitionEvent"in window||delete bb.transitionend.transition);
function eb(a){if(cb[a])return cb[a];if(!bb[a])return a;var b=bb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in db)return cb[a]=b[c];return a}var fb=eb("animationend"),gb=eb("animationiteration"),hb=eb("animationstart"),ib=eb("transitionend"),jb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kb=null;
function lb(){!kb&&m.canUseDOM&&(kb="textContent"in document.documentElement?"textContent":"innerText");return kb}var G={_root:null,_startText:null,_fallbackText:null};function mb(){if(G._fallbackText)return G._fallbackText;var a,b=G._startText,c=b.length,d,e=nb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);G._fallbackText=e.slice(a,1<d?1-d:void 0);return G._fallbackText}function nb(){return"value"in G._root?G._root.value:G._root[lb()]}
var ob="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),pb={type:null,target:null,currentTarget:v.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function H(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?v.thatReturnsTrue:v.thatReturnsFalse;this.isPropagationStopped=v.thatReturnsFalse;return this}
p(H.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=v.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=v.thatReturnsTrue)},persist:function(){this.isPersistent=v.thatReturnsTrue},isPersistent:v.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<ob.length;a++)this[ob[a]]=null}});H.Interface=pb;H.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;p(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=p({},d.Interface,a);c.extend=d.extend;qb(c);return c};qb(H);
function rb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function sb(a){a instanceof this?void 0:A("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function qb(a){a.eventPool=[];a.getPooled=rb;a.release=sb}var tb=H.extend({data:null}),ub=H.extend({data:null}),vb=[9,13,27,32],wb=m.canUseDOM&&"CompositionEvent"in window,xb=null;m.canUseDOM&&"documentMode"in document&&(xb=document.documentMode);
var yb=m.canUseDOM&&"TextEvent"in window&&!xb,zb=m.canUseDOM&&(!wb||xb&&8<xb&&11>=xb),Ab=String.fromCharCode(32),Bb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Cb=!1;
function Db(a,b){switch(a){case "keyup":return-1!==vb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function Eb(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Fb=!1;function Gb(a,b){switch(a){case "compositionend":return Eb(b);case "keypress":if(32!==b.which)return null;Cb=!0;return Ab;case "textInput":return a=b.data,a===Ab&&Cb?null:a;default:return null}}
function Hb(a,b){if(Fb)return"compositionend"===a||!wb&&Db(a,b)?(a=mb(),G._root=null,G._startText=null,G._fallbackText=null,Fb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return zb?null:b.data;default:return null}}
var Ib={eventTypes:Bb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(wb)b:{switch(a){case "compositionstart":e=Bb.compositionStart;break b;case "compositionend":e=Bb.compositionEnd;break b;case "compositionupdate":e=Bb.compositionUpdate;break b}e=void 0}else Fb?Db(a,c)&&(e=Bb.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=Bb.compositionStart);e?(zb&&(Fb||e!==Bb.compositionStart?e===Bb.compositionEnd&&Fb&&(f=mb()):(G._root=d,G._startText=nb(),Fb=!0)),e=tb.getPooled(e,b,c,d),f?e.data=
f:(f=Eb(c),null!==f&&(e.data=f)),Ya(e),f=e):f=null;(a=yb?Gb(a,c):Hb(a,c))?(b=ub.getPooled(Bb.beforeInput,b,c,d),b.data=a,Ya(b)):b=null;return null===f?b:null===b?f:[f,b]}},Jb=null,Kb={injectFiberControlledHostComponent:function(a){Jb=a}},Lb=null,Mb=null;function Nb(a){if(a=xa(a)){Jb&&"function"===typeof Jb.restoreControlledState?void 0:A("194");var b=wa(a.stateNode);Jb.restoreControlledState(a.stateNode,a.type,b)}}function Ob(a){Lb?Mb?Mb.push(a):Mb=[a]:Lb=a}
function Pb(){return null!==Lb||null!==Mb}function Qb(){if(Lb){var a=Lb,b=Mb;Mb=Lb=null;Nb(a);if(b)for(a=0;a<b.length;a++)Nb(b[a])}}var Rb={injection:Kb,enqueueStateRestore:Ob,needsStateRestore:Pb,restoreStateIfNeeded:Qb};function Sb(a,b){return a(b)}function Tb(a,b,c){return a(b,c)}function Ub(){}var Vb=!1;function Wb(a,b){if(Vb)return a(b);Vb=!0;try{return Sb(a,b)}finally{Vb=!1,Pb()&&(Ub(),Qb())}}
var Xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Xb[a.type]:"textarea"===b?!0:!1}function Zb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}
function $b(a,b){if(!m.canUseDOM||b&&!("addEventListener"in document))return!1;a="on"+a;b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function ac(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function bc(a){var b=ac(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function cc(a){a._valueTracker||(a._valueTracker=bc(a))}function dc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ac(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
var ec=ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fc="function"===typeof Symbol&&Symbol.for,gc=fc?Symbol.for("react.element"):60103,hc=fc?Symbol.for("react.portal"):60106,ic=fc?Symbol.for("react.fragment"):60107,jc=fc?Symbol.for("react.strict_mode"):60108,kc=fc?Symbol.for("react.profiler"):60114,lc=fc?Symbol.for("react.provider"):60109,mc=fc?Symbol.for("react.context"):60110,pc=fc?Symbol.for("react.async_mode"):60111,qc=fc?Symbol.for("react.forward_ref"):60112,rc=fc?Symbol.for("react.timeout"):
60113,sc="function"===typeof Symbol&&Symbol.iterator;function tc(a){if(null===a||"undefined"===typeof a)return null;a=sc&&a[sc]||a["@@iterator"];return"function"===typeof a?a:null}
function uc(a){var b=a.type;if("function"===typeof b)return b.displayName||b.name;if("string"===typeof b)return b;switch(b){case pc:return"AsyncMode";case mc:return"Context.Consumer";case ic:return"ReactFragment";case hc:return"ReactPortal";case kc:return"Profiler("+a.pendingProps.id+")";case lc:return"Context.Provider";case jc:return"StrictMode";case rc:return"Timeout"}if("object"===typeof b&&null!==b)switch(b.$$typeof){case qc:return a=b.render.displayName||b.render.name||"",""!==a?"ForwardRef("+
a+")":"ForwardRef"}return null}function vc(a){var b="";do{a:switch(a.tag){case 0:case 1:case 2:case 5:var c=a._debugOwner,d=a._debugSource;var e=uc(a);var f=null;c&&(f=uc(c));c=d;e="\n    in "+(e||"Unknown")+(c?" (at "+c.fileName.replace(/^.*[\\\/]/,"")+":"+c.lineNumber+")":f?" (created by "+f+")":"");break a;default:e=""}b+=e;a=a.return}while(a);return b}
var wc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xc=Object.prototype.hasOwnProperty,zc={},Ac={};
function Bc(a){if(xc.call(Ac,a))return!0;if(xc.call(zc,a))return!1;if(wc.test(a))return Ac[a]=!0;zc[a]=!0;return!1}function Cc(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function Dc(a,b,c,d){if(null===b||"undefined"===typeof b||Cc(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function I(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b}var J={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){J[a]=new I(a,0,!1,a,null)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];J[b]=new I(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){J[a]=new I(a,2,!1,a.toLowerCase(),null)});
["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(a){J[a]=new I(a,2,!1,a,null)});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){J[a]=new I(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){J[a]=new I(a,3,!0,a.toLowerCase(),null)});
["capture","download"].forEach(function(a){J[a]=new I(a,4,!1,a.toLowerCase(),null)});["cols","rows","size","span"].forEach(function(a){J[a]=new I(a,6,!1,a.toLowerCase(),null)});["rowSpan","start"].forEach(function(a){J[a]=new I(a,5,!1,a.toLowerCase(),null)});var Ec=/[\-:]([a-z])/g;function Fc(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Ec,
Fc);J[b]=new I(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Ec,Fc);J[b]=new I(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Ec,Fc);J[b]=new I(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});J.tabIndex=new I("tabIndex",1,!1,"tabindex",null);
function Gc(a,b,c,d){var e=J.hasOwnProperty(b)?J[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Dc(b,c,e,d)&&(c=null),d||null===e?Bc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function Hc(a,b){var c=b.checked;return p({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Ic(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Jc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Kc(a,b){b=b.checked;null!=b&&Gc(a,"checked",b,!1)}
function Lc(a,b){Kc(a,b);var c=Jc(b.value);if(null!=c)if("number"===b.type){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);b.hasOwnProperty("value")?Mc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Mc(a,b.type,Jc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Nc(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){b=""+a._wrapperState.initialValue;var d=a.value;c||b===d||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==c&&(a.name=c)}function Mc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}
function Jc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}var Oc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Pc(a,b,c){a=H.getPooled(Oc.change,a,b,c);a.type="change";Ob(c);Ya(a);return a}var Qc=null,Rc=null;function Sc(a){Ia(a,!1)}function Tc(a){var b=Oa(a);if(dc(b))return a}
function Uc(a,b){if("change"===a)return b}var Vc=!1;m.canUseDOM&&(Vc=$b("input")&&(!document.documentMode||9<document.documentMode));function Wc(){Qc&&(Qc.detachEvent("onpropertychange",Xc),Rc=Qc=null)}function Xc(a){"value"===a.propertyName&&Tc(Rc)&&(a=Pc(Rc,a,Zb(a)),Wb(Sc,a))}function Yc(a,b,c){"focus"===a?(Wc(),Qc=b,Rc=c,Qc.attachEvent("onpropertychange",Xc)):"blur"===a&&Wc()}function Zc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Tc(Rc)}
function $c(a,b){if("click"===a)return Tc(b)}function ad(a,b){if("input"===a||"change"===a)return Tc(b)}
var bd={eventTypes:Oc,_isInputEventSupported:Vc,extractEvents:function(a,b,c,d){var e=b?Oa(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Uc:Yb(e)?Vc?f=ad:(f=Zc,g=Yc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=$c);if(f&&(f=f(a,b)))return Pc(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Mc(e,"number",e.value)}},cd=H.extend({view:null,detail:null}),dd={Alt:"altKey",
Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ed(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=dd[a])?!!b[a]:!1}function fd(){return ed}
var gd=cd.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:fd,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}}),hd=gd.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null}),id={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},
mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},jd={eventTypes:id,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||
e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Na(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,k=void 0,n=void 0;if("mouseout"===a||"mouseover"===a)g=gd,h=id.mouseLeave,k=id.mouseEnter,n="mouse";else if("pointerout"===a||"pointerover"===a)g=hd,h=id.pointerLeave,k=id.pointerEnter,n="pointer";a=null==f?e:Oa(f);e=null==b?e:Oa(b);h=g.getPooled(h,f,c,d);h.type=n+"leave";h.target=a;h.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=n+"enter";c.target=e;c.relatedTarget=a;Za(h,
c,f,b);return[h,c]}};function kd(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function ld(a){2!==kd(a)?A("188"):void 0}
function md(a){var b=a.alternate;if(!b)return b=kd(a),3===b?A("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return ld(e),a;if(g===d)return ld(e),b;g=g.sibling}A("188")}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:A("189")}}c.alternate!==d?A("190"):void 0}3!==c.tag?A("188"):void 0;return c.stateNode.current===c?a:b}function nd(a){a=md(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function od(a){a=md(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}var pd=H.extend({animationName:null,elapsedTime:null,pseudoElement:null}),qd=H.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),rd=cd.extend({relatedTarget:null});
function sd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var td={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ud={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vd=cd.extend({key:function(a){if(a.key){var b=td[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=sd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?ud[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:fd,charCode:function(a){return"keypress"===
a.type?sd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?sd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),wd=gd.extend({dataTransfer:null}),xd=cd.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:fd}),yd=H.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),zd=gd.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),Ad=[["abort","abort"],[fb,"animationEnd"],[gb,"animationIteration"],[hb,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ib,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Bd={},Cd={};function Dd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Bd[a]=b;Cd[c]=b}
[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],
["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Dd(a,!0)});Ad.forEach(function(a){Dd(a,!1)});
var Ed={eventTypes:Bd,isInteractiveTopLevelEventType:function(a){a=Cd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Cd[a];if(!e)return null;switch(a){case "keypress":if(0===sd(c))return null;case "keydown":case "keyup":a=vd;break;case "blur":case "focus":a=rd;break;case "click":if(2===c.button)return null;case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=gd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
wd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=xd;break;case fb:case gb:case hb:a=pd;break;case ib:a=yd;break;case "scroll":a=cd;break;case "wheel":a=zd;break;case "copy":case "cut":case "paste":a=qd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=hd;break;default:a=H}b=a.getPooled(e,b,c,d);Ya(b);return b}},Fd=Ed.isInteractiveTopLevelEventType,
Gd=[];function Hd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c.return;)c=c.return;c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=Na(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],Ja(a.topLevelType,b,a.nativeEvent,Zb(a.nativeEvent))}var Id=!0;function Kd(a){Id=!!a}function K(a,b){if(!b)return null;var c=(Fd(a)?Ld:Md).bind(null,a);b.addEventListener(a,c,!1)}
function Nd(a,b){if(!b)return null;var c=(Fd(a)?Ld:Md).bind(null,a);b.addEventListener(a,c,!0)}function Ld(a,b){Tb(Md,a,b)}function Md(a,b){if(Id){var c=Zb(b);c=Na(c);null===c||"number"!==typeof c.tag||2===kd(c)||(c=null);if(Gd.length){var d=Gd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Wb(Hd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Gd.length&&Gd.push(a)}}}
var Od={get _enabled(){return Id},setEnabled:Kd,isEnabled:function(){return Id},trapBubbledEvent:K,trapCapturedEvent:Nd,dispatchEvent:Md},Pd={},Qd=0,Rd="_reactListenersID"+(""+Math.random()).slice(2);function Sd(a){Object.prototype.hasOwnProperty.call(a,Rd)||(a[Rd]=Qd++,Pd[a[Rd]]={});return Pd[a[Rd]]}function Td(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ud(a,b){var c=Td(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Td(c)}}function Vd(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Wd=m.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Xd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Yd=null,Zd=null,$d=null,ae=!1;
function be(a,b){if(ae||null==Yd||Yd!==da())return null;var c=Yd;"selectionStart"in c&&Vd(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return $d&&ea($d,c)?null:($d=c,a=H.getPooled(Xd.select,Zd,a,b),a.type="select",a.target=Yd,Ya(a),a)}
var ce={eventTypes:Xd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Sd(e);f=sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?Oa(b):window;switch(a){case "focus":if(Yb(e)||"true"===e.contentEditable)Yd=e,Zd=b,$d=null;break;case "blur":$d=Zd=Yd=null;break;case "mousedown":ae=!0;break;case "contextmenu":case "mouseup":return ae=!1,be(c,d);case "selectionchange":if(Wd)break;
case "keydown":case "keyup":return be(c,d)}return null}};Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa=Qa.getFiberCurrentPropsFromNode;xa=Qa.getInstanceFromNode;ya=Qa.getNodeFromInstance;Ga.injectEventPluginsByName({SimpleEventPlugin:Ed,EnterLeaveEventPlugin:jd,ChangeEventPlugin:bd,SelectEventPlugin:ce,BeforeInputEventPlugin:Ib});
var de="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,ee=Date,fe=setTimeout,ge=clearTimeout,he=void 0;if("object"===typeof performance&&"function"===typeof performance.now){var ie=performance;he=function(){return ie.now()}}else he=function(){return ee.now()};var je=void 0,ke=void 0;
if(m.canUseDOM){var le="function"===typeof de?de:function(){A("276")},L=null,me=null,ne=-1,oe=!1,pe=!1,qe=0,re=33,se=33,te={didTimeout:!1,timeRemaining:function(){var a=qe-he();return 0<a?a:0}},ve=function(a,b){var c=a.scheduledCallback,d=!1;try{c(b),d=!0}finally{ke(a),d||(oe=!0,window.postMessage(ue,"*"))}},ue="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===ue&&(oe=!1,null!==L)){if(null!==L){var b=he();if(!(-1===
ne||ne>b)){a=-1;for(var c=[],d=L;null!==d;){var e=d.timeoutTime;-1!==e&&e<=b?c.push(d):-1!==e&&(-1===a||e<a)&&(a=e);d=d.next}if(0<c.length)for(te.didTimeout=!0,b=0,d=c.length;b<d;b++)ve(c[b],te);ne=a}}for(a=he();0<qe-a&&null!==L;)a=L,te.didTimeout=!1,ve(a,te),a=he();null===L||pe||(pe=!0,le(we))}},!1);var we=function(a){pe=!1;var b=a-qe+se;b<se&&re<se?(8>b&&(b=8),se=b<re?re:b):re=b;qe=a+se;oe||(oe=!0,window.postMessage(ue,"*"))};je=function(a,b){var c=-1;null!=b&&"number"===typeof b.timeout&&(c=he()+
b.timeout);if(-1===ne||-1!==c&&c<ne)ne=c;a={scheduledCallback:a,timeoutTime:c,prev:null,next:null};null===L?L=a:(b=a.prev=me,null!==b&&(b.next=a));me=a;pe||(pe=!0,le(we));return a};ke=function(a){if(null!==a.prev||L===a){var b=a.next,c=a.prev;a.next=null;a.prev=null;null!==b?null!==c?(c.next=b,b.prev=c):(b.prev=null,L=b):null!==c?(c.next=null,me=c):me=L=null}}}else{var xe=new Map;je=function(a){var b={scheduledCallback:a,timeoutTime:0,next:null,prev:null},c=fe(function(){a({timeRemaining:function(){return Infinity},
didTimeout:!1})});xe.set(a,c);return b};ke=function(a){var b=xe.get(a.scheduledCallback);xe.delete(a);ge(b)}}function ye(a){var b="";ba.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}function ze(a,b){a=p({children:void 0},b);if(b=ye(b.children))a.children=b;return a}
function Ae(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Be(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Ce(a,b){null!=b.dangerouslySetInnerHTML?A("91"):void 0;return p({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function De(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?A("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:A("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function Ee(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Fe(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Ge={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function He(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ie(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?He(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Je=void 0,Ke=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Ge.svg||"innerHTML"in a)a.innerHTML=b;else{Je=Je||document.createElement("div");Je.innerHTML="<svg>"+b+"</svg>";for(b=Je.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Le(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var Me={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ne=["Webkit","ms","Moz","O"];Object.keys(Me).forEach(function(a){Ne.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Me[b]=Me[a]})});
function Oe(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Me.hasOwnProperty(e)&&Me[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var Pe=p({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function Qe(a,b,c){b&&(Pe[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?A("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?A("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:A("61")),null!=b.style&&"object"!==typeof b.style?A("62",c()):void 0)}
function Re(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var Se=v.thatReturns("");
function Te(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Sd(a);b=sa[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Nd("scroll",a);break;case "focus":case "blur":Nd("focus",a);Nd("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":$b(e,!0)&&Nd(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===jb.indexOf(e)&&K(e,a)}c[e]=!0}}}
function Ue(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===Ge.html&&(d=He(a));d===Ge.html?"script"===a?(a=c.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function Ve(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function We(a,b,c,d){var e=Re(b,c);switch(b){case "iframe":case "object":K("load",a);var f=c;break;case "video":case "audio":for(f=0;f<jb.length;f++)K(jb[f],a);f=c;break;case "source":K("error",a);f=c;break;case "img":case "image":case "link":K("error",a);K("load",a);f=c;break;case "form":K("reset",a);K("submit",a);f=c;break;case "details":K("toggle",a);f=c;break;case "input":Ic(a,c);f=Hc(a,c);K("invalid",a);Te(d,"onChange");break;case "option":f=ze(a,c);break;case "select":Be(a,c);f=p({},c,{value:void 0});
K("invalid",a);Te(d,"onChange");break;case "textarea":De(a,c);f=Ce(a,c);K("invalid",a);Te(d,"onChange");break;default:f=c}Qe(b,f,Se);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?Oe(a,k,Se):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Ke(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&Le(a,k):"number"===typeof k&&Le(a,""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ra.hasOwnProperty(h)?null!=k&&Te(d,
h):null!=k&&Gc(a,h,k,e))}switch(b){case "input":cc(a);Nc(a,c,!1);break;case "textarea":cc(a);Fe(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?Ae(a,!!c.multiple,b,!1):null!=c.defaultValue&&Ae(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=v)}}
function Xe(a,b,c,d,e){var f=null;switch(b){case "input":c=Hc(a,c);d=Hc(a,d);f=[];break;case "option":c=ze(a,c);d=ze(a,d);f=[];break;case "select":c=p({},c,{value:void 0});d=p({},d,{value:void 0});f=[];break;case "textarea":c=Ce(a,c);d=Ce(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=v)}Qe(b,d,Se);b=a=void 0;var g=null;for(a in c)if(!d.hasOwnProperty(a)&&c.hasOwnProperty(a)&&null!=c[a])if("style"===a){var h=c[a];for(b in h)h.hasOwnProperty(b)&&(g||
(g={}),g[b]="")}else"dangerouslySetInnerHTML"!==a&&"children"!==a&&"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(ra.hasOwnProperty(a)?f||(f=[]):(f=f||[]).push(a,null));for(a in d){var k=d[a];h=null!=c?c[a]:void 0;if(d.hasOwnProperty(a)&&k!==h&&(null!=k||null!=h))if("style"===a)if(h){for(b in h)!h.hasOwnProperty(b)||k&&k.hasOwnProperty(b)||(g||(g={}),g[b]="");for(b in k)k.hasOwnProperty(b)&&h[b]!==k[b]&&(g||(g={}),g[b]=k[b])}else g||(f||(f=[]),f.push(a,g)),
g=k;else"dangerouslySetInnerHTML"===a?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(a,""+k)):"children"===a?h===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(a,""+k):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&(ra.hasOwnProperty(a)?(null!=k&&Te(e,a),f||h===k||(f=[])):(f=f||[]).push(a,k))}g&&(f=f||[]).push("style",g);return f}
function Ye(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Kc(a,e);Re(c,d);d=Re(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?Oe(a,h,Se):"dangerouslySetInnerHTML"===g?Ke(a,h):"children"===g?Le(a,h):Gc(a,g,h,d)}switch(c){case "input":Lc(a,e);break;case "textarea":Ee(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?Ae(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?
Ae(a,!!e.multiple,e.defaultValue,!0):Ae(a,!!e.multiple,e.multiple?[]:"",!1))}}
function Ze(a,b,c,d,e){switch(b){case "iframe":case "object":K("load",a);break;case "video":case "audio":for(d=0;d<jb.length;d++)K(jb[d],a);break;case "source":K("error",a);break;case "img":case "image":case "link":K("error",a);K("load",a);break;case "form":K("reset",a);K("submit",a);break;case "details":K("toggle",a);break;case "input":Ic(a,c);K("invalid",a);Te(e,"onChange");break;case "select":Be(a,c);K("invalid",a);Te(e,"onChange");break;case "textarea":De(a,c),K("invalid",a),Te(e,"onChange")}Qe(b,
c,Se);d=null;for(var f in c)if(c.hasOwnProperty(f)){var g=c[f];"children"===f?"string"===typeof g?a.textContent!==g&&(d=["children",g]):"number"===typeof g&&a.textContent!==""+g&&(d=["children",""+g]):ra.hasOwnProperty(f)&&null!=g&&Te(e,f)}switch(b){case "input":cc(a);Nc(a,c,!0);break;case "textarea":cc(a);Fe(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=v)}return d}function $e(a,b){return a.nodeValue!==b}
var af={createElement:Ue,createTextNode:Ve,setInitialProperties:We,diffProperties:Xe,updateProperties:Ye,diffHydratedProperties:Ze,diffHydratedText:$e,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Lc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;
c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Pa(d);e?void 0:A("90");dc(d);Lc(d,e)}}}break;case "textarea":Ee(a,c);break;case "select":b=c.value,null!=b&&Ae(a,!!c.multiple,b,!1)}}},bf=null,cf=null;function df(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function ef(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html}var ff=he,gf=je,hf=ke;function jf(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function kf(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}new Set;var lf=[],mf=-1;function nf(a){return{current:a}}
function M(a){0>mf||(a.current=lf[mf],lf[mf]=null,mf--)}function N(a,b){mf++;lf[mf]=a.current;a.current=b}var of=nf(ha),O=nf(!1),pf=ha;function qf(a){return rf(a)?pf:of.current}
function sf(a,b){var c=a.type.contextTypes;if(!c)return ha;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function rf(a){return 2===a.tag&&null!=a.type.childContextTypes}function tf(a){rf(a)&&(M(O,a),M(of,a))}function uf(a){M(O,a);M(of,a)}
function vf(a,b,c){of.current!==ha?A("168"):void 0;N(of,b,a);N(O,c,a)}function wf(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:A("108",uc(a)||"Unknown",e);return p({},b,c)}function xf(a){if(!rf(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||ha;pf=of.current;N(of,b,a);N(O,O.current,a);return!0}
function yf(a,b){var c=a.stateNode;c?void 0:A("169");if(b){var d=wf(a,pf);c.__reactInternalMemoizedMergedChildContext=d;M(O,a);M(of,a);N(of,d,a)}else M(O,a);N(O,b,a)}
function zf(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=null;this.index=0;this.ref=null;this.pendingProps=b;this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function Af(a,b,c){var d=a.alternate;null===d?(d=new zf(a.tag,b,a.key,a.mode),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=b,d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function Bf(a,b,c){var d=a.type,e=a.key;a=a.props;if("function"===typeof d)var f=d.prototype&&d.prototype.isReactComponent?2:0;else if("string"===typeof d)f=5;else switch(d){case ic:return Cf(a.children,b,c,e);case pc:f=11;b|=3;break;case jc:f=11;b|=2;break;case kc:return d=new zf(15,a,e,b|4),d.type=kc,d.expirationTime=c,d;case rc:f=16;b|=2;break;default:a:{switch("object"===typeof d&&null!==d?d.$$typeof:null){case lc:f=13;break a;case mc:f=12;break a;case qc:f=14;break a;default:A("130",null==d?
d:typeof d,"")}f=void 0}}b=new zf(f,a,e,b);b.type=d;b.expirationTime=c;return b}function Cf(a,b,c,d){a=new zf(10,a,d,b);a.expirationTime=c;return a}function Df(a,b,c){a=new zf(6,a,null,b);a.expirationTime=c;return a}function Ef(a,b,c){b=new zf(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function Ff(a,b,c){b=new zf(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:c,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null};return b.stateNode=a}var Gf=null,Hf=null;function If(a){return function(b){try{return a(b)}catch(c){}}}
function Jf(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Gf=If(function(a){return b.onCommitFiberRoot(c,a)});Hf=If(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function Kf(a){"function"===typeof Gf&&Gf(a)}function Lf(a){"function"===typeof Hf&&Hf(a)}var Mf=!1;
function Nf(a){return{expirationTime:0,baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Of(a){return{expirationTime:a.expirationTime,baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Pf(a){return{expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Qf(a,b,c){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);if(0===a.expirationTime||a.expirationTime>c)a.expirationTime=c}
function Rf(a,b,c){var d=a.alternate;if(null===d){var e=a.updateQueue;var f=null;null===e&&(e=a.updateQueue=Nf(a.memoizedState))}else e=a.updateQueue,f=d.updateQueue,null===e?null===f?(e=a.updateQueue=Nf(a.memoizedState),f=d.updateQueue=Nf(d.memoizedState)):e=a.updateQueue=Of(f):null===f&&(f=d.updateQueue=Of(e));null===f||e===f?Qf(e,b,c):null===e.lastUpdate||null===f.lastUpdate?(Qf(e,b,c),Qf(f,b,c)):(Qf(e,b,c),f.lastUpdate=b)}
function Sf(a,b,c){var d=a.updateQueue;d=null===d?a.updateQueue=Nf(a.memoizedState):Tf(a,d);null===d.lastCapturedUpdate?d.firstCapturedUpdate=d.lastCapturedUpdate=b:(d.lastCapturedUpdate.next=b,d.lastCapturedUpdate=b);if(0===d.expirationTime||d.expirationTime>c)d.expirationTime=c}function Tf(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Of(b));return b}
function Uf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-1025|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return p({},d,e);case 2:Mf=!0}return d}
function Vf(a,b,c,d,e){Mf=!1;if(!(0===b.expirationTime||b.expirationTime>e)){b=Tf(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,n=f;null!==k;){var r=k.expirationTime;if(r>e){if(null===g&&(g=k,f=n),0===h||h>r)h=r}else n=Uf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k));k=k.next}r=null;for(k=b.firstCapturedUpdate;null!==k;){var w=k.expirationTime;if(w>e){if(null===r&&(r=k,null===
g&&(f=n)),0===h||h>w)h=w}else n=Uf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k));k=k.next}null===g&&(b.lastUpdate=null);null===r?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===r&&(f=n);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=r;b.expirationTime=h;a.memoizedState=n}}
function Wf(a,b){"function"!==typeof a?A("191",a):void 0;a.call(b)}
function Xf(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);a=b.firstEffect;for(b.firstEffect=b.lastEffect=null;null!==a;){var d=a.callback;null!==d&&(a.callback=null,Wf(d,c));a=a.nextEffect}a=b.firstCapturedEffect;for(b.firstCapturedEffect=b.lastCapturedEffect=null;null!==a;)b=a.callback,null!==b&&(a.callback=null,Wf(b,c)),a=a.nextEffect}
function Yf(a,b){return{value:a,source:b,stack:vc(b)}}var Zf=nf(null),$f=nf(null),ag=nf(0);function bg(a){var b=a.type._context;N(ag,b._changedBits,a);N($f,b._currentValue,a);N(Zf,a,a);b._currentValue=a.pendingProps.value;b._changedBits=a.stateNode}function cg(a){var b=ag.current,c=$f.current;M(Zf,a);M($f,a);M(ag,a);a=a.type._context;a._currentValue=c;a._changedBits=b}var dg={},eg=nf(dg),fg=nf(dg),gg=nf(dg);function hg(a){a===dg?A("174"):void 0;return a}
function jg(a,b){N(gg,b,a);N(fg,a,a);N(eg,dg,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:Ie(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=Ie(b,c)}M(eg,a);N(eg,b,a)}function kg(a){M(eg,a);M(fg,a);M(gg,a)}function lg(a){fg.current===a&&(M(eg,a),M(fg,a))}function mg(a,b,c){var d=a.memoizedState;b=b(c,d);d=null===b||void 0===b?d:p({},d,b);a.memoizedState=d;a=a.updateQueue;null!==a&&0===a.expirationTime&&(a.baseState=d)}
var qg={isMounted:function(a){return(a=a._reactInternalFiber)?2===kd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=ng();d=og(d,a);var e=Pf(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Rf(a,e,d);pg(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=ng();d=og(d,a);var e=Pf(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Rf(a,e,d);pg(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=ng();c=og(c,a);var d=Pf(c);d.tag=2;void 0!==
b&&null!==b&&(d.callback=b);Rf(a,d,c);pg(a,c)}};function rg(a,b,c,d,e,f){var g=a.stateNode;a=a.type;return"function"===typeof g.shouldComponentUpdate?g.shouldComponentUpdate(c,e,f):a.prototype&&a.prototype.isPureReactComponent?!ea(b,c)||!ea(d,e):!0}
function sg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&qg.enqueueReplaceState(b,b.state,null)}
function tg(a,b){var c=a.type,d=a.stateNode,e=a.pendingProps,f=qf(a);d.props=e;d.state=a.memoizedState;d.refs=ha;d.context=sf(a,f);f=a.updateQueue;null!==f&&(Vf(a,f,e,d,b),d.state=a.memoizedState);f=a.type.getDerivedStateFromProps;"function"===typeof f&&(mg(a,f,e),d.state=a.memoizedState);"function"===typeof c.getDerivedStateFromProps||"function"===typeof d.getSnapshotBeforeUpdate||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||(c=d.state,"function"===typeof d.componentWillMount&&
d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount(),c!==d.state&&qg.enqueueReplaceState(d,d.state,null),f=a.updateQueue,null!==f&&(Vf(a,f,e,d,b),d.state=a.memoizedState));"function"===typeof d.componentDidMount&&(a.effectTag|=4)}var ug=Array.isArray;
function vg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(2!==c.tag?A("110"):void 0,d=c.stateNode);d?void 0:A("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs===ha?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}"string"!==typeof a?A("148"):void 0;c._owner?void 0:A("254",a)}return a}
function wg(a,b){"textarea"!==a.type&&A("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function xg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=Af(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Df(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=vg(a,b,c),d.return=a,d;d=Bf(c,a.mode,d);d.ref=vg(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Ef(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function r(a,b,c,d,f){if(null===b||10!==b.tag)return b=Cf(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function w(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Df(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case gc:return c=Bf(b,a.mode,c),c.ref=vg(a,null,b),c.return=a,c;case hc:return b=Ef(b,a.mode,c),b.return=a,b}if(ug(b)||tc(b))return b=Cf(b,a.mode,c,null),b.return=
a,b;wg(a,b)}return null}function P(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case gc:return c.key===e?c.type===ic?r(a,b,c.props.children,d,e):k(a,b,c,d):null;case hc:return c.key===e?n(a,b,c,d):null}if(ug(c)||tc(c))return null!==e?null:r(a,b,c,d,null);wg(a,c)}return null}function nc(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);
if("object"===typeof d&&null!==d){switch(d.$$typeof){case gc:return a=a.get(null===d.key?c:d.key)||null,d.type===ic?r(b,a,d.props.children,e,d.key):k(b,a,d,e);case hc:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e)}if(ug(d)||tc(d))return a=a.get(c)||null,r(b,a,d,e,null);wg(b,d)}return null}function Jd(e,g,h,k){for(var u=null,x=null,t=g,q=g=0,n=null;null!==t&&q<h.length;q++){t.index>q?(n=t,t=null):n=t.sibling;var l=P(e,t,h[q],k);if(null===l){null===t&&(t=n);break}a&&t&&null===l.alternate&&b(e,
t);g=f(l,g,q);null===x?u=l:x.sibling=l;x=l;t=n}if(q===h.length)return c(e,t),u;if(null===t){for(;q<h.length;q++)if(t=w(e,h[q],k))g=f(t,g,q),null===x?u=t:x.sibling=t,x=t;return u}for(t=d(e,t);q<h.length;q++)if(n=nc(t,e,q,h[q],k))a&&null!==n.alternate&&t.delete(null===n.key?q:n.key),g=f(n,g,q),null===x?u=n:x.sibling=n,x=n;a&&t.forEach(function(a){return b(e,a)});return u}function E(e,g,h,k){var u=tc(h);"function"!==typeof u?A("150"):void 0;h=u.call(h);null==h?A("151"):void 0;for(var t=u=null,n=g,x=
g=0,y=null,l=h.next();null!==n&&!l.done;x++,l=h.next()){n.index>x?(y=n,n=null):y=n.sibling;var r=P(e,n,l.value,k);if(null===r){n||(n=y);break}a&&n&&null===r.alternate&&b(e,n);g=f(r,g,x);null===t?u=r:t.sibling=r;t=r;n=y}if(l.done)return c(e,n),u;if(null===n){for(;!l.done;x++,l=h.next())l=w(e,l.value,k),null!==l&&(g=f(l,g,x),null===t?u=l:t.sibling=l,t=l);return u}for(n=d(e,n);!l.done;x++,l=h.next())l=nc(n,e,x,l.value,k),null!==l&&(a&&null!==l.alternate&&n.delete(null===l.key?x:l.key),g=f(l,g,x),null===
t?u=l:t.sibling=l,t=l);a&&n.forEach(function(a){return b(e,a)});return u}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ic&&null===f.key;k&&(f=f.props.children);var n="object"===typeof f&&null!==f;if(n)switch(f.$$typeof){case gc:a:{n=f.key;for(k=d;null!==k;){if(k.key===n)if(10===k.tag?f.type===ic:k.type===f.type){c(a,k.sibling);d=e(k,f.type===ic?f.props.children:f.props,h);d.ref=vg(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=k.sibling}f.type===ic?(d=Cf(f.props.children,
a.mode,h,f.key),d.return=a,a=d):(h=Bf(f,a.mode,h),h.ref=vg(a,d,f),h.return=a,a=h)}return g(a);case hc:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Ef(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=
a,a=d):(c(a,d),d=Df(f,a.mode,h),d.return=a,a=d),g(a);if(ug(f))return Jd(a,d,f,h);if(tc(f))return E(a,d,f,h);n&&wg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 2:case 1:h=a.type,A("152",h.displayName||h.name||"Component")}return c(a,d)}}var yg=xg(!0),zg=xg(!1),Ag=null,Bg=null,Cg=!1;function Dg(a,b){var c=new zf(5,null,null,0);c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function Eg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return!1}}function Fg(a){if(Cg){var b=Bg;if(b){var c=b;if(!Eg(a,b)){b=jf(c);if(!b||!Eg(a,b)){a.effectTag|=2;Cg=!1;Ag=a;return}Dg(Ag,c)}Ag=a;Bg=kf(b)}else a.effectTag|=2,Cg=!1,Ag=a}}
function Gg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;Ag=a}function Hg(a){if(a!==Ag)return!1;if(!Cg)return Gg(a),Cg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!ef(b,a.memoizedProps))for(b=Bg;b;)Dg(a,b),b=jf(b);Gg(a);Bg=Ag?jf(a.stateNode):null;return!0}function Ig(){Bg=Ag=null;Cg=!1}function Q(a,b,c){Jg(a,b,c,b.expirationTime)}function Jg(a,b,c,d){b.child=null===a?zg(b,null,c,d):yg(b,a.child,c,d)}
function Kg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function Lg(a,b,c,d,e){Kg(a,b);var f=0!==(b.effectTag&64);if(!c&&!f)return d&&yf(b,!1),R(a,b);c=b.stateNode;ec.current=b;var g=f?null:c.render();b.effectTag|=1;f&&(Jg(a,b,null,e),b.child=null);Jg(a,b,g,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&yf(b,!0);return b.child}
function Mg(a){var b=a.stateNode;b.pendingContext?vf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&vf(a,b.context,!1);jg(a,b.containerInfo)}
function Ng(a,b,c,d){var e=a.child;null!==e&&(e.return=a);for(;null!==e;){switch(e.tag){case 12:var f=e.stateNode|0;if(e.type===b&&0!==(f&c)){for(f=e;null!==f;){var g=f.alternate;if(0===f.expirationTime||f.expirationTime>d)f.expirationTime=d,null!==g&&(0===g.expirationTime||g.expirationTime>d)&&(g.expirationTime=d);else if(null!==g&&(0===g.expirationTime||g.expirationTime>d))g.expirationTime=d;else break;f=f.return}f=null}else f=e.child;break;case 13:f=e.type===a.type?null:e.child;break;default:f=
e.child}if(null!==f)f.return=e;else for(f=e;null!==f;){if(f===a){f=null;break}e=f.sibling;if(null!==e){e.return=f.return;f=e;break}f=f.return}e=f}}
function Rg(a,b,c){var d=b.type._context,e=b.pendingProps,f=b.memoizedProps,g=!0;if(O.current)g=!1;else if(f===e)return b.stateNode=0,bg(b),R(a,b);var h=e.value;b.memoizedProps=e;if(null===f)h=1073741823;else if(f.value===e.value){if(f.children===e.children&&g)return b.stateNode=0,bg(b),R(a,b);h=0}else{var k=f.value;if(k===h&&(0!==k||1/k===1/h)||k!==k&&h!==h){if(f.children===e.children&&g)return b.stateNode=0,bg(b),R(a,b);h=0}else if(h="function"===typeof d._calculateChangedBits?d._calculateChangedBits(k,
h):1073741823,h|=0,0===h){if(f.children===e.children&&g)return b.stateNode=0,bg(b),R(a,b)}else Ng(b,d,h,c)}b.stateNode=h;bg(b);Q(a,b,e.children);return b.child}function R(a,b){null!==a&&b.child!==a.child?A("153"):void 0;if(null!==b.child){a=b.child;var c=Af(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Af(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}
function Sg(a,b,c){if(0===b.expirationTime||b.expirationTime>c){switch(b.tag){case 3:Mg(b);break;case 2:xf(b);break;case 4:jg(b,b.stateNode.containerInfo);break;case 13:bg(b)}return null}switch(b.tag){case 0:null!==a?A("155"):void 0;var d=b.type,e=b.pendingProps,f=qf(b);f=sf(b,f);d=d(e,f);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render&&void 0===d.$$typeof?(f=b.type,b.tag=2,b.memoizedState=null!==d.state&&void 0!==d.state?d.state:null,f=f.getDerivedStateFromProps,"function"===
typeof f&&mg(b,f,e),e=xf(b),d.updater=qg,b.stateNode=d,d._reactInternalFiber=b,tg(b,c),a=Lg(a,b,!0,e,c)):(b.tag=1,Q(a,b,d),b.memoizedProps=e,a=b.child);return a;case 1:return e=b.type,c=b.pendingProps,O.current||b.memoizedProps!==c?(d=qf(b),d=sf(b,d),e=e(c,d),b.effectTag|=1,Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 2:e=xf(b);if(null===a)if(null===b.stateNode){var g=b.pendingProps,h=b.type;d=qf(b);var k=2===b.tag&&null!=b.type.contextTypes;f=k?sf(b,d):ha;g=new h(g,f);b.memoizedState=null!==
g.state&&void 0!==g.state?g.state:null;g.updater=qg;b.stateNode=g;g._reactInternalFiber=b;k&&(k=b.stateNode,k.__reactInternalMemoizedUnmaskedChildContext=d,k.__reactInternalMemoizedMaskedChildContext=f);tg(b,c);d=!0}else{h=b.type;d=b.stateNode;k=b.memoizedProps;f=b.pendingProps;d.props=k;var n=d.context;g=qf(b);g=sf(b,g);var r=h.getDerivedStateFromProps;(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(k!==f||n!==g)&&sg(b,d,f,g);Mf=!1;var w=b.memoizedState;n=d.state=w;var P=b.updateQueue;null!==P&&(Vf(b,P,f,d,c),n=b.memoizedState);k!==f||w!==n||O.current||Mf?("function"===typeof r&&(mg(b,r,f),n=b.memoizedState),(k=Mf||rg(b,k,f,w,n,g))?(h||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||("function"===typeof d.componentWillMount&&d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount()),"function"===typeof d.componentDidMount&&
(b.effectTag|=4)):("function"===typeof d.componentDidMount&&(b.effectTag|=4),b.memoizedProps=f,b.memoizedState=n),d.props=f,d.state=n,d.context=g,d=k):("function"===typeof d.componentDidMount&&(b.effectTag|=4),d=!1)}else h=b.type,d=b.stateNode,f=b.memoizedProps,k=b.pendingProps,d.props=f,n=d.context,g=qf(b),g=sf(b,g),r=h.getDerivedStateFromProps,(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(f!==k||n!==g)&&sg(b,d,k,g),Mf=!1,n=b.memoizedState,w=d.state=n,P=b.updateQueue,null!==P&&(Vf(b,P,k,d,c),w=b.memoizedState),f!==k||n!==w||O.current||Mf?("function"===typeof r&&(mg(b,r,k),w=b.memoizedState),(r=Mf||rg(b,f,k,n,w,g))?(h||"function"!==typeof d.UNSAFE_componentWillUpdate&&"function"!==typeof d.componentWillUpdate||("function"===typeof d.componentWillUpdate&&d.componentWillUpdate(k,w,g),"function"===typeof d.UNSAFE_componentWillUpdate&&d.UNSAFE_componentWillUpdate(k,w,g)),"function"===typeof d.componentDidUpdate&&
(b.effectTag|=4),"function"===typeof d.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),b.memoizedProps=k,b.memoizedState=w),d.props=k,d.state=w,d.context=g,d=r):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||
f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),d=!1);return Lg(a,b,d,e,c);case 3:Mg(b);e=b.updateQueue;if(null!==e)if(d=b.memoizedState,d=null!==d?d.element:null,Vf(b,e,b.pendingProps,null,c),e=b.memoizedState.element,e===d)Ig(),a=R(a,b);else{d=b.stateNode;if(d=(null===a||null===a.child)&&d.hydrate)Bg=kf(b.stateNode.containerInfo),Ag=b,d=Cg=!0;d?(b.effectTag|=2,b.child=zg(b,null,e,c)):(Ig(),Q(a,b,e));a=b.child}else Ig(),a=R(a,b);return a;case 5:a:{hg(gg.current);e=hg(eg.current);d=Ie(e,
b.type);e!==d&&(N(fg,b,b),N(eg,d,b));null===a&&Fg(b);e=b.type;k=b.memoizedProps;d=b.pendingProps;f=null!==a?a.memoizedProps:null;if(!O.current&&k===d){if(k=b.mode&1&&!!d.hidden)b.expirationTime=1073741823;if(!k||1073741823!==c){a=R(a,b);break a}}k=d.children;ef(e,d)?k=null:f&&ef(e,f)&&(b.effectTag|=16);Kg(a,b);1073741823!==c&&b.mode&1&&d.hidden?(b.expirationTime=1073741823,b.memoizedProps=d,a=null):(Q(a,b,k),b.memoizedProps=d,a=b.child)}return a;case 6:return null===a&&Fg(b),b.memoizedProps=b.pendingProps,
null;case 16:return null;case 4:return jg(b,b.stateNode.containerInfo),e=b.pendingProps,O.current||b.memoizedProps!==e?(null===a?b.child=yg(b,null,e,c):Q(a,b,e),b.memoizedProps=e,a=b.child):a=R(a,b),a;case 14:return e=b.type.render,c=b.pendingProps,d=b.ref,O.current||b.memoizedProps!==c||d!==(null!==a?a.ref:null)?(e=e(c,d),Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 10:return c=b.pendingProps,O.current||b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 11:return c=
b.pendingProps.children,O.current||null!==c&&b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 15:return c=b.pendingProps,b.memoizedProps===c?a=R(a,b):(Q(a,b,c.children),b.memoizedProps=c,a=b.child),a;case 13:return Rg(a,b,c);case 12:a:if(d=b.type,f=b.pendingProps,k=b.memoizedProps,e=d._currentValue,g=d._changedBits,O.current||0!==g||k!==f){b.memoizedProps=f;h=f.unstable_observedBits;if(void 0===h||null===h)h=1073741823;b.stateNode=h;if(0!==(g&h))Ng(b,d,g,c);else if(k===f){a=
R(a,b);break a}c=f.children;c=c(e);b.effectTag|=1;Q(a,b,c);a=b.child}else a=R(a,b);return a;default:A("156")}}function Tg(a){a.effectTag|=4}var Ug=void 0,Vg=void 0,Wg=void 0;Ug=function(){};Vg=function(a,b,c){(b.updateQueue=c)&&Tg(b)};Wg=function(a,b,c,d){c!==d&&Tg(b)};
function Xg(a,b){var c=b.pendingProps;switch(b.tag){case 1:return null;case 2:return tf(b),null;case 3:kg(b);uf(b);var d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Hg(b),b.effectTag&=-3;Ug(b);return null;case 5:lg(b);d=hg(gg.current);var e=b.type;if(null!==a&&null!=b.stateNode){var f=a.memoizedProps,g=b.stateNode,h=hg(eg.current);g=Xe(g,e,f,c,d);Vg(a,b,g,e,f,c,d,h);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!c)return null===b.stateNode?
A("166"):void 0,null;a=hg(eg.current);if(Hg(b))c=b.stateNode,e=b.type,f=b.memoizedProps,c[C]=b,c[Ma]=f,d=Ze(c,e,f,a,d),b.updateQueue=d,null!==d&&Tg(b);else{a=Ue(e,c,d,a);a[C]=b;a[Ma]=c;a:for(f=b.child;null!==f;){if(5===f.tag||6===f.tag)a.appendChild(f.stateNode);else if(4!==f.tag&&null!==f.child){f.child.return=f;f=f.child;continue}if(f===b)break;for(;null===f.sibling;){if(null===f.return||f.return===b)break a;f=f.return}f.sibling.return=f.return;f=f.sibling}We(a,e,c,d);df(e,c)&&Tg(b);b.stateNode=
a}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)Wg(a,b,a.memoizedProps,c);else{if("string"!==typeof c)return null===b.stateNode?A("166"):void 0,null;d=hg(gg.current);hg(eg.current);Hg(b)?(d=b.stateNode,c=b.memoizedProps,d[C]=b,$e(d,c)&&Tg(b)):(d=Ve(c,d),d[C]=b,b.stateNode=d)}return null;case 14:return null;case 16:return null;case 10:return null;case 11:return null;case 15:return null;case 4:return kg(b),Ug(b),null;case 13:return cg(b),null;case 12:return null;case 0:A("167");
default:A("156")}}function Yg(a,b){var c=b.source;null===b.stack&&null!==c&&vc(c);null!==c&&uc(c);b=b.value;null!==a&&2===a.tag&&uc(a);try{b&&b.suppressReactErrorLogging||console.error(b)}catch(d){d&&d.suppressReactErrorLogging||console.error(d)}}function Zg(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){$g(a,c)}else b.current=null}
function ah(a){"function"===typeof Lf&&Lf(a);switch(a.tag){case 2:Zg(a);var b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){$g(a,c)}break;case 5:Zg(a);break;case 4:bh(a)}}function ch(a){return 5===a.tag||3===a.tag||4===a.tag}
function dh(a){a:{for(var b=a.return;null!==b;){if(ch(b)){var c=b;break a}b=b.return}A("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:A("161")}c.effectTag&16&&(Le(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ch(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h)}else b.insertBefore(e.stateNode,c);else d?(f=b,g=e.stateNode,8===f.nodeType?f.parentNode.insertBefore(g,f):f.appendChild(g)):b.appendChild(e.stateNode);else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===
e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}
function bh(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?A("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return}c=!0}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if(ah(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return}g.sibling.return=g.return;g=g.sibling}e?
(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode)}else if(4===b.tag?d=b.stateNode.containerInfo:ah(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1)}b.sibling.return=b.return;b=b.sibling}}
function eh(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&(c[Ma]=d,Ye(c,f,e,a,d))}break;case 6:null===b.stateNode?A("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 15:break;case 16:break;default:A("163")}}function fh(a,b,c){c=Pf(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){gh(d);Yg(a,b)};return c}
function hh(a,b,c){c=Pf(c);c.tag=3;var d=a.stateNode;null!==d&&"function"===typeof d.componentDidCatch&&(c.callback=function(){null===ih?ih=new Set([this]):ih.add(this);var c=b.value,d=b.stack;Yg(a,b);this.componentDidCatch(c,{componentStack:null!==d?d:""})});return c}
function jh(a,b,c,d,e,f){c.effectTag|=512;c.firstEffect=c.lastEffect=null;d=Yf(d,c);a=b;do{switch(a.tag){case 3:a.effectTag|=1024;d=fh(a,d,f);Sf(a,d,f);return;case 2:if(b=d,c=a.stateNode,0===(a.effectTag&64)&&null!==c&&"function"===typeof c.componentDidCatch&&(null===ih||!ih.has(c))){a.effectTag|=1024;d=hh(a,b,f);Sf(a,d,f);return}}a=a.return}while(null!==a)}
function kh(a){switch(a.tag){case 2:tf(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return kg(a),uf(a),b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 5:return lg(a),null;case 16:return b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 4:return kg(a),null;case 13:return cg(a),null;default:return null}}var lh=ff(),mh=2,nh=lh,oh=0,ph=0,qh=!1,S=null,rh=null,T=0,sh=-1,th=!1,U=null,uh=!1,vh=!1,ih=null;
function wh(){if(null!==S)for(var a=S.return;null!==a;){var b=a;switch(b.tag){case 2:tf(b);break;case 3:kg(b);uf(b);break;case 5:lg(b);break;case 4:kg(b);break;case 13:cg(b)}a=a.return}rh=null;T=0;sh=-1;th=!1;S=null;vh=!1}
function xh(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&512)){b=Xg(b,a,T);var e=a;if(1073741823===T||1073741823!==e.expirationTime){var f=0;switch(e.tag){case 3:case 2:var g=e.updateQueue;null!==g&&(f=g.expirationTime)}for(g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&
(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{vh=!0;break}}else{a=kh(a,th,T);if(null!==a)return a.effectTag&=511,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=512);if(null!==d)return d;if(null!==c)a=c;else break}}return null}
function yh(a){var b=Sg(a.alternate,a,T);null===b&&(b=xh(a));ec.current=null;return b}
function zh(a,b,c){qh?A("243"):void 0;qh=!0;if(b!==T||a!==rh||null===S)wh(),rh=a,T=b,sh=-1,S=Af(rh.current,null,T),a.pendingCommitExpirationTime=0;var d=!1;th=!c||T<=mh;do{try{if(c)for(;null!==S&&!Ah();)S=yh(S);else for(;null!==S;)S=yh(S)}catch(f){if(null===S)d=!0,gh(f);else{null===S?A("271"):void 0;c=S;var e=c.return;if(null===e){d=!0;gh(f);break}jh(a,e,c,f,th,T,nh);S=xh(c)}}break}while(1);qh=!1;if(d)return null;if(null===S){if(vh)return a.pendingCommitExpirationTime=b,a.current.alternate;th?A("262"):
void 0;0<=sh&&setTimeout(function(){var b=a.current.expirationTime;0!==b&&(0===a.remainingExpirationTime||a.remainingExpirationTime<b)&&Bh(a,b)},sh);Ch(a.current.expirationTime)}return null}
function $g(a,b){var c;a:{qh&&!uh?A("263"):void 0;for(c=a.return;null!==c;){switch(c.tag){case 2:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromCatch||"function"===typeof d.componentDidCatch&&(null===ih||!ih.has(d))){a=Yf(b,a);a=hh(c,a,1);Rf(c,a,1);pg(c,1);c=void 0;break a}break;case 3:a=Yf(b,a);a=fh(c,a,1);Rf(c,a,1);pg(c,1);c=void 0;break a}c=c.return}3===a.tag&&(c=Yf(b,a),c=fh(a,c,1),Rf(a,c,1),pg(a,1));c=void 0}return c}
function Dh(){var a=2+25*(((ng()-2+500)/25|0)+1);a<=oh&&(a=oh+1);return oh=a}function og(a,b){a=0!==ph?ph:qh?uh?1:T:b.mode&1?Eh?2+10*(((a-2+15)/10|0)+1):2+25*(((a-2+500)/25|0)+1):1;Eh&&(0===Fh||a>Fh)&&(Fh=a);return a}
function pg(a,b){for(;null!==a;){if(0===a.expirationTime||a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a.return)if(3===a.tag){var c=a.stateNode;!qh&&0!==T&&b<T&&wh();var d=c.current.expirationTime;qh&&!uh&&rh===c||Bh(c,d);Gh>Hh&&A("185")}else break;a=a.return}}function ng(){nh=ff()-lh;return mh=(nh/10|0)+2}
function Ih(a){var b=ph;ph=2+25*(((ng()-2+500)/25|0)+1);try{return a()}finally{ph=b}}function Jh(a,b,c,d,e){var f=ph;ph=1;try{return a(b,c,d,e)}finally{ph=f}}var Kh=null,V=null,Lh=0,Mh=void 0,W=!1,X=null,Y=0,Fh=0,Nh=!1,Oh=!1,Ph=null,Qh=null,Z=!1,Rh=!1,Eh=!1,Sh=null,Hh=1E3,Gh=0,Th=1;function Uh(a){if(0!==Lh){if(a>Lh)return;null!==Mh&&hf(Mh)}var b=ff()-lh;Lh=a;Mh=gf(Vh,{timeout:10*(a-2)-b})}
function Bh(a,b){if(null===a.nextScheduledRoot)a.remainingExpirationTime=b,null===V?(Kh=V=a,a.nextScheduledRoot=a):(V=V.nextScheduledRoot=a,V.nextScheduledRoot=Kh);else{var c=a.remainingExpirationTime;if(0===c||b<c)a.remainingExpirationTime=b}W||(Z?Rh&&(X=a,Y=1,Wh(a,1,!1)):1===b?Xh():Uh(b))}
function Yh(){var a=0,b=null;if(null!==V)for(var c=V,d=Kh;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===V?A("244"):void 0;if(d===d.nextScheduledRoot){Kh=V=d.nextScheduledRoot=null;break}else if(d===Kh)Kh=e=d.nextScheduledRoot,V.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===V){V=c;V.nextScheduledRoot=Kh;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===V)break;
c=d;d=d.nextScheduledRoot}}c=X;null!==c&&c===b&&1===a?Gh++:Gh=0;X=b;Y=a}function Vh(a){Zh(0,!0,a)}function Xh(){Zh(1,!1,null)}function Zh(a,b,c){Qh=c;Yh();if(b)for(;null!==X&&0!==Y&&(0===a||a>=Y)&&(!Nh||ng()>=Y);)ng(),Wh(X,Y,!Nh),Yh();else for(;null!==X&&0!==Y&&(0===a||a>=Y);)Wh(X,Y,!1),Yh();null!==Qh&&(Lh=0,Mh=null);0!==Y&&Uh(Y);Qh=null;Nh=!1;$h()}function ai(a,b){W?A("253"):void 0;X=a;Y=b;Wh(a,b,!1);Xh();$h()}
function $h(){Gh=0;if(null!==Sh){var a=Sh;Sh=null;for(var b=0;b<a.length;b++){var c=a[b];try{c._onComplete()}catch(d){Oh||(Oh=!0,Ph=d)}}}if(Oh)throw a=Ph,Ph=null,Oh=!1,a;}function Wh(a,b,c){W?A("245"):void 0;W=!0;c?(c=a.finishedWork,null!==c?bi(a,c,b):(c=zh(a,b,!0),null!==c&&(Ah()?a.finishedWork=c:bi(a,c,b)))):(c=a.finishedWork,null!==c?bi(a,c,b):(c=zh(a,b,!1),null!==c&&bi(a,c,b)));W=!1}
function bi(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===Sh?Sh=[d]:Sh.push(d),d._defer)){a.finishedWork=b;a.remainingExpirationTime=0;return}a.finishedWork=null;uh=qh=!0;c=b.stateNode;c.current===b?A("177"):void 0;d=c.pendingCommitExpirationTime;0===d?A("261"):void 0;c.pendingCommitExpirationTime=0;ng();ec.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var e=b.firstEffect}else e=b;else e=b.firstEffect;bf=Id;var f=da();if(Vd(f)){if("selectionStart"in
f)var g={start:f.selectionStart,end:f.selectionEnd};else a:{var h=window.getSelection&&window.getSelection();if(h&&0!==h.rangeCount){g=h.anchorNode;var k=h.anchorOffset,n=h.focusNode;h=h.focusOffset;try{g.nodeType,n.nodeType}catch(Wa){g=null;break a}var r=0,w=-1,P=-1,nc=0,Jd=0,E=f,t=null;b:for(;;){for(var x;;){E!==g||0!==k&&3!==E.nodeType||(w=r+k);E!==n||0!==h&&3!==E.nodeType||(P=r+h);3===E.nodeType&&(r+=E.nodeValue.length);if(null===(x=E.firstChild))break;t=E;E=x}for(;;){if(E===f)break b;t===g&&
++nc===k&&(w=r);t===n&&++Jd===h&&(P=r);if(null!==(x=E.nextSibling))break;E=t;t=E.parentNode}E=x}g=-1===w||-1===P?null:{start:w,end:P}}else g=null}g=g||{start:0,end:0}}else g=null;cf={focusedElem:f,selectionRange:g};Kd(!1);for(U=e;null!==U;){f=!1;g=void 0;try{for(;null!==U;){if(U.effectTag&256){var u=U.alternate;k=U;switch(k.tag){case 2:if(k.effectTag&256&&null!==u){var y=u.memoizedProps,D=u.memoizedState,ja=k.stateNode;ja.props=k.memoizedProps;ja.state=k.memoizedState;var ni=ja.getSnapshotBeforeUpdate(y,
D);ja.__reactInternalSnapshotBeforeUpdate=ni}break;case 3:case 5:case 6:case 4:break;default:A("163")}}U=U.nextEffect}}catch(Wa){f=!0,g=Wa}f&&(null===U?A("178"):void 0,$g(U,g),null!==U&&(U=U.nextEffect))}for(U=e;null!==U;){u=!1;y=void 0;try{for(;null!==U;){var q=U.effectTag;q&16&&Le(U.stateNode,"");if(q&128){var z=U.alternate;if(null!==z){var l=z.ref;null!==l&&("function"===typeof l?l(null):l.current=null)}}switch(q&14){case 2:dh(U);U.effectTag&=-3;break;case 6:dh(U);U.effectTag&=-3;eh(U.alternate,
U);break;case 4:eh(U.alternate,U);break;case 8:D=U,bh(D),D.return=null,D.child=null,D.alternate&&(D.alternate.child=null,D.alternate.return=null)}U=U.nextEffect}}catch(Wa){u=!0,y=Wa}u&&(null===U?A("178"):void 0,$g(U,y),null!==U&&(U=U.nextEffect))}l=cf;z=da();q=l.focusedElem;u=l.selectionRange;if(z!==q&&fa(document.documentElement,q)){null!==u&&Vd(q)&&(z=u.start,l=u.end,void 0===l&&(l=z),"selectionStart"in q?(q.selectionStart=z,q.selectionEnd=Math.min(l,q.value.length)):window.getSelection&&(z=window.getSelection(),
y=q[lb()].length,l=Math.min(u.start,y),u=void 0===u.end?l:Math.min(u.end,y),!z.extend&&l>u&&(y=u,u=l,l=y),y=Ud(q,l),D=Ud(q,u),y&&D&&(1!==z.rangeCount||z.anchorNode!==y.node||z.anchorOffset!==y.offset||z.focusNode!==D.node||z.focusOffset!==D.offset)&&(ja=document.createRange(),ja.setStart(y.node,y.offset),z.removeAllRanges(),l>u?(z.addRange(ja),z.extend(D.node,D.offset)):(ja.setEnd(D.node,D.offset),z.addRange(ja)))));z=[];for(l=q;l=l.parentNode;)1===l.nodeType&&z.push({element:l,left:l.scrollLeft,
top:l.scrollTop});"function"===typeof q.focus&&q.focus();for(q=0;q<z.length;q++)l=z[q],l.element.scrollLeft=l.left,l.element.scrollTop=l.top}cf=null;Kd(bf);bf=null;c.current=b;for(U=e;null!==U;){e=!1;q=void 0;try{for(z=d;null!==U;){var ig=U.effectTag;if(ig&36){var oc=U.alternate;l=U;u=z;switch(l.tag){case 2:var ca=l.stateNode;if(l.effectTag&4)if(null===oc)ca.props=l.memoizedProps,ca.state=l.memoizedState,ca.componentDidMount();else{var xi=oc.memoizedProps,yi=oc.memoizedState;ca.props=l.memoizedProps;
ca.state=l.memoizedState;ca.componentDidUpdate(xi,yi,ca.__reactInternalSnapshotBeforeUpdate)}var Og=l.updateQueue;null!==Og&&(ca.props=l.memoizedProps,ca.state=l.memoizedState,Xf(l,Og,ca,u));break;case 3:var Pg=l.updateQueue;if(null!==Pg){y=null;if(null!==l.child)switch(l.child.tag){case 5:y=l.child.stateNode;break;case 2:y=l.child.stateNode}Xf(l,Pg,y,u)}break;case 5:var zi=l.stateNode;null===oc&&l.effectTag&4&&df(l.type,l.memoizedProps)&&zi.focus();break;case 6:break;case 4:break;case 15:break;case 16:break;
default:A("163")}}if(ig&128){l=void 0;var yc=U.ref;if(null!==yc){var Qg=U.stateNode;switch(U.tag){case 5:l=Qg;break;default:l=Qg}"function"===typeof yc?yc(l):yc.current=l}}var Ai=U.nextEffect;U.nextEffect=null;U=Ai}}catch(Wa){e=!0,q=Wa}e&&(null===U?A("178"):void 0,$g(U,q),null!==U&&(U=U.nextEffect))}qh=uh=!1;"function"===typeof Kf&&Kf(b.stateNode);b=c.current.expirationTime;0===b&&(ih=null);a.remainingExpirationTime=b}function Ah(){return null===Qh||Qh.timeRemaining()>Th?!1:Nh=!0}
function gh(a){null===X?A("246"):void 0;X.remainingExpirationTime=0;Oh||(Oh=!0,Ph=a)}function Ch(a){null===X?A("246"):void 0;X.remainingExpirationTime=a}function ci(a,b){var c=Z;Z=!0;try{return a(b)}finally{(Z=c)||W||Xh()}}function di(a,b){if(Z&&!Rh){Rh=!0;try{return a(b)}finally{Rh=!1}}return a(b)}function ei(a,b){W?A("187"):void 0;var c=Z;Z=!0;try{return Jh(a,b)}finally{Z=c,Xh()}}
function fi(a,b,c){if(Eh)return a(b,c);Z||W||0===Fh||(Zh(Fh,!1,null),Fh=0);var d=Eh,e=Z;Z=Eh=!0;try{return a(b,c)}finally{Eh=d,(Z=e)||W||Xh()}}function gi(a){var b=Z;Z=!0;try{Jh(a)}finally{(Z=b)||W||Zh(1,!1,null)}}
function hi(a,b,c,d,e){var f=b.current;if(c){c=c._reactInternalFiber;var g;b:{2===kd(c)&&2===c.tag?void 0:A("170");for(g=c;3!==g.tag;){if(rf(g)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}(g=g.return)?void 0:A("171")}g=g.stateNode.context}c=rf(c)?wf(c,g):g}else c=ha;null===b.context?b.context=c:b.pendingContext=c;b=e;e=Pf(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);Rf(f,e,d);pg(f,d);return d}
function ii(a){var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?A("188"):A("268",Object.keys(a)));a=nd(b);return null===a?null:a.stateNode}function ji(a,b,c,d){var e=b.current,f=ng();e=og(f,e);return hi(a,b,c,e,d)}function ki(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}
function li(a){var b=a.findFiberByHostInstance;return Jf(p({},a,{findHostInstanceByFiber:function(a){a=nd(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))}
var mi={updateContainerAtExpirationTime:hi,createContainer:function(a,b,c){return Ff(a,b,c)},updateContainer:ji,flushRoot:ai,requestWork:Bh,computeUniqueAsyncExpiration:Dh,batchedUpdates:ci,unbatchedUpdates:di,deferredUpdates:Ih,syncUpdates:Jh,interactiveUpdates:fi,flushInteractiveUpdates:function(){W||0===Fh||(Zh(Fh,!1,null),Fh=0)},flushControlled:gi,flushSync:ei,getPublicRootInstance:ki,findHostInstance:ii,findHostInstanceWithNoPortals:function(a){a=od(a);return null===a?null:a.stateNode},injectIntoDevTools:li};
function oi(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:hc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}Kb.injectFiberControlledHostComponent(af);function pi(a){this._expirationTime=Dh();this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0}
pi.prototype.render=function(a){this._defer?void 0:A("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new qi;hi(a,b,null,c,d._onCommit);return d};pi.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
pi.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:A("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?A("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this}this._defer=!1;ai(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children)}else this._next=
null,this._defer=!1};pi.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}};function qi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this)}qi.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
qi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?A("191",c):void 0;c()}}};function ri(a,b,c){this._internalRoot=Ff(a,b,c)}ri.prototype.render=function(a,b){var c=this._internalRoot,d=new qi;b=void 0===b?null:b;null!==b&&d.then(b);ji(a,c,null,d._onCommit);return d};
ri.prototype.unmount=function(a){var b=this._internalRoot,c=new qi;a=void 0===a?null:a;null!==a&&c.then(a);ji(null,b,null,c._onCommit);return c};ri.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new qi;c=void 0===c?null:c;null!==c&&e.then(c);ji(b,d,a,e._onCommit);return e};
ri.prototype.createBatch=function(){var a=new pi(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a)}return a};function si(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Sb=mi.batchedUpdates;Tb=mi.interactiveUpdates;Ub=mi.flushInteractiveUpdates;
function ti(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new ri(a,!1,b)}
function ui(a,b,c,d,e){si(c)?void 0:A("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=ki(f._internalRoot);g.call(a)}}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)}else{f=c._reactRootContainer=ti(c,d);if("function"===typeof e){var h=e;e=function(){var a=ki(f._internalRoot);h.call(a)}}di(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)})}return ki(f._internalRoot)}
function vi(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;si(b)?void 0:A("200");return oi(a,b,null,c)}
var wi={createPortal:vi,findDOMNode:function(a){return null==a?null:1===a.nodeType?a:ii(a)},hydrate:function(a,b,c){return ui(null,a,b,!0,c)},render:function(a,b,c){return ui(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?A("38"):void 0;return ui(a,b,c,!1,d)},unmountComponentAtNode:function(a){si(a)?void 0:A("40");return a._reactRootContainer?(di(function(){ui(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:function(){return vi.apply(void 0,
arguments)},unstable_batchedUpdates:ci,unstable_deferredUpdates:Ih,unstable_interactiveUpdates:fi,flushSync:ei,unstable_flushControlled:gi,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Ka,EventPluginRegistry:va,EventPropagators:$a,ReactControlledComponent:Rb,ReactDOMComponentTree:Qa,ReactDOMEventListener:Od},unstable_createRoot:function(a,b){return new ri(a,!0,null!=b&&!0===b.hydrate)}};li({findFiberByHostInstance:Na,bundleType:0,version:"16.4.2",rendererPackageName:"react-dom"});
var Bi={default:wi},Ci=Bi&&wi||Bi;module.exports=Ci.default?Ci.default:Ci;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.2
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var k=__webpack_require__(29),n=__webpack_require__(10),p=__webpack_require__(11),q=__webpack_require__(12),r="function"===typeof Symbol&&Symbol.for,t=r?Symbol.for("react.element"):60103,u=r?Symbol.for("react.portal"):60106,v=r?Symbol.for("react.fragment"):60107,w=r?Symbol.for("react.strict_mode"):60108,x=r?Symbol.for("react.profiler"):60114,y=r?Symbol.for("react.provider"):60109,z=r?Symbol.for("react.context"):60110,A=r?Symbol.for("react.async_mode"):60111,B=
r?Symbol.for("react.forward_ref"):60112;r&&Symbol.for("react.timeout");var C="function"===typeof Symbol&&Symbol.iterator;function D(a){for(var b=arguments.length-1,e="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)e+="&args[]="+encodeURIComponent(arguments[c+1]);n(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e)}
var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function F(a,b,e){this.props=a;this.context=b;this.refs=p;this.updater=e||E}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?D("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function G(){}
G.prototype=F.prototype;function H(a,b,e){this.props=a;this.context=b;this.refs=p;this.updater=e||E}var I=H.prototype=new G;I.constructor=H;k(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,c)&&!L.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];d.children=l}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:t,type:a,key:g,ref:h,props:d,_owner:J.current}}
function N(a){return"object"===typeof a&&null!==a&&a.$$typeof===t}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,e,c){if(P.length){var d=P.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a)}
function S(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case t:case u:g=!0}}if(g)return e(c,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+T(d,h);g+=S(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=C&&a[C]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),
h=0;!(d=a.next()).done;)d=d.value,f=b+T(d,h++),g+=S(d,f,e,c);else"object"===d&&(e=""+a,D("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function T(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function U(a,b){a.func.call(a.context,b,a.count++)}
function V(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?W(a,c,e,q.thatReturnsArgument):null!=a&&(N(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+e,a={$$typeof:t,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function W(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(O,"$&/")+"/");b=Q(b,g,c,d);null==a||S(a,"",V,b);R(b)}
var X={Children:{map:function(a,b,e){if(null==a)return a;var c=[];W(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=Q(null,null,b,e);null==a||S(a,"",U,b);R(b)},count:function(a){return null==a?0:S(a,"",q.thatReturnsNull,null)},toArray:function(a){var b=[];W(a,b,null,q.thatReturnsArgument);return b},only:function(a){N(a)?void 0:D("143");return a}},createRef:function(){return{current:null}},Component:F,PureComponent:H,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:z,
_calculateChangedBits:b,_defaultValue:a,_currentValue:a,_currentValue2:a,_changedBits:0,_changedBits2:0,Provider:null,Consumer:null};a.Provider={$$typeof:y,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:B,render:a}},Fragment:v,StrictMode:w,unstable_AsyncMode:A,unstable_Profiler:x,createElement:M,cloneElement:function(a,b,e){null===a||void 0===a?D("267",a):void 0;var c=void 0,d=k({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=J.current);void 0!==
b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)K.call(b,c)&&!L.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==l?l[c]:b[c])}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];d.children=l}return{$$typeof:t,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.4.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:J,
assign:k}},Y={default:X},Z=Y&&X||Y;module.exports=Z.default?Z.default:Z;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(35);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(36);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var Component, E, EntitiesBar, EntityPreview, distance, entity_classes,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Component} = __webpack_require__(1));

E = __webpack_require__(2);

({entity_classes, distance} = __webpack_require__(0));

EntityPreview = __webpack_require__(13);

module.exports = EntitiesBar = class EntitiesBar extends Component {
  constructor() {
    var EntityClass, cell, cell_name, entity_class_name, preview_entity;
    super();
    this.update = this.update.bind(this);
    this.state = {
      visible: false
    };
    this.cells = [];
    this.entity_previews = [];
    for (entity_class_name in entity_classes) {
      EntityClass = entity_classes[entity_class_name];
      cell_name = entity_class_name.replace(/[a-z][A-Z]/g, function(m) {
        return `${m[0]} ${m[1]}`;
      });
      preview_entity = new EntityClass;
      preview_entity.initLayout();
      cell = {
        EntityClass,
        name: cell_name,
        preview_entity
      };
      this.cells.push(cell);
    }
  }

  render() {
    var cell, cell_preview_width, editor, i, max_cell_preview_height, visible;
    ({editor} = this.props);
    ({visible} = this.state);
    cell_preview_width = 200;
    max_cell_preview_height = 100;
    this.entity_previews = [];
    return E(".bar.sidebar.entities-bar", {
      class: {visible}
    }, (function() {
      var j, len, ref, results;
      ref = this.cells;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        cell = ref[i];
        results.push(E("article.cell.grabbable", {
          key: i,
          onMouseDown: ((cell) => {
            return (e) => {
              var mouse_start, onmousemove, onmouseup;
              editor.selected_entities = [];
              mouse_start = {
                x: e.clientX,
                y: e.clientY
              };
              addEventListener("mousemove", onmousemove = (e) => {
                if (distance(mouse_start, {
                  x: e.clientX,
                  y: e.clientY
                }) > 4) {
                  return editor.undoable(() => {
                    var entity;
                    entity = new cell.EntityClass;
                    entity.initLayout();
                    editor.world.entities.push(entity);
                    editor.dragEntities([entity]);
                    removeEventListener("mousemove", onmousemove);
                    return removeEventListener("mouseup", onmouseup);
                  });
                }
              });
              return addEventListener("mouseup", onmouseup = (e) => {
                removeEventListener("mousemove", onmousemove);
                return removeEventListener("mouseup", onmouseup);
              });
            };
          })(cell)
        }, E("h1.name", cell.name), E(EntityPreview, {
          entity: cell.preview_entity,
          max_width: cell_preview_width,
          max_height: max_cell_preview_height,
          ref: (ep) => {
            if (ep != null) {
              return this.entity_previews.push(ep);
            }
          }
        })));
      }
      return results;
    }).call(this));
  }

  update(show) {
    var editor, entity_preview, j, len, ref, results;
    boundMethodCheck(this, EntitiesBar);
    ({editor} = this.props);
    show = show && editor.dragging_entities.length === 0 && !editor.editing_entity;
    if (show !== this.state.visible) {
      this.setState({
        visible: show
      });
    }
    if (show) {
      ref = this.entity_previews;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        entity_preview = ref[j];
        results.push(entity_preview.update());
      }
      return results;
    }
  }

};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var AnimBar, AnimGroup, Component, E, entity_classes,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Component} = __webpack_require__(1));

E = __webpack_require__(2);

({entity_classes} = __webpack_require__(0));

AnimGroup = __webpack_require__(41);

module.exports = AnimBar = class AnimBar extends Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.state = {
      visible: false
    };
  }

  render() {
    var EntityClass, editing_an_animation, editor, entity, ref, visible;
    ({editor} = this.props);
    ({visible, EntityClass} = this.state);
    entity = (ref = editor.editing_entity) != null ? ref : this.shown_entity;
    editing_an_animation = editor.editing_entity_animation_frame_index != null;
    this.shown_entity = entity;
    this.anims = [];
    // TODO: remove references from @anims on Anim::componentWillUnmount
    return E(".bar.sidebar.anim-bar", {
      class: {visible}
    }, E(".anims", E("h1", "Poses"), E(AnimGroup, {
      entity,
      EntityClass,
      array_to_push_anims_to: this.anims,
      update: this.update,
      editor,
      type_of_anims: "poses"
    }), E("h1", "Animations"), E(AnimGroup, {
      entity,
      EntityClass,
      array_to_push_anims_to: this.anims,
      update: this.update,
      editor,
      type_of_anims: "animations"
    })), E(".animation-frames", {
      class: {
        visible: visible && editing_an_animation
      }
    }, E("h1", "Frames"), E(AnimGroup, {
      entity,
      EntityClass,
      array_to_push_anims_to: this.anims,
      update: this.update,
      editor,
      type_of_anims: "animation-frames",
      editing_frame_index: editor.editing_entity_animation_frame_index
    })));
  }

  update(show) {
    var EntityClass, anim, editing_entity, editing_entity_anim_name, editor, i, len, pose, ref;
    boundMethodCheck(this, AnimBar);
    ({editor} = this.props);
    ({editing_entity_anim_name, editing_entity} = editor);
    EntityClass = editing_entity != null ? entity_classes[editing_entity._class_] : void 0;
    show = show && (EntityClass != null ? EntityClass.animations : void 0);
    if (show) {
      ref = this.anims;
      for (i = 0, len = ref.length; i < len; i++) {
        anim = ref[i];
        pose = anim.props.get_pose();
        if (pose != null) {
          anim.entity_preview.entity.structure.setPose(pose);
          anim.entity_preview.update();
        }
      }
    }
    return this.setState({
      visible: show,
      EntityClass,
      editing_entity_anim_name
    });
  }

};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var Anim, AnimGroup, Component, E, Entity, Pose, ReactDOM,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Component} = __webpack_require__(1));

ReactDOM = __webpack_require__(6);

E = __webpack_require__(2);

Anim = __webpack_require__(42);

Pose = __webpack_require__(5);

Entity = __webpack_require__(4);

module.exports = AnimGroup = class AnimGroup extends Component {
  constructor() {
    super(...arguments);
    this.componentDidMount = this.componentDidMount.bind(this);
    // XXX: have to upgrade when the bar becomes visible
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  render() {
    var EntityClass, animation, animation_name, array_to_push_anims_to, editor, entity, frame, frame_index, frames, i, pose, pose_name, type_of_anims, update;
    ({entity, EntityClass, array_to_push_anims_to, update, type_of_anims, editor} = this.props);
    return E(".anim-group", (function() {
      var j, len, ref, ref1, results, results1, results2;
      if (EntityClass != null) {
        if (type_of_anims === "poses") {
          if (EntityClass.poses != null) {
            if (Object.keys(EntityClass.poses).length > 0) {
              i = 0;
              ref = EntityClass.poses;
              results = [];
              for (pose_name in ref) {
                pose = ref[pose_name];
                results.push(((pose_name, pose) => {
                  var selected;
                  i += 1;
                  selected = editor.editing_entity_anim_name === pose_name && (editor.editing_entity_animation_frame_index == null);
                  return E(Anim, {
                    key: i,
                    name: pose_name,
                    entity,
                    EntityClass,
                    selected,
                    editor,
                    update,
                    type_of_anims,
                    // pose
                    select: () => {
                      editor.editing_entity_anim_name = pose_name;
                      editor.editing_entity_animation_frame_index = null;
                      if (pose_name !== "Current Pose") {
                        return entity.structure.setPose(EntityClass.poses[pose_name]);
                      }
                    },
                    delete_item: () => {
                      delete EntityClass.poses[pose_name];
                      editor.editing_entity_anim_name = "Current Pose";
                      return editor.editing_entity_animation_frame_index = null;
                    },
                    get_pose: () => {
                      if (pose_name === "Current Pose" || selected) {
                        return entity.structure.getPose();
                      } else {
                        return EntityClass.poses[pose_name];
                      }
                    },
                    ref: (anim) => {
                      if (anim != null) {
                        return array_to_push_anims_to.push(anim);
                      }
                    }
                  });
                })(pose_name, pose));
              }
              return results;
            } else {
              return E("article.placeholder", {
                key: "placeholder"
              }, "No poses");
            }
          } else {
            return E("article.placeholder", {
              key: "placeholder"
            }, "Entity class is not initialized for animation");
          }
        } else if (type_of_anims === "animations") {
          if (EntityClass.animations != null) {
            if (Object.keys(EntityClass.animations).length > 0) {
              i = 0;
              ref1 = EntityClass.animations;
              results1 = [];
              for (animation_name in ref1) {
                animation = ref1[animation_name];
                results1.push(((animation_name, animation) => {
                  var selected;
                  i += 1;
                  selected = editor.editing_entity_anim_name === animation_name && (editor.editing_entity_animation_frame_index != null);
                  return E(Anim, {
                    key: i,
                    name: animation_name,
                    entity,
                    EntityClass,
                    selected,
                    editor,
                    update,
                    type_of_anims,
                    // animation
                    // TODO: bounds of anim should be determined across all frames
                    select: () => {
                      var ref2;
                      editor.editing_entity_anim_name = animation_name;
                      editor.editing_entity_animation_frame_index = 0;
                      pose = (ref2 = EntityClass.animations[animation_name]) != null ? ref2[0] : void 0;
                      if (pose) {
                        return entity.structure.setPose(pose);
                      }
                    },
                    delete_item: () => {
                      delete EntityClass.animations[animation_name];
                      editor.editing_entity_anim_name = "Current Pose";
                      return editor.editing_entity_animation_frame_index = null;
                    },
                    get_pose: () => {
                      // TODO: animate only if anim is the hovered||selected one
                      animation = EntityClass.animations[animation_name];
                      if (!animation) { // TODO: shouldn't need this or other ?s
                        return;
                      }
                      return Pose.lerpAnimationLoop(animation, EntityClass.animations[animation_name].length * Date.now() / 1000 / 2);
                    },
                    ref: (anim) => {
                      if (anim != null) {
                        return array_to_push_anims_to.push(anim);
                      }
                    }
                  });
                })(animation_name, animation));
              }
              return results1;
            } else {
              return E("article.placeholder", {
                key: "placeholder"
              }, "No animations");
            }
          } else {
            return E("article.placeholder", {
              key: "placeholder"
            }, "Entity class is not initialized for animation");
          }
        } else if (type_of_anims === "animation-frames") {
          if (EntityClass.animations != null) {
            animation_name = editor.editing_entity_anim_name;
            frames = EntityClass.animations[animation_name];
            if (frames != null) {
              results2 = [];
              for (frame_index = j = 0, len = frames.length; j < len; frame_index = ++j) {
                frame = frames[frame_index];
                results2.push(((frame, frame_index) => {
                  var selected;
                  selected = editor.editing_entity_anim_name === animation_name && editor.editing_entity_animation_frame_index === frame_index;
                  return E(Anim, {
                    key: frame_index,
                    name: `Frame ${frame_index}`,
                    entity,
                    EntityClass,
                    selected,
                    editor,
                    update,
                    type_of_anims,
                    // animation frame
                    select: () => {
                      editor.editing_entity_anim_name = animation_name;
                      editor.editing_entity_animation_frame_index = frame_index;
                      pose = EntityClass.animations[animation_name][frame_index];
                      return entity.structure.setPose(pose);
                    },
                    delete_item: () => {
                      return EntityClass.animations[animation_name].splice(frame_index, 1);
                    },
                    get_pose: () => {
                      if (selected) {
                        return entity.structure.getPose();
                      } else {
                        animation = EntityClass.animations[animation_name];
                        return animation != null ? animation[frame_index] : void 0;
                      }
                    },
                    ref: (anim) => {
                      if (anim != null) {
                        return array_to_push_anims_to.push(anim);
                      }
                    }
                  });
                })(frame, frame_index));
              }
              return results2;
            } else {
              return E("article.placeholder", {
                key: "placeholder"
              }, "Error: Trying to display the frames of a non-existant animation");
            }
          } else {
            return E("article.placeholder", {
              key: "placeholder"
            }, "Error: Entity class is not initialized for animation, trying to display the frames of an animation?");
          }
        } else {
          return E("article.placeholder", {
            key: "placeholder"
          }, `Error: weird type_of_anims for AnimGroup ${type_of_anims}`);
        }
      }
    }).call(this), E("button.add-anim-fab.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored", {
      key: "add-button",
      ref: (new_anim_button) => {
        this.new_anim_button = new_anim_button;
      },
      onClick: () => {
        var default_name, new_name, new_pose;
        if (type_of_anims === "animation-frames") {
          animation = EntityClass.animations[editor.editing_entity_anim_name];
          new_pose = entity.structure.getPose();
          animation.push(new_pose);
          editor.editing_entity_animation_frame_index = animation.length - 1;
        } else {
          default_name = (function() {
            switch (type_of_anims) {
              case "poses":
                return "New Pose";
              case "animations":
                return "New Animation";
            }
          })();
          new_name = default_name;
          i = 1;
          while (EntityClass[type_of_anims][new_name] != null) {
            new_name = `${default_name} ${i}`;
            i += 1;
          }
          switch (type_of_anims) {
            case "poses":
              EntityClass.poses[new_name] = entity.structure.getPose();
              editor.editing_entity_animation_frame_index = null;
              break;
            case "animations":
              EntityClass.animations[new_name] = [entity.structure.getPose()];
              editor.editing_entity_animation_frame_index = 0;
          }
          editor.editing_entity_anim_name = new_name;
        }
        Entity.saveAnimations(EntityClass);
        return update();
      }
    }, E("i.material-icons", "add")));
  }

  componentDidMount() {
    boundMethodCheck(this, AnimGroup);
    return componentHandler.upgradeElement(ReactDOM.findDOMNode(this.new_anim_button));
  }

  componentDidUpdate() {
    boundMethodCheck(this, AnimGroup);
    return componentHandler.upgradeElement(ReactDOM.findDOMNode(this.new_anim_button));
  }

};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// awkward component Anim represents a pose OR an animation OR an animation frame (which is an unnamed pose)
var Anim, Component, E, Entity, EntityPreview, ReactDOM, rename_object_key;

({Component} = __webpack_require__(1));

ReactDOM = __webpack_require__(6);

E = __webpack_require__(2);

EntityPreview = __webpack_require__(13);

Entity = __webpack_require__(4);

({rename_object_key} = __webpack_require__(0));

module.exports = Anim = class Anim extends Component {
  constructor() {
    super();
  }

  render() {
    var EntityClass, delete_item, editor, entity, name, select, selected, type_of_anims, update;
    ({entity, EntityClass, name, type_of_anims, selected, select, delete_item, update, editor} = this.props);
    return E("article", {
      class: {selected},
      onClick: (e) => {
        if (e.defaultPrevented) {
          return;
        }
        select();
        return update();
      }
    // TODO: for animation-frames, instead of a textfield have a reorder handle and a duration control
    // well, a reorder handle might be nice for the other anims too
    }, name === "Current Pose" ? E("h1.name", name) : E(".title-bar", E(".mdl-textfield.mdl-js-textfield.name", {
      ref: (mdl_textfield_el) => {
        this.mdl_textfield_el = mdl_textfield_el;
      }
    }, E("input.mdl-textfield__input", {
      value: name,
      onChange: (e) => {
        var anims_object, new_name;
        new_name = e.target.value;
        // TODO: use error classes and messages instead of instrusive alerts
        if (type_of_anims === "animations") {
          if (EntityClass.animations[new_name]) {
            alert(`There's already an animation with the name ${new_name}`);
            return;
          }
        } else if (type_of_anims === "poses") {
          if (EntityClass.poses[new_name]) {
            alert(`There's already a pose with the name ${new_name}`);
            return;
          }
        } else {
          return;
        }
        anims_object = EntityClass[type_of_anims];
        rename_object_key(anims_object, name, new_name);
        editor.editing_entity_anim_name = new_name;
        Entity.saveAnimations(EntityClass);
        
        // cause rerender immediately so cursor doesn't get moved to the end of the field
        return update();
      }
    }), E("label.mdl-textfield__label", "Name...")), E("button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete", {
      onClick: (e) => {
        e.preventDefault();
        delete_item();
        return Entity.saveAnimations(EntityClass);
      }
    }, E("i.material-icons", "delete"))), E(EntityPreview, {
      entity,
      max_width: 200,
      max_height: 100,
      ref: (entity_preview) => {
        this.entity_preview = entity_preview;
      }
    }));
  }

  componentDidMount() {
    if (this.mdl_textfield_el != null) {
      return componentHandler.upgradeElement(ReactDOM.findDOMNode(this.mdl_textfield_el));
    }
  }

};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var Component, E, ReactDOM, Terrain, TerrainBar,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ReactDOM = __webpack_require__(6);

({Component} = __webpack_require__(1));

E = __webpack_require__(2);

Terrain = __webpack_require__(7);

module.exports = TerrainBar = class TerrainBar extends Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.state = {
      visible: false
    };
  }

  render() {
    var brush_size, editor, sculpt_mode, visible;
    ({editor} = this.props);
    ({visible} = this.state);
    ({sculpt_mode, brush_size} = editor);
    return E(".bar.sidebar.terrain-bar", {
      class: {visible}
    }, E("h1", "Terrain"), E(".terrain-tools", E("label.mdl-switch.mdl-js-switch.mdl-js-ripple-effect", {
      // for: "toggle-sculpt-mode", ref: (@sculpt_mode_switch)=>
      // E "input.mdl-switch__input#toggle-sculpt-mode",
      ref: (sculpt_mode_switch) => {
        this.sculpt_mode_switch = sculpt_mode_switch;
      }
    }, E("input.mdl-switch__input", {
      type: "checkbox",
      checked: sculpt_mode,
      // FIXME: Warning: TerrainBar is changing a uncontrolled input of type checkbox to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.
      // checked: false is apparently interpreted by ReactScript as leaving off the checked attribute
      onChange: (e) => {
        editor.sculpt_mode = e.target.checked;
        return editor.renderDOM();
      }
    }), E("span.mdl-switch__label", "Sculpt Mode")), E("label", E("span.mdl-checkbox__label.mdl-slider__label", "Brush Size"), E("input.mdl-slider.mdl-js-slider", {
      type: "range",
      min: 0,
      max: 100,
      value: brush_size,
      tabIndex: 0,
      disabled: !sculpt_mode,
      ref: (brush_size_slider) => {
        this.brush_size_slider = brush_size_slider;
      },
      onChange: (e) => {
        editor.brush_size = e.target.value;
        return editor.renderDOM();
      }
    })), E("p", {
      style: {
        maxWidth: 400
      }
    }, sculpt_mode ? "Note: sculpt mode is not actually implemented. It currently just pushes points around in a generally unpleasant way." : void 0)));
  }

  componentDidMount() {
    componentHandler.upgradeElement(ReactDOM.findDOMNode(this.sculpt_mode_switch));
    return componentHandler.upgradeElement(ReactDOM.findDOMNode(this.brush_size_slider));
  }

  update(show) {
    var editing_entity, editor;
    boundMethodCheck(this, TerrainBar);
    ({editor} = this.props);
    ({editing_entity} = editor);
    show = show && editing_entity instanceof Terrain;
    return this.setState({
      visible: show
    });
  }

};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var PolygonStructure, Structure;

Structure = __webpack_require__(17);

module.exports = PolygonStructure = class PolygonStructure extends Structure {
  constructor() {
    super(); // calls @clear()
  }

  // don't need to worry about calling onchange because can't be set at this point
  clear() {
    super.clear();
    this.id_counter = 0;
    this.last_point_name = null;
    this.first_point_name = null;
    return typeof this.onchange === "function" ? this.onchange() : void 0;
  }

  toJSON() {
    var point_name, x, y;
    return {
      points: (function() {
        var ref, results;
        ref = this.points;
        results = [];
        for (point_name in ref) {
          ({x, y} = ref[point_name]);
          results.push({x, y});
        }
        return results;
      }).call(this)
    };
  }

  fromJSON(def) {
    var i, len, ref, results, x, y;
    this.points = {};
    this.segments = {};
    this.id_counter = 0;
    this.first_point_name = null;
    this.last_point_name = null;
    ref = def.points;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      ({x, y} = ref[i]);
      results.push(this.addVertex(x, y));
    }
    return results;
  }

  addVertex(x, y) {
    var from, name;
    from = this.last_point_name;
    name = ++this.id_counter;
    if (this.first_point_name == null) {
      this.first_point_name = name;
    }
    if (this.points[name]) {
      throw new Error(`point/segment '${name}' already exists adding vertex '${name}'`);
    }
    this.points[name] = {x, y, name};
    this.last_point_name = name;
    if (this.points[from]) {
      this.segments[name] = {
        a: this.points[from],
        b: this.points[name]
      };
      this.segments["closing"] = {
        a: this.points[this.last_point_name],
        b: this.points[this.first_point_name]
      };
    }
    return typeof this.onchange === "function" ? this.onchange() : void 0;
  }

  pointInPolygon({x, y}) {
    var inside, intersect, ref, segment, segment_name, xi, xj, yi, yj;
    inside = false;
    ref = this.segments;
    // for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    // 	xi = vs[i][0], yi = vs[i][1]
    // 	xj = vs[j][0], yj = vs[j][1]
    for (segment_name in ref) {
      segment = ref[segment_name];
      xi = segment.a.x;
      yi = segment.a.y;
      xj = segment.b.x;
      yj = segment.b.y;
      intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(46);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(48)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(47)(false);
// imports


// module
exports.push([module.i, ".editor {\r\n\t-webkit-touch-callout: none;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\tuser-select: none;\r\n}\r\n.grabbable {\r\n\tcursor: move; /* fallback if grab cursor is unsupported */\r\n\tcursor: grab;\r\n\tcursor: -moz-grab;\r\n\tcursor: -webkit-grab;\r\n}\r\n/* Apply a \"closed-hand\" cursor during drag operation. */\r\n.grabbable:active { \r\n\tcursor: grabbing;\r\n\tcursor: -moz-grabbing;\r\n\tcursor: -webkit-grabbing;\r\n}\r\n/* Sidebars */\r\n.bar {\r\n\tbackground: white;\r\n\ttransition: opacity 0.2s ease;\r\n\tdisplay: flex;\r\n\talign-items: stretch;\r\n\talign-content: flex-start;\r\n}\r\n.bar:not(.visible) {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n}\r\n.sidebar {\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\theight: 100%;\r\n\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\r\n\tflex-direction: column;\r\n}\r\n.bar article,\r\n.terrain-tools {\r\n\tpadding: 1rem;\r\n\tpadding-top: 0.5rem;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n.terrain-tools label {\r\n\tmargin-bottom: 1em;\r\n}\r\n.bar article:hover {\r\n\tbackground: rgba(0, 0, 0, 0.08);\r\n}\r\n.bar article:active,\r\n.bar article.selected {\r\n\tbackground: rgba(0, 0, 0, 0.12);\r\n}\r\n.bar article canvas {\r\n\tbackground: rgba(50, 200, 255, 0.7);\r\n}\r\n.bar article:hover canvas,\r\n.bar article:active canvas,\r\n.bar article.selected canvas {\r\n\tbackground: rgba(50, 200, 255, 1);\r\n}\r\n.bar h1 {\r\n\ttext-align: center;\r\n\tfont-size: 2em;\r\n\tfont-weight: normal;\r\n\tmargin: 0.1em 0;\r\n}\r\n.bar article > h1 {\r\n\tpointer-events: none;\r\n}\r\n.bar article .title-bar {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n}\r\n.bar .name {\r\n\tfont-size: 1.2em;\r\n\tfont-weight: normal;\r\n\tfont-family: sans-serif;\r\n\tmargin: 0;\r\n\tmargin-bottom: 0.1em;\r\n}\r\n.entities-bar .name {\r\n\ttext-align: center;\r\n}\r\n.bar article .mdl-textfield {\r\n\twidth: auto;\r\n\tpadding: 0;\r\n\tpadding-bottom: 0.3rem;\r\n}\r\nbutton,\r\ncanvas,\r\nimg,\r\narticle, /* representing entities, poses, animations, animation frames - things with EntityPreviews in them */\r\n.anims > * { /* includes headings and .anim-groups */\r\n\tflex: 0 0 auto;\r\n}\r\n.anim-bar {\r\n\tflex-direction: row;\r\n\talign-items: flex-start;\r\n}\r\n.anim-bar > * {\r\n\theight: 100%;\r\n}\r\n/* TODO: refactor bars and subbars */\r\n.anim-bar > *:not(:first-child) {\r\n\tborder-left: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n.anims,\r\n.anim-group {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: stretch;\r\n}\r\n.anims,\r\n.animation-frames,\r\n.entities-bar {\r\n\toverflow-y: auto;\r\n\toverflow-x: hidden;\r\n}\r\n/* TODO: refactor bars and subbars */\r\n.animation-frames {\r\n\t/*transition: 0.1s ease;*/\r\n}\r\n.animation-frames:not(.visible) {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n\twidth: 0;\r\n\t/*transform: translate(-100%, 0);*/\r\n}\r\n.add-anim-fab {\r\n\tmargin: 0.5rem 0 !important;\r\n\talign-self: center;\r\n}\r\n.poses,\r\n.animations {\r\n\twidth: 100%;\r\n}\r\narticle.placeholder {\r\n\tpadding: 2rem;\r\n\ttext-align: center;\r\n\tbackground: rgba(128, 59, 110, 0.16);\r\n\tcolor: rgba(0, 0, 0, 0.5);\r\n\tfont-size: 1.4em;\r\n\tpointer-events: none;\r\n}\r\n\r\n.warning {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tz-index: 50;\r\n\tmargin: 15px;\r\n\tpadding: 15px;\r\n\tbackground: #FFF9C4;\r\n\tcolor: #BF360C;\r\n\tborder-radius: 2px;\r\n\ttransition: opacity 0.2s ease;\r\n}\r\n.warning:not(.show) {\r\n\tpointer-events: none;\r\n\topacity: 0;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(49);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 49 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, Terrain, World;

Entity = __webpack_require__(3);

Terrain = __webpack_require__(8);

module.exports = World = class World {
  constructor() {
    this.entities = [];
  }

  fromJSON(def) {
    var ent_def, entity, i, len, ref, results;
    if (!(def.entities instanceof Array)) {
      throw new Error(`Expected entities to be an array, got ${def.entities}`);
    }
    this.entities = (function() {
      var i, len, ref, results;
      ref = def.entities;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ent_def = ref[i];
        results.push(Entity.fromJSON(ent_def));
      }
      return results;
    })();
    ref = this.entities;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entity = ref[i];
      results.push(entity.resolveReferences(this));
    }
    return results;
  }

  getEntityByID(id) {
    var entity, i, len, ref;
    ref = this.entities;
    for (i = 0, len = ref.length; i < len; i++) {
      entity = ref[i];
      if (entity.id === id) {
        return entity;
      }
    }
  }

  getEntitiesOfType(Class) {
    var entity, i, len, ref, results;
    ref = this.entities;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entity = ref[i];
      if (entity instanceof Class) {
        results.push(entity);
      }
    }
    return results;
  }

  drawBackground(ctx, view) {
    ctx.fillStyle = "#32C8FF";
    return ctx.fillRect(0, 0, view.width, view.height);
  }

  draw(ctx, view) {
    var entity, i, len, ref, results;
    ref = this.entities;
    // ctx.fillStyle = "#32C8FF"
    // {x, y} = view.toWorld({x: 0, y: 0})
    // {x: width, y: height} = view.toWorld({x: view.width, y: view.height})
    // ctx.fillRect(x, y, width-x, height-y)
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entity = ref[i];
      ctx.save();
      ctx.translate(entity.x, entity.y);
      entity.draw(ctx, view);
      results.push(ctx.restore());
    }
    return results;
  }

  collision(point) {
    var entity, i, len, ref;
    ref = this.entities;
    for (i = 0, len = ref.length; i < len; i++) {
      entity = ref[i];
      if (entity instanceof Terrain) {
        if (entity.structure.pointInPolygon(entity.fromWorld(point))) {
          return true;
        }
      }
    }
    return false;
  }

};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var SavannaGrass, Terrain, addEntityClass, lineSegmentsIntersect;

Terrain = __webpack_require__(8);

({addEntityClass, lineSegmentsIntersect} = __webpack_require__(0));

module.exports = SavannaGrass = (function() {
  class SavannaGrass extends Terrain {
    constructor() {
      super();
      this.bbox_padding = 30;
      this.grass_tiles = new Map;
      this.grass_tiles.fromJSON = (map_obj) => {};
      this.grass_tiles.toJSON = (map_obj) => {
        return {};
      };
      this.structure.onchange = () => {
        return this.grass_tiles.forEach((tile) => {
          var blade, i, len, ref, results, shade;
          ref = ["dark", "light"];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            shade = ref[i];
            results.push((function() {
              var k, len1, ref1, results1;
              ref1 = tile[`${shade}_blades`];
              results1 = [];
              for (k = 0, len1 = ref1.length; k < len1; k++) {
                blade = ref1[k];
                results1.push(delete blade.visible);
              }
              return results1;
            })());
          }
          return results;
        });
      };
    }

    draw(ctx, view) {
      var bbox, blade, bottom, contains_any_points, dark_blades, first_tile_xi, first_tile_yi, i, j, k, l, last_tile_xi, last_tile_yi, left, len, len1, len2, len3, light_blades, m, n, o, p, point, point_name, q, random, rect_contains_any_points, rect_is_empty, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, right, shade, tile, tile_name, tile_size, tile_x, tile_xi, tile_y, tile_yi, top, view_point, x, y;
      rect_contains_any_points = (x, y, width, height) => {
        var contains_any_points, point, point_name, ref, ref1, ref2;
        contains_any_points = false;
        ref = this.structure.points;
        for (point_name in ref) {
          point = ref[point_name];
          if ((x <= (ref1 = point.x) && ref1 <= x + width) && (y <= (ref2 = point.y) && ref2 <= y + height)) {
            contains_any_points = true;
          }
        }
        return contains_any_points;
      };
      rect_is_empty = (x, y, width, height) => {
        var center_of_rect_is_in_polygon, center_point, ref, segment, segment_name, view_point;
        center_point = {
          x: this.x + x + width / 2,
          y: this.y + y + height / 2
        };
        view_point = view.fromWorld(center_point);
        center_of_rect_is_in_polygon = ctx.isPointInPath(view_point.x, view_point.y);
        ref = this.structure.segments;
        for (segment_name in ref) {
          segment = ref[segment_name];
          if (lineSegmentsIntersect(x, y, x, y + height, segment.a.x, segment.a.y, segment.b.x, segment.b.y) || lineSegmentsIntersect(x, y, x + width, y, segment.a.x, segment.a.y, segment.b.x, segment.b.y) || lineSegmentsIntersect(x + width, y, x + width, y + height, segment.a.x, segment.a.y, segment.b.x, segment.b.y) || lineSegmentsIntersect(x, y + height, x + width, y + height, segment.a.x, segment.a.y, segment.b.x, segment.b.y)) {
            // return center_of_rect_is_in_polygon
            return false;
          }
        }
        return !center_of_rect_is_in_polygon;
      };
      ctx.beginPath();
      ref = this.structure.points;
      for (point_name in ref) {
        point = ref[point_name];
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.fillStyle = "#C29853";
      ctx.fill();
      Math.seedrandom(5);
      random = Math.random;
      // TODO: try layers of chained triangles
      // like https://jsfiddle.net/evarildo/ds2ajjks/
      // and order tufts of grass based on y (along with the layers of triangles)?
      dark_blades = [];
      light_blades = [];
      bbox = this.bbox();
      tile_size = 300;
      // first_tile_x = floor(bbox.x / tile_size) * tile_size
      // last_tile_x = ceil((bbox.x + bbox.width) / tile_size) * tile_size
      // first_tile_y = floor(bbox.y / tile_size) * tile_size
      // last_tile_y = ceil((bbox.y + bbox.height) / tile_size) * tile_size
      // first_tile_x = (bbox.x // tile_size) * tile_size
      // last_tile_x = ((bbox.x + bbox.width) // tile_size) * tile_size
      // first_tile_y = (bbox.y // tile_size) * tile_size
      // last_tile_y = ((bbox.y + bbox.height) // tile_size) * tile_size
      // first_tile_xi = bbox.x // tile_size
      // last_tile_xi = (bbox.x + bbox.width) // tile_size
      // first_tile_yi = bbox.y // tile_size
      // last_tile_yi = (bbox.y + bbox.height) // tile_size
      // first_tile_x = first_tile_x * tile_size
      // last_tile_x = last_tile_x * tile_size
      // first_tile_y = first_tile_y * tile_size
      // last_tile_y = last_tile_y * tile_size
      // for tile_x in [first_tile_x..last_tile_x] by tile_size
      // 	tile_x -= @x
      // 	for tile_y in [first_tile_y..last_tile_y] by tile_size
      // 		tile_name = "(#{tile_x}, #{tile_y})"
      // 		tile_y -= @y
      left = bbox.x - this.x;
      top = bbox.y - this.y;
      right = left + bbox.width;
      bottom = top + bbox.height;
      first_tile_xi = Math.floor(left / tile_size);
      last_tile_xi = Math.floor(right / tile_size);
      first_tile_yi = Math.floor(top / tile_size);
      last_tile_yi = Math.floor(bottom / tile_size);
      for (tile_xi = i = ref1 = first_tile_xi, ref2 = last_tile_xi; (ref1 <= ref2 ? i <= ref2 : i >= ref2); tile_xi = ref1 <= ref2 ? ++i : --i) {
        for (tile_yi = k = ref3 = first_tile_yi, ref4 = last_tile_yi; (ref3 <= ref4 ? k <= ref4 : k >= ref4); tile_yi = ref3 <= ref4 ? ++k : --k) {
          tile_name = `(${tile_xi}, ${tile_yi})`;
          // tile_x = @x + tile_xi * tile_size
          // tile_y = @y + tile_yi * tile_size
          // tile_x = tile_xi * tile_size - @x
          // tile_y = tile_yi * tile_size - @y
          tile_x = tile_xi * tile_size;
          tile_y = tile_yi * tile_size;
          tile = this.grass_tiles.get(tile_name);
          contains_any_points = rect_contains_any_points(tile_x, tile_y, tile_size, tile_size);
          if (!((!contains_any_points) && rect_is_empty(tile_x, tile_y, tile_size, tile_size))) {
            if (tile == null) {
              tile = {
                dark_blades: [],
                light_blades: []
              };
              for (var l = 0; l <= 350; l++) {
                x = tile_x + random() * tile_size;
                y = tile_y + random() * tile_size;
                for (j = m = 0, ref5 = random() * 3 + 1; (0 <= ref5 ? m <= ref5 : m >= ref5); j = 0 <= ref5 ? ++m : --m) {
                  shade = random() < 0.5 ? "dark" : "light";
                  tile[`${shade}_blades`].push({x, y});
                  x += (random() + 1) * 3;
                }
              }
              this.grass_tiles.set(tile_name, tile);
            }
            ref6 = ["dark", "light"];
            
            // ctx.strokeStyle = "#f0f"
            // ctx.strokeRect(tile_x, tile_y, tile_size, tile_size)
            // ctx.fillStyle = "rgba(255, 0, 255, 0.1)"
            // ctx.fillRect(tile_x, tile_y, tile_size, tile_size)
            // # ctx.fillStyle = "rgba(255, 0, 255, 0.4)"
            // # ctx.fillRect(tile_x + tile_size/8, tile_y + tile_size/8, tile_size * 3/4, tile_size * 3/4)
            for (n = 0, len = ref6.length; n < len; n++) {
              shade = ref6[n];
              ref7 = tile[`${shade}_blades`];
              for (o = 0, len1 = ref7.length; o < len1; o++) {
                blade = ref7[o];
                point = this.toWorld(blade);
                if (view.testRect(point.x, point.y - 10, 0, 10, 15)) {
                  view_point = view.fromWorld(point);
                  if (blade.visible != null ? blade.visible : blade.visible = ctx.isPointInPath(view_point.x, view_point.y)) {
                    // if (not contains_any_points) or ctx.isPointInPath(view_point.x, view_point.y)
                    (shade === "dark" ? dark_blades : light_blades).push(blade);
                  }
                }
              }
            }
          }
        }
      }
      ctx.beginPath();
      for (p = 0, len2 = dark_blades.length; p < len2; p++) {
        ({x, y} = dark_blades[p]);
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.simplex.noise2D(-x + y + 78 + Date.now() / 2000, y + 549) * 5, y - (2 + this.simplex.noise2D(y * 40.45, x + 340)) * 10);
      }
      ctx.strokeStyle = "#B7863E";
      ctx.stroke();
      ctx.beginPath();
      for (q = 0, len3 = light_blades.length; q < len3; q++) {
        ({x, y} = light_blades[q]);
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.simplex.noise2D(-x + y + 78 + Date.now() / 2000, y + 549) * 5, y - (2 + this.simplex.noise2D(y * 40.45, x + 340)) * 10);
      }
      ctx.strokeStyle = "#D6AE77";
      return ctx.stroke();
    }

  };

  addEntityClass(SavannaGrass);

  return SavannaGrass;

}).call(this);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Rock, Terrain, addEntityClass;

Terrain = __webpack_require__(8);

({addEntityClass} = __webpack_require__(0));

module.exports = Rock = (function() {
  class Rock extends Terrain {
    constructor() {
      super();
      this.bbox_padding = 20;
    }

    draw(ctx, view) {
      var point, point_name, ref;
      ctx.beginPath();
      ref = this.structure.points;
      for (point_name in ref) {
        point = ref[point_name];
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.fillStyle = "#63625F";
      return ctx.fill();
    }

  };

  addEntityClass(Rock);

  return Rock;

}).call(this);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var SavannaTreeA, TAU, Tree, addEntityClass;

Tree = __webpack_require__(20);

({addEntityClass} = __webpack_require__(0));

TAU = Math.PI * 2;

module.exports = SavannaTreeA = (function() {
  class SavannaTreeA extends Tree {
    constructor() {
      super();
      this.branch({
        from: "base",
        to: "1",
        juice: 5,
        angle: -TAU / 2
      });
    }

    leaf(leaf) {
      leaf.radius = Math.random() * 15 + 15;
      leaf.scale_x = 2;
      leaf.scale_y = 1;
      leaf.color = "#627318"; //"#363D1B"
      return leaf;
    }

    draw(ctx) {
      var i, leaf, leaf_point_name, len, ref, ref1, results, segment, segment_name;
      ref = this.structure.segments;
      for (segment_name in ref) {
        segment = ref[segment_name];
        ctx.beginPath();
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
        ctx.lineWidth = segment.width;
        ctx.lineCap = "round";
        ctx.strokeStyle = segment.color;
        ctx.stroke();
      }
      ref1 = this.leaf_point_names;
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        leaf_point_name = ref1[i];
        leaf = this.structure.points[leaf_point_name];
        // ctx.beginPath()
        // ctx.arc(leaf.x, leaf.y, leaf.radius, 0, TAU)
        ctx.save();
        ctx.beginPath();
        ctx.translate(leaf.x, leaf.y);
        ctx.scale(leaf.scale_x, leaf.scale_y);
        ctx.arc(0, 0, leaf.radius, 0, TAU);
        ctx.fillStyle = leaf.color;
        ctx.fill();
        results.push(ctx.restore());
      }
      return results;
    }

  };

  addEntityClass(SavannaTreeA);

  return SavannaTreeA;

}).call(this);


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, GranddaddyLonglegs, TAU, addEntityClass, distance,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  indexOf = [].indexOf;

Entity = __webpack_require__(3);

({addEntityClass, distance} = __webpack_require__(0));

TAU = Math.PI * 2;

module.exports = GranddaddyLonglegs = (function() {
  class GranddaddyLonglegs extends Entity {
    constructor() {
      var foot_point_name, i, j, k, l, leg, leg_pair_n, len, len1, len2, point, point_name, previous, ref, ref1, ref2, ref3, segment_name, side;
      super();
      this.structure.addPoint("body");
      this.foot_point_names = [];
      this.legs = [];
      for (leg_pair_n = i = 1; i <= 4; leg_pair_n = ++i) {
        ref = ["left", "right"];
        for (j = 0, len = ref.length; j < len; j++) {
          side = ref[j];
          leg = {
            point_names_by_segment_name: {}
          };
          this.legs.push(leg);
          previous = "body";
          ref1 = ["upper", "middle", "lower"];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            segment_name = ref1[k];
            point_name = segment_name === "lower" ? foot_point_name = `${side} foot ${leg_pair_n}` : (foot_point_name = void 0, `${segment_name} ${side} leg ${leg_pair_n}`);
            previous = this.structure.addSegment({
              from: previous,
              to: foot_point_name,
              name: `${segment_name} ${side} leg ${leg_pair_n}`,
              length: 50,
              // NOTE: opiliones (harvestmen) (granddaddy longlegses) (granddaddies-longlegs?))
              // often have vastly more spindly legs
              width: (function() {
                switch (segment_name) {
                  case "upper":
                    return 4;
                  case "middle":
                    return 3;
                  case "lower":
                    return 2;
                }
              })()
            });
            leg.point_names_by_segment_name[segment_name] = point_name;
            leg.foot_point_name = foot_point_name;
            if (foot_point_name != null) {
              this.foot_point_names.push(foot_point_name);
            }
          }
        }
      }
      this.step_index = 0;
      this.step_timer = 0;
      this.next_foot_positions = {};
      ref2 = this.foot_point_names;
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        point_name = ref2[l];
        this.next_foot_positions[point_name] = {
          x: 0,
          y: 0
        };
      }
      ref3 = this.structure.points;
      for (point_name in ref3) {
        point = ref3[point_name];
        point.vx = 0;
        point.vy = 0;
      }
      this.bbox_padding = 20;
    }

    step(world) {
      var collision, current_foot_point_name, current_foot_pos, dist, foot_point, force, i, j, k, l, leg, len, next_foot_pos, point_name, ref, ref1, results, segment_name;
      if (this.toWorld(this.structure.points[this.foot_point_names[0]]).y > 400) {
        return;
      }
      if (++this.step_timer >= 10) {
        this.step_timer = 0;
        this.step_index += 1;
        current_foot_point_name = this.foot_point_names[modulo(this.step_index, this.foot_point_names.length)];
        current_foot_pos = this.structure.points[current_foot_point_name];
        next_foot_pos = {
          x: current_foot_pos.x,
          y: current_foot_pos.y
        };
        next_foot_pos.x += 50;
        next_foot_pos.y -= 50;
        for (var i = 0; i <= 50; i++) {
          next_foot_pos.y += 5;
          if (world.collision(this.toWorld(next_foot_pos))) {
            next_foot_pos.y -= 5;
            break;
          }
        }
        this.next_foot_positions[current_foot_point_name] = next_foot_pos;
      }
      ref = this.legs;
      for (j = 0, len = ref.length; j < len; j++) {
        leg = ref[j];
        foot_point = this.structure.points[leg.foot_point_name];
        next_foot_pos = this.next_foot_positions[leg.foot_point_name];
        ref1 = leg.point_names_by_segment_name;
        for (segment_name in ref1) {
          point_name = ref1[segment_name];
          this.structure.points[point_name].vx += (next_foot_pos.x - foot_point.x) / 200;
          if (indexOf.call(this.foot_point_names, point_name) < 0) {
            this.structure.points[point_name].vy -= 0.6;
          }
        }
        dist = distance(next_foot_pos, foot_point);
        force = 2;
        foot_point.vx += (next_foot_pos.x - foot_point.x) / dist * force;
        foot_point.vy += (next_foot_pos.y - foot_point.y) / dist * force;
      }
      this.structure.points["body"].vy -= 0.2;
      collision = (point) => {
        return world.collision(this.toWorld(point));
      };
      this.structure.stepLayout({
        gravity: 0.5,
        collision
      });
      for (var k = 0; k <= 10; k++) {
        this.structure.stepLayout();
      }
      results = [];
      for (var l = 0; l <= 4; l++) {
        results.push(this.structure.stepLayout({collision}));
      }
      return results;
    }

    draw(ctx) {
      var ref, segment, segment_name;
      ref = this.structure.segments;
      for (segment_name in ref) {
        segment = ref[segment_name];
        ctx.beginPath();
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
        ctx.lineWidth = segment.width;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#2c1c0a"; //"brown"
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.translate(this.structure.points.body.x, this.structure.points.body.y);
      ctx.scale(1, 0.7);
      ctx.arc(0, 0, 10, 0, TAU);
      ctx.fillStyle = "#2c1c0a"; //"#C15723" #"brown"
      return ctx.fill();
    }

  };

  addEntityClass(GranddaddyLonglegs);

  return GranddaddyLonglegs;

}).call(this);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var Arrow, Bow, Entity, Player, Pose, SimpleActor, TAU, addEntityClass, distance, distanceToLineSegment, keyboard;

SimpleActor = __webpack_require__(19);

Entity = __webpack_require__(3);

Pose = __webpack_require__(5);

Bow = __webpack_require__(21);

Arrow = __webpack_require__(22);

keyboard = __webpack_require__(18);

({addEntityClass, distance, distanceToLineSegment} = __webpack_require__(0));

TAU = Math.PI * 2;

module.exports = Player = (function() {
  class Player extends SimpleActor {
    constructor() {
      super();
      this.structure.addPoint("head");
      this.structure.addSegment({
        from: "head",
        name: "neck",
        length: 5
      });
      this.structure.addSegment({
        from: "neck",
        name: "sternum",
        length: 2
      });
      this.structure.addSegment({
        from: "sternum",
        name: "left shoulder",
        length: 2
      });
      this.structure.addSegment({
        from: "sternum",
        name: "right shoulder",
        length: 2
      });
      this.structure.addSegment({
        from: "left shoulder",
        to: "left elbo",
        name: "upper left arm",
        length: 10
      });
      this.structure.addSegment({
        from: "right shoulder",
        to: "right elbo",
        name: "upper right arm",
        length: 10
      });
      this.structure.addSegment({
        from: "left elbo",
        to: "left hand",
        name: "lower left arm",
        length: 10
      });
      this.structure.addSegment({
        from: "right elbo",
        to: "right hand",
        name: "lower right arm",
        length: 10
      });
      this.structure.addSegment({
        from: "sternum",
        to: "pelvis",
        name: "torso",
        length: 20
      });
      this.structure.addSegment({
        from: "pelvis",
        name: "left hip",
        length: 2
      });
      this.structure.addSegment({
        from: "pelvis",
        name: "right hip",
        length: 2
      });
      this.structure.addSegment({
        from: "left hip",
        to: "left knee",
        name: "upper left leg",
        length: 10
      });
      this.structure.addSegment({
        from: "right hip",
        to: "right knee",
        name: "upper right leg",
        length: 10
      });
      this.structure.addSegment({
        from: "left knee",
        to: "left foot",
        name: "lower left leg",
        length: 10
      });
      this.structure.addSegment({
        from: "right knee",
        to: "right foot",
        name: "lower right leg",
        length: 10
      });
      // for abc in "ABC"
      // 	hair_from = "head"
      // 	for i in [0..5]
      // 		@structure.addSegment(
      // 			from: "head"
      // 			name: "hair #{abc} #{i}"
      // 			length: 2
      // 		)
      // TODO: adjust proportions? https://en.wikipedia.org/wiki/Body_proportions
      // TODO: add some constraints to hips, shoulders, and neck
      // TODO: min/max_length for psuedo-3D purposes
      this.bbox_padding = 10;
      this.holding_bow = null;
      this.holding_arrow = null;
      this.bow_drawn_to = 0;
      this.run_animation_position = 0;
      this.subtle_idle_animation_position = 0;
      this.other_idle_animation_position = 0;
      this.idle_animation = null;
      this.idle_timer = 0;
      this.smoothed_vy = 0;
      this.hair_x_scales = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    step(world, view, mouse) {
      var aim_angle, angle, arm_span, arrow, arrow_angle, bow, bow_angle, dont_idle, draw_bow, draw_to, force, from_point_in_world, hold_offset, left, max_draw_distance, mouse_in_world, new_pose, other_idle_animation, pick_up_any, point, point_name, primary_elbo, primary_hand, primary_hand_in_arrow_space, primary_hand_in_bow_space, prime_bow, ref, ref1, right, secondary_elbo, secondary_hand, secondary_hand_in_arrow_space, secondary_hand_in_bow_space, sternum, subtle_idle_animation;
      left = keyboard.isHeld("A") || keyboard.isHeld("left");
      right = keyboard.isHeld("D") || keyboard.isHeld("right");
      this.jump = keyboard.wasJustPressed("W") || keyboard.wasJustPressed("up");
      // TODO: gamepad support
      // TODO: configurable controls
      this.move_x = right - left;
      super.step(world);
      ({sternum} = this.structure.points);
      from_point_in_world = this.toWorld(sternum);
      mouse_in_world = view.toWorld(mouse);
      aim_angle = Math.atan2(mouse_in_world.y - from_point_in_world.y, mouse_in_world.x - from_point_in_world.x);
      pick_up_any = (EntityClass, prop) => {
        var dist, entity, from_point_in_entity_space, j, len, moving_too_fast, pickup_item, point, point_name, ref, ref1, ref2, ref3, segment, segment_name;
        if ((ref = this[prop]) != null ? ref.destroyed : void 0) {
          this[prop] = null;
        }
        if (this[prop]) {
          return;
        }
        ref1 = world.getEntitiesOfType(EntityClass);
        // this is ridiculously complicated
        for (j = 0, len = ref1.length; j < len; j++) {
          entity = ref1[j];
          from_point_in_entity_space = entity.fromWorld(from_point_in_world);
          moving_too_fast = false;
          ref2 = entity.structure.points;
          for (point_name in ref2) {
            point = ref2[point_name];
            if ((point.vx != null) && (point.vy != null)) {
              if (Math.abs(point.vx) + Math.abs(point.vy) > 2) {
                moving_too_fast = true;
                break;
              }
            }
          }
          if (!moving_too_fast) {
            ref3 = entity.structure.segments;
            for (segment_name in ref3) {
              segment = ref3[segment_name];
              dist = distanceToLineSegment(from_point_in_entity_space, segment.a, segment.b);
              if (dist < 50) {
                pickup_item = entity;
              }
            }
          }
        }
        if (pickup_item) {
          // TODO: pickup animation
          return this[prop] = pickup_item;
        }
      };
      pick_up_any(Bow, "holding_bow");
      pick_up_any(Arrow, "holding_arrow");
      dont_idle = () => {
        this.idle_timer = 0;
        return this.idle_animation = null;
      };
      if (this.move_x === 0) {
        this.idle_timer += 1;
        subtle_idle_animation = Player.animations["Idle"];
        if (this.idle_timer > 1000) {
          this.idle_animation = "Yawn";
          this.idle_timer = 0;
          this.other_idle_animation_position = 0;
        }
        other_idle_animation = this.idle_animation && Player.animations[this.idle_animation];
        if (other_idle_animation) {
          this.other_idle_animation_position += 1 / 25;
          if (this.other_idle_animation_position > other_idle_animation.length) {
            this.idle_animation = null;
          }
          new_pose = Pose.lerpAnimationLoop(other_idle_animation, this.other_idle_animation_position);
        } else if (subtle_idle_animation) {
          this.subtle_idle_animation_position += 1 / 25;
          new_pose = Pose.lerpAnimationLoop(subtle_idle_animation, this.subtle_idle_animation_position);
        } else {
          new_pose = (ref = Player.poses["Stand"]) != null ? ref : this.structure.getPose();
        }
      } else {
        dont_idle();
        if (Player.animations["Run"]) {
          this.run_animation_position += Math.abs(this.move_x) / 5;
          new_pose = Pose.lerpAnimationLoop(Player.animations["Run"], this.run_animation_position);
        } else {
          new_pose = this.structure.getPose();
        }
      }
      if (this.facing_x < 0) {
        new_pose = Pose.horizontallyFlip(new_pose);
      }
      this.structure.setPose(Pose.lerp(this.structure.getPose(), new_pose, 0.3));
      
      // (her dominant eye is, of course, *whichever one she would theoretically be using*)
      // (given this)
      primary_hand = this.structure.points["right hand"];
      secondary_hand = this.structure.points["left hand"];
      primary_elbo = this.structure.points["right elbo"];
      secondary_elbo = this.structure.points["left elbo"];
      prime_bow = this.holding_bow && mouse.RMB.down; // and @holding_arrow
      draw_bow = prime_bow && mouse.LMB.down;
      
      // TODO: transition (both ways) between primed and not
      // also maybe relax the "primed" state when running and not drawn back
      if (this.holding_bow) {
        bow = this.holding_bow;
        bow.x = this.x;
        bow.y = this.y;
        arm_span = this.structure.segments["upper right arm"].length + this.structure.segments["lower right arm"].length;
        max_draw_distance = 6;
        // max_draw_distance = arm_span / 2.5 #- bow.fistmele
        bow.draw_distance += ((max_draw_distance * draw_bow) - bow.draw_distance) / 15;
        draw_to = arm_span - bow.fistmele - bow.draw_distance;
        if (draw_bow) {
          // TODO: use better transition to allow for greater control over release velocity
          bow.draw_distance += (5 - bow.draw_distance) / 5;
          this.bow_drawn_to = draw_to;
        } else {
          if (prime_bow && this.holding_arrow && bow.draw_distance > 2) {
            force = bow.draw_distance * 2;
            ref1 = this.holding_arrow.structure.points;
            for (point_name in ref1) {
              point = ref1[point_name];
              point.vx = Math.cos(aim_angle) * force;
              point.vy = Math.sin(aim_angle) * force;
            }
            this.holding_arrow = null;
          }
          bow.draw_distance = 0;
          // FIXME: this should be an ease-in transition, not ease-out
          this.bow_drawn_to += (arm_span - bow.fistmele - this.bow_drawn_to) / 10;
        }
        if (prime_bow) {
          dont_idle();
          bow_angle = aim_angle;
          primary_hand.x = sternum.x + this.bow_drawn_to * Math.cos(aim_angle);
          primary_hand.y = sternum.y + this.bow_drawn_to * Math.sin(aim_angle);
          primary_elbo.x = sternum.x + 5 * Math.cos(aim_angle);
          primary_elbo.y = sternum.y + 5 * Math.sin(aim_angle);
          // primary_elbo.y = sternum.y - 3
          secondary_hand.x = sternum.x + arm_span * Math.cos(aim_angle);
          secondary_hand.y = sternum.y + arm_span * Math.sin(aim_angle);
          secondary_elbo.x = sternum.x + 15 * Math.cos(aim_angle);
          secondary_elbo.y = sternum.y + 15 * Math.sin(aim_angle);
        } else {
          bow_angle = Math.atan2(secondary_hand.y - secondary_elbo.y, secondary_hand.x - secondary_elbo.x);
        }
        primary_hand_in_bow_space = bow.fromWorld(this.toWorld(primary_hand));
        secondary_hand_in_bow_space = bow.fromWorld(this.toWorld(secondary_hand));
        bow.structure.points.grip.x = secondary_hand_in_bow_space.x;
        bow.structure.points.grip.y = secondary_hand_in_bow_space.y;
        if (prime_bow) {
          bow.structure.points.serving.x = sternum.x + draw_to * Math.cos(aim_angle);
          bow.structure.points.serving.y = sternum.y + draw_to * Math.sin(aim_angle);
        } else {
          bow.structure.points.serving.x = bow.structure.points.grip.x - bow.fistmele * Math.cos(bow_angle);
          bow.structure.points.serving.y = bow.structure.points.grip.y - bow.fistmele * Math.sin(bow_angle);
        }
      }
      if (this.holding_arrow) {
        arrow = this.holding_arrow;
        arrow.x = this.x;
        arrow.y = this.y;
        primary_hand_in_arrow_space = arrow.fromWorld(this.toWorld(primary_hand));
        secondary_hand_in_arrow_space = arrow.fromWorld(this.toWorld(secondary_hand));
        arrow.structure.points.nock.vx = 0;
        arrow.structure.points.nock.vy = 0;
        arrow.structure.points.tip.vx = 0;
        arrow.structure.points.tip.vy = 0;
        if (prime_bow) {
          arrow.structure.points.nock.x = sternum.x + draw_to * Math.cos(aim_angle);
          arrow.structure.points.nock.y = sternum.y + draw_to * Math.sin(aim_angle);
          arrow.structure.points.tip.x = sternum.x + (draw_to + arrow.length) * Math.cos(aim_angle);
          return arrow.structure.points.tip.y = sternum.y + (draw_to + arrow.length) * Math.sin(aim_angle);
        } else {
          angle = Math.atan2(primary_hand.y - sternum.y, primary_hand.x - sternum.x);
          arrow_angle = angle - (TAU / 4 + 0.2) * this.facing_x;
          hold_offset = -5;
          arrow.structure.points.nock.x = primary_hand_in_arrow_space.x + hold_offset * Math.cos(arrow_angle);
          arrow.structure.points.nock.y = primary_hand_in_arrow_space.y + hold_offset * Math.sin(arrow_angle);
          arrow.structure.points.tip.x = primary_hand_in_arrow_space.x + (hold_offset + arrow.length) * Math.cos(arrow_angle);
          return arrow.structure.points.tip.y = primary_hand_in_arrow_space.y + (hold_offset + arrow.length) * Math.sin(arrow_angle);
        }
      }
    }

    draw(ctx) {
      var dress_color, hair_color, head, hxs, i, j, l, left_knee, left_leg_angle, left_shoulder, left_shoulder_angle, max_cos, max_cos_shoulder_angle, max_shoulder_cos, max_sin, min_cos, min_cos_shoulder_angle, min_shoulder_cos, min_sin, pelvis, r, ref, ref1, right_knee, right_leg_angle, right_shoulder, right_shoulder_angle, segment, segment_name, shoulder_distance, skin_color, sternum, torso_angle, torso_length, w;
      ({
        head,
        sternum,
        pelvis,
        "left knee": left_knee,
        "right knee": right_knee,
        "left shoulder": left_shoulder,
        "right shoulder": right_shoulder
      } = this.structure.points);
      // ^that's kinda ugly, should we just name segments and points with underscores instead of spaces?
      // or should I just alias structure.points as a one-char-var and do p["left sholder"]? that could work, but I would still use {}= when I could honestly, so...
      skin_color = "#6B422C";
      hair_color = "#000000";
      dress_color = "#AAFFFF";
      
      // TODO: depth
      // @drawStructure
      // 	segments:
      // 		torso: ->
      // 	points:
      // 		head: ->

      // trailing hair
      // TODO: better, less fake hair physics
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.translate(-this.facing_x * 0.3, 0);
      this.smoothed_vy += ((this.vy * !this.grounded) - this.smoothed_vy) / 5;
      ref = this.hair_x_scales;
      for (i = j = ref.length - 1; j >= 0; i = j += -1) {
        hxs = ref[i];
        if (i === 0) {
          this.hair_x_scales[i] += (-this.facing_x - hxs) / 3;
        } else {
          // x = @facing_x * i/@hair_x_scales.length * 2
          // @hair_x_scales[i] += (@hair_x_scales[i-1] + x - hxs) / 2
          // @hair_x_scales[i] += (x - hxs) / 2
          this.hair_x_scales[i] += (this.hair_x_scales[i - 1] - hxs) / 3;
        }
        ctx.save();
        ctx.scale(hxs, 1);
        ctx.fillStyle = hair_color;
        r = this.hair_x_scales[i] * this.vx / 45 - Math.max(0, this.smoothed_vy / 25);
        l = 5;
        w = 1;
        ctx.rotate(r);
        ctx.fillRect(0 - w, -2, 5 + w, l);
        ctx.translate(0, l);
        ctx.rotate(r);
        ctx.fillRect(1 - w, -2, 4 + w, l);
        ctx.translate(0, l);
        ctx.rotate(r);
        ctx.fillRect(2 - w, -2, 3 + w, l);
        ctx.translate(0, l);
        ctx.rotate(r);
        ctx.fillRect(3 - w, -2, 2 + w, l);
        ctx.translate(0, l);
        ctx.restore();
      }
      ctx.restore();
      ref1 = this.structure.segments;
      
      // limbs
      for (segment_name in ref1) {
        segment = ref1[segment_name];
        ctx.beginPath();
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = skin_color;
        ctx.stroke();
      }
      
      // dress
      ctx.beginPath();
      ctx.save();
      ctx.translate(sternum.x, sternum.y);
      torso_angle = Math.atan2(pelvis.y - sternum.y, pelvis.x - sternum.x) - TAU / 4;
      torso_length = distance(pelvis, sternum);
      ctx.rotate(torso_angle);
      left_leg_angle = Math.atan2(left_knee.y - pelvis.y, left_knee.x - pelvis.x) - torso_angle;
      right_leg_angle = Math.atan2(right_knee.y - pelvis.y, right_knee.x - pelvis.x) - torso_angle;
      left_shoulder_angle = Math.atan2(left_shoulder.y - sternum.y, left_shoulder.x - sternum.x) - torso_angle;
      right_shoulder_angle = Math.atan2(right_shoulder.y - sternum.y, right_shoulder.x - sternum.x) - torso_angle;
      shoulder_distance = distance(left_shoulder, sternum);
      min_shoulder_cos = Math.min(Math.cos(left_shoulder_angle), Math.cos(right_shoulder_angle));
      max_shoulder_cos = Math.max(Math.cos(left_shoulder_angle), Math.cos(right_shoulder_angle));
      if (Math.cos(left_shoulder_angle) < Math.cos(right_shoulder_angle)) {
        min_cos_shoulder_angle = left_shoulder_angle;
        max_cos_shoulder_angle = right_shoulder_angle;
      } else {
        min_cos_shoulder_angle = right_shoulder_angle;
        max_cos_shoulder_angle = left_shoulder_angle;
      }
      ctx.lineTo(-2 + Math.min(0, 1 * min_shoulder_cos), Math.sin(min_cos_shoulder_angle) * shoulder_distance - 1.5);
      ctx.lineTo(+2 + Math.max(0, 1 * max_shoulder_cos), Math.sin(max_cos_shoulder_angle) * shoulder_distance - 1.5);
      min_cos = Math.min(Math.cos(left_leg_angle), Math.cos(right_leg_angle));
      max_cos = Math.max(Math.cos(left_leg_angle), Math.cos(right_leg_angle));
      min_sin = Math.min(Math.sin(left_leg_angle), Math.sin(right_leg_angle));
      max_sin = Math.max(Math.sin(left_leg_angle), Math.sin(right_leg_angle));
      ctx.lineTo(+4 + Math.max(0, 1 * max_cos), torso_length / 2);
      ctx.lineTo(+4 + Math.max(0, 9 * max_cos), torso_length + Math.max(5, 7 * max_sin));
      ctx.lineTo(-4 + Math.min(0, 9 * min_cos), torso_length + Math.max(5, 7 * max_sin));
      ctx.lineTo(-4 + Math.min(0, 1 * min_cos), torso_length / 2);
      ctx.fillStyle = dress_color;
      ctx.fill();
      ctx.restore();
      
      // head, including top of hair
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(Math.atan2(head.y - sternum.y, head.x - sternum.x) - TAU / 4);
      // head
      ctx.save();
      ctx.scale(0.9, 1);
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, TAU);
      ctx.fillStyle = skin_color;
      ctx.fill();
      ctx.restore();
      // top of hair
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, TAU / 2);
      ctx.fillStyle = hair_color;
      ctx.fill();
      // /head
      return ctx.restore();
    }

  };

  addEntityClass(Player);

  Entity.initAnimation(Player);

  return Player;

}).call(this);


/***/ })
/******/ ]);