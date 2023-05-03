/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 378:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Entity, Terrain, World, closestPointOnLineSegment, distanceToLineSegment, hsl_to_rgb_hex,
  indexOf = [].indexOf;

Entity = __webpack_require__(293);

Terrain = __webpack_require__(891);

({distanceToLineSegment} = (__webpack_require__(505).helpers));

hsl_to_rgb_hex = __webpack_require__(10);

// Actually treat it as a segment, not an infinite line
// unlike copies of this function in some other files
closestPointOnLineSegment = function(point, a, b) {
  var a_to_b, a_to_p, atb2, atp_dot_atb, t;
  // https://stackoverflow.com/a/3122532/2624876
  a_to_p = {
    x: point.x - a.x,
    y: point.y - a.y
  };
  a_to_b = {
    x: b.x - a.x,
    y: b.y - a.y
  };
  atb2 = a_to_b.x ** 2 + a_to_b.y ** 2;
  atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
  t = atp_dot_atb / atb2;
  t = Math.max(0, Math.min(1, t));
  return {
    x: a.x + a_to_b.x * t,
    y: a.y + a_to_b.y * t
  };
};

module.exports = World = (function() {
  var bucket_height, bucket_width, count_hit_tests;

  class World {
    constructor() {
      // This is used for picking up nearby items in Player.
      this.closest = this.closest.bind(this);
      this.entities = [];
      this.derived_colliders = [];
    }

    toJSON() {
      return {
        format: World.format,
        formatVersion: World.formatVersion,
        entities: this.entities
      };
    }

    fromJSON(def) {
      var arrow_def, average_x, average_y, dot_or_bracket, ent_def, entity, i, i1, id, j, j1, k, k1, key, l, l1, len, len1, len10, len11, len12, len13, len14, len15, len16, len17, len18, len19, len2, len20, len3, len4, len5, len6, len7, len8, len9, m, m1, n, n1, o, o1, p, p1, point_def, point_name, prop, q, r, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, search_object, to_hex_if_hsl, top_key, top_value, u, upgrading_from_version, v, z;
      // ------------- DON'T PANIC -------------
      // File format versioning is easy!
      // The long comments below and error handling are to help you learn.
      // (And because I like to be thorough.)
      // It's not a complicated process.
      // ---------------------------------------
      if (def.format !== World.format) {
        if (def.format) {
          throw new Error(`Expected format to be \"${World.format}\", got ${def.format}`);
        } else {

        }
      }
      // As long as we support versions 3 or earlier, we can't rely on the format name being present.
      // If you're copying this code for a new format, you can uncomment this.
      // throw new Error "Missing format name. Expected property \"format\" to be \"#{World.format}\"."

      // If you want to drop support for old versions of the format, you can handle it like so:
      // minimum_supported_version = 3
      // if not def.formatVersion
      // 	throw new Error "This format is too old; it's missing a format version number. Expected property \"formatVersion\" to be an integer."
      // if def.formatVersion < minimum_supported_version
      // 	throw new Error "The format version #{def.formatVersion} is too old for this version of the game.
      // 	There is no automatic upgrade path for versions older than #{minimum_supported_version}."

      // Upgrade old versions of the format
      upgrading_from_version = def.formatVersion;
      if (!def.formatVersion) {
        if (!(def.entities instanceof Array)) {
          throw new Error(`Expected entities to be an array, got ${def.entities}`);
        }
        def.formatVersion = 1;
        ref = def.entities;
        // Arrow now uses prev_x/prev_y instead of of vx/vy for velocity
        // (Velocity is now implicit in the difference between prev_x/prev_y and x/y)
        for (j = 0, len = ref.length; j < len; j++) {
          ent_def = ref[j];
          if (!(ent_def._class_ === "Arrow")) {
            continue;
          }
          ent_def.structure.points.nock.prev_x = ent_def.structure.points.nock.x - ent_def.structure.points.nock.vx;
          ent_def.structure.points.nock.prev_y = ent_def.structure.points.nock.y - ent_def.structure.points.nock.vy;
          ent_def.structure.points.tip.prev_x = ent_def.structure.points.tip.x - ent_def.structure.points.tip.vx;
          ent_def.structure.points.tip.prev_y = ent_def.structure.points.tip.y - ent_def.structure.points.tip.vy;
          delete ent_def.structure.points.nock.vx;
          delete ent_def.structure.points.nock.vy;
          delete ent_def.structure.points.tip.vx;
          delete ent_def.structure.points.tip.vy;
        }
      }
      if (def.formatVersion === 1) {
        def.formatVersion = 2;
        // spell-checker: disable
        // "elbo" is now "elbow" in Player's segment names
        // do regex replace on JSON, since it's way simpler, and handles references too
        def.entities = JSON.parse(JSON.stringify(def.entities).replace(/\belbo\b/g, 'elbow'));
      }
      // spell-checker: enable
      // Note that the animation data also requires this rename, but there's no automatic upgrade system yet
      if (def.formatVersion === 2) {
        def.formatVersion = 3;
        ref1 = def.entities;
        // Removed leaf_point_names from Tree, and added is_leaf property to points
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          ent_def = ref1[k];
          if (!(ent_def._class_.includes("Tree"))) {
            continue;
          }
          ref2 = ent_def.structure.points;
          for (point_name in ref2) {
            point_def = ref2[point_name];
            point_def.is_leaf = indexOf.call(ent_def.leaf_point_names, point_name) >= 0;
          }
          delete ent_def.leaf_point_names;
        }
      }
      if (def.formatVersion === 3) {
        def.formatVersion = 4;
        ref3 = def.entities;
        // Caterpillar's structure has changed. Delete the old one and let it be recreated.
        // This may cause the caterpillar to be in a different position than it was before,
        // but I don't care enough to do a detailed upgrade.
        // You know what? I'll center it on the old position, in case the points
        // strayed far away from the entity's position.
        for (l = 0, len2 = ref3.length; l < len2; l++) {
          ent_def = ref3[l];
          if (!(ent_def._class_ === "Caterpillar")) {
            continue;
          }
          average_x = 0;
          average_y = 0;
          ref4 = ent_def.structure.points;
          for (point_name in ref4) {
            point_def = ref4[point_name];
            average_x += point_def.x;
            average_y += point_def.y;
          }
          average_x /= Object.keys(ent_def.structure.points).length;
          average_y /= Object.keys(ent_def.structure.points).length;
          ent_def.x += average_x;
          ent_def.y += average_y;
          delete ent_def.structure;
        }
        ref5 = def.entities;
        // Player's holding_arrow is now holding_arrows, and is an array
        for (m = 0, len3 = ref5.length; m < len3; m++) {
          ent_def = ref5[m];
          if (!(ent_def._class_ === "Player")) {
            continue;
          }
          ent_def.holding_arrows = [];
          if (ent_def.holding_arrow) {
            ent_def.holding_arrows.push(ent_def.holding_arrow);
          }
          delete ent_def.holding_arrow;
        }
      }
      if (def.formatVersion === 4) {
        def.formatVersion = 5;
        ref6 = def.entities;
        // `intangible` was never meant to be serialized if it was `intangible_because_optimized`
        // and this caused a problem with the auto spawn dev tool 
        for (n = 0, len4 = ref6.length; n < len4; n++) {
          ent_def = ref6[n];
          if (ent_def.intangible_because_optimized) {
            delete ent_def.intangible;
            delete ent_def.intangible_because_optimized;
          }
        }
      }
      if (def.formatVersion === 5) {
        def.formatVersion = 6;
        ref7 = def.entities;
        // Remove cruft from Player: reaching_for_segment, reaching_for_segment, reaching_for_entity, reaching_with_secondary_hand, ground_angle, smoothed_vy, hair_x_scales
        for (o = 0, len5 = ref7.length; o < len5; o++) {
          ent_def = ref7[o];
          if (!(ent_def._class_ === "Player")) {
            continue;
          }
          delete ent_def.reaching_for_segment;
          delete ent_def.reaching_for_entity;
          delete ent_def.reaching_with_secondary_hand;
          delete ent_def.ground_angle;
          delete ent_def.smoothed_vy;
          delete ent_def.hair_x_scales;
        }
      }
      if (def.formatVersion === 6) {
        def.formatVersion = 7;
        // Rename color properties to include "color" to be picked up by the entity inspector/editor
        // and convert hsl[a] to rgb hex when appropriate, using hsl_to_rgb_hex
        to_hex_if_hsl = function(color) {
          if (color.match(/hsl/i)) {
            return hsl_to_rgb_hex(color);
          }
          return color;
        };
        ref8 = def.entities;
        // Rabbit: c -> body_color, c2 -> body_shadow_color
        // Butterfly: c1 -> color_1, c2 -> color_2
        // Frog: c -> body_color
        // Deer: c -> body_color
        for (p = 0, len6 = ref8.length; p < len6; p++) {
          ent_def = ref8[p];
          if (!((ref9 = ent_def._class_) === "Frog" || ref9 === "Deer" || ref9 === "Rabbit")) {
            continue;
          }
          ent_def.body_color = to_hex_if_hsl(ent_def.c);
          delete ent_def.c;
        }
        ref10 = def.entities;
        // c2 differs between Rabbit and Butterfly
        for (q = 0, len7 = ref10.length; q < len7; q++) {
          ent_def = ref10[q];
          if (!(ent_def._class_ === "Rabbit")) {
            continue;
          }
          ent_def.body_shadow_color = to_hex_if_hsl(ent_def.c2);
          delete ent_def.c2;
        }
        ref11 = def.entities;
        for (r = 0, len8 = ref11.length; r < len8; r++) {
          ent_def = ref11[r];
          if (!(ent_def._class_ === "Butterfly")) {
            continue;
          }
          ent_def.color_1 = to_hex_if_hsl(ent_def.c1);
          delete ent_def.c1;
          ent_def.color_2 = to_hex_if_hsl(ent_def.c2);
          delete ent_def.c2;
        }
      }
      if (def.formatVersion === 7) {
        def.formatVersion = 8;
        ref12 = def.entities;
        // Fix botched entity references in Player when naively defining a toJSON overload.
        // Entity defines a limited system for resolving references to other Entities:
        /*
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
        */
        // I temporarily overrode toJSON without taking _refs_ into account,
        // so we need to construct _refs_ here based on accidentally serialized entity references.
        for (s = 0, len9 = ref12.length; s < len9; s++) {
          ent_def = ref12[s];
          if (!(ent_def._class_ === "Player")) {
            continue;
          }
          if (ent_def._refs_ == null) {
            ent_def._refs_ = {};
          }
// grounded and riding are from hit tests, which now return Terrain entities
// for prop in ["reaching_for_entity", "holding_bow", "riding", "grounded", "submerged"]
// we can do this more generally just as easily, or easier
          for (prop in ent_def) {
            if ((ref13 = ent_def[prop]) != null ? ref13._class_ : void 0) {
              ent_def._refs_[prop] = ent_def[prop].id;
              delete ent_def[prop];
            }
          }
        }
      }
      if (def.formatVersion === 8) {
        def.formatVersion = 9;
        ref14 = def.entities;
        // Player now serializes references as _recursive_refs_: [[key_path, id], ...] where key_path is an array of keys
        // instead of _refs: {key: id, ...} which only worked for top-level entity references.
        // This is to fix incorrect serialization of holding_arrows, which is an array of entities,
        // which had a workaround of ad-hoc resolving references using the id of the accidentally serialized entity.
        // We need to convert _refs to _recursive_refs_ here, but also fix up holding_arrows.
        for (u = 0, len10 = ref14.length; u < len10; u++) {
          ent_def = ref14[u];
          if (!(ent_def._class_ === "Player")) {
            continue;
          }
          if (ent_def._refs_) {
            ent_def._recursive_refs_ = [];
            ref15 = ent_def._refs_;
            for (key in ref15) {
              id = ref15[key];
              ent_def._recursive_refs_.push([[key], id]);
            }
            delete ent_def._refs_;
          }
          if (ent_def.holding_arrows) {
            if (ent_def._recursive_refs_ == null) {
              ent_def._recursive_refs_ = [];
            }
            ref16 = ent_def.holding_arrows;
            for (i = v = 0, len11 = ref16.length; v < len11; i = ++v) {
              arrow_def = ref16[i];
              ent_def._recursive_refs_.push([["holding_arrows", i], arrow_def.id]);
            }
            // Keep the object so the references can be resolved into it,
            // but clear it of the accidentally serialized entities.
            ent_def.holding_arrows = [];
          }
        }
      }
      if (def.formatVersion === 9) {
        def.formatVersion = 10;
        ref17 = def.entities;
        // Remove cruft from serialization
        // GrassyTerrain: grass_tiles Map is derived state.
        // Previously it was serialized as an empty object, now it's omitted.
        for (z = 0, len12 = ref17.length; z < len12; z++) {
          ent_def = ref17[z];
          if ((ref18 = ent_def._class_) === "GrassyTerrain" || ref18 === "LushGrass" || ref18 === "SavannaGrass") {
            delete ent_def.grass_tiles;
          }
        }
        ref19 = def.entities;
        // Water: waves was renamed waves_y, but most files have the new property already.
        // (waves_y has been, since its introduction, created automatically.)
        // Water: ccw, min_x, max_x, min_y, max_y are all derived from the polygon
        for (i1 = 0, len13 = ref19.length; i1 < len13; i1++) {
          ent_def = ref19[i1];
          if (!(ent_def._class_ === "Water")) {
            continue;
          }
          if (ent_def.waves && !ent_def.waves_y) {
            ent_def.waves_y = ent_def.waves;
          }
          delete ent_def.waves;
          delete ent_def.ccw;
          delete ent_def.min_x;
          delete ent_def.max_x;
          delete ent_def.min_y;
          delete ent_def.max_y;
        }
      }
      if (def.formatVersion === 10) {
        def.formatVersion = 11;
        ref20 = def.entities;
        // Deer: dir_pl -> smoothed_facing_x, dir_p is renamed/removed in favor of facing_x from SimpleActor
        // I believe the 'l' stood for "linearly interpolated", but I'm not sure about the 'p'.
        // Maybe 'p' meant "positive(/negative)"? or "pointing", as in a facing direction?
        // I copied this code from an era where I used single-letter variable names.
        // Those were the days... where I can't understand my code from.
        for (j1 = 0, len14 = ref20.length; j1 < len14; j1++) {
          ent_def = ref20[j1];
          if (!(ent_def._class_ === "Deer")) {
            continue;
          }
          if (ent_def.dir_pl != null) {
            ent_def.smoothed_facing_x = ent_def.dir_pl;
          }
          delete ent_def.dir_pl;
          if (ent_def.dir_p != null) {
            ent_def.facing_x = ent_def.dir_p;
          }
          delete ent_def.dir_p;
        }
      }
      if (def.formatVersion === 11) {
        def.formatVersion = 12;
        ref21 = def.entities;
        // Deer: dir is removed in favor of move_x from SimpleActor
        for (k1 = 0, len15 = ref21.length; k1 < len15; k1++) {
          ent_def = ref21[k1];
          if (!(ent_def._class_ === "Deer")) {
            continue;
          }
          if (ent_def.dir != null) {
            ent_def.move_x = ent_def.dir;
          }
          delete ent_def.dir;
        }
      }
      if (def.formatVersion === 12) {
        def.formatVersion = 13;
        ref22 = def.entities;
        // Deer: xp -> x_prev, t -> idle_timer, lr -> leg_rotation
        for (l1 = 0, len16 = ref22.length; l1 < len16; l1++) {
          ent_def = ref22[l1];
          if (!(ent_def._class_ === "Deer")) {
            continue;
          }
          if (ent_def.xp != null) {
            ent_def.x_prev = ent_def.xp;
          }
          delete ent_def.xp;
          if (ent_def.t != null) {
            ent_def.idle_timer = ent_def.t;
          }
          delete ent_def.t;
          if (ent_def.lr != null) {
            ent_def.leg_rotation = ent_def.lr;
          }
          delete ent_def.lr;
        }
      }
      if (def.formatVersion === 13) {
        def.formatVersion = 14;
        ref23 = def.entities;
        // Player: real_facing_x -> upper_body_facing_x and lower_body_facing_x, prev_real_facing_x -> prev_upper_body_prev_facing_x
        for (m1 = 0, len17 = ref23.length; m1 < len17; m1++) {
          ent_def = ref23[m1];
          if (!(ent_def._class_ === "Player")) {
            continue;
          }
          if (ent_def.real_facing_x != null) {
            ent_def.upper_body_facing_x = ent_def.real_facing_x;
          }
          if (ent_def.real_facing_x != null) {
            ent_def.lower_body_facing_x = ent_def.real_facing_x;
          }
          delete ent_def.real_facing_x;
          if (ent_def.prev_real_facing_x != null) {
            ent_def.prev_upper_body_facing_x = ent_def.prev_real_facing_x;
          }
          delete ent_def.prev_real_facing_x;
        }
      }
      if (def.formatVersion === 14) {
        def.formatVersion = 15;
        ref24 = def.entities;
        // Player: done away with prev_upper_body_facing_x, facing_turn_timer
        for (n1 = 0, len18 = ref24.length; n1 < len18; n1++) {
          ent_def = ref24[n1];
          if (!(ent_def._class_ === "Player")) {
            continue;
          }
          delete ent_def.prev_upper_body_facing_x;
          delete ent_def.facing_turn_timer;
        }
      }
      // TODO: remove more cruft from serialization
      // can't do this until we own Terrain, right now it's part of Skele2D.
      // # Terrain: width, max_height, left, right, bottom
      // # These are pretty silly to serialize (or store), since we can use the bounding box
      // for ent_def in def.entities when ent_def._class_ is "Terrain"
      // 	delete ent_def.width
      // 	delete ent_def.max_height
      // 	delete ent_def.left
      // 	delete ent_def.right
      // 	delete ent_def.bottom

      // Note: it's a good idea to bump the version number when adding new features
      // that won't be supported by older versions, even without upgrade code,
      // but this is more important for applications, or games with level sharing.
      // For Tiamblia, the format is only authored by the game developer (me),
      // and people coming to see the demo and messing around with the editor,
      // who should be using the latest version of the game anyway,
      // so it's not as important, and I'm not bothering, basically as a policy.
      // The worst it can do is cause some confusion when stepping back in git history.

      // Also note: if you forget to upgrade something,
      // you should generally add a new version upgrade at the end.
      // If you add it earlier, it won't be run on worlds that were saved
      // with newer versions of the game.

      // Similarly, if an upgrade step is buggy, it may be better to add a new one
      // at the end that fixes the damage, rather than fixing the buggy one,
      // if only so there is only one upgrade path to the current version,
      // because theoretically an intermediate upgrade could rely on the broken data,
      // although it's unlikely.
      // That said, if information is lost in the buggy upgrade,
      // it's probably better to fix the buggy one.
      // If there is ever a scenario where an intermediate upgrade step
      // relies on the broken data, AND information is lost in the buggy upgrade,
      // one could extract data before the buggy upgrade, and then reapply it
      // after the buggy upgrade, if available, but it still will be lost in files
      // saved with the buggy upgrade, so you have to deal with both cases.
      // Or you could update the intermediate upgrade steps to handle both cases.
      // It just depends which is easier, and easier to get right.

      // Handle format versions newer than supported
      // This could offer a choice to the user to try to load the world anyway, but that's not implemented.
      if (def.formatVersion > World.formatVersion) {
        if (def.formatVersion > upgrading_from_version) {
          throw new Error(`You forgot to update World.formatVersion to ${def.formatVersion} when adding an upgrade step!`);
        }
        throw new Error(`The format version ${def.formatVersion} is too new for this version of the game.`);
      }
      // Just in case the format version format changes to a string like X.Y.Z or something
      if (def.formatVersion !== World.formatVersion) {
        throw new Error(`Unsupported format version ${def.formatVersion}`);
      }
      
      // Validate the current version of the format
      // Note: if any validation becomes invalid here,
      // you may want to "archive" it in the last upgrade step where it was valid,
      // so that it can still validate worlds saved with that version or earlier.
      if (!(def.entities instanceof Array)) {
        throw new Error(`Expected entities to be an array, got ${def.entities}`);
      }
      ref25 = def.entities;
      for (i = o1 = 0, len19 = ref25.length; o1 < len19; i = ++o1) {
        ent_def = ref25[i];
        if (typeof ent_def._class_ !== "string") {
          throw new Error(`Expected entities[${i}]._class_ to be a string, got ${ent_def._class_}`);
        }
        if (typeof ent_def.id !== "string") {
          throw new Error(`Expected entities[${i}].id to be a string, got ${ent_def.id}`);
        }
        if (typeof ent_def.x !== "number") {
          throw new Error(`Expected entities[${i}].x to be a number, got ${ent_def.x}`);
        }
        if (typeof ent_def.y !== "number") {
          throw new Error(`Expected entities[${i}].y to be a number, got ${ent_def.y}`);
        }
        if (typeof ent_def.structure !== "object") {
          throw new Error(`Expected entities[${i}].structure to be an object, got ${ent_def.structure}`);
        }
        // Ensure there are no entity references not at the top level of an entity
        // Entity::resolveReferences only handles top-level references as a special case.
        // Player::resolveReferences actually overloads it with a more general solution,
        // but it's not yet improved in skele2d, which owns Entity (currently).
        // In either case, _class_ should not appear except at the top level of an entity,
        // since references are serialized with just the id.
        dot_or_bracket = (key) => {
          if (key.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
            return `.${key}`;
          } else if (key.match(/^[0-9]+$/)) {
            return `[${key}]`;
          } else {
            return `[${JSON.stringify(key)}]`;
          }
        };
        search_object = (obj, path_to_obj, get_more_context) => {
          var path_to_value, value;
          // console.debug "search_object(", obj, ",", JSON.stringify(path_to_obj), ")"
          if (typeof obj === "object" && obj !== null) {
            for (key in obj) {
              value = obj[key];
              path_to_value = `${path_to_obj}${dot_or_bracket(key)}`;
              // console.debug "search_object: #{path_to_value} = #{JSON.stringify(value)}"
              if (key === "_class_") {
                throw new Error(`Entity references must be at the top level of an entity, but found ${path_to_value} = ${JSON.stringify(value)} ${get_more_context()[0]} ${JSON.stringify(get_more_context()[1])}`);
              }
              // console.error "Entity references should only be at the top level of an entity, but found #{path_to_value} = #{JSON.stringify(value)}", ...get_more_context()
              if (typeof value === "object" && value !== null) {
                search_object(value, path_to_value, get_more_context);
              }
            }
          }
        };
        for (top_key in ent_def) {
          top_value = ent_def[top_key];
          search_object(top_value, `entities[${i}]${dot_or_bracket(top_key)}`, function() {
            return [`where entities[${i}] is ${ent_def._class_}`, ent_def];
          });
        }
      }
      
      // Initialize the world
      this.entities = (function() {
        var len20, p1, ref26, results;
        ref26 = def.entities;
        results = [];
        for (p1 = 0, len20 = ref26.length; p1 < len20; p1++) {
          ent_def = ref26[p1];
          results.push(Entity.fromJSON(ent_def));
        }
        return results;
      })();
      ref26 = this.entities;
      for (p1 = 0, len20 = ref26.length; p1 < len20; p1++) {
        entity = ref26[p1];
        entity.resolveReferences(this);
      }
    }

    getEntityByID(id) {
      var entity, j, len, ref;
      ref = this.entities;
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        if (entity.id === id) {
          return entity;
        }
      }
      return null;
    }

    getEntitiesOfType(Class) {
      var entity;
      return (function() {
        var j, len, ref, results;
        ref = this.entities;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          entity = ref[j];
          if (entity instanceof Class) {
            results.push(entity);
          }
        }
        return results;
      }).call(this);
    }

    drawBackground(ctx, view) {
      ctx.fillStyle = "#32C8FF";
      ctx.fillRect(0, 0, view.width, view.height);
      if (!this.bg) {
        this.bg = document.createElement("canvas");
        this.bg.width = 5000;
        this.bg.height = 800;
        this.drawMountains(this.bg.getContext("2d"));
      }
      ctx.drawImage(this.bg, (-view.center_x - 5000 / 2) / 2, 500 - view.center_y / 5);
    }

    drawMountains(ctx) {
      var green, h, i, results, w, x, y;
      green = false;
      if (green) {
        ctx.fillStyle = `hsla(155,${90 - (Math.random() * 6)}%,${59 - (Math.random() * 6)}%,1)`;
      } else {
        ctx.fillStyle = `hsla(205,${90 - (Math.random() * 6)}%,${69 - (Math.random() * 6)}%,1)`;
      }
      ctx.fillRect(0, 100, ctx.canvas.width, ctx.canvas.height);
      i = 0;
      results = [];
      while (i < 3) {
        //ctx.globalAlpha=0.4
        //y=ctx.canvas.height-(3-i)*100-200
        if (green) {
          ctx.fillStyle = `hsla(155,${80 - (i * 10) - (Math.random() * 6)}%,${65 - (i * 0) - (Math.random() * 6)}%,1)`;
        } else {
          ctx.fillStyle = `hsla(205,${80 - (i * 10) - (Math.random() * 6)}%,${65 - (i * 0) - (Math.random() * 6)}%,1)`;
        }
        x = -Math.random() * 50;
        while (x < ctx.canvas.width) {
          y = i * 100 + 100;
          w = ((Math.random() * 50 + 50) * i + 10) * 5;
          h = (Math.random() * 50 * i + 10 + w / 2) / 2;
          if (Math.random() < 0.2) {
            // if Math.random() < 0.2
            // 	#ctx.fillStyle="hsla(155,"+(80-i*10-Math.random()*6)+"%,"+(65-i*0-Math.random()*6)+"%,1)"
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w / 2, y - h);
            ctx.fill();
          }
          x += w * Math.random();
        }
        results.push(i += 0.1);
      }
      return results;
    }

    draw(ctx, view) {
      var _restore, _save, entity, error, j, len, n_saved_states, ref;
      ref = this.entities;
      // ctx.fillStyle = "#32C8FF"
      // {x, y} = view.toWorld({x: 0, y: 0})
      // {x: width, y: height} = view.toWorld({x: view.width, y: view.height})
      // ctx.fillRect(x, y, width-x, height-y)
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        ctx.save();
        ctx.translate(entity.x, entity.y);
        _save = ctx.save;
        _restore = ctx.restore;
        n_saved_states = 0;
        ctx.save = function() {
          n_saved_states++;
          _save.apply(this, arguments);
        };
        ctx.restore = function() {
          n_saved_states--;
          _restore.apply(this, arguments);
        };
        try {
          entity.draw(ctx, view, this);
        } catch (error1) {
          error = error1;
          console.error(`Error drawing entity ${entity.constructor.name} ${entity.id}:`, error);
          while (n_saved_states) {
            ctx.restore();
          }
        }
        ctx.save = _save;
        ctx.restore = _restore;
        ctx.restore();
      }
    }

    updateCollisionBuckets() {
      var base, base1, bbox, bbox_max_world, bbox_min_world, bx1, bx2, bxi, by1, by2, byi, entity, j, k, l, len, ref, ref1, ref2, ref3, ref4;
      this.collision_buckets = {};
      ref = [...this.entities, ...this.derived_colliders];
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        if (!(!entity.intangible)) {
          continue;
        }
        // For PolygonStructure, we can use the bounding box of the structure
        // which ignores bbox_padding which shouldn't apply to polygons.
        // For BoneStructure, bbox_padding makes lineThickness in collision detection work
        // when entities are near the collision bucket boundary.
        // TODO: separate bbox padding for visual and collision purposes.
        if (entity.structure.bbox_max) {
          bbox_min_world = entity.toWorld(entity.structure.bbox_min);
          bbox_max_world = entity.toWorld(entity.structure.bbox_max);
          bbox = {
            x: bbox_min_world.x,
            y: bbox_min_world.y,
            width: bbox_max_world.x - bbox_min_world.x,
            height: bbox_max_world.y - bbox_min_world.y
          };
        } else {
          bbox = entity.bbox();
        }
        bx1 = Math.floor(bbox.x / bucket_width);
        bx2 = Math.floor((bbox.x + bbox.width) / bucket_width);
        for (bxi = k = ref1 = bx1, ref2 = bx2; (ref1 <= ref2 ? k <= ref2 : k >= ref2); bxi = ref1 <= ref2 ? ++k : --k) {
          // one dimensional bucketization
          // @collision_buckets[bxi] ?= []
          // @collision_buckets[bxi].push(entity)
          // two dimensional bucketization
          if ((base = this.collision_buckets)[bxi] == null) {
            base[bxi] = {};
          }
          by1 = Math.floor(bbox.y / bucket_height);
          by2 = Math.floor((bbox.y + bbox.height) / bucket_height);
          for (byi = l = ref3 = by1, ref4 = by2; (ref3 <= ref4 ? l <= ref4 : l >= ref4); byi = ref3 <= ref4 ? ++l : --l) {
            if ((base1 = this.collision_buckets[bxi])[byi] == null) {
              base1[byi] = [];
            }
            this.collision_buckets[bxi][byi].push(entity);
          }
        }
      }
    }

    drawCollisionBuckets(ctx, view) {
      var b_x, b_y, bucket_column, entities, entity, entity_bbox, entity_cx, entity_cy, j, len, ref;
      ctx.lineWidth = 1 / view.scale;
      ctx.strokeStyle = "#FFFF00";
      ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
      ref = this.collision_buckets;
      for (b_x in ref) {
        bucket_column = ref[b_x];
        for (b_y in bucket_column) {
          entities = bucket_column[b_y];
          // ctx.strokeRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
          // ctx.fillRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
          ctx.fillRect(b_x * bucket_width + 1 / view.scale, b_y * bucket_height + 1 / view.scale, bucket_width - 2 / view.scale, bucket_height - 2 / view.scale);
          for (j = 0, len = entities.length; j < len; j++) {
            entity = entities[j];
            // bbox = entity.bbox()
            // ctx.fillRect(bbox.x, bbox.y, bbox.width, bbox.height)
            // draw line from entity center to bucket center
            entity_bbox = entity.bbox();
            entity_cx = entity_bbox.x + entity_bbox.width / 2;
            entity_cy = entity_bbox.y + entity_bbox.height / 2;
            ctx.beginPath();
            ctx.moveTo(entity_cx, entity_cy);
            ctx.lineTo(b_x * bucket_width + bucket_width / 2, b_y * bucket_height + bucket_height / 2);
            ctx.stroke();
          }
        }
      }
    }

    drawCollisionHeatMap(ctx, view) {
      var b_x, b_y, bucket_column, hit_test_count, ref;
      ctx.lineWidth = 1 / view.scale;
      ctx.strokeStyle = "#FF0000";
      ref = this.hit_test_counts;
      for (b_x in ref) {
        bucket_column = ref[b_x];
        for (b_y in bucket_column) {
          hit_test_count = bucket_column[b_y];
          if (hit_test_count > 0) {
            // The stroke is useful to see low hit counts
            ctx.strokeRect(b_x * bucket_width, b_y * bucket_height, bucket_width, bucket_height);
            ctx.fillStyle = `rgba(255, 0, 0, ${hit_test_count / 100})`;
            // ctx.fillRect(b_x*bucket_width, b_y*bucket_height, bucket_width, bucket_height)
            ctx.fillRect(b_x * bucket_width + 1 / view.scale, b_y * bucket_height + 1 / view.scale, bucket_width - 2 / view.scale, bucket_height - 2 / view.scale);
          }
        }
      }
    }

    resetCollisionHeatMap() {
      this.hit_test_counts = {};
    }

    optimizeTerrain() {
      var bbox_max_world, bbox_min_world, bucket_x, bucket_x_max, bucket_x_min, cut_x, ent_def, epsilon, error, i, j, k, l, len, len1, len2, len3, m, min_points, n, new_terrain_entity, o, old_points, old_points_flat, old_terrain_entities, old_terrain_entity, point, polygons, ref, ref1, ref2, sliced_points, sliced_points_flat;
      // Divides terrain into smaller polygons horizontally,
      // so it can fit into the collision buckets.
      // This happens at the start of the game.
      // Instead of creating new entities of the same type as the original,
      // we'll leave the original entity for visual purposes,
      // and store the derived colliders separately from entities, without serialization.
      // This strategy allows perfect visual fidelity without hacks,
      // and prevents the possibility of losing the original polygons
      // by saving after starting the simulation, or doubly optimizing, creating slivers.

      // First, undo any previous optimization.
      // TODO: rename "old" -> "original"/"source"/"base"/"parent"/something,
      // since it's no longer replaced entirely.
      this.derived_colliders = [];
      old_terrain_entities = this.getEntitiesOfType(Terrain);
      for (j = 0, len = old_terrain_entities.length; j < len; j++) {
        old_terrain_entity = old_terrain_entities[j];
        if (old_terrain_entity.intangible_because_optimized) {
          delete old_terrain_entity.intangible;
          delete old_terrain_entity.intangible_because_optimized;
        }
      }
      for (k = 0, len1 = old_terrain_entities.length; k < len1; k++) {
        old_terrain_entity = old_terrain_entities[k];
        // Prevent optimization if there's not many points
        // This could be more nuanced, taking into account the area vs bounding box,
        // or the number of buckets the polygon would occupy,
        // or the ratio of the bounding box area to the sum of bounding boxes of split polygons.
        // We don't need to optimize optimizeTerrain itself much because it's only run once,
        // so running the splitting algorithm small polygons is not a big deal.
        min_points = 10;
        if (Object.keys(old_terrain_entity.structure.points).length < min_points) {
          continue;
        }
        old_points = Object.values(old_terrain_entity.structure.points);
        old_points_flat = [];
        for (l = 0, len2 = old_points.length; l < len2; l++) {
          point = old_points[l];
          old_points_flat.push(point.x, point.y);
        }
        // PolygonStructure has bbox_min and bbox_max properties
        // which are in local coordinates.
        // We'll use them instead of entity.bbox() because
        // we don't want bbox_padding to affect the optimization.
        // But we still want world coordinates.
        bbox_min_world = old_terrain_entity.toWorld(old_terrain_entity.structure.bbox_min);
        bbox_max_world = old_terrain_entity.toWorld(old_terrain_entity.structure.bbox_max);
        bucket_x_min = Math.floor(bbox_min_world.x / bucket_width);
        bucket_x_max = Math.floor(bbox_max_world.x / bucket_width);
        polygons = [old_points_flat];
        for (bucket_x = m = ref = bucket_x_min, ref1 = bucket_x_max; (ref <= ref1 ? m <= ref1 : m >= ref1); bucket_x = ref <= ref1 ? ++m : --m) {
          // Cut in the middle of the bucket, because the terrain
          // will land into two buckets anyways, right?
          // I did this when I was overlapping the polygons for rendering and to
          // prevent caterpillars from crawling through the cracks.
          // With the overlap, the polygons would fit into 3 buckets,
          // even though they were only slightly wider than 1 bucket,
          // unless offset by more than the overlap.
          // The overlap is no longer needed, and I've removed it.
          // TODO: can I fit the polygons into 1 bucket now?
          cut_x = bucket_x * bucket_width + bucket_width / 2 - old_terrain_entity.x;
          // PolyK has some problems when the cut line is exactly on a point.
          // So we'll offset it a small amount.
          // This may lead to tiny polygons if the terrain is doubly optimized,
          // but ideally, the world editing workflow should involve resetting
          // the simulation, so that terrain is not saved as split polygons,
          // and in general so unnecessary changes are not made to the world,
          // so that git diffs are small and there's less confusion,
          // such as unknowingly saving the player with an idle animation just about to start.
          epsilon = 0.0001;
          while (polygons.some((polygon_coords) => {
              return polygon_coords.some((coord, i) => {
                return i % 2 === 0 && Math.abs(coord - cut_x) < epsilon;
              });
            })) {
            // I tried using https://www.npmjs.com/package/nextafter
            // for a minimal offset, but it still got TypeError: i0 is undefined.
            // cut_x = nextAfter(cut_x, Infinity)
            cut_x += epsilon;
          }
          try {
            // TODO: non-arbitrary y values, or at least bigger
            polygons = polygons.flatMap(function(polygon) {
              return PolyK.Slice(polygon, cut_x, -99999, cut_x, 99999);
            });
          } catch (error1) {
            error = error1;
            console.warn("Error optimizing terrain:", error);
          }
        }
        if (polygons.length === 1) {
          continue;
        }
        old_terrain_entity.intangible = true;
        old_terrain_entity.intangible_because_optimized = true;
        for (n = 0, len3 = polygons.length; n < len3; n++) {
          sliced_points_flat = polygons[n];
          sliced_points = [];
          for (i = o = 0, ref2 = sliced_points_flat.length; o < ref2; i = o += 2) {
            sliced_points.push({
              x: sliced_points_flat[i],
              y: sliced_points_flat[i + 1]
            });
          }
          // Relying on the specific serialization format of PolygonStructure.
          // It stores points as an array, unlike the base class Structure, which supports named points.
          // Also, this doesn't need to be the original entity class,
          // we could probably just use the base class Terrain.
          // We shouldn't need to do anything special to make it invisible,
          // since it's not going in the world.entities array.
          ent_def = Object.assign(JSON.parse(JSON.stringify(old_terrain_entity)), {
            structure: {
              points: sliced_points
            },
            intangible: false,
            intangible_because_optimized: false,
            entity_collider_is_derived_from: old_terrain_entity
          });
          delete ent_def.id;
          new_terrain_entity = Entity.fromJSON(ent_def);
          this.derived_colliders.push(new_terrain_entity);
        }
      }
    }

    collision(point, {types = [Terrain], lineThickness = 5} = {}) {
      var b_x, b_y, base, base1, dist, entities, entity, j, k, len, len1, local_point, match, ref, ref1, ref2, ref3, segment, segment_name, type;
      // lineThickness doesn't apply to polygons like Terrain
      // also it's kind of a hack, because different entities could need different lineThicknesses
      // and different segments within an entity too
      // Also note that lineThickness > bbox_padding could have false negatives
      // at collision bucket boundaries.
      // The bbox_padding was originally meant for framing entity previews (and maybe culling rendering).
      // As of writing all entities have bbox_padding > 5, so this shouldn't be a problem.
      if (!this.collision_buckets) {
        console.warn("Collision detection called before collision buckets were initialized.");
        this.updateCollisionBuckets();
      }
      // no bucketization (to compare FPS, also disable updateCollisionBuckets and perhaps optimizeTerrain)
      // entities = @entities
      // one dimensional bucketization
      // b_x = Math.floor(point.x/bucket_width)
      // entities = @collision_buckets[b_x] ? []
      // two dimensional bucketization
      b_x = Math.floor(point.x / bucket_width);
      b_y = Math.floor(point.y / bucket_height);
      entities = (ref = ((ref1 = this.collision_buckets[b_x]) != null ? ref1 : {})[b_y]) != null ? ref : [];
      if (count_hit_tests) {
        if (this.hit_test_counts == null) {
          this.hit_test_counts = {};
        }
        if ((base = this.hit_test_counts)[b_x] == null) {
          base[b_x] = {};
        }
        if ((base1 = this.hit_test_counts[b_x])[b_y] == null) {
          base1[b_y] = 0;
        }
        this.hit_test_counts[b_x][b_y]++;
      }
      for (j = 0, len = entities.length; j < len; j++) {
        entity = entities[j];
        if (typeof types === "function") {
          if (!types(entity)) {
            continue;
          }
        } else {
          match = false;
          for (k = 0, len1 = types.length; k < len1; k++) {
            type = types[k];
            if ((entity instanceof type) && ((ref2 = entity.solid) != null ? ref2 : true)) {
              match = true;
              break;
            }
          }
          if (!match) {
            continue;
          }
        }
        local_point = entity.fromWorld(point);
        if (entity.structure.pointInPolygon != null) {
          if (entity.structure.pointInPolygon(local_point)) {
            if (entity.entity_collider_is_derived_from) {
              return entity.entity_collider_is_derived_from;
            }
            return entity;
          }
        } else {
          ref3 = entity.structure.segments;
          for (segment_name in ref3) {
            segment = ref3[segment_name];
            dist = distanceToLineSegment(local_point, segment.a, segment.b);
            if (dist < lineThickness) {
              return entity;
            }
          }
        }
      }
      return null;
    }

    closest(point_in_world_space, EntityClass, filter) {
      var closest_dist, closest_entity, closest_segment, dist, entity, j, len, point_in_entity_space, ref, ref1, segment, segment_name;
      closest_dist = 2e308;
      closest_entity = null;
      closest_segment = null;
      ref = this.getEntitiesOfType(EntityClass);
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        if (!((typeof filter === "function" ? filter(entity) : void 0) || !filter)) {
          continue;
        }
        point_in_entity_space = entity.fromWorld(point_in_world_space);
        ref1 = entity.structure.segments;
        for (segment_name in ref1) {
          segment = ref1[segment_name];
          dist = distanceToLineSegment(point_in_entity_space, segment.a, segment.b);
          if (dist < closest_dist) {
            closest_dist = dist;
            closest_entity = entity;
            closest_segment = segment;
          }
        }
      }
      return {closest_entity, closest_dist, closest_segment};
    }

    // This is used for collision response in Caterpillar and Arrow.
    projectPointOutside(point_in_world_space, {types = [Terrain], outsideEntity} = {}) {
      var closest_distance, closest_point_in_hit_space, closest_point_in_world, closest_segment, dist, hit, point_in_hit_space, ref, segment, segment_name;
      // Ideally it should use joined polygons, with a boolean polygon union operation,
      // so that it projects to the overall boundary of the terrain, even across different types of terrain,
      // and prevents potential strange responses at crevices between different polygons.
      closest_distance = 2e308;
      closest_segment = null;
      hit = outsideEntity != null ? outsideEntity : this.collision(point_in_world_space, {types});
      if (!hit) {
        return null;
      }
      point_in_hit_space = hit.fromWorld(point_in_world_space);
      ref = hit.structure.segments;
      for (segment_name in ref) {
        segment = ref[segment_name];
        dist = distanceToLineSegment(point_in_hit_space, segment.a, segment.b);
        if (dist < closest_distance && Math.hypot(segment.a.x - segment.b.x, segment.a.y - segment.b.y) > 0.1) {
          closest_distance = dist;
          closest_segment = segment;
        }
      }
      if (closest_segment) {
        closest_point_in_hit_space = closestPointOnLineSegment(point_in_hit_space, closest_segment.a, closest_segment.b);
        closest_point_in_world = hit.toWorld(closest_point_in_hit_space);
        return {closest_point_in_world, closest_point_in_hit_space, closest_segment};
      }
      return null;
    }

  };

  World.format = "Tiamblia World";

  World.formatVersion = 15;

  bucket_width = 100;

  bucket_height = 100;

  count_hit_tests = ((function() {
    try {
      return localStorage["tiamblia.count_hit_tests"];
    } catch (error1) {}
  })()) === "true";

  return World;

}).call(this);


/***/ }),

/***/ 372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ArcheryTarget, Arrow, off_angle;

ArcheryTarget = __webpack_require__(233);

Arrow = __webpack_require__(943);

// Note: It helps to disable gravity for this test for symmetry,
// and to disable some conditions on lodging and enable visualization of the lodging constraints.
off_angle = 0;

module.exports = window.enable_arrow_test_scene = function() {
  addEventListener("mousemove", function(e) {
    off_angle = Math.atan2(e.clientY - innerHeight / 2, e.clientX - innerWidth / 2);
  });
  addEventListener("mousedown", function(e) {
    if (e.button === 1) { // middle click
      window.create_arrow_test_scene();
    }
  });
  window.create_arrow_test_scene();
};

// setTimeout window.create_arrow_test_scene, 1000
module.exports = window.create_arrow_test_scene = function() {
  var arrow, arrow_angle, arrows, j, k, ref, ref1, ref2, ref3, ref4, ref5, target, target_angle, world;
  world = window.the_world;
  world.entities.length = [];
  arrows = [];
  for (target_angle = j = ref = -Math.PI, ref1 = Math.PI, ref2 = Math.PI / 8; ref2 !== 0 && (ref2 > 0 ? j <= ref1 : j >= ref1); target_angle = j += ref2) {
    target = new ArcheryTarget();
    target.x = 200 * Math.cos(target_angle);
    target.y = 200 * Math.sin(target_angle);
    target.structure.points.a.x = -100 * Math.cos(target_angle);
    target.structure.points.a.y = -100 * Math.sin(target_angle);
    target.structure.points.b.x = 100 * Math.cos(target_angle);
    target.structure.points.b.y = 100 * Math.sin(target_angle);
    world.entities.push(target);

    // Create arrows shooting at the target from various angles
    for (arrow_angle = k = ref3 = -Math.PI, ref4 = Math.PI, ref5 = Math.PI / 16; ref5 !== 0 && (ref5 > 0 ? k <= ref4 : k >= ref4); arrow_angle = k += ref5) {
      arrow = new Arrow();
      arrow.x = target.x - 50 * Math.cos(arrow_angle);
      arrow.y = target.y - 50 * Math.sin(arrow_angle);
      arrow.structure.points.nock.x = -10 * Math.cos(arrow_angle + off_angle);
      arrow.structure.points.nock.y = -10 * Math.sin(arrow_angle + off_angle);
      arrow.structure.points.tip.x = 10 * Math.cos(arrow_angle + off_angle);
      arrow.structure.points.tip.y = 10 * Math.sin(arrow_angle + off_angle);
      arrow.setVelocity(5 * Math.cos(arrow_angle), 5 * Math.sin(arrow_angle));
      arrows.push(arrow);
    }
  }
  world.entities.push(...arrows);
};

window.create_arrow_volley = function({x = 0, y = 0, angle_min = -Math.PI * 3 / 4, angle_max = -Math.PI / 4, speed_min = 5, speed_max = 20, count = 100} = {}) {
  var arrow, arrow_angle, arrow_speed, arrows, i, j, ref, world;
  world = window.the_world;
  arrows = [];
  for (i = j = 0, ref = count; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    arrow = new Arrow();
    arrow.x = x;
    arrow.y = y;
    arrow_angle = Math.random() * (angle_max - angle_min) + angle_min;
    arrow_speed = Math.random() * (speed_max - speed_min) + speed_min;
    arrow.structure.points.nock.x = -10 * Math.cos(arrow_angle);
    arrow.structure.points.nock.y = -10 * Math.sin(arrow_angle);
    arrow.structure.points.tip.x = 10 * Math.cos(arrow_angle);
    arrow.structure.points.tip.y = 10 * Math.sin(arrow_angle);
    arrow.setVelocity(arrow_speed * Math.cos(arrow_angle), arrow_speed * Math.sin(arrow_angle));
    arrows.push(arrow);
  }
  world.entities.push(...arrows);
};


/***/ }),

/***/ 100:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var BreadcrumbsController, Controller, Entity, GUI, LinkButtonController, add_button, clear_auto_save, editor, entity_folder, file_handle, file_open, file_save, file_save_as, gui, icons, idb_keyval, inspect_entity, last_selected_entity, last_undoable_time, load_from_json, ms_between_undos, ms_idle_before_saving, name, old_Controller_setValue, option_names_to_keys, options, property_inspector_exclusions, ref, save_timeout, skele2d_folder, storage_key, store_file_handle, style_button_as_link, tiamblia_folder, update_property_inspector, verify_permission, world,
  indexOf = [].indexOf;

({Entity} = __webpack_require__(505));

({GUI, Controller} = __webpack_require__(33));

idb_keyval = __webpack_require__(193); // just for persisting file handles


// dependencies injected via configure_property_inspector()
editor = null;

world = null;

// UI for development features, accessible with the backtick/tilde (`/~) key
gui = new GUI();

gui.hide();

option_names_to_keys = {
  "Disable welcome message, start in edit mode": "tiamblia.disable_welcome_message",
  "Show performance stats": "tiamblia.show_stats",
  "Debug projectPointOutside": "tiamblia.debug_project_point_outside",
  "Debug Caterpillar class": "tiamblia.debug_caterpillar",
  "Debug Arrow class": "tiamblia.debug_arrow",
  "Debug Terrain class": "tiamblia.debug_terrain",
  "Show collision buckets": "tiamblia.show_collision_buckets",
  "Show hit tested buckets": "tiamblia.count_hit_tests",
  "Show point names": "Skele2D show names",
  "Show point indices": "Skele2D show indices",
  "Allow posing animatable entities in world": "Skele2D allow posing animatable entities in world",
  "Disable constraint solving while editing": "Skele2D disable constraint solving"
};

options = {};

tiamblia_folder = gui.addFolder("Tiamblia");

skele2d_folder = gui.addFolder("Skele2D");

entity_folder = gui.addFolder("Selected Entity");

for (name in option_names_to_keys) {
  storage_key = option_names_to_keys[name];
  (function(name, storage_key) {
    var folder;
    options[name] = ((function() {
      try {
        return localStorage[storage_key];
      } catch (error1) {}
    })()) === "true";
    folder = storage_key.indexOf("Skele2D") === 0 ? skele2d_folder : tiamblia_folder;
    folder.add(options, name).onChange(function(value) {
      localStorage[storage_key] = value;
    });
  })(name, storage_key);
}

options["Auto-spawn entities"] = (ref = ((function() {
  try {
    return localStorage["tiamblia.auto_spawn"];
  } catch (error1) {}
})())) != null ? ref : "";

tiamblia_folder.add(options, "Auto-spawn entities").onChange(function(value) {
  localStorage["tiamblia.auto_spawn"] = value;
});

file_handle = null;

// Verify the user has granted permission to read or write to the file, if
// permission hasn't been granted, request permission.
// getFile() can fail without requesting permission.

// @param {FileSystemFileHandle} file_handle File handle to check.
// @param {boolean} with_write whether write permission should be checked.
// @return {boolean} whether the user has granted read/write permission.
verify_permission = async function(file_handle, with_write) {
  options = {};
  if (with_write) {
    options.writable = true;
    // For Chrome 86 and later...
    options.mode = "readwrite";
  }
  if ((await file_handle.queryPermission(options)) === "granted") {
    return true;
  }
  if ((await file_handle.requestPermission(options)) === "granted") {
    return true;
  }
  return false;
};

clear_auto_save = async function() {
  var default_file_handle, exception, file, json;
  if (!confirm("Are you sure you want to reload the default world?")) {
    return;
  }
  localStorage.removeItem("Skele2D World");
  file_handle = null;
  await idb_keyval.del("tiamblia.file_handle");
  try {
    default_file_handle = (await idb_keyval.get("tiamblia.default_world_file_handle"));
    if (default_file_handle) {
      if (!(await verify_permission(default_file_handle, false))) {
        // This maybe doesn't fit with the spirit of a "Cancel" button...
        // location.reload()
        // I could simplify the UI by not clearing the auto-save if the user doesn't have permission to load the default world.
        // But it's a little weird since you don't need permission, if there's no file handle. It CAN just reload the page.
        alert("Auto-save cleared. If you want to get it back, edit something. If you want to load the default world, refresh the page.");
        return;
      }
      file = (await default_file_handle.getFile());
      json = (await file.text());
      load_from_json(json);
      file_handle = default_file_handle;
      await idb_keyval.set("tiamblia.file_handle", file_handle);
    } else {
      location.reload();
    }
  } catch (error1) {
    exception = error1;
    alert(`Cleared Skele2D World, but failed to load default world:\n\n${exception}\n\nRefresh the page to start over.`);
  }
};

idb_keyval.get("tiamblia.file_handle").then(function(value) {
  file_handle = value;
});

load_from_json = function(json) {
  var error, parsed;
  try {
    parsed = JSON.parse(json);
  } catch (error1) {
    error = error1;
    editor.warn(`Failed to parse file as JSON: ${error}`);
    return false;
  }
  // TODO: don't create extra undo step if error occurs in *.fromJSON()
  editor.undoable(() => {
    try {
      // world.fromJSON(parsed)
      // This avoids ghost a selection. It's a little hacky to use the editor's serialization methods, though.
      editor.fromJSON({
        world: parsed,
        selected_entity_ids: [],
        editing_entity_id: null,
        selected_point_names: []
      });
    } catch (error1) {
      error = error1;
      editor.warn(`Failed to load world: ${error}`);
    }
    return false;
  });
  return true;
};

store_file_handle = function(file_handle) {
  idb_keyval.set("tiamblia.file_handle", file_handle);
  // Maybe I should rename this file to be less generic
  if (file_handle.name === "world.json") {
    idb_keyval.set("tiamblia.default_world_file_handle", file_handle);
  }
};

file_open = async function() {
  var exception, file, input, json, new_file_handle;
  if (typeof showOpenFilePicker !== "undefined" && showOpenFilePicker !== null) {
    try {
      [new_file_handle] = (await showOpenFilePicker({
        accept: [
          {
            description: "JSON",
            extensions: ["json"]
          }
        ]
      }));
      file = (await new_file_handle.getFile());
      json = (await file.text());
    } catch (error1) {
      exception = error1;
      if (exception.name === "AbortError") {
        return;
      }
      editor.warn(`Failed to open file: ${exception}`);
      return;
    }
    if (load_from_json(json)) {
      file_handle = new_file_handle;
      store_file_handle(file_handle);
    }
  } else {
    input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = () => {
      var reader;
      // load_from_json(await input.files[0].text())
      reader = new FileReader();
      reader.onload = () => {
        load_from_json(reader.result);
      };
      reader.readAsText(input.files[0]);
    };
    input.click();
  }
};

file_save_as = async function() {
  var a, exception, json, writable;
  json = JSON.stringify(world.toJSON(), null, "\t");
  if (typeof showSaveFilePicker !== "undefined" && showSaveFilePicker !== null) {
    try {
      file_handle = (await showSaveFilePicker({
        types: [
          {
            description: "JSON",
            accept: {
              "application/json": [".json"]
            }
          }
        ]
      }));
      if (!(await verify_permission(file_handle, true))) {
        return;
      }
      writable = (await file_handle.createWritable());
      await writable.write(json);
      await writable.close();
    } catch (error1) {
      exception = error1;
      if (exception.name === "AbortError") {
        return;
      }
      editor.warn(`Failed to save file: ${exception}`);
      return;
    }
    store_file_handle(file_handle);
  } else {
    a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(json);
    a.download = "Tiamblia World.json";
    a.click();
  }
};

file_save = async function() {
  var error, json, writable;
  if (file_handle != null) {
    json = JSON.stringify(world.toJSON(), null, "\t");
    try {
      if (!(await verify_permission(file_handle, true))) {
        return;
      }
      writable = (await file_handle.createWritable());
      await writable.write(json);
      await writable.close();
    } catch (error1) {
      error = error1;
      editor.warn(`Failed to save file: ${error}`);
      return;
    }
  } else {
    file_save_as();
  }
};

addEventListener("keydown", function(event) {
  if (event.key === "s" && event.ctrlKey) {
    event.preventDefault();
    file_save();
    return;
  }
  if (event.key === "o" && event.ctrlKey) {
    event.preventDefault();
    file_open();
    return;
  }
});

icons = {
  open: 53,
  save: 22,
  save_as: 22.2, // ...see hack below
  revert: 76.2
};

add_button = function(folder, name, icon, callback) {
  var button_controller, img;
  button_controller = folder.add({
    [name]: callback
  }, name);
  img = document.createElement("img");
  if (icon === 22.2) {
    // stupid fake save as icon
    icon = 22;
    img.style.transform = "scale(0.8) translate(-2px, -2px)";
    img.style.filter = "drop-shadow(3px 3px 0px hsl(200, 80%, 40%)";
  }
  if (icon === 76.2) {
    // re-colorization for revert icon
    icon = 76;
    img.style.filter = "hue-rotate(180deg)";
  }
  img.src = `icons/png/${icon}.png`;
  img.style.marginRight = "5px";
  img.style.marginLeft = "70px";
  button_controller.$name.prepend(img);
  button_controller.$name.style.textAlign = "left";
};

add_button(skele2d_folder, "Clear Auto-Save", icons.revert, clear_auto_save);

add_button(skele2d_folder, "Load World", icons.open, file_open);

add_button(skele2d_folder, "Save World", icons.save, file_save);

add_button(skele2d_folder, "Save World As", icons.save_as, file_save_as);

last_selected_entity = null;

// lil-gui.js doesn't support an onBeforeChange callback,
// so we have to do this hack to integrate with the undo system.
// Another way might be with a Proxy, might be cleaner.
// This is debounced because it's called a lot while dragging controllers.
// `undoable()` will save, but if we're debouncing it, we need to save manually.
last_undoable_time = -2e308;

save_timeout = null;

ms_between_undos = 300;

ms_idle_before_saving = ms_between_undos * 2;

old_Controller_setValue = Controller.prototype.setValue;

Controller.prototype.setValue = function(value) {
  var c, controller_edits_entity;
  controller_edits_entity = false;
  c = this;
  while (c) {
    if (c.object instanceof Entity) {
      controller_edits_entity = true;
      break;
    }
    c = c.parent;
  }
  // controller_edits_entity = @ in entity_folder.controllersRecursive() # alternative
  if (controller_edits_entity) {
    clearTimeout(save_timeout);
    save_timeout = setTimeout(() => {
      return editor.save();
    }, ms_idle_before_saving);
    if (performance.now() - last_undoable_time > ms_between_undos) {
      editor.undoable(() => {
        old_Controller_setValue.call(this, value);
      });
      last_undoable_time = performance.now();
    } else {
      old_Controller_setValue.call(this, value);
    }
  } else {
    old_Controller_setValue.call(this, value);
  }
};

style_button_as_link = function(button) {
  button.style.background = "none";
  button.style.border = "none";
  button.style.padding = "0";
  button.style.font = "inherit";
  button.style.cursor = "pointer";
  button.style.color = "#2277FF";
  button.style.textDecoration = "underline";
  button.style.textAlign = "left";
  button.style.fontWeight = "bold";
};

// The ButtonController doesn't look good in the inspector, for linked entities.
// Note that this class uses a different constructor signature than ButtonController,
// because it doesn't use the object's property as the function, nor the key as name.
LinkButtonController = class LinkButtonController extends Controller {
  constructor(parent, object, property, link_name, link_action) {
    super(parent, object, property, "link-button-controller");
    this.$button = document.createElement("button");
    this.$button.textContent = link_name;
    style_button_as_link(this.$button);
    this.$button.addEventListener("click", () => {
      return link_action();
    });
    this.$widget.append(this.$button);
    this.updateDisplay();
  }

  updateDisplay() {
    return this;
  }

};

BreadcrumbsController = class BreadcrumbsController extends Controller {
  constructor(parent, object, property, links) {
    var i, len, link, link_index;
    super(parent, object, property, "breadcrumbs-controller");
    this.$buttons = [];
    for (link_index = i = 0, len = links.length; i < len; link_index = ++i) {
      link = links[link_index];
      ((link, link_index) => {
        var button, span;
        button = document.createElement("button");
        button.textContent = link.name;
        style_button_as_link(button);
        button.addEventListener("click", () => {
          return link.action();
        });
        button.style.width = "auto";
        if (link.action == null) {
          button.disabled = true;
          button.style.color = "inherit";
          button.style.textDecoration = "none";
          button.style.cursor = "default";
        }
        this.$widget.append(button);
        if (link_index !== links.length - 1) {
          span = document.createElement("span");
          span.textContent = " ❱ ";
          span.style.color = "#777";
          this.$widget.append(span);
        }
        return this.$buttons.push(button);
      })(link, link_index);
    }
    this.$widget.style.display = "inline-block";
    this.$name.style.display = "none";
    this.updateDisplay();
  }

  updateDisplay() {
    return this;
  }

};

// "waves" is old, it shouldn't be on the Water entity anymore
// TODO: move this info into the respective entity classes
// and maybe base it on serialization by default, but allow more properties to be excluded
property_inspector_exclusions = ["_class_", "structure", "random_values", "simplex", "waves_y", "waves_vy", "bubbles", "waves"];

inspect_entity = function(selected_entity, breadcrumbs = []) {
  var child, i, make_controllers, ref1;
  ref1 = entity_folder.children;
  // Note: selected_entity may be null/undefined, for deselection
  for (i = ref1.length - 1; i >= 0; i += -1) {
    child = ref1[i];
    child.destroy();
  }
  if (breadcrumbs.length > 1) {
    new BreadcrumbsController(entity_folder, {}, "", breadcrumbs.map(function(breadcrumb, breadcrumb_index) {
      return {
        name: breadcrumb.entity.constructor.name,
        action: breadcrumb.entity !== selected_entity ? function() {
          editor.selected_entities = [breadcrumb.entity];
          inspect_entity(breadcrumb.entity, breadcrumbs.slice(0, breadcrumb_index + 1));
          // avoid inspect_entity on next frame clearing breadcrumbs
          return last_selected_entity = breadcrumb.entity;
        } : void 0
      };
    }));
  }
  make_controllers = function(object, folder) {
    var array_folder, key, new_folder, ref2, ref3, results, value;
    results = [];
    for (key in object) {
      value = object[key];
      if (indexOf.call(property_inspector_exclusions, key) < 0) {
        if ((ref2 = typeof value) === "number" || ref2 === "string" || ref2 === "boolean") {
          // unlike dat.gui, lil-gui.js only supports RGB colors, no hsl, and no alpha
          if (key.match(/color/i) && typeof value === "string" && value[0] === "#" && ((ref3 = value.length) === 4 || ref3 === 7)) {
            results.push(folder.addColor(object, key));
          } else {
            results.push(folder.add(object, key));
          }
        } else if (typeof value === "object" && value) {
          if (value instanceof Array) {
            if (value.length > 0) {
              array_folder = folder.addFolder(key);
              array_folder.title(`${key} (${value.length})`);
              array_folder.close();
              results.push(make_controllers(Object.assign({}, value), array_folder));
            } else {
              results.push(void 0);
            }
          } else if (value.constructor === Object) {
            new_folder = folder.addFolder(key);
            new_folder.title(`${key} {...}`);
            results.push(make_controllers(value, new_folder));
          } else if (value instanceof Entity) {
            // Make button to select entity
            results.push(((key, value) => {
              var button_fn;
              button_fn = function() {
                var new_breadcrumb;
                editor.selected_entities = [value];
                new_breadcrumb = {
                  entity: value,
                  key: key
                };
                inspect_entity(value, [...breadcrumbs, new_breadcrumb]);
                // avoid inspect_entity on next frame clearing breadcrumbs
                last_selected_entity = value;
              };
              // button_key = "Select #{key}"
              // folder.add({[button_key]: button_fn}, button_key)
              return new LinkButtonController(folder, object, key, value.constructor.name, button_fn);
            })(key, value));
          } else {
            results.push(console.log(`Unknown type for ${key}: ${value.constructor.name}`));
          }
        } else if (value) {
          results.push(console.log(`Unknown type for ${key}: ${typeof value}`));
        } else {
          results.push(console.log(`Skipping ${value} value for ${key}`));
        }
      }
    }
    return results;
  };
  make_controllers(selected_entity, entity_folder);
  if (selected_entity) {
    return entity_folder.title(`Selected Entity (${selected_entity.constructor.name})`);
  } else {
    return entity_folder.title("Selected Entity");
  }
};

update_property_inspector = function() {
  var controller, i, len, ref1, selected_entity;
  selected_entity = editor.selected_entities[0];
  // TODO: update with added/removed properties
  if (last_selected_entity !== selected_entity) {
    last_selected_entity = selected_entity;
    inspect_entity(selected_entity, selected_entity ? [
      {
        entity: selected_entity,
        key: null
      }
    ] : void 0);
  } else {
    ref1 = entity_folder.controllersRecursive();
    for (i = 0, len = ref1.length; i < len; i++) {
      controller = ref1[i];
      controller.updateDisplay();
    }
  }
};

module.exports.gui = gui;

module.exports.update_property_inspector = update_property_inspector;

module.exports.configure_property_inspector = function(dependencies) {
  editor = dependencies.editor;
  world = dependencies.world;
};


/***/ }),

/***/ 653:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Bird, SimpleActor, addEntityClass, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(505));

r = function() {
  return Math.random() * 2 - 1;
};

module.exports = Bird = (function() {
  class Bird extends SimpleActor {
    constructor() {
      super();
      this.structure.addPoint("head");
      this.structure.addSegment({
        from: "head",
        name: "body",
        length: 5
      });
      this.bbox_padding = 20;
      this.width = 8;
      this.height = 8;
      this.flap = 0;
      this.flap_timer = r() * 15;
      this.wingspan = 10;
      this.go_x = r() * 5;
      this.go_y = 0;
    }

    step(world) {
      var i, j, x, y;
      for (i = j = 0; j <= 50; i = ++j) {
        x = r() * 50;
        y = r() * 70;
        if (world.collision({
          x: this.x + x,
          y: this.y + y
        })) {
          this.go_y -= y / 30;
          this.go_x -= x / (10 + Math.abs(this.go_y));
        }
      }
      if (this.flap_timer < 0) {
        if (this.go_y < -1) {
          this.vy -= 5;
          this.flap_timer = 15;
        } else {
          this.vy -= 1;
          this.flap_timer = 15;
        }
      }
      this.go_x *= 0.95;
      this.go_y *= 0.7;
      this.vx += (this.go_x - this.vx) / 2;
      this.vy += 0.1;
      this.x += this.vx;
      this.y += this.vy;
      this.flap_timer--;
      if (this.flap_timer < 0) {
        // run SimpleActor physics, which uses @move_x and @jump
        // super(world)
        // This was in draw() before, and it looks kinda confusing...
        this.flap_timer = -1;
      }
      this.flap += this.flap_timer / 20;
      this.flap += (-this.flap - 0.1) * 0.1;
    }

    draw(ctx) {
      var f;
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      f = 2.8;
      ctx.moveTo(0, 0);
      ctx.lineTo(0 + Math.cos(this.flap - f) * this.wingspan, 0 + Math.sin(this.flap - f) * this.wingspan);
      ctx.moveTo(0, 0);
      ctx.lineTo(0 - Math.cos(this.flap - f) * this.wingspan, 0 + Math.sin(this.flap - f) * this.wingspan);
      ctx.stroke();
    }

  };

  addEntityClass(Bird);

  return Bird;

}).call(this);


/***/ }),

/***/ 739:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Butterfly, SimpleActor, addEntityClass, hsl_to_rgb_hex, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(505));

hsl_to_rgb_hex = __webpack_require__(10);

r = function() {
  return Math.random() * 2 - 1;
};

module.exports = Butterfly = (function() {
  class Butterfly extends SimpleActor {
    constructor() {
      super();
      this.structure.addPoint("head");
      this.structure.addSegment({
        from: "head",
        name: "body",
        length: 5
      });
      this.bbox_padding = 20;
      this.width = 4;
      this.height = 4;
      this.go_x = r() * 5;
      this.go_y = r() * 5;
      this.t = r() * 5;
      this.flap = r() * 5;
      this.flap_timer = r() * 15;
      // hex is for lil-gui based entity properties editor
      this.color_1 = hsl_to_rgb_hex("hsla(" + (Math.random() * 360) + ",100%," + (50 + Math.random() * 50) + "%,1)");
      this.color_2 = hsl_to_rgb_hex("hsla(" + (Math.random() * 360) + ",100%," + (50 + Math.random() * 50) + "%,1)");
    }

    step(world) {
      var i, j, x, y;
      for (i = j = 0; j <= 50; i = ++j) {
        x = r() * 50;
        y = r() * 70;
        if (world.collision({
          x: this.x + x,
          y: this.y + y
        })) {
          this.go_y -= y / 50;
          this.go_x -= x / (50 + Math.abs(this.go_y));
        }
      }
      if (this.flap_timer < 0) {
        if (this.go_y < -1) {
          this.vy -= 5;
          this.flap_timer = 15;
        } else {
          this.vy -= 1;
          this.flap_timer = 15;
        }
      }
      this.go_x *= 0.9;
      this.go_y *= 0.9;
      this.go_x += r() / 2;
      this.go_y += r() / 2;
      this.vx += (this.go_x - this.vx / 2) / 3;
      this.vy += (this.go_y - this.vy / 2) / 3;
      this.vy += 0.01;
      this.x += this.vx;
      this.y += this.vy;
      this.flap = Math.cos(this.t += 0.5);
      if (this.flap_timer < 0) {
        // run SimpleActor physics, which uses @move_x and @jump
        // super(world)
        // This was in draw() before, and it looks confusing, together with @flap=... above
        this.flap_timer = -1;
      }
      this.flap += this.flap_timer / 20;
      this.flap += (-this.flap - 0.1) * 0.1;
    }

    draw(ctx) {
      var f;
      ctx.beginPath();
      f = 2.8;
      ctx.strokeStyle = this.color_1;
      ctx.moveTo(0, 0);
      ctx.lineTo(0 + Math.cos(this.flap - f) * this.width, 0 + Math.sin(this.flap - f) * this.width);
      ctx.moveTo(0, 0);
      ctx.lineTo(0 - Math.cos(this.flap - f) * this.width, 0 + Math.sin(this.flap - f) * this.width);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = this.color_2;
      ctx.moveTo(0, 0);
      ctx.lineTo(0 + Math.cos(this.flap + f) * this.width, 0 + Math.sin(this.flap + f) * this.width);
      ctx.moveTo(0, 0);
      ctx.lineTo(0 - Math.cos(this.flap + f) * this.width, 0 + Math.sin(this.flap + f) * this.width);
      ctx.stroke();
      ctx.beginPath();
    }

  };

  addEntityClass(Butterfly);

  return Butterfly;

}).call(this);


/***/ }),

/***/ 678:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var CactusTree, TAU, Tree, addEntityClass;

Tree = __webpack_require__(776);

({addEntityClass} = __webpack_require__(505));

TAU = Math.PI * 2;

module.exports = CactusTree = (function() {
  class CactusTree extends Tree {
    constructor() {
      super();
      this.bbox_padding = 30;
      this.random_index = 0;
      this.random_values = [];
      this.branch({
        from: "base",
        to: "1",
        juice: Math.random() * 10 + 3,
        width: 10 + Math.floor(Math.random() * 5),
        length: 15,
        angle: -TAU / 4,
        offshoots: 0
      });
    }

    random() {
      var base, name1;
      this.random_index++;
      return (base = this.random_values)[name1 = this.random_index] != null ? base[name1] : base[name1] = Math.random();
    }

    branch({from, to, juice, angle, width, length, offshoots}) {
      var branch_angle, branch_juice, branch_length, branch_width, dir, i, k, l, leaf_point, max_branches, name, offshoot_name, offshoot_names, offshoots_here, ref, ref1, side, starting_side;
      name = to;
      // angle+=(Math.random()*2-1)*0.7
      this.structure.addSegment({
        from,
        name,
        length,
        width,
        color: "green"
      });
      this.structure.points[name].x = this.structure.points[from].x + Math.cos(angle) * length;
      this.structure.points[name].y = this.structure.points[from].y + Math.sin(angle) * length;
      juice -= 1;
      if (offshoots > 0) {
        width *= 0.97;
      } else if (juice < 3) {
        width *= 0.9;
      } else if (juice > 5) {
        // Cacti trunks can actually get thicker going up
        // until it reaches the branching point
        width *= 1.1;
      }
      if (juice > 0) {
        dir = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };
        dir.y -= 3;
        angle = Math.atan2(dir.y, dir.x);
        max_branches = 5;
        offshoots_here = 0;
        if (Math.random() < 0.5 && offshoots < max_branches && juice > 3) {
          offshoots_here = 2;
          if (Math.random() < 0.1 || offshoots + offshoots_here > max_branches) {
            offshoots_here = 1;
          }
        }
        offshoot_names = ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
        starting_side = Math.random() < 0.5 ? 1 : -1;
        if (offshoots_here) {
          for (i = k = 0, ref = offshoots_here; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
            offshoot_name = offshoot_names[i];
            branch_juice = juice / 3;
            branch_width = width * 0.7;
            branch_length = length;
            for (l = 0, ref1 = offshoots; (0 <= ref1 ? l < ref1 : l > ref1); 0 <= ref1 ? l++ : l--) {
              branch_length *= 0.9;
            }
            side = starting_side * (i % 2 ? 1 : -1);
            branch_angle = angle + TAU / 5 * side;
            this.branch({
              from: name,
              to: `${to}-${offshoot_name}`,
              juice: branch_juice,
              angle: branch_angle,
              width: branch_width,
              length: branch_length,
              offshoots: offshoots + offshoots_here
            });
          }
          width *= 0.8;
        }
        this.branch({
          from: name,
          to: `${to}-a`,
          juice,
          angle,
          width,
          length,
          offshoots: offshoots + offshoots_here
        });
      } else {
        leaf_point = this.structure.points[name];
        leaf_point.radius = width / 2;
        this.leaf(leaf_point);
      }
    }

    leaf(leaf) {
      leaf.is_leaf = true;
      return leaf;
    }

    draw(ctx) {
      var angle, bulge, dir, i, i_from, i_to, j, j_from, j_to, k, l, leaf, length, lengthen, lines, m, o, ox, oy, perp, point_name, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, segment, segment_name, shift, spikes;
      this.random_index = 0;
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
        // Highlights
        ctx.lineWidth = segment.width * 0.1;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,100,0.5)";
        angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x) + TAU / 4;
        dir = {
          x: segment.b.x - segment.a.x,
          y: segment.b.y - segment.a.y
        };
        length = Math.hypot(dir.x, dir.y);
        dir.x /= length;
        dir.y /= length;
        perp = {
          x: -dir.y,
          y: dir.x
        };
        i_to = 0.8;
        i_from = -i_to;
        lines = 4;
        for (i = k = ref1 = i_from, ref2 = i_to, ref3 = (i_to - i_from) / lines; ref3 !== 0 && (ref3 > 0 ? k <= ref2 : k >= ref2); i = k += ref3) {
          ctx.save();
          o = (segment.width / 2 - ctx.lineWidth / 2) * i;
          lengthen = segment.width / 2 * Math.sqrt(1 - i * i) - ctx.lineWidth / 2;
          bulge = segment.width * 0.1;
          ctx.translate(Math.cos(angle) * o, Math.sin(angle) * o);
          ctx.beginPath();
          ctx.moveTo(segment.a.x - dir.x * lengthen, segment.a.y - dir.y * lengthen);
          ctx.bezierCurveTo(segment.a.x + perp.x * bulge * i, segment.a.y + perp.y * bulge * i, segment.b.x + perp.x * bulge * i, segment.b.y + perp.y * bulge * i, segment.b.x + dir.x * lengthen, segment.b.y + dir.y * lengthen);
          ctx.stroke();
          ctx.restore();
        }
        // Shadow
        ctx.lineWidth = segment.width / 2;
        ctx.lineCap = "round";
        // ctx.strokeStyle = "rgba(0,0,0,0.2)"
        // ctx.globalCompositeOperation = "darker"
        ctx.strokeStyle = "rgba(0,120,0,0.5)";
        ctx.beginPath();
        ox = -segment.width / 4;
        oy = segment.width / 6;
        ctx.moveTo(segment.a.x + ox, segment.a.y + oy);
        ctx.lineTo(segment.b.x + ox, segment.b.y + oy);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
        // Main Highlight
        ctx.lineWidth = segment.width / 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,100,0.2)";
        ctx.beginPath();
        ox = segment.width / 4;
        oy = -segment.width / 6;
        ctx.moveTo(segment.a.x + ox, segment.a.y + oy);
        ctx.lineTo(segment.b.x + ox, segment.b.y + oy);
        ctx.stroke();
      }
      ref4 = this.structure.segments;
      
      // Spikes
      for (segment_name in ref4) {
        segment = ref4[segment_name];
        // disable spikes for performance
        // and because they're not quite right
        break;
        angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x) + TAU / 4;
        dir = {
          x: segment.b.x - segment.a.x,
          y: segment.b.y - segment.a.y
        };
        length = Math.hypot(dir.x, dir.y);
        dir.x /= length;
        dir.y /= length;
        perp = {
          x: -dir.y,
          y: dir.x
        };
        i_to = 0.8;
        i_from = -i_to;
        lines = 4;
        for (i = l = ref5 = i_from, ref6 = i_to, ref7 = (i_to - i_from) / lines; ref7 !== 0 && (ref7 > 0 ? l <= ref6 : l >= ref6); i = l += ref7) {
          ctx.lineWidth = segment.width * 0.05;
          ctx.lineCap = "round";
          ctx.strokeStyle = "rgba(255,255,255)";
          ctx.save();
          o = (segment.width / 2 - ctx.lineWidth / 2) * i;
          shift = segment.width / 2 * Math.sqrt(1 - i * i) - ctx.lineWidth / 2;
          bulge = segment.width * 0.1;
          ctx.translate(Math.cos(angle) * o, Math.sin(angle) * o);
          j_from = 0;
          j_to = 1;
          spikes = 5;
          for (j = m = ref8 = j_from, ref9 = j_to, ref10 = (j_to - j_from) / spikes; ref10 !== 0 && (ref10 > 0 ? m < ref9 : m > ref9); j = m += ref10) {
            ctx.save();
            ctx.translate(segment.a.x + dir.x * shift + (segment.b.x - segment.a.x) * j, segment.a.y + dir.y * shift + (segment.b.y - segment.a.y) * j);
            ctx.rotate(angle + TAU / 10 * i);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, segment.width * 0.1);
            ctx.stroke();
            ctx.restore();
          }
          ctx.restore();
        }
      }
      ref11 = this.structure.points;
      for (point_name in ref11) {
        leaf = ref11[point_name];
        if (leaf.is_leaf) {
          this.drawLeaf(ctx, leaf);
        }
      }
    }

    drawLeaf(ctx, {x, y, radius = 5}) {
      var k, ref;
// draw flowers
      for (k = 0, ref = 2 + this.random() * 3; (0 <= ref ? k <= ref : k >= ref); 0 <= ref ? k++ : k--) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.random() * TAU / 2 + TAU / 2);
        ctx.beginPath();
        ctx.translate(this.random() * radius, 0);
        ctx.moveTo(0, 0);
        ctx.translate(this.random() * radius, 0);
        ctx.lineTo(0, 0);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "salmon";
        ctx.stroke();
        ctx.scale(0.5 + this.random() * 0.5, 1);
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, TAU, true);
        ctx.fillStyle = "pink";
        ctx.fill();
        ctx.restore();
      }
    }

  };

  addEntityClass(CactusTree);

  return CactusTree;

}).call(this);


/***/ }),

/***/ 847:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Caterpillar, Entity, TAU, addEntityClass, average, closestPointOnLineSegment, distanceToLineSegment, smoothOut;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

({distanceToLineSegment} = (__webpack_require__(505).helpers));

TAU = Math.PI * 2;

closestPointOnLineSegment = function(point, a, b) {
  var a_to_b, a_to_p, atb2, atp_dot_atb, t;
  // https://stackoverflow.com/a/3122532/2624876
  a_to_p = {
    x: point.x - a.x,
    y: point.y - a.y
  };
  a_to_b = {
    x: b.x - a.x,
    y: b.y - a.y
  };
  atb2 = a_to_b.x ** 2 + a_to_b.y ** 2;
  atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
  t = atp_dot_atb / atb2;
  return {
    x: a.x + a_to_b.x * t,
    y: a.y + a_to_b.y * t
  };
};

average = function(v) {
  return v.reduce(((a, b) => {
    return a + b;
  }), 0) / v.length;
};

smoothOut = function(array, variance) {
  var i, j, ref, ret, t_average;
  t_average = average(array) * variance;
  ret = new Array(array.length);
  for (i = j = 0, ref = array.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    (function() {
      var next, prev;
      prev = i > 0 ? ret[i - 1] : array[i];
      next = i < array.length ? array[i] : array[i - 1];
      return ret[i] = average([t_average, average([prev, array[i], next])]);
    })();
  }
  return ret;
};

module.exports = Caterpillar = (function() {
  class Caterpillar extends Entity {
    constructor() {
      var foot_name, i, j, k, leg_length, len, part, part_index, part_name, parts_list, point, point_name, previous_part_name, ref;
      super();
      // relying on key order, so points & segments must not be named with simple numbers,
      // since numeric keys are sorted before other keys
      this.structure.addPoint("head");
      previous_part_name = "head";
      for (i = j = 1; j < 10; i = ++j) {
        part_name = `part_${i}`;
        previous_part_name = this.structure.addSegment({
          from: previous_part_name,
          to: part_name,
          name: part_name,
          length: 5,
          width: 4
        });
      }
      parts_list = Object.values(this.structure.points).filter((part) => {
        return part.name.match(/head|part/);
      });
      for (part_index = k = 0, len = parts_list.length; k < len; part_index = ++k) {
        part = parts_list[part_index];
        part.attachment = null;
        part.radius = 5 - part_index * 0.1;
        part.towards_ground = {
          x: 0,
          y: 0
        };
        part.towards_ground_smoothed = {
          x: 0,
          y: 0
        };
        if (part_index > 0) {
          foot_name = `foot_${part_index}`;
          leg_length = part.radius + 2; // WET
          this.structure.addSegment({
            from: part.name,
            to: foot_name,
            name: foot_name,
            length: leg_length,
            width: 1
          });
        }
      }
      ref = this.structure.points;
      for (point_name in ref) {
        point = ref[point_name];
        point.vx = 0;
        point.vy = 0;
      }
      this.structure.points.head.radius = 7;
      this.bbox_padding = 15;
    }

    initLayout() {
      var ref, ref1, segment, segment_name;
      ref = this.structure.segments;
      for (segment_name in ref) {
        segment = ref[segment_name];
        segment.b.x = segment.a.x + segment.length;
      }
      ref1 = this.structure.segments;
      for (segment_name in ref1) {
        segment = ref1[segment_name];
        if (segment.b.name.match(/foot/)) {
          segment.b.x = segment.a.x;
          segment.b.y = segment.a.y + segment.length;
        }
      }
    }

    step(world) {
      var angle_offset, angle_offsets, attachment_entity, attachment_hit_space, attachment_local, attachment_world, candidates, closest_point_in_hit_space, closest_point_in_world, closest_point_local, closest_segment, collision, cos_leg_angle, crawl_speed, delta_length, delta_x, delta_y, diff, dist_to_previous, fixity, foot, foot_list, foot_offset, forward_vector, ground_angle, heading, hit, i, j, k, l, leg_angle, leg_length, leg_vector, len, len1, len10, len2, len3, len4, len5, len6, len7, len8, len9, lift_foot, m, max_angle_offset, n, n_angle_offsets_per_dir, next_part, o, other_part, other_part_index, otherwise_attached, p, part, part_in_world, part_index, part_world, parts_list, prev_part, projected, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, relative_angle, s, segment, segment_name, segments_list, side, sin_leg_angle, t, target_min_length, test_point_in_hit_space, test_point_world, too_far_under_water, towards_ground, towards_ground_angle, towards_ground_length, u, w, water, x, y;
      parts_list = Object.values(this.structure.points).filter((part) => {
        return part.name.match(/head|part/);
      });
      foot_list = Object.values(this.structure.points).filter((part) => {
        return part.name.match(/foot/);
      });
      segments_list = Object.values(this.structure.segments);
// stop at end of the world
      for (j = 0, len = parts_list.length; j < len; j++) {
        part = parts_list[j];
        if (part.y + this.y > 400) {
          return;
        }
      }

      // reset/init
      for (k = 0, len1 = parts_list.length; k < len1; k++) {
        part = parts_list[k];
        part.fx = 0;
        part.fy = 0;
        if (part.towards_ground == null) {
          part.towards_ground = {
            x: 0,
            y: 0
          };
        }
        if (part.towards_ground_smoothed == null) {
          part.towards_ground_smoothed = {
            x: 0,
            y: 0
          };
        }
      }
      // smooth out towards_ground normals, making the caterpillar
      // hopefully pick a side of a tree branch to be on
      // variance = 1
      // smoothed_towards_ground_x_values = smoothOut((part.towards_ground.x for part in parts_list), variance)
      // smoothed_towards_ground_y_values = smoothOut((part.towards_ground.y for part in parts_list), variance)
      // for part, part_index in parts_list
      // 	part.towards_ground.x = smoothed_towards_ground_x_values[part_index]
      // 	part.towards_ground.y = smoothed_towards_ground_y_values[part_index]

      // move
      collision = (point) => {
        return world.collision(this.toWorld(point), {
          types: (entity) => {
            var ref;
            return (ref = entity.constructor.name) !== "Arrow" && ref !== "Bow" && ref !== "Water" && ref !== "Caterpillar";
          }
        });
      };
      t = performance.now() / 1000;
      for (part_index = l = 0, len2 = parts_list.length; l < len2; part_index = ++l) {
        part = parts_list[part_index];
        otherwise_attached = 0;
        for (m = 0, len3 = parts_list.length; m < len3; m++) {
          other_part = parts_list[m];
          if (other_part !== part) {
            if (other_part.attachment) {
              otherwise_attached += 1;
            }
          }
        }
        // lift_foot = Math.sin(t + part_index/parts_list.length*Math.PI) < 0 and otherwise_attached >= 2
        // if part_index > 3 and part_index < parts_list.length - 3
        // 	lift_foot = true # don't let the middle of the caterpillar act as feet
        dist_to_previous = part_index > 0 ? Math.hypot(part.x - parts_list[part_index - 1].x, part.y - parts_list[part_index - 1].y) : 0;
        lift_foot = dist_to_previous > 10; // in case it's stretching out a lot, release some constraints
        if (part_index === 0) { // head doesn't have feet
          lift_foot = true;
        }
        if (lift_foot) {
          part.attachment = null;
        }
        attachment_entity = part.attachment ? world.getEntityByID(part.attachment.entity_id) : void 0;
        if (attachment_entity) {
          attachment_world = attachment_entity.toWorld(part.attachment.point);
          attachment_local = this.fromWorld(attachment_world);
          crawl_speed = 0 + 2 * (otherwise_attached > 4); // also affected by fixity parameter
          // Reverse crawl direction if part.attachment.ground_angle points head-to-tail*
          // according to this local segment's orientation.
          // *or possibly the opposite. I'm not gonna fact check this.
          if (parts_list[part_index + 1]) {
            heading = Math.atan2(parts_list[part_index].y - parts_list[part_index + 1].y, parts_list[part_index].x - parts_list[part_index + 1].x);
          } else {
            heading = Math.atan2(parts_list[part_index - 1].y - parts_list[part_index].y, parts_list[part_index - 1].x - parts_list[part_index].x);
          }
          if (Math.cos(part.attachment.ground_angle - heading) < 0) {
            crawl_speed *= -1;
          }
          // part.x = attachment_local.x
          // part.y = attachment_local.y
          // Move attachment point along the ground, using ground angle.
          // Test multiple angles in order to wrap around corners.
          angle_offsets = [0];
          n_angle_offsets_per_dir = 5;
          max_angle_offset = TAU / 3;
          for (i = o = 1, ref = n_angle_offsets_per_dir; (1 <= ref ? o <= ref : o >= ref); i = 1 <= ref ? ++o : --o) {
            angle_offsets.push(max_angle_offset * i / n_angle_offsets_per_dir);
            angle_offsets.push(-max_angle_offset * i / n_angle_offsets_per_dir);
          }
          for (p = 0, len4 = angle_offsets.length; p < len4; p++) {
            angle_offset = angle_offsets[p];
            part_in_world = this.toWorld(part);
            forward_vector = {
              x: Math.cos(part.attachment.ground_angle + angle_offset) * crawl_speed,
              y: Math.sin(part.attachment.ground_angle + angle_offset) * crawl_speed
            };
            // search towards the ground, in the direction it was last found
            leg_length = part.radius + 2; // WET
            leg_vector = {
              x: part.towards_ground.x * leg_length,
              y: part.towards_ground.y * leg_length
            };
            test_point_world = {
              x: part_in_world.x + forward_vector.x + leg_vector.x,
              y: part_in_world.y + forward_vector.y + leg_vector.y
            };
            hit = world.collision(test_point_world, {
              types: (entity) => {
                var ref1;
                return (ref1 = entity.constructor.name) !== "Arrow" && ref1 !== "Bow" && ref1 !== "Water" && ref1 !== "Caterpillar";
              }
            });
            if (hit) {
              // Project the part's position back to the surface of the ground.
              test_point_in_hit_space = hit.fromWorld(test_point_world);
              projected = world.projectPointOutside(test_point_world, {
                outsideEntity: hit
              });
              if (projected) {
                ({closest_point_in_hit_space, closest_point_in_world, closest_segment} = projected);
                closest_point_local = this.fromWorld(closest_point_in_world);
                // part.x = closest_point_local.x
                // part.y = closest_point_local.y
                if (!lift_foot) {
                  ground_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x);
                  if (isNaN(ground_angle)) {
                    console.warn("ground_angle is NaN");
                    ground_angle = 0;
                  }
                  candidates = (function() {
                    var len5, q, ref1, results;
                    ref1 = [0, 1];
                    results = [];
                    for (q = 0, len5 = ref1.length; q < len5; q++) {
                      side = ref1[q];
                      towards_ground_angle = ground_angle + TAU / 4;
                      if (side) {
                        towards_ground_angle += TAU / 2;
                      }
                      towards_ground = {
                        x: Math.cos(towards_ground_angle),
                        y: Math.sin(towards_ground_angle)
                      };
                      attachment_hit_space = {
                        x: closest_point_in_hit_space.x - towards_ground.x * leg_length,
                        y: closest_point_in_hit_space.y - towards_ground.y * leg_length
                      };
                      results.push({
                        score: Math.hypot(attachment_hit_space.x - test_point_in_hit_space.x, attachment_hit_space.y - test_point_in_hit_space.y),
                        towards_ground,
                        attachment_hit_space
                      });
                    }
                    return results;
                  })();
                  candidates.sort((a, b) => {
                    return b.score - a.score;
                  });
                  ({attachment_hit_space, towards_ground} = candidates[0]);
                  part.attachment = {
                    entity_id: hit.id,
                    point: attachment_hit_space,
                    ground_angle
                  };
                  part.towards_ground = towards_ground;
                }
                break;
              }
            }
          }
          if (!hit && otherwise_attached >= 2) {
            part.attachment = null;
          }
        } else {
          // part.x += part.vx
          // part.y += part.vy
          hit = collision(part);
          if (hit) {
            part.vx = 0;
            part.vy = 0;
            // Project the part's position back to the surface of the ground.
            part_world = this.toWorld(part);
            projected = world.projectPointOutside(part_world, {
              outsideEntity: hit
            });
            if (projected) {
              ({closest_point_in_world, closest_point_in_hit_space, closest_segment} = projected);
              closest_point_local = this.fromWorld(closest_point_in_world);
              towards_ground = {
                x: part_world.x - closest_point_in_world.x,
                y: part_world.y - closest_point_in_world.y
              };
              towards_ground_length = Math.hypot(towards_ground.x, towards_ground.y);
              towards_ground.x /= towards_ground_length;
              towards_ground.y /= towards_ground_length;
              if (!(isFinite(towards_ground.x) && isFinite(towards_ground.y))) {
                console.warn("NaN in towards_ground");
                towards_ground = {
                  x: 0,
                  y: 0
                };
              }
              part.x = closest_point_local.x;
              part.y = closest_point_local.y;
              if (!lift_foot) {
                ground_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x);
                if (isNaN(ground_angle)) {
                  console.warn("ground_angle is NaN");
                  ground_angle = 0;
                }
                part.attachment = {
                  entity_id: hit.id,
                  point: closest_point_in_hit_space,
                  ground_angle
                };
                part.towards_ground = towards_ground;
              }
            }
          } else {
            part.vy += 0.5;
            part.vx *= 0.99;
            part.vy *= 0.99;
            // @structure.stepLayout({gravity: 0.005, collision})
            // @structure.stepLayout() for [0..10]
            // @structure.stepLayout({collision}) for [0..4]
            part.x += part.vx;
            part.y += part.vy;
          }
        }
        
        // angular constraint pivoting on this part
        relative_angle = (Math.sin(Math.sin(t) * Math.PI / 4) - 0.5) * Math.PI / parts_list.length / 2;
        part.relative_angle = relative_angle;
        prev_part = parts_list[part_index - 1];
        next_part = parts_list[part_index + 1];
        if (prev_part && next_part) {
          this.accumulate_angular_constraint_forces(prev_part, next_part, part, relative_angle);
        }
      }

      // apply forces
      for (q = 0, len5 = parts_list.length; q < len5; q++) {
        part = parts_list[q];
        part.vx += part.fx;
        part.vy += part.fy;
        part.x += part.fx;
        part.y += part.fy;
      }
// Interact with water
      for (r = 0, len6 = parts_list.length; r < len6; r++) {
        part = parts_list[r];
        water = world.collision(this.toWorld(part), {
          types: (entity) => {
            return entity.constructor.name === "Water";
          }
        });
        too_far_under_water = water && world.collision(this.toWorld({
          x: part.x,
          y: part.y - part.radius
        }), {
          types: (entity) => {
            return entity.constructor.name === "Water";
          }
        });
        if (water && !too_far_under_water) {
          // Make ripples in water
          water.makeWaves(this.toWorld(part), part.radius, part.vy / 2);
          // Skip off water (as if this will ever matter)
          if ((4 > (ref1 = part.vy) && ref1 > 2) && Math.abs(part.vx) > 0.4) {
            part.vy *= -0.3;
          }
        }
        // Slow down in water, and buoy
        if (water) {
          part.vx -= part.vx * 0.1;
          part.vy -= part.vy * 0.1;
          part.vy -= 0.45;
        }
      }
// smooth normals over time
      for (s = 0, len7 = parts_list.length; s < len7; s++) {
        part = parts_list[s];
        if (part.towards_ground_smoothed == null) {
          part.towards_ground_smoothed = {
            x: 0,
            y: 0
          };
        }
        part.towards_ground_smoothed.x += (((ref2 = (ref3 = part.towards_ground) != null ? ref3.x : void 0) != null ? ref2 : 0) - part.towards_ground_smoothed.x) * 0.1;
        part.towards_ground_smoothed.y += (((ref4 = (ref5 = part.towards_ground) != null ? ref5.y : void 0) != null ? ref4 : 0) - part.towards_ground_smoothed.y) * 0.1;
      }
// constrain distances
      for (i = u = 0; u < 4; i = ++u) {
        for (part_index = w = 0, len8 = parts_list.length; w < len8; part_index = ++w) {
          part = parts_list[part_index];
          attachment_entity = part.attachment ? world.getEntityByID(part.attachment.entity_id) : void 0;
          if (attachment_entity) {
            attachment_world = attachment_entity.toWorld(part.attachment.point);
            attachment_local = this.fromWorld(attachment_world);
            fixity = 0.1; // also affects crawling speed
            part.x += (attachment_local.x - part.x) * fixity;
            part.y += (attachment_local.y - part.y) * fixity;
          }
        }
        ref6 = this.structure.segments;
        for (segment_name in ref6) {
          segment = ref6[segment_name];
          if (segment.b.name.match(/foot/)) {
            part = segment.a;
            foot = segment.b;
            leg_length = segment.length;
            foot_offset = {
              x: part.towards_ground_smoothed.x * leg_length,
              y: part.towards_ground_smoothed.y * leg_length
            };
            // rotate foot offset in sinusoidal fashion
            n = Number(part.name.match(/\d+/));
            leg_angle = Math.sin(performance.now() / 80 + n) * 0.1;
            sin_leg_angle = Math.sin(leg_angle);
            cos_leg_angle = Math.cos(leg_angle);
            [foot_offset.x, foot_offset.y] = [foot_offset.x * cos_leg_angle - foot_offset.y * sin_leg_angle, foot_offset.x * sin_leg_angle + foot_offset.y * cos_leg_angle];
            foot.x = part.x + foot_offset.x;
            foot.y = part.y + foot_offset.y;
            continue;
          }
          delta_x = segment.a.x - segment.b.x;
          delta_y = segment.a.y - segment.b.y;
          delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
          diff = (delta_length - segment.length) / delta_length;
          if (isFinite(diff)) {
            segment.a.x -= delta_x * 0.5 * diff;
            segment.a.y -= delta_y * 0.5 * diff;
            segment.b.x += delta_x * 0.5 * diff;
            segment.b.y += delta_y * 0.5 * diff;
            segment.a.vx -= delta_x * 0.5 * diff;
            segment.a.vy -= delta_y * 0.5 * diff;
            segment.b.vx += delta_x * 0.5 * diff;
            segment.b.vy += delta_y * 0.5 * diff;
          } else {
            console.warn("diff is not finite, for Caterpillar distance constraint");
          }
        }
// self-collision
        for (part_index = x = 0, len9 = parts_list.length; x < len9; part_index = ++x) {
          part = parts_list[part_index];
//when part_index isnt other_part_index
          for (other_part_index = y = 0, len10 = parts_list.length; y < len10; other_part_index = ++y) {
            other_part = parts_list[other_part_index];
            if (Math.abs(part_index - other_part_index) < 3) {
              continue;
            }
            delta_x = part.x - other_part.x;
            delta_y = part.y - other_part.y;
            delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
            target_min_length = part.radius + other_part.radius;
            if (delta_length < target_min_length) {
              diff = (delta_length - target_min_length) / delta_length;
              if (isFinite(diff)) {
                part.x -= delta_x * 0.5 * diff;
                part.y -= delta_y * 0.5 * diff;
                other_part.x += delta_x * 0.5 * diff;
                other_part.y += delta_y * 0.5 * diff;
                part.vx -= delta_x * 0.5 * diff;
                part.vy -= delta_y * 0.5 * diff;
                other_part.vx += delta_x * 0.5 * diff;
                other_part.vy += delta_y * 0.5 * diff;
              } else {
                console.warn("diff is not finite, for Caterpillar self-collision constraint");
              }
            }
          }
        }
      }
    }

    accumulate_angular_constraint_forces(a, b, pivot, relative_angle) {
      var angle_a, angle_b, angle_diff, distance, f, f_a, f_b, j, len, old_a, old_b, point, ref, rot_matrix, rot_matrix_inverse;
      angle_a = Math.atan2(a.y - b.y, a.x - b.x);
      angle_b = Math.atan2(pivot.y - b.y, pivot.x - b.x);
      angle_diff = (angle_a - angle_b) - relative_angle;
      // angle_diff *= 0.9
      distance = Math.hypot(a.x - b.x, a.y - b.y);
      // distance_a = Math.hypot(a.x - pivot.x, a.y - pivot.y)
      // distance_b = Math.hypot(b.x - pivot.x, b.y - pivot.y)
      // angle_diff /= Math.max(1, (distance / 5) ** 2.4)
      old_a = {
        x: a.x,
        y: a.y
      };
      old_b = {
        x: b.x,
        y: b.y
      };
      // Rotate around pivot.
      rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]];
      rot_matrix_inverse = [[Math.cos(-angle_diff), Math.sin(-angle_diff)], [-Math.sin(-angle_diff), Math.cos(-angle_diff)]];
      ref = [a, b];
      for (j = 0, len = ref.length; j < len; j++) {
        point = ref[j];
        // Translate and rotate.
        [point.x, point.y] = [point.x, point.y].map((value, index) => {
          return (point === a ? rot_matrix : rot_matrix_inverse)[index][0] * (point.x - pivot.x) + (point === a ? rot_matrix : rot_matrix_inverse)[index][1] * (point.y - pivot.y);
        });
        // Translate back.
        point.x += pivot.x;
        point.y += pivot.y;
      }
      f = 0.5;
      // using individual distances can cause spinning (overall angular momentum from nothing)
      // f_a = f / Math.max(1, Math.max(0, distance_a - 3) ** 1)
      // f_b = f / Math.max(1, Math.max(0, distance_b - 3) ** 1)
      // using the combined distance conserves overall angular momentum,
      // to say nothing of the physicality of the rest of this system
      // but it's a clear difference in zero gravity
      f_a = f / Math.max(1, Math.max(0, distance - 6) ** 1);
      f_b = f / Math.max(1, Math.max(0, distance - 6) ** 1);
      if (!a.attachment) {
        // Turn difference in position into velocity.
        a.fx += (a.x - old_a.x) * f_a;
      }
      if (!a.attachment) {
        a.fy += (a.y - old_a.y) * f_a;
      }
      if (!b.attachment) {
        b.fx += (b.x - old_b.x) * f_b;
      }
      if (!b.attachment) {
        b.fy += (b.y - old_b.y) * f_b;
      }
      if (!pivot.attachment) {
        // Opposite force on pivot.
        pivot.fx -= (a.x - old_a.x) * f_a;
      }
      if (!pivot.attachment) {
        pivot.fy -= (a.y - old_a.y) * f_a;
      }
      if (!pivot.attachment) {
        pivot.fx -= (b.x - old_b.x) * f_b;
      }
      if (!pivot.attachment) {
        pivot.fy -= (b.y - old_b.y) * f_b;
      }
      // Restore old position.
      a.x = old_a.x;
      a.y = old_a.y;
      b.x = old_b.x;
      b.y = old_b.y;
    }

    draw(ctx, view, world) {
      var attachment_local, color, entity, j, k, len, part, part_index, parts_list, ref, ref1, segment, segment_name;
      color = "green";
      ref = this.structure.segments;
      for (segment_name in ref) {
        segment = ref[segment_name];
        ctx.beginPath();
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
        ctx.lineWidth = segment.width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.stroke();
      }
      parts_list = Object.values(this.structure.points).filter((part) => {
        return part.name.match(/head|part/);
      });
// for part, part_index in parts_list
// reverse order to draw head on top
      for (part_index = j = parts_list.length - 1; j >= 0; part_index = j += -1) {
        part = parts_list[part_index];
        // body part
        ctx.save();
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, TAU);
        // ctx.fillStyle = if part.attachment then "lime" else color
        // ctx.fillStyle = "hsla(#{(part.relative_angle ? 0) * 10 * 180 / Math.PI}, 100%, 50%, 0.5)"
        // ctx.fillStyle = "hsla(#{(part.relative_angle ? 0) * 10 * 180 / Math.PI}, 100%, 50%, #{if part.attachment then 1 else 0.3})"
        ctx.fillStyle = color;
        ctx.fill();
        ctx.clip();
        // highlight
        ctx.beginPath();
        ctx.arc(part.x + part.radius / 3, part.y - part.radius / 3, part.radius / 2, 0, TAU);
        // ctx.fillStyle = "rgba(255, 255, 155, 0.5)"
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
        ctx.restore();
        // eye
        if (part.name === "head") {
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.radius / 2, 0, TAU);
          ctx.fillStyle = "black";
          ctx.fill();
          // highlight
          ctx.beginPath();
          ctx.arc(part.x + part.radius / 6, part.y - part.radius / 6, part.radius / 5, 0, TAU);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
      ref1 = Object.values(this.structure.points);
      for (k = 0, len = ref1.length; k < len; k++) {
        part = ref1[k];
        if (((function() {
          try {
            return localStorage["tiamblia.debug_caterpillar"];
          } catch (error) {}
        })()) === "true") {
          // draw line from part to attachment
          if (part.attachment) {
            entity = world.getEntityByID(part.attachment.entity_id);
            attachment_local = this.fromWorld(entity.toWorld(part.attachment.point));
            ctx.beginPath();
            ctx.moveTo(part.x, part.y);
            ctx.lineTo(attachment_local.x, attachment_local.y);
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.strokeStyle = "red";
            ctx.stroke();
          }
          // draw normal
          if (part.towards_ground) {
            ctx.beginPath();
            ctx.moveTo(part.x, part.y);
            ctx.lineTo(part.x + part.towards_ground.x * 10, part.y + part.towards_ground.y * 10);
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.strokeStyle = "lime";
            ctx.stroke();
          }
        }
      }
    }

  };

  addEntityClass(Caterpillar);

  return Caterpillar;

}).call(this);


/***/ }),

/***/ 332:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Cloud, Entity, TAU, addEntityClass;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

TAU = Math.PI * 2;

module.exports = Cloud = (function() {
  class Cloud extends Entity {
    constructor() {
      super();
      this.structure.addPoint("body");
      this.bbox_padding = 80;
      this.width = 45 + Math.random() * 50;
      this.height = 35 + Math.random() * 10;
      this.simplex = new SimplexNoise();
      this.t = 0;
      this.intangible = true;
    }

    toJSON() {
      var def, k, ref, v;
      def = {};
      ref = this;
      for (k in ref) {
        v = ref[k];
        if (k !== "simplex" && k !== "intangible") {
          def[k] = v;
        }
      }
      return def;
    }

    step(world) {
      this.x++;
      return this.t += 0.001;
    }

    // if @x > terrain.width+300
    // 	@poof=true
    draw(ctx) {
      var i, j;
      ctx.fillStyle = "#A9D9FA";
      for (i = j = 0; j <= 20; i = ++j) {
        ctx.beginPath();
        // @simplex.noise2D(68+i,@t)*-TAU,
        // @simplex.noise2D(20+i,@t)*TAU,
        ctx.arc(this.simplex.noise2D(5 + i, this.t + i * 3.92) * this.width + this.width / 2, this.simplex.noise2D(26 + i, this.t + i * 2.576) * this.height + this.height / 2, Math.abs(this.simplex.noise2D(73 + i * 5.2, this.t + i) * this.width), 0, TAU, false);
        ctx.fill();
      }
    }

  };

  addEntityClass(Cloud);

  return Cloud;

}).call(this);


/***/ }),

/***/ 857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Deer, Entity, SimpleActor, TAU, addEntityClass, hsl_to_rgb_hex, r;

SimpleActor = __webpack_require__(339);

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

hsl_to_rgb_hex = __webpack_require__(10);

TAU = Math.PI * 2;

r = function() {
  return Math.random() * 2 - 1;
};

module.exports = Deer = (function() {
  class Deer extends SimpleActor {
    // Entity.initAnimation(@)
    constructor() {
      super();
      this.structure.addPoint("head");
      this.structure.addSegment({
        from: "head",
        name: "neck",
        length: 5
      });
      this.bbox_padding = 30;
      this.width = 27;
      this.height = 18;
      this.x_prev = 0; // previous x position
      this.linger_time = 0; // I guess this was trying to
      // avoid getting stuck for too long on a cliff, a hill too steep to climb.
      // I don't know if it works with the new game, after porting from tiamblia-original.
      this.leg_rotation = 0; // leg rotation
      this.smoothed_facing_x = this.facing_x = 1;
      this.rideable = true;
      // hex is for lil-gui based entity properties editor
      this.body_color = hsl_to_rgb_hex("hsla(" + (Math.random() * 20) + "," + 10 + "%," + (50 + Math.random() * 20) + "%,1)");
      this.ground_angle = 0;
      this.ground_angle_smoothed = 0;
    }

    // smoothed_facing_x and ground_angle_smoothed, huh? inconsistent naming scheme
    step(world) {
      var ref;
      if (this.grounded) {
        // Note: ground_angle  and ground_angle_smoothed are used by Player while riding
        this.ground_angle = (ref = this.find_ground_angle(world)) != null ? ref : 0;
        this.ground_angle = Math.atan2(Math.sin(this.ground_angle), Math.cos(this.ground_angle));
        this.ground_angle_smoothed += (this.ground_angle - this.ground_angle_smoothed) / 5;
        if (Math.random() < 0.01) {
          this.move_x = r();
          if (Math.abs(this.move_x) < 0.3) {
            this.move_x = 0;
          }
        }
      } else {
        this.ground_angle = 0;
        this.ground_angle_smoothed += (this.ground_angle - this.ground_angle_smoothed) / 10;
        if (Math.abs(this.x_prev - this.x) < 1) {
          this.linger_time++;
          if (this.linger_time > 15) {
            this.move_x = r();
            if (Math.abs(this.move_x) < 0.3) {
              this.move_x = 0;
            }
            this.linger_time = 0;
          }
        } else {
          this.linger_time = 0;
        }
      }
      this.leg_rotation += Math.abs(this.vx) / 5;
      this.x_prev = this.x;
      // swim upwards always if in water
      this.move_y = -1;
      // run SimpleActor physics, which uses @move_x/y and @jump
      super.step(world);
      this.smoothed_facing_x += (this.facing_x - this.smoothed_facing_x) / 10;
    }

    draw(ctx) {
      ctx.save();
      // ctx.translate(@x,@y+@height*3/4)
      ctx.translate(0, this.height * 3 / 4);
      ctx.rotate(this.ground_angle_smoothed);
      ctx.beginPath();
      ctx.fillStyle = this.body_color;
      ctx.arc(0, -this.height / 2, this.height / 3, 0, TAU, true);
      ctx.fill();
      ctx.scale(this.smoothed_facing_x, 1);
      // ctx.rotate(@vx/-10)
      // legs
      ctx.strokeStyle = "#a55";
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.leg_rotation) * 10 - this.width / 2, this.height / 2 + Math.sin(this.leg_rotation) * 8);
      ctx.moveTo(-this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.leg_rotation + TAU / 2) * 10 - this.width / 2, this.height / 2 + Math.sin(this.leg_rotation + TAU / 2) * 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.leg_rotation + 0.1) * 10 + this.width / 2, this.height / 2 + Math.sin(this.leg_rotation) * 8);
      ctx.moveTo(this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.leg_rotation + TAU / 2 + 0.2) * 10 + this.width / 2, this.height / 2 + Math.sin(this.leg_rotation + TAU / 2) * 8);
      ctx.stroke();
      ctx.fillStyle = this.body_color;
      ctx.save(); // head
      ctx.translate(this.width / 2, this.height * -3 / 4);
      ctx.rotate(-0.4 + Math.cos(this.x / 50));
      ctx.fillRect(-5, -5, 15, 8);
      ctx.translate(12, 0);
      ctx.rotate(0.6 - Math.cos(this.x / 50) / 2);
      // ctx.fillRect(-5,-5,15,8)
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(-5, 3);
      ctx.lineTo(10, 1);
      ctx.lineTo(10, -2);
      ctx.fill();
      // eye
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, TAU, true);
      ctx.fill();
      ctx.restore(); // /head
      
      // body
      ctx.fillRect(this.width / -2, this.height / -1, this.width, this.height * 3 / 4);
      ctx.restore();
    }

  };

  addEntityClass(Deer);

  return Deer;

}).call(this);


/***/ }),

/***/ 162:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Frog, SimpleActor, TAU, addEntityClass, hsl_to_rgb_hex, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(505));

hsl_to_rgb_hex = __webpack_require__(10);

TAU = Math.PI * 2;

r = function() {
  return Math.random() * 2 - 1;
};

module.exports = Frog = (function() {
  class Frog extends SimpleActor {
    constructor() {
      super();
      this.structure.addPoint("head");
      this.structure.addSegment({
        from: "head",
        name: "body",
        length: 5
      });
      this.bbox_padding = 20;
      this.width = 8;
      this.height = 8;
      this.xp = 0;
      this.t = 0;
      this.lr = 0;
      this.dir = 0;
      // hex is for lil-gui based entity properties editor
      this.body_color = hsl_to_rgb_hex("hsla(" + (150 - Math.random() * 50) + "," + (50 + Math.random() * 50) + "%," + (50 - Math.random() * 20) + "%,1)");
    }

    step(world) {
      if (this.grounded) {
        this.vx *= 0.1;
        if (Math.random() > 0.1) {
          // jump
          this.vy = Math.random() * -5;
          this.dir = r();
          this.t = 0;
        }
      } else {
        this.vx += this.dir *= 2;
        if (this.xp === this.x) {
          this.t++;
          if (this.t > 5) {
            this.dir = r();
          }
        } else {
          this.t = 0;
        }
      }
      this.xp = this.x;
      this.move_x = this.dir * 0.2;
      this.move_y = 0;
      // run SimpleActor physics, which uses @move_x and @jump
      super.step(world);
    }

    draw(ctx) {
      ctx.save();
      ctx.rotate(this.vx / 5);
      ctx.fillStyle = this.body_color;
      //ctx.fillRect(@x,@y,@width,@height)
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 4 - this.vy, this.height / 2, 0, TAU / 2, false);
      ctx.arc(this.width / 2, this.height, this.height / 2, TAU / 2, TAU, false);
      ctx.fill();
      ctx.restore();
    }

  };

  addEntityClass(Frog);

  return Frog;

}).call(this);


/***/ }),

/***/ 224:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var GeneticPlant, TAU, Tree, addEntityClass, gaussianRandom,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } },
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

Tree = __webpack_require__(776);

({addEntityClass} = __webpack_require__(505));

TAU = Math.PI * 2;

// Standard Normal variate using Box-Muller transform.
gaussianRandom = (mean = 0, standardDeviation = 1, random = Math.random) => {
  var u, v, z;
  u = 1 - random(); // Converting [0,1) to (0,1)
  v = random();
  z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(TAU * v);
  // Transform to the desired mean and standard deviation:
  return z * standardDeviation + mean;
};

module.exports = GeneticPlant = (function() {
  class GeneticPlant extends Tree {
    constructor() {
      super();
      this.gaussianRandom = this.gaussianRandom.bind(this);
      this.bbox_padding = 60;
      this.random_index = 0;
      this.random_values = [];
      this.dna = {
        branch_color_hue_avg: gaussianRandom(20, 40),
        branch_color_hue_range: Math.random() < 0.7 ? 0 : gaussianRandom(5, 20),
        branch_color_saturation_avg: Math.random() * 50 + 50,
        branch_color_saturation_range: Math.random() < 0.7 ? 0 : Math.random() * 50,
        branch_color_lightness_avg: gaussianRandom(50, 15),
        branch_color_lightness_range: Math.random() < 0.7 ? 0 : Math.random() * 50,
        leaf_color_hue_avg: gaussianRandom(120, 40),
        leaf_color_hue_range: Math.random() < 0.5 ? 0 : gaussianRandom(5, 30),
        leaf_color_saturation_avg: Math.random() * 50 + 50,
        leaf_color_saturation_range: Math.random() < 0.5 ? 0 : Math.random() * 50,
        leaf_color_lightness_avg: gaussianRandom(50, 15),
        leaf_color_lightness_range: Math.random() < 0.5 ? 0 : Math.random() * 50,
        leaf_size_min: Math.random() * 20 + 2,
        leaf_size_range: Math.random() * 20,
        leaf_aspect: Math.random() * 2 + 0.1,
        leaf_bottom_aspect: Math.random() * 0.5 + 1,
        leaf_pointedness: Math.random(),
        leaf_anti_pointedness: Math.random() * 2 - 1,
        leaf_rotation_range: Math.random() * TAU,
        leaf_bunch_min: Math.random() * 5 + 1,
        leaf_bunch_range: Math.random() * 5,
        leaf_bunch_spread_min: Math.random() * 15 + 1,
        leaf_bunch_spread_range: Math.random() * 15,
        trunk_width_min: Math.random() * 15 + 2,
        trunk_width_range: Math.random() * 10,
        trunk_length_min: Math.random() * 20 + 1,
        trunk_length_range: Math.random() * 20,
        branch_width_target_min: Math.random() * 10 + 1,
        branch_width_target_range: Math.random() * 3,
        branch_length_target_min: Math.random() * 10 + 1,
        branch_length_target_range: Math.random() * 3,
        branch_width_change_factor_max: 1 - Math.random() * 0.1,
        branch_width_change_factor_range: Math.random() * 0.2,
        branch_length_change_factor_max: 1 - Math.random() * 0.2,
        branch_length_change_factor_range: Math.random() * 0.2,
        angle_change_max: Math.random() * 1.5,
        angle_tend_upward: Math.random() * 2,
        branching_angle_min: Math.random() * TAU / 4,
        branching_angle_range: Math.random() * TAU / 4
      };
      this.init();
    }

    init() {
      this.structure.clear();
      this.structure.addPoint("base"); // Tree does this but we have to redo it because we deleted the points
      this.branch({
        from: "base",
        to: "1",
        juice: Math.random() * 10 + 5,
        width: this.dna.trunk_width_min + Math.random() * this.dna.trunk_width_range,
        length: this.dna.trunk_length_min + Math.random() * this.dna.trunk_length_range,
        angle: -TAU / 4
      });
    }

    fromJSON(def) {
      super.fromJSON(def);
      // in main.coffee I have a dev helper that creates clones with the same DNA
      // using Entity.fromJSON with just the class name and dna property
      if (def.dna && !def.structure) {
        this.init();
      }
    }

    random() {
      var base, name1;
      // Cached random values for determinism at runtime, not needed during initialization
      this.random_index++;
      return (base = this.random_values)[name1 = this.random_index] != null ? base[name1] : base[name1] = Math.random();
    }

    gaussianRandom(mean = 0, standardDeviation = 1) {
      boundMethodCheck(this, GeneticPlant);
      return gaussianRandom(mean, standardDeviation, () => {
        return this.random();
      });
    }

    branch({from, to, juice, angle, width, length}) {
      var branch_angle, branch_length_change_factor, branch_width_change_factor, color, dir, hue, leaf_point, length_target, lightness, name, saturation, side, width_target;
      name = to;
      angle += (Math.random() * 2 - 1) * this.dna.angle_change_max;
      dir = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      };
      dir.y -= this.dna.angle_tend_upward;
      angle = Math.atan2(dir.y, dir.x);
      hue = modulo(this.dna.branch_color_hue_avg + (this.random() - 0.5) * this.dna.branch_color_hue_range, 360);
      saturation = Math.min(100, Math.max(0, this.dna.branch_color_saturation_avg + (this.random() - 0.5) * this.dna.branch_color_saturation_range));
      lightness = Math.min(100, Math.max(0, this.dna.branch_color_lightness_avg + (this.random() - 0.5) * this.dna.branch_color_lightness_range));
      color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      this.structure.addSegment({from, name, length, width, color});
      this.structure.points[name].x = this.structure.points[from].x + Math.cos(angle) * length;
      this.structure.points[name].y = this.structure.points[from].y + Math.sin(angle) * length;
      branch_width_change_factor = this.dna.branch_width_change_factor_max - Math.random() * this.dna.branch_width_change_factor_range;
      branch_length_change_factor = this.dna.branch_length_change_factor_max - Math.random() * this.dna.branch_length_change_factor_range;
      // Note this will have an averaging effect since the target is randomized each time
      // It will tend towards the middle of the range, as opposed to if the specific target was chosen at the start
      // It will also wobble (random walk) around the range.
      width_target = this.dna.branch_width_target_min + Math.random() * this.dna.branch_width_target_range;
      length_target = this.dna.branch_length_target_min + Math.random() * this.dna.branch_length_target_range;
      width += (width_target - width) * branch_width_change_factor;
      length += (length_target - length) * branch_length_change_factor;
      juice -= 0.3;
      if (juice > 0) {
        this.branch({
          from: name,
          to: `${to}-a`,
          juice,
          angle,
          width,
          length
        });
        if (Math.random() < 0.1 - juice / 200) {
          side = Math.random() < 0.5 ? -1 : 1;
          branch_angle = angle + side * (this.dna.branching_angle_min + Math.random() * this.dna.branching_angle_range);
          this.branch({
            from: name,
            to: `${to}-b`,
            juice,
            angle: branch_angle,
            width,
            length
          });
        }
      } else {
        leaf_point = this.structure.points[name];
        leaf_point.segment_name = name;
        this.leaf(leaf_point);
      }
    }

    leaf(leaf) {
      leaf.is_leaf = true;
      return leaf;
    }

    draw(ctx) {
      var leaf, point_name, ref, ref1, segment, segment_name;
      this.random_index = 0;
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
      ref1 = this.structure.points;
      for (point_name in ref1) {
        leaf = ref1[point_name];
        if (leaf.is_leaf) {
          this.drawLeaf(ctx, leaf);
        }
      }
    }

    drawLeaf(ctx, leaf) {
      var angle, ap, h, hue, i, lightness, num_leaves, offset, p, ref, saturation, segment, size, spread, w, wb;
      segment = this.structure.segments[leaf.segment_name];
      angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x) + TAU / 4;
      num_leaves = this.dna.leaf_bunch_min + this.random() * this.dna.leaf_bunch_range;
      spread = this.dna.leaf_bunch_spread_min + this.random() * this.dna.leaf_bunch_spread_range;
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(angle);
      for (i = 0, ref = num_leaves; (0 <= ref ? i <= ref : i >= ref); 0 <= ref ? i++ : i--) {
        size = this.dna.leaf_size_min + this.random() * this.dna.leaf_size_range;
        offset = this.random() * spread;
        ctx.translate(0, offset);
        ctx.save();
        ctx.rotate(this.random() * this.dna.leaf_rotation_range);
        ctx.beginPath();
        ctx.scale(size, size);
        w = this.dna.leaf_aspect;
        wb = w * this.dna.leaf_bottom_aspect;
        h = 1;
        p = this.dna.leaf_pointedness;
        ap = this.dna.leaf_anti_pointedness;
        ctx.translate(0, -h);
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(w, p, w, h - ap, 0, h);
        ctx.bezierCurveTo(-wb, h - ap, -wb, p, 0, 0);
        ctx.closePath();
        hue = modulo(this.dna.leaf_color_hue_avg + (this.random() - 0.5) * this.dna.leaf_color_hue_range, 360);
        saturation = Math.min(100, Math.max(0, this.dna.leaf_color_saturation_avg + (this.random() - 0.5) * this.dna.leaf_color_saturation_range));
        lightness = Math.min(100, Math.max(0, this.dna.leaf_color_lightness_avg + (this.random() - 0.5) * this.dna.leaf_color_lightness_range));
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }

  };

  addEntityClass(GeneticPlant);

  return GeneticPlant;

}).call(this);


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
      var collision, current_foot_point_name, current_foot_pos, dist, foot_point, force, i, j, k, l, leg, len, next_foot_pos, point_name, ref, ref1, segment_name;
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
      for (var l = 0; l <= 4; l++) {
        this.structure.stepLayout({collision});
      }
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
      ctx.fill();
    }

  };

  addEntityClass(GranddaddyLonglegs);

  return GranddaddyLonglegs;

}).call(this);


/***/ }),

/***/ 795:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Arrow, Bow, Deer, Entity, Player, Pose, SimpleActor, TAU, addEntityClass, closestPointOnLineSegment, distance, gamepad_aiming, gamepad_deadzone, gamepad_detect_threshold, gamepad_jump_prev, gamepad_mount_prev, keyboard, mouse_detect_from, mouse_detect_threshold,
  splice = [].splice,
  indexOf = [].indexOf,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

SimpleActor = __webpack_require__(339);

Entity = __webpack_require__(293);

({Pose} = __webpack_require__(505));

Bow = __webpack_require__(914);

Arrow = __webpack_require__(943);

Deer = __webpack_require__(857);

keyboard = __webpack_require__(866);

({addEntityClass} = __webpack_require__(505));

({distance} = (__webpack_require__(505).helpers));

TAU = Math.PI * 2;

// Actually treat it as a segment, not an infinite line
// unlike copies of this function in other files
closestPointOnLineSegment = function(point, a, b) {
  var a_to_b, a_to_p, atb2, atp_dot_atb, t;
  // https://stackoverflow.com/a/3122532/2624876
  a_to_p = {
    x: point.x - a.x,
    y: point.y - a.y
  };
  a_to_b = {
    x: b.x - a.x,
    y: b.y - a.y
  };
  atb2 = a_to_b.x ** 2 + a_to_b.y ** 2;
  atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
  t = atp_dot_atb / atb2;
  t = Math.max(0, Math.min(1, t));
  return {
    x: a.x + a_to_b.x * t,
    y: a.y + a_to_b.y * t
  };
};

gamepad_aiming = false;

gamepad_detect_threshold = 0.5; // axis value (not a deadzone! just switching from mouse to gamepad)

gamepad_deadzone = 0.1; // axis value

gamepad_jump_prev = false;

gamepad_mount_prev = false;

mouse_detect_threshold = 30; // pixels radius (movement can occur over any number of frames)

mouse_detect_from = {
  x: 0,
  y: 0
};

addEventListener("mousemove", function(e) {
  if (Math.hypot(e.clientX - mouse_detect_from.x, e.clientY - mouse_detect_from.y) > mouse_detect_threshold) {
    gamepad_aiming = false;
    mouse_detect_from.x = e.clientX;
    mouse_detect_from.y = e.clientY;
  }
});

module.exports = Player = (function() {
  var serialization_exclusions;

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
        to: "left elbow",
        name: "upper left arm",
        length: 10
      });
      this.structure.addSegment({
        from: "right shoulder",
        to: "right elbow",
        name: "upper right arm",
        length: 10
      });
      this.structure.addSegment({
        from: "left elbow",
        to: "left hand",
        name: "lower left arm",
        length: 10
      });
      this.structure.addSegment({
        from: "right elbow",
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
      this.holding_arrows = [];
      this.riding = null;
      this.bow_drawn_to = 0;
      this.run_animation_position = 0;
      this.subtle_idle_animation_position = 0;
      this.other_idle_animation_position = 0;
      this.idle_animation = null;
      this.idle_timer = 0;
      // Upper and lower body facing directions are separate because when aiming backwards,
      // it looks very silly if the player flips around completely while riding a horse,
      // as if switching to sitting backwards just to aim,
      // but when not riding, it may look a bit better to flip wholly around.
      // @lower_body_facing_x switches while aiming backwards except if you're riding a mount.
      // @upper_body_facing_x is actually a continuous value while aiming.
      // @smoothed_facing_x_for_eyes is an interpolated version of @upper_body_facing_x.
      // (TODO: rename @smoothed_facing_x_for_eyes to @smoothed_upper_body_facing_x,
      // because it's also used for the hair. Or perhaps @looking_x to match @looking_y.
      // Or maybe they could be @head_facing_x and @head_facing_y.)
      this.smoothed_facing_x_for_eyes = this.upper_body_facing_x = this.lower_body_facing_x = this.facing_x = 1;
      this.looking_y = 0;
      this.landing_momentum = 0; // for bending knees when landing
      this.hairs = (function() {
        var j, results;
        results = [];
        for (var j = 0; j <= 5; j++) {
          results.push((function() {
            var l, results1;
            results1 = [];
            for (var l = 0; l <= 4; l++) {
              results1.push({
                x: 0,
                y: 0,
                vx: 0,
                vy: 0
              });
            }
            return results1;
          })());
        }
        return results;
      })();
      this.hair_initialized = false;
    }

    // Serialization
    // Entity::resolveReferences handles _refs_ when deserializing,
    // but in a super limited way: only for references to other entities, only at the top level.
    // We need to overload (or override, or officially update) it to handle references inside arrays and objects.
    // TODO: use a library for a general solution to circular references
    // TODO: make it easier to exclude properties when serializing, i.e. without overloading toJSON
    resolveReferences(world) {
      var entity_id, j, key, key_path, l, last_key, len, len1, obj, ref, ref1;
      // if @_refs_
      // 	for k, id of @_refs_
      // 		@[k] = world.getEntityByID(id)
      // 	delete @_refs_
      if (this._recursive_refs_) {
        ref = this._recursive_refs_;
        for (j = 0, len = ref.length; j < len; j++) {
          [key_path, entity_id] = ref[j];
          ref1 = key_path, [...key_path] = ref1, [last_key] = splice.call(key_path, -1);
          obj = this;
          for (l = 0, len1 = key_path.length; l < len1; l++) {
            key = key_path[l];
            obj = obj[key];
          }
          obj[last_key] = world.getEntityByID(entity_id);
        }
        delete this._recursive_refs_;
      }
    }

    toJSON() {
      var _recursive_refs_, ent_def, store_refs;
      // def = {}
      // for k, v of @ when k not in serialization_exclusions
      // 	if v instanceof Entity
      // 		def._refs_ ?= {}
      // 		def._refs_[k] = v.id
      // 	else
      // 		def[k] = v
      // return def
      _recursive_refs_ = [];
      store_refs = function(obj, key_path = []) {
        var k, obj_def, v;
        obj_def = obj instanceof Array ? [] : {};
        for (k in obj) {
          v = obj[k];
          if (indexOf.call(serialization_exclusions, k) < 0) {
            if (typeof v === "object" && v) {
              if (v instanceof Entity) {
                _recursive_refs_.push([[...key_path, k], v.id]);
              } else {
                if (v.toJSON) {
                  v = v.toJSON();
                }
                obj_def[k] = store_refs(v, [...key_path, k]);
              }
            } else {
              obj_def[k] = v;
            }
          }
        }
        return obj_def;
      };
      ent_def = store_refs(this);
      if (_recursive_refs_.length) {
        ent_def._recursive_refs_ = _recursive_refs_;
      }
      return ent_def;
    }

    step(world, view, mouse) {
      var a_world, aim_angle, angle, arm_angle, arm_extension, arm_span, arrow, arrow_angle, arrow_index, b_world, bow, bow_angle, bow_index, c_world, c_world_soon, center, crouch, distance_from_shoulder, distance_from_shoulder_soon, down, draw_back_distance, draw_bow, draw_to, dx, dx_soon, dy, dy_soon, elbow_x, elbow_y, factor, fan_angle, force, from_point_in_world, gamepad, gamepad_draw_bow, gamepad_prime_bow, gravity, ground_angle, hand, hand_world, hand_world_soon, hand_x, hand_y, head, head_x_before_posing, head_y_before_posing, hold_offset, index, j, l, left, len, len1, lerp_factor, lower_body_pose, lower_point_names, max_draw_distance, max_y_diff, more_submerged, mount_dismount, mouse_draw_bow, mouse_in_world, mouse_prime_bow, moving, moving_towards_item, neck, neck_lerp_factor, new_head_x, new_head_y, new_neck_x, new_neck_y, new_pose, new_primary_shoulder_dist, new_secondary_shoulder_dist, offset_angle, offset_distance, other_idle_animation, pick_up_any, pick_up_distance_threshold, player_index, point, point_name, pose_elbow, pose_hand, pose_neck, pose_primary_shoulder, pose_secondary_shoulder, pose_shoulder, pose_shoulder_world, pose_shoulder_world_soon, prevent_idle, primary_elbow, primary_hand, primary_hand_in_arrow_space, primary_hand_in_bow_space, primary_shoulder, primary_shoulder_dist, primary_shoulder_dx, primary_shoulder_dy, prime_bow, reach_distance, reach_point_local, reach_point_world, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, right, search_result, secondary_elbow, secondary_hand, secondary_hand_in_arrow_space, secondary_hand_in_bow_space, secondary_shoulder, secondary_shoulder_dist, secondary_shoulder_dx, secondary_shoulder_dy, slowing, squat_factor, sternum, subtle_idle_animation, up, upper_body_pose, wide_shoulder_dist, widening_factor, within_reach, x, y;
      ({sternum} = this.structure.points);
      from_point_in_world = this.toWorld(sternum);
      
      // mouse controls
      mouse_in_world = view.toWorld(mouse);
      aim_angle = Math.atan2(mouse_in_world.y - from_point_in_world.y, mouse_in_world.x - from_point_in_world.x);
      mouse_prime_bow = mouse.RMB.down;
      mouse_draw_bow = mouse.LMB.down;
      // keyboard controls
      left = keyboard.isHeld("KeyA") || keyboard.isHeld("ArrowLeft");
      right = keyboard.isHeld("KeyD") || keyboard.isHeld("ArrowRight");
      up = keyboard.isHeld("KeyW") || keyboard.isHeld("ArrowUp"); // applies to swimming/climbing
      down = keyboard.isHeld("KeyS") || keyboard.isHeld("ArrowDown");
      this.jump = keyboard.wasJustPressed("KeyW") || keyboard.wasJustPressed("ArrowUp");
      mount_dismount = keyboard.wasJustPressed("KeyS") || keyboard.wasJustPressed("ArrowDown");
      // gamepad controls
      gamepad_draw_bow = false;
      gamepad_prime_bow = false;
      ref1 = (ref = ((function() {
        try {
          return navigator.getGamepads();
        } catch (error) {}
      })())) != null ? ref : [];
      for (j = 0, len = ref1.length; j < len; j++) {
        gamepad = ref1[j];
        if (!(gamepad)) {
          continue;
        }
        left || (left = gamepad.axes[0] < -0.5);
        right || (right = gamepad.axes[0] > 0.5);
        up || (up = gamepad.axes[1] < -0.5);
        down || (down = gamepad.axes[1] > 0.5);
        this.jump || (this.jump = gamepad.buttons[0].pressed && !gamepad_jump_prev);
        mount_dismount || (mount_dismount = gamepad.buttons[1].pressed && !gamepad_mount_prev);
        gamepad_jump_prev = gamepad.buttons[0].pressed;
        gamepad_mount_prev = gamepad.buttons[1].pressed;
        gamepad_draw_bow = gamepad.buttons[7].pressed;
        // gamepad_prime_bow = gamepad.buttons[4].pressed
        if (Math.hypot(gamepad.axes[2], gamepad.axes[3]) > gamepad_detect_threshold) {
          gamepad_aiming = true;
        }
        if (gamepad_aiming) {
          aim_angle = Math.atan2(gamepad.axes[3], gamepad.axes[2]);
          // Reverse aiming can feel more natural, like drawing back the bow
          // even though it's not the control to draw the bow
          // TODO: It should be an option.
          aim_angle += TAU / 2;
          draw_back_distance = Math.hypot(gamepad.axes[2], gamepad.axes[3]);
          draw_back_distance = Math.max(0, draw_back_distance - gamepad_deadzone);
          gamepad_prime_bow = draw_back_distance > 0.3;
        }
      }
      // Note: You're allowed to prime and draw the bow without an arrow.
      prime_bow = this.holding_bow && (mouse_prime_bow || gamepad_prime_bow);
      draw_bow = prime_bow && (mouse_draw_bow || gamepad_draw_bow);
      this.aiming_bow = prime_bow; // for drawing
      crouch = down && this.grounded && !this.riding;
      // TODO: configurable controls
      this.move_x = right - left;
      this.move_y = down - up;
      // run SimpleActor physics, which uses @move_x and @jump
      super.step(world);
      pick_up_distance_threshold = 10;
      if (this.pick_up_timer == null) {
        this.pick_up_timer = 0;
      }
      this.pick_up_timer -= 1;
      pick_up_any = (EntityClass, prop, use_secondary_hand = false, hold_many = false) => {
        var entity_filter, hand, hand_world, near_hand, near_shoulder, nearest, primary_hand, primary_shoulder, ref2, secondary_hand, secondary_shoulder, shoulder, shoulder_world;
        // Skele2D editor sets entity.destroyed if you delete an entity
        // If you delete an entity while it's being held, and then save and load,
        // it will come back as null. So we need to handle both cases.
        if (hold_many) {
          this[prop] = this[prop].filter(function(entity) {
            return entity && !entity.destroyed;
          });
        } else {
          if ((ref2 = this[prop]) != null ? ref2.destroyed : void 0) {
            this[prop] = null;
          }
        }
        if (this.pick_up_timer > 0) {
          return;
        }
        if (this[prop] && !hold_many) {
          return;
        }
        entity_filter = (entity) => {
          var moving_too_fast, vx, vy;
          if (hold_many && this[prop].includes(entity)) {
            return false;
          }
          moving_too_fast = false;
          // Arrow defines getAverageVelocity
          // Bow doesn't move, and we're not handling picking up anything else yet
          if (entity.getAverageVelocity != null) {
            [vx, vy] = entity.getAverageVelocity();
            if (Math.abs(vx) + Math.abs(vy) > 2) {
              moving_too_fast = true;
            }
          }
          return !moving_too_fast;
        };
        primary_hand = this.structure.points["right hand"];
        secondary_hand = this.structure.points["left hand"];
        primary_shoulder = this.structure.points["right shoulder"];
        secondary_shoulder = this.structure.points["left shoulder"];
        hand = use_secondary_hand ? secondary_hand : primary_hand;
        shoulder = use_secondary_hand ? secondary_shoulder : primary_shoulder;
        hand_world = this.toWorld(hand);
        shoulder_world = this.toWorld(shoulder);
        // Checking from both these locations ensures
        // it won't try to reach towards something it can't reach
        // when it could reach something else.
        // For example, if there's an item just out of reach below the hand
        // with the arm extended downwards, but another item above the shoulder, within reach,
        // the item within reach is further from the hand than the one out of reach,
        // but it's closer to the shoulder.
        // Later logic can decide to not actually reach towards anything out of reach,
        // or to reach towards a nearby item as long as you're moving towards it.
        near_hand = world.closest(hand_world, EntityClass, entity_filter);
        near_shoulder = world.closest(shoulder_world, EntityClass, entity_filter);
        nearest = near_hand.closest_dist < near_shoulder.closest_dist ? near_hand : near_shoulder;
        if (nearest.closest_dist < 50) {
          // Animates the hand reaching for the entity
          this.reaching_for_entity = nearest.closest_entity;
          this.reaching_for_segment = nearest.closest_segment;
          this.reaching_with_secondary_hand = use_secondary_hand;
          // If the hand is close enough to an item, pick it up
          if (near_hand.closest_dist < pick_up_distance_threshold) {
            if (hold_many) {
              this[prop].push(near_hand.closest_entity);
            } else {
              this[prop] = near_hand.closest_entity;
            }
            return this.pick_up_timer = 10;
          }
        }
      };
      this.reaching_for_entity = null;
      this.reaching_for_segment = null;
      this.reaching_with_secondary_hand = false;
      pick_up_any(Bow, "holding_bow", true, false);
      pick_up_any(Arrow, "holding_arrows", false, true);
      // Note: Arrow checks "holding_arrows" property to prevent solving for collisions while held
      if (mount_dismount) {
        if (this.riding) {
          this.riding = null;
        } else {
          search_result = world.closest(from_point_in_world, Deer);
          if (search_result.closest_dist < 30) {
            this.riding = search_result.closest_entity;
          }
        }
      }
      if (this.riding) {
        this.riding.move_x = this.move_x;
        this.riding.jump = this.jump;
        this.facing_x = this.riding.facing_x;
        offset_distance = 20;
        this.x = this.riding.x + Math.sin(this.riding.ground_angle_smoothed) * offset_distance;
        this.y = this.riding.y - Math.cos(this.riding.ground_angle_smoothed) * offset_distance - 10;
        this.vx = this.riding.vx;
        this.vy = this.riding.vy;
      }
      prevent_idle = () => {
        this.idle_timer = 0;
        return this.idle_animation = null;
      };
      more_submerged = this.submerged && world.collision({
        x: this.x,
        y: this.y + this.height * 0.5
      }, {
        types: (entity) => {
          return entity.constructor.name === "Water";
        }
      });
      if (this.riding) {
        new_pose = (ref2 = Player.poses[prime_bow ? "Riding Aiming" : "Riding"]) != null ? ref2 : this.structure.getPose();
      } else if (more_submerged) {
        if (this.move_x === 0 && crouch) {
          // TODO: DRY?
          new_pose = Player.poses["Crouch"];
          // There's no idle animation for crouching
          prevent_idle();
        } else if (this.move_x !== 0 && Player.animations["Swim"]) {
          this.run_animation_position += 0.1;
          new_pose = Pose.lerpAnimationLoop(Player.animations["Swim"], this.run_animation_position);
        } else if (Player.animations["Tread Water"]) {
          this.run_animation_position -= 0.1 * this.move_y;
          new_pose = Pose.lerpAnimationLoop(Player.animations["Tread Water"], this.run_animation_position);
        } else {
          new_pose = (ref3 = Player.poses["Stand"]) != null ? ref3 : this.structure.getPose();
        }
      } else if (this.grounded) {
        if (this.move_x === 0) {
          if (crouch) {
            new_pose = Player.poses["Crouch"];
            // There's no idle animation for crouching
            prevent_idle();
          } else {
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
              new_pose = (ref4 = Player.poses["Stand"]) != null ? ref4 : this.structure.getPose();
            }
          }
        } else {
          prevent_idle();
          if (Player.animations["Run"]) {
            this.run_animation_position += Math.abs(this.move_x) / 5 * this.facing_x * this.lower_body_facing_x;
            new_pose = Pose.lerpAnimationLoop(Player.animations["Run"], this.run_animation_position);
          } else {
            new_pose = this.structure.getPose();
          }
        }
      } else {
        prevent_idle();
        slowing = Math.sign(this.move_x) === -Math.sign(this.vx); // note the minus sign
        new_pose = slowing ? Player.poses["Jumping Back"] : void 0;
        if (new_pose == null) {
          new_pose = (ref5 = (ref6 = Player.poses["Jumping"]) != null ? ref6 : Player.poses["Stand"]) != null ? ref5 : this.structure.getPose();
        }
      }
      
      // Make sure to avoid mutating the pose data,
      // since new_pose may be a reference to a pose in Player.poses!
      // (It's not a problem for animations, since interpolation returns a new pose.)
      // Either use Pose.copy or another pure function like Pose.horizontallyFlip.

      // This is a more concise way to handle upper/lower body flipping,
      // but the implementation below may be more clear.
      // if @upper_body_facing_x < 0
      // 	new_pose = Pose.horizontallyFlip(new_pose)
      // else
      // 	# Avoid mutating the pose data
      // 	new_pose = Pose.copy(new_pose)
      // if @lower_body_facing_x isnt @upper_body_facing_x
      // 	new_pose_for_lower_body = Pose.horizontallyFlip(new_pose)
      // 	for point_name in ["pelvis", "left hip", "right hip", "left knee", "right knee", "left foot", "right foot"]
      // 		new_pose.points[point_name] = new_pose_for_lower_body.points[point_name]
      upper_body_pose = Pose.copy(new_pose);
      if (this.upper_body_facing_x < 0) {
        upper_body_pose = Pose.horizontallyFlip(upper_body_pose);
      }
      lower_body_pose = Pose.copy(new_pose);
      if (this.lower_body_facing_x < 0) {
        lower_body_pose = Pose.horizontallyFlip(lower_body_pose);
      }
      // Combine the two poses
      new_pose = Pose.copy(new_pose);
      lower_point_names = ["pelvis", "left hip", "right hip", "left knee", "right knee", "left foot", "right foot"];
      ref7 = new_pose.points;
      for (point_name in ref7) {
        point = ref7[point_name];
        if (indexOf.call(lower_point_names, point_name) >= 0) {
          new_pose.points[point_name] = lower_body_pose.points[point_name];
        } else {
          new_pose.points[point_name] = upper_body_pose.points[point_name];
        }
      }
      head_x_before_posing = this.structure.points["head"].x;
      head_y_before_posing = this.structure.points["head"].y;
      // rotate the pose based on the ground angle
      // TODO: balance the character better; lean while running; keep feet out of the ground
      // I may need to define new poses to do this well.
      ground_angle = (ref8 = (ref9 = this.riding) != null ? ref9.ground_angle_smoothed : void 0) != null ? ref8 : this.find_ground_angle(world);
      this.ground_angle = ground_angle;
      if ((ground_angle != null) && isFinite(ground_angle)) {
        // there's no helper for rotation yet
        // and we wanna do it a little custom anyway
        // rotating some points more than others
        center = new_pose.points["pelvis"];
        center = {
          x: center.x,
          y: center.y // copy
        };
        ref10 = new_pose.points;
        for (point_name in ref10) {
          point = ref10[point_name];
          if (this.riding) {
            factor = 1;
          } else {
            // With this constant this small, it's almost like a conditional
            // of whether the point is below the pelvis or not.
            // With a larger number, it would bend the knees backwards.
            max_y_diff = 2;
            // how much to rotate this point
            factor = Math.max(0, Math.min(1, (point.y - center.y) / max_y_diff));
            // It's a bit much on steep slopes, so let's reduce it.
            // This is still enough to keep the feet from floating,
            // although the feet go into the ground significantly.
            factor *= 0.8;
          }
          // translate
          point.x -= center.x;
          point.y -= center.y;
          // rotate
          ({x, y} = point);
          point.x = x * Math.cos(ground_angle) - y * Math.sin(ground_angle);
          point.y = x * Math.sin(ground_angle) + y * Math.cos(ground_angle);
          // while we've got the x and y from before the rotation handy,
          // let's use them to apply the factor, using linear interpolation
          point.x += (x - point.x) * (1 - factor);
          point.y += (y - point.y) * (1 - factor);
          // translate back
          point.x += center.x;
          point.y += center.y;
          // Also, squash when landing.
          // TODO: less head bobbing action, more knee bending
          if (this.landing_momentum == null) {
            this.landing_momentum = 0;
          }
          this.landing_momentum *= 0.9;
          gravity = 0.5;
          squat_factor = Math.min(1, Math.max(0, this.landing_momentum - gravity));
          point.y += squat_factor * (1 - factor) * 15;
        }
      }
      // (her dominant eye is, of course, *whichever one she would theoretically be using*)
      // (given this)
      primary_hand = this.structure.points["right hand"];
      secondary_hand = this.structure.points["left hand"];
      primary_elbow = this.structure.points["right elbow"];
      secondary_elbow = this.structure.points["left elbow"];
      primary_shoulder = this.structure.points["right shoulder"];
      secondary_shoulder = this.structure.points["left shoulder"];
      // Make hand reach for items
      if (this.reaching_for_entity) {
        hand = this.reaching_with_secondary_hand ? secondary_hand : primary_hand;
        pose_primary_shoulder = new_pose.points["right shoulder"];
        pose_secondary_shoulder = new_pose.points["left shoulder"];
        pose_shoulder = this.reaching_with_secondary_hand ? pose_secondary_shoulder : pose_primary_shoulder;
        hand_world = this.toWorld(hand);
        pose_shoulder_world = this.toWorld(pose_shoulder);
        hand_world_soon = {
          x: hand_world.x + this.vx,
          y: hand_world.y + this.vy
        };
        pose_shoulder_world_soon = {
          x: pose_shoulder_world.x + this.vx,
          y: pose_shoulder_world.y + this.vy
        };
        a_world = this.reaching_for_entity.toWorld(this.reaching_for_segment.a);
        b_world = this.reaching_for_entity.toWorld(this.reaching_for_segment.b);
        c_world = closestPointOnLineSegment(hand_world, a_world, b_world);
        c_world_soon = closestPointOnLineSegment(hand_world_soon, a_world, b_world);
        // assuming the arms are the same length haha
        arm_span = this.structure.segments["upper right arm"].length + this.structure.segments["lower right arm"].length;
        dx = c_world.x - pose_shoulder_world.x;
        dy = c_world.y - pose_shoulder_world.y;
        distance_from_shoulder = Math.hypot(dx, dy);
        dx_soon = c_world_soon.x - pose_shoulder_world_soon.x;
        dy_soon = c_world_soon.y - pose_shoulder_world_soon.y;
        distance_from_shoulder_soon = Math.hypot(dx_soon, dy_soon);
        
        // if the item is too far away, don't just reach as far as possible
        // UNLESS we're approaching the item
        within_reach = distance_from_shoulder < arm_span + pick_up_distance_threshold * 0.9;
        // Note that the gravity force accumulates below the threshold for movement
        // so we need a threshold at least as high as that, or it will alternate.
        moving = Math.abs(this.vx) > 1 || Math.abs(this.vy) > 1;
        moving_towards_item = moving && distance_from_shoulder - distance_from_shoulder_soon > 0.1;
        if (within_reach || moving_towards_item) {
          // bring the hand as close as possible to the item
          // (the general pose lerp will handle animating it as movement)
          distance_from_shoulder = Math.max(1, distance_from_shoulder); // avoid divide by zero
          reach_distance = Math.min(arm_span, distance_from_shoulder);
          reach_point_world = {
            x: pose_shoulder_world.x + reach_distance * dx / distance_from_shoulder,
            y: pose_shoulder_world.y + reach_distance * dy / distance_from_shoulder
          };
          reach_point_local = this.fromWorld(reach_point_world);
          hand_x = reach_point_local.x;
          hand_y = reach_point_local.y;
          // basic inverse kinematics for the elbow
          // Place the elbow at the midpoint between the hand and the shoulder
          elbow_x = (hand_x + pose_shoulder.x) / 2;
          elbow_y = (hand_y + pose_shoulder.y) / 2;
          // Then offset it to keep the segments the right length
          arm_angle = Math.atan2(hand_y - pose_shoulder.y, hand_x - pose_shoulder.x);
          arm_extension = Math.hypot(hand_x - pose_shoulder.x, hand_y - pose_shoulder.y);
          offset_angle = arm_angle + TAU / 4;
          offset_distance = Math.abs(arm_span - arm_extension);
          if (Math.sin(offset_angle) < 0) {
            offset_angle += TAU / 2;
          }
          elbow_x += Math.cos(offset_angle) * offset_distance;
          elbow_y += Math.sin(offset_angle) * offset_distance;
          // Update the pose
          pose_hand = new_pose.points[this.reaching_with_secondary_hand ? "left hand" : "right hand"];
          pose_elbow = new_pose.points[this.reaching_with_secondary_hand ? "left elbow" : "right elbow"];
          pose_hand.x = hand_x;
          pose_hand.y = hand_y;
          pose_elbow.x = elbow_x;
          pose_elbow.y = elbow_y;
        }
      }
      // This does a lot of the grunt work of smoothing things out
      this.structure.setPose(Pose.lerp(this.structure.getPose(), new_pose, 0.3));
      this.upper_body_facing_x = this.facing_x;
      this.lower_body_facing_x = this.facing_x;
      this.looking_y = 0;
      if (prime_bow) {
        // Restore head position, in order to do linear interpolation.
        // In this state, the head is not controlled by the pose, but by the bow aiming.
        this.structure.points["head"].x = head_x_before_posing;
        this.structure.points["head"].y = head_y_before_posing;
      }
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
          arrow = this.holding_arrows[0];
          if (prime_bow && arrow && bow.draw_distance > 2 && !world.collision(arrow.toWorld(arrow.structure.points["tip"])) && !world.collision(arrow.toWorld(arrow.structure.points["nock"]))) {
            force = bow.draw_distance * 2;
            arrow.setVelocity(Math.cos(aim_angle) * force + this.vx, Math.sin(aim_angle) * force + this.vy);
            index = this.holding_arrows.indexOf(arrow);
            if (index >= 0) {
              this.holding_arrows.splice(index, 1);
            }
          }
          bow.draw_distance = 0;
          // FIXME: this should be an ease-in transition, not ease-out
          this.bow_drawn_to += (arm_span - bow.fistmele - this.bow_drawn_to) / 10;
        }
        if (prime_bow) {
          prevent_idle();
          bow_angle = aim_angle;
          // Adjust shoulders: they need to be wider (further out) when aiming downwards
          // because the character is facing the camera in that case.
          primary_shoulder_dx = this.structure.points["right shoulder"].x - this.structure.points["sternum"].x;
          primary_shoulder_dy = this.structure.points["right shoulder"].y - this.structure.points["sternum"].y;
          secondary_shoulder_dx = this.structure.points["left shoulder"].x - this.structure.points["sternum"].x;
          secondary_shoulder_dy = this.structure.points["left shoulder"].y - this.structure.points["sternum"].y;
          primary_shoulder_dist = Math.hypot(primary_shoulder_dx, primary_shoulder_dy);
          secondary_shoulder_dist = Math.hypot(secondary_shoulder_dx, secondary_shoulder_dy);
          primary_shoulder_dist = Math.max(primary_shoulder_dist, 1);
          secondary_shoulder_dist = Math.max(secondary_shoulder_dist, 1);
          wide_shoulder_dist = 4;
          // when aiming up or down
          // widening_factor = Math.abs(Math.sin(aim_angle))
          // when aiming down
          // widening_factor = Math.max(0, Math.sin(aim_angle))
          // always
          widening_factor = 1;
          new_primary_shoulder_dist = primary_shoulder_dist + (wide_shoulder_dist - primary_shoulder_dist) * widening_factor;
          new_secondary_shoulder_dist = secondary_shoulder_dist + (wide_shoulder_dist - secondary_shoulder_dist) * widening_factor;
          primary_shoulder_dx *= new_primary_shoulder_dist / primary_shoulder_dist;
          primary_shoulder_dy *= new_primary_shoulder_dist / primary_shoulder_dist;
          secondary_shoulder_dx *= new_secondary_shoulder_dist / secondary_shoulder_dist;
          secondary_shoulder_dy *= new_secondary_shoulder_dist / secondary_shoulder_dist;
          // Moving y causes a problem where the shoulders "swing" when flipping facing direction
          // TODO: account for the player's torso angle. I think it would be best if the shoulders
          // were pushed out perpendicular to the torso, but right now it's in the global horizontal.
          this.structure.points["right shoulder"].x = this.structure.points["sternum"].x + primary_shoulder_dx;
          // @structure.points["right shoulder"].y = @structure.points["sternum"].y + primary_shoulder_dy
          this.structure.points["left shoulder"].x = this.structure.points["sternum"].x + secondary_shoulder_dx;
          // @structure.points["left shoulder"].y = @structure.points["sternum"].y + secondary_shoulder_dy

          // Move arms to aim
          primary_hand.x = sternum.x + this.bow_drawn_to * Math.cos(aim_angle);
          primary_hand.y = sternum.y + this.bow_drawn_to * Math.sin(aim_angle);
          // primary_elbow.x = sternum.x + 5 * Math.cos(aim_angle)
          // primary_elbow.y = sternum.y + 5 * Math.sin(aim_angle)
          // Place the elbow at the midpoint between the hand and the shoulder
          primary_elbow.x = (primary_hand.x + primary_shoulder.x) / 2;
          primary_elbow.y = (primary_hand.y + primary_shoulder.y) / 2;
          // "Then offset it to keep the segments the right length"
          // We don't actually want this, because the arm should bend in 3D space,
          // and basically just stay straight in 2D!
          // arm_angle = Math.atan2(primary_hand.y - primary_shoulder.y, primary_hand.x - primary_shoulder.x)
          // arm_extension = Math.hypot(primary_hand.x - primary_shoulder.x, primary_hand.y - primary_shoulder.y)
          // offset_angle = arm_angle + TAU/4
          // offset_distance = Math.abs(arm_span - arm_extension)
          // if Math.sin(offset_angle) < 0
          // 	offset_angle += TAU/2
          // primary_elbow.x += Math.cos(offset_angle) * offset_distance
          // primary_elbow.y += Math.sin(offset_angle) * offset_distance

          // primary_elbow.y = sternum.y - 3
          secondary_hand.x = sternum.x + arm_span * Math.cos(aim_angle);
          secondary_hand.y = sternum.y + arm_span * Math.sin(aim_angle);
          secondary_elbow.x = sternum.x + 15 * Math.cos(aim_angle);
          secondary_elbow.y = sternum.y + 15 * Math.sin(aim_angle);
          // Update facing directions
          // TODO: account for the player's torso angle.
          angle = modulo(aim_angle - TAU / 4, TAU);
          this.upper_body_facing_x = angle < TAU / 2 ? -1 : 1;
          if (!this.riding) {
            this.lower_body_facing_x = this.upper_body_facing_x;
          }
          // This can actually be a continuous value, which makes it look better.
          // I'm not changing this above because it would affect the @lower_body_facing_x,
          // which should be discrete.
          // TODO: refactor this code, probably get rid of `angle` above, replace it with a sin/cos check
          this.upper_body_facing_x = Math.cos(aim_angle);
          // The head should start tilting up or down at approximately 1/8th of a turn,
          // when the neck starts to re-center.
          // Within the 1/4 turn ranges centered left and right, the head should be level.
          this.looking_y = -(Math.sin(aim_angle) ** 4) * Math.sign(Math.sin(aim_angle)) * 2;
          // Make head look along aim path
          // TODO: account for the player's torso angle.
          angle = Math.sin(aim_angle * 2) * TAU / 8;
          angle = modulo(angle - TAU / 4, TAU);
          ({head, neck} = this.structure.points);
          new_head_x = sternum.x + 7 * Math.cos(angle + (angle < TAU / 2 ? TAU / 2 : 0));
          new_head_y = sternum.y + 7 * Math.sin(angle + (angle < TAU / 2 ? TAU / 2 : 0));
          new_neck_x = sternum.x + 2 * Math.cos(angle + (angle < TAU / 2 ? TAU / 2 : 0));
          new_neck_y = sternum.y + 2 * Math.sin(angle + (angle < TAU / 2 ? TAU / 2 : 0));
          // don't want the neck to move that much, so bring it back towards the pose
          // 0 = neck is completely straight, following the head (unnatural but not painful looking)
          // 1 = neck can be bent to painful-looking angles when looking up
          // in between = neck curves between the head and shoulders
          neck_lerp_factor = 0.3;
          pose_neck = new_pose.points.neck;
          new_neck_x += (pose_neck.x - new_neck_x) * neck_lerp_factor;
          new_neck_y += (pose_neck.y - new_neck_y) * neck_lerp_factor;
          lerp_factor = 1;
          head.x += (new_head_x - head.x) * lerp_factor;
          head.y += (new_head_y - head.y) * lerp_factor;
          neck.x += (new_neck_x - neck.x) * lerp_factor;
          neck.y += (new_neck_y - neck.y) * lerp_factor;
          if (this.holding_arrows.length > 1) {
            // drop extra arrows
            this.holding_arrows.length = 1;
          }
        } else {
          bow_angle = Math.atan2(secondary_hand.y - secondary_elbow.y, secondary_hand.x - secondary_elbow.x);
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
        
        // sort bow in front or behind player
        bow_index = the_world.entities.indexOf(bow);
        player_index = the_world.entities.indexOf(this);
        if (prime_bow) {
          if (bow_index < player_index) {
            the_world.entities.splice(bow_index, 1);
            player_index = the_world.entities.indexOf(this);
            the_world.entities.splice(player_index + 1, 0, bow);
          }
        } else {
          if (bow_index > player_index) {
            the_world.entities.splice(bow_index, 1);
            player_index = the_world.entities.indexOf(this);
            the_world.entities.splice(player_index, 0, bow);
          }
        }
      }
      ref11 = this.holding_arrows;
      for (arrow_index = l = 0, len1 = ref11.length; l < len1; arrow_index = ++l) {
        arrow = ref11[arrow_index];
        arrow.lodging_constraints.length = 0; // pull it out if it's lodged in an object
        arrow.x = this.x;
        arrow.y = this.y;
        // um, this coordinate transform is pointless because of the above,
        // but whatever, it shows intent, right?
        primary_hand_in_arrow_space = arrow.fromWorld(this.toWorld(primary_hand));
        secondary_hand_in_arrow_space = arrow.fromWorld(this.toWorld(secondary_hand));
        if (prime_bow) {
          arrow.structure.points.nock.x = sternum.x + draw_to * Math.cos(aim_angle);
          arrow.structure.points.nock.y = sternum.y + draw_to * Math.sin(aim_angle);
          arrow.structure.points.tip.x = sternum.x + (draw_to + arrow.length) * Math.cos(aim_angle);
          arrow.structure.points.tip.y = sternum.y + (draw_to + arrow.length) * Math.sin(aim_angle);
        } else {
          angle = Math.atan2(primary_hand.y - sternum.y, primary_hand.x - sternum.x);
          arrow_angle = angle - (TAU / 4 + 0.2) * this.upper_body_facing_x;
          // near fletching, good for one arrow
          hold_offset = -5;
          // hold a bit more centered when there's more arrows
          hold_offset -= Math.min(this.holding_arrows.length - 1, 3);
          // fan out the arrows, squeezing them together subtly more when moving
          fan_angle = ((arrow_index % 2) - 1 / 2) * arrow_index * 0.4;
          if (this.holding_arrows.length > 3) {
            fan_angle *= Math.pow(0.9, this.holding_arrows.length);
          }
          if (Math.abs(this.vx) > 2) {
            fan_angle *= 0.7;
          }
          arrow_angle += fan_angle;
          // pseudo-randomly stagger the arrows
          hold_offset += Math.sin(arrow_index ** 1.2) * Math.pow(arrow_index, 0.9) * 0.3;
          // jostle the arrows while moving
          arrow_angle += Math.sin(this.x / 10 + arrow_index * 0.1) * Math.cos(this.y / 10 + arrow_index * 0.5) * 0.01 * this.vx;
          arrow.structure.points.nock.x = primary_hand_in_arrow_space.x + hold_offset * Math.cos(arrow_angle);
          arrow.structure.points.nock.y = primary_hand_in_arrow_space.y + hold_offset * Math.sin(arrow_angle);
          arrow.structure.points.tip.x = primary_hand_in_arrow_space.x + (hold_offset + arrow.length) * Math.cos(arrow_angle);
          arrow.structure.points.tip.y = primary_hand_in_arrow_space.y + (hold_offset + arrow.length) * Math.sin(arrow_angle);
        }
        // Cancel implicit velocity from moving the arrow's "current positions"
        // (This updates the "previous positions" that imply velocity.)
        arrow.setVelocity(0, 0);
      }
      
      // Hair physics
      this.simulate_hair(world);
      this.smoothed_facing_x_for_eyes += (this.upper_body_facing_x - this.smoothed_facing_x_for_eyes) / 5;
    }

    simulate_hair(world) {
      var a, air_friction, back_x, back_y, buoyancy, delta_length, delta_x, delta_y, diff, fluid_friction, gravity, hair_index, hair_iterations, hair_length, head, head_angle, head_global, i, j, l, len, len1, len2, len3, len4, m, n, neck, o, p, point, points, q, ref, ref1, ref2, ref3, ref4, seg_length, submerged, water_friction;
      ({head, neck} = this.structure.points);
      head_angle = Math.atan2(head.y - neck.y, head.x - neck.x);
      head_global = this.toWorld(head);
      hair_iterations = 1;
      air_friction = 0.2;
      water_friction = 0.2;
      hair_length = 30;
      for (j = 0, ref = hair_iterations; (0 <= ref ? j <= ref : j >= ref); 0 <= ref ? j++ : j--) {
        ref1 = this.hairs;
        for (l = 0, len = ref1.length; l < len; l++) {
          points = ref1[l];
          for (m = 0, len1 = points.length; m < len1; m++) {
            point = points[m];
            point.prev_x = point.x;
            point.prev_y = point.y;
          }
        }
        ref2 = this.hairs;
        for (hair_index = n = 0, len2 = ref2.length; n < len2; hair_index = ++n) {
          points = ref2[hair_index];
          a = head_angle + hair_index / this.hairs.length * TAU / 2 - TAU / 4;
          back_x = Math.sin(head_angle) * 2 * this.upper_body_facing_x;
          back_y = Math.cos(head_angle) * 2 * this.upper_body_facing_x;
          points[0].x = head_global.x + Math.cos(a) * 3 + back_x;
          points[0].y = head_global.y + Math.sin(a) * 3 + back_y;
          seg_length = (hair_length + (Math.cos(a - head_angle) - 0.5) * 5) / points.length;
          for (i = o = 1, ref3 = points.length; (1 <= ref3 ? o < ref3 : o > ref3); i = 1 <= ref3 ? ++o : --o) {
            if (!this.hair_initialized) {
              points[i].x = points[i - 1].x;
              points[i].y = points[i - 1].y + seg_length;
              points[i].prev_x = points[i].x;
              points[i].prev_y = points[i].y;
            }
            gravity = 0.5;
            submerged = world != null ? world.collision(points[i], {
              types: (entity) => {
                return entity.constructor.name === "Water";
              }
            }) : void 0;
            buoyancy = submerged ? 0.6 : 0;
            fluid_friction = submerged ? water_friction : air_friction;
            points[i].vy += (gravity - buoyancy) / hair_iterations;
            points[i].vx *= 1 - fluid_friction;
            points[i].vy *= 1 - fluid_friction;
            if (submerged) {
              // points[i].vx += Math.sin(performance.now() / 1000 + i/30 + hair_index/10 + Math.sin(points[i].x/100 + points[i].y/100)) * 0.1
              // points[i].vy += Math.cos(performance.now() / 1000 + i/30 + hair_index/10 + Math.cos(points[i].x/150 + points[i].y/200)) * 0.05
              points[i].vx += Math.sin(Math.sin(performance.now() ** 1.2 / 1000 + Math.sin(points[i].y / 30)) * 40 + points[i].x + Math.sin(points[i].y / 30)) * 0.05;
              points[i].vy += Math.cos(Math.sin(performance.now() ** 1.2 / 1000 + Math.sin(points[i].y / 30)) * 40 + points[i].x + Math.sin(points[i].y / 30)) * 0.05;
            }
            points[i].x += points[i].vx;
            points[i].y += points[i].vy;
            delta_x = points[i].x - points[i - 1].x;
            delta_y = points[i].y - points[i - 1].y;
            delta_length = Math.hypot(delta_x, delta_y);
            diff = (delta_length - seg_length) / delta_length;
            if (isFinite(diff) && delta_length > seg_length) {
              points[i].x -= delta_x * diff;
              points[i].y -= delta_y * diff;
            } else if (!isFinite(diff)) {
              console.warn("diff is not finite, for hair segment distance constraint");
            }
          }
        }
        ref4 = this.hairs;
        for (p = 0, len3 = ref4.length; p < len3; p++) {
          points = ref4[p];
          for (q = 0, len4 = points.length; q < len4; q++) {
            point = points[q];
            point.vx = point.x - point.prev_x;
            point.vy = point.y - point.prev_y;
          }
        }
        this.hair_initialized = true;
      }
    }

    draw(ctx, view) {
      var behind_dress_segment_names, draw_limbs, dress_color, eye_color, eye_radius, eye_signature, eye_spacing, eye_x, eye_y, hair_color, hair_index, hair_points, hair_radius, head, head_radius_x, head_radius_y, head_rotation_angle, in_front_segment_names, j, l, left_knee, left_leg_angle, left_shoulder, left_shoulder_angle, len, len1, len2, local_point, m, max_cos, max_cos_shoulder_angle, max_shoulder_cos, max_sin, min_cos, min_cos_shoulder_angle, min_shoulder_cos, min_sin, pelvis, point, ref, ref1, ref2, right_knee, right_leg_angle, right_shoulder, right_shoulder_angle, shoulder_distance, skin_color, sternum, torso_angle, torso_length, turn_limit;
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
      eye_color = "#000000";
      dress_color = "#AAFFFF";
      
      // TODO: depth
      // @drawStructure
      // 	segments:
      // 		torso: ->
      // 	points:
      // 		head: ->

      // trailing hair
      if (view.is_preview || !this.hair_initialized) {
        this.simulate_hair();
        if (!view.is_preview) {
          this.hair_initialized = false; // so it will move when you drag the entity
        }
      }
      ref = this.hairs;
      for (hair_index = j = 0, len = ref.length; j < len; hair_index = ++j) {
        hair_points = ref[hair_index];
        ctx.beginPath();
        // ctx.moveTo(hair_points[0].x, hair_points[0].y)
        local_point = this.fromWorld(hair_points[0]);
        ctx.moveTo(local_point.x, local_point.y);
        ref1 = hair_points.slice(1);
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          point = ref1[l];
          // ctx.lineTo(point.x, point.y)
          local_point = this.fromWorld(point);
          ctx.lineTo(local_point.x, local_point.y);
        }
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = hair_color;
        // ctx.strokeStyle = "hsla(#{hair_index / @hairs.length * 360}, 100%, 50%, 0.5)"
        ctx.stroke();
      }
      
      // (most) limbs
      // some limbs are drawn later, in front of the dress and head
      in_front_segment_names = ["upper right arm", "lower right arm"];
      if (this.aiming_bow) {
        in_front_segment_names.push("upper left arm", "lower left arm");
      }
      behind_dress_segment_names = Object.keys(this.structure.segments).filter((segment_name) => {
        return !in_front_segment_names.includes(segment_name);
      });
      draw_limbs = (segment_names) => {
        var len2, m, results, segment, segment_name;
        results = [];
        for (m = 0, len2 = segment_names.length; m < len2; m++) {
          segment_name = segment_names[m];
          segment = this.structure.segments[segment_name];
          ctx.beginPath();
          ctx.moveTo(segment.a.x, segment.a.y);
          ctx.lineTo(segment.b.x, segment.b.y);
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.strokeStyle = skin_color;
          // debug:
          // ctx.strokeStyle = if segment_names is in_front_segment_names then "yellow" else skin_color
          results.push(ctx.stroke());
        }
        return results;
      };
      draw_limbs(behind_dress_segment_names);
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
      head_radius_y = 5.5;
      head_radius_x = head_radius_y * 0.9;
      hair_radius = head_radius_y;
      // head and top of hair
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(Math.atan2(head.y - sternum.y, head.x - sternum.x) - TAU / 4);
      // BACK of top of hair
      ctx.beginPath();
      ctx.arc(0, 0, hair_radius, 0, TAU / 2);
      ctx.save();
      ctx.scale(1, 0.5);
      ctx.arc(0, 0, hair_radius, TAU / 2, TAU);
      ctx.restore();
      ctx.fillStyle = hair_color;
      ctx.fill();
      // head ellipse
      ctx.save();
      ctx.scale(head_radius_x / head_radius_y, 1);
      ctx.beginPath();
      ctx.arc(0, 0, head_radius_y, 0, TAU);
      ctx.fillStyle = skin_color;
      ctx.fill();
      // clip to head ellipse
      ctx.clip();
      // reverse the scale so that the eyes are the same size regardless of head proportions
      ctx.scale(head_radius_y / head_radius_x, 1);
      // eyes
      // eye_y = @looking_y
      eye_y = this.looking_y - 1;
      eye_radius = 1;
      eye_spacing = 0.6; // radians
      turn_limit = TAU / 8; // radians, TAU/4 = head facing completely sideways, only one eye visible
      ctx.fillStyle = eye_color;
      ref2 = [-1, 1];
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        eye_signature = ref2[m];
        // 3D projection in one axis
        head_rotation_angle = this.smoothed_facing_x_for_eyes * turn_limit;
        eye_x = Math.sin(eye_spacing * eye_signature - head_rotation_angle) * head_radius_x;
        ctx.beginPath();
        ctx.arc(eye_x, eye_y, eye_radius, 0, TAU);
        ctx.fill();
      }
      // /head ellipse clip
      ctx.restore();
      // top of hair
      ctx.beginPath();
      ctx.arc(0, 0, hair_radius, 0, TAU / 2);
      // ctx.scale(1, -0.3-@looking_y/5)
      ctx.scale(1, 0.01 - this.looking_y / 5); // can't scale by 0 or it breaks
      ctx.arc(0, 0, hair_radius, TAU / 2, TAU);
      ctx.fillStyle = hair_color;
      ctx.fill();
      // /head and top of hair
      ctx.restore();
      // arm(s) in front of dress/head
      draw_limbs(in_front_segment_names);
    }

  };

  addEntityClass(Player);

  Entity.initAnimation(Player);

  // Note: animation is gameplay-significant due to the physical nature of picking up items, so it should not be excluded.
  serialization_exclusions = ["_refs_", "_recursive_refs_", "reaching_for_segment", "reaching_for_entity", "reaching_with_secondary_hand", "ground_angle"];

  return Player;

}).call(this);

// debug draw
// show the ground angle
// ctx.beginPath()
// ctx.moveTo(0, 0)
// ctx.lineTo(100 * Math.cos(@ground_angle), 100 * Math.sin(@ground_angle))
// ctx.strokeStyle = "red"
// ctx.stroke()


/***/ }),

/***/ 113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var PuffTree, TAU, Tree, addEntityClass;

Tree = __webpack_require__(776);

({addEntityClass} = __webpack_require__(505));

TAU = Math.PI * 2;

module.exports = PuffTree = (function() {
  class PuffTree extends Tree {
    constructor() {
      super();
      this.bbox_padding = 60;
      this.random_index = 0;
      this.random_values = [];
      this.branch({
        from: "base",
        to: "1",
        juice: Math.random() * 10 + 5,
        width: 10 + Math.floor(Math.random() * 5),
        length: 9,
        angle: -TAU / 4
      });
    }

    random() {
      var base, name1;
      this.random_index++;
      return (base = this.random_values)[name1 = this.random_index] != null ? base[name1] : base[name1] = Math.random();
    }

    branch({from, to, juice, angle, width, length}) {
      var leaf_point, name;
      name = to;
      angle += (Math.random() * 2 - 1) * 0.7;
      this.structure.addSegment({
        from,
        name,
        length,
        width,
        color: "#89594A"
      });
      this.structure.points[name].x = this.structure.points[from].x + Math.cos(angle) * length;
      this.structure.points[name].y = this.structure.points[from].y + Math.sin(angle) * length;
      juice -= 0.3;
      if (juice > 0) {
        this.branch({
          from: name,
          to: `${to}-a`,
          juice,
          angle,
          width: juice,
          length
        });
        if (Math.random() < 0.1 - juice / 200) {
          this.branch({
            from: name,
            to: `${to}-b`,
            juice,
            angle: angle + (Math.random() - 1 / 2) * TAU / 4,
            width: juice,
            length
          });
        }
      } else {
        leaf_point = this.structure.points[name];
        this.leaf(leaf_point);
      }
    }

    leaf(leaf) {
      leaf.is_leaf = true;
      return leaf;
    }

    draw(ctx) {
      var leaf, point_name, ref, ref1, segment, segment_name;
      this.random_index = 0;
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
      ref1 = this.structure.points;
      for (point_name in ref1) {
        leaf = ref1[point_name];
        if (leaf.is_leaf) {
          this.drawLeaf(ctx, leaf.x, leaf.y);
        }
      }
    }

    drawLeaf(ctx, x, y) {
      var i, j, l, r1, r2;
      ctx.save();
      l = this.random() / 2;
      ctx.fillStyle = `hsl(${~~(150 - l * 50)},${~~50}%,${~~(50 + l * 20)}%)`;
      ctx.beginPath();
      ctx.arc(x, y, 10 + this.random() * 5, 0, TAU, true);
      ctx.fill();
      for (i = j = 0; j <= 10; i = ++j) {
        l = this.random() / 2;
        ctx.fillStyle = `hsl(${~~(150 - l * 50)},${~~50}%,${~~(50 + l * 20)}%)`;
        ctx.beginPath();
        r1 = TAU * this.random();
        r2 = this.random() * 15;
        ctx.arc(x + Math.sin(r1) * r2, y + Math.cos(r1) * r2, 5 + this.random() * 5, 0, TAU, true);
        ctx.fill();
      }
      ctx.restore();
    }

  };

  addEntityClass(PuffTree);

  return PuffTree;

}).call(this);


/***/ }),

/***/ 101:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Rabbit, SimpleActor, TAU, addEntityClass, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(505));

TAU = Math.PI * 2;

r = function() {
  return Math.random() * 2 - 1;
};

module.exports = Rabbit = (function() {
  class Rabbit extends SimpleActor {
    constructor() {
      super();
      this.structure.addPoint("head");
      this.structure.addSegment({
        from: "head",
        name: "body",
        length: 5
      });
      this.bbox_padding = 20;
      this.width = 8;
      this.height = 8;
      this.xp = 0;
      this.t = 0;
      this.lr = 0;
      this.dir = 0;
      this.body_color = "#FFF";
      this.body_shadow_color = "#DDD";
      this.eye_color = "#000";
      this.alive = true;
      this.smoothed_facing_x = this.facing_x = 1;
    }

    step(world) {
      if (!this.alive) {
        return;
      }
      if (this.grounded) {
        // @vx*=0.99
        if (Math.random() < 0.1) {
          this.dir = r();
        }
        if (Math.random() < 0.1) {
          this.vy = -5;
        } else if (Math.abs(this.vx) > 1) {
          this.vy = -3;
        }
      } else {
        if (Math.abs(this.xp - this.x) < 1) {
          this.t++;
          if (this.t > 15) {
            this.dir = r();
          }
        } else {
          this.t = 0;
        }
      }
      this.vx += (this.dir *= 1.1) / 15;
      this.dir = Math.max(-10, Math.min(10, this.dir));
      if (Math.abs(this.vx) < 0.1) {
        this.dir = 0;
      }
      this.xp = this.x;
      this.move_x = this.dir * 0.02;
      this.move_y = -1;
      // run SimpleActor physics, which uses @move_x and @jump
      super.step(world);
      this.smoothed_facing_x += (this.facing_x - this.smoothed_facing_x) / 5;
      this.stepLayout();
    }

    initLayout() {
      this.stepLayout();
    }

    stepLayout() {
      // Align skeleton to the body
      this.structure.points.head.x = this.width / 2 + this.facing_x * this.width / 2;
      this.structure.points.head.y = this.height * 0.5;
      this.structure.points.body.x = this.width / 2 - this.facing_x * this.width / 2;
      this.structure.points.body.y = this.height;
    }

    draw(ctx) {
      var angle, back_of_head, draw_head_arc, ear_rotation_radius, ear_signature, ear_spacing, ear_x, eye_radius, eye_signature, eye_spacing, eye_x, eye_y, head_radius, head_rotation_angle, i, j, len, len1, ref, ref1, turn_limit;
      ctx.save(); // body transform
      // ctx.translate(@width/2,@height)
      ctx.translate(0, this.height);
      
      // for cute hopping, rotate based on the angle of movement
      if (this.vx !== 0) {
        angle = Math.atan2(this.vy, Math.abs(this.vx));
        // Reduce the angle if it's too big, in a soft way
        if (Math.abs(angle) > 1) {
          angle = Math.pow(Math.abs(angle), 0.5) * Math.sign(angle);
        }
        ctx.rotate(angle / 2);
      }
      ctx.beginPath();
      ctx.fillStyle = this.body_color;
      ctx.arc(-this.smoothed_facing_x * this.width / 2, 0, this.height / 5, 0, TAU, false); // tail
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = this.body_shadow_color;
      ctx.arc(0, 0, this.height / 2, TAU * 0.45, TAU * 1.05, false); // body
      ctx.fill();
      ctx.fillStyle = this.body_color;
      ctx.save(); // head transform
      ctx.translate(this.smoothed_facing_x * this.width / 3, -this.height / 3);
      ctx.beginPath();
      head_radius = this.height / 3;
      draw_head_arc = function() {
        return ctx.arc(0, 0, head_radius, TAU * 0.45, TAU * 1.05, false);
      };
      draw_head_arc();
      ctx.fill(); // head
      // ctx.rotate(Math.sin(performance.now()/1000))
      turn_limit = TAU / 5; // radians, TAU/4 = head facing completely sideways, only one eye visible
      ear_spacing = TAU / 12; // radians
      ear_rotation_radius = head_radius * 0.8;
      ref = [-1, 1];
      for (i = 0, len = ref.length; i < len; i++) {
        ear_signature = ref[i];
        ctx.save(); // ear transform
        ctx.beginPath();
        head_rotation_angle = this.smoothed_facing_x * turn_limit * -1;
        ear_x = Math.sin(ear_spacing * ear_signature - head_rotation_angle) * ear_rotation_radius * -1;
        ctx.translate(ear_x, -this.height / 6);
        ctx.rotate(-Math.min(TAU / 6, Math.max(-TAU / 6, this.vx / 3 + ear_signature * TAU / 20)));
        ctx.scale(1, 3);
        ctx.arc(0, -this.height / 9, 1, 0, TAU, false); // ear
        ctx.fill();
        ctx.restore(); // end ear transform
      }
      ctx.save(); // head clip
      ctx.beginPath();
      draw_head_arc();
      ctx.clip();
      ctx.beginPath();
      eye_radius = 1;
      eye_y = -1;
      eye_spacing = 1; // radians
      ctx.fillStyle = this.eye_color;
      ref1 = [-1, 1];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        eye_signature = ref1[j];
        // 3D projection in one axis
        head_rotation_angle = this.smoothed_facing_x * turn_limit * -1;
        eye_x = Math.sin(eye_spacing * eye_signature - head_rotation_angle) * head_radius;
        back_of_head = Math.cos(eye_spacing * eye_signature - head_rotation_angle) < 0;
        // continue if back_of_head # don't draw eyes on the back of the head
        if (back_of_head) {
          // non-physical kludge to make the eyes transition away when going behind the head
          eye_x += Math.cos(eye_spacing * eye_signature - head_rotation_angle) * head_radius * eye_signature * -1;
        }
        ctx.beginPath();
        ctx.arc(eye_x, eye_y, eye_radius, 0, TAU);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.restore(); // end head clip
      ctx.fill();
      ctx.fillStyle = this.body_color;
      ctx.beginPath();
      ctx.restore(); // end head transform
      ctx.restore(); // end body transform
    }

  };

  addEntityClass(Rabbit);

  return Rabbit;

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
      leaf.is_leaf = true;
      return leaf;
    }

    draw(ctx) {
      var leaf, point_name, ref, ref1, segment, segment_name;
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
      ref1 = this.structure.points;
      for (point_name in ref1) {
        leaf = ref1[point_name];
        if (!leaf.is_leaf) {
          continue;
        }
        // ctx.beginPath()
        // ctx.arc(leaf.x, leaf.y, leaf.radius, 0, TAU)
        ctx.save();
        ctx.beginPath();
        ctx.translate(leaf.x, leaf.y);
        ctx.scale(leaf.scale_x, leaf.scale_y);
        ctx.arc(0, 0, leaf.radius, 0, TAU);
        ctx.fillStyle = leaf.color;
        ctx.fill();
        ctx.restore();
      }
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

/***/ 968:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var GrassyTerrain, Terrain, lineSegmentsIntersect;

Terrain = __webpack_require__(891);

({lineSegmentsIntersect} = (__webpack_require__(505).helpers));

module.exports = GrassyTerrain = class GrassyTerrain extends Terrain {
  constructor() {
    super();
    this.bbox_padding = 30;
    this.grass_tiles = new Map();
    this.structure.onchange = () => {
      return this.grass_tiles.forEach((tile) => {
        var blade, i, len, ref, results, shade;
        ref = ["dark", "light"];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          shade = ref[i];
          results.push((function() {
            var l, len1, ref1, results1;
            ref1 = tile[`${shade}_blades`];
            results1 = [];
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              blade = ref1[l];
              results1.push(delete blade.visible);
            }
            return results1;
          })());
        }
        return results;
      });
    };
    this.color = "#C29853";
    this.color_dark = "#A17A3F";
    this.color_light = "#D2B06A";
  }

  toJSON() {
    var def, k, ref, v;
    def = {};
    ref = super.toJSON();
    for (k in ref) {
      v = ref[k];
      if (k !== "grass_tiles") {
        def[k] = v;
      }
    }
    return def;
  }

  draw(ctx, view) {
    var bbox, blade, bottom, contains_any_points, dark_blades, first_tile_xi, first_tile_yi, i, j, l, last_tile_xi, last_tile_yi, left, len, len1, len2, len3, light_blades, m, n, o, p, point, point_name, q, r, random, rect_contains_any_points, rect_is_empty, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, right, shade, tile, tile_name, tile_size, tile_x, tile_xi, tile_y, tile_yi, top, view_point, x, y;
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
    ctx.fillStyle = this.color;
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
      for (tile_yi = l = ref3 = first_tile_yi, ref4 = last_tile_yi; (ref3 <= ref4 ? l <= ref4 : l >= ref4); tile_yi = ref3 <= ref4 ? ++l : --l) {
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
            for (var m = 0; m <= 350; m++) {
              x = tile_x + random() * tile_size;
              y = tile_y + random() * tile_size;
              for (j = n = 0, ref5 = random() * 3 + 1; (0 <= ref5 ? n <= ref5 : n >= ref5); j = 0 <= ref5 ? ++n : --n) {
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
          for (o = 0, len = ref6.length; o < len; o++) {
            shade = ref6[o];
            ref7 = tile[`${shade}_blades`];
            for (p = 0, len1 = ref7.length; p < len1; p++) {
              blade = ref7[p];
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
    for (q = 0, len2 = dark_blades.length; q < len2; q++) {
      ({x, y} = dark_blades[q]);
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.simplex.noise2D(-x + y + 78 + Date.now() / 2000, y + 549) * 5, y - (2 + this.simplex.noise2D(y * 40.45, x + 340)) * 10);
    }
    ctx.strokeStyle = this.color_dark;
    ctx.stroke();
    ctx.beginPath();
    for (r = 0, len3 = light_blades.length; r < len3; r++) {
      ({x, y} = light_blades[r]);
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.simplex.noise2D(-x + y + 78 + Date.now() / 2000, y + 549) * 5, y - (2 + this.simplex.noise2D(y * 40.45, x + 340)) * 10);
    }
    ctx.strokeStyle = this.color_light;
    ctx.stroke();
  }

};


/***/ }),

/***/ 339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
// SimpleActors have rectangular collision boxes and basic physics.
var Entity, SimpleActor, Terrain, lineSegmentsIntersect;

({Terrain} = __webpack_require__(505));

({lineSegmentsIntersect} = (__webpack_require__(505).helpers));

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
      this.move_y = 0;
      this.jump = false;
      this.grounded = false;
      this.facing_x = 0;
    }

    find_ground_angle(world) {
      var a, angle, b, e_a, e_b, entity, i, len, ref, ref1, segment, segment_name;
      a = {
        x: this.x,
        y: this.y
      };
      b = {
        x: this.x,
        y: this.y + 2 + this.height // slightly further down than collision code uses
      };
      ref = world.entities;
      for (i = 0, len = ref.length; i < len; i++) {
        entity = ref[i];
        if (entity instanceof Terrain) {
          if (entity.structure.pointInPolygon(entity.fromWorld(b))) {
            // console.log "found ground"
            // find line segment intersecting ab
            e_a = entity.fromWorld(a);
            e_b = entity.fromWorld(b);
            ref1 = entity.structure.segments;
            for (segment_name in ref1) {
              segment = ref1[segment_name];
              if (lineSegmentsIntersect(e_a.x, e_a.y, e_b.x, e_b.y, segment.a.x, segment.a.y, segment.b.x, segment.b.y)) {
                // find the angle
                angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x);
                // console.log "angle", angle
                if (Math.cos(angle) < 0) {
                  angle -= Math.PI;
                  angle = (angle + Math.PI * 2) % (Math.PI * 2);
                }
                return angle;
              }
            }
          }
        }
      }
    }

    // console.log "no ground found"
    step(world) {
      var go, more_submerged, move_x, move_y, resolution;
      if (this.y > 400) {
        return;
      }
      
      // TODO: Boolean, not for @submerged though; that I could rename @water or something
      this.grounded = world.collision({
        x: this.x,
        y: this.y + 1 + this.height //or world.collision({@x, y: @y + @vy + @height}) or world.collision({@x, y: @y + 4 + @height})
      });
      this.submerged = world.collision({
        x: this.x,
        y: this.y + this.height * 0.9
      }, {
        types: (entity) => {
          return entity.constructor.name === "Water";
        }
      });
      more_submerged = this.submerged && world.collision({
        x: this.x,
        y: this.y + this.height * 0.4
      }, {
        types: (entity) => {
          return entity.constructor.name === "Water";
        }
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
        if (this.jump) {
          this.vy = -Math.sqrt(2 * gravity * this.jump_height);
        }
      } else {
        this.vx += this.move_x * 0.7;
      }
      this.vx = Math.min(this.run_speed, Math.max(-this.run_speed, this.vx));
      this.vy += gravity;
      if (this.submerged) {
        if (more_submerged || this.move_y > 0) {
          this.vy += this.move_y * 0.7;
        }
        this.vy *= 0.8;
        this.vx *= 0.8;
        if (!more_submerged) {
          this.submerged.makeWaves({
            x: this.x,
            y: this.y + this.height * 0.9
          }, this.width / 2, this.vy);
        }
      }
      // @vy *= 0.99
      move_x = this.vx;
      move_y = this.vy;
      // checking @vy and not just not @jump because Rabbit currently uses @vy to jump
      if (this.grounded && this.vy >= 0) {
        // follow hills downward
        // This prevents awkward situations where you can't jump
        // because you just left the ground (by running forwards)
        move_y += Math.abs(this.vx);
      }
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
          // This only handles going at a 45 degree angle,
          // but stops on tiny 2-unit-high obstacles if it's > 45 degrees
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
      if (Math.abs(move_y) > resolution) {
        this.grounded = false;
      }
      while (Math.abs(move_y) > resolution) {
        go = Math.sign(move_y) * resolution;
        if (world.collision({
          x: this.x,
          y: this.y + go + this.height
        })) {
          if (this.constructor.name === "Player") {
            // 1 is the granularity of the stepping code here.
            // If gravity is 0.5, vy may accumulate to 1 before moving,
            // so we can't use gravity as the threshold.
            if (this.vy > 1) {
              this.landing_momentum = Math.max(this.landing_momentum, this.vy);
            }
          }
          // console.log "landing_momentum", @landing_momentum, "vy", @vy
          this.vy = 0;
          this.grounded = true;
          break;
        }
        move_y -= go;
        this.y += go;
      }
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
    this.structure.addPoint("base");
    this.bbox_padding = 60;
  }

  initLayout() {}

  branch({from, to, juice, angle}) {
    var leaf_point, length, name, width;
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
        this.branch({
          from: name,
          to: `${to}-c`,
          juice,
          angle
        });
      }
    } else {
      leaf_point = this.structure.points[name];
      this.leaf(leaf_point);
    }
  }

  leaf(leaf) {
    leaf.radius = Math.random() * 15 + 15;
    leaf.scale_x = 2;
    leaf.scale_y = 1;
    leaf.color = "#627318"; //"#363D1B"
    leaf.is_leaf = true;
    return leaf;
  }

  draw(ctx) {
    var leaf, point_name, ref, ref1, segment, segment_name;
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
    ref1 = this.structure.points;
    for (point_name in ref1) {
      leaf = ref1[point_name];
      if (!leaf.is_leaf) {
        continue;
      }
      ctx.beginPath();
      ctx.arc(leaf.x, leaf.y, leaf.radius, 0, TAU);
    }
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

/***/ 233:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ArcheryTarget, Entity, TAU, addEntityClass;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

TAU = Math.PI * 2;

module.exports = ArcheryTarget = (function() {
  class ArcheryTarget extends Entity {
    constructor() {
      super();
      this.structure.addPoint("a");
      this.structure.addSegment({
        from: "a",
        to: "b",
        name: "target",
        length: 100
      });
      this.bbox_padding = 20;
    }

    initLayout() {
      this.structure.points.b.y += 100;
    }

    draw(ctx) {
      var a, angle, b, center, color, colors, diameter, i, j, len, radius;
      ({a, b} = this.structure.points);
      angle = Math.atan2(b.y - a.y, b.x - a.x);
      diameter = Math.hypot(b.x - a.x, b.y - a.y);
      radius = diameter / 2;
      center = {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
      };
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(Math.atan2(b.y - a.y, b.x - a.x));
      ctx.scale(1, 1 / 3);
      // Draw concentric circles
      colors = ["#fff", "#000", "#0af", "#f00", "#ff0"];
      for (i = j = 0, len = colors.length; j < len; i = ++j) {
        color = colors[i];
        ctx.beginPath();
        ctx.arc(0, 0, (1 - i / colors.length) * radius, 0, TAU);
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.restore();
    }

  };

  addEntityClass(ArcheryTarget);

  return ArcheryTarget;

}).call(this);


/***/ }),

/***/ 943:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Arrow, Entity, TAU, addEntityClass, closestPointOnLineSegment, debug_drawings, distanceToLineSegment, lineSegmentsIntersect,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(505));

({lineSegmentsIntersect, distanceToLineSegment} = (__webpack_require__(505).helpers));

TAU = Math.PI * 2;

closestPointOnLineSegment = function(point, a, b) {
  var a_to_b, a_to_p, atb2, atp_dot_atb, t;
  // https://stackoverflow.com/a/3122532/2624876
  a_to_p = {
    x: point.x - a.x,
    y: point.y - a.y
  };
  a_to_b = {
    x: b.x - a.x,
    y: b.y - a.y
  };
  atb2 = a_to_b.x ** 2 + a_to_b.y ** 2;
  atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
  t = atp_dot_atb / atb2;
  return {
    x: a.x + a_to_b.x * t,
    y: a.y + a_to_b.y * t
  };
};

debug_drawings = new Map(); // Arrow to function(ctx)

window.debug_drawings = debug_drawings;

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
        point.prev_x = point.x;
        point.prev_y = point.y;
        point.ax = 0;
        point.ay = 0;
      }
      this.bbox_padding = 20;
      // When the arrow hits something, a constraint will be added between
      // a point on the object, and a point on the arrow which may slide somewhat along the shaft.
      this.lodging_constraints = [];
    }

    initLayout() {
      this.structure.points.tip.x += this.length;
      return this.structure.points.tip.prev_x = this.structure.points.tip.x;
    }

    setVelocity(vx, vy) {
      this.structure.points.tip.prev_x = this.structure.points.tip.x - vx / Arrow.steps_per_frame;
      this.structure.points.tip.prev_y = this.structure.points.tip.y - vy / Arrow.steps_per_frame;
      this.structure.points.nock.prev_x = this.structure.points.nock.x - vx / Arrow.steps_per_frame;
      return this.structure.points.nock.prev_y = this.structure.points.nock.y - vy / Arrow.steps_per_frame;
    }

    getAverageVelocity() {
      var nock, tip, vx, vy;
      ({tip, nock} = this.structure.points);
      vx = (tip.x - tip.prev_x + nock.x - nock.prev_x) / 2 * Arrow.steps_per_frame;
      vy = (tip.y - tip.prev_y + nock.y - nock.prev_y) / 2 * Arrow.steps_per_frame;
      return [vx, vy];
    }

    step(world) {
      var i, j, len, nock, point, ref, ref1, results, tip, too_far_under_water, vx, vy, water;
      for (i = 0, ref = Arrow.steps_per_frame; (0 <= ref ? i <= ref : i >= ref); 0 <= ref ? i++ : i--) {
        this.substep(world, 1 / Arrow.steps_per_frame);
      }
      
        // Interact with water
      ({tip, nock} = this.structure.points);
      ref1 = [tip, nock];
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        point = ref1[j];
        water = world.collision(this.toWorld(point), {
          types: (entity) => {
            return entity.constructor.name === "Water";
          }
        });
        too_far_under_water = water && world.collision(this.toWorld({
          x: point.x,
          y: point.y - 5
        }), {
          types: (entity) => {
            return entity.constructor.name === "Water";
          }
        });
        if (water && !too_far_under_water) {
          vy = (point.y - point.prev_y) * Arrow.steps_per_frame;
          vx = (point.x - point.prev_x) * Arrow.steps_per_frame;
          // Make ripples in water
          water.makeWaves(this.toWorld(point), 2, vy);
          // Skip off water
          if ((4 > vy && vy > 2) && Math.abs(vx) > 0.4) {
            vy *= -0.3;
            point.prev_y = point.y - vy / Arrow.steps_per_frame;
          }
        }
        // Slow down in water
        if (water) {
          point.prev_x += (point.x - point.prev_x) * 0.1;
          results.push(point.prev_y += (point.y - point.prev_y) * 0.1);
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    substep(world, delta_time) {
      var angle, angle_diff, arrow_angle, arrow_segment_position_ratio, arrow_shaft_pos, arrow_shaft_pos_local, closest_point_in_world, closest_point_local, closest_segment, coefficient_of_friction, coefficient_of_restitution, constraint, delta_length, delta_x, delta_y, diff, drag_force_x, drag_force_y, facing_angle_of_incidence, heading_angle, heading_angle_of_incidence, held, hit, hit_entity, hit_entity_id, hit_segment, hit_segment_angle, hit_segment_name, hit_segment_pos, hit_segment_position_ratio, i, ignore_angle_of_incidence, incident_speed, incident_speed_global_scale, j, k, l, len, len1, len2, len3, len4, m, new_vx, new_vy, nock, nock_relative, nock_vx, nock_vy, normal, original_pos, other_point, p1, p2, p3, p4, point, pos_diff, projected, ref, ref1, ref2, ref3, ref4, ref5, ref6, relative_angle, rot_matrix, rot_matrix1, rot_matrix2, rotated_vx, rotated_vy, segment, segment_name, speed, surface_angle, tip, tip_relative, vx, vy;
      ({tip, nock} = this.structure.points);
      ref = [tip, nock];
      
      // Accumulate forces as acceleration.
      // (First, reset acceleration to zero.)
      for (i = 0, len = ref.length; i < len; i++) {
        point = ref[i];
        point.ax = 0;
        point.ay = 0;
      }
      // Gravity
      tip.ay += 0.1;
      nock.ay += 0.1;
      // If dropped completely sideways, it should end up lying on the ground
      // but the fletching should introduce some drag in that direction,
      // leading to a slight rotation.
      // However the fletching shouldn't introduce much drag in the direction of travel.

      // Introduce drag on fletched side, perpendicular to the arrow shaft.
      // First, find the angle of the arrow shaft, and the current velocity.
      angle = Math.atan2(tip.y - nock.y, tip.x - nock.x);
      [nock_vx, nock_vy] = [nock.x - nock.prev_x, nock.y - nock.prev_y];
      // Then, calculate the rotation matrix to rotate the velocity to the horizontal coordinate system.
      rot_matrix1 = [[Math.cos(angle), Math.sin(angle)], [-Math.sin(angle), Math.cos(angle)]];
      // Apply the rotation to the velocity.
      [nock_vx, nock_vy] = [nock_vx, nock_vy].map((val, idx) => {
        return rot_matrix1[idx][0] * nock_vx + rot_matrix1[idx][1] * nock_vy;
      });
      // Then, calculate drag force based on the nock's velocity.
      // drag_force_x = -nock_vx * Math.abs(nock_vx) * 0.04 # tangent to arrow shaft
      // drag_force_y = -nock_vy * Math.abs(nock_vy) * 0.3 # perpendicular to arrow shaft
      drag_force_x = 0; // tangent to arrow shaft
      drag_force_y = -nock_vy * Arrow.steps_per_frame * 0.002; // perpendicular to arrow shaft
      // Then, calculate the rotation matrix to rotate the force back to the original coordinate system.
      rot_matrix2 = [[Math.cos(-angle), Math.sin(-angle)], [-Math.sin(-angle), Math.cos(-angle)]];
      // Apply the rotation to the force.
      [drag_force_x, drag_force_y] = [drag_force_x, drag_force_y].map((val, idx) => {
        return rot_matrix2[idx][0] * drag_force_x + rot_matrix2[idx][1] * drag_force_y;
      });
      // Apply the force.
      if (isFinite(drag_force_x) && isFinite(drag_force_y)) {
        nock.ax += drag_force_x;
        nock.ay += drag_force_y;
      } else {
        console.warn("NaN in drag force calculation");
      }
      ref1 = [tip, nock];
      // Perform Verlet integration.
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        point = ref1[j];
        original_pos = {
          x: point.x,
          y: point.y
        };
        // Ideally I would like to allow the arrow to move while lodged,
        // and adjust the depth and angle of lodging (with some stiffness),
        // and maybe allow it to become dislodged, but it was causing numerical instability.
        if (!this.lodging_constraints.length) {
          point.x += point.x - point.prev_x + point.ax * delta_time ** 2;
          point.y += point.y - point.prev_y + point.ay * delta_time ** 2;
        }
        point.prev_x = original_pos.x;
        point.prev_y = original_pos.y;
      }
      // Apply constraints.

      // check if player is holding the arrow
      held = world.entities.some((entity) => {
        var ref2;
        return (ref2 = entity.holding_arrows) != null ? ref2.includes(this) : void 0;
      });
      // Note: can't require Player here (to use instanceof check) because of circular dependency
      hit = world.collision(this.toWorld(tip), {
        types: (entity) => {
          var ref2;
          return (ref2 = entity.constructor.name) !== "Arrow" && ref2 !== "Player" && ref2 !== "Bow" && ref2 !== "Water";
        }
      });
      if (hit && !this.lodging_constraints.length && !held) {
        // collision() doesn't give us the line segment that we hit.
        // We want to know the segment point in order to add a lodging constraint at the intersection point.
        tip_relative = hit.fromWorld(this.toWorld(tip));
        nock_relative = hit.fromWorld(this.toWorld(nock));
        hit_segment = void 0;
        surface_angle = void 0;
        relative_angle = void 0;
        incident_speed = void 0; // speed along the surface normal (i.e. towards the surface), ignoring motion along the surface
        heading_angle_of_incidence = void 0;
        facing_angle_of_incidence = void 0;
        hit_segment_position_ratio = 0;
        arrow_segment_position_ratio = 0; // AKA depth ratio
        ref2 = hit.structure.segments;
        for (segment_name in ref2) {
          segment = ref2[segment_name];
          if (lineSegmentsIntersect(tip_relative.x, tip_relative.y, nock_relative.x, nock_relative.y, segment.a.x, segment.a.y, segment.b.x, segment.b.y)) {
            surface_angle = Math.atan2(segment.b.y - segment.a.y, segment.b.x - segment.a.x);
            arrow_angle = Math.atan2(tip_relative.y - nock_relative.y, tip_relative.x - nock_relative.x);
            relative_angle = arrow_angle - surface_angle;
            normal = surface_angle + TAU / 4;
            vx = tip.x - tip.prev_x;
            vy = tip.y - tip.prev_y;
            heading_angle = Math.atan2(vy, vx);
            incident_speed = Math.abs(Math.cos(normal) * vx + Math.sin(normal) * vy);
            // incident_speed = Math.abs(Math.sin(-surface_angle) * vx + Math.cos(-surface_angle) * vy) # alternative
            heading_angle_of_incidence = Math.abs(Math.abs(modulo(heading_angle - surface_angle, Math.PI)) - TAU / 4);
            facing_angle_of_incidence = Math.abs(Math.abs(modulo(arrow_angle - surface_angle, Math.PI)) - TAU / 4);
            // window.debug_max_facing_angle_of_incidence = Math.max(window.debug_max_facing_angle_of_incidence ? 0, facing_angle_of_incidence) # should be TAU/4 on arrow test scene
            // window.debug_max_heading_angle_of_incidence = Math.max(window.debug_max_heading_angle_of_incidence ? 0, heading_angle_of_incidence) # should be TAU/4 on arrow test scene

            // This could be more nuanced, but I'm trying to make it easier to hit animals.
            // It's not satisfying when an arrow flies past your mark, and this is a 2D game so it's confusing
            // when it looks like you missed in the z-axis.
            ignore_angle_of_incidence = (ref3 = hit.constructor.name) === "Rabbit" || ref3 === "Deer" || ref3 === "GranddaddyLonglegs";
            if (ignore_angle_of_incidence) {
              incident_speed = Math.hypot(vx, vy);
              heading_angle_of_incidence = 0;
              facing_angle_of_incidence = 0;
            }
            // Arrows coming in at a grazing angle should bounce off.
            // Arrows coming straight towards the surface but not facing forward should bounce off.
            // Arrows going slow should bounce off.
            // A combination of speed, angle of incidence, and arrow angle is needed.

            // Arrows going fast enough towards the surface (i.e. in the axis perpendicular to the surface) should lodge.
            // The time subdivision shouldn't affect the speed threshold.
            incident_speed_global_scale = incident_speed * Arrow.steps_per_frame;
            if (incident_speed_global_scale < 2) {
              // console.log "not lodging, incident_speed_global_scale too low", incident_speed_global_scale
              continue;
            }
            if (facing_angle_of_incidence > Math.PI / 4) { // 45 degrees
              // console.log "not lodging, arrow is not facing head-on enough"
              continue;
            }
            if (hit.constructor.name === "Rock") {
              // console.log "not lodging, hit rock"
              continue;
            }
            hit_segment = segment;
            // find position ratios of the intersection point on each segment
            p1 = segment.a;
            p2 = segment.b;
            p3 = tip_relative;
            p4 = nock_relative;
            // at segment.a = 0, at segment.b = 1
            hit_segment_position_ratio = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x));
            // at tip = 0, at nock = 1
            arrow_segment_position_ratio = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x));
            // console.log "found intersection", hit_segment_position_ratio, arrow_segment_position_ratio
            break;
          }
        }
        // I'm only allowing one lodging constraint per arrow for now.
        // Ideally I would like to allow the arrow to pin an enemy to the ground,
        // using multiple constraints, but this will probably require the whole game to be
        // simulated together with something like Verlet integration, so that the
        // enemy's limb can be constrained in a stable way.
        // But maybe with specific targets it can be enabled to work.
        // Also, TODO: bounce off if the angle is not perpendicular enough
        // (i.e. angle of incidence is too high)
        if (hit_segment && this.lodging_constraints.length === 0) {
          constraint = {
            hit_entity_id: hit.id,
            hit_segment_name: Object.keys(hit.structure.segments)[Object.values(hit.structure.segments).indexOf(hit_segment)],
            relative_angle,
            hit_segment_position_ratio,
            arrow_segment_position_ratio,
            incident_speed,
            heading_angle_of_incidence,
            facing_angle_of_incidence
          };
          this.lodging_constraints.push(constraint);
          // Damage the target.
          if ("alive" in hit) {
            hit.alive = false;
          }
        }
      }
      
      // Ideally I would like to allow the arrow to move while lodged,
      // and adjust the depth and angle of lodging (with some stiffness),
      // and maybe allow it to become dislodged, but it was causing numerical instability.
      if (!this.lodging_constraints.length && !held) {
        ref4 = [tip, nock];
        // Collide with the ground.
        for (k = 0, len2 = ref4.length; k < len2; k++) {
          point = ref4[k];
          hit = world.collision(this.toWorld(point));
          if (hit) {
            coefficient_of_restitution = hit.constructor.name === "Rock" ? 0.5 : 0.1;
            coefficient_of_friction = 0.1;
            vx = point.x - point.prev_x;
            vy = point.y - point.prev_y;
            speed = Math.hypot(vx, vy);
            // if not debug_drawings.has(@)
            // 	debug_drawings.set(@, [])
            // debug_drawings.get(@).push({
            // 	type: "line"
            // 	a: {x: point.x, y: point.y}
            // 	b: {x: point.x + vx, y: point.y + vy}
            // 	color: "yellow"
            // })
            // # debug_drawings.get(@).push({
            // # 	type: "circle"
            // # 	center: {x: point.x, y: point.y}
            // # 	radius: 5
            // # 	color: "yellow"
            // # })

            // Project the point back to the surface of the polygon.
            projected = world.projectPointOutside(this.toWorld(point), {
              outsideEntity: hit
            });
            if (projected) {
              ({closest_point_in_world, closest_segment} = projected);
              closest_point_local = this.fromWorld(closest_point_in_world);
              point.x = closest_point_local.x;
              point.y = closest_point_local.y;
            }
            // debug_drawings.get(@).push({
            // 	type: "circle"
            // 	center: {x: point.x, y: point.y}
            // 	radius: 5
            // 	color: "lime"
            // })

            // bounce off the surface, reflecting the angle
            if (speed > 0 && closest_segment) {
              vx = point.x - point.prev_x;
              vy = point.y - point.prev_y;
              // console.log("hit.constructor.name", hit.constructor.name, "coefficient_of_restitution", coefficient_of_restitution)
              // heading_angle = Math.atan2(vy, vx)
              surface_angle = Math.atan2(closest_segment.b.y - closest_segment.a.y, closest_segment.b.x - closest_segment.a.x);
              // a = surface_angle * 2 - heading_angle
              // a = if a >= TAU then a - TAU else if a < 0 then a + TAU else a
              // new_vx = Math.cos(a) * speed * coefficient_of_restitution
              // new_vy = Math.sin(a) * speed * coefficient_of_restitution

              // Rotate the velocity vector to the surface normal.
              rot_matrix1 = [[Math.cos(surface_angle), -Math.sin(surface_angle)], [Math.sin(surface_angle), Math.cos(surface_angle)]];
              [rotated_vx, rotated_vy] = [vx, vy].map((val, idx) => {
                return rot_matrix1[idx][0] * vx + rot_matrix1[idx][1] * vy;
              });
              // Reflect the velocity vector.
              rotated_vx *= -coefficient_of_restitution;
              rotated_vy *= 1 - coefficient_of_friction;
              // Rotate the velocity vector back to the original direction.
              rot_matrix2 = [[Math.cos(-surface_angle), -Math.sin(-surface_angle)], [Math.sin(-surface_angle), Math.cos(-surface_angle)]];
              [new_vx, new_vy] = [rotated_vx, rotated_vy].map((val, idx) => {
                return rot_matrix2[idx][0] * rotated_vx + rot_matrix2[idx][1] * rotated_vy;
              });
              // console.log("old vx, vy", vx, vy, "new vx, vy", new_vx, new_vy)
              point.prev_x = point.x - new_vx;
              point.prev_y = point.y - new_vy;
              // At this point, the other particle's velocity has not been updated,
              // and it will often cancel out the bounce even for a perfectly elastic collision.
              // That's not good enough.
              // Transfer energy along the arrow shaft,
              // by constraining the distance between the two points.
              // What this does is cancel the velocity of the other point,
              // implicit in it having moved forwards in time,
              // but only in the direction that it needs to.
              // In contrast to the normal distance constraint, I'm not
              // going to symmetrically move both points, but rather keep the
              // collided point stationary so it doesn't get pushed back into the surface,
              // and move the other point fully rather than halfway.
              other_point = point === tip ? nock : tip;
              delta_x = point.x - other_point.x;
              delta_y = point.y - other_point.y;
              delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
              diff = (delta_length - this.length) / delta_length;
              if (isFinite(diff)) {
                other_point.x += delta_x * diff;
                other_point.y += delta_y * diff;
              } else {
                console.warn("diff is not finite, for momentary distance constraint");
              }
            }
          }
        }
      }
      ref5 = this.lodging_constraints;
      // Constrain when lodged in an object.
      for (l = 0, len3 = ref5.length; l < len3; l++) {
        ({hit_entity_id, hit_segment_name, relative_angle, arrow_segment_position_ratio, hit_segment_position_ratio} = ref5[l]);
        hit_entity = world.getEntityByID(hit_entity_id);
        if (!hit_entity) { // no longer exists
          this.lodging_constraints = [];
          break;
        }
        hit_segment = hit_entity.structure.segments[hit_segment_name];
        hit_segment_pos = hit_entity.toWorld({
          x: hit_segment.a.x + (hit_segment.b.x - hit_segment.a.x) * hit_segment_position_ratio,
          y: hit_segment.a.y + (hit_segment.b.y - hit_segment.a.y) * hit_segment_position_ratio
        });
        arrow_shaft_pos = this.toWorld({
          x: tip.x + (nock.x - tip.x) * arrow_segment_position_ratio,
          y: tip.y + (nock.y - tip.y) * arrow_segment_position_ratio
        });
        pos_diff = {
          x: hit_segment_pos.x - arrow_shaft_pos.x,
          y: hit_segment_pos.y - arrow_shaft_pos.y
        };
        if (isNaN(pos_diff.x) || isNaN(pos_diff.y)) {
          console.warn("pos_diff has NaN");
          continue;
        }
        // TODO: for non-static objects,
        // move the object equally in the opposite direction (each only halfway)
        // And integrate all physics in the same loop, for Verlet integration.
        tip.x += pos_diff.x;
        tip.y += pos_diff.y;
        nock.x += pos_diff.x;
        nock.y += pos_diff.y;
        arrow_angle = Math.atan2(tip.y - nock.y, tip.x - nock.x);
        hit_segment_angle = Math.atan2(hit_segment.b.y - hit_segment.a.y, hit_segment.b.x - hit_segment.a.x);
        angle_diff = (arrow_angle - hit_segment_angle) - relative_angle;
        // Rotate the arrow.
        arrow_shaft_pos_local = this.fromWorld(arrow_shaft_pos); // redundant calculation
        // Rotate the arrow around the arrow shaft attachment point.
        rot_matrix = [[Math.cos(angle_diff), Math.sin(angle_diff)], [-Math.sin(angle_diff), Math.cos(angle_diff)]];
        ref6 = [tip, nock];
        for (m = 0, len4 = ref6.length; m < len4; m++) {
          point = ref6[m];
          // Translate and rotate the arrow.
          [point.x, point.y] = [point.x, point.y].map((val, idx) => {
            return rot_matrix[idx][0] * (point.x - arrow_shaft_pos_local.x) + rot_matrix[idx][1] * (point.y - arrow_shaft_pos_local.y);
          });
          // Translate the arrow back to its original position.
          point.x += arrow_shaft_pos_local.x;
          point.y += arrow_shaft_pos_local.y;
        }
      }
      // Constrain arrow length, moving both points symmetrically.
      // I learned this from:
      // http://web.archive.org/web/20080410171619/http://www.teknikus.dk/tj/gdc2001.htm
      delta_x = tip.x - nock.x;
      delta_y = tip.y - nock.y;
      delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
      diff = (delta_length - this.length) / delta_length;
      if (isFinite(diff)) {
        tip.x -= delta_x * 0.5 * diff;
        tip.y -= delta_y * 0.5 * diff;
        nock.x += delta_x * 0.5 * diff;
        return nock.y += delta_y * 0.5 * diff;
      } else {
        return console.warn("diff is not finite, for distance constraint");
      }
    }

    draw(ctx) {
      var angle, arrow_segment_position_ratio, arrow_shaft_pos, arrow_shaft_pos_local, drawing, facing_angle_of_incidence, heading_angle_of_incidence, hit_entity, hit_entity_id, hit_segment, hit_segment_a_local, hit_segment_b_local, hit_segment_name, hit_segment_pos, hit_segment_pos_local, hit_segment_position_ratio, i, incident_speed, j, len, len1, nock, ref, ref1, ref2, ref3, relative_angle, results, tip;
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
      ctx.restore();
      if (((function() {
        try {
          return localStorage["tiamblia.debug_arrow"];
        } catch (error) {}
      })()) !== "true") {
        return;
      }
      if (debug_drawings.get(this)) {
        ref = debug_drawings.get(this);
        for (i = 0, len = ref.length; i < len; i++) {
          drawing = ref[i];
          if (drawing.type === "line") {
            ctx.beginPath();
            ctx.moveTo(drawing.a.x, drawing.a.y);
            ctx.lineTo(drawing.b.x, drawing.b.y);
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.strokeStyle = (ref1 = drawing.color) != null ? ref1 : "#FF0000";
            ctx.stroke();
          } else if (drawing.type === "circle") {
            ctx.beginPath();
            ctx.arc(drawing.center.x, drawing.center.y, drawing.radius, 0, TAU);
            ctx.lineWidth = 1;
            ctx.strokeStyle = (ref2 = drawing.color) != null ? ref2 : "#FF0000";
            ctx.stroke();
          } else {
            console.error(`Unknown debug drawing type: ${drawing.type}`);
          }
        }
      }
      ref3 = this.lodging_constraints;
      results = [];
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        ({hit_entity_id, hit_segment_name, relative_angle, arrow_segment_position_ratio, hit_segment_position_ratio, incident_speed, facing_angle_of_incidence, heading_angle_of_incidence} = ref3[j]);
        hit_entity = window.the_world.getEntityByID(hit_entity_id);
        if (!hit_entity) { // no longer exists
          continue;
        }
        hit_segment = hit_entity.structure.segments[hit_segment_name];
        if (!hit_entity.toWorld) {
          console.error("Need to fix serialization of references to entities (and segments) with something like resurrect.js!");
          this.lodging_constraints.length = 0;
          break;
        }
        hit_segment_a_local = this.fromWorld(hit_entity.toWorld(hit_segment.a));
        hit_segment_b_local = this.fromWorld(hit_entity.toWorld(hit_segment.b));
        ctx.beginPath();
        ctx.moveTo(hit_segment_a_local.x, hit_segment_a_local.y);
        ctx.lineTo(hit_segment_b_local.x, hit_segment_b_local.y);
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        hit_segment_pos = hit_entity.toWorld({
          x: hit_segment.a.x + (hit_segment.b.x - hit_segment.a.x) * hit_segment_position_ratio,
          y: hit_segment.a.y + (hit_segment.b.y - hit_segment.a.y) * hit_segment_position_ratio
        });
        arrow_shaft_pos = this.toWorld({
          x: tip.x + (nock.x - tip.x) * arrow_segment_position_ratio,
          y: tip.y + (nock.y - tip.y) * arrow_segment_position_ratio
        });
        hit_segment_pos_local = this.fromWorld(hit_segment_pos);
        arrow_shaft_pos_local = this.fromWorld(arrow_shaft_pos); // redundant calc but whatever
        ctx.beginPath();
        ctx.moveTo(hit_segment_pos_local.x, hit_segment_pos_local.y);
        ctx.lineTo(arrow_shaft_pos_local.x, arrow_shaft_pos_local.y);
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#00FF00";
        ctx.stroke();
        // misc debug for colorizing based on a variable like
        // incident_speed, facing_angle_of_incidence, heading_angle_of_incidence, relative_angle
        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(nock.x, nock.y);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = `hsl(50, 100%, ${facing_angle_of_incidence * 20}%)`;
        results.push(ctx.stroke());
      }
      return results;
    }

  };

  addEntityClass(Arrow);

  Arrow.steps_per_frame = 2;

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
      this.layout();
    }

    step(world) {
      this.layout();
    }

    layout() {
      var bottom, bow_angle, grip, serving, top;
      ({top, bottom, grip, serving} = this.structure.points);
      bow_angle = Math.atan2(grip.y - serving.y, grip.x - serving.x) - TAU / 4;
      top.x = grip.x + this.height / 2 * Math.cos(bow_angle) - this.fistmele * Math.sin(-bow_angle);
      top.y = grip.y + this.height / 2 * Math.sin(bow_angle) - this.fistmele * Math.cos(bow_angle);
      bottom.x = grip.x - this.height / 2 * Math.cos(bow_angle) - this.fistmele * Math.sin(-bow_angle);
      bottom.y = grip.y - this.height / 2 * Math.sin(bow_angle) - this.fistmele * Math.cos(bow_angle);
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
      ctx.restore();
    }

  };

  addEntityClass(Bow);

  return Bow;

}).call(this);


/***/ }),

/***/ 50:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var GrassyTerrain, LushGrass, addEntityClass;

GrassyTerrain = __webpack_require__(968);

({addEntityClass} = __webpack_require__(505));

module.exports = LushGrass = (function() {
  class LushGrass extends GrassyTerrain {
    constructor() {
      super();
      this.color = "#4d8e2c";
      this.color_dark = "#46a517";
      this.color_light = "#7fcc37";
    }

  };

  addEntityClass(LushGrass);

  return LushGrass;

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
      ctx.fill();
    }

  };

  addEntityClass(Rock);

  return Rock;

}).call(this);


/***/ }),

/***/ 475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var GrassyTerrain, SavannaGrass, addEntityClass;

GrassyTerrain = __webpack_require__(968);

({addEntityClass} = __webpack_require__(505));

module.exports = SavannaGrass = (function() {
  class SavannaGrass extends GrassyTerrain {
    constructor() {
      super();
      this.color = "#C29853";
      this.color_dark = "#B7863E";
      this.color_light = "#D6AE77";
    }

  };

  addEntityClass(SavannaGrass);

  return SavannaGrass;

}).call(this);


/***/ }),

/***/ 469:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Terrain, Water, addEntityClass, closestPointOnLineSegment, distanceToLineSegment;

Terrain = __webpack_require__(891);

({addEntityClass} = __webpack_require__(505));

({distanceToLineSegment} = (__webpack_require__(505).helpers));

closestPointOnLineSegment = function(point, a, b) {
  var a_to_b, a_to_p, atb2, atp_dot_atb, t;
  // https://stackoverflow.com/a/3122532/2624876
  a_to_p = {
    x: point.x - a.x,
    y: point.y - a.y
  };
  a_to_b = {
    x: b.x - a.x,
    y: b.y - a.y
  };
  atb2 = a_to_b.x ** 2 + a_to_b.y ** 2;
  atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
  t = atp_dot_atb / atb2;
  return {
    x: a.x + a_to_b.x * t,
    y: a.y + a_to_b.y * t
  };
};

module.exports = Water = (function() {
  class Water extends Terrain {
    constructor() {
      super();
      this.bbox_padding = 30;
      this.solid = false;
      this.waves_y = []; // indexed by x starting from @min_x
      this.waves_vy = []; // indexed by x starting from @min_x
      this.min_x = 2e308;
      this.max_x = -2e308;
      this.min_y = 2e308;
      this.max_y = -2e308;
      this.structure.onchange = () => {
        var double_area, i, point, point_name, ref, ref1, ref2, ref3, segment, segment_name, x;
        this.waves_y = [];
        this.waves_vy;
        this.min_x = 2e308;
        this.max_x = -2e308;
        this.min_y = 2e308;
        this.max_y = -2e308;
        ref = this.structure.points;
        for (point_name in ref) {
          point = ref[point_name];
          this.min_x = Math.min(this.min_x, point.x);
          this.max_x = Math.max(this.max_x, point.x);
          this.min_y = Math.min(this.min_y, point.y);
          this.max_y = Math.max(this.max_y, point.y);
        }
        this.min_x = Math.floor(this.min_x);
        this.max_x = Math.ceil(this.max_x);
        this.min_y = Math.floor(this.min_y);
        this.max_y = Math.ceil(this.max_y);
        for (x = i = ref1 = this.min_x, ref2 = this.max_x; (ref1 <= ref2 ? i < ref2 : i > ref2); x = ref1 <= ref2 ? ++i : --i) {
          this.waves_y[x - this.min_x] = 0;
          this.waves_vy[x - this.min_x] = 0;
        }
        
        // detect polygon vertex order
        double_area = 0;
        ref3 = this.structure.segments;
        for (segment_name in ref3) {
          segment = ref3[segment_name];
          double_area += (segment.b.x - segment.a.x) * (segment.b.y + segment.a.y);
        }
        return this.ccw = double_area > 0;
      };
      this.bubbles = [];
    }

    toJSON() {
      var def, k, ref, v;
      def = {};
      ref = super.toJSON();
      for (k in ref) {
        v = ref[k];
        if (k !== "ccw" && k !== "min_x" && k !== "max_x" && k !== "min_y" && k !== "max_y") {
          def[k] = v;
        }
      }
      return def;
    }

    makeWaves(world_pos, radius = 5, velocity_y = 5) {
      var angle, i, j, local_pos, ref, ref1, ref2, ref3, x;
      local_pos = this.fromWorld(world_pos);
      for (x = i = ref = Math.round(local_pos.x - radius), ref1 = Math.round(local_pos.x + radius); (ref <= ref1 ? i < ref1 : i > ref1); x = ref <= ref1 ? ++i : --i) {
        this.waves_vy[x - this.min_x] = velocity_y * (1 - Math.abs(x - local_pos.x) / radius);
      }
      for (j = 0, ref2 = Math.min(20, radius * Math.abs(velocity_y)); (0 <= ref2 ? j <= ref2 : j >= ref2); 0 <= ref2 ? j++ : j--) {
        angle = Math.random() * Math.PI * 2;
        this.bubbles.push({
          x: local_pos.x + Math.cos(angle) * radius,
          // y: local_pos.y + Math.sin(angle) * radius
          y: ((ref3 = this.waves_vy[Math.round(local_pos.x) - this.min_x]) != null ? ref3 : 0) + this.min_y,
          vx: Math.cos(angle) * (1 * Math.random()),
          vy: Math.sin(angle) * (1 * Math.random()) + Math.min(10, Math.abs(velocity_y / 3)),
          radius: Math.random() * 2, //(2 + Math.min(2, Math.abs(velocity_y/3)))
          life: Math.random() * 100 + 10
        });
      }
    }

    step() {
      var bubble, closest_distance, closest_point, closest_segment, dist, i, j, l, neighboring, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, segment, segment_name, waves_x, x;
      neighboring = [];
      for (x = i = ref = this.min_x, ref1 = this.max_x; (ref <= ref1 ? i < ref1 : i > ref1); x = ref <= ref1 ? ++i : --i) {
        neighboring[x - this.min_x] = ((ref2 = this.waves_y[x - this.min_x - 1]) != null ? ref2 : 0) + ((ref3 = this.waves_y[x - this.min_x + 1]) != null ? ref3 : 0);
      }
      for (x = j = ref4 = this.min_x, ref5 = this.max_x; (ref4 <= ref5 ? j < ref5 : j > ref5); x = ref4 <= ref5 ? ++j : --j) {
        this.waves_vy[x - this.min_x] += (neighboring[x - this.min_x] - this.waves_y[x - this.min_x] * 2) * 0.4;
        this.waves_vy[x - this.min_x] *= 0.99;
        this.waves_vy[x - this.min_x] -= this.waves_y[x - this.min_x] * 0.2;
        this.waves_y[x - this.min_x] += this.waves_vy[x - this.min_x];
      }
      ref6 = this.bubbles;
      for (l = ref6.length - 1; l >= 0; l += -1) {
        bubble = ref6[l];
        bubble.life -= 1;
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        waves_x = Math.round(bubble.x) - this.min_x;
        if (this.waves_y[waves_x] != null) {
          // bubble.vy -= ./1 * Math.sign(bubble.y - (@waves_y[waves_x] + @min_y))
          // bubble.y = @waves_y[waves_x] + @min_y
          // bubble.y += (@waves_y[waves_x] + @min_y - bubble.y) * 0.1
          bubble.vy += ((ref7 = this.waves_vy[waves_x]) != null ? ref7 : 0) * 0.1;
          bubble.vy -= 0.3;
          bubble.vy += (Math.max(bubble.y, this.waves_y[waves_x] + this.min_y) - bubble.y) * 0.4;
          bubble.y = Math.max(bubble.y, this.waves_y[waves_x] + this.min_y);
        } else {
          // Note: the below code to constrain the bubble to the polygon
          // ALSO constrains y similarly to the above line.
          // If I want to allow the bubbles to go above the waves,
          // I could probably tweak the below constraint to just not constrain y
          // when the bubble is above the polygon.
          bubble.life -= 2;
          bubble.vx *= 0.5;
          bubble.vy *= 0.5;
        }
        
        // constrain to polygon, taking into account dynamic waves
        if (!this.structure.pointInPolygon(bubble)) {
          if (!this.structure.pointInPolygon({
            x: bubble.x,
            y: bubble.y + ((ref8 = this.waves_y[waves_x]) != null ? ref8 : 0)
          })) {
            closest_distance = 2e308;
            closest_segment = null;
            ref9 = this.structure.segments;
            for (segment_name in ref9) {
              segment = ref9[segment_name];
              dist = distanceToLineSegment(bubble, segment.a, segment.b);
              if (dist < closest_distance) {
                closest_distance = dist;
                closest_segment = segment;
              }
            }
            if (closest_segment) {
              closest_point = closestPointOnLineSegment(bubble, closest_segment.a, closest_segment.b);
              bubble.x = closest_point.x;
              if (bubble.y < this.min_y) {
                closest_point.y += (ref10 = this.waves_y[waves_x]) != null ? ref10 : 0;
                closest_point.y = Math.max(closest_point.y, bubble.y);
              }
              bubble.y = closest_point.y;
            }
          }
        }
        // pop bubble (unfortunately, this doesn't use pop())
        // (haha it could if I sorted the bubbles by life)
        // (but that would obviously be worthless, and only confuse the code)
        if (bubble.life <= 0) {
          this.bubbles.splice(this.bubbles.indexOf(bubble), 1);
        }
      }
    }

    draw(ctx, view) {
      var bbox_max, bbox_min, i, point, point_name, ref, ref1, ref2, reflecting_line_y, wave_center_y, x;
      wave_center_y = this.min_y;
      ctx.save();
      ctx.beginPath();
      for (x = i = ref = this.min_x, ref1 = this.max_x; (ref <= ref1 ? i < ref1 : i > ref1); x = ref <= ref1 ? ++i : --i) {
        ctx.lineTo(x, this.waves_y[x - this.min_x] + wave_center_y);
      }
      ctx.lineTo(this.max_x, this.max_y);
      ctx.lineTo(this.min_x, this.max_y);
      ctx.closePath();
      // ctx.strokeStyle = if @ccw? then (if @ccw then "lime" else "yellow") else "red"
      // ctx.stroke()
      ctx.clip();
      ctx.beginPath();
      ref2 = this.structure.points;
      for (point_name in ref2) {
        point = ref2[point_name];
        if (point.y < wave_center_y + 2) {
          if ((point.x > (this.min_x + this.max_x) / 2) === this.ccw) {
            ctx.lineTo(point.x, point.y);
            ctx.lineTo(point.x, point.y - 50);
          } else {
            ctx.lineTo(point.x, point.y - 50);
            ctx.lineTo(point.x, point.y);
          }
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = "hsla(200, 100%, 50%, 0.5)";
      ctx.fill();
      ctx.clip();
      // For debugging, disable ctx.clip() and uncomment this to escape the other clip:
      // ctx.restore()
      // ctx.save()

      // Draw reflections by drawing the canvas upside down on top of itself

      // Undo the entity space transform
      ctx.translate(-this.x, -this.y);
      // Undo the view transform which looks like this:
      //   ctx.translate(canvas.width / 2, canvas.height / 2)
      //   ctx.scale(view.scale, view.scale)
      //   ctx.translate(-view.center_x, -view.center_y)
      ctx.translate(view.center_x, view.center_y);
      ctx.scale(1 / view.scale, 1 / view.scale);
      ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
      // We're now in canvas space

      // We need to know the y coordinate of the reflecting line in canvas space
      reflecting_line_y = (this.y + wave_center_y - view.center_y) * view.scale + ctx.canvas.height / 2;
      // Debug
      // ctx.beginPath()
      // ctx.moveTo(0, reflecting_line_y)
      // ctx.lineTo(ctx.canvas.width, reflecting_line_y)
      // ctx.strokeStyle = "red"
      // ctx.stroke()
      ctx.globalAlpha = 0.2;
      ctx.translate(0, reflecting_line_y * 2);
      ctx.scale(1, -1);
      // ctx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height)
      // Optimization: draw only the part of the canvas that's visible
      bbox_min = view.fromWorld({
        x: this.min_x + this.x,
        y: this.min_y + this.y
      });
      bbox_max = view.fromWorld({
        x: this.max_x + this.x,
        y: this.max_y + this.y
      });
      // Invert the y coordinates over the reflecting line
      bbox_min.y = reflecting_line_y * 2 - bbox_min.y;
      bbox_max.y = reflecting_line_y * 2 - bbox_max.y;
      ctx.drawImage(ctx.canvas, bbox_min.x, bbox_min.y, bbox_max.x - bbox_min.x, bbox_max.y - bbox_min.y, bbox_min.x, bbox_min.y, bbox_max.x - bbox_min.x, bbox_max.y - bbox_min.y);
      
      // Note that the reflections can't draw what's beyond the canvas,
      // which can cause an artifact when the top of the water is near the top of the canvas.
      // This could be fixed by drawing the game world in a larger canvas and then
      // cropping it to the normal viewport size.
      ctx.restore();
      this.draw_bubbles(ctx, view);
    }

    draw_bubbles(ctx, view) {
      var bubble, i, len, ref;
      ref = this.bubbles;
      for (i = 0, len = ref.length; i < len; i++) {
        bubble = ref[i];
        ctx.save();
        ctx.translate(bubble.x, bubble.y);
        // ctx.translate(bubble.x, wave_center_y + 2)
        ctx.beginPath();
        ctx.arc(0, 0, bubble.radius, 0, Math.PI * 2);
        // ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        // ctx.lineWidth = 1
        // ctx.stroke()
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
        ctx.restore();
      }
    }

  };

  addEntityClass(Water);

  return Water;

}).call(this);


/***/ }),

/***/ 866:
/***/ ((module) => {

var keyboard, keys, prev_keys;

keys = {};

prev_keys = {};

addEventListener("keydown", function(e) {
  return keys[e.code] = true;
});

addEventListener("keyup", function(e) {
  return delete keys[e.code];
});

keyboard = {
  wasJustPressed: function(code) {
    return (keys[code] != null) && (prev_keys[code] == null);
  },
  isHeld: function(code) {
    return keys[code] != null;
  },
  resetForNextStep: function() {
    var k, v;
    prev_keys = {};
    for (k in keys) {
      v = keys[k];
      prev_keys[k] = v;
    }
  }
};

module.exports = keyboard;


/***/ }),

/***/ 880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Structure, randomize_entities,
  hasProp = {}.hasOwnProperty;

({Structure} = __webpack_require__(505));

module.exports = randomize_entities = function(entities) {
  var apply_differences, entity, i, len, new_entity_a, new_entity_b;
  for (i = 0, len = entities.length; i < len; i++) {
    entity = entities[i];
    // Use two new entities to detect what properties get randomized,
    // and change only those.
    // (If you just used one new entity, you couldn't distinguish between
    // properties that were different because they were randomized at construction,
    // or because they were manually modified, such as by posing an entity,
    // or modified by simulation, although that's less important.)
    new_entity_a = new entity.constructor();
    new_entity_b = new entity.constructor();
    apply_differences = function(a, b, cur) {
      var key, val_a, val_b;
      for (key in a) {
        if (!hasProp.call(a, key)) continue;
        val_a = a[key];
        if (!(key !== "id")) {
          continue;
        }
        val_b = b[key];
        if (val_a instanceof Structure) {
          // Replace the structure wholesale.
          // Avoids issues with trees, which would get split up with floating branches.
          if (JSON.stringify(val_a) !== JSON.stringify(val_b)) {
            cur[key] = val_a;
          }
        } else if (Array.isArray(val_a)) {
          // Replace the array wholesale.
          // That way it can shrink, and can't leave blanks in the middle.
          // If e.g. a = [1, 0, 1] and b = [1, 0, 1, 0, 1] and cur = []
          // the "object" path could leave cur = [, , , 0, 1], I think.
          if (JSON.stringify(val_a) !== JSON.stringify(val_b)) {
            cur[key] = val_a;
          }
        } else if (typeof val_a === "object" && val_a !== null && typeof val_b === "object" && val_b !== null && typeof cur[key] === "object" && cur[key] !== null) {
          apply_differences(val_a, val_b, cur[key]);
        } else if (val_a !== val_b) {
          cur[key] = val_a;
        }
      }
    };
    apply_differences(new_entity_a, new_entity_b, entity);
  }
};


/***/ }),

/***/ 351:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ArcheryTarget, Arrow, Bow, Cloud, Deer, Player, Terrain, Water, anything_other_than_c, c, compare_entities, relative_sorts, sort_entities, topological_sort;

Terrain = __webpack_require__(891);

Water = __webpack_require__(469);

Cloud = __webpack_require__(332);

Deer = __webpack_require__(857);

Player = __webpack_require__(795);

Bow = __webpack_require__(914);

Arrow = __webpack_require__(943);

ArcheryTarget = __webpack_require__(233);

c = function(entity_class) {
  return function(entity) {
    return entity instanceof entity_class;
  };
};

anything_other_than_c = function(entity_class) {
  return function(entity) {
    return !(entity instanceof entity_class);
  };
};

relative_sorts = [
  // [A, B] denotes A in front of B
  // If the filters result in true for a pair and its reverse,
  // it will be handled below and shouldn't cause instability.

    // The one background element.
  [anything_other_than_c(Cloud),
  c(Cloud)],
  // The archery target is effectively a line, but displayed as an oval, implying perspective.
  // Arrows need to be visible when sticking into the target.
  [c(Arrow),
  c(ArcheryTarget)],
  // For riding, player's legs go in front; it's implied that one goes behind,
  // by posing the legs on top of each other.
  // Note: there's also a special rule that makes sure there's nothing between the player and the deer.
  [c(Player),
  c(Deer)],
  // It looks best holding the arrow in front of the bow.
  [c(Arrow),
  c(Player)],
  // Player now manually sorts Bow in relation to itself (when holding it)
  // [c(Player), c(Bow)] # can look better in some cases, but not while aiming or turning
  // [c(Bow), c(Player)]
  [c(Arrow),
  c(Bow)],
  // Water is transparent, and it should discolor any entities submerged in it.
  // [c(Water), anything_other_than_c(Terrain)]
  // For the reflection effect, the water should be drawn after the terrain too.
  [c(Water),
  anything_other_than_c(Water)],
  
    // This may end up being too general
  // I'm keeping it at the end so any rules can override it
  [anything_other_than_c(Terrain),
  c(Terrain)]
];

compare_entities = function(a, b) {
  var a_filter, b_filter, k, len;
// This comparator is intransitive, so it can't be used for sort().
  for (k = 0, len = relative_sorts.length; k < len; k++) {
    [a_filter, b_filter] = relative_sorts[k];
    if (a_filter(a) && b_filter(b) && !b_filter(a) && !a_filter(b)) {
      return 1;
    }
    if (b_filter(a) && a_filter(b) && !a_filter(a) && !b_filter(b)) {
      return -1;
    }
  }
  // If we get here, we don't know which should be in front.
  return 0;
};

module.exports = sort_entities = function(world) {
  var before_sort, changed, entity, k, l, len, len1, non_steed_between, player, player_index, players, ref, steed, steed_index, steeds;
  before_sort = world.entities.slice();
  // world.entities.sort(compare_entities)
  // sort() is stable, but it will fail to sort [a, b, c] if there is only a rule for [a, c]
  // It takes 0 to mean "equal", not "unknown".
  // We need a sorting algorithm that compares more than just adjacent pairs,
  // and gives a total ordering, with an intransitive comparator.

  // Bubble sort doesn't work either.
  // n = world.entities.length
  // loop
  // 	new_n = 0
  // 	for i in [1...n]
  // 		a = world.entities[i - 1]
  // 		b = world.entities[i]
  // 		if compare_entities(a, b) > 0
  // 			world.entities[i - 1] = b
  // 			world.entities[i] = a
  // 			new_n = i
  // 	n = new_n
  // 	break if n <= 1

  // An insertion sort that DOESN'T work with an intransitive comparator:
  // i = 1
  // while i < world.entities.length
  // 	x = world.entities[i]
  // 	j = i - 1
  // 	while j >= 0 and compare_entities(world.entities[j], x) > 0
  // 		world.entities[j + 1] = world.entities[j]
  // 		j -= 1
  // 	world.entities[j + 1] = x
  // 	i += 1

  // An insertion sort that DOES work with an intransitive comparator:
  // new_list = []
  // for entity in world.entities
  // 	inserted = false
  // 	for i in [0...new_list.length]
  // 		if compare_entities(entity, new_list[i]) < 0
  // 			new_list.splice(i, 0, entity)
  // 			inserted = true
  // 			break
  // 	new_list.push(entity) unless inserted
  // world.entities = new_list

  // Topological sort is better because it can tell us if there is a cycle, i.e. inconsistency.
  world.entities = topological_sort(world.entities, compare_entities);
  // If there are any Deer, make sure there are no trees or anything between them and the Player.
  // This is a special case because it can't be expressed as "A goes above B".
  // Trees should be allowed to go above or below both the player and steed, but not between them.
  // This rule moves the Deer closer to the Player in depth.
  steeds = world.getEntitiesOfType(Deer);
  players = world.getEntitiesOfType(Player);
  for (k = 0, len = steeds.length; k < len; k++) {
    steed = steeds[k];
    player = players[0];
    player_index = world.entities.indexOf(player);
    steed_index = world.entities.indexOf(steed);
    if (player && player_index - steed_index > 1) {
      non_steed_between = false;
      ref = world.entities.slice(steed_index + 1, player_index);
      for (l = 0, len1 = ref.length; l < len1; l++) {
        entity = ref[l];
        if (!(entity instanceof Deer)) {
          non_steed_between = true;
          break;
        }
      }
      if (non_steed_between) {
        world.entities.splice(world.entities.indexOf(steed), 1);
        world.entities.splice(world.entities.indexOf(player), 0, steed);
        console.log(`Sorted ${steed.constructor.name} closer to ${player.constructor.name}`);
      }
    }
  }
  changed = world.entities.some(function(entity, i) {
    return entity !== before_sort[i];
  });
  if (changed) {
    console.log("Sort changed");
    console.log(`Before: ${before_sort.map(function(e) {
      return e.constructor.name;
    }).join(", ")}`);
    console.log(`After: ${world.entities.map(function(e) {
      return e.constructor.name;
    }).join(", ")}`);
  }
};

// topological_sort = (array, comparator) ->
// 	# Create an empty dictionary to hold the graph.
// 	graph = {}

// 	# Add each entity to the graph.
// 	for entity in array
// 		graph[entity] = []

// 	# For each pair of array, check if one should come before the other.
// 	for i in [0..array.length-1]
// 		for j in [i+1..array.length-1]
// 			result = comparator(array[i], array[j])
// 			if result == 1
// 				# If entity i should come before entity j, add an edge from i to j.
// 				graph[array[i]].push(array[j])
// 			else if result == -1
// 				# If entity j should come before entity i, add an edge from j to i.
// 				graph[array[j]].push(array[i])

// 	# Create a dictionary to hold the number of incoming edges for each node.
// 	in_degrees = {}
// 	for node, neighbors of graph
// 		in_degrees[node] = 0
// 	for node, neighbors of graph
// 		for neighbor in neighbors
// 			in_degrees[neighbor] += 1

// 	# Initialize a queue with nodes that have no incoming edges.
// 	queue = []
// 	for node, in_degree of in_degrees
// 		if in_degree == 0
// 			queue.push(node)

// 	# Perform the topological sort.
// 	result = []
// 	while queue.length > 0
// 		# Get the next node from the queue.
// 		node = queue.shift()
// 		result.push(node)

// 		# Remove the node and its outgoing edges from the graph.
// 		for neighbor in graph[node]
// 			in_degrees[neighbor] -= 1
// 			if in_degrees[neighbor] == 0
// 				queue.push(neighbor)

// 	# Check if the sort was successful (i.e., all nodes were visited).
// 	if result.length == array.length
// 		return result
// 	else
// 		throw new Error("Graph contains cycle: #{JSON.stringify(graph)}")

// topological_sort = (array, comparator) ->
// 	# Build a map of array that depend on each item
// 	dependencies = new Map()
// 	for item in array
// 		dependencies.set(item, [])
// 		for other_item in array
// 			if comparator(item, other_item) > 0
// 				dependencies.get(item).push(other_item)

// 	# Perform topological sort using Kahn's algorithm
// 	sorted_array = []
// 	no_incoming_edges = []
// 	for [item, edges] from dependencies
// 		if edges.length == 0
// 			no_incoming_edges.push(item)
// 	while no_incoming_edges.length > 0
// 		item = no_incoming_edges.shift()
// 		sorted_array.push(item)
// 		for edge in dependencies.get(item)
// 			incoming_edges = dependencies.get(edge)
// 			incoming_edges.splice(incoming_edges.indexOf(item), 1)
// 			if incoming_edges.length == 0
// 				no_incoming_edges.push(edge)

// 	# Check for cycles
// 	if sorted_array.length < array.length
// 		throw new Error("Cycle detected. Comparator must not be consistent.")

// 	return sorted_array
topological_sort = function(array, comparator) {
  var adjacency_list, comparison, current, cycle, degree, i, in_degree, item, j, k, l, len, len1, len2, m, n, neighbor, neighbors, node, o, queue, ref, ref1, ref2, ref3, result, reverse_adjacency_list, x, y;
  // Construct the adjacency list and reverse adjacency list
  adjacency_list = new Map();
  reverse_adjacency_list = new Map();
  for (k = 0, len = array.length; k < len; k++) {
    node = array[k];
    adjacency_list.set(node, []);
    reverse_adjacency_list.set(node, []);
  }
  for (i = l = 0, ref = array.length; (0 <= ref ? l < ref : l > ref); i = 0 <= ref ? ++l : --l) {
    for (j = m = ref1 = i + 1, ref2 = array.length; (ref1 <= ref2 ? m < ref2 : m > ref2); j = ref1 <= ref2 ? ++m : --m) {
      comparison = comparator(array[i], array[j]);
      if (comparison < 0) {
        adjacency_list.get(array[i]).push(array[j]);
        reverse_adjacency_list.get(array[j]).push(array[i]);
      } else if (comparison > 0) {
        adjacency_list.get(array[j]).push(array[i]);
        reverse_adjacency_list.get(array[i]).push(array[j]);
      }
    }
  }
  // Perform the topological sort using Kahn's algorithm
  in_degree = new Map();
  for (x of reverse_adjacency_list) {
    [node, neighbors] = x;
    in_degree.set(node, neighbors.length);
  }
  queue = [];
  for (y of in_degree) {
    [node, degree] = y;
    if (degree === 0) {
      queue.push(node);
    }
  }
  result = [];
  while (queue.length > 0) {
    node = queue.shift();
    result.push(node);
    ref3 = adjacency_list.get(node);
    for (n = 0, len1 = ref3.length; n < len1; n++) {
      neighbor = ref3[n];
      in_degree.set(neighbor, in_degree.get(neighbor) - 1);
      if (in_degree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  // Check for cycles and throw an error if found
  if (result.length !== array.length) {
    for (o = 0, len2 = array.length; o < len2; o++) {
      item = array[o];
      if (!result.includes(item)) {
        cycle = [item];
        current = adjacency_list.get(item)[0];
        while (current !== item) {
          cycle.push(current);
          current = adjacency_list.get(current)[0];
        }
        cycle.push(item);
        cycle = cycle.map((item) => {
          if (`${item}` === "[object Object]") {
            return item.constructor.name;
          } else {
            return item;
          }
        }).join(" > ");
        throw new Error("Comparator is inconsistent. Cycle: " + cycle);
      }
    }
  }
  // Return the topologically sorted array
  return result;
};

window.topological_sort = topological_sort;


/***/ }),

/***/ 33:
/***/ (function(__unused_webpack_module, exports) {

/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.18.1
 * @author George Michael Brower
 * @license MIT
 */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

	/**
	 * Base class for all controllers.
	 */
	class Controller {

		constructor( parent, object, property, className, widgetTag = 'div' ) {

			/**
			 * The GUI that contains this controller.
			 * @type {GUI}
			 */
			this.parent = parent;

			/**
			 * The object this controller will modify.
			 * @type {object}
			 */
			this.object = object;

			/**
			 * The name of the property to control.
			 * @type {string}
			 */
			this.property = property;

			/**
			 * Used to determine if the controller is disabled.
			 * Use `controller.disable( true|false )` to modify this value
			 * @type {boolean}
			 */
			this._disabled = false;

			/**
			 * Used to determine if the Controller is hidden.
			 * Use `controller.show()` or `controller.hide()` to change this.
			 * @type {boolean}
			 */
			this._hidden = false;

			/**
			 * The value of `object[ property ]` when the controller was created.
			 * @type {any}
			 */
			this.initialValue = this.getValue();

			/**
			 * The outermost container DOM element for this controller.
			 * @type {HTMLElement}
			 */
			this.domElement = document.createElement( 'div' );
			this.domElement.classList.add( 'controller' );
			this.domElement.classList.add( className );

			/**
			 * The DOM element that contains the controller's name.
			 * @type {HTMLElement}
			 */
			this.$name = document.createElement( 'div' );
			this.$name.classList.add( 'name' );

			Controller.nextNameID = Controller.nextNameID || 0;
			this.$name.id = `lil-gui-name-${++Controller.nextNameID}`;

			/**
			 * The DOM element that contains the controller's "widget" (which differs by controller type).
			 * @type {HTMLElement}
			 */
			this.$widget = document.createElement( widgetTag );
			this.$widget.classList.add( 'widget' );

			/**
			 * The DOM element that receives the disabled attribute when using disable()
			 * @type {HTMLElement}
			 */
			this.$disable = this.$widget;

			this.domElement.appendChild( this.$name );
			this.domElement.appendChild( this.$widget );

			this.parent.children.push( this );
			this.parent.controllers.push( this );

			this.parent.$children.appendChild( this.domElement );

			this._listenCallback = this._listenCallback.bind( this );

			this.name( property );

		}

		/**
		 * Sets the name of the controller and its label in the GUI.
		 * @param {string} name
		 * @returns {this}
		 */
		name( name ) {
			/**
			 * The controller's name. Use `controller.name( 'Name' )` to modify this value.
			 * @type {string}
			 */
			this._name = name;
			this.$name.innerHTML = name;
			return this;
		}

		/**
		 * Pass a function to be called whenever the value is modified by this controller.
		 * The function receives the new value as its first parameter. The value of `this` will be the
		 * controller.
		 *
		 * For function controllers, the `onChange` callback will be fired on click, after the function
		 * executes.
		 * @param {Function} callback
		 * @returns {this}
		 * @example
		 * const controller = gui.add( object, 'property' );
		 *
		 * controller.onChange( function( v ) {
		 * 	console.log( 'The value is now ' + v );
		 * 	console.assert( this === controller );
		 * } );
		 */
		onChange( callback ) {
			/**
			 * Used to access the function bound to `onChange` events. Don't modify this value directly.
			 * Use the `controller.onChange( callback )` method instead.
			 * @type {Function}
			 */
			this._onChange = callback;
			return this;
		}

		/**
		 * Calls the onChange methods of this controller and its parent GUI.
		 * @protected
		 */
		_callOnChange() {

			this.parent._callOnChange( this );

			if ( this._onChange !== undefined ) {
				this._onChange.call( this, this.getValue() );
			}

			this._changed = true;

		}

		/**
		 * Pass a function to be called after this controller has been modified and loses focus.
		 * @param {Function} callback
		 * @returns {this}
		 * @example
		 * const controller = gui.add( object, 'property' );
		 *
		 * controller.onFinishChange( function( v ) {
		 * 	console.log( 'Changes complete: ' + v );
		 * 	console.assert( this === controller );
		 * } );
		 */
		onFinishChange( callback ) {
			/**
			 * Used to access the function bound to `onFinishChange` events. Don't modify this value
			 * directly. Use the `controller.onFinishChange( callback )` method instead.
			 * @type {Function}
			 */
			this._onFinishChange = callback;
			return this;
		}

		/**
		 * Should be called by Controller when its widgets lose focus.
		 * @protected
		 */
		_callOnFinishChange() {

			if ( this._changed ) {

				this.parent._callOnFinishChange( this );

				if ( this._onFinishChange !== undefined ) {
					this._onFinishChange.call( this, this.getValue() );
				}

			}

			this._changed = false;

		}

		/**
		 * Sets the controller back to its initial value.
		 * @returns {this}
		 */
		reset() {
			this.setValue( this.initialValue );
			this._callOnFinishChange();
			return this;
		}

		/**
		 * Enables this controller.
		 * @param {boolean} enabled
		 * @returns {this}
		 * @example
		 * controller.enable();
		 * controller.enable( false ); // disable
		 * controller.enable( controller._disabled ); // toggle
		 */
		enable( enabled = true ) {
			return this.disable( !enabled );
		}

		/**
		 * Disables this controller.
		 * @param {boolean} disabled
		 * @returns {this}
		 * @example
		 * controller.disable();
		 * controller.disable( false ); // enable
		 * controller.disable( !controller._disabled ); // toggle
		 */
		disable( disabled = true ) {

			if ( disabled === this._disabled ) return this;

			this._disabled = disabled;

			this.domElement.classList.toggle( 'disabled', disabled );
			this.$disable.toggleAttribute( 'disabled', disabled );

			return this;

		}

		/**
		 * Shows the Controller after it's been hidden.
		 * @param {boolean} show
		 * @returns {this}
		 * @example
		 * controller.show();
		 * controller.show( false ); // hide
		 * controller.show( controller._hidden ); // toggle
		 */
		show( show = true ) {

			this._hidden = !show;

			this.domElement.style.display = this._hidden ? 'none' : '';

			return this;

		}

		/**
		 * Hides the Controller.
		 * @returns {this}
		 */
		hide() {
			return this.show( false );
		}

		/**
		 * Destroys this controller and replaces it with a new option controller. Provided as a more
		 * descriptive syntax for `gui.add`, but primarily for compatibility with dat.gui.
		 *
		 * Use caution, as this method will destroy old references to this controller. It will also
		 * change controller order if called out of sequence, moving the option controller to the end of
		 * the GUI.
		 * @example
		 * // safe usage
		 *
		 * gui.add( object1, 'property' ).options( [ 'a', 'b', 'c' ] );
		 * gui.add( object2, 'property' );
		 *
		 * // danger
		 *
		 * const c = gui.add( object1, 'property' );
		 * gui.add( object2, 'property' );
		 *
		 * c.options( [ 'a', 'b', 'c' ] );
		 * // controller is now at the end of the GUI even though it was added first
		 *
		 * assert( c.parent.children.indexOf( c ) === -1 )
		 * // c references a controller that no longer exists
		 *
		 * @param {object|Array} options
		 * @returns {Controller}
		 */
		options( options ) {
			const controller = this.parent.add( this.object, this.property, options );
			controller.name( this._name );
			this.destroy();
			return controller;
		}

		/**
		 * Sets the minimum value. Only works on number controllers.
		 * @param {number} min
		 * @returns {this}
		 */
		min( min ) {
			return this;
		}

		/**
		 * Sets the maximum value. Only works on number controllers.
		 * @param {number} max
		 * @returns {this}
		 */
		max( max ) {
			return this;
		}

		/**
		 * Values set by this controller will be rounded to multiples of `step`. Only works on number
		 * controllers.
		 * @param {number} step
		 * @returns {this}
		 */
		step( step ) {
			return this;
		}

		/**
		 * Rounds the displayed value to a fixed number of decimals, without affecting the actual value
		 * like `step()`. Only works on number controllers.
		 * @example
		 * gui.add( object, 'property' ).listen().decimals( 4 );
		 * @param {number} decimals
		 * @returns {this}
		 */
		decimals( decimals ) {
			return this;
		}

		/**
		 * Calls `updateDisplay()` every animation frame. Pass `false` to stop listening.
		 * @param {boolean} listen
		 * @returns {this}
		 */
		listen( listen = true ) {

			/**
			 * Used to determine if the controller is currently listening. Don't modify this value
			 * directly. Use the `controller.listen( true|false )` method instead.
			 * @type {boolean}
			 */
			this._listening = listen;

			if ( this._listenCallbackID !== undefined ) {
				cancelAnimationFrame( this._listenCallbackID );
				this._listenCallbackID = undefined;
			}

			if ( this._listening ) {
				this._listenCallback();
			}

			return this;

		}

		_listenCallback() {

			this._listenCallbackID = requestAnimationFrame( this._listenCallback );

			// To prevent framerate loss, make sure the value has changed before updating the display.
			// Note: save() is used here instead of getValue() only because of ColorController. The !== operator
			// won't work for color objects or arrays, but ColorController.save() always returns a string.

			const curValue = this.save();

			if ( curValue !== this._listenPrevValue ) {
				this.updateDisplay();
			}

			this._listenPrevValue = curValue;

		}

		/**
		 * Returns `object[ property ]`.
		 * @returns {any}
		 */
		getValue() {
			return this.object[ this.property ];
		}

		/**
		 * Sets the value of `object[ property ]`, invokes any `onChange` handlers and updates the display.
		 * @param {any} value
		 * @returns {this}
		 */
		setValue( value ) {
			this.object[ this.property ] = value;
			this._callOnChange();
			this.updateDisplay();
			return this;
		}

		/**
		 * Updates the display to keep it in sync with the current value. Useful for updating your
		 * controllers when their values have been modified outside of the GUI.
		 * @returns {this}
		 */
		updateDisplay() {
			return this;
		}

		load( value ) {
			this.setValue( value );
			this._callOnFinishChange();
			return this;
		}

		save() {
			return this.getValue();
		}

		/**
		 * Destroys this controller and removes it from the parent GUI.
		 */
		destroy() {
			this.listen( false );
			this.parent.children.splice( this.parent.children.indexOf( this ), 1 );
			this.parent.controllers.splice( this.parent.controllers.indexOf( this ), 1 );
			this.parent.$children.removeChild( this.domElement );
		}

	}

	class BooleanController extends Controller {

		constructor( parent, object, property ) {

			super( parent, object, property, 'boolean', 'label' );

			this.$input = document.createElement( 'input' );
			this.$input.setAttribute( 'type', 'checkbox' );
			this.$input.setAttribute( 'aria-labelledby', this.$name.id );

			this.$widget.appendChild( this.$input );

			this.$input.addEventListener( 'change', () => {
				this.setValue( this.$input.checked );
				this._callOnFinishChange();
			} );

			this.$disable = this.$input;

			this.updateDisplay();

		}

		updateDisplay() {
			this.$input.checked = this.getValue();
			return this;
		}

	}

	function normalizeColorString( string ) {

		let match, result;

		if ( match = string.match( /(#|0x)?([a-f0-9]{6})/i ) ) {

			result = match[ 2 ];

		} else if ( match = string.match( /rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/ ) ) {

			result = parseInt( match[ 1 ] ).toString( 16 ).padStart( 2, 0 )
				+ parseInt( match[ 2 ] ).toString( 16 ).padStart( 2, 0 )
				+ parseInt( match[ 3 ] ).toString( 16 ).padStart( 2, 0 );

		} else if ( match = string.match( /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i ) ) {

			result = match[ 1 ] + match[ 1 ] + match[ 2 ] + match[ 2 ] + match[ 3 ] + match[ 3 ];

		}

		if ( result ) {
			return '#' + result;
		}

		return false;

	}

	const STRING = {
		isPrimitive: true,
		match: v => typeof v === 'string',
		fromHexString: normalizeColorString,
		toHexString: normalizeColorString
	};

	const INT = {
		isPrimitive: true,
		match: v => typeof v === 'number',
		fromHexString: string => parseInt( string.substring( 1 ), 16 ),
		toHexString: value => '#' + value.toString( 16 ).padStart( 6, 0 )
	};

	const ARRAY = {
		isPrimitive: false,
		
		// The arrow function is here to appease tree shakers like esbuild or webpack.
		// See https://esbuild.github.io/api/#tree-shaking
		match: v => Array.isArray( v ),
		
		fromHexString( string, target, rgbScale = 1 ) {

			const int = INT.fromHexString( string );

			target[ 0 ] = ( int >> 16 & 255 ) / 255 * rgbScale;
			target[ 1 ] = ( int >> 8 & 255 ) / 255 * rgbScale;
			target[ 2 ] = ( int & 255 ) / 255 * rgbScale;

		},
		toHexString( [ r, g, b ], rgbScale = 1 ) {

			rgbScale = 255 / rgbScale;

			const int = ( r * rgbScale ) << 16 ^
				( g * rgbScale ) << 8 ^
				( b * rgbScale ) << 0;

			return INT.toHexString( int );

		}
	};

	const OBJECT = {
		isPrimitive: false,
		match: v => Object( v ) === v,
		fromHexString( string, target, rgbScale = 1 ) {

			const int = INT.fromHexString( string );

			target.r = ( int >> 16 & 255 ) / 255 * rgbScale;
			target.g = ( int >> 8 & 255 ) / 255 * rgbScale;
			target.b = ( int & 255 ) / 255 * rgbScale;

		},
		toHexString( { r, g, b }, rgbScale = 1 ) {

			rgbScale = 255 / rgbScale;

			const int = ( r * rgbScale ) << 16 ^
				( g * rgbScale ) << 8 ^
				( b * rgbScale ) << 0;

			return INT.toHexString( int );

		}
	};

	const FORMATS = [ STRING, INT, ARRAY, OBJECT ];

	function getColorFormat( value ) {
		return FORMATS.find( format => format.match( value ) );
	}

	class ColorController extends Controller {

		constructor( parent, object, property, rgbScale ) {

			super( parent, object, property, 'color' );

			this.$input = document.createElement( 'input' );
			this.$input.setAttribute( 'type', 'color' );
			this.$input.setAttribute( 'tabindex', -1 );
			this.$input.setAttribute( 'aria-labelledby', this.$name.id );

			this.$text = document.createElement( 'input' );
			this.$text.setAttribute( 'type', 'text' );
			this.$text.setAttribute( 'spellcheck', 'false' );
			this.$text.setAttribute( 'aria-labelledby', this.$name.id );

			this.$display = document.createElement( 'div' );
			this.$display.classList.add( 'display' );

			this.$display.appendChild( this.$input );
			this.$widget.appendChild( this.$display );
			this.$widget.appendChild( this.$text );

			this._format = getColorFormat( this.initialValue );
			this._rgbScale = rgbScale;

			this._initialValueHexString = this.save();
			this._textFocused = false;

			this.$input.addEventListener( 'input', () => {
				this._setValueFromHexString( this.$input.value );
			} );

			this.$input.addEventListener( 'blur', () => {
				this._callOnFinishChange();
			} );

			this.$text.addEventListener( 'input', () => {
				const tryParse = normalizeColorString( this.$text.value );
				if ( tryParse ) {
					this._setValueFromHexString( tryParse );
				}
			} );

			this.$text.addEventListener( 'focus', () => {
				this._textFocused = true;
				this.$text.select();
			} );

			this.$text.addEventListener( 'blur', () => {
				this._textFocused = false;
				this.updateDisplay();
				this._callOnFinishChange();
			} );

			this.$disable = this.$text;

			this.updateDisplay();

		}

		reset() {
			this._setValueFromHexString( this._initialValueHexString );
			return this;
		}

		_setValueFromHexString( value ) {

			if ( this._format.isPrimitive ) {

				const newValue = this._format.fromHexString( value );
				this.setValue( newValue );

			} else {

				this._format.fromHexString( value, this.getValue(), this._rgbScale );
				this._callOnChange();
				this.updateDisplay();

			}

		}

		save() {
			return this._format.toHexString( this.getValue(), this._rgbScale );
		}

		load( value ) {
			this._setValueFromHexString( value );
			this._callOnFinishChange();
			return this;
		}

		updateDisplay() {
			this.$input.value = this._format.toHexString( this.getValue(), this._rgbScale );
			if ( !this._textFocused ) {
				this.$text.value = this.$input.value.substring( 1 );
			}
			this.$display.style.backgroundColor = this.$input.value;
			return this;
		}

	}

	class FunctionController extends Controller {

		constructor( parent, object, property ) {

			super( parent, object, property, 'function' );

			// Buttons are the only case where widget contains name
			this.$button = document.createElement( 'button' );
			this.$button.appendChild( this.$name );
			this.$widget.appendChild( this.$button );

			this.$button.addEventListener( 'click', e => {
				e.preventDefault();
				this.getValue().call( this.object );
				this._callOnChange();
			} );

			// enables :active pseudo class on mobile
			this.$button.addEventListener( 'touchstart', () => {}, { passive: true } );

			this.$disable = this.$button;

		}

	}

	class NumberController extends Controller {

		constructor( parent, object, property, min, max, step ) {

			super( parent, object, property, 'number' );

			this._initInput();

			this.min( min );
			this.max( max );

			const stepExplicit = step !== undefined;
			this.step( stepExplicit ? step : this._getImplicitStep(), stepExplicit );

			this.updateDisplay();

		}

		decimals( decimals ) {
			this._decimals = decimals;
			this.updateDisplay();
			return this;
		}

		min( min ) {
			this._min = min;
			this._onUpdateMinMax();
			return this;
		}

		max( max ) {
			this._max = max;
			this._onUpdateMinMax();
			return this;
		}

		step( step, explicit = true ) {
			this._step = step;
			this._stepExplicit = explicit;
			return this;
		}

		updateDisplay() {

			const value = this.getValue();

			if ( this._hasSlider ) {

				let percent = ( value - this._min ) / ( this._max - this._min );
				percent = Math.max( 0, Math.min( percent, 1 ) );

				this.$fill.style.width = percent * 100 + '%';

			}

			if ( !this._inputFocused ) {
				this.$input.value = this._decimals === undefined ? value : value.toFixed( this._decimals );
			}

			return this;

		}

		_initInput() {

			this.$input = document.createElement( 'input' );
			this.$input.setAttribute( 'type', 'number' );
			this.$input.setAttribute( 'step', 'any' );
			this.$input.setAttribute( 'aria-labelledby', this.$name.id );

			this.$widget.appendChild( this.$input );

			this.$disable = this.$input;

			const onInput = () => {

				let value = parseFloat( this.$input.value );

				if ( isNaN( value ) ) return;

				if ( this._stepExplicit ) {
					value = this._snap( value );
				}

				this.setValue( this._clamp( value ) );

			};

			// Keys & mouse wheel
			// ---------------------------------------------------------------------

			const increment = delta => {

				const value = parseFloat( this.$input.value );

				if ( isNaN( value ) ) return;

				this._snapClampSetValue( value + delta );

				// Force the input to updateDisplay when it's focused
				this.$input.value = this.getValue();

			};

			const onKeyDown = e => {
				if ( e.code === 'Enter' ) {
					this.$input.blur();
				}
				if ( e.code === 'ArrowUp' ) {
					e.preventDefault();
					increment( this._step * this._arrowKeyMultiplier( e ) );
				}
				if ( e.code === 'ArrowDown' ) {
					e.preventDefault();
					increment( this._step * this._arrowKeyMultiplier( e ) * -1 );
				}
			};

			const onWheel = e => {
				if ( this._inputFocused ) {
					e.preventDefault();
					increment( this._step * this._normalizeMouseWheel( e ) );
				}
			};

			// Vertical drag
			// ---------------------------------------------------------------------

			let testingForVerticalDrag = false,
				initClientX,
				initClientY,
				prevClientY,
				initValue,
				dragDelta;

			// Once the mouse is dragged more than DRAG_THRESH px on any axis, we decide
			// on the user's intent: horizontal means highlight, vertical means drag.
			const DRAG_THRESH = 5;

			const onMouseDown = e => {

				initClientX = e.clientX;
				initClientY = prevClientY = e.clientY;
				testingForVerticalDrag = true;

				initValue = this.getValue();
				dragDelta = 0;

				window.addEventListener( 'mousemove', onMouseMove );
				window.addEventListener( 'mouseup', onMouseUp );

			};

			const onMouseMove = e => {

				if ( testingForVerticalDrag ) {

					const dx = e.clientX - initClientX;
					const dy = e.clientY - initClientY;

					if ( Math.abs( dy ) > DRAG_THRESH ) {

						e.preventDefault();
						this.$input.blur();
						testingForVerticalDrag = false;
						this._setDraggingStyle( true, 'vertical' );

					} else if ( Math.abs( dx ) > DRAG_THRESH ) {

						onMouseUp();

					}

				}

				// This isn't an else so that the first move counts towards dragDelta
				if ( !testingForVerticalDrag ) {

					const dy = e.clientY - prevClientY;

					dragDelta -= dy * this._step * this._arrowKeyMultiplier( e );

					// Clamp dragDelta so we don't have 'dead space' after dragging past bounds.
					// We're okay with the fact that bounds can be undefined here.
					if ( initValue + dragDelta > this._max ) {
						dragDelta = this._max - initValue;
					} else if ( initValue + dragDelta < this._min ) {
						dragDelta = this._min - initValue;
					}

					this._snapClampSetValue( initValue + dragDelta );

				}

				prevClientY = e.clientY;

			};

			const onMouseUp = () => {
				this._setDraggingStyle( false, 'vertical' );
				this._callOnFinishChange();
				window.removeEventListener( 'mousemove', onMouseMove );
				window.removeEventListener( 'mouseup', onMouseUp );
			};

			// Focus state & onFinishChange
			// ---------------------------------------------------------------------

			const onFocus = () => {
				this._inputFocused = true;
			};

			const onBlur = () => {
				this._inputFocused = false;
				this.updateDisplay();
				this._callOnFinishChange();
			};

			this.$input.addEventListener( 'input', onInput );
			this.$input.addEventListener( 'keydown', onKeyDown );
			this.$input.addEventListener( 'wheel', onWheel, { passive: false } );
			this.$input.addEventListener( 'mousedown', onMouseDown );
			this.$input.addEventListener( 'focus', onFocus );
			this.$input.addEventListener( 'blur', onBlur );

		}

		_initSlider() {

			this._hasSlider = true;

			// Build DOM
			// ---------------------------------------------------------------------

			this.$slider = document.createElement( 'div' );
			this.$slider.classList.add( 'slider' );

			this.$fill = document.createElement( 'div' );
			this.$fill.classList.add( 'fill' );

			this.$slider.appendChild( this.$fill );
			this.$widget.insertBefore( this.$slider, this.$input );

			this.domElement.classList.add( 'hasSlider' );

			// Map clientX to value
			// ---------------------------------------------------------------------

			const map = ( v, a, b, c, d ) => {
				return ( v - a ) / ( b - a ) * ( d - c ) + c;
			};

			const setValueFromX = clientX => {
				const rect = this.$slider.getBoundingClientRect();
				let value = map( clientX, rect.left, rect.right, this._min, this._max );
				this._snapClampSetValue( value );
			};

			// Mouse drag
			// ---------------------------------------------------------------------

			const mouseDown = e => {
				this._setDraggingStyle( true );
				setValueFromX( e.clientX );
				window.addEventListener( 'mousemove', mouseMove );
				window.addEventListener( 'mouseup', mouseUp );
			};

			const mouseMove = e => {
				setValueFromX( e.clientX );
			};

			const mouseUp = () => {
				this._callOnFinishChange();
				this._setDraggingStyle( false );
				window.removeEventListener( 'mousemove', mouseMove );
				window.removeEventListener( 'mouseup', mouseUp );
			};

			// Touch drag
			// ---------------------------------------------------------------------

			let testingForScroll = false, prevClientX, prevClientY;

			const beginTouchDrag = e => {
				e.preventDefault();
				this._setDraggingStyle( true );
				setValueFromX( e.touches[ 0 ].clientX );
				testingForScroll = false;
			};

			const onTouchStart = e => {

				if ( e.touches.length > 1 ) return;

				// If we're in a scrollable container, we should wait for the first
				// touchmove to see if the user is trying to slide or scroll.
				if ( this._hasScrollBar ) {

					prevClientX = e.touches[ 0 ].clientX;
					prevClientY = e.touches[ 0 ].clientY;
					testingForScroll = true;

				} else {

					// Otherwise, we can set the value straight away on touchstart.
					beginTouchDrag( e );

				}

				window.addEventListener( 'touchmove', onTouchMove, { passive: false } );
				window.addEventListener( 'touchend', onTouchEnd );

			};

			const onTouchMove = e => {

				if ( testingForScroll ) {

					const dx = e.touches[ 0 ].clientX - prevClientX;
					const dy = e.touches[ 0 ].clientY - prevClientY;

					if ( Math.abs( dx ) > Math.abs( dy ) ) {

						// We moved horizontally, set the value and stop checking.
						beginTouchDrag( e );

					} else {

						// This was, in fact, an attempt to scroll. Abort.
						window.removeEventListener( 'touchmove', onTouchMove );
						window.removeEventListener( 'touchend', onTouchEnd );

					}

				} else {

					e.preventDefault();
					setValueFromX( e.touches[ 0 ].clientX );

				}

			};

			const onTouchEnd = () => {
				this._callOnFinishChange();
				this._setDraggingStyle( false );
				window.removeEventListener( 'touchmove', onTouchMove );
				window.removeEventListener( 'touchend', onTouchEnd );
			};

			// Mouse wheel
			// ---------------------------------------------------------------------

			// We have to use a debounced function to call onFinishChange because
			// there's no way to tell when the user is "done" mouse-wheeling.
			const callOnFinishChange = this._callOnFinishChange.bind( this );
			const WHEEL_DEBOUNCE_TIME = 400;
			let wheelFinishChangeTimeout;

			const onWheel = e => {

				// ignore vertical wheels if there's a scrollbar
				const isVertical = Math.abs( e.deltaX ) < Math.abs( e.deltaY );
				if ( isVertical && this._hasScrollBar ) return;

				e.preventDefault();

				// set value
				const delta = this._normalizeMouseWheel( e ) * this._step;
				this._snapClampSetValue( this.getValue() + delta );

				// force the input to updateDisplay when it's focused
				this.$input.value = this.getValue();

				// debounce onFinishChange
				clearTimeout( wheelFinishChangeTimeout );
				wheelFinishChangeTimeout = setTimeout( callOnFinishChange, WHEEL_DEBOUNCE_TIME );

			};

			this.$slider.addEventListener( 'mousedown', mouseDown );
			this.$slider.addEventListener( 'touchstart', onTouchStart, { passive: false } );
			this.$slider.addEventListener( 'wheel', onWheel, { passive: false } );

		}

		_setDraggingStyle( active, axis = 'horizontal' ) {
			if ( this.$slider ) {
				this.$slider.classList.toggle( 'active', active );
			}
			document.body.classList.toggle( 'lil-gui-dragging', active );
			document.body.classList.toggle( `lil-gui-${axis}`, active );
		}

		_getImplicitStep() {

			if ( this._hasMin && this._hasMax ) {
				return ( this._max - this._min ) / 1000;
			}

			return 0.1;

		}

		_onUpdateMinMax() {

			if ( !this._hasSlider && this._hasMin && this._hasMax ) {

				// If this is the first time we're hearing about min and max
				// and we haven't explicitly stated what our step is, let's
				// update that too.
				if ( !this._stepExplicit ) {
					this.step( this._getImplicitStep(), false );
				}

				this._initSlider();
				this.updateDisplay();

			}

		}

		_normalizeMouseWheel( e ) {

			let { deltaX, deltaY } = e;

			// Safari and Chrome report weird non-integral values for a notched wheel,
			// but still expose actual lines scrolled via wheelDelta. Notched wheels
			// should behave the same way as arrow keys.
			if ( Math.floor( e.deltaY ) !== e.deltaY && e.wheelDelta ) {
				deltaX = 0;
				deltaY = -e.wheelDelta / 120;
				deltaY *= this._stepExplicit ? 1 : 10;
			}

			const wheel = deltaX + -deltaY;

			return wheel;

		}

		_arrowKeyMultiplier( e ) {

			let mult = this._stepExplicit ? 1 : 10;

			if ( e.shiftKey ) {
				mult *= 10;
			} else if ( e.altKey ) {
				mult /= 10;
			}

			return mult;

		}

		_snap( value ) {

			// This would be the logical way to do things, but floating point errors.
			// return Math.round( value / this._step ) * this._step;

			// Using inverse step solves a lot of them, but not all
			// const inverseStep = 1 / this._step;
			// return Math.round( value * inverseStep ) / inverseStep;

			// Not happy about this, but haven't seen it break.
			const r = Math.round( value / this._step ) * this._step;
			return parseFloat( r.toPrecision( 15 ) );

		}

		_clamp( value ) {
			// either condition is false if min or max is undefined
			if ( value < this._min ) value = this._min;
			if ( value > this._max ) value = this._max;
			return value;
		}

		_snapClampSetValue( value ) {
			this.setValue( this._clamp( this._snap( value ) ) );
		}

		get _hasScrollBar() {
			const root = this.parent.root.$children;
			return root.scrollHeight > root.clientHeight;
		}

		get _hasMin() {
			return this._min !== undefined;
		}

		get _hasMax() {
			return this._max !== undefined;
		}

	}

	class OptionController extends Controller {

		constructor( parent, object, property, options ) {

			super( parent, object, property, 'option' );

			this.$select = document.createElement( 'select' );
			this.$select.setAttribute( 'aria-labelledby', this.$name.id );

			this.$display = document.createElement( 'div' );
			this.$display.classList.add( 'display' );

			this._values = Array.isArray( options ) ? options : Object.values( options );
			this._names = Array.isArray( options ) ? options : Object.keys( options );

			this._names.forEach( name => {
				const $option = document.createElement( 'option' );
				$option.innerHTML = name;
				this.$select.appendChild( $option );
			} );

			this.$select.addEventListener( 'change', () => {
				this.setValue( this._values[ this.$select.selectedIndex ] );
				this._callOnFinishChange();
			} );

			this.$select.addEventListener( 'focus', () => {
				this.$display.classList.add( 'focus' );
			} );

			this.$select.addEventListener( 'blur', () => {
				this.$display.classList.remove( 'focus' );
			} );

			this.$widget.appendChild( this.$select );
			this.$widget.appendChild( this.$display );

			this.$disable = this.$select;

			this.updateDisplay();

		}

		updateDisplay() {
			const value = this.getValue();
			const index = this._values.indexOf( value );
			this.$select.selectedIndex = index;
			this.$display.innerHTML = index === -1 ? value : this._names[ index ];
			return this;
		}

	}

	class StringController extends Controller {

		constructor( parent, object, property ) {

			super( parent, object, property, 'string' );

			this.$input = document.createElement( 'input' );
			this.$input.setAttribute( 'type', 'text' );
			this.$input.setAttribute( 'aria-labelledby', this.$name.id );

			this.$input.addEventListener( 'input', () => {
				this.setValue( this.$input.value );
			} );

			this.$input.addEventListener( 'keydown', e => {
				if ( e.code === 'Enter' ) {
					this.$input.blur();
				}
			} );

			this.$input.addEventListener( 'blur', () => {
				this._callOnFinishChange();
			} );

			this.$widget.appendChild( this.$input );

			this.$disable = this.$input;

			this.updateDisplay();

		}

		updateDisplay() {
			this.$input.value = this.getValue();
			return this;
		}

	}

	var stylesheet = `.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;

	function _injectStyles( cssContent ) {
		const injected = document.createElement( 'style' );
		injected.innerHTML = cssContent;
		const before = document.querySelector( 'head link[rel=stylesheet], head style' );
		if ( before ) {
			document.head.insertBefore( injected, before );
		} else {
			document.head.appendChild( injected );
		}
	}

	let stylesInjected = false;

	class GUI {

		/**
		 * Creates a panel that holds controllers.
		 * @example
		 * new GUI();
		 * new GUI( { container: document.getElementById( 'custom' ) } );
		 *
		 * @param {object} [options]
		 * @param {boolean} [options.autoPlace=true]
		 * Adds the GUI to `document.body` and fixes it to the top right of the page.
		 *
		 * @param {HTMLElement} [options.container]
		 * Adds the GUI to this DOM element. Overrides `autoPlace`.
		 *
		 * @param {number} [options.width=245]
		 * Width of the GUI in pixels, usually set when name labels become too long. Note that you can make
		 * name labels wider in CSS with `.lil‑gui { ‑‑name‑width: 55% }`
		 *
		 * @param {string} [options.title=Controls]
		 * Name to display in the title bar.
		 *
		 * @param {boolean} [options.closeFolders=false]
		 * Pass `true` to close all folders in this GUI by default.
		 *
		 * @param {boolean} [options.injectStyles=true]
		 * Injects the default stylesheet into the page if this is the first GUI.
		 * Pass `false` to use your own stylesheet.
		 *
		 * @param {number} [options.touchStyles=true]
		 * Makes controllers larger on touch devices. Pass `false` to disable touch styles.
		 *
		 * @param {GUI} [options.parent]
		 * Adds this GUI as a child in another GUI. Usually this is done for you by `addFolder()`.
		 *
		 */
		constructor( {
			parent,
			autoPlace = parent === undefined,
			container,
			width,
			title = 'Controls',
			closeFolders = false,
			injectStyles = true,
			touchStyles = true
		} = {} ) {

			/**
			 * The GUI containing this folder, or `undefined` if this is the root GUI.
			 * @type {GUI}
			 */
			this.parent = parent;

			/**
			 * The top level GUI containing this folder, or `this` if this is the root GUI.
			 * @type {GUI}
			 */
			this.root = parent ? parent.root : this;

			/**
			 * The list of controllers and folders contained by this GUI.
			 * @type {Array<GUI|Controller>}
			 */
			this.children = [];

			/**
			 * The list of controllers contained by this GUI.
			 * @type {Array<Controller>}
			 */
			this.controllers = [];

			/**
			 * The list of folders contained by this GUI.
			 * @type {Array<GUI>}
			 */
			this.folders = [];

			/**
			 * Used to determine if the GUI is closed. Use `gui.open()` or `gui.close()` to change this.
			 * @type {boolean}
			 */
			this._closed = false;

			/**
			 * Used to determine if the GUI is hidden. Use `gui.show()` or `gui.hide()` to change this.
			 * @type {boolean}
			 */
			this._hidden = false;

			/**
			 * The outermost container element.
			 * @type {HTMLElement}
			 */
			this.domElement = document.createElement( 'div' );
			this.domElement.classList.add( 'lil-gui' );

			/**
			 * The DOM element that contains the title.
			 * @type {HTMLElement}
			 */
			this.$title = document.createElement( 'div' );
			this.$title.classList.add( 'title' );
			this.$title.setAttribute( 'role', 'button' );
			this.$title.setAttribute( 'aria-expanded', true );
			this.$title.setAttribute( 'tabindex', 0 );

			this.$title.addEventListener( 'click', () => this.openAnimated( this._closed ) );
			this.$title.addEventListener( 'keydown', e => {
				if ( e.code === 'Enter' || e.code === 'Space' ) {
					e.preventDefault();
					this.$title.click();
				}
			} );

			// enables :active pseudo class on mobile
			this.$title.addEventListener( 'touchstart', () => {}, { passive: true } );

			/**
			 * The DOM element that contains children.
			 * @type {HTMLElement}
			 */
			this.$children = document.createElement( 'div' );
			this.$children.classList.add( 'children' );

			this.domElement.appendChild( this.$title );
			this.domElement.appendChild( this.$children );

			this.title( title );

			if ( touchStyles ) {
				this.domElement.classList.add( 'allow-touch-styles' );
			}

			if ( this.parent ) {

				this.parent.children.push( this );
				this.parent.folders.push( this );

				this.parent.$children.appendChild( this.domElement );

				// Stop the constructor early, everything onward only applies to root GUI's
				return;

			}

			this.domElement.classList.add( 'root' );

			// Inject stylesheet if we haven't done that yet
			if ( !stylesInjected && injectStyles ) {
				_injectStyles( stylesheet );
				stylesInjected = true;
			}

			if ( container ) {

				container.appendChild( this.domElement );

			} else if ( autoPlace ) {

				this.domElement.classList.add( 'autoPlace' );
				document.body.appendChild( this.domElement );

			}

			if ( width ) {
				this.domElement.style.setProperty( '--width', width + 'px' );
			}

			this._closeFolders = closeFolders;

			// Don't fire global key events while typing in the GUI:
			this.domElement.addEventListener( 'keydown', e => e.stopPropagation() );
			this.domElement.addEventListener( 'keyup', e => e.stopPropagation() );

		}

		/**
		 * Adds a controller to the GUI, inferring controller type using the `typeof` operator.
		 * @example
		 * gui.add( object, 'property' );
		 * gui.add( object, 'number', 0, 100, 1 );
		 * gui.add( object, 'options', [ 1, 2, 3 ] );
		 *
		 * @param {object} object The object the controller will modify.
		 * @param {string} property Name of the property to control.
		 * @param {number|object|Array} [$1] Minimum value for number controllers, or the set of
		 * selectable values for a dropdown.
		 * @param {number} [max] Maximum value for number controllers.
		 * @param {number} [step] Step value for number controllers.
		 * @returns {Controller}
		 */
		add( object, property, $1, max, step ) {

			if ( Object( $1 ) === $1 ) {

				return new OptionController( this, object, property, $1 );

			}

			const initialValue = object[ property ];

			switch ( typeof initialValue ) {

				case 'number':

					return new NumberController( this, object, property, $1, max, step );

				case 'boolean':

					return new BooleanController( this, object, property );

				case 'string':

					return new StringController( this, object, property );

				case 'function':

					return new FunctionController( this, object, property );

			}

			console.error( `gui.add failed
	property:`, property, `
	object:`, object, `
	value:`, initialValue );

		}

		/**
		 * Adds a color controller to the GUI.
		 * @example
		 * params = {
		 * 	cssColor: '#ff00ff',
		 * 	rgbColor: { r: 0, g: 0.2, b: 0.4 },
		 * 	customRange: [ 0, 127, 255 ],
		 * };
		 *
		 * gui.addColor( params, 'cssColor' );
		 * gui.addColor( params, 'rgbColor' );
		 * gui.addColor( params, 'customRange', 255 );
		 *
		 * @param {object} object The object the controller will modify.
		 * @param {string} property Name of the property to control.
		 * @param {number} rgbScale Maximum value for a color channel when using an RGB color. You may
		 * need to set this to 255 if your colors are too bright.
		 * @returns {Controller}
		 */
		addColor( object, property, rgbScale = 1 ) {
			return new ColorController( this, object, property, rgbScale );
		}

		/**
		 * Adds a folder to the GUI, which is just another GUI. This method returns
		 * the nested GUI so you can add controllers to it.
		 * @example
		 * const folder = gui.addFolder( 'Position' );
		 * folder.add( position, 'x' );
		 * folder.add( position, 'y' );
		 * folder.add( position, 'z' );
		 *
		 * @param {string} title Name to display in the folder's title bar.
		 * @returns {GUI}
		 */
		addFolder( title ) {
			const folder = new GUI( { parent: this, title } );
			if ( this.root._closeFolders ) folder.close();
			return folder;
		}

		/**
		 * Recalls values that were saved with `gui.save()`.
		 * @param {object} obj
		 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
		 * @returns {this}
		 */
		load( obj, recursive = true ) {

			if ( obj.controllers ) {

				this.controllers.forEach( c => {

					if ( c instanceof FunctionController ) return;

					if ( c._name in obj.controllers ) {
						c.load( obj.controllers[ c._name ] );
					}

				} );

			}

			if ( recursive && obj.folders ) {

				this.folders.forEach( f => {

					if ( f._title in obj.folders ) {
						f.load( obj.folders[ f._title ] );
					}

				} );

			}

			return this;

		}

		/**
		 * Returns an object mapping controller names to values. The object can be passed to `gui.load()` to
		 * recall these values.
		 * @example
		 * {
		 * 	controllers: {
		 * 		prop1: 1,
		 * 		prop2: 'value',
		 * 		...
		 * 	},
		 * 	folders: {
		 * 		folderName1: { controllers, folders },
		 * 		folderName2: { controllers, folders }
		 * 		...
		 * 	}
		 * }
		 *
		 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
		 * @returns {object}
		 */
		save( recursive = true ) {

			const obj = {
				controllers: {},
				folders: {}
			};

			this.controllers.forEach( c => {

				if ( c instanceof FunctionController ) return;

				if ( c._name in obj.controllers ) {
					throw new Error( `Cannot save GUI with duplicate property "${c._name}"` );
				}

				obj.controllers[ c._name ] = c.save();

			} );

			if ( recursive ) {

				this.folders.forEach( f => {

					if ( f._title in obj.folders ) {
						throw new Error( `Cannot save GUI with duplicate folder "${f._title}"` );
					}

					obj.folders[ f._title ] = f.save();

				} );

			}

			return obj;

		}

		/**
		 * Opens a GUI or folder. GUI and folders are open by default.
		 * @param {boolean} open Pass false to close
		 * @returns {this}
		 * @example
		 * gui.open(); // open
		 * gui.open( false ); // close
		 * gui.open( gui._closed ); // toggle
		 */
		open( open = true ) {

			this._setClosed( !open );

			this.$title.setAttribute( 'aria-expanded', !this._closed );
			this.domElement.classList.toggle( 'closed', this._closed );

			return this;

		}

		/**
		 * Closes the GUI.
		 * @returns {this}
		 */
		close() {
			return this.open( false );
		}

		_setClosed( closed ) {
			if ( this._closed === closed ) return;
			this._closed = closed;
			this._callOnOpenClose( this );
		}

		/**
		 * Shows the GUI after it's been hidden.
		 * @param {boolean} show
		 * @returns {this}
		 * @example
		 * gui.show();
		 * gui.show( false ); // hide
		 * gui.show( gui._hidden ); // toggle
		 */
		show( show = true ) {

			this._hidden = !show;

			this.domElement.style.display = this._hidden ? 'none' : '';

			return this;

		}

		/**
		 * Hides the GUI.
		 * @returns {this}
		 */
		hide() {
			return this.show( false );
		}

		openAnimated( open = true ) {

			// set state immediately
			this._setClosed( !open );

			this.$title.setAttribute( 'aria-expanded', !this._closed );

			// wait for next frame to measure $children
			requestAnimationFrame( () => {

				// explicitly set initial height for transition
				const initialHeight = this.$children.clientHeight;
				this.$children.style.height = initialHeight + 'px';

				this.domElement.classList.add( 'transition' );

				const onTransitionEnd = e => {
					if ( e.target !== this.$children ) return;
					this.$children.style.height = '';
					this.domElement.classList.remove( 'transition' );
					this.$children.removeEventListener( 'transitionend', onTransitionEnd );
				};

				this.$children.addEventListener( 'transitionend', onTransitionEnd );

				// todo: this is wrong if children's scrollHeight makes for a gui taller than maxHeight
				const targetHeight = !open ? 0 : this.$children.scrollHeight;

				this.domElement.classList.toggle( 'closed', !open );

				requestAnimationFrame( () => {
					this.$children.style.height = targetHeight + 'px';
				} );

			} );

			return this;

		}

		/**
		 * Change the title of this GUI.
		 * @param {string} title
		 * @returns {this}
		 */
		title( title ) {
			/**
			 * Current title of the GUI. Use `gui.title( 'Title' )` to modify this value.
			 * @type {string}
			 */
			this._title = title;
			this.$title.innerHTML = title;
			return this;
		}

		/**
		 * Resets all controllers to their initial values.
		 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
		 * @returns {this}
		 */
		reset( recursive = true ) {
			const controllers = recursive ? this.controllersRecursive() : this.controllers;
			controllers.forEach( c => c.reset() );
			return this;
		}

		/**
		 * Pass a function to be called whenever a controller in this GUI changes.
		 * @param {function({object:object, property:string, value:any, controller:Controller})} callback
		 * @returns {this}
		 * @example
		 * gui.onChange( event => {
		 * 	event.object     // object that was modified
		 * 	event.property   // string, name of property
		 * 	event.value      // new value of controller
		 * 	event.controller // controller that was modified
		 * } );
		 */
		onChange( callback ) {
			/**
			 * Used to access the function bound to `onChange` events. Don't modify this value
			 * directly. Use the `gui.onChange( callback )` method instead.
			 * @type {Function}
			 */
			this._onChange = callback;
			return this;
		}

		_callOnChange( controller ) {

			if ( this.parent ) {
				this.parent._callOnChange( controller );
			}

			if ( this._onChange !== undefined ) {
				this._onChange.call( this, {
					object: controller.object,
					property: controller.property,
					value: controller.getValue(),
					controller
				} );
			}
		}

		/**
		 * Pass a function to be called whenever a controller in this GUI has finished changing.
		 * @param {function({object:object, property:string, value:any, controller:Controller})} callback
		 * @returns {this}
		 * @example
		 * gui.onFinishChange( event => {
		 * 	event.object     // object that was modified
		 * 	event.property   // string, name of property
		 * 	event.value      // new value of controller
		 * 	event.controller // controller that was modified
		 * } );
		 */
		onFinishChange( callback ) {
			/**
			 * Used to access the function bound to `onFinishChange` events. Don't modify this value
			 * directly. Use the `gui.onFinishChange( callback )` method instead.
			 * @type {Function}
			 */
			this._onFinishChange = callback;
			return this;
		}

		_callOnFinishChange( controller ) {

			if ( this.parent ) {
				this.parent._callOnFinishChange( controller );
			}

			if ( this._onFinishChange !== undefined ) {
				this._onFinishChange.call( this, {
					object: controller.object,
					property: controller.property,
					value: controller.getValue(),
					controller
				} );
			}
		}

		/**
		 * Pass a function to be called when this GUI or its descendants are opened or closed.
		 * @param {function(GUI)} callback
		 * @returns {this}
		 * @example
		 * gui.onOpenClose( changedGUI => {
		 * 	console.log( changedGUI._closed );
		 * } );
		 */
		onOpenClose( callback ) {
			this._onOpenClose = callback;
			return this;
		}

		_callOnOpenClose( changedGUI ) {
			if ( this.parent ) {
				this.parent._callOnOpenClose( changedGUI );
			}

			if ( this._onOpenClose !== undefined ) {
				this._onOpenClose.call( this, changedGUI );
			}
		}

		/**
		 * Destroys all DOM elements and event listeners associated with this GUI
		 */
		destroy() {

			if ( this.parent ) {
				this.parent.children.splice( this.parent.children.indexOf( this ), 1 );
				this.parent.folders.splice( this.parent.folders.indexOf( this ), 1 );
			}

			if ( this.domElement.parentElement ) {
				this.domElement.parentElement.removeChild( this.domElement );
			}

			Array.from( this.children ).forEach( c => c.destroy() );

		}

		/**
		 * Returns an array of controllers contained by this GUI and its descendents.
		 * @returns {Controller[]}
		 */
		controllersRecursive() {
			let controllers = Array.from( this.controllers );
			this.folders.forEach( f => {
				controllers = controllers.concat( f.controllersRecursive() );
			} );
			return controllers;
		}

		/**
		 * Returns an array of folders contained by this GUI and its descendents.
		 * @returns {GUI[]}
		 */
		foldersRecursive() {
			let folders = Array.from( this.folders );
			this.folders.forEach( f => {
				folders = folders.concat( f.foldersRecursive() );
			} );
			return folders;
		}

	}

	exports.BooleanController = BooleanController;
	exports.ColorController = ColorController;
	exports.Controller = Controller;
	exports.FunctionController = FunctionController;
	exports.GUI = GUI;
	exports.NumberController = NumberController;
	exports.OptionController = OptionController;
	exports.StringController = StringController;
	exports.default = GUI;

	Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ 505:
/***/ ((module) => {

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Editor.coffee":
/*!***********************!*\
  !*** ./Editor.coffee ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ \"../node_modules/react-dom/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_EntitiesBar_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EntitiesBar.coffee */ \"./components/EntitiesBar.coffee\");\n/* harmony import */ var _components_AnimBar_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AnimBar.coffee */ \"./components/AnimBar.coffee\");\n/* harmony import */ var _components_ToolsBar_coffee__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ToolsBar.coffee */ \"./components/ToolsBar.coffee\");\n/* harmony import */ var _View_coffee__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./View.coffee */ \"./View.coffee\");\n/* harmony import */ var _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base-entities/Terrain.coffee */ \"./base-entities/Terrain.coffee\");\n/* harmony import */ var _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base-entities/Entity.coffee */ \"./base-entities/Entity.coffee\");\n/* harmony import */ var _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./structure/Pose.coffee */ \"./structure/Pose.coffee\");\n/* harmony import */ var _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./structure/BoneStructure.coffee */ \"./structure/BoneStructure.coffee\");\n/* harmony import */ var _structure_PolygonStructure_coffee__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./structure/PolygonStructure.coffee */ \"./structure/PolygonStructure.coffee\");\n/* harmony import */ var _helpers_coffee__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers.coffee */ \"./helpers.coffee\");\n/* harmony import */ var _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./entity-class-registry.coffee */ \"./entity-class-registry.coffee\");\n/* harmony import */ var _tools_coffee__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tools.coffee */ \"./tools.coffee\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./styles.css */ \"./styles.css\");\n/* harmony import */ var _jsMenus_jsMenus_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./jsMenus/jsMenus.js */ \"./jsMenus/jsMenus.js\");\n/* harmony import */ var _jsMenus_jsMenus_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./jsMenus/jsMenus.css */ \"./jsMenus/jsMenus.css\");\nvar Editor, Menu, MenuItem, TAU, fs, path,\n  indexOf = [].indexOf;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nTAU = Math.PI * 2;\n\n\n\n\n\n\n\nif (typeof nw !== \"undefined\" && nw !== null) {\n  ({Menu, MenuItem} = nw);\n} else {\n  Menu = _jsMenus_jsMenus_js__WEBPACK_IMPORTED_MODULE_15__.Menu;\n  MenuItem = _jsMenus_jsMenus_js__WEBPACK_IMPORTED_MODULE_15__.MenuItem;\n}\n\nfs = typeof window.require === \"function\" ? window.require(\"fs\") : void 0;\n\npath = typeof window.require === \"function\" ? window.require(\"path\") : void 0;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor = class Editor {\n  constructor(world, view1, view_to, canvas, mouse) {\n    var handle_scroll;\n    this.world = world;\n    this.view = view1;\n    this.view_to = view_to;\n    this.mouse = mouse;\n    this.previous_mouse_world_x = -2e308;\n    this.previous_mouse_world_y = -2e308;\n    this.editing = true;\n    this.selected_entities = [];\n    this.hovered_entities = [];\n    this.selected_points = [];\n    this.hovered_points = [];\n    this.hovered_segments = [];\n    this.selection_box = null;\n    this.editing_entity = null;\n    this.editing_entity_anim_name = null;\n    // @editing_entity_pose_name = null\n    // @editing_entity_animation_name = null\n    this.editing_entity_animation_frame_index = null;\n    this.dragging_points = [];\n    this.dragging_segments = [];\n    this.dragging_entities = [];\n    this.drag_offsets = [];\n    this.view_drag_start_in_world = null;\n    this.view_drag_momentum = {\n      x: 0,\n      y: 0\n    };\n    this.last_click_time = null;\n    this.tool = \"select\";\n    this.brush_size = 50;\n    // @sculpt_adding = no\n    // @sculpt_removing = no\n    this.brush_additive = true;\n    this.tool_active = false;\n    this.undos = [];\n    this.redos = [];\n    this.clipboard = {};\n    this.warning_message = null;\n    this.show_warning = false;\n    this.warning_tid = -1;\n    this.react_root_el = document.createElement(\"div\");\n    this.react_root_el.className = \"react-root\";\n    document.body.appendChild(this.react_root_el);\n    this.renderDOM();\n    if (fs != null) {\n      this.save_path = \"world.json\";\n    }\n    // @save_path = path.join(nw.App.dataPath, \"world.json\")\n    this.grab_start = null;\n    addEventListener(\"contextmenu\", (e) => {\n      var entity, menu, modifyPose, ref, ref1, ref2;\n      e.preventDefault();\n      if (!this.editing) {\n        return;\n      }\n      // Fix jsMenus bug if you right click on an existing menu.\n      // Menu.popdownAll?() # ugh that doesn't even work, breaks if there's no menu open\n      if ((ref = Menu._topmostMenu) != null) {\n        ref.popdown();\n      }\n      menu = new Menu();\n      \n      // if @selected_entities.length is 0\n      if (this.hovered_entities.length && (ref1 = this.hovered_entities[0], indexOf.call(this.selected_entities, ref1) < 0)) {\n        this.selected_entities = (function() {\n          var j, len, ref2, results;\n          ref2 = this.hovered_entities;\n          results = [];\n          for (j = 0, len = ref2.length; j < len; j++) {\n            entity = ref2[j];\n            results.push(entity);\n          }\n          return results;\n        }).call(this);\n      }\n      menu.append(new MenuItem({\n        label: 'Undo',\n        click: () => {\n          return this.undo();\n        },\n        enabled: this.undos.length\n      }));\n      menu.append(new MenuItem({\n        label: 'Redo',\n        click: () => {\n          return this.redo();\n        },\n        enabled: this.redos.length\n      }));\n      menu.append(new MenuItem({\n        type: 'separator'\n      }));\n      menu.append(new MenuItem({\n        label: 'Cut',\n        click: () => {\n          return this.cut();\n        },\n        enabled: this.selected_entities.length\n      }));\n      menu.append(new MenuItem({\n        label: 'Copy',\n        click: () => {\n          return this.copy();\n        },\n        enabled: this.selected_points.length || this.selected_entities.length\n      }));\n      menu.append(new MenuItem({\n        label: 'Paste',\n        click: () => {\n          return this.paste();\n        },\n        enabled: this.editing_entity ? this.clipboard.point_positions != null : (ref2 = this.clipboard.entities) != null ? ref2.length : void 0\n      }));\n      menu.append(new MenuItem({\n        label: 'Delete',\n        click: () => {\n          return this.delete();\n        },\n        enabled: this.selected_entities.length\n      }));\n      menu.append(new MenuItem({\n        label: 'Select All',\n        click: () => {\n          return this.selectAll();\n        },\n        enabled: this.world.entities.length\n      }));\n      menu.append(new MenuItem({\n        label: 'Select Same Type',\n        click: () => {\n          return this.selectAllSameType();\n        },\n        enabled: this.world.entities.length && this.selected_entities.length\n      }));\n      menu.append(new MenuItem({\n        type: 'separator'\n      }));\n      if (this.editing_entity) {\n        modifyPose = (fn) => {\n          var EntityClass, frame_index, new_pose, old_pose;\n          EntityClass = _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_12__.entityClasses[this.editing_entity._class_];\n          frame_index = this.editing_entity_animation_frame_index;\n          if (frame_index != null) {\n            old_pose = EntityClass.animations[this.editing_entity_anim_name][frame_index];\n          } else {\n            old_pose = this.editing_entity.structure.getPose();\n          }\n          new_pose = fn(old_pose);\n          this.editing_entity.structure.setPose(new_pose);\n          if (frame_index != null) {\n            EntityClass.animations[this.editing_entity_anim_name][frame_index] = new_pose;\n          } else {\n            EntityClass.poses[this.editing_entity_anim_name] = new_pose;\n          }\n          return _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_7__[\"default\"].saveAnimations(EntityClass);\n        };\n        \n        // TODO: allow flipping the current pose, just don't save it? or save the world where it's stored?\n        // also, allow flipping terrain\n        menu.append(new MenuItem({\n          label: 'Flip Pose Horizontally',\n          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== \"Current Pose\",\n          click: () => {\n            return modifyPose(_structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_8__[\"default\"].horizontallyFlip);\n          }\n        }));\n        menu.append(new MenuItem({\n          label: 'Flip Pose Vertically',\n          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== \"Current Pose\",\n          click: () => {\n            return modifyPose(_structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_8__[\"default\"].verticallyFlip);\n          }\n        }));\n        menu.append(new MenuItem({\n          type: 'separator'\n        }));\n        menu.append(new MenuItem({\n          label: 'Finish Editing Entity',\n          click: () => {\n            return this.finishEditingEntity();\n          }\n        }));\n      } else {\n        menu.append(new MenuItem({\n          label: 'Edit Entity',\n          click: () => {\n            return this.editEntity(this.selected_entities[0]);\n          },\n          enabled: this.selected_entities.length\n        }));\n      }\n      menu.popup(e.x, e.y);\n      return false;\n    });\n    handle_scroll = (e) => {\n      var current_center_x, current_center_y, current_scale, mouse_after_preliminary_scale, pivot, zoom_factor;\n      if (e.target !== canvas) {\n        return;\n      }\n      zoom_factor = 1.2;\n      current_scale = this.view.scale;\n      current_center_x = this.view.center_x;\n      current_center_y = this.view.center_y;\n      this.view.scale = this.view_to.scale;\n      this.view.center_x = this.view_to.center_x;\n      this.view.center_y = this.view_to.center_y;\n      pivot = this.view.toWorld({\n        x: e.clientX,\n        y: e.clientY\n      });\n      this.view_to.scale = e.detail < 0 || e.wheelDelta > 0 ? this.view_to.scale * zoom_factor : this.view_to.scale / zoom_factor;\n      this.view.scale = this.view_to.scale;\n      mouse_after_preliminary_scale = this.view.toWorld({\n        x: e.clientX,\n        y: e.clientY\n      });\n      this.view_to.center_x += pivot.x - mouse_after_preliminary_scale.x;\n      this.view_to.center_y += pivot.y - mouse_after_preliminary_scale.y;\n      this.view.scale = current_scale;\n      this.view.center_x = current_center_x;\n      return this.view.center_y = current_center_y;\n    };\n    addEventListener(\"mousewheel\", handle_scroll);\n    addEventListener(\"DOMMouseScroll\", handle_scroll);\n    addEventListener(\"keydown\", (e) => {\n      // console.log e.keyCode\n      if (e.target.tagName.match(/input|textarea|select|button/i)) {\n        return;\n      }\n      switch (e.keyCode) {\n        case 32:\n        case 80: // Space or P\n          return this.toggleEditing();\n        case 46: // Delete\n          return this.delete();\n        case 90: // Z\n          if (e.ctrlKey) {\n            if (e.shiftKey) {\n              return this.redo();\n            } else {\n              return this.undo();\n            }\n          }\n          break;\n        case 89: // Y\n          if (e.ctrlKey) {\n            return this.redo();\n          }\n          break;\n        case 88: // X\n          if (e.ctrlKey) {\n            return this.cut();\n          }\n          break;\n        case 67: // C\n          if (e.ctrlKey) {\n            return this.copy();\n          }\n          break;\n        case 86: // V\n          if (e.ctrlKey) {\n            return this.paste();\n          }\n          break;\n        case 65: // A\n          if (e.ctrlKey) {\n            return this.selectAll();\n          }\n      }\n    });\n  }\n\n  save() {\n    var json;\n    json = JSON.stringify(this.world, null, \"\\t\");\n    if (fs != null) {\n      return fs.writeFileSync(this.save_path, json);\n    } else {\n      return localStorage[\"Skele2D World\"] = json;\n    }\n  }\n\n  load() {\n    var e, json, req;\n    if (fs != null) {\n      json = fs.readFileSync(this.save_path);\n    } else {\n      json = localStorage[\"Skele2D World\"];\n    }\n    if (json) {\n      try {\n        this.world.fromJSON(JSON.parse(json));\n        return;\n      } catch (error1) {\n        e = error1;\n        this.warn(`Error loading saved world: ${e}`, 10000);\n      }\n    }\n    // fall back to loading the default world\n    req = new XMLHttpRequest();\n    req.addEventListener(\"error\", (e) => {\n      return this.warn(\"Error loading default world: the network request failed.\", 10000);\n    });\n    req.addEventListener(\"load\", (e) => {\n      var error;\n      if (req.status !== 200) {\n        this.warn(`Error loading default world: ${req.status} ${req.statusText}`, 10000);\n        return;\n      }\n      json = req.responseText;\n      if (json) {\n        try {\n          this.world.fromJSON(JSON.parse(json));\n        } catch (error1) {\n          error = error1;\n          return this.warn(`Error loading default world: ${error}`, 10000);\n        }\n      } else {\n        return this.warn(\"No default world loaded\", 10000);\n      }\n    });\n    req.open(\"GET\", \"world.json\");\n    return req.send();\n  }\n\n  discardSave() {\n    if (fs != null) {\n      return fs.unlinkSync(this.save_path);\n    } else {\n      return delete localStorage[\"Skele2D World\"];\n    }\n  }\n\n  savePose() {\n    var EntityClass;\n    if (this.editing_entity_anim_name && this.editing_entity_anim_name !== \"Current Pose\") {\n      EntityClass = _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_12__.entityClasses[this.editing_entity._class_];\n      if (this.editing_entity_animation_frame_index != null) {\n        EntityClass.animations[this.editing_entity_anim_name][this.editing_entity_animation_frame_index] = this.editing_entity.structure.getPose();\n      } else {\n        EntityClass.poses[this.editing_entity_anim_name] = this.editing_entity.structure.getPose();\n      }\n      return _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_7__[\"default\"].saveAnimations(EntityClass);\n    }\n  }\n\n  toJSON() {\n    var editing_entity_id, entity, point, point_name, ref, ref1, selected_entity_ids, selected_point_names;\n    // TODO: make animation stuff undoable\n    selected_entity_ids = (function() {\n      var j, len, ref, results;\n      ref = this.selected_entities;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        entity = ref[j];\n        results.push(entity.id);\n      }\n      return results;\n    }).call(this);\n    editing_entity_id = (ref = this.editing_entity) != null ? ref.id : void 0;\n    selected_point_names = [];\n    if (this.editing_entity != null) {\n      ref1 = this.editing_entity.structure.points;\n      for (point_name in ref1) {\n        point = ref1[point_name];\n        if (indexOf.call(this.selected_points, point) >= 0) {\n          selected_point_names.push(point_name);\n        }\n      }\n    }\n    return {world: this.world, selected_entity_ids, editing_entity_id, selected_point_names};\n  }\n\n  fromJSON(state) {\n    var entity, entity_id, j, k, len, len1, point_name, ref, ref1;\n    this.world.fromJSON(state.world);\n    this.hovered_entities = [];\n    this.hovered_points = [];\n    this.hovered_segments = [];\n    this.selected_entities = [];\n    this.selected_points = [];\n    ref = state.selected_entity_ids;\n    for (j = 0, len = ref.length; j < len; j++) {\n      entity_id = ref[j];\n      entity = this.world.getEntityByID(entity_id);\n      if (entity != null) {\n        this.selected_entities.push(entity);\n      }\n    }\n    this.editing_entity = this.world.getEntityByID(state.editing_entity_id);\n    if (this.editing_entity != null) {\n      ref1 = state.selected_point_names;\n      for (k = 0, len1 = ref1.length; k < len1; k++) {\n        point_name = ref1[k];\n        this.selected_points.push(this.editing_entity.structure.points[point_name]);\n      }\n      if (this.tool === \"paint\" && !(this.editing_entity instanceof _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_6__[\"default\"])) {\n        return this.tool = \"select\";\n      }\n    }\n  }\n\n  undoable(fn) {\n    this.undos.push(JSON.stringify(this));\n    this.redos = [];\n    if (fn != null) {\n      fn();\n      return this.save();\n    }\n  }\n\n  undo() {\n    if (this.editing) {\n      return this.undo_or_redo(this.undos, this.redos);\n    } else {\n      this.toggleEditing();\n      return this.undo();\n    }\n  }\n\n  // TODO: undo view too\n  redo() {\n    if (this.editing) {\n      return this.undo_or_redo(this.redos, this.undos);\n    }\n  }\n\n  undo_or_redo(undos, redos) {\n    if (undos.length === 0) {\n      return;\n    }\n    redos.push(JSON.stringify(this));\n    this.fromJSON(JSON.parse(undos.pop()));\n    return this.save();\n  }\n\n  selectAll() {\n    var entity, point, point_name;\n    if (this.editing_entity) {\n      return this.selected_points = (function() {\n        var ref, results;\n        ref = this.editing_entity.structure.points;\n        results = [];\n        for (point_name in ref) {\n          point = ref[point_name];\n          results.push(point);\n        }\n        return results;\n      }).call(this);\n    } else {\n      return this.selected_entities = (function() {\n        var j, len, ref, results;\n        ref = this.world.entities;\n        results = [];\n        for (j = 0, len = ref.length; j < len; j++) {\n          entity = ref[j];\n          results.push(entity);\n        }\n        return results;\n      }).call(this);\n    }\n  }\n\n  selectAllSameType() {\n    var entity, types;\n    types = this.editing_entity ? [this.editing_entity._class_] : (function() {\n      var j, len, ref, results;\n      ref = this.selected_entities;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        entity = ref[j];\n        results.push(entity._class_);\n      }\n      return results;\n    }).call(this);\n    this.finishEditingEntity();\n    return this.selected_entities = (function() {\n      var j, len, ref, ref1, results;\n      ref = this.world.entities;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        entity = ref[j];\n        if (ref1 = entity._class_, indexOf.call(types, ref1) >= 0) {\n          results.push(entity);\n        }\n      }\n      return results;\n    }).call(this);\n  }\n\n  delete() {\n    var dummy_ctx, dummy_view, e, entity, j, len, original_ent_def, original_redos, original_world_state, plural, point, point_name, ref, ref1, ref2, ref3, ref4, segment, segment_name;\n    if (this.selected_points.length) {\n      plural = this.selected_points.length > 1;\n      original_redos = [...this.redos];\n      // Not using callback version so that it doesn't\n      // save until it's verified that the entity can be drawn & stepped\n      this.undoable();\n      ref = this.editing_entity.structure.segments;\n      for (segment_name in ref) {\n        segment = ref[segment_name];\n        if ((ref1 = segment.a, indexOf.call(this.selected_points, ref1) >= 0) || (ref2 = segment.b, indexOf.call(this.selected_points, ref2) >= 0)) {\n          delete this.editing_entity.structure.segments[segment_name];\n        }\n      }\n      ref3 = this.editing_entity.structure.points;\n      for (point_name in ref3) {\n        point = ref3[point_name];\n        if (indexOf.call(this.selected_points, point) >= 0) {\n          delete this.editing_entity.structure.points[point_name];\n        }\n      }\n      this.selected_points = [];\n      this.dragging_points = [];\n      dummy_ctx = document.createElement(\"canvas\").getContext(\"2d\");\n      dummy_view = new _View_coffee__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n      try {\n        this.editing_entity.draw(dummy_ctx, dummy_view);\n      } catch (error1) {\n        e = error1;\n        this.undo();\n        this.redos = original_redos;\n        if (typeof console !== \"undefined\" && console !== null) {\n          if (typeof console.warn === \"function\") {\n            console.warn(\"Entity failed to draw after deletion, with\", e);\n          }\n        }\n        if (plural) {\n          alert(\"Entity needs one or more of those points to render\");\n        } else {\n          alert(\"Entity needs that point to render\");\n        }\n        return;\n      }\n      try {\n        // Entity::step() is allowed to modify other entities,\n        // so we need to save/restore the whole world state.\n        // However, we also need to either preserve or update the reference to the entity being edited,\n        // so that the visible entity's version of the structure doesn't desynchronize from the editor's.\n\n        // TODO: I could also add a flag, either as a parameter to step() or globally,\n        // that says whether or not it's safe to perform major side effects\n        // such as saving the game when reaching a checkpoint,\n        // playing a sound,\n        // starting a cinematic that runs using setTimeout() rather than properties on entities (problematic for playing well with pausing anyways),\n        // or causing a screen shake effect — things that are outside the world state.\n        original_ent_def = JSON.parse(JSON.stringify(this.editing_entity));\n        original_world_state = JSON.parse(JSON.stringify(this.world));\n        this.editing_entity.step(this.world);\n        this.world.fromJSON(original_world_state);\n        ref4 = this.world.entities;\n        // world.fromJSON doesn't preserve the same instance of the Entity\n        // Find the old new instance and replace it with the original with the same ID\n        // Alternatively, something like this might work: @editing_entity = @world.getEntityByID(original_ent_def.id)\n        // But I'd also need to update @selected_entities and @selected_points, maybe @hovered_entities and @hovered_points too...\n        // This is ugly but hopefully robust\n        for (j = 0, len = ref4.length; j < len; j++) {\n          entity = ref4[j];\n          if (entity.id === this.editing_entity.id) {\n            this.world.entities.splice(this.world.entities.indexOf(entity), 1, this.editing_entity);\n            break;\n          }\n        }\n        // and restore the entity's state\n        this.editing_entity.fromJSON(original_ent_def);\n      } catch (error1) {\n        e = error1;\n        this.undo();\n        this.redos = original_redos;\n        if (typeof console !== \"undefined\" && console !== null) {\n          if (typeof console.warn === \"function\") {\n            console.warn(\"Entity failed to step after deletion, with\", e);\n          }\n        }\n        if (plural) {\n          alert(\"Entity needs one or more of those points to step\");\n        } else {\n          alert(\"Entity needs that point to step\");\n        }\n        return;\n      }\n      return this.save();\n    } else if (this.selected_entities.length) {\n      return this.undoable(() => {\n        var index, k, len1, ref5;\n        ref5 = this.selected_entities;\n        for (k = 0, len1 = ref5.length; k < len1; k++) {\n          entity = ref5[k];\n          // entity.destroy()\n          entity.destroyed = true;\n          index = this.world.entities.indexOf(entity);\n          if (index >= 0) {\n            this.world.entities.splice(index, 1);\n          }\n        }\n        this.selected_entities = [];\n        return this.finishEditingEntity();\n      });\n    }\n  }\n\n  cut() {\n    this.copy();\n    return this.delete();\n  }\n\n  copy() {\n    var entity;\n    if (this.selected_points.length) {\n      return alert(\"Copying points is not supported\");\n    } else {\n      // clipboard.point_positions = {}\n      return this.clipboard.entities = (function() {\n        var j, len, ref, results;\n        ref = this.selected_entities;\n        results = [];\n        for (j = 0, len = ref.length; j < len; j++) {\n          entity = ref[j];\n          results.push({\n            json: JSON.stringify(entity)\n          });\n        }\n        return results;\n      }).call(this);\n    }\n  }\n\n  paste() {\n    if (this.editing_entity) {\n      return alert(\"Pasting points is not supported\");\n    } else {\n      return this.undoable(() => {\n        var center, centroid, centroid_in_world, centroids, divisor, ent_def, entity, j, json, k, len, len1, mouse_in_world, new_entities, point, point_name, ref, results;\n        if (!((ref = this.clipboard.entities) != null ? ref.length : void 0)) {\n          this.warn(\"Nothing on clipboard\");\n          return;\n        }\n        this.selected_entities = [];\n        new_entities = (function() {\n          var j, len, ref1, results;\n          ref1 = this.clipboard.entities;\n          results = [];\n          for (j = 0, len = ref1.length; j < len; j++) {\n            ({json} = ref1[j]);\n            ent_def = JSON.parse(json);\n            delete ent_def.id;\n            entity = _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_7__[\"default\"].fromJSON(ent_def);\n            this.world.entities.push(entity);\n            this.selected_entities.push(entity);\n            results.push(entity);\n          }\n          return results;\n        }).call(this);\n        centroids = (function() {\n          var j, len, ref1, results;\n          results = [];\n          for (j = 0, len = new_entities.length; j < len; j++) {\n            entity = new_entities[j];\n            centroid = {\n              x: 0,\n              y: 0\n            };\n            divisor = 0;\n            ref1 = entity.structure.points;\n            for (point_name in ref1) {\n              point = ref1[point_name];\n              centroid.x += point.x;\n              centroid.y += point.y;\n              divisor += 1;\n            }\n            centroid.x /= divisor;\n            centroid.y /= divisor;\n            centroid_in_world = entity.toWorld(centroid);\n            results.push(centroid_in_world);\n          }\n          return results;\n        })();\n        center = {\n          x: 0,\n          y: 0\n        };\n        for (j = 0, len = centroids.length; j < len; j++) {\n          centroid = centroids[j];\n          center.x += centroid.x;\n          center.y += centroid.y;\n        }\n        center.x /= centroids.length;\n        center.y /= centroids.length;\n        mouse_in_world = this.view.toWorld(this.mouse);\n        results = [];\n        for (k = 0, len1 = new_entities.length; k < len1; k++) {\n          entity = new_entities[k];\n          entity.x += mouse_in_world.x - center.x;\n          results.push(entity.y += mouse_in_world.y - center.y);\n        }\n        return results;\n      });\n    }\n  }\n\n  toggleEditing() {\n    if (this.editing) {\n      this.undoable();\n    }\n    this.editing = !this.editing;\n    return this.renderDOM();\n  }\n\n  step() {\n    var base, base1, closest_dist, closest_entity, dist, entity, entity_within_selection_box, i, j, k, l, len, len1, len2, local_mouse_position, m, min_grab_dist, mouse_in_world, mouse_world_delta_x, mouse_world_delta_y, point, point_name, point_within_selection_box, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, segment, segment_name;\n    mouse_in_world = this.view.toWorld(this.mouse);\n    if (this.mouse.LMB.released) {\n      if (this.dragging_points.length || this.tool_active) {\n        this.dragging_points = [];\n        this.tool_active = false;\n        this.savePose();\n        this.save();\n      }\n      if (this.dragging_entities.length) {\n        this.save();\n        this.dragging_entities = [];\n      }\n      if (this.selection_box) {\n        if (this.editing_entity) {\n          this.selected_points = (function() {\n            var j, len, ref, results;\n            ref = this.hovered_points;\n            results = [];\n            for (j = 0, len = ref.length; j < len; j++) {\n              entity = ref[j];\n              results.push(entity);\n            }\n            return results;\n          }).call(this);\n        } else {\n          this.selected_entities = (function() {\n            var j, len, ref, results;\n            ref = this.hovered_entities;\n            results = [];\n            for (j = 0, len = ref.length; j < len; j++) {\n              entity = ref[j];\n              results.push(entity);\n            }\n            return results;\n          }).call(this);\n        }\n        this.selection_box = null;\n      }\n    }\n    \n    // min_grab_dist = (5 + 5 / Math.min(@view.scale, 1)) / 2\n    // min_grab_dist = 8 / Math.min(@view.scale, 5)\n    min_grab_dist = 8 / this.view.scale;\n    // console.log @view.scale, min_grab_dist\n    point_within_selection_box = (entity, point) => {\n      var ref, ref1, ref2, ref3, relative_max_x, relative_max_y, relative_min_x, relative_min_y, relative_x1, relative_x2, relative_y1, relative_y2;\n      relative_x1 = this.selection_box.x1 - entity.x;\n      relative_y1 = this.selection_box.y1 - entity.y;\n      relative_x2 = this.selection_box.x2 - entity.x;\n      relative_y2 = this.selection_box.y2 - entity.y;\n      relative_min_x = Math.min(relative_x1, relative_x2);\n      relative_max_x = Math.max(relative_x1, relative_x2);\n      relative_min_y = Math.min(relative_y1, relative_y2);\n      relative_max_y = Math.max(relative_y1, relative_y2);\n      return (relative_min_x <= (ref = point.x) && ref <= relative_max_x) && (relative_min_y <= (ref1 = point.y) && ref1 <= relative_max_y) && (relative_min_x <= (ref2 = point.x) && ref2 <= relative_max_x) && (relative_min_y <= (ref3 = point.y) && ref3 <= relative_max_y);\n    };\n    entity_within_selection_box = (entity) => {\n      var ref, ref1, ref2, ref3, ref4, relative_max_x, relative_max_y, relative_min_x, relative_min_y, relative_x1, relative_x2, relative_y1, relative_y2, segment, segment_name;\n      relative_x1 = this.selection_box.x1 - entity.x;\n      relative_y1 = this.selection_box.y1 - entity.y;\n      relative_x2 = this.selection_box.x2 - entity.x;\n      relative_y2 = this.selection_box.y2 - entity.y;\n      relative_min_x = Math.min(relative_x1, relative_x2);\n      relative_max_x = Math.max(relative_x1, relative_x2);\n      relative_min_y = Math.min(relative_y1, relative_y2);\n      relative_max_y = Math.max(relative_y1, relative_y2);\n      if (Object.keys(entity.structure.segments).length === 0) {\n        return false;\n      }\n      ref = entity.structure.segments;\n      for (segment_name in ref) {\n        segment = ref[segment_name];\n        if (!((relative_min_x <= (ref1 = segment.a.x) && ref1 <= relative_max_x) && (relative_min_y <= (ref2 = segment.a.y) && ref2 <= relative_max_y) && (relative_min_x <= (ref3 = segment.b.x) && ref3 <= relative_max_x) && (relative_min_y <= (ref4 = segment.b.y) && ref4 <= relative_max_y))) {\n          return false;\n        }\n      }\n      return true;\n    };\n    this.view.center_x -= this.view_drag_momentum.x;\n    this.view.center_y -= this.view_drag_momentum.y;\n    this.view_to.center_x -= this.view_drag_momentum.x;\n    this.view_to.center_y -= this.view_drag_momentum.y;\n    this.view_drag_momentum.x *= 0.8;\n    this.view_drag_momentum.y *= 0.8;\n    this.dragging_points = (function() {\n      var j, len, ref, results;\n      ref = this.dragging_points;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        point = ref[j];\n        results.push(this.editing_entity.structure.points[point.name]);\n      }\n      return results;\n    }).call(this);\n    this.selected_points = (function() {\n      var j, len, ref, results;\n      ref = this.selected_points;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        point = ref[j];\n        results.push(this.editing_entity.structure.points[point.name]);\n      }\n      return results;\n    }).call(this);\n    if (this.view_drag_start_in_world) {\n      if (this.mouse.MMB.down) {\n        this.view.center_x -= mouse_in_world.x - this.view_drag_start_in_world.x;\n        this.view.center_y -= mouse_in_world.y - this.view_drag_start_in_world.y;\n        this.view_to.center_x = this.view.center_x;\n        this.view_to.center_y = this.view.center_y;\n        this.view_drag_momentum.x = 0;\n        this.view_drag_momentum.y = 0;\n      } else {\n        this.view_drag_momentum.x = mouse_in_world.x - this.view_drag_start_in_world.x;\n        this.view_drag_momentum.y = mouse_in_world.y - this.view_drag_start_in_world.y;\n        this.view_drag_start_in_world = null;\n      }\n    } else if (this.mouse.MMB.pressed) {\n      this.view_drag_start_in_world = {\n        x: mouse_in_world.x,\n        y: mouse_in_world.y\n      };\n    } else if (this.mouse.double_clicked) {\n      // TODO: reject double clicks where the first click was not on the same entity\n      // TODO: reject double click and drag\n      if (this.hovered_entities.length) {\n        if (ref = this.hovered_entities[0], indexOf.call(this.selected_entities, ref) >= 0) {\n          this.editEntity(this.hovered_entities[0]);\n        }\n      } else {\n        // TODO: don't exit editing mode if the entity being edited is hovered\n        // except there needs to be a visual indication of hover for the editing entity\n        // (there would be with the cursor if you could drag segments)\n        // unless @editing_entity? and @distanceToEntity(@editing_entity, mouse_in_world) < min_grab_dist\n        /*\n        This needs hover feedback. I implemented it mainly as a stepping stone\n        for the paint tool. (I needed to figure out how to splice in new points,\n        and this was a simple feature to implement.)\n\n        else if @hovered_segments.length\n         * Add a point to the hovered segment, near the mouse.\n        \tsegment = @hovered_segments[0]\n        \tif @editing_entity?.structure instanceof PolygonStructure\n        \t\t@undoable =>\n        \t\t\tnew_point = closestPointOnLineSegment(mouse_in_world, segment.a, segment.b)\n        \t\t\tvertices = @editing_entity.structure.toJSON().points\n        \t\t\tindex_a = Object.values(@editing_entity.structure.points).indexOf(segment.a)\n        \t\t\tindex_b = Object.values(@editing_entity.structure.points).indexOf(segment.b)\n        \t\t\tindex = Math.min(index_a, index_b) + 1\n        \t\t\tvertices.splice(index, 0, new_point)\n        \t\t\t@editing_entity.structure.fromJSON({points: vertices})\n         */\n        this.finishEditingEntity();\n      }\n    } else if (this.dragging_entities.length) {\n      ref1 = this.dragging_entities;\n      for (i = j = 0, len = ref1.length; j < len; i = ++j) {\n        entity = ref1[i];\n        entity.x = mouse_in_world.x + this.drag_offsets[i].x;\n        entity.y = mouse_in_world.y + this.drag_offsets[i].y;\n      }\n    } else if (this.dragging_points.length) {\n      local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);\n      ref2 = this.dragging_points;\n      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {\n        point = ref2[i];\n        point.x = local_mouse_position.x + this.drag_offsets[i].x;\n        point.y = local_mouse_position.y + this.drag_offsets[i].y;\n      }\n      if (typeof (base = this.editing_entity.structure).signalChange === \"function\") {\n        base.signalChange();\n      }\n    } else if (this.dragging_segments.length) {\n\n    // TODO\n    } else if (this.selection_box) {\n      this.selection_box.x2 = mouse_in_world.x;\n      this.selection_box.y2 = mouse_in_world.y;\n      if (this.editing_entity) {\n        this.hovered_points = (function() {\n          var ref3, results;\n          ref3 = this.editing_entity.structure.points;\n          results = [];\n          for (point_name in ref3) {\n            point = ref3[point_name];\n            if (point_within_selection_box(this.editing_entity, point)) {\n              results.push(point);\n            }\n          }\n          return results;\n        }).call(this);\n      } else {\n        // This causes adding points with double click not to work\n        // and it's not used for anything at the moment\n        // @hovered_segments = (segment for segment_name, segment of @editing_entity.structure.segments when segment.a in @hovered_points and segment.b in @hovered_points)\n        this.hovered_entities = (function() {\n          var l, len2, ref3, results;\n          ref3 = this.world.entities;\n          results = [];\n          for (l = 0, len2 = ref3.length; l < len2; l++) {\n            entity = ref3[l];\n            if (entity_within_selection_box(entity)) {\n              results.push(entity);\n            }\n          }\n          return results;\n        }).call(this);\n      }\n    } else if (this.grab_start) {\n      if (this.mouse.LMB.down) {\n        if ((0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_11__.distance)(this.mouse, this.grab_start) > 2) {\n          if (this.selected_points.length) {\n            this.dragPoints(this.selected_points, this.grab_start_in_world);\n          } else if (this.selected_entities.length) {\n            this.dragEntities(this.selected_entities, this.grab_start_in_world);\n          }\n          this.grab_start = null;\n        }\n      } else {\n        this.grab_start = null;\n      }\n    } else if (this.tool_active) {\n      if (this.mouse.LMB.down) {\n        mouse_world_delta_x = mouse_in_world.x - this.previous_mouse_world_x;\n        mouse_world_delta_y = mouse_in_world.y - this.previous_mouse_world_y;\n        (0,_tools_coffee__WEBPACK_IMPORTED_MODULE_13__.run_tool)(this.tool, this.editing_entity, mouse_in_world, mouse_world_delta_x, mouse_world_delta_y, this.brush_size, this.brush_additive);\n        if (((function() {\n          try {\n            return localStorage[\"Skele2D disable tool continuity\"];\n          } catch (error1) {}\n        })()) === \"true\") {\n          this.tool_active = false;\n        }\n      } else {\n        this.tool_active = false;\n      }\n    } else {\n      this.hovered_entities = [];\n      this.hovered_points = [];\n      this.hovered_segments = [];\n      if (this.editing_entity) {\n        local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);\n        if (this.tool === \"select\") {\n          closest_dist = 2e308;\n          ref3 = this.editing_entity.structure.points;\n          for (point_name in ref3) {\n            point = ref3[point_name];\n            dist = (0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_11__.distance)(local_mouse_position, point);\n            if (dist < min_grab_dist && dist < closest_dist) {\n              closest_dist = dist;\n              this.hovered_points = [point];\n            }\n          }\n          if (!this.hovered_points.length) {\n            closest_dist = 2e308;\n            ref4 = this.editing_entity.structure.segments;\n            for (segment_name in ref4) {\n              segment = ref4[segment_name];\n              dist = (0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_11__.distanceToLineSegment)(local_mouse_position, segment.a, segment.b);\n              if (dist < ((ref5 = segment.width) != null ? ref5 : 5) && dist < closest_dist) {\n                closest_dist = dist;\n                this.hovered_segments = [segment];\n              }\n            }\n          }\n        } else {\n          this.brush_additive = typeof (base1 = this.editing_entity.structure).pointInPolygon === \"function\" ? base1.pointInPolygon(local_mouse_position) : void 0;\n        }\n      } else {\n        closest_dist = 2e308;\n        closest_entity = null;\n        ref6 = this.world.entities;\n        for (l = 0, len2 = ref6.length; l < len2; l++) {\n          entity = ref6[l];\n          dist = this.distanceToEntity(entity, mouse_in_world);\n          if (dist < min_grab_dist && (dist < closest_dist || (!(entity instanceof _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_6__[\"default\"]) && closest_entity instanceof _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_6__[\"default\"]))) {\n            closest_entity = entity;\n            closest_dist = dist;\n          }\n        }\n        if (closest_entity != null) {\n          this.hovered_entities = [closest_entity];\n        }\n      }\n      if (this.mouse.LMB.pressed) {\n        this.dragging_points = [];\n        this.dragging_segments = [];\n        if (this.editing_entity && this.tool !== \"select\") {\n          this.undoable();\n          this.tool_active = true;\n        } else {\n          if (this.hovered_points.length) {\n            if (ref7 = this.hovered_points[0], indexOf.call(this.selected_points, ref7) >= 0) {\n              this.grabPoints(this.selected_points, mouse_in_world);\n            } else {\n              this.grabPoints(this.hovered_points, mouse_in_world);\n            }\n          } else {\n            this.selected_points = [];\n            if (this.hovered_entities.length) {\n              if (ref8 = this.hovered_entities[0], indexOf.call(this.selected_entities, ref8) >= 0) {\n                this.grabEntities(this.selected_entities, mouse_in_world);\n              } else {\n                this.grabEntities(this.hovered_entities, mouse_in_world);\n              }\n            } else {\n              this.selection_box = {\n                x1: mouse_in_world.x,\n                y1: mouse_in_world.y,\n                x2: mouse_in_world.x,\n                y2: mouse_in_world.y\n              };\n            }\n          }\n        }\n      }\n    }\n    if (this.editing_entity) {\n      if (this.editing_entity.structure instanceof _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_9__[\"default\"]) {\n        if (((function() {\n          try {\n            // TODO: and if there isn't an animation frame loaded\n            return localStorage[\"Skele2D disable constraint solving\"];\n          } catch (error1) {}\n        })()) !== \"true\") {\n          for (var m = 0; m <= 250; m++) {\n            this.editing_entity.structure.stepLayout();\n          }\n        }\n      }\n    }\n    // TODO: save afterwards at some point\n    this.previous_mouse_world_x = mouse_in_world.x;\n    return this.previous_mouse_world_y = mouse_in_world.y;\n  }\n\n  editEntity(entity) {\n    this.editing_entity = entity;\n    this.selected_entities = [entity];\n    if (this.tool === \"paint\" && !(this.editing_entity instanceof _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_6__[\"default\"])) {\n      return this.tool = \"select\";\n    }\n  }\n\n  finishEditingEntity() {\n    this.editing_entity = null;\n    this.selected_entities = [];\n    this.selected_points = [];\n    this.dragging_entities = [];\n    this.dragging_points = [];\n    return this.tool_active = false;\n  }\n\n  distanceToEntity(entity, from_point_in_world) {\n    var closest_dist, dist, from_point, point, point_name, ref, ref1, segment, segment_name;\n    from_point = entity.fromWorld(from_point_in_world);\n    closest_dist = 2e308;\n    ref = entity.structure.segments;\n    for (segment_name in ref) {\n      segment = ref[segment_name];\n      dist = (0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_11__.distanceToLineSegment)(from_point, segment.a, segment.b);\n      // dist = Math.max(0, dist - segment.width / 2) if segment.width?\n      closest_dist = Math.min(closest_dist, dist);\n    }\n    ref1 = entity.structure.points;\n    for (point_name in ref1) {\n      point = ref1[point_name];\n      dist = (0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_11__.distance)(from_point, point);\n      // dist = Math.max(0, dist - segment.radius) if segment.radius?\n      closest_dist = Math.min(closest_dist, dist);\n    }\n    return closest_dist;\n  }\n\n  grabPoints(points, mouse_in_world) {\n    var EntityClass, local_mouse_position, point;\n    if (this.editing_entity && this.editing_entity_anim_name === \"Current Pose\") {\n      EntityClass = _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_12__.entityClasses[this.editing_entity._class_];\n      if ((EntityClass.poses != null) || (EntityClass.animations != null)) {\n        this.warn(\"No pose is selected. Select a pose to edit.\");\n        if (((function() {\n          try {\n            return localStorage[\"Skele2D allow posing animatable entities in world\"];\n          } catch (error1) {}\n        })()) !== \"true\") {\n          return;\n        }\n      }\n    }\n    this.grab_start = {\n      x: this.mouse.x,\n      y: this.mouse.y\n    };\n    this.grab_start_in_world = mouse_in_world;\n    this.selected_points = (function() {\n      var j, len, results;\n      results = [];\n      for (j = 0, len = points.length; j < len; j++) {\n        point = points[j];\n        results.push(point);\n      }\n      return results;\n    })();\n    local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);\n    return this.drag_offsets = (function() {\n      var j, len, ref, results;\n      ref = this.dragging_points;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        point = ref[j];\n        results.push({\n          x: point.x - local_mouse_position.x,\n          y: point.y - local_mouse_position.y\n        });\n      }\n      return results;\n    }).call(this);\n  }\n\n  dragPoints(points, mouse_in_world) {\n    var local_mouse_position, point;\n    this.selected_points = (function() {\n      var j, len, results;\n      results = [];\n      for (j = 0, len = points.length; j < len; j++) {\n        point = points[j];\n        results.push(point);\n      }\n      return results;\n    })();\n    this.undoable();\n    this.dragging_points = (function() {\n      var j, len, results;\n      results = [];\n      for (j = 0, len = points.length; j < len; j++) {\n        point = points[j];\n        results.push(point);\n      }\n      return results;\n    })();\n    local_mouse_position = this.editing_entity.fromWorld(mouse_in_world);\n    return this.drag_offsets = (function() {\n      var j, len, ref, results;\n      ref = this.dragging_points;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        point = ref[j];\n        results.push({\n          x: point.x - local_mouse_position.x,\n          y: point.y - local_mouse_position.y\n        });\n      }\n      return results;\n    }).call(this);\n  }\n\n  grabEntities(entities, mouse_in_world) {\n    var entity;\n    this.grab_start = {\n      x: this.mouse.x,\n      y: this.mouse.y\n    };\n    this.grab_start_in_world = mouse_in_world;\n    this.selected_entities = (function() {\n      var j, len, results;\n      results = [];\n      for (j = 0, len = entities.length; j < len; j++) {\n        entity = entities[j];\n        results.push(entity);\n      }\n      return results;\n    })();\n    return this.drag_offsets = (function() {\n      var j, len, ref, results;\n      ref = this.dragging_entities;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        entity = ref[j];\n        if (mouse_in_world != null) {\n          results.push({\n            x: entity.x - mouse_in_world.x,\n            y: entity.y - mouse_in_world.y\n          });\n        } else {\n          results.push({\n            x: 0,\n            y: 0\n          });\n        }\n      }\n      return results;\n    }).call(this);\n  }\n\n  dragEntities(entities, mouse_in_world) {\n    var entity;\n    this.selected_entities = (function() {\n      var j, len, results;\n      results = [];\n      for (j = 0, len = entities.length; j < len; j++) {\n        entity = entities[j];\n        results.push(entity);\n      }\n      return results;\n    })();\n    this.undoable();\n    this.dragging_entities = (function() {\n      var j, len, results;\n      results = [];\n      for (j = 0, len = entities.length; j < len; j++) {\n        entity = entities[j];\n        results.push(entity);\n      }\n      return results;\n    })();\n    return this.drag_offsets = (function() {\n      var j, len, ref, results;\n      ref = this.dragging_entities;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        entity = ref[j];\n        if (mouse_in_world != null) {\n          results.push({\n            x: entity.x - mouse_in_world.x,\n            y: entity.y - mouse_in_world.y\n          });\n        } else {\n          results.push({\n            x: 0,\n            y: 0\n          });\n        }\n      }\n      return results;\n    }).call(this);\n  }\n\n  draw(ctx, view) {\n    var bbox, draw_points, draw_segments, entity, j, k, l, len, len1, len2, len3, m, mouse_in_world, point, ref, ref1, ref2, ref3, ref4, show_indices_enabled, show_names_option;\n    show_indices_enabled = ((function() {\n      try {\n        return localStorage[\"Skele2D show indices\"];\n      } catch (error1) {}\n    })()) === \"true\";\n    show_names_option = ((function() {\n      try {\n        return localStorage[\"Skele2D show names\"];\n      } catch (error1) {}\n    })());\n    draw_points = (entity, radius, fillStyle) => {\n      var center, first, height, highlight_first_and_last, index, keys, last, point, point_name, ref, ref1, results, show_indices, show_names, side, width, x_padding, y_padding, y_side;\n      show_names = (show_names_option === \"always\" || show_names_option === \"hovered-or-selected\") || ((show_names_option === \"editing\" || show_names_option === \"true\") && entity === this.editing_entity);\n      show_indices = show_indices_enabled && entity === this.editing_entity;\n      highlight_first_and_last = show_indices;\n      if (highlight_first_and_last || show_indices) {\n        keys = Object.keys(entity.structure.points);\n      }\n      if (show_names) {\n        center = {\n          x: 0,\n          y: 0\n        };\n        ref = entity.structure.points;\n        for (point_name in ref) {\n          point = ref[point_name];\n          center.x += point.x;\n          center.y += point.y;\n        }\n        center.x /= Object.keys(entity.structure.points).length;\n        center.y /= Object.keys(entity.structure.points).length;\n      }\n      ref1 = entity.structure.points;\n      results = [];\n      for (point_name in ref1) {\n        point = ref1[point_name];\n        if (highlight_first_and_last) {\n          first = point_name === keys[0];\n          last = point_name === keys[keys.length - 1];\n          if (first || last) {\n            ctx.beginPath();\n            ctx.arc(point.x, point.y, radius * 2 / view.scale, 0, TAU);\n            ctx.fillStyle = first ? \"lime\" : \"blue\";\n            ctx.fill();\n          }\n        }\n        if (show_names) {\n          side = point.x > center.x ? 1 : -1;\n          y_side = point.y > center.y ? 1 : -1;\n          ctx.font = \"20px sans-serif\";\n          ctx.save();\n          ctx.translate(point.x, point.y);\n          ctx.scale(1 / view.scale, 1 / view.scale);\n          ctx.textAlign = side === 1 ? \"left\" : \"right\";\n          width = ctx.measureText(point_name).width;\n          height = 20;\n          x_padding = 20;\n          y_padding = 5;\n          ctx.strokeStyle = \"black\";\n          ctx.lineWidth = 2;\n          ctx.beginPath();\n          ctx.moveTo(0, 0);\n          ctx.translate(side * 60, y_side * 30);\n          ctx.lineTo(0, 0);\n          ctx.stroke();\n          ctx.fillStyle = \"rgba(0, 0, 0, 0.5)\";\n          ctx.fillRect(0, -(height + y_padding) / 2, side * (width + x_padding * 2), height + y_padding * 2);\n          ctx.fillStyle = \"white\";\n          ctx.textBaseline = \"middle\";\n          ctx.fillText(point_name, side * x_padding, height / 2 - y_padding);\n          ctx.restore();\n        }\n        if (show_indices) {\n          index = keys.indexOf(point_name);\n          width = ctx.measureText(index).width;\n          ctx.font = \"10px sans-serif\";\n          // ctx.fillStyle = \"rgba(0, 0, 0, 0.5)\"\n          ctx.fillStyle = `hsla(${index * 360 / keys.length}, 100%, 50%, 0.5)`;\n          // ctx.fillRect(point.x, point.y, width + radius*2, 12)\n          // ctx.fillStyle = \"red\"\n          // ctx.fillText(index, point.x + radius, point.y + 10)\n          ctx.save();\n          ctx.translate(point.x, point.y);\n          ctx.scale(3 / view.scale, 3 / view.scale);\n          ctx.rotate(index * TAU / 4 / keys.length - TAU / 4 / 2);\n          x_padding = 20;\n          // ctx.fillRect(0, 0, width + x_padding*2, 12)\n          ctx.beginPath();\n          ctx.moveTo(0, 0);\n          ctx.lineTo(width + x_padding, 0);\n          ctx.arc(width + x_padding, 6, 6, -TAU / 4, TAU / 4);\n          ctx.lineTo(x_padding, 12);\n          // ctx.lineTo(0, 0)\n          // ctx.quadraticCurveTo(x_padding/2, 12, 0, 0)\n          ctx.bezierCurveTo(x_padding / 2, 12, x_padding / 2, 0, 0, 0);\n          ctx.fill();\n          ctx.fillStyle = \"white\";\n          ctx.fillText(index, x_padding, 10);\n          ctx.restore();\n        }\n        ctx.beginPath();\n        ctx.arc(point.x, point.y, radius / view.scale, 0, TAU);\n        // ctx.lineWidth = 1 / view.scale\n        // ctx.strokeStyle = \"black\"\n        // ctx.stroke()\n        ctx.fillStyle = fillStyle;\n        results.push(ctx.fill());\n      }\n      return results;\n    };\n    // ctx.fillText(point_name, point.x + radius * 2, point.y)\n    draw_segments = (entity, lineWidth, strokeStyle) => {\n      var ref, results, segment, segment_name;\n      ref = entity.structure.segments;\n      results = [];\n      for (segment_name in ref) {\n        segment = ref[segment_name];\n        ctx.beginPath();\n        ctx.moveTo(segment.a.x, segment.a.y);\n        ctx.lineTo(segment.b.x, segment.b.y);\n        ctx.lineWidth = lineWidth / view.scale;\n        ctx.lineCap = \"round\";\n        ctx.strokeStyle = strokeStyle;\n        results.push(ctx.stroke());\n      }\n      return results;\n    };\n    if (this.editing_entity) {\n      ctx.save();\n      ctx.translate(this.editing_entity.x, this.editing_entity.y);\n      draw_points(this.editing_entity, 3, \"rgba(255, 0, 0, 1)\");\n      draw_segments(this.editing_entity, 1, \"rgba(255, 170, 0, 1)\");\n      ctx.restore();\n    }\n    ref = this.selected_entities;\n    for (j = 0, len = ref.length; j < len; j++) {\n      entity = ref[j];\n      if (!(entity !== this.editing_entity)) {\n        continue;\n      }\n      ctx.save();\n      ctx.translate(entity.x, entity.y);\n      draw_points(entity, 2, \"rgba(255, 170, 0, 1)\");\n      draw_segments(entity, 1, \"rgba(255, 170, 0, 1)\");\n      ctx.restore();\n    }\n    ref1 = this.hovered_entities;\n    for (k = 0, len1 = ref1.length; k < len1; k++) {\n      entity = ref1[k];\n      if (!(indexOf.call(this.selected_entities, entity) < 0)) {\n        continue;\n      }\n      ctx.save();\n      ctx.translate(entity.x, entity.y);\n      draw_points(entity, 2, \"rgba(255, 170, 0, 0.2)\");\n      draw_segments(entity, 1, \"rgba(255, 170, 0, 0.5)\");\n      ctx.restore();\n    }\n    if (this.editing_entity != null) {\n      if ((ref2 = this.tool) === \"sculpt\" || ref2 === \"roughen\" || ref2 === \"smooth\" || ref2 === \"paint\") {\n        mouse_in_world = this.view.toWorld(this.mouse);\n        ctx.beginPath();\n        // ctx.arc(mouse_in_world.x, mouse_in_world.y, @brush_size / view.scale, 0, TAU)\n        ctx.arc(mouse_in_world.x, mouse_in_world.y, this.brush_size, 0, TAU);\n        // ctx.lineWidth = 1.5 / view.scale\n        // ctx.strokeStyle = \"rgba(255, 170, 0, 1)\"\n        // ctx.stroke()\n        ctx.fillStyle = \"rgba(0, 155, 255, 0.1)\";\n        ctx.strokeStyle = \"rgba(0, 155, 255, 0.8)\";\n        ctx.lineWidth = 1 / view.scale;\n        ctx.fill();\n        ctx.stroke();\n      } else {\n        ctx.save();\n        ctx.translate(this.editing_entity.x, this.editing_entity.y);\n        ref3 = this.selected_points;\n        // draw_points(@selected_points, 2, \"rgba(255, 170, 0, 0.2)\")\n        for (l = 0, len2 = ref3.length; l < len2; l++) {\n          point = ref3[l];\n          ctx.beginPath();\n          ctx.arc(point.x, point.y, 3 / view.scale, 0, TAU);\n          ctx.fillStyle = \"rgba(255, 0, 0, 1)\";\n          ctx.fill();\n          ctx.lineWidth = 1.5 / view.scale;\n          ctx.strokeStyle = \"rgba(255, 170, 0, 1)\";\n          ctx.stroke();\n        }\n        ctx.restore();\n      }\n    }\n    ref4 = this.selected_entities;\n    for (m = 0, len3 = ref4.length; m < len3; m++) {\n      entity = ref4[m];\n      ctx.strokeStyle = \"rgba(255, 170, 0, 1)\";\n      bbox = entity.bbox();\n      ctx.lineWidth = 1 / view.scale;\n      ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);\n    }\n    if (this.selection_box != null) {\n      ctx.save();\n      ctx.beginPath();\n      if (view.scale === 1) {\n        ctx.translate(0.5, 0.5);\n      }\n      ctx.rect(this.selection_box.x1, this.selection_box.y1, this.selection_box.x2 - this.selection_box.x1, this.selection_box.y2 - this.selection_box.y1);\n      ctx.fillStyle = \"rgba(0, 155, 255, 0.1)\";\n      ctx.strokeStyle = \"rgba(0, 155, 255, 0.8)\";\n      ctx.lineWidth = 1 / view.scale;\n      ctx.fill();\n      ctx.stroke();\n      return ctx.restore();\n    }\n  }\n\n  warn(message, timeout = 2000) {\n    this.warning_message = message;\n    this.show_warning = true;\n    this.renderDOM();\n    clearTimeout(this.warning_tid);\n    return this.warning_tid = setTimeout(() => {\n      this.show_warning = false;\n      return this.renderDOM();\n    }, timeout);\n  }\n\n  renderDOM() {\n    var react_root;\n    // Note that pointer-events: none is used on the editor\n    // to allow clicking through to the canvas, which is outside the editor.\n    // If changing the structure here, make sure pointer-events is enabled\n    // on any elements that should be clickable.\n    // The Animation sidebar actually goes on top of the Entities sidebar\n    react_root = react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".editor\", react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".layout-vertical\", react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".layout-horizontal\", react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"div\", {\n      style: {\n        position: \"relative\",\n        flex: 1\n      }\n    }, react_script__WEBPACK_IMPORTED_MODULE_1___default()(_components_EntitiesBar_coffee__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      editor: this,\n      ref: (entities_bar) => {\n        this.entities_bar = entities_bar;\n      }\n    }), react_script__WEBPACK_IMPORTED_MODULE_1___default()(_components_AnimBar_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      editor: this,\n      ref: (anim_bar) => {\n        this.anim_bar = anim_bar;\n      }\n    // E \"div\", {style: {flex: 1}}\n    }))), react_script__WEBPACK_IMPORTED_MODULE_1___default()(_components_ToolsBar_coffee__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      editor: this,\n      ref: (tools_bar) => {\n        this.tools_bar = tools_bar;\n      }\n    })), react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".warning\", {\n      class: (this.show_warning ? \"show\" : void 0)\n    }, this.warning_message));\n    return react_dom__WEBPACK_IMPORTED_MODULE_0__.render(react_root, this.react_root_el);\n  }\n\n  updateGUI() {\n    var show;\n    if (!this.editing_entity) {\n      this.editing_entity_anim_name = \"Current Pose\";\n      this.editing_entity_animation_frame_index = null;\n    }\n    show = this.editing;\n    this.entities_bar.update(show);\n    this.anim_bar.update(show);\n    return this.tools_bar.update(show);\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./Editor.coffee?");

/***/ }),

/***/ "./Mouse.coffee":
/*!**********************!*\
  !*** ./Mouse.coffee ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Mouse;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mouse = class Mouse {\n  constructor(canvas) {\n    this.x = -2e308;\n    this.y = -2e308;\n    this.LMB = {\n      down: false,\n      pressed: false,\n      released: false\n    };\n    this.MMB = {\n      down: false,\n      pressed: false,\n      released: false\n    };\n    this.RMB = {\n      down: false,\n      pressed: false,\n      released: false\n    };\n    this.double_clicked = false;\n    \n    // TODO: maybe have an init / initListeners / addListeners method?\n    // doesn't seem good to add listeners in a constructor\n    addEventListener(\"mousemove\", (e) => {\n      this.x = e.clientX;\n      return this.y = e.clientY;\n    });\n    canvas.addEventListener(\"mousedown\", (e) => {\n      var MB;\n      MB = this[`${\"LMR\"[e.button]}MB`];\n      MB.down = true;\n      return MB.pressed = true;\n    });\n    addEventListener(\"mouseup\", (e) => {\n      var MB;\n      MB = this[`${\"LMR\"[e.button]}MB`];\n      MB.down = false;\n      return MB.released = true;\n    });\n    canvas.addEventListener(\"dblclick\", (e) => {\n      var MB;\n      MB = this[`${\"LMR\"[e.button]}MB`];\n      MB.pressed = true;\n      return this.double_clicked = true;\n    });\n  }\n\n  resetForNextStep() {\n    this.LMB.pressed = false;\n    this.MMB.pressed = false;\n    this.RMB.pressed = false;\n    this.LMB.released = false;\n    this.MMB.released = false;\n    this.RMB.released = false;\n    return this.double_clicked = false;\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./Mouse.coffee?");

/***/ }),

/***/ "./View.coffee":
/*!*********************!*\
  !*** ./View.coffee ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar View;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View = class View {\n  constructor() {\n    this.center_x = 0;\n    this.center_y = 0;\n    this.scale = 1;\n    this.width = 1;\n    this.height = 1;\n  }\n\n  easeTowards(to_view, smoothness) {\n    this.center_x += (to_view.center_x - this.center_x) / (1 + smoothness / to_view.scale * this.scale);\n    this.center_y += (to_view.center_y - this.center_y) / (1 + smoothness / to_view.scale * this.scale);\n    return this.scale += (to_view.scale - this.scale) / (1 + smoothness);\n  }\n\n  testRect(x, y, width, height, padding = 0) {\n    return (this.center_x - this.width / 2 / this.scale - padding <= x && x <= this.center_x + this.width / 2 / this.scale + padding) && (this.center_y - this.height / 2 / this.scale - padding <= y && y <= this.center_y + this.height / 2 / this.scale + padding);\n  }\n\n  toWorld(point) {\n    return {\n      // x: (point.x + @center_x - @width / 2) / @scale\n      // y: (point.y + @center_y - @height / 2) / @scale\n      x: (point.x - this.width / 2) / this.scale + this.center_x,\n      y: (point.y - this.height / 2) / this.scale + this.center_y\n    };\n  }\n\n  fromWorld(point) {\n    return {\n      // x: point.x * @scale + @center_x + @width / 2\n      // y: point.y * @scale + @center_y + @height / 2\n      x: (point.x - this.center_x) * this.scale + this.width / 2,\n      y: (point.y - this.center_y) * this.scale + this.height / 2\n    };\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./View.coffee?");

/***/ }),

/***/ "./base-entities/Entity.coffee":
/*!*************************************!*\
  !*** ./base-entities/Entity.coffee ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structure/Pose.coffee */ \"./structure/Pose.coffee\");\n/* harmony import */ var _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structure/BoneStructure.coffee */ \"./structure/BoneStructure.coffee\");\n/* harmony import */ var _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-class-registry.coffee */ \"./entity-class-registry.coffee\");\nvar Entity, fs, path;\n\nfs = typeof window.require === \"function\" ? window.require(\"fs\") : void 0;\n\npath = typeof window.require === \"function\" ? window.require(\"path\") : void 0;\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Entity = class Entity {\n  constructor() {\n    this.structure = new _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    this.x = 0;\n    this.y = 0;\n    this.id = uuid();\n    this.bbox_padding = 2;\n    // TODO: depth system\n    // @drawing_pieces = {}\n    this._class_ = this.constructor.name;\n  }\n\n  static initAnimation(EntityClass) {\n    EntityClass.poses = {};\n    EntityClass.animations = {};\n    EntityClass.animation_json_path = `./animations/${EntityClass.name}.json`;\n    return Entity.loadAnimations(EntityClass);\n  }\n\n  static loadAnimations(EntityClass) {\n    var animationsFromJSON, e, json, req;\n    animationsFromJSON = function({poses, animations}) {\n      var animation, animation_name, pose, pose_name, results;\n      EntityClass.poses = {};\n      EntityClass.animations = {};\n      for (pose_name in poses) {\n        pose = poses[pose_name];\n        EntityClass.poses[pose_name] = new _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pose);\n      }\n      results = [];\n      for (animation_name in animations) {\n        animation = animations[animation_name];\n        results.push(EntityClass.animations[animation_name] = (function() {\n          var i, len, results1;\n          results1 = [];\n          for (i = 0, len = animation.length; i < len; i++) {\n            pose = animation[i];\n            results1.push(new _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pose));\n          }\n          return results1;\n        })());\n      }\n      return results;\n    };\n    if (fs != null) {\n      try {\n        json = fs.readFileSync(EntityClass.animation_json_path);\n      } catch (error) {\n        e = error;\n        if (e.code !== \"ENOENT\") {\n          throw e;\n        }\n      }\n    } else {\n      json = localStorage[`Skele2D ${EntityClass.name} animations`];\n    }\n    if (json) {\n      if (json) {\n        return animationsFromJSON(JSON.parse(json));\n      }\n    } else {\n      req = new XMLHttpRequest();\n      req.addEventListener(\"load\", (e) => {\n        json = req.responseText;\n        if (json) {\n          return animationsFromJSON(JSON.parse(json));\n        }\n      });\n      req.open(\"GET\", EntityClass.animation_json_path);\n      return req.send();\n    }\n  }\n\n  static saveAnimations(EntityClass) {\n    var animations, e, json, poses;\n    ({poses, animations} = EntityClass);\n    json = JSON.stringify({poses, animations}, null, \"\\t\");\n    if (fs != null) {\n      try {\n        fs.mkdirSync(path.dirname(EntityClass.animation_json_path));\n      } catch (error) {\n        e = error;\n        if (e.code !== \"EEXIST\") {\n          throw e;\n        }\n      }\n      return fs.writeFileSync(EntityClass.animation_json_path, json);\n    } else {\n      return localStorage[`Skele2D ${EntityClass.name} animations`] = json;\n    }\n  }\n\n  static fromJSON(def) {\n    var entity;\n    if (typeof def._class_ !== \"string\") {\n      console.error(\"Erroneous entity definition:\", def);\n      throw new Error(`Expected entity to have a string _class_, _class_ is ${def._class_}`);\n    }\n    if (!_entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_2__.entityClasses[def._class_]) {\n      throw new Error(`Entity class '${def._class_}' does not exist`);\n    }\n    entity = new _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_2__.entityClasses[def._class_]();\n    entity.fromJSON(def);\n    return entity;\n  }\n\n  fromJSON(def) {\n    var k, ref, results, v;\n    if (def._class_ !== this._class_) {\n      throw new Error(`Tried to initialize ${this._class_} entity from JSON with _class_ ${JSON.stringify(def._class_)}`);\n    }\n    results = [];\n    for (k in def) {\n      v = def[k];\n      if (k !== \"_class_\") {\n        if ((ref = this[k]) != null ? ref.fromJSON : void 0) {\n          results.push(this[k].fromJSON(v));\n        } else {\n          results.push(this[k] = v);\n        }\n      }\n    }\n    return results;\n  }\n\n  resolveReferences(world) {\n    var id, k, ref;\n    if (this._refs_) {\n      ref = this._refs_;\n      for (k in ref) {\n        id = ref[k];\n        this[k] = world.getEntityByID(id);\n      }\n      return delete this._refs_;\n    }\n  }\n\n  toJSON() {\n    var k, obj, ref, v;\n    obj = {};\n    ref = this;\n    for (k in ref) {\n      v = ref[k];\n      if (k !== \"_refs_\") {\n        if (v instanceof Entity) {\n          if (obj._refs_ == null) {\n            obj._refs_ = {};\n          }\n          obj._refs_[k] = v.id;\n        } else {\n          obj[k] = v;\n        }\n      }\n    }\n    return obj;\n  }\n\n  toWorld(point) {\n    return {\n      x: point.x + this.x,\n      y: point.y + this.y\n    };\n  }\n\n  fromWorld(point) {\n    return {\n      x: point.x - this.x,\n      y: point.y - this.y\n    };\n  }\n\n  bbox() {\n    var max_point, max_point_in_world, min_point, min_point_in_world, point, point_name, ref;\n    min_point = {\n      x: +2e308,\n      y: +2e308\n    };\n    max_point = {\n      x: -2e308,\n      y: -2e308\n    };\n    ref = this.structure.points;\n    for (point_name in ref) {\n      point = ref[point_name];\n      min_point.x = Math.min(min_point.x, point.x);\n      min_point.y = Math.min(min_point.y, point.y);\n      max_point.x = Math.max(max_point.x, point.x);\n      max_point.y = Math.max(max_point.y, point.y);\n    }\n    if (!isFinite(min_point.x)) {\n      min_point.x = 0;\n    }\n    if (!isFinite(min_point.y)) {\n      min_point.y = 0;\n    }\n    if (!isFinite(max_point.x)) {\n      max_point.x = 0;\n    }\n    if (!isFinite(max_point.y)) {\n      max_point.y = 0;\n    }\n    min_point.x -= this.bbox_padding;\n    min_point.y -= this.bbox_padding;\n    max_point.x += this.bbox_padding;\n    max_point.y += this.bbox_padding;\n    min_point_in_world = this.toWorld(min_point);\n    max_point_in_world = this.toWorld(max_point);\n    return {\n      x: min_point_in_world.x,\n      y: min_point_in_world.y,\n      width: max_point_in_world.x - min_point_in_world.x,\n      height: max_point_in_world.y - min_point_in_world.y\n    };\n  }\n\n  \n    // animate: ()->\n  // \t@structure.setPose(Pose.lerp(various_poses))\n  initLayout() {\n    var EntityClass, default_pose, i, j, point, point_name, ref, ref1, ref2, ref3, ref4, results, side, sideless_point_name, y, ys;\n    EntityClass = this.constructor;\n    if (EntityClass.poses) {\n      default_pose = (ref = (ref1 = (ref2 = EntityClass.poses[\"Default\"]) != null ? ref2 : EntityClass.poses[\"Stand\"]) != null ? ref1 : EntityClass.poses[\"Standing\"]) != null ? ref : EntityClass.poses[\"Idle\"];\n      if (default_pose) {\n        this.structure.setPose(default_pose);\n        return;\n      }\n    }\n    ys = {};\n    y = 0;\n    ref3 = this.structure.points;\n    for (point_name in ref3) {\n      point = ref3[point_name];\n      side = (ref4 = point_name.match(/left|right/)) != null ? ref4[0] : void 0;\n      if (side) {\n        sideless_point_name = point_name.replace(/left|right/, \"\");\n        if (ys[sideless_point_name]) {\n          y = ys[sideless_point_name];\n        } else {\n          y += 10;\n          ys[sideless_point_name] = y;\n        }\n        if (side === \"left\") {\n          point.x = -5.5;\n        }\n        if (side === \"right\") {\n          point.x = +5.5;\n        }\n        if (point_name.match(/lower/)) {\n          point.x *= 0.7;\n        }\n      }\n      point.y = y;\n    }\n    for (var i = 0; i <= 2000; i++) {\n      this.structure.stepLayout({\n        center: true,\n        repel: true\n      });\n    }\n    results = [];\n    for (var j = 0; j <= 4000; j++) {\n      results.push(this.structure.stepLayout());\n    }\n    return results;\n  }\n\n  step(world) {}\n\n  draw(ctx) {}\n\n});\n\n\n// TODO: function to call into the depth system\n// drawStructure: (drawing_functions)->\n// \tfor point_name, fn of drawing_functions.points\n// \t\tfn(@structure.points[point_name])\n// \tfor segment_name, fn of drawing_functions.segments\n// \t\tfn(@structure.segments[segment_name])\n\n\n//# sourceURL=webpack://skele2d/./base-entities/Entity.coffee?");

/***/ }),

/***/ "./base-entities/Terrain.coffee":
/*!**************************************!*\
  !*** ./base-entities/Terrain.coffee ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Entity_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity.coffee */ \"./base-entities/Entity.coffee\");\n/* harmony import */ var _structure_PolygonStructure_coffee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structure/PolygonStructure.coffee */ \"./structure/PolygonStructure.coffee\");\nvar TAU, Terrain;\n\n\n\n\n\nTAU = Math.PI * 2;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Terrain = class Terrain extends _Entity_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super();\n    this.structure = new _structure_PolygonStructure_coffee__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    this.simplex = typeof window.SimplexNoise === \"function\" ? new window.SimplexNoise() : void 0;\n    this.seed = Math.random();\n  }\n\n  initLayout() {\n    var i, n_points, non_squished_point_y_component, point_x, point_y, radius, ref, ref1, ref2, results, theta;\n    radius = 30;\n    n_points = 15;\n    results = [];\n    for (theta = i = ref = TAU / n_points, ref1 = TAU, ref2 = TAU / n_points; ref2 !== 0 && (ref2 > 0 ? i <= ref1 : i >= ref1); theta = i += ref2) {\n      point_x = Math.sin(theta) * radius;\n      point_y = Math.cos(theta) * radius;\n      non_squished_point_y_component = Math.max(point_y, -radius * 0.5);\n      point_y = non_squished_point_y_component + (point_y - non_squished_point_y_component) * 0.4;\n      // point_y = non_squished_point_y_component + pow(0.9, point_y - non_squished_point_y_component)\n      // point_y = non_squished_point_y_component + pow(point_y - non_squished_point_y_component, 0.9)\n      results.push(this.structure.addVertex(point_x, point_y));\n    }\n    return results;\n  }\n\n  toJSON() {\n    var def, k, ref, v;\n    def = {};\n    ref = this;\n    for (k in ref) {\n      v = ref[k];\n      if (k !== \"simplex\") {\n        def[k] = v;\n      }\n    }\n    return def;\n  }\n\n  generate() {\n    var i, noise, ref, ref1, ref2, res, results, x;\n    this.width = 5000;\n    this.left = -2500;\n    this.right = this.left + this.width;\n    this.max_height = 400;\n    this.bottom = 300;\n    res = 20;\n    this.structure.clear();\n    this.structure.addVertex(this.right, this.bottom);\n    this.structure.addVertex(this.left, this.bottom);\n    results = [];\n    for (x = i = ref = this.left, ref1 = this.right, ref2 = res; ref2 !== 0 && (ref2 > 0 ? i <= ref1 : i >= ref1); x = i += ref2) {\n      if (this.simplex) {\n        noise = this.simplex.noise2D(x / 2400, 0) + this.simplex.noise2D(x / 500, 10) / 5 + this.simplex.noise2D(x / 50, 30) / 100;\n      } else {\n        // noise = Math.random() * 2 - 1\n        // noise = Math.sin(x / 100) * 0.5 + 0.5\n        noise = 0;\n      }\n      results.push(this.structure.addVertex(x, this.bottom - (noise + 1) / 2 * this.max_height));\n    }\n    return results;\n  }\n\n  draw(ctx, view) {\n    var point, point_name, ref;\n    ctx.beginPath();\n    ref = this.structure.points;\n    for (point_name in ref) {\n      point = ref[point_name];\n      ctx.lineTo(point.x, point.y);\n    }\n    ctx.closePath();\n    ctx.fillStyle = \"#a5f\";\n    return ctx.fill();\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./base-entities/Terrain.coffee?");

/***/ }),

/***/ "./components/Anim.coffee":
/*!********************************!*\
  !*** ./components/Anim.coffee ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"../node_modules/react-dom/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _EntityPreview_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EntityPreview.coffee */ \"./components/EntityPreview.coffee\");\n/* harmony import */ var _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base-entities/Entity.coffee */ \"./base-entities/Entity.coffee\");\n/* harmony import */ var _rename_object_key_coffee__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../rename-object-key.coffee */ \"./rename-object-key.coffee\");\n/* harmony import */ var _icons_delete_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/delete.svg */ \"./icons/delete.svg\");\n// awkward component Anim represents a pose OR an animation OR an animation frame (which is an unnamed pose)\nvar Anim;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Anim = class Anim extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor() {\n    super();\n  }\n\n  render() {\n    var EntityClass, delete_item, editor, entity, max_height, max_width, name, select, selected, type_of_anims, update;\n    ({entity, EntityClass, name, type_of_anims, selected, select, delete_item, update, editor} = this.props);\n    max_width = 200;\n    max_height = 100;\n    return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article\", {\n      class: {selected},\n      onClick: (e) => {\n        if (e.defaultPrevented) {\n          return;\n        }\n        select();\n        return update();\n      }\n    // TODO: for animation-frames, instead of a textfield have a reorder handle and a duration control\n    // well, a reorder handle might be nice for the other anims too\n    }, name === \"Current Pose\" ? react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"h1.name\", name) : react_script__WEBPACK_IMPORTED_MODULE_2___default()(\".title-bar\", {\n      style: {\n        maxWidth: max_width\n      }\n    }, react_script__WEBPACK_IMPORTED_MODULE_2___default()(\".mdl-textfield.mdl-js-textfield.name\", {\n      ref: (mdl_textfield_el) => {\n        this.mdl_textfield_el = mdl_textfield_el;\n      }\n    }, react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"input.mdl-textfield__input\", {\n      value: name.replace(/TEMP_NAME_SENTINEL\\d*$/, \"\"),\n      ref: (name_input_el) => {\n        this.name_input_el = name_input_el;\n      },\n      dataInvalidNotUnique: name.includes(\"TEMP_NAME_SENTINEL\"),\n      required: true,\n      onFocus: (e) => {\n        return this.name_input_el.reportValidity();\n      },\n      onInput: (e) => {\n        var anims_object, needs_temp_name, new_name;\n        new_name = e.target.value;\n        // TODO: use error classes and messages instead of intrusive alerts\n        if (type_of_anims === \"animations\") {\n          if (EntityClass.animations[new_name]) {\n            // editor.warn(\"There's already an animation with the name '#{new_name}'\")\n            // setCustomValidity is better, more contextual.\n            this.name_input_el.setCustomValidity(`There's already an animation with the name '${new_name}'`);\n            needs_temp_name = true;\n          }\n        } else if (type_of_anims === \"poses\") {\n          if (EntityClass.poses[new_name]) {\n            // editor.warn(\"There's already a pose with the name '#{new_name}'\")\n            this.name_input_el.setCustomValidity(`There's already a pose with the name '${new_name}'`);\n            needs_temp_name = true;\n          }\n        } else {\n          alert(`This shouldn't happen. Unknown type: ${type_of_anims}`);\n          return;\n        }\n        if (needs_temp_name) {\n          new_name += \"TEMP_NAME_SENTINEL\";\n          while (EntityClass[type_of_anims][new_name]) {\n            new_name += \"1\";\n          }\n        } else {\n          this.name_input_el.setCustomValidity(\"\");\n        }\n        this.name_input_el.reportValidity();\n        anims_object = EntityClass[type_of_anims];\n        (0,_rename_object_key_coffee__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(anims_object, name, new_name);\n        editor.editing_entity_anim_name = new_name;\n        _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_4__[\"default\"].saveAnimations(EntityClass);\n        \n        // cause rerender immediately so cursor doesn't get moved to the end of the field\n        return update();\n      }\n    }), react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"label.mdl-textfield__label\", \"Name...\")), react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete\", {\n      onClick: (e) => {\n        e.preventDefault();\n        delete_item();\n        return _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_4__[\"default\"].saveAnimations(EntityClass);\n      }\n    // E \"i.material-icons\", \"delete\"\n    }, react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"img\", {\n      src: _icons_delete_svg__WEBPACK_IMPORTED_MODULE_6__\n    }))), react_script__WEBPACK_IMPORTED_MODULE_2___default()(_EntityPreview_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      entity,\n      max_width,\n      max_height,\n      ref: (entity_preview) => {\n        this.entity_preview = entity_preview;\n      }\n    }));\n  }\n\n  componentDidMount() {\n    var ref;\n    if (this.mdl_textfield_el != null) {\n      componentHandler.upgradeElement(react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode(this.mdl_textfield_el));\n    }\n    if ((ref = this.name_input_el) != null ? ref.dataset.invalidNotUnique : void 0) {\n      return this.name_input_el.setCustomValidity(\"Please enter a unique name.\");\n    }\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./components/Anim.coffee?");

/***/ }),

/***/ "./components/AnimBar.coffee":
/*!***********************************!*\
  !*** ./components/AnimBar.coffee ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-class-registry.coffee */ \"./entity-class-registry.coffee\");\n/* harmony import */ var _AnimGroup_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnimGroup.coffee */ \"./components/AnimGroup.coffee\");\nvar AnimBar,\n  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnimBar = class AnimBar extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor() {\n    super();\n    this.update = this.update.bind(this);\n    this.state = {\n      visible: false\n    };\n  }\n\n  render() {\n    var EntityClass, editing_an_animation, editor, entity, ref, visible;\n    ({editor} = this.props);\n    ({visible, EntityClass} = this.state);\n    entity = (ref = editor.editing_entity) != null ? ref : this.shown_entity;\n    editing_an_animation = editor.editing_entity_animation_frame_index != null;\n    this.shown_entity = entity;\n    this.anims = [];\n    // TODO: remove references from @anims on Anim::componentWillUnmount\n    return react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".bar.sidebar.anim-bar\", {\n      class: {visible}\n    }, react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".anims\", react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"h1\", \"Poses\"), react_script__WEBPACK_IMPORTED_MODULE_1___default()(_AnimGroup_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      entity,\n      EntityClass,\n      array_to_push_anims_to: this.anims,\n      update: this.update,\n      editor,\n      type_of_anims: \"poses\"\n    }), react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"h1\", \"Animations\"), react_script__WEBPACK_IMPORTED_MODULE_1___default()(_AnimGroup_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      entity,\n      EntityClass,\n      array_to_push_anims_to: this.anims,\n      update: this.update,\n      editor,\n      type_of_anims: \"animations\"\n    })), react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".animation-frames\", {\n      class: {\n        visible: visible && editing_an_animation\n      }\n    }, react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"h1\", \"Frames\"), react_script__WEBPACK_IMPORTED_MODULE_1___default()(_AnimGroup_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      entity,\n      EntityClass,\n      array_to_push_anims_to: this.anims,\n      update: this.update,\n      editor,\n      type_of_anims: \"animation-frames\",\n      editing_frame_index: editor.editing_entity_animation_frame_index\n    })));\n  }\n\n  update(show) {\n    var EntityClass, anim, editing_entity, editing_entity_anim_name, editor, i, len, pose, ref;\n    boundMethodCheck(this, AnimBar);\n    ({editor} = this.props);\n    ({editing_entity_anim_name, editing_entity} = editor);\n    EntityClass = editing_entity != null ? _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_2__.entityClasses[editing_entity._class_] : void 0;\n    show = show && (EntityClass != null ? EntityClass.animations : void 0);\n    if (show) {\n      ref = this.anims;\n      for (i = 0, len = ref.length; i < len; i++) {\n        anim = ref[i];\n        pose = anim.props.get_pose();\n        if (pose != null) {\n          anim.entity_preview.entity.structure.setPose(pose);\n          anim.entity_preview.update();\n        }\n      }\n    }\n    return this.setState({\n      visible: show,\n      EntityClass,\n      editing_entity_anim_name\n    });\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./components/AnimBar.coffee?");

/***/ }),

/***/ "./components/AnimGroup.coffee":
/*!*************************************!*\
  !*** ./components/AnimGroup.coffee ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"../node_modules/react-dom/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Anim_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Anim.coffee */ \"./components/Anim.coffee\");\n/* harmony import */ var _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../structure/Pose.coffee */ \"./structure/Pose.coffee\");\n/* harmony import */ var _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base-entities/Entity.coffee */ \"./base-entities/Entity.coffee\");\n/* harmony import */ var _icons_plus_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/plus.svg */ \"./icons/plus.svg\");\nvar AnimGroup,\n  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnimGroup = class AnimGroup extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor() {\n    super(...arguments);\n    this.componentDidMount = this.componentDidMount.bind(this);\n    // XXX: have to upgrade when the bar becomes visible\n    this.componentDidUpdate = this.componentDidUpdate.bind(this);\n  }\n\n  render() {\n    var EntityClass, animation, animation_name, array_to_push_anims_to, editor, entity, frame, frame_index, frames, i, pose, pose_name, type_of_anims, update;\n    ({entity, EntityClass, array_to_push_anims_to, update, type_of_anims, editor} = this.props);\n    return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\".anim-group\", (function() {\n      var j, len, ref, ref1, results, results1, results2;\n      if (EntityClass != null) {\n        if (type_of_anims === \"poses\") {\n          if (EntityClass.poses != null) {\n            if (Object.keys(EntityClass.poses).length > 0) {\n              i = 0;\n              ref = EntityClass.poses;\n              results = [];\n              for (pose_name in ref) {\n                pose = ref[pose_name];\n                results.push(((pose_name, pose) => {\n                  var selected;\n                  i += 1;\n                  selected = editor.editing_entity_anim_name === pose_name && (editor.editing_entity_animation_frame_index == null);\n                  return react_script__WEBPACK_IMPORTED_MODULE_2___default()(_Anim_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    key: i,\n                    name: pose_name,\n                    entity,\n                    EntityClass,\n                    selected,\n                    editor,\n                    update,\n                    type_of_anims,\n                    // pose\n                    select: () => {\n                      editor.editing_entity_anim_name = pose_name;\n                      editor.editing_entity_animation_frame_index = null;\n                      if (pose_name !== \"Current Pose\") {\n                        return entity.structure.setPose(EntityClass.poses[pose_name]);\n                      }\n                    },\n                    delete_item: () => {\n                      delete EntityClass.poses[pose_name];\n                      editor.editing_entity_anim_name = \"Current Pose\";\n                      return editor.editing_entity_animation_frame_index = null;\n                    },\n                    get_pose: () => {\n                      if (pose_name === \"Current Pose\" || selected) {\n                        return entity.structure.getPose();\n                      } else {\n                        return EntityClass.poses[pose_name];\n                      }\n                    },\n                    ref: (anim) => {\n                      if (anim != null) {\n                        return array_to_push_anims_to.push(anim);\n                      }\n                    }\n                  });\n                })(pose_name, pose));\n              }\n              return results;\n            } else {\n              return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n                key: \"placeholder\"\n              }, \"No poses\");\n            }\n          } else {\n            return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n              key: \"placeholder\"\n            }, \"Entity class is not initialized for animation\");\n          }\n        } else if (type_of_anims === \"animations\") {\n          if (EntityClass.animations != null) {\n            if (Object.keys(EntityClass.animations).length > 0) {\n              i = 0;\n              ref1 = EntityClass.animations;\n              results1 = [];\n              for (animation_name in ref1) {\n                animation = ref1[animation_name];\n                results1.push(((animation_name, animation) => {\n                  var selected;\n                  i += 1;\n                  selected = editor.editing_entity_anim_name === animation_name && (editor.editing_entity_animation_frame_index != null);\n                  return react_script__WEBPACK_IMPORTED_MODULE_2___default()(_Anim_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    key: i,\n                    name: animation_name,\n                    entity,\n                    EntityClass,\n                    selected,\n                    editor,\n                    update,\n                    type_of_anims,\n                    // animation\n                    // TODO: bounds of anim should be determined across all frames\n                    select: () => {\n                      var ref2;\n                      editor.editing_entity_anim_name = animation_name;\n                      editor.editing_entity_animation_frame_index = 0;\n                      pose = (ref2 = EntityClass.animations[animation_name]) != null ? ref2[0] : void 0;\n                      if (pose) {\n                        return entity.structure.setPose(pose);\n                      }\n                    },\n                    delete_item: () => {\n                      delete EntityClass.animations[animation_name];\n                      editor.editing_entity_anim_name = \"Current Pose\";\n                      return editor.editing_entity_animation_frame_index = null;\n                    },\n                    get_pose: () => {\n                      // TODO: animate only if anim is the hovered||selected one\n                      animation = EntityClass.animations[animation_name];\n                      if (!animation) { // TODO: shouldn't need this or other ?s\n                        return;\n                      }\n                      return _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_4__[\"default\"].lerpAnimationLoop(animation, EntityClass.animations[animation_name].length * Date.now() / 1000 / 2);\n                    },\n                    ref: (anim) => {\n                      if (anim != null) {\n                        return array_to_push_anims_to.push(anim);\n                      }\n                    }\n                  });\n                })(animation_name, animation));\n              }\n              return results1;\n            } else {\n              return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n                key: \"placeholder\"\n              }, \"No animations\");\n            }\n          } else {\n            return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n              key: \"placeholder\"\n            }, \"Entity class is not initialized for animation\");\n          }\n        } else if (type_of_anims === \"animation-frames\") {\n          if (EntityClass.animations != null) {\n            animation_name = editor.editing_entity_anim_name;\n            frames = EntityClass.animations[animation_name];\n            if (frames != null) {\n              results2 = [];\n              for (frame_index = j = 0, len = frames.length; j < len; frame_index = ++j) {\n                frame = frames[frame_index];\n                results2.push(((frame, frame_index) => {\n                  var selected;\n                  selected = editor.editing_entity_anim_name === animation_name && editor.editing_entity_animation_frame_index === frame_index;\n                  return react_script__WEBPACK_IMPORTED_MODULE_2___default()(_Anim_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    key: frame_index,\n                    name: `Frame ${frame_index}`,\n                    entity,\n                    EntityClass,\n                    selected,\n                    editor,\n                    update,\n                    type_of_anims,\n                    // animation frame\n                    select: () => {\n                      editor.editing_entity_anim_name = animation_name;\n                      editor.editing_entity_animation_frame_index = frame_index;\n                      pose = EntityClass.animations[animation_name][frame_index];\n                      return entity.structure.setPose(pose);\n                    },\n                    delete_item: () => {\n                      return EntityClass.animations[animation_name].splice(frame_index, 1);\n                    },\n                    get_pose: () => {\n                      if (selected) {\n                        return entity.structure.getPose();\n                      } else {\n                        animation = EntityClass.animations[animation_name];\n                        return animation != null ? animation[frame_index] : void 0;\n                      }\n                    },\n                    ref: (anim) => {\n                      if (anim != null) {\n                        return array_to_push_anims_to.push(anim);\n                      }\n                    }\n                  });\n                })(frame, frame_index));\n              }\n              return results2;\n            } else {\n              return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n                key: \"placeholder\"\n              }, \"Error: Trying to display the frames of a non-existent animation\");\n            }\n          } else {\n            return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n              key: \"placeholder\"\n            }, \"Error: Entity class is not initialized for animation, trying to display the frames of an animation?\");\n          }\n        } else {\n          return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"article.placeholder\", {\n            key: \"placeholder\"\n          }, `Error: weird type_of_anims for AnimGroup ${type_of_anims}`);\n        }\n      }\n    }).call(this), react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"button.add-anim-fab.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored\", {\n      key: \"add-button\",\n      ref: (new_anim_button) => {\n        this.new_anim_button = new_anim_button;\n      },\n      onClick: () => {\n        var default_name, new_name, new_pose;\n        if (type_of_anims === \"animation-frames\") {\n          animation = EntityClass.animations[editor.editing_entity_anim_name];\n          new_pose = entity.structure.getPose();\n          animation.push(new_pose);\n          editor.editing_entity_animation_frame_index = animation.length - 1;\n        } else {\n          default_name = (function() {\n            switch (type_of_anims) {\n              case \"poses\":\n                return \"New Pose\";\n              case \"animations\":\n                return \"New Animation\";\n            }\n          })();\n          new_name = default_name;\n          i = 1;\n          while (EntityClass[type_of_anims][new_name] != null) {\n            new_name = `${default_name} ${i}`;\n            i += 1;\n          }\n          switch (type_of_anims) {\n            case \"poses\":\n              EntityClass.poses[new_name] = entity.structure.getPose();\n              editor.editing_entity_animation_frame_index = null;\n              break;\n            case \"animations\":\n              EntityClass.animations[new_name] = [entity.structure.getPose()];\n              editor.editing_entity_animation_frame_index = 0;\n          }\n          editor.editing_entity_anim_name = new_name;\n        }\n        _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveAnimations(EntityClass);\n        return update();\n      }\n    \n    // E \"i.material-icons\", \"add\"\n    }, react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"img\", {\n      src: _icons_plus_svg__WEBPACK_IMPORTED_MODULE_6__,\n      style: {\n        filter: \"invert()\"\n      }\n    })));\n  }\n\n  componentDidMount() {\n    boundMethodCheck(this, AnimGroup);\n    return componentHandler.upgradeElement(react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode(this.new_anim_button));\n  }\n\n  componentDidUpdate() {\n    boundMethodCheck(this, AnimGroup);\n    return componentHandler.upgradeElement(react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode(this.new_anim_button));\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./components/AnimGroup.coffee?");

/***/ }),

/***/ "./components/EntitiesBar.coffee":
/*!***************************************!*\
  !*** ./components/EntitiesBar.coffee ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers.coffee */ \"./helpers.coffee\");\n/* harmony import */ var _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entity-class-registry.coffee */ \"./entity-class-registry.coffee\");\n/* harmony import */ var _EntityPreview_coffee__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EntityPreview.coffee */ \"./components/EntityPreview.coffee\");\nvar EntitiesBar,\n  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EntitiesBar = class EntitiesBar extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor() {\n    var EntityClass, cell, cell_name, entity_class_name, error, preview_entity, preview_error;\n    super();\n    this.update = this.update.bind(this);\n    this.state = {\n      visible: false\n    };\n    this.cells = [];\n    this.entity_previews = [];\n    for (entity_class_name in _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_3__.entityClasses) {\n      EntityClass = _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_3__.entityClasses[entity_class_name];\n      cell_name = entity_class_name.replace(/[a-z][A-Z]/g, function(m) {\n        return `${m[0]} ${m[1]}`;\n      });\n      preview_error = null;\n      preview_entity = null;\n      try {\n        preview_entity = new EntityClass();\n        preview_entity.initLayout();\n      } catch (error1) {\n        error = error1;\n        preview_error = error;\n      }\n      cell = {\n        EntityClass,\n        name: cell_name,\n        preview_entity,\n        preview_error\n      };\n      this.cells.push(cell);\n    }\n  }\n\n  render() {\n    var cell, cell_preview_width, editor, i, max_cell_preview_height, visible;\n    ({editor} = this.props);\n    ({visible} = this.state);\n    cell_preview_width = 200;\n    max_cell_preview_height = 100;\n    this.entity_previews = [];\n    return react_script__WEBPACK_IMPORTED_MODULE_1___default()(\".bar.sidebar.entities-bar\", {\n      class: {visible}\n    }, (function() {\n      var j, len, ref, results;\n      ref = this.cells;\n      results = [];\n      for (i = j = 0, len = ref.length; j < len; i = ++j) {\n        cell = ref[i];\n        results.push(react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"article.cell.grabbable\", {\n          key: i,\n          onMouseDown: ((cell) => {\n            return (e) => {\n              var mouse_start, onmousemove, onmouseup;\n              editor.selected_entities = [];\n              mouse_start = {\n                x: e.clientX,\n                y: e.clientY\n              };\n              addEventListener(\"mousemove\", onmousemove = (e) => {\n                if ((0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_2__.distance)(mouse_start, {\n                  x: e.clientX,\n                  y: e.clientY\n                }) > 4) {\n                  return editor.undoable(() => {\n                    var entity;\n                    entity = new cell.EntityClass();\n                    entity.initLayout();\n                    editor.world.entities.push(entity);\n                    editor.dragEntities([entity]);\n                    removeEventListener(\"mousemove\", onmousemove);\n                    return removeEventListener(\"mouseup\", onmouseup);\n                  });\n                }\n              });\n              return addEventListener(\"mouseup\", onmouseup = (e) => {\n                removeEventListener(\"mousemove\", onmousemove);\n                return removeEventListener(\"mouseup\", onmouseup);\n              });\n            };\n          })(cell)\n        }, react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"h1.name\", cell.name), react_script__WEBPACK_IMPORTED_MODULE_1___default()(_EntityPreview_coffee__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n          entity: cell.preview_entity,\n          max_width: cell_preview_width,\n          max_height: max_cell_preview_height,\n          preview_error: cell.preview_error,\n          ref: (ep) => {\n            if (ep != null) {\n              return this.entity_previews.push(ep);\n            }\n          }\n        })));\n      }\n      return results;\n    }).call(this));\n  }\n\n  update(show) {\n    var editor, entity_preview, j, len, ref, results;\n    boundMethodCheck(this, EntitiesBar);\n    ({editor} = this.props);\n    show = show && editor.dragging_entities.length === 0 && !editor.editing_entity;\n    if (show !== this.state.visible) {\n      this.setState({\n        visible: show\n      });\n    }\n    if (show) {\n      ref = this.entity_previews;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        entity_preview = ref[j];\n        results.push(entity_preview.update());\n      }\n      return results;\n    }\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./components/EntitiesBar.coffee?");

/***/ }),

/***/ "./components/EntityPreview.coffee":
/*!*****************************************!*\
  !*** ./components/EntityPreview.coffee ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-entities/Entity.coffee */ \"./base-entities/Entity.coffee\");\n/* harmony import */ var _View_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../View.coffee */ \"./View.coffee\");\nvar EntityPreview;\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EntityPreview = class EntityPreview extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    var center_x, center_y, entity, entity_bbox, error, height, max_height, max_width, scale;\n    super();\n    ({entity, max_width, max_height} = props);\n    this.state = {};\n    try {\n      this.entity = _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fromJSON(JSON.parse(JSON.stringify(entity)));\n      this.entity.facing_x = 1;\n      this.view = new _View_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n      entity_bbox = this.entity.bbox();\n      center_x = entity_bbox.x + entity_bbox.width / 2 - this.entity.x;\n      center_y = entity_bbox.y + entity_bbox.height / 2 - this.entity.y;\n      height = Math.min(entity_bbox.height, max_height);\n      scale = height / entity_bbox.height;\n    } catch (error1) {\n      error = error1;\n      this.state.preview_error = error;\n    }\n    this.view = new _View_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    this.view.width = max_width;\n    this.view.height = isFinite(height) ? height : max_height;\n    this.view.scale = isFinite(scale) ? scale : 1;\n    this.view.center_x = center_x;\n    this.view.center_y = center_y;\n    this.view.is_preview = true;\n  }\n\n  render() {\n    var error_details, preview_error;\n    // Props has priority over state for preview_error because errors during\n    // construction of an entity are more important than errors during rendering.\n    // An error during construction can easily lead to bogus errors during rendering.\n    preview_error = this.props.preview_error || this.state.preview_error;\n    // Chrome includes the error message in the stack trace, but Firefox doesn't.\n    if (preview_error != null ? preview_error.stack : void 0) {\n      if (preview_error.stack.includes(preview_error.toString())) {\n        error_details = preview_error.stack;\n      } else {\n        error_details = `${preview_error.toString()}\\n${preview_error.stack}`;\n      }\n    } else if (preview_error) {\n      error_details = preview_error;\n    }\n    return react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"div.entity-preview\", react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"canvas\", {\n      ref: (canvas) => {\n        this.canvas = canvas;\n      }\n    }), preview_error != null ? react_script__WEBPACK_IMPORTED_MODULE_1___default()(\"div.error\", {\n      title: error_details\n    }, preview_error.toString()) : void 0);\n  }\n\n  update() {\n    var center_x, center_y, ctx, entity_bbox, error;\n    this.canvas.width = this.view.width;\n    this.canvas.height = this.view.height;\n    try {\n      entity_bbox = this.entity.bbox();\n      center_x = entity_bbox.x + entity_bbox.width / 2 - this.entity.x;\n      center_y = entity_bbox.y + entity_bbox.height / 2 - this.entity.y;\n      this.view.center_x = center_x;\n      this.view.center_y = center_y;\n      ctx = this.canvas.getContext(\"2d\");\n      ctx.save();\n      ctx.translate(this.view.width / 2, this.view.height / 2);\n      ctx.scale(this.view.scale, this.view.scale);\n      ctx.translate(-this.view.center_x, -this.view.center_y);\n      this.entity.draw(ctx, this.view);\n      return ctx.restore();\n    } catch (error1) {\n      error = error1;\n      if (this.state.preview_error == null) {\n        // Earlier errors are generally more pertinent than later errors.\n        return this.setState({\n          preview_error: error\n        });\n      }\n    }\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./components/EntityPreview.coffee?");

/***/ }),

/***/ "./components/ToolsBar.coffee":
/*!************************************!*\
  !*** ./components/ToolsBar.coffee ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"../node_modules/react-dom/index.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-script */ \"../node_modules/react-script/lib/react-script.js\");\n/* harmony import */ var react_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_script__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _icons_select_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/select.svg */ \"./icons/select.svg\");\n/* harmony import */ var _icons_push_arrows_in_circle_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/push-arrows-in-circle.svg */ \"./icons/push-arrows-in-circle.svg\");\n/* harmony import */ var _icons_roughen_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/roughen.svg */ \"./icons/roughen.svg\");\n/* harmony import */ var _icons_smooth_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/smooth.svg */ \"./icons/smooth.svg\");\n/* harmony import */ var _icons_brush_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icons/brush.svg */ \"./icons/brush.svg\");\n/* harmony import */ var _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../base-entities/Terrain.coffee */ \"./base-entities/Terrain.coffee\");\nvar ToolsBar,\n  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolsBar = class ToolsBar extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor() {\n    var j, len, ref, tool;\n    super();\n    this.update = this.update.bind(this);\n    this.state = {\n      visible: false\n    };\n    this.tools = [\n      {\n        name: \"select\",\n        icon: _icons_select_svg__WEBPACK_IMPORTED_MODULE_3__\n      },\n      {\n        name: \"sculpt\",\n        icon: _icons_push_arrows_in_circle_svg__WEBPACK_IMPORTED_MODULE_4__\n      },\n      {\n        name: \"roughen\",\n        icon: _icons_roughen_svg__WEBPACK_IMPORTED_MODULE_5__\n      },\n      {\n        name: \"smooth\",\n        icon: _icons_smooth_svg__WEBPACK_IMPORTED_MODULE_6__\n      },\n      {\n        name: \"paint\",\n        icon: _icons_brush_svg__WEBPACK_IMPORTED_MODULE_7__\n      }\n    ];\n    ref = this.tools;\n    for (j = 0, len = ref.length; j < len; j++) {\n      tool = ref[j];\n      tool.buttonRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n    }\n  }\n\n  render() {\n    var brush_size, editor, tool, visible;\n    ({editor} = this.props);\n    ({visible} = this.state);\n    ({tool, brush_size} = editor);\n    return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\".bar.tools-bar\", {\n      class: {visible}\n    }, react_script__WEBPACK_IMPORTED_MODULE_2___default()(\".tools\", this.tools.map(({name, icon, buttonRef}, i) => {\n      return react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"button.mdl-button.mdl-js-button.mdl-button--icon.mdl-button--colored\", {\n        // E \"button.mdl-button.mdl-js-button.mdl-button--colored\",\n        key: i,\n        ariaPressed: name === editor.tool,\n        ref: buttonRef,\n        disabled: name === \"paint\" && !(editor.editing_entity instanceof _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n        onClick: (e) => {\n          editor.tool = name;\n          return editor.renderDOM();\n        },\n        title: name[0].toUpperCase() + name.slice(1)\n      // E \"i.material-icons\", E \"i.material-symbols-outlined\", icon\n      }, react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"img\", {\n        src: icon\n      }));\n    })), react_script__WEBPACK_IMPORTED_MODULE_2___default()(\".tool-options\", react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"label\", react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"span\", \"Brush Size:\"), react_script__WEBPACK_IMPORTED_MODULE_2___default()(\"input.mdl-slider.mdl-js-slider\", {\n      type: \"range\",\n      min: 0,\n      max: 100,\n      value: brush_size,\n      tabIndex: 0,\n      disabled: tool !== \"sculpt\" && tool !== \"roughen\" && tool !== \"smooth\" && tool !== \"paint\",\n      style: {\n        minWidth: 200\n      },\n      ref: (brush_size_slider) => {\n        this.brush_size_slider = brush_size_slider;\n      },\n      onChange: (e) => {\n        editor.brush_size = e.target.value;\n        return editor.renderDOM();\n      }\n    }))));\n  }\n\n  componentDidMount() {\n    var j, len, ref, results, tool;\n    componentHandler.upgradeElement(react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode(this.brush_size_slider));\n    ref = this.tools;\n    results = [];\n    for (j = 0, len = ref.length; j < len; j++) {\n      tool = ref[j];\n      results.push(componentHandler.upgradeElement(react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode(tool.buttonRef.current)));\n    }\n    return results;\n  }\n\n  update(show) {\n    var editing_entity, editor;\n    boundMethodCheck(this, ToolsBar);\n    ({editor} = this.props);\n    ({editing_entity} = editor);\n    show = show && editing_entity;\n    return this.setState({\n      visible: show\n    });\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./components/ToolsBar.coffee?");

/***/ }),

/***/ "./entity-class-registry.coffee":
/*!**************************************!*\
  !*** ./entity-class-registry.coffee ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addEntityClass\": () => (/* binding */ addEntityClass),\n/* harmony export */   \"entityClasses\": () => (/* binding */ entityClasses)\n/* harmony export */ });\n// TODO: replace this with just passing a list of entities to the Editor (and stuff), probably\nvar entityClasses = {};\n\nvar addEntityClass = function(constructor) {\n  return entityClasses[constructor.name] = constructor;\n};\n\n\n//# sourceURL=webpack://skele2d/./entity-class-registry.coffee?");

/***/ }),

/***/ "./helpers.coffee":
/*!************************!*\
  !*** ./helpers.coffee ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closestPointOnLineSegment\": () => (/* binding */ closestPointOnLineSegment),\n/* harmony export */   \"distance\": () => (/* binding */ distance),\n/* harmony export */   \"distanceToLineSegment\": () => (/* binding */ distanceToLineSegment),\n/* harmony export */   \"lerpPoints\": () => (/* binding */ lerpPoints),\n/* harmony export */   \"lineSegmentsIntersect\": () => (/* binding */ lineSegmentsIntersect)\n/* harmony export */ });\nvar distanceSquared, distanceToLineSegmentSquared;\n\ndistanceSquared = function(v, w) {\n  return (v.x - w.x) ** 2 + (v.y - w.y) ** 2;\n};\n\nvar distance = function(v, w) {\n  return Math.sqrt(distanceSquared(v, w));\n};\n\ndistanceToLineSegmentSquared = function(p, v, w) {\n  var l2, t;\n  l2 = distanceSquared(v, w);\n  if (l2 === 0) {\n    return distanceSquared(p, v);\n  }\n  t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;\n  t = Math.max(0, Math.min(1, t));\n  return distanceSquared(p, {\n    x: v.x + t * (w.x - v.x),\n    y: v.y + t * (w.y - v.y)\n  });\n};\n\nvar distanceToLineSegment = function(p, v, w) {\n  return Math.sqrt(distanceToLineSegmentSquared(p, v, w));\n};\n\nvar lineSegmentsIntersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {\n  var a_dx, a_dy, b_dx, b_dy, s, t;\n  a_dx = x2 - x1;\n  a_dy = y2 - y1;\n  b_dx = x4 - x3;\n  b_dy = y4 - y3;\n  s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);\n  t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);\n  return (0 <= s && s <= 1) && (0 <= t && t <= 1);\n};\n\nvar closestPointOnLineSegment = function(point, a, b) {\n  var a_to_b, a_to_p, atb2, atp_dot_atb, t;\n  // https://stackoverflow.com/a/3122532/2624876\n  a_to_p = {\n    x: point.x - a.x,\n    y: point.y - a.y\n  };\n  a_to_b = {\n    x: b.x - a.x,\n    y: b.y - a.y\n  };\n  atb2 = a_to_b.x ** 2 + a_to_b.y ** 2;\n  atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;\n  t = atp_dot_atb / atb2;\n  return {\n    x: a.x + a_to_b.x * t,\n    y: a.y + a_to_b.y * t\n  };\n};\n\nvar lerpPoints = function(a, b, b_ness) {\n  var k, result, v;\n  result = {};\n  for (k in a) {\n    v = a[k];\n    if (typeof v === \"number\") {\n      result[k] = v + (b[k] - v) * b_ness;\n    } else {\n      result[k] = v;\n    }\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack://skele2d/./helpers.coffee?");

/***/ }),

/***/ "./index.coffee":
/*!**********************!*\
  !*** ./index.coffee ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BoneStructure\": () => (/* reexport safe */ _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"Editor\": () => (/* reexport safe */ _Editor_coffee__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   \"Entity\": () => (/* reexport safe */ _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"Mouse\": () => (/* reexport safe */ _Mouse_coffee__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   \"PolygonStructure\": () => (/* reexport safe */ _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"Pose\": () => (/* reexport safe */ _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   \"Structure\": () => (/* reexport safe */ _structure_Structure_coffee__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"Terrain\": () => (/* reexport safe */ _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"View\": () => (/* reexport safe */ _View_coffee__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   \"addEntityClass\": () => (/* reexport safe */ _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_8__.addEntityClass),\n/* harmony export */   \"entityClasses\": () => (/* reexport safe */ _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_8__.entityClasses),\n/* harmony export */   \"helpers\": () => (/* reexport module object */ _helpers_coffee__WEBPACK_IMPORTED_MODULE_9__)\n/* harmony export */ });\n/* harmony import */ var _base_entities_Entity_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-entities/Entity.coffee */ \"./base-entities/Entity.coffee\");\n/* harmony import */ var _base_entities_Terrain_coffee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-entities/Terrain.coffee */ \"./base-entities/Terrain.coffee\");\n/* harmony import */ var _structure_Structure_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structure/Structure.coffee */ \"./structure/Structure.coffee\");\n/* harmony import */ var _structure_BoneStructure_coffee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structure/BoneStructure.coffee */ \"./structure/BoneStructure.coffee\");\n/* harmony import */ var _structure_Pose_coffee__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./structure/Pose.coffee */ \"./structure/Pose.coffee\");\n/* harmony import */ var _Editor_coffee__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Editor.coffee */ \"./Editor.coffee\");\n/* harmony import */ var _View_coffee__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./View.coffee */ \"./View.coffee\");\n/* harmony import */ var _Mouse_coffee__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Mouse.coffee */ \"./Mouse.coffee\");\n/* harmony import */ var _entity_class_registry_coffee__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entity-class-registry.coffee */ \"./entity-class-registry.coffee\");\n/* harmony import */ var _helpers_coffee__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers.coffee */ \"./helpers.coffee\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://skele2d/./index.coffee?");

/***/ }),

/***/ "./rename-object-key.coffee":
/*!**********************************!*\
  !*** ./rename-object-key.coffee ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object, old_key, new_key) {\n  var k, new_object, results, v;\n  new_object = {};\n  for (k in object) {\n    v = object[k];\n    if (k === old_key) {\n      new_object[new_key] = v;\n    } else {\n      new_object[k] = v;\n    }\n  }\n// return new_object\n  for (k in object) {\n    v = object[k];\n    delete object[k];\n  }\n  results = [];\n  for (k in new_object) {\n    v = new_object[k];\n    results.push(object[k] = v);\n  }\n  return results;\n};\n\n\n//# sourceURL=webpack://skele2d/./rename-object-key.coffee?");

/***/ }),

/***/ "./structure/BoneStructure.coffee":
/*!****************************************!*\
  !*** ./structure/BoneStructure.coffee ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Structure_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Structure.coffee */ \"./structure/Structure.coffee\");\nvar BoneStructure;\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoneStructure = class BoneStructure extends _Structure_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  addPoint(name) {\n    if (this.points[name]) {\n      throw new Error(`point/segment '${name}' already exists adding point '${name}'`);\n    }\n    return this.points[name] = {\n      x: 0,\n      y: 0,\n      name\n    };\n  }\n\n  addSegment(def) {\n    var from, k, name, to, v;\n    ({from, to, name} = def);\n    if (to == null) {\n      to = name;\n    }\n    if (this.segments[name]) {\n      throw new Error(`segment '${name}' already exists adding segment '${name}'`);\n    }\n    if (this.points[to]) {\n      throw new Error(`point/segment '${name}' already exists adding segment '${name}'`);\n    }\n    if (!this.points[from]) {\n      throw new Error(`point/segment '${from}' does not exist yet adding segment '${name}'`);\n    }\n    this.points[to] = {\n      x: 0,\n      y: 0,\n      name: to\n    };\n    this.segments[name] = {\n      a: this.points[from],\n      b: this.points[to],\n      from,\n      to,\n      name\n    };\n    for (k in def) {\n      v = def[k];\n      if (v != null) {\n        this.segments[name][k] = v;\n      }\n    }\n    return name;\n  }\n\n  stepLayout({center, repel, gravity, collision, velocity} = {}) {\n    var center_around, delta_dist, dist, dx, dy, force, forces, go, move_x, move_y, other_point, other_point_name, point, point_name, ref, ref1, ref2, ref3, resolution, results, segment, segment_name;\n    forces = {};\n    center_around = {\n      x: 0,\n      y: 0\n    };\n    ref = this.points;\n    for (point_name in ref) {\n      point = ref[point_name];\n      forces[point_name] = {\n        x: 0,\n        y: 0\n      };\n      if (center) {\n        dx = center_around.x - point.x;\n        dy = center_around.y - point.y;\n        dist = Math.sqrt(dx * dx + dy * dy);\n        forces[point_name].x += dx * dist / 100000;\n        forces[point_name].y += dy * dist / 100000;\n      }\n      if (repel) {\n        ref1 = this.points;\n        for (other_point_name in ref1) {\n          other_point = ref1[other_point_name];\n          dx = other_point.x - point.x;\n          dy = other_point.y - point.y;\n          dist = Math.sqrt(dx * dx + dy * dy);\n          delta_dist = 5 - dist;\n          if (delta_dist !== 0) {\n            forces[point_name].x += dx / delta_dist / 1000;\n            forces[point_name].y += dy / delta_dist / 1000;\n          }\n        }\n      }\n      if (gravity) {\n        forces[point_name].y += gravity;\n      }\n    }\n    ref2 = this.segments;\n    for (segment_name in ref2) {\n      segment = ref2[segment_name];\n      dx = segment.a.x - segment.b.x;\n      dy = segment.a.y - segment.b.y;\n      dist = Math.sqrt(dx * dx + dy * dy);\n      delta_dist = dist - ((ref3 = segment.length) != null ? ref3 : 50);\n      delta_dist = Math.min(delta_dist, 100);\n      forces[segment.a.name].x -= dx * delta_dist / 1000;\n      forces[segment.a.name].y -= dy * delta_dist / 1000;\n      forces[segment.b.name].x += dx * delta_dist / 1000;\n      forces[segment.b.name].y += dy * delta_dist / 1000;\n    }\n    results = [];\n    for (point_name in forces) {\n      force = forces[point_name];\n      point = this.points[point_name];\n      if (collision) {\n        if (point.vx == null) {\n          point.vx = 0;\n        }\n        if (point.vy == null) {\n          point.vy = 0;\n        }\n        point.vx += force.x;\n        point.vy += force.y;\n        move_x = point.vx;\n        move_y = point.vy;\n        resolution = 0.5;\n        while (Math.abs(move_x) > resolution) {\n          go = Math.sign(move_x) * resolution;\n          if (collision({\n            x: point.x + go,\n            y: point.y\n          })) {\n            point.vx *= 0.99;\n            if (collision({\n              x: point.x + go,\n              y: point.y - 1\n            })) {\n              break;\n            } else {\n              point.y -= 1;\n            }\n          }\n          move_x -= go;\n          point.x += go;\n        }\n        results.push((function() {\n          var results1;\n          results1 = [];\n          while (Math.abs(move_y) > resolution) {\n            go = Math.sign(move_y) * resolution;\n            if (collision({\n              x: point.x,\n              y: point.y + go\n            })) {\n              point.vy *= 0.9; // as opposed to `point.vy = 0` so it sticks to the ground when going downhill\n              break;\n            }\n            move_y -= go;\n            results1.push(point.y += go);\n          }\n          return results1;\n        })());\n      } else {\n        point.x += force.x;\n        results.push(point.y += force.y);\n      }\n    }\n    return results;\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./structure/BoneStructure.coffee?");

/***/ }),

/***/ "./structure/PolygonStructure.coffee":
/*!*******************************************!*\
  !*** ./structure/PolygonStructure.coffee ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Structure_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Structure.coffee */ \"./structure/Structure.coffee\");\nvar PolygonStructure;\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PolygonStructure = class PolygonStructure extends _Structure_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super(); // calls @clear()\n  }\n\n  // don't need to worry about calling onchange because can't be set at this point\n  // but it is useful for the bounding box to be updated (via clear/signalChange/_update_bbox)\n  // during construction.\n  clear() {\n    super.clear();\n    this.id_counter = 0;\n    this.last_point_name = null;\n    this.first_point_name = null;\n    return this.signalChange();\n  }\n\n  signalChange() {\n    // API contract: bbox is updated before call to onchange\n    this._update_bbox();\n    return typeof this.onchange === \"function\" ? this.onchange() : void 0;\n  }\n\n  toJSON() {\n    var point_name, x, y;\n    return {\n      // Excluding segments, bbox_min/bbox_max, id_counter, first_point_name/last_point_name,\n      // because they can all be derived from points.\n      // (This class assumes the points/segments will not be renamed.)\n      points: (function() {\n        var ref, results;\n        ref = this.points;\n        results = [];\n        for (point_name in ref) {\n          ({x, y} = ref[point_name]);\n          results.push({x, y});\n        }\n        return results;\n      }).call(this)\n    };\n  }\n\n  fromJSON(def) {\n    var i, len, ref, x, y;\n    this.points = {};\n    this.segments = {};\n    this.id_counter = 0;\n    this.first_point_name = null;\n    this.last_point_name = null;\n    ref = def.points;\n    for (i = 0, len = ref.length; i < len; i++) {\n      ({x, y} = ref[i]);\n      this.addVertex(x, y, false);\n    }\n    return this.signalChange();\n  }\n\n  addVertex(x, y, registerChange = true) {\n    var from, name;\n    from = this.last_point_name;\n    name = ++this.id_counter;\n    if (this.first_point_name == null) {\n      this.first_point_name = name;\n    }\n    if (this.points[name]) {\n      throw new Error(`point/segment '${name}' already exists adding vertex '${name}'`);\n    }\n    this.points[name] = {x, y, name};\n    this.last_point_name = name;\n    if (this.points[from]) {\n      this.segments[name] = {\n        a: this.points[from],\n        b: this.points[name]\n      };\n      this.segments[\"closing\"] = {\n        a: this.points[this.last_point_name],\n        b: this.points[this.first_point_name]\n      };\n    }\n    if (registerChange) {\n      return this.signalChange();\n    }\n  }\n\n  _update_bbox() {\n    var point, point_name, ref, results;\n    this.bbox_min = {\n      x: 2e308,\n      y: 2e308\n    };\n    this.bbox_max = {\n      x: -2e308,\n      y: -2e308\n    };\n    ref = this.points;\n    results = [];\n    for (point_name in ref) {\n      point = ref[point_name];\n      this.bbox_min.x = Math.min(this.bbox_min.x, point.x);\n      this.bbox_min.y = Math.min(this.bbox_min.y, point.y);\n      this.bbox_max.x = Math.max(this.bbox_max.x, point.x);\n      results.push(this.bbox_max.y = Math.max(this.bbox_max.y, point.y));\n    }\n    return results;\n  }\n\n  pointInPolygon({x, y}) {\n    var a_x, a_y, b_x, b_y, inside, intersect, ref, segment, segment_name;\n    if (x < this.bbox_min.x || x > this.bbox_max.x || y < this.bbox_min.y || y > this.bbox_max.y) {\n      return false;\n    }\n    inside = false;\n    ref = this.segments;\n    for (segment_name in ref) {\n      segment = ref[segment_name];\n      a_x = segment.a.x;\n      a_y = segment.a.y;\n      b_x = segment.b.x;\n      b_y = segment.b.y;\n      intersect = ((a_y > y) !== (b_y > y)) && (x < (b_x - a_x) * (y - a_y) / (b_y - a_y) + a_x);\n      if (intersect) {\n        inside = !inside;\n      }\n    }\n    return inside;\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./structure/PolygonStructure.coffee?");

/***/ }),

/***/ "./structure/Pose.coffee":
/*!*******************************!*\
  !*** ./structure/Pose.coffee ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.coffee */ \"./helpers.coffee\");\nvar Pose,\n  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pose = class Pose {\n  constructor(def) {\n    var point_name, points, x, y;\n    this.points = {};\n    // if points?\n    // \t{points} = points if points.points\n    if (def != null) {\n      ({points} = def);\n      for (point_name in points) {\n        ({x, y} = points[point_name]);\n        this.points[point_name] = {x, y};\n      }\n    }\n  }\n\n  static lerp(a, b, b_ness) {\n    var point_a, point_b, point_name, ref, result;\n    // NOTE: no checks for matching sets of points\n    result = new Pose();\n    ref = a.points;\n    for (point_name in ref) {\n      point_a = ref[point_name];\n      point_b = b.points[point_name];\n      result.points[point_name] = (0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_0__.lerpPoints)(point_a, point_b, b_ness);\n    }\n    return result;\n  }\n\n  static lerpAnimationLoop(frames, soft_index) {\n    var a, b;\n    a = frames[modulo(~~soft_index + 0, frames.length)];\n    b = frames[modulo(~~soft_index + 1, frames.length)];\n    return Pose.lerp(a, b, modulo(soft_index, 1));\n  }\n\n  static alterPoints(pose, fn) {\n    var k, new_point, point, point_name, ref, result, v;\n    result = new Pose();\n    ref = pose.points;\n    for (point_name in ref) {\n      point = ref[point_name];\n      new_point = fn(point);\n      for (k in point) {\n        v = point[k];\n        if (new_point[k] == null) {\n          new_point[k] = v;\n        }\n      }\n      result.points[point_name] = new_point;\n    }\n    return result;\n  }\n\n  static copy(pose) {\n    return Pose.alterPoints(pose, (function() {\n      return {};\n    }));\n  }\n\n  static horizontallyFlip(pose, center_x = 0) {\n    return Pose.alterPoints(pose, function(point) {\n      return {\n        x: center_x - point.x,\n        y: point.y\n      };\n    });\n  }\n\n  static verticallyFlip(pose, center_y = 0) {\n    return Pose.alterPoints(pose, function(point) {\n      return {\n        x: point.x,\n        y: center_y - point.y\n      };\n    });\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./structure/Pose.coffee?");

/***/ }),

/***/ "./structure/Structure.coffee":
/*!************************************!*\
  !*** ./structure/Structure.coffee ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Pose_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pose.coffee */ \"./structure/Pose.coffee\");\nvar Structure;\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Structure = class Structure {\n  constructor() {\n    this.clear();\n  }\n\n  clear() {\n    this.points = {};\n    return this.segments = {};\n  }\n\n  toJSON() {\n    var k, points, ref, segment, segment_name, segments, v;\n    ({points} = this);\n    segments = {};\n    ref = this.segments;\n    for (segment_name in ref) {\n      segment = ref[segment_name];\n      segments[segment_name] = {};\n      for (k in segment) {\n        v = segment[k];\n        if (k !== \"a\" && k !== \"b\") {\n          segments[segment_name][k] = v;\n        }\n      }\n    }\n    return {points, segments};\n  }\n\n  fromJSON(def) {\n    var k, ref, results, seg_def, segment, segment_name, v;\n    this.points = def.points;\n    this.segments = {};\n    ref = def.segments;\n    results = [];\n    for (segment_name in ref) {\n      seg_def = ref[segment_name];\n      segment = {};\n      for (k in seg_def) {\n        v = seg_def[k];\n        segment[k] = v;\n      }\n      segment.a = this.points[segment.from];\n      segment.b = this.points[segment.to];\n      results.push(this.segments[segment_name] = segment);\n    }\n    return results;\n  }\n\n  setPose(pose) {\n    var point, point_name, ref, results;\n    ref = pose.points;\n    results = [];\n    for (point_name in ref) {\n      point = ref[point_name];\n      // console.log point_name, point, @points[point_name]\n      this.points[point_name].x = point.x;\n      results.push(this.points[point_name].y = point.y);\n    }\n    return results;\n  }\n\n  getPose() {\n    return new _Pose_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n  }\n\n});\n\n\n//# sourceURL=webpack://skele2d/./structure/Structure.coffee?");

/***/ }),

/***/ "./tools.coffee":
/*!**********************!*\
  !*** ./tools.coffee ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"run_tool\": () => (/* binding */ run_tool)\n/* harmony export */ });\n/* harmony import */ var _structure_PolygonStructure_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structure/PolygonStructure.coffee */ \"./structure/PolygonStructure.coffee\");\n/* harmony import */ var _helpers_coffee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.coffee */ \"./helpers.coffee\");\nvar line_circle_intersection, towards,\n  indexOf = [].indexOf,\n  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };\n\n\n\n\n\ntowards = function(starting_point, ending_point, max_distance) {\n  var dist, dx, dy;\n  dx = ending_point.x - starting_point.x;\n  dy = ending_point.y - starting_point.y;\n  dist = Math.hypot(dx, dy);\n  if (dist > max_distance) {\n    return {\n      x: starting_point.x + dx / dist * max_distance,\n      y: starting_point.y + dy / dist * max_distance\n    };\n  } else {\n    return ending_point;\n  }\n};\n\nline_circle_intersection = function(x1, y1, x2, y2, cx, cy, r) {\n  var D, along_line, discriminant, dr, dx, dy, horizontal, i1_x, i1_y, i2_x, i2_y, intersections, j, len, point, sqrt_discriminant, t1, t2;\n  intersections = [];\n  // Translate line to new coordinate system with origin at center of circle.\n  x1 -= cx;\n  y1 -= cy;\n  x2 -= cx;\n  y2 -= cy;\n  dx = x2 - x1;\n  dy = y2 - y1;\n  if (dy === 0 && dx === 0) {\n    // Handle degenerate case where line is a point.\n    if (Math.hypot(x1, y1) === r) {\n      intersections.push({\n        x: x1,\n        y: y1\n      });\n    }\n  } else {\n    horizontal = dy === 0;\n    if (horizontal) {\n      // Handle horizontal line segment case by swapping x and y coordinates.\n      [x1, y1, x2, y2, dx, dy] = [y1, x1, y2, x2, dy, dx];\n    }\n    dr = Math.hypot(dx, dy);\n    D = x1 * y2 - (x2 * y1);\n    discriminant = r ** 2 * dr ** 2 - D ** 2;\n    if (discriminant < 0) {\n\n    } else {\n      // Assuming two intersection points\n      // No intersection\n      sqrt_discriminant = Math.sqrt(discriminant);\n      i1_x = (D * dy + Math.sign(dy) * dx * sqrt_discriminant) / dr ** 2;\n      i2_x = (D * dy - (Math.sign(dy) * dx * sqrt_discriminant)) / dr ** 2;\n      i1_y = (-D * dx + Math.abs(dy) * sqrt_discriminant) / dr ** 2;\n      i2_y = (-D * dx - (Math.abs(dy) * sqrt_discriminant)) / dr ** 2;\n      // Can't check dy === 0 because it was swapped with dx above.\n      // Can't check dx === 0 because that would falsely trigger for vertical lines.\n      if (horizontal) {\n        // For horizontal line segment case, swap x and y coordinates back.\n        [i1_x, i1_y, i2_x, i2_y, x1, y1, x2, y2, dx, dy] = [i1_y, i1_x, i2_y, i2_x, y1, x1, y2, x2, dy, dx];\n      }\n      intersections.push({\n        x: i1_x,\n        y: i1_y\n      }, {\n        x: i2_x,\n        y: i2_y\n      });\n    }\n  }\n// Translate intersection points back to original coordinate system\n  for (j = 0, len = intersections.length; j < len; j++) {\n    point = intersections[j];\n    point.x += cx;\n    point.y += cy;\n  }\n  // Associate intersection points with the closest line endpoints\n  along_line = (x, y) => {\n    return ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);\n  };\n  if (intersections.length === 2) {\n    t1 = along_line(intersections[0].x, intersections[0].y);\n    t2 = along_line(intersections[1].x, intersections[1].y);\n    if (t1 > t2) {\n      intersections.reverse();\n    }\n  }\n  return intersections;\n};\n\nvar run_tool = function(tool, editing_entity, mouse_in_world, mouse_world_delta_x, mouse_world_delta_y, brush_size, brush_additive) {\n  var a, angle_a, angle_b, arc_a, arc_b, average_pos, b, base, cluster_start_index, cluster_start_pos, cluster_sum_pos, cyclic_splice, dist, dist_from_cluster_start, dist_squared, dx, dy, end, end_point, get_new_points, i, index_of_shared_point_index_in_other_strand, index_of_shared_point_index_in_strand, indices_within_radius, intersects_a, intersects_b, j, joined, joined_strand, k, l, len, len1, len2, len3, local_mouse_position, long_arc, m, min_distance, new_points, new_points_list, new_points_long_arc, new_points_short_arc, original_points_list, other_point, other_strand, point, point_index, point_name, points_list, radius, ref, ref1, ref2, ref3, ref4, region, second, second_point, second_to_last, second_to_last_point, segment, segment_name, shared_signed_area, short_arc, signed_area, splice_offset, start, start_point, strand, strands, total_expected_area;\n  local_mouse_position = editing_entity.fromWorld(mouse_in_world);\n  indices_within_radius = [];\n  ref = editing_entity.structure.points;\n  for (point_name in ref) {\n    point = ref[point_name];\n    dx = point.x - local_mouse_position.x;\n    dy = point.y - local_mouse_position.y;\n    dist_squared = dx * dx + dy * dy;\n    dist = Math.sqrt(dist_squared);\n    if (dist < brush_size) {\n      switch (tool) {\n        case \"sculpt\":\n          point.x += mouse_world_delta_x / Math.max(1200, dist_squared) * 500;\n          point.y += mouse_world_delta_y / Math.max(1200, dist_squared) * 500;\n          break;\n        case \"roughen\":\n          point.x += (Math.random() - 0.5) * brush_size * 0.1;\n          point.y += (Math.random() - 0.5) * brush_size * 0.1;\n          break;\n        case \"smooth\":\n          ref1 = editing_entity.structure.segments;\n          for (segment_name in ref1) {\n            segment = ref1[segment_name];\n            if (segment.a === point || segment.b === point) {\n              other_point = segment.a === point ? segment.b : segment.a;\n              dx = other_point.x - point.x;\n              dy = other_point.y - point.y;\n              dist = Math.hypot(dx, dy);\n              if (dist > 0) {\n                point.x += dx / dist * brush_size * 0.1;\n                point.y += dy / dist * brush_size * 0.1;\n              }\n            }\n          }\n          break;\n        case \"paint\":\n          indices_within_radius.push(Object.keys(editing_entity.structure.points).indexOf(point_name));\n          // Move points very near the brush circumference towards the center of the brush\n          // to avoid artifacts in the polygon brushing algorithm.\n          region = brush_size * 0.001;\n          if (dist > brush_size * (1 - region)) {\n            point.x -= dx / dist * brush_size * region;\n            point.y -= dy / dist * brush_size * region;\n          }\n      }\n    }\n  }\n  if (tool === \"paint\") {\n    if (!(editing_entity.structure instanceof _structure_PolygonStructure_coffee__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n      throw new Error(\"Paint tool only works on polygon structures\");\n    }\n    // Using serialization to edit the points as a simple list and automatically recompute the segments\n    points_list = editing_entity.structure.toJSON().points;\n    // for referential equality\n    original_points_list = Object.values(editing_entity.structure.points);\n    // Find strands of points that are within the brush radius,\n    // or connected to points that are within the brush radius.\n    // First initialize strands from segments that cross or are within the brush radius.\n    strands = [];\n    ref2 = editing_entity.structure.segments;\n    for (segment_name in ref2) {\n      segment = ref2[segment_name];\n      if (((ref3 = segment.a, indexOf.call(indices_within_radius, ref3) >= 0) && (ref4 = segment.b, indexOf.call(indices_within_radius, ref4) >= 0)) || (0,_helpers_coffee__WEBPACK_IMPORTED_MODULE_1__.distanceToLineSegment)(local_mouse_position, segment.a, segment.b) < brush_size) {\n        strands.push([original_points_list.indexOf(segment.a), original_points_list.indexOf(segment.b)]);\n      }\n    }\n    while (true) {\n      // console.log(\"strands before joining\", strands.join(\" --- \"))\n\n      // Then join strands that share points within the brush radius,\n      // until no more strands can be joined.\n      joined = false;\n      for (j = 0, len = strands.length; j < len; j++) {\n        strand = strands[j];\n        for (k = 0, len1 = strands.length; k < len1; k++) {\n          other_strand = strands[k];\n          if (strand === other_strand) {\n            continue;\n          }\n          for (l = 0, len2 = strand.length; l < len2; l++) {\n            point_index = strand[l];\n            if (!(indexOf.call(indices_within_radius, point_index) >= 0)) {\n              continue;\n            }\n            index_of_shared_point_index_in_other_strand = other_strand.indexOf(point_index);\n            if (index_of_shared_point_index_in_other_strand !== -1) {\n              strands.splice(strands.indexOf(strand), 1);\n              strands.splice(strands.indexOf(other_strand), 1);\n              // Exclude the duplicate point index from the joined strand\n              index_of_shared_point_index_in_strand = strand.indexOf(point_index);\n              strand.splice(index_of_shared_point_index_in_strand, 1);\n              if (index_of_shared_point_index_in_other_strand === 0) {\n                joined_strand = [...strand, ...other_strand];\n              } else {\n                joined_strand = [...other_strand, ...strand];\n              }\n              strands.push(joined_strand);\n              joined = true;\n              break;\n            }\n            if (joined) {\n              break;\n            }\n          }\n          if (joined) {\n            break;\n          }\n        }\n        if (joined) {\n          break;\n        }\n      }\n      if (!joined) {\n        break;\n      }\n    }\n    // console.log(\"strands after joining\", strands.join(\" --- \"))\n\n    // Sort the strands by decreasing index so that splicing doesn't mess up the indices of later splice operations\n    strands.sort(function(a, b) {\n      return b[0] - a[0];\n    });\n    // Handle the case where the whole polygon is within the brush radius\n    // by making the strand cyclic, repeating the first index at the end.\n    // If entities ever support multiple polygons, this will need to be\n    // generalized using the segments information.\n    if (points_list.every(function(point, index) {\n      return indexOf.call(indices_within_radius, index) >= 0;\n    })) {\n      strands[0].push(strands[0][0]);\n    }\n    // Replace the strands with arcs around the center of the brush\n    new_points_list = points_list.slice();\n    splice_offset = 0;\n    for (m = 0, len3 = strands.length; m < len3; m++) {\n      strand = strands[m];\n      if (strand.length < 2) {\n        console.log(\"strand too short\", strand.join(\",\"));\n        continue;\n      }\n      start = strand[0];\n      end = strand[strand.length - 1];\n      if (strand.length === 2) {\n        // Edge case dealing with a single edge.\n        // We could optimize this to only compute intersections once,\n        // but for now I'm duplicating the computation so I don't have to duplicate the code.\n        second = end;\n        second_to_last = start;\n      } else {\n        second = modulo(start + 1, points_list.length);\n        second_to_last = modulo(end - 1, points_list.length);\n      }\n      start_point = points_list[start];\n      second_point = points_list[second];\n      end_point = points_list[end];\n      second_to_last_point = points_list[second_to_last];\n      if (start === end) {\n        // Handle case where the whole polygon is encompassed by the brush\n        angle_a = 0;\n        angle_b = 2 * Math.PI;\n        short_arc = long_arc = 2 * Math.PI;\n        start_point = a = {\n          x: local_mouse_position.x + Math.cos(angle_a) * brush_size,\n          y: local_mouse_position.y + Math.sin(angle_a) * brush_size\n        };\n        end_point = b = {\n          x: local_mouse_position.x + Math.cos(angle_b) * brush_size,\n          y: local_mouse_position.y + Math.sin(angle_b) * brush_size\n        };\n      } else {\n        // Note: end point and second point, as well as start point and second-to-last point,\n        // may be the same points, if only one segment (and no points) are within the brush radius\n        // If we take the first intersect of the first segment and the last intersect of the last segment,\n        // it should still get two distinct points on the circle in that case.\n        intersects_a = line_circle_intersection(start_point.x, start_point.y, second_point.x, second_point.y, local_mouse_position.x, local_mouse_position.y, brush_size);\n        intersects_b = line_circle_intersection(second_to_last_point.x, second_to_last_point.y, end_point.x, end_point.y, local_mouse_position.x, local_mouse_position.y, brush_size);\n        a = intersects_a[0];\n        b = intersects_b[1];\n        if (!a) {\n          console.log(`Intersection not found between segment ${start} to ${second} and the brush circle`);\n          continue;\n        }\n        if (!b) {\n          console.log(`Intersection not found between segment ${second_to_last} to ${end} and the brush circle`);\n          continue;\n        }\n        // console.log \"Segment #{start} to #{second} intersects the brush circle\"\n        // console.log \"Segment #{second_to_last} to #{end} intersects the brush circle\"\n\n        // c = closestPointOnLineSegment(local_mouse_position, start_point, end_point)\n        // a = towards(c, start_point, brush_size)\n        // b = towards(c, end_point, brush_size)\n        // a = closestPointOnLineSegment(a, start_point, end_point)\n        // b = closestPointOnLineSegment(b, start_point, end_point)\n        // Find the short and long arcs between the strand's endpoints, from the brush center.\n        angle_a = Math.atan2(a.y - local_mouse_position.y, a.x - local_mouse_position.x);\n        angle_b = Math.atan2(b.y - local_mouse_position.y, b.x - local_mouse_position.x);\n        arc_a = (angle_a - angle_b + Math.PI * 2) % (Math.PI * 2);\n        arc_b = -(Math.PI * 2 - arc_a);\n        short_arc = Math.abs(arc_a) < Math.abs(arc_b) ? arc_a : arc_b;\n        long_arc = Math.abs(arc_a) < Math.abs(arc_b) ? arc_b : arc_a;\n      }\n      // Check which arc we should use\n      // For additive brushing, we want to do whichever will lead to more area of the resultant polygon.\n      // Another way to look at it, the new points should not be inside the old polygon.\n      // Subtractive brushing is the opposite.\n      get_new_points = function(angle_diff) {\n        var angle, i, n, n_points, new_points, points_per_radian, ref5;\n        // Add new points and segments around the arc of the brush.\n        points_per_radian = 2;\n        n_points = Math.ceil(Math.abs(angle_diff) * points_per_radian);\n        n_points = Math.max(2, n_points);\n        new_points = [];\n        for (i = n = 0, ref5 = n_points; (0 <= ref5 ? n < ref5 : n > ref5); i = 0 <= ref5 ? ++n : --n) {\n          angle = angle_a - angle_diff * i / (n_points - 1);\n          point = {\n            x: local_mouse_position.x + Math.cos(angle) * brush_size,\n            y: local_mouse_position.y + Math.sin(angle) * brush_size\n          };\n          new_points.push(point);\n        }\n        return new_points;\n      };\n      new_points_short_arc = get_new_points(short_arc);\n      new_points_long_arc = get_new_points(long_arc);\n      // Hit-test solution is not totally correct\n      // n_inside_short = new_points_short_arc.filter((point) -> editing_entity.structure.pointInPolygon(point)).length\n      // n_inside_long = new_points_long_arc.filter((point) -> editing_entity.structure.pointInPolygon(point)).length\n\n      // if (n_inside_short > n_inside_long) == brush_additive\n      // \tnew_points = new_points_long_arc\n      // else\n      // \tnew_points = new_points_short_arc\n\n      // Analytic solution using shoelace formula\n      signed_area = function(segments) {\n        var len4, n, sum;\n        sum = 0;\n        for (n = 0, len4 = segments.length; n < len4; n++) {\n          segment = segments[n];\n          sum += (segment.b.x - segment.a.x) * (segment.b.y + segment.a.y);\n        }\n        return sum / 2;\n      };\n      shared_signed_area = signed_area(Object.values(editing_entity.structure.segments).filter(function(segment) {\n        var ref5, ref6;\n        return (ref5 = segment.a, indexOf.call(strand, ref5) < 0) && (ref6 = segment.b, indexOf.call(strand, ref6) < 0);\n      }));\n      total_expected_area = function(new_arc_points) {\n        var arc_segments, arc_signed_area;\n        arc_segments = [start_point, ...new_arc_points].map(function(point, i) {\n          var ref5;\n          return {\n            a: point,\n            b: (ref5 = new_arc_points[i + 1]) != null ? ref5 : end_point\n          };\n        });\n        arc_signed_area = signed_area(arc_segments);\n        return Math.abs(arc_signed_area + shared_signed_area);\n      };\n      if ((total_expected_area(new_points_short_arc) < total_expected_area(new_points_long_arc)) === brush_additive) {\n        new_points = new_points_long_arc;\n      } else {\n        new_points = new_points_short_arc;\n      }\n      \n      // Splice the new points into the list of points\n      cyclic_splice = function(list, start, delete_count, ...items) {\n        var delete_with_wrapping, delete_without_wrapping, insert_without_wrapping, insert_wrapped;\n        // This function preserves earlier indices even when wrapping\n        // and inserting/deleting different numbers of items, WHEN POSSIBLE,\n        // by splitting up the inserted items according to the number of items deleted.\n        // Specifically, the number of items inserted that are wrapped around to the end of the list\n        // is matched to the number of items deleted that are wrapped around to the beginning of the list.\n        // However, if the number of items deleted (that are wrapped) is greater than the number of items inserted,\n        // it is impossible to preserve earlier indices, and splice_offset will be updated instead.\n        start += splice_offset;\n        delete_without_wrapping = Math.min(delete_count, list.length - start);\n        delete_with_wrapping = delete_count - delete_without_wrapping;\n        insert_wrapped = Math.min(delete_with_wrapping, items.length);\n        insert_without_wrapping = items.length - insert_wrapped;\n        list.splice(start, delete_without_wrapping, ...items.slice(0, insert_without_wrapping));\n        if (delete_with_wrapping > 0) {\n          list.splice(0, delete_with_wrapping, ...items.slice(insert_without_wrapping));\n          splice_offset += insert_wrapped - delete_with_wrapping;\n        }\n      };\n      if (start === end) {\n        // If whole polygon is encompassed, replace whole strand\n        // Note: since this strand duplicates first as last, subtract one from the length\n        cyclic_splice(new_points_list, start, strand.length - 1, ...new_points);\n      } else {\n        // Otherwise, make sure to keep the start and end points\n        // which may lie outside the brush radius\n        // new_points_list = new_points\n        cyclic_splice(new_points_list, start + 1, strand.length - 2, ...new_points);\n      }\n    }\n    // Finally, merge points that are too close together\n    // (In continuous brushing, many points may be added in the same place if you're not moving the mouse.)\n    // Only affect points near the brush. Otherwise it would cause big git diffs in the world data,\n    // and probably general confusion, because you'd be changing points that you didn't even see,\n    // in subtle, or if buggy, unpredictable ways.\n    min_distance = 0.01;\n    cluster_start_index = 0;\n    cluster_start_pos = null; // for distance threshold for the current cluster\n    cluster_sum_pos = null; // for finding the average position\n    radius = brush_size * 1.01;\n    // TODO: handle wrapping around the end of the list\n    // Should just need to extend iteration by one, and modulo the index,\n    // since the points at the start will already be de-clustered.\n    // It wouldn't be a perfectly symmetric solution, but it should be good enough.\n    i = 0;\n    while (i < new_points_list.length) {\n      point = new_points_list[i];\n      if (cluster_start_pos == null) {\n        cluster_start_pos = point;\n      }\n      if (cluster_sum_pos == null) {\n        cluster_sum_pos = {\n          x: 0,\n          y: 0\n        };\n      }\n      dist_from_cluster_start = Math.hypot(point.x - cluster_start_pos.x, point.y - cluster_start_pos.y);\n      if (dist_from_cluster_start > min_distance || Math.hypot(point.x - local_mouse_position.x, point.y - local_mouse_position.y) > radius) {\n        // If this point is far enough from the start of the cluster, then we're done with the cluster\n        // and can average the positions\n        if (i - cluster_start_index > 1) {\n          // If there were at least two points in the cluster, then average them\n          average_pos = {\n            x: cluster_sum_pos.x / (i - cluster_start_index),\n            y: cluster_sum_pos.y / (i - cluster_start_index)\n          };\n          new_points_list.splice(cluster_start_index, i - cluster_start_index, average_pos);\n          i = cluster_start_index + 1;\n        }\n        // Start a new cluster\n        cluster_start_index = i;\n        cluster_start_pos = point;\n        cluster_sum_pos = {\n          x: point.x,\n          y: point.y\n        };\n      } else {\n        // If this point is close enough to the start of the cluster, then add it to the cluster\n        cluster_sum_pos.x += point.x;\n        cluster_sum_pos.y += point.y;\n      }\n      i++;\n    }\n    // If there's a cluster at the end, average it\n    if (i - cluster_start_index > 1) {\n      average_pos = {\n        x: cluster_sum_pos.x / (i - cluster_start_index),\n        y: cluster_sum_pos.y / (i - cluster_start_index)\n      };\n      new_points_list.splice(cluster_start_index, i - cluster_start_index, average_pos);\n    }\n    // Note: this causes a duplicate signalChange() call; we could avoid it by not calling signalChange() below for this tool\n    editing_entity.structure.fromJSON({\n      points: new_points_list\n    });\n  }\n  return typeof (base = editing_entity.structure).signalChange === \"function\" ? base.signalChange() : void 0;\n};\n\n\n//# sourceURL=webpack://skele2d/./tools.coffee?");

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./jsMenus/jsMenus.css":
/*!********************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./jsMenus/jsMenus.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"../node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nhtml, body {\\n\\tmargin: 0;\\n\\theight: 100%;\\n}\\nbody { display: flex; flex-direction: column }\\n.menubar { flex: 0 0 22px }\\ndiv.below-menubar { flex: 1 1 0; min-height: 0;}\\n\\n.nwjs-menu {\\n\\tfont-family: 'Helvetica Neue', HelveticaNeue, 'TeX Gyre Heros', TeXGyreHeros, FreeSans, 'Nimbus Sans L', 'Liberation Sans', Arimo, Helvetica, Arial, sans-serif;\\n\\tfont-size: 14px;\\n\\tcolor: #2c2c2c;\\n\\t-webkit-user-select: none;\\n\\tuser-select: none;\\n\\t-webkit-font-smoothing: subpixel-antialiased;\\n\\tfont-weight: 400;\\n}\\n\\n.contextmenu {\\n\\tmin-width: 100px;\\n\\tbackground-color: #fafafa;\\n\\tposition: fixed;\\n\\topacity: 0;\\n\\ttransition: opacity 250ms;\\n\\tmargin: 0;\\n\\tpadding: 0 0;\\n\\tlist-style: none;\\n\\tpointer-events: none;\\n\\tborder: 1px rgba(191, 191, 191, 0.8) solid;\\n\\tbox-shadow: rgba(43, 43, 43, 0.34) 1px 1px 11px 0px;\\n\\tz-index: 2147483647;\\n}\\n\\n.contextmenu {\\n\\topacity: 1;\\n\\ttransition: opacity 30ms;\\n\\tpointer-events: all;\\n}\\n\\n.contextmenu.submenu {\\n    transition: opacity 250ms;\\n}\\n\\n.contextmenu.submenu {\\n\\ttransition: opacity 150ms;\\n\\ttransition-timing-function: step-end;\\n}\\n\\n.menu-item.normal,\\n.menu-item.checkbox,\\n.menu-item.radio {\\n\\tcursor: default;\\n\\tpadding: 2px 0;\\n\\tbox-sizing: border-box;\\n\\tposition: relative;\\n\\tdisplay: flex;\\n\\tflex-direction: row;\\n\\tflex-wrap: nowrap;\\n\\tjustify-content: flex-start;\\n\\talign-content: stretch;\\n\\talign-items: flex-start;\\n\\twidth: 100%;\\n}\\n\\n.contextmenu .menu-item.active,\\n.menu-item.normal.submenu-active {\\n\\tbackground-color: #499BFE;\\n\\tcolor: #fff;\\n}\\n\\n.menu-item.normal > div,\\n.menu-item.checkbox > div,\\n.menu-item.radio > div {\\n    align-self: center;\\n    vertical-align: middle;\\n    display: inline-flex;\\n    justify-content: flex-start;\\n    flex-shrink: 0;\\n}\\n\\n.menu-item.normal .icon {\\n    display: inline-flex;\\n    vertical-align: middle;\\n    max-width: 16px;\\n    max-height: 16px;\\n    align-self: center;\\n}\\n\\nli.menu-item.separator {\\n\\theight: 2px;\\n\\tbackground-color: rgba(128, 128, 128, 0.2);\\n\\tmargin: 5px 0;\\n}\\n\\n.menu-item .modifiers,\\n.menu-item .icon-wrap,\\n.menu-item .checkmark {\\n\\tdisplay: inline-flex;\\n\\talign-items: center;\\n\\tvertical-align: middle;\\n}\\n\\n.menu-item .checkmark {\\n\\twidth: 22px;\\n}\\n\\n.menu-item .modifiers {\\n\\tbox-sizing: border-box;\\n\\tpadding: 0 6px;\\n\\ttext-align: right;\\n\\torder: 0;\\n    flex: 0 0 auto;\\n    align-self: center;\\n}\\n\\n.menu-item .label {\\n    padding: 0 22px 0 0;\\n    order: 0;\\n    flex: 1 0 auto;\\n    align-self: center;\\n}\\n\\n.menu-item.disabled,\\n.menu-item.disabled:hover,\\n.contextmenu .menu-item.disabled:hover {\\n    color: #ababab;\\n}\\n\\n.menu-item.disabled:hover,\\n.contextmenu .menu-item.disabled:hover {\\n    background-color: transparent;\\n}\\n\\n.menu-item .icon-wrap {\\n    padding: 0 6px 0 0;\\n    display: inline-flex;\\n    align-self: center;\\n}\\n\\n.menu-item .label-text {\\n    align-items: center;\\n    vertical-align: middle;\\n}\\n\\n.menu-item.checkbox.checked .checkmark::before {\\n\\tcontent: '✔';\\n\\ttext-align: center;\\n\\twidth: 100%;\\n}\\n\\n.menu-item.radio.checked .checkmark::before {\\n\\tcontent: '⊚';\\n\\ttext-align: center;\\n\\twidth: 100%;\\n}\\n\\n.menubar {\\n\\theight: 22px;\\n\\tmargin: 0;\\n\\tpadding: 0;\\n\\ttop: 0;\\n\\tleft: 0;\\n\\tright: 0;\\n\\tbackground-color: #eee;\\n\\tz-index: 2147483647;\\n}\\n\\n.menubar .menu-item.normal {\\n    display: inline-block;\\n    width: auto;\\n    height: 100%;\\n}\\n\\n.menubar .menu-item.normal > div {\\n    vertical-align: top;\\n}\\n\\n.menubar .menu-item.normal .checkmark,\\n.menubar .menu-item.normal .modifiers {\\n    display: none;\\n}\\n\\n.menubar .menu-item.normal .label {\\n    padding: 0 9px;\\n}\\n\\n.contextmenu.menubar-submenu {\\n    transition: opacity 0ms;\\n}\\n\\n/* Mac only?\\n.contextmenu {\\n    border-radius: 7px;\\n}\\n.contextmenu.menubar-submenu {\\n    border-radius: 0 0 7px 7px;\\n}\\n*/\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://skele2d/./jsMenus/jsMenus.css?../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./styles.css":
/*!***********************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./styles.css ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"../node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".editor {\\n\\t-webkit-touch-callout: none;\\n\\t-webkit-user-select: none;\\n\\t-moz-user-select: none;\\n\\tuser-select: none;\\n\\tposition: absolute;\\n\\ttop: 0;\\n\\tleft: 0;\\n\\tright: 0;\\n\\tbottom: 0;\\n\\tdisplay: flex;\\n\\t/* This is to allow clicking through to the canvas which is underneath the editor.\\n\\tIt has to be carefully re-enabled on children with pointer-events: auto; */\\n\\tpointer-events: none;\\n}\\n.grabbable {\\n\\tcursor: move; /* fallback if grab cursor is unsupported */\\n\\tcursor: grab;\\n\\tcursor: -moz-grab;\\n\\tcursor: -webkit-grab;\\n}\\n/* Apply a \\\"closed-hand\\\" cursor during drag operation. */\\n.grabbable:active { \\n\\tcursor: grabbing;\\n\\tcursor: -moz-grabbing;\\n\\tcursor: -webkit-grabbing;\\n}\\n/* Sidebars */\\n.bar {\\n\\tbackground: white;\\n\\ttransition: opacity 0.2s ease;\\n\\tdisplay: flex;\\n\\talign-items: stretch;\\n\\talign-content: flex-start;\\n\\tflex: 0 0 auto;\\n\\tpointer-events: auto;\\n}\\n.bar:not(.visible) {\\n\\topacity: 0;\\n\\tpointer-events: none;\\n}\\n.sidebar {\\n\\tposition: absolute;\\n\\tz-index: 1;\\n\\ttop: 0;\\n\\theight: 100%;\\n\\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\\n\\tflex-direction: column;\\n}\\n.sidebar:not(.right-sidebar) {\\n\\tleft: 0;\\n}\\n.sidebar.right-sidebar {\\n\\tright: 0;\\n}\\n.tools-bar:not(.visible) {\\n\\t/* It needs to not take up vertical space when hidden.\\n\\tThe opacity transition is bad with height: 0 here,\\n\\tso just hide the element until a better transition is developed. */\\n\\t/* height: 0; */\\n\\tdisplay: none;\\n}\\n.tools-bar {\\n\\tz-index: 2;\\n\\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\\n\\tflex-direction: row;\\n\\talign-items: center;\\n}\\n.layout-horizontal {\\n\\tdisplay: flex;\\n\\tflex-direction: row;\\n\\tflex: 1;\\n}\\n.layout-vertical {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tflex: 1;\\n}\\n.bar article {\\n\\tpadding: 1rem;\\n\\tpadding-top: 0.5rem;\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n}\\n.tools button[aria-pressed=\\\"true\\\"] {\\n\\tbackground: rgba(0, 157, 255, 0.12);\\n\\tbox-shadow: 0 0 0 2px rgba(0, 157, 255, 0.5) inset;\\n}\\n.bar button img {\\n\\tpointer-events: none;\\n}\\n.tools button:disabled img {\\n\\topacity: 0.4;\\n}\\n.mdl-button--icon {\\n\\tdisplay: inline-flex;\\n\\talign-items: center;\\n\\tjustify-content: center;\\n}\\n.tool-options label {\\n\\tdisplay: inline-flex;\\n\\tmargin-left: 2rem;\\n}\\n.tool-options label span {\\n\\tmargin-right: -20px;\\n}\\n.bar article:hover {\\n\\tbackground: rgba(0, 0, 0, 0.08);\\n}\\n.bar article:active,\\n.bar article.selected {\\n\\tbackground: rgba(0, 0, 0, 0.12);\\n}\\n.bar article canvas {\\n\\tbackground: rgba(50, 200, 255, 0.7);\\n}\\n.bar article:hover canvas,\\n.bar article:active canvas,\\n.bar article.selected canvas {\\n\\tbackground: rgba(50, 200, 255, 1);\\n}\\n.entity-preview {\\n\\tposition: relative;\\n}\\n.entity-preview .error {\\n\\tposition: absolute;\\n\\ttop: 0;\\n\\tleft: 0;\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tbackground: rgba(255, 0, 0, 0.5);\\n\\tcolor: white;\\n\\tfont-family: monospace;\\n\\ttext-align: center;\\n}\\n.bar h1 {\\n\\ttext-align: center;\\n\\tfont-size: 2em;\\n\\tfont-weight: normal;\\n\\tmargin: 0.1em 0;\\n}\\n.bar article > h1 {\\n\\tpointer-events: none;\\n}\\n.bar article .title-bar {\\n\\tdisplay: flex;\\n\\tflex-direction: row;\\n}\\n.bar .name {\\n\\tfont-size: 1.2em;\\n\\tfont-weight: normal;\\n\\tfont-family: sans-serif;\\n\\tmargin: 0;\\n\\tmargin-bottom: 0.1em;\\n}\\n.entities-bar .name {\\n\\ttext-align: center;\\n}\\n.bar article .mdl-textfield {\\n\\twidth: auto;\\n\\tpadding: 0;\\n\\tpadding-bottom: 0.3rem;\\n}\\nbutton,\\ncanvas,\\nimg,\\narticle, /* representing entities, poses, animations, animation frames - things with EntityPreviews in them */\\n.anims > * { /* includes headings and .anim-groups */\\n\\tflex: 0 0 auto;\\n}\\n.anim-bar {\\n\\tflex-direction: row;\\n\\talign-items: flex-start;\\n}\\n.anim-bar > * {\\n\\theight: 100%;\\n}\\n/* TODO: refactor bars and subbars */\\n.anim-bar > *:not(:first-child) {\\n\\tborder-left: 1px solid rgba(0, 0, 0, 0.12);\\n}\\n.anims,\\n.anim-group {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\talign-items: stretch;\\n}\\n.anims,\\n.animation-frames,\\n.entities-bar {\\n\\toverflow-y: auto;\\n\\toverflow-x: hidden;\\n}\\n/* TODO: refactor bars and subbars */\\n.animation-frames {\\n\\t/*transition: 0.1s ease;*/\\n}\\n.animation-frames:not(.visible) {\\n\\topacity: 0;\\n\\tpointer-events: none;\\n\\twidth: 0;\\n\\t/*transform: translate(-100%, 0);*/\\n}\\n.add-anim-fab {\\n\\tmargin: 0.5rem 0 !important;\\n\\talign-self: center;\\n}\\n.poses,\\n.animations {\\n\\twidth: 100%;\\n}\\narticle.placeholder {\\n\\tpadding: 2rem;\\n\\ttext-align: center;\\n\\tbackground: rgba(128, 59, 110, 0.16);\\n\\tcolor: rgba(0, 0, 0, 0.5);\\n\\tfont-size: 1.4em;\\n\\tpointer-events: none;\\n}\\n\\n.warning {\\n\\tposition: absolute;\\n\\ttop: 0;\\n\\tright: 0;\\n\\tz-index: 50;\\n\\tmargin: 15px;\\n\\tpadding: 15px;\\n\\tbackground: #FFF9C4;\\n\\tcolor: #BF360C;\\n\\tborder-radius: 2px;\\n\\ttransition: opacity 0.2s ease;\\n\\tpointer-events: auto;\\n}\\n.warning:not(.show) {\\n\\tpointer-events: none;\\n\\topacity: 0;\\n}\\n\\n.mdl-textfield__input:invalid {\\n\\tbackground: rgba(255, 0, 0, 0.1);\\n\\tborder-bottom-color: red;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://skele2d/./styles.css?../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://skele2d/../node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!***************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://skele2d/../node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "../node_modules/object-assign/index.js":
/*!**********************************************!*\
  !*** ../node_modules/object-assign/index.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack://skele2d/../node_modules/object-assign/index.js?");

/***/ }),

/***/ "../node_modules/react-dom/cjs/react-dom.development.js":
/*!**************************************************************!*\
  !*** ../node_modules/react-dom/cjs/react-dom.development.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/***/ }),

/***/ "../node_modules/react-dom/index.js":
/*!******************************************!*\
  !*** ../node_modules/react-dom/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nfunction checkDCE() {\n  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\n  if (\n    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||\n    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'\n  ) {\n    return;\n  }\n  if (true) {\n    // This branch is unreachable because this function is only called\n    // in production, but the condition is true only in development.\n    // Therefore if the branch is still here, dead code elimination wasn't\n    // properly applied.\n    // Don't change the message. React DevTools relies on it. Also make sure\n    // this message doesn't occur elsewhere in this function, or it will cause\n    // a false positive.\n    throw new Error('^_^');\n  }\n  try {\n    // Verify that the code above has been dead code eliminated (DCE'd).\n    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);\n  } catch (err) {\n    // DevTools shouldn't crash React, no matter what.\n    // We should still report in case we break this code.\n    console.error(err);\n  }\n}\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react-dom.development.js */ \"../node_modules/react-dom/cjs/react-dom.development.js\");\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/react-dom/index.js?");

/***/ }),

/***/ "../node_modules/react-script/lib/react-script.js":
/*!********************************************************!*\
  !*** ../node_modules/react-script/lib/react-script.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n// Generated by CoffeeScript 1.9.1\n(function() {\n  var E, React, add, hyphenate, is_plainish_object, ref,\n    slice = [].slice;\n\n  React = (ref = this.React) != null ? ref : __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n\n  is_plainish_object = function(o) {\n    return (o != null) && typeof o === \"object\" && !(o instanceof Array || React.isValidElement(o));\n  };\n\n  add = function(from, arg) {\n    var i, k, len, thing, to, v;\n    to = arg.to;\n    if (from instanceof Array) {\n      for (i = 0, len = from.length; i < len; i++) {\n        thing = from[i];\n        add(thing, {\n          to: to\n        });\n      }\n      return true;\n    } else if (is_plainish_object(from)) {\n      for (k in from) {\n        v = from[k];\n        if (v) {\n          to.push(hyphenate(k));\n        }\n      }\n      return true;\n    } else if (from != null) {\n      to.push(from);\n    }\n    return false;\n  };\n\n  hyphenate = function(v) {\n    return (\"\" + v).replace(/_/g, \"-\").replace(/([a-z])([A-Z])/g, function(m, az, AZ) {\n      return az + \"-\" + (AZ.toLowerCase());\n    });\n  };\n\n  E = function() {\n    var addAttr, args, aria_k, aria_v, attr_args, attr_k, attr_v, child_arg, child_args, class_names, data_k, data_v, element_type, final_attributes, final_child_args, i, len, partial_selector, selector, unhandled, was_dynamic, will_have_been_dynamic;\n    element_type = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];\n    if (element_type == null) {\n      element_type = \"\";\n    }\n    if (is_plainish_object(args[0])) {\n      attr_args = args[0], child_args = 2 <= args.length ? slice.call(args, 1) : [];\n    } else {\n      child_args = 1 <= args.length ? slice.call(args, 0) : [];\n      attr_args = null;\n    }\n    switch (typeof element_type) {\n      case \"string\":\n        selector = element_type;\n        element_type = \"div\";\n        partial_selector = selector.replace(/^[a-z][a-z0-9\\-_]*/i, function(match) {\n          element_type = match;\n          return \"\";\n        });\n        final_attributes = {};\n        class_names = [];\n        addAttr = function(attr_k, attr_v, aria) {\n          if (!(attr_v === false && !aria)) {\n            return final_attributes[attr_k] = attr_v;\n          }\n        };\n        for (attr_k in attr_args) {\n          attr_v = attr_args[attr_k];\n          if (attr_k === \"class\" || attr_k === \"className\" || attr_k === \"classes\" || attr_k === \"classNames\" || attr_k === \"classList\") {\n            add(attr_v, {\n              to: class_names\n            });\n          } else if (attr_k === \"data\") {\n            for (data_k in attr_v) {\n              data_v = attr_v[data_k];\n              addAttr(\"data-\" + (hyphenate(data_k)), data_v);\n            }\n          } else if (attr_k === \"aria\") {\n            for (aria_k in attr_v) {\n              aria_v = attr_v[aria_k];\n              addAttr(\"aria-\" + (hyphenate(aria_k)), aria_v, true);\n            }\n          } else if (attr_k.match(/^data/)) {\n            addAttr(hyphenate(attr_k), attr_v);\n          } else if (attr_k.match(/^aria/)) {\n            addAttr(hyphenate(attr_k), attr_v, true);\n          } else {\n            addAttr(attr_k, attr_v);\n          }\n        }\n        if (partial_selector) {\n          unhandled = partial_selector.replace(/\\.([a-z][a-z0-9\\-_]*)/gi, function(m, className) {\n            class_names.push(className);\n            return \"\";\n          }).replace(/#([a-z][a-z0-9\\-_]*)/gi, function(m, id) {\n            final_attributes.id = id;\n            return \"\";\n          });\n        }\n        if (unhandled) {\n          throw new Error(\"Unhandled selector fragment '\" + unhandled + \"' in selector: '\" + selector + \"'\");\n        }\n        if (class_names.length) {\n          final_attributes.className = class_names.join(\" \");\n        }\n        break;\n      case \"function\":\n        final_attributes = attr_args;\n        break;\n      default:\n        throw new Error(\"Invalid first argument to ReactScript: \" + element_type);\n    }\n    final_child_args = [];\n    was_dynamic = false;\n    for (i = 0, len = child_args.length; i < len; i++) {\n      child_arg = child_args[i];\n      will_have_been_dynamic = add(child_arg, {\n        to: final_child_args\n      });\n      was_dynamic || (was_dynamic = will_have_been_dynamic);\n    }\n    if (was_dynamic) {\n      return React.createElement(element_type, final_attributes, final_child_args);\n    } else {\n      return React.createElement.apply(React, [element_type, final_attributes].concat(slice.call(final_child_args)));\n    }\n  };\n\n  if (( true && module !== null ? module.exports : void 0) != null) {\n    module.exports = E;\n  } else {\n    this.ReactScript = E;\n  }\n\n}).call(this);\n\n\n//# sourceURL=webpack://skele2d/../node_modules/react-script/lib/react-script.js?");

/***/ }),

/***/ "../node_modules/react/cjs/react.development.js":
/*!******************************************************!*\
  !*** ../node_modules/react/cjs/react.development.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("/** @license React v17.0.2\n * react.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nvar _assign = __webpack_require__(/*! object-assign */ \"../node_modules/object-assign/index.js\");\n\n// TODO: this is special because it gets imported during build.\nvar ReactVersion = '17.0.2';\n\n// ATTENTION\n// When adding new symbols to this file,\n// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'\n// The Symbol used to tag the ReactElement-like types. If there is no native Symbol\n// nor polyfill, then a plain number is used for performance.\nvar REACT_ELEMENT_TYPE = 0xeac7;\nvar REACT_PORTAL_TYPE = 0xeaca;\nexports.Fragment = 0xeacb;\nexports.StrictMode = 0xeacc;\nexports.Profiler = 0xead2;\nvar REACT_PROVIDER_TYPE = 0xeacd;\nvar REACT_CONTEXT_TYPE = 0xeace;\nvar REACT_FORWARD_REF_TYPE = 0xead0;\nexports.Suspense = 0xead1;\nvar REACT_SUSPENSE_LIST_TYPE = 0xead8;\nvar REACT_MEMO_TYPE = 0xead3;\nvar REACT_LAZY_TYPE = 0xead4;\nvar REACT_BLOCK_TYPE = 0xead9;\nvar REACT_SERVER_BLOCK_TYPE = 0xeada;\nvar REACT_FUNDAMENTAL_TYPE = 0xead5;\nvar REACT_SCOPE_TYPE = 0xead7;\nvar REACT_OPAQUE_ID_TYPE = 0xeae0;\nvar REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;\nvar REACT_OFFSCREEN_TYPE = 0xeae2;\nvar REACT_LEGACY_HIDDEN_TYPE = 0xeae3;\n\nif (typeof Symbol === 'function' && Symbol.for) {\n  var symbolFor = Symbol.for;\n  REACT_ELEMENT_TYPE = symbolFor('react.element');\n  REACT_PORTAL_TYPE = symbolFor('react.portal');\n  exports.Fragment = symbolFor('react.fragment');\n  exports.StrictMode = symbolFor('react.strict_mode');\n  exports.Profiler = symbolFor('react.profiler');\n  REACT_PROVIDER_TYPE = symbolFor('react.provider');\n  REACT_CONTEXT_TYPE = symbolFor('react.context');\n  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');\n  exports.Suspense = symbolFor('react.suspense');\n  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');\n  REACT_MEMO_TYPE = symbolFor('react.memo');\n  REACT_LAZY_TYPE = symbolFor('react.lazy');\n  REACT_BLOCK_TYPE = symbolFor('react.block');\n  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');\n  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');\n  REACT_SCOPE_TYPE = symbolFor('react.scope');\n  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');\n  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');\n  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');\n  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');\n}\n\nvar MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\nvar FAUX_ITERATOR_SYMBOL = '@@iterator';\nfunction getIteratorFn(maybeIterable) {\n  if (maybeIterable === null || typeof maybeIterable !== 'object') {\n    return null;\n  }\n\n  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];\n\n  if (typeof maybeIterator === 'function') {\n    return maybeIterator;\n  }\n\n  return null;\n}\n\n/**\n * Keeps track of the current dispatcher.\n */\nvar ReactCurrentDispatcher = {\n  /**\n   * @internal\n   * @type {ReactComponent}\n   */\n  current: null\n};\n\n/**\n * Keeps track of the current batch's configuration such as how long an update\n * should suspend for if it needs to.\n */\nvar ReactCurrentBatchConfig = {\n  transition: 0\n};\n\n/**\n * Keeps track of the current owner.\n *\n * The current owner is the component who should own any components that are\n * currently being constructed.\n */\nvar ReactCurrentOwner = {\n  /**\n   * @internal\n   * @type {ReactComponent}\n   */\n  current: null\n};\n\nvar ReactDebugCurrentFrame = {};\nvar currentExtraStackFrame = null;\nfunction setExtraStackFrame(stack) {\n  {\n    currentExtraStackFrame = stack;\n  }\n}\n\n{\n  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {\n    {\n      currentExtraStackFrame = stack;\n    }\n  }; // Stack implementation injected by the current renderer.\n\n\n  ReactDebugCurrentFrame.getCurrentStack = null;\n\n  ReactDebugCurrentFrame.getStackAddendum = function () {\n    var stack = ''; // Add an extra top frame while an element is being validated\n\n    if (currentExtraStackFrame) {\n      stack += currentExtraStackFrame;\n    } // Delegate to the injected renderer-specific implementation\n\n\n    var impl = ReactDebugCurrentFrame.getCurrentStack;\n\n    if (impl) {\n      stack += impl() || '';\n    }\n\n    return stack;\n  };\n}\n\n/**\n * Used by act() to track whether you're inside an act() scope.\n */\nvar IsSomeRendererActing = {\n  current: false\n};\n\nvar ReactSharedInternals = {\n  ReactCurrentDispatcher: ReactCurrentDispatcher,\n  ReactCurrentBatchConfig: ReactCurrentBatchConfig,\n  ReactCurrentOwner: ReactCurrentOwner,\n  IsSomeRendererActing: IsSomeRendererActing,\n  // Used by renderers to avoid bundling object-assign twice in UMD bundles:\n  assign: _assign\n};\n\n{\n  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;\n}\n\n// by calls to these methods by a Babel plugin.\n//\n// In PROD (or in packages without access to React internals),\n// they are left as they are instead.\n\nfunction warn(format) {\n  {\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    printWarning('warn', format, args);\n  }\n}\nfunction error(format) {\n  {\n    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n      args[_key2 - 1] = arguments[_key2];\n    }\n\n    printWarning('error', format, args);\n  }\n}\n\nfunction printWarning(level, format, args) {\n  // When changing this logic, you might want to also\n  // update consoleWithStackDev.www.js as well.\n  {\n    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;\n    var stack = ReactDebugCurrentFrame.getStackAddendum();\n\n    if (stack !== '') {\n      format += '%s';\n      args = args.concat([stack]);\n    }\n\n    var argsWithFormat = args.map(function (item) {\n      return '' + item;\n    }); // Careful: RN currently depends on this prefix\n\n    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it\n    // breaks IE9: https://github.com/facebook/react/issues/13610\n    // eslint-disable-next-line react-internal/no-production-logging\n\n    Function.prototype.apply.call(console[level], console, argsWithFormat);\n  }\n}\n\nvar didWarnStateUpdateForUnmountedComponent = {};\n\nfunction warnNoop(publicInstance, callerName) {\n  {\n    var _constructor = publicInstance.constructor;\n    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';\n    var warningKey = componentName + \".\" + callerName;\n\n    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {\n      return;\n    }\n\n    error(\"Can't call %s on a component that is not yet mounted. \" + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);\n\n    didWarnStateUpdateForUnmountedComponent[warningKey] = true;\n  }\n}\n/**\n * This is the abstract API for an update queue.\n */\n\n\nvar ReactNoopUpdateQueue = {\n  /**\n   * Checks whether or not this composite component is mounted.\n   * @param {ReactClass} publicInstance The instance we want to test.\n   * @return {boolean} True if mounted, false otherwise.\n   * @protected\n   * @final\n   */\n  isMounted: function (publicInstance) {\n    return false;\n  },\n\n  /**\n   * Forces an update. This should only be invoked when it is known with\n   * certainty that we are **not** in a DOM transaction.\n   *\n   * You may want to call this when you know that some deeper aspect of the\n   * component's state has changed but `setState` was not called.\n   *\n   * This will not invoke `shouldComponentUpdate`, but it will invoke\n   * `componentWillUpdate` and `componentDidUpdate`.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} callerName name of the calling function in the public API.\n   * @internal\n   */\n  enqueueForceUpdate: function (publicInstance, callback, callerName) {\n    warnNoop(publicInstance, 'forceUpdate');\n  },\n\n  /**\n   * Replaces all of the state. Always use this or `setState` to mutate state.\n   * You should treat `this.state` as immutable.\n   *\n   * There is no guarantee that `this.state` will be immediately updated, so\n   * accessing `this.state` after calling this method may return the old value.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {object} completeState Next state.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} callerName name of the calling function in the public API.\n   * @internal\n   */\n  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {\n    warnNoop(publicInstance, 'replaceState');\n  },\n\n  /**\n   * Sets a subset of the state. This only exists because _pendingState is\n   * internal. This provides a merging strategy that is not available to deep\n   * properties which is confusing. TODO: Expose pendingState or don't use it\n   * during the merge.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {object} partialState Next partial state to be merged with state.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} Name of the calling function in the public API.\n   * @internal\n   */\n  enqueueSetState: function (publicInstance, partialState, callback, callerName) {\n    warnNoop(publicInstance, 'setState');\n  }\n};\n\nvar emptyObject = {};\n\n{\n  Object.freeze(emptyObject);\n}\n/**\n * Base class helpers for the updating state of a component.\n */\n\n\nfunction Component(props, context, updater) {\n  this.props = props;\n  this.context = context; // If a component has string refs, we will assign a different object later.\n\n  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the\n  // renderer.\n\n  this.updater = updater || ReactNoopUpdateQueue;\n}\n\nComponent.prototype.isReactComponent = {};\n/**\n * Sets a subset of the state. Always use this to mutate\n * state. You should treat `this.state` as immutable.\n *\n * There is no guarantee that `this.state` will be immediately updated, so\n * accessing `this.state` after calling this method may return the old value.\n *\n * There is no guarantee that calls to `setState` will run synchronously,\n * as they may eventually be batched together.  You can provide an optional\n * callback that will be executed when the call to setState is actually\n * completed.\n *\n * When a function is provided to setState, it will be called at some point in\n * the future (not synchronously). It will be called with the up to date\n * component arguments (state, props, context). These values can be different\n * from this.* because your function may be called after receiveProps but before\n * shouldComponentUpdate, and this new state, props, and context will not yet be\n * assigned to this.\n *\n * @param {object|function} partialState Next partial state or function to\n *        produce next partial state to be merged with current state.\n * @param {?function} callback Called after state is updated.\n * @final\n * @protected\n */\n\nComponent.prototype.setState = function (partialState, callback) {\n  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {\n    {\n      throw Error( \"setState(...): takes an object of state variables to update or a function which returns an object of state variables.\" );\n    }\n  }\n\n  this.updater.enqueueSetState(this, partialState, callback, 'setState');\n};\n/**\n * Forces an update. This should only be invoked when it is known with\n * certainty that we are **not** in a DOM transaction.\n *\n * You may want to call this when you know that some deeper aspect of the\n * component's state has changed but `setState` was not called.\n *\n * This will not invoke `shouldComponentUpdate`, but it will invoke\n * `componentWillUpdate` and `componentDidUpdate`.\n *\n * @param {?function} callback Called after update is complete.\n * @final\n * @protected\n */\n\n\nComponent.prototype.forceUpdate = function (callback) {\n  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');\n};\n/**\n * Deprecated APIs. These APIs used to exist on classic React classes but since\n * we would like to deprecate them, we're not going to move them over to this\n * modern base class. Instead, we define a getter that warns if it's accessed.\n */\n\n\n{\n  var deprecatedAPIs = {\n    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],\n    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']\n  };\n\n  var defineDeprecationWarning = function (methodName, info) {\n    Object.defineProperty(Component.prototype, methodName, {\n      get: function () {\n        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);\n\n        return undefined;\n      }\n    });\n  };\n\n  for (var fnName in deprecatedAPIs) {\n    if (deprecatedAPIs.hasOwnProperty(fnName)) {\n      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);\n    }\n  }\n}\n\nfunction ComponentDummy() {}\n\nComponentDummy.prototype = Component.prototype;\n/**\n * Convenience component with default shallow equality check for sCU.\n */\n\nfunction PureComponent(props, context, updater) {\n  this.props = props;\n  this.context = context; // If a component has string refs, we will assign a different object later.\n\n  this.refs = emptyObject;\n  this.updater = updater || ReactNoopUpdateQueue;\n}\n\nvar pureComponentPrototype = PureComponent.prototype = new ComponentDummy();\npureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.\n\n_assign(pureComponentPrototype, Component.prototype);\n\npureComponentPrototype.isPureReactComponent = true;\n\n// an immutable object with a single mutable value\nfunction createRef() {\n  var refObject = {\n    current: null\n  };\n\n  {\n    Object.seal(refObject);\n  }\n\n  return refObject;\n}\n\nfunction getWrappedName(outerType, innerType, wrapperName) {\n  var functionName = innerType.displayName || innerType.name || '';\n  return outerType.displayName || (functionName !== '' ? wrapperName + \"(\" + functionName + \")\" : wrapperName);\n}\n\nfunction getContextName(type) {\n  return type.displayName || 'Context';\n}\n\nfunction getComponentName(type) {\n  if (type == null) {\n    // Host root, text node or just invalid type.\n    return null;\n  }\n\n  {\n    if (typeof type.tag === 'number') {\n      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');\n    }\n  }\n\n  if (typeof type === 'function') {\n    return type.displayName || type.name || null;\n  }\n\n  if (typeof type === 'string') {\n    return type;\n  }\n\n  switch (type) {\n    case exports.Fragment:\n      return 'Fragment';\n\n    case REACT_PORTAL_TYPE:\n      return 'Portal';\n\n    case exports.Profiler:\n      return 'Profiler';\n\n    case exports.StrictMode:\n      return 'StrictMode';\n\n    case exports.Suspense:\n      return 'Suspense';\n\n    case REACT_SUSPENSE_LIST_TYPE:\n      return 'SuspenseList';\n  }\n\n  if (typeof type === 'object') {\n    switch (type.$$typeof) {\n      case REACT_CONTEXT_TYPE:\n        var context = type;\n        return getContextName(context) + '.Consumer';\n\n      case REACT_PROVIDER_TYPE:\n        var provider = type;\n        return getContextName(provider._context) + '.Provider';\n\n      case REACT_FORWARD_REF_TYPE:\n        return getWrappedName(type, type.render, 'ForwardRef');\n\n      case REACT_MEMO_TYPE:\n        return getComponentName(type.type);\n\n      case REACT_BLOCK_TYPE:\n        return getComponentName(type._render);\n\n      case REACT_LAZY_TYPE:\n        {\n          var lazyComponent = type;\n          var payload = lazyComponent._payload;\n          var init = lazyComponent._init;\n\n          try {\n            return getComponentName(init(payload));\n          } catch (x) {\n            return null;\n          }\n        }\n    }\n  }\n\n  return null;\n}\n\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar RESERVED_PROPS = {\n  key: true,\n  ref: true,\n  __self: true,\n  __source: true\n};\nvar specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;\n\n{\n  didWarnAboutStringRefs = {};\n}\n\nfunction hasValidRef(config) {\n  {\n    if (hasOwnProperty.call(config, 'ref')) {\n      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;\n\n      if (getter && getter.isReactWarning) {\n        return false;\n      }\n    }\n  }\n\n  return config.ref !== undefined;\n}\n\nfunction hasValidKey(config) {\n  {\n    if (hasOwnProperty.call(config, 'key')) {\n      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;\n\n      if (getter && getter.isReactWarning) {\n        return false;\n      }\n    }\n  }\n\n  return config.key !== undefined;\n}\n\nfunction defineKeyPropWarningGetter(props, displayName) {\n  var warnAboutAccessingKey = function () {\n    {\n      if (!specialPropKeyWarningShown) {\n        specialPropKeyWarningShown = true;\n\n        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);\n      }\n    }\n  };\n\n  warnAboutAccessingKey.isReactWarning = true;\n  Object.defineProperty(props, 'key', {\n    get: warnAboutAccessingKey,\n    configurable: true\n  });\n}\n\nfunction defineRefPropWarningGetter(props, displayName) {\n  var warnAboutAccessingRef = function () {\n    {\n      if (!specialPropRefWarningShown) {\n        specialPropRefWarningShown = true;\n\n        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);\n      }\n    }\n  };\n\n  warnAboutAccessingRef.isReactWarning = true;\n  Object.defineProperty(props, 'ref', {\n    get: warnAboutAccessingRef,\n    configurable: true\n  });\n}\n\nfunction warnIfStringRefCannotBeAutoConverted(config) {\n  {\n    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {\n      var componentName = getComponentName(ReactCurrentOwner.current.type);\n\n      if (!didWarnAboutStringRefs[componentName]) {\n        error('Component \"%s\" contains the string ref \"%s\". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);\n\n        didWarnAboutStringRefs[componentName] = true;\n      }\n    }\n  }\n}\n/**\n * Factory method to create a new React element. This no longer adheres to\n * the class pattern, so do not use new to call it. Also, instanceof check\n * will not work. Instead test $$typeof field against Symbol.for('react.element') to check\n * if something is a React Element.\n *\n * @param {*} type\n * @param {*} props\n * @param {*} key\n * @param {string|object} ref\n * @param {*} owner\n * @param {*} self A *temporary* helper to detect places where `this` is\n * different from the `owner` when React.createElement is called, so that we\n * can warn. We want to get rid of owner and replace string `ref`s with arrow\n * functions, and as long as `this` and owner are the same, there will be no\n * change in behavior.\n * @param {*} source An annotation object (added by a transpiler or otherwise)\n * indicating filename, line number, and/or other information.\n * @internal\n */\n\n\nvar ReactElement = function (type, key, ref, self, source, owner, props) {\n  var element = {\n    // This tag allows us to uniquely identify this as a React Element\n    $$typeof: REACT_ELEMENT_TYPE,\n    // Built-in properties that belong on the element\n    type: type,\n    key: key,\n    ref: ref,\n    props: props,\n    // Record the component responsible for creating this element.\n    _owner: owner\n  };\n\n  {\n    // The validation flag is currently mutative. We put it on\n    // an external backing store so that we can freeze the whole object.\n    // This can be replaced with a WeakMap once they are implemented in\n    // commonly used development environments.\n    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make\n    // the validation flag non-enumerable (where possible, which should\n    // include every environment we run tests in), so the test framework\n    // ignores it.\n\n    Object.defineProperty(element._store, 'validated', {\n      configurable: false,\n      enumerable: false,\n      writable: true,\n      value: false\n    }); // self and source are DEV only properties.\n\n    Object.defineProperty(element, '_self', {\n      configurable: false,\n      enumerable: false,\n      writable: false,\n      value: self\n    }); // Two elements created in two different places should be considered\n    // equal for testing purposes and therefore we hide it from enumeration.\n\n    Object.defineProperty(element, '_source', {\n      configurable: false,\n      enumerable: false,\n      writable: false,\n      value: source\n    });\n\n    if (Object.freeze) {\n      Object.freeze(element.props);\n      Object.freeze(element);\n    }\n  }\n\n  return element;\n};\n/**\n * Create and return a new ReactElement of the given type.\n * See https://reactjs.org/docs/react-api.html#createelement\n */\n\nfunction createElement(type, config, children) {\n  var propName; // Reserved names are extracted\n\n  var props = {};\n  var key = null;\n  var ref = null;\n  var self = null;\n  var source = null;\n\n  if (config != null) {\n    if (hasValidRef(config)) {\n      ref = config.ref;\n\n      {\n        warnIfStringRefCannotBeAutoConverted(config);\n      }\n    }\n\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    }\n\n    self = config.__self === undefined ? null : config.__self;\n    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object\n\n    for (propName in config) {\n      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n        props[propName] = config[propName];\n      }\n    }\n  } // Children can be more than one argument, and those are transferred onto\n  // the newly allocated props object.\n\n\n  var childrenLength = arguments.length - 2;\n\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = Array(childrenLength);\n\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n\n    {\n      if (Object.freeze) {\n        Object.freeze(childArray);\n      }\n    }\n\n    props.children = childArray;\n  } // Resolve default props\n\n\n  if (type && type.defaultProps) {\n    var defaultProps = type.defaultProps;\n\n    for (propName in defaultProps) {\n      if (props[propName] === undefined) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  }\n\n  {\n    if (key || ref) {\n      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;\n\n      if (key) {\n        defineKeyPropWarningGetter(props, displayName);\n      }\n\n      if (ref) {\n        defineRefPropWarningGetter(props, displayName);\n      }\n    }\n  }\n\n  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);\n}\nfunction cloneAndReplaceKey(oldElement, newKey) {\n  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);\n  return newElement;\n}\n/**\n * Clone and return a new ReactElement using element as the starting point.\n * See https://reactjs.org/docs/react-api.html#cloneelement\n */\n\nfunction cloneElement(element, config, children) {\n  if (!!(element === null || element === undefined)) {\n    {\n      throw Error( \"React.cloneElement(...): The argument must be a React element, but you passed \" + element + \".\" );\n    }\n  }\n\n  var propName; // Original props are copied\n\n  var props = _assign({}, element.props); // Reserved names are extracted\n\n\n  var key = element.key;\n  var ref = element.ref; // Self is preserved since the owner is preserved.\n\n  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a\n  // transpiler, and the original source is probably a better indicator of the\n  // true owner.\n\n  var source = element._source; // Owner will be preserved, unless ref is overridden\n\n  var owner = element._owner;\n\n  if (config != null) {\n    if (hasValidRef(config)) {\n      // Silently steal the ref from the parent.\n      ref = config.ref;\n      owner = ReactCurrentOwner.current;\n    }\n\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    } // Remaining properties override existing props\n\n\n    var defaultProps;\n\n    if (element.type && element.type.defaultProps) {\n      defaultProps = element.type.defaultProps;\n    }\n\n    for (propName in config) {\n      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n        if (config[propName] === undefined && defaultProps !== undefined) {\n          // Resolve default props\n          props[propName] = defaultProps[propName];\n        } else {\n          props[propName] = config[propName];\n        }\n      }\n    }\n  } // Children can be more than one argument, and those are transferred onto\n  // the newly allocated props object.\n\n\n  var childrenLength = arguments.length - 2;\n\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = Array(childrenLength);\n\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n\n    props.children = childArray;\n  }\n\n  return ReactElement(element.type, key, ref, self, source, owner, props);\n}\n/**\n * Verifies the object is a ReactElement.\n * See https://reactjs.org/docs/react-api.html#isvalidelement\n * @param {?object} object\n * @return {boolean} True if `object` is a ReactElement.\n * @final\n */\n\nfunction isValidElement(object) {\n  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n}\n\nvar SEPARATOR = '.';\nvar SUBSEPARATOR = ':';\n/**\n * Escape and wrap key so it is safe to use as a reactid\n *\n * @param {string} key to be escaped.\n * @return {string} the escaped key.\n */\n\nfunction escape(key) {\n  var escapeRegex = /[=:]/g;\n  var escaperLookup = {\n    '=': '=0',\n    ':': '=2'\n  };\n  var escapedString = key.replace(escapeRegex, function (match) {\n    return escaperLookup[match];\n  });\n  return '$' + escapedString;\n}\n/**\n * TODO: Test that a single child and an array with one item have the same key\n * pattern.\n */\n\n\nvar didWarnAboutMaps = false;\nvar userProvidedKeyEscapeRegex = /\\/+/g;\n\nfunction escapeUserProvidedKey(text) {\n  return text.replace(userProvidedKeyEscapeRegex, '$&/');\n}\n/**\n * Generate a key string that identifies a element within a set.\n *\n * @param {*} element A element that could contain a manual key.\n * @param {number} index Index that is used if a manual key is not provided.\n * @return {string}\n */\n\n\nfunction getElementKey(element, index) {\n  // Do some typechecking here since we call this blindly. We want to ensure\n  // that we don't block potential future ES APIs.\n  if (typeof element === 'object' && element !== null && element.key != null) {\n    // Explicit key\n    return escape('' + element.key);\n  } // Implicit key determined by the index in the set\n\n\n  return index.toString(36);\n}\n\nfunction mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {\n  var type = typeof children;\n\n  if (type === 'undefined' || type === 'boolean') {\n    // All of the above are perceived as null.\n    children = null;\n  }\n\n  var invokeCallback = false;\n\n  if (children === null) {\n    invokeCallback = true;\n  } else {\n    switch (type) {\n      case 'string':\n      case 'number':\n        invokeCallback = true;\n        break;\n\n      case 'object':\n        switch (children.$$typeof) {\n          case REACT_ELEMENT_TYPE:\n          case REACT_PORTAL_TYPE:\n            invokeCallback = true;\n        }\n\n    }\n  }\n\n  if (invokeCallback) {\n    var _child = children;\n    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array\n    // so that it's consistent if the number of children grows:\n\n    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;\n\n    if (Array.isArray(mappedChild)) {\n      var escapedChildKey = '';\n\n      if (childKey != null) {\n        escapedChildKey = escapeUserProvidedKey(childKey) + '/';\n      }\n\n      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {\n        return c;\n      });\n    } else if (mappedChild != null) {\n      if (isValidElement(mappedChild)) {\n        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as\n        // traverseAllChildren used to do for objects as children\n        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key\n        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number\n        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);\n      }\n\n      array.push(mappedChild);\n    }\n\n    return 1;\n  }\n\n  var child;\n  var nextName;\n  var subtreeCount = 0; // Count of children found in the current subtree.\n\n  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;\n\n  if (Array.isArray(children)) {\n    for (var i = 0; i < children.length; i++) {\n      child = children[i];\n      nextName = nextNamePrefix + getElementKey(child, i);\n      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);\n    }\n  } else {\n    var iteratorFn = getIteratorFn(children);\n\n    if (typeof iteratorFn === 'function') {\n      var iterableChildren = children;\n\n      {\n        // Warn about using Maps as children\n        if (iteratorFn === iterableChildren.entries) {\n          if (!didWarnAboutMaps) {\n            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');\n          }\n\n          didWarnAboutMaps = true;\n        }\n      }\n\n      var iterator = iteratorFn.call(iterableChildren);\n      var step;\n      var ii = 0;\n\n      while (!(step = iterator.next()).done) {\n        child = step.value;\n        nextName = nextNamePrefix + getElementKey(child, ii++);\n        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);\n      }\n    } else if (type === 'object') {\n      var childrenString = '' + children;\n\n      {\n        {\n          throw Error( \"Objects are not valid as a React child (found: \" + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + \"). If you meant to render a collection of children, use an array instead.\" );\n        }\n      }\n    }\n  }\n\n  return subtreeCount;\n}\n\n/**\n * Maps children that are typically specified as `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenmap\n *\n * The provided mapFunction(child, index) will be called for each\n * leaf child.\n *\n * @param {?*} children Children tree container.\n * @param {function(*, int)} func The map function.\n * @param {*} context Context for mapFunction.\n * @return {object} Object containing the ordered map of results.\n */\nfunction mapChildren(children, func, context) {\n  if (children == null) {\n    return children;\n  }\n\n  var result = [];\n  var count = 0;\n  mapIntoArray(children, result, '', '', function (child) {\n    return func.call(context, child, count++);\n  });\n  return result;\n}\n/**\n * Count the number of children that are typically specified as\n * `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrencount\n *\n * @param {?*} children Children tree container.\n * @return {number} The number of children.\n */\n\n\nfunction countChildren(children) {\n  var n = 0;\n  mapChildren(children, function () {\n    n++; // Don't return anything\n  });\n  return n;\n}\n\n/**\n * Iterates through children that are typically specified as `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenforeach\n *\n * The provided forEachFunc(child, index) will be called for each\n * leaf child.\n *\n * @param {?*} children Children tree container.\n * @param {function(*, int)} forEachFunc\n * @param {*} forEachContext Context for forEachContext.\n */\nfunction forEachChildren(children, forEachFunc, forEachContext) {\n  mapChildren(children, function () {\n    forEachFunc.apply(this, arguments); // Don't return anything.\n  }, forEachContext);\n}\n/**\n * Flatten a children object (typically specified as `props.children`) and\n * return an array with appropriately re-keyed children.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrentoarray\n */\n\n\nfunction toArray(children) {\n  return mapChildren(children, function (child) {\n    return child;\n  }) || [];\n}\n/**\n * Returns the first child in a collection of children and verifies that there\n * is only one child in the collection.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenonly\n *\n * The current implementation of this function assumes that a single child gets\n * passed without a wrapper, but the purpose of this helper function is to\n * abstract away the particular structure of children.\n *\n * @param {?object} children Child collection structure.\n * @return {ReactElement} The first and only `ReactElement` contained in the\n * structure.\n */\n\n\nfunction onlyChild(children) {\n  if (!isValidElement(children)) {\n    {\n      throw Error( \"React.Children.only expected to receive a single React element child.\" );\n    }\n  }\n\n  return children;\n}\n\nfunction createContext(defaultValue, calculateChangedBits) {\n  if (calculateChangedBits === undefined) {\n    calculateChangedBits = null;\n  } else {\n    {\n      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {\n        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);\n      }\n    }\n  }\n\n  var context = {\n    $$typeof: REACT_CONTEXT_TYPE,\n    _calculateChangedBits: calculateChangedBits,\n    // As a workaround to support multiple concurrent renderers, we categorize\n    // some renderers as primary and others as secondary. We only expect\n    // there to be two concurrent renderers at most: React Native (primary) and\n    // Fabric (secondary); React DOM (primary) and React ART (secondary).\n    // Secondary renderers store their context values on separate fields.\n    _currentValue: defaultValue,\n    _currentValue2: defaultValue,\n    // Used to track how many concurrent renderers this context currently\n    // supports within in a single renderer. Such as parallel server rendering.\n    _threadCount: 0,\n    // These are circular\n    Provider: null,\n    Consumer: null\n  };\n  context.Provider = {\n    $$typeof: REACT_PROVIDER_TYPE,\n    _context: context\n  };\n  var hasWarnedAboutUsingNestedContextConsumers = false;\n  var hasWarnedAboutUsingConsumerProvider = false;\n  var hasWarnedAboutDisplayNameOnConsumer = false;\n\n  {\n    // A separate object, but proxies back to the original context object for\n    // backwards compatibility. It has a different $$typeof, so we can properly\n    // warn for the incorrect usage of Context as a Consumer.\n    var Consumer = {\n      $$typeof: REACT_CONTEXT_TYPE,\n      _context: context,\n      _calculateChangedBits: context._calculateChangedBits\n    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here\n\n    Object.defineProperties(Consumer, {\n      Provider: {\n        get: function () {\n          if (!hasWarnedAboutUsingConsumerProvider) {\n            hasWarnedAboutUsingConsumerProvider = true;\n\n            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');\n          }\n\n          return context.Provider;\n        },\n        set: function (_Provider) {\n          context.Provider = _Provider;\n        }\n      },\n      _currentValue: {\n        get: function () {\n          return context._currentValue;\n        },\n        set: function (_currentValue) {\n          context._currentValue = _currentValue;\n        }\n      },\n      _currentValue2: {\n        get: function () {\n          return context._currentValue2;\n        },\n        set: function (_currentValue2) {\n          context._currentValue2 = _currentValue2;\n        }\n      },\n      _threadCount: {\n        get: function () {\n          return context._threadCount;\n        },\n        set: function (_threadCount) {\n          context._threadCount = _threadCount;\n        }\n      },\n      Consumer: {\n        get: function () {\n          if (!hasWarnedAboutUsingNestedContextConsumers) {\n            hasWarnedAboutUsingNestedContextConsumers = true;\n\n            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');\n          }\n\n          return context.Consumer;\n        }\n      },\n      displayName: {\n        get: function () {\n          return context.displayName;\n        },\n        set: function (displayName) {\n          if (!hasWarnedAboutDisplayNameOnConsumer) {\n            warn('Setting `displayName` on Context.Consumer has no effect. ' + \"You should set it directly on the context with Context.displayName = '%s'.\", displayName);\n\n            hasWarnedAboutDisplayNameOnConsumer = true;\n          }\n        }\n      }\n    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty\n\n    context.Consumer = Consumer;\n  }\n\n  {\n    context._currentRenderer = null;\n    context._currentRenderer2 = null;\n  }\n\n  return context;\n}\n\nvar Uninitialized = -1;\nvar Pending = 0;\nvar Resolved = 1;\nvar Rejected = 2;\n\nfunction lazyInitializer(payload) {\n  if (payload._status === Uninitialized) {\n    var ctor = payload._result;\n    var thenable = ctor(); // Transition to the next state.\n\n    var pending = payload;\n    pending._status = Pending;\n    pending._result = thenable;\n    thenable.then(function (moduleObject) {\n      if (payload._status === Pending) {\n        var defaultExport = moduleObject.default;\n\n        {\n          if (defaultExport === undefined) {\n            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\\n\\nYour code should look like: \\n  ' + // Break up imports to avoid accidentally parsing them as dependencies.\n            'const MyComponent = lazy(() => imp' + \"ort('./MyComponent'))\", moduleObject);\n          }\n        } // Transition to the next state.\n\n\n        var resolved = payload;\n        resolved._status = Resolved;\n        resolved._result = defaultExport;\n      }\n    }, function (error) {\n      if (payload._status === Pending) {\n        // Transition to the next state.\n        var rejected = payload;\n        rejected._status = Rejected;\n        rejected._result = error;\n      }\n    });\n  }\n\n  if (payload._status === Resolved) {\n    return payload._result;\n  } else {\n    throw payload._result;\n  }\n}\n\nfunction lazy(ctor) {\n  var payload = {\n    // We use these fields to store the result.\n    _status: -1,\n    _result: ctor\n  };\n  var lazyType = {\n    $$typeof: REACT_LAZY_TYPE,\n    _payload: payload,\n    _init: lazyInitializer\n  };\n\n  {\n    // In production, this would just set it on the object.\n    var defaultProps;\n    var propTypes; // $FlowFixMe\n\n    Object.defineProperties(lazyType, {\n      defaultProps: {\n        configurable: true,\n        get: function () {\n          return defaultProps;\n        },\n        set: function (newDefaultProps) {\n          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n\n          defaultProps = newDefaultProps; // Match production behavior more closely:\n          // $FlowFixMe\n\n          Object.defineProperty(lazyType, 'defaultProps', {\n            enumerable: true\n          });\n        }\n      },\n      propTypes: {\n        configurable: true,\n        get: function () {\n          return propTypes;\n        },\n        set: function (newPropTypes) {\n          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n\n          propTypes = newPropTypes; // Match production behavior more closely:\n          // $FlowFixMe\n\n          Object.defineProperty(lazyType, 'propTypes', {\n            enumerable: true\n          });\n        }\n      }\n    });\n  }\n\n  return lazyType;\n}\n\nfunction forwardRef(render) {\n  {\n    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {\n      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');\n    } else if (typeof render !== 'function') {\n      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);\n    } else {\n      if (render.length !== 0 && render.length !== 2) {\n        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');\n      }\n    }\n\n    if (render != null) {\n      if (render.defaultProps != null || render.propTypes != null) {\n        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');\n      }\n    }\n  }\n\n  var elementType = {\n    $$typeof: REACT_FORWARD_REF_TYPE,\n    render: render\n  };\n\n  {\n    var ownName;\n    Object.defineProperty(elementType, 'displayName', {\n      enumerable: false,\n      configurable: true,\n      get: function () {\n        return ownName;\n      },\n      set: function (name) {\n        ownName = name;\n\n        if (render.displayName == null) {\n          render.displayName = name;\n        }\n      }\n    });\n  }\n\n  return elementType;\n}\n\n// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.\n\nvar enableScopeAPI = false; // Experimental Create Event Handle API.\n\nfunction isValidElementType(type) {\n  if (typeof type === 'string' || typeof type === 'function') {\n    return true;\n  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).\n\n\n  if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {\n    return true;\n  }\n\n  if (typeof type === 'object' && type !== null) {\n    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {\n      return true;\n    }\n  }\n\n  return false;\n}\n\nfunction memo(type, compare) {\n  {\n    if (!isValidElementType(type)) {\n      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);\n    }\n  }\n\n  var elementType = {\n    $$typeof: REACT_MEMO_TYPE,\n    type: type,\n    compare: compare === undefined ? null : compare\n  };\n\n  {\n    var ownName;\n    Object.defineProperty(elementType, 'displayName', {\n      enumerable: false,\n      configurable: true,\n      get: function () {\n        return ownName;\n      },\n      set: function (name) {\n        ownName = name;\n\n        if (type.displayName == null) {\n          type.displayName = name;\n        }\n      }\n    });\n  }\n\n  return elementType;\n}\n\nfunction resolveDispatcher() {\n  var dispatcher = ReactCurrentDispatcher.current;\n\n  if (!(dispatcher !== null)) {\n    {\n      throw Error( \"Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\\n1. You might have mismatching versions of React and the renderer (such as React DOM)\\n2. You might be breaking the Rules of Hooks\\n3. You might have more than one copy of React in the same app\\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.\" );\n    }\n  }\n\n  return dispatcher;\n}\n\nfunction useContext(Context, unstable_observedBits) {\n  var dispatcher = resolveDispatcher();\n\n  {\n    if (unstable_observedBits !== undefined) {\n      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\\n\\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');\n    } // TODO: add a more generic warning for invalid values.\n\n\n    if (Context._context !== undefined) {\n      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs\n      // and nobody should be using this in existing code.\n\n      if (realContext.Consumer === Context) {\n        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');\n      } else if (realContext.Provider === Context) {\n        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');\n      }\n    }\n  }\n\n  return dispatcher.useContext(Context, unstable_observedBits);\n}\nfunction useState(initialState) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useState(initialState);\n}\nfunction useReducer(reducer, initialArg, init) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useReducer(reducer, initialArg, init);\n}\nfunction useRef(initialValue) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useRef(initialValue);\n}\nfunction useEffect(create, deps) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useEffect(create, deps);\n}\nfunction useLayoutEffect(create, deps) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useLayoutEffect(create, deps);\n}\nfunction useCallback(callback, deps) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useCallback(callback, deps);\n}\nfunction useMemo(create, deps) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useMemo(create, deps);\n}\nfunction useImperativeHandle(ref, create, deps) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useImperativeHandle(ref, create, deps);\n}\nfunction useDebugValue(value, formatterFn) {\n  {\n    var dispatcher = resolveDispatcher();\n    return dispatcher.useDebugValue(value, formatterFn);\n  }\n}\n\n// Helpers to patch console.logs to avoid logging during side-effect free\n// replaying on render function. This currently only patches the object\n// lazily which won't cover if the log function was extracted eagerly.\n// We could also eagerly patch the method.\nvar disabledDepth = 0;\nvar prevLog;\nvar prevInfo;\nvar prevWarn;\nvar prevError;\nvar prevGroup;\nvar prevGroupCollapsed;\nvar prevGroupEnd;\n\nfunction disabledLog() {}\n\ndisabledLog.__reactDisabledLog = true;\nfunction disableLogs() {\n  {\n    if (disabledDepth === 0) {\n      /* eslint-disable react-internal/no-production-logging */\n      prevLog = console.log;\n      prevInfo = console.info;\n      prevWarn = console.warn;\n      prevError = console.error;\n      prevGroup = console.group;\n      prevGroupCollapsed = console.groupCollapsed;\n      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099\n\n      var props = {\n        configurable: true,\n        enumerable: true,\n        value: disabledLog,\n        writable: true\n      }; // $FlowFixMe Flow thinks console is immutable.\n\n      Object.defineProperties(console, {\n        info: props,\n        log: props,\n        warn: props,\n        error: props,\n        group: props,\n        groupCollapsed: props,\n        groupEnd: props\n      });\n      /* eslint-enable react-internal/no-production-logging */\n    }\n\n    disabledDepth++;\n  }\n}\nfunction reenableLogs() {\n  {\n    disabledDepth--;\n\n    if (disabledDepth === 0) {\n      /* eslint-disable react-internal/no-production-logging */\n      var props = {\n        configurable: true,\n        enumerable: true,\n        writable: true\n      }; // $FlowFixMe Flow thinks console is immutable.\n\n      Object.defineProperties(console, {\n        log: _assign({}, props, {\n          value: prevLog\n        }),\n        info: _assign({}, props, {\n          value: prevInfo\n        }),\n        warn: _assign({}, props, {\n          value: prevWarn\n        }),\n        error: _assign({}, props, {\n          value: prevError\n        }),\n        group: _assign({}, props, {\n          value: prevGroup\n        }),\n        groupCollapsed: _assign({}, props, {\n          value: prevGroupCollapsed\n        }),\n        groupEnd: _assign({}, props, {\n          value: prevGroupEnd\n        })\n      });\n      /* eslint-enable react-internal/no-production-logging */\n    }\n\n    if (disabledDepth < 0) {\n      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');\n    }\n  }\n}\n\nvar ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;\nvar prefix;\nfunction describeBuiltInComponentFrame(name, source, ownerFn) {\n  {\n    if (prefix === undefined) {\n      // Extract the VM specific prefix used by each line.\n      try {\n        throw Error();\n      } catch (x) {\n        var match = x.stack.trim().match(/\\n( *(at )?)/);\n        prefix = match && match[1] || '';\n      }\n    } // We use the prefix to ensure our stacks line up with native stack frames.\n\n\n    return '\\n' + prefix + name;\n  }\n}\nvar reentry = false;\nvar componentFrameCache;\n\n{\n  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;\n  componentFrameCache = new PossiblyWeakMap();\n}\n\nfunction describeNativeComponentFrame(fn, construct) {\n  // If something asked for a stack inside a fake render, it should get ignored.\n  if (!fn || reentry) {\n    return '';\n  }\n\n  {\n    var frame = componentFrameCache.get(fn);\n\n    if (frame !== undefined) {\n      return frame;\n    }\n  }\n\n  var control;\n  reentry = true;\n  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.\n\n  Error.prepareStackTrace = undefined;\n  var previousDispatcher;\n\n  {\n    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function\n    // for warnings.\n\n    ReactCurrentDispatcher$1.current = null;\n    disableLogs();\n  }\n\n  try {\n    // This should throw.\n    if (construct) {\n      // Something should be setting the props in the constructor.\n      var Fake = function () {\n        throw Error();\n      }; // $FlowFixMe\n\n\n      Object.defineProperty(Fake.prototype, 'props', {\n        set: function () {\n          // We use a throwing setter instead of frozen or non-writable props\n          // because that won't throw in a non-strict mode function.\n          throw Error();\n        }\n      });\n\n      if (typeof Reflect === 'object' && Reflect.construct) {\n        // We construct a different control for this case to include any extra\n        // frames added by the construct call.\n        try {\n          Reflect.construct(Fake, []);\n        } catch (x) {\n          control = x;\n        }\n\n        Reflect.construct(fn, [], Fake);\n      } else {\n        try {\n          Fake.call();\n        } catch (x) {\n          control = x;\n        }\n\n        fn.call(Fake.prototype);\n      }\n    } else {\n      try {\n        throw Error();\n      } catch (x) {\n        control = x;\n      }\n\n      fn();\n    }\n  } catch (sample) {\n    // This is inlined manually because closure doesn't do it for us.\n    if (sample && control && typeof sample.stack === 'string') {\n      // This extracts the first frame from the sample that isn't also in the control.\n      // Skipping one frame that we assume is the frame that calls the two.\n      var sampleLines = sample.stack.split('\\n');\n      var controlLines = control.stack.split('\\n');\n      var s = sampleLines.length - 1;\n      var c = controlLines.length - 1;\n\n      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {\n        // We expect at least one stack frame to be shared.\n        // Typically this will be the root most one. However, stack frames may be\n        // cut off due to maximum stack limits. In this case, one maybe cut off\n        // earlier than the other. We assume that the sample is longer or the same\n        // and there for cut off earlier. So we should find the root most frame in\n        // the sample somewhere in the control.\n        c--;\n      }\n\n      for (; s >= 1 && c >= 0; s--, c--) {\n        // Next we find the first one that isn't the same which should be the\n        // frame that called our sample function and the control.\n        if (sampleLines[s] !== controlLines[c]) {\n          // In V8, the first line is describing the message but other VMs don't.\n          // If we're about to return the first line, and the control is also on the same\n          // line, that's a pretty good indicator that our sample threw at same line as\n          // the control. I.e. before we entered the sample frame. So we ignore this result.\n          // This can happen if you passed a class to function component, or non-function.\n          if (s !== 1 || c !== 1) {\n            do {\n              s--;\n              c--; // We may still have similar intermediate frames from the construct call.\n              // The next one that isn't the same should be our match though.\n\n              if (c < 0 || sampleLines[s] !== controlLines[c]) {\n                // V8 adds a \"new\" prefix for native classes. Let's remove it to make it prettier.\n                var _frame = '\\n' + sampleLines[s].replace(' at new ', ' at ');\n\n                {\n                  if (typeof fn === 'function') {\n                    componentFrameCache.set(fn, _frame);\n                  }\n                } // Return the line we found.\n\n\n                return _frame;\n              }\n            } while (s >= 1 && c >= 0);\n          }\n\n          break;\n        }\n      }\n    }\n  } finally {\n    reentry = false;\n\n    {\n      ReactCurrentDispatcher$1.current = previousDispatcher;\n      reenableLogs();\n    }\n\n    Error.prepareStackTrace = previousPrepareStackTrace;\n  } // Fallback to just using the name if we couldn't make it throw.\n\n\n  var name = fn ? fn.displayName || fn.name : '';\n  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';\n\n  {\n    if (typeof fn === 'function') {\n      componentFrameCache.set(fn, syntheticFrame);\n    }\n  }\n\n  return syntheticFrame;\n}\nfunction describeFunctionComponentFrame(fn, source, ownerFn) {\n  {\n    return describeNativeComponentFrame(fn, false);\n  }\n}\n\nfunction shouldConstruct(Component) {\n  var prototype = Component.prototype;\n  return !!(prototype && prototype.isReactComponent);\n}\n\nfunction describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {\n\n  if (type == null) {\n    return '';\n  }\n\n  if (typeof type === 'function') {\n    {\n      return describeNativeComponentFrame(type, shouldConstruct(type));\n    }\n  }\n\n  if (typeof type === 'string') {\n    return describeBuiltInComponentFrame(type);\n  }\n\n  switch (type) {\n    case exports.Suspense:\n      return describeBuiltInComponentFrame('Suspense');\n\n    case REACT_SUSPENSE_LIST_TYPE:\n      return describeBuiltInComponentFrame('SuspenseList');\n  }\n\n  if (typeof type === 'object') {\n    switch (type.$$typeof) {\n      case REACT_FORWARD_REF_TYPE:\n        return describeFunctionComponentFrame(type.render);\n\n      case REACT_MEMO_TYPE:\n        // Memo may contain any component type so we recursively resolve it.\n        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);\n\n      case REACT_BLOCK_TYPE:\n        return describeFunctionComponentFrame(type._render);\n\n      case REACT_LAZY_TYPE:\n        {\n          var lazyComponent = type;\n          var payload = lazyComponent._payload;\n          var init = lazyComponent._init;\n\n          try {\n            // Lazy may contain any component type so we recursively resolve it.\n            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);\n          } catch (x) {}\n        }\n    }\n  }\n\n  return '';\n}\n\nvar loggedTypeFailures = {};\nvar ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;\n\nfunction setCurrentlyValidatingElement(element) {\n  {\n    if (element) {\n      var owner = element._owner;\n      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);\n      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);\n    } else {\n      ReactDebugCurrentFrame$1.setExtraStackFrame(null);\n    }\n  }\n}\n\nfunction checkPropTypes(typeSpecs, values, location, componentName, element) {\n  {\n    // $FlowFixMe This is okay but Flow doesn't know it.\n    var has = Function.call.bind(Object.prototype.hasOwnProperty);\n\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n\n          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');\n        } catch (ex) {\n          error$1 = ex;\n        }\n\n        if (error$1 && !(error$1 instanceof Error)) {\n          setCurrentlyValidatingElement(element);\n\n          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);\n\n          setCurrentlyValidatingElement(null);\n        }\n\n        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error$1.message] = true;\n          setCurrentlyValidatingElement(element);\n\n          error('Failed %s type: %s', location, error$1.message);\n\n          setCurrentlyValidatingElement(null);\n        }\n      }\n    }\n  }\n}\n\nfunction setCurrentlyValidatingElement$1(element) {\n  {\n    if (element) {\n      var owner = element._owner;\n      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);\n      setExtraStackFrame(stack);\n    } else {\n      setExtraStackFrame(null);\n    }\n  }\n}\n\nvar propTypesMisspellWarningShown;\n\n{\n  propTypesMisspellWarningShown = false;\n}\n\nfunction getDeclarationErrorAddendum() {\n  if (ReactCurrentOwner.current) {\n    var name = getComponentName(ReactCurrentOwner.current.type);\n\n    if (name) {\n      return '\\n\\nCheck the render method of `' + name + '`.';\n    }\n  }\n\n  return '';\n}\n\nfunction getSourceInfoErrorAddendum(source) {\n  if (source !== undefined) {\n    var fileName = source.fileName.replace(/^.*[\\\\\\/]/, '');\n    var lineNumber = source.lineNumber;\n    return '\\n\\nCheck your code at ' + fileName + ':' + lineNumber + '.';\n  }\n\n  return '';\n}\n\nfunction getSourceInfoErrorAddendumForProps(elementProps) {\n  if (elementProps !== null && elementProps !== undefined) {\n    return getSourceInfoErrorAddendum(elementProps.__source);\n  }\n\n  return '';\n}\n/**\n * Warn if there's no key explicitly set on dynamic arrays of children or\n * object keys are not valid. This allows us to keep track of children between\n * updates.\n */\n\n\nvar ownerHasKeyUseWarning = {};\n\nfunction getCurrentComponentErrorInfo(parentType) {\n  var info = getDeclarationErrorAddendum();\n\n  if (!info) {\n    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;\n\n    if (parentName) {\n      info = \"\\n\\nCheck the top-level render call using <\" + parentName + \">.\";\n    }\n  }\n\n  return info;\n}\n/**\n * Warn if the element doesn't have an explicit key assigned to it.\n * This element is in an array. The array could grow and shrink or be\n * reordered. All children that haven't already been validated are required to\n * have a \"key\" property assigned to it. Error statuses are cached so a warning\n * will only be shown once.\n *\n * @internal\n * @param {ReactElement} element Element that requires a key.\n * @param {*} parentType element's parent's type.\n */\n\n\nfunction validateExplicitKey(element, parentType) {\n  if (!element._store || element._store.validated || element.key != null) {\n    return;\n  }\n\n  element._store.validated = true;\n  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);\n\n  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {\n    return;\n  }\n\n  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a\n  // property, it may be the creator of the child that's responsible for\n  // assigning it a key.\n\n  var childOwner = '';\n\n  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {\n    // Give the component that originally created this child.\n    childOwner = \" It was passed a child from \" + getComponentName(element._owner.type) + \".\";\n  }\n\n  {\n    setCurrentlyValidatingElement$1(element);\n\n    error('Each child in a list should have a unique \"key\" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);\n\n    setCurrentlyValidatingElement$1(null);\n  }\n}\n/**\n * Ensure that every element either is passed in a static location, in an\n * array with an explicit keys property defined, or in an object literal\n * with valid key property.\n *\n * @internal\n * @param {ReactNode} node Statically passed child of any type.\n * @param {*} parentType node's parent's type.\n */\n\n\nfunction validateChildKeys(node, parentType) {\n  if (typeof node !== 'object') {\n    return;\n  }\n\n  if (Array.isArray(node)) {\n    for (var i = 0; i < node.length; i++) {\n      var child = node[i];\n\n      if (isValidElement(child)) {\n        validateExplicitKey(child, parentType);\n      }\n    }\n  } else if (isValidElement(node)) {\n    // This element was passed in a valid location.\n    if (node._store) {\n      node._store.validated = true;\n    }\n  } else if (node) {\n    var iteratorFn = getIteratorFn(node);\n\n    if (typeof iteratorFn === 'function') {\n      // Entry iterators used to provide implicit keys,\n      // but now we print a separate warning for them later.\n      if (iteratorFn !== node.entries) {\n        var iterator = iteratorFn.call(node);\n        var step;\n\n        while (!(step = iterator.next()).done) {\n          if (isValidElement(step.value)) {\n            validateExplicitKey(step.value, parentType);\n          }\n        }\n      }\n    }\n  }\n}\n/**\n * Given an element, validate that its props follow the propTypes definition,\n * provided by the type.\n *\n * @param {ReactElement} element\n */\n\n\nfunction validatePropTypes(element) {\n  {\n    var type = element.type;\n\n    if (type === null || type === undefined || typeof type === 'string') {\n      return;\n    }\n\n    var propTypes;\n\n    if (typeof type === 'function') {\n      propTypes = type.propTypes;\n    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.\n    // Inner props are checked in the reconciler.\n    type.$$typeof === REACT_MEMO_TYPE)) {\n      propTypes = type.propTypes;\n    } else {\n      return;\n    }\n\n    if (propTypes) {\n      // Intentionally inside to avoid triggering lazy initializers:\n      var name = getComponentName(type);\n      checkPropTypes(propTypes, element.props, 'prop', name, element);\n    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {\n      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:\n\n      var _name = getComponentName(type);\n\n      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');\n    }\n\n    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {\n      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');\n    }\n  }\n}\n/**\n * Given a fragment, validate that it can only be provided with fragment props\n * @param {ReactElement} fragment\n */\n\n\nfunction validateFragmentProps(fragment) {\n  {\n    var keys = Object.keys(fragment.props);\n\n    for (var i = 0; i < keys.length; i++) {\n      var key = keys[i];\n\n      if (key !== 'children' && key !== 'key') {\n        setCurrentlyValidatingElement$1(fragment);\n\n        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);\n\n        setCurrentlyValidatingElement$1(null);\n        break;\n      }\n    }\n\n    if (fragment.ref !== null) {\n      setCurrentlyValidatingElement$1(fragment);\n\n      error('Invalid attribute `ref` supplied to `React.Fragment`.');\n\n      setCurrentlyValidatingElement$1(null);\n    }\n  }\n}\nfunction createElementWithValidation(type, props, children) {\n  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to\n  // succeed and there will likely be errors in render.\n\n  if (!validType) {\n    var info = '';\n\n    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {\n      info += ' You likely forgot to export your component from the file ' + \"it's defined in, or you might have mixed up default and named imports.\";\n    }\n\n    var sourceInfo = getSourceInfoErrorAddendumForProps(props);\n\n    if (sourceInfo) {\n      info += sourceInfo;\n    } else {\n      info += getDeclarationErrorAddendum();\n    }\n\n    var typeString;\n\n    if (type === null) {\n      typeString = 'null';\n    } else if (Array.isArray(type)) {\n      typeString = 'array';\n    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {\n      typeString = \"<\" + (getComponentName(type.type) || 'Unknown') + \" />\";\n      info = ' Did you accidentally export a JSX literal instead of a component?';\n    } else {\n      typeString = typeof type;\n    }\n\n    {\n      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);\n    }\n  }\n\n  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.\n  // TODO: Drop this when these are no longer allowed as the type argument.\n\n  if (element == null) {\n    return element;\n  } // Skip key warning if the type isn't valid since our key validation logic\n  // doesn't expect a non-string/function type and can throw confusing errors.\n  // We don't want exception behavior to differ between dev and prod.\n  // (Rendering will throw with a helpful message and as soon as the type is\n  // fixed, the key warnings will appear.)\n\n\n  if (validType) {\n    for (var i = 2; i < arguments.length; i++) {\n      validateChildKeys(arguments[i], type);\n    }\n  }\n\n  if (type === exports.Fragment) {\n    validateFragmentProps(element);\n  } else {\n    validatePropTypes(element);\n  }\n\n  return element;\n}\nvar didWarnAboutDeprecatedCreateFactory = false;\nfunction createFactoryWithValidation(type) {\n  var validatedFactory = createElementWithValidation.bind(null, type);\n  validatedFactory.type = type;\n\n  {\n    if (!didWarnAboutDeprecatedCreateFactory) {\n      didWarnAboutDeprecatedCreateFactory = true;\n\n      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');\n    } // Legacy hook: remove it\n\n\n    Object.defineProperty(validatedFactory, 'type', {\n      enumerable: false,\n      get: function () {\n        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');\n\n        Object.defineProperty(this, 'type', {\n          value: type\n        });\n        return type;\n      }\n    });\n  }\n\n  return validatedFactory;\n}\nfunction cloneElementWithValidation(element, props, children) {\n  var newElement = cloneElement.apply(this, arguments);\n\n  for (var i = 2; i < arguments.length; i++) {\n    validateChildKeys(arguments[i], newElement.type);\n  }\n\n  validatePropTypes(newElement);\n  return newElement;\n}\n\n{\n\n  try {\n    var frozenObject = Object.freeze({});\n    /* eslint-disable no-new */\n\n    new Map([[frozenObject, null]]);\n    new Set([frozenObject]);\n    /* eslint-enable no-new */\n  } catch (e) {\n  }\n}\n\nvar createElement$1 =  createElementWithValidation ;\nvar cloneElement$1 =  cloneElementWithValidation ;\nvar createFactory =  createFactoryWithValidation ;\nvar Children = {\n  map: mapChildren,\n  forEach: forEachChildren,\n  count: countChildren,\n  toArray: toArray,\n  only: onlyChild\n};\n\nexports.Children = Children;\nexports.Component = Component;\nexports.PureComponent = PureComponent;\nexports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;\nexports.cloneElement = cloneElement$1;\nexports.createContext = createContext;\nexports.createElement = createElement$1;\nexports.createFactory = createFactory;\nexports.createRef = createRef;\nexports.forwardRef = forwardRef;\nexports.isValidElement = isValidElement;\nexports.lazy = lazy;\nexports.memo = memo;\nexports.useCallback = useCallback;\nexports.useContext = useContext;\nexports.useDebugValue = useDebugValue;\nexports.useEffect = useEffect;\nexports.useImperativeHandle = useImperativeHandle;\nexports.useLayoutEffect = useLayoutEffect;\nexports.useMemo = useMemo;\nexports.useReducer = useReducer;\nexports.useRef = useRef;\nexports.useState = useState;\nexports.version = ReactVersion;\n  })();\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/react/cjs/react.development.js?");

/***/ }),

/***/ "../node_modules/react/index.js":
/*!**************************************!*\
  !*** ../node_modules/react/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ \"../node_modules/react/cjs/react.development.js\");\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/react/index.js?");

/***/ }),

/***/ "../node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!**********************************************************************!*\
  !*** ../node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("/** @license React v0.20.2\n * scheduler-tracing.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nvar DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.\n\nvar interactionIDCounter = 0;\nvar threadIDCounter = 0; // Set of currently traced interactions.\n// Interactions \"stack\"–\n// Meaning that newly traced interactions are appended to the previously active set.\n// When an interaction goes out of scope, the previous set (if any) is restored.\n\nexports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.\n\nexports.__subscriberRef = null;\n\n{\n  exports.__interactionsRef = {\n    current: new Set()\n  };\n  exports.__subscriberRef = {\n    current: null\n  };\n}\nfunction unstable_clear(callback) {\n\n  var prevInteractions = exports.__interactionsRef.current;\n  exports.__interactionsRef.current = new Set();\n\n  try {\n    return callback();\n  } finally {\n    exports.__interactionsRef.current = prevInteractions;\n  }\n}\nfunction unstable_getCurrent() {\n  {\n    return exports.__interactionsRef.current;\n  }\n}\nfunction unstable_getThreadID() {\n  return ++threadIDCounter;\n}\nfunction unstable_trace(name, timestamp, callback) {\n  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;\n\n  var interaction = {\n    __count: 1,\n    id: interactionIDCounter++,\n    name: name,\n    timestamp: timestamp\n  };\n  var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.\n  // To do that, clone the current interactions.\n  // The previous set will be restored upon completion.\n\n  var interactions = new Set(prevInteractions);\n  interactions.add(interaction);\n  exports.__interactionsRef.current = interactions;\n  var subscriber = exports.__subscriberRef.current;\n  var returnValue;\n\n  try {\n    if (subscriber !== null) {\n      subscriber.onInteractionTraced(interaction);\n    }\n  } finally {\n    try {\n      if (subscriber !== null) {\n        subscriber.onWorkStarted(interactions, threadID);\n      }\n    } finally {\n      try {\n        returnValue = callback();\n      } finally {\n        exports.__interactionsRef.current = prevInteractions;\n\n        try {\n          if (subscriber !== null) {\n            subscriber.onWorkStopped(interactions, threadID);\n          }\n        } finally {\n          interaction.__count--; // If no async work was scheduled for this interaction,\n          // Notify subscribers that it's completed.\n\n          if (subscriber !== null && interaction.__count === 0) {\n            subscriber.onInteractionScheduledWorkCompleted(interaction);\n          }\n        }\n      }\n    }\n  }\n\n  return returnValue;\n}\nfunction unstable_wrap(callback) {\n  var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;\n\n  var wrappedInteractions = exports.__interactionsRef.current;\n  var subscriber = exports.__subscriberRef.current;\n\n  if (subscriber !== null) {\n    subscriber.onWorkScheduled(wrappedInteractions, threadID);\n  } // Update the pending async work count for the current interactions.\n  // Update after calling subscribers in case of error.\n\n\n  wrappedInteractions.forEach(function (interaction) {\n    interaction.__count++;\n  });\n  var hasRun = false;\n\n  function wrapped() {\n    var prevInteractions = exports.__interactionsRef.current;\n    exports.__interactionsRef.current = wrappedInteractions;\n    subscriber = exports.__subscriberRef.current;\n\n    try {\n      var returnValue;\n\n      try {\n        if (subscriber !== null) {\n          subscriber.onWorkStarted(wrappedInteractions, threadID);\n        }\n      } finally {\n        try {\n          returnValue = callback.apply(undefined, arguments);\n        } finally {\n          exports.__interactionsRef.current = prevInteractions;\n\n          if (subscriber !== null) {\n            subscriber.onWorkStopped(wrappedInteractions, threadID);\n          }\n        }\n      }\n\n      return returnValue;\n    } finally {\n      if (!hasRun) {\n        // We only expect a wrapped function to be executed once,\n        // But in the event that it's executed more than once–\n        // Only decrement the outstanding interaction counts once.\n        hasRun = true; // Update pending async counts for all wrapped interactions.\n        // If this was the last scheduled async work for any of them,\n        // Mark them as completed.\n\n        wrappedInteractions.forEach(function (interaction) {\n          interaction.__count--;\n\n          if (subscriber !== null && interaction.__count === 0) {\n            subscriber.onInteractionScheduledWorkCompleted(interaction);\n          }\n        });\n      }\n    }\n  }\n\n  wrapped.cancel = function cancel() {\n    subscriber = exports.__subscriberRef.current;\n\n    try {\n      if (subscriber !== null) {\n        subscriber.onWorkCanceled(wrappedInteractions, threadID);\n      }\n    } finally {\n      // Update pending async counts for all wrapped interactions.\n      // If this was the last scheduled async work for any of them,\n      // Mark them as completed.\n      wrappedInteractions.forEach(function (interaction) {\n        interaction.__count--;\n\n        if (subscriber && interaction.__count === 0) {\n          subscriber.onInteractionScheduledWorkCompleted(interaction);\n        }\n      });\n    }\n  };\n\n  return wrapped;\n}\n\nvar subscribers = null;\n\n{\n  subscribers = new Set();\n}\n\nfunction unstable_subscribe(subscriber) {\n  {\n    subscribers.add(subscriber);\n\n    if (subscribers.size === 1) {\n      exports.__subscriberRef.current = {\n        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,\n        onInteractionTraced: onInteractionTraced,\n        onWorkCanceled: onWorkCanceled,\n        onWorkScheduled: onWorkScheduled,\n        onWorkStarted: onWorkStarted,\n        onWorkStopped: onWorkStopped\n      };\n    }\n  }\n}\nfunction unstable_unsubscribe(subscriber) {\n  {\n    subscribers.delete(subscriber);\n\n    if (subscribers.size === 0) {\n      exports.__subscriberRef.current = null;\n    }\n  }\n}\n\nfunction onInteractionTraced(interaction) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onInteractionTraced(interaction);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onInteractionScheduledWorkCompleted(interaction) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onInteractionScheduledWorkCompleted(interaction);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkScheduled(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkScheduled(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkStarted(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkStarted(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkStopped(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkStopped(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkCanceled(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkCanceled(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nexports.unstable_clear = unstable_clear;\nexports.unstable_getCurrent = unstable_getCurrent;\nexports.unstable_getThreadID = unstable_getThreadID;\nexports.unstable_subscribe = unstable_subscribe;\nexports.unstable_trace = unstable_trace;\nexports.unstable_unsubscribe = unstable_unsubscribe;\nexports.unstable_wrap = unstable_wrap;\n  })();\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/scheduler/cjs/scheduler-tracing.development.js?");

/***/ }),

/***/ "../node_modules/scheduler/cjs/scheduler.development.js":
/*!**************************************************************!*\
  !*** ../node_modules/scheduler/cjs/scheduler.development.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("/** @license React v0.20.2\n * scheduler.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nvar enableSchedulerDebugging = false;\nvar enableProfiling = false;\n\nvar requestHostCallback;\nvar requestHostTimeout;\nvar cancelHostTimeout;\nvar requestPaint;\nvar hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';\n\nif (hasPerformanceNow) {\n  var localPerformance = performance;\n\n  exports.unstable_now = function () {\n    return localPerformance.now();\n  };\n} else {\n  var localDate = Date;\n  var initialTime = localDate.now();\n\n  exports.unstable_now = function () {\n    return localDate.now() - initialTime;\n  };\n}\n\nif ( // If Scheduler runs in a non-DOM environment, it falls back to a naive\n// implementation using setTimeout.\ntypeof window === 'undefined' || // Check if MessageChannel is supported, too.\ntypeof MessageChannel !== 'function') {\n  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,\n  // fallback to a naive implementation.\n  var _callback = null;\n  var _timeoutID = null;\n\n  var _flushCallback = function () {\n    if (_callback !== null) {\n      try {\n        var currentTime = exports.unstable_now();\n        var hasRemainingTime = true;\n\n        _callback(hasRemainingTime, currentTime);\n\n        _callback = null;\n      } catch (e) {\n        setTimeout(_flushCallback, 0);\n        throw e;\n      }\n    }\n  };\n\n  requestHostCallback = function (cb) {\n    if (_callback !== null) {\n      // Protect against re-entrancy.\n      setTimeout(requestHostCallback, 0, cb);\n    } else {\n      _callback = cb;\n      setTimeout(_flushCallback, 0);\n    }\n  };\n\n  requestHostTimeout = function (cb, ms) {\n    _timeoutID = setTimeout(cb, ms);\n  };\n\n  cancelHostTimeout = function () {\n    clearTimeout(_timeoutID);\n  };\n\n  exports.unstable_shouldYield = function () {\n    return false;\n  };\n\n  requestPaint = exports.unstable_forceFrameRate = function () {};\n} else {\n  // Capture local references to native APIs, in case a polyfill overrides them.\n  var _setTimeout = window.setTimeout;\n  var _clearTimeout = window.clearTimeout;\n\n  if (typeof console !== 'undefined') {\n    // TODO: Scheduler no longer requires these methods to be polyfilled. But\n    // maybe we want to continue warning if they don't exist, to preserve the\n    // option to rely on it in the future?\n    var requestAnimationFrame = window.requestAnimationFrame;\n    var cancelAnimationFrame = window.cancelAnimationFrame;\n\n    if (typeof requestAnimationFrame !== 'function') {\n      // Using console['error'] to evade Babel and ESLint\n      console['error'](\"This browser doesn't support requestAnimationFrame. \" + 'Make sure that you load a ' + 'polyfill in older browsers. https://reactjs.org/link/react-polyfills');\n    }\n\n    if (typeof cancelAnimationFrame !== 'function') {\n      // Using console['error'] to evade Babel and ESLint\n      console['error'](\"This browser doesn't support cancelAnimationFrame. \" + 'Make sure that you load a ' + 'polyfill in older browsers. https://reactjs.org/link/react-polyfills');\n    }\n  }\n\n  var isMessageLoopRunning = false;\n  var scheduledHostCallback = null;\n  var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main\n  // thread, like user events. By default, it yields multiple times per frame.\n  // It does not attempt to align with frame boundaries, since most tasks don't\n  // need to be frame aligned; for those that do, use requestAnimationFrame.\n\n  var yieldInterval = 5;\n  var deadline = 0; // TODO: Make this configurable\n\n  {\n    // `isInputPending` is not available. Since we have no way of knowing if\n    // there's pending input, always yield at the end of the frame.\n    exports.unstable_shouldYield = function () {\n      return exports.unstable_now() >= deadline;\n    }; // Since we yield every frame regardless, `requestPaint` has no effect.\n\n\n    requestPaint = function () {};\n  }\n\n  exports.unstable_forceFrameRate = function (fps) {\n    if (fps < 0 || fps > 125) {\n      // Using console['error'] to evade Babel and ESLint\n      console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');\n      return;\n    }\n\n    if (fps > 0) {\n      yieldInterval = Math.floor(1000 / fps);\n    } else {\n      // reset the framerate\n      yieldInterval = 5;\n    }\n  };\n\n  var performWorkUntilDeadline = function () {\n    if (scheduledHostCallback !== null) {\n      var currentTime = exports.unstable_now(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync\n      // cycle. This means there's always time remaining at the beginning of\n      // the message event.\n\n      deadline = currentTime + yieldInterval;\n      var hasTimeRemaining = true;\n\n      try {\n        var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);\n\n        if (!hasMoreWork) {\n          isMessageLoopRunning = false;\n          scheduledHostCallback = null;\n        } else {\n          // If there's more work, schedule the next message event at the end\n          // of the preceding one.\n          port.postMessage(null);\n        }\n      } catch (error) {\n        // If a scheduler task throws, exit the current browser task so the\n        // error can be observed.\n        port.postMessage(null);\n        throw error;\n      }\n    } else {\n      isMessageLoopRunning = false;\n    } // Yielding to the browser will give it a chance to paint, so we can\n  };\n\n  var channel = new MessageChannel();\n  var port = channel.port2;\n  channel.port1.onmessage = performWorkUntilDeadline;\n\n  requestHostCallback = function (callback) {\n    scheduledHostCallback = callback;\n\n    if (!isMessageLoopRunning) {\n      isMessageLoopRunning = true;\n      port.postMessage(null);\n    }\n  };\n\n  requestHostTimeout = function (callback, ms) {\n    taskTimeoutID = _setTimeout(function () {\n      callback(exports.unstable_now());\n    }, ms);\n  };\n\n  cancelHostTimeout = function () {\n    _clearTimeout(taskTimeoutID);\n\n    taskTimeoutID = -1;\n  };\n}\n\nfunction push(heap, node) {\n  var index = heap.length;\n  heap.push(node);\n  siftUp(heap, node, index);\n}\nfunction peek(heap) {\n  var first = heap[0];\n  return first === undefined ? null : first;\n}\nfunction pop(heap) {\n  var first = heap[0];\n\n  if (first !== undefined) {\n    var last = heap.pop();\n\n    if (last !== first) {\n      heap[0] = last;\n      siftDown(heap, last, 0);\n    }\n\n    return first;\n  } else {\n    return null;\n  }\n}\n\nfunction siftUp(heap, node, i) {\n  var index = i;\n\n  while (true) {\n    var parentIndex = index - 1 >>> 1;\n    var parent = heap[parentIndex];\n\n    if (parent !== undefined && compare(parent, node) > 0) {\n      // The parent is larger. Swap positions.\n      heap[parentIndex] = node;\n      heap[index] = parent;\n      index = parentIndex;\n    } else {\n      // The parent is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction siftDown(heap, node, i) {\n  var index = i;\n  var length = heap.length;\n\n  while (index < length) {\n    var leftIndex = (index + 1) * 2 - 1;\n    var left = heap[leftIndex];\n    var rightIndex = leftIndex + 1;\n    var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.\n\n    if (left !== undefined && compare(left, node) < 0) {\n      if (right !== undefined && compare(right, left) < 0) {\n        heap[index] = right;\n        heap[rightIndex] = node;\n        index = rightIndex;\n      } else {\n        heap[index] = left;\n        heap[leftIndex] = node;\n        index = leftIndex;\n      }\n    } else if (right !== undefined && compare(right, node) < 0) {\n      heap[index] = right;\n      heap[rightIndex] = node;\n      index = rightIndex;\n    } else {\n      // Neither child is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction compare(a, b) {\n  // Compare sort index first, then task id.\n  var diff = a.sortIndex - b.sortIndex;\n  return diff !== 0 ? diff : a.id - b.id;\n}\n\n// TODO: Use symbols?\nvar ImmediatePriority = 1;\nvar UserBlockingPriority = 2;\nvar NormalPriority = 3;\nvar LowPriority = 4;\nvar IdlePriority = 5;\n\nfunction markTaskErrored(task, ms) {\n}\n\n/* eslint-disable no-var */\n// Math.pow(2, 30) - 1\n// 0b111111111111111111111111111111\n\nvar maxSigned31BitInt = 1073741823; // Times out immediately\n\nvar IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out\n\nvar USER_BLOCKING_PRIORITY_TIMEOUT = 250;\nvar NORMAL_PRIORITY_TIMEOUT = 5000;\nvar LOW_PRIORITY_TIMEOUT = 10000; // Never times out\n\nvar IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap\n\nvar taskQueue = [];\nvar timerQueue = []; // Incrementing id counter. Used to maintain insertion order.\n\nvar taskIdCounter = 1; // Pausing the scheduler is useful for debugging.\nvar currentTask = null;\nvar currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.\n\nvar isPerformingWork = false;\nvar isHostCallbackScheduled = false;\nvar isHostTimeoutScheduled = false;\n\nfunction advanceTimers(currentTime) {\n  // Check for tasks that are no longer delayed and add them to the queue.\n  var timer = peek(timerQueue);\n\n  while (timer !== null) {\n    if (timer.callback === null) {\n      // Timer was cancelled.\n      pop(timerQueue);\n    } else if (timer.startTime <= currentTime) {\n      // Timer fired. Transfer to the task queue.\n      pop(timerQueue);\n      timer.sortIndex = timer.expirationTime;\n      push(taskQueue, timer);\n    } else {\n      // Remaining timers are pending.\n      return;\n    }\n\n    timer = peek(timerQueue);\n  }\n}\n\nfunction handleTimeout(currentTime) {\n  isHostTimeoutScheduled = false;\n  advanceTimers(currentTime);\n\n  if (!isHostCallbackScheduled) {\n    if (peek(taskQueue) !== null) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    } else {\n      var firstTimer = peek(timerQueue);\n\n      if (firstTimer !== null) {\n        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n      }\n    }\n  }\n}\n\nfunction flushWork(hasTimeRemaining, initialTime) {\n\n\n  isHostCallbackScheduled = false;\n\n  if (isHostTimeoutScheduled) {\n    // We scheduled a timeout but it's no longer needed. Cancel it.\n    isHostTimeoutScheduled = false;\n    cancelHostTimeout();\n  }\n\n  isPerformingWork = true;\n  var previousPriorityLevel = currentPriorityLevel;\n\n  try {\n    if (enableProfiling) {\n      try {\n        return workLoop(hasTimeRemaining, initialTime);\n      } catch (error) {\n        if (currentTask !== null) {\n          var currentTime = exports.unstable_now();\n          markTaskErrored(currentTask, currentTime);\n          currentTask.isQueued = false;\n        }\n\n        throw error;\n      }\n    } else {\n      // No catch in prod code path.\n      return workLoop(hasTimeRemaining, initialTime);\n    }\n  } finally {\n    currentTask = null;\n    currentPriorityLevel = previousPriorityLevel;\n    isPerformingWork = false;\n  }\n}\n\nfunction workLoop(hasTimeRemaining, initialTime) {\n  var currentTime = initialTime;\n  advanceTimers(currentTime);\n  currentTask = peek(taskQueue);\n\n  while (currentTask !== null && !(enableSchedulerDebugging )) {\n    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || exports.unstable_shouldYield())) {\n      // This currentTask hasn't expired, and we've reached the deadline.\n      break;\n    }\n\n    var callback = currentTask.callback;\n\n    if (typeof callback === 'function') {\n      currentTask.callback = null;\n      currentPriorityLevel = currentTask.priorityLevel;\n      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;\n\n      var continuationCallback = callback(didUserCallbackTimeout);\n      currentTime = exports.unstable_now();\n\n      if (typeof continuationCallback === 'function') {\n        currentTask.callback = continuationCallback;\n      } else {\n\n        if (currentTask === peek(taskQueue)) {\n          pop(taskQueue);\n        }\n      }\n\n      advanceTimers(currentTime);\n    } else {\n      pop(taskQueue);\n    }\n\n    currentTask = peek(taskQueue);\n  } // Return whether there's additional work\n\n\n  if (currentTask !== null) {\n    return true;\n  } else {\n    var firstTimer = peek(timerQueue);\n\n    if (firstTimer !== null) {\n      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n    }\n\n    return false;\n  }\n}\n\nfunction unstable_runWithPriority(priorityLevel, eventHandler) {\n  switch (priorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n    case LowPriority:\n    case IdlePriority:\n      break;\n\n    default:\n      priorityLevel = NormalPriority;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_next(eventHandler) {\n  var priorityLevel;\n\n  switch (currentPriorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n      // Shift down to normal priority\n      priorityLevel = NormalPriority;\n      break;\n\n    default:\n      // Anything lower than normal priority should remain at the current level.\n      priorityLevel = currentPriorityLevel;\n      break;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_wrapCallback(callback) {\n  var parentPriorityLevel = currentPriorityLevel;\n  return function () {\n    // This is a fork of runWithPriority, inlined for performance.\n    var previousPriorityLevel = currentPriorityLevel;\n    currentPriorityLevel = parentPriorityLevel;\n\n    try {\n      return callback.apply(this, arguments);\n    } finally {\n      currentPriorityLevel = previousPriorityLevel;\n    }\n  };\n}\n\nfunction unstable_scheduleCallback(priorityLevel, callback, options) {\n  var currentTime = exports.unstable_now();\n  var startTime;\n\n  if (typeof options === 'object' && options !== null) {\n    var delay = options.delay;\n\n    if (typeof delay === 'number' && delay > 0) {\n      startTime = currentTime + delay;\n    } else {\n      startTime = currentTime;\n    }\n  } else {\n    startTime = currentTime;\n  }\n\n  var timeout;\n\n  switch (priorityLevel) {\n    case ImmediatePriority:\n      timeout = IMMEDIATE_PRIORITY_TIMEOUT;\n      break;\n\n    case UserBlockingPriority:\n      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;\n      break;\n\n    case IdlePriority:\n      timeout = IDLE_PRIORITY_TIMEOUT;\n      break;\n\n    case LowPriority:\n      timeout = LOW_PRIORITY_TIMEOUT;\n      break;\n\n    case NormalPriority:\n    default:\n      timeout = NORMAL_PRIORITY_TIMEOUT;\n      break;\n  }\n\n  var expirationTime = startTime + timeout;\n  var newTask = {\n    id: taskIdCounter++,\n    callback: callback,\n    priorityLevel: priorityLevel,\n    startTime: startTime,\n    expirationTime: expirationTime,\n    sortIndex: -1\n  };\n\n  if (startTime > currentTime) {\n    // This is a delayed task.\n    newTask.sortIndex = startTime;\n    push(timerQueue, newTask);\n\n    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {\n      // All tasks are delayed, and this is the task with the earliest delay.\n      if (isHostTimeoutScheduled) {\n        // Cancel an existing timeout.\n        cancelHostTimeout();\n      } else {\n        isHostTimeoutScheduled = true;\n      } // Schedule a timeout.\n\n\n      requestHostTimeout(handleTimeout, startTime - currentTime);\n    }\n  } else {\n    newTask.sortIndex = expirationTime;\n    push(taskQueue, newTask);\n    // wait until the next time we yield.\n\n\n    if (!isHostCallbackScheduled && !isPerformingWork) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    }\n  }\n\n  return newTask;\n}\n\nfunction unstable_pauseExecution() {\n}\n\nfunction unstable_continueExecution() {\n\n  if (!isHostCallbackScheduled && !isPerformingWork) {\n    isHostCallbackScheduled = true;\n    requestHostCallback(flushWork);\n  }\n}\n\nfunction unstable_getFirstCallbackNode() {\n  return peek(taskQueue);\n}\n\nfunction unstable_cancelCallback(task) {\n  // remove from the queue because you can't remove arbitrary nodes from an\n  // array based heap, only the first one.)\n\n\n  task.callback = null;\n}\n\nfunction unstable_getCurrentPriorityLevel() {\n  return currentPriorityLevel;\n}\n\nvar unstable_requestPaint = requestPaint;\nvar unstable_Profiling =  null;\n\nexports.unstable_IdlePriority = IdlePriority;\nexports.unstable_ImmediatePriority = ImmediatePriority;\nexports.unstable_LowPriority = LowPriority;\nexports.unstable_NormalPriority = NormalPriority;\nexports.unstable_Profiling = unstable_Profiling;\nexports.unstable_UserBlockingPriority = UserBlockingPriority;\nexports.unstable_cancelCallback = unstable_cancelCallback;\nexports.unstable_continueExecution = unstable_continueExecution;\nexports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;\nexports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;\nexports.unstable_next = unstable_next;\nexports.unstable_pauseExecution = unstable_pauseExecution;\nexports.unstable_requestPaint = unstable_requestPaint;\nexports.unstable_runWithPriority = unstable_runWithPriority;\nexports.unstable_scheduleCallback = unstable_scheduleCallback;\nexports.unstable_wrapCallback = unstable_wrapCallback;\n  })();\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/scheduler/cjs/scheduler.development.js?");

/***/ }),

/***/ "../node_modules/scheduler/index.js":
/*!******************************************!*\
  !*** ../node_modules/scheduler/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ \"../node_modules/scheduler/cjs/scheduler.development.js\");\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/scheduler/index.js?");

/***/ }),

/***/ "../node_modules/scheduler/tracing.js":
/*!********************************************!*\
  !*** ../node_modules/scheduler/tracing.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler-tracing.development.js */ \"../node_modules/scheduler/cjs/scheduler-tracing.development.js\");\n}\n\n\n//# sourceURL=webpack://skele2d/../node_modules/scheduler/tracing.js?");

/***/ }),

/***/ "./jsMenus/jsMenus.css":
/*!*****************************!*\
  !*** ./jsMenus/jsMenus.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"../node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"../node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"../node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"../node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_jsMenus_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./jsMenus.css */ \"../node_modules/css-loader/dist/cjs.js!./jsMenus/jsMenus.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_jsMenus_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_jsMenus_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_jsMenus_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_jsMenus_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://skele2d/./jsMenus/jsMenus.css?");

/***/ }),

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"../node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"../node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"../node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"../node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"../node_modules/css-loader/dist/cjs.js!./styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://skele2d/./styles.css?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://skele2d/../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://skele2d/../node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://skele2d/../node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://skele2d/../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://skele2d/../node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://skele2d/../node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./jsMenus/jsMenus.js":
/*!****************************!*\
  !*** ./jsMenus/jsMenus.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Menu\": () => (/* binding */ Menu),\n/* harmony export */   \"MenuItem\": () => (/* binding */ MenuItem)\n/* harmony export */ });\nclass Menu {\n\tconstructor(settings = {}) {\n\t\tconst typeEnum = ['contextmenu', 'menubar'];\n\t\tlet items = [];\n\t\tlet type = isValidType(settings.type) ? settings.type : 'contextmenu';\n\t\tlet beforeShow = settings.beforeShow;\n\t\tObject.defineProperty(this, 'items', {\n\t\t\tget: () => {\n\t\t\t\treturn items;\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'beforeShow', {\n\t\t\tget: () => {\n\t\t\t\treturn beforeShow;\n\t\t\t}\n\t\t});\n\n\t \tObject.defineProperty(this, 'type', {\n\t\t\tget: () => {\n\t\t\t\treturn type;\n\t\t\t},\n\t\t\tset: (typeIn) => {\n\t\t\t\ttype = isValidType(typeIn) ? typeIn : type;\n\t\t\t}\n\t\t});\n\n\t\tthis.append = item => {\n\t\t\tif(!(item instanceof MenuItem)) {\n\t\t\t\tconsole.error('appended item must be an instance of MenuItem');\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tlet index = items.push(item);\n\t\t\treturn index;\n\t\t};\n\n\t\tthis.insert = (item, index) => {\n\t\t\tif(!(item instanceof MenuItem)) {\n\t\t\t\tconsole.error('inserted item must be an instance of MenuItem');\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\titems.splice(index, 0, item);\n\t\t\treturn true;\n\t\t};\n\n\t\tthis.remove = item => {\n\t\t\tif(!(item instanceof MenuItem)) {\n\t\t\t\tconsole.error('item to be removed is not an instance of MenuItem');\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tlet index = items.indexOf(item);\n\t\t\tif(index < 0) {\n\t\t\t\tconsole.error('item to be removed was not found in this.items');\n\t\t\t\treturn false;\n\t\t\t} else {\n\t\t\t\titems.splice(index, 0);\n\t\t\t\treturn true;\n\t\t\t}\n\t\t};\n\n\t\tthis.removeAt = index => {\n\t\t\titems.splice(index, 0);\n\t\t\treturn true;\n\t\t};\n\n\t\tthis.node = null;\n\n\t\tfunction isValidType(typeIn = '', debug = false) {\n\t\t\tif(typeEnum.indexOf(typeIn) < 0) {\n\t\t\t\tif(debug) console.error(`${typeIn} is not a valid type`);\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\n\t}\n\n\tcreateMacBuiltin() {\n\t\tconsole.error('This method is not available in browser :(');\n\t\treturn false;\n\t}\n\n\tpopup(x, y, itemNode = null, menubarSubmenu = false) {\n\t\tlet setRight = false;\n\n\t\tlet submenu = itemNode != null || this.submenu;\n\t\tthis.submenu = menubarSubmenu;\n\n\t\tmenubarSubmenu = menubarSubmenu || this.menubarSubmenu;\n\t\tthis.menubarSubmenu = menubarSubmenu;\n\t\tif (! Menu._topmostMenu) {\n\t\t\tMenu._topmostMenu = this;\n\t\t\tlet el = Menu.contextMenuParent || document.body;\n\t\t\tMenu._listenerElement = el;\n\t\t\tel.addEventListener('mouseup', Menu._mouseHandler, false);\n\t\t\tel.addEventListener('mousedown', Menu._mouseHandler, false);\n\t\t}\n\n\t\tlet menuNode = this.buildMenu(submenu, menubarSubmenu);\n\t\tmenuNode.jsMenu = this;\n\t\tthis.node = menuNode;\n\t\tMenu._currentMenuNode = menuNode;\n\n\t\tif(this.node.parentNode) {\n\t\t\tif(menuNode === this.node) return;\n\t\t\tthis.node.parentNode.replaceChild(menuNode, this.node);\n\t\t} else {\n\t\t\tlet el = Menu.contextMenuParent || document.body;\n\t\t\tel.appendChild(this.node);\n\t\t}\n\n\t\tlet width = menuNode.clientWidth;\n\t\tlet height = menuNode.clientHeight;\n\n\t\tif((x + width) > window.innerWidth) {\n\t\t\tsetRight = true;\n\t\t\tif(submenu) {\n\t\t\t\tx = window.innerWidth - itemNode.parentNode.offsetLeft + 2;\n\t\t\t} else {\n\t\t\t\tx = 0;\n\t\t\t}\n\t\t}\n\n\t\tif((y + height) > window.innerHeight) {\n\t\t\ty = window.innerHeight - height;\n\t\t}\n\n\t\tif(!setRight) {\n\t\t\tmenuNode.style.left = x + 'px';\n\t\t\tmenuNode.style.right = 'auto';\n\t\t} else {\n\t\t\tmenuNode.style.right = x + 'px';\n\t\t\tmenuNode.style.left = 'auto';\n\t\t}\n\n\t\tmenuNode.style.top = y + 'px';\n\t\tmenuNode.classList.add('show');\n\t}\n\n\tpopdown() {\n\t\tthis.items.forEach(item => {\n\t\t\tif(item.submenu) {\n\t\t\t\titem.submenu.popdown();\n\t\t\t} else {\n\t\t\t\titem.node = null;\n\t\t\t}\n\t\t});\n\t\tif(this.node && this.type !== 'menubar') {\n\t\t\tMenu._currentMenuNode = this.node.parentMenuNode;\n\t\t\tif (this.menubarSubmenu)\n\t\t\t\tthis.node.menuItem.classList.remove('submenu-active');\n\t\t\tthis.node.parentNode.removeChild(this.node);\n\t\t\tthis.node = null;\n\t\t}\n\t\tif (this == Menu._topmostMenu) {\n\t\t\tMenu._topmostMenu = null;\n\t\t\tlet el = Menu._listenerElement;\n\t\t\tif (el) {\n\t\t\t\tel.removeEventListener('mouseup', Menu._mouseHandler, false);\n\t\t\t\tel.removeEventListener('mousedown', Menu._mouseHandler, false);\n\t\t\t\tMenu._listenerElement = null;\n\t\t\t}\n\t\t}\n\n\t\tif(this.type === 'menubar') {\n\t\t\tthis.clearActiveSubmenuStyling();\n\t\t}\n\t}\n\n\tstatic popdownAll() {\n\t\tMenu._topmostMenu.popdown();\n\t\treturn;\n\t}\n\n\tbuildMenu(submenu = false, menubarSubmenu = false) {\n\t\tif (this.beforeShow)\n\t\t\t(this.beforeShow)(this);\n\t\tlet menuNode = document.createElement('ul');\n\t\tmenuNode.classList.add('nwjs-menu', this.type);\n\t\tif(submenu) menuNode.classList.add('submenu');\n\t\tif(menubarSubmenu) menuNode.classList.add('menubar-submenu');\n\n\t\tmenuNode.jsMenu = this;\n\t\tmenuNode.parentMenuNode = Menu._currentMenuNode;\n\t\tthis.items.forEach(item => {\n\t\t\tif (item.beforeShow)\n\t\t\t\t(item.beforeShow)(item);\n\t\t\tif (item.visible) {\n\t\t\t\titem.buildItem(menuNode,\n\t\t\t\t\t       this.type === 'menubar');\n\t\t\t}\n\t\t});\n\t\treturn menuNode;\n\t}\n\n\tstatic isDescendant(parent, child) {\n\t\tlet node = child.parentNode;\n\t\twhile(node !== null) {\n\t\t\tif(node === parent) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\tnode = node.parentNode;\n\t\t}\n\t\treturn false;\n\t}\n\n\tstatic _mouseHandler(e) {\n\t\tlet inMenubar = Menu._menubarNode != null\n                    && Menu.isDescendant(Menu._menubarNode, e.target);\n\t\tlet menubarHandler = e.currentTarget == Menu._menubarNode;\n\t\tlet miNode = e.target;\n\t\twhile (miNode && ! miNode.jsMenuItem)\n\t\t\tmiNode = miNode.parentNode;\n\t\t/* mouseenter:\n\t\t     if selected sibling: unhighlight (and popdown if submenu)\n\t\t     select item and if submenu popup\n\t\t   mouseout (or mouseleave):\n\t\t     if (! submenu) unhighlight\n\t\t   mousedown:\n\t\t   if (miNode) select\n\t\t   else popdownAll\n\t\t*/\n\t\t//console.log(\"HANDLE \"+e.type+\" inMB:\"+inMenubar+\" handler-t:\"+e.currentTarget+\" mbHandler:\"+menubarHandler+\" miNode:\"+miNode);\n\t\tif (e.type==\"mouseup\") {\n\t\t\t/*\n\t\t\tif (miNode != null) {\n\t\t\tif active and not submenu: popdownAll and do click.\n\t\t\tif (active and submenu) as-is.\n\t\t\tif (! active) should not happen\n\t\t\t} else {\n\t\t\tdo nothing\n\t\t\t}\n\t\t\t*/\n\t\t}\n\t\tif (e.type==\"mousedown\" && !miNode) {\n\t\t\tif (Menu._topmostMenu)\n\t\t\t\tMenu.popdownAll();\n\t\t}\n\t\tif ((inMenubar == menubarHandler) && miNode) {\n\t\t\tlet item = miNode.jsMenuItem;\n\t\t\tif (e.type==\"mousedown\") {\n\t\t\t\titem.node.classList.toggle('submenu-active');\n\t\t\t\t// FIXME use select method\n\t\t\t\tif(item.submenu) {\n\t\t\t\t\tif(item.node.classList.contains('submenu-active')) {\n\t\t\t\t\t\tmiNode.jsMenu.node.activeItemNode = item.node;\n\n\t\t\t\t\t\titem.popupSubmenu(item.node.offsetLeft, item.node.clientHeight, true);\n\t\t\t\t\t} else {\n\t\t\t\t\t\titem.submenu.popdown();\n\t\t\t\t\t\tmiNode.jsMenu.node.currentSubmenu = null;\n\t\t\t\t\t\tmiNode.jsMenu.node.activeItemNode = null;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (e.type==\"mouseup\") {\n\t\t\t\titem.doit(miNode);\n\t\t\t}\n\t\t}\n\t}\n\n\tstatic setApplicationMenu(menubar, parent=null) {\n\t\tlet oldNode = Menu._menubarNode;\n\t\tif (oldNode) {\n\t\t\tlet parent = oldNode.parentNode;\n\t\t\tif (parent != null)\n\t\t\t\tparent.removeChild(oldNode);\n\t\t\toldNode.removeEventListener('mousedown', Menu._mouseHandler, false);\n\t\t\tMenu._menubarNode = null;\n\t\t}\n\t\tif (menubar != null) {\n\t\t\tif (parent == null)\n\t\t\t\tparent = Menu._menubarParent || document.body;\n\t\t\tMenu._menubarParent = parent;\n\t\t\tlet newNode = menubar.buildMenu();\n\t\t\tnewNode.jsMenuItem = null;\n\t\t\tparent.insertBefore(newNode, parent.firstChild);\n\t\t\tnewNode.addEventListener('mousedown', Menu._mouseHandler, false);\n\t\t\tMenu._menubarNode = newNode;\n\t\t\tmenubar.node = newNode;\n\t\t}\n\t\tMenu._menubar = menubar;\n\t}\n\n\tclearActiveSubmenuStyling(notThisNode) {\n\t\tif (! this.node)\n\t\t\treturn;\n\t\tlet submenuActive = this.node.querySelectorAll('.submenu-active');\n\t\tfor(let node of submenuActive) {\n\t\t\tif(node === notThisNode) continue;\n\t\t\tnode.classList.remove('submenu-active');\n\t\t}\n\t}\n\n\tstatic recursiveNodeFind(menu, node) {\n\t\tif(menu.node === node) {\n\t\t\treturn true;\n\t\t} else if(Menu.isDescendant(menu.node, node)) {\n\t\t\treturn true;\n\t\t} else if(menu.items.length > 0) {\n\t\t\tfor(var i=0; i < menu.items.length; i++) {\n\t\t\t\tlet menuItem = menu.items[i];\n\t\t\t\tif(!menuItem.node) continue;\n\n\t\t\t\tif(menuItem.node === node) {\n\t\t\t\t\treturn true;\n\t\t\t\t} else if(Menu.isDescendant(menuItem.node, node)) {\n\t\t\t\t\treturn true;\n\t\t\t\t} else {\n\t\t\t\t\tif(menuItem.submenu) {\n\t\t\t\t\t\tif(recursiveNodeFind(menuItem.submenu, node)) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\treturn false;\n\t\t}\n\t\treturn false;\n\t}\n\n\tisNodeInChildMenuTree(node = false) {\n\t\tif(!node) return false;\n\t\treturn recursiveNodeFind(this, node);\n\t}\n}\n\n// Parent node for context menu popup.  If null, document.body is the default.\nMenu.contextMenuParent = null;\n\nMenu._currentMenuNode = null;\n\nMenu._keydownListener = function(e) {\n\tfunction nextItem(menuNode, curNode, forwards) {\n\t\tlet nullSeen = false;\n\t\tlet next = curNode;\n\t\tfor (;;) {\n\t\t\tnext = !next ? null\n\t\t\t\t: forwards ? next.nextSibling\n\t\t\t\t: next.previousSibling;\n\t\t\tif (! next) {\n\t\t\t\tnext = forwards ? menuNode.firstChild\n\t\t\t\t\t: menuNode.lastChild;\n\t\t\t\tif (nullSeen || !next)\n\t\t\t\t\treturn null;\n\t\t\t\tnullSeen = true;\n\t\t\t}\n\t\t\tif (next instanceof Element\n\t\t\t    && next.classList.contains(\"menu-item\")\n\t\t\t    && next.jsMenuItem.type != 'separator'\n\t\t\t    && ! (next.classList.contains(\"disabled\")))\n\t\t\t\treturn next;\n\t\t}\n\t}\n\tfunction nextMenu(menuNode, forwards) {\n\t\tlet menubarNode = menuNode.menuItem.parentNode;\n\t\tlet next = nextItem(menubarNode,\n\t\t\t\t    menubarNode.activeItemNode,\n\t\t\t\t    forwards);\n\t\tif (next)\n\t\t    next.jsMenuItem.select(next, true, true, true);\n\t\treturn next;\n\n\t}\n\tfunction openSubmenu(active) {\n\t\tactive.jsMenuItem.selectSubmenu(active);\n\t\tmenuNode = Menu._currentMenuNode;\n\t\tlet next = nextItem(menuNode, null, true);\n\t\tif (next)\n\t\t\tnext.jsMenuItem.select(next, true, false);\n\t}\n\tlet menuNode = Menu._currentMenuNode\n\tif (menuNode) {\n\t\tlet active = menuNode.activeItemNode;\n\t\tswitch (e.keyCode) {\n\t\tcase 27: // Escape\n\t\tcase 37: // Left\n\t\t\te.preventDefault();\n\t\t\te.stopPropagation();\n\t\t\tif (e.keyCode == 37\n\t\t\t    && menuNode.jsMenu.menubarSubmenu\n\t\t\t    && nextMenu(menuNode, false))\n\t\t\t\treturn;\n\t\t\tmenuNode.jsMenu.popdown();\n\t\t\tbreak;\n\t\tcase 13: // Enter\n\t\t\te.preventDefault();\n\t\t\te.stopPropagation();\n\t\t\tif (active) {\n\t\t\t\tif (active.jsMenuItem.submenu)\n\t\t\t\t\topenSubmenu(active);\n\t\t\t\telse\n\t\t\t\t\tactive.jsMenuItem.doit(active);\n\t\t\t}\n\t\t\tbreak;\n\t\tcase 39: // Right\n\t\t\te.preventDefault();\n\t\t\te.stopPropagation();\n\t\t\tif (active && active.jsMenuItem.submenu)\n\t\t\t\topenSubmenu(active);\n\t\t\telse if (Menu._topmostMenu.menubarSubmenu)\n\t\t\t\tnextMenu(menuNode, true);\n\t\t\tbreak;\n\t\tcase 38: // Up\n\t\tcase 40: // Down\n\t\t\te.preventDefault();\n\t\t\te.stopPropagation();\n\t\t\tlet next = nextItem(menuNode,\n\t\t\t\t\t    menuNode.activeItemNode,\n\t\t\t\t\t    e.keyCode == 40);\n\t\t\tif (next)\n\t\t\t\tnext.jsMenuItem.select(next, true, false);\n\t\t\tbreak;\n\t\t}\n\t}\n}\nMenu._keydownListening = false;\nMenu._keydownListen = function(value) {\n    if (value != Menu._keydownListening) {\n        if (value)\n            document.addEventListener('keydown', Menu._keydownListener, true);\n        else\n            document.removeEventListener('keydown', Menu._keydownListener, true);\n    }\n    Menu._keydownListening = value;\n}\nMenu._keydownListen(true);\n\nclass MenuItem {\n\tconstructor(settings = {}) {\n\n\n\t\tconst modifiersEnum = ['cmd', 'command', 'super', 'shift', 'ctrl', 'alt'];\n\t\tconst typeEnum = ['separator', 'checkbox', 'radio', 'normal'];\n\t\tlet type = isValidType(settings.type) ? settings.type : 'normal';\n\t\tlet submenu = settings.submenu || null;\n\t\tlet click = settings.click || null;\n\t\tlet modifiers = validModifiers(settings.modifiers) ? settings.modifiers : null;\n\t\tlet label = settings.label || '';\n\n\t\tlet enabled = settings.enabled;\n\t\tif(typeof settings.enabled === 'undefined') enabled = true;\n\t\tlet visible = settings.visible;\n\t\tif(typeof settings.visible === 'undefined') visible = true;\n\t\tlet beforeShow = settings.beforeShow;\n\n\t\tObject.defineProperty(this, 'type', {\n\t\t\tget: () => {\n\t\t\t\treturn type;\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'beforeShow', {\n\t\t\tget: () => {\n\t\t\t\treturn beforeShow;\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'submenu', {\n\t\t\tget: () => {\n\t\t\t\treturn submenu;\n\t\t\t},\n\t\t\tset: (inputMenu) => {\n\t\t\t\tconsole.warn('submenu should be set on initialisation, changing this at runtime could be slow on some platforms.');\n\t\t\t\tif(!(inputMenu instanceof Menu)) {\n\t\t\t\t\tconsole.error('submenu must be an instance of Menu');\n\t\t\t\t\treturn;\n\t\t\t\t} else {\n\t\t\t\t\tsubmenu = inputMenu;\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'click', {\n\t\t\tget: () => {\n\t\t\t\treturn click;\n\t\t\t},\n\t\t\tset: (inputCallback) => {\n\t\t\t\tif(typeof inputCallback !== 'function') {\n\t\t\t\t\tconsole.error('click must be a function');\n\t\t\t\t\treturn;\n\t\t\t\t} else {\n\t\t\t\t\tclick = inputCallback;\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'modifiers', {\n\t\t\tget: () => {\n\t\t\t\treturn modifiers;\n\t\t\t},\n\t\t\tset: (inputModifiers) => {\n\t\t\t\tmodifiers = validModifiers(inputModifiers) ? inputModifiers : modifiers;\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'enabled', {\n\t\t\tget: () => {\n\t\t\t\treturn enabled;\n\t\t\t},\n\t\t\tset: (inputEnabled) => {\n\t\t\t\tenabled = inputEnabled;\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'visible', {\n\t\t\tget: () => {\n\t\t\t\treturn visible;\n\t\t\t},\n\t\t\tset: (inputVisible) => {\n\t\t\t\tvisible = inputVisible;\n\t\t\t}\n\t\t});\n\n\t\tObject.defineProperty(this, 'label', {\n\t\t\tget: () => {\n\t\t\t\treturn label;\n\t\t\t},\n\t\t\tset: (inputLabel) => {\n\t\t\t\tlabel = inputLabel;\n\t\t\t}\n\t\t});\n\n\t\tthis.icon = settings.icon || null;\n\t\tthis.iconIsTemplate = settings.iconIsTemplate || false;\n\t\tthis.tooltip = settings.tooltip || '';\n\t\tthis.checked = settings.checked || false;\n\n\t\tthis.key = settings.key || null;\n\t\tthis.accelerator = settings.accelerator;\n\t\tthis.node = null;\n\n\t\tif(this.key) {\n\t\t\tthis.key = this.key.toUpperCase();\n\t\t}\n\t\tfunction validModifiers(modifiersIn = '') {\n\t\t\tlet modsArr = modifiersIn.split('+');\n\t\t\tfor(let i=0; i < modsArr; i++) {\n\t\t\t\tlet mod = modsArr[i].trim();\n\t\t\t\tif(modifiersEnum.indexOf(mod) < 0) {\n\t\t\t\t\tconsole.error(`${mod} is not a valid modifier`);\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\n\t\tfunction isValidType(typeIn = '', debug = false) {\n\t\t\tif(typeEnum.indexOf(typeIn) < 0) {\n\t\t\t\tif(debug) console.error(`${typeIn} is not a valid type`);\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t}\n\n\ttoString() {\n\t\treturn this.type+\"[\"+this.label+\"]\";\n\t}\n\n\t_mouseoverHandle_menubarTop() {\n\t\tlet pmenu = this.node.jsMenuNode;\n\t\tif (pmenu.activeItemNode) {\n\t\t\tpmenu.activeItemNode.classList.remove('active');\n\t\t\tpmenu.activeItemNode = null;\n\t\t}\n\t\tif (pmenu && pmenu.querySelector('.submenu-active')) {\n\t\t\tif(this.node.classList.contains('submenu-active')) return;\n\n\t\t\tthis.node.classList.add('submenu-active');\n\t\t\tthis.select(this.node, true, true, true);\n\t\t}\n\t}\n\n\tdoit(node) {\n\t\tif (! this.submenu) {\n\t\t\tMenu.popdownAll();\n\t\t\tif(this.type === 'checkbox')\n\t\t\t\tthis.checked = !this.checked;\n\t\t\telse if (this.type === 'radio') {\n\t\t\t\tthis.checked = true;\n\t\t\t\tfor (let dir = 0; dir <= 1; dir++) {\n\t\t\t\t\tfor (let n = node; ; ) {\n\t\t\t\t\t\tn = dir ? n.nextSibling\n\t\t\t\t\t\t\t: n.previousSibling;\n\t\t\t\t\t\tif (! (n instanceof Element\n\t\t\t\t\t\t       && n.classList.contains(\"radio\")))\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tn.jsMenuItem.checked = false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tif(this.click) this.click(this);\n\t\t}\n\t}\n\n\tselect(node, turnOn, popupSubmenu, menubarSubmenu = false) {\n\t\tlet pmenu = node.jsMenuNode;\n\t\tif (pmenu.activeItemNode) {\n\t\t\tpmenu.activeItemNode.classList.remove('active');\n\t\t\tpmenu.activeItemNode.classList.remove('submenu-active');\n\t\t\tpmenu.activeItemNode = null;\n\t\t}\n\t\tif(pmenu.currentSubmenu) {\n\t\t\tpmenu.currentSubmenu.popdown();\n\t\t\tpmenu.currentSubmenu = null;\n\t\t}\n\t\tif(this.submenu && popupSubmenu)\n\t\t\tthis.selectSubmenu(node, menubarSubmenu);\n\t\telse\n\t\t\tnode.classList.add('active');\n\t\tthis.node.jsMenuNode.activeItemNode = this.node;\n\t}\n\n\tselectSubmenu(node, menubarSubmenu) {\n\t\tnode.jsMenuNode.currentSubmenu = this.submenu;\n\t\tif(this.submenu.node)\n\t\t\treturn;\n\n\t\tlet parentNode = node.parentNode;\n\t\tlet x, y;\n\t\tif (menubarSubmenu) {\n\t\t\tx = node.offsetLeft;\n\t\t\ty = node.clientHeight;\n\t\t} else {\n\t\t\tx = parentNode.offsetWidth + parentNode.offsetLeft - 2;\n\t\t\ty = parentNode.offsetTop + node.offsetTop - 4;\n\t\t}\n\t\tthis.popupSubmenu(x, y, menubarSubmenu);\n\t\tnode.classList.add('submenu-active');\n\t}\n\n\tbuildItem(menuNode, menuBarTopLevel = false) {\n\t\tlet node = document.createElement('li');\n\t\tnode.jsMenuNode = menuNode;\n\t\tnode.jsMenu = menuNode.jsMenu;\n\t\tnode.jsMenuItem = this;\n\t\tnode.classList.add('menu-item', this.type);\n\n\t\tmenuBarTopLevel = menuBarTopLevel || this.menuBarTopLevel || false;\n\t\tthis.menuBarTopLevel = menuBarTopLevel;\n\n\t\tif(menuBarTopLevel) {\n\t\t\tnode.addEventListener('mouseenter', this._mouseoverHandle_menubarTop.bind(this));\n\t\t}\n\n\t\tlet iconWrapNode = document.createElement('div');\n\t\ticonWrapNode.classList.add('icon-wrap');\n\n\t\tif(this.icon) {\n\t\t\tlet iconNode = new Image();\n\t\t\ticonNode.src = this.icon;\n\t\t\ticonNode.classList.add('icon');\n\t\t\ticonWrapNode.appendChild(iconNode);\n\t\t}\n\n\t\tlet labelNode = document.createElement('div');\n\t\tlabelNode.classList.add('label');\n\n\t\tlet modifierNode = document.createElement('div');\n\t\tmodifierNode.classList.add('modifiers');\n\n\t\tlet checkmarkNode = document.createElement('div');\n\t\tcheckmarkNode.classList.add('checkmark');\n\n\t\tif(this.checked && !menuBarTopLevel)\n\t\t\tnode.classList.add('checked');\n\n\t\tlet text = '';\n\n\t\tif(this.submenu && !menuBarTopLevel) {\n\t\t\ttext = '▶︎';\n\n\t\t\tnode.addEventListener('mouseleave', (e) => {\n\t\t\t\tif(node !== e.target) {\n\t\t\t\t\tif(!Menu.isDescendant(node, e.target))\n\t\t\t\t\t\tthis.submenu.popdown();\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\tif(this.modifiers && !menuBarTopLevel) {\n\t\t\tif (MenuItem.useModifierSymbols) {\n\t\t\t\tlet mods = this.modifiers.split('+');\n\n\t\t\t\t// Looping this way to keep order of symbols - required by macOS\n\t\t\t\tfor(let symbol in MenuItem.modifierSymbols) {\n\t\t\t\t\tif(mods.indexOf(symbol) > -1) {\n\t\t\t\t\t\ttext += MenuItem.modifierSymbols[symbol];\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else\n\t\t\t\ttext += this.modifiers + \"+\";\n\t\t}\n\n\t\tif(this.key && !menuBarTopLevel) {\n\t\t\ttext += this.key;\n\t\t}\n\t\tif (this.accelerator && !menuBarTopLevel) {\n\t\t\tlet acc = this.accelerator;\n                    let mac = false; // FIXME\n                    let cmd = mac ? \"Cmd\" : \"Ctrl\";\n                    acc = acc.replace(\"CommandOrControl\", cmd);\n                    acc = acc.replace(\"Mod+\", cmd+\"+\");\n\t\t\ttext += acc;\n\t\t}\n\n\t\tif(!this.enabled) {\n\t\t\tnode.classList.add('disabled');\n\t\t}\n\n\t\tif(!menuBarTopLevel && this.type != 'separator') {\n\t\t\tnode.addEventListener('mouseenter', () => {\n\t\t\t\tthis.select(node, true, true);\n\t\t\t});\n\t\t}\n\n\t\tif(this.icon) labelNode.appendChild(iconWrapNode);\n\n\t\tlet textLabelNode = document.createElement('span');\n\t\ttextLabelNode.textContent = this.label;\n\t\ttextLabelNode.classList.add('label-text');\n\n\t\tnode.appendChild(checkmarkNode);\n\n\t\tlabelNode.appendChild(textLabelNode);\n\t\tnode.appendChild(labelNode);\n\n\t\tmodifierNode.appendChild(document.createTextNode(text));\n\t\tnode.appendChild(modifierNode);\n\n\t\tnode.title = this.tooltip;\n\t\tthis.node = node;\n\t\tmenuNode.appendChild(node);\n\t}\n\n\tpopupSubmenu(x, y, menubarSubmenu = false) {\n\t\tthis.submenu.popup(x, y, this.node, menubarSubmenu);\n\t\tthis.submenu.node.menuItem = this.node;\n\t\tthis.node.jsMenuNode.currentSubmenu = this.submenu;\n\t}\n}\n\nMenuItem.modifierSymbols = {\n\tshift: '⇧',\n\tctrl: '⌃',\n\talt: '⌥',\n\tcmd: '⌘',\n\tsuper: '⌘',\n\tcommand: '⌘'\n};\n\nMenuItem.keySymbols = {\n\tup: '↑',\n\tesc: '⎋',\n\ttab: '⇥',\n\tleft: '←',\n\tdown: '↓',\n\tright: '→',\n\tpageUp: '⇞',\n\tescape: '⎋',\n\tpageDown: '⇟',\n\tbackspace: '⌫',\n\tspace: 'Space'\n};\nMenuItem.useModifierSymbols =\n\t(typeof navigator != \"undefined\" ? /Mac/.test(navigator.platform)\n         : typeof os != \"undefined\" ? os.platform() == \"darwin\" : false);\n\n// Local Variables:\n// js-indent-level: 8\n// indent-tabs-mode: t\n// End:\n\n\n//# sourceURL=webpack://skele2d/./jsMenus/jsMenus.js?");

/***/ }),

/***/ "./icons/brush.svg":
/*!*************************!*\
  !*** ./icons/brush.svg ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iYnJ1c2guc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoNzMyYTAxZGE2MywgMjAyMi0xMi0wOSwgY3VzdG9tKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzE4NyIKICAgICBwYWdlY29sb3I9IiM1MDUwNTAiCiAgICAgYm9yZGVyY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIxIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iIzUwNTA1MCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6em9vbT0iMjMuMjk3NDk2IgogICAgIGlua3NjYXBlOmN4PSI4LjA0ODA3NTIiCiAgICAgaW5rc2NhcGU6Y3k9IjExLjc4MjM4MiIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkMzEwIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxODIiIC8+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7ZGlzcGxheTpub25lO29wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7c3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxIgogICAgICAgZD0ibSA0LDkgYyAwLDUgNCw4IDgsMyA0LC01IDgsLTIgOCwzIgogICAgICAgaWQ9InBhdGgyODI1IgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc2MiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0icGF0aDI4MjUiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmU7c3Ryb2tlOiMwMDAwMDAiCiAgICAgICBkPSJNIDQsNi4yNSBBIDIuNzUsMi43NSAwIDAgMCAxLjI1LDkgYyAwLDMuMjMzMzMgMS4yMDc3MDc1LDYuMzAzMDczIDQuMDE5NTMxMiw3LjcwODk4NCAxLjQwNTkxMTksMC43MDI5NTYgMy4xODIzMzU4LDAuNzg4MDI3IDQuNzQwMjM0OCwwLjIxNjc5NyAxLjU1Nzg5OCwtMC41NzEyMjkgMi45MTMyNTEsLTEuNjc3Njk3IDQuMTM2NzE4LC0zLjIwNzAzMSAwLjc3NjUzMSwtMC45NzA2NjQgMS40MjExODIsLTEuMzY0MTk5IDEuNzM4MjgyLC0xLjQ4MDQ2OSAwLjMxNzA5OSwtMC4xMTYyNyAwLjI5MDY3OSwtMC4wNzYzNCAwLjM4NDc2NSwtMC4wMjkzIEMgMTYuNDU3NzA1LDEyLjMwMzA3MSAxNy4yNSwxMy4yMzMzMzUgMTcuMjUsMTUgQSAyLjc1LDIuNzUgMCAwIDAgMjAsMTcuNzUgMi43NSwyLjc1IDAgMCAwIDIyLjc1LDE1IEMgMjIuNzUsMTEuNzY2NjcgMjEuNTQyMjkyLDguNjk2OTI3NSAxOC43MzA0NjksNy4yOTEwMTU2IDE3LjMyNDU1Nyw2LjU4ODA1OTcgMTUuNTQ4MTMzLDYuNTAyOTg5MyAxMy45OTAyMzQsNy4wNzQyMTg3IDEyLjQzMjMzNiw3LjY0NTQ0ODIgMTEuMDc2OTgzLDguNzUxOTE2MyA5Ljg1MzUxNTYsMTAuMjgxMjUgYyAtMC43NzY1MzExLDAuOTcwNjY0IC0xLjQyMTE4MTcsMS4zNjQxOTkgLTEuNzM4MjgxMiwxLjQ4MDQ2OSAtMC4zMTcwOTk2LDAuMTE2MjcgLTAuMjkwNjc5LDAuMDc2MzQgLTAuMzg0NzY1NywwLjAyOTMgQyA3LjU0MjI5NTUsMTEuNjk2OTI5IDYuNzUsMTAuNzY2NjY1IDYuNzUsOSBBIDIuNzUsMi43NSAwIDAgMCA0LDYuMjUgWiIKICAgICAgIGlkPSJwYXRoMjgyNS0zIiAvPgogIDwvZz4KPC9zdmc+Cg==\";\n\n//# sourceURL=webpack://skele2d/./icons/brush.svg?");

/***/ }),

/***/ "./icons/delete.svg":
/*!**************************!*\
  !*** ./icons/delete.svg ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZGVsZXRlLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKDczMmEwMWRhNjMsIDIwMjItMTItMDksIGN1c3RvbSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxODciCiAgICAgcGFnZWNvbG9yPSIjNTA1MDUwIgogICAgIGJvcmRlcmNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMSIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiM1MDUwNTAiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOnpvb209IjE2LjM4NjUzMyIKICAgICBpbmtzY2FwZTpjeD0iMTIuMDUyNTgiCiAgICAgaW5rc2NhcGU6Y3k9IjMuNjMxMDMwNSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkMzEwIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxODIiIC8+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7b3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3N0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNCw2IEMgMiw2IDIsMyA0LDMgaCA2IGMgMCwwIDAsLTIgMiwtMiAyLDAgMiwyIDIsMiBoIDYgYyAyLDAgMiwzIDAsMyB6IE0gMjAsNiAxOCwyMSBIIDYgTCA0LDYgWiIKICAgICAgIGlkPSJwYXRoNjIxIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2N6Y2NjY2NjY2NjIiAvPgogICAgPHBhdGgKICAgICAgIGlkPSJwYXRoNjI5IgogICAgICAgc3R5bGU9ImZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOm5vcm1hbDtvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7c3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxIgogICAgICAgZD0iTSAxMiw4IFYgMTkgTSAxNiw4IDE1LDE5IE0gOCw4IDksMTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjYyIgLz4KICA8L2c+Cjwvc3ZnPgo=\";\n\n//# sourceURL=webpack://skele2d/./icons/delete.svg?");

/***/ }),

/***/ "./icons/plus.svg":
/*!************************!*\
  !*** ./icons/plus.svg ***!
  \************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0icGx1cy5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMi4yICg3MzJhMDFkYTYzLCAyMDIyLTEyLTA5LCBjdXN0b20pIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTg3IgogICAgIHBhZ2Vjb2xvcj0iIzUwNTA1MCIKICAgICBib3JkZXJjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjEiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjNTA1MDUwIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBzaG93Z3JpZD0idHJ1ZSIKICAgICBpbmtzY2FwZTp6b29tPSIyMy4yOTc0OTYiCiAgICAgaW5rc2NhcGU6Y3g9IjguMTMzOTIxMyIKICAgICBpbmtzY2FwZTpjeT0iMTMuMTk4ODQzIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgaWQ9ImdyaWQzMTAiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPGRlZnMKICAgICBpZD0iZGVmczE4MiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSI+CiAgICA8cGF0aAogICAgICAgaWQ9InBhdGgyNjgxNS0zIgogICAgICAgc3R5bGU9ImZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOm5vcm1hbDt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtzdG9wLWNvbG9yOiMwMDAwMDAiCiAgICAgICBkPSJNIDEyLDQgViAyMCBNIDQsMTIgaCAxNiIgLz4KICA8L2c+Cjwvc3ZnPgo=\";\n\n//# sourceURL=webpack://skele2d/./icons/plus.svg?");

/***/ }),

/***/ "./icons/push-arrows-in-circle.svg":
/*!*****************************************!*\
  !*** ./icons/push-arrows-in-circle.svg ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0icHVzaC1hcnJvd3MtaW4tY2lyY2xlLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKDczMmEwMWRhNjMsIDIwMjItMTItMDksIGN1c3RvbSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTg3IgogICAgIHBhZ2Vjb2xvcj0iIzUwNTA1MCIKICAgICBib3JkZXJjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjEiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjNTA1MDUwIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBzaG93Z3JpZD0idHJ1ZSIKICAgICBpbmtzY2FwZTp6b29tPSI0Ni4zMTc3NTIiCiAgICAgaW5rc2NhcGU6Y3g9IjEzLjU0NzcyMSIKICAgICBpbmtzY2FwZTpjeT0iMTAuODkyMTUyIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgaWQ9ImdyaWQzMTAiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPGRlZnMKICAgICBpZD0iZGVmczE4MiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSI+CiAgICA8Y2lyY2xlCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdG9wLWNvbG9yOiMwMDAwMDAiCiAgICAgICBpZD0icGF0aDI2ODExIgogICAgICAgY3g9IjEyIgogICAgICAgY3k9IjEyIgogICAgICAgcj0iMTAiIC8+CiAgICA8cGF0aAogICAgICAgaWQ9InBhdGgyNjgxNSIKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7b3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3N0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gNyw5IC0zLDMgMywzIG0gMTAsMCAzLC0zIC0zLC0zIE0gNCwxMiBoIDE2IgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjYyIgLz4KICAgIDx1c2UKICAgICAgIHg9IjAiCiAgICAgICB5PSIwIgogICAgICAgeGxpbms6aHJlZj0iI3BhdGgyNjgxNSIKICAgICAgIGlkPSJ1c2UyNjg3NSIKICAgICAgIHRyYW5zZm9ybT0icm90YXRlKC05MCwxMiwxMikiIC8+CiAgPC9nPgo8L3N2Zz4K\";\n\n//# sourceURL=webpack://skele2d/./icons/push-arrows-in-circle.svg?");

/***/ }),

/***/ "./icons/roughen.svg":
/*!***************************!*\
  !*** ./icons/roughen.svg ***!
  \***************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0icm91Z2hlbi5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMi4yICg3MzJhMDFkYTYzLCAyMDIyLTEyLTA5LCBjdXN0b20pIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTg3IgogICAgIHBhZ2Vjb2xvcj0iIzUwNTA1MCIKICAgICBib3JkZXJjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjEiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjNTA1MDUwIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBzaG93Z3JpZD0idHJ1ZSIKICAgICBpbmtzY2FwZTp6b29tPSIzMi44NDk0NyIKICAgICBpbmtzY2FwZTpjeD0iNy44NjkyMjkiCiAgICAgaW5rc2NhcGU6Y3k9IjExLjkxODAwMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkMzEwIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxODIiIC8+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7b3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDEsMTYgMywxNCBIIDYgTCA4LDEyIDcsNyAxMSw5IDE0LDcgaCAzIGwgMSw0IDMsMSAyLDQiCiAgICAgICBpZD0icGF0aDI4MjUiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjIiAvPgogIDwvZz4KPC9zdmc+Cg==\";\n\n//# sourceURL=webpack://skele2d/./icons/roughen.svg?");

/***/ }),

/***/ "./icons/select.svg":
/*!**************************!*\
  !*** ./icons/select.svg ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0ic2VsZWN0LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKDczMmEwMWRhNjMsIDIwMjItMTItMDksIGN1c3RvbSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxODciCiAgICAgcGFnZWNvbG9yPSIjNTA1MDUwIgogICAgIGJvcmRlcmNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMSIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiM1MDUwNTAiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOnpvb209IjIzLjI5NzQ5NiIKICAgICBpbmtzY2FwZTpjeD0iOC42NDg5OTgyIgogICAgIGlua3NjYXBlOmN5PSIxNC4xODYwNzQiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIj4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBpZD0iZ3JpZDMxMCIgLz4KICA8L3NvZGlwb2RpOm5hbWVkdmlldz4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTgyIiAvPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZm9udC12YXJpYXRpb24tc2V0dGluZ3M6bm9ybWFsO29wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDcuNSwzLjUgdiAxNiBsIDQsLTQgMiw1IGggNCBsIC0zLC02IGggNSB6IgogICAgICAgaWQ9InBhdGgyNzAyOCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2MiIC8+CiAgPC9nPgo8L3N2Zz4K\";\n\n//# sourceURL=webpack://skele2d/./icons/select.svg?");

/***/ }),

/***/ "./icons/smooth.svg":
/*!**************************!*\
  !*** ./icons/smooth.svg ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQuMHB4IgogICBoZWlnaHQ9IjI0LjBweCIKICAgdmlld0JveD0iMCAwIDI0LjAgMjQuMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0ic21vb3RoLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKDczMmEwMWRhNjMsIDIwMjItMTItMDksIGN1c3RvbSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxODciCiAgICAgcGFnZWNvbG9yPSIjNTA1MDUwIgogICAgIGJvcmRlcmNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMSIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiM1MDUwNTAiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOnpvb209IjIzLjI5NzQ5NiIKICAgICBpbmtzY2FwZTpjeD0iMTMuMTU1OTIiCiAgICAgaW5rc2NhcGU6Y3k9IjExLjc4MjM4MiIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkMzEwIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxODIiIC8+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7b3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDEsMTYgYyA2LDAgNSwtOSAxMSwtOSA2LDAgNSw5IDExLDkiCiAgICAgICBpZD0icGF0aDI4MjUiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNzYyIgLz4KICA8L2c+Cjwvc3ZnPgo=\";\n\n//# sourceURL=webpack://skele2d/./icons/smooth.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_1283971__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_1283971__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_1283971__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_1283971__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_1283971__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_1283971__.o(definition, key) && !__nested_webpack_require_1283971__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_1283971__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_1283971__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__nested_webpack_require_1283971__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__nested_webpack_require_1283971__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __nested_webpack_require_1283971__("./index.coffee");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 443:
/***/ (function(module) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ }),

/***/ 10:
/***/ ((module) => {

module.exports = function hsl_to_rgb_hex (hsl) {
	if (typeof hsl === 'string') {
		hsl = hsl.match(/(\d+(\.\d+)?)/g).map(function (a) {
			return +a;
		});
	}
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	// to hex
	return `#${rgb.map(function (a) {
		return ('0' + Math.round(a).toString(16)).slice(-2);
	}).join('')}`;
};


/***/ }),

/***/ 193:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "createStore": () => (/* binding */ createStore),
/* harmony export */   "del": () => (/* binding */ del),
/* harmony export */   "delMany": () => (/* binding */ delMany),
/* harmony export */   "entries": () => (/* binding */ entries),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getMany": () => (/* binding */ getMany),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "promisifyRequest": () => (/* binding */ promisifyRequest),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "setMany": () => (/* binding */ setMany),
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "values": () => (/* binding */ values)
/* harmony export */ });
function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function setMany(entries, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        entries.forEach((entry) => store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function getMany(keys, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function update(key, updater, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => 
    // Need to create the promise manually.
    // If I try to chain promises, the transaction closes in browsers
    // that use a promise polyfill (IE10/11).
    new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
            try {
                store.put(updater(this.result), key);
                resolve(promisifyRequest(store.transaction));
            }
            catch (err) {
                reject(err);
            }
        };
    }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function delMany(keys, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        keys.forEach((key) => store.delete(key));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(store, callback) {
    store.openCursor().onsuccess = function () {
        if (!this.result)
            return;
        callback(this.result);
        this.result.continue();
    };
    return promisifyRequest(store.transaction);
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
    });
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function values(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAll) {
            return promisifyRequest(store.getAll());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.value)).then(() => items);
    });
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function entries(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        // (although, hopefully we'll get a simpler path some day)
        if (store.getAll && store.getAllKeys) {
            return Promise.all([
                promisifyRequest(store.getAllKeys()),
                promisifyRequest(store.getAll()),
            ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
        }
        const items = [];
        return customStore('readonly', (store) => eachCursor(store, (cursor) => items.push([cursor.key, cursor.value])).then(() => items));
    });
}




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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var Editor, Entity, Mouse, Player, SavannaGrass, Stats, TAU, Terrain, View, World, _fromJSON, animate, bottom_of_world, canvas, configure_property_inspector, ctx, disable_welcome_message, e, editor, gamepad_start_prev, gui, keyboard, mouse, old_terrain_toJSON, randomize_entities, redraw, sort_entities, stats, terrain, terrain_optimized, update_property_inspector, view, view_smoothness, view_to, welcome, world, world_loaded,
  indexOf = [].indexOf;

Math.seedrandom("A world");

({View, Mouse, Editor, Entity, Terrain} = __webpack_require__(505));

Stats = __webpack_require__(443);

({gui, update_property_inspector, configure_property_inspector} = __webpack_require__(100));

World = __webpack_require__(378);

keyboard = __webpack_require__(866);

sort_entities = __webpack_require__(351);

randomize_entities = __webpack_require__(880);

__webpack_require__(372);

// require each entity to add it to the entity registry
__webpack_require__(224);

__webpack_require__(678);

__webpack_require__(847);

SavannaGrass = __webpack_require__(475);

__webpack_require__(50);

__webpack_require__(91);

__webpack_require__(469);

__webpack_require__(113);

__webpack_require__(521);

__webpack_require__(332);

__webpack_require__(739);

__webpack_require__(653);

__webpack_require__(162);

__webpack_require__(101);

__webpack_require__(857);

__webpack_require__(668);

Player = __webpack_require__(795);

__webpack_require__(914);

__webpack_require__(943);

__webpack_require__(233);

TAU = Math.PI * 2;

// Hack Terrain serialization to skip intangibility from terrain optimization
// TODO: Skele2D shouldn't own Terrain class
old_terrain_toJSON = Terrain.prototype.toJSON;

Terrain.prototype.toJSON = function() {
  var def;
  def = old_terrain_toJSON.call(this);
  if (def.intangible_because_optimized) {
    delete def.intangible_because_optimized;
    delete def.intangible;
  }
  return def;
};

world = new World();

terrain = new SavannaGrass();

world.entities.push(terrain);

terrain.x = 0;

terrain.y = 0;

terrain.generate();

bottom_of_world = terrain.toWorld(terrain.structure.bbox_max).y;

canvas = document.createElement("canvas");

document.body.appendChild(canvas);

ctx = canvas.getContext("2d");

view = new View();

view_to = new View();

view_smoothness = 7;

mouse = new Mouse(canvas);

editor = new Editor(world, view, view_to, canvas, mouse);

configure_property_inspector({editor, world});

welcome = document.getElementById("welcome");

disable_welcome_message = ((function() {
  try {
    return localStorage["tiamblia.disable_welcome_message"];
  } catch (error1) {}
})()) === "true";

if (disable_welcome_message) {
  welcome.remove();
} else {
  // hacky way to make it play by default instead of edit
  // but not mess up the editor's undo state that it creates when you start playing
  world_loaded = false;
  _fromJSON = world.fromJSON;
  world.fromJSON = function(json) {
    _fromJSON.call(world, json);
    if (editor.editing) {
      editor.toggleEditing();
    }
    world.fromJSON = _fromJSON;
    world_loaded = true;
  };
}

try {
  editor.load();
} catch (error1) {
  e = error1;
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
} catch (error1) {}

setInterval(function() {
  if (editor.editing) {
    // TODO: should probably only save if you pan/zoom
    localStorage.view_center_x = view.center_x;
    localStorage.view_center_y = view.center_y;
    localStorage.view_scale = view_to.scale;
  }
}, 200);

redraw = function() {
  var count_hit_tests, debug_project_point_outside, entity, j, k, l, len, len1, len2, len3, m, mouse_world, point, points, projected, projected_point, ref, ref1, ref2, show_collision_buckets, show_terrain_polygons;
  world.drawBackground(ctx, view);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(view.scale, view.scale);
  ctx.translate(-view.center_x, -view.center_y);
  world.draw(ctx, view);
  if (editor.editing) {
    editor.draw(ctx, view);
  }
  show_terrain_polygons = ((function() {
    try {
      return localStorage["tiamblia.debug_terrain"];
    } catch (error1) {}
  })()) === "true";
  if (show_terrain_polygons) {
    ref = world.entities;
    for (j = 0, len = ref.length; j < len; j++) {
      entity = ref[j];
      if (entity instanceof Terrain) {
        ctx.translate(entity.x, entity.y);
        ctx.strokeStyle = entity.solid === false ? "blue" : "red";
        ctx.fillStyle = entity.solid === false ? "rgba(0, 0, 255, 0.2)" : "rgba(255, 0, 0, 0.2)";
        if (entity.intangible) {
          ctx.setLineDash([5, 5]);
          ctx.fillStyle = "transparent";
          ctx.lineWidth = 4 / view.scale;
        } else {
          ctx.lineWidth = 1 / view.scale;
        }
        ctx.beginPath();
        points = Object.values(entity.structure.points);
        ctx.moveTo(points[0].x, points[0].y);
        for (k = 0, len1 = points.length; k < len1; k++) {
          point = points[k];
          ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.translate(-entity.x, -entity.y);
        ctx.setLineDash([]);
      }
    }
    ref1 = world.derived_colliders;
    for (l = 0, len2 = ref1.length; l < len2; l++) {
      entity = ref1[l];
      ctx.translate(entity.x, entity.y);
      ctx.strokeStyle = entity.solid === false ? "aqua" : "fuchsia";
      ctx.fillStyle = entity.solid === false ? "rgba(0, 255, 255, 0.2)" : "rgba(255, 0, 255, 0.2)";
      ctx.lineWidth = 1 / view.scale;
      ctx.beginPath();
      points = Object.values(entity.structure.points);
      ctx.moveTo(points[0].x, points[0].y);
      for (m = 0, len3 = points.length; m < len3; m++) {
        point = points[m];
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.translate(-entity.x, -entity.y);
    }
  }
  show_collision_buckets = ((function() {
    try {
      return localStorage["tiamblia.show_collision_buckets"];
    } catch (error1) {}
  })()) === "true";
  if (show_collision_buckets) {
    if (editor.editing) { // normally happens while simulating
      world.updateCollisionBuckets();
    }
    world.drawCollisionBuckets(ctx, view);
  }
  count_hit_tests = ((function() {
    try {
      return localStorage["tiamblia.count_hit_tests"];
    } catch (error1) {}
  })()) === "true";
  if (count_hit_tests) {
    world.drawCollisionHeatMap(ctx, view);
    world.resetCollisionHeatMap();
  }
  debug_project_point_outside = ((function() {
    try {
      return localStorage["tiamblia.debug_project_point_outside"];
    } catch (error1) {}
  })()) === "true";
  if (debug_project_point_outside) {
    if (editor.editing) { // normally happens while simulating
      world.updateCollisionBuckets();
    }
    mouse_world = view.toWorld(mouse);
    projected = world.projectPointOutside(mouse_world);
    projected_point = (ref2 = projected != null ? projected.closest_point_in_world : void 0) != null ? ref2 : mouse_world;
    ctx.beginPath();
    ctx.arc(projected_point.x, projected_point.y, 5 / view.scale, 0, TAU);
    ctx.fillStyle = "red";
    ctx.fill();
    if (projected) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1 / view.scale;
      ctx.beginPath();
      ctx.arc(mouse_world.x, mouse_world.y, Math.hypot(projected_point.x - mouse_world.x, projected_point.y - mouse_world.y), 0, TAU);
      ctx.moveTo(mouse_world.x, mouse_world.y);
      ctx.lineTo(projected_point.x, projected_point.y);
      ctx.stroke();
    }
  }
  ctx.restore();
};

// For console access and quick hacks, some useful globals,
// named to avoid accidental use in game code.
// the_editor.selected_entities is often useful
window.the_world = world;

window.the_entity_classes = (__webpack_require__(505).entityClasses);

window.the_editor = editor;

Object.defineProperty(window, "the_player", {
  get: () => {
    var players;
    players = world.entities.filter((e) => {
      return e instanceof Player;
    });
    if (players.length > 1) {
      console.warn("There's more than one player in the world!");
    }
    return players[0];
  }
});

// You can set a "watch" in the Firefox debugger to `window.do_a_redraw()`
// and then see how entities are changed while stepping through simulation code.
// (This trick doesn't work in Chrome, as of 2023. The canvas doesn't update.)
window.do_a_redraw = redraw;

gamepad_start_prev = false;

stats = new Stats();

stats.showPanel(0);

terrain_optimized = false;

(animate = function() {
  var class_name, class_names, clone, ent, entity, error, existing_instances, gamepad, i, j, k, l, len, len1, len2, len3, m, min_instances, n, new_entities, player, ref, ref1, ref2, ref3, ref4, show_stats;
  if (window.CRASHED) {
    return;
  }
  show_stats = ((function() {
    try {
      return localStorage["tiamblia.show_stats"];
    } catch (error1) {}
  })()) === "true";
  if (show_stats) {
    if (!stats.dom.parentNode) {
      document.body.appendChild(stats.dom);
    }
  } else {
    stats.dom.remove();
  }
  stats.begin();
  requestAnimationFrame(animate);
  Math.seedrandom(performance.now());
  if (!gui._hidden) {
    update_property_inspector();
  }
  // Spawn entities for dev purposes, especially for flora.
  // This helps to see the space of randomization.
  class_names = (ref = ((function() {
    try {
      return localStorage["tiamblia.auto_spawn"];
    } catch (error1) {}
  })())) != null ? ref : "";
  class_names = class_names.length > 0 ? class_names.split(",") : [];
  try {
    for (j = 0, len = class_names.length; j < len; j++) {
      class_name = class_names[j];
      min_instances = 10;
      existing_instances = world.entities.filter(function(entity) {
        return entity.constructor.name === class_name;
      }).length;
      if (existing_instances < min_instances) {
        ent = Entity.fromJSON({
          _class_: class_name
        });
        ent.x = Math.random() * 1000;
        ent.y = bottom_of_world - 1;
        // Fix auto-spawn sometimes leaving entities at the bottom of the world
        world.updateCollisionBuckets();
        while (world.collision(ent)) {
          ent.y -= 3;
        }
        world.entities.push(ent);
        if (ent.dna) {
// show examples of the same species beside it
          for (i = k = 0; k < 3; i = ++k) {
            clone = Entity.fromJSON({
              _class_: class_name,
              dna: JSON.parse(JSON.stringify(ent.dna))
            });
            clone.x = ent.x + 100 * (i + 1);
            clone.y = bottom_of_world - 1;
            while (world.collision(clone)) {
              clone.y -= 3;
            }
            world.entities.push(clone);
          }
        }
      }
    }
  } catch (error1) {
    error = error1;
    if (typeof console !== "undefined" && console !== null) {
      if (typeof console.error === "function") {
        console.error("Failed to auto-spawn entities:", error);
      }
    }
  }
  // Hide welcome message after you start playing or toggle editing.
  if (!disable_welcome_message) {
    if (the_world.entities.some(function(entity) {
      return entity instanceof Player && entity.jump;
    }) || (editor.editing && world_loaded)) {
      if (welcome && welcome.style.opacity !== "0") {
        welcome.style.opacity = 0;
        welcome.style.pointerEvents = "none";
        welcome.addEventListener("transitionend", function() {
          welcome.remove();
        });
      }
    }
  }
  if (canvas.width !== innerWidth) {
    canvas.width = innerWidth;
  }
  if (canvas.height !== innerHeight) {
    canvas.height = innerHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ref2 = (ref1 = ((function() {
    try {
      return navigator.getGamepads();
    } catch (error1) {}
  })())) != null ? ref1 : [];
  for (l = 0, len1 = ref2.length; l < len1; l++) {
    gamepad = ref2[l];
    if (!(gamepad)) {
      continue;
    }
    if (gamepad.buttons[9].pressed && !gamepad_start_prev) {
      editor.toggleEditing();
    }
    gamepad_start_prev = gamepad.buttons[9].pressed;
  }
  if (editor.editing && (editor.entities_bar.hovered_cell || ((editor.hovered_points.length || editor.hovered_entities.length) && !editor.selection_box))) {
    canvas.classList.add("grabbable");
  } else {
    canvas.classList.remove("grabbable");
  }
  if (editor.editing) {
    // Not sorting while game is running for performance reasons.
    // TODO: run only when an entity is added in the editor.
    // (I could also use the relative sorts list to sort only the added entity,
    // and this could be useful for gameplay code that might want to add entities.)
    sort_entities(world);
    ref3 = world.entities;
    // Fix hair attachment when dragging after simulating.
    // A better fix would be to have an event that fires while dragging
    // (or otherwise moving an entity, such as with the arrow keys, which isn't supported yet.)
    for (m = 0, len2 = ref3.length; m < len2; m++) {
      entity = ref3[m];
      if (entity instanceof Player) {
        entity.hair_initialized = false;
      }
    }
    terrain_optimized = false;
  }
  if (!editor.editing) {
    if (!terrain_optimized) {
      world.optimizeTerrain();
      terrain_optimized = true;
    }
    world.updateCollisionBuckets();
    ref4 = world.entities;
    // when entity isnt editor.editing_entity and entity not in editor.dragging_entities
    for (n = 0, len3 = ref4.length; n < len3; n++) {
      entity = ref4[n];
      entity.step(world, view, mouse);
    }
    
    // TODO: allow margin of offcenteredness
    player = world.getEntitiesOfType(Player)[0];
    if (player) {
      view_to.center_x = player.x;
      view_to.center_y = player.y;
    }
  }
  // clamp view so you can't see below the bottom of the world
  // view_to.center_y = Math.min(view_to.center_y, bottom_of_world - canvas.height / 2 / view.scale)
  view.width = canvas.width;
  view.height = canvas.height;
  view.easeTowards(view_to, view_smoothness);
  if (player && !editor.editing) {
    // clamp view so you can't see below the bottom of the world even while zooming out
    view.center_y = Math.min(view.center_y, bottom_of_world - canvas.height / 2 / view.scale);
  }
  if (editor.editing) {
    editor.step();
  }
  mouse.resetForNextStep();
  redraw();
  editor.updateGUI();
  
  // So that the editor will give new random entities each time you pull one into the world
  // (given that some entities use seedrandom, and fix the seed)
  // Also for the below entity randomizing feature.
  Math.seedrandom(performance.now());
  // A little tool to randomize entities by pressing 'R'
  if (editor.editing && keyboard.wasJustPressed("KeyR")) {
    if (editor.selected_entities.length) {
      editor.undoable(function() {
        randomize_entities(editor.selected_entities);
      });
    } else {
      class_names = (((function() {
        try {
          return localStorage["tiamblia.auto_spawn"];
        } catch (error1) {}
      })()) || "").split(",");
      new_entities = world.entities.filter(function(entity) {
        var ref5;
        return ref5 = entity.constructor.name, indexOf.call(class_names, ref5) < 0;
      });
      if (new_entities.length !== world.entities.length) {
        editor.undoable(function() {
          world.entities = new_entities;
        });
      }
    }
  }
  // Toggle development UI with backtick/tilde (`/~)
  if (keyboard.wasJustPressed("Backquote")) {
    gui.show(gui._hidden);
  }
  // End of frame. Nothing must use wasJustPressed after this.
  keyboard.resetForNextStep();
  stats.end();
})();

})();

/******/ })()
;