/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Entity, Terrain, World;

Entity = __webpack_require__(293);

Terrain = __webpack_require__(891);

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

/***/ 668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Entity, GranddaddyLonglegs, TAU, addEntityClass, distance,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  indexOf = [].indexOf;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

({distance} = (__webpack_require__(505).helpers));

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

/***/ 795:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Arrow, Bow, Entity, Player, Pose, SimpleActor, TAU, addEntityClass, distance, distanceToLineSegment, keyboard;

SimpleActor = __webpack_require__(339);

Entity = __webpack_require__(293);

({Pose} = __webpack_require__(505));

Bow = __webpack_require__(914);

Arrow = __webpack_require__(943);

keyboard = __webpack_require__(866);

({addEntityClass} = __webpack_require__(505));

({distance, distanceToLineSegment} = (__webpack_require__(505).helpers));

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
      // TODO: min/max_length for pseudo-3D purposes
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
      var aim_angle, angle, arm_span, arrow, arrow_angle, bow, bow_angle, draw_bow, draw_to, force, from_point_in_world, hold_offset, left, max_draw_distance, mouse_in_world, new_pose, other_idle_animation, pick_up_any, point, point_name, prevent_idle, primary_elbo, primary_hand, primary_hand_in_arrow_space, primary_hand_in_bow_space, prime_bow, ref, ref1, right, secondary_elbo, secondary_hand, secondary_hand_in_arrow_space, secondary_hand_in_bow_space, sternum, subtle_idle_animation;
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
      prevent_idle = () => {
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
        prevent_idle();
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
          prevent_idle();
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
      // or should I just alias structure.points as a one-char-var and do p["left shoulder"]? that could work, but I would still use {}= when I could honestly, so...
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


/***/ }),

/***/ 521:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SavannaTreeA, TAU, Tree, addEntityClass;

Tree = __webpack_require__(776);

({addEntityClass} = __webpack_require__(505));

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

/***/ 293:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(505).Entity;

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

/***/ 339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
// SimpleActors have rectangular collision boxes and basic physics.
var Entity, SimpleActor;

Entity = __webpack_require__(293);

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

/***/ 891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(505).Terrain;

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

/***/ 776:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Entity, TAU, Tree;

Entity = __webpack_require__(293);

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

/***/ 943:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Arrow, Entity, TAU, addEntityClass;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

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

/***/ 914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Bow, Entity, TAU, addEntityClass;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

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

/***/ 91:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Rock, Terrain, addEntityClass;

Terrain = __webpack_require__(891);

({addEntityClass} = __webpack_require__(505));

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

/***/ 475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SavannaGrass, Terrain, addEntityClass, lineSegmentsIntersect;

Terrain = __webpack_require__(891);

({addEntityClass} = __webpack_require__(505));

({lineSegmentsIntersect} = (__webpack_require__(505).helpers));

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

/***/ 866:
/***/ ((module) => {

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

/***/ 505:
/***/ ((module) => {

/*! For license information please see skele2d.js.LICENSE.txt */
!function(e,t){ true?module.exports=t():0}(self,(()=>(()=>{var e={89:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(933),i=n.n(r),a=n(476),l=n.n(a)()(i());l.push([e.id,"@import url(https://fonts.googleapis.com/css?family=Arimo:400,400i,700,700i);"]),l.push([e.id,"html, body {\n\tmargin: 0;\n\theight: 100%;\n}\nbody { display: flex; flex-direction: column }\n.menubar { flex: 0 0 22px }\ndiv.below-menubar { flex: 1 1 0; min-height: 0;}\n\n.nwjs-menu {\n\tfont-family: 'Helvetica Neue', HelveticaNeue, 'TeX Gyre Heros', TeXGyreHeros, FreeSans, 'Nimbus Sans L', 'Liberation Sans', Arimo, Helvetica, Arial, sans-serif;\n\tfont-size: 14px;\n\tcolor: #2c2c2c;\n\t-webkit-user-select: none;\n\tuser-select: none;\n\t-webkit-font-smoothing: subpixel-antialiased;\n\tfont-weight: 400;\n}\n\n.contextmenu {\n\tmin-width: 100px;\n\tbackground-color: #fafafa;\n\tposition: fixed;\n\topacity: 0;\n\ttransition: opacity 250ms;\n\tmargin: 0;\n\tpadding: 0 0;\n\tlist-style: none;\n\tpointer-events: none;\n\tborder: 1px rgba(191, 191, 191, 0.8) solid;\n\tbox-shadow: rgba(43, 43, 43, 0.34) 1px 1px 11px 0px;\n\tz-index: 2147483647;\n}\n\n.contextmenu {\n\topacity: 1;\n\ttransition: opacity 30ms;\n\tpointer-events: all;\n}\n\n.contextmenu.submenu {\n    transition: opacity 250ms;\n}\n\n.contextmenu.submenu {\n\ttransition: opacity 150ms;\n\ttransition-timing-function: step-end;\n}\n\n.menu-item.normal,\n.menu-item.checkbox,\n.menu-item.radio {\n\tcursor: default;\n\tpadding: 2px 0;\n\tbox-sizing: border-box;\n\tposition: relative;\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: nowrap;\n\tjustify-content: flex-start;\n\talign-content: stretch;\n\talign-items: flex-start;\n\twidth: 100%;\n}\n\n.contextmenu .menu-item.active,\n.menu-item.normal.submenu-active {\n\tbackground-color: #499BFE;\n\tcolor: #fff;\n}\n\n.menu-item.normal > div,\n.menu-item.checkbox > div,\n.menu-item.radio > div {\n    align-self: center;\n    vertical-align: middle;\n    display: inline-flex;\n    justify-content: flex-start;\n    flex-shrink: 0;\n}\n\n.menu-item.normal .icon {\n    display: inline-flex;\n    vertical-align: middle;\n    max-width: 16px;\n    max-height: 16px;\n    align-self: center;\n}\n\nli.menu-item.separator {\n\theight: 2px;\n\tbackground-color: rgba(128, 128, 128, 0.2);\n\tmargin: 5px 0;\n}\n\n.menu-item .modifiers,\n.menu-item .icon-wrap,\n.menu-item .checkmark {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tvertical-align: middle;\n}\n\n.menu-item .checkmark {\n\twidth: 22px;\n}\n\n.menu-item .modifiers {\n\tbox-sizing: border-box;\n\tpadding: 0 6px;\n\ttext-align: right;\n\torder: 0;\n    flex: 0 0 auto;\n    align-self: center;\n}\n\n.menu-item .label {\n    padding: 0 22px 0 0;\n    order: 0;\n    flex: 1 0 auto;\n    align-self: center;\n}\n\n.menu-item.disabled,\n.menu-item.disabled:hover,\n.contextmenu .menu-item.disabled:hover {\n    color: #ababab;\n}\n\n.menu-item.disabled:hover,\n.contextmenu .menu-item.disabled:hover {\n    background-color: transparent;\n}\n\n.menu-item .icon-wrap {\n    padding: 0 6px 0 0;\n    display: inline-flex;\n    align-self: center;\n}\n\n.menu-item .label-text {\n    align-items: center;\n    vertical-align: middle;\n}\n\n.menu-item.checkbox.checked .checkmark::before {\n\tcontent: '✔';\n\ttext-align: center;\n\twidth: 100%;\n}\n\n.menu-item.radio.checked .checkmark::before {\n\tcontent: '⊚';\n\ttext-align: center;\n\twidth: 100%;\n}\n\n.menubar {\n\theight: 22px;\n\tmargin: 0;\n\tpadding: 0;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground-color: #eee;\n\tz-index: 2147483647;\n}\n\n.menubar .menu-item.normal {\n    display: inline-block;\n    width: auto;\n    height: 100%;\n}\n\n.menubar .menu-item.normal > div {\n    vertical-align: top;\n}\n\n.menubar .menu-item.normal .checkmark,\n.menubar .menu-item.normal .modifiers {\n    display: none;\n}\n\n.menubar .menu-item.normal .label {\n    padding: 0 9px;\n}\n\n.contextmenu.menubar-submenu {\n    transition: opacity 0ms;\n}\n\n/* Mac only?\n.contextmenu {\n    border-radius: 7px;\n}\n.contextmenu.menubar-submenu {\n    border-radius: 0 0 7px 7px;\n}\n*/\n",""]);const o=l},389:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(933),i=n.n(r),a=n(476),l=n.n(a)()(i());l.push([e.id,'.editor {\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\tuser-select: none;\n}\n.grabbable {\n\tcursor: move; /* fallback if grab cursor is unsupported */\n\tcursor: grab;\n\tcursor: -moz-grab;\n\tcursor: -webkit-grab;\n}\n/* Apply a "closed-hand" cursor during drag operation. */\n.grabbable:active { \n\tcursor: grabbing;\n\tcursor: -moz-grabbing;\n\tcursor: -webkit-grabbing;\n}\n/* Sidebars */\n.bar {\n\tbackground: white;\n\ttransition: opacity 0.2s ease;\n\tdisplay: flex;\n\talign-items: stretch;\n\talign-content: flex-start;\n}\n.bar:not(.visible) {\n\topacity: 0;\n\tpointer-events: none;\n}\n.sidebar {\n\tposition: absolute;\n\tz-index: 1;\n\tleft: 0;\n\ttop: 0;\n\theight: 100%;\n\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\n\tflex-direction: column;\n}\n.bar article,\n.terrain-tools {\n\tpadding: 1rem;\n\tpadding-top: 0.5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n.terrain-tools label {\n\tmargin-bottom: 1em;\n}\n.bar article:hover {\n\tbackground: rgba(0, 0, 0, 0.08);\n}\n.bar article:active,\n.bar article.selected {\n\tbackground: rgba(0, 0, 0, 0.12);\n}\n.bar article canvas {\n\tbackground: rgba(50, 200, 255, 0.7);\n}\n.bar article:hover canvas,\n.bar article:active canvas,\n.bar article.selected canvas {\n\tbackground: rgba(50, 200, 255, 1);\n}\n.bar h1 {\n\ttext-align: center;\n\tfont-size: 2em;\n\tfont-weight: normal;\n\tmargin: 0.1em 0;\n}\n.bar article > h1 {\n\tpointer-events: none;\n}\n.bar article .title-bar {\n\tdisplay: flex;\n\tflex-direction: row;\n}\n.bar .name {\n\tfont-size: 1.2em;\n\tfont-weight: normal;\n\tfont-family: sans-serif;\n\tmargin: 0;\n\tmargin-bottom: 0.1em;\n}\n.entities-bar .name {\n\ttext-align: center;\n}\n.bar article .mdl-textfield {\n\twidth: auto;\n\tpadding: 0;\n\tpadding-bottom: 0.3rem;\n}\nbutton,\ncanvas,\nimg,\narticle, /* representing entities, poses, animations, animation frames - things with EntityPreviews in them */\n.anims > * { /* includes headings and .anim-groups */\n\tflex: 0 0 auto;\n}\n.anim-bar {\n\tflex-direction: row;\n\talign-items: flex-start;\n}\n.anim-bar > * {\n\theight: 100%;\n}\n/* TODO: refactor bars and subbars */\n.anim-bar > *:not(:first-child) {\n\tborder-left: 1px solid rgba(0, 0, 0, 0.12);\n}\n.anims,\n.anim-group {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n}\n.anims,\n.animation-frames,\n.entities-bar {\n\toverflow-y: auto;\n\toverflow-x: hidden;\n}\n/* TODO: refactor bars and subbars */\n.animation-frames {\n\t/*transition: 0.1s ease;*/\n}\n.animation-frames:not(.visible) {\n\topacity: 0;\n\tpointer-events: none;\n\twidth: 0;\n\t/*transform: translate(-100%, 0);*/\n}\n.add-anim-fab {\n\tmargin: 0.5rem 0 !important;\n\talign-self: center;\n}\n.poses,\n.animations {\n\twidth: 100%;\n}\narticle.placeholder {\n\tpadding: 2rem;\n\ttext-align: center;\n\tbackground: rgba(128, 59, 110, 0.16);\n\tcolor: rgba(0, 0, 0, 0.5);\n\tfont-size: 1.4em;\n\tpointer-events: none;\n}\n\n.warning {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tz-index: 50;\n\tmargin: 15px;\n\tpadding: 15px;\n\tbackground: #FFF9C4;\n\tcolor: #BF360C;\n\tborder-radius: 2px;\n\ttransition: opacity 0.2s ease;\n}\n.warning:not(.show) {\n\tpointer-events: none;\n\topacity: 0;\n}\n',""]);const o=l},476:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,i,a){"string"==typeof e&&(e=[[null,e,void 0]]);var l={};if(r)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(l[s]=!0)}for(var u=0;u<e.length;u++){var c=[].concat(e[u]);r&&l[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),t.push(c))}},t}},933:e=>{"use strict";e.exports=function(e){return e[1]}},525:e=>{"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,i){for(var a,l,o=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),s=1;s<arguments.length;s++){for(var u in a=Object(arguments[s]))n.call(a,u)&&(o[u]=a[u]);if(t){l=t(a);for(var c=0;c<l.length;c++)r.call(a,l[c])&&(o[l[c]]=a[l[c]])}}return o}},577:(e,t,n)=>{"use strict";var r=n(378),i=n(525),a=n(102);function l(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!r)throw Error(l(227));var o=new Set,s={};function u(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)o.add(t[e])}var d=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),f=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,h=Object.prototype.hasOwnProperty,p={},m={};function g(e,t,n,r,i,a,l){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=l}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){y[e]=new g(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];y[t]=new g(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){y[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){y[e]=new g(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){y[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){y[e]=new g(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){y[e]=new g(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){y[e]=new g(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){y[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)}));var v=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function _(e,t,n,r){var i=y.hasOwnProperty(t)?y[t]:null;(null!==i?0===i.type:!r&&2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1]))||(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!h.call(m,e)||!h.call(p,e)&&(f.test(e)?m[e]=!0:(p[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(v,b);y[t]=new g(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(v,b);y[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(v,b);y[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){y[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)})),y.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){y[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)}));var w=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,x=60103,k=60106,S=60107,E=60108,C=60114,N=60109,P=60110,M=60112,L=60113,O=60120,T=60115,z=60116,I=60121,D=60128,R=60129,F=60130,j=60131;if("function"==typeof Symbol&&Symbol.for){var A=Symbol.for;x=A("react.element"),k=A("react.portal"),S=A("react.fragment"),E=A("react.strict_mode"),C=A("react.profiler"),N=A("react.provider"),P=A("react.context"),M=A("react.forward_ref"),L=A("react.suspense"),O=A("react.suspense_list"),T=A("react.memo"),z=A("react.lazy"),I=A("react.block"),A("react.scope"),D=A("react.opaque.id"),R=A("react.debug_trace_mode"),F=A("react.offscreen"),j=A("react.legacy_hidden")}var U,B="function"==typeof Symbol&&Symbol.iterator;function $(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=B&&e[B]||e["@@iterator"])?e:null}function W(e){if(void 0===U)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);U=t&&t[1]||""}return"\n"+U+e}var H=!1;function V(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(e){if(e&&r&&"string"==typeof e.stack){for(var i=e.stack.split("\n"),a=r.stack.split("\n"),l=i.length-1,o=a.length-1;1<=l&&0<=o&&i[l]!==a[o];)o--;for(;1<=l&&0<=o;l--,o--)if(i[l]!==a[o]){if(1!==l||1!==o)do{if(l--,0>--o||i[l]!==a[o])return"\n"+i[l].replace(" at new "," at ")}while(1<=l&&0<=o);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?W(e):""}function Q(e){switch(e.tag){case 5:return W(e.type);case 16:return W("Lazy");case 13:return W("Suspense");case 19:return W("SuspenseList");case 0:case 2:case 15:return V(e.type,!1);case 11:return V(e.type.render,!1);case 22:return V(e.type._render,!1);case 1:return V(e.type,!0);default:return""}}function q(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case S:return"Fragment";case k:return"Portal";case C:return"Profiler";case E:return"StrictMode";case L:return"Suspense";case O:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case P:return(e.displayName||"Context")+".Consumer";case N:return(e._context.displayName||"Context")+".Provider";case M:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case T:return q(e.type);case I:return q(e._render);case z:t=e._payload,e=e._init;try{return q(e(t))}catch(e){}}return null}function J(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function K(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function Y(e){e._valueTracker||(e._valueTracker=function(e){var t=K(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function X(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=K(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Z(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function G(e,t){var n=t.checked;return i({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function ee(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=J(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function te(e,t){null!=(t=t.checked)&&_(e,"checked",t,!1)}function ne(e,t){te(e,t);var n=J(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ie(e,t.type,n):t.hasOwnProperty("defaultValue")&&ie(e,t.type,J(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function re(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ie(e,t,n){"number"===t&&Z(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function ae(e,t){return e=i({children:void 0},t),(t=function(e){var t="";return r.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(t.children))&&(e.children=t),e}function le(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+J(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function oe(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(l(91));return i({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function se(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(l(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(l(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:J(n)}}function ue(e,t){var n=J(t.value),r=J(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ce(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var de={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function fe(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function he(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?fe(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var pe,me,ge=(me=function(e,t){if(e.namespaceURI!==de.svg||"innerHTML"in e)e.innerHTML=t;else{for((pe=pe||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=pe.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return me(e,t)}))}:me);function ye(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var ve={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},be=["Webkit","ms","Moz","O"];function _e(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||ve.hasOwnProperty(e)&&ve[e]?(""+t).trim():t+"px"}function we(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=_e(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(ve).forEach((function(e){be.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ve[t]=ve[e]}))}));var xe=i({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ke(e,t){if(t){if(xe[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(l(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(l(60));if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(l(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(l(62))}}function Se(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Ee(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Ce=null,Ne=null,Pe=null;function Me(e){if(e=ni(e)){if("function"!=typeof Ce)throw Error(l(280));var t=e.stateNode;t&&(t=ii(t),Ce(e.stateNode,e.type,t))}}function Le(e){Ne?Pe?Pe.push(e):Pe=[e]:Ne=e}function Oe(){if(Ne){var e=Ne,t=Pe;if(Pe=Ne=null,Me(e),t)for(e=0;e<t.length;e++)Me(t[e])}}function Te(e,t){return e(t)}function ze(e,t,n,r,i){return e(t,n,r,i)}function Ie(){}var De=Te,Re=!1,Fe=!1;function je(){null===Ne&&null===Pe||(Ie(),Oe())}function Ae(e,t){var n=e.stateNode;if(null===n)return null;var r=ii(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(l(231,t,typeof n));return n}var Ue=!1;if(d)try{var Be={};Object.defineProperty(Be,"passive",{get:function(){Ue=!0}}),window.addEventListener("test",Be,Be),window.removeEventListener("test",Be,Be)}catch(me){Ue=!1}function $e(e,t,n,r,i,a,l,o,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(e){this.onError(e)}}var We=!1,He=null,Ve=!1,Qe=null,qe={onError:function(e){We=!0,He=e}};function Je(e,t,n,r,i,a,l,o,s){We=!1,He=null,$e.apply(qe,arguments)}function Ke(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Ye(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&null!==(e=e.alternate)&&(t=e.memoizedState),null!==t)return t.dehydrated}return null}function Xe(e){if(Ke(e)!==e)throw Error(l(188))}function Ze(e){if(e=function(e){var t=e.alternate;if(!t){if(null===(t=Ke(e)))throw Error(l(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var a=i.alternate;if(null===a){if(null!==(r=i.return)){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return Xe(i),e;if(a===r)return Xe(i),t;a=a.sibling}throw Error(l(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,s=i.child;s;){if(s===n){o=!0,n=i,r=a;break}if(s===r){o=!0,r=i,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,r=i;break}if(s===r){o=!0,r=a,n=i;break}s=s.sibling}if(!o)throw Error(l(189))}}if(n.alternate!==r)throw Error(l(190))}if(3!==n.tag)throw Error(l(188));return n.stateNode.current===n?e:t}(e),!e)return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function Ge(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var et,tt,nt,rt,it=!1,at=[],lt=null,ot=null,st=null,ut=new Map,ct=new Map,dt=[],ft="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ht(e,t,n,r,i){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:i,targetContainers:[r]}}function pt(e,t){switch(e){case"focusin":case"focusout":lt=null;break;case"dragenter":case"dragleave":ot=null;break;case"mouseover":case"mouseout":st=null;break;case"pointerover":case"pointerout":ut.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ct.delete(t.pointerId)}}function mt(e,t,n,r,i,a){return null===e||e.nativeEvent!==a?(e=ht(t,n,r,i,a),null!==t&&null!==(t=ni(t))&&tt(t),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function gt(e){var t=ti(e.target);if(null!==t){var n=Ke(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Ye(n)))return e.blockedOn=t,void rt(e.lanePriority,(function(){a.unstable_runWithPriority(e.priority,(function(){nt(n)}))}))}else if(3===t&&n.stateNode.hydrate)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function yt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=ni(n))&&tt(t),e.blockedOn=n,!1;t.shift()}return!0}function vt(e,t,n){yt(e)&&n.delete(t)}function bt(){for(it=!1;0<at.length;){var e=at[0];if(null!==e.blockedOn){null!==(e=ni(e.blockedOn))&&et(e);break}for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&at.shift()}null!==lt&&yt(lt)&&(lt=null),null!==ot&&yt(ot)&&(ot=null),null!==st&&yt(st)&&(st=null),ut.forEach(vt),ct.forEach(vt)}function _t(e,t){e.blockedOn===t&&(e.blockedOn=null,it||(it=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,bt)))}function wt(e){function t(t){return _t(t,e)}if(0<at.length){_t(at[0],e);for(var n=1;n<at.length;n++){var r=at[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==lt&&_t(lt,e),null!==ot&&_t(ot,e),null!==st&&_t(st,e),ut.forEach(t),ct.forEach(t),n=0;n<dt.length;n++)(r=dt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<dt.length&&null===(n=dt[0]).blockedOn;)gt(n),null===n.blockedOn&&dt.shift()}function xt(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var kt={animationend:xt("Animation","AnimationEnd"),animationiteration:xt("Animation","AnimationIteration"),animationstart:xt("Animation","AnimationStart"),transitionend:xt("Transition","TransitionEnd")},St={},Et={};function Ct(e){if(St[e])return St[e];if(!kt[e])return e;var t,n=kt[e];for(t in n)if(n.hasOwnProperty(t)&&t in Et)return St[e]=n[t];return e}d&&(Et=document.createElement("div").style,"AnimationEvent"in window||(delete kt.animationend.animation,delete kt.animationiteration.animation,delete kt.animationstart.animation),"TransitionEvent"in window||delete kt.transitionend.transition);var Nt=Ct("animationend"),Pt=Ct("animationiteration"),Mt=Ct("animationstart"),Lt=Ct("transitionend"),Ot=new Map,Tt=new Map,zt=["abort","abort",Nt,"animationEnd",Pt,"animationIteration",Mt,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lt,"transitionEnd","waiting","waiting"];function It(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],i=e[n+1];i="on"+(i[0].toUpperCase()+i.slice(1)),Tt.set(r,t),Ot.set(r,i),u(i,[r])}}(0,a.unstable_now)();var Dt=8;function Rt(e){if(0!=(1&e))return Dt=15,1;if(0!=(2&e))return Dt=14,2;if(0!=(4&e))return Dt=13,4;var t=24&e;return 0!==t?(Dt=12,t):0!=(32&e)?(Dt=11,32):0!=(t=192&e)?(Dt=10,t):0!=(256&e)?(Dt=9,256):0!=(t=3584&e)?(Dt=8,t):0!=(4096&e)?(Dt=7,4096):0!=(t=4186112&e)?(Dt=6,t):0!=(t=62914560&e)?(Dt=5,t):67108864&e?(Dt=4,67108864):0!=(134217728&e)?(Dt=3,134217728):0!=(t=805306368&e)?(Dt=2,t):0!=(1073741824&e)?(Dt=1,1073741824):(Dt=8,e)}function Ft(e,t){var n=e.pendingLanes;if(0===n)return Dt=0;var r=0,i=0,a=e.expiredLanes,l=e.suspendedLanes,o=e.pingedLanes;if(0!==a)r=a,i=Dt=15;else if(0!=(a=134217727&n)){var s=a&~l;0!==s?(r=Rt(s),i=Dt):0!=(o&=a)&&(r=Rt(o),i=Dt)}else 0!=(a=n&~l)?(r=Rt(a),i=Dt):0!==o&&(r=Rt(o),i=Dt);if(0===r)return 0;if(r=n&((0>(r=31-Wt(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0==(t&l)){if(Rt(t),i<=Dt)return t;Dt=i}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-Wt(t)),r|=e[n],t&=~i;return r}function jt(e){return 0!=(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function At(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Ut(24&~t))?At(10,t):e;case 10:return 0===(e=Ut(192&~t))?At(8,t):e;case 8:return 0===(e=Ut(3584&~t))&&0===(e=Ut(4186112&~t))&&(e=512),e;case 2:return 0===(t=Ut(805306368&~t))&&(t=268435456),t}throw Error(l(358,e))}function Ut(e){return e&-e}function Bt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $t(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-Wt(t)]=n}var Wt=Math.clz32?Math.clz32:function(e){return 0===e?32:31-(Ht(e)/Vt|0)|0},Ht=Math.log,Vt=Math.LN2,Qt=a.unstable_UserBlockingPriority,qt=a.unstable_runWithPriority,Jt=!0;function Kt(e,t,n,r){Re||Ie();var i=Xt,a=Re;Re=!0;try{ze(i,e,t,n,r)}finally{(Re=a)||je()}}function Yt(e,t,n,r){qt(Qt,Xt.bind(null,e,t,n,r))}function Xt(e,t,n,r){var i;if(Jt)if((i=0==(4&t))&&0<at.length&&-1<ft.indexOf(e))e=ht(null,e,t,n,r),at.push(e);else{var a=Zt(e,t,n,r);if(null===a)i&&pt(e,r);else{if(i){if(-1<ft.indexOf(e))return e=ht(a,e,t,n,r),void at.push(e);if(function(e,t,n,r,i){switch(t){case"focusin":return lt=mt(lt,e,t,n,r,i),!0;case"dragenter":return ot=mt(ot,e,t,n,r,i),!0;case"mouseover":return st=mt(st,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return ut.set(a,mt(ut.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,ct.set(a,mt(ct.get(a)||null,e,t,n,r,i)),!0}return!1}(a,e,t,n,r))return;pt(e,r)}Ir(e,t,r,null,n)}}}function Zt(e,t,n,r){var i=Ee(r);if(null!==(i=ti(i))){var a=Ke(i);if(null===a)i=null;else{var l=a.tag;if(13===l){if(null!==(i=Ye(a)))return i;i=null}else if(3===l){if(a.stateNode.hydrate)return 3===a.tag?a.stateNode.containerInfo:null;i=null}else a!==i&&(i=null)}}return Ir(e,t,r,i,n),null}var Gt=null,en=null,tn=null;function nn(){if(tn)return tn;var e,t,n=en,r=n.length,i="value"in Gt?Gt.value:Gt.textContent,a=i.length;for(e=0;e<r&&n[e]===i[e];e++);var l=r-e;for(t=1;t<=l&&n[r-t]===i[a-t];t++);return tn=i.slice(e,1<t?1-t:void 0)}function rn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function an(){return!0}function ln(){return!1}function on(e){function t(t,n,r,i,a){for(var l in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(i):i[l]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?an:ln,this.isPropagationStopped=ln,this}return i(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=an)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=an)},persist:function(){},isPersistent:an}),t}var sn,un,cn,dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fn=on(dn),hn=i({},dn,{view:0,detail:0}),pn=on(hn),mn=i({},hn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==cn&&(cn&&"mousemove"===e.type?(sn=e.screenX-cn.screenX,un=e.screenY-cn.screenY):un=sn=0,cn=e),sn)},movementY:function(e){return"movementY"in e?e.movementY:un}}),gn=on(mn),yn=on(i({},mn,{dataTransfer:0})),vn=on(i({},hn,{relatedTarget:0})),bn=on(i({},dn,{animationName:0,elapsedTime:0,pseudoElement:0})),_n=i({},dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),wn=on(_n),xn=on(i({},dn,{data:0})),kn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},En={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=En[e])&&!!t[e]}function Nn(){return Cn}var Pn=i({},hn,{key:function(e){if(e.key){var t=kn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=rn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?Sn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nn,charCode:function(e){return"keypress"===e.type?rn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?rn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Mn=on(Pn),Ln=on(i({},mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),On=on(i({},hn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nn})),Tn=on(i({},dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),zn=i({},mn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),In=on(zn),Dn=[9,13,27,32],Rn=d&&"CompositionEvent"in window,Fn=null;d&&"documentMode"in document&&(Fn=document.documentMode);var jn=d&&"TextEvent"in window&&!Fn,An=d&&(!Rn||Fn&&8<Fn&&11>=Fn),Un=String.fromCharCode(32),Bn=!1;function $n(e,t){switch(e){case"keyup":return-1!==Dn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wn(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Hn=!1,Vn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Vn[e.type]:"textarea"===t}function qn(e,t,n,r){Le(r),0<(t=Rr(t,"onChange")).length&&(n=new fn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Jn=null,Kn=null;function Yn(e){Pr(e,0)}function Xn(e){if(X(ri(e)))return e}function Zn(e,t){if("change"===e)return t}var Gn=!1;if(d){var er;if(d){var tr="oninput"in document;if(!tr){var nr=document.createElement("div");nr.setAttribute("oninput","return;"),tr="function"==typeof nr.oninput}er=tr}else er=!1;Gn=er&&(!document.documentMode||9<document.documentMode)}function rr(){Jn&&(Jn.detachEvent("onpropertychange",ir),Kn=Jn=null)}function ir(e){if("value"===e.propertyName&&Xn(Kn)){var t=[];if(qn(t,Kn,e,Ee(e)),e=Yn,Re)e(t);else{Re=!0;try{Te(e,t)}finally{Re=!1,je()}}}}function ar(e,t,n){"focusin"===e?(rr(),Kn=n,(Jn=t).attachEvent("onpropertychange",ir)):"focusout"===e&&rr()}function lr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Xn(Kn)}function or(e,t){if("click"===e)return Xn(t)}function sr(e,t){if("input"===e||"change"===e)return Xn(t)}var ur="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},cr=Object.prototype.hasOwnProperty;function dr(e,t){if(ur(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!cr.call(t,n[r])||!ur(e[n[r]],t[n[r]]))return!1;return!0}function fr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hr(e,t){var n,r=fr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=fr(r)}}function pr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?pr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function mr(){for(var e=window,t=Z();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(e){n=!1}if(!n)break;t=Z((e=t.contentWindow).document)}return t}function gr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var yr=d&&"documentMode"in document&&11>=document.documentMode,vr=null,br=null,_r=null,wr=!1;function xr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;wr||null==vr||vr!==Z(r)||(r="selectionStart"in(r=vr)&&gr(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},_r&&dr(_r,r)||(_r=r,0<(r=Rr(br,"onSelect")).length&&(t=new fn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=vr)))}It("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),It("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),It(zt,2);for(var kr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Sr=0;Sr<kr.length;Sr++)Tt.set(kr[Sr],0);c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function Nr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,a,o,s,u){if(Je.apply(this,arguments),We){if(!We)throw Error(l(198));var c=He;We=!1,He=null,Ve||(Ve=!0,Qe=c)}}(r,t,void 0,e),e.currentTarget=null}function Pr(e,t){t=0!=(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var l=r.length-1;0<=l;l--){var o=r[l],s=o.instance,u=o.currentTarget;if(o=o.listener,s!==a&&i.isPropagationStopped())break e;Nr(i,o,u),a=s}else for(l=0;l<r.length;l++){if(s=(o=r[l]).instance,u=o.currentTarget,o=o.listener,s!==a&&i.isPropagationStopped())break e;Nr(i,o,u),a=s}}}if(Ve)throw e=Qe,Ve=!1,Qe=null,e}function Mr(e,t){var n=ai(t),r=e+"__bubble";n.has(r)||(zr(t,e,2,!1),n.add(r))}var Lr="_reactListening"+Math.random().toString(36).slice(2);function Or(e){e[Lr]||(e[Lr]=!0,o.forEach((function(t){Cr.has(t)||Tr(t,!1,e,null),Tr(t,!0,e,null)})))}function Tr(e,t,n,r){var i=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,a=n;if("selectionchange"===e&&9!==n.nodeType&&(a=n.ownerDocument),null!==r&&!t&&Cr.has(e)){if("scroll"!==e)return;i|=2,a=r}var l=ai(a),o=e+"__"+(t?"capture":"bubble");l.has(o)||(t&&(i|=4),zr(a,e,i,t),l.add(o))}function zr(e,t,n,r){var i=Tt.get(t);switch(void 0===i?2:i){case 0:i=Kt;break;case 1:i=Yt;break;default:i=Xt}n=i.bind(null,t,n,e),i=void 0,!Ue||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Ir(e,t,n,r,i){var a=r;if(0==(1&t)&&0==(2&t)&&null!==r)e:for(;;){if(null===r)return;var l=r.tag;if(3===l||4===l){var o=r.stateNode.containerInfo;if(o===i||8===o.nodeType&&o.parentNode===i)break;if(4===l)for(l=r.return;null!==l;){var s=l.tag;if((3===s||4===s)&&((s=l.stateNode.containerInfo)===i||8===s.nodeType&&s.parentNode===i))return;l=l.return}for(;null!==o;){if(null===(l=ti(o)))return;if(5===(s=l.tag)||6===s){r=a=l;continue e}o=o.parentNode}}r=r.return}!function(e,t,n){if(Fe)return e();Fe=!0;try{De(e,t,n)}finally{Fe=!1,je()}}((function(){var r=a,i=Ee(n),l=[];e:{var o=Ot.get(e);if(void 0!==o){var s=fn,u=e;switch(e){case"keypress":if(0===rn(n))break e;case"keydown":case"keyup":s=Mn;break;case"focusin":u="focus",s=vn;break;case"focusout":u="blur",s=vn;break;case"beforeblur":case"afterblur":s=vn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":s=gn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":s=yn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":s=On;break;case Nt:case Pt:case Mt:s=bn;break;case Lt:s=Tn;break;case"scroll":s=pn;break;case"wheel":s=In;break;case"copy":case"cut":case"paste":s=wn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":s=Ln}var c=0!=(4&t),d=!c&&"scroll"===e,f=c?null!==o?o+"Capture":null:o;c=[];for(var h,p=r;null!==p;){var m=(h=p).stateNode;if(5===h.tag&&null!==m&&(h=m,null!==f&&null!=(m=Ae(p,f))&&c.push(Dr(p,m,h))),d)break;p=p.return}0<c.length&&(o=new s(o,u,null,n,i),l.push({event:o,listeners:c}))}}if(0==(7&t)){if(s="mouseout"===e||"pointerout"===e,(!(o="mouseover"===e||"pointerover"===e)||0!=(16&t)||!(u=n.relatedTarget||n.fromElement)||!ti(u)&&!u[Gr])&&(s||o)&&(o=i.window===i?i:(o=i.ownerDocument)?o.defaultView||o.parentWindow:window,s?(s=r,null!==(u=(u=n.relatedTarget||n.toElement)?ti(u):null)&&(u!==(d=Ke(u))||5!==u.tag&&6!==u.tag)&&(u=null)):(s=null,u=r),s!==u)){if(c=gn,m="onMouseLeave",f="onMouseEnter",p="mouse","pointerout"!==e&&"pointerover"!==e||(c=Ln,m="onPointerLeave",f="onPointerEnter",p="pointer"),d=null==s?o:ri(s),h=null==u?o:ri(u),(o=new c(m,p+"leave",s,n,i)).target=d,o.relatedTarget=h,m=null,ti(i)===r&&((c=new c(f,p+"enter",u,n,i)).target=h,c.relatedTarget=d,m=c),d=m,s&&u)e:{for(f=u,p=0,h=c=s;h;h=Fr(h))p++;for(h=0,m=f;m;m=Fr(m))h++;for(;0<p-h;)c=Fr(c),p--;for(;0<h-p;)f=Fr(f),h--;for(;p--;){if(c===f||null!==f&&c===f.alternate)break e;c=Fr(c),f=Fr(f)}c=null}else c=null;null!==s&&jr(l,o,s,c,!1),null!==u&&null!==d&&jr(l,d,u,c,!0)}if("select"===(s=(o=r?ri(r):window).nodeName&&o.nodeName.toLowerCase())||"input"===s&&"file"===o.type)var g=Zn;else if(Qn(o))if(Gn)g=sr;else{g=lr;var y=ar}else(s=o.nodeName)&&"input"===s.toLowerCase()&&("checkbox"===o.type||"radio"===o.type)&&(g=or);switch(g&&(g=g(e,r))?qn(l,g,n,i):(y&&y(e,o,r),"focusout"===e&&(y=o._wrapperState)&&y.controlled&&"number"===o.type&&ie(o,"number",o.value)),y=r?ri(r):window,e){case"focusin":(Qn(y)||"true"===y.contentEditable)&&(vr=y,br=r,_r=null);break;case"focusout":_r=br=vr=null;break;case"mousedown":wr=!0;break;case"contextmenu":case"mouseup":case"dragend":wr=!1,xr(l,n,i);break;case"selectionchange":if(yr)break;case"keydown":case"keyup":xr(l,n,i)}var v;if(Rn)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Hn?$n(e,n)&&(b="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(b="onCompositionStart");b&&(An&&"ko"!==n.locale&&(Hn||"onCompositionStart"!==b?"onCompositionEnd"===b&&Hn&&(v=nn()):(en="value"in(Gt=i)?Gt.value:Gt.textContent,Hn=!0)),0<(y=Rr(r,b)).length&&(b=new xn(b,e,null,n,i),l.push({event:b,listeners:y}),(v||null!==(v=Wn(n)))&&(b.data=v))),(v=jn?function(e,t){switch(e){case"compositionend":return Wn(t);case"keypress":return 32!==t.which?null:(Bn=!0,Un);case"textInput":return(e=t.data)===Un&&Bn?null:e;default:return null}}(e,n):function(e,t){if(Hn)return"compositionend"===e||!Rn&&$n(e,t)?(e=nn(),tn=en=Gt=null,Hn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return An&&"ko"!==t.locale?null:t.data}}(e,n))&&0<(r=Rr(r,"onBeforeInput")).length&&(i=new xn("onBeforeInput","beforeinput",null,n,i),l.push({event:i,listeners:r}),i.data=v)}Pr(l,t)}))}function Dr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Rr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,a=i.stateNode;5===i.tag&&null!==a&&(i=a,null!=(a=Ae(e,n))&&r.unshift(Dr(e,a,i)),null!=(a=Ae(e,t))&&r.push(Dr(e,a,i))),e=e.return}return r}function Fr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function jr(e,t,n,r,i){for(var a=t._reactName,l=[];null!==n&&n!==r;){var o=n,s=o.alternate,u=o.stateNode;if(null!==s&&s===r)break;5===o.tag&&null!==u&&(o=u,i?null!=(s=Ae(n,a))&&l.unshift(Dr(n,s,o)):i||null!=(s=Ae(n,a))&&l.push(Dr(n,s,o))),n=n.return}0!==l.length&&e.push({event:t,listeners:l})}function Ar(){}var Ur=null,Br=null;function $r(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Wr(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var Hr="function"==typeof setTimeout?setTimeout:void 0,Vr="function"==typeof clearTimeout?clearTimeout:void 0;function Qr(e){(1===e.nodeType||9===e.nodeType&&null!=(e=e.body))&&(e.textContent="")}function qr(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function Jr(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var Kr=0,Yr=Math.random().toString(36).slice(2),Xr="__reactFiber$"+Yr,Zr="__reactProps$"+Yr,Gr="__reactContainer$"+Yr,ei="__reactEvents$"+Yr;function ti(e){var t=e[Xr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Gr]||n[Xr]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Jr(e);null!==e;){if(n=e[Xr])return n;e=Jr(e)}return t}n=(e=n).parentNode}return null}function ni(e){return!(e=e[Xr]||e[Gr])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function ri(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(l(33))}function ii(e){return e[Zr]||null}function ai(e){var t=e[ei];return void 0===t&&(t=e[ei]=new Set),t}var li=[],oi=-1;function si(e){return{current:e}}function ui(e){0>oi||(e.current=li[oi],li[oi]=null,oi--)}function ci(e,t){oi++,li[oi]=e.current,e.current=t}var di={},fi=si(di),hi=si(!1),pi=di;function mi(e,t){var n=e.type.contextTypes;if(!n)return di;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,a={};for(i in n)a[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function gi(e){return null!=e.childContextTypes}function yi(){ui(hi),ui(fi)}function vi(e,t,n){if(fi.current!==di)throw Error(l(168));ci(fi,t),ci(hi,n)}function bi(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var a in r=r.getChildContext())if(!(a in e))throw Error(l(108,q(t)||"Unknown",a));return i({},n,r)}function _i(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||di,pi=fi.current,ci(fi,e),ci(hi,hi.current),!0}function wi(e,t,n){var r=e.stateNode;if(!r)throw Error(l(169));n?(e=bi(e,t,pi),r.__reactInternalMemoizedMergedChildContext=e,ui(hi),ui(fi),ci(fi,e)):ui(hi),ci(hi,n)}var xi=null,ki=null,Si=a.unstable_runWithPriority,Ei=a.unstable_scheduleCallback,Ci=a.unstable_cancelCallback,Ni=a.unstable_shouldYield,Pi=a.unstable_requestPaint,Mi=a.unstable_now,Li=a.unstable_getCurrentPriorityLevel,Oi=a.unstable_ImmediatePriority,Ti=a.unstable_UserBlockingPriority,zi=a.unstable_NormalPriority,Ii=a.unstable_LowPriority,Di=a.unstable_IdlePriority,Ri={},Fi=void 0!==Pi?Pi:function(){},ji=null,Ai=null,Ui=!1,Bi=Mi(),$i=1e4>Bi?Mi:function(){return Mi()-Bi};function Wi(){switch(Li()){case Oi:return 99;case Ti:return 98;case zi:return 97;case Ii:return 96;case Di:return 95;default:throw Error(l(332))}}function Hi(e){switch(e){case 99:return Oi;case 98:return Ti;case 97:return zi;case 96:return Ii;case 95:return Di;default:throw Error(l(332))}}function Vi(e,t){return e=Hi(e),Si(e,t)}function Qi(e,t,n){return e=Hi(e),Ei(e,t,n)}function qi(){if(null!==Ai){var e=Ai;Ai=null,Ci(e)}Ji()}function Ji(){if(!Ui&&null!==ji){Ui=!0;var e=0;try{var t=ji;Vi(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),ji=null}catch(t){throw null!==ji&&(ji=ji.slice(e+1)),Ei(Oi,qi),t}finally{Ui=!1}}}var Ki=w.ReactCurrentBatchConfig;function Yi(e,t){if(e&&e.defaultProps){for(var n in t=i({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}var Xi=si(null),Zi=null,Gi=null,ea=null;function ta(){ea=Gi=Zi=null}function na(e){var t=Xi.current;ui(Xi),e.type._context._currentValue=t}function ra(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function ia(e,t){Zi=e,ea=Gi=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!=(e.lanes&t)&&(Dl=!0),e.firstContext=null)}function aa(e,t){if(ea!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(ea=e,t=1073741823),t={context:e,observedBits:t,next:null},null===Gi){if(null===Zi)throw Error(l(308));Gi=t,Zi.dependencies={lanes:0,firstContext:t,responders:null}}else Gi=Gi.next=t;return e._currentValue}var la=!1;function oa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function sa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ua(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ca(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function da(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,a=null;if(null!==(n=n.firstBaseUpdate)){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===a?i=a=l:a=a.next=l,n=n.next}while(null!==n);null===a?i=a=t:a=a.next=t}else i=a=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fa(e,t,n,r){var a=e.updateQueue;la=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(null!==s){a.shared.pending=null;var u=s,c=u.next;u.next=null,null===o?l=c:o.next=c,o=u;var d=e.alternate;if(null!==d){var f=(d=d.updateQueue).lastBaseUpdate;f!==o&&(null===f?d.firstBaseUpdate=c:f.next=c,d.lastBaseUpdate=u)}}if(null!==l){for(f=a.baseState,o=0,d=c=u=null;;){s=l.lane;var h=l.eventTime;if((r&s)===s){null!==d&&(d=d.next={eventTime:h,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var p=e,m=l;switch(s=t,h=n,m.tag){case 1:if("function"==typeof(p=m.payload)){f=p.call(h,f,s);break e}f=p;break e;case 3:p.flags=-4097&p.flags|64;case 0:if(null==(s="function"==typeof(p=m.payload)?p.call(h,f,s):p))break e;f=i({},f,s);break e;case 2:la=!0}}null!==l.callback&&(e.flags|=32,null===(s=a.effects)?a.effects=[l]:s.push(l))}else h={eventTime:h,lane:s,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===d?(c=d=h,u=f):d=d.next=h,o|=s;if(null===(l=l.next)){if(null===(s=a.shared.pending))break;l=s.next,s.next=null,a.lastBaseUpdate=s,a.shared.pending=null}}null===d&&(u=f),a.baseState=u,a.firstBaseUpdate=c,a.lastBaseUpdate=d,Ao|=o,e.lanes=o,e.memoizedState=f}}function ha(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!=typeof i)throw Error(l(191,i));i.call(r)}}}var pa=(new r.Component).refs;function ma(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:i({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var ga={isMounted:function(e){return!!(e=e._reactInternals)&&Ke(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=cs(),i=ds(e),a=ua(r,i);a.payload=t,null!=n&&(a.callback=n),ca(e,a),fs(e,i,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=cs(),i=ds(e),a=ua(r,i);a.tag=1,a.payload=t,null!=n&&(a.callback=n),ca(e,a),fs(e,i,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=cs(),r=ds(e),i=ua(n,r);i.tag=2,null!=t&&(i.callback=t),ca(e,i),fs(e,r,n)}};function ya(e,t,n,r,i,a,l){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,a,l):!(t.prototype&&t.prototype.isPureReactComponent&&dr(n,r)&&dr(i,a))}function va(e,t,n){var r=!1,i=di,a=t.contextType;return"object"==typeof a&&null!==a?a=aa(a):(i=gi(t)?pi:fi.current,a=(r=null!=(r=t.contextTypes))?mi(e,i):di),t=new t(n,a),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=ga,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function ba(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ga.enqueueReplaceState(t,t.state,null)}function _a(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs=pa,oa(e);var a=t.contextType;"object"==typeof a&&null!==a?i.context=aa(a):(a=gi(t)?pi:fi.current,i.context=mi(e,a)),fa(e,n,i,r),i.state=e.memoizedState,"function"==typeof(a=t.getDerivedStateFromProps)&&(ma(e,t,a,n),i.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof i.getSnapshotBeforeUpdate||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||(t=i.state,"function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&ga.enqueueReplaceState(i,i.state,null),fa(e,n,i,r),i.state=e.memoizedState),"function"==typeof i.componentDidMount&&(e.flags|=4)}var wa=Array.isArray;function xa(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(l(309));var r=n.stateNode}if(!r)throw Error(l(147,e));var i=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===i?t.ref:(t=function(e){var t=r.refs;t===pa&&(t=r.refs={}),null===e?delete t[i]:t[i]=e},t._stringRef=i,t)}if("string"!=typeof e)throw Error(l(284));if(!n._owner)throw Error(l(290,e))}return e}function ka(e,t){if("textarea"!==e.type)throw Error(l(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Sa(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=Hs(e,t)).index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function o(t){return e&&null===t.alternate&&(t.flags=2),t}function s(e,t,n,r){return null===t||6!==t.tag?((t=Js(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function u(e,t,n,r){return null!==t&&t.elementType===n.type?((r=i(t,n.props)).ref=xa(e,t,n),r.return=e,r):((r=Vs(n.type,n.key,n.props,null,e.mode,r)).ref=xa(e,t,n),r.return=e,r)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Ks(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function d(e,t,n,r,a){return null===t||7!==t.tag?((t=Qs(n,e.mode,r,a)).return=e,t):((t=i(t,n)).return=e,t)}function f(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=Js(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case x:return(n=Vs(t.type,t.key,t.props,null,e.mode,n)).ref=xa(e,null,t),n.return=e,n;case k:return(t=Ks(t,e.mode,n)).return=e,t}if(wa(t)||$(t))return(t=Qs(t,e.mode,n,null)).return=e,t;ka(e,t)}return null}function h(e,t,n,r){var i=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==i?null:s(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case x:return n.key===i?n.type===S?d(e,t,n.props.children,r,i):u(e,t,n,r):null;case k:return n.key===i?c(e,t,n,r):null}if(wa(n)||$(n))return null!==i?null:d(e,t,n,r,null);ka(e,n)}return null}function p(e,t,n,r,i){if("string"==typeof r||"number"==typeof r)return s(t,e=e.get(n)||null,""+r,i);if("object"==typeof r&&null!==r){switch(r.$$typeof){case x:return e=e.get(null===r.key?n:r.key)||null,r.type===S?d(t,e,r.props.children,i,r.key):u(t,e,r,i);case k:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i)}if(wa(r)||$(r))return d(t,e=e.get(n)||null,r,i,null);ka(t,r)}return null}function m(i,l,o,s){for(var u=null,c=null,d=l,m=l=0,g=null;null!==d&&m<o.length;m++){d.index>m?(g=d,d=null):g=d.sibling;var y=h(i,d,o[m],s);if(null===y){null===d&&(d=g);break}e&&d&&null===y.alternate&&t(i,d),l=a(y,l,m),null===c?u=y:c.sibling=y,c=y,d=g}if(m===o.length)return n(i,d),u;if(null===d){for(;m<o.length;m++)null!==(d=f(i,o[m],s))&&(l=a(d,l,m),null===c?u=d:c.sibling=d,c=d);return u}for(d=r(i,d);m<o.length;m++)null!==(g=p(d,i,m,o[m],s))&&(e&&null!==g.alternate&&d.delete(null===g.key?m:g.key),l=a(g,l,m),null===c?u=g:c.sibling=g,c=g);return e&&d.forEach((function(e){return t(i,e)})),u}function g(i,o,s,u){var c=$(s);if("function"!=typeof c)throw Error(l(150));if(null==(s=c.call(s)))throw Error(l(151));for(var d=c=null,m=o,g=o=0,y=null,v=s.next();null!==m&&!v.done;g++,v=s.next()){m.index>g?(y=m,m=null):y=m.sibling;var b=h(i,m,v.value,u);if(null===b){null===m&&(m=y);break}e&&m&&null===b.alternate&&t(i,m),o=a(b,o,g),null===d?c=b:d.sibling=b,d=b,m=y}if(v.done)return n(i,m),c;if(null===m){for(;!v.done;g++,v=s.next())null!==(v=f(i,v.value,u))&&(o=a(v,o,g),null===d?c=v:d.sibling=v,d=v);return c}for(m=r(i,m);!v.done;g++,v=s.next())null!==(v=p(m,i,g,v.value,u))&&(e&&null!==v.alternate&&m.delete(null===v.key?g:v.key),o=a(v,o,g),null===d?c=v:d.sibling=v,d=v);return e&&m.forEach((function(e){return t(i,e)})),c}return function(e,r,a,s){var u="object"==typeof a&&null!==a&&a.type===S&&null===a.key;u&&(a=a.props.children);var c="object"==typeof a&&null!==a;if(c)switch(a.$$typeof){case x:e:{for(c=a.key,u=r;null!==u;){if(u.key===c){if(7===u.tag){if(a.type===S){n(e,u.sibling),(r=i(u,a.props.children)).return=e,e=r;break e}}else if(u.elementType===a.type){n(e,u.sibling),(r=i(u,a.props)).ref=xa(e,u,a),r.return=e,e=r;break e}n(e,u);break}t(e,u),u=u.sibling}a.type===S?((r=Qs(a.props.children,e.mode,s,a.key)).return=e,e=r):((s=Vs(a.type,a.key,a.props,null,e.mode,s)).ref=xa(e,r,a),s.return=e,e=s)}return o(e);case k:e:{for(u=a.key;null!==r;){if(r.key===u){if(4===r.tag&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),(r=i(r,a.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Ks(a,e.mode,s)).return=e,e=r}return o(e)}if("string"==typeof a||"number"==typeof a)return a=""+a,null!==r&&6===r.tag?(n(e,r.sibling),(r=i(r,a)).return=e,e=r):(n(e,r),(r=Js(a,e.mode,s)).return=e,e=r),o(e);if(wa(a))return m(e,r,a,s);if($(a))return g(e,r,a,s);if(c&&ka(e,a),void 0===a&&!u)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(l(152,q(e.type)||"Component"))}return n(e,r)}}var Ea=Sa(!0),Ca=Sa(!1),Na={},Pa=si(Na),Ma=si(Na),La=si(Na);function Oa(e){if(e===Na)throw Error(l(174));return e}function Ta(e,t){switch(ci(La,t),ci(Ma,e),ci(Pa,Na),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:he(null,"");break;default:t=he(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}ui(Pa),ci(Pa,t)}function za(){ui(Pa),ui(Ma),ui(La)}function Ia(e){Oa(La.current);var t=Oa(Pa.current),n=he(t,e.type);t!==n&&(ci(Ma,e),ci(Pa,n))}function Da(e){Ma.current===e&&(ui(Pa),ui(Ma))}var Ra=si(0);function Fa(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ja=null,Aa=null,Ua=!1;function Ba(e,t){var n=$s(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function $a(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);default:return!1}}function Wa(e){if(Ua){var t=Aa;if(t){var n=t;if(!$a(e,t)){if(!(t=qr(n.nextSibling))||!$a(e,t))return e.flags=-1025&e.flags|2,Ua=!1,void(ja=e);Ba(ja,n)}ja=e,Aa=qr(t.firstChild)}else e.flags=-1025&e.flags|2,Ua=!1,ja=e}}function Ha(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;ja=e}function Va(e){if(e!==ja)return!1;if(!Ua)return Ha(e),Ua=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!Wr(t,e.memoizedProps))for(t=Aa;t;)Ba(e,t),t=qr(t.nextSibling);if(Ha(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(l(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){Aa=qr(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}Aa=null}}else Aa=ja?qr(e.stateNode.nextSibling):null;return!0}function Qa(){Aa=ja=null,Ua=!1}var qa=[];function Ja(){for(var e=0;e<qa.length;e++)qa[e]._workInProgressVersionPrimary=null;qa.length=0}var Ka=w.ReactCurrentDispatcher,Ya=w.ReactCurrentBatchConfig,Xa=0,Za=null,Ga=null,el=null,tl=!1,nl=!1;function rl(){throw Error(l(321))}function il(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ur(e[n],t[n]))return!1;return!0}function al(e,t,n,r,i,a){if(Xa=a,Za=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ka.current=null===e||null===e.memoizedState?Ol:Tl,e=n(r,i),nl){a=0;do{if(nl=!1,!(25>a))throw Error(l(301));a+=1,el=Ga=null,t.updateQueue=null,Ka.current=zl,e=n(r,i)}while(nl)}if(Ka.current=Ll,t=null!==Ga&&null!==Ga.next,Xa=0,el=Ga=Za=null,tl=!1,t)throw Error(l(300));return e}function ll(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===el?Za.memoizedState=el=e:el=el.next=e,el}function ol(){if(null===Ga){var e=Za.alternate;e=null!==e?e.memoizedState:null}else e=Ga.next;var t=null===el?Za.memoizedState:el.next;if(null!==t)el=t,Ga=e;else{if(null===e)throw Error(l(310));e={memoizedState:(Ga=e).memoizedState,baseState:Ga.baseState,baseQueue:Ga.baseQueue,queue:Ga.queue,next:null},null===el?Za.memoizedState=el=e:el=el.next=e}return el}function sl(e,t){return"function"==typeof t?t(e):t}function ul(e){var t=ol(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=Ga,i=r.baseQueue,a=n.pending;if(null!==a){if(null!==i){var o=i.next;i.next=a.next,a.next=o}r.baseQueue=i=a,n.pending=null}if(null!==i){i=i.next,r=r.baseState;var s=o=a=null,u=i;do{var c=u.lane;if((Xa&c)===c)null!==s&&(s=s.next={lane:0,action:u.action,eagerReducer:u.eagerReducer,eagerState:u.eagerState,next:null}),r=u.eagerReducer===e?u.eagerState:e(r,u.action);else{var d={lane:c,action:u.action,eagerReducer:u.eagerReducer,eagerState:u.eagerState,next:null};null===s?(o=s=d,a=r):s=s.next=d,Za.lanes|=c,Ao|=c}u=u.next}while(null!==u&&u!==i);null===s?a=r:s.next=o,ur(r,t.memoizedState)||(Dl=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=s,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function cl(e){var t=ol(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(null!==i){n.pending=null;var o=i=i.next;do{a=e(a,o.action),o=o.next}while(o!==i);ur(a,t.memoizedState)||(Dl=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function dl(e,t,n){var r=t._getVersion;r=r(t._source);var i=t._workInProgressVersionPrimary;if(null!==i?e=i===r:(e=e.mutableReadLanes,(e=(Xa&e)===e)&&(t._workInProgressVersionPrimary=r,qa.push(t))),e)return n(t._source);throw qa.push(t),Error(l(350))}function fl(e,t,n,r){var i=Oo;if(null===i)throw Error(l(349));var a=t._getVersion,o=a(t._source),s=Ka.current,u=s.useState((function(){return dl(i,t,n)})),c=u[1],d=u[0];u=el;var f=e.memoizedState,h=f.refs,p=h.getSnapshot,m=f.source;f=f.subscribe;var g=Za;return e.memoizedState={refs:h,source:t,subscribe:r},s.useEffect((function(){h.getSnapshot=n,h.setSnapshot=c;var e=a(t._source);if(!ur(o,e)){e=n(t._source),ur(d,e)||(c(e),e=ds(g),i.mutableReadLanes|=e&i.pendingLanes),e=i.mutableReadLanes,i.entangledLanes|=e;for(var r=i.entanglements,l=e;0<l;){var s=31-Wt(l),u=1<<s;r[s]|=e,l&=~u}}}),[n,t,r]),s.useEffect((function(){return r(t._source,(function(){var e=h.getSnapshot,n=h.setSnapshot;try{n(e(t._source));var r=ds(g);i.mutableReadLanes|=r&i.pendingLanes}catch(e){n((function(){throw e}))}}))}),[t,r]),ur(p,n)&&ur(m,t)&&ur(f,r)||((e={pending:null,dispatch:null,lastRenderedReducer:sl,lastRenderedState:d}).dispatch=c=Ml.bind(null,Za,e),u.queue=e,u.baseQueue=null,d=dl(i,t,n),u.memoizedState=u.baseState=d),d}function hl(e,t,n){return fl(ol(),e,t,n)}function pl(e){var t=ll();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:sl,lastRenderedState:e}).dispatch=Ml.bind(null,Za,e),[t.memoizedState,e]}function ml(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=Za.updateQueue)?(t={lastEffect:null},Za.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function gl(e){return e={current:e},ll().memoizedState=e}function yl(){return ol().memoizedState}function vl(e,t,n,r){var i=ll();Za.flags|=e,i.memoizedState=ml(1|t,n,void 0,void 0===r?null:r)}function bl(e,t,n,r){var i=ol();r=void 0===r?null:r;var a=void 0;if(null!==Ga){var l=Ga.memoizedState;if(a=l.destroy,null!==r&&il(r,l.deps))return void ml(t,n,a,r)}Za.flags|=e,i.memoizedState=ml(1|t,n,a,r)}function _l(e,t){return vl(516,4,e,t)}function wl(e,t){return bl(516,4,e,t)}function xl(e,t){return bl(4,2,e,t)}function kl(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Sl(e,t,n){return n=null!=n?n.concat([e]):null,bl(4,2,kl.bind(null,t,e),n)}function El(){}function Cl(e,t){var n=ol();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&il(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Nl(e,t){var n=ol();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&il(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Pl(e,t){var n=Wi();Vi(98>n?98:n,(function(){e(!0)})),Vi(97<n?97:n,(function(){var n=Ya.transition;Ya.transition=1;try{e(!1),t()}finally{Ya.transition=n}}))}function Ml(e,t,n){var r=cs(),i=ds(e),a={lane:i,action:n,eagerReducer:null,eagerState:null,next:null},l=t.pending;if(null===l?a.next=a:(a.next=l.next,l.next=a),t.pending=a,l=e.alternate,e===Za||null!==l&&l===Za)nl=tl=!0;else{if(0===e.lanes&&(null===l||0===l.lanes)&&null!==(l=t.lastRenderedReducer))try{var o=t.lastRenderedState,s=l(o,n);if(a.eagerReducer=l,a.eagerState=s,ur(s,o))return}catch(e){}fs(e,i,r)}}var Ll={readContext:aa,useCallback:rl,useContext:rl,useEffect:rl,useImperativeHandle:rl,useLayoutEffect:rl,useMemo:rl,useReducer:rl,useRef:rl,useState:rl,useDebugValue:rl,useDeferredValue:rl,useTransition:rl,useMutableSource:rl,useOpaqueIdentifier:rl,unstable_isNewReconciler:!1},Ol={readContext:aa,useCallback:function(e,t){return ll().memoizedState=[e,void 0===t?null:t],e},useContext:aa,useEffect:_l,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,vl(4,2,kl.bind(null,t,e),n)},useLayoutEffect:function(e,t){return vl(4,2,e,t)},useMemo:function(e,t){var n=ll();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ll();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=Ml.bind(null,Za,e),[r.memoizedState,e]},useRef:gl,useState:pl,useDebugValue:El,useDeferredValue:function(e){var t=pl(e),n=t[0],r=t[1];return _l((function(){var t=Ya.transition;Ya.transition=1;try{r(e)}finally{Ya.transition=t}}),[e]),n},useTransition:function(){var e=pl(!1),t=e[0];return gl(e=Pl.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=ll();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},fl(r,e,t,n)},useOpaqueIdentifier:function(){if(Ua){var e=!1,t=function(e){return{$$typeof:D,toString:e,valueOf:e}}((function(){throw e||(e=!0,n("r:"+(Kr++).toString(36))),Error(l(355))})),n=pl(t)[1];return 0==(2&Za.mode)&&(Za.flags|=516,ml(5,(function(){n("r:"+(Kr++).toString(36))}),void 0,null)),t}return pl(t="r:"+(Kr++).toString(36)),t},unstable_isNewReconciler:!1},Tl={readContext:aa,useCallback:Cl,useContext:aa,useEffect:wl,useImperativeHandle:Sl,useLayoutEffect:xl,useMemo:Nl,useReducer:ul,useRef:yl,useState:function(){return ul(sl)},useDebugValue:El,useDeferredValue:function(e){var t=ul(sl),n=t[0],r=t[1];return wl((function(){var t=Ya.transition;Ya.transition=1;try{r(e)}finally{Ya.transition=t}}),[e]),n},useTransition:function(){var e=ul(sl)[0];return[yl().current,e]},useMutableSource:hl,useOpaqueIdentifier:function(){return ul(sl)[0]},unstable_isNewReconciler:!1},zl={readContext:aa,useCallback:Cl,useContext:aa,useEffect:wl,useImperativeHandle:Sl,useLayoutEffect:xl,useMemo:Nl,useReducer:cl,useRef:yl,useState:function(){return cl(sl)},useDebugValue:El,useDeferredValue:function(e){var t=cl(sl),n=t[0],r=t[1];return wl((function(){var t=Ya.transition;Ya.transition=1;try{r(e)}finally{Ya.transition=t}}),[e]),n},useTransition:function(){var e=cl(sl)[0];return[yl().current,e]},useMutableSource:hl,useOpaqueIdentifier:function(){return cl(sl)[0]},unstable_isNewReconciler:!1},Il=w.ReactCurrentOwner,Dl=!1;function Rl(e,t,n,r){t.child=null===e?Ca(t,null,n,r):Ea(t,e.child,n,r)}function Fl(e,t,n,r,i){n=n.render;var a=t.ref;return ia(t,i),r=al(e,t,n,r,a,i),null===e||Dl?(t.flags|=1,Rl(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~i,no(e,t,i))}function jl(e,t,n,r,i,a){if(null===e){var l=n.type;return"function"!=typeof l||Ws(l)||void 0!==l.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Vs(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=l,Al(e,t,l,r,i,a))}return l=e.child,0==(i&a)&&(i=l.memoizedProps,(n=null!==(n=n.compare)?n:dr)(i,r)&&e.ref===t.ref)?no(e,t,a):(t.flags|=1,(e=Hs(l,r)).ref=t.ref,e.return=t,t.child=e)}function Al(e,t,n,r,i,a){if(null!==e&&dr(e.memoizedProps,r)&&e.ref===t.ref){if(Dl=!1,0==(a&i))return t.lanes=e.lanes,no(e,t,a);0!=(16384&e.flags)&&(Dl=!0)}return $l(e,t,n,r,a)}function Ul(e,t,n){var r=t.pendingProps,i=r.children,a=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0==(4&t.mode))t.memoizedState={baseLanes:0},_s(0,n);else{if(0==(1073741824&n))return e=null!==a?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},_s(0,e),null;t.memoizedState={baseLanes:0},_s(0,null!==a?a.baseLanes:n)}else null!==a?(r=a.baseLanes|n,t.memoizedState=null):r=n,_s(0,r);return Rl(e,t,i,n),t.child}function Bl(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function $l(e,t,n,r,i){var a=gi(n)?pi:fi.current;return a=mi(t,a),ia(t,i),n=al(e,t,n,r,a,i),null===e||Dl?(t.flags|=1,Rl(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~i,no(e,t,i))}function Wl(e,t,n,r,i){if(gi(n)){var a=!0;_i(t)}else a=!1;if(ia(t,i),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),va(t,n,r),_a(t,n,r,i),r=!0;else if(null===e){var l=t.stateNode,o=t.memoizedProps;l.props=o;var s=l.context,u=n.contextType;u="object"==typeof u&&null!==u?aa(u):mi(t,u=gi(n)?pi:fi.current);var c=n.getDerivedStateFromProps,d="function"==typeof c||"function"==typeof l.getSnapshotBeforeUpdate;d||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(o!==r||s!==u)&&ba(t,l,r,u),la=!1;var f=t.memoizedState;l.state=f,fa(t,r,l,i),s=t.memoizedState,o!==r||f!==s||hi.current||la?("function"==typeof c&&(ma(t,n,c,r),s=t.memoizedState),(o=la||ya(t,n,o,r,f,s,u))?(d||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||("function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"==typeof l.componentDidMount&&(t.flags|=4)):("function"==typeof l.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=o):("function"==typeof l.componentDidMount&&(t.flags|=4),r=!1)}else{l=t.stateNode,sa(e,t),o=t.memoizedProps,u=t.type===t.elementType?o:Yi(t.type,o),l.props=u,d=t.pendingProps,f=l.context,s="object"==typeof(s=n.contextType)&&null!==s?aa(s):mi(t,s=gi(n)?pi:fi.current);var h=n.getDerivedStateFromProps;(c="function"==typeof h||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(o!==d||f!==s)&&ba(t,l,r,s),la=!1,f=t.memoizedState,l.state=f,fa(t,r,l,i);var p=t.memoizedState;o!==d||f!==p||hi.current||la?("function"==typeof h&&(ma(t,n,h,r),p=t.memoizedState),(u=la||ya(t,n,u,r,f,p,s))?(c||"function"!=typeof l.UNSAFE_componentWillUpdate&&"function"!=typeof l.componentWillUpdate||("function"==typeof l.componentWillUpdate&&l.componentWillUpdate(r,p,s),"function"==typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,p,s)),"function"==typeof l.componentDidUpdate&&(t.flags|=4),"function"==typeof l.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!=typeof l.componentDidUpdate||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=p),l.props=r,l.state=p,l.context=s,r=u):("function"!=typeof l.componentDidUpdate||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=256),r=!1)}return Hl(e,t,n,r,a,i)}function Hl(e,t,n,r,i,a){Bl(e,t);var l=0!=(64&t.flags);if(!r&&!l)return i&&wi(t,n,!1),no(e,t,a);r=t.stateNode,Il.current=t;var o=l&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&l?(t.child=Ea(t,e.child,null,a),t.child=Ea(t,null,o,a)):Rl(e,t,o,a),t.memoizedState=r.state,i&&wi(t,n,!0),t.child}function Vl(e){var t=e.stateNode;t.pendingContext?vi(0,t.pendingContext,t.pendingContext!==t.context):t.context&&vi(0,t.context,!1),Ta(e,t.containerInfo)}var Ql,ql,Jl,Kl,Yl={dehydrated:null,retryLane:0};function Xl(e,t,n){var r,i=t.pendingProps,a=Ra.current,l=!1;return(r=0!=(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!=(2&a)),r?(l=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===i.fallback||!0===i.unstable_avoidThisFallback||(a|=1),ci(Ra,1&a),null===e?(void 0!==i.fallback&&Wa(t),e=i.children,a=i.fallback,l?(e=Zl(t,e,a,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Yl,e):"number"==typeof i.unstable_expectedLoadTime?(e=Zl(t,e,a,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Yl,t.lanes=33554432,e):((n=qs({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,l?(i=function(e,t,n,r,i){var a=t.mode,l=e.child;e=l.sibling;var o={mode:"hidden",children:n};return 0==(2&a)&&t.child!==l?((n=t.child).childLanes=0,n.pendingProps=o,null!==(l=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=l,l.nextEffect=null):t.firstEffect=t.lastEffect=null):n=Hs(l,o),null!==e?r=Hs(e,r):(r=Qs(r,a,i,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}(e,t,i.children,i.fallback,n),l=t.child,a=e.child.memoizedState,l.memoizedState=null===a?{baseLanes:n}:{baseLanes:a.baseLanes|n},l.childLanes=e.childLanes&~n,t.memoizedState=Yl,i):(n=function(e,t,n,r){var i=e.child;return e=i.sibling,n=Hs(i,{mode:"visible",children:n}),0==(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}(e,t,i.children,n),t.memoizedState=null,n))}function Zl(e,t,n,r){var i=e.mode,a=e.child;return t={mode:"hidden",children:t},0==(2&i)&&null!==a?(a.childLanes=0,a.pendingProps=t):a=qs(t,i,0,null),n=Qs(n,i,r,null),a.return=e,n.return=e,a.sibling=n,e.child=a,n}function Gl(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),ra(e.return,t)}function eo(e,t,n,r,i,a){var l=e.memoizedState;null===l?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,lastEffect:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=i,l.lastEffect=a)}function to(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Rl(e,t,r.children,n),0!=(2&(r=Ra.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!=(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Gl(e,n);else if(19===e.tag)Gl(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ci(Ra,r),0==(2&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===Fa(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),eo(t,!1,i,n,a,t.lastEffect);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===Fa(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}eo(t,!0,n,null,a,t.lastEffect);break;case"together":eo(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function no(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Ao|=t.lanes,0!=(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(l(153));if(null!==t.child){for(n=Hs(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Hs(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function ro(e,t){if(!Ua)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function io(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:case 17:return gi(t.type)&&yi(),null;case 3:return za(),ui(hi),ui(fi),Ja(),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(Va(t)?t.flags|=4:r.hydrate||(t.flags|=256)),ql(t),null;case 5:Da(t);var a=Oa(La.current);if(n=t.type,null!==e&&null!=t.stateNode)Jl(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=128);else{if(!r){if(null===t.stateNode)throw Error(l(166));return null}if(e=Oa(Pa.current),Va(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Xr]=t,r[Zr]=o,n){case"dialog":Mr("cancel",r),Mr("close",r);break;case"iframe":case"object":case"embed":Mr("load",r);break;case"video":case"audio":for(e=0;e<Er.length;e++)Mr(Er[e],r);break;case"source":Mr("error",r);break;case"img":case"image":case"link":Mr("error",r),Mr("load",r);break;case"details":Mr("toggle",r);break;case"input":ee(r,o),Mr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Mr("invalid",r);break;case"textarea":se(r,o),Mr("invalid",r)}for(var u in ke(n,o),e=null,o)o.hasOwnProperty(u)&&(a=o[u],"children"===u?"string"==typeof a?r.textContent!==a&&(e=["children",a]):"number"==typeof a&&r.textContent!==""+a&&(e=["children",""+a]):s.hasOwnProperty(u)&&null!=a&&"onScroll"===u&&Mr("scroll",r));switch(n){case"input":Y(r),re(r,o,!0);break;case"textarea":Y(r),ce(r);break;case"select":case"option":break;default:"function"==typeof o.onClick&&(r.onclick=Ar)}r=e,t.updateQueue=r,null!==r&&(t.flags|=4)}else{switch(u=9===a.nodeType?a:a.ownerDocument,e===de.html&&(e=fe(n)),e===de.html?"script"===n?((e=u.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof r.is?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),"select"===n&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[Xr]=t,e[Zr]=r,Ql(e,t,!1,!1),t.stateNode=e,u=Se(n,r),n){case"dialog":Mr("cancel",e),Mr("close",e),a=r;break;case"iframe":case"object":case"embed":Mr("load",e),a=r;break;case"video":case"audio":for(a=0;a<Er.length;a++)Mr(Er[a],e);a=r;break;case"source":Mr("error",e),a=r;break;case"img":case"image":case"link":Mr("error",e),Mr("load",e),a=r;break;case"details":Mr("toggle",e),a=r;break;case"input":ee(e,r),a=G(e,r),Mr("invalid",e);break;case"option":a=ae(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=i({},r,{value:void 0}),Mr("invalid",e);break;case"textarea":se(e,r),a=oe(e,r),Mr("invalid",e);break;default:a=r}ke(n,a);var c=a;for(o in c)if(c.hasOwnProperty(o)){var d=c[o];"style"===o?we(e,d):"dangerouslySetInnerHTML"===o?null!=(d=d?d.__html:void 0)&&ge(e,d):"children"===o?"string"==typeof d?("textarea"!==n||""!==d)&&ye(e,d):"number"==typeof d&&ye(e,""+d):"suppressContentEditableWarning"!==o&&"suppressHydrationWarning"!==o&&"autoFocus"!==o&&(s.hasOwnProperty(o)?null!=d&&"onScroll"===o&&Mr("scroll",e):null!=d&&_(e,o,d,u))}switch(n){case"input":Y(e),re(e,r,!1);break;case"textarea":Y(e),ce(e);break;case"option":null!=r.value&&e.setAttribute("value",""+J(r.value));break;case"select":e.multiple=!!r.multiple,null!=(o=r.value)?le(e,!!r.multiple,o,!1):null!=r.defaultValue&&le(e,!!r.multiple,r.defaultValue,!0);break;default:"function"==typeof a.onClick&&(e.onclick=Ar)}$r(n,r)&&(t.flags|=4)}null!==t.ref&&(t.flags|=128)}return null;case 6:if(e&&null!=t.stateNode)Kl(e,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(l(166));n=Oa(La.current),Oa(Pa.current),Va(t)?(r=t.stateNode,n=t.memoizedProps,r[Xr]=t,r.nodeValue!==n&&(t.flags|=4)):((r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[Xr]=t,t.stateNode=r)}return null;case 13:return ui(Ra),r=t.memoizedState,0!=(64&t.flags)?(t.lanes=n,t):(r=null!==r,n=!1,null===e?void 0!==t.memoizedProps.fallback&&Va(t):n=null!==e.memoizedState,r&&!n&&0!=(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!=(1&Ra.current)?0===Ro&&(Ro=3):(0!==Ro&&3!==Ro||(Ro=4),null===Oo||0==(134217727&Ao)&&0==(134217727&Uo)||gs(Oo,zo))),(r||n)&&(t.flags|=4),null);case 4:return za(),ql(t),null===e&&Or(t.stateNode.containerInfo),null;case 10:return na(t),null;case 19:if(ui(Ra),null===(r=t.memoizedState))return null;if(o=0!=(64&t.flags),null===(u=r.rendering))if(o)ro(r,!1);else{if(0!==Ro||null!==e&&0!=(64&e.flags))for(e=t.child;null!==e;){if(null!==(u=Fa(e))){for(t.flags|=64,ro(r,!1),null!==(o=u.updateQueue)&&(t.updateQueue=o,t.flags|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=n,n=t.child;null!==n;)e=r,(o=n).flags&=2,o.nextEffect=null,o.firstEffect=null,o.lastEffect=null,null===(u=o.alternate)?(o.childLanes=0,o.lanes=e,o.child=null,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=u.childLanes,o.lanes=u.lanes,o.child=u.child,o.memoizedProps=u.memoizedProps,o.memoizedState=u.memoizedState,o.updateQueue=u.updateQueue,o.type=u.type,e=u.dependencies,o.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ci(Ra,1&Ra.current|2),t.child}e=e.sibling}null!==r.tail&&$i()>Ho&&(t.flags|=64,o=!0,ro(r,!1),t.lanes=33554432)}else{if(!o)if(null!==(e=Fa(u))){if(t.flags|=64,o=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),ro(r,!0),null===r.tail&&"hidden"===r.tailMode&&!u.alternate&&!Ua)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*$i()-r.renderingStartTime>Ho&&1073741824!==n&&(t.flags|=64,o=!0,ro(r,!1),t.lanes=33554432);r.isBackwards?(u.sibling=t.child,t.child=u):(null!==(n=r.last)?n.sibling=u:t.child=u,r.last=u)}return null!==r.tail?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=$i(),n.sibling=null,t=Ra.current,ci(Ra,o?1&t|2:1&t),n):null;case 23:case 24:return ws(),null!==e&&null!==e.memoizedState!=(null!==t.memoizedState)&&"unstable-defer-without-hiding"!==r.mode&&(t.flags|=4),null}throw Error(l(156,t.tag))}function ao(e){switch(e.tag){case 1:gi(e.type)&&yi();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(za(),ui(hi),ui(fi),Ja(),0!=(64&(t=e.flags)))throw Error(l(285));return e.flags=-4097&t|64,e;case 5:return Da(e),null;case 13:return ui(Ra),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return ui(Ra),null;case 4:return za(),null;case 10:return na(e),null;case 23:case 24:return ws(),null;default:return null}}function lo(e,t){try{var n="",r=t;do{n+=Q(r),r=r.return}while(r);var i=n}catch(e){i="\nError generating stack: "+e.message+"\n"+e.stack}return{value:e,source:t,stack:i}}function oo(e,t){try{console.error(t.value)}catch(e){setTimeout((function(){throw e}))}}Ql=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ql=function(){},Jl=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Oa(Pa.current);var l,o=null;switch(n){case"input":a=G(e,a),r=G(e,r),o=[];break;case"option":a=ae(e,a),r=ae(e,r),o=[];break;case"select":a=i({},a,{value:void 0}),r=i({},r,{value:void 0}),o=[];break;case"textarea":a=oe(e,a),r=oe(e,r),o=[];break;default:"function"!=typeof a.onClick&&"function"==typeof r.onClick&&(e.onclick=Ar)}for(d in ke(n,r),n=null,a)if(!r.hasOwnProperty(d)&&a.hasOwnProperty(d)&&null!=a[d])if("style"===d){var u=a[d];for(l in u)u.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else"dangerouslySetInnerHTML"!==d&&"children"!==d&&"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&"autoFocus"!==d&&(s.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in r){var c=r[d];if(u=null!=a?a[d]:void 0,r.hasOwnProperty(d)&&c!==u&&(null!=c||null!=u))if("style"===d)if(u){for(l in u)!u.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&u[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(o||(o=[]),o.push(d,n)),n=c;else"dangerouslySetInnerHTML"===d?(c=c?c.__html:void 0,u=u?u.__html:void 0,null!=c&&u!==c&&(o=o||[]).push(d,c)):"children"===d?"string"!=typeof c&&"number"!=typeof c||(o=o||[]).push(d,""+c):"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&(s.hasOwnProperty(d)?(null!=c&&"onScroll"===d&&Mr("scroll",e),o||u===c||(o=[])):"object"==typeof c&&null!==c&&c.$$typeof===D?c.toString():(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}},Kl=function(e,t,n,r){n!==r&&(t.flags|=4)};var so="function"==typeof WeakMap?WeakMap:Map;function uo(e,t,n){(n=ua(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Jo||(Jo=!0,Ko=r),oo(0,t)},n}function co(e,t,n){(n=ua(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var i=t.value;n.payload=function(){return oo(0,t),r(i)}}var a=e.stateNode;return null!==a&&"function"==typeof a.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===Yo?Yo=new Set([this]):Yo.add(this),oo(0,t));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}var fo="function"==typeof WeakSet?WeakSet:Set;function ho(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){js(e,t)}else t.current=null}function po(e,t){switch(t.tag){case 0:case 11:case 15:case 22:case 5:case 6:case 4:case 17:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:Yi(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&Qr(t.stateNode.containerInfo))}throw Error(l(163))}function mo(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3==(3&e.tag)){var r=e.create;e.destroy=r()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var i=e;r=i.next,0!=(4&(i=i.tag))&&0!=(1&i)&&(Ds(n,e),Is(n,e)),e=r}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(r=n.elementType===n.type?t.memoizedProps:Yi(n.type,t.memoizedProps),e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&ha(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:case 1:e=n.child.stateNode}ha(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&$r(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:case 19:case 17:case 20:case 21:case 23:case 24:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&wt(n)))))}throw Error(l(163))}function go(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"==typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var i=n.memoizedProps.style;i=null!=i&&i.hasOwnProperty("display")?i.display:null,r.style.display=_e("display",i)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function yo(e,t){if(ki&&"function"==typeof ki.onCommitFiberUnmount)try{ki.onCommitFiberUnmount(xi,t)}catch(e){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,i=r.destroy;if(r=r.tag,void 0!==i)if(0!=(4&r))Ds(t,n);else{r=t;try{i()}catch(e){js(r,e)}}n=n.next}while(n!==e)}break;case 1:if(ho(t),"function"==typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(e){js(t,e)}break;case 5:ho(t);break;case 4:ko(e,t)}}function vo(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function bo(e){return 5===e.tag||3===e.tag||4===e.tag}function _o(e){e:{for(var t=e.return;null!==t;){if(bo(t))break e;t=t.return}throw Error(l(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(l(161))}16&n.flags&&(ye(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||bo(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}r?wo(e,n,t):xo(e,n,t)}function wo(e,t,n){var r=e.tag,i=5===r||6===r;if(i)e=i?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=Ar));else if(4!==r&&null!==(e=e.child))for(wo(e,t,n),e=e.sibling;null!==e;)wo(e,t,n),e=e.sibling}function xo(e,t,n){var r=e.tag,i=5===r||6===r;if(i)e=i?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(xo(e,t,n),e=e.sibling;null!==e;)xo(e,t,n),e=e.sibling}function ko(e,t){for(var n,r,i=t,a=!1;;){if(!a){a=i.return;e:for(;;){if(null===a)throw Error(l(160));switch(n=a.stateNode,a.tag){case 5:r=!1;break e;case 3:case 4:n=n.containerInfo,r=!0;break e}a=a.return}a=!0}if(5===i.tag||6===i.tag){e:for(var o=e,s=i,u=s;;)if(yo(o,u),null!==u.child&&4!==u.tag)u.child.return=u,u=u.child;else{if(u===s)break e;for(;null===u.sibling;){if(null===u.return||u.return===s)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}r?(o=n,s=i.stateNode,8===o.nodeType?o.parentNode.removeChild(s):o.removeChild(s)):n.removeChild(i.stateNode)}else if(4===i.tag){if(null!==i.child){n=i.stateNode.containerInfo,r=!0,i.child.return=i,i=i.child;continue}}else if(yo(e,i),null!==i.child){i.child.return=i,i=i.child;continue}if(i===t)break;for(;null===i.sibling;){if(null===i.return||i.return===t)return;4===(i=i.return).tag&&(a=!1)}i.sibling.return=i.return,i=i.sibling}}function So(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var r=n=n.next;do{3==(3&r.tag)&&(e=r.destroy,r.destroy=void 0,void 0!==e&&e()),r=r.next}while(r!==n)}return;case 1:case 12:case 17:return;case 5:if(null!=(n=t.stateNode)){r=t.memoizedProps;var i=null!==e?e.memoizedProps:r;e=t.type;var a=t.updateQueue;if(t.updateQueue=null,null!==a){for(n[Zr]=r,"input"===e&&"radio"===r.type&&null!=r.name&&te(n,r),Se(e,i),t=Se(e,r),i=0;i<a.length;i+=2){var o=a[i],s=a[i+1];"style"===o?we(n,s):"dangerouslySetInnerHTML"===o?ge(n,s):"children"===o?ye(n,s):_(n,o,s,t)}switch(e){case"input":ne(n,r);break;case"textarea":ue(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(a=r.value)?le(n,!!r.multiple,a,!1):e!==!!r.multiple&&(null!=r.defaultValue?le(n,!!r.multiple,r.defaultValue,!0):le(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(l(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,wt(n.containerInfo)));case 13:return null!==t.memoizedState&&(Wo=$i(),go(t.child,!0)),void Eo(t);case 19:return void Eo(t);case 23:case 24:return void go(t,null!==t.memoizedState)}throw Error(l(163))}function Eo(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new fo),t.forEach((function(t){var r=Us.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function Co(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&null!==(t=t.memoizedState)&&null===t.dehydrated}var No=Math.ceil,Po=w.ReactCurrentDispatcher,Mo=w.ReactCurrentOwner,Lo=0,Oo=null,To=null,zo=0,Io=0,Do=si(0),Ro=0,Fo=null,jo=0,Ao=0,Uo=0,Bo=0,$o=null,Wo=0,Ho=1/0;function Vo(){Ho=$i()+500}var Qo,qo=null,Jo=!1,Ko=null,Yo=null,Xo=!1,Zo=null,Go=90,es=[],ts=[],ns=null,rs=0,is=null,as=-1,ls=0,os=0,ss=null,us=!1;function cs(){return 0!=(48&Lo)?$i():-1!==as?as:as=$i()}function ds(e){if(0==(2&(e=e.mode)))return 1;if(0==(4&e))return 99===Wi()?1:2;if(0===ls&&(ls=jo),0!==Ki.transition){0!==os&&(os=null!==$o?$o.pendingLanes:0),e=ls;var t=4186112&~os;return 0==(t&=-t)&&0==(t=(e=4186112&~e)&-e)&&(t=8192),t}return e=Wi(),e=At(0!=(4&Lo)&&98===e?12:e=function(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}(e),ls)}function fs(e,t,n){if(50<rs)throw rs=0,is=null,Error(l(185));if(null===(e=hs(e,t)))return null;$t(e,t,n),e===Oo&&(Uo|=t,4===Ro&&gs(e,zo));var r=Wi();1===t?0!=(8&Lo)&&0==(48&Lo)?ys(e):(ps(e,n),0===Lo&&(Vo(),qi())):(0==(4&Lo)||98!==r&&99!==r||(null===ns?ns=new Set([e]):ns.add(e)),ps(e,n)),$o=e}function hs(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function ps(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Wt(o),u=1<<s,c=a[s];if(-1===c){if(0==(u&r)||0!=(u&i)){c=t,Rt(u);var d=Dt;a[s]=10<=d?c+250:6<=d?c+5e3:-1}}else c<=t&&(e.expiredLanes|=u);o&=~u}if(r=Ft(e,e===Oo?zo:0),t=Dt,0===r)null!==n&&(n!==Ri&&Ci(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==Ri&&Ci(n)}15===t?(n=ys.bind(null,e),null===ji?(ji=[n],Ai=Ei(Oi,Ji)):ji.push(n),n=Ri):14===t?n=Qi(99,ys.bind(null,e)):(n=function(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(l(358,e))}}(t),n=Qi(n,ms.bind(null,e))),e.callbackPriority=t,e.callbackNode=n}}function ms(e){if(as=-1,os=ls=0,0!=(48&Lo))throw Error(l(327));var t=e.callbackNode;if(zs()&&e.callbackNode!==t)return null;var n=Ft(e,e===Oo?zo:0);if(0===n)return null;var r=n,i=Lo;Lo|=16;var a=Ss();for(Oo===e&&zo===r||(Vo(),xs(e,r));;)try{Ns();break}catch(t){ks(e,t)}if(ta(),Po.current=a,Lo=i,null!==To?r=0:(Oo=null,zo=0,r=Ro),0!=(jo&Uo))xs(e,0);else if(0!==r){if(2===r&&(Lo|=64,e.hydrate&&(e.hydrate=!1,Qr(e.containerInfo)),0!==(n=jt(e))&&(r=Es(e,n))),1===r)throw t=Fo,xs(e,0),gs(e,n),ps(e,$i()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,r){case 0:case 1:throw Error(l(345));case 2:case 5:Ls(e);break;case 3:if(gs(e,n),(62914560&n)===n&&10<(r=Wo+500-$i())){if(0!==Ft(e,0))break;if(((i=e.suspendedLanes)&n)!==n){cs(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Hr(Ls.bind(null,e),r);break}Ls(e);break;case 4:if(gs(e,n),(4186112&n)===n)break;for(r=e.eventTimes,i=-1;0<n;){var o=31-Wt(n);a=1<<o,(o=r[o])>i&&(i=o),n&=~a}if(n=i,10<(n=(120>(n=$i()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*No(n/1960))-n)){e.timeoutHandle=Hr(Ls.bind(null,e),n);break}Ls(e);break;default:throw Error(l(329))}}return ps(e,$i()),e.callbackNode===t?ms.bind(null,e):null}function gs(e,t){for(t&=~Bo,t&=~Uo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Wt(t),r=1<<n;e[n]=-1,t&=~r}}function ys(e){if(0!=(48&Lo))throw Error(l(327));if(zs(),e===Oo&&0!=(e.expiredLanes&zo)){var t=zo,n=Es(e,t);0!=(jo&Uo)&&(n=Es(e,t=Ft(e,t)))}else n=Es(e,t=Ft(e,0));if(0!==e.tag&&2===n&&(Lo|=64,e.hydrate&&(e.hydrate=!1,Qr(e.containerInfo)),0!==(t=jt(e))&&(n=Es(e,t))),1===n)throw n=Fo,xs(e,0),gs(e,t),ps(e,$i()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ls(e),ps(e,$i()),null}function vs(e,t){var n=Lo;Lo|=1;try{return e(t)}finally{0===(Lo=n)&&(Vo(),qi())}}function bs(e,t){var n=Lo;Lo&=-2,Lo|=8;try{return e(t)}finally{0===(Lo=n)&&(Vo(),qi())}}function _s(e,t){ci(Do,Io),Io|=t,jo|=t}function ws(){Io=Do.current,ui(Do)}function xs(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,Vr(n)),null!==To)for(n=To.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&yi();break;case 3:za(),ui(hi),ui(fi),Ja();break;case 5:Da(r);break;case 4:za();break;case 13:case 19:ui(Ra);break;case 10:na(r);break;case 23:case 24:ws()}n=n.return}Oo=e,To=Hs(e.current,null),zo=Io=jo=t,Ro=0,Fo=null,Bo=Uo=Ao=0}function ks(e,t){for(;;){var n=To;try{if(ta(),Ka.current=Ll,tl){for(var r=Za.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}tl=!1}if(Xa=0,el=Ga=Za=null,nl=!1,Mo.current=null,null===n||null===n.return){Ro=1,Fo=t,To=null;break}e:{var a=e,l=n.return,o=n,s=t;if(t=zo,o.flags|=2048,o.firstEffect=o.lastEffect=null,null!==s&&"object"==typeof s&&"function"==typeof s.then){var u=s;if(0==(2&o.mode)){var c=o.alternate;c?(o.updateQueue=c.updateQueue,o.memoizedState=c.memoizedState,o.lanes=c.lanes):(o.updateQueue=null,o.memoizedState=null)}var d=0!=(1&Ra.current),f=l;do{var h;if(h=13===f.tag){var p=f.memoizedState;if(null!==p)h=null!==p.dehydrated;else{var m=f.memoizedProps;h=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!d)}}if(h){var g=f.updateQueue;if(null===g){var y=new Set;y.add(u),f.updateQueue=y}else g.add(u);if(0==(2&f.mode)){if(f.flags|=64,o.flags|=16384,o.flags&=-2981,1===o.tag)if(null===o.alternate)o.tag=17;else{var v=ua(-1,1);v.tag=2,ca(o,v)}o.lanes|=1;break e}s=void 0,o=t;var b=a.pingCache;if(null===b?(b=a.pingCache=new so,s=new Set,b.set(u,s)):void 0===(s=b.get(u))&&(s=new Set,b.set(u,s)),!s.has(o)){s.add(o);var _=As.bind(null,a,u,o);u.then(_,_)}f.flags|=4096,f.lanes=t;break e}f=f.return}while(null!==f);s=Error((q(o.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==Ro&&(Ro=2),s=lo(s,o),f=l;do{switch(f.tag){case 3:a=s,f.flags|=4096,t&=-t,f.lanes|=t,da(f,uo(0,a,t));break e;case 1:a=s;var w=f.type,x=f.stateNode;if(0==(64&f.flags)&&("function"==typeof w.getDerivedStateFromError||null!==x&&"function"==typeof x.componentDidCatch&&(null===Yo||!Yo.has(x)))){f.flags|=4096,t&=-t,f.lanes|=t,da(f,co(f,a,t));break e}}f=f.return}while(null!==f)}Ms(n)}catch(e){t=e,To===n&&null!==n&&(To=n=n.return);continue}break}}function Ss(){var e=Po.current;return Po.current=Ll,null===e?Ll:e}function Es(e,t){var n=Lo;Lo|=16;var r=Ss();for(Oo===e&&zo===t||xs(e,t);;)try{Cs();break}catch(t){ks(e,t)}if(ta(),Lo=n,Po.current=r,null!==To)throw Error(l(261));return Oo=null,zo=0,Ro}function Cs(){for(;null!==To;)Ps(To)}function Ns(){for(;null!==To&&!Ni();)Ps(To)}function Ps(e){var t=Qo(e.alternate,e,Io);e.memoizedProps=e.pendingProps,null===t?Ms(e):To=t,Mo.current=null}function Ms(e){var t=e;do{var n=t.alternate;if(e=t.return,0==(2048&t.flags)){if(null!==(n=io(n,t,Io)))return void(To=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!=(1073741824&Io)||0==(4&n.mode)){for(var r=0,i=n.child;null!==i;)r|=i.lanes|i.childLanes,i=i.sibling;n.childLanes=r}null!==e&&0==(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=ao(t)))return n.flags&=2047,void(To=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(To=t);To=t=e}while(null!==t);0===Ro&&(Ro=5)}function Ls(e){var t=Wi();return Vi(99,Os.bind(null,e,t)),null}function Os(e,t){do{zs()}while(null!==Zo);if(0!=(48&Lo))throw Error(l(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(l(177));e.callbackNode=null;var r=n.lanes|n.childLanes,i=r,a=e.pendingLanes&~i;e.pendingLanes=i,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=i,e.mutableReadLanes&=i,e.entangledLanes&=i,i=e.entanglements;for(var o=e.eventTimes,s=e.expirationTimes;0<a;){var u=31-Wt(a),c=1<<u;i[u]=0,o[u]=-1,s[u]=-1,a&=~c}if(null!==ns&&0==(24&r)&&ns.has(e)&&ns.delete(e),e===Oo&&(To=Oo=null,zo=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,r=n.firstEffect):r=n:r=n.firstEffect,null!==r){if(i=Lo,Lo|=32,Mo.current=null,Ur=Jt,gr(o=mr())){if("selectionStart"in o)s={start:o.selectionStart,end:o.selectionEnd};else e:if(s=(s=o.ownerDocument)&&s.defaultView||window,(c=s.getSelection&&s.getSelection())&&0!==c.rangeCount){s=c.anchorNode,a=c.anchorOffset,u=c.focusNode,c=c.focusOffset;try{s.nodeType,u.nodeType}catch(e){s=null;break e}var d=0,f=-1,h=-1,p=0,m=0,g=o,y=null;t:for(;;){for(var v;g!==s||0!==a&&3!==g.nodeType||(f=d+a),g!==u||0!==c&&3!==g.nodeType||(h=d+c),3===g.nodeType&&(d+=g.nodeValue.length),null!==(v=g.firstChild);)y=g,g=v;for(;;){if(g===o)break t;if(y===s&&++p===a&&(f=d),y===u&&++m===c&&(h=d),null!==(v=g.nextSibling))break;y=(g=y).parentNode}g=v}s=-1===f||-1===h?null:{start:f,end:h}}else s=null;s=s||{start:0,end:0}}else s=null;Br={focusedElem:o,selectionRange:s},Jt=!1,ss=null,us=!1,qo=r;do{try{Ts()}catch(e){if(null===qo)throw Error(l(330));js(qo,e),qo=qo.nextEffect}}while(null!==qo);ss=null,qo=r;do{try{for(o=e;null!==qo;){var b=qo.flags;if(16&b&&ye(qo.stateNode,""),128&b){var _=qo.alternate;if(null!==_){var w=_.ref;null!==w&&("function"==typeof w?w(null):w.current=null)}}switch(1038&b){case 2:_o(qo),qo.flags&=-3;break;case 6:_o(qo),qo.flags&=-3,So(qo.alternate,qo);break;case 1024:qo.flags&=-1025;break;case 1028:qo.flags&=-1025,So(qo.alternate,qo);break;case 4:So(qo.alternate,qo);break;case 8:ko(o,s=qo);var x=s.alternate;vo(s),null!==x&&vo(x)}qo=qo.nextEffect}}catch(e){if(null===qo)throw Error(l(330));js(qo,e),qo=qo.nextEffect}}while(null!==qo);if(w=Br,_=mr(),b=w.focusedElem,o=w.selectionRange,_!==b&&b&&b.ownerDocument&&pr(b.ownerDocument.documentElement,b)){null!==o&&gr(b)&&(_=o.start,void 0===(w=o.end)&&(w=_),"selectionStart"in b?(b.selectionStart=_,b.selectionEnd=Math.min(w,b.value.length)):(w=(_=b.ownerDocument||document)&&_.defaultView||window).getSelection&&(w=w.getSelection(),s=b.textContent.length,x=Math.min(o.start,s),o=void 0===o.end?x:Math.min(o.end,s),!w.extend&&x>o&&(s=o,o=x,x=s),s=hr(b,x),a=hr(b,o),s&&a&&(1!==w.rangeCount||w.anchorNode!==s.node||w.anchorOffset!==s.offset||w.focusNode!==a.node||w.focusOffset!==a.offset)&&((_=_.createRange()).setStart(s.node,s.offset),w.removeAllRanges(),x>o?(w.addRange(_),w.extend(a.node,a.offset)):(_.setEnd(a.node,a.offset),w.addRange(_))))),_=[];for(w=b;w=w.parentNode;)1===w.nodeType&&_.push({element:w,left:w.scrollLeft,top:w.scrollTop});for("function"==typeof b.focus&&b.focus(),b=0;b<_.length;b++)(w=_[b]).element.scrollLeft=w.left,w.element.scrollTop=w.top}Jt=!!Ur,Br=Ur=null,e.current=n,qo=r;do{try{for(b=e;null!==qo;){var k=qo.flags;if(36&k&&mo(b,qo.alternate,qo),128&k){_=void 0;var S=qo.ref;if(null!==S){var E=qo.stateNode;qo.tag,_=E,"function"==typeof S?S(_):S.current=_}}qo=qo.nextEffect}}catch(e){if(null===qo)throw Error(l(330));js(qo,e),qo=qo.nextEffect}}while(null!==qo);qo=null,Fi(),Lo=i}else e.current=n;if(Xo)Xo=!1,Zo=e,Go=t;else for(qo=r;null!==qo;)t=qo.nextEffect,qo.nextEffect=null,8&qo.flags&&((k=qo).sibling=null,k.stateNode=null),qo=t;if(0===(r=e.pendingLanes)&&(Yo=null),1===r?e===is?rs++:(rs=0,is=e):rs=0,n=n.stateNode,ki&&"function"==typeof ki.onCommitFiberRoot)try{ki.onCommitFiberRoot(xi,n,void 0,64==(64&n.current.flags))}catch(e){}if(ps(e,$i()),Jo)throw Jo=!1,e=Ko,Ko=null,e;return 0!=(8&Lo)||qi(),null}function Ts(){for(;null!==qo;){var e=qo.alternate;us||null===ss||(0!=(8&qo.flags)?Ge(qo,ss)&&(us=!0):13===qo.tag&&Co(e,qo)&&Ge(qo,ss)&&(us=!0));var t=qo.flags;0!=(256&t)&&po(e,qo),0==(512&t)||Xo||(Xo=!0,Qi(97,(function(){return zs(),null}))),qo=qo.nextEffect}}function zs(){if(90!==Go){var e=97<Go?97:Go;return Go=90,Vi(e,Rs)}return!1}function Is(e,t){es.push(t,e),Xo||(Xo=!0,Qi(97,(function(){return zs(),null})))}function Ds(e,t){ts.push(t,e),Xo||(Xo=!0,Qi(97,(function(){return zs(),null})))}function Rs(){if(null===Zo)return!1;var e=Zo;if(Zo=null,0!=(48&Lo))throw Error(l(331));var t=Lo;Lo|=32;var n=ts;ts=[];for(var r=0;r<n.length;r+=2){var i=n[r],a=n[r+1],o=i.destroy;if(i.destroy=void 0,"function"==typeof o)try{o()}catch(e){if(null===a)throw Error(l(330));js(a,e)}}for(n=es,es=[],r=0;r<n.length;r+=2){i=n[r],a=n[r+1];try{var s=i.create;i.destroy=s()}catch(e){if(null===a)throw Error(l(330));js(a,e)}}for(s=e.current.firstEffect;null!==s;)e=s.nextEffect,s.nextEffect=null,8&s.flags&&(s.sibling=null,s.stateNode=null),s=e;return Lo=t,qi(),!0}function Fs(e,t,n){ca(e,t=uo(0,t=lo(n,t),1)),t=cs(),null!==(e=hs(e,1))&&($t(e,1,t),ps(e,t))}function js(e,t){if(3===e.tag)Fs(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){Fs(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Yo||!Yo.has(r))){var i=co(n,e=lo(t,e),1);if(ca(n,i),i=cs(),null!==(n=hs(n,1)))$t(n,1,i),ps(n,i);else if("function"==typeof r.componentDidCatch&&(null===Yo||!Yo.has(r)))try{r.componentDidCatch(t,e)}catch(e){}break}}n=n.return}}function As(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=cs(),e.pingedLanes|=e.suspendedLanes&n,Oo===e&&(zo&n)===n&&(4===Ro||3===Ro&&(62914560&zo)===zo&&500>$i()-Wo?xs(e,0):Bo|=n),ps(e,t)}function Us(e,t){var n=e.stateNode;null!==n&&n.delete(t),0==(t=0)&&(0==(2&(t=e.mode))?t=1:0==(4&t)?t=99===Wi()?1:2:(0===ls&&(ls=jo),0===(t=Ut(62914560&~ls))&&(t=4194304))),n=cs(),null!==(e=hs(e,t))&&($t(e,t,n),ps(e,n))}function Bs(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function $s(e,t,n,r){return new Bs(e,t,n,r)}function Ws(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Hs(e,t){var n=e.alternate;return null===n?((n=$s(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Vs(e,t,n,r,i,a){var o=2;if(r=e,"function"==typeof e)Ws(e)&&(o=1);else if("string"==typeof e)o=5;else e:switch(e){case S:return Qs(n.children,i,a,t);case R:o=8,i|=16;break;case E:o=8,i|=1;break;case C:return(e=$s(12,n,t,8|i)).elementType=C,e.type=C,e.lanes=a,e;case L:return(e=$s(13,n,t,i)).type=L,e.elementType=L,e.lanes=a,e;case O:return(e=$s(19,n,t,i)).elementType=O,e.lanes=a,e;case F:return qs(n,i,a,t);case j:return(e=$s(24,n,t,i)).elementType=j,e.lanes=a,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case N:o=10;break e;case P:o=9;break e;case M:o=11;break e;case T:o=14;break e;case z:o=16,r=null;break e;case I:o=22;break e}throw Error(l(130,null==e?e:typeof e,""))}return(t=$s(o,n,t,i)).elementType=e,t.type=r,t.lanes=a,t}function Qs(e,t,n,r){return(e=$s(7,e,r,t)).lanes=n,e}function qs(e,t,n,r){return(e=$s(23,e,r,t)).elementType=F,e.lanes=n,e}function Js(e,t,n){return(e=$s(6,e,null,t)).lanes=n,e}function Ks(e,t,n){return(t=$s(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ys(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Bt(0),this.expirationTimes=Bt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bt(0),this.mutableSourceEagerHydrationData=null}function Xs(e,t,n,r){var i=t.current,a=cs(),o=ds(i);e:if(n){t:{if(Ke(n=n._reactInternals)!==n||1!==n.tag)throw Error(l(170));var s=n;do{switch(s.tag){case 3:s=s.stateNode.context;break t;case 1:if(gi(s.type)){s=s.stateNode.__reactInternalMemoizedMergedChildContext;break t}}s=s.return}while(null!==s);throw Error(l(171))}if(1===n.tag){var u=n.type;if(gi(u)){n=bi(n,u,s);break e}}n=s}else n=di;return null===t.context?t.context=n:t.pendingContext=n,(t=ua(a,o)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),ca(i,t),fs(i,o,a),o}function Zs(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Gs(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function eu(e,t){Gs(e,t),(e=e.alternate)&&Gs(e,t)}function tu(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new Ys(e,t,null!=n&&!0===n.hydrate),t=$s(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,oa(t),e[Gr]=n.current,Or(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var i=(t=r[e])._getVersion;i=i(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i)}this._internalRoot=n}function nu(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function ru(e,t,n,r,i){var a=n._reactRootContainer;if(a){var l=a._internalRoot;if("function"==typeof i){var o=i;i=function(){var e=Zs(l);o.call(e)}}Xs(t,l,e,i)}else{if(a=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new tu(e,0,t?{hydrate:!0}:void 0)}(n,r),l=a._internalRoot,"function"==typeof i){var s=i;i=function(){var e=Zs(l);s.call(e)}}bs((function(){Xs(t,l,e,i)}))}return Zs(l)}function iu(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nu(t))throw Error(l(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:k,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)}Qo=function(e,t,n){var r=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||hi.current)Dl=!0;else{if(0==(n&r)){switch(Dl=!1,t.tag){case 3:Vl(t),Qa();break;case 5:Ia(t);break;case 1:gi(t.type)&&_i(t);break;case 4:Ta(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value;var i=t.type._context;ci(Xi,i._currentValue),i._currentValue=r;break;case 13:if(null!==t.memoizedState)return 0!=(n&t.child.childLanes)?Xl(e,t,n):(ci(Ra,1&Ra.current),null!==(t=no(e,t,n))?t.sibling:null);ci(Ra,1&Ra.current);break;case 19:if(r=0!=(n&t.childLanes),0!=(64&e.flags)){if(r)return to(e,t,n);t.flags|=64}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),ci(Ra,Ra.current),r)break;return null;case 23:case 24:return t.lanes=0,Ul(e,t,n)}return no(e,t,n)}Dl=0!=(16384&e.flags)}else Dl=!1;switch(t.lanes=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,i=mi(t,fi.current),ia(t,n),i=al(null,t,r,e,i,n),t.flags|=1,"object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,gi(r)){var a=!0;_i(t)}else a=!1;t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,oa(t);var o=r.getDerivedStateFromProps;"function"==typeof o&&ma(t,r,o,e),i.updater=ga,t.stateNode=i,i._reactInternals=t,_a(t,r,e,n),t=Hl(null,t,r,!0,a,n)}else t.tag=0,Rl(null,t,i,n),t=t.child;return t;case 16:i=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,i=(a=i._init)(i._payload),t.type=i,a=t.tag=function(e){if("function"==typeof e)return Ws(e)?1:0;if(null!=e){if((e=e.$$typeof)===M)return 11;if(e===T)return 14}return 2}(i),e=Yi(i,e),a){case 0:t=$l(null,t,i,e,n);break e;case 1:t=Wl(null,t,i,e,n);break e;case 11:t=Fl(null,t,i,e,n);break e;case 14:t=jl(null,t,i,Yi(i.type,e),r,n);break e}throw Error(l(306,i,""))}return t;case 0:return r=t.type,i=t.pendingProps,$l(e,t,r,i=t.elementType===r?i:Yi(r,i),n);case 1:return r=t.type,i=t.pendingProps,Wl(e,t,r,i=t.elementType===r?i:Yi(r,i),n);case 3:if(Vl(t),r=t.updateQueue,null===e||null===r)throw Error(l(282));if(r=t.pendingProps,i=null!==(i=t.memoizedState)?i.element:null,sa(e,t),fa(t,r,null,n),(r=t.memoizedState.element)===i)Qa(),t=no(e,t,n);else{if((a=(i=t.stateNode).hydrate)&&(Aa=qr(t.stateNode.containerInfo.firstChild),ja=t,a=Ua=!0),a){if(null!=(e=i.mutableSourceEagerHydrationData))for(i=0;i<e.length;i+=2)(a=e[i])._workInProgressVersionPrimary=e[i+1],qa.push(a);for(n=Ca(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else Rl(e,t,r,n),Qa();t=t.child}return t;case 5:return Ia(t),null===e&&Wa(t),r=t.type,i=t.pendingProps,a=null!==e?e.memoizedProps:null,o=i.children,Wr(r,i)?o=null:null!==a&&Wr(r,a)&&(t.flags|=16),Bl(e,t),Rl(e,t,o,n),t.child;case 6:return null===e&&Wa(t),null;case 13:return Xl(e,t,n);case 4:return Ta(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=Ea(t,null,r,n):Rl(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,Fl(e,t,r,i=t.elementType===r?i:Yi(r,i),n);case 7:return Rl(e,t,t.pendingProps,n),t.child;case 8:case 12:return Rl(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=i.value;var s=t.type._context;if(ci(Xi,s._currentValue),s._currentValue=a,null!==o)if(s=o.value,0==(a=ur(s,a)?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(s,a):1073741823))){if(o.children===i.children&&!hi.current){t=no(e,t,n);break e}}else for(null!==(s=t.child)&&(s.return=t);null!==s;){var u=s.dependencies;if(null!==u){o=s.child;for(var c=u.firstContext;null!==c;){if(c.context===r&&0!=(c.observedBits&a)){1===s.tag&&((c=ua(-1,n&-n)).tag=2,ca(s,c)),s.lanes|=n,null!==(c=s.alternate)&&(c.lanes|=n),ra(s.return,n),u.lanes|=n;break}c=c.next}}else o=10===s.tag&&s.type===t.type?null:s.child;if(null!==o)o.return=s;else for(o=s;null!==o;){if(o===t){o=null;break}if(null!==(s=o.sibling)){s.return=o.return,o=s;break}o=o.return}s=o}Rl(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=(a=t.pendingProps).children,ia(t,n),r=r(i=aa(i,a.unstable_observedBits)),t.flags|=1,Rl(e,t,r,n),t.child;case 14:return a=Yi(i=t.type,t.pendingProps),jl(e,t,i,a=Yi(i.type,a),r,n);case 15:return Al(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Yi(r,i),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,gi(r)?(e=!0,_i(t)):e=!1,ia(t,n),va(t,r,i),_a(t,r,i,n),Hl(null,t,r,!0,e,n);case 19:return to(e,t,n);case 23:case 24:return Ul(e,t,n)}throw Error(l(156,t.tag))},tu.prototype.render=function(e){Xs(e,this._internalRoot,null,null)},tu.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;Xs(null,e,null,(function(){t[Gr]=null}))},et=function(e){13===e.tag&&(fs(e,4,cs()),eu(e,4))},tt=function(e){13===e.tag&&(fs(e,67108864,cs()),eu(e,67108864))},nt=function(e){if(13===e.tag){var t=cs(),n=ds(e);fs(e,n,t),eu(e,n)}},rt=function(e,t){return t()},Ce=function(e,t,n){switch(t){case"input":if(ne(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=ii(r);if(!i)throw Error(l(90));X(r),ne(r,i)}}}break;case"textarea":ue(e,n);break;case"select":null!=(t=n.value)&&le(e,!!n.multiple,t,!1)}},Te=vs,ze=function(e,t,n,r,i){var a=Lo;Lo|=4;try{return Vi(98,e.bind(null,t,n,r,i))}finally{0===(Lo=a)&&(Vo(),qi())}},Ie=function(){0==(49&Lo)&&(function(){if(null!==ns){var e=ns;ns=null,e.forEach((function(e){e.expiredLanes|=24&e.pendingLanes,ps(e,$i())}))}qi()}(),zs())},De=function(e,t){var n=Lo;Lo|=2;try{return e(t)}finally{0===(Lo=n)&&(Vo(),qi())}};var au={Events:[ni,ri,ii,Le,Oe,zs,{current:!1}]},lu={findFiberByHostInstance:ti,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"},ou={bundleType:lu.bundleType,version:lu.version,rendererPackageName:lu.rendererPackageName,rendererConfig:lu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:w.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ze(e))?null:e.stateNode},findFiberByHostInstance:lu.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var su=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!su.isDisabled&&su.supportsFiber)try{xi=su.inject(ou),ki=su}catch(me){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=au,t.createPortal=iu,t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(l(188));throw Error(l(268,Object.keys(e)))}return null===(e=Ze(t))?null:e.stateNode},t.flushSync=function(e,t){var n=Lo;if(0!=(48&n))return e(t);Lo|=1;try{if(e)return Vi(99,e.bind(null,t))}finally{Lo=n,qi()}},t.hydrate=function(e,t,n){if(!nu(t))throw Error(l(200));return ru(null,e,t,!0,n)},t.render=function(e,t,n){if(!nu(t))throw Error(l(200));return ru(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!nu(e))throw Error(l(40));return!!e._reactRootContainer&&(bs((function(){ru(null,null,e,!1,(function(){e._reactRootContainer=null,e[Gr]=null}))})),!0)},t.unstable_batchedUpdates=vs,t.unstable_createPortal=function(e,t){return iu(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!nu(n))throw Error(l(200));if(null==e||void 0===e._reactInternals)throw Error(l(38));return ru(e,t,n,!1,r)},t.version="17.0.2"},542:(e,t,n)=>{"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(577)},908:function(e,t,n){e=n.nmd(e),function(){var t,r,i,a,l,o,s=[].slice;r=null!=(o=this.React)?o:n(378),l=function(e){return null!=e&&"object"==typeof e&&!(e instanceof Array||r.isValidElement(e))},i=function(e,t){var n,r,o,s,u;if(u=t.to,e instanceof Array){for(n=0,o=e.length;n<o;n++)s=e[n],i(s,{to:u});return!0}if(l(e)){for(r in e)e[r]&&u.push(a(r));return!0}return null!=e&&u.push(e),!1},a=function(e){return(""+e).replace(/_/g,"-").replace(/([a-z])([A-Z])/g,(function(e,t,n){return t+"-"+n.toLowerCase()}))},t=function(){var e,t,n,o,u,c,d,f,h,p,m,g,y,v,b,_,w,x,k,S,E,C;switch(y=arguments[0],t=2<=arguments.length?s.call(arguments,1):[],null==y&&(y=""),l(t[0])?(u=t[0],h=2<=t.length?s.call(t,1):[]):(h=1<=t.length?s.call(t,0):[],u=null),typeof y){case"string":for(c in k=y,y="div",x=k.replace(/^[a-z][a-z0-9\-_]*/i,(function(e){return y=e,""})),v={},p=[],e=function(e,t,n){if(!1!==t||n)return v[e]=t},u)if(d=u[c],"class"===c||"className"===c||"classes"===c||"classNames"===c||"classList"===c)i(d,{to:p});else if("data"===c)for(m in d)g=d[m],e("data-"+a(m),g);else if("aria"===c)for(n in d)o=d[n],e("aria-"+a(n),o,!0);else c.match(/^data/)?e(a(c),d):c.match(/^aria/)?e(a(c),d,!0):e(c,d);if(x&&(S=x.replace(/\.([a-z][a-z0-9\-_]*)/gi,(function(e,t){return p.push(t),""})).replace(/#([a-z][a-z0-9\-_]*)/gi,(function(e,t){return v.id=t,""}))),S)throw new Error("Unhandled selector fragment '"+S+"' in selector: '"+k+"'");p.length&&(v.className=p.join(" "));break;case"function":v=u;break;default:throw new Error("Invalid first argument to ReactScript: "+y)}for(b=[],E=!1,_=0,w=h.length;_<w;_++)f=h[_],C=i(f,{to:b}),E||(E=C);return E?r.createElement(y,v,b):r.createElement.apply(r,[y,v].concat(s.call(b)))},null!=(null!==e?e.exports:void 0)?e.exports=t:this.ReactScript=t}.call(this)},535:(e,t,n)=>{"use strict";var r=n(525),i=60103,a=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var l=60109,o=60110,s=60112;t.Suspense=60113;var u=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var d=Symbol.for;i=d("react.element"),a=d("react.portal"),t.Fragment=d("react.fragment"),t.StrictMode=d("react.strict_mode"),t.Profiler=d("react.profiler"),l=d("react.provider"),o=d("react.context"),s=d("react.forward_ref"),t.Suspense=d("react.suspense"),u=d("react.memo"),c=d("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var p={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||p}function y(){}function v(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||p}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(h(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=g.prototype;var b=v.prototype=new y;b.constructor=v,r(b,g.prototype),b.isPureReactComponent=!0;var _={current:null},w=Object.prototype.hasOwnProperty,x={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,n){var r,a={},l=null,o=null;if(null!=t)for(r in void 0!==t.ref&&(o=t.ref),void 0!==t.key&&(l=""+t.key),t)w.call(t,r)&&!x.hasOwnProperty(r)&&(a[r]=t[r]);var s=arguments.length-2;if(1===s)a.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];a.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps)void 0===a[r]&&(a[r]=s[r]);return{$$typeof:i,type:e,key:l,ref:o,props:a,_owner:_.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===i}var E=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function N(e,t,n,r,l){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var s=!1;if(null===e)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case i:case a:s=!0}}if(s)return l=l(s=e),e=""===r?"."+C(s,0):r,Array.isArray(l)?(n="",null!=e&&(n=e.replace(E,"$&/")+"/"),N(l,t,n,"",(function(e){return e}))):null!=l&&(S(l)&&(l=function(e,t){return{$$typeof:i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(l,n+(!l.key||s&&s.key===l.key?"":(""+l.key).replace(E,"$&/")+"/")+e)),t.push(l)),1;if(s=0,r=""===r?".":r+":",Array.isArray(e))for(var u=0;u<e.length;u++){var c=r+C(o=e[u],u);s+=N(o,t,n,c,l)}else if(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof c)for(e=c.call(e),u=0;!(o=e.next()).done;)s+=N(o=o.value,t,n,c=r+C(o,u++),l);else if("object"===o)throw t=""+e,Error(h(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return s}function P(e,t,n){if(null==e)return e;var r=[],i=0;return N(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function M(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var L={current:null};function O(){var e=L.current;if(null===e)throw Error(h(321));return e}var T={ReactCurrentDispatcher:L,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:_,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:P,forEach:function(e,t,n){P(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return P(e,(function(){t++})),t},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(h(143));return e}},t.Component=g,t.PureComponent=v,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T,t.cloneElement=function(e,t,n){if(null==e)throw Error(h(267,e));var a=r({},e.props),l=e.key,o=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,s=_.current),void 0!==t.key&&(l=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)w.call(t,c)&&!x.hasOwnProperty(c)&&(a[c]=void 0===t[c]&&void 0!==u?u[c]:t[c])}var c=arguments.length-2;if(1===c)a.children=n;else if(1<c){u=Array(c);for(var d=0;d<c;d++)u[d]=arguments[d+2];a.children=u}return{$$typeof:i,type:e.type,key:l,ref:o,props:a,_owner:s}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:o,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:l,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:M}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return O().useCallback(e,t)},t.useContext=function(e,t){return O().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return O().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return O().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return O().useLayoutEffect(e,t)},t.useMemo=function(e,t){return O().useMemo(e,t)},t.useReducer=function(e,t,n){return O().useReducer(e,t,n)},t.useRef=function(e){return O().useRef(e)},t.useState=function(e){return O().useState(e)},t.version="17.0.2"},378:(e,t,n)=>{"use strict";e.exports=n(535)},323:(e,t)=>{"use strict";var n,r,i,a;if("object"==typeof performance&&"function"==typeof performance.now){var l=performance;t.unstable_now=function(){return l.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var u=null,c=null,d=function(){if(null!==u)try{var e=t.unstable_now();u(!0,e),u=null}catch(e){throw setTimeout(d,0),e}};n=function(e){null!==u?setTimeout(n,0,e):(u=e,setTimeout(d,0))},r=function(e,t){c=setTimeout(e,t)},i=function(){clearTimeout(c)},t.unstable_shouldYield=function(){return!1},a=t.unstable_forceFrameRate=function(){}}else{var f=window.setTimeout,h=window.clearTimeout;if("undefined"!=typeof console){var p=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof p&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var m=!1,g=null,y=-1,v=5,b=0;t.unstable_shouldYield=function(){return t.unstable_now()>=b},a=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):v=0<e?Math.floor(1e3/e):5};var _=new MessageChannel,w=_.port2;_.port1.onmessage=function(){if(null!==g){var e=t.unstable_now();b=e+v;try{g(!0,e)?w.postMessage(null):(m=!1,g=null)}catch(e){throw w.postMessage(null),e}}else m=!1},n=function(e){g=e,m||(m=!0,w.postMessage(null))},r=function(e,n){y=f((function(){e(t.unstable_now())}),n)},i=function(){h(y),y=-1}}function x(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,i=e[r];if(!(void 0!==i&&0<E(i,t)))break e;e[r]=t,e[n]=i,n=r}}function k(e){return void 0===(e=e[0])?null:e}function S(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length;r<i;){var a=2*(r+1)-1,l=e[a],o=a+1,s=e[o];if(void 0!==l&&0>E(l,n))void 0!==s&&0>E(s,l)?(e[r]=s,e[o]=n,r=o):(e[r]=l,e[a]=n,r=a);else{if(!(void 0!==s&&0>E(s,n)))break e;e[r]=s,e[o]=n,r=o}}}return t}return null}function E(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var C=[],N=[],P=1,M=null,L=3,O=!1,T=!1,z=!1;function I(e){for(var t=k(N);null!==t;){if(null===t.callback)S(N);else{if(!(t.startTime<=e))break;S(N),t.sortIndex=t.expirationTime,x(C,t)}t=k(N)}}function D(e){if(z=!1,I(e),!T)if(null!==k(C))T=!0,n(R);else{var t=k(N);null!==t&&r(D,t.startTime-e)}}function R(e,n){T=!1,z&&(z=!1,i()),O=!0;var a=L;try{for(I(n),M=k(C);null!==M&&(!(M.expirationTime>n)||e&&!t.unstable_shouldYield());){var l=M.callback;if("function"==typeof l){M.callback=null,L=M.priorityLevel;var o=l(M.expirationTime<=n);n=t.unstable_now(),"function"==typeof o?M.callback=o:M===k(C)&&S(C),I(n)}else S(C);M=k(C)}if(null!==M)var s=!0;else{var u=k(N);null!==u&&r(D,u.startTime-n),s=!1}return s}finally{M=null,L=a,O=!1}}var F=a;t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){T||O||(T=!0,n(R))},t.unstable_getCurrentPriorityLevel=function(){return L},t.unstable_getFirstCallbackNode=function(){return k(C)},t.unstable_next=function(e){switch(L){case 1:case 2:case 3:var t=3;break;default:t=L}var n=L;L=t;try{return e()}finally{L=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=F,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=L;L=e;try{return t()}finally{L=n}},t.unstable_scheduleCallback=function(e,a,l){var o=t.unstable_now();switch(l="object"==typeof l&&null!==l&&"number"==typeof(l=l.delay)&&0<l?o+l:o,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:P++,callback:a,priorityLevel:e,startTime:l,expirationTime:s=l+s,sortIndex:-1},l>o?(e.sortIndex=l,x(N,e),null===k(C)&&e===k(N)&&(z?i():z=!0,r(D,l-o))):(e.sortIndex=s,x(C,e),T||O||(T=!0,n(R))),e},t.unstable_wrapCallback=function(e){var t=L;return function(){var n=L;L=t;try{return e.apply(this,arguments)}finally{L=n}}}},102:(e,t,n)=>{"use strict";e.exports=n(323)},892:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},l=[],o=0;o<e.length;o++){var s=e[o],u=r.base?s[0]+r.base:s[0],c=a[u]||0,d="".concat(u," ").concat(c);a[u]=c+1;var f=n(d),h={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==f)t[f].references++,t[f].updater(h);else{var p=i(h,r);r.byIndex=o,t.splice(o,0,{identifier:d,updater:p,references:1})}l.push(d)}return l}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var a=r(e=e||[],i=i||{});return function(e){e=e||[];for(var l=0;l<a.length;l++){var o=n(a[l]);t[o].references--}for(var s=r(e,i),u=0;u<a.length;u++){var c=n(a[u]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}a=s}}},311:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},60:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},192:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},760:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},865:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var a=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),n.nc=void 0;var r={};return(()=>{"use strict";n.d(r,{default:()=>te});var e,t,i={};n.r(i),n.d(i,{distance:()=>a,distanceToLineSegment:()=>l,lerpPoints:()=>s,lineSegmentsIntersect:()=>o}),e=function(e,t){return(e.x-t.x)**2+(e.y-t.y)**2};var a=function(t,n){return Math.sqrt(e(t,n))};t=function(t,n,r){var i,a;return 0===(i=e(n,r))?e(t,n):(a=((t.x-n.x)*(r.x-n.x)+(t.y-n.y)*(r.y-n.y))/i,a=Math.max(0,Math.min(1,a)),e(t,{x:n.x+a*(r.x-n.x),y:n.y+a*(r.y-n.y)}))};var l=function(e,n,r){return Math.sqrt(t(e,n,r))},o=function(e,t,n,r,i,a,l,o){var s,u,c,d,f,h;return h=(+(c=l-i)*(t-a)-(d=o-a)*(e-i))/(-c*(u=r-t)+(s=n-e)*d),0<=(f=(-u*(e-i)+s*(t-a))/(-c*u+s*d))&&f<=1&&0<=h&&h<=1},s=function(e,t,n){var r,i,a;for(r in i={},e)a=e[r],i[r]="number"==typeof a?a+(t[r]-a)*n:a;return i},u=function(e,t){return(+e%(t=+t)+t)%t};const c=class e{constructor(e){var t,n,r,i;if(this.points={},null!=e)for(t in({points:n}=e),n)({x:r,y:i}=n[t]),this.points[t]={x:r,y:i}}static lerp(t,n,r){var i,a,l,o,u;for(l in u=new e,o=t.points)i=o[l],a=n.points[l],u.points[l]=s(i,a,r);return u}static lerpAnimationLoop(t,n){var r,i;return r=t[u(0+~~n,t.length)],i=t[u(1+~~n,t.length)],e.lerp(r,i,u(n,1))}static alterPoints(t,n){var r,i,a,l,o,s,u;for(l in s=new e,o=t.points){for(r in i=n(a=o[l]),a)u=a[r],null==i[r]&&(i[r]=u);s.points[l]=i}return s}static copy(t){return e.alterPoints(t,(function(){return{}}))}static horizontallyFlip(t,n=0){return e.alterPoints(t,(function(e){return{x:n-e.x,y:e.y}}))}static verticallyFlip(t,n=0){return e.alterPoints(t,(function(e){return{x:e.x,y:n-e.y}}))}},d=class{constructor(){this.clear()}clear(){return this.points={},this.segments={}}toJSON(){var e,t,n,r,i,a,l;for(i in({points:t}=this),a={},n=this.segments)for(e in r=n[i],a[i]={},r)l=r[e],"a"!==e&&"b"!==e&&(a[i][e]=l);return{points:t,segments:a}}fromJSON(e){var t,n,r,i,a,l,o;for(l in this.points=e.points,this.segments={},r=[],n=e.segments){for(t in a={},i=n[l])o=i[t],a[t]=o;a.a=this.points[a.from],a.b=this.points[a.to],r.push(this.segments[l]=a)}return r}setPose(e){var t,n,r,i;for(n in i=[],r=e.points)t=r[n],this.points[n].x=t.x,i.push(this.points[n].y=t.y);return i}getPose(){return new c(this)}},f=class extends d{addPoint(e){if(this.points[e])throw new Error(`point/segment '${e}' already exists adding point '${e}'`);return this.points[e]={x:0,y:0,name:e}}addSegment(e){var t,n,r,i,a;if(({from:t,to:i,name:r}=e),null==i&&(i=r),this.segments[r])throw new Error(`segment '${r}' already exists adding segment '${r}'`);if(this.points[i])throw new Error(`point/segment '${r}' already exists adding segment '${r}'`);if(!this.points[t])throw new Error(`point/segment '${t}' does not exist yet adding segment '${r}'`);for(n in this.points[i]={x:0,y:0,name:i},this.segments[r]={a:this.points[t],b:this.points[i],from:t,to:i,name:r},e)null!=(a=e[n])&&(this.segments[r][n]=a);return r}stepLayout({center:e,repel:t,gravity:n,collision:r,velocity:i}={}){var a,l,o,s,u,c,d,f,h,p,m,g,y,v,b,_,w,x,k,S,E,C;for(v in d={},a={x:0,y:0},b=this.points){if(y=b[v],d[v]={x:0,y:0},e&&(s=a.x-y.x,u=a.y-y.y,o=Math.sqrt(s*s+u*u),d[v].x+=s*o/1e5,d[v].y+=u*o/1e5),t)for(g in _=this.points)s=(m=_[g]).x-y.x,u=m.y-y.y,0!=(l=5-(o=Math.sqrt(s*s+u*u)))&&(d[v].x+=s/l/1e3,d[v].y+=u/l/1e3);n&&(d[v].y+=n)}for(C in w=this.segments)s=(E=w[C]).a.x-E.b.x,u=E.a.y-E.b.y,l=(o=Math.sqrt(s*s+u*u))-(null!=(x=E.length)?x:50),l=Math.min(l,100),d[E.a.name].x-=s*l/1e3,d[E.a.name].y-=u*l/1e3,d[E.b.name].x+=s*l/1e3,d[E.b.name].y+=u*l/1e3;for(v in S=[],d)if(c=d[v],y=this.points[v],r){for(null==y.vx&&(y.vx=0),null==y.vy&&(y.vy=0),y.vx+=c.x,y.vy+=c.y,h=y.vx,p=y.vy,k=.5;Math.abs(h)>k;){if(f=Math.sign(h)*k,r({x:y.x+f,y:y.y})){if(y.vx*=.99,r({x:y.x+f,y:y.y-1}))break;y.y-=1}h-=f,y.x+=f}S.push(function(){var e;for(e=[];Math.abs(p)>k;){if(f=Math.sign(p)*k,r({x:y.x,y:y.y+f})){y.vy*=.9;break}p-=f,e.push(y.y+=f)}return e}())}else y.x+=c.x,S.push(y.y+=c.y);return S}};var h,p,m={};h="function"==typeof window.require?window.require("fs"):void 0,p="function"==typeof window.require?window.require("path"):void 0;const g=class e{constructor(){this.structure=new f,this.x=0,this.y=0,this.id=uuid(),this.bbox_padding=2,this._class_=this.constructor.name}static initAnimation(t){return t.poses={},t.animations={},t.animation_json_path=`./animations/${t.name}.json`,e.loadAnimations(t)}static loadAnimations(e){var t,n,r,i;if(t=function({poses:t,animations:n}){var r,i,a,l,o;for(l in e.poses={},e.animations={},t)a=t[l],e.poses[l]=new c(a);for(i in o=[],n)r=n[i],o.push(e.animations[i]=function(){var e,t,n;for(n=[],e=0,t=r.length;e<t;e++)a=r[e],n.push(new c(a));return n}());return o},null!=h)try{r=h.readFileSync(e.animation_json_path)}catch(e){if("ENOENT"!==(n=e).code)throw n}else r=localStorage[`Skele2D ${e.name} animations`];return r?r?t(JSON.parse(r)):void 0:((i=new XMLHttpRequest).addEventListener("load",(e=>{if(r=i.responseText)return t(JSON.parse(r))})),i.open("GET",e.animation_json_path),i.send())}static saveAnimations(e){var t,n,r,i;if(({poses:i,animations:t}=e),r=JSON.stringify({poses:i,animations:t},null,"\t"),null!=h){try{h.mkdirSync(p.dirname(e.animation_json_path))}catch(e){if("EEXIST"!==(n=e).code)throw n}return h.writeFileSync(e.animation_json_path,r)}return localStorage[`Skele2D ${e.name} animations`]=r}static fromJSON(e){var t;if("string"!=typeof e._class_)throw console.error("Erroneous entity definition:",e),new Error(`Expected entity to have a string _class_, _class_ is ${e._class_}`);if(!m[e._class_])throw new Error(`Entity class '${e._class_}' does not exist`);return(t=new m[e._class_]).fromJSON(e),t}fromJSON(e){var t,n,r,i;if(e._class_!==this._class_)throw new Error(`Tried to initialize ${this._class_} entity from JSON with _class_ ${JSON.stringify(e._class_)}`);for(t in r=[],e)i=e[t],"_class_"!==t&&((null!=(n=this[t])?n.fromJSON:void 0)?r.push(this[t].fromJSON(i)):r.push(this[t]=i));return r}resolveReferences(e){var t,n,r;if(this._refs_){for(n in r=this._refs_)t=r[n],this[n]=e.getEntityByID(t);return delete this._refs_}}toJSON(){var t,n,r;for(t in n={},this)r=this[t],"_refs_"!==t&&(r instanceof e?(null==n._refs_&&(n._refs_={}),n._refs_[t]=r.id):n[t]=r);return n}toWorld(e){return{x:e.x+this.x,y:e.y+this.y}}fromWorld(e){return{x:e.x-this.x,y:e.y-this.y}}bbox(){var e,t,n,r,i,a,l;for(a in n={x:1/0,y:1/0},e={x:-Infinity,y:-Infinity},l=this.structure.points)i=l[a],n.x=Math.min(n.x,i.x),n.y=Math.min(n.y,i.y),e.x=Math.max(e.x,i.x),e.y=Math.max(e.y,i.y);return isFinite(n.x)||(n.x=0),isFinite(n.y)||(n.y=0),isFinite(e.x)||(e.x=0),isFinite(e.y)||(e.y=0),n.x-=this.bbox_padding,n.y-=this.bbox_padding,e.x+=this.bbox_padding,e.y+=this.bbox_padding,r=this.toWorld(n),t=this.toWorld(e),{x:r.x,y:r.y,width:t.x-r.x,height:t.y-r.y}}initLayout(){var e,t,n,r,i,a,l,o,s,u,c,d,f,h;if(!(e=this.constructor).poses||!(t=null!=(i=null!=(a=null!=(l=e.poses.Default)?l:e.poses.Stand)?a:e.poses.Standing)?i:e.poses.Idle)){for(r in h={},f=0,o=this.structure.points)n=o[r],(c=null!=(s=r.match(/left|right/))?s[0]:void 0)&&(h[d=r.replace(/left|right/,"")]?f=h[d]:(f+=10,h[d]=f),"left"===c&&(n.x=-5.5),"right"===c&&(n.x=5.5),r.match(/lower/)&&(n.x*=.7)),n.y=f;for(var p=0;p<=2e3;p++)this.structure.stepLayout({center:!0,repel:!0});u=[];for(var m=0;m<=4e3;m++)u.push(this.structure.stepLayout());return u}this.structure.setPose(t)}step(e){}draw(e){}},y=class extends d{constructor(){super()}clear(){return super.clear(),this.id_counter=0,this.last_point_name=null,this.first_point_name=null,"function"==typeof this.onchange?this.onchange():void 0}toJSON(){var e,t,n;return{points:function(){var r,i;for(e in i=[],r=this.points)({x:t,y:n}=r[e]),i.push({x:t,y:n});return i}.call(this)}}fromJSON(e){var t,n,r,i,a;for(this.points={},this.segments={},this.id_counter=0,this.first_point_name=null,this.last_point_name=null,t=0,n=(r=e.points).length;t<n;t++)({x:i,y:a}=r[t]),this.addVertex(i,a,!1);return"function"==typeof this.onchange?this.onchange():void 0}addVertex(e,t,n=!0){var r,i;if(r=this.last_point_name,i=++this.id_counter,null==this.first_point_name&&(this.first_point_name=i),this.points[i])throw new Error(`point/segment '${i}' already exists adding vertex '${i}'`);if(this.points[i]={x:e,y:t,name:i},this.last_point_name=i,this.points[r]&&(this.segments[i]={a:this.points[r],b:this.points[i]},this.segments.closing={a:this.points[this.last_point_name],b:this.points[this.first_point_name]}),n)return"function"==typeof this.onchange?this.onchange():void 0}pointInPolygon({x:e,y:t}){var n,r,i,a,l,o,s,u;for(a in n=!1,r=this.segments)l=(i=r[a]).a.x,s=i.a.y,o=i.b.x,s>t!=(u=i.b.y)>t&&e<(o-l)*(t-s)/(u-s)+l&&(n=!n);return n}};var v;v=2*Math.PI;const b=class extends g{constructor(){super(),this.structure=new y,this.simplex=new SimplexNoise,this.seed=Math.random()}initLayout(){var e,t,n,r,i,a,l,o;for(l=[],o=e=0,i=v,a=v/15;0!==a&&(a>0?e<=i:e>=i);o=e+=a)n=30*Math.sin(o),r=30*Math.cos(o),r=(t=Math.max(r,-15))+.4*(r-t),l.push(this.structure.addVertex(n,r));return l}toJSON(){var e,t,n;for(t in e={},this)n=this[t],"simplex"!==t&&(e[t]=n);return e}generate(){var e,t,n,r,i;for(this.width=5e3,this.left=-2500,this.right=this.left+this.width,this.max_height=400,this.bottom=300,this.structure.clear(),this.structure.addVertex(this.right,this.bottom),this.structure.addVertex(this.left,this.bottom),r=[],i=e=this.left,n=this.right;e<=n;i=e+=20)t=this.simplex.noise2D(i/2400,0)+this.simplex.noise2D(i/500,10)/5+this.simplex.noise2D(i/50,30)/100,r.push(this.structure.addVertex(i,this.bottom-(t+1)/2*this.max_height));return r}draw(e,t){var n,r,i;for(r in e.beginPath(),i=this.structure.points)n=i[r],e.lineTo(n.x,n.y);return e.closePath(),e.fillStyle="#a5f",e.fill()}};var _=n(542),w=n(908),x=n.n(w),k=n(378);const S=class{constructor(){this.center_x=0,this.center_y=0,this.scale=1,this.width=1,this.height=1}easeTowards(e,t){return this.center_x+=(e.center_x-this.center_x)/(1+t/e.scale*this.scale),this.center_y+=(e.center_y-this.center_y)/(1+t/e.scale*this.scale),this.scale+=(e.scale-this.scale)/(1+t)}testRect(e,t,n,r,i=0){return this.center_x-this.width/2/this.scale-i<=e&&e<=this.center_x+this.width/2/this.scale+i&&this.center_y-this.height/2/this.scale-i<=t&&t<=this.center_y+this.height/2/this.scale+i}toWorld(e){return{x:(e.x-this.width/2)/this.scale+this.center_x,y:(e.y-this.height/2)/this.scale+this.center_y}}fromWorld(e){return{x:(e.x-this.center_x)*this.scale+this.width/2,y:(e.y-this.center_y)*this.scale+this.height/2}}},E=class extends k.Component{constructor(e){var t,n,r,i,a,l,o,s;super(),({entity:r,max_width:o,max_height:l}=e),this.entity=g.fromJSON(JSON.parse(JSON.stringify(r))),this.entity.facing_x=1,this.view=new S,t=(i=this.entity.bbox()).x+i.width/2-this.entity.x,n=i.y+i.height/2-this.entity.y,s=(a=Math.min(i.height,l))/i.height,this.view=new S,this.view.width=o,this.view.height=a,this.view.scale=s,this.view.center_x=t,this.view.center_y=n,this.view.is_preview=!0}render(){return x()("canvas",{ref:e=>{this.canvas=e}})}update(){var e,t,n,r;return e=(r=this.entity.bbox()).x+r.width/2-this.entity.x,t=r.y+r.height/2-this.entity.y,this.view.center_x=e,this.view.center_y=t,n=this.canvas.getContext("2d"),this.canvas.width=this.view.width,this.canvas.height=this.view.height,n.save(),n.translate(this.view.width/2,this.view.height/2),n.scale(this.view.scale,this.view.scale),n.translate(-this.view.center_x,-this.view.center_y),this.entity.draw(n,this.view),n.restore()}},C=class e extends k.Component{constructor(){var e,t,n,r,i;for(r in super(),this.update=this.update.bind(this),this.state={visible:!1},this.cells=[],this.entity_previews=[],m)e=m[r],n=r.replace(/[a-z][A-Z]/g,(function(e){return`${e[0]} ${e[1]}`})),(i=new e).initLayout(),t={EntityClass:e,name:n,preview_entity:i},this.cells.push(t)}render(){var e,t,n,r;return({editor:t}=this.props),({visible:r}=this.state),this.entity_previews=[],x()(".bar.sidebar.entities-bar",{class:{visible:r}},function(){var r,i,l,o;for(l=this.cells,o=[],n=r=0,i=l.length;r<i;n=++r)e=l[n],o.push(x()("article.cell.grabbable",{key:n,onMouseDown:(e=>n=>{var r,i,l;return t.selected_entities=[],r={x:n.clientX,y:n.clientY},addEventListener("mousemove",i=n=>{if(a(r,{x:n.clientX,y:n.clientY})>4)return t.undoable((()=>{var n;return(n=new e.EntityClass).initLayout(),t.world.entities.push(n),t.dragEntities([n]),removeEventListener("mousemove",i),removeEventListener("mouseup",l)}))}),addEventListener("mouseup",l=e=>(removeEventListener("mousemove",i),removeEventListener("mouseup",l)))})(e)},x()("h1.name",e.name),x()(E,{entity:e.preview_entity,max_width:200,max_height:100,ref:e=>{if(null!=e)return this.entity_previews.push(e)}})));return o}.call(this))}update(t){var n,r,i,a,l,o;if(function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,e),({editor:n}=this.props),(t=t&&0===n.dragging_entities.length&&!n.editing_entity)!==this.state.visible&&this.setState({visible:t}),t){for(o=[],i=0,a=(l=this.entity_previews).length;i<a;i++)r=l[i],o.push(r.update());return o}}},N=class extends k.Component{constructor(){super()}render(){var e,t,n,r,i,a,l,o,s;return({entity:r,EntityClass:e,name:i,type_of_anims:o,selected:l,select:a,delete_item:t,update:s,editor:n}=this.props),x()("article",{class:{selected:l},onClick:e=>{if(!e.defaultPrevented)return a(),s()}},"Current Pose"===i?x()("h1.name",i):x()(".title-bar",x()(".mdl-textfield.mdl-js-textfield.name",{ref:e=>{this.mdl_textfield_el=e}},x()("input.mdl-textfield__input",{value:i,onChange:t=>{var r;if(r=t.target.value,"animations"===o){if(e.animations[r])return void alert(`There's already an animation with the name ${r}`)}else{if("poses"!==o)return;if(e.poses[r])return void alert(`There's already a pose with the name ${r}`)}return function(e,t,n){var r,i,a,l;for(r in i={},e)l=e[r],r===t?i[n]=l:i[r]=l;for(r in e)l=e[r],delete e[r];for(r in a=[],i)l=i[r],a.push(e[r]=l)}(e[o],i,r),n.editing_entity_anim_name=r,g.saveAnimations(e),s()}}),x()("label.mdl-textfield__label","Name...")),x()("button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete",{onClick:n=>(n.preventDefault(),t(),g.saveAnimations(e))},x()("i.material-icons","delete"))),x()(E,{entity:r,max_width:200,max_height:100,ref:e=>{this.entity_preview=e}}))}componentDidMount(){if(null!=this.mdl_textfield_el)return componentHandler.upgradeElement(_.findDOMNode(this.mdl_textfield_el))}};var P=function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")};const M=class e extends k.Component{constructor(){super(...arguments),this.componentDidMount=this.componentDidMount.bind(this),this.componentDidUpdate=this.componentDidUpdate.bind(this)}render(){var e,t,n,r,i,a,l,o,s,u,d,f,h;return({entity:a,EntityClass:e,array_to_push_anims_to:r,update:h,type_of_anims:f,editor:i}=this.props),x()(".anim-group",function(){var p,m,g,y,v,b,_;if(null!=e){if("poses"===f){if(null!=e.poses){if(Object.keys(e.poses).length>0){for(d in s=0,v=[],g=e.poses)u=g[d],v.push(((t,n)=>{var l;return s+=1,l=i.editing_entity_anim_name===t&&null==i.editing_entity_animation_frame_index,x()(N,{key:s,name:t,entity:a,EntityClass:e,selected:l,editor:i,update:h,type_of_anims:f,select:()=>{if(i.editing_entity_anim_name=t,i.editing_entity_animation_frame_index=null,"Current Pose"!==t)return a.structure.setPose(e.poses[t])},delete_item:()=>(delete e.poses[t],i.editing_entity_anim_name="Current Pose",i.editing_entity_animation_frame_index=null),get_pose:()=>"Current Pose"===t||l?a.structure.getPose():e.poses[t],ref:e=>{if(null!=e)return r.push(e)}})})(d));return v}return x()("article.placeholder",{key:"placeholder"},"No poses")}return x()("article.placeholder",{key:"placeholder"},"Entity class is not initialized for animation")}if("animations"===f){if(null!=e.animations){if(Object.keys(e.animations).length>0){for(n in s=0,b=[],y=e.animations)t=y[n],b.push(((t,n)=>{var l;return s+=1,l=i.editing_entity_anim_name===t&&null!=i.editing_entity_animation_frame_index,x()(N,{key:s,name:t,entity:a,EntityClass:e,selected:l,editor:i,update:h,type_of_anims:f,select:()=>{var n;if(i.editing_entity_anim_name=t,i.editing_entity_animation_frame_index=0,u=null!=(n=e.animations[t])?n[0]:void 0)return a.structure.setPose(u)},delete_item:()=>(delete e.animations[t],i.editing_entity_anim_name="Current Pose",i.editing_entity_animation_frame_index=null),get_pose:()=>{if(n=e.animations[t])return c.lerpAnimationLoop(n,e.animations[t].length*Date.now()/1e3/2)},ref:e=>{if(null!=e)return r.push(e)}})})(n,t));return b}return x()("article.placeholder",{key:"placeholder"},"No animations")}return x()("article.placeholder",{key:"placeholder"},"Entity class is not initialized for animation")}if("animation-frames"===f){if(null!=e.animations){if(n=i.editing_entity_anim_name,null!=(o=e.animations[n])){for(_=[],l=p=0,m=o.length;p<m;l=++p)o[l],_.push(((l,o)=>{var s;return s=i.editing_entity_anim_name===n&&i.editing_entity_animation_frame_index===o,x()(N,{key:o,name:`Frame ${o}`,entity:a,EntityClass:e,selected:s,editor:i,update:h,type_of_anims:f,select:()=>(i.editing_entity_anim_name=n,i.editing_entity_animation_frame_index=o,u=e.animations[n][o],a.structure.setPose(u)),delete_item:()=>e.animations[n].splice(o,1),get_pose:()=>s?a.structure.getPose():null!=(t=e.animations[n])?t[o]:void 0,ref:e=>{if(null!=e)return r.push(e)}})})(0,l));return _}return x()("article.placeholder",{key:"placeholder"},"Error: Trying to display the frames of a non-existent animation")}return x()("article.placeholder",{key:"placeholder"},"Error: Entity class is not initialized for animation, trying to display the frames of an animation?")}return x()("article.placeholder",{key:"placeholder"},`Error: weird type_of_anims for AnimGroup ${f}`)}}.call(this),x()("button.add-anim-fab.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",{key:"add-button",ref:e=>{this.new_anim_button=e},onClick:()=>{var n,r,l;if("animation-frames"===f)t=e.animations[i.editing_entity_anim_name],l=a.structure.getPose(),t.push(l),i.editing_entity_animation_frame_index=t.length-1;else{for(r=n=function(){switch(f){case"poses":return"New Pose";case"animations":return"New Animation"}}(),s=1;null!=e[f][r];)r=`${n} ${s}`,s+=1;switch(f){case"poses":e.poses[r]=a.structure.getPose(),i.editing_entity_animation_frame_index=null;break;case"animations":e.animations[r]=[a.structure.getPose()],i.editing_entity_animation_frame_index=0}i.editing_entity_anim_name=r}return g.saveAnimations(e),h()}},x()("i.material-icons","add")))}componentDidMount(){return P(this,e),componentHandler.upgradeElement(_.findDOMNode(this.new_anim_button))}componentDidUpdate(){return P(this,e),componentHandler.upgradeElement(_.findDOMNode(this.new_anim_button))}},L=class e extends k.Component{constructor(){super(),this.update=this.update.bind(this),this.state={visible:!1}}render(){var e,t,n,r,i,a;return({editor:n}=this.props),({visible:a,EntityClass:e}=this.state),r=null!=(i=n.editing_entity)?i:this.shown_entity,t=null!=n.editing_entity_animation_frame_index,this.shown_entity=r,this.anims=[],x()(".bar.sidebar.anim-bar",{class:{visible:a}},x()(".anims",x()("h1","Poses"),x()(M,{entity:r,EntityClass:e,array_to_push_anims_to:this.anims,update:this.update,editor:n,type_of_anims:"poses"}),x()("h1","Animations"),x()(M,{entity:r,EntityClass:e,array_to_push_anims_to:this.anims,update:this.update,editor:n,type_of_anims:"animations"})),x()(".animation-frames",{class:{visible:a&&t}},x()("h1","Frames"),x()(M,{entity:r,EntityClass:e,array_to_push_anims_to:this.anims,update:this.update,editor:n,type_of_anims:"animation-frames",editing_frame_index:n.editing_entity_animation_frame_index})))}update(t){var n,r,i,a,l,o,s,u,c;if(function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,e),({editor:l}=this.props),({editing_entity_anim_name:a,editing_entity:i}=l),n=null!=i?m[i._class_]:void 0,t=t&&(null!=n?n.animations:void 0))for(o=0,s=(c=this.anims).length;o<s;o++)null!=(u=(r=c[o]).props.get_pose())&&(r.entity_preview.entity.structure.setPose(u),r.entity_preview.update());return this.setState({visible:t,EntityClass:n,editing_entity_anim_name:a})}},O=class e extends k.Component{constructor(){super(),this.update=this.update.bind(this),this.state={visible:!1}}render(){var e,t,n,r;return({editor:t}=this.props),({visible:r}=this.state),({sculpt_mode:n,brush_size:e}=t),x()(".bar.sidebar.terrain-bar",{class:{visible:r}},x()("h1","Terrain"),x()(".terrain-tools",x()("label.mdl-switch.mdl-js-switch.mdl-js-ripple-effect",{ref:e=>{this.sculpt_mode_switch=e}},x()("input.mdl-switch__input",{type:"checkbox",checked:n,onChange:e=>(t.sculpt_mode=e.target.checked,t.renderDOM())}),x()("span.mdl-switch__label","Sculpt Mode")),x()("label",x()("span.mdl-checkbox__label.mdl-slider__label","Brush Size"),x()("input.mdl-slider.mdl-js-slider",{type:"range",min:0,max:100,value:e,tabIndex:0,disabled:!n,style:{minWidth:200},ref:e=>{this.brush_size_slider=e},onChange:e=>(t.brush_size=e.target.value,t.renderDOM())}))))}componentDidMount(){return componentHandler.upgradeElement(_.findDOMNode(this.sculpt_mode_switch)),componentHandler.upgradeElement(_.findDOMNode(this.brush_size_slider))}update(t){var n,r;return function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,e),({editor:r}=this.props),({editing_entity:n}=r),t=t&&n instanceof b,this.setState({visible:t})}};var T=n(892),z=n.n(T),I=n(760),D=n.n(I),R=n(311),F=n.n(R),j=n(192),A=n.n(j),U=n(60),B=n.n(U),$=n(865),W=n.n($),H=n(389),V={};V.styleTagTransform=W(),V.setAttributes=A(),V.insert=F().bind(null,"head"),V.domAPI=D(),V.insertStyleElement=B(),z()(H.Z,V),H.Z&&H.Z.locals&&H.Z.locals;class Q{constructor(e={}){const t=["contextmenu","menubar"];let n=[],r=a(e.type)?e.type:"contextmenu",i=e.beforeShow;function a(e="",n=!1){return!(t.indexOf(e)<0&&(n&&console.error(`${e} is not a valid type`),1))}Object.defineProperty(this,"items",{get:()=>n}),Object.defineProperty(this,"beforeShow",{get:()=>i}),Object.defineProperty(this,"type",{get:()=>r,set:e=>{r=a(e)?e:r}}),this.append=e=>e instanceof q?n.push(e):(console.error("appended item must be an instance of MenuItem"),!1),this.insert=(e,t)=>e instanceof q?(n.splice(t,0,e),!0):(console.error("inserted item must be an instance of MenuItem"),!1),this.remove=e=>{if(!(e instanceof q))return console.error("item to be removed is not an instance of MenuItem"),!1;let t=n.indexOf(e);return t<0?(console.error("item to be removed was not found in this.items"),!1):(n.splice(t,0),!0)},this.removeAt=e=>(n.splice(e,0),!0),this.node=null}createMacBuiltin(){return console.error("This method is not available in browser :("),!1}popup(e,t,n=null,r=!1){let i=!1,a=null!=n||this.submenu;if(this.submenu=r,r=r||this.menubarSubmenu,this.menubarSubmenu=r,!Q._topmostMenu){Q._topmostMenu=this;let e=Q.contextMenuParent||document.body;Q._listenerElement=e,e.addEventListener("mouseup",Q._mouseHandler,!1),e.addEventListener("mousedown",Q._mouseHandler,!1)}let l=this.buildMenu(a,r);if(l.jsMenu=this,this.node=l,Q._currentMenuNode=l,this.node.parentNode){if(l===this.node)return;this.node.parentNode.replaceChild(l,this.node)}else(Q.contextMenuParent||document.body).appendChild(this.node);let o=l.clientWidth,s=l.clientHeight;e+o>window.innerWidth&&(i=!0,e=a?window.innerWidth-n.parentNode.offsetLeft+2:0),t+s>window.innerHeight&&(t=window.innerHeight-s),i?(l.style.right=e+"px",l.style.left="auto"):(l.style.left=e+"px",l.style.right="auto"),l.style.top=t+"px",l.classList.add("show")}popdown(){if(this.items.forEach((e=>{e.submenu?e.submenu.popdown():e.node=null})),this.node&&"menubar"!==this.type&&(Q._currentMenuNode=this.node.parentMenuNode,this.menubarSubmenu&&this.node.menuItem.classList.remove("submenu-active"),this.node.parentNode.removeChild(this.node),this.node=null),this==Q._topmostMenu){Q._topmostMenu=null;let e=Q._listenerElement;e&&(e.removeEventListener("mouseup",Q._mouseHandler,!1),e.removeEventListener("mousedown",Q._mouseHandler,!1),Q._listenerElement=null)}"menubar"===this.type&&this.clearActiveSubmenuStyling()}static popdownAll(){Q._topmostMenu.popdown()}buildMenu(e=!1,t=!1){this.beforeShow&&this.beforeShow(this);let n=document.createElement("ul");return n.classList.add("nwjs-menu",this.type),e&&n.classList.add("submenu"),t&&n.classList.add("menubar-submenu"),n.jsMenu=this,n.parentMenuNode=Q._currentMenuNode,this.items.forEach((e=>{e.beforeShow&&e.beforeShow(e),e.visible&&e.buildItem(n,"menubar"===this.type)})),n}static isDescendant(e,t){let n=t.parentNode;for(;null!==n;){if(n===e)return!0;n=n.parentNode}return!1}static _mouseHandler(e){let t=null!=Q._menubarNode&&Q.isDescendant(Q._menubarNode,e.target),n=e.currentTarget==Q._menubarNode,r=e.target;for(;r&&!r.jsMenuItem;)r=r.parentNode;if(e.type,"mousedown"!=e.type||r||Q._topmostMenu&&Q.popdownAll(),t==n&&r){let t=r.jsMenuItem;"mousedown"==e.type&&(t.node.classList.toggle("submenu-active"),t.submenu&&(t.node.classList.contains("submenu-active")?(r.jsMenu.node.activeItemNode=t.node,t.popupSubmenu(t.node.offsetLeft,t.node.clientHeight,!0)):(t.submenu.popdown(),r.jsMenu.node.currentSubmenu=null,r.jsMenu.node.activeItemNode=null))),"mouseup"==e.type&&t.doit(r)}}static setApplicationMenu(e,t=null){let n=Q._menubarNode;if(n){let e=n.parentNode;null!=e&&e.removeChild(n),n.removeEventListener("mousedown",Q._mouseHandler,!1),Q._menubarNode=null}if(null!=e){null==t&&(t=Q._menubarParent||document.body),Q._menubarParent=t;let n=e.buildMenu();n.jsMenuItem=null,t.insertBefore(n,t.firstChild),n.addEventListener("mousedown",Q._mouseHandler,!1),Q._menubarNode=n,e.node=n}Q._menubar=e}clearActiveSubmenuStyling(e){if(!this.node)return;let t=this.node.querySelectorAll(".submenu-active");for(let n of t)n!==e&&n.classList.remove("submenu-active")}static recursiveNodeFind(e,t){if(e.node===t)return!0;if(Q.isDescendant(e.node,t))return!0;if(!(e.items.length>0))return!1;for(var n=0;n<e.items.length;n++){let r=e.items[n];if(r.node){if(r.node===t)return!0;if(Q.isDescendant(r.node,t))return!0;if(r.submenu&&recursiveNodeFind(r.submenu,t))return!0}}return!1}isNodeInChildMenuTree(e=!1){return!!e&&recursiveNodeFind(this,e)}}Q.contextMenuParent=null,Q._currentMenuNode=null,Q._keydownListener=function(e){function t(e,t,n){let r=!1,i=t;for(;;){if(i=i?n?i.nextSibling:i.previousSibling:null,!i){if(i=n?e.firstChild:e.lastChild,r||!i)return null;r=!0}if(i instanceof Element&&i.classList.contains("menu-item")&&"separator"!=i.jsMenuItem.type&&!i.classList.contains("disabled"))return i}}function n(e,n){let r=e.menuItem.parentNode,i=t(r,r.activeItemNode,n);return i&&i.jsMenuItem.select(i,!0,!0,!0),i}function r(e){e.jsMenuItem.selectSubmenu(e),i=Q._currentMenuNode;let n=t(i,null,!0);n&&n.jsMenuItem.select(n,!0,!1)}let i=Q._currentMenuNode;if(i){let a=i.activeItemNode;switch(e.keyCode){case 27:case 37:if(e.preventDefault(),e.stopPropagation(),37==e.keyCode&&i.jsMenu.menubarSubmenu&&n(i,!1))return;i.jsMenu.popdown();break;case 13:e.preventDefault(),e.stopPropagation(),a&&(a.jsMenuItem.submenu?r(a):a.jsMenuItem.doit(a));break;case 39:e.preventDefault(),e.stopPropagation(),a&&a.jsMenuItem.submenu?r(a):Q._topmostMenu.menubarSubmenu&&n(i,!0);break;case 38:case 40:e.preventDefault(),e.stopPropagation();let l=t(i,i.activeItemNode,40==e.keyCode);l&&l.jsMenuItem.select(l,!0,!1)}}},Q._keydownListening=!1,Q._keydownListen=function(e){e!=Q._keydownListening&&(e?document.addEventListener("keydown",Q._keydownListener,!0):document.removeEventListener("keydown",Q._keydownListener,!0)),Q._keydownListening=e},Q._keydownListen(!0);class q{constructor(e={}){const t=["cmd","command","super","shift","ctrl","alt"],n=["separator","checkbox","radio","normal"];let r=function(e="",t=!1){return!(n.indexOf(e)<0)||(t&&console.error(`${e} is not a valid type`),!1)}(e.type)?e.type:"normal",i=e.submenu||null,a=e.click||null,l=d(e.modifiers)?e.modifiers:null,o=e.label||"",s=e.enabled;void 0===e.enabled&&(s=!0);let u=e.visible;void 0===e.visible&&(u=!0);let c=e.beforeShow;function d(e=""){let n=e.split("+");for(let e=0;e<n;e++){let r=n[e].trim();if(t.indexOf(r)<0)return console.error(`${r} is not a valid modifier`),!1}return!0}Object.defineProperty(this,"type",{get:()=>r}),Object.defineProperty(this,"beforeShow",{get:()=>c}),Object.defineProperty(this,"submenu",{get:()=>i,set:e=>{console.warn("submenu should be set on initialisation, changing this at runtime could be slow on some platforms."),e instanceof Q?i=e:console.error("submenu must be an instance of Menu")}}),Object.defineProperty(this,"click",{get:()=>a,set:e=>{"function"==typeof e?a=e:console.error("click must be a function")}}),Object.defineProperty(this,"modifiers",{get:()=>l,set:e=>{l=d(e)?e:l}}),Object.defineProperty(this,"enabled",{get:()=>s,set:e=>{s=e}}),Object.defineProperty(this,"visible",{get:()=>u,set:e=>{u=e}}),Object.defineProperty(this,"label",{get:()=>o,set:e=>{o=e}}),this.icon=e.icon||null,this.iconIsTemplate=e.iconIsTemplate||!1,this.tooltip=e.tooltip||"",this.checked=e.checked||!1,this.key=e.key||null,this.accelerator=e.accelerator,this.node=null,this.key&&(this.key=this.key.toUpperCase())}toString(){return this.type+"["+this.label+"]"}_mouseoverHandle_menubarTop(){let e=this.node.jsMenuNode;if(e.activeItemNode&&(e.activeItemNode.classList.remove("active"),e.activeItemNode=null),e&&e.querySelector(".submenu-active")){if(this.node.classList.contains("submenu-active"))return;this.node.classList.add("submenu-active"),this.select(this.node,!0,!0,!0)}}doit(e){if(!this.submenu){if(Q.popdownAll(),"checkbox"===this.type)this.checked=!this.checked;else if("radio"===this.type){this.checked=!0;for(let t=0;t<=1;t++)for(let n=e;n=t?n.nextSibling:n.previousSibling,n instanceof Element&&n.classList.contains("radio");)n.jsMenuItem.checked=!1}this.click&&this.click(this)}}select(e,t,n,r=!1){let i=e.jsMenuNode;i.activeItemNode&&(i.activeItemNode.classList.remove("active"),i.activeItemNode.classList.remove("submenu-active"),i.activeItemNode=null),i.currentSubmenu&&(i.currentSubmenu.popdown(),i.currentSubmenu=null),this.submenu&&n?this.selectSubmenu(e,r):e.classList.add("active"),this.node.jsMenuNode.activeItemNode=this.node}selectSubmenu(e,t){if(e.jsMenuNode.currentSubmenu=this.submenu,this.submenu.node)return;let n,r,i=e.parentNode;t?(n=e.offsetLeft,r=e.clientHeight):(n=i.offsetWidth+i.offsetLeft-2,r=i.offsetTop+e.offsetTop-4),this.popupSubmenu(n,r,t),e.classList.add("submenu-active")}buildItem(e,t=!1){let n=document.createElement("li");n.jsMenuNode=e,n.jsMenu=e.jsMenu,n.jsMenuItem=this,n.classList.add("menu-item",this.type),t=t||this.menuBarTopLevel||!1,this.menuBarTopLevel=t,t&&n.addEventListener("mouseenter",this._mouseoverHandle_menubarTop.bind(this));let r=document.createElement("div");if(r.classList.add("icon-wrap"),this.icon){let e=new Image;e.src=this.icon,e.classList.add("icon"),r.appendChild(e)}let i=document.createElement("div");i.classList.add("label");let a=document.createElement("div");a.classList.add("modifiers");let l=document.createElement("div");l.classList.add("checkmark"),this.checked&&!t&&n.classList.add("checked");let o="";if(this.submenu&&!t&&(o="▶︎",n.addEventListener("mouseleave",(e=>{n!==e.target&&(Q.isDescendant(n,e.target)||this.submenu.popdown())}))),this.modifiers&&!t)if(q.useModifierSymbols){let e=this.modifiers.split("+");for(let t in q.modifierSymbols)e.indexOf(t)>-1&&(o+=q.modifierSymbols[t])}else o+=this.modifiers+"+";if(this.key&&!t&&(o+=this.key),this.accelerator&&!t){let e=this.accelerator,t="Ctrl";e=e.replace("CommandOrControl",t),e=e.replace("Mod+",t+"+"),o+=e}this.enabled||n.classList.add("disabled"),t||"separator"==this.type||n.addEventListener("mouseenter",(()=>{this.select(n,!0,!0)})),this.icon&&i.appendChild(r);let s=document.createElement("span");s.textContent=this.label,s.classList.add("label-text"),n.appendChild(l),i.appendChild(s),n.appendChild(i),a.appendChild(document.createTextNode(o)),n.appendChild(a),n.title=this.tooltip,this.node=n,e.appendChild(n)}popupSubmenu(e,t,n=!1){this.submenu.popup(e,t,this.node,n),this.submenu.node.menuItem=this.node,this.node.jsMenuNode.currentSubmenu=this.submenu}}q.modifierSymbols={shift:"⇧",ctrl:"⌃",alt:"⌥",cmd:"⌘",super:"⌘",command:"⌘"},q.keySymbols={up:"↑",esc:"⎋",tab:"⇥",left:"←",down:"↓",right:"→",pageUp:"⇞",escape:"⎋",pageDown:"⇟",backspace:"⌫",space:"Space"},q.useModifierSymbols="undefined"!=typeof navigator?/Mac/.test(navigator.platform):"undefined"!=typeof os&&"darwin"==os.platform();var J=n(89),K={};K.styleTagTransform=W(),K.setAttributes=A(),K.insert=F().bind(null,"head"),K.domAPI=D(),K.insertStyleElement=B(),z()(J.Z,K),J.Z&&J.Z.locals&&J.Z.locals;var Y,X,Z,G,ee=[].indexOf;Z=2*Math.PI,"undefined"!=typeof nw&&null!==nw?({Menu:Y,MenuItem:X}=nw):(Y=Q,X=q),G="function"==typeof window.require?window.require("fs"):void 0,"function"==typeof window.require&&window.require("path");const te={Entity:g,Terrain:b,Structure:d,BoneStructure:f,PolygonStructure:f,Pose:c,Editor:class{constructor(e,t,n,r,i){var a;this.world=e,this.view=t,this.view_to=n,this.mouse=i,this.previous_mouse_world_x=-Infinity,this.previous_mouse_world_y=-Infinity,this.editing=!0,this.selected_entities=[],this.hovered_entities=[],this.selected_points=[],this.hovered_points=[],this.selection_box=null,this.editing_entity=null,this.editing_entity_anim_name=null,this.editing_entity_animation_frame_index=null,this.dragging_points=[],this.dragging_segments=[],this.dragging_entities=[],this.drag_offsets=[],this.view_drag_start_in_world=null,this.view_drag_momentum={x:0,y:0},this.last_click_time=null,this.sculpt_mode=!1,this.brush_size=50,this.sculpt_additive=!0,this.sculpting=!1,this.undos=[],this.redos=[],this.clipboard={},this.warning_message=null,this.show_warning=!1,this.warning_tid=-1,this.react_root_el=document.createElement("div"),this.react_root_el.className="react-root",document.body.appendChild(this.react_root_el),this.renderDOM(),null!=G&&(this.save_path="world.json"),this.grab_start=null,addEventListener("contextmenu",(e=>{var t,n,r,i,a;if(e.preventDefault(),this.editing)return n=new Y,this.hovered_entities.length&&(i=this.hovered_entities[0],ee.call(this.selected_entities,i)<0)&&(this.selected_entities=function(){var e,n,r,i;for(i=[],e=0,n=(r=this.hovered_entities).length;e<n;e++)t=r[e],i.push(t);return i}.call(this)),n.append(new X({label:"Undo",click:()=>this.undo(),enabled:this.undos.length})),n.append(new X({label:"Redo",click:()=>this.redo(),enabled:this.redos.length})),n.append(new X({type:"separator"})),n.append(new X({label:"Cut",click:()=>this.cut(),enabled:this.selected_entities.length})),n.append(new X({label:"Copy",click:()=>this.copy(),enabled:this.selected_points.length||this.selected_entities.length})),n.append(new X({label:"Paste",click:()=>this.paste(),enabled:this.editing_entity?null!=this.clipboard.point_positions:null!=(a=this.clipboard.entities)?a.length:void 0})),n.append(new X({label:"Delete",click:()=>this.delete(),enabled:this.selected_entities.length})),n.append(new X({label:"Select All",click:()=>this.selectAll(),enabled:this.world.entities.length})),n.append(new X({type:"separator"})),this.editing_entity?(r=e=>{var t,n,r;return t=m[this.editing_entity._class_],r=e(null!=(n=this.editing_entity_animation_frame_index)?t.animations[this.editing_entity_anim_name][n]:this.editing_entity.structure.getPose()),this.editing_entity.structure.setPose(r),null!=n?t.animations[this.editing_entity_anim_name][n]=r:t.poses[this.editing_entity_anim_name]=r,g.saveAnimations(t)},n.append(new X({label:"Flip Pose Horizontally",enabled:this.editing_entity_anim_name&&"Current Pose"!==this.editing_entity_anim_name,click:()=>r(c.horizontallyFlip)})),n.append(new X({label:"Flip Pose Vertically",enabled:this.editing_entity_anim_name&&"Current Pose"!==this.editing_entity_anim_name,click:()=>r(c.verticallyFlip)})),n.append(new X({type:"separator"})),n.append(new X({label:"Finish Editing Entity",click:()=>this.finishEditingEntity()}))):n.append(new X({label:"Edit Entity",click:()=>this.editEntity(this.selected_entities[0]),enabled:this.selected_entities.length})),n.popup(e.x,e.y),!1})),a=e=>{var t,n,i,a,l;if(e.target===r)return i=this.view.scale,t=this.view.center_x,n=this.view.center_y,this.view.scale=this.view_to.scale,this.view.center_x=this.view_to.center_x,this.view.center_y=this.view_to.center_y,l=this.view.toWorld({x:e.clientX,y:e.clientY}),this.view_to.scale=e.detail<0||e.wheelDelta>0?1.2*this.view_to.scale:this.view_to.scale/1.2,this.view.scale=this.view_to.scale,a=this.view.toWorld({x:e.clientX,y:e.clientY}),this.view_to.center_x+=l.x-a.x,this.view_to.center_y+=l.y-a.y,this.view.scale=i,this.view.center_x=t,this.view.center_y=n},addEventListener("mousewheel",a),addEventListener("DOMMouseScroll",a),addEventListener("keydown",(e=>{if(!e.target.tagName.match(/input|textarea|select|button/i))switch(e.keyCode){case 32:case 80:return this.toggleEditing();case 46:return this.delete();case 90:if(e.ctrlKey)return e.shiftKey?this.redo():this.undo();break;case 89:if(e.ctrlKey)return this.redo();break;case 88:if(e.ctrlKey)return this.cut();break;case 67:if(e.ctrlKey)return this.copy();break;case 86:if(e.ctrlKey)return this.paste();break;case 65:if(e.ctrlKey)return this.selectAll()}}))}save(){var e;return e=JSON.stringify(this.world,null,"\t"),null!=G?G.writeFileSync(this.save_path,e):localStorage["Skele2D World"]=e}load(){var e,t,n;if(t=null!=G?G.readFileSync(this.save_path):localStorage["Skele2D World"])try{return void this.world.fromJSON(JSON.parse(t))}catch(t){e=t,this.warn(`Error loading saved world: ${e}`,1e4)}return(n=new XMLHttpRequest).addEventListener("error",(e=>this.warn("Error loading default world: the network request failed.",1e4))),n.addEventListener("load",(e=>{var r;if(200===n.status){if(!(t=n.responseText))return this.warn("No default world loaded",1e4);try{this.world.fromJSON(JSON.parse(t))}catch(e){return r=e,this.warn(`Error loading default world: ${r}`,1e4)}}else this.warn(`Error loading default world: ${n.status} ${n.statusText}`,1e4)})),n.open("GET","world.json"),n.send()}discardSave(){return null!=G?G.unlinkSync(this.save_path):delete localStorage["Skele2D World"]}savePose(){var e;if(this.editing_entity_anim_name&&"Current Pose"!==this.editing_entity_anim_name)return e=m[this.editing_entity._class_],null!=this.editing_entity_animation_frame_index?e.animations[this.editing_entity_anim_name][this.editing_entity_animation_frame_index]=this.editing_entity.structure.getPose():e.poses[this.editing_entity_anim_name]=this.editing_entity.structure.getPose(),g.saveAnimations(e)}toJSON(){var e,t,n,r,i,a,l,o;if(l=function(){var e,n,r,i;for(i=[],e=0,n=(r=this.selected_entities).length;e<n;e++)t=r[e],i.push(t.id);return i}.call(this),e=null!=(i=this.editing_entity)?i.id:void 0,o=[],null!=this.editing_entity)for(r in a=this.editing_entity.structure.points)n=a[r],ee.call(this.selected_points,n)>=0&&o.push(r);return{world:this.world,selected_entity_ids:l,editing_entity_id:e,selected_point_names:o}}fromJSON(e){var t,n,r,i,a,l,o,s,u,c;for(this.world.fromJSON(e.world),this.hovered_entities=[],this.hovered_points=[],this.selected_entities=[],this.selected_points=[],r=0,a=(s=e.selected_entity_ids).length;r<a;r++)n=s[r],null!=(t=this.world.getEntityByID(n))&&this.selected_entities.push(t);if(this.editing_entity=this.world.getEntityByID(e.editing_entity_id),null!=this.editing_entity){for(c=[],i=0,l=(u=e.selected_point_names).length;i<l;i++)o=u[i],c.push(this.selected_points.push(this.editing_entity.structure.points[o]));return c}}undoable(e){if(this.undos.push(JSON.stringify(this)),this.redos=[],null!=e)return e(),this.save()}undo(){return this.editing?this.undo_or_redo(this.undos,this.redos):(this.toggleEditing(),this.undo())}redo(){if(this.editing)return this.undo_or_redo(this.redos,this.undos)}undo_or_redo(e,t){if(0!==e.length)return t.push(JSON.stringify(this)),this.fromJSON(JSON.parse(e.pop())),this.save()}selectAll(){var e,t,n;return this.editing_entity?this.selected_points=function(){var e,r;for(n in r=[],e=this.editing_entity.structure.points)t=e[n],r.push(t);return r}.call(this):this.selected_entities=function(){var t,n,r,i;for(i=[],t=0,n=(r=this.world.entities).length;t<n;t++)e=r[t],i.push(e);return i}.call(this)}delete(){var e,t,n,r,i,a,l,o,s,u,c,d,f,h,p,m,g,y,v;if(this.selected_points.length){for(v in u=this.selected_points.length>1,o=[...this.redos],this.undoable(),f=this.editing_entity.structure.segments)h=(y=f[v]).a,(ee.call(this.selected_points,h)>=0||(p=y.b,ee.call(this.selected_points,p)>=0))&&delete this.editing_entity.structure.segments[v];for(d in m=this.editing_entity.structure.points)c=m[d],ee.call(this.selected_points,c)>=0&&delete this.editing_entity.structure.points[d];this.selected_points=[],this.dragging_points=[],e=document.createElement("canvas").getContext("2d"),t=new S;try{this.editing_entity.draw(e,t)}catch(e){return n=e,this.undo(),this.redos=o,"undefined"!=typeof console&&null!==console&&"function"==typeof console.warn&&console.warn("Entity failed to draw after deletion, with",n),void(u?alert("Entity needs one or more of those points to render"):alert("Entity needs that point to render"))}try{for(l=JSON.parse(JSON.stringify(this.editing_entity)),s=JSON.parse(JSON.stringify(this.world)),this.editing_entity.step(this.world),this.world.fromJSON(s),g=this.world.entities,i=0,a=g.length;i<a;i++)if((r=g[i]).id===this.editing_entity.id){this.world.entities.splice(this.world.entities.indexOf(r),1,this.editing_entity);break}this.editing_entity.fromJSON(l)}catch(e){return n=e,this.undo(),this.redos=o,"undefined"!=typeof console&&null!==console&&"function"==typeof console.warn&&console.warn("Entity failed to step after deletion, with",n),void(u?alert("Entity needs one or more of those points to step"):alert("Entity needs that point to step"))}return this.save()}return this.undoable((()=>{var e,t,n,i;for(t=0,n=(i=this.selected_entities).length;t<n;t++)(r=i[t]).destroyed=!0,(e=this.world.entities.indexOf(r))>=0&&this.world.entities.splice(e,1);return this.selected_entities=[],this.finishEditingEntity()}))}cut(){return this.copy(),this.delete()}copy(){var e;return this.selected_points.length?alert("Copying points is not supported"):this.clipboard.entities=function(){var t,n,r,i;for(i=[],t=0,n=(r=this.selected_entities).length;t<n;t++)e=r[t],i.push({json:JSON.stringify(e)});return i}.call(this)}paste(){return this.editing_entity?alert("Pasting points is not supported"):this.undoable((()=>{var e,t,n,r,i,a,l,o,s,u,c,d,f,h,p,m,y,v;if(null!=(y=this.clipboard.entities)?y.length:void 0){for(this.selected_entities=[],h=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.clipboard.entities).length;e<t;e++)({json:s}=n[e]),delete(a=JSON.parse(s)).id,l=g.fromJSON(a),this.world.entities.push(l),this.selected_entities.push(l),r.push(l);return r}.call(this),r=function(){var e,r,a,o;for(o=[],e=0,r=h.length;e<r;e++){for(m in l=h[e],t={x:0,y:0},i=0,a=l.structure.points)p=a[m],t.x+=p.x,t.y+=p.y,i+=1;t.x/=i,t.y/=i,n=l.toWorld(t),o.push(n)}return o}(),e={x:0,y:0},o=0,c=r.length;o<c;o++)t=r[o],e.x+=t.x,e.y+=t.y;for(e.x/=r.length,e.y/=r.length,f=this.view.toWorld(this.mouse),v=[],u=0,d=h.length;u<d;u++)(l=h[u]).x+=f.x-e.x,v.push(l.y+=f.y-e.y);return v}this.warn("Nothing on clipboard")}))}toggleEditing(){return this.editing&&this.undoable(),this.editing=!this.editing,this.renderDOM()}step(){var e,t,n,r,i,o,s,u,c,d,h,p,m,g,y,v,_,w,x,k,S,E,C,N,P,M,L,O,T,z,I,D,R,F,j,A,U,B,$,W;if(E=this.view.toWorld(this.mouse),this.mouse.LMB.released){if((this.dragging_points.length||this.sculpting)&&(this.dragging_points=[],this.sculpting=!1,this.savePose(),this.save()),this.dragging_entities.length){for(this.save(),h=p=0,y=(O=this.dragging_entities).length;p<y;h=++p)null!=(c=O[h]).vx&&null!=c.vy&&(c.vx=(E.x+this.drag_offsets[h].x-c.x)/3,c.vy=(E.y+this.drag_offsets[h].y-c.y)/3);this.dragging_entities=[]}this.selection_box&&(this.editing_entity?this.selected_points=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.hovered_points).length;e<t;e++)c=n[e],r.push(c);return r}.call(this):this.selected_entities=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.hovered_entities).length;e<t;e++)c=n[e],r.push(c);return r}.call(this),this.selection_box=null)}if(S=8/this.view.scale,L=(e,t)=>{var n,r,i,a,l,o,s,u,c,d,f,h;return c=this.selection_box.x1-e.x,f=this.selection_box.y1-e.y,d=this.selection_box.x2-e.x,h=this.selection_box.y2-e.y,s=Math.min(c,d),l=Math.max(c,d),u=Math.min(f,h),o=Math.max(f,h),s<=(n=t.x)&&n<=l&&u<=(r=t.y)&&r<=o&&s<=(i=t.x)&&i<=l&&u<=(a=t.y)&&a<=o},d=e=>{var t,n,r,i,a,l,o,s,u,c,d,f,h,p,m;if(c=this.selection_box.x1-e.x,f=this.selection_box.y1-e.y,d=this.selection_box.x2-e.x,h=this.selection_box.y2-e.y,s=Math.min(c,d),l=Math.max(c,d),u=Math.min(f,h),o=Math.max(f,h),0===Object.keys(e.structure.segments).length)return!1;for(m in t=e.structure.segments)if(!(s<=(n=(p=t[m]).a.x)&&n<=l&&u<=(r=p.a.y)&&r<=o&&s<=(i=p.b.x)&&i<=l&&u<=(a=p.b.y)&&a<=o))return!1;return!0},this.view.center_x-=this.view_drag_momentum.x,this.view.center_y-=this.view_drag_momentum.y,this.view_to.center_x-=this.view_drag_momentum.x,this.view_to.center_y-=this.view_drag_momentum.y,this.view_drag_momentum.x*=.8,this.view_drag_momentum.y*=.8,this.dragging_points=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.dragging_points).length;e<t;e++)P=n[e],r.push(this.editing_entity.structure.points[P.name]);return r}.call(this),this.selected_points=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.selected_points).length;e<t;e++)P=n[e],r.push(this.editing_entity.structure.points[P.name]);return r}.call(this),this.view_drag_start_in_world)this.mouse.MMB.down?(this.view.center_x-=E.x-this.view_drag_start_in_world.x,this.view.center_y-=E.y-this.view_drag_start_in_world.y,this.view_to.center_x=this.view.center_x,this.view_to.center_y=this.view.center_y,this.view_drag_momentum.x=0,this.view_drag_momentum.y=0):(this.view_drag_momentum.x=E.x-this.view_drag_start_in_world.x,this.view_drag_momentum.y=E.y-this.view_drag_start_in_world.y,this.view_drag_start_in_world=null);else if(this.mouse.MMB.pressed)this.view_drag_start_in_world={x:E.x,y:E.y};else if(this.mouse.double_clicked)this.hovered_entities.length?(T=this.hovered_entities[0],ee.call(this.selected_entities,T)>=0&&this.editEntity(this.hovered_entities[0])):this.finishEditingEntity();else if(this.dragging_entities.length)for(h=m=0,v=(I=this.dragging_entities).length;m<v;h=++m)(c=I[h]).x=E.x+this.drag_offsets[h].x,c.y=E.y+this.drag_offsets[h].y;else if(this.dragging_points.length){for(x=this.editing_entity.fromWorld(E),h=g=0,_=(D=this.dragging_points).length;g<_;h=++g)(P=D[h]).x=x.x+this.drag_offsets[h].x,P.y=x.y+this.drag_offsets[h].y;"function"==typeof(e=this.editing_entity.structure).onchange&&e.onchange()}else if(this.dragging_segments.length);else if(this.selection_box)this.selection_box.x2=E.x,this.selection_box.y2=E.y,this.editing_entity?this.hovered_points=function(){var e,t;for(M in t=[],e=this.editing_entity.structure.points)P=e[M],L(this.editing_entity,P)&&t.push(P);return t}.call(this):this.hovered_entities=function(){var e,t,n,r;for(r=[],t=0,e=(n=this.world.entities).length;t<e;t++)c=n[t],d(c)&&r.push(c);return r}.call(this);else if(this.grab_start)this.mouse.LMB.down?a(this.mouse,this.grab_start)>2&&(this.selected_points.length?this.dragPoints(this.selected_points,this.grab_start_in_world):this.selected_entities.length&&this.dragEntities(this.selected_entities,this.grab_start_in_world),this.grab_start=null):this.grab_start=null;else if(this.sculpting)if(this.mouse.LMB.down){for(M in C=E.x-this.previous_mouse_world_x,N=E.y-this.previous_mouse_world_y,x=this.editing_entity.fromWorld(E),R=this.editing_entity.structure.points)o=(s=(P=R[M]).x-x.x)*s+(u=P.y-x.y)*u,(i=Math.sqrt(o))<this.brush_size&&(P.x+=C/Math.max(1200,o)*500,P.y+=N/Math.max(1200,o)*500);"function"==typeof(t=this.editing_entity.structure).onchange&&t.onchange()}else this.sculpting=!1;else{if(this.hovered_entities=[],this.hovered_points=[],this.editing_entity)if(x=this.editing_entity.fromWorld(E),this.editing_entity instanceof b&&this.sculpt_mode)this.sculpt_additive=this.editing_entity.structure.pointInPolygon(x);else{for(M in n=Infinity,F=this.editing_entity.structure.points)P=F[M],(i=a(x,P))<S&&i<n&&(n=i,this.hovered_points=[P]);if(!this.hovered_points.length)for(W in n=Infinity,j=this.editing_entity.structure.segments)$=j[W],(i=l(x,$.a,$.b))<(null!=(A=$.width)?A:5)&&i<n&&(n=i,this.hovered_segments=[$])}else{for(n=Infinity,r=null,k=0,w=(U=this.world.entities).length;k<w;k++)c=U[k],(i=this.distanceToEntity(c,E))<S&&(i<n||!(c instanceof b)&&r instanceof b)&&(r=c,n=i);null!=r&&(this.hovered_entities=[r])}this.mouse.LMB.pressed&&(this.dragging_points=[],this.dragging_segments=[],this.editing_entity instanceof b&&this.sculpt_mode?(this.undoable(),this.sculpting=!0):this.hovered_points.length?(B=this.hovered_points[0],ee.call(this.selected_points,B)>=0?this.grabPoints(this.selected_points,E):this.grabPoints(this.hovered_points,E)):(this.selected_points=[],this.hovered_entities.length?(z=this.hovered_entities[0],ee.call(this.selected_entities,z)>=0?this.grabEntities(this.selected_entities,E):this.grabEntities(this.hovered_entities,E)):this.selection_box={x1:E.x,y1:E.y,x2:E.x,y2:E.y}))}if(this.editing_entity&&this.editing_entity.structure instanceof f)for(var H=0;H<=250;H++)this.editing_entity.structure.stepLayout();return this.previous_mouse_world_x=E.x,this.previous_mouse_world_y=E.y}editEntity(e){return this.editing_entity=e,this.selected_entities=[e]}finishEditingEntity(){return this.editing_entity=null,this.selected_entities=[],this.selected_points=[],this.dragging_entities=[],this.dragging_points=[],this.sculpting=!1}distanceToEntity(e,t){var n,r,i,o,s,u,c,d,f;for(f in i=e.fromWorld(t),n=Infinity,u=e.structure.segments)d=u[f],r=l(i,d.a,d.b),n=Math.min(n,r);for(s in c=e.structure.points)o=c[s],r=a(i,o),n=Math.min(n,r);return n}grabPoints(e,t){var n,r,i;if(!this.editing_entity||"Current Pose"!==this.editing_entity_anim_name||null==(n=m[this.editing_entity._class_]).poses&&null==n.animations)return this.grab_start={x:this.mouse.x,y:this.mouse.y},this.grab_start_in_world=t,this.selected_points=function(){var t,n,r;for(r=[],t=0,n=e.length;t<n;t++)i=e[t],r.push(i);return r}(),r=this.editing_entity.fromWorld(t),this.drag_offsets=function(){var e,t,n,a;for(a=[],e=0,t=(n=this.dragging_points).length;e<t;e++)i=n[e],a.push({x:i.x-r.x,y:i.y-r.y});return a}.call(this);this.warn("No pose is selected. Select a pose to edit.")}dragPoints(e,t){var n,r;return this.selected_points=function(){var t,n,i;for(i=[],t=0,n=e.length;t<n;t++)r=e[t],i.push(r);return i}(),this.undoable(),this.dragging_points=function(){var t,n,i;for(i=[],t=0,n=e.length;t<n;t++)r=e[t],i.push(r);return i}(),n=this.editing_entity.fromWorld(t),this.drag_offsets=function(){var e,t,i,a;for(a=[],e=0,t=(i=this.dragging_points).length;e<t;e++)r=i[e],a.push({x:r.x-n.x,y:r.y-n.y});return a}.call(this)}grabEntities(e,t){var n;return this.grab_start={x:this.mouse.x,y:this.mouse.y},this.grab_start_in_world=t,this.selected_entities=function(){var t,r,i;for(i=[],t=0,r=e.length;t<r;t++)n=e[t],i.push(n);return i}(),this.drag_offsets=function(){var e,r,i,a;for(a=[],e=0,r=(i=this.dragging_entities).length;e<r;e++)n=i[e],null!=t?a.push({x:n.x-t.x,y:n.y-t.y}):a.push({x:0,y:0});return a}.call(this)}dragEntities(e,t){var n;return this.selected_entities=function(){var t,r,i;for(i=[],t=0,r=e.length;t<r;t++)n=e[t],i.push(n);return i}(),this.undoable(),this.dragging_entities=function(){var t,r,i;for(i=[],t=0,r=e.length;t<r;t++)n=e[t],i.push(n);return i}(),this.drag_offsets=function(){var e,r,i,a;for(a=[],e=0,r=(i=this.dragging_entities).length;e<r;e++)n=i[e],null!=t?a.push({x:n.x-t.x,y:n.y-t.y}):a.push({x:0,y:0});return a}.call(this)}draw(e,t){var n,r,i,a,l,o,s,u,c,d,f,h,p,m,g,y,v,_;for(r=(n,r,i)=>{var a,l,o,s;for(l in s=[],o=n.structure.points)a=o[l],e.beginPath(),e.arc(a.x,a.y,r/t.scale,0,Z),e.fillStyle=i,s.push(e.fill());return s},i=(n,r,i)=>{var a,l,o,s;for(s in l=[],a=n.structure.segments)o=a[s],e.beginPath(),e.moveTo(o.a.x,o.a.y),e.lineTo(o.b.x,o.b.y),e.lineWidth=r/t.scale,e.lineCap="round",e.strokeStyle=i,l.push(e.stroke());return l},this.editing_entity&&(e.save(),e.translate(this.editing_entity.x,this.editing_entity.y),r(this.editing_entity,3,"rgba(255, 0, 0, 1)"),i(this.editing_entity,1,"rgba(255, 170, 0, 1)"),e.restore()),l=0,u=(g=this.selected_entities).length;l<u;l++)(a=g[l])!==this.editing_entity&&(e.save(),e.translate(a.x,a.y),r(a,2,"rgba(255, 170, 0, 1)"),i(a,1,"rgba(255, 170, 0, 1)"),e.restore());for(o=0,c=(y=this.hovered_entities).length;o<c;o++)a=y[o],ee.call(this.selected_entities,a)<0&&(e.save(),e.translate(a.x,a.y),r(a,2,"rgba(255, 170, 0, 0.2)"),i(a,1,"rgba(255, 170, 0, 0.5)"),e.restore());if(null!=this.editing_entity)if(this.editing_entity instanceof b&&this.sculpt_mode)p=this.view.toWorld(this.mouse),e.beginPath(),e.arc(p.x,p.y,this.brush_size,0,Z),e.fillStyle="rgba(0, 155, 255, 0.1)",e.strokeStyle="rgba(0, 155, 255, 0.8)",e.lineWidth=1/t.scale,e.fill(),e.stroke();else{for(e.save(),e.translate(this.editing_entity.x,this.editing_entity.y),s=0,d=(v=this.selected_points).length;s<d;s++)m=v[s],e.beginPath(),e.arc(m.x,m.y,3/t.scale,0,Z),e.fillStyle="rgba(255, 0, 0, 1)",e.fill(),e.lineWidth=1.5/t.scale,e.strokeStyle="rgba(255, 170, 0, 1)",e.stroke();e.restore()}for(h=0,f=(_=this.selected_entities).length;h<f;h++)a=_[h],e.strokeStyle="rgba(255, 170, 0, 1)",n=a.bbox(),e.lineWidth=1/t.scale,e.strokeRect(n.x,n.y,n.width,n.height);if(null!=this.selection_box)return e.save(),e.beginPath(),1===t.scale&&e.translate(.5,.5),e.rect(this.selection_box.x1,this.selection_box.y1,this.selection_box.x2-this.selection_box.x1,this.selection_box.y2-this.selection_box.y1),e.fillStyle="rgba(0, 155, 255, 0.1)",e.strokeStyle="rgba(0, 155, 255, 0.8)",e.lineWidth=1/t.scale,e.fill(),e.stroke(),e.restore()}warn(e,t=2e3){return this.warning_message=e,this.show_warning=!0,this.renderDOM(),clearTimeout(this.warning_tid),this.warning_tid=setTimeout((()=>(this.show_warning=!1,this.renderDOM())),t)}renderDOM(){var e;return e=x()(".editor",x()(C,{editor:this,ref:e=>{this.entities_bar=e}}),x()(L,{editor:this,ref:e=>{this.anim_bar=e}}),x()(O,{editor:this,ref:e=>{this.terrain_bar=e}}),x()(".warning",{class:this.show_warning?"show":void 0},this.warning_message)),_.render(e,this.react_root_el)}updateGUI(){var e;return this.editing_entity||(this.editing_entity_anim_name="Current Pose",this.editing_entity_animation_frame_index=null),e=this.editing,this.entities_bar.update(e),this.anim_bar.update(e),this.terrain_bar.update(e)}},View:S,Mouse:class{constructor(e){this.x=-Infinity,this.y=-Infinity,this.LMB={down:!1,pressed:!1,released:!1},this.MMB={down:!1,pressed:!1,released:!1},this.RMB={down:!1,pressed:!1,released:!1},this.double_clicked=!1,addEventListener("mousemove",(e=>(this.x=e.clientX,this.y=e.clientY))),e.addEventListener("mousedown",(e=>{var t;return(t=this[`${"LMR"[e.button]}MB`]).down=!0,t.pressed=!0})),addEventListener("mouseup",(e=>{var t;return(t=this[`${"LMR"[e.button]}MB`]).down=!1,t.released=!0})),e.addEventListener("dblclick",(e=>(this[`${"LMR"[e.button]}MB`].pressed=!0,this.double_clicked=!0)))}resetForNextStep(){return this.LMB.pressed=!1,this.MMB.pressed=!1,this.RMB.pressed=!1,this.LMB.released=!1,this.MMB.released=!1,this.RMB.released=!1,this.double_clicked=!1}},entityClasses:m,addEntityClass:function(e){return m[e.name]=e},helpers:i}})(),r.default})()));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var __webpack_unused_export__;
var Editor, Mouse, Player, SavannaGrass, View, World, animate, canvas, ctx, e, editor, keyboard, mouse, terrain, view, view_smoothness, view_to, world;

Math.seedrandom("A world");

({View, Mouse, Editor} = __webpack_require__(505));

World = __webpack_require__(378);

keyboard = __webpack_require__(866);

SavannaGrass = __webpack_require__(475);

__webpack_require__(91);

__webpack_require__(339);

__webpack_require__(776);

__webpack_require__(521);

__webpack_require__(668);

Player = __webpack_require__(795);

__webpack_require__(914);

__webpack_require__(943);

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

editor = __webpack_unused_export__ = new Editor(world, view, view_to, canvas, mouse);

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
    
    // TODO: allow margin of offcenteredness
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

})();

/******/ })()
;