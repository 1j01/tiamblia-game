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
  return (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
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

  if (( true && module !== null ? module.exports : void 0) != null) {
    module.exports = E;
  } else {
    this.ReactScript = E;
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(31)(module)))

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

fs =  true ? __webpack_require__(12) : undefined;

path =  true ? __webpack_require__(13) : undefined;

if (!fs.readFileSync) {
  // XXX: hack for webpack
  // TODO: use ifdef conditionals or something
  fs = null;
}

if (!path.join) {
  path = null;
}

Pose = __webpack_require__(5);

BoneStructure = __webpack_require__(14);

({entity_classes} = __webpack_require__(0));

module.exports = Entity = class Entity {
  constructor() {
    this.structure = new BoneStructure();
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
      req = new XMLHttpRequest();
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
    entity = new entity_classes[def._class_]();
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
    result = new Pose();
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
    result = new Pose();
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

PolygonStructure = __webpack_require__(38);

TAU = Math.PI * 2;

module.exports = Terrain = class Terrain extends Entity {
  constructor() {
    super();
    this.structure = new PolygonStructure();
    this.simplex = new SimplexNoise();
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
/* 11 */
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
    this.view = new View();
    entity_bbox = this.entity.bbox();
    center_x = entity_bbox.x + entity_bbox.width / 2 - this.entity.x;
    center_y = entity_bbox.y + entity_bbox.height / 2 - this.entity.y;
    height = Math.min(entity_bbox.height, max_height);
    scale = height / entity_bbox.height;
    this.view = new View();
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
/* 12 */
/***/ (function(module, exports) {



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
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

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(33)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var BoneStructure, Structure;

Structure = __webpack_require__(15);

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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

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

World = __webpack_require__(44);

keyboard = __webpack_require__(18);

SavannaGrass = __webpack_require__(45);

__webpack_require__(46);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(47);

__webpack_require__(48);

Player = __webpack_require__(49);

__webpack_require__(21);

__webpack_require__(22);

world = new World();

terrain = new SavannaGrass();

world.entities.push(terrain);

terrain.x = 0;

terrain.y = 0;

terrain.generate();

canvas = document.createElement("canvas");

document.body.appendChild(canvas);

ctx = canvas.getContext("2d");

view = new View();

view_to = new View();

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

var AnimBar, BoneStructure, E, Editor, EntitiesBar, Entity, Menu, MenuItem, Pose, ReactDOM, TAU, Terrain, TerrainBar, distance, distanceToLineSegment, entity_classes, fs, path,
  indexOf = [].indexOf;

ReactDOM = __webpack_require__(6);

E = __webpack_require__(2);

EntitiesBar = __webpack_require__(32);

AnimBar = __webpack_require__(34);

TerrainBar = __webpack_require__(37);

Terrain = __webpack_require__(7);

Entity = __webpack_require__(4);

Pose = __webpack_require__(5);

BoneStructure = __webpack_require__(14);

({distanceToLineSegment, distance, entity_classes} = __webpack_require__(0));

TAU = Math.PI * 2;

__webpack_require__(39);

if (typeof nw !== "undefined" && nw !== null) {
  ({Menu, MenuItem} = nw);
} else {
  ({Menu, MenuItem} = __webpack_require__(41));
  __webpack_require__(42);
}

fs =  true ? __webpack_require__(12) : undefined;

path =  true ? __webpack_require__(13) : undefined;

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
    this.previous_mouse_world_x = -2e308;
    this.previous_mouse_world_y = -2e308;
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
      menu = new Menu();
      
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
      menu.append(new MenuItem({
        label: 'Undo',
        click: () => {
          return this.undo();
        },
        enabled: this.undos.length
      }));
      menu.append(new MenuItem({
        label: 'Redo',
        click: () => {
          return this.redo();
        },
        enabled: this.redos.length
      }));
      menu.append(new MenuItem({
        type: 'separator'
      }));
      menu.append(new MenuItem({
        label: 'Cut',
        click: () => {
          return this.cut();
        },
        enabled: this.selected_entities.length
      }));
      menu.append(new MenuItem({
        label: 'Copy',
        click: () => {
          return this.copy();
        },
        enabled: this.selected_points.length || this.selected_entities.length
      }));
      menu.append(new MenuItem({
        label: 'Paste',
        click: () => {
          return this.paste();
        },
        enabled: this.editing_entity ? this.clipboard.point_positions != null : (ref1 = this.clipboard.entities) != null ? ref1.length : void 0
      }));
      menu.append(new MenuItem({
        label: 'Delete',
        click: () => {
          return this.delete();
        },
        enabled: this.selected_entities.length
      }));
      menu.append(new MenuItem({
        label: 'Select All',
        click: () => {
          return this.selectAll();
        },
        enabled: this.world.entities.length
      }));
      menu.append(new MenuItem({
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
        menu.append(new MenuItem({
          label: 'Flip Pose Horizontally',
          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose",
          click: () => {
            return modifyPose(Pose.horizontallyFlip);
          }
        }));
        menu.append(new MenuItem({
          label: 'Flip Pose Vertically',
          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose",
          click: () => {
            return modifyPose(Pose.verticallyFlip);
          }
        }));
        menu.append(new MenuItem({
          type: 'separator'
        }));
        menu.append(new MenuItem({
          label: 'Finish Editing Entity',
          click: () => {
            return this.finishEditingEntity();
          }
        }));
      } else {
        menu.append(new MenuItem({
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
        this.editing_entity.draw(document.createElement("canvas").getContext("2d"), new View());
      } catch (error) {
        e = error;
        this.undo();
        // TODO: delete redo entry?
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
        // TODO: delete redo entry?
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
    var base, base1, closest_dist, closest_entity, dist, dist_squared, dx, dy, entity, entity_within_selection_box, i, j, k, l, len, len1, len2, len3, local_mouse_position, m, min_grab_dist, mouse_in_world, mouse_world_velocity_x, mouse_world_velocity_y, n, point, point_name, point_within_selection_box, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, segment, segment_name;
    mouse_in_world = this.view.toWorld(this.mouse);
    if (this.mouse.LMB.released) {
      if (this.dragging_points.length || this.sculpting) {
        this.dragging_points = [];
        this.sculpting = false;
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

        mouse_world_velocity_x = mouse_in_world.x - this.previous_mouse_world_x;
        mouse_world_velocity_y = mouse_in_world.y - this.previous_mouse_world_y;
        local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);
        ref4 = this.editing_entity.structure.points;
        for (point_name in ref4) {
          point = ref4[point_name];
          dx = point.x - local_mouse_position.x;
          dy = point.y - local_mouse_position.y;
          dist_squared = dx * dx + dy * dy;
          dist = Math.sqrt(dist_squared);
          if (dist < this.brush_size) {
            // point.x += dx/10
            // point.y += dy/10
            // point.x += dx/100 * mouse_world_velocity_x
            // point.y += dy/100 * mouse_world_velocity_y
            // point.x += mouse_world_velocity_x / Math.max(1, dist)
            // point.y += mouse_world_velocity_y / Math.max(1, dist)
            // point.x += mouse_world_velocity_x / 2
            // point.y += mouse_world_velocity_y / 2
            point.x += mouse_world_velocity_x / Math.max(1200, dist_squared) * 500;
            point.y += mouse_world_velocity_y / Math.max(1200, dist_squared) * 500;
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
        for (var n = 0; n <= 250; n++) {
          // TODO: and if there isn't an animation frame loaded
          this.editing_entity.structure.stepLayout();
        }
      }
    }
    // TODO: save afterwards at some point
    this.previous_mouse_world_x = mouse_in_world.x;
    return this.previous_mouse_world_y = mouse_in_world.y;
  }

  editEntity(entity) {
    this.editing_entity = entity;
    return this.selected_entities = [entity];
  }

  finishEditingEntity() {
    this.editing_entity = null;
    this.selected_entities = [];
    this.selected_points = [];
    this.dragging_entities = [];
    this.dragging_points = [];
    return this.sculpting = false;
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
/** @license React v16.13.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(1),n=__webpack_require__(10),r=__webpack_require__(29);function u(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(u(227));
function ba(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var da=!1,ea=null,fa=!1,ha=null,ia={onError:function(a){da=!0;ea=a}};function ja(a,b,c,d,e,f,g,h,k){da=!1;ea=null;ba.apply(ia,arguments)}function ka(a,b,c,d,e,f,g,h,k){ja.apply(this,arguments);if(da){if(da){var l=ea;da=!1;ea=null}else throw Error(u(198));fa||(fa=!0,ha=l)}}var la=null,ma=null,na=null;
function oa(a,b,c){var d=a.type||"unknown-event";a.currentTarget=na(c);ka(d,b,void 0,a);a.currentTarget=null}var pa=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;pa.hasOwnProperty("ReactCurrentDispatcher")||(pa.ReactCurrentDispatcher={current:null});pa.hasOwnProperty("ReactCurrentBatchConfig")||(pa.ReactCurrentBatchConfig={suspense:null});
var qa=/^(.*)[\\\/]/,v="function"===typeof Symbol&&Symbol.for,ra=v?Symbol.for("react.element"):60103,sa=v?Symbol.for("react.portal"):60106,ta=v?Symbol.for("react.fragment"):60107,ua=v?Symbol.for("react.strict_mode"):60108,va=v?Symbol.for("react.profiler"):60114,wa=v?Symbol.for("react.provider"):60109,xa=v?Symbol.for("react.context"):60110,ya=v?Symbol.for("react.concurrent_mode"):60111,za=v?Symbol.for("react.forward_ref"):60112,Aa=v?Symbol.for("react.suspense"):60113,Ba=v?Symbol.for("react.suspense_list"):
60120,Ca=v?Symbol.for("react.memo"):60115,Da=v?Symbol.for("react.lazy"):60116,Ea=v?Symbol.for("react.block"):60121,Fa="function"===typeof Symbol&&Symbol.iterator;function Ga(a){if(null===a||"object"!==typeof a)return null;a=Fa&&a[Fa]||a["@@iterator"];return"function"===typeof a?a:null}function Ha(a){if(-1===a._status){a._status=0;var b=a._ctor;b=b();a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}}
function Ia(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ta:return"Fragment";case sa:return"Portal";case va:return"Profiler";case ua:return"StrictMode";case Aa:return"Suspense";case Ba:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case xa:return"Context.Consumer";case wa:return"Context.Provider";case za:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":
"ForwardRef");case Ca:return Ia(a.type);case Ea:return Ia(a.render);case Da:if(a=1===a._status?a._result:null)return Ia(a)}return null}function Ja(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=Ia(a.type);c=null;d&&(c=Ia(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(qa,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f}b+=c;a=a.return}while(a);return b}var Ka=null,La={};
function Ma(){if(Ka)for(var a in La){var b=La[a],c=Ka.indexOf(a);if(!(-1<c))throw Error(u(96,a));if(!Na[c]){if(!b.extractEvents)throw Error(u(97,a));Na[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;if(Oa.hasOwnProperty(h))throw Error(u(99,h));Oa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&Pa(k[e],g,h);e=!0}else f.registrationName?(Pa(f.registrationName,g,h),e=!0):e=!1;if(!e)throw Error(u(98,d,a));}}}}
function Pa(a,b,c){if(Qa[a])throw Error(u(100,a));Qa[a]=b;Ra[a]=b.eventTypes[c].dependencies}var Na=[],Oa={},Qa={},Ra={};function Sa(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];if(!La.hasOwnProperty(c)||La[c]!==d){if(La[c])throw Error(u(102,c));La[c]=d;b=!0}}b&&Ma()}var Ta=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Ua=null,Va=null,Wa=null;
function Xa(a){if(a=ma(a)){if("function"!==typeof Ua)throw Error(u(280));var b=a.stateNode;b&&(b=la(b),Ua(a.stateNode,a.type,b))}}function Ya(a){Va?Wa?Wa.push(a):Wa=[a]:Va=a}function Za(){if(Va){var a=Va,b=Wa;Wa=Va=null;Xa(a);if(b)for(a=0;a<b.length;a++)Xa(b[a])}}function $a(a,b){return a(b)}function ab(a,b,c,d,e){return a(b,c,d,e)}function bb(){}var cb=$a,db=!1,eb=!1;function fb(){if(null!==Va||null!==Wa)bb(),Za()}
function gb(a,b,c){if(eb)return a(b,c);eb=!0;try{return cb(a,b,c)}finally{eb=!1,fb()}}var hb=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ib=Object.prototype.hasOwnProperty,jb={},kb={};
function lb(a){if(ib.call(kb,a))return!0;if(ib.call(jb,a))return!1;if(hb.test(a))return kb[a]=!0;jb[a]=!0;return!1}function mb(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function nb(a,b,c,d){if(null===b||"undefined"===typeof b||mb(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function C(a,b,c,d,e,f){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f}var E={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){E[a]=new C(a,0,!1,a,null,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];E[b]=new C(b,1,!1,a[1],null,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){E[a]=new C(a,2,!1,a.toLowerCase(),null,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){E[a]=new C(a,2,!1,a,null,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){E[a]=new C(a,3,!1,a.toLowerCase(),null,!1)});
["checked","multiple","muted","selected"].forEach(function(a){E[a]=new C(a,3,!0,a,null,!1)});["capture","download"].forEach(function(a){E[a]=new C(a,4,!1,a,null,!1)});["cols","rows","size","span"].forEach(function(a){E[a]=new C(a,6,!1,a,null,!1)});["rowSpan","start"].forEach(function(a){E[a]=new C(a,5,!1,a.toLowerCase(),null,!1)});var ob=/[\-:]([a-z])/g;function pb(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ob,
pb);E[b]=new C(b,1,!1,a,null,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ob,pb);E[b]=new C(b,1,!1,a,"http://www.w3.org/1999/xlink",!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ob,pb);E[b]=new C(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1)});["tabIndex","crossOrigin"].forEach(function(a){E[a]=new C(a,1,!1,a.toLowerCase(),null,!1)});
E.xlinkHref=new C("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0);["src","href","action","formAction"].forEach(function(a){E[a]=new C(a,1,!1,a.toLowerCase(),null,!0)});
function qb(a,b,c,d){var e=E.hasOwnProperty(b)?E[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(nb(b,c,e,d)&&(c=null),d||null===e?lb(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function rb(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function sb(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function tb(a){var b=sb(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function xb(a){a._valueTracker||(a._valueTracker=tb(a))}function yb(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=sb(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function zb(a,b){var c=b.checked;return n({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
function Ab(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=rb(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Bb(a,b){b=b.checked;null!=b&&qb(a,"checked",b,!1)}
function Cb(a,b){Bb(a,b);var c=rb(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?Db(a,b.type,c):b.hasOwnProperty("defaultValue")&&Db(a,b.type,rb(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Eb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function Db(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Fb(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function Gb(a,b){a=n({children:void 0},b);if(b=Fb(b.children))a.children=b;return a}
function Hb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+rb(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Ib(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(u(91));return n({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Jb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(u(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(u(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:rb(c)}}
function Kb(a,b){var c=rb(b.value),d=rb(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function Lb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var Mb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Nb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ob(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Nb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Pb,Qb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Mb.svg||"innerHTML"in a)a.innerHTML=b;else{Pb=Pb||document.createElement("div");Pb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Pb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Rb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}function Sb(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Tb={animationend:Sb("Animation","AnimationEnd"),animationiteration:Sb("Animation","AnimationIteration"),animationstart:Sb("Animation","AnimationStart"),transitionend:Sb("Transition","TransitionEnd")},Ub={},Vb={};
Ta&&(Vb=document.createElement("div").style,"AnimationEvent"in window||(delete Tb.animationend.animation,delete Tb.animationiteration.animation,delete Tb.animationstart.animation),"TransitionEvent"in window||delete Tb.transitionend.transition);function Wb(a){if(Ub[a])return Ub[a];if(!Tb[a])return a;var b=Tb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Vb)return Ub[a]=b[c];return a}
var Xb=Wb("animationend"),Yb=Wb("animationiteration"),Zb=Wb("animationstart"),$b=Wb("transitionend"),ac="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bc=new ("function"===typeof WeakMap?WeakMap:Map);function cc(a){var b=bc.get(a);void 0===b&&(b=new Map,bc.set(a,b));return b}
function dc(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.effectTag&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function ec(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function fc(a){if(dc(a)!==a)throw Error(u(188));}
function gc(a){var b=a.alternate;if(!b){b=dc(a);if(null===b)throw Error(u(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return fc(e),a;if(f===d)return fc(e),b;f=f.sibling}throw Error(u(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(u(189));}}if(c.alternate!==d)throw Error(u(190));}if(3!==c.tag)throw Error(u(188));return c.stateNode.current===c?a:b}function hc(a){a=gc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function ic(a,b){if(null==b)throw Error(u(30));if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function jc(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var kc=null;
function lc(a){if(a){var b=a._dispatchListeners,c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++)oa(a,b[d],c[d]);else b&&oa(a,b,c);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function mc(a){null!==a&&(kc=ic(kc,a));a=kc;kc=null;if(a){jc(a,lc);if(kc)throw Error(u(95));if(fa)throw a=ha,fa=!1,ha=null,a;}}
function nc(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function oc(a){if(!Ta)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}var pc=[];function qc(a){a.topLevelType=null;a.nativeEvent=null;a.targetInst=null;a.ancestors.length=0;10>pc.length&&pc.push(a)}
function rc(a,b,c,d){if(pc.length){var e=pc.pop();e.topLevelType=a;e.eventSystemFlags=d;e.nativeEvent=b;e.targetInst=c;return e}return{topLevelType:a,eventSystemFlags:d,nativeEvent:b,targetInst:c,ancestors:[]}}
function sc(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d=c;if(3===d.tag)d=d.stateNode.containerInfo;else{for(;d.return;)d=d.return;d=3!==d.tag?null:d.stateNode.containerInfo}if(!d)break;b=c.tag;5!==b&&6!==b||a.ancestors.push(c);c=tc(d)}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=nc(a.nativeEvent);d=a.topLevelType;var f=a.nativeEvent,g=a.eventSystemFlags;0===c&&(g|=64);for(var h=null,k=0;k<Na.length;k++){var l=Na[k];l&&(l=l.extractEvents(d,b,f,e,g))&&(h=
ic(h,l))}mc(h)}}function uc(a,b,c){if(!c.has(a)){switch(a){case "scroll":vc(b,"scroll",!0);break;case "focus":case "blur":vc(b,"focus",!0);vc(b,"blur",!0);c.set("blur",null);c.set("focus",null);break;case "cancel":case "close":oc(a)&&vc(b,a,!0);break;case "invalid":case "submit":case "reset":break;default:-1===ac.indexOf(a)&&F(a,b)}c.set(a,null)}}
var wc,xc,yc,zc=!1,Ac=[],Bc=null,Cc=null,Dc=null,Ec=new Map,Fc=new Map,Gc=[],Hc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),Ic="focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");
function Jc(a,b){var c=cc(b);Hc.forEach(function(a){uc(a,b,c)});Ic.forEach(function(a){uc(a,b,c)})}function Kc(a,b,c,d,e){return{blockedOn:a,topLevelType:b,eventSystemFlags:c|32,nativeEvent:e,container:d}}
function Lc(a,b){switch(a){case "focus":case "blur":Bc=null;break;case "dragenter":case "dragleave":Cc=null;break;case "mouseover":case "mouseout":Dc=null;break;case "pointerover":case "pointerout":Ec.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Fc.delete(b.pointerId)}}function Mc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=Kc(b,c,d,e,f),null!==b&&(b=Nc(b),null!==b&&xc(b)),a;a.eventSystemFlags|=d;return a}
function Oc(a,b,c,d,e){switch(b){case "focus":return Bc=Mc(Bc,a,b,c,d,e),!0;case "dragenter":return Cc=Mc(Cc,a,b,c,d,e),!0;case "mouseover":return Dc=Mc(Dc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Ec.set(f,Mc(Ec.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Fc.set(f,Mc(Fc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Pc(a){var b=tc(a.target);if(null!==b){var c=dc(b);if(null!==c)if(b=c.tag,13===b){if(b=ec(c),null!==b){a.blockedOn=b;r.unstable_runWithPriority(a.priority,function(){yc(c)});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Qc(a){if(null!==a.blockedOn)return!1;var b=Rc(a.topLevelType,a.eventSystemFlags,a.container,a.nativeEvent);if(null!==b){var c=Nc(b);null!==c&&xc(c);a.blockedOn=b;return!1}return!0}
function Sc(a,b,c){Qc(a)&&c.delete(b)}function Tc(){for(zc=!1;0<Ac.length;){var a=Ac[0];if(null!==a.blockedOn){a=Nc(a.blockedOn);null!==a&&wc(a);break}var b=Rc(a.topLevelType,a.eventSystemFlags,a.container,a.nativeEvent);null!==b?a.blockedOn=b:Ac.shift()}null!==Bc&&Qc(Bc)&&(Bc=null);null!==Cc&&Qc(Cc)&&(Cc=null);null!==Dc&&Qc(Dc)&&(Dc=null);Ec.forEach(Sc);Fc.forEach(Sc)}function Uc(a,b){a.blockedOn===b&&(a.blockedOn=null,zc||(zc=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Tc)))}
function Vc(a){function b(b){return Uc(b,a)}if(0<Ac.length){Uc(Ac[0],a);for(var c=1;c<Ac.length;c++){var d=Ac[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Bc&&Uc(Bc,a);null!==Cc&&Uc(Cc,a);null!==Dc&&Uc(Dc,a);Ec.forEach(b);Fc.forEach(b);for(c=0;c<Gc.length;c++)d=Gc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Gc.length&&(c=Gc[0],null===c.blockedOn);)Pc(c),null===c.blockedOn&&Gc.shift()}
var Wc={},Yc=new Map,Zc=new Map,$c=["abort","abort",Xb,"animationEnd",Yb,"animationIteration",Zb,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking",
"seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",$b,"transitionEnd","waiting","waiting"];function ad(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1],f="on"+(e[0].toUpperCase()+e.slice(1));f={phasedRegistrationNames:{bubbled:f,captured:f+"Capture"},dependencies:[d],eventPriority:b};Zc.set(d,b);Yc.set(d,f);Wc[e]=f}}
ad("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0);
ad("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);ad($c,2);for(var bd="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),cd=0;cd<bd.length;cd++)Zc.set(bd[cd],0);
var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function F(a,b){vc(b,a,!1)}function vc(a,b,c){var d=Zc.get(b);switch(void 0===d?2:d){case 0:d=gd.bind(null,b,1,a);break;case 1:d=hd.bind(null,b,1,a);break;default:d=id.bind(null,b,1,a)}c?a.addEventListener(b,d,!0):a.addEventListener(b,d,!1)}function gd(a,b,c,d){db||bb();var e=id,f=db;db=!0;try{ab(e,a,b,c,d)}finally{(db=f)||fb()}}function hd(a,b,c,d){ed(dd,id.bind(null,a,b,c,d))}
function id(a,b,c,d){if(fd)if(0<Ac.length&&-1<Hc.indexOf(a))a=Kc(null,a,b,c,d),Ac.push(a);else{var e=Rc(a,b,c,d);if(null===e)Lc(a,d);else if(-1<Hc.indexOf(a))a=Kc(e,a,b,c,d),Ac.push(a);else if(!Oc(e,a,b,c,d)){Lc(a,d);a=rc(a,d,null,b);try{gb(sc,a)}finally{qc(a)}}}}
function Rc(a,b,c,d){c=nc(d);c=tc(c);if(null!==c){var e=dc(c);if(null===e)c=null;else{var f=e.tag;if(13===f){c=ec(e);if(null!==c)return c;c=null}else if(3===f){if(e.stateNode.hydrate)return 3===e.tag?e.stateNode.containerInfo:null;c=null}else e!==c&&(c=null)}}a=rc(a,d,c,b);try{gb(sc,a)}finally{qc(a)}return null}
var jd={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},kd=["Webkit","ms","Moz","O"];Object.keys(jd).forEach(function(a){kd.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);jd[b]=jd[a]})});function ld(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||jd.hasOwnProperty(a)&&jd[a]?(""+b).trim():b+"px"}
function md(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=ld(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var nd=n({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function od(a,b){if(b){if(nd[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(u(137,a,""));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(u(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(u(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(u(62,""));}}
function pd(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var qd=Mb.html;function rd(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=cc(a);b=Ra[b];for(var d=0;d<b.length;d++)uc(b[d],a,c)}function sd(){}
function td(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ud(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function vd(a,b){var c=ud(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=ud(c)}}
function wd(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?wd(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function xd(){for(var a=window,b=td();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=td(a.document)}return b}
function yd(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}var zd="$",Ad="/$",Bd="$?",Cd="$!",Dd=null,Ed=null;function Fd(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function Gd(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var Hd="function"===typeof setTimeout?setTimeout:void 0,Id="function"===typeof clearTimeout?clearTimeout:void 0;function Jd(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}
function Kd(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if(c===zd||c===Cd||c===Bd){if(0===b)return a;b--}else c===Ad&&b++}a=a.previousSibling}return null}var Ld=Math.random().toString(36).slice(2),Md="__reactInternalInstance$"+Ld,Nd="__reactEventHandlers$"+Ld,Od="__reactContainere$"+Ld;
function tc(a){var b=a[Md];if(b)return b;for(var c=a.parentNode;c;){if(b=c[Od]||c[Md]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Kd(a);null!==a;){if(c=a[Md])return c;a=Kd(a)}return b}a=c;c=a.parentNode}return null}function Nc(a){a=a[Md]||a[Od];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Pd(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(u(33));}function Qd(a){return a[Nd]||null}
function Rd(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}
function Sd(a,b){var c=a.stateNode;if(!c)return null;var d=la(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==typeof c)throw Error(u(231,
b,typeof c));return c}function Td(a,b,c){if(b=Sd(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=ic(c._dispatchListeners,b),c._dispatchInstances=ic(c._dispatchInstances,a)}function Ud(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;)c.push(b),b=Rd(b);for(b=c.length;0<b--;)Td(c[b],"captured",a);for(b=0;b<c.length;b++)Td(c[b],"bubbled",a)}}
function Vd(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Sd(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=ic(c._dispatchListeners,b),c._dispatchInstances=ic(c._dispatchInstances,a))}function Wd(a){a&&a.dispatchConfig.registrationName&&Vd(a._targetInst,null,a)}function Xd(a){jc(a,Ud)}var Yd=null,Zd=null,$d=null;
function ae(){if($d)return $d;var a,b=Zd,c=b.length,d,e="value"in Yd?Yd.value:Yd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return $d=e.slice(a,1<d?1-d:void 0)}function be(){return!0}function ce(){return!1}
function G(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?be:ce;this.isPropagationStopped=ce;return this}
n(G.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=be)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=be)},persist:function(){this.isPersistent=be},isPersistent:ce,destructor:function(){var a=this.constructor.Interface,
b;for(b in a)this[b]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=ce;this._dispatchInstances=this._dispatchListeners=null}});G.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
G.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;n(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=n({},d.Interface,a);c.extend=d.extend;de(c);return c};de(G);function ee(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
function fe(a){if(!(a instanceof this))throw Error(u(279));a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function de(a){a.eventPool=[];a.getPooled=ee;a.release=fe}var ge=G.extend({data:null}),he=G.extend({data:null}),ie=[9,13,27,32],je=Ta&&"CompositionEvent"in window,ke=null;Ta&&"documentMode"in document&&(ke=document.documentMode);
var le=Ta&&"TextEvent"in window&&!ke,me=Ta&&(!je||ke&&8<ke&&11>=ke),ne=String.fromCharCode(32),oe={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},pe=!1;
function qe(a,b){switch(a){case "keyup":return-1!==ie.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function re(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var se=!1;function te(a,b){switch(a){case "compositionend":return re(b);case "keypress":if(32!==b.which)return null;pe=!0;return ne;case "textInput":return a=b.data,a===ne&&pe?null:a;default:return null}}
function ue(a,b){if(se)return"compositionend"===a||!je&&qe(a,b)?(a=ae(),$d=Zd=Yd=null,se=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return me&&"ko"!==b.locale?null:b.data;default:return null}}
var ve={eventTypes:oe,extractEvents:function(a,b,c,d){var e;if(je)b:{switch(a){case "compositionstart":var f=oe.compositionStart;break b;case "compositionend":f=oe.compositionEnd;break b;case "compositionupdate":f=oe.compositionUpdate;break b}f=void 0}else se?qe(a,c)&&(f=oe.compositionEnd):"keydown"===a&&229===c.keyCode&&(f=oe.compositionStart);f?(me&&"ko"!==c.locale&&(se||f!==oe.compositionStart?f===oe.compositionEnd&&se&&(e=ae()):(Yd=d,Zd="value"in Yd?Yd.value:Yd.textContent,se=!0)),f=ge.getPooled(f,
b,c,d),e?f.data=e:(e=re(c),null!==e&&(f.data=e)),Xd(f),e=f):e=null;(a=le?te(a,c):ue(a,c))?(b=he.getPooled(oe.beforeInput,b,c,d),b.data=a,Xd(b)):b=null;return null===e?b:null===b?e:[e,b]}},we={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!we[a.type]:"textarea"===b?!0:!1}
var ye={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function ze(a,b,c){a=G.getPooled(ye.change,a,b,c);a.type="change";Ya(c);Xd(a);return a}var Ae=null,Be=null;function Ce(a){mc(a)}function De(a){var b=Pd(a);if(yb(b))return a}function Ee(a,b){if("change"===a)return b}var Fe=!1;Ta&&(Fe=oc("input")&&(!document.documentMode||9<document.documentMode));
function Ge(){Ae&&(Ae.detachEvent("onpropertychange",He),Be=Ae=null)}function He(a){if("value"===a.propertyName&&De(Be))if(a=ze(Be,a,nc(a)),db)mc(a);else{db=!0;try{$a(Ce,a)}finally{db=!1,fb()}}}function Ie(a,b,c){"focus"===a?(Ge(),Ae=b,Be=c,Ae.attachEvent("onpropertychange",He)):"blur"===a&&Ge()}function Je(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return De(Be)}function Ke(a,b){if("click"===a)return De(b)}function Le(a,b){if("input"===a||"change"===a)return De(b)}
var Me={eventTypes:ye,_isInputEventSupported:Fe,extractEvents:function(a,b,c,d){var e=b?Pd(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Ee;else if(xe(e))if(Fe)g=Le;else{g=Je;var h=Ie}else(f=e.nodeName)&&"input"===f.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(g=Ke);if(g&&(g=g(a,b)))return ze(g,c,d);h&&h(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Db(e,"number",e.value)}},Ne=G.extend({view:null,detail:null}),
Oe={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pe(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Oe[a])?!!b[a]:!1}function Qe(){return Pe}
var Re=0,Se=0,Te=!1,Ue=!1,Ve=Ne.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Qe,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a)return a.movementX;var b=Re;Re=a.screenX;return Te?"mousemove"===a.type?a.screenX-b:0:(Te=!0,0)},movementY:function(a){if("movementY"in a)return a.movementY;
var b=Se;Se=a.screenY;return Ue?"mousemove"===a.type?a.screenY-b:0:(Ue=!0,0)}}),We=Ve.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),Xe={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",
dependencies:["pointerout","pointerover"]}},Ye={eventTypes:Xe,extractEvents:function(a,b,c,d,e){var f="mouseover"===a||"pointerover"===a,g="mouseout"===a||"pointerout"===a;if(f&&0===(e&32)&&(c.relatedTarget||c.fromElement)||!g&&!f)return null;f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window;if(g){if(g=b,b=(b=c.relatedTarget||c.toElement)?tc(b):null,null!==b){var h=dc(b);if(b!==h||5!==b.tag&&6!==b.tag)b=null}}else g=null;if(g===b)return null;if("mouseout"===a||"mouseover"===
a){var k=Ve;var l=Xe.mouseLeave;var m=Xe.mouseEnter;var p="mouse"}else if("pointerout"===a||"pointerover"===a)k=We,l=Xe.pointerLeave,m=Xe.pointerEnter,p="pointer";a=null==g?f:Pd(g);f=null==b?f:Pd(b);l=k.getPooled(l,g,c,d);l.type=p+"leave";l.target=a;l.relatedTarget=f;c=k.getPooled(m,b,c,d);c.type=p+"enter";c.target=f;c.relatedTarget=a;d=g;p=b;if(d&&p)a:{k=d;m=p;g=0;for(a=k;a;a=Rd(a))g++;a=0;for(b=m;b;b=Rd(b))a++;for(;0<g-a;)k=Rd(k),g--;for(;0<a-g;)m=Rd(m),a--;for(;g--;){if(k===m||k===m.alternate)break a;
k=Rd(k);m=Rd(m)}k=null}else k=null;m=k;for(k=[];d&&d!==m;){g=d.alternate;if(null!==g&&g===m)break;k.push(d);d=Rd(d)}for(d=[];p&&p!==m;){g=p.alternate;if(null!==g&&g===m)break;d.push(p);p=Rd(p)}for(p=0;p<k.length;p++)Vd(k[p],"bubbled",l);for(p=d.length;0<p--;)Vd(d[p],"captured",c);return 0===(e&64)?[l]:[l,c]}};function Ze(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var $e="function"===typeof Object.is?Object.is:Ze,af=Object.prototype.hasOwnProperty;
function bf(a,b){if($e(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!af.call(b,c[d])||!$e(a[c[d]],b[c[d]]))return!1;return!0}
var cf=Ta&&"documentMode"in document&&11>=document.documentMode,df={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},ef=null,ff=null,gf=null,hf=!1;
function jf(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if(hf||null==ef||ef!==td(c))return null;c=ef;"selectionStart"in c&&yd(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return gf&&bf(gf,c)?null:(gf=c,a=G.getPooled(df.select,ff,a,b),a.type="select",a.target=ef,Xd(a),a)}
var kf={eventTypes:df,extractEvents:function(a,b,c,d,e,f){e=f||(d.window===d?d.document:9===d.nodeType?d:d.ownerDocument);if(!(f=!e)){a:{e=cc(e);f=Ra.onSelect;for(var g=0;g<f.length;g++)if(!e.has(f[g])){e=!1;break a}e=!0}f=!e}if(f)return null;e=b?Pd(b):window;switch(a){case "focus":if(xe(e)||"true"===e.contentEditable)ef=e,ff=b,gf=null;break;case "blur":gf=ff=ef=null;break;case "mousedown":hf=!0;break;case "contextmenu":case "mouseup":case "dragend":return hf=!1,jf(c,d);case "selectionchange":if(cf)break;
case "keydown":case "keyup":return jf(c,d)}return null}},lf=G.extend({animationName:null,elapsedTime:null,pseudoElement:null}),mf=G.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),nf=Ne.extend({relatedTarget:null});function of(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var pf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rf=Ne.extend({key:function(a){if(a.key){var b=pf[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=of(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?qf[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Qe,charCode:function(a){return"keypress"===
a.type?of(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?of(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),sf=Ve.extend({dataTransfer:null}),tf=Ne.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Qe}),uf=G.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),vf=Ve.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),wf={eventTypes:Wc,extractEvents:function(a,b,c,d){var e=Yc.get(a);if(!e)return null;switch(a){case "keypress":if(0===of(c))return null;case "keydown":case "keyup":a=rf;break;case "blur":case "focus":a=nf;break;case "click":if(2===c.button)return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=
Ve;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=sf;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=tf;break;case Xb:case Yb:case Zb:a=lf;break;case $b:a=uf;break;case "scroll":a=Ne;break;case "wheel":a=vf;break;case "copy":case "cut":case "paste":a=mf;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=
We;break;default:a=G}b=a.getPooled(e,b,c,d);Xd(b);return b}};if(Ka)throw Error(u(101));Ka=Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));Ma();var xf=Nc;la=Qd;ma=xf;na=Pd;Sa({SimpleEventPlugin:wf,EnterLeaveEventPlugin:Ye,ChangeEventPlugin:Me,SelectEventPlugin:kf,BeforeInputEventPlugin:ve});var yf=[],zf=-1;function H(a){0>zf||(a.current=yf[zf],yf[zf]=null,zf--)}
function I(a,b){zf++;yf[zf]=a.current;a.current=b}var Af={},J={current:Af},K={current:!1},Bf=Af;function Cf(a,b){var c=a.type.contextTypes;if(!c)return Af;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function L(a){a=a.childContextTypes;return null!==a&&void 0!==a}
function Df(){H(K);H(J)}function Ef(a,b,c){if(J.current!==Af)throw Error(u(168));I(J,b);I(K,c)}function Ff(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(u(108,Ia(b)||"Unknown",e));return n({},c,{},d)}function Gf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Af;Bf=J.current;I(J,a);I(K,K.current);return!0}
function Hf(a,b,c){var d=a.stateNode;if(!d)throw Error(u(169));c?(a=Ff(a,b,Bf),d.__reactInternalMemoizedMergedChildContext=a,H(K),H(J),I(J,a)):H(K);I(K,c)}
var If=r.unstable_runWithPriority,Jf=r.unstable_scheduleCallback,Kf=r.unstable_cancelCallback,Lf=r.unstable_requestPaint,Mf=r.unstable_now,Nf=r.unstable_getCurrentPriorityLevel,Of=r.unstable_ImmediatePriority,Pf=r.unstable_UserBlockingPriority,Qf=r.unstable_NormalPriority,Rf=r.unstable_LowPriority,Sf=r.unstable_IdlePriority,Tf={},Uf=r.unstable_shouldYield,Vf=void 0!==Lf?Lf:function(){},Wf=null,Xf=null,Yf=!1,Zf=Mf(),$f=1E4>Zf?Mf:function(){return Mf()-Zf};
function ag(){switch(Nf()){case Of:return 99;case Pf:return 98;case Qf:return 97;case Rf:return 96;case Sf:return 95;default:throw Error(u(332));}}function bg(a){switch(a){case 99:return Of;case 98:return Pf;case 97:return Qf;case 96:return Rf;case 95:return Sf;default:throw Error(u(332));}}function cg(a,b){a=bg(a);return If(a,b)}function dg(a,b,c){a=bg(a);return Jf(a,b,c)}function eg(a){null===Wf?(Wf=[a],Xf=Jf(Of,fg)):Wf.push(a);return Tf}function gg(){if(null!==Xf){var a=Xf;Xf=null;Kf(a)}fg()}
function fg(){if(!Yf&&null!==Wf){Yf=!0;var a=0;try{var b=Wf;cg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});Wf=null}catch(c){throw null!==Wf&&(Wf=Wf.slice(a+1)),Jf(Of,gg),c;}finally{Yf=!1}}}function hg(a,b,c){c/=10;return 1073741821-(((1073741821-a+b/10)/c|0)+1)*c}function ig(a,b){if(a&&a.defaultProps){b=n({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c])}return b}var jg={current:null},kg=null,lg=null,mg=null;function ng(){mg=lg=kg=null}
function og(a){var b=jg.current;H(jg);a.type._context._currentValue=b}function pg(a,b){for(;null!==a;){var c=a.alternate;if(a.childExpirationTime<b)a.childExpirationTime=b,null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);else if(null!==c&&c.childExpirationTime<b)c.childExpirationTime=b;else break;a=a.return}}function qg(a,b){kg=a;mg=lg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(a.expirationTime>=b&&(rg=!0),a.firstContext=null)}
function sg(a,b){if(mg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)mg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===lg){if(null===kg)throw Error(u(308));lg=b;kg.dependencies={expirationTime:0,firstContext:b,responders:null}}else lg=lg.next=b}return a._currentValue}var tg=!1;function ug(a){a.updateQueue={baseState:a.memoizedState,baseQueue:null,shared:{pending:null},effects:null}}
function vg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,baseQueue:a.baseQueue,shared:a.shared,effects:a.effects})}function wg(a,b){a={expirationTime:a,suspenseConfig:b,tag:0,payload:null,callback:null,next:null};return a.next=a}function xg(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function yg(a,b){var c=a.alternate;null!==c&&vg(c,a);a=a.updateQueue;c=a.baseQueue;null===c?(a.baseQueue=b.next=b,b.next=b):(b.next=c.next,c.next=b)}
function zg(a,b,c,d){var e=a.updateQueue;tg=!1;var f=e.baseQueue,g=e.shared.pending;if(null!==g){if(null!==f){var h=f.next;f.next=g.next;g.next=h}f=g;e.shared.pending=null;h=a.alternate;null!==h&&(h=h.updateQueue,null!==h&&(h.baseQueue=g))}if(null!==f){h=f.next;var k=e.baseState,l=0,m=null,p=null,x=null;if(null!==h){var z=h;do{g=z.expirationTime;if(g<d){var ca={expirationTime:z.expirationTime,suspenseConfig:z.suspenseConfig,tag:z.tag,payload:z.payload,callback:z.callback,next:null};null===x?(p=x=
ca,m=k):x=x.next=ca;g>l&&(l=g)}else{null!==x&&(x=x.next={expirationTime:1073741823,suspenseConfig:z.suspenseConfig,tag:z.tag,payload:z.payload,callback:z.callback,next:null});Ag(g,z.suspenseConfig);a:{var D=a,t=z;g=b;ca=c;switch(t.tag){case 1:D=t.payload;if("function"===typeof D){k=D.call(ca,k,g);break a}k=D;break a;case 3:D.effectTag=D.effectTag&-4097|64;case 0:D=t.payload;g="function"===typeof D?D.call(ca,k,g):D;if(null===g||void 0===g)break a;k=n({},k,g);break a;case 2:tg=!0}}null!==z.callback&&
(a.effectTag|=32,g=e.effects,null===g?e.effects=[z]:g.push(z))}z=z.next;if(null===z||z===h)if(g=e.shared.pending,null===g)break;else z=f.next=g.next,g.next=h,e.baseQueue=f=g,e.shared.pending=null}while(1)}null===x?m=k:x.next=p;e.baseState=m;e.baseQueue=x;Bg(l);a.expirationTime=l;a.memoizedState=k}}
function Cg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=e;e=c;if("function"!==typeof d)throw Error(u(191,d));d.call(e)}}}var Dg=pa.ReactCurrentBatchConfig,Eg=(new aa.Component).refs;function Fg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:n({},b,c);a.memoizedState=c;0===a.expirationTime&&(a.updateQueue.baseState=c)}
var Jg={isMounted:function(a){return(a=a._reactInternalFiber)?dc(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=Gg(),e=Dg.suspense;d=Hg(d,a,e);e=wg(d,e);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);xg(a,e);Ig(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=Gg(),e=Dg.suspense;d=Hg(d,a,e);e=wg(d,e);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);xg(a,e);Ig(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=Gg(),d=Dg.suspense;
c=Hg(c,a,d);d=wg(c,d);d.tag=2;void 0!==b&&null!==b&&(d.callback=b);xg(a,d);Ig(a,c)}};function Kg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!bf(c,d)||!bf(e,f):!0}
function Lg(a,b,c){var d=!1,e=Af;var f=b.contextType;"object"===typeof f&&null!==f?f=sg(f):(e=L(b)?Bf:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Cf(a,e):Af);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Jg;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Mg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Jg.enqueueReplaceState(b,b.state,null)}
function Ng(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Eg;ug(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=sg(f):(f=L(b)?Bf:J.current,e.context=Cf(a,f));zg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Fg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Jg.enqueueReplaceState(e,e.state,null),zg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.effectTag|=4)}var Og=Array.isArray;
function Pg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(u(309));var d=c.stateNode}if(!d)throw Error(u(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Eg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(u(284));if(!c._owner)throw Error(u(290,a));}return a}
function Qg(a,b){if("textarea"!==a.type)throw Error(u(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,""));}
function Rg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Sg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Tg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Pg(a,b,c),d.return=a,d;d=Ug(c.type,c.key,c.props,null,a.mode,d);d.ref=Pg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
c.implementation)return b=Vg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Wg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function p(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Tg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case ra:return c=Ug(b.type,b.key,b.props,null,a.mode,c),c.ref=Pg(a,null,b),c.return=a,c;case sa:return b=Vg(b,a.mode,c),b.return=a,b}if(Og(b)||
Ga(b))return b=Wg(b,a.mode,c,null),b.return=a,b;Qg(a,b)}return null}function x(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case ra:return c.key===e?c.type===ta?m(a,b,c.props.children,d,e):k(a,b,c,d):null;case sa:return c.key===e?l(a,b,c,d):null}if(Og(c)||Ga(c))return null!==e?null:m(a,b,c,d,null);Qg(a,c)}return null}function z(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=
a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case ra:return a=a.get(null===d.key?c:d.key)||null,d.type===ta?m(b,a,d.props.children,e,d.key):k(b,a,d,e);case sa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Og(d)||Ga(d))return a=a.get(c)||null,m(b,a,d,e,null);Qg(b,d)}return null}function ca(e,g,h,k){for(var l=null,t=null,m=g,y=g=0,A=null;null!==m&&y<h.length;y++){m.index>y?(A=m,m=null):A=m.sibling;var q=x(e,m,h[y],k);if(null===q){null===m&&(m=A);break}a&&
m&&null===q.alternate&&b(e,m);g=f(q,g,y);null===t?l=q:t.sibling=q;t=q;m=A}if(y===h.length)return c(e,m),l;if(null===m){for(;y<h.length;y++)m=p(e,h[y],k),null!==m&&(g=f(m,g,y),null===t?l=m:t.sibling=m,t=m);return l}for(m=d(e,m);y<h.length;y++)A=z(m,e,y,h[y],k),null!==A&&(a&&null!==A.alternate&&m.delete(null===A.key?y:A.key),g=f(A,g,y),null===t?l=A:t.sibling=A,t=A);a&&m.forEach(function(a){return b(e,a)});return l}function D(e,g,h,l){var k=Ga(h);if("function"!==typeof k)throw Error(u(150));h=k.call(h);
if(null==h)throw Error(u(151));for(var m=k=null,t=g,y=g=0,A=null,q=h.next();null!==t&&!q.done;y++,q=h.next()){t.index>y?(A=t,t=null):A=t.sibling;var D=x(e,t,q.value,l);if(null===D){null===t&&(t=A);break}a&&t&&null===D.alternate&&b(e,t);g=f(D,g,y);null===m?k=D:m.sibling=D;m=D;t=A}if(q.done)return c(e,t),k;if(null===t){for(;!q.done;y++,q=h.next())q=p(e,q.value,l),null!==q&&(g=f(q,g,y),null===m?k=q:m.sibling=q,m=q);return k}for(t=d(e,t);!q.done;y++,q=h.next())q=z(t,e,y,q.value,l),null!==q&&(a&&null!==
q.alternate&&t.delete(null===q.key?y:q.key),g=f(q,g,y),null===m?k=q:m.sibling=q,m=q);a&&t.forEach(function(a){return b(e,a)});return k}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ta&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case ra:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ta){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,
k.sibling);d=e(k,f.props);d.ref=Pg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ta?(d=Wg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Ug(f.type,f.key,f.props,null,a.mode,h),h.ref=Pg(a,d,f),h.return=a,a=h)}return g(a);case sa:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=
d.sibling}d=Vg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Tg(f,a.mode,h),d.return=a,a=d),g(a);if(Og(f))return ca(a,d,f,h);if(Ga(f))return D(a,d,f,h);l&&Qg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:throw a=a.type,Error(u(152,a.displayName||a.name||"Component"));}return c(a,d)}}var Xg=Rg(!0),Yg=Rg(!1),Zg={},$g={current:Zg},ah={current:Zg},bh={current:Zg};
function ch(a){if(a===Zg)throw Error(u(174));return a}function dh(a,b){I(bh,b);I(ah,a);I($g,Zg);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:Ob(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=Ob(b,a)}H($g);I($g,b)}function eh(){H($g);H(ah);H(bh)}function fh(a){ch(bh.current);var b=ch($g.current);var c=Ob(b,a.type);b!==c&&(I(ah,a),I($g,c))}function gh(a){ah.current===a&&(H($g),H(ah))}var M={current:0};
function hh(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||c.data===Bd||c.data===Cd))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.effectTag&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}function ih(a,b){return{responder:a,props:b}}
var jh=pa.ReactCurrentDispatcher,kh=pa.ReactCurrentBatchConfig,lh=0,N=null,O=null,P=null,mh=!1;function Q(){throw Error(u(321));}function nh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!$e(a[c],b[c]))return!1;return!0}
function oh(a,b,c,d,e,f){lh=f;N=b;b.memoizedState=null;b.updateQueue=null;b.expirationTime=0;jh.current=null===a||null===a.memoizedState?ph:qh;a=c(d,e);if(b.expirationTime===lh){f=0;do{b.expirationTime=0;if(!(25>f))throw Error(u(301));f+=1;P=O=null;b.updateQueue=null;jh.current=rh;a=c(d,e)}while(b.expirationTime===lh)}jh.current=sh;b=null!==O&&null!==O.next;lh=0;P=O=N=null;mh=!1;if(b)throw Error(u(300));return a}
function th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===P?N.memoizedState=P=a:P=P.next=a;return P}function uh(){if(null===O){var a=N.alternate;a=null!==a?a.memoizedState:null}else a=O.next;var b=null===P?N.memoizedState:P.next;if(null!==b)P=b,O=a;else{if(null===a)throw Error(u(310));O=a;a={memoizedState:O.memoizedState,baseState:O.baseState,baseQueue:O.baseQueue,queue:O.queue,next:null};null===P?N.memoizedState=P=a:P=P.next=a}return P}
function vh(a,b){return"function"===typeof b?b(a):b}
function wh(a){var b=uh(),c=b.queue;if(null===c)throw Error(u(311));c.lastRenderedReducer=a;var d=O,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.expirationTime;if(l<lh){var m={expirationTime:k.expirationTime,suspenseConfig:k.suspenseConfig,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null};null===h?(g=h=m,f=d):h=h.next=m;l>N.expirationTime&&
(N.expirationTime=l,Bg(l))}else null!==h&&(h=h.next={expirationTime:1073741823,suspenseConfig:k.suspenseConfig,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),Ag(l,k.suspenseConfig),d=k.eagerReducer===a?k.eagerState:a(d,k.action);k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;$e(d,b.memoizedState)||(rg=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function xh(a){var b=uh(),c=b.queue;if(null===c)throw Error(u(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);$e(f,b.memoizedState)||(rg=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function yh(a){var b=th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:vh,lastRenderedState:a};a=a.dispatch=zh.bind(null,N,a);return[b.memoizedState,a]}function Ah(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=N.updateQueue;null===b?(b={lastEffect:null},N.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}
function Bh(){return uh().memoizedState}function Ch(a,b,c,d){var e=th();N.effectTag|=a;e.memoizedState=Ah(1|b,c,void 0,void 0===d?null:d)}function Dh(a,b,c,d){var e=uh();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&nh(d,g.deps)){Ah(b,c,f,d);return}}N.effectTag|=a;e.memoizedState=Ah(1|b,c,f,d)}function Eh(a,b){return Ch(516,4,a,b)}function Fh(a,b){return Dh(516,4,a,b)}function Gh(a,b){return Dh(4,2,a,b)}
function Hh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Ih(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Dh(4,2,Hh.bind(null,b,a),c)}function Jh(){}function Kh(a,b){th().memoizedState=[a,void 0===b?null:b];return a}function Lh(a,b){var c=uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&nh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function Mh(a,b){var c=uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&nh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Nh(a,b,c){var d=ag();cg(98>d?98:d,function(){a(!0)});cg(97<d?97:d,function(){var d=kh.suspense;kh.suspense=void 0===b?null:b;try{a(!1),c()}finally{kh.suspense=d}})}
function zh(a,b,c){var d=Gg(),e=Dg.suspense;d=Hg(d,a,e);e={expirationTime:d,suspenseConfig:e,action:c,eagerReducer:null,eagerState:null,next:null};var f=b.pending;null===f?e.next=e:(e.next=f.next,f.next=e);b.pending=e;f=a.alternate;if(a===N||null!==f&&f===N)mh=!0,e.expirationTime=lh,N.expirationTime=lh;else{if(0===a.expirationTime&&(null===f||0===f.expirationTime)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.eagerReducer=f;e.eagerState=h;if($e(h,g))return}catch(k){}finally{}Ig(a,
d)}}
var sh={readContext:sg,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useResponder:Q,useDeferredValue:Q,useTransition:Q},ph={readContext:sg,useCallback:Kh,useContext:sg,useEffect:Eh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Ch(4,2,Hh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Ch(4,2,a,b)},useMemo:function(a,b){var c=th();b=void 0===b?null:b;a=a();c.memoizedState=[a,
b];return a},useReducer:function(a,b,c){var d=th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=zh.bind(null,N,a);return[d.memoizedState,a]},useRef:function(a){var b=th();a={current:a};return b.memoizedState=a},useState:yh,useDebugValue:Jh,useResponder:ih,useDeferredValue:function(a,b){var c=yh(a),d=c[0],e=c[1];Eh(function(){var c=kh.suspense;kh.suspense=void 0===b?null:b;try{e(a)}finally{kh.suspense=
c}},[a,b]);return d},useTransition:function(a){var b=yh(!1),c=b[0];b=b[1];return[Kh(Nh.bind(null,b,a),[b,a]),c]}},qh={readContext:sg,useCallback:Lh,useContext:sg,useEffect:Fh,useImperativeHandle:Ih,useLayoutEffect:Gh,useMemo:Mh,useReducer:wh,useRef:Bh,useState:function(){return wh(vh)},useDebugValue:Jh,useResponder:ih,useDeferredValue:function(a,b){var c=wh(vh),d=c[0],e=c[1];Fh(function(){var c=kh.suspense;kh.suspense=void 0===b?null:b;try{e(a)}finally{kh.suspense=c}},[a,b]);return d},useTransition:function(a){var b=
wh(vh),c=b[0];b=b[1];return[Lh(Nh.bind(null,b,a),[b,a]),c]}},rh={readContext:sg,useCallback:Lh,useContext:sg,useEffect:Fh,useImperativeHandle:Ih,useLayoutEffect:Gh,useMemo:Mh,useReducer:xh,useRef:Bh,useState:function(){return xh(vh)},useDebugValue:Jh,useResponder:ih,useDeferredValue:function(a,b){var c=xh(vh),d=c[0],e=c[1];Fh(function(){var c=kh.suspense;kh.suspense=void 0===b?null:b;try{e(a)}finally{kh.suspense=c}},[a,b]);return d},useTransition:function(a){var b=xh(vh),c=b[0];b=b[1];return[Lh(Nh.bind(null,
b,a),[b,a]),c]}},Oh=null,Ph=null,Qh=!1;function Rh(a,b){var c=Sh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function Th(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function Uh(a){if(Qh){var b=Ph;if(b){var c=b;if(!Th(a,b)){b=Jd(c.nextSibling);if(!b||!Th(a,b)){a.effectTag=a.effectTag&-1025|2;Qh=!1;Oh=a;return}Rh(Oh,c)}Oh=a;Ph=Jd(b.firstChild)}else a.effectTag=a.effectTag&-1025|2,Qh=!1,Oh=a}}function Vh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;Oh=a}
function Wh(a){if(a!==Oh)return!1;if(!Qh)return Vh(a),Qh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!Gd(b,a.memoizedProps))for(b=Ph;b;)Rh(a,b),b=Jd(b.nextSibling);Vh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(u(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if(c===Ad){if(0===b){Ph=Jd(a.nextSibling);break a}b--}else c!==zd&&c!==Cd&&c!==Bd||b++}a=a.nextSibling}Ph=null}}else Ph=Oh?Jd(a.stateNode.nextSibling):null;return!0}
function Xh(){Ph=Oh=null;Qh=!1}var Yh=pa.ReactCurrentOwner,rg=!1;function R(a,b,c,d){b.child=null===a?Yg(b,null,c,d):Xg(b,a.child,c,d)}function Zh(a,b,c,d,e){c=c.render;var f=b.ref;qg(b,e);d=oh(a,b,c,d,f,e);if(null!==a&&!rg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),$h(a,b,e);b.effectTag|=1;R(a,b,d,e);return b.child}
function ai(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!bi(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ci(a,b,g,d,e,f);a=Ug(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:bf,c(e,d)&&a.ref===b.ref))return $h(a,b,f);b.effectTag|=1;a=Sg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ci(a,b,c,d,e,f){return null!==a&&bf(a.memoizedProps,d)&&a.ref===b.ref&&(rg=!1,e<f)?(b.expirationTime=a.expirationTime,$h(a,b,f)):di(a,b,c,d,f)}function ei(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function di(a,b,c,d,e){var f=L(c)?Bf:J.current;f=Cf(b,f);qg(b,e);c=oh(a,b,c,d,f,e);if(null!==a&&!rg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),$h(a,b,e);b.effectTag|=1;R(a,b,c,e);return b.child}
function fi(a,b,c,d,e){if(L(c)){var f=!0;Gf(b)}else f=!1;qg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),Lg(b,c,d),Ng(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=sg(l):(l=L(c)?Bf:J.current,l=Cf(b,l));var m=c.getDerivedStateFromProps,p="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;p||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Mg(b,g,d,l);tg=!1;var x=b.memoizedState;g.state=x;zg(b,d,g,e);k=b.memoizedState;h!==d||x!==k||K.current||tg?("function"===typeof m&&(Fg(b,c,m,d),k=b.memoizedState),(h=tg||Kg(b,c,h,d,x,k,l))?(p||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1)}else g=b.stateNode,vg(a,b),h=b.memoizedProps,g.props=b.type===b.elementType?h:ig(b.type,h),k=g.context,l=c.contextType,"object"===typeof l&&null!==l?l=sg(l):(l=L(c)?Bf:J.current,l=Cf(b,l)),m=c.getDerivedStateFromProps,(p="function"===typeof m||"function"===
typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Mg(b,g,d,l),tg=!1,k=b.memoizedState,g.state=k,zg(b,d,g,e),x=b.memoizedState,h!==d||k!==x||K.current||tg?("function"===typeof m&&(Fg(b,c,m,d),x=b.memoizedState),(m=tg||Kg(b,c,h,d,k,x,l))?(p||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,l),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,l)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=l,d=m):
("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),d=!1);return gi(a,b,c,d,f,e)}
function gi(a,b,c,d,e,f){ei(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&Hf(b,c,!1),$h(a,b,f);d=b.stateNode;Yh.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=Xg(b,a.child,null,f),b.child=Xg(b,null,h,f)):R(a,b,h,f);b.memoizedState=d.state;e&&Hf(b,c,!0);return b.child}function hi(a){var b=a.stateNode;b.pendingContext?Ef(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Ef(a,b.context,!1);dh(a,b.containerInfo)}
var ii={dehydrated:null,retryTime:0};
function ji(a,b,c){var d=b.mode,e=b.pendingProps,f=M.current,g=!1,h;(h=0!==(b.effectTag&64))||(h=0!==(f&2)&&(null===a||null!==a.memoizedState));h?(g=!0,b.effectTag&=-65):null!==a&&null===a.memoizedState||void 0===e.fallback||!0===e.unstable_avoidThisFallback||(f|=1);I(M,f&1);if(null===a){void 0!==e.fallback&&Uh(b);if(g){g=e.fallback;e=Wg(null,d,0,null);e.return=b;if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=Wg(g,d,c,null);c.return=
b;e.sibling=c;b.memoizedState=ii;b.child=e;return c}d=e.children;b.memoizedState=null;return b.child=Yg(b,null,d,c)}if(null!==a.memoizedState){a=a.child;d=a.sibling;if(g){e=e.fallback;c=Sg(a,a.pendingProps);c.return=b;if(0===(b.mode&2)&&(g=null!==b.memoizedState?b.child.child:b.child,g!==a.child))for(c.child=g;null!==g;)g.return=c,g=g.sibling;d=Sg(d,e);d.return=b;c.sibling=d;c.childExpirationTime=0;b.memoizedState=ii;b.child=c;return d}c=Xg(b,a.child,e.children,c);b.memoizedState=null;return b.child=
c}a=a.child;if(g){g=e.fallback;e=Wg(null,d,0,null);e.return=b;e.child=a;null!==a&&(a.return=e);if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=Wg(g,d,c,null);c.return=b;e.sibling=c;c.effectTag|=2;e.childExpirationTime=0;b.memoizedState=ii;b.child=e;return c}b.memoizedState=null;return b.child=Xg(b,a,e.children,c)}
function ki(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);pg(a.return,b)}function li(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailExpiration:0,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailExpiration=0,g.tailMode=e,g.lastEffect=f)}
function mi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;R(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.effectTag|=64;else{if(null!==a&&0!==(a.effectTag&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&ki(a,c);else if(19===a.tag)ki(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(M,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===hh(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);li(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===hh(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}li(b,!0,c,null,f,b.lastEffect);break;case "together":li(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function $h(a,b,c){null!==a&&(b.dependencies=a.dependencies);var d=b.expirationTime;0!==d&&Bg(d);if(b.childExpirationTime<c)return null;if(null!==a&&b.child!==a.child)throw Error(u(153));if(null!==b.child){a=b.child;c=Sg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Sg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}var ni,oi,pi,qi;
ni=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};oi=function(){};
pi=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;ch($g.current);a=null;switch(c){case "input":f=zb(g,f);d=zb(g,d);a=[];break;case "option":f=Gb(g,f);d=Gb(g,d);a=[];break;case "select":f=n({},f,{value:void 0});d=n({},d,{value:void 0});a=[];break;case "textarea":f=Ib(g,f);d=Ib(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=sd)}od(c,d);var h,k;c=null;for(h in f)if(!d.hasOwnProperty(h)&&f.hasOwnProperty(h)&&null!=f[h])if("style"===
h)for(k in g=f[h],g)g.hasOwnProperty(k)&&(c||(c={}),c[k]="");else"dangerouslySetInnerHTML"!==h&&"children"!==h&&"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(Qa.hasOwnProperty(h)?a||(a=[]):(a=a||[]).push(h,null));for(h in d){var l=d[h];g=null!=f?f[h]:void 0;if(d.hasOwnProperty(h)&&l!==g&&(null!=l||null!=g))if("style"===h)if(g){for(k in g)!g.hasOwnProperty(k)||l&&l.hasOwnProperty(k)||(c||(c={}),c[k]="");for(k in l)l.hasOwnProperty(k)&&g[k]!==l[k]&&(c||(c={}),
c[k]=l[k])}else c||(a||(a=[]),a.push(h,c)),c=l;else"dangerouslySetInnerHTML"===h?(l=l?l.__html:void 0,g=g?g.__html:void 0,null!=l&&g!==l&&(a=a||[]).push(h,l)):"children"===h?g===l||"string"!==typeof l&&"number"!==typeof l||(a=a||[]).push(h,""+l):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&(Qa.hasOwnProperty(h)?(null!=l&&rd(e,h),a||g===l||(a=[])):(a=a||[]).push(h,l))}c&&(a=a||[]).push("style",c);e=a;if(b.updateQueue=e)b.effectTag|=4}};
qi=function(a,b,c,d){c!==d&&(b.effectTag|=4)};function ri(a,b){switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function si(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return L(b.type)&&Df(),null;case 3:return eh(),H(K),H(J),c=b.stateNode,c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),null!==a&&null!==a.child||!Wh(b)||(b.effectTag|=4),oi(b),null;case 5:gh(b);c=ch(bh.current);var e=b.type;if(null!==a&&null!=b.stateNode)pi(a,b,e,d,c),a.ref!==b.ref&&(b.effectTag|=128);else{if(!d){if(null===b.stateNode)throw Error(u(166));
return null}a=ch($g.current);if(Wh(b)){d=b.stateNode;e=b.type;var f=b.memoizedProps;d[Md]=b;d[Nd]=f;switch(e){case "iframe":case "object":case "embed":F("load",d);break;case "video":case "audio":for(a=0;a<ac.length;a++)F(ac[a],d);break;case "source":F("error",d);break;case "img":case "image":case "link":F("error",d);F("load",d);break;case "form":F("reset",d);F("submit",d);break;case "details":F("toggle",d);break;case "input":Ab(d,f);F("invalid",d);rd(c,"onChange");break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};F("invalid",d);rd(c,"onChange");break;case "textarea":Jb(d,f),F("invalid",d),rd(c,"onChange")}od(e,f);a=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(a=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(a=["children",""+h]):Qa.hasOwnProperty(g)&&null!=h&&rd(c,g)}switch(e){case "input":xb(d);Eb(d,f,!0);break;case "textarea":xb(d);Lb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&
(d.onclick=sd)}c=a;b.updateQueue=c;null!==c&&(b.effectTag|=4)}else{g=9===c.nodeType?c:c.ownerDocument;a===qd&&(a=Nb(e));a===qd?"script"===e?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(e,{is:d.is}):(a=g.createElement(e),"select"===e&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,e);a[Md]=b;a[Nd]=d;ni(a,b,!1,!1);b.stateNode=a;g=pd(e,d);switch(e){case "iframe":case "object":case "embed":F("load",
a);h=d;break;case "video":case "audio":for(h=0;h<ac.length;h++)F(ac[h],a);h=d;break;case "source":F("error",a);h=d;break;case "img":case "image":case "link":F("error",a);F("load",a);h=d;break;case "form":F("reset",a);F("submit",a);h=d;break;case "details":F("toggle",a);h=d;break;case "input":Ab(a,d);h=zb(a,d);F("invalid",a);rd(c,"onChange");break;case "option":h=Gb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};h=n({},d,{value:void 0});F("invalid",a);rd(c,"onChange");break;case "textarea":Jb(a,
d);h=Ib(a,d);F("invalid",a);rd(c,"onChange");break;default:h=d}od(e,h);var k=h;for(f in k)if(k.hasOwnProperty(f)){var l=k[f];"style"===f?md(a,l):"dangerouslySetInnerHTML"===f?(l=l?l.__html:void 0,null!=l&&Qb(a,l)):"children"===f?"string"===typeof l?("textarea"!==e||""!==l)&&Rb(a,l):"number"===typeof l&&Rb(a,""+l):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(Qa.hasOwnProperty(f)?null!=l&&rd(c,f):null!=l&&qb(a,f,l,g))}switch(e){case "input":xb(a);Eb(a,d,!1);
break;case "textarea":xb(a);Lb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+rb(d.value));break;case "select":a.multiple=!!d.multiple;c=d.value;null!=c?Hb(a,!!d.multiple,c,!1):null!=d.defaultValue&&Hb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof h.onClick&&(a.onclick=sd)}Fd(e,d)&&(b.effectTag|=4)}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)qi(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(u(166));
c=ch(bh.current);ch($g.current);Wh(b)?(c=b.stateNode,d=b.memoizedProps,c[Md]=b,c.nodeValue!==d&&(b.effectTag|=4)):(c=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),c[Md]=b,b.stateNode=c)}return null;case 13:H(M);d=b.memoizedState;if(0!==(b.effectTag&64))return b.expirationTime=c,b;c=null!==d;d=!1;null===a?void 0!==b.memoizedProps.fallback&&Wh(b):(e=a.memoizedState,d=null!==e,c||null===e||(e=a.child.sibling,null!==e&&(f=b.firstEffect,null!==f?(b.firstEffect=e,e.nextEffect=f):(b.firstEffect=b.lastEffect=
e,e.nextEffect=null),e.effectTag=8)));if(c&&!d&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(M.current&1))S===ti&&(S=ui);else{if(S===ti||S===ui)S=vi;0!==wi&&null!==T&&(xi(T,U),yi(T,wi))}if(c||d)b.effectTag|=4;return null;case 4:return eh(),oi(b),null;case 10:return og(b),null;case 17:return L(b.type)&&Df(),null;case 19:H(M);d=b.memoizedState;if(null===d)return null;e=0!==(b.effectTag&64);f=d.rendering;if(null===f)if(e)ri(d,!1);else{if(S!==ti||null!==a&&0!==(a.effectTag&
64))for(f=b.child;null!==f;){a=hh(f);if(null!==a){b.effectTag|=64;ri(d,!1);e=a.updateQueue;null!==e&&(b.updateQueue=e,b.effectTag|=4);null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;for(d=b.child;null!==d;)e=d,f=c,e.effectTag&=2,e.nextEffect=null,e.firstEffect=null,e.lastEffect=null,a=e.alternate,null===a?(e.childExpirationTime=0,e.expirationTime=f,e.child=null,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null):(e.childExpirationTime=a.childExpirationTime,
e.expirationTime=a.expirationTime,e.child=a.child,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,f=a.dependencies,e.dependencies=null===f?null:{expirationTime:f.expirationTime,firstContext:f.firstContext,responders:f.responders}),d=d.sibling;I(M,M.current&1|2);return b.child}f=f.sibling}}else{if(!e)if(a=hh(f),null!==a){if(b.effectTag|=64,e=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.effectTag|=4),ri(d,!0),null===d.tail&&"hidden"===d.tailMode&&!f.alternate)return b=
b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*$f()-d.renderingStartTime>d.tailExpiration&&1<c&&(b.effectTag|=64,e=!0,ri(d,!1),b.expirationTime=b.childExpirationTime=c-1);d.isBackwards?(f.sibling=b.child,b.child=f):(c=d.last,null!==c?c.sibling=f:b.child=f,d.last=f)}return null!==d.tail?(0===d.tailExpiration&&(d.tailExpiration=$f()+500),c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=$f(),c.sibling=null,b=M.current,I(M,e?b&1|2:b&1),c):null}throw Error(u(156,
b.tag));}function zi(a){switch(a.tag){case 1:L(a.type)&&Df();var b=a.effectTag;return b&4096?(a.effectTag=b&-4097|64,a):null;case 3:eh();H(K);H(J);b=a.effectTag;if(0!==(b&64))throw Error(u(285));a.effectTag=b&-4097|64;return a;case 5:return gh(a),null;case 13:return H(M),b=a.effectTag,b&4096?(a.effectTag=b&-4097|64,a):null;case 19:return H(M),null;case 4:return eh(),null;case 10:return og(a),null;default:return null}}function Ai(a,b){return{value:a,source:b,stack:Ja(b)}}
var Bi="function"===typeof WeakSet?WeakSet:Set;function Ci(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=Ja(c));null!==c&&Ia(c.type);b=b.value;null!==a&&1===a.tag&&Ia(a.type);try{console.error(b)}catch(e){setTimeout(function(){throw e;})}}function Di(a,b){try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Ei(a,c)}}function Fi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Ei(a,c)}else b.current=null}
function Gi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.effectTag&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:ig(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:case 5:case 6:case 4:case 17:return}throw Error(u(163));}
function Hi(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.destroy;c.destroy=void 0;void 0!==d&&d()}c=c.next}while(c!==b)}}function Ii(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}
function Ji(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:Ii(3,c);return;case 1:a=c.stateNode;if(c.effectTag&4)if(null===b)a.componentDidMount();else{var d=c.elementType===c.type?b.memoizedProps:ig(c.type,b.memoizedProps);a.componentDidUpdate(d,b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}b=c.updateQueue;null!==b&&Cg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Cg(c,b,a)}return;
case 5:a=c.stateNode;null===b&&c.effectTag&4&&Fd(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Vc(c))));return;case 19:case 17:case 20:case 21:return}throw Error(u(163));}
function Ki(a,b,c){"function"===typeof Li&&Li(b);switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var d=a.next;cg(97<c?97:c,function(){var a=d;do{var c=a.destroy;if(void 0!==c){var g=b;try{c()}catch(h){Ei(g,h)}}a=a.next}while(a!==d)})}break;case 1:Fi(b);c=b.stateNode;"function"===typeof c.componentWillUnmount&&Di(b,c);break;case 5:Fi(b);break;case 4:Mi(a,b,c)}}
function Ni(a){var b=a.alternate;a.return=null;a.child=null;a.memoizedState=null;a.updateQueue=null;a.dependencies=null;a.alternate=null;a.firstEffect=null;a.lastEffect=null;a.pendingProps=null;a.memoizedProps=null;a.stateNode=null;null!==b&&Ni(b)}function Oi(a){return 5===a.tag||3===a.tag||4===a.tag}
function Pi(a){a:{for(var b=a.return;null!==b;){if(Oi(b)){var c=b;break a}b=b.return}throw Error(u(160));}b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(u(161));}c.effectTag&16&&(Rb(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Oi(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}d?Qi(a,c,b):Ri(a,c,b)}
function Qi(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=sd));else if(4!==d&&(a=a.child,null!==a))for(Qi(a,b,c),a=a.sibling;null!==a;)Qi(a,b,c),a=a.sibling}
function Ri(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Ri(a,b,c),a=a.sibling;null!==a;)Ri(a,b,c),a=a.sibling}
function Mi(a,b,c){for(var d=b,e=!1,f,g;;){if(!e){e=d.return;a:for(;;){if(null===e)throw Error(u(160));f=e.stateNode;switch(e.tag){case 5:g=!1;break a;case 3:f=f.containerInfo;g=!0;break a;case 4:f=f.containerInfo;g=!0;break a}e=e.return}e=!0}if(5===d.tag||6===d.tag){a:for(var h=a,k=d,l=c,m=k;;)if(Ki(h,m,l),null!==m.child&&4!==m.tag)m.child.return=m,m=m.child;else{if(m===k)break a;for(;null===m.sibling;){if(null===m.return||m.return===k)break a;m=m.return}m.sibling.return=m.return;m=m.sibling}g?(h=
f,k=d.stateNode,8===h.nodeType?h.parentNode.removeChild(k):h.removeChild(k)):f.removeChild(d.stateNode)}else if(4===d.tag){if(null!==d.child){f=d.stateNode.containerInfo;g=!0;d.child.return=d;d=d.child;continue}}else if(Ki(a,d,c),null!==d.child){d.child.return=d;d=d.child;continue}if(d===b)break;for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return;4===d.tag&&(e=!1)}d.sibling.return=d.return;d=d.sibling}}
function Si(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:Hi(3,b);return;case 1:return;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps,e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[Nd]=d;"input"===a&&"radio"===d.type&&null!=d.name&&Bb(c,d);pd(a,e);b=pd(a,d);for(e=0;e<f.length;e+=2){var g=f[e],h=f[e+1];"style"===g?md(c,h):"dangerouslySetInnerHTML"===g?Qb(c,h):"children"===g?Rb(c,h):qb(c,g,h,b)}switch(a){case "input":Cb(c,d);break;
case "textarea":Kb(c,d);break;case "select":b=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,a=d.value,null!=a?Hb(c,!!d.multiple,a,!1):b!==!!d.multiple&&(null!=d.defaultValue?Hb(c,!!d.multiple,d.defaultValue,!0):Hb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(u(162));b.stateNode.nodeValue=b.memoizedProps;return;case 3:b=b.stateNode;b.hydrate&&(b.hydrate=!1,Vc(b.containerInfo));return;case 12:return;case 13:c=b;null===b.memoizedState?
d=!1:(d=!0,c=b.child,Ti=$f());if(null!==c)a:for(a=c;;){if(5===a.tag)f=a.stateNode,d?(f=f.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(f=a.stateNode,e=a.memoizedProps.style,e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null,f.style.display=ld("display",e));else if(6===a.tag)a.stateNode.nodeValue=d?"":a.memoizedProps;else if(13===a.tag&&null!==a.memoizedState&&null===a.memoizedState.dehydrated){f=a.child.sibling;f.return=a;a=
f;continue}else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===c)break;for(;null===a.sibling;){if(null===a.return||a.return===c)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}Ui(b);return;case 19:Ui(b);return;case 17:return}throw Error(u(163));}function Ui(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Bi);b.forEach(function(b){var d=Vi.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
var Wi="function"===typeof WeakMap?WeakMap:Map;function Xi(a,b,c){c=wg(c,null);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Yi||(Yi=!0,Zi=d);Ci(a,b)};return c}
function $i(a,b,c){c=wg(c,null);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ci(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===aj?aj=new Set([this]):aj.add(this),Ci(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
var bj=Math.ceil,cj=pa.ReactCurrentDispatcher,dj=pa.ReactCurrentOwner,V=0,ej=8,fj=16,gj=32,ti=0,hj=1,ij=2,ui=3,vi=4,jj=5,W=V,T=null,X=null,U=0,S=ti,kj=null,lj=1073741823,mj=1073741823,nj=null,wi=0,oj=!1,Ti=0,pj=500,Y=null,Yi=!1,Zi=null,aj=null,qj=!1,rj=null,sj=90,tj=null,uj=0,vj=null,wj=0;function Gg(){return(W&(fj|gj))!==V?1073741821-($f()/10|0):0!==wj?wj:wj=1073741821-($f()/10|0)}
function Hg(a,b,c){b=b.mode;if(0===(b&2))return 1073741823;var d=ag();if(0===(b&4))return 99===d?1073741823:1073741822;if((W&fj)!==V)return U;if(null!==c)a=hg(a,c.timeoutMs|0||5E3,250);else switch(d){case 99:a=1073741823;break;case 98:a=hg(a,150,100);break;case 97:case 96:a=hg(a,5E3,250);break;case 95:a=2;break;default:throw Error(u(326));}null!==T&&a===U&&--a;return a}
function Ig(a,b){if(50<uj)throw uj=0,vj=null,Error(u(185));a=xj(a,b);if(null!==a){var c=ag();1073741823===b?(W&ej)!==V&&(W&(fj|gj))===V?yj(a):(Z(a),W===V&&gg()):Z(a);(W&4)===V||98!==c&&99!==c||(null===tj?tj=new Map([[a,b]]):(c=tj.get(a),(void 0===c||c>b)&&tj.set(a,b)))}}
function xj(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return}null!==e&&(T===e&&(Bg(b),S===vi&&xi(e,U)),yi(e,b));return e}
function zj(a){var b=a.lastExpiredTime;if(0!==b)return b;b=a.firstPendingTime;if(!Aj(a,b))return b;var c=a.lastPingedTime;a=a.nextKnownPendingLevel;a=c>a?c:a;return 2>=a&&b!==a?0:a}
function Z(a){if(0!==a.lastExpiredTime)a.callbackExpirationTime=1073741823,a.callbackPriority=99,a.callbackNode=eg(yj.bind(null,a));else{var b=zj(a),c=a.callbackNode;if(0===b)null!==c&&(a.callbackNode=null,a.callbackExpirationTime=0,a.callbackPriority=90);else{var d=Gg();1073741823===b?d=99:1===b||2===b?d=95:(d=10*(1073741821-b)-10*(1073741821-d),d=0>=d?99:250>=d?98:5250>=d?97:95);if(null!==c){var e=a.callbackPriority;if(a.callbackExpirationTime===b&&e>=d)return;c!==Tf&&Kf(c)}a.callbackExpirationTime=
b;a.callbackPriority=d;b=1073741823===b?eg(yj.bind(null,a)):dg(d,Bj.bind(null,a),{timeout:10*(1073741821-b)-$f()});a.callbackNode=b}}}
function Bj(a,b){wj=0;if(b)return b=Gg(),Cj(a,b),Z(a),null;var c=zj(a);if(0!==c){b=a.callbackNode;if((W&(fj|gj))!==V)throw Error(u(327));Dj();a===T&&c===U||Ej(a,c);if(null!==X){var d=W;W|=fj;var e=Fj();do try{Gj();break}catch(h){Hj(a,h)}while(1);ng();W=d;cj.current=e;if(S===hj)throw b=kj,Ej(a,c),xi(a,c),Z(a),b;if(null===X)switch(e=a.finishedWork=a.current.alternate,a.finishedExpirationTime=c,d=S,T=null,d){case ti:case hj:throw Error(u(345));case ij:Cj(a,2<c?2:c);break;case ui:xi(a,c);d=a.lastSuspendedTime;
c===d&&(a.nextKnownPendingLevel=Ij(e));if(1073741823===lj&&(e=Ti+pj-$f(),10<e)){if(oj){var f=a.lastPingedTime;if(0===f||f>=c){a.lastPingedTime=c;Ej(a,c);break}}f=zj(a);if(0!==f&&f!==c)break;if(0!==d&&d!==c){a.lastPingedTime=d;break}a.timeoutHandle=Hd(Jj.bind(null,a),e);break}Jj(a);break;case vi:xi(a,c);d=a.lastSuspendedTime;c===d&&(a.nextKnownPendingLevel=Ij(e));if(oj&&(e=a.lastPingedTime,0===e||e>=c)){a.lastPingedTime=c;Ej(a,c);break}e=zj(a);if(0!==e&&e!==c)break;if(0!==d&&d!==c){a.lastPingedTime=
d;break}1073741823!==mj?d=10*(1073741821-mj)-$f():1073741823===lj?d=0:(d=10*(1073741821-lj)-5E3,e=$f(),c=10*(1073741821-c)-e,d=e-d,0>d&&(d=0),d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*bj(d/1960))-d,c<d&&(d=c));if(10<d){a.timeoutHandle=Hd(Jj.bind(null,a),d);break}Jj(a);break;case jj:if(1073741823!==lj&&null!==nj){f=lj;var g=nj;d=g.busyMinDurationMs|0;0>=d?d=0:(e=g.busyDelayMs|0,f=$f()-(10*(1073741821-f)-(g.timeoutMs|0||5E3)),d=f<=e?0:e+d-f);if(10<d){xi(a,c);a.timeoutHandle=
Hd(Jj.bind(null,a),d);break}}Jj(a);break;default:throw Error(u(329));}Z(a);if(a.callbackNode===b)return Bj.bind(null,a)}}return null}
function yj(a){var b=a.lastExpiredTime;b=0!==b?b:1073741823;if((W&(fj|gj))!==V)throw Error(u(327));Dj();a===T&&b===U||Ej(a,b);if(null!==X){var c=W;W|=fj;var d=Fj();do try{Kj();break}catch(e){Hj(a,e)}while(1);ng();W=c;cj.current=d;if(S===hj)throw c=kj,Ej(a,b),xi(a,b),Z(a),c;if(null!==X)throw Error(u(261));a.finishedWork=a.current.alternate;a.finishedExpirationTime=b;T=null;Jj(a);Z(a)}return null}function Lj(){if(null!==tj){var a=tj;tj=null;a.forEach(function(a,c){Cj(c,a);Z(c)});gg()}}
function Mj(a,b){var c=W;W|=1;try{return a(b)}finally{W=c,W===V&&gg()}}function Nj(a,b){var c=W;W&=-2;W|=ej;try{return a(b)}finally{W=c,W===V&&gg()}}
function Ej(a,b){a.finishedWork=null;a.finishedExpirationTime=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Id(c));if(null!==X)for(c=X.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Df();break;case 3:eh();H(K);H(J);break;case 5:gh(d);break;case 4:eh();break;case 13:H(M);break;case 19:H(M);break;case 10:og(d)}c=c.return}T=a;X=Sg(a.current,null);U=b;S=ti;kj=null;mj=lj=1073741823;nj=null;wi=0;oj=!1}
function Hj(a,b){do{try{ng();jh.current=sh;if(mh)for(var c=N.memoizedState;null!==c;){var d=c.queue;null!==d&&(d.pending=null);c=c.next}lh=0;P=O=N=null;mh=!1;if(null===X||null===X.return)return S=hj,kj=b,X=null;a:{var e=a,f=X.return,g=X,h=b;b=U;g.effectTag|=2048;g.firstEffect=g.lastEffect=null;if(null!==h&&"object"===typeof h&&"function"===typeof h.then){var k=h;if(0===(g.mode&2)){var l=g.alternate;l?(g.memoizedState=l.memoizedState,g.expirationTime=l.expirationTime):g.memoizedState=null}var m=0!==
(M.current&1),p=f;do{var x;if(x=13===p.tag){var z=p.memoizedState;if(null!==z)x=null!==z.dehydrated?!0:!1;else{var ca=p.memoizedProps;x=void 0===ca.fallback?!1:!0!==ca.unstable_avoidThisFallback?!0:m?!1:!0}}if(x){var D=p.updateQueue;if(null===D){var t=new Set;t.add(k);p.updateQueue=t}else D.add(k);if(0===(p.mode&2)){p.effectTag|=64;g.effectTag&=-2981;if(1===g.tag)if(null===g.alternate)g.tag=17;else{var y=wg(1073741823,null);y.tag=2;xg(g,y)}g.expirationTime=1073741823;break a}h=void 0;g=b;var A=e.pingCache;
null===A?(A=e.pingCache=new Wi,h=new Set,A.set(k,h)):(h=A.get(k),void 0===h&&(h=new Set,A.set(k,h)));if(!h.has(g)){h.add(g);var q=Oj.bind(null,e,k,g);k.then(q,q)}p.effectTag|=4096;p.expirationTime=b;break a}p=p.return}while(null!==p);h=Error((Ia(g.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+Ja(g))}S!==jj&&(S=ij);h=Ai(h,g);p=f;do{switch(p.tag){case 3:k=
h;p.effectTag|=4096;p.expirationTime=b;var B=Xi(p,k,b);yg(p,B);break a;case 1:k=h;var w=p.type,ub=p.stateNode;if(0===(p.effectTag&64)&&("function"===typeof w.getDerivedStateFromError||null!==ub&&"function"===typeof ub.componentDidCatch&&(null===aj||!aj.has(ub)))){p.effectTag|=4096;p.expirationTime=b;var vb=$i(p,k,b);yg(p,vb);break a}}p=p.return}while(null!==p)}X=Pj(X)}catch(Xc){b=Xc;continue}break}while(1)}function Fj(){var a=cj.current;cj.current=sh;return null===a?sh:a}
function Ag(a,b){a<lj&&2<a&&(lj=a);null!==b&&a<mj&&2<a&&(mj=a,nj=b)}function Bg(a){a>wi&&(wi=a)}function Kj(){for(;null!==X;)X=Qj(X)}function Gj(){for(;null!==X&&!Uf();)X=Qj(X)}function Qj(a){var b=Rj(a.alternate,a,U);a.memoizedProps=a.pendingProps;null===b&&(b=Pj(a));dj.current=null;return b}
function Pj(a){X=a;do{var b=X.alternate;a=X.return;if(0===(X.effectTag&2048)){b=si(b,X,U);if(1===U||1!==X.childExpirationTime){for(var c=0,d=X.child;null!==d;){var e=d.expirationTime,f=d.childExpirationTime;e>c&&(c=e);f>c&&(c=f);d=d.sibling}X.childExpirationTime=c}if(null!==b)return b;null!==a&&0===(a.effectTag&2048)&&(null===a.firstEffect&&(a.firstEffect=X.firstEffect),null!==X.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=X.firstEffect),a.lastEffect=X.lastEffect),1<X.effectTag&&(null!==
a.lastEffect?a.lastEffect.nextEffect=X:a.firstEffect=X,a.lastEffect=X))}else{b=zi(X);if(null!==b)return b.effectTag&=2047,b;null!==a&&(a.firstEffect=a.lastEffect=null,a.effectTag|=2048)}b=X.sibling;if(null!==b)return b;X=a}while(null!==X);S===ti&&(S=jj);return null}function Ij(a){var b=a.expirationTime;a=a.childExpirationTime;return b>a?b:a}function Jj(a){var b=ag();cg(99,Sj.bind(null,a,b));return null}
function Sj(a,b){do Dj();while(null!==rj);if((W&(fj|gj))!==V)throw Error(u(327));var c=a.finishedWork,d=a.finishedExpirationTime;if(null===c)return null;a.finishedWork=null;a.finishedExpirationTime=0;if(c===a.current)throw Error(u(177));a.callbackNode=null;a.callbackExpirationTime=0;a.callbackPriority=90;a.nextKnownPendingLevel=0;var e=Ij(c);a.firstPendingTime=e;d<=a.lastSuspendedTime?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:d<=a.firstSuspendedTime&&(a.firstSuspendedTime=
d-1);d<=a.lastPingedTime&&(a.lastPingedTime=0);d<=a.lastExpiredTime&&(a.lastExpiredTime=0);a===T&&(X=T=null,U=0);1<c.effectTag?null!==c.lastEffect?(c.lastEffect.nextEffect=c,e=c.firstEffect):e=c:e=c.firstEffect;if(null!==e){var f=W;W|=gj;dj.current=null;Dd=fd;var g=xd();if(yd(g)){if("selectionStart"in g)var h={start:g.selectionStart,end:g.selectionEnd};else a:{h=(h=g.ownerDocument)&&h.defaultView||window;var k=h.getSelection&&h.getSelection();if(k&&0!==k.rangeCount){h=k.anchorNode;var l=k.anchorOffset,
m=k.focusNode;k=k.focusOffset;try{h.nodeType,m.nodeType}catch(wb){h=null;break a}var p=0,x=-1,z=-1,ca=0,D=0,t=g,y=null;b:for(;;){for(var A;;){t!==h||0!==l&&3!==t.nodeType||(x=p+l);t!==m||0!==k&&3!==t.nodeType||(z=p+k);3===t.nodeType&&(p+=t.nodeValue.length);if(null===(A=t.firstChild))break;y=t;t=A}for(;;){if(t===g)break b;y===h&&++ca===l&&(x=p);y===m&&++D===k&&(z=p);if(null!==(A=t.nextSibling))break;t=y;y=t.parentNode}t=A}h=-1===x||-1===z?null:{start:x,end:z}}else h=null}h=h||{start:0,end:0}}else h=
null;Ed={activeElementDetached:null,focusedElem:g,selectionRange:h};fd=!1;Y=e;do try{Tj()}catch(wb){if(null===Y)throw Error(u(330));Ei(Y,wb);Y=Y.nextEffect}while(null!==Y);Y=e;do try{for(g=a,h=b;null!==Y;){var q=Y.effectTag;q&16&&Rb(Y.stateNode,"");if(q&128){var B=Y.alternate;if(null!==B){var w=B.ref;null!==w&&("function"===typeof w?w(null):w.current=null)}}switch(q&1038){case 2:Pi(Y);Y.effectTag&=-3;break;case 6:Pi(Y);Y.effectTag&=-3;Si(Y.alternate,Y);break;case 1024:Y.effectTag&=-1025;break;case 1028:Y.effectTag&=
-1025;Si(Y.alternate,Y);break;case 4:Si(Y.alternate,Y);break;case 8:l=Y,Mi(g,l,h),Ni(l)}Y=Y.nextEffect}}catch(wb){if(null===Y)throw Error(u(330));Ei(Y,wb);Y=Y.nextEffect}while(null!==Y);w=Ed;B=xd();q=w.focusedElem;h=w.selectionRange;if(B!==q&&q&&q.ownerDocument&&wd(q.ownerDocument.documentElement,q)){null!==h&&yd(q)&&(B=h.start,w=h.end,void 0===w&&(w=B),"selectionStart"in q?(q.selectionStart=B,q.selectionEnd=Math.min(w,q.value.length)):(w=(B=q.ownerDocument||document)&&B.defaultView||window,w.getSelection&&
(w=w.getSelection(),l=q.textContent.length,g=Math.min(h.start,l),h=void 0===h.end?g:Math.min(h.end,l),!w.extend&&g>h&&(l=h,h=g,g=l),l=vd(q,g),m=vd(q,h),l&&m&&(1!==w.rangeCount||w.anchorNode!==l.node||w.anchorOffset!==l.offset||w.focusNode!==m.node||w.focusOffset!==m.offset)&&(B=B.createRange(),B.setStart(l.node,l.offset),w.removeAllRanges(),g>h?(w.addRange(B),w.extend(m.node,m.offset)):(B.setEnd(m.node,m.offset),w.addRange(B))))));B=[];for(w=q;w=w.parentNode;)1===w.nodeType&&B.push({element:w,left:w.scrollLeft,
top:w.scrollTop});"function"===typeof q.focus&&q.focus();for(q=0;q<B.length;q++)w=B[q],w.element.scrollLeft=w.left,w.element.scrollTop=w.top}fd=!!Dd;Ed=Dd=null;a.current=c;Y=e;do try{for(q=a;null!==Y;){var ub=Y.effectTag;ub&36&&Ji(q,Y.alternate,Y);if(ub&128){B=void 0;var vb=Y.ref;if(null!==vb){var Xc=Y.stateNode;switch(Y.tag){case 5:B=Xc;break;default:B=Xc}"function"===typeof vb?vb(B):vb.current=B}}Y=Y.nextEffect}}catch(wb){if(null===Y)throw Error(u(330));Ei(Y,wb);Y=Y.nextEffect}while(null!==Y);Y=
null;Vf();W=f}else a.current=c;if(qj)qj=!1,rj=a,sj=b;else for(Y=e;null!==Y;)b=Y.nextEffect,Y.nextEffect=null,Y=b;b=a.firstPendingTime;0===b&&(aj=null);1073741823===b?a===vj?uj++:(uj=0,vj=a):uj=0;"function"===typeof Uj&&Uj(c.stateNode,d);Z(a);if(Yi)throw Yi=!1,a=Zi,Zi=null,a;if((W&ej)!==V)return null;gg();return null}function Tj(){for(;null!==Y;){var a=Y.effectTag;0!==(a&256)&&Gi(Y.alternate,Y);0===(a&512)||qj||(qj=!0,dg(97,function(){Dj();return null}));Y=Y.nextEffect}}
function Dj(){if(90!==sj){var a=97<sj?97:sj;sj=90;return cg(a,Vj)}}function Vj(){if(null===rj)return!1;var a=rj;rj=null;if((W&(fj|gj))!==V)throw Error(u(331));var b=W;W|=gj;for(a=a.current.firstEffect;null!==a;){try{var c=a;if(0!==(c.effectTag&512))switch(c.tag){case 0:case 11:case 15:case 22:Hi(5,c),Ii(5,c)}}catch(d){if(null===a)throw Error(u(330));Ei(a,d)}c=a.nextEffect;a.nextEffect=null;a=c}W=b;gg();return!0}
function Wj(a,b,c){b=Ai(c,b);b=Xi(a,b,1073741823);xg(a,b);a=xj(a,1073741823);null!==a&&Z(a)}function Ei(a,b){if(3===a.tag)Wj(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){Wj(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===aj||!aj.has(d))){a=Ai(b,a);a=$i(c,a,1073741823);xg(c,a);c=xj(c,1073741823);null!==c&&Z(c);break}}c=c.return}}
function Oj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);T===a&&U===c?S===vi||S===ui&&1073741823===lj&&$f()-Ti<pj?Ej(a,U):oj=!0:Aj(a,c)&&(b=a.lastPingedTime,0!==b&&b<c||(a.lastPingedTime=c,Z(a)))}function Vi(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=Gg(),b=Hg(b,a,null));a=xj(a,b);null!==a&&Z(a)}var Rj;
Rj=function(a,b,c){var d=b.expirationTime;if(null!==a){var e=b.pendingProps;if(a.memoizedProps!==e||K.current)rg=!0;else{if(d<c){rg=!1;switch(b.tag){case 3:hi(b);Xh();break;case 5:fh(b);if(b.mode&4&&1!==c&&e.hidden)return b.expirationTime=b.childExpirationTime=1,null;break;case 1:L(b.type)&&Gf(b);break;case 4:dh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;e=b.type._context;I(jg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;
if(0!==d&&d>=c)return ji(a,b,c);I(M,M.current&1);b=$h(a,b,c);return null!==b?b.sibling:null}I(M,M.current&1);break;case 19:d=b.childExpirationTime>=c;if(0!==(a.effectTag&64)){if(d)return mi(a,b,c);b.effectTag|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null);I(M,M.current);if(!d)return null}return $h(a,b,c)}rg=!1}}else rg=!1;b.expirationTime=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;e=Cf(b,J.current);qg(b,c);e=oh(null,
b,d,a,e,c);b.effectTag|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(L(d)){var f=!0;Gf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;ug(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Fg(b,d,g,a);e.updater=Jg;b.stateNode=e;e._reactInternalFiber=b;Ng(b,d,a,c);b=gi(null,b,d,!0,f,c)}else b.tag=0,R(null,b,e,c),b=b.child;return b;case 16:a:{e=b.elementType;null!==a&&(a.alternate=
null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;Ha(e);if(1!==e._status)throw e._result;e=e._result;b.type=e;f=b.tag=Xj(e);a=ig(e,a);switch(f){case 0:b=di(null,b,e,a,c);break a;case 1:b=fi(null,b,e,a,c);break a;case 11:b=Zh(null,b,e,a,c);break a;case 14:b=ai(null,b,e,ig(e.type,a),d,c);break a}throw Error(u(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),di(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),fi(a,b,d,e,c);
case 3:hi(b);d=b.updateQueue;if(null===a||null===d)throw Error(u(282));d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;vg(a,b);zg(b,d,null,c);d=b.memoizedState.element;if(d===e)Xh(),b=$h(a,b,c);else{if(e=b.stateNode.hydrate)Ph=Jd(b.stateNode.containerInfo.firstChild),Oh=b,e=Qh=!0;if(e)for(c=Yg(b,null,d,c),b.child=c;c;)c.effectTag=c.effectTag&-3|1024,c=c.sibling;else R(a,b,d,c),Xh();b=b.child}return b;case 5:return fh(b),null===a&&Uh(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:
null,g=e.children,Gd(d,e)?g=null:null!==f&&Gd(d,f)&&(b.effectTag|=16),ei(a,b),b.mode&4&&1!==c&&e.hidden?(b.expirationTime=b.childExpirationTime=1,b=null):(R(a,b,g,c),b=b.child),b;case 6:return null===a&&Uh(b),null;case 13:return ji(a,b,c);case 4:return dh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Xg(b,null,d,c):R(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),Zh(a,b,d,e,c);case 7:return R(a,b,b.pendingProps,c),b.child;case 8:return R(a,
b,b.pendingProps.children,c),b.child;case 12:return R(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(jg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=$e(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!K.current){b=$h(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==
k){g=h.child;for(var l=k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=wg(c,null),l.tag=2,xg(h,l));h.expirationTime<c&&(h.expirationTime=c);l=h.alternate;null!==l&&l.expirationTime<c&&(l.expirationTime=c);pg(h.return,c);k.expirationTime<c&&(k.expirationTime=c);break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=
g}R(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,qg(b,c),e=sg(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,R(a,b,d,c),b.child;case 14:return e=b.type,f=ig(e,b.pendingProps),f=ig(e.type,f),ai(a,b,e,f,d,c);case 15:return ci(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,L(d)?(a=!0,Gf(b)):a=!1,qg(b,c),Lg(b,d,e),Ng(b,d,e,c),gi(null,
b,d,!0,a,c);case 19:return mi(a,b,c)}throw Error(u(156,b.tag));};var Uj=null,Li=null;function Yj(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Uj=function(a){try{b.onCommitFiberRoot(c,a,void 0,64===(a.current.effectTag&64))}catch(e){}};Li=function(a){try{b.onCommitFiberUnmount(c,a)}catch(e){}}}catch(d){}return!0}
function Zj(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null}function Sh(a,b,c,d){return new Zj(a,b,c,d)}
function bi(a){a=a.prototype;return!(!a||!a.isReactComponent)}function Xj(a){if("function"===typeof a)return bi(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===za)return 11;if(a===Ca)return 14}return 2}
function Sg(a,b){var c=a.alternate;null===c?(c=Sh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{expirationTime:b.expirationTime,
firstContext:b.firstContext,responders:b.responders};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Ug(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)bi(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ta:return Wg(c.children,e,f,b);case ya:g=8;e|=7;break;case ua:g=8;e|=1;break;case va:return a=Sh(12,c,b,e|8),a.elementType=va,a.type=va,a.expirationTime=f,a;case Aa:return a=Sh(13,c,b,e),a.type=Aa,a.elementType=Aa,a.expirationTime=f,a;case Ba:return a=Sh(19,c,b,e),a.elementType=Ba,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case wa:g=
10;break a;case xa:g=9;break a;case za:g=11;break a;case Ca:g=14;break a;case Da:g=16;d=null;break a;case Ea:g=22;break a}throw Error(u(130,null==a?a:typeof a,""));}b=Sh(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function Wg(a,b,c,d){a=Sh(7,a,d,b);a.expirationTime=c;return a}function Tg(a,b,c){a=Sh(6,a,null,b);a.expirationTime=c;return a}
function Vg(a,b,c){b=Sh(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function ak(a,b,c){this.tag=b;this.current=null;this.containerInfo=a;this.pingCache=this.pendingChildren=null;this.finishedExpirationTime=0;this.finishedWork=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=90;this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}
function Aj(a,b){var c=a.firstSuspendedTime;a=a.lastSuspendedTime;return 0!==c&&c>=b&&a<=b}function xi(a,b){var c=a.firstSuspendedTime,d=a.lastSuspendedTime;c<b&&(a.firstSuspendedTime=b);if(d>b||0===c)a.lastSuspendedTime=b;b<=a.lastPingedTime&&(a.lastPingedTime=0);b<=a.lastExpiredTime&&(a.lastExpiredTime=0)}
function yi(a,b){b>a.firstPendingTime&&(a.firstPendingTime=b);var c=a.firstSuspendedTime;0!==c&&(b>=c?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:b>=a.lastSuspendedTime&&(a.lastSuspendedTime=b+1),b>a.nextKnownPendingLevel&&(a.nextKnownPendingLevel=b))}function Cj(a,b){var c=a.lastExpiredTime;if(0===c||c>b)a.lastExpiredTime=b}
function bk(a,b,c,d){var e=b.current,f=Gg(),g=Dg.suspense;f=Hg(f,e,g);a:if(c){c=c._reactInternalFiber;b:{if(dc(c)!==c||1!==c.tag)throw Error(u(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(L(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(u(171));}if(1===c.tag){var k=c.type;if(L(k)){c=Ff(c,k,h);break a}}c=h}else c=Af;null===b.context?b.context=c:b.pendingContext=c;b=wg(f,g);b.payload={element:a};d=void 0===
d?null:d;null!==d&&(b.callback=d);xg(e,b);Ig(e,f);return f}function ck(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function dk(a,b){a=a.memoizedState;null!==a&&null!==a.dehydrated&&a.retryTime<b&&(a.retryTime=b)}function ek(a,b){dk(a,b);(a=a.alternate)&&dk(a,b)}
function fk(a,b,c){c=null!=c&&!0===c.hydrate;var d=new ak(a,b,c),e=Sh(3,null,null,2===b?7:1===b?3:0);d.current=e;e.stateNode=d;ug(e);a[Od]=d.current;c&&0!==b&&Jc(a,9===a.nodeType?a:a.ownerDocument);this._internalRoot=d}fk.prototype.render=function(a){bk(a,this._internalRoot,null,null)};fk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;bk(null,a,null,function(){b[Od]=null})};
function gk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function hk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new fk(a,0,b?{hydrate:!0}:void 0)}
function ik(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=ck(g);h.call(a)}}bk(b,g,a,e)}else{f=c._reactRootContainer=hk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=ck(g);k.call(a)}}Nj(function(){bk(b,g,a,e)})}return ck(g)}function jk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:sa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
wc=function(a){if(13===a.tag){var b=hg(Gg(),150,100);Ig(a,b);ek(a,b)}};xc=function(a){13===a.tag&&(Ig(a,3),ek(a,3))};yc=function(a){if(13===a.tag){var b=Gg();b=Hg(b,a,null);Ig(a,b);ek(a,b)}};
Ua=function(a,b,c){switch(b){case "input":Cb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Qd(d);if(!e)throw Error(u(90));yb(d);Cb(d,e)}}}break;case "textarea":Kb(a,c);break;case "select":b=c.value,null!=b&&Hb(a,!!c.multiple,b,!1)}};$a=Mj;
ab=function(a,b,c,d,e){var f=W;W|=4;try{return cg(98,a.bind(null,b,c,d,e))}finally{W=f,W===V&&gg()}};bb=function(){(W&(1|fj|gj))===V&&(Lj(),Dj())};cb=function(a,b){var c=W;W|=2;try{return a(b)}finally{W=c,W===V&&gg()}};function kk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!gk(b))throw Error(u(200));return jk(a,b,null,c)}var lk={Events:[Nc,Pd,Qd,Sa,Oa,Xd,function(a){jc(a,Wd)},Ya,Za,id,mc,Dj,{current:!1}]};
(function(a){var b=a.findFiberByHostInstance;return Yj(n({},a,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:pa.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=hc(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))})({findFiberByHostInstance:tc,bundleType:0,version:"16.13.0",
rendererPackageName:"react-dom"});exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lk;exports.createPortal=kk;exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;if(void 0===b){if("function"===typeof a.render)throw Error(u(188));throw Error(u(268,Object.keys(a)));}a=hc(b);a=null===a?null:a.stateNode;return a};
exports.flushSync=function(a,b){if((W&(fj|gj))!==V)throw Error(u(187));var c=W;W|=1;try{return cg(99,a.bind(null,b))}finally{W=c,gg()}};exports.hydrate=function(a,b,c){if(!gk(b))throw Error(u(200));return ik(null,a,b,!0,c)};exports.render=function(a,b,c){if(!gk(b))throw Error(u(200));return ik(null,a,b,!1,c)};
exports.unmountComponentAtNode=function(a){if(!gk(a))throw Error(u(40));return a._reactRootContainer?(Nj(function(){ik(null,null,a,!1,function(){a._reactRootContainer=null;a[Od]=null})}),!0):!1};exports.unstable_batchedUpdates=Mj;exports.unstable_createPortal=function(a,b){return kk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!gk(c))throw Error(u(200));if(null==a||void 0===a._reactInternalFiber)throw Error(u(38));return ik(a,b,c,!1,d)};exports.version="16.13.0";


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var l=__webpack_require__(10),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,z=n?Symbol.for("react.memo"):60115,A=n?Symbol.for("react.lazy"):
60116,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function F(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C(85));this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function G(){}G.prototype=F.prototype;function H(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}var I=H.prototype=new G;I.constructor=H;l(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return{$$typeof:p,type:a,key:g,ref:k,props:d,_owner:J.current}}
function N(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,c,e){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return{result:a,keyPrefix:b,func:c,context:e,count:0}}
function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
function T(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T(d,f,c,e)}else if(null===a||"object"!==typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T(d,f,c,e);else if("object"===d)throw c=""+a,Error(C(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T(a,"",b,c)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++)}
function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O(a)&&(a=N(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+c)),e.push(a))}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P,"$&/")+"/");b=R(b,g,e,d);V(a,aa,b);S(b)}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C(321));return a}
var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:l};exports.Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R(null,null,b,c);V(a,W,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O(a))throw Error(C(143));return a}};
exports.Component=F;exports.Fragment=r;exports.Profiler=u;exports.PureComponent=H;exports.StrictMode=t;exports.Suspense=y;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C(267,a));var e=l({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K.call(b,h)&&!L.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f}return{$$typeof:p,type:a.type,
key:d,ref:g,props:e,_owner:k}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:x,render:a}};exports.isValidElement=O;
exports.lazy=function(a){return{$$typeof:A,_ctor:a,_status:-1,_result:null}};exports.memo=function(a,b){return{$$typeof:z,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return Z().useCallback(a,b)};exports.useContext=function(a,b){return Z().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return Z().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return Z().useMemo(a,b)};exports.useReducer=function(a,b,c){return Z().useReducer(a,b,c)};exports.useRef=function(a){return Z().useRef(a)};exports.useState=function(a){return Z().useState(a)};exports.version="16.13.0";


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(30);
} else {}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.19.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var f,g,h,k,l;
if("undefined"===typeof window||"function"!==typeof MessageChannel){var p=null,q=null,t=function(){if(null!==p)try{var a=exports.unstable_now();p(!0,a);p=null}catch(b){throw setTimeout(t,0),b;}},u=Date.now();exports.unstable_now=function(){return Date.now()-u};f=function(a){null!==p?setTimeout(f,0,a):(p=a,setTimeout(t,0))};g=function(a,b){q=setTimeout(a,b)};h=function(){clearTimeout(q)};k=function(){return!1};l=exports.unstable_forceFrameRate=function(){}}else{var w=window.performance,x=window.Date,
y=window.setTimeout,z=window.clearTimeout;if("undefined"!==typeof console){var A=window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");"function"!==typeof A&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if("object"===
typeof w&&"function"===typeof w.now)exports.unstable_now=function(){return w.now()};else{var B=x.now();exports.unstable_now=function(){return x.now()-B}}var C=!1,D=null,E=-1,F=5,G=0;k=function(){return exports.unstable_now()>=G};l=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):F=0<a?Math.floor(1E3/a):5};var H=new MessageChannel,I=H.port2;H.port1.onmessage=
function(){if(null!==D){var a=exports.unstable_now();G=a+F;try{D(!0,a)?I.postMessage(null):(C=!1,D=null)}catch(b){throw I.postMessage(null),b;}}else C=!1};f=function(a){D=a;C||(C=!0,I.postMessage(null))};g=function(a,b){E=y(function(){a(exports.unstable_now())},b)};h=function(){z(E);E=-1}}function J(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<K(e,b))a[d]=b,a[c]=e,c=d;else break a}}function L(a){a=a[0];return void 0===a?null:a}
function M(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>K(n,c))void 0!==r&&0>K(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>K(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function K(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var N=[],O=[],P=1,Q=null,R=3,S=!1,T=!1,U=!1;
function V(a){for(var b=L(O);null!==b;){if(null===b.callback)M(O);else if(b.startTime<=a)M(O),b.sortIndex=b.expirationTime,J(N,b);else break;b=L(O)}}function W(a){U=!1;V(a);if(!T)if(null!==L(N))T=!0,f(X);else{var b=L(O);null!==b&&g(W,b.startTime-a)}}
function X(a,b){T=!1;U&&(U=!1,h());S=!0;var c=R;try{V(b);for(Q=L(N);null!==Q&&(!(Q.expirationTime>b)||a&&!k());){var d=Q.callback;if(null!==d){Q.callback=null;R=Q.priorityLevel;var e=d(Q.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?Q.callback=e:Q===L(N)&&M(N);V(b)}else M(N);Q=L(N)}if(null!==Q)var m=!0;else{var n=L(O);null!==n&&g(W,n.startTime-b);m=!1}return m}finally{Q=null,R=c,S=!1}}
function Y(a){switch(a){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1E4;default:return 5E3}}var Z=l;exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){T||S||(T=!0,f(X))};
exports.unstable_getCurrentPriorityLevel=function(){return R};exports.unstable_getFirstCallbackNode=function(){return L(N)};exports.unstable_next=function(a){switch(R){case 1:case 2:case 3:var b=3;break;default:b=R}var c=R;R=b;try{return a()}finally{R=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=Z;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=R;R=a;try{return b()}finally{R=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();if("object"===typeof c&&null!==c){var e=c.delay;e="number"===typeof e&&0<e?d+e:d;c="number"===typeof c.timeout?c.timeout:Y(a)}else c=Y(a),e=d;c=e+c;a={id:P++,callback:b,priorityLevel:a,startTime:e,expirationTime:c,sortIndex:-1};e>d?(a.sortIndex=e,J(O,a),null===L(N)&&a===L(O)&&(U?h():U=!0,g(W,e-d))):(a.sortIndex=c,J(N,a),T||S||(T=!0,f(X)));return a};
exports.unstable_shouldYield=function(){var a=exports.unstable_now();V(a);var b=L(N);return b!==Q&&null!==Q&&null!==b&&null!==b.callback&&b.startTime<=a&&b.expirationTime<Q.expirationTime||k()};exports.unstable_wrapCallback=function(a){var b=R;return function(){var c=R;R=b;try{return a.apply(this,arguments)}finally{R=c}}};


/***/ }),
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var Component, E, EntitiesBar, EntityPreview, distance, entity_classes,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Component} = __webpack_require__(1));

E = __webpack_require__(2);

({entity_classes, distance} = __webpack_require__(0));

EntityPreview = __webpack_require__(11);

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
      preview_entity = new EntityClass();
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
                    entity = new cell.EntityClass();
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
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var AnimBar, AnimGroup, Component, E, entity_classes,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Component} = __webpack_require__(1));

E = __webpack_require__(2);

({entity_classes} = __webpack_require__(0));

AnimGroup = __webpack_require__(35);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Anim, AnimGroup, Component, E, Entity, Pose, ReactDOM,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Component} = __webpack_require__(1));

ReactDOM = __webpack_require__(6);

E = __webpack_require__(2);

Anim = __webpack_require__(36);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// awkward component Anim represents a pose OR an animation OR an animation frame (which is an unnamed pose)
var Anim, Component, E, Entity, EntityPreview, ReactDOM, rename_object_key;

({Component} = __webpack_require__(1));

ReactDOM = __webpack_require__(6);

E = __webpack_require__(2);

EntityPreview = __webpack_require__(11);

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
/* 37 */
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
      style: {
        minWidth: 200
      },
      ref: (brush_size_slider) => {
        this.brush_size_slider = brush_size_slider;
      },
      onChange: (e) => {
        editor.brush_size = e.target.value;
        return editor.renderDOM();
      }
    }))));
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var PolygonStructure, Structure;

Structure = __webpack_require__(15);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(16);
            var content = __webpack_require__(40);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(17);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".editor {\r\n\t-webkit-touch-callout: none;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\tuser-select: none;\r\n}\r\n.grabbable {\r\n\tcursor: move; /* fallback if grab cursor is unsupported */\r\n\tcursor: grab;\r\n\tcursor: -moz-grab;\r\n\tcursor: -webkit-grab;\r\n}\r\n/* Apply a \"closed-hand\" cursor during drag operation. */\r\n.grabbable:active { \r\n\tcursor: grabbing;\r\n\tcursor: -moz-grabbing;\r\n\tcursor: -webkit-grabbing;\r\n}\r\n/* Sidebars */\r\n.bar {\r\n\tbackground: white;\r\n\ttransition: opacity 0.2s ease;\r\n\tdisplay: flex;\r\n\talign-items: stretch;\r\n\talign-content: flex-start;\r\n}\r\n.bar:not(.visible) {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n}\r\n.sidebar {\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\theight: 100%;\r\n\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\r\n\tflex-direction: column;\r\n}\r\n.bar article,\r\n.terrain-tools {\r\n\tpadding: 1rem;\r\n\tpadding-top: 0.5rem;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n.terrain-tools label {\r\n\tmargin-bottom: 1em;\r\n}\r\n.bar article:hover {\r\n\tbackground: rgba(0, 0, 0, 0.08);\r\n}\r\n.bar article:active,\r\n.bar article.selected {\r\n\tbackground: rgba(0, 0, 0, 0.12);\r\n}\r\n.bar article canvas {\r\n\tbackground: rgba(50, 200, 255, 0.7);\r\n}\r\n.bar article:hover canvas,\r\n.bar article:active canvas,\r\n.bar article.selected canvas {\r\n\tbackground: rgba(50, 200, 255, 1);\r\n}\r\n.bar h1 {\r\n\ttext-align: center;\r\n\tfont-size: 2em;\r\n\tfont-weight: normal;\r\n\tmargin: 0.1em 0;\r\n}\r\n.bar article > h1 {\r\n\tpointer-events: none;\r\n}\r\n.bar article .title-bar {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n}\r\n.bar .name {\r\n\tfont-size: 1.2em;\r\n\tfont-weight: normal;\r\n\tfont-family: sans-serif;\r\n\tmargin: 0;\r\n\tmargin-bottom: 0.1em;\r\n}\r\n.entities-bar .name {\r\n\ttext-align: center;\r\n}\r\n.bar article .mdl-textfield {\r\n\twidth: auto;\r\n\tpadding: 0;\r\n\tpadding-bottom: 0.3rem;\r\n}\r\nbutton,\r\ncanvas,\r\nimg,\r\narticle, /* representing entities, poses, animations, animation frames - things with EntityPreviews in them */\r\n.anims > * { /* includes headings and .anim-groups */\r\n\tflex: 0 0 auto;\r\n}\r\n.anim-bar {\r\n\tflex-direction: row;\r\n\talign-items: flex-start;\r\n}\r\n.anim-bar > * {\r\n\theight: 100%;\r\n}\r\n/* TODO: refactor bars and subbars */\r\n.anim-bar > *:not(:first-child) {\r\n\tborder-left: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n.anims,\r\n.anim-group {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: stretch;\r\n}\r\n.anims,\r\n.animation-frames,\r\n.entities-bar {\r\n\toverflow-y: auto;\r\n\toverflow-x: hidden;\r\n}\r\n/* TODO: refactor bars and subbars */\r\n.animation-frames {\r\n\t/*transition: 0.1s ease;*/\r\n}\r\n.animation-frames:not(.visible) {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n\twidth: 0;\r\n\t/*transform: translate(-100%, 0);*/\r\n}\r\n.add-anim-fab {\r\n\tmargin: 0.5rem 0 !important;\r\n\talign-self: center;\r\n}\r\n.poses,\r\n.animations {\r\n\twidth: 100%;\r\n}\r\narticle.placeholder {\r\n\tpadding: 2rem;\r\n\ttext-align: center;\r\n\tbackground: rgba(128, 59, 110, 0.16);\r\n\tcolor: rgba(0, 0, 0, 0.5);\r\n\tfont-size: 1.4em;\r\n\tpointer-events: none;\r\n}\r\n\r\n.warning {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tz-index: 50;\r\n\tmargin: 15px;\r\n\tpadding: 15px;\r\n\tbackground: #FFF9C4;\r\n\tcolor: #BF360C;\r\n\tborder-radius: 2px;\r\n\ttransition: opacity 0.2s ease;\r\n}\r\n.warning:not(.show) {\r\n\tpointer-events: none;\r\n\topacity: 0;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

class Menu {
	constructor(settings = {}) {
		const typeEnum = ['contextmenu', 'menubar'];
		let items = [];
		let type = isValidType(settings.type) ? settings.type : 'contextmenu';
		let beforeShow = settings.beforeShow;
		Object.defineProperty(this, 'items', {
			get: () => {
				return items;
			}
		});

		Object.defineProperty(this, 'beforeShow', {
			get: () => {
				return beforeShow;
			}
		});

	 	Object.defineProperty(this, 'type', {
			get: () => {
				return type;
			},
			set: (typeIn) => {
				type = isValidType(typeIn) ? typeIn : type;
			}
		});

		this.append = item => {
			if(!(item instanceof MenuItem)) {
				console.error('appended item must be an instance of MenuItem');
				return false;
			}
			let index = items.push(item);
			return index;
		};

		this.insert = (item, index) => {
			if(!(item instanceof MenuItem)) {
				console.error('inserted item must be an instance of MenuItem');
				return false;
			}

			items.splice(index, 0, item);
			return true;
		};

		this.remove = item => {
			if(!(item instanceof MenuItem)) {
				console.error('item to be removed is not an instance of MenuItem');
				return false;
			}

			let index = items.indexOf(item);
			if(index < 0) {
				console.error('item to be removed was not found in this.items');
				return false;
			} else {
				items.splice(index, 0);
				return true;
			}
		};

		this.removeAt = index => {
			items.splice(index, 0);
			return true;
		};

		this.node = null;

		function isValidType(typeIn = '', debug = false) {
			if(typeEnum.indexOf(typeIn) < 0) {
				if(debug) console.error(`${typeIn} is not a valid type`);
				return false;
			}
			return true;
		}

	}

	createMacBuiltin() {
		console.error('This method is not available in browser :(');
		return false;
	}

	popup(x, y, itemNode = null, menubarSubmenu = false) {
		let setRight = false;

		let submenu = itemNode != null || this.submenu;
		this.submenu = menubarSubmenu;

		menubarSubmenu = menubarSubmenu || this.menubarSubmenu;
		this.menubarSubmenu = menubarSubmenu;
		if (! Menu._topmostMenu) {
			Menu._topmostMenu = this;
			let el = Menu.contextMenuParent || document.body;
			Menu._listenerElement = el;
			el.addEventListener('mouseup', Menu._mouseHandler, false);
			el.addEventListener('mousedown', Menu._mouseHandler, false);
		}

		let menuNode = this.buildMenu(submenu, menubarSubmenu);
		menuNode.jsMenu = this;
		this.node = menuNode;
		Menu._currentMenuNode = menuNode;

		if(this.node.parentNode) {
			if(menuNode === this.node) return;
			this.node.parentNode.replaceChild(menuNode, this.node);
		} else {
			let el = Menu.contextMenuParent || document.body;
			el.appendChild(this.node);
		}

		let width = menuNode.clientWidth;
		let height = menuNode.clientHeight;

		if((x + width) > window.innerWidth) {
			setRight = true;
			if(submenu) {
				x = window.innerWidth - itemNode.parentNode.offsetLeft + 2;
			} else {
				x = 0;
			}
		}

		if((y + height) > window.innerHeight) {
			y = window.innerHeight - height;
		}

		if(!setRight) {
			menuNode.style.left = x + 'px';
			menuNode.style.right = 'auto';
		} else {
			menuNode.style.right = x + 'px';
			menuNode.style.left = 'auto';
		}

		menuNode.style.top = y + 'px';
		menuNode.classList.add('show');
	}

	popdown() {
		this.items.forEach(item => {
			if(item.submenu) {
				item.submenu.popdown();
			} else {
				item.node = null;
			}
		});
		if(this.node && this.type !== 'menubar') {
			Menu._currentMenuNode = this.node.parentMenuNode;
			if (this.menubarSubmenu)
				this.node.menuItem.classList.remove('submenu-active');
			this.node.parentNode.removeChild(this.node);
			this.node = null;
		}
		if (this == Menu._topmostMenu) {
			Menu._topmostMenu = null;
			let el = Menu._listenerElement;
			if (el) {
				el.removeEventListener('mouseup', Menu._mouseHandler, false);
				el.removeEventListener('mousedown', Menu._mouseHandler, false);
				Menu._listenerElement = null;
			}
		}

		if(this.type === 'menubar') {
			this.clearActiveSubmenuStyling();
		}
	}

	static popdownAll() {
		Menu._topmostMenu.popdown();
		return;
	}

	buildMenu(submenu = false, menubarSubmenu = false) {
		if (this.beforeShow)
			(this.beforeShow)(this);
		let menuNode = document.createElement('ul');
		menuNode.classList.add('nwjs-menu', this.type);
		if(submenu) menuNode.classList.add('submenu');
		if(menubarSubmenu) menuNode.classList.add('menubar-submenu');

		menuNode.jsMenu = this;
		menuNode.parentMenuNode = Menu._currentMenuNode;
		this.items.forEach(item => {
			if (item.beforeShow)
				(item.beforeShow)(item);
			if (item.visible) {
				item.buildItem(menuNode,
					       this.type === 'menubar');
			}
		});
		return menuNode;
	}

	static isDescendant(parent, child) {
		let node = child.parentNode;
		while(node !== null) {
			if(node === parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	static _mouseHandler(e) {
		let inMenubar = Menu._menubarNode != null
                    && Menu.isDescendant(Menu._menubarNode, e.target);
		let menubarHandler = e.currentTarget == Menu._menubarNode;
		let miNode = e.target;
		while (miNode && ! miNode.jsMenuItem)
			miNode = miNode.parentNode;
		/* mouseenter:
		     if selected sibling: unhighlight (and popdown if submenu)
		     select item and if submenu popup
		   mouseout (or mouseleave):
		     if (! submenu) unhighlight
		   mousedown:
		   if (miNode) select
		   else popdownAll
		*/
		//console.log("HANDLE "+e.type+" inMB:"+inMenubar+" handler-t:"+e.currentTarget+" mbHandler:"+menubarHandler+" miNode:"+miNode);
		if (e.type=="mouseup") {
			/*
			if (miNode != null) {
			if active and not submenu: popdownAll and do click.
			if (active and submenu) as-is.
			if (! active) should not happen
			} else {
			do nothing
			}
			*/
		}
		if (e.type=="mousedown" && !miNode) {
			if (Menu._topmostMenu)
				Menu.popdownAll();
		}
		if ((inMenubar == menubarHandler) && miNode) {
			let item = miNode.jsMenuItem;
			if (e.type=="mousedown") {
				item.node.classList.toggle('submenu-active');
				// FIXME use select method
				if(item.submenu) {
					if(item.node.classList.contains('submenu-active')) {
						miNode.jsMenu.node.activeItemNode = item.node;

						item.popupSubmenu(item.node.offsetLeft, item.node.clientHeight, true);
					} else {
						item.submenu.popdown();
						miNode.jsMenu.node.currentSubmenu = null;
						miNode.jsMenu.node.activeItemNode = null;
					}
				}
			}
			if (e.type=="mouseup") {
				item.doit(miNode);
			}
		}
	}

	static setApplicationMenu(menubar, parent=null) {
		let oldNode = Menu._menubarNode;
		if (oldNode) {
			let parent = oldNode.parentNode;
			if (parent != null)
				parent.removeChild(oldNode);
			oldNode.removeEventListener('mousedown', Menu._mouseHandler, false);
			Menu._menubarNode = null;
		}
		if (menubar != null) {
			if (parent == null)
				parent = Menu._menubarParent || document.body;
			Menu._menubarParent = parent;
			let newNode = menubar.buildMenu();
			newNode.jsMenuItem = null;
			parent.insertBefore(newNode, parent.firstChild);
			newNode.addEventListener('mousedown', Menu._mouseHandler, false);
			Menu._menubarNode = newNode;
			menubar.node = newNode;
		}
		Menu._menubar = menubar;
	}

	clearActiveSubmenuStyling(notThisNode) {
		if (! this.node)
			return;
		let submenuActive = this.node.querySelectorAll('.submenu-active');
		for(let node of submenuActive) {
			if(node === notThisNode) continue;
			node.classList.remove('submenu-active');
		}
	}

	static recursiveNodeFind(menu, node) {
		if(menu.node === node) {
			return true;
		} else if(Menu.isDescendant(menu.node, node)) {
			return true;
		} else if(menu.items.length > 0) {
			for(var i=0; i < menu.items.length; i++) {
				let menuItem = menu.items[i];
				if(!menuItem.node) continue;

				if(menuItem.node === node) {
					return true;
				} else if(Menu.isDescendant(menuItem.node, node)) {
					return true;
				} else {
					if(menuItem.submenu) {
						if(recursiveNodeFind(menuItem.submenu, node)) {
							return true;
						} else {
							continue;
						}
					}
				}
			}
		} else {
			return false;
		}
		return false;
	}

	isNodeInChildMenuTree(node = false) {
		if(!node) return false;
		return recursiveNodeFind(this, node);
	}
}

// Parent node for context menu popup.  If null, document.body is the default.
Menu.contextMenuParent = null;

Menu._currentMenuNode = null;

Menu._keydownListener = function(e) {
	function nextItem(menuNode, curNode, forwards) {
		let nullSeen = false;
		let next = curNode;
		for (;;) {
			next = !next ? null
				: forwards ? next.nextSibling
				: next.previousSibling;
			if (! next) {
				next = forwards ? menuNode.firstChild
					: menuNode.lastChild;
				if (nullSeen || !next)
					return null;
				nullSeen = true;
			}
			if (next instanceof Element
			    && next.classList.contains("menu-item")
			    && next.jsMenuItem.type != 'separator'
			    && ! (next.classList.contains("disabled")))
				return next;
		}
	}
	function nextMenu(menuNode, forwards) {
		let menubarNode = menuNode.menuItem.parentNode;
		let next = nextItem(menubarNode,
				    menubarNode.activeItemNode,
				    forwards);
		if (next)
		    next.jsMenuItem.select(next, true, true, true);
		return next;

	}
	function openSubmenu(active) {
		active.jsMenuItem.selectSubmenu(active);
		menuNode = Menu._currentMenuNode;
		let next = nextItem(menuNode, null, true);
		if (next)
			next.jsMenuItem.select(next, true, false);
	}
	let menuNode = Menu._currentMenuNode
	if (menuNode) {
		let active = menuNode.activeItemNode;
		switch (e.keyCode) {
		case 27: // Escape
		case 37: // Left
			e.preventDefault();
			e.stopPropagation();
			if (e.keyCode == 37
			    && menuNode.jsMenu.menubarSubmenu
			    && nextMenu(menuNode, false))
				return;
			menuNode.jsMenu.popdown();
			break;
		case 13: // Enter
			e.preventDefault();
			e.stopPropagation();
			if (active) {
				if (active.jsMenuItem.submenu)
					openSubmenu(active);
				else
					active.jsMenuItem.doit(active);
			}
			break;
		case 39: // Right
			e.preventDefault();
			e.stopPropagation();
			if (active && active.jsMenuItem.submenu)
				openSubmenu(active);
			else if (Menu._topmostMenu.menubarSubmenu)
				nextMenu(menuNode, true);
			break;
		case 38: // Up
		case 40: // Down
			e.preventDefault();
			e.stopPropagation();
			let next = nextItem(menuNode,
					    menuNode.activeItemNode,
					    e.keyCode == 40);
			if (next)
				next.jsMenuItem.select(next, true, false);
			break;
		}
	}
}
Menu._keydownListening = false;
Menu._keydownListen = function(value) {
    if (value != Menu._keydownListening) {
        if (value)
            document.addEventListener('keydown', Menu._keydownListener, true);
        else
            document.removeEventListener('keydown', Menu._keydownListener, true);
    }
    Menu._keydownListening = value;
}
Menu._keydownListen(true);

class MenuItem {
	constructor(settings = {}) {


		const modifiersEnum = ['cmd', 'command', 'super', 'shift', 'ctrl', 'alt'];
		const typeEnum = ['separator', 'checkbox', 'radio', 'normal'];
		let type = isValidType(settings.type) ? settings.type : 'normal';
		let submenu = settings.submenu || null;
		let click = settings.click || null;
		let modifiers = validModifiers(settings.modifiers) ? settings.modifiers : null;
		let label = settings.label || '';

		let enabled = settings.enabled;
		if(typeof settings.enabled === 'undefined') enabled = true;
		let visible = settings.visible;
		if(typeof settings.visible === 'undefined') visible = true;
		let beforeShow = settings.beforeShow;

		Object.defineProperty(this, 'type', {
			get: () => {
				return type;
			}
		});

		Object.defineProperty(this, 'beforeShow', {
			get: () => {
				return beforeShow;
			}
		});

		Object.defineProperty(this, 'submenu', {
			get: () => {
				return submenu;
			},
			set: (inputMenu) => {
				console.warn('submenu should be set on initialisation, changing this at runtime could be slow on some platforms.');
				if(!(inputMenu instanceof Menu)) {
					console.error('submenu must be an instance of Menu');
					return;
				} else {
					submenu = inputMenu;
				}
			}
		});

		Object.defineProperty(this, 'click', {
			get: () => {
				return click;
			},
			set: (inputCallback) => {
				if(typeof inputCallback !== 'function') {
					console.error('click must be a function');
					return;
				} else {
					click = inputCallback;
				}
			}
		});

		Object.defineProperty(this, 'modifiers', {
			get: () => {
				return modifiers;
			},
			set: (inputModifiers) => {
				modifiers = validModifiers(inputModifiers) ? inputModifiers : modifiers;
			}
		});

		Object.defineProperty(this, 'enabled', {
			get: () => {
				return enabled;
			},
			set: (inputEnabled) => {
				enabled = inputEnabled;
			}
		});

		Object.defineProperty(this, 'visible', {
			get: () => {
				return visible;
			},
			set: (inputVisible) => {
				visible = inputVisible;
			}
		});

		Object.defineProperty(this, 'label', {
			get: () => {
				return label;
			},
			set: (inputLabel) => {
				label = inputLabel;
			}
		});

		this.icon = settings.icon || null;
		this.iconIsTemplate = settings.iconIsTemplate || false;
		this.tooltip = settings.tooltip || '';
		this.checked = settings.checked || false;

		this.key = settings.key || null;
		this.accelerator = settings.accelerator;
		this.node = null;

		if(this.key) {
			this.key = this.key.toUpperCase();
		}
		function validModifiers(modifiersIn = '') {
			let modsArr = modifiersIn.split('+');
			for(let i=0; i < modsArr; i++) {
				let mod = modsArr[i].trim();
				if(modifiersEnum.indexOf(mod) < 0) {
					console.error(`${mod} is not a valid modifier`);
					return false;
				}
			}
			return true;
		}

		function isValidType(typeIn = '', debug = false) {
			if(typeEnum.indexOf(typeIn) < 0) {
				if(debug) console.error(`${typeIn} is not a valid type`);
				return false;
			}
			return true;
		}
	}

	toString() {
		return this.type+"["+this.label+"]";
	}

	_mouseoverHandle_menubarTop() {
		let pmenu = this.node.jsMenuNode;
		if (pmenu.activeItemNode) {
			pmenu.activeItemNode.classList.remove('active');
			pmenu.activeItemNode = null;
		}
		if (pmenu && pmenu.querySelector('.submenu-active')) {
			if(this.node.classList.contains('submenu-active')) return;

			this.node.classList.add('submenu-active');
			this.select(this.node, true, true, true);
		}
	}

	doit(node) {
		if (! this.submenu) {
			Menu.popdownAll();
			if(this.type === 'checkbox')
				this.checked = !this.checked;
			else if (this.type === 'radio') {
				this.checked = true;
				for (let dir = 0; dir <= 1; dir++) {
					for (let n = node; ; ) {
						n = dir ? n.nextSibling
							: n.previousSibling;
						if (! (n instanceof Element
						       && n.classList.contains("radio")))
							break;
						n.jsMenuItem.checked = false;
					}
				}
			}
			if(this.click) this.click(this);
		}
	}

	select(node, turnOn, popupSubmenu, menubarSubmenu = false) {
		let pmenu = node.jsMenuNode;
		if (pmenu.activeItemNode) {
			pmenu.activeItemNode.classList.remove('active');
			pmenu.activeItemNode.classList.remove('submenu-active');
			pmenu.activeItemNode = null;
		}
		if(pmenu.currentSubmenu) {
			pmenu.currentSubmenu.popdown();
			pmenu.currentSubmenu = null;
		}
		if(this.submenu && popupSubmenu)
			this.selectSubmenu(node, menubarSubmenu);
		else
			node.classList.add('active');
		this.node.jsMenuNode.activeItemNode = this.node;
	}

	selectSubmenu(node, menubarSubmenu) {
		node.jsMenuNode.currentSubmenu = this.submenu;
		if(this.submenu.node)
			return;

		let parentNode = node.parentNode;
		let x, y;
		if (menubarSubmenu) {
			x = node.offsetLeft;
			y = node.clientHeight;
		} else {
			x = parentNode.offsetWidth + parentNode.offsetLeft - 2;
			y = parentNode.offsetTop + node.offsetTop - 4;
		}
		this.popupSubmenu(x, y, menubarSubmenu);
		node.classList.add('submenu-active');
	}

	buildItem(menuNode, menuBarTopLevel = false) {
		let node = document.createElement('li');
		node.jsMenuNode = menuNode;
		node.jsMenu = menuNode.jsMenu;
		node.jsMenuItem = this;
		node.classList.add('menu-item', this.type);

		menuBarTopLevel = menuBarTopLevel || this.menuBarTopLevel || false;
		this.menuBarTopLevel = menuBarTopLevel;

		if(menuBarTopLevel) {
			node.addEventListener('mouseenter', this._mouseoverHandle_menubarTop.bind(this));
		}

		let iconWrapNode = document.createElement('div');
		iconWrapNode.classList.add('icon-wrap');

		if(this.icon) {
			let iconNode = new Image();
			iconNode.src = this.icon;
			iconNode.classList.add('icon');
			iconWrapNode.appendChild(iconNode);
		}

		let labelNode = document.createElement('div');
		labelNode.classList.add('label');

		let modifierNode = document.createElement('div');
		modifierNode.classList.add('modifiers');

		let checkmarkNode = document.createElement('div');
		checkmarkNode.classList.add('checkmark');

		if(this.checked && !menuBarTopLevel)
			node.classList.add('checked');

		let text = '';

		if(this.submenu && !menuBarTopLevel) {
			text = '▶︎';

			node.addEventListener('mouseleave', (e) => {
				if(node !== e.target) {
					if(!Menu.isDescendant(node, e.target))
						this.submenu.popdown();
				}
			});
		}

		if(this.modifiers && !menuBarTopLevel) {
			if (MenuItem.useModifierSymbols) {
				let mods = this.modifiers.split('+');

				// Looping this way to keep order of symbols - required by macOS
				for(let symbol in MenuItem.modifierSymbols) {
					if(mods.indexOf(symbol) > -1) {
						text += MenuItem.modifierSymbols[symbol];
					}
				}
			} else
				text += this.modifiers + "+";
		}

		if(this.key && !menuBarTopLevel) {
			text += this.key;
		}
		if (this.accelerator && !menuBarTopLevel) {
			let acc = this.accelerator;
                    let mac = false; // FIXME
                    let cmd = mac ? "Cmd" : "Ctrl";
                    acc = acc.replace("CommandOrControl", cmd);
                    acc = acc.replace("Mod+", cmd+"+");
			text += acc;
		}

		if(!this.enabled) {
			node.classList.add('disabled');
		}

		if(!menuBarTopLevel && this.type != 'separator') {
			node.addEventListener('mouseenter', () => {
				this.select(node, true, true);
			});
		}

		if(this.icon) labelNode.appendChild(iconWrapNode);

		let textLabelNode = document.createElement('span');
		textLabelNode.textContent = this.label;
		textLabelNode.classList.add('label-text');

		node.appendChild(checkmarkNode);

		labelNode.appendChild(textLabelNode);
		node.appendChild(labelNode);

		modifierNode.appendChild(document.createTextNode(text));
		node.appendChild(modifierNode);

		node.title = this.tooltip;
		this.node = node;
		menuNode.appendChild(node);
	}

	popupSubmenu(x, y, menubarSubmenu = false) {
		this.submenu.popup(x, y, this.node, menubarSubmenu);
		this.submenu.node.menuItem = this.node;
		this.node.jsMenuNode.currentSubmenu = this.submenu;
	}
}

MenuItem.modifierSymbols = {
	shift: '⇧',
	ctrl: '⌃',
	alt: '⌥',
	cmd: '⌘',
	super: '⌘',
	command: '⌘'
};

MenuItem.keySymbols = {
	up: '↑',
	esc: '⎋',
	tab: '⇥',
	left: '←',
	down: '↓',
	right: '→',
	pageUp: '⇞',
	escape: '⎋',
	pageDown: '⇟',
	backspace: '⌫',
	space: 'Space'
};
MenuItem.useModifierSymbols =
	(typeof navigator != "undefined" ? /Mac/.test(navigator.platform)
         : typeof os != "undefined" ? os.platform() == "darwin" : false);

if ( true && module.exports) {
	module.exports = { Menu: Menu, MenuItem: MenuItem };
}

// Local Variables:
// js-indent-level: 8
// indent-tabs-mode: t
// End:


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(16);
            var content = __webpack_require__(43);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(17);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Arimo:400,400i,700,700i);"]);
// Module
exports.push([module.i, "html, body {\r\n\tmargin: 0;\r\n\theight: 100%;\r\n}\r\nbody { display: flex; flex-direction: column }\r\n.menubar { flex: 0 0 22px }\r\ndiv.below-menubar { flex: 1 1 0; min-height: 0;}\r\n\r\n.nwjs-menu {\r\n\tfont-family: 'Helvetica Neue', HelveticaNeue, 'TeX Gyre Heros', TeXGyreHeros, FreeSans, 'Nimbus Sans L', 'Liberation Sans', Arimo, Helvetica, Arial, sans-serif;\r\n\tfont-size: 14px;\r\n\tcolor: #2c2c2c;\r\n\t-webkit-user-select: none;\r\n\tuser-select: none;\r\n\t-webkit-font-smoothing: subpixel-antialiased;\r\n\tfont-weight: 400;\r\n}\r\n\r\n.contextmenu {\r\n\tmin-width: 100px;\r\n\tbackground-color: #fafafa;\r\n\tposition: fixed;\r\n\topacity: 0;\r\n\ttransition: opacity 250ms;\r\n\tmargin: 0;\r\n\tpadding: 0 0;\r\n\tlist-style: none;\r\n\tpointer-events: none;\r\n\tborder: 1px rgba(191, 191, 191, 0.8) solid;\r\n\tbox-shadow: rgba(43, 43, 43, 0.34) 1px 1px 11px 0px;\r\n\tz-index: 2147483647;\r\n}\r\n\r\n.contextmenu {\r\n\topacity: 1;\r\n\ttransition: opacity 30ms;\r\n\tpointer-events: all;\r\n}\r\n\r\n.contextmenu.submenu {\r\n    transition: opacity 250ms;\r\n}\r\n\r\n.contextmenu.submenu {\r\n\ttransition: opacity 150ms;\r\n\ttransition-timing-function: step-end;\r\n}\r\n\r\n.menu-item.normal,\r\n.menu-item.checkbox,\r\n.menu-item.radio {\r\n\tcursor: default;\r\n\tpadding: 2px 0;\r\n\tbox-sizing: border-box;\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tflex-wrap: nowrap;\r\n\tjustify-content: flex-start;\r\n\talign-content: stretch;\r\n\talign-items: flex-start;\r\n\twidth: 100%;\r\n}\r\n\r\n.contextmenu .menu-item.active,\r\n.menu-item.normal.submenu-active {\r\n\tbackground-color: #499BFE;\r\n\tcolor: #fff;\r\n}\r\n\r\n.menu-item.normal > div,\r\n.menu-item.checkbox > div,\r\n.menu-item.radio > div {\r\n    align-self: center;\r\n    vertical-align: middle;\r\n    display: inline-flex;\r\n    justify-content: flex-start;\r\n    flex-shrink: 0;\r\n}\r\n\r\n.menu-item.normal .icon {\r\n    display: inline-flex;\r\n    vertical-align: middle;\r\n    max-width: 16px;\r\n    max-height: 16px;\r\n    align-self: center;\r\n}\r\n\r\nli.menu-item.separator {\r\n\theight: 2px;\r\n\tbackground-color: rgba(128, 128, 128, 0.2);\r\n\tmargin: 5px 0;\r\n}\r\n\r\n.menu-item .modifiers,\r\n.menu-item .icon-wrap,\r\n.menu-item .checkmark {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.menu-item .checkmark {\r\n\twidth: 22px;\r\n}\r\n\r\n.menu-item .modifiers {\r\n\tbox-sizing: border-box;\r\n\tpadding: 0 6px;\r\n\ttext-align: right;\r\n\torder: 0;\r\n    flex: 0 0 auto;\r\n    align-self: center;\r\n}\r\n\r\n.menu-item .label {\r\n    padding: 0 22px 0 0;\r\n    order: 0;\r\n    flex: 1 0 auto;\r\n    align-self: center;\r\n}\r\n\r\n.menu-item.disabled,\r\n.menu-item.disabled:hover,\r\n.contextmenu .menu-item.disabled:hover {\r\n    color: #ababab;\r\n}\r\n\r\n.menu-item.disabled:hover,\r\n.contextmenu .menu-item.disabled:hover {\r\n    background-color: transparent;\r\n}\r\n\r\n.menu-item .icon-wrap {\r\n    padding: 0 6px 0 0;\r\n    display: inline-flex;\r\n    align-self: center;\r\n}\r\n\r\n.menu-item .label-text {\r\n    align-items: center;\r\n    vertical-align: middle;\r\n}\r\n\r\n.menu-item.checkbox.checked .checkmark::before {\r\n\tcontent: '✔';\r\n\ttext-align: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.menu-item.radio.checked .checkmark::before {\r\n\tcontent: '⊚';\r\n\ttext-align: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.menubar {\r\n\theight: 22px;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbackground-color: #eee;\r\n\tz-index: 2147483647;\r\n}\r\n\r\n.menubar .menu-item.normal {\r\n    display: inline-block;\r\n    width: auto;\r\n    height: 100%;\r\n}\r\n\r\n.menubar .menu-item.normal > div {\r\n    vertical-align: top;\r\n}\r\n\r\n.menubar .menu-item.normal .checkmark,\r\n.menubar .menu-item.normal .modifiers {\r\n    display: none;\r\n}\r\n\r\n.menubar .menu-item.normal .label {\r\n    padding: 0 9px;\r\n}\r\n\r\n.contextmenu.menubar-submenu {\r\n    transition: opacity 0ms;\r\n}\r\n\r\n/* Mac only?\r\n.contextmenu {\r\n    border-radius: 7px;\r\n}\r\n.contextmenu.menubar-submenu {\r\n    border-radius: 0 0 7px 7px;\r\n}\r\n*/\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var SavannaGrass, Terrain, addEntityClass, lineSegmentsIntersect;

Terrain = __webpack_require__(8);

({addEntityClass, lineSegmentsIntersect} = __webpack_require__(0));

module.exports = SavannaGrass = (function() {
  class SavannaGrass extends Terrain {
    constructor() {
      super();
      this.bbox_padding = 30;
      this.grass_tiles = new Map();
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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