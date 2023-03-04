/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 432:
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 89:
/***/ ((module, __webpack_exports__, __nested_webpack_require_487__) => {

"use strict";
/* harmony export */ __nested_webpack_require_487__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_487__(933);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_487__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_487__(476);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_487__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Arimo:400,400i,700,700i);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html, body {\n\tmargin: 0;\n\theight: 100%;\n}\nbody { display: flex; flex-direction: column }\n.menubar { flex: 0 0 22px }\ndiv.below-menubar { flex: 1 1 0; min-height: 0;}\n\n.nwjs-menu {\n\tfont-family: 'Helvetica Neue', HelveticaNeue, 'TeX Gyre Heros', TeXGyreHeros, FreeSans, 'Nimbus Sans L', 'Liberation Sans', Arimo, Helvetica, Arial, sans-serif;\n\tfont-size: 14px;\n\tcolor: #2c2c2c;\n\t-webkit-user-select: none;\n\tuser-select: none;\n\t-webkit-font-smoothing: subpixel-antialiased;\n\tfont-weight: 400;\n}\n\n.contextmenu {\n\tmin-width: 100px;\n\tbackground-color: #fafafa;\n\tposition: fixed;\n\topacity: 0;\n\ttransition: opacity 250ms;\n\tmargin: 0;\n\tpadding: 0 0;\n\tlist-style: none;\n\tpointer-events: none;\n\tborder: 1px rgba(191, 191, 191, 0.8) solid;\n\tbox-shadow: rgba(43, 43, 43, 0.34) 1px 1px 11px 0px;\n\tz-index: 2147483647;\n}\n\n.contextmenu {\n\topacity: 1;\n\ttransition: opacity 30ms;\n\tpointer-events: all;\n}\n\n.contextmenu.submenu {\n    transition: opacity 250ms;\n}\n\n.contextmenu.submenu {\n\ttransition: opacity 150ms;\n\ttransition-timing-function: step-end;\n}\n\n.menu-item.normal,\n.menu-item.checkbox,\n.menu-item.radio {\n\tcursor: default;\n\tpadding: 2px 0;\n\tbox-sizing: border-box;\n\tposition: relative;\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: nowrap;\n\tjustify-content: flex-start;\n\talign-content: stretch;\n\talign-items: flex-start;\n\twidth: 100%;\n}\n\n.contextmenu .menu-item.active,\n.menu-item.normal.submenu-active {\n\tbackground-color: #499BFE;\n\tcolor: #fff;\n}\n\n.menu-item.normal > div,\n.menu-item.checkbox > div,\n.menu-item.radio > div {\n    align-self: center;\n    vertical-align: middle;\n    display: inline-flex;\n    justify-content: flex-start;\n    flex-shrink: 0;\n}\n\n.menu-item.normal .icon {\n    display: inline-flex;\n    vertical-align: middle;\n    max-width: 16px;\n    max-height: 16px;\n    align-self: center;\n}\n\nli.menu-item.separator {\n\theight: 2px;\n\tbackground-color: rgba(128, 128, 128, 0.2);\n\tmargin: 5px 0;\n}\n\n.menu-item .modifiers,\n.menu-item .icon-wrap,\n.menu-item .checkmark {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tvertical-align: middle;\n}\n\n.menu-item .checkmark {\n\twidth: 22px;\n}\n\n.menu-item .modifiers {\n\tbox-sizing: border-box;\n\tpadding: 0 6px;\n\ttext-align: right;\n\torder: 0;\n    flex: 0 0 auto;\n    align-self: center;\n}\n\n.menu-item .label {\n    padding: 0 22px 0 0;\n    order: 0;\n    flex: 1 0 auto;\n    align-self: center;\n}\n\n.menu-item.disabled,\n.menu-item.disabled:hover,\n.contextmenu .menu-item.disabled:hover {\n    color: #ababab;\n}\n\n.menu-item.disabled:hover,\n.contextmenu .menu-item.disabled:hover {\n    background-color: transparent;\n}\n\n.menu-item .icon-wrap {\n    padding: 0 6px 0 0;\n    display: inline-flex;\n    align-self: center;\n}\n\n.menu-item .label-text {\n    align-items: center;\n    vertical-align: middle;\n}\n\n.menu-item.checkbox.checked .checkmark::before {\n\tcontent: '✔';\n\ttext-align: center;\n\twidth: 100%;\n}\n\n.menu-item.radio.checked .checkmark::before {\n\tcontent: '⊚';\n\ttext-align: center;\n\twidth: 100%;\n}\n\n.menubar {\n\theight: 22px;\n\tmargin: 0;\n\tpadding: 0;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground-color: #eee;\n\tz-index: 2147483647;\n}\n\n.menubar .menu-item.normal {\n    display: inline-block;\n    width: auto;\n    height: 100%;\n}\n\n.menubar .menu-item.normal > div {\n    vertical-align: top;\n}\n\n.menubar .menu-item.normal .checkmark,\n.menubar .menu-item.normal .modifiers {\n    display: none;\n}\n\n.menubar .menu-item.normal .label {\n    padding: 0 9px;\n}\n\n.contextmenu.menubar-submenu {\n    transition: opacity 0ms;\n}\n\n/* Mac only?\n.contextmenu {\n    border-radius: 7px;\n}\n.contextmenu.menubar-submenu {\n    border-radius: 0 0 7px 7px;\n}\n*/\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 389:
/***/ ((module, __webpack_exports__, __nested_webpack_require_5815__) => {

"use strict";
/* harmony export */ __nested_webpack_require_5815__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_5815__(933);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_5815__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_5815__(476);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_5815__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".editor {\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\tuser-select: none;\n}\n.grabbable {\n\tcursor: move; /* fallback if grab cursor is unsupported */\n\tcursor: grab;\n\tcursor: -moz-grab;\n\tcursor: -webkit-grab;\n}\n/* Apply a \"closed-hand\" cursor during drag operation. */\n.grabbable:active { \n\tcursor: grabbing;\n\tcursor: -moz-grabbing;\n\tcursor: -webkit-grabbing;\n}\n/* Sidebars */\n.bar {\n\tbackground: white;\n\ttransition: opacity 0.2s ease;\n\tdisplay: flex;\n\talign-items: stretch;\n\talign-content: flex-start;\n}\n.bar:not(.visible) {\n\topacity: 0;\n\tpointer-events: none;\n}\n.sidebar {\n\tposition: absolute;\n\tz-index: 1;\n\tleft: 0;\n\ttop: 0;\n\theight: 100%;\n\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\n\tflex-direction: column;\n}\n.bar article,\n.terrain-tools {\n\tpadding: 1rem;\n\tpadding-top: 0.5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n.terrain-tools label {\n\tmargin-bottom: 1em;\n}\n.bar article:hover {\n\tbackground: rgba(0, 0, 0, 0.08);\n}\n.bar article:active,\n.bar article.selected {\n\tbackground: rgba(0, 0, 0, 0.12);\n}\n.bar article canvas {\n\tbackground: rgba(50, 200, 255, 0.7);\n}\n.bar article:hover canvas,\n.bar article:active canvas,\n.bar article.selected canvas {\n\tbackground: rgba(50, 200, 255, 1);\n}\n.bar h1 {\n\ttext-align: center;\n\tfont-size: 2em;\n\tfont-weight: normal;\n\tmargin: 0.1em 0;\n}\n.bar article > h1 {\n\tpointer-events: none;\n}\n.bar article .title-bar {\n\tdisplay: flex;\n\tflex-direction: row;\n}\n.bar .name {\n\tfont-size: 1.2em;\n\tfont-weight: normal;\n\tfont-family: sans-serif;\n\tmargin: 0;\n\tmargin-bottom: 0.1em;\n}\n.entities-bar .name {\n\ttext-align: center;\n}\n.bar article .mdl-textfield {\n\twidth: auto;\n\tpadding: 0;\n\tpadding-bottom: 0.3rem;\n}\nbutton,\ncanvas,\nimg,\narticle, /* representing entities, poses, animations, animation frames - things with EntityPreviews in them */\n.anims > * { /* includes headings and .anim-groups */\n\tflex: 0 0 auto;\n}\n.anim-bar {\n\tflex-direction: row;\n\talign-items: flex-start;\n}\n.anim-bar > * {\n\theight: 100%;\n}\n/* TODO: refactor bars and subbars */\n.anim-bar > *:not(:first-child) {\n\tborder-left: 1px solid rgba(0, 0, 0, 0.12);\n}\n.anims,\n.anim-group {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n}\n.anims,\n.animation-frames,\n.entities-bar {\n\toverflow-y: auto;\n\toverflow-x: hidden;\n}\n/* TODO: refactor bars and subbars */\n.animation-frames {\n\t/*transition: 0.1s ease;*/\n}\n.animation-frames:not(.visible) {\n\topacity: 0;\n\tpointer-events: none;\n\twidth: 0;\n\t/*transform: translate(-100%, 0);*/\n}\n.add-anim-fab {\n\tmargin: 0.5rem 0 !important;\n\talign-self: center;\n}\n.poses,\n.animations {\n\twidth: 100%;\n}\narticle.placeholder {\n\tpadding: 2rem;\n\ttext-align: center;\n\tbackground: rgba(128, 59, 110, 0.16);\n\tcolor: rgba(0, 0, 0, 0.5);\n\tfont-size: 1.4em;\n\tpointer-events: none;\n}\n\n.warning {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tz-index: 50;\n\tmargin: 15px;\n\tpadding: 15px;\n\tbackground: #FFF9C4;\n\tcolor: #BF360C;\n\tborder-radius: 2px;\n\ttransition: opacity 0.2s ease;\n}\n.warning:not(.show) {\n\tpointer-events: none;\n\topacity: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 476:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 933:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 525:
/***/ ((module) => {

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

/***/ 577:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_15059__) => {

"use strict";
/** @license React v17.0.2
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
var aa=__nested_webpack_require_15059__(378),m=__nested_webpack_require_15059__(525),r=__nested_webpack_require_15059__(102);function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b)}
function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a])}
var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
ja={},ka={};function la(a){if(ia.call(ka,a))return!0;if(ia.call(ja,a))return!1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return!1}function ma(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
pa);D[b]=new B(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0)});
function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden")}
var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return"function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||""}return"\n"+Ma+a}var Oa=!1;
function Pa(a,b){if(!a||Oa)return"";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(k){var d=k}Reflect.construct(a,[],b)}else{try{b.call()}catch(k){d=k}a.call(b.prototype)}else{try{throw Error();}catch(k){d=k}a()}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return"\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Na(a):""}
function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return""}}
function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return"Fragment";case ta:return"Portal";case xa:return"Profiler";case wa:return"StrictMode";case Ba:return"Suspense";case Ca:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return(a.displayName||"Context")+".Consumer";case ya:return(a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1)}
function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function lb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var nb,ob=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else{nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a]})});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
function wb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb()}
function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb()}}
function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb)}catch(a){Pb=!1}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(n){this.onError(n)}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments)}
function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null}else throw Error(y(198));Ub||(Ub=!0,Vb=l)}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return!0;b=b.return}return!1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a,b,c,d,e){return{blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId)}}
function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return!1}
function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c)})});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift()}return!0}function zc(a,b,c){xc(a)&&c.delete(b)}
function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift()}null===a.blockedOn&&jc.shift()}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc)}
function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)))}
function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift()}
function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d])}}var Qc=r.unstable_now;Qc();var F=8;
function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F))}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d)}finally{(Kb=f)||Mb()}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d))}
function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else{var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else{if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d)}jd(a,b,d,null,c)}}}}
function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else{var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null}else f!==e&&(e=null)}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else{Kb=!0;try{Gb(a,b)}finally{Kb=!1,Mb()}}}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
function Je(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return!1;return!0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Ke(c)}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d))}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null)}))}
function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h))}
function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Nb(function(){var d=f,e=xb(c),g=[];
a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u)}w=null}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else{J=De;var K=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
K.controlled&&"number"===h.type&&bb(h,"number",h.value)}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
case "compositionupdate":L="onCompositionUpdate";break b}L=void 0}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q)}se(g,b)})}function ef(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function nf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""))}
function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var tf=0;function uf(a){return{$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[wf]||a[ff];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return{current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--)}function I(a,b){Af++;zf[Af]=a.current;a.current=b}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M)}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c)}
function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return!0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c)}
var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a)}jg()}
function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null}
function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null)}
function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null}}else og=og.next=b}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}
function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function zg(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k)}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f))}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d)}}}var Fg=(new aa.Component).refs;
function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Kg={isMounted:function(a){return(a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
b);Ag(a,e);Jg(a,d,c)}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null)}
function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4)}var Pg=Array.isArray;
function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
a.mode,c,null),b.return=a,b;Rg(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d)}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h)}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=
Wg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a)}H(ah);I(ah,b)}function fh(){H(ah);H(bh);H(ch)}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c))}function hh(a){bh.current===a&&(H(ah),H(bh))}var P=Bf(0);
function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var jh=null,kh=null,lh=!1;
function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c)}jh=a;kh=rf(b.firstChild)}else a.flags=a.flags&-1025|2,lh=!1,jh=a}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a}
function rh(a){if(a!==jh)return!1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}kh=null}}else kh=jh?rf(a.stateNode.nextSibling):null;return!0}
function sh(){kh=jh=null;lh=!1}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e)}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else{if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a}return T}function Jh(a,b){return"function"===typeof b?b(a):b}
function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else{var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l}k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes}catch(q){c(function(){throw q;})}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return[b.memoizedState,a]}
function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d)}
function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d)}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}
function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0)});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b()}finally{wh.transition=c}})}
function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else{if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d)}}
var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return[d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return[a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36))},
void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d)}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b)}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1)}else{g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1)}return qi(a,b,c,d,f,e)}
function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo)}
var si={dehydrated:null,retryLane:0};
function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b)}
function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f)}
function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else{if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(P,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}return null}var Bi,Ci,Di,Ei;
Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ci=function(){};
Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf)}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",
c);var l=f;if(b.updateQueue=l)b.flags|=4}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4)};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else{if(!d){if(null===
b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d)}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
jf)}d=a;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
gb(a,d);G("invalid",a);break;default:e=d}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g))}switch(c){case "input":Va(a);cb(a,d,!1);
break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf)}mf(c,d)&&(b.flags|=4)}null!==b.ref&&(b.flags|=128)}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d)}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else{if(0===V||3===V)V=
4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W)}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else{if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432)}else{if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g)}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b)};return c}
function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Wi(a,c)}else b.current=null}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d()}a=a.next}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Eg(c,b,a)}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e)}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return}c.sibling.return=c.return;c=c.sibling}}
function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b)}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else{d=b;try{e()}catch(f){Wi(d,f)}}c=c.next}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount()}catch(f){Wi(b,
f)}break;case 5:Vi(b);break;case 4:cj(a,b)}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b)}
function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling}
function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling}
function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return}d=!0}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else{if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return}k.sibling.return=k.return;k=k.sibling}f?(g=e,h=c.stateNode,
8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode)}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1)}c.sibling.return=c.return;c=c.sibling}}
function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b)}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1}}else l<=b&&(a.expiredLanes|=k);g&=~k}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else{if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c)}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c}}
function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h)}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d}}
function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b))}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O())})}ig()}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function ni(a,b){I(rj,qj);qj|=b;tj|=b}function Ki(){qj=rj.current;H(rj)}
function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki()}c=c.return}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0}
function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}yh=!1}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
(h.updateQueue=null,h.memoizedState=null)}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else{var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else{var t=zg(-1,1);t.tag=2;Ag(h,t)}h.lanes|=1;break a}k=
void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v)}p.flags|=4096;p.lanes=b;break a}p=p.return}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==V&&(V=2);k=Mi(k,h);p=
g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return}while(null!==p)}Zj(c)}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e)}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y)}function Rj(){for(;null!==Y&&!Qf();)bk(Y)}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null}
function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b))}else{c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048)}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===V&&(V=5)}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l}null!==
Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType}catch(va){h=null;
break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode}w=u}h=-1===A||-1===p?null:{start:A,end:p}}else h=null;h=h||{start:0,end:0}}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek()}catch(va){if(null===
Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
J&&dj(J)}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L}"function"===typeof Q?Q(q):Q.current=q}}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Z=null;$f();X=e}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64))}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return!1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}
function fk(){if(null===yj)return!1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
null,h.stateNode=null),h=a;X=b;ig();return!0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b))}
function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a)}catch(f){}break}}c=c.return}}
function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b)}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c))}var ck;
ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else{ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c)}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else{e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling}else fi(a,b,d,c),sh();b=b.child}return b;case 5:return gh(b),null===a&&
ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}fi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null}
function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b)}function pk(){return null}
function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e)}this._internalRoot=c}
qk.prototype.render=function(a){lk(a,this._internalRoot,null,null)};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null})};function rk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a)}}lk(b,g,a,e)}else{f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a)}}Xj(function(){lk(b,g,a,e)})}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4)}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864)}};
gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c)}};hc=function(a,b){return b()};
yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Wj;
Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig())}};Ib=function(){0===(X&49)&&(Vj(),Oj())};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"};
var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;exports.createPortal=uk;
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig()}};exports.hydrate=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
exports.render=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null})}),!0):!1};exports.unstable_batchedUpdates=Wj;exports.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};exports.version="17.0.2";


/***/ }),

/***/ 542:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_135853__) => {

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
  module.exports = __nested_webpack_require_135853__(577);
} else {}


/***/ }),

/***/ 908:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_136718__) {

/* module decorator */ module = __nested_webpack_require_136718__.nmd(module);
// Generated by CoffeeScript 1.9.1
(function() {
  var E, React, add, hyphenate, is_plainish_object, ref,
    slice = [].slice;

  React = (ref = this.React) != null ? ref : __nested_webpack_require_136718__(378);

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

  if ((  true && module !== null ? module.exports : void 0) != null) {
    module.exports = E;
  } else {
    this.ReactScript = E;
  }

}).call(this);


/***/ }),

/***/ 535:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_141516__) => {

"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=__nested_webpack_require_141516__(525),n=60103,p=60106;exports.Fragment=60107;exports.StrictMode=60108;exports.Profiler=60114;var q=60109,r=60110,t=60112;exports.Suspense=60113;var u=60115,v=60116;
if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");exports.Fragment=w("react.fragment");exports.StrictMode=w("react.strict_mode");exports.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");exports.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy")}var x="function"===typeof Symbol&&Symbol.iterator;
function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return"function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState")};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return{$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
function K(a,b){return{$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return"object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d)}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
exports.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;P(a,function(){b++});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};exports.Component=C;exports.PureComponent=E;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g}return{$$typeof:n,type:a.type,
key:d,ref:k,props:e,_owner:h}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};exports.createElement=J;exports.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:t,render:a}};exports.isValidElement=L;
exports.lazy=function(a){return{$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};exports.memo=function(a,b){return{$$typeof:u,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return S().useCallback(a,b)};exports.useContext=function(a,b){return S().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return S().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return S().useMemo(a,b)};exports.useReducer=function(a,b,c){return S().useReducer(a,b,c)};exports.useRef=function(a){return S().useRef(a)};exports.useState=function(a){return S().useState(a)};exports.version="17.0.2";


/***/ }),

/***/ 378:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_148060__) => {

"use strict";


if (true) {
  module.exports = __nested_webpack_require_148060__(535);
} else {}


/***/ }),

/***/ 323:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};


/***/ }),

/***/ 102:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_153139__) => {

"use strict";


if (true) {
  module.exports = __nested_webpack_require_153139__(323);
} else {}


/***/ }),

/***/ 892:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 311:
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
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
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 60:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 192:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_157246__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =   true ? __nested_webpack_require_157246__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 760:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 865:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_159660__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_159660__);
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
/******/ 		__nested_webpack_require_159660__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_159660__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_159660__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_159660__.o(definition, key) && !__nested_webpack_require_159660__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_159660__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_159660__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__nested_webpack_require_159660__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__nested_webpack_require_159660__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nested_webpack_require_159660__.r(__webpack_exports__);

// EXPORTS
__nested_webpack_require_159660__.d(__webpack_exports__, {
  "BoneStructure": () => (/* reexport */ BoneStructure_coffee),
  "Editor": () => (/* reexport */ Editor_coffee),
  "Entity": () => (/* reexport */ Entity_coffee),
  "Mouse": () => (/* reexport */ Mouse_coffee),
  "PolygonStructure": () => (/* reexport */ BoneStructure_coffee),
  "Pose": () => (/* reexport */ Pose_coffee),
  "Structure": () => (/* reexport */ Structure_coffee),
  "Terrain": () => (/* reexport */ Terrain_coffee),
  "View": () => (/* reexport */ View_coffee),
  "addEntityClass": () => (/* reexport */ addEntityClass),
  "entityClasses": () => (/* reexport */ entityClasses),
  "helpers": () => (/* reexport */ helpers_coffee_namespaceObject)
});

// NAMESPACE OBJECT: ./helpers.coffee
var helpers_coffee_namespaceObject = {};
__nested_webpack_require_159660__.r(helpers_coffee_namespaceObject);
__nested_webpack_require_159660__.d(helpers_coffee_namespaceObject, {
  "distance": () => (distance),
  "distanceToLineSegment": () => (distanceToLineSegment),
  "lerpPoints": () => (lerpPoints),
  "lineSegmentsIntersect": () => (lineSegmentsIntersect)
});

;// CONCATENATED MODULE: ./helpers.coffee
var distanceSquared, distanceToLineSegmentSquared;

distanceSquared = function(v, w) {
  return (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
};

var distance = function(v, w) {
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

var distanceToLineSegment = function(p, v, w) {
  return Math.sqrt(distanceToLineSegmentSquared(p, v, w));
};

var lineSegmentsIntersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a_dx, a_dy, b_dx, b_dy, s, t;
  a_dx = x2 - x1;
  a_dy = y2 - y1;
  b_dx = x4 - x3;
  b_dy = y4 - y3;
  s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  return (0 <= s && s <= 1) && (0 <= t && t <= 1);
};

var lerpPoints = function(a, b, b_ness) {
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

;// CONCATENATED MODULE: ./structure/Pose.coffee
var Pose,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };



/* harmony default export */ const Pose_coffee = (Pose = class Pose {
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

});

;// CONCATENATED MODULE: ./structure/Structure.coffee
var Structure;



/* harmony default export */ const Structure_coffee = (Structure = class Structure {
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
    return new Pose_coffee(this);
  }

});

;// CONCATENATED MODULE: ./structure/BoneStructure.coffee
var BoneStructure;



/* harmony default export */ const BoneStructure_coffee = (BoneStructure = class BoneStructure extends Structure_coffee {
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

});

;// CONCATENATED MODULE: ./entity-class-registry.coffee
// TODO: replace this with just passing a list of entities to the Editor (and stuff), probably
var entityClasses = {};

var addEntityClass = function(constructor) {
  return entityClasses[constructor.name] = constructor;
};

;// CONCATENATED MODULE: ./base-entities/Entity.coffee
var Entity, fs, path;

fs = typeof window.require === "function" ? window.require("fs") : void 0;

path = typeof window.require === "function" ? window.require("path") : void 0;







/* harmony default export */ const Entity_coffee = (Entity = class Entity {
  constructor() {
    this.structure = new BoneStructure_coffee();
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
        EntityClass.poses[pose_name] = new Pose_coffee(pose);
      }
      results = [];
      for (animation_name in animations) {
        animation = animations[animation_name];
        results.push(EntityClass.animations[animation_name] = (function() {
          var i, len, results1;
          results1 = [];
          for (i = 0, len = animation.length; i < len; i++) {
            pose = animation[i];
            results1.push(new Pose_coffee(pose));
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
    if (!entityClasses[def._class_]) {
      throw new Error(`Entity class '${def._class_}' does not exist`);
    }
    entity = new entityClasses[def._class_]();
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

});


// TODO: function to call into the depth system
// drawStructure: (drawing_functions)->
// 	for point_name, fn of drawing_functions.points
// 		fn(@structure.points[point_name])
// 	for segment_name, fn of drawing_functions.segments
// 		fn(@structure.segments[segment_name])

;// CONCATENATED MODULE: ./structure/PolygonStructure.coffee
var PolygonStructure;



/* harmony default export */ const PolygonStructure_coffee = (PolygonStructure = class PolygonStructure extends Structure_coffee {
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
    var i, len, ref, x, y;
    this.points = {};
    this.segments = {};
    this.id_counter = 0;
    this.first_point_name = null;
    this.last_point_name = null;
    ref = def.points;
    for (i = 0, len = ref.length; i < len; i++) {
      ({x, y} = ref[i]);
      this.addVertex(x, y, false);
    }
    return typeof this.onchange === "function" ? this.onchange() : void 0;
  }

  addVertex(x, y, changeEvent = true) {
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
    if (changeEvent) {
      return typeof this.onchange === "function" ? this.onchange() : void 0;
    }
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

});

;// CONCATENATED MODULE: ./base-entities/Terrain.coffee
var TAU, Terrain;





TAU = Math.PI * 2;

/* harmony default export */ const Terrain_coffee = (Terrain = class Terrain extends Entity_coffee {
  constructor() {
    super();
    this.structure = new PolygonStructure_coffee();
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

});

// EXTERNAL MODULE: ../node_modules/react-dom/index.js
var react_dom = __nested_webpack_require_159660__(542);
// EXTERNAL MODULE: ../node_modules/react-script/lib/react-script.js
var react_script = __nested_webpack_require_159660__(908);
var react_script_default = /*#__PURE__*/__nested_webpack_require_159660__.n(react_script);
// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __nested_webpack_require_159660__(378);
;// CONCATENATED MODULE: ./View.coffee
var View;

/* harmony default export */ const View_coffee = (View = class View {
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

});

;// CONCATENATED MODULE: ./components/EntityPreview.coffee
var EntityPreview;









/* harmony default export */ const EntityPreview_coffee = (EntityPreview = class EntityPreview extends react.Component {
  constructor(props) {
    var center_x, center_y, entity, entity_bbox, height, max_height, max_width, scale;
    super();
    ({entity, max_width, max_height} = props);
    this.entity = Entity_coffee.fromJSON(JSON.parse(JSON.stringify(entity)));
    this.entity.facing_x = 1;
    this.view = new View_coffee();
    entity_bbox = this.entity.bbox();
    center_x = entity_bbox.x + entity_bbox.width / 2 - this.entity.x;
    center_y = entity_bbox.y + entity_bbox.height / 2 - this.entity.y;
    height = Math.min(entity_bbox.height, max_height);
    scale = height / entity_bbox.height;
    this.view = new View_coffee();
    this.view.width = max_width;
    this.view.height = height;
    this.view.scale = scale;
    this.view.center_x = center_x;
    this.view.center_y = center_y;
    this.view.is_preview = true;
  }

  render() {
    return react_script_default()("canvas", {
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

});

;// CONCATENATED MODULE: ./components/EntitiesBar.coffee
var EntitiesBar,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };











/* harmony default export */ const EntitiesBar_coffee = (EntitiesBar = class EntitiesBar extends react.Component {
  constructor() {
    var EntityClass, cell, cell_name, entity_class_name, preview_entity;
    super();
    this.update = this.update.bind(this);
    this.state = {
      visible: false
    };
    this.cells = [];
    this.entity_previews = [];
    for (entity_class_name in entityClasses) {
      EntityClass = entityClasses[entity_class_name];
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
    return react_script_default()(".bar.sidebar.entities-bar", {
      class: {visible}
    }, (function() {
      var j, len, ref, results;
      ref = this.cells;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        cell = ref[i];
        results.push(react_script_default()("article.cell.grabbable", {
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
        }, react_script_default()("h1.name", cell.name), react_script_default()(EntityPreview_coffee, {
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

});

;// CONCATENATED MODULE: ./rename-object-key.coffee
/* harmony default export */ function rename_object_key_coffee(object, old_key, new_key) {
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

;// CONCATENATED MODULE: ./components/Anim.coffee
// awkward component Anim represents a pose OR an animation OR an animation frame (which is an unnamed pose)
var Anim;













/* harmony default export */ const Anim_coffee = (Anim = class Anim extends react.Component {
  constructor() {
    super();
  }

  render() {
    var EntityClass, delete_item, editor, entity, name, select, selected, type_of_anims, update;
    ({entity, EntityClass, name, type_of_anims, selected, select, delete_item, update, editor} = this.props);
    return react_script_default()("article", {
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
    }, name === "Current Pose" ? react_script_default()("h1.name", name) : react_script_default()(".title-bar", react_script_default()(".mdl-textfield.mdl-js-textfield.name", {
      ref: (mdl_textfield_el) => {
        this.mdl_textfield_el = mdl_textfield_el;
      }
    }, react_script_default()("input.mdl-textfield__input", {
      value: name,
      onChange: (e) => {
        var anims_object, new_name;
        new_name = e.target.value;
        // TODO: use error classes and messages instead of intrusive alerts
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
        rename_object_key_coffee(anims_object, name, new_name);
        editor.editing_entity_anim_name = new_name;
        Entity_coffee.saveAnimations(EntityClass);
        
        // cause rerender immediately so cursor doesn't get moved to the end of the field
        return update();
      }
    }), react_script_default()("label.mdl-textfield__label", "Name...")), react_script_default()("button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete", {
      onClick: (e) => {
        e.preventDefault();
        delete_item();
        return Entity_coffee.saveAnimations(EntityClass);
      }
    }, react_script_default()("i.material-icons", "delete"))), react_script_default()(EntityPreview_coffee, {
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
      return componentHandler.upgradeElement(react_dom.findDOMNode(this.mdl_textfield_el));
    }
  }

});

;// CONCATENATED MODULE: ./components/AnimGroup.coffee
var AnimGroup,
  AnimGroup_coffee_boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };













/* harmony default export */ const AnimGroup_coffee = (AnimGroup = class AnimGroup extends react.Component {
  constructor() {
    super(...arguments);
    this.componentDidMount = this.componentDidMount.bind(this);
    // XXX: have to upgrade when the bar becomes visible
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  render() {
    var EntityClass, animation, animation_name, array_to_push_anims_to, editor, entity, frame, frame_index, frames, i, pose, pose_name, type_of_anims, update;
    ({entity, EntityClass, array_to_push_anims_to, update, type_of_anims, editor} = this.props);
    return react_script_default()(".anim-group", (function() {
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
                  return react_script_default()(Anim_coffee, {
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
              return react_script_default()("article.placeholder", {
                key: "placeholder"
              }, "No poses");
            }
          } else {
            return react_script_default()("article.placeholder", {
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
                  return react_script_default()(Anim_coffee, {
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
                      return Pose_coffee.lerpAnimationLoop(animation, EntityClass.animations[animation_name].length * Date.now() / 1000 / 2);
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
              return react_script_default()("article.placeholder", {
                key: "placeholder"
              }, "No animations");
            }
          } else {
            return react_script_default()("article.placeholder", {
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
                  return react_script_default()(Anim_coffee, {
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
              return react_script_default()("article.placeholder", {
                key: "placeholder"
              }, "Error: Trying to display the frames of a non-existent animation");
            }
          } else {
            return react_script_default()("article.placeholder", {
              key: "placeholder"
            }, "Error: Entity class is not initialized for animation, trying to display the frames of an animation?");
          }
        } else {
          return react_script_default()("article.placeholder", {
            key: "placeholder"
          }, `Error: weird type_of_anims for AnimGroup ${type_of_anims}`);
        }
      }
    }).call(this), react_script_default()("button.add-anim-fab.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored", {
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
        Entity_coffee.saveAnimations(EntityClass);
        return update();
      }
    }, react_script_default()("i.material-icons", "add")));
  }

  componentDidMount() {
    AnimGroup_coffee_boundMethodCheck(this, AnimGroup);
    return componentHandler.upgradeElement(react_dom.findDOMNode(this.new_anim_button));
  }

  componentDidUpdate() {
    AnimGroup_coffee_boundMethodCheck(this, AnimGroup);
    return componentHandler.upgradeElement(react_dom.findDOMNode(this.new_anim_button));
  }

});

;// CONCATENATED MODULE: ./components/AnimBar.coffee
var AnimBar,
  AnimBar_coffee_boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };









/* harmony default export */ const AnimBar_coffee = (AnimBar = class AnimBar extends react.Component {
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
    return react_script_default()(".bar.sidebar.anim-bar", {
      class: {visible}
    }, react_script_default()(".anims", react_script_default()("h1", "Poses"), react_script_default()(AnimGroup_coffee, {
      entity,
      EntityClass,
      array_to_push_anims_to: this.anims,
      update: this.update,
      editor,
      type_of_anims: "poses"
    }), react_script_default()("h1", "Animations"), react_script_default()(AnimGroup_coffee, {
      entity,
      EntityClass,
      array_to_push_anims_to: this.anims,
      update: this.update,
      editor,
      type_of_anims: "animations"
    })), react_script_default()(".animation-frames", {
      class: {
        visible: visible && editing_an_animation
      }
    }, react_script_default()("h1", "Frames"), react_script_default()(AnimGroup_coffee, {
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
    AnimBar_coffee_boundMethodCheck(this, AnimBar);
    ({editor} = this.props);
    ({editing_entity_anim_name, editing_entity} = editor);
    EntityClass = editing_entity != null ? entityClasses[editing_entity._class_] : void 0;
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

});

;// CONCATENATED MODULE: ./components/TerrainBar.coffee
var TerrainBar,
  TerrainBar_coffee_boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };









/* harmony default export */ const TerrainBar_coffee = (TerrainBar = class TerrainBar extends react.Component {
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
    return react_script_default()(".bar.sidebar.terrain-bar", {
      class: {visible}
    }, react_script_default()("h1", "Terrain"), react_script_default()(".terrain-tools", react_script_default()("label.mdl-switch.mdl-js-switch.mdl-js-ripple-effect", {
      // for: "toggle-sculpt-mode", ref: (@sculpt_mode_switch)=>
      // E "input.mdl-switch__input#toggle-sculpt-mode",
      ref: (sculpt_mode_switch) => {
        this.sculpt_mode_switch = sculpt_mode_switch;
      }
    }, react_script_default()("input.mdl-switch__input", {
      type: "checkbox",
      checked: sculpt_mode,
      // FIXME: Warning: TerrainBar is changing a uncontrolled input of type checkbox to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.
      // checked: false is apparently interpreted by ReactScript as leaving off the checked attribute
      onChange: (e) => {
        editor.sculpt_mode = e.target.checked;
        return editor.renderDOM();
      }
    }), react_script_default()("span.mdl-switch__label", "Sculpt Mode")), react_script_default()("label", react_script_default()("span.mdl-checkbox__label.mdl-slider__label", "Brush Size"), react_script_default()("input.mdl-slider.mdl-js-slider", {
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
    componentHandler.upgradeElement(react_dom.findDOMNode(this.sculpt_mode_switch));
    return componentHandler.upgradeElement(react_dom.findDOMNode(this.brush_size_slider));
  }

  update(show) {
    var editing_entity, editor;
    TerrainBar_coffee_boundMethodCheck(this, TerrainBar);
    ({editor} = this.props);
    ({editing_entity} = editor);
    
    // TODO: ducktype? or rather replace the whole UI with a more general toolbox
    show = show && editing_entity instanceof Terrain_coffee;
    return this.setState({
      visible: show
    });
  }

});

// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __nested_webpack_require_159660__(892);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__nested_webpack_require_159660__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __nested_webpack_require_159660__(760);
var styleDomAPI_default = /*#__PURE__*/__nested_webpack_require_159660__.n(styleDomAPI);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __nested_webpack_require_159660__(311);
var insertBySelector_default = /*#__PURE__*/__nested_webpack_require_159660__.n(insertBySelector);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __nested_webpack_require_159660__(192);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__nested_webpack_require_159660__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __nested_webpack_require_159660__(60);
var insertStyleElement_default = /*#__PURE__*/__nested_webpack_require_159660__.n(insertStyleElement);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __nested_webpack_require_159660__(865);
var styleTagTransform_default = /*#__PURE__*/__nested_webpack_require_159660__.n(styleTagTransform);
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js!./styles.css
var cjs_js_styles = __nested_webpack_require_159660__(389);
;// CONCATENATED MODULE: ./styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(cjs_js_styles/* default */.Z, options);




       /* harmony default export */ const styles = (cjs_js_styles/* default */.Z && cjs_js_styles/* default.locals */.Z.locals ? cjs_js_styles/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./jsMenus/jsMenus.js
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

// Local Variables:
// js-indent-level: 8
// indent-tabs-mode: t
// End:

// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js!./jsMenus/jsMenus.css
var jsMenus = __nested_webpack_require_159660__(89);
;// CONCATENATED MODULE: ./jsMenus/jsMenus.css

      
      
      
      
      
      
      
      
      

var jsMenus_options = {};

jsMenus_options.styleTagTransform = (styleTagTransform_default());
jsMenus_options.setAttributes = (setAttributesWithoutAttributes_default());

      jsMenus_options.insert = insertBySelector_default().bind(null, "head");
    
jsMenus_options.domAPI = (styleDomAPI_default());
jsMenus_options.insertStyleElement = (insertStyleElement_default());

var jsMenus_update = injectStylesIntoStyleTag_default()(jsMenus/* default */.Z, jsMenus_options);




       /* harmony default export */ const jsMenus_jsMenus = (jsMenus/* default */.Z && jsMenus/* default.locals */.Z.locals ? jsMenus/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./Editor.coffee
var Editor, Editor_coffee_Menu, Editor_coffee_MenuItem, Editor_coffee_TAU, Editor_coffee_fs, Editor_coffee_path,
  indexOf = [].indexOf;

























Editor_coffee_TAU = Math.PI * 2;







if (typeof nw !== "undefined" && nw !== null) {
  ({Menu: Editor_coffee_Menu, MenuItem: Editor_coffee_MenuItem} = nw);
} else {
  Editor_coffee_Menu = Menu;
  Editor_coffee_MenuItem = MenuItem;
}

Editor_coffee_fs = typeof window.require === "function" ? window.require("fs") : void 0;

Editor_coffee_path = typeof window.require === "function" ? window.require("path") : void 0;

/* harmony default export */ const Editor_coffee = (Editor = class Editor {
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
    if (Editor_coffee_fs != null) {
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
      menu = new Editor_coffee_Menu();
      
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
      menu.append(new Editor_coffee_MenuItem({
        label: 'Undo',
        click: () => {
          return this.undo();
        },
        enabled: this.undos.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Redo',
        click: () => {
          return this.redo();
        },
        enabled: this.redos.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        type: 'separator'
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Cut',
        click: () => {
          return this.cut();
        },
        enabled: this.selected_entities.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Copy',
        click: () => {
          return this.copy();
        },
        enabled: this.selected_points.length || this.selected_entities.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Paste',
        click: () => {
          return this.paste();
        },
        enabled: this.editing_entity ? this.clipboard.point_positions != null : (ref1 = this.clipboard.entities) != null ? ref1.length : void 0
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Delete',
        click: () => {
          return this.delete();
        },
        enabled: this.selected_entities.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Select All',
        click: () => {
          return this.selectAll();
        },
        enabled: this.world.entities.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        label: 'Select Same Type',
        click: () => {
          return this.selectAllSameType();
        },
        enabled: this.world.entities.length && this.selected_entities.length
      }));
      menu.append(new Editor_coffee_MenuItem({
        type: 'separator'
      }));
      if (this.editing_entity) {
        modifyPose = (fn) => {
          var EntityClass, frame_index, new_pose, old_pose;
          EntityClass = entityClasses[this.editing_entity._class_];
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
          return Entity_coffee.saveAnimations(EntityClass);
        };
        
        // TODO: allow flipping the current pose, just don't save it? or save the world where it's stored?
        // also, allow flipping terrain
        menu.append(new Editor_coffee_MenuItem({
          label: 'Flip Pose Horizontally',
          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose",
          click: () => {
            return modifyPose(Pose_coffee.horizontallyFlip);
          }
        }));
        menu.append(new Editor_coffee_MenuItem({
          label: 'Flip Pose Vertically',
          enabled: this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose",
          click: () => {
            return modifyPose(Pose_coffee.verticallyFlip);
          }
        }));
        menu.append(new Editor_coffee_MenuItem({
          type: 'separator'
        }));
        menu.append(new Editor_coffee_MenuItem({
          label: 'Finish Editing Entity',
          click: () => {
            return this.finishEditingEntity();
          }
        }));
      } else {
        menu.append(new Editor_coffee_MenuItem({
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
    if (Editor_coffee_fs != null) {
      return Editor_coffee_fs.writeFileSync(this.save_path, json);
    } else {
      return localStorage["Skele2D World"] = json;
    }
  }

  load() {
    var e, json, req;
    if (Editor_coffee_fs != null) {
      json = Editor_coffee_fs.readFileSync(this.save_path);
    } else {
      json = localStorage["Skele2D World"];
    }
    if (json) {
      try {
        this.world.fromJSON(JSON.parse(json));
        return;
      } catch (error1) {
        e = error1;
        this.warn(`Error loading saved world: ${e}`, 10000);
      }
    }
    // fall back to loading the default world
    req = new XMLHttpRequest();
    req.addEventListener("error", (e) => {
      return this.warn("Error loading default world: the network request failed.", 10000);
    });
    req.addEventListener("load", (e) => {
      var error;
      if (req.status !== 200) {
        this.warn(`Error loading default world: ${req.status} ${req.statusText}`, 10000);
        return;
      }
      json = req.responseText;
      if (json) {
        try {
          this.world.fromJSON(JSON.parse(json));
        } catch (error1) {
          error = error1;
          return this.warn(`Error loading default world: ${error}`, 10000);
        }
      } else {
        return this.warn("No default world loaded", 10000);
      }
    });
    req.open("GET", "world.json");
    return req.send();
  }

  discardSave() {
    if (Editor_coffee_fs != null) {
      return Editor_coffee_fs.unlinkSync(this.save_path);
    } else {
      return delete localStorage["Skele2D World"];
    }
  }

  savePose() {
    var EntityClass;
    if (this.editing_entity_anim_name && this.editing_entity_anim_name !== "Current Pose") {
      EntityClass = entityClasses[this.editing_entity._class_];
      if (this.editing_entity_animation_frame_index != null) {
        EntityClass.animations[this.editing_entity_anim_name][this.editing_entity_animation_frame_index] = this.editing_entity.structure.getPose();
      } else {
        EntityClass.poses[this.editing_entity_anim_name] = this.editing_entity.structure.getPose();
      }
      return Entity_coffee.saveAnimations(EntityClass);
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
    if (this.editing) {
      return this.undo_or_redo(this.undos, this.redos);
    } else {
      this.toggleEditing();
      return this.undo();
    }
  }

  // TODO: undo view too
  redo() {
    if (this.editing) {
      return this.undo_or_redo(this.redos, this.undos);
    }
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

  selectAllSameType() {
    var entity, types;
    types = this.editing_entity ? [this.editing_entity._class_] : (function() {
      var j, len, ref, results;
      ref = this.selected_entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        results.push(entity._class_);
      }
      return results;
    }).call(this);
    this.finishEditingEntity();
    return this.selected_entities = (function() {
      var j, len, ref, ref1, results;
      ref = this.world.entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        entity = ref[j];
        if (ref1 = entity._class_, indexOf.call(types, ref1) >= 0) {
          results.push(entity);
        }
      }
      return results;
    }).call(this);
  }

  delete() {
    var dummy_ctx, dummy_view, e, entity, j, len, original_ent_def, original_redos, original_world_state, plural, point, point_name, ref, ref1, ref2, ref3, ref4, segment, segment_name;
    if (this.selected_points.length) {
      plural = this.selected_points.length > 1;
      original_redos = [...this.redos];
      // Not using callback version so that it doesn't
      // save until it's verified that the entity can be drawn & stepped
      this.undoable();
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
      this.dragging_points = [];
      dummy_ctx = document.createElement("canvas").getContext("2d");
      dummy_view = new View_coffee();
      try {
        this.editing_entity.draw(dummy_ctx, dummy_view);
      } catch (error1) {
        e = error1;
        this.undo();
        this.redos = original_redos;
        if (typeof console !== "undefined" && console !== null) {
          if (typeof console.warn === "function") {
            console.warn("Entity failed to draw after deletion, with", e);
          }
        }
        if (plural) {
          alert("Entity needs one or more of those points to render");
        } else {
          alert("Entity needs that point to render");
        }
        return;
      }
      try {
        // Entity::step() is allowed to modify other entities,
        // so we need to save/restore the whole world state.
        // However, we also need to either preserve or update the reference to the entity being edited,
        // so that the visible entity's version of the structure doesn't desynchronize from the editor's.

        // TODO: I could also add a flag, either as a parameter to step() or globally,
        // that says whether or not it's safe to perform major side effects
        // such as saving the game when reaching a checkpoint,
        // playing a sound,
        // starting a cinematic that runs using setTimeout() rather than properties on entities (problematic for playing well with pausing anyways),
        // or causing a screen shake effect — things that are outside the world state.
        original_ent_def = JSON.parse(JSON.stringify(this.editing_entity));
        original_world_state = JSON.parse(JSON.stringify(this.world));
        this.editing_entity.step(this.world);
        this.world.fromJSON(original_world_state);
        ref4 = this.world.entities;
        // world.fromJSON doesn't preserve the same instance of the Entity
        // Find the old new instance and replace it with the original with the same ID
        // Alternatively, something like this might work: @editing_entity = @world.getEntityByID(original_ent_def.id)
        // But I'd also need to update @selected_entities and @selected_points, maybe @hovered_entities and @hovered_points too...
        // This is ugly but hopefully robust
        for (j = 0, len = ref4.length; j < len; j++) {
          entity = ref4[j];
          if (entity.id === this.editing_entity.id) {
            this.world.entities.splice(this.world.entities.indexOf(entity), 1, this.editing_entity);
            break;
          }
        }
        // and restore the entity's state
        this.editing_entity.fromJSON(original_ent_def);
      } catch (error1) {
        e = error1;
        this.undo();
        this.redos = original_redos;
        if (typeof console !== "undefined" && console !== null) {
          if (typeof console.warn === "function") {
            console.warn("Entity failed to step after deletion, with", e);
          }
        }
        if (plural) {
          alert("Entity needs one or more of those points to step");
        } else {
          alert("Entity needs that point to step");
        }
        return;
      }
      return this.save();
    } else {
      return this.undoable(() => {
        var index, k, len1, ref5;
        ref5 = this.selected_entities;
        for (k = 0, len1 = ref5.length; k < len1; k++) {
          entity = ref5[k];
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
        var center, centroid, centroid_in_world, centroids, divisor, ent_def, entity, j, json, k, len, len1, mouse_in_world, new_entities, point, point_name, ref, results;
        if (!((ref = this.clipboard.entities) != null ? ref.length : void 0)) {
          this.warn("Nothing on clipboard");
          return;
        }
        this.selected_entities = [];
        new_entities = (function() {
          var j, len, ref1, results;
          ref1 = this.clipboard.entities;
          results = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            ({json} = ref1[j]);
            ent_def = JSON.parse(json);
            delete ent_def.id;
            entity = Entity_coffee.fromJSON(ent_def);
            this.world.entities.push(entity);
            this.selected_entities.push(entity);
            results.push(entity);
          }
          return results;
        }).call(this);
        centroids = (function() {
          var j, len, ref1, results;
          results = [];
          for (j = 0, len = new_entities.length; j < len; j++) {
            entity = new_entities[j];
            centroid = {
              x: 0,
              y: 0
            };
            divisor = 0;
            ref1 = entity.structure.points;
            for (point_name in ref1) {
              point = ref1[point_name];
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
    if (this.editing) {
      this.undoable();
    }
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
        if (this.editing_entity instanceof Terrain_coffee && this.sculpt_mode) {
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
          if (dist < min_grab_dist && (dist < closest_dist || (!(entity instanceof Terrain_coffee) && closest_entity instanceof Terrain_coffee))) {
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
        if (this.editing_entity instanceof Terrain_coffee && this.sculpt_mode) {
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
      if (this.editing_entity.structure instanceof BoneStructure_coffee) {
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
      EntityClass = entityClasses[this.editing_entity._class_];
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
        ctx.arc(point.x, point.y, radius / view.scale, 0, Editor_coffee_TAU);
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
      if (this.editing_entity instanceof Terrain_coffee && this.sculpt_mode) {
        mouse_in_world = this.view.toWorld(this.mouse);
        ctx.beginPath();
        // ctx.arc(mouse_in_world.x, mouse_in_world.y, @brush_size / view.scale, 0, TAU)
        ctx.arc(mouse_in_world.x, mouse_in_world.y, this.brush_size, 0, Editor_coffee_TAU);
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
          ctx.arc(point.x, point.y, 3 / view.scale, 0, Editor_coffee_TAU);
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
    react_root = react_script_default()(".editor", react_script_default()(EntitiesBar_coffee, {
      editor: this,
      ref: (entities_bar) => {
        this.entities_bar = entities_bar;
      }
    }), react_script_default()(AnimBar_coffee, {
      editor: this,
      ref: (anim_bar) => {
        this.anim_bar = anim_bar;
      }
    }), react_script_default()(TerrainBar_coffee, {
      editor: this,
      ref: (terrain_bar) => {
        this.terrain_bar = terrain_bar;
      }
    }), react_script_default()(".warning", {
      class: (this.show_warning ? "show" : void 0)
    }, this.warning_message));
    return react_dom.render(react_root, this.react_root_el);
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

});

;// CONCATENATED MODULE: ./Mouse.coffee
var Mouse;

/* harmony default export */ const Mouse_coffee = (Mouse = class Mouse {
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

});

;// CONCATENATED MODULE: ./index.coffee
























})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 378:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Entity, Terrain, World, distanceToLineSegment,
  indexOf = [].indexOf;

Entity = __webpack_require__(293);

Terrain = __webpack_require__(891);

({distanceToLineSegment} = (__webpack_require__(432).helpers));

module.exports = World = (function() {
  class World {
    constructor() {
      this.entities = [];
    }

    toJSON() {
      return {
        formatVersion: World.formatVersion,
        entities: this.entities
      };
    }

    fromJSON(def) {
      var ent_def, entity, i, j, k, len, len1, len2, point_def, point_name, ref, ref1, ref2, ref3, results;
      // upgrade old versions of the format
      if (!def.formatVersion) {
        if (!(def.entities instanceof Array)) {
          throw new Error(`Expected entities to be an array, got ${def.entities}`);
        }
        def.formatVersion = 1;
        ref = def.entities;
        // Arrow now uses prev_x/prev_y instead of of vx/vy for velocity
        // (Velocity is now implicit in the difference between prev_x/prev_y and x/y)
        for (i = 0, len = ref.length; i < len; i++) {
          ent_def = ref[i];
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
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          ent_def = ref1[j];
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
      if (def.formatVersion > World.formatVersion) {
        throw new Error(`The format version ${def.formatVersion} is too new for this version of the game.`);
      }
      // In case the format version format changes to a string or something
      if (def.formatVersion !== World.formatVersion) {
        throw new Error(`Unsupported format version ${def.formatVersion}`);
      }
      
      // Validate the current format a bit
      if (!(def.entities instanceof Array)) {
        throw new Error(`Expected entities to be an array, got ${def.entities}`);
      }
      
      // Initialize the world
      this.entities = (function() {
        var k, len2, ref3, results;
        ref3 = def.entities;
        results = [];
        for (k = 0, len2 = ref3.length; k < len2; k++) {
          ent_def = ref3[k];
          results.push(Entity.fromJSON(ent_def));
        }
        return results;
      })();
      ref3 = this.entities;
      results = [];
      for (k = 0, len2 = ref3.length; k < len2; k++) {
        entity = ref3[k];
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

    collision(point, {types = [Terrain], lineThickness = 5} = {}) {
      var dist, entity, filter, i, len, local_point, ref, ref1, segment, segment_name;
      // lineThickness doesn't apply to polygons like Terrain
      // also it's kind of a hack, because different entities could need different lineThicknesses
      // and different segments within an entity too
      if (typeof types === "function") {
        filter = types;
      } else {
        filter = (entity) => {
          return types.some((type) => {
            var ref;
            return (entity instanceof type) && ((ref = entity.solid) != null ? ref : true);
          });
        };
      }
      ref = this.entities;
      for (i = 0, len = ref.length; i < len; i++) {
        entity = ref[i];
        if (filter(entity)) {
          if (entity.structure.pointInPolygon != null) {
            if (entity.structure.pointInPolygon(entity.fromWorld(point))) {
              return entity;
            }
          } else {
            local_point = entity.fromWorld(point);
            ref1 = entity.structure.segments;
            for (segment_name in ref1) {
              segment = ref1[segment_name];
              dist = distanceToLineSegment(local_point, segment.a, segment.b);
              if (dist < lineThickness) {
                return entity;
              }
            }
          }
        }
      }
      return null;
    }

  };

  World.formatVersion = 3;

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
    return off_angle = Math.atan2(e.clientY - innerHeight / 2, e.clientX - innerWidth / 2);
  });
  addEventListener("mousedown", function(e) {
    if (e.button === 1) { // middle click
      return window.create_arrow_test_scene();
    }
  });
  return window.create_arrow_test_scene();
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
  return world.entities.push(...arrows);
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
  return world.entities.push(...arrows);
};


/***/ }),

/***/ 653:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Bird, SimpleActor, addEntityClass, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(432));

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
      return this.flap_timer--;
    }

    // run SimpleActor physics, which uses @move_x and @jump
    // super(world)
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
      if (this.flap_timer < 0) {
        this.flap_timer = -1;
      }
      this.flap += this.flap_timer / 20;
      return this.flap += (-this.flap - 0.1) * 0.1;
    }

  };

  addEntityClass(Bird);

  return Bird;

}).call(this);


/***/ }),

/***/ 739:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Butterfly, SimpleActor, addEntityClass, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(432));

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
      this.c1 = "hsla(" + (Math.random() * 360) + ",100%," + (50 + Math.random() * 50) + "%,1)";
      this.c2 = "hsla(" + (Math.random() * 360) + ",100%," + (50 + Math.random() * 50) + "%,1)";
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
      return this.flap = Math.cos(this.t += 0.5);
    }

    // run SimpleActor physics, which uses @move_x and @jump
    // super(world)
    draw(ctx) {
      var f;
      ctx.beginPath();
      f = 2.8;
      ctx.strokeStyle = this.c1;
      ctx.moveTo(0, 0);
      ctx.lineTo(0 + Math.cos(this.flap - f) * this.width, 0 + Math.sin(this.flap - f) * this.width);
      ctx.moveTo(0, 0);
      ctx.lineTo(0 - Math.cos(this.flap - f) * this.width, 0 + Math.sin(this.flap - f) * this.width);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = this.c2;
      ctx.moveTo(0, 0);
      ctx.lineTo(0 + Math.cos(this.flap + f) * this.width, 0 + Math.sin(this.flap + f) * this.width);
      ctx.moveTo(0, 0);
      ctx.lineTo(0 - Math.cos(this.flap + f) * this.width, 0 + Math.sin(this.flap + f) * this.width);
      ctx.stroke();
      ctx.beginPath();
      if (this.flap_timer < 0) {
        this.flap_timer = -1;
      }
      this.flap += this.flap_timer / 20;
      return this.flap += (-this.flap - 0.1) * 0.1;
    }

  };

  addEntityClass(Butterfly);

  return Butterfly;

}).call(this);


/***/ }),

/***/ 332:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Cloud, Entity, addEntityClass;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(432));

module.exports = Cloud = (function() {
  class Cloud extends Entity {
    constructor() {
      super();
      this.structure.addPoint("body");
      this.bbox_padding = 80;
      this.width = 45 + Math.random() * 50;
      this.height = 35 + Math.random() * 10;
      // @simplex = new SimplexNoise()
      this.t = 0;
    }

    step(world) {
      this.x++;
      return this.t += 0.001;
    }

    // if @x > terrain.width+300
    // 	@poof=true
    draw(ctx) {
      var i, j, results;
      ctx.fillStyle = "#A9D9FA";
      results = [];
      for (i = j = 0; j <= 20; i = ++j) {
        ctx.beginPath();
        // ctx.arc(
        // 	@simplex.noise(5+i,@t+i*3.92)*@width+@width/2,
        // 	@simplex.noise(26+i,@t+i*2.576)*@height+@height/2,
        // 	Math.abs(@simplex.noise(73+i*5.2,@t+i)*@width),
        // 	# @simplex.noise(68+i,@t)*-Math.PI*2,
        // 	# @simplex.noise(20+i,@t)*Math.PI*2,
        // 	0,Math.PI*2,
        // 	false
        // )
        ctx.arc(Math.sin(this.t + i ** 1.2) * this.width + this.width / 2, Math.sin(this.t + i - i ** 1.1) * this.height + this.height / 2, Math.abs(Math.sin(this.t + i ** 1.3)) * this.width, 0, Math.PI * 2, false);
        results.push(ctx.fill());
      }
      return results;
    }

  };

  addEntityClass(Cloud);

  return Cloud;

}).call(this);


/***/ }),

/***/ 857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Deer, Entity, SimpleActor, addEntityClass, r;

SimpleActor = __webpack_require__(339);

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(432));

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
      this.xp = 0;
      this.t = 0;
      this.lr = 0;
      this.dir = 0;
      this.dir_p = 1;
      this.dir_pl = 1;
      this.rideable = true;
      this.c = "hsla(" + (Math.random() * 20) + "," + 10 + "%," + (50 + Math.random() * 20) + "%,1)";
      this.ground_angle = 0;
      this.ground_angle_smoothed = 0;
    }

    step(world) {
      var ref;
      if (this.grounded) {
        // Note: ground_angle  and ground_angle_smoothed are used by Player while riding
        this.ground_angle = (ref = this.find_ground_angle(world)) != null ? ref : 0;
        this.ground_angle = Math.atan2(Math.sin(this.ground_angle), Math.cos(this.ground_angle));
        this.ground_angle_smoothed += (this.ground_angle - this.ground_angle_smoothed) / 5;
        if (Math.random() < 0.01) {
          this.dir = r();
        }
      } else {
        this.ground_angle = 0;
        this.ground_angle_smoothed += (this.ground_angle - this.ground_angle_smoothed) / 10;
        if (Math.abs(this.xp - this.x) < 1) {
          this.t++;
          if (this.t > 15) {
            this.dir = r();
            this.t = 0;
          }
        } else {
          this.t = 0;
        }
      }
      this.vx += this.dir / 5;
      this.lr += Math.abs(this.vx) / 5;
      this.xp = this.x;
      this.move_x = this.dir * 0.2;
      this.move_y = -1;
      // run SimpleActor physics, which uses @move_x and @jump
      return super.step(world);
    }

    draw(ctx) {
      if (this.dir < -0.3) {
        this.dir_p = -1;
      }
      if (this.dir > 0.3) {
        this.dir_p = 1;
      }
      this.dir_pl += (this.dir_p - this.dir_pl) / 10;
      ctx.save();
      // ctx.translate(@x,@y+@height*3/4)
      ctx.translate(0, this.height * 3 / 4);
      ctx.rotate(this.ground_angle_smoothed);
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.arc(0, -this.height / 2, this.height / 3, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.scale(this.dir_pl, 1);
      // ctx.rotate(@vx/-10)
      // legs
      ctx.strokeStyle = "#a55";
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.lr) * 10 - this.width / 2, this.height / 2 + Math.sin(this.lr) * 8);
      ctx.moveTo(-this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.lr + Math.PI) * 10 - this.width / 2, this.height / 2 + Math.sin(this.lr + Math.PI) * 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.lr + 0.1) * 10 + this.width / 2, this.height / 2 + Math.sin(this.lr) * 8);
      ctx.moveTo(this.width / 2, -this.height / 2);
      ctx.lineTo(Math.cos(this.lr + Math.PI + 0.2) * 10 + this.width / 2, this.height / 2 + Math.sin(this.lr + Math.PI) * 8);
      ctx.stroke();
      ctx.fillStyle = this.c;
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
      ctx.restore();
      
      // body
      ctx.fillRect(this.width / -2, this.height / -1, this.width, this.height * 3 / 4);
      return ctx.restore();
    }

  };

  addEntityClass(Deer);

  return Deer;

}).call(this);


/***/ }),

/***/ 162:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Frog, SimpleActor, addEntityClass, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(432));

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
      this.c = "hsla(" + (150 - Math.random() * 50) + "," + (50 + Math.random() * 50) + "%," + (50 - Math.random() * 20) + "%,1)";
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
      return super.step(world);
    }

    draw(ctx) {
      ctx.save();
      ctx.rotate(this.vx / 5);
      ctx.fillStyle = this.c;
      //ctx.fillRect(@x,@y,@width,@height)
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 4 - this.vy, this.height / 2, 0, Math.PI, false);
      ctx.arc(this.width / 2, this.height, this.height / 2, Math.PI, Math.PI * 2, false);
      ctx.fill();
      return ctx.restore();
    }

  };

  addEntityClass(Frog);

  return Frog;

}).call(this);


/***/ }),

/***/ 668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Entity, GranddaddyLonglegs, TAU, addEntityClass, distance,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  indexOf = [].indexOf;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(432));

({distance} = (__webpack_require__(432).helpers));

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

var Arrow, Bow, Deer, Entity, Player, Pose, SimpleActor, TAU, addEntityClass, distance, distanceToLineSegment, gamepad_aiming, gamepad_deadzone, gamepad_detect_threshold, gamepad_jump_prev, gamepad_mount_prev, keyboard, mouse_detect_from, mouse_detect_threshold,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

SimpleActor = __webpack_require__(339);

Entity = __webpack_require__(293);

({Pose} = __webpack_require__(432));

Bow = __webpack_require__(914);

Arrow = __webpack_require__(943);

Deer = __webpack_require__(857);

keyboard = __webpack_require__(866);

({addEntityClass} = __webpack_require__(432));

({distance, distanceToLineSegment} = (__webpack_require__(432).helpers));

TAU = Math.PI * 2;

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
    return mouse_detect_from.y = e.clientY;
  }
});

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
      this.holding_arrow = null;
      this.riding = null;
      this.bow_drawn_to = 0;
      this.run_animation_position = 0;
      this.subtle_idle_animation_position = 0;
      this.other_idle_animation_position = 0;
      this.idle_animation = null;
      this.idle_timer = 0;
      this.real_facing_x = this.facing_x;
      this.hairs = (function() {
        var j, results;
        results = [];
        for (var j = 0; j <= 5; j++) {
          results.push((function() {
            var k, results1;
            results1 = [];
            for (var k = 0; k <= 4; k++) {
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
    }

    step(world, view, mouse) {
      var a, aim_angle, air_friction, angle, arm_span, arrow, arrow_angle, back_x, back_y, bow, bow_angle, buoyancy, center, closest_dist, closest_steed, delta_length, delta_x, delta_y, diff, dist, down, draw_back_distance, draw_bow, draw_to, entity, factor, fluid_friction, force, from_point_in_entity_space, from_point_in_world, gamepad, gamepad_draw_bow, gamepad_prime_bow, gravity, ground_angle, hair_index, hair_iterations, hair_length, head, head_angle, head_global, head_x_before_posing, head_y_before_posing, hold_offset, i, j, k, l, left, len, len1, len2, len3, len4, m, max_draw_distance, max_y_diff, more_submerged, mount_dismount, mouse_draw_bow, mouse_in_world, mouse_prime_bow, n, neck, new_head_x, new_head_y, new_pose, o, offset_distance, other_idle_animation, p, pick_up_any, point, point_name, points, prevent_idle, primary_elbow, primary_hand, primary_hand_in_arrow_space, primary_hand_in_bow_space, prime_bow, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, right, secondary_elbow, secondary_hand, secondary_hand_in_arrow_space, secondary_hand_in_bow_space, seg_length, segment, segment_name, sternum, submerged, subtle_idle_animation, up, water_friction, x, y;
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
          aim_angle += Math.PI;
          draw_back_distance = Math.hypot(gamepad.axes[2], gamepad.axes[3]);
          draw_back_distance = Math.max(0, draw_back_distance - gamepad_deadzone);
          gamepad_prime_bow = draw_back_distance > 0.3;
        }
      }
      // Note: You're allowed to prime and draw the bow without an arrow.
      prime_bow = this.holding_bow && (mouse_prime_bow || gamepad_prime_bow);
      draw_bow = prime_bow && (mouse_draw_bow || gamepad_draw_bow);
      
      // TODO: configurable controls
      this.move_x = right - left;
      this.move_y = down - up;
      // run SimpleActor physics, which uses @move_x and @jump
      super.step(world);
      pick_up_any = (EntityClass, prop) => {
        var dist, entity, from_point_in_entity_space, k, len1, moving_too_fast, pickup_item, ref2, ref3, ref4, segment, segment_name, vx, vy;
        if ((ref2 = this[prop]) != null ? ref2.destroyed : void 0) {
          this[prop] = null;
        }
        if (this[prop]) {
          return;
        }
        ref3 = world.getEntitiesOfType(EntityClass);
        // this is ridiculously complicated
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          entity = ref3[k];
          from_point_in_entity_space = entity.fromWorld(from_point_in_world);
          moving_too_fast = false;
          // Arrow defines getAverageVelocity
          // Bow doesn't move, and we're not handling picking up anything else yet
          if (entity.getAverageVelocity != null) {
            [vx, vy] = entity.getAverageVelocity();
            if (Math.abs(vx) + Math.abs(vy) > 2) {
              moving_too_fast = true;
            }
          }
          if (!moving_too_fast) {
            ref4 = entity.structure.segments;
            for (segment_name in ref4) {
              segment = ref4[segment_name];
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
      // Note: Arrow checks for "holding_arrow" property to prevent solving for collisions while held
      if (mount_dismount) {
        if (this.riding) {
          this.riding = null;
        } else {
          closest_dist = 2e308;
          closest_steed = null;
          ref2 = world.getEntitiesOfType(Deer);
          for (k = 0, len1 = ref2.length; k < len1; k++) {
            entity = ref2[k];
            from_point_in_entity_space = entity.fromWorld(from_point_in_world);
            ref3 = entity.structure.segments;
            for (segment_name in ref3) {
              segment = ref3[segment_name];
              dist = distanceToLineSegment(from_point_in_entity_space, segment.a, segment.b);
              if (dist < closest_dist) {
                closest_dist = dist;
                closest_steed = entity;
              }
            }
          }
          if (closest_dist < 30) {
            this.riding = closest_steed;
          }
        }
      }
      if (this.riding) {
        // @riding.move_x = @move_x
        this.riding.dir = this.move_x; // old code...
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
        new_pose = (ref4 = Player.poses[prime_bow ? "Riding Aiming" : "Riding"]) != null ? ref4 : this.structure.getPose();
      } else if (more_submerged) {
        if (this.move_x !== 0) {
          this.run_animation_position += 0.1;
          new_pose = Pose.lerpAnimationLoop(Player.animations["Swim"], this.run_animation_position);
        } else {
          this.run_animation_position -= 0.1 * this.move_y;
          new_pose = Pose.lerpAnimationLoop(Player.animations["Tread Water"], this.run_animation_position);
        }
      } else if (this.move_x === 0) {
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
          new_pose = (ref5 = Player.poses["Stand"]) != null ? ref5 : this.structure.getPose();
        }
      } else {
        prevent_idle();
        if (Player.animations["Run"]) {
          this.run_animation_position += Math.abs(this.move_x) / 5 * this.facing_x * this.real_facing_x;
          new_pose = Pose.lerpAnimationLoop(Player.animations["Run"], this.run_animation_position);
        } else {
          new_pose = this.structure.getPose();
        }
      }
      if (this.real_facing_x < 0) {
        new_pose = Pose.horizontallyFlip(new_pose);
      }
      head_x_before_posing = this.structure.points["head"].x;
      head_y_before_posing = this.structure.points["head"].y;
      // rotate the pose based on the ground angle
      // TODO: balance the character better; lean while running; keep feet out of the ground
      // I may need to define new poses to do this well.
      ground_angle = (ref6 = (ref7 = this.riding) != null ? ref7.ground_angle_smoothed : void 0) != null ? ref6 : this.find_ground_angle(world);
      this.ground_angle = ground_angle;
      if ((ground_angle != null) && isFinite(ground_angle)) {
        // there's no helper for rotation yet
        // and we wanna do it a little custom anyway
        // rotating some points more than others
        new_pose = Pose.copy(new_pose);
        center = new_pose.points["pelvis"];
        center = {
          x: center.x,
          y: center.y // copy
        };
        ref8 = new_pose.points;
        for (point_name in ref8) {
          point = ref8[point_name];
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
        }
      }
      this.structure.setPose(Pose.lerp(this.structure.getPose(), new_pose, 0.3));
      
      // (her dominant eye is, of course, *whichever one she would theoretically be using*)
      // (given this)
      primary_hand = this.structure.points["right hand"];
      secondary_hand = this.structure.points["left hand"];
      primary_elbow = this.structure.points["right elbow"];
      secondary_elbow = this.structure.points["left elbow"];
      this.real_facing_x = this.facing_x;
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
          if (prime_bow && this.holding_arrow && bow.draw_distance > 2 && !world.collision(this.holding_arrow.toWorld(this.holding_arrow.structure.points["tip"])) && !world.collision(this.holding_arrow.toWorld(this.holding_arrow.structure.points["nock"]))) {
            force = bow.draw_distance * 2;
            this.holding_arrow.setVelocity(Math.cos(aim_angle) * force + this.vx, Math.sin(aim_angle) * force + this.vy);
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
          primary_elbow.x = sternum.x + 5 * Math.cos(aim_angle);
          primary_elbow.y = sternum.y + 5 * Math.sin(aim_angle);
          // primary_elbow.y = sternum.y - 3
          secondary_hand.x = sternum.x + arm_span * Math.cos(aim_angle);
          secondary_hand.y = sternum.y + arm_span * Math.sin(aim_angle);
          secondary_elbow.x = sternum.x + 15 * Math.cos(aim_angle);
          secondary_elbow.y = sternum.y + 15 * Math.sin(aim_angle);
          // make head look along aim path
          angle = modulo(aim_angle - Math.PI / 2, Math.PI * 2);
          this.real_facing_x = angle < Math.PI ? -1 : 1;
          ({head, neck} = this.structure.points);
          new_head_x = neck.x + 5 * Math.cos(angle + (angle < Math.PI ? Math.PI : 0));
          new_head_y = neck.y + 5 * Math.sin(angle + (angle < Math.PI ? Math.PI : 0));
          head.x += (new_head_x - head.x) / 5;
          head.y += (new_head_y - head.y) / 5;
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
      }
      if (this.holding_arrow) {
        arrow = this.holding_arrow;
        arrow.lodging_constraints.length = 0; // pull it out if it's lodged in an object
        arrow.x = this.x;
        arrow.y = this.y;
        primary_hand_in_arrow_space = arrow.fromWorld(this.toWorld(primary_hand));
        secondary_hand_in_arrow_space = arrow.fromWorld(this.toWorld(secondary_hand));
        if (prime_bow) {
          arrow.structure.points.nock.x = sternum.x + draw_to * Math.cos(aim_angle);
          arrow.structure.points.nock.y = sternum.y + draw_to * Math.sin(aim_angle);
          arrow.structure.points.tip.x = sternum.x + (draw_to + arrow.length) * Math.cos(aim_angle);
          arrow.structure.points.tip.y = sternum.y + (draw_to + arrow.length) * Math.sin(aim_angle);
        } else {
          angle = Math.atan2(primary_hand.y - sternum.y, primary_hand.x - sternum.x);
          arrow_angle = angle - (TAU / 4 + 0.2) * this.real_facing_x;
          hold_offset = -5;
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
      ({head, neck} = this.structure.points);
      head_angle = Math.atan2(head.y - neck.y, head.x - neck.x);
      head_global = this.toWorld(head);
      hair_iterations = 1;
      air_friction = 0.2;
      water_friction = 0.2;
      hair_length = 30;
      results = [];
      for (l = 0, ref9 = hair_iterations; (0 <= ref9 ? l <= ref9 : l >= ref9); 0 <= ref9 ? l++ : l--) {
        ref10 = this.hairs;
        for (m = 0, len2 = ref10.length; m < len2; m++) {
          points = ref10[m];
          for (n = 0, len3 = points.length; n < len3; n++) {
            point = points[n];
            point.prev_x = point.x;
            point.prev_y = point.y;
          }
        }
        ref11 = this.hairs;
        for (hair_index = o = 0, len4 = ref11.length; o < len4; hair_index = ++o) {
          points = ref11[hair_index];
          a = head_angle + hair_index / this.hairs.length * Math.PI - Math.PI / 2;
          back_x = Math.sin(head_angle) * 2 * this.real_facing_x;
          back_y = Math.cos(head_angle) * 2 * this.real_facing_x;
          points[0].x = head_global.x + Math.cos(a) * 3 + back_x;
          points[0].y = head_global.y + Math.sin(a) * 3 + back_y;
          seg_length = (hair_length + (Math.cos(a - head_angle) - 0.5) * 5) / points.length;
          for (i = p = 1, ref12 = points.length; (1 <= ref12 ? p < ref12 : p > ref12); i = 1 <= ref12 ? ++p : --p) {
            gravity = 0.5;
            submerged = world.collision(points[i], {
              types: (entity) => {
                return entity.constructor.name === "Water";
              }
            });
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
            } else {
              console.warn("diff is not finite, for hair segment distance constraint");
            }
          }
        }
        results.push((function() {
          var len5, q, ref13, results1;
          ref13 = this.hairs;
          results1 = [];
          for (q = 0, len5 = ref13.length; q < len5; q++) {
            points = ref13[q];
            results1.push((function() {
              var len6, r, results2;
              results2 = [];
              for (r = 0, len6 = points.length; r < len6; r++) {
                point = points[r];
                point.vx = point.x - point.prev_x;
                results2.push(point.vy = point.y - point.prev_y);
              }
              return results2;
            })());
          }
          return results1;
        }).call(this));
      }
      return results;
    }

    draw(ctx) {
      var dress_color, eye_color, eye_signature, eye_spacing, eye_x, hair_color, hair_index, hair_points, head, head_rotation_angle, j, k, l, left_knee, left_leg_angle, left_shoulder, left_shoulder_angle, len, len1, len2, local_point, max_cos, max_cos_shoulder_angle, max_shoulder_cos, max_sin, min_cos, min_cos_shoulder_angle, min_shoulder_cos, min_sin, pelvis, point, ref, ref1, ref2, ref3, right_knee, right_leg_angle, right_shoulder, right_shoulder_angle, segment, segment_name, shoulder_distance, skin_color, sternum, torso_angle, torso_length, turn_limit;
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
      ref = this.hairs;
      
      // TODO: depth
      // @drawStructure
      // 	segments:
      // 		torso: ->
      // 	points:
      // 		head: ->

      // trailing hair
      for (hair_index = j = 0, len = ref.length; j < len; hair_index = ++j) {
        hair_points = ref[hair_index];
        ctx.beginPath();
        // ctx.moveTo(hair_points[0].x, hair_points[0].y)
        local_point = this.fromWorld(hair_points[0]);
        ctx.moveTo(local_point.x, local_point.y);
        ref1 = hair_points.slice(1);
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          point = ref1[k];
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
      ref2 = this.structure.segments;
      
      // limbs
      for (segment_name in ref2) {
        segment = ref2[segment_name];
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
      // eyes
      // TODO: refactor 5.5 and 0.9. Make hair defined in terms of head, not vice versa, and use variables.
      ctx.arc(0, 0, 5.5 * 0.9, 0, TAU);
      ctx.clip();
      eye_spacing = 0.6; // radians
      turn_limit = TAU / 8; // radians, TAU/4 = head facing completely sideways, only one eye visible
      ctx.fillStyle = eye_color;
      if (this.smoothed_facing_x_for_eyes == null) {
        this.smoothed_facing_x_for_eyes = 0;
      }
      this.smoothed_facing_x_for_eyes += (this.real_facing_x - this.smoothed_facing_x_for_eyes) / 5;
      ref3 = [-1, 1];
      for (l = 0, len2 = ref3.length; l < len2; l++) {
        eye_signature = ref3[l];
        // 3D projection in one axis
        head_rotation_angle = this.smoothed_facing_x_for_eyes * turn_limit;
        eye_x = Math.sin(eye_spacing * eye_signature - head_rotation_angle) * 5.5 * 0.9;
        ctx.beginPath();
        ctx.arc(eye_x, -1, 1, 0, TAU);
        ctx.fill();
      }
      // /head
      return ctx.restore();
    }

  };

  addEntityClass(Player);

  Entity.initAnimation(Player);

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

/***/ 33:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var PuffTree, TAU, Tree, addEntityClass;

Tree = __webpack_require__(776);

({addEntityClass} = __webpack_require__(432));

TAU = Math.PI * 2;

module.exports = PuffTree = (function() {
  class PuffTree extends Tree {
    constructor() {
      super();
      this.bbox_padding = 60;
      this.trunk_width = 10 + Math.floor(Math.random() * 5);
      this.random_seed = performance.now() + Date.now() + Math.random();
      this.branch({
        from: "base",
        to: "1",
        juice: Math.random() * 10 + 5,
        width: this.trunk_width,
        length: 9,
        angle: -TAU / 2
      });
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
      this.structure.points[name].x = this.structure.points[from].x + Math.sin(angle) * length;
      this.structure.points[name].y = this.structure.points[from].y + Math.cos(angle) * length;
      juice -= 0.3;
      if (juice > 0) {
        return this.branch({
          from: name,
          to: `${to}-a`,
          juice,
          angle,
          width: juice,
          length
        });
      } else {
        // if Math.random() < 0.2
        // 	@branch({from: name, to: "#{to}-b", juice, angle: angle + (Math.random() - 1/2) * TAU/4, width: juice, length})
        leaf_point = this.structure.points[name];
        return this.leaf(leaf_point);
      }
    }

    leaf(leaf) {
      leaf.is_leaf = true;
      return leaf;
    }

    draw(ctx) {
      var leaf, point_name, ref, ref1, results, segment, segment_name;
      Math.seedrandom(this.random_seed);
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
      results = [];
      for (point_name in ref1) {
        leaf = ref1[point_name];
        if (leaf.is_leaf) {
          results.push(this.drawLeaf(ctx, leaf.x, leaf.y));
        }
      }
      return results;
    }

    drawLeaf(ctx, x, y) {
      var i, j, l, r1, r2;
      ctx.save();
      l = Math.random() / 2;
      ctx.fillStyle = "hsla(" + (150 - l * 50) + "," + 50 + "%," + (50 + l * 20) + "%,1)";
      ctx.beginPath();
      ctx.arc(x, y, 10 + Math.random() * 5, 0, Math.PI * 2, true);
      ctx.fill();
      for (i = j = 0; j <= 10; i = ++j) {
        l = Math.random() / 2;
        ctx.fillStyle = "hsla(" + (150 - l * 50) + "," + 50 + "%," + (50 + l * 20) + "%,1)";
        ctx.beginPath();
        r1 = Math.PI * 2 * Math.random();
        r2 = Math.random() * 15;
        ctx.arc(x + Math.sin(r1) * r2, y + Math.cos(r1) * r2, 5 + Math.random() * 5, 0, Math.PI * 2, true);
        ctx.fill();
      }
      return ctx.restore();
    }

  };

  addEntityClass(PuffTree);

  return PuffTree;

}).call(this);


/***/ }),

/***/ 101:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Rabbit, SimpleActor, addEntityClass, r;

SimpleActor = __webpack_require__(339);

({addEntityClass} = __webpack_require__(432));

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
      this.c = "#FFF";
      this.c2 = "#DDD";
      this.eye_color = "#000";
    }

    step(world) {
      if (this.grounded) {
        // @vx*=0.99
        if (Math.random() < 0.1) {
          this.dir = r();
        }
        if (Math.random() < 0.1) {
          this.vy = -5;
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
      this.vx += (this.dir *= 1.1) / 5;
      this.dir = Math.max(-10, Math.min(10, this.dir));
      this.xp = this.x;
      this.move_x = this.dir * 0.02;
      this.move_y = -1;
      // run SimpleActor physics, which uses @move_x and @jump
      return super.step(world);
    }

    draw(ctx) {
      ctx.save(); // body center transform
      ctx.translate(this.width / 2, this.height);
      ctx.fillStyle = this.c2;
      // ctx.fillRect(0,0,@width,@height)
      ctx.beginPath();
      ctx.arc(0, 0, this.height / 2, Math.PI * 0.9, Math.PI * 2.1, false); // body
      ctx.fill();
      ctx.fillStyle = this.c;
      ctx.save(); // head transform
      ctx.translate(this.facing_x * this.width / 3, -this.height / 3);
      ctx.beginPath();
      ctx.arc(0, 0, this.height / 3, Math.PI * 0.9, Math.PI * 2.1, false); // head
      ctx.fill();
      ctx.fillStyle = this.eye_color;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2, false); // eye
      ctx.fill();
      ctx.fillStyle = this.c;
      ctx.beginPath();
      ctx.save(); // ear transform
      ctx.translate(-this.facing_x * this.width / 9, -this.height / 6);
      // ctx.rotate(Math.sin(performance.now()/1000))
      ctx.rotate(-Math.min(Math.PI / 3, Math.max(-Math.PI / 3, this.vx / 3)));
      ctx.scale(1, 3);
      ctx.arc(0, -this.height / 9, 1, 0, Math.PI * 2, false); // ear
      ctx.fill();
      ctx.restore(); // end ear transform
      ctx.restore(); // end head transform
      ctx.fillStyle = this.c;
      ctx.beginPath();
      ctx.arc(-this.facing_x * this.width / 2, 0, this.height / 5, 0, Math.PI * 2, false); // tail
      ctx.fill();
      return ctx.restore(); // end body center transform
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

({addEntityClass} = __webpack_require__(432));

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
      var leaf, point_name, ref, ref1, results, segment, segment_name;
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
      results = [];
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

module.exports = __webpack_require__(432).Entity;

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
var Entity, SimpleActor, Terrain, lineSegmentsIntersect;

({Terrain} = __webpack_require__(432));

({lineSegmentsIntersect} = (__webpack_require__(432).helpers));

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
      var go, more_submerged, move_x, move_y, resolution, results;
      if (this.y > 400) {
        return;
      }
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
        this.vy += Math.abs(this.vx);
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
      if (Math.abs(move_y) > resolution) {
        this.grounded = false;
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

module.exports = __webpack_require__(432).Terrain;

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
        return this.branch({
          from: name,
          to: `${to}-c`,
          juice,
          angle
        });
      }
    } else {
      leaf_point = this.structure.points[name];
      return this.leaf(leaf_point);
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
    var leaf, point_name, ref, ref1, results, segment, segment_name;
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
    results = [];
    for (point_name in ref1) {
      leaf = ref1[point_name];
      if (!leaf.is_leaf) {
        continue;
      }
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

/***/ 233:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ArcheryTarget, Entity, TAU, addEntityClass;

Entity = __webpack_require__(293);

({addEntityClass} = __webpack_require__(432));

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
      return this.structure.points.b.y += 100;
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
      return ctx.restore();
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

({addEntityClass} = __webpack_require__(432));

({lineSegmentsIntersect, distanceToLineSegment} = (__webpack_require__(432).helpers));

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
      var angle, angle_diff, arrow_angle, arrow_segment_position_ratio, arrow_shaft_pos, arrow_shaft_pos_local, closest_distance, closest_point_in_hit_space, closest_point_local, closest_segment, coefficient_of_friction, coefficient_of_restitution, constraint, delta_length, delta_x, delta_y, diff, dist, drag_force_x, drag_force_y, facing_angle_of_incidence, heading_angle, heading_angle_of_incidence, held, hit, hit_entity, hit_entity_id, hit_segment, hit_segment_angle, hit_segment_name, hit_segment_pos, hit_segment_position_ratio, i, incident_speed, incident_speed_global_scale, j, k, l, len, len1, len2, len3, len4, m, new_vx, new_vy, nock, nock_relative, nock_vx, nock_vy, normal, original_pos, other_point, p1, p2, p3, p4, point, point_in_hit_space, pos_diff, ref, ref1, ref2, ref3, ref4, ref5, ref6, relative_angle, rot_matrix, rot_matrix1, rot_matrix2, rotated_vx, rotated_vy, segment, segment_name, speed, surface_angle, tip, tip_relative, vx, vy;
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
        return entity.holding_arrow === this;
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
            normal = surface_angle + Math.PI / 2;
            vx = tip.x - tip.prev_x;
            vy = tip.y - tip.prev_y;
            heading_angle = Math.atan2(vy, vx);
            incident_speed = Math.abs(Math.cos(normal) * vx + Math.sin(normal) * vy);
            // incident_speed = Math.abs(Math.sin(-surface_angle) * vx + Math.cos(-surface_angle) * vy) # alternative
            heading_angle_of_incidence = Math.abs(Math.abs(modulo(heading_angle - surface_angle, Math.PI)) - Math.PI / 2);
            facing_angle_of_incidence = Math.abs(Math.abs(modulo(arrow_angle - surface_angle, Math.PI)) - Math.PI / 2);
            // window.debug_max_facing_angle_of_incidence = Math.max(window.debug_max_facing_angle_of_incidence ? 0, facing_angle_of_incidence) # should be Math.PI/2 on arrow test scene
            // window.debug_max_heading_angle_of_incidence = Math.max(window.debug_max_heading_angle_of_incidence ? 0, heading_angle_of_incidence) # should be Math.PI/2 on arrow test scene

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
        }
      }
      
      // Ideally I would like to allow the arrow to move while lodged,
      // and adjust the depth and angle of lodging (with some stiffness),
      // and maybe allow it to become dislodged, but it was causing numerical instability.
      if (!this.lodging_constraints.length && !held) {
        ref3 = [tip, nock];
        // Collide with the ground.
        for (k = 0, len2 = ref3.length; k < len2; k++) {
          point = ref3[k];
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
            // This is done by finding the closest point on the polygon's edges.
            closest_distance = 2e308;
            closest_segment = null;
            point_in_hit_space = hit.fromWorld(this.toWorld(point));
            ref4 = hit.structure.segments;
            for (segment_name in ref4) {
              segment = ref4[segment_name];
              dist = distanceToLineSegment(point_in_hit_space, segment.a, segment.b);
              if (dist < closest_distance) {
                closest_distance = dist;
                closest_segment = segment;
              }
            }
            if (closest_segment) {
              closest_point_in_hit_space = closestPointOnLineSegment(point_in_hit_space, closest_segment.a, closest_segment.b);
              closest_point_local = this.fromWorld(hit.toWorld(closest_point_in_hit_space));
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
            if (speed > 0) {
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
      if (!window.debug_mode) {
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

({addEntityClass} = __webpack_require__(432));

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

({addEntityClass} = __webpack_require__(432));

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

({addEntityClass} = __webpack_require__(432));

({lineSegmentsIntersect} = (__webpack_require__(432).helpers));

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

/***/ 469:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Terrain, Water, addEntityClass;

Terrain = __webpack_require__(891);

({addEntityClass} = __webpack_require__(432));

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
    }

    makeWaves(world_pos, radius = 5, velocity_y = 5) {
      var i, local_pos, ref, ref1, results, x;
      local_pos = this.fromWorld(world_pos);
      results = [];
      for (x = i = ref = Math.round(local_pos.x - radius), ref1 = Math.round(local_pos.x + radius); (ref <= ref1 ? i < ref1 : i > ref1); x = ref <= ref1 ? ++i : --i) {
        results.push(this.waves_vy[x - this.min_x] = velocity_y * (1 - Math.abs(x - local_pos.x) / radius));
      }
      return results;
    }

    step() {
      var i, j, neighboring, ref, ref1, ref2, ref3, ref4, ref5, results, x;
      neighboring = [];
      for (x = i = ref = this.min_x, ref1 = this.max_x; (ref <= ref1 ? i < ref1 : i > ref1); x = ref <= ref1 ? ++i : --i) {
        neighboring[x - this.min_x] = ((ref2 = this.waves_y[x - this.min_x - 1]) != null ? ref2 : 0) + ((ref3 = this.waves_y[x - this.min_x + 1]) != null ? ref3 : 0);
      }
      results = [];
      for (x = j = ref4 = this.min_x, ref5 = this.max_x; (ref4 <= ref5 ? j < ref5 : j > ref5); x = ref4 <= ref5 ? ++j : --j) {
        this.waves_vy[x - this.min_x] += (neighboring[x - this.min_x] - this.waves_y[x - this.min_x] * 2) * 0.4;
        this.waves_vy[x - this.min_x] *= 0.99;
        this.waves_vy[x - this.min_x] -= this.waves_y[x - this.min_x] * 0.2;
        results.push(this.waves_y[x - this.min_x] += this.waves_vy[x - this.min_x]);
      }
      return results;
    }

    draw(ctx, view) {
      var i, point, point_name, ref, ref1, ref2, wave_center_y, x;
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
      return ctx.restore();
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
var Editor, Mouse, Player, SavannaGrass, View, World, animate, bottom_of_world, canvas, ctx, e, editor, gamepad_start_prev, keyboard, mouse, redraw, terrain, view, view_smoothness, view_to, world;

Math.seedrandom("A world");

({View, Mouse, Editor} = __webpack_require__(432));

World = __webpack_require__(378);

keyboard = __webpack_require__(866);

__webpack_require__(372);

SavannaGrass = __webpack_require__(475);

__webpack_require__(91);

__webpack_require__(469);

__webpack_require__(339);

__webpack_require__(776);

__webpack_require__(33);

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

world = new World();

window.the_world = world;

terrain = new SavannaGrass();

world.entities.push(terrain);

terrain.x = 0;

terrain.y = 0;

terrain.generate();

bottom_of_world = 300;

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

redraw = function() {
  world.drawBackground(ctx, view);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(view.scale, view.scale);
  ctx.translate(-view.center_x, -view.center_y);
  world.draw(ctx, view);
  if (editor.editing) {
    editor.draw(ctx, view);
  }
  return ctx.restore();
};

window.do_a_redraw = redraw;

gamepad_start_prev = false;

(animate = function() {
  var entity, gamepad, i, j, len, len1, player, ref, ref1, ref2;
  if (window.CRASHED) {
    return;
  }
  requestAnimationFrame(animate);
  Math.seedrandom(performance.now());
  if (canvas.width !== innerWidth) {
    canvas.width = innerWidth;
  }
  if (canvas.height !== innerHeight) {
    canvas.height = innerHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ref1 = (ref = ((function() {
    try {
      return navigator.getGamepads();
    } catch (error) {}
  })())) != null ? ref : [];
  for (i = 0, len = ref1.length; i < len; i++) {
    gamepad = ref1[i];
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
  if (!editor.editing) {
    ref2 = world.entities;
    // when entity isnt editor.editing_entity and entity not in editor.dragging_entities
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      entity = ref2[j];
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
  return keyboard.resetForNextStep();
})();

})();

/******/ })()
;