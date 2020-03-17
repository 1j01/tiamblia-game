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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){(function(e){(function(){var t,r,i,o,a,s,l=[].slice;r=null!=(s=this.React)?s:n(1),a=function(e){return null!=e&&"object"==typeof e&&!(e instanceof Array||r.isValidElement(e))},i=function(e,t){var n,r,s,l,u;if(u=t.to,e instanceof Array){for(n=0,s=e.length;n<s;n++)l=e[n],i(l,{to:u});return!0}if(a(e)){for(r in e)e[r]&&u.push(o(r));return!0}return null!=e&&u.push(e),!1},o=function(e){return(""+e).replace(/_/g,"-").replace(/([a-z])([A-Z])/g,function(e,t,n){return t+"-"+n.toLowerCase()})},t=function(){var e,t,n,s,u,c,d,f,p,h,m,g,y,v,_,b,x,w,k,E,C,S;switch(y=arguments[0],t=2<=arguments.length?l.call(arguments,1):[],null==y&&(y=""),a(t[0])?(u=t[0],p=2<=t.length?l.call(t,1):[]):(p=1<=t.length?l.call(t,0):[],u=null),typeof y){case"string":for(c in k=y,y="div",w=k.replace(/^[a-z][a-z0-9\-_]*/i,function(e){return y=e,""}),v={},h=[],e=function(e,t,n){if(!1!==t||n)return v[e]=t},u)if(d=u[c],"class"===c||"className"===c||"classes"===c||"classNames"===c||"classList"===c)i(d,{to:h});else if("data"===c)for(m in d)g=d[m],e("data-"+o(m),g);else if("aria"===c)for(n in d)s=d[n],e("aria-"+o(n),s,!0);else c.match(/^data/)?e(o(c),d):c.match(/^aria/)?e(o(c),d,!0):e(c,d);if(w&&(E=w.replace(/\.([a-z][a-z0-9\-_]*)/gi,function(e,t){return h.push(t),""}).replace(/#([a-z][a-z0-9\-_]*)/gi,function(e,t){return v.id=t,""})),E)throw new Error("Unhandled selector fragment '"+E+"' in selector: '"+k+"'");h.length&&(v.className=h.join(" "));break;case"function":v=u;break;default:throw new Error("Invalid first argument to ReactScript: "+y)}for(_=[],C=!1,b=0,x=p.length;b<x;b++)f=p[b],S=i(f,{to:_}),C||(C=S);return C?r.createElement(y,v,_):r.createElement.apply(r,[y,v].concat(l.call(_)))},null!=(void 0!==e&&null!==e?e.exports:void 0)?e.exports=t:this.ReactScript=t}).call(this)}).call(this,n(18)(e))},function(e,t,n){"use strict";e.exports=n(11)},function(e,t,n){"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(10)},function(e,t,n){"use strict";var r=function(e){};e.exports=function(e,t,n,i,o,a,s,l){if(r(t),!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,i,o,a,s,l],d=0;(u=new Error(t.replace(/%s/g,function(){return c[d++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}}},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,a,s=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),l=1;l<arguments.length;l++){for(var u in n=Object(arguments[l]))i.call(n,u)&&(s[u]=n[u]);if(r){a=r(n);for(var c=0;c<a.length;c++)o.call(n,a[c])&&(s[a[c]]=n[a[c]])}}return s}},function(e,t,n){"use strict";e.exports={}},function(e,t,n){"use strict";function r(e){return function(){return e}}var i=function(){};i.thatReturns=r,i.thatReturnsFalse=r(!1),i.thatReturnsTrue=r(!0),i.thatReturnsNull=r(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(e){return e},e.exports=i},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),o=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(o).concat([i]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var r={},i=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),o=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),a=null,s=0,l=[],u=n(21);function c(e,t){for(var n=0;n<e.length;n++){var i=e[n],o=r[i.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](i.parts[a]);for(;a<i.parts.length;a++)o.parts.push(g(i.parts[a],t))}else{var s=[];for(a=0;a<i.parts.length;a++)s.push(g(i.parts[a],t));r[i.id]={id:i.id,refs:1,parts:s}}}}function d(e,t){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=t.base?o[0]+t.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function f(e,t){var n=o(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=l[l.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=o(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,i)}}function p(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function h(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),m(t,e.attrs),f(e,t),t}function m(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,r,i,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var l=s++;n=a||(a=h(t)),r=v.bind(null,n,l,!1),i=v.bind(null,n,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",m(t,e.attrs),f(e,t),t}(t),r=function(e,t,n){var r=n.css,i=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||o)&&(r=u(r));i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),i=function(){p(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),i=function(){p(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=d(e,t);return c(n,t),function(e){for(var i=[],o=0;o<n.length;o++){var a=n[o];(s=r[a.id]).refs--,i.push(s)}e&&c(d(e,t),t);for(o=0;o<i.length;o++){var s;if(0===(s=i[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete r[s.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function v(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}},function(e,t,n){e.exports=n(24)},function(e,t,n){"use strict";
/** @license React v16.4.2
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(3),i=n(1),o=n(12),a=n(4),s=n(6),l=n(13),u=n(14),c=n(15),d=n(5);function f(e){for(var t=arguments.length-1,n="https://reactjs.org/docs/error-decoder.html?invariant="+e,i=0;i<t;i++)n+="&args[]="+encodeURIComponent(arguments[i+1]);r(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",n)}i||f("227");var p={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(e,t,n,r,i,o,a,s,l){(function(e,t,n,r,i,o,a,s,l){this._hasCaughtError=!1,this._caughtError=null;var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(e){this._caughtError=e,this._hasCaughtError=!0}}).apply(p,arguments)},invokeGuardedCallbackAndCatchFirstError:function(e,t,n,r,i,o,a,s,l){if(p.invokeGuardedCallback.apply(this,arguments),p.hasCaughtError()){var u=p.clearCaughtError();p._hasRethrowError||(p._hasRethrowError=!0,p._rethrowError=u)}},rethrowCaughtError:function(){return function(){if(p._hasRethrowError){var e=p._rethrowError;throw p._rethrowError=null,p._hasRethrowError=!1,e}}.apply(p,arguments)},hasCaughtError:function(){return p._hasCaughtError},clearCaughtError:function(){if(p._hasCaughtError){var e=p._caughtError;return p._caughtError=null,p._hasCaughtError=!1,e}f("198")}};var h=null,m={};function g(){if(h)for(var e in m){var t=m[e],n=h.indexOf(e);if(-1<n||f("96",e),!v[n])for(var r in t.extractEvents||f("97",e),v[n]=t,n=t.eventTypes){var i=void 0,o=n[r],a=t,s=r;_.hasOwnProperty(s)&&f("99",s),_[s]=o;var l=o.phasedRegistrationNames;if(l){for(i in l)l.hasOwnProperty(i)&&y(l[i],a,s);i=!0}else o.registrationName?(y(o.registrationName,a,s),i=!0):i=!1;i||f("98",r,e)}}}function y(e,t,n){b[e]&&f("100",e),b[e]=t,x[e]=t.eventTypes[n].dependencies}var v=[],_={},b={},x={};function w(e){h&&f("101"),h=Array.prototype.slice.call(e),g()}function k(e){var t,n=!1;for(t in e)if(e.hasOwnProperty(t)){var r=e[t];m.hasOwnProperty(t)&&m[t]===r||(m[t]&&f("102",t),m[t]=r,n=!0)}n&&g()}var E={plugins:v,eventNameDispatchConfigs:_,registrationNameModules:b,registrationNameDependencies:x,possibleRegistrationNames:null,injectEventPluginOrder:w,injectEventPluginsByName:k},C=null,S=null,T=null;function N(e,t,n,r){t=e.type||"unknown-event",e.currentTarget=T(r),p.invokeGuardedCallbackAndCatchFirstError(t,n,void 0,e),e.currentTarget=null}function P(e,t){return null==t&&f("30"),null==e?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}function M(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}var O=null;function L(e,t){if(e){var n=e._dispatchListeners,r=e._dispatchInstances;if(Array.isArray(n))for(var i=0;i<n.length&&!e.isPropagationStopped();i++)N(e,t,n[i],r[i]);else n&&N(e,t,n,r);e._dispatchListeners=null,e._dispatchInstances=null,e.isPersistent()||e.constructor.release(e)}}function I(e){return L(e,!0)}function R(e){return L(e,!1)}var D={injectEventPluginOrder:w,injectEventPluginsByName:k};function j(e,t){var n=e.stateNode;if(!n)return null;var r=C(n);if(!r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}return e?null:(n&&"function"!=typeof n&&f("231",t,typeof n),n)}function F(e,t){null!==e&&(O=P(O,e)),e=O,O=null,e&&(M(e,t?I:R),O&&f("95"),p.rethrowCaughtError())}function U(e,t,n,r){for(var i=null,o=0;o<v.length;o++){var a=v[o];a&&(a=a.extractEvents(e,t,n,r))&&(i=P(i,a))}F(i,!1)}var z={injection:D,getListener:j,runEventsInBatch:F,runExtractedEventsInBatch:U},A=Math.random().toString(36).slice(2),B="__reactInternalInstance$"+A,W="__reactEventHandlers$"+A;function $(e){if(e[B])return e[B];for(;!e[B];){if(!e.parentNode)return null;e=e.parentNode}return 5===(e=e[B]).tag||6===e.tag?e:null}function H(e){if(5===e.tag||6===e.tag)return e.stateNode;f("33")}function V(e){return e[W]||null}var J={precacheFiberNode:function(e,t){t[B]=e},getClosestInstanceFromNode:$,getInstanceFromNode:function(e){return!(e=e[B])||5!==e.tag&&6!==e.tag?null:e},getNodeFromInstance:H,getFiberCurrentPropsFromNode:V,updateFiberProps:function(e,t){e[W]=t}};function q(e){do{e=e.return}while(e&&5!==e.tag);return e||null}function K(e,t,n){for(var r=[];e;)r.push(e),e=q(e);for(e=r.length;0<e--;)t(r[e],"captured",n);for(e=0;e<r.length;e++)t(r[e],"bubbled",n)}function Q(e,t,n){(t=j(e,n.dispatchConfig.phasedRegistrationNames[t]))&&(n._dispatchListeners=P(n._dispatchListeners,t),n._dispatchInstances=P(n._dispatchInstances,e))}function G(e){e&&e.dispatchConfig.phasedRegistrationNames&&K(e._targetInst,Q,e)}function X(e){if(e&&e.dispatchConfig.phasedRegistrationNames){var t=e._targetInst;K(t=t?q(t):null,Q,e)}}function Y(e,t,n){e&&n&&n.dispatchConfig.registrationName&&(t=j(e,n.dispatchConfig.registrationName))&&(n._dispatchListeners=P(n._dispatchListeners,t),n._dispatchInstances=P(n._dispatchInstances,e))}function Z(e){e&&e.dispatchConfig.registrationName&&Y(e._targetInst,null,e)}function ee(e){M(e,G)}function te(e,t,n,r){if(n&&r)e:{for(var i=n,o=r,a=0,s=i;s;s=q(s))a++;s=0;for(var l=o;l;l=q(l))s++;for(;0<a-s;)i=q(i),a--;for(;0<s-a;)o=q(o),s--;for(;a--;){if(i===o||i===o.alternate)break e;i=q(i),o=q(o)}i=null}else i=null;for(o=i,i=[];n&&n!==o&&(null===(a=n.alternate)||a!==o);)i.push(n),n=q(n);for(n=[];r&&r!==o&&(null===(a=r.alternate)||a!==o);)n.push(r),r=q(r);for(r=0;r<i.length;r++)Y(i[r],"bubbled",e);for(e=n.length;0<e--;)Y(n[e],"captured",t)}var ne={accumulateTwoPhaseDispatches:ee,accumulateTwoPhaseDispatchesSkipTarget:function(e){M(e,X)},accumulateEnterLeaveDispatches:te,accumulateDirectDispatches:function(e){M(e,Z)}};function re(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n["ms"+e]="MS"+t,n["O"+e]="o"+t.toLowerCase(),n}var ie={animationend:re("Animation","AnimationEnd"),animationiteration:re("Animation","AnimationIteration"),animationstart:re("Animation","AnimationStart"),transitionend:re("Transition","TransitionEnd")},oe={},ae={};function se(e){if(oe[e])return oe[e];if(!ie[e])return e;var t,n=ie[e];for(t in n)if(n.hasOwnProperty(t)&&t in ae)return oe[e]=n[t];return e}o.canUseDOM&&(ae=document.createElement("div").style,"AnimationEvent"in window||(delete ie.animationend.animation,delete ie.animationiteration.animation,delete ie.animationstart.animation),"TransitionEvent"in window||delete ie.transitionend.transition);var le=se("animationend"),ue=se("animationiteration"),ce=se("animationstart"),de=se("transitionend"),fe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pe=null;function he(){return!pe&&o.canUseDOM&&(pe="textContent"in document.documentElement?"textContent":"innerText"),pe}var me={_root:null,_startText:null,_fallbackText:null};function ge(){if(me._fallbackText)return me._fallbackText;var e,t,n=me._startText,r=n.length,i=ye(),o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===i[o-t];t++);return me._fallbackText=i.slice(e,1<t?1-t:void 0),me._fallbackText}function ye(){return"value"in me._root?me._root.value:me._root[he()]}var ve="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),_e={type:null,target:null,currentTarget:s.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};function be(e,t,n,r){for(var i in this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=n,e=this.constructor.Interface)e.hasOwnProperty(i)&&((t=e[i])?this[i]=t(n):"target"===i?this.target=r:this[i]=n[i]);return this.isDefaultPrevented=(null!=n.defaultPrevented?n.defaultPrevented:!1===n.returnValue)?s.thatReturnsTrue:s.thatReturnsFalse,this.isPropagationStopped=s.thatReturnsFalse,this}function xe(e,t,n,r){if(this.eventPool.length){var i=this.eventPool.pop();return this.call(i,e,t,n,r),i}return new this(e,t,n,r)}function we(e){e instanceof this||f("223"),e.destructor(),10>this.eventPool.length&&this.eventPool.push(e)}function ke(e){e.eventPool=[],e.getPooled=xe,e.release=we}a(be.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=s.thatReturnsTrue)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=s.thatReturnsTrue)},persist:function(){this.isPersistent=s.thatReturnsTrue},isPersistent:s.thatReturnsFalse,destructor:function(){var e,t=this.constructor.Interface;for(e in t)this[e]=null;for(t=0;t<ve.length;t++)this[ve[t]]=null}}),be.Interface=_e,be.extend=function(e){function t(){}function n(){return r.apply(this,arguments)}var r=this;t.prototype=r.prototype;var i=new t;return a(i,n.prototype),n.prototype=i,n.prototype.constructor=n,n.Interface=a({},r.Interface,e),n.extend=r.extend,ke(n),n},ke(be);var Ee=be.extend({data:null}),Ce=be.extend({data:null}),Se=[9,13,27,32],Te=o.canUseDOM&&"CompositionEvent"in window,Ne=null;o.canUseDOM&&"documentMode"in document&&(Ne=document.documentMode);var Pe=o.canUseDOM&&"TextEvent"in window&&!Ne,Me=o.canUseDOM&&(!Te||Ne&&8<Ne&&11>=Ne),Oe=String.fromCharCode(32),Le={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Ie=!1;function Re(e,t){switch(e){case"keyup":return-1!==Se.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"blur":return!0;default:return!1}}function De(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var je=!1;var Fe={eventTypes:Le,extractEvents:function(e,t,n,r){var i=void 0,o=void 0;if(Te)e:{switch(e){case"compositionstart":i=Le.compositionStart;break e;case"compositionend":i=Le.compositionEnd;break e;case"compositionupdate":i=Le.compositionUpdate;break e}i=void 0}else je?Re(e,n)&&(i=Le.compositionEnd):"keydown"===e&&229===n.keyCode&&(i=Le.compositionStart);return i?(Me&&(je||i!==Le.compositionStart?i===Le.compositionEnd&&je&&(o=ge()):(me._root=r,me._startText=ye(),je=!0)),i=Ee.getPooled(i,t,n,r),o?i.data=o:null!==(o=De(n))&&(i.data=o),ee(i),o=i):o=null,(e=Pe?function(e,t){switch(e){case"compositionend":return De(t);case"keypress":return 32!==t.which?null:(Ie=!0,Oe);case"textInput":return(e=t.data)===Oe&&Ie?null:e;default:return null}}(e,n):function(e,t){if(je)return"compositionend"===e||!Te&&Re(e,t)?(e=ge(),me._root=null,me._startText=null,me._fallbackText=null,je=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Me?null:t.data;default:return null}}(e,n))?((t=Ce.getPooled(Le.beforeInput,t,n,r)).data=e,ee(t)):t=null,null===o?t:null===t?o:[o,t]}},Ue=null,ze={injectFiberControlledHostComponent:function(e){Ue=e}},Ae=null,Be=null;function We(e){if(e=S(e)){Ue&&"function"==typeof Ue.restoreControlledState||f("194");var t=C(e.stateNode);Ue.restoreControlledState(e.stateNode,e.type,t)}}function $e(e){Ae?Be?Be.push(e):Be=[e]:Ae=e}function He(){return null!==Ae||null!==Be}function Ve(){if(Ae){var e=Ae,t=Be;if(Be=Ae=null,We(e),t)for(e=0;e<t.length;e++)We(t[e])}}var Je={injection:ze,enqueueStateRestore:$e,needsStateRestore:He,restoreStateIfNeeded:Ve};function qe(e,t){return e(t)}function Ke(e,t,n){return e(t,n)}function Qe(){}var Ge=!1;function Xe(e,t){if(Ge)return e(t);Ge=!0;try{return qe(e,t)}finally{Ge=!1,He()&&(Qe(),Ve())}}var Ye={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ze(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Ye[e.type]:"textarea"===t}function et(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function tt(e,t){return!(!o.canUseDOM||t&&!("addEventListener"in document))&&((t=(e="on"+e)in document)||((t=document.createElement("div")).setAttribute(e,"return;"),t="function"==typeof t[e]),t)}function nt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function rt(e){e._valueTracker||(e._valueTracker=function(e){var t=nt(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function it(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=nt(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}var ot=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,at="function"==typeof Symbol&&Symbol.for,st=at?Symbol.for("react.element"):60103,lt=at?Symbol.for("react.portal"):60106,ut=at?Symbol.for("react.fragment"):60107,ct=at?Symbol.for("react.strict_mode"):60108,dt=at?Symbol.for("react.profiler"):60114,ft=at?Symbol.for("react.provider"):60109,pt=at?Symbol.for("react.context"):60110,ht=at?Symbol.for("react.async_mode"):60111,mt=at?Symbol.for("react.forward_ref"):60112,gt=at?Symbol.for("react.timeout"):60113,yt="function"==typeof Symbol&&Symbol.iterator;function vt(e){return null===e||void 0===e?null:"function"==typeof(e=yt&&e[yt]||e["@@iterator"])?e:null}function _t(e){var t=e.type;if("function"==typeof t)return t.displayName||t.name;if("string"==typeof t)return t;switch(t){case ht:return"AsyncMode";case pt:return"Context.Consumer";case ut:return"ReactFragment";case lt:return"ReactPortal";case dt:return"Profiler("+e.pendingProps.id+")";case ft:return"Context.Provider";case ct:return"StrictMode";case gt:return"Timeout"}if("object"==typeof t&&null!==t)switch(t.$$typeof){case mt:return""!==(e=t.render.displayName||t.render.name||"")?"ForwardRef("+e+")":"ForwardRef"}return null}function bt(e){var t="";do{e:switch(e.tag){case 0:case 1:case 2:case 5:var n=e._debugOwner,r=e._debugSource,i=_t(e),o=null;n&&(o=_t(n)),n=r,i="\n    in "+(i||"Unknown")+(n?" (at "+n.fileName.replace(/^.*[\\\/]/,"")+":"+n.lineNumber+")":o?" (created by "+o+")":"");break e;default:i=""}t+=i,e=e.return}while(e);return t}var xt=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,wt=Object.prototype.hasOwnProperty,kt={},Et={};function Ct(e,t,n,r,i){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t}var St={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){St[e]=new Ct(e,0,!1,e,null)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];St[t]=new Ct(t,1,!1,e[1],null)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){St[e]=new Ct(e,2,!1,e.toLowerCase(),null)}),["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(e){St[e]=new Ct(e,2,!1,e,null)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){St[e]=new Ct(e,3,!1,e.toLowerCase(),null)}),["checked","multiple","muted","selected"].forEach(function(e){St[e]=new Ct(e,3,!0,e.toLowerCase(),null)}),["capture","download"].forEach(function(e){St[e]=new Ct(e,4,!1,e.toLowerCase(),null)}),["cols","rows","size","span"].forEach(function(e){St[e]=new Ct(e,6,!1,e.toLowerCase(),null)}),["rowSpan","start"].forEach(function(e){St[e]=new Ct(e,5,!1,e.toLowerCase(),null)});var Tt=/[\-:]([a-z])/g;function Nt(e){return e[1].toUpperCase()}function Pt(e,t,n,r){var i=St.hasOwnProperty(t)?St[t]:null;(null!==i?0===i.type:!r&&(2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1])))||(function(e,t,n,r){if(null===t||void 0===t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!wt.call(Et,e)||!wt.call(kt,e)&&(xt.test(e)?Et[e]=!0:(kt[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}function Mt(e,t){var n=t.checked;return a({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Ot(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=jt(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function Lt(e,t){null!=(t=t.checked)&&Pt(e,"checked",t,!1)}function It(e,t){Lt(e,t);var n=jt(t.value);null!=n&&("number"===t.type?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n)),t.hasOwnProperty("value")?Dt(e,t.type,n):t.hasOwnProperty("defaultValue")&&Dt(e,t.type,jt(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function Rt(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){t=""+e._wrapperState.initialValue;var r=e.value;n||t===r||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!e.defaultChecked,e.defaultChecked=!e.defaultChecked,""!==n&&(e.name=n)}function Dt(e,t,n){"number"===t&&e.ownerDocument.activeElement===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function jt(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Tt,Nt);St[t]=new Ct(t,1,!1,e,null)}),"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Tt,Nt);St[t]=new Ct(t,1,!1,e,"http://www.w3.org/1999/xlink")}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Tt,Nt);St[t]=new Ct(t,1,!1,e,"http://www.w3.org/XML/1998/namespace")}),St.tabIndex=new Ct("tabIndex",1,!1,"tabindex",null);var Ft={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Ut(e,t,n){return(e=be.getPooled(Ft.change,e,t,n)).type="change",$e(n),ee(e),e}var zt=null,At=null;function Bt(e){F(e,!1)}function Wt(e){if(it(H(e)))return e}function $t(e,t){if("change"===e)return t}var Ht=!1;function Vt(){zt&&(zt.detachEvent("onpropertychange",Jt),At=zt=null)}function Jt(e){"value"===e.propertyName&&Wt(At)&&Xe(Bt,e=Ut(At,e,et(e)))}function qt(e,t,n){"focus"===e?(Vt(),At=n,(zt=t).attachEvent("onpropertychange",Jt)):"blur"===e&&Vt()}function Kt(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Wt(At)}function Qt(e,t){if("click"===e)return Wt(t)}function Gt(e,t){if("input"===e||"change"===e)return Wt(t)}o.canUseDOM&&(Ht=tt("input")&&(!document.documentMode||9<document.documentMode));var Xt={eventTypes:Ft,_isInputEventSupported:Ht,extractEvents:function(e,t,n,r){var i=t?H(t):window,o=void 0,a=void 0,s=i.nodeName&&i.nodeName.toLowerCase();if("select"===s||"input"===s&&"file"===i.type?o=$t:Ze(i)?Ht?o=Gt:(o=Kt,a=qt):(s=i.nodeName)&&"input"===s.toLowerCase()&&("checkbox"===i.type||"radio"===i.type)&&(o=Qt),o&&(o=o(e,t)))return Ut(o,n,r);a&&a(e,i,t),"blur"===e&&(e=i._wrapperState)&&e.controlled&&"number"===i.type&&Dt(i,"number",i.value)}},Yt=be.extend({view:null,detail:null}),Zt={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function en(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=Zt[e])&&!!t[e]}function tn(){return en}var nn=Yt.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:tn,button:null,buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)}}),rn=nn.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null}),on={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},an={eventTypes:on,extractEvents:function(e,t,n,r){var i="mouseover"===e||"pointerover"===e,o="mouseout"===e||"pointerout"===e;if(i&&(n.relatedTarget||n.fromElement)||!o&&!i)return null;if(i=r.window===r?r:(i=r.ownerDocument)?i.defaultView||i.parentWindow:window,o?(o=t,t=(t=n.relatedTarget||n.toElement)?$(t):null):o=null,o===t)return null;var a=void 0,s=void 0,l=void 0,u=void 0;return"mouseout"===e||"mouseover"===e?(a=nn,s=on.mouseLeave,l=on.mouseEnter,u="mouse"):"pointerout"!==e&&"pointerover"!==e||(a=rn,s=on.pointerLeave,l=on.pointerEnter,u="pointer"),e=null==o?i:H(o),i=null==t?i:H(t),(s=a.getPooled(s,o,n,r)).type=u+"leave",s.target=e,s.relatedTarget=i,(n=a.getPooled(l,t,n,r)).type=u+"enter",n.target=i,n.relatedTarget=e,te(s,n,o,t),[s,n]}};function sn(e){var t=e;if(e.alternate)for(;t.return;)t=t.return;else{if(0!=(2&t.effectTag))return 1;for(;t.return;)if(0!=(2&(t=t.return).effectTag))return 1}return 3===t.tag?2:3}function ln(e){2!==sn(e)&&f("188")}function un(e){var t=e.alternate;if(!t)return 3===(t=sn(e))&&f("188"),1===t?null:e;for(var n=e,r=t;;){var i=n.return,o=i?i.alternate:null;if(!i||!o)break;if(i.child===o.child){for(var a=i.child;a;){if(a===n)return ln(i),e;if(a===r)return ln(i),t;a=a.sibling}f("188")}if(n.return!==r.return)n=i,r=o;else{a=!1;for(var s=i.child;s;){if(s===n){a=!0,n=i,r=o;break}if(s===r){a=!0,r=i,n=o;break}s=s.sibling}if(!a){for(s=o.child;s;){if(s===n){a=!0,n=o,r=i;break}if(s===r){a=!0,r=o,n=i;break}s=s.sibling}a||f("189")}}n.alternate!==r&&f("190")}return 3!==n.tag&&f("188"),n.stateNode.current===n?e:t}function cn(e){if(!(e=un(e)))return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}var dn=be.extend({animationName:null,elapsedTime:null,pseudoElement:null}),fn=be.extend({clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),pn=Yt.extend({relatedTarget:null});function hn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}var mn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},yn=Yt.extend({key:function(e){if(e.key){var t=mn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=hn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?gn[e.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:tn,charCode:function(e){return"keypress"===e.type?hn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?hn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),vn=nn.extend({dataTransfer:null}),_n=Yt.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:tn}),bn=be.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),xn=nn.extend({deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null}),wn=[["abort","abort"],[le,"animationEnd"],[ue,"animationIteration"],[ce,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[de,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],kn={},En={};function Cn(e,t){var n=e[0],r="on"+((e=e[1])[0].toUpperCase()+e.slice(1));t={phasedRegistrationNames:{bubbled:r,captured:r+"Capture"},dependencies:[n],isInteractive:t},kn[e]=t,En[n]=t}[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(e){Cn(e,!0)}),wn.forEach(function(e){Cn(e,!1)});var Sn={eventTypes:kn,isInteractiveTopLevelEventType:function(e){return void 0!==(e=En[e])&&!0===e.isInteractive},extractEvents:function(e,t,n,r){var i=En[e];if(!i)return null;switch(e){case"keypress":if(0===hn(n))return null;case"keydown":case"keyup":e=yn;break;case"blur":case"focus":e=pn;break;case"click":if(2===n.button)return null;case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":e=nn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":e=vn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":e=_n;break;case le:case ue:case ce:e=dn;break;case de:e=bn;break;case"scroll":e=Yt;break;case"wheel":e=xn;break;case"copy":case"cut":case"paste":e=fn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":e=rn;break;default:e=be}return ee(t=e.getPooled(i,t,n,r)),t}},Tn=Sn.isInteractiveTopLevelEventType,Nn=[];function Pn(e){var t=e.targetInst;do{if(!t){e.ancestors.push(t);break}var n;for(n=t;n.return;)n=n.return;if(!(n=3!==n.tag?null:n.stateNode.containerInfo))break;e.ancestors.push(t),t=$(n)}while(t);for(n=0;n<e.ancestors.length;n++)t=e.ancestors[n],U(e.topLevelType,t,e.nativeEvent,et(e.nativeEvent))}var Mn=!0;function On(e){Mn=!!e}function Ln(e,t){if(!t)return null;var n=(Tn(e)?Rn:Dn).bind(null,e);t.addEventListener(e,n,!1)}function In(e,t){if(!t)return null;var n=(Tn(e)?Rn:Dn).bind(null,e);t.addEventListener(e,n,!0)}function Rn(e,t){Ke(Dn,e,t)}function Dn(e,t){if(Mn){var n=et(t);if(null===(n=$(n))||"number"!=typeof n.tag||2===sn(n)||(n=null),Nn.length){var r=Nn.pop();r.topLevelType=e,r.nativeEvent=t,r.targetInst=n,e=r}else e={topLevelType:e,nativeEvent:t,targetInst:n,ancestors:[]};try{Xe(Pn,e)}finally{e.topLevelType=null,e.nativeEvent=null,e.targetInst=null,e.ancestors.length=0,10>Nn.length&&Nn.push(e)}}}var jn={get _enabled(){return Mn},setEnabled:On,isEnabled:function(){return Mn},trapBubbledEvent:Ln,trapCapturedEvent:In,dispatchEvent:Dn},Fn={},Un=0,zn="_reactListenersID"+(""+Math.random()).slice(2);function An(e){return Object.prototype.hasOwnProperty.call(e,zn)||(e[zn]=Un++,Fn[e[zn]]={}),Fn[e[zn]]}function Bn(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Wn(e,t){var n,r=Bn(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Bn(r)}}function $n(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var Hn=o.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Vn={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Jn=null,qn=null,Kn=null,Qn=!1;function Gn(e,t){if(Qn||null==Jn||Jn!==l())return null;var n=Jn;return"selectionStart"in n&&$n(n)?n={start:n.selectionStart,end:n.selectionEnd}:window.getSelection?n={anchorNode:(n=window.getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}:n=void 0,Kn&&u(Kn,n)?null:(Kn=n,(e=be.getPooled(Vn.select,qn,e,t)).type="select",e.target=Jn,ee(e),e)}var Xn={eventTypes:Vn,extractEvents:function(e,t,n,r){var i,o=r.window===r?r.document:9===r.nodeType?r:r.ownerDocument;if(!(i=!o)){e:{o=An(o),i=x.onSelect;for(var a=0;a<i.length;a++){var s=i[a];if(!o.hasOwnProperty(s)||!o[s]){o=!1;break e}}o=!0}i=!o}if(i)return null;switch(o=t?H(t):window,e){case"focus":(Ze(o)||"true"===o.contentEditable)&&(Jn=o,qn=t,Kn=null);break;case"blur":Kn=qn=Jn=null;break;case"mousedown":Qn=!0;break;case"contextmenu":case"mouseup":return Qn=!1,Gn(n,r);case"selectionchange":if(Hn)break;case"keydown":case"keyup":return Gn(n,r)}return null}};D.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")),C=J.getFiberCurrentPropsFromNode,S=J.getInstanceFromNode,T=J.getNodeFromInstance,D.injectEventPluginsByName({SimpleEventPlugin:Sn,EnterLeaveEventPlugin:an,ChangeEventPlugin:Xt,SelectEventPlugin:Xn,BeforeInputEventPlugin:Fe});var Yn="function"==typeof requestAnimationFrame?requestAnimationFrame:void 0,Zn=Date,er=setTimeout,tr=clearTimeout,nr=void 0;if("object"==typeof performance&&"function"==typeof performance.now){var rr=performance;nr=function(){return rr.now()}}else nr=function(){return Zn.now()};var ir=void 0,or=void 0;if(o.canUseDOM){var ar="function"==typeof Yn?Yn:function(){f("276")},sr=null,lr=null,ur=-1,cr=!1,dr=!1,fr=0,pr=33,hr=33,mr={didTimeout:!1,timeRemaining:function(){var e=fr-nr();return 0<e?e:0}},gr=function(e,t){var n=e.scheduledCallback,r=!1;try{n(t),r=!0}finally{or(e),r||(cr=!0,window.postMessage(yr,"*"))}},yr="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(e){if(e.source===window&&e.data===yr&&(cr=!1,null!==sr)){if(null!==sr){var t=nr();if(!(-1===ur||ur>t)){e=-1;for(var n=[],r=sr;null!==r;){var i=r.timeoutTime;-1!==i&&i<=t?n.push(r):-1!==i&&(-1===e||i<e)&&(e=i),r=r.next}if(0<n.length)for(mr.didTimeout=!0,t=0,r=n.length;t<r;t++)gr(n[t],mr);ur=e}}for(e=nr();0<fr-e&&null!==sr;)e=sr,mr.didTimeout=!1,gr(e,mr),e=nr();null===sr||dr||(dr=!0,ar(vr))}},!1);var vr=function(e){dr=!1;var t=e-fr+hr;t<hr&&pr<hr?(8>t&&(t=8),hr=t<pr?pr:t):pr=t,fr=e+hr,cr||(cr=!0,window.postMessage(yr,"*"))};ir=function(e,t){var n=-1;return null!=t&&"number"==typeof t.timeout&&(n=nr()+t.timeout),(-1===ur||-1!==n&&n<ur)&&(ur=n),e={scheduledCallback:e,timeoutTime:n,prev:null,next:null},null===sr?sr=e:null!==(t=e.prev=lr)&&(t.next=e),lr=e,dr||(dr=!0,ar(vr)),e},or=function(e){if(null!==e.prev||sr===e){var t=e.next,n=e.prev;e.next=null,e.prev=null,null!==t?null!==n?(n.next=t,t.prev=n):(t.prev=null,sr=t):null!==n?(n.next=null,lr=n):lr=sr=null}}}else{var _r=new Map;ir=function(e){var t={scheduledCallback:e,timeoutTime:0,next:null,prev:null},n=er(function(){e({timeRemaining:function(){return 1/0},didTimeout:!1})});return _r.set(e,n),t},or=function(e){var t=_r.get(e.scheduledCallback);_r.delete(e),tr(t)}}function br(e,t){return e=a({children:void 0},t),(t=function(e){var t="";return i.Children.forEach(e,function(e){null==e||"string"!=typeof e&&"number"!=typeof e||(t+=e)}),t}(t.children))&&(e.children=t),e}function xr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+n,t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function wr(e,t){var n=t.value;e._wrapperState={initialValue:null!=n?n:t.defaultValue,wasMultiple:!!t.multiple}}function kr(e,t){return null!=t.dangerouslySetInnerHTML&&f("91"),a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Er(e,t){var n=t.value;null==n&&(n=t.defaultValue,null!=(t=t.children)&&(null!=n&&f("92"),Array.isArray(t)&&(1>=t.length||f("93"),t=t[0]),n=""+t),null==n&&(n="")),e._wrapperState={initialValue:""+n}}function Cr(e,t){var n=t.value;null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&(e.defaultValue=n)),null!=t.defaultValue&&(e.defaultValue=t.defaultValue)}function Sr(e){var t=e.textContent;t===e._wrapperState.initialValue&&(e.value=t)}var Tr={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function Nr(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pr(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?Nr(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var Mr=void 0,Or=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n)})}:e}(function(e,t){if(e.namespaceURI!==Tr.svg||"innerHTML"in e)e.innerHTML=t;else{for((Mr=Mr||document.createElement("div")).innerHTML="<svg>"+t+"</svg>",t=Mr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Lr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var Ir={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Rr=["Webkit","ms","Moz","O"];function Dr(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=n,o=t[n];i=null==o||"boolean"==typeof o||""===o?"":r||"number"!=typeof o||0===o||Ir.hasOwnProperty(i)&&Ir[i]?(""+o).trim():o+"px","float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(Ir).forEach(function(e){Rr.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ir[t]=Ir[e]})});var jr=a({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fr(e,t,n){t&&(jr[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML)&&f("137",e,n()),null!=t.dangerouslySetInnerHTML&&(null!=t.children&&f("60"),"object"==typeof t.dangerouslySetInnerHTML&&"__html"in t.dangerouslySetInnerHTML||f("61")),null!=t.style&&"object"!=typeof t.style&&f("62",n()))}function Ur(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zr=s.thatReturns("");function Ar(e,t){var n=An(e=9===e.nodeType||11===e.nodeType?e:e.ownerDocument);t=x[t];for(var r=0;r<t.length;r++){var i=t[r];if(!n.hasOwnProperty(i)||!n[i]){switch(i){case"scroll":In("scroll",e);break;case"focus":case"blur":In("focus",e),In("blur",e),n.blur=!0,n.focus=!0;break;case"cancel":case"close":tt(i,!0)&&In(i,e);break;case"invalid":case"submit":case"reset":break;default:-1===fe.indexOf(i)&&Ln(i,e)}n[i]=!0}}}function Br(e,t,n,r){return n=9===n.nodeType?n:n.ownerDocument,r===Tr.html&&(r=Nr(e)),r===Tr.html?"script"===e?((e=n.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):e="string"==typeof t.is?n.createElement(e,{is:t.is}):n.createElement(e):e=n.createElementNS(r,e),e}function Wr(e,t){return(9===t.nodeType?t:t.ownerDocument).createTextNode(e)}function $r(e,t,n,r){var i=Ur(t,n);switch(t){case"iframe":case"object":Ln("load",e);var o=n;break;case"video":case"audio":for(o=0;o<fe.length;o++)Ln(fe[o],e);o=n;break;case"source":Ln("error",e),o=n;break;case"img":case"image":case"link":Ln("error",e),Ln("load",e),o=n;break;case"form":Ln("reset",e),Ln("submit",e),o=n;break;case"details":Ln("toggle",e),o=n;break;case"input":Ot(e,n),o=Mt(e,n),Ln("invalid",e),Ar(r,"onChange");break;case"option":o=br(e,n);break;case"select":wr(e,n),o=a({},n,{value:void 0}),Ln("invalid",e),Ar(r,"onChange");break;case"textarea":Er(e,n),o=kr(e,n),Ln("invalid",e),Ar(r,"onChange");break;default:o=n}Fr(t,o,zr);var l,u=o;for(l in u)if(u.hasOwnProperty(l)){var c=u[l];"style"===l?Dr(e,c):"dangerouslySetInnerHTML"===l?null!=(c=c?c.__html:void 0)&&Or(e,c):"children"===l?"string"==typeof c?("textarea"!==t||""!==c)&&Lr(e,c):"number"==typeof c&&Lr(e,""+c):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(b.hasOwnProperty(l)?null!=c&&Ar(r,l):null!=c&&Pt(e,l,c,i))}switch(t){case"input":rt(e),Rt(e,n,!1);break;case"textarea":rt(e),Sr(e);break;case"option":null!=n.value&&e.setAttribute("value",n.value);break;case"select":e.multiple=!!n.multiple,null!=(t=n.value)?xr(e,!!n.multiple,t,!1):null!=n.defaultValue&&xr(e,!!n.multiple,n.defaultValue,!0);break;default:"function"==typeof o.onClick&&(e.onclick=s)}}function Hr(e,t,n,r,i){var o=null;switch(t){case"input":n=Mt(e,n),r=Mt(e,r),o=[];break;case"option":n=br(e,n),r=br(e,r),o=[];break;case"select":n=a({},n,{value:void 0}),r=a({},r,{value:void 0}),o=[];break;case"textarea":n=kr(e,n),r=kr(e,r),o=[];break;default:"function"!=typeof n.onClick&&"function"==typeof r.onClick&&(e.onclick=s)}Fr(t,r,zr),t=e=void 0;var l=null;for(e in n)if(!r.hasOwnProperty(e)&&n.hasOwnProperty(e)&&null!=n[e])if("style"===e){var u=n[e];for(t in u)u.hasOwnProperty(t)&&(l||(l={}),l[t]="")}else"dangerouslySetInnerHTML"!==e&&"children"!==e&&"suppressContentEditableWarning"!==e&&"suppressHydrationWarning"!==e&&"autoFocus"!==e&&(b.hasOwnProperty(e)?o||(o=[]):(o=o||[]).push(e,null));for(e in r){var c=r[e];if(u=null!=n?n[e]:void 0,r.hasOwnProperty(e)&&c!==u&&(null!=c||null!=u))if("style"===e)if(u){for(t in u)!u.hasOwnProperty(t)||c&&c.hasOwnProperty(t)||(l||(l={}),l[t]="");for(t in c)c.hasOwnProperty(t)&&u[t]!==c[t]&&(l||(l={}),l[t]=c[t])}else l||(o||(o=[]),o.push(e,l)),l=c;else"dangerouslySetInnerHTML"===e?(c=c?c.__html:void 0,u=u?u.__html:void 0,null!=c&&u!==c&&(o=o||[]).push(e,""+c)):"children"===e?u===c||"string"!=typeof c&&"number"!=typeof c||(o=o||[]).push(e,""+c):"suppressContentEditableWarning"!==e&&"suppressHydrationWarning"!==e&&(b.hasOwnProperty(e)?(null!=c&&Ar(i,e),o||u===c||(o=[])):(o=o||[]).push(e,c))}return l&&(o=o||[]).push("style",l),o}function Vr(e,t,n,r,i){"input"===n&&"radio"===i.type&&null!=i.name&&Lt(e,i),Ur(n,r),r=Ur(n,i);for(var o=0;o<t.length;o+=2){var a=t[o],s=t[o+1];"style"===a?Dr(e,s):"dangerouslySetInnerHTML"===a?Or(e,s):"children"===a?Lr(e,s):Pt(e,a,s,r)}switch(n){case"input":It(e,i);break;case"textarea":Cr(e,i);break;case"select":e._wrapperState.initialValue=void 0,t=e._wrapperState.wasMultiple,e._wrapperState.wasMultiple=!!i.multiple,null!=(n=i.value)?xr(e,!!i.multiple,n,!1):t!==!!i.multiple&&(null!=i.defaultValue?xr(e,!!i.multiple,i.defaultValue,!0):xr(e,!!i.multiple,i.multiple?[]:"",!1))}}function Jr(e,t,n,r,i){switch(t){case"iframe":case"object":Ln("load",e);break;case"video":case"audio":for(r=0;r<fe.length;r++)Ln(fe[r],e);break;case"source":Ln("error",e);break;case"img":case"image":case"link":Ln("error",e),Ln("load",e);break;case"form":Ln("reset",e),Ln("submit",e);break;case"details":Ln("toggle",e);break;case"input":Ot(e,n),Ln("invalid",e),Ar(i,"onChange");break;case"select":wr(e,n),Ln("invalid",e),Ar(i,"onChange");break;case"textarea":Er(e,n),Ln("invalid",e),Ar(i,"onChange")}for(var o in Fr(t,n,zr),r=null,n)if(n.hasOwnProperty(o)){var a=n[o];"children"===o?"string"==typeof a?e.textContent!==a&&(r=["children",a]):"number"==typeof a&&e.textContent!==""+a&&(r=["children",""+a]):b.hasOwnProperty(o)&&null!=a&&Ar(i,o)}switch(t){case"input":rt(e),Rt(e,n,!0);break;case"textarea":rt(e),Sr(e);break;case"select":case"option":break;default:"function"==typeof n.onClick&&(e.onclick=s)}return r}function qr(e,t){return e.nodeValue!==t}var Kr={createElement:Br,createTextNode:Wr,setInitialProperties:$r,diffProperties:Hr,updateProperties:Vr,diffHydratedProperties:Jr,diffHydratedText:qr,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(e,t,n){switch(t){case"input":if(It(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=V(r);i||f("90"),it(r),It(r,i)}}}break;case"textarea":Cr(e,n);break;case"select":null!=(t=n.value)&&xr(e,!!n.multiple,t,!1)}}},Qr=null,Gr=null;function Xr(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Yr(e,t){return"textarea"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&"string"==typeof t.dangerouslySetInnerHTML.__html}var Zr=nr,ei=ir,ti=or;function ni(e){for(e=e.nextSibling;e&&1!==e.nodeType&&3!==e.nodeType;)e=e.nextSibling;return e}function ri(e){for(e=e.firstChild;e&&1!==e.nodeType&&3!==e.nodeType;)e=e.nextSibling;return e}new Set;var ii=[],oi=-1;function ai(e){return{current:e}}function si(e){0>oi||(e.current=ii[oi],ii[oi]=null,oi--)}function li(e,t){ii[++oi]=e.current,e.current=t}var ui=ai(d),ci=ai(!1),di=d;function fi(e){return hi(e)?di:ui.current}function pi(e,t){var n=e.type.contextTypes;if(!n)return d;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,o={};for(i in n)o[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function hi(e){return 2===e.tag&&null!=e.type.childContextTypes}function mi(e){hi(e)&&(si(ci),si(ui))}function gi(e){si(ci),si(ui)}function yi(e,t,n){ui.current!==d&&f("168"),li(ui,t),li(ci,n)}function vi(e,t){var n=e.stateNode,r=e.type.childContextTypes;if("function"!=typeof n.getChildContext)return t;for(var i in n=n.getChildContext())i in r||f("108",_t(e)||"Unknown",i);return a({},t,n)}function _i(e){if(!hi(e))return!1;var t=e.stateNode;return t=t&&t.__reactInternalMemoizedMergedChildContext||d,di=ui.current,li(ui,t),li(ci,ci.current),!0}function bi(e,t){var n=e.stateNode;if(n||f("169"),t){var r=vi(e,di);n.__reactInternalMemoizedMergedChildContext=r,si(ci),si(ui),li(ui,r)}else si(ci);li(ci,t)}function xi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.effectTag=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.expirationTime=0,this.alternate=null}function wi(e,t,n){var r=e.alternate;return null===r?((r=new xi(e.tag,t,e.key,e.mode)).type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.effectTag=0,r.nextEffect=null,r.firstEffect=null,r.lastEffect=null),r.expirationTime=n,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function ki(e,t,n){var r=e.type,i=e.key;if(e=e.props,"function"==typeof r)var o=r.prototype&&r.prototype.isReactComponent?2:0;else if("string"==typeof r)o=5;else switch(r){case ut:return Ei(e.children,t,n,i);case ht:o=11,t|=3;break;case ct:o=11,t|=2;break;case dt:return(r=new xi(15,e,i,4|t)).type=dt,r.expirationTime=n,r;case gt:o=16,t|=2;break;default:e:{switch("object"==typeof r&&null!==r?r.$$typeof:null){case ft:o=13;break e;case pt:o=12;break e;case mt:o=14;break e;default:f("130",null==r?r:typeof r,"")}o=void 0}}return(t=new xi(o,e,i,t)).type=r,t.expirationTime=n,t}function Ei(e,t,n,r){return(e=new xi(10,e,r,t)).expirationTime=n,e}function Ci(e,t,n){return(e=new xi(6,e,null,t)).expirationTime=n,e}function Si(e,t,n){return(t=new xi(4,null!==e.children?e.children:[],e.key,t)).expirationTime=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ti(e,t,n){return e={current:t=new xi(3,null,null,t?3:0),containerInfo:e,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:n,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null},t.stateNode=e}var Ni=null,Pi=null;function Mi(e){return function(t){try{return e(t)}catch(e){}}}function Oi(e){"function"==typeof Ni&&Ni(e)}function Li(e){"function"==typeof Pi&&Pi(e)}var Ii=!1;function Ri(e){return{expirationTime:0,baseState:e,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Di(e){return{expirationTime:e.expirationTime,baseState:e.baseState,firstUpdate:e.firstUpdate,lastUpdate:e.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function ji(e){return{expirationTime:e,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Fi(e,t,n){null===e.lastUpdate?e.firstUpdate=e.lastUpdate=t:(e.lastUpdate.next=t,e.lastUpdate=t),(0===e.expirationTime||e.expirationTime>n)&&(e.expirationTime=n)}function Ui(e,t,n){var r=e.alternate;if(null===r){var i=e.updateQueue,o=null;null===i&&(i=e.updateQueue=Ri(e.memoizedState))}else i=e.updateQueue,o=r.updateQueue,null===i?null===o?(i=e.updateQueue=Ri(e.memoizedState),o=r.updateQueue=Ri(r.memoizedState)):i=e.updateQueue=Di(o):null===o&&(o=r.updateQueue=Di(i));null===o||i===o?Fi(i,t,n):null===i.lastUpdate||null===o.lastUpdate?(Fi(i,t,n),Fi(o,t,n)):(Fi(i,t,n),o.lastUpdate=t)}function zi(e,t,n){var r=e.updateQueue;null===(r=null===r?e.updateQueue=Ri(e.memoizedState):Ai(e,r)).lastCapturedUpdate?r.firstCapturedUpdate=r.lastCapturedUpdate=t:(r.lastCapturedUpdate.next=t,r.lastCapturedUpdate=t),(0===r.expirationTime||r.expirationTime>n)&&(r.expirationTime=n)}function Ai(e,t){var n=e.alternate;return null!==n&&t===n.updateQueue&&(t=e.updateQueue=Di(t)),t}function Bi(e,t,n,r,i,o){switch(n.tag){case 1:return"function"==typeof(e=n.payload)?e.call(o,r,i):e;case 3:e.effectTag=-1025&e.effectTag|64;case 0:if(null===(i="function"==typeof(e=n.payload)?e.call(o,r,i):e)||void 0===i)break;return a({},r,i);case 2:Ii=!0}return r}function Wi(e,t,n,r,i){if(Ii=!1,!(0===t.expirationTime||t.expirationTime>i)){for(var o=(t=Ai(e,t)).baseState,a=null,s=0,l=t.firstUpdate,u=o;null!==l;){var c=l.expirationTime;c>i?(null===a&&(a=l,o=u),(0===s||s>c)&&(s=c)):(u=Bi(e,0,l,u,n,r),null!==l.callback&&(e.effectTag|=32,l.nextEffect=null,null===t.lastEffect?t.firstEffect=t.lastEffect=l:(t.lastEffect.nextEffect=l,t.lastEffect=l))),l=l.next}for(c=null,l=t.firstCapturedUpdate;null!==l;){var d=l.expirationTime;d>i?(null===c&&(c=l,null===a&&(o=u)),(0===s||s>d)&&(s=d)):(u=Bi(e,0,l,u,n,r),null!==l.callback&&(e.effectTag|=32,l.nextEffect=null,null===t.lastCapturedEffect?t.firstCapturedEffect=t.lastCapturedEffect=l:(t.lastCapturedEffect.nextEffect=l,t.lastCapturedEffect=l))),l=l.next}null===a&&(t.lastUpdate=null),null===c?t.lastCapturedUpdate=null:e.effectTag|=32,null===a&&null===c&&(o=u),t.baseState=o,t.firstUpdate=a,t.firstCapturedUpdate=c,t.expirationTime=s,e.memoizedState=u}}function $i(e,t){"function"!=typeof e&&f("191",e),e.call(t)}function Hi(e,t,n){for(null!==t.firstCapturedUpdate&&(null!==t.lastUpdate&&(t.lastUpdate.next=t.firstCapturedUpdate,t.lastUpdate=t.lastCapturedUpdate),t.firstCapturedUpdate=t.lastCapturedUpdate=null),e=t.firstEffect,t.firstEffect=t.lastEffect=null;null!==e;){var r=e.callback;null!==r&&(e.callback=null,$i(r,n)),e=e.nextEffect}for(e=t.firstCapturedEffect,t.firstCapturedEffect=t.lastCapturedEffect=null;null!==e;)null!==(t=e.callback)&&(e.callback=null,$i(t,n)),e=e.nextEffect}function Vi(e,t){return{value:e,source:t,stack:bt(t)}}var Ji=ai(null),qi=ai(null),Ki=ai(0);function Qi(e){var t=e.type._context;li(Ki,t._changedBits),li(qi,t._currentValue),li(Ji,e),t._currentValue=e.pendingProps.value,t._changedBits=e.stateNode}function Gi(e){var t=Ki.current,n=qi.current;si(Ji),si(qi),si(Ki),(e=e.type._context)._currentValue=n,e._changedBits=t}var Xi={},Yi=ai(Xi),Zi=ai(Xi),eo=ai(Xi);function to(e){return e===Xi&&f("174"),e}function no(e,t){li(eo,t),li(Zi,e),li(Yi,Xi);var n=t.nodeType;switch(n){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Pr(null,"");break;default:t=Pr(t=(n=8===n?t.parentNode:t).namespaceURI||null,n=n.tagName)}si(Yi),li(Yi,t)}function ro(e){si(Yi),si(Zi),si(eo)}function io(e){Zi.current===e&&(si(Yi),si(Zi))}function oo(e,t,n){var r=e.memoizedState;r=null===(t=t(n,r))||void 0===t?r:a({},r,t),e.memoizedState=r,null!==(e=e.updateQueue)&&0===e.expirationTime&&(e.baseState=r)}var ao={isMounted:function(e){return!!(e=e._reactInternalFiber)&&2===sn(e)},enqueueSetState:function(e,t,n){e=e._reactInternalFiber;var r=_a(),i=ji(r=ya(r,e));i.payload=t,void 0!==n&&null!==n&&(i.callback=n),Ui(e,i,r),va(e,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternalFiber;var r=_a(),i=ji(r=ya(r,e));i.tag=1,i.payload=t,void 0!==n&&null!==n&&(i.callback=n),Ui(e,i,r),va(e,r)},enqueueForceUpdate:function(e,t){e=e._reactInternalFiber;var n=_a(),r=ji(n=ya(n,e));r.tag=2,void 0!==t&&null!==t&&(r.callback=t),Ui(e,r,n),va(e,n)}};function so(e,t,n,r,i,o){var a=e.stateNode;return e=e.type,"function"==typeof a.shouldComponentUpdate?a.shouldComponentUpdate(n,i,o):!e.prototype||!e.prototype.isPureReactComponent||(!u(t,n)||!u(r,i))}function lo(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ao.enqueueReplaceState(t,t.state,null)}function uo(e,t){var n=e.type,r=e.stateNode,i=e.pendingProps,o=fi(e);r.props=i,r.state=e.memoizedState,r.refs=d,r.context=pi(e,o),null!==(o=e.updateQueue)&&(Wi(e,o,i,r,t),r.state=e.memoizedState),"function"==typeof(o=e.type.getDerivedStateFromProps)&&(oo(e,o,i),r.state=e.memoizedState),"function"==typeof n.getDerivedStateFromProps||"function"==typeof r.getSnapshotBeforeUpdate||"function"!=typeof r.UNSAFE_componentWillMount&&"function"!=typeof r.componentWillMount||(n=r.state,"function"==typeof r.componentWillMount&&r.componentWillMount(),"function"==typeof r.UNSAFE_componentWillMount&&r.UNSAFE_componentWillMount(),n!==r.state&&ao.enqueueReplaceState(r,r.state,null),null!==(o=e.updateQueue)&&(Wi(e,o,i,r,t),r.state=e.memoizedState)),"function"==typeof r.componentDidMount&&(e.effectTag|=4)}var co=Array.isArray;function fo(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){var r=void 0;(n=n._owner)&&(2!==n.tag&&f("110"),r=n.stateNode),r||f("147",e);var i=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===i?t.ref:((t=function(e){var t=r.refs===d?r.refs={}:r.refs;null===e?delete t[i]:t[i]=e})._stringRef=i,t)}"string"!=typeof e&&f("148"),n._owner||f("254",e)}return e}function po(e,t){"textarea"!==e.type&&f("31","[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t,"")}function ho(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.effectTag=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t,n){return(e=wi(e,t,n)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.effectTag=2,n):r:(t.effectTag=2,n):n}function a(t){return e&&null===t.alternate&&(t.effectTag=2),t}function s(e,t,n,r){return null===t||6!==t.tag?((t=Ci(n,e.mode,r)).return=e,t):((t=i(t,n,r)).return=e,t)}function l(e,t,n,r){return null!==t&&t.type===n.type?((r=i(t,n.props,r)).ref=fo(e,t,n),r.return=e,r):((r=ki(n,e.mode,r)).ref=fo(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Si(n,e.mode,r)).return=e,t):((t=i(t,n.children||[],r)).return=e,t)}function c(e,t,n,r,o){return null===t||10!==t.tag?((t=Ei(n,e.mode,r,o)).return=e,t):((t=i(t,n,r)).return=e,t)}function d(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=Ci(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case st:return(n=ki(t,e.mode,n)).ref=fo(e,null,t),n.return=e,n;case lt:return(t=Si(t,e.mode,n)).return=e,t}if(co(t)||vt(t))return(t=Ei(t,e.mode,n,null)).return=e,t;po(e,t)}return null}function p(e,t,n,r){var i=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==i?null:s(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case st:return n.key===i?n.type===ut?c(e,t,n.props.children,r,i):l(e,t,n,r):null;case lt:return n.key===i?u(e,t,n,r):null}if(co(n)||vt(n))return null!==i?null:c(e,t,n,r,null);po(e,n)}return null}function h(e,t,n,r,i){if("string"==typeof r||"number"==typeof r)return s(t,e=e.get(n)||null,""+r,i);if("object"==typeof r&&null!==r){switch(r.$$typeof){case st:return e=e.get(null===r.key?n:r.key)||null,r.type===ut?c(t,e,r.props.children,i,r.key):l(t,e,r,i);case lt:return u(t,e=e.get(null===r.key?n:r.key)||null,r,i)}if(co(r)||vt(r))return c(t,e=e.get(n)||null,r,i,null);po(t,r)}return null}function m(i,a,s,l){for(var u=null,c=null,f=a,m=a=0,g=null;null!==f&&m<s.length;m++){f.index>m?(g=f,f=null):g=f.sibling;var y=p(i,f,s[m],l);if(null===y){null===f&&(f=g);break}e&&f&&null===y.alternate&&t(i,f),a=o(y,a,m),null===c?u=y:c.sibling=y,c=y,f=g}if(m===s.length)return n(i,f),u;if(null===f){for(;m<s.length;m++)(f=d(i,s[m],l))&&(a=o(f,a,m),null===c?u=f:c.sibling=f,c=f);return u}for(f=r(i,f);m<s.length;m++)(g=h(f,i,m,s[m],l))&&(e&&null!==g.alternate&&f.delete(null===g.key?m:g.key),a=o(g,a,m),null===c?u=g:c.sibling=g,c=g);return e&&f.forEach(function(e){return t(i,e)}),u}function g(i,a,s,l){var u=vt(s);"function"!=typeof u&&f("150"),null==(s=u.call(s))&&f("151");for(var c=u=null,m=a,g=a=0,y=null,v=s.next();null!==m&&!v.done;g++,v=s.next()){m.index>g?(y=m,m=null):y=m.sibling;var _=p(i,m,v.value,l);if(null===_){m||(m=y);break}e&&m&&null===_.alternate&&t(i,m),a=o(_,a,g),null===c?u=_:c.sibling=_,c=_,m=y}if(v.done)return n(i,m),u;if(null===m){for(;!v.done;g++,v=s.next())null!==(v=d(i,v.value,l))&&(a=o(v,a,g),null===c?u=v:c.sibling=v,c=v);return u}for(m=r(i,m);!v.done;g++,v=s.next())null!==(v=h(m,i,g,v.value,l))&&(e&&null!==v.alternate&&m.delete(null===v.key?g:v.key),a=o(v,a,g),null===c?u=v:c.sibling=v,c=v);return e&&m.forEach(function(e){return t(i,e)}),u}return function(e,r,o,s){var l="object"==typeof o&&null!==o&&o.type===ut&&null===o.key;l&&(o=o.props.children);var u="object"==typeof o&&null!==o;if(u)switch(o.$$typeof){case st:e:{for(u=o.key,l=r;null!==l;){if(l.key===u){if(10===l.tag?o.type===ut:l.type===o.type){n(e,l.sibling),(r=i(l,o.type===ut?o.props.children:o.props,s)).ref=fo(e,l,o),r.return=e,e=r;break e}n(e,l);break}t(e,l),l=l.sibling}o.type===ut?((r=Ei(o.props.children,e.mode,s,o.key)).return=e,e=r):((s=ki(o,e.mode,s)).ref=fo(e,r,o),s.return=e,e=s)}return a(e);case lt:e:{for(l=o.key;null!==r;){if(r.key===l){if(4===r.tag&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),(r=i(r,o.children||[],s)).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Si(o,e.mode,s)).return=e,e=r}return a(e)}if("string"==typeof o||"number"==typeof o)return o=""+o,null!==r&&6===r.tag?(n(e,r.sibling),(r=i(r,o,s)).return=e,e=r):(n(e,r),(r=Ci(o,e.mode,s)).return=e,e=r),a(e);if(co(o))return m(e,r,o,s);if(vt(o))return g(e,r,o,s);if(u&&po(e,o),void 0===o&&!l)switch(e.tag){case 2:case 1:f("152",(s=e.type).displayName||s.name||"Component")}return n(e,r)}}var mo=ho(!0),go=ho(!1),yo=null,vo=null,_o=!1;function bo(e,t){var n=new xi(5,null,null,0);n.type="DELETED",n.stateNode=t,n.return=e,n.effectTag=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function xo(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);default:return!1}}function wo(e){if(_o){var t=vo;if(t){var n=t;if(!xo(e,t)){if(!(t=ni(n))||!xo(e,t))return e.effectTag|=2,_o=!1,void(yo=e);bo(yo,n)}yo=e,vo=ri(t)}else e.effectTag|=2,_o=!1,yo=e}}function ko(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag;)e=e.return;yo=e}function Eo(e){if(e!==yo)return!1;if(!_o)return ko(e),_o=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!Yr(t,e.memoizedProps))for(t=vo;t;)bo(e,t),t=ni(t);return ko(e),vo=yo?ni(e.stateNode):null,!0}function Co(){vo=yo=null,_o=!1}function So(e,t,n){To(e,t,n,t.expirationTime)}function To(e,t,n,r){t.child=null===e?go(t,null,n,r):mo(t,e.child,n,r)}function No(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.effectTag|=128)}function Po(e,t,n,r,i){No(e,t);var o=0!=(64&t.effectTag);if(!n&&!o)return r&&bi(t,!1),Lo(e,t);n=t.stateNode,ot.current=t;var a=o?null:n.render();return t.effectTag|=1,o&&(To(e,t,null,i),t.child=null),To(e,t,a,i),t.memoizedState=n.state,t.memoizedProps=n.props,r&&bi(t,!0),t.child}function Mo(e){var t=e.stateNode;t.pendingContext?yi(0,t.pendingContext,t.pendingContext!==t.context):t.context&&yi(0,t.context,!1),no(e,t.containerInfo)}function Oo(e,t,n,r){var i=e.child;for(null!==i&&(i.return=e);null!==i;){switch(i.tag){case 12:var o=0|i.stateNode;if(i.type===t&&0!=(o&n)){for(o=i;null!==o;){var a=o.alternate;if(0===o.expirationTime||o.expirationTime>r)o.expirationTime=r,null!==a&&(0===a.expirationTime||a.expirationTime>r)&&(a.expirationTime=r);else{if(null===a||!(0===a.expirationTime||a.expirationTime>r))break;a.expirationTime=r}o=o.return}o=null}else o=i.child;break;case 13:o=i.type===e.type?null:i.child;break;default:o=i.child}if(null!==o)o.return=i;else for(o=i;null!==o;){if(o===e){o=null;break}if(null!==(i=o.sibling)){i.return=o.return,o=i;break}o=o.return}i=o}}function Lo(e,t){if(null!==e&&t.child!==e.child&&f("153"),null!==t.child){var n=wi(e=t.child,e.pendingProps,e.expirationTime);for(t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=wi(e,e.pendingProps,e.expirationTime)).return=t;n.sibling=null}return t.child}function Io(e,t,n){if(0===t.expirationTime||t.expirationTime>n){switch(t.tag){case 3:Mo(t);break;case 2:_i(t);break;case 4:no(t,t.stateNode.containerInfo);break;case 13:Qi(t)}return null}switch(t.tag){case 0:null!==e&&f("155");var r=t.type,i=t.pendingProps,o=fi(t);return r=r(i,o=pi(t,o)),t.effectTag|=1,"object"==typeof r&&null!==r&&"function"==typeof r.render&&void 0===r.$$typeof?(o=t.type,t.tag=2,t.memoizedState=null!==r.state&&void 0!==r.state?r.state:null,"function"==typeof(o=o.getDerivedStateFromProps)&&oo(t,o,i),i=_i(t),r.updater=ao,t.stateNode=r,r._reactInternalFiber=t,uo(t,n),e=Po(e,t,!0,i,n)):(t.tag=1,So(e,t,r),t.memoizedProps=i,e=t.child),e;case 1:return i=t.type,n=t.pendingProps,ci.current||t.memoizedProps!==n?(i=i(n,r=pi(t,r=fi(t))),t.effectTag|=1,So(e,t,i),t.memoizedProps=n,e=t.child):e=Lo(e,t),e;case 2:if(i=_i(t),null===e)if(null===t.stateNode){var a=t.pendingProps,s=t.type;r=fi(t);var l=2===t.tag&&null!=t.type.contextTypes;a=new s(a,o=l?pi(t,r):d),t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,a.updater=ao,t.stateNode=a,a._reactInternalFiber=t,l&&((l=t.stateNode).__reactInternalMemoizedUnmaskedChildContext=r,l.__reactInternalMemoizedMaskedChildContext=o),uo(t,n),r=!0}else{s=t.type,r=t.stateNode,l=t.memoizedProps,o=t.pendingProps,r.props=l;var u=r.context;a=pi(t,a=fi(t));var c=s.getDerivedStateFromProps;(s="function"==typeof c||"function"==typeof r.getSnapshotBeforeUpdate)||"function"!=typeof r.UNSAFE_componentWillReceiveProps&&"function"!=typeof r.componentWillReceiveProps||(l!==o||u!==a)&&lo(t,r,o,a),Ii=!1;var p=t.memoizedState;u=r.state=p;var h=t.updateQueue;null!==h&&(Wi(t,h,o,r,n),u=t.memoizedState),l!==o||p!==u||ci.current||Ii?("function"==typeof c&&(oo(t,c,o),u=t.memoizedState),(l=Ii||so(t,l,o,p,u,a))?(s||"function"!=typeof r.UNSAFE_componentWillMount&&"function"!=typeof r.componentWillMount||("function"==typeof r.componentWillMount&&r.componentWillMount(),"function"==typeof r.UNSAFE_componentWillMount&&r.UNSAFE_componentWillMount()),"function"==typeof r.componentDidMount&&(t.effectTag|=4)):("function"==typeof r.componentDidMount&&(t.effectTag|=4),t.memoizedProps=o,t.memoizedState=u),r.props=o,r.state=u,r.context=a,r=l):("function"==typeof r.componentDidMount&&(t.effectTag|=4),r=!1)}else s=t.type,r=t.stateNode,o=t.memoizedProps,l=t.pendingProps,r.props=o,u=r.context,a=pi(t,a=fi(t)),(s="function"==typeof(c=s.getDerivedStateFromProps)||"function"==typeof r.getSnapshotBeforeUpdate)||"function"!=typeof r.UNSAFE_componentWillReceiveProps&&"function"!=typeof r.componentWillReceiveProps||(o!==l||u!==a)&&lo(t,r,l,a),Ii=!1,u=t.memoizedState,p=r.state=u,null!==(h=t.updateQueue)&&(Wi(t,h,l,r,n),p=t.memoizedState),o!==l||u!==p||ci.current||Ii?("function"==typeof c&&(oo(t,c,l),p=t.memoizedState),(c=Ii||so(t,o,l,u,p,a))?(s||"function"!=typeof r.UNSAFE_componentWillUpdate&&"function"!=typeof r.componentWillUpdate||("function"==typeof r.componentWillUpdate&&r.componentWillUpdate(l,p,a),"function"==typeof r.UNSAFE_componentWillUpdate&&r.UNSAFE_componentWillUpdate(l,p,a)),"function"==typeof r.componentDidUpdate&&(t.effectTag|=4),"function"==typeof r.getSnapshotBeforeUpdate&&(t.effectTag|=256)):("function"!=typeof r.componentDidUpdate||o===e.memoizedProps&&u===e.memoizedState||(t.effectTag|=4),"function"!=typeof r.getSnapshotBeforeUpdate||o===e.memoizedProps&&u===e.memoizedState||(t.effectTag|=256),t.memoizedProps=l,t.memoizedState=p),r.props=l,r.state=p,r.context=a,r=c):("function"!=typeof r.componentDidUpdate||o===e.memoizedProps&&u===e.memoizedState||(t.effectTag|=4),"function"!=typeof r.getSnapshotBeforeUpdate||o===e.memoizedProps&&u===e.memoizedState||(t.effectTag|=256),r=!1);return Po(e,t,r,i,n);case 3:return Mo(t),null!==(i=t.updateQueue)?(r=null!==(r=t.memoizedState)?r.element:null,Wi(t,i,t.pendingProps,null,n),(i=t.memoizedState.element)===r?(Co(),e=Lo(e,t)):(r=t.stateNode,(r=(null===e||null===e.child)&&r.hydrate)&&(vo=ri(t.stateNode.containerInfo),yo=t,r=_o=!0),r?(t.effectTag|=2,t.child=go(t,null,i,n)):(Co(),So(e,t,i)),e=t.child)):(Co(),e=Lo(e,t)),e;case 5:return to(eo.current),(i=to(Yi.current))!==(r=Pr(i,t.type))&&(li(Zi,t),li(Yi,r)),null===e&&wo(t),i=t.type,l=t.memoizedProps,r=t.pendingProps,o=null!==e?e.memoizedProps:null,ci.current||l!==r||((l=1&t.mode&&!!r.hidden)&&(t.expirationTime=1073741823),l&&1073741823===n)?(l=r.children,Yr(i,r)?l=null:o&&Yr(i,o)&&(t.effectTag|=16),No(e,t),1073741823!==n&&1&t.mode&&r.hidden?(t.expirationTime=1073741823,t.memoizedProps=r,e=null):(So(e,t,l),t.memoizedProps=r,e=t.child)):e=Lo(e,t),e;case 6:return null===e&&wo(t),t.memoizedProps=t.pendingProps,null;case 16:return null;case 4:return no(t,t.stateNode.containerInfo),i=t.pendingProps,ci.current||t.memoizedProps!==i?(null===e?t.child=mo(t,null,i,n):So(e,t,i),t.memoizedProps=i,e=t.child):e=Lo(e,t),e;case 14:return i=t.type.render,n=t.pendingProps,r=t.ref,ci.current||t.memoizedProps!==n||r!==(null!==e?e.ref:null)?(So(e,t,i=i(n,r)),t.memoizedProps=n,e=t.child):e=Lo(e,t),e;case 10:return n=t.pendingProps,ci.current||t.memoizedProps!==n?(So(e,t,n),t.memoizedProps=n,e=t.child):e=Lo(e,t),e;case 11:return n=t.pendingProps.children,ci.current||null!==n&&t.memoizedProps!==n?(So(e,t,n),t.memoizedProps=n,e=t.child):e=Lo(e,t),e;case 15:return n=t.pendingProps,t.memoizedProps===n?e=Lo(e,t):(So(e,t,n.children),t.memoizedProps=n,e=t.child),e;case 13:return function(e,t,n){var r=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=!0;if(ci.current)a=!1;else if(o===i)return t.stateNode=0,Qi(t),Lo(e,t);var s=i.value;if(t.memoizedProps=i,null===o)s=1073741823;else if(o.value===i.value){if(o.children===i.children&&a)return t.stateNode=0,Qi(t),Lo(e,t);s=0}else{var l=o.value;if(l===s&&(0!==l||1/l==1/s)||l!=l&&s!=s){if(o.children===i.children&&a)return t.stateNode=0,Qi(t),Lo(e,t);s=0}else if(s="function"==typeof r._calculateChangedBits?r._calculateChangedBits(l,s):1073741823,0==(s|=0)){if(o.children===i.children&&a)return t.stateNode=0,Qi(t),Lo(e,t)}else Oo(t,r,s,n)}return t.stateNode=s,Qi(t),So(e,t,i.children),t.child}(e,t,n);case 12:e:if(r=t.type,o=t.pendingProps,l=t.memoizedProps,i=r._currentValue,a=r._changedBits,ci.current||0!==a||l!==o){if(t.memoizedProps=o,void 0!==(s=o.unstable_observedBits)&&null!==s||(s=1073741823),t.stateNode=s,0!=(a&s))Oo(t,r,a,n);else if(l===o){e=Lo(e,t);break e}n=(n=o.children)(i),t.effectTag|=1,So(e,t,n),e=t.child}else e=Lo(e,t);return e;default:f("156")}}function Ro(e){e.effectTag|=4}var Do=void 0,jo=void 0,Fo=void 0;function Uo(e,t){var n=t.pendingProps;switch(t.tag){case 1:return null;case 2:return mi(t),null;case 3:ro(),gi();var r=t.stateNode;return r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(Eo(t),t.effectTag&=-3),Do(t),null;case 5:io(t),r=to(eo.current);var i=t.type;if(null!==e&&null!=t.stateNode){var o=e.memoizedProps,a=t.stateNode,s=to(Yi.current);a=Hr(a,i,o,n,r),jo(e,t,a,i,o,n,r,s),e.ref!==t.ref&&(t.effectTag|=128)}else{if(!n)return null===t.stateNode&&f("166"),null;if(e=to(Yi.current),Eo(t))n=t.stateNode,i=t.type,o=t.memoizedProps,n[B]=t,n[W]=o,r=Jr(n,i,o,e,r),t.updateQueue=r,null!==r&&Ro(t);else{(e=Br(i,n,r,e))[B]=t,e[W]=n;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)e.appendChild(o.stateNode);else if(4!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}$r(e,i,n,r),Xr(i,n)&&Ro(t),t.stateNode=e}null!==t.ref&&(t.effectTag|=128)}return null;case 6:if(e&&null!=t.stateNode)Fo(e,t,e.memoizedProps,n);else{if("string"!=typeof n)return null===t.stateNode&&f("166"),null;r=to(eo.current),to(Yi.current),Eo(t)?(r=t.stateNode,n=t.memoizedProps,r[B]=t,qr(r,n)&&Ro(t)):((r=Wr(n,r))[B]=t,t.stateNode=r)}return null;case 14:case 16:case 10:case 11:case 15:return null;case 4:return ro(),Do(t),null;case 13:return Gi(t),null;case 12:return null;case 0:f("167");default:f("156")}}function zo(e,t){var n=t.source;null===t.stack&&null!==n&&bt(n),null!==n&&_t(n),t=t.value,null!==e&&2===e.tag&&_t(e);try{t&&t.suppressReactErrorLogging||console.error(t)}catch(e){e&&e.suppressReactErrorLogging||console.error(e)}}function Ao(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){ma(e,t)}else t.current=null}function Bo(e){switch(Li(e),e.tag){case 2:Ao(e);var t=e.stateNode;if("function"==typeof t.componentWillUnmount)try{t.props=e.memoizedProps,t.state=e.memoizedState,t.componentWillUnmount()}catch(t){ma(e,t)}break;case 5:Ao(e);break;case 4:Ho(e)}}function Wo(e){return 5===e.tag||3===e.tag||4===e.tag}function $o(e){e:{for(var t=e.return;null!==t;){if(Wo(t)){var n=t;break e}t=t.return}f("160"),n=void 0}var r=t=void 0;switch(n.tag){case 5:t=n.stateNode,r=!1;break;case 3:case 4:t=n.stateNode.containerInfo,r=!0;break;default:f("161")}16&n.effectTag&&(Lr(t,""),n.effectTag&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||Wo(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag;){if(2&n.effectTag)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.effectTag)){n=n.stateNode;break e}}for(var i=e;;){if(5===i.tag||6===i.tag)if(n)if(r){var o=t,a=i.stateNode,s=n;8===o.nodeType?o.parentNode.insertBefore(a,s):o.insertBefore(a,s)}else t.insertBefore(i.stateNode,n);else r?(o=t,a=i.stateNode,8===o.nodeType?o.parentNode.insertBefore(a,o):o.appendChild(a)):t.appendChild(i.stateNode);else if(4!==i.tag&&null!==i.child){i.child.return=i,i=i.child;continue}if(i===e)break;for(;null===i.sibling;){if(null===i.return||i.return===e)return;i=i.return}i.sibling.return=i.return,i=i.sibling}}function Ho(e){for(var t=e,n=!1,r=void 0,i=void 0;;){if(!n){n=t.return;e:for(;;){switch(null===n&&f("160"),n.tag){case 5:r=n.stateNode,i=!1;break e;case 3:case 4:r=n.stateNode.containerInfo,i=!0;break e}n=n.return}n=!0}if(5===t.tag||6===t.tag){e:for(var o=t,a=o;;)if(Bo(a),null!==a.child&&4!==a.tag)a.child.return=a,a=a.child;else{if(a===o)break;for(;null===a.sibling;){if(null===a.return||a.return===o)break e;a=a.return}a.sibling.return=a.return,a=a.sibling}i?(o=r,a=t.stateNode,8===o.nodeType?o.parentNode.removeChild(a):o.removeChild(a)):r.removeChild(t.stateNode)}else if(4===t.tag?r=t.stateNode.containerInfo:Bo(t),null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return;4===(t=t.return).tag&&(n=!1)}t.sibling.return=t.return,t=t.sibling}}function Vo(e,t){switch(t.tag){case 2:break;case 5:var n=t.stateNode;if(null!=n){var r=t.memoizedProps;e=null!==e?e.memoizedProps:r;var i=t.type,o=t.updateQueue;t.updateQueue=null,null!==o&&(n[W]=r,Vr(n,o,i,e,r))}break;case 6:null===t.stateNode&&f("162"),t.stateNode.nodeValue=t.memoizedProps;break;case 3:case 15:case 16:break;default:f("163")}}function Jo(e,t,n){(n=ji(n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ya(r),zo(e,t)},n}function qo(e,t,n){(n=ji(n)).tag=3;var r=e.stateNode;return null!==r&&"function"==typeof r.componentDidCatch&&(n.callback=function(){null===ca?ca=new Set([this]):ca.add(this);var n=t.value,r=t.stack;zo(e,t),this.componentDidCatch(n,{componentStack:null!==r?r:""})}),n}function Ko(e,t,n,r,i,o){n.effectTag|=512,n.firstEffect=n.lastEffect=null,r=Vi(r,n),e=t;do{switch(e.tag){case 3:return e.effectTag|=1024,void zi(e,r=Jo(e,r,o),o);case 2:if(t=r,n=e.stateNode,0==(64&e.effectTag)&&null!==n&&"function"==typeof n.componentDidCatch&&(null===ca||!ca.has(n)))return e.effectTag|=1024,void zi(e,r=qo(e,t,o),o)}e=e.return}while(null!==e)}function Qo(e){switch(e.tag){case 2:mi(e);var t=e.effectTag;return 1024&t?(e.effectTag=-1025&t|64,e):null;case 3:return ro(),gi(),1024&(t=e.effectTag)?(e.effectTag=-1025&t|64,e):null;case 5:return io(e),null;case 16:return 1024&(t=e.effectTag)?(e.effectTag=-1025&t|64,e):null;case 4:return ro(),null;case 13:return Gi(e),null;default:return null}}Do=function(){},jo=function(e,t,n){(t.updateQueue=n)&&Ro(t)},Fo=function(e,t,n,r){n!==r&&Ro(t)};var Go=Zr(),Xo=2,Yo=Go,Zo=0,ea=0,ta=!1,na=null,ra=null,ia=0,oa=-1,aa=!1,sa=null,la=!1,ua=!1,ca=null;function da(){if(null!==na)for(var e=na.return;null!==e;){var t=e;switch(t.tag){case 2:mi(t);break;case 3:ro(),gi();break;case 5:io(t);break;case 4:ro();break;case 13:Gi(t)}e=e.return}ra=null,ia=0,oa=-1,aa=!1,na=null,ua=!1}function fa(e){for(;;){var t=e.alternate,n=e.return,r=e.sibling;if(0==(512&e.effectTag)){t=Uo(t,e);var i=e;if(1073741823===ia||1073741823!==i.expirationTime){var o=0;switch(i.tag){case 3:case 2:var a=i.updateQueue;null!==a&&(o=a.expirationTime)}for(a=i.child;null!==a;)0!==a.expirationTime&&(0===o||o>a.expirationTime)&&(o=a.expirationTime),a=a.sibling;i.expirationTime=o}if(null!==t)return t;if(null!==n&&0==(512&n.effectTag)&&(null===n.firstEffect&&(n.firstEffect=e.firstEffect),null!==e.lastEffect&&(null!==n.lastEffect&&(n.lastEffect.nextEffect=e.firstEffect),n.lastEffect=e.lastEffect),1<e.effectTag&&(null!==n.lastEffect?n.lastEffect.nextEffect=e:n.firstEffect=e,n.lastEffect=e)),null!==r)return r;if(null===n){ua=!0;break}e=n}else{if(null!==(e=Qo(e)))return e.effectTag&=511,e;if(null!==n&&(n.firstEffect=n.lastEffect=null,n.effectTag|=512),null!==r)return r;if(null===n)break;e=n}}return null}function pa(e){var t=Io(e.alternate,e,ia);return null===t&&(t=fa(e)),ot.current=null,t}function ha(e,t,n){ta&&f("243"),ta=!0,t===ia&&e===ra&&null!==na||(da(),ia=t,oa=-1,na=wi((ra=e).current,null,ia),e.pendingCommitExpirationTime=0);var r=!1;for(aa=!n||ia<=Xo;;){try{if(n)for(;null!==na&&!Xa();)na=pa(na);else for(;null!==na;)na=pa(na)}catch(t){if(null===na)r=!0,Ya(t);else{null===na&&f("271");var i=(n=na).return;if(null===i){r=!0,Ya(t);break}Ko(e,i,n,t,0,ia),na=fa(n)}}break}if(ta=!1,r)return null;if(null===na){if(ua)return e.pendingCommitExpirationTime=t,e.current.alternate;aa&&f("262"),0<=oa&&setTimeout(function(){var t=e.current.expirationTime;0!==t&&(0===e.remainingExpirationTime||e.remainingExpirationTime<t)&&Wa(e,t)},oa),function(e){null===Ta&&f("246"),Ta.remainingExpirationTime=e}(e.current.expirationTime)}return null}function ma(e,t){var n;e:{for(ta&&!la&&f("263"),n=e.return;null!==n;){switch(n.tag){case 2:var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromCatch||"function"==typeof r.componentDidCatch&&(null===ca||!ca.has(r))){Ui(n,e=qo(n,e=Vi(t,e),1),1),va(n,1),n=void 0;break e}break;case 3:Ui(n,e=Jo(n,e=Vi(t,e),1),1),va(n,1),n=void 0;break e}n=n.return}3===e.tag&&(Ui(e,n=Jo(e,n=Vi(t,e),1),1),va(e,1)),n=void 0}return n}function ga(){var e=2+25*(1+((_a()-2+500)/25|0));return e<=Zo&&(e=Zo+1),Zo=e}function ya(e,t){return e=0!==ea?ea:ta?la?1:ia:1&t.mode?ja?2+10*(1+((e-2+15)/10|0)):2+25*(1+((e-2+500)/25|0)):1,ja&&(0===Pa||e>Pa)&&(Pa=e),e}function va(e,t){for(;null!==e;){if((0===e.expirationTime||e.expirationTime>t)&&(e.expirationTime=t),null!==e.alternate&&(0===e.alternate.expirationTime||e.alternate.expirationTime>t)&&(e.alternate.expirationTime=t),null===e.return){if(3!==e.tag)break;var n=e.stateNode;!ta&&0!==ia&&t<ia&&da();var r=n.current.expirationTime;ta&&!la&&ra===n||Wa(n,r),za>Ua&&f("185")}e=e.return}}function _a(){return Yo=Zr()-Go,Xo=2+(Yo/10|0)}function ba(e){var t=ea;ea=2+25*(1+((_a()-2+500)/25|0));try{return e()}finally{ea=t}}function xa(e,t,n,r,i){var o=ea;ea=1;try{return e(t,n,r,i)}finally{ea=o}}var wa=null,ka=null,Ea=0,Ca=void 0,Sa=!1,Ta=null,Na=0,Pa=0,Ma=!1,Oa=!1,La=null,Ia=null,Ra=!1,Da=!1,ja=!1,Fa=null,Ua=1e3,za=0,Aa=1;function Ba(e){if(0!==Ea){if(e>Ea)return;null!==Ca&&ti(Ca)}var t=Zr()-Go;Ea=e,Ca=ei(Ha,{timeout:10*(e-2)-t})}function Wa(e,t){if(null===e.nextScheduledRoot)e.remainingExpirationTime=t,null===ka?(wa=ka=e,e.nextScheduledRoot=e):(ka=ka.nextScheduledRoot=e).nextScheduledRoot=wa;else{var n=e.remainingExpirationTime;(0===n||t<n)&&(e.remainingExpirationTime=t)}Sa||(Ra?Da&&(Ta=e,Na=1,Qa(e,1,!1)):1===t?Va():Ba(t))}function $a(){var e=0,t=null;if(null!==ka)for(var n=ka,r=wa;null!==r;){var i=r.remainingExpirationTime;if(0===i){if((null===n||null===ka)&&f("244"),r===r.nextScheduledRoot){wa=ka=r.nextScheduledRoot=null;break}if(r===wa)wa=i=r.nextScheduledRoot,ka.nextScheduledRoot=i,r.nextScheduledRoot=null;else{if(r===ka){(ka=n).nextScheduledRoot=wa,r.nextScheduledRoot=null;break}n.nextScheduledRoot=r.nextScheduledRoot,r.nextScheduledRoot=null}r=n.nextScheduledRoot}else{if((0===e||i<e)&&(e=i,t=r),r===ka)break;n=r,r=r.nextScheduledRoot}}null!==(n=Ta)&&n===t&&1===e?za++:za=0,Ta=t,Na=e}function Ha(e){Ja(0,!0,e)}function Va(){Ja(1,!1,null)}function Ja(e,t,n){if(Ia=n,$a(),t)for(;null!==Ta&&0!==Na&&(0===e||e>=Na)&&(!Ma||_a()>=Na);)_a(),Qa(Ta,Na,!Ma),$a();else for(;null!==Ta&&0!==Na&&(0===e||e>=Na);)Qa(Ta,Na,!1),$a();null!==Ia&&(Ea=0,Ca=null),0!==Na&&Ba(Na),Ia=null,Ma=!1,Ka()}function qa(e,t){Sa&&f("253"),Ta=e,Na=t,Qa(e,t,!1),Va(),Ka()}function Ka(){if(za=0,null!==Fa){var e=Fa;Fa=null;for(var t=0;t<e.length;t++){var n=e[t];try{n._onComplete()}catch(e){Oa||(Oa=!0,La=e)}}}if(Oa)throw e=La,La=null,Oa=!1,e}function Qa(e,t,n){Sa&&f("245"),Sa=!0,n?null!==(n=e.finishedWork)?Ga(e,n,t):null!==(n=ha(e,t,!0))&&(Xa()?e.finishedWork=n:Ga(e,n,t)):null!==(n=e.finishedWork)?Ga(e,n,t):null!==(n=ha(e,t,!1))&&Ga(e,n,t),Sa=!1}function Ga(e,t,n){var r=e.firstBatch;if(null!==r&&r._expirationTime<=n&&(null===Fa?Fa=[r]:Fa.push(r),r._defer))return e.finishedWork=t,void(e.remainingExpirationTime=0);if(e.finishedWork=null,la=ta=!0,(n=t.stateNode).current===t&&f("177"),0===(r=n.pendingCommitExpirationTime)&&f("261"),n.pendingCommitExpirationTime=0,_a(),ot.current=null,1<t.effectTag)if(null!==t.lastEffect){t.lastEffect.nextEffect=t;var i=t.firstEffect}else i=t;else i=t.firstEffect;Qr=Mn;var o=l();if($n(o)){if("selectionStart"in o)var a={start:o.selectionStart,end:o.selectionEnd};else e:{var s=window.getSelection&&window.getSelection();if(s&&0!==s.rangeCount){a=s.anchorNode;var u=s.anchorOffset,d=s.focusNode;s=s.focusOffset;try{a.nodeType,d.nodeType}catch(e){a=null;break e}var p=0,h=-1,m=-1,g=0,y=0,v=o,_=null;t:for(;;){for(var b;v!==a||0!==u&&3!==v.nodeType||(h=p+u),v!==d||0!==s&&3!==v.nodeType||(m=p+s),3===v.nodeType&&(p+=v.nodeValue.length),null!==(b=v.firstChild);)_=v,v=b;for(;;){if(v===o)break t;if(_===a&&++g===u&&(h=p),_===d&&++y===s&&(m=p),null!==(b=v.nextSibling))break;_=(v=_).parentNode}v=b}a=-1===h||-1===m?null:{start:h,end:m}}else a=null}a=a||{start:0,end:0}}else a=null;for(Gr={focusedElem:o,selectionRange:a},On(!1),sa=i;null!==sa;){o=!1,a=void 0;try{for(;null!==sa;){if(256&sa.effectTag){var x=sa.alternate;switch((u=sa).tag){case 2:if(256&u.effectTag&&null!==x){var w=x.memoizedProps,k=x.memoizedState,E=u.stateNode;E.props=u.memoizedProps,E.state=u.memoizedState;var C=E.getSnapshotBeforeUpdate(w,k);E.__reactInternalSnapshotBeforeUpdate=C}break;case 3:case 5:case 6:case 4:break;default:f("163")}}sa=sa.nextEffect}}catch(e){o=!0,a=e}o&&(null===sa&&f("178"),ma(sa,a),null!==sa&&(sa=sa.nextEffect))}for(sa=i;null!==sa;){x=!1,w=void 0;try{for(;null!==sa;){var S=sa.effectTag;if(16&S&&Lr(sa.stateNode,""),128&S){var T=sa.alternate;if(null!==T){var N=T.ref;null!==N&&("function"==typeof N?N(null):N.current=null)}}switch(14&S){case 2:$o(sa),sa.effectTag&=-3;break;case 6:$o(sa),sa.effectTag&=-3,Vo(sa.alternate,sa);break;case 4:Vo(sa.alternate,sa);break;case 8:Ho(k=sa),k.return=null,k.child=null,k.alternate&&(k.alternate.child=null,k.alternate.return=null)}sa=sa.nextEffect}}catch(e){x=!0,w=e}x&&(null===sa&&f("178"),ma(sa,w),null!==sa&&(sa=sa.nextEffect))}if(N=Gr,T=l(),S=N.focusedElem,x=N.selectionRange,T!==S&&c(document.documentElement,S)){null!==x&&$n(S)&&(T=x.start,void 0===(N=x.end)&&(N=T),"selectionStart"in S?(S.selectionStart=T,S.selectionEnd=Math.min(N,S.value.length)):window.getSelection&&(T=window.getSelection(),w=S[he()].length,N=Math.min(x.start,w),x=void 0===x.end?N:Math.min(x.end,w),!T.extend&&N>x&&(w=x,x=N,N=w),w=Wn(S,N),k=Wn(S,x),w&&k&&(1!==T.rangeCount||T.anchorNode!==w.node||T.anchorOffset!==w.offset||T.focusNode!==k.node||T.focusOffset!==k.offset)&&((E=document.createRange()).setStart(w.node,w.offset),T.removeAllRanges(),N>x?(T.addRange(E),T.extend(k.node,k.offset)):(E.setEnd(k.node,k.offset),T.addRange(E))))),T=[];for(N=S;N=N.parentNode;)1===N.nodeType&&T.push({element:N,left:N.scrollLeft,top:N.scrollTop});for("function"==typeof S.focus&&S.focus(),S=0;S<T.length;S++)(N=T[S]).element.scrollLeft=N.left,N.element.scrollTop=N.top}for(Gr=null,On(Qr),Qr=null,n.current=t,sa=i;null!==sa;){i=!1,S=void 0;try{for(T=r;null!==sa;){var P=sa.effectTag;if(36&P){var M=sa.alternate;switch(x=T,(N=sa).tag){case 2:var O=N.stateNode;if(4&N.effectTag)if(null===M)O.props=N.memoizedProps,O.state=N.memoizedState,O.componentDidMount();else{var L=M.memoizedProps,I=M.memoizedState;O.props=N.memoizedProps,O.state=N.memoizedState,O.componentDidUpdate(L,I,O.__reactInternalSnapshotBeforeUpdate)}var R=N.updateQueue;null!==R&&(O.props=N.memoizedProps,O.state=N.memoizedState,Hi(N,R,O));break;case 3:var D=N.updateQueue;if(null!==D){if(w=null,null!==N.child)switch(N.child.tag){case 5:w=N.child.stateNode;break;case 2:w=N.child.stateNode}Hi(N,D,w)}break;case 5:var j=N.stateNode;null===M&&4&N.effectTag&&Xr(N.type,N.memoizedProps)&&j.focus();break;case 6:case 4:case 15:case 16:break;default:f("163")}}if(128&P){N=void 0;var F=sa.ref;if(null!==F){var U=sa.stateNode;switch(sa.tag){case 5:N=U;break;default:N=U}"function"==typeof F?F(N):F.current=N}}var z=sa.nextEffect;sa.nextEffect=null,sa=z}}catch(e){i=!0,S=e}i&&(null===sa&&f("178"),ma(sa,S),null!==sa&&(sa=sa.nextEffect))}ta=la=!1,Oi(t.stateNode),0===(t=n.current.expirationTime)&&(ca=null),e.remainingExpirationTime=t}function Xa(){return!(null===Ia||Ia.timeRemaining()>Aa)&&(Ma=!0)}function Ya(e){null===Ta&&f("246"),Ta.remainingExpirationTime=0,Oa||(Oa=!0,La=e)}function Za(e,t){var n=Ra;Ra=!0;try{return e(t)}finally{(Ra=n)||Sa||Va()}}function es(e,t){if(Ra&&!Da){Da=!0;try{return e(t)}finally{Da=!1}}return e(t)}function ts(e,t){Sa&&f("187");var n=Ra;Ra=!0;try{return xa(e,t)}finally{Ra=n,Va()}}function ns(e,t,n){if(ja)return e(t,n);Ra||Sa||0===Pa||(Ja(Pa,!1,null),Pa=0);var r=ja,i=Ra;Ra=ja=!0;try{return e(t,n)}finally{ja=r,(Ra=i)||Sa||Va()}}function rs(e){var t=Ra;Ra=!0;try{xa(e)}finally{(Ra=t)||Sa||Ja(1,!1,null)}}function is(e,t,n,r,i){var o=t.current;if(n){var a;n=n._reactInternalFiber;e:{for(2===sn(n)&&2===n.tag||f("170"),a=n;3!==a.tag;){if(hi(a)){a=a.stateNode.__reactInternalMemoizedMergedChildContext;break e}(a=a.return)||f("171")}a=a.stateNode.context}n=hi(n)?vi(n,a):a}else n=d;return null===t.context?t.context=n:t.pendingContext=n,t=i,(i=ji(r)).payload={element:e},null!==(t=void 0===t?null:t)&&(i.callback=t),Ui(o,i,r),va(o,r),r}function os(e){var t=e._reactInternalFiber;return void 0===t&&("function"==typeof e.render?f("188"):f("268",Object.keys(e))),null===(e=cn(t))?null:e.stateNode}function as(e,t,n,r){var i=t.current;return is(e,t,n,i=ya(_a(),i),r)}function ss(e){if(!(e=e.current).child)return null;switch(e.child.tag){case 5:default:return e.child.stateNode}}function ls(e){var t=e.findFiberByHostInstance;return function(e){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled||!t.supportsFiber)return!0;try{var n=t.inject(e);Ni=Mi(function(e){return t.onCommitFiberRoot(n,e)}),Pi=Mi(function(e){return t.onCommitFiberUnmount(n,e)})}catch(e){}return!0}(a({},e,{findHostInstanceByFiber:function(e){return null===(e=cn(e))?null:e.stateNode},findFiberByHostInstance:function(e){return t?t(e):null}}))}var us=Za,cs=ns,ds=function(){Sa||0===Pa||(Ja(Pa,!1,null),Pa=0)};function fs(e){this._expirationTime=ga(),this._root=e,this._callbacks=this._next=null,this._hasChildren=this._didComplete=!1,this._children=null,this._defer=!0}function ps(){this._callbacks=null,this._didCommit=!1,this._onCommit=this._onCommit.bind(this)}function hs(e,t,n){this._internalRoot=Ti(e,t,n)}function ms(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function gs(e,t,n,r,i){ms(n)||f("200");var o=n._reactRootContainer;if(o){if("function"==typeof i){var a=i;i=function(){var e=ss(o._internalRoot);a.call(e)}}null!=e?o.legacy_renderSubtreeIntoContainer(e,t,i):o.render(t,i)}else{if(o=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new hs(e,!1,t)}(n,r),"function"==typeof i){var s=i;i=function(){var e=ss(o._internalRoot);s.call(e)}}es(function(){null!=e?o.legacy_renderSubtreeIntoContainer(e,t,i):o.render(t,i)})}return ss(o._internalRoot)}function ys(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;return ms(t)||f("200"),function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:lt,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)}ze.injectFiberControlledHostComponent(Kr),fs.prototype.render=function(e){this._defer||f("250"),this._hasChildren=!0,this._children=e;var t=this._root._internalRoot,n=this._expirationTime,r=new ps;return is(e,t,null,n,r._onCommit),r},fs.prototype.then=function(e){if(this._didComplete)e();else{var t=this._callbacks;null===t&&(t=this._callbacks=[]),t.push(e)}},fs.prototype.commit=function(){var e=this._root._internalRoot,t=e.firstBatch;if(this._defer&&null!==t||f("251"),this._hasChildren){var n=this._expirationTime;if(t!==this){this._hasChildren&&(n=this._expirationTime=t._expirationTime,this.render(this._children));for(var r=null,i=t;i!==this;)r=i,i=i._next;null===r&&f("251"),r._next=i._next,this._next=t,e.firstBatch=this}this._defer=!1,qa(e,n),t=this._next,this._next=null,null!==(t=e.firstBatch=t)&&t._hasChildren&&t.render(t._children)}else this._next=null,this._defer=!1},fs.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var e=this._callbacks;if(null!==e)for(var t=0;t<e.length;t++)(0,e[t])()}},ps.prototype.then=function(e){if(this._didCommit)e();else{var t=this._callbacks;null===t&&(t=this._callbacks=[]),t.push(e)}},ps.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var e=this._callbacks;if(null!==e)for(var t=0;t<e.length;t++){var n=e[t];"function"!=typeof n&&f("191",n),n()}}},hs.prototype.render=function(e,t){var n=this._internalRoot,r=new ps;return null!==(t=void 0===t?null:t)&&r.then(t),as(e,n,null,r._onCommit),r},hs.prototype.unmount=function(e){var t=this._internalRoot,n=new ps;return null!==(e=void 0===e?null:e)&&n.then(e),as(null,t,null,n._onCommit),n},hs.prototype.legacy_renderSubtreeIntoContainer=function(e,t,n){var r=this._internalRoot,i=new ps;return null!==(n=void 0===n?null:n)&&i.then(n),as(t,r,e,i._onCommit),i},hs.prototype.createBatch=function(){var e=new fs(this),t=e._expirationTime,n=this._internalRoot,r=n.firstBatch;if(null===r)n.firstBatch=e,e._next=null;else{for(n=null;null!==r&&r._expirationTime<=t;)n=r,r=r._next;e._next=r,null!==n&&(n._next=e)}return e},qe=us,Ke=cs,Qe=ds;var vs={createPortal:ys,findDOMNode:function(e){return null==e?null:1===e.nodeType?e:os(e)},hydrate:function(e,t,n){return gs(null,e,t,!0,n)},render:function(e,t,n){return gs(null,e,t,!1,n)},unstable_renderSubtreeIntoContainer:function(e,t,n,r){return(null==e||void 0===e._reactInternalFiber)&&f("38"),gs(e,t,n,!1,r)},unmountComponentAtNode:function(e){return ms(e)||f("40"),!!e._reactRootContainer&&(es(function(){gs(null,null,e,!1,function(){e._reactRootContainer=null})}),!0)},unstable_createPortal:function(){return ys.apply(void 0,arguments)},unstable_batchedUpdates:Za,unstable_deferredUpdates:ba,unstable_interactiveUpdates:ns,flushSync:ts,unstable_flushControlled:rs,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:z,EventPluginRegistry:E,EventPropagators:ne,ReactControlledComponent:Je,ReactDOMComponentTree:J,ReactDOMEventListener:jn},unstable_createRoot:function(e,t){return new hs(e,!0,null!=t&&!0===t.hydrate)}};ls({findFiberByHostInstance:$,bundleType:0,version:"16.4.2",rendererPackageName:"react-dom"});var _s={default:vs},bs=_s&&vs||_s;e.exports=bs.default?bs.default:bs},function(e,t,n){"use strict";
/** @license React v16.4.2
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(4),i=n(3),o=n(5),a=n(6),s="function"==typeof Symbol&&Symbol.for,l=s?Symbol.for("react.element"):60103,u=s?Symbol.for("react.portal"):60106,c=s?Symbol.for("react.fragment"):60107,d=s?Symbol.for("react.strict_mode"):60108,f=s?Symbol.for("react.profiler"):60114,p=s?Symbol.for("react.provider"):60109,h=s?Symbol.for("react.context"):60110,m=s?Symbol.for("react.async_mode"):60111,g=s?Symbol.for("react.forward_ref"):60112;s&&Symbol.for("react.timeout");var y="function"==typeof Symbol&&Symbol.iterator;function v(e){for(var t=arguments.length-1,n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);i(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",n)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function b(e,t,n){this.props=e,this.context=t,this.refs=o,this.updater=n||_}function x(){}function w(e,t,n){this.props=e,this.context=t,this.refs=o,this.updater=n||_}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&v("85"),this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},x.prototype=b.prototype;var k=w.prototype=new x;k.constructor=w,r(k,b.prototype),k.isPureReactComponent=!0;var E={current:null},C=Object.prototype.hasOwnProperty,S={key:!0,ref:!0,__self:!0,__source:!0};function T(e,t,n){var r=void 0,i={},o=null,a=null;if(null!=t)for(r in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(o=""+t.key),t)C.call(t,r)&&!S.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(1===s)i.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];i.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps)void 0===i[r]&&(i[r]=s[r]);return{$$typeof:l,type:e,key:o,ref:a,props:i,_owner:E.current}}function N(e){return"object"==typeof e&&null!==e&&e.$$typeof===l}var P=/\/+/g,M=[];function O(e,t,n,r){if(M.length){var i=M.pop();return i.result=e,i.keyPrefix=t,i.func=n,i.context=r,i.count=0,i}return{result:e,keyPrefix:t,func:n,context:r,count:0}}function L(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>M.length&&M.push(e)}function I(e,t,n,r){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var o=!1;if(null===e)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case l:case u:o=!0}}if(o)return n(r,e,""===t?"."+R(e,0):t),1;if(o=0,t=""===t?".":t+":",Array.isArray(e))for(var a=0;a<e.length;a++){var s=t+R(i=e[a],a);o+=I(i,s,n,r)}else if(null===e||void 0===e?s=null:s="function"==typeof(s=y&&e[y]||e["@@iterator"])?s:null,"function"==typeof s)for(e=s.call(e),a=0;!(i=e.next()).done;)o+=I(i=i.value,s=t+R(i,a++),n,r);else"object"===i&&v("31","[object Object]"===(n=""+e)?"object with keys {"+Object.keys(e).join(", ")+"}":n,"");return o}function R(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function D(e,t){e.func.call(e.context,t,e.count++)}function j(e,t,n){var r=e.result,i=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?F(e,r,n,a.thatReturnsArgument):null!=e&&(N(e)&&(t=i+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(P,"$&/")+"/")+n,e={$$typeof:l,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}),r.push(e))}function F(e,t,n,r,i){var o="";null!=n&&(o=(""+n).replace(P,"$&/")+"/"),t=O(t,o,r,i),null==e||I(e,"",j,t),L(t)}var U={Children:{map:function(e,t,n){if(null==e)return e;var r=[];return F(e,r,null,t,n),r},forEach:function(e,t,n){if(null==e)return e;t=O(null,null,t,n),null==e||I(e,"",D,t),L(t)},count:function(e){return null==e?0:I(e,"",a.thatReturnsNull,null)},toArray:function(e){var t=[];return F(e,t,null,a.thatReturnsArgument),t},only:function(e){return N(e)||v("143"),e}},createRef:function(){return{current:null}},Component:b,PureComponent:w,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:h,_calculateChangedBits:t,_defaultValue:e,_currentValue:e,_currentValue2:e,_changedBits:0,_changedBits2:0,Provider:null,Consumer:null}).Provider={$$typeof:p,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:g,render:e}},Fragment:c,StrictMode:d,unstable_AsyncMode:m,unstable_Profiler:f,createElement:T,cloneElement:function(e,t,n){(null===e||void 0===e)&&v("267",e);var i=void 0,o=r({},e.props),a=e.key,s=e.ref,u=e._owner;if(null!=t){void 0!==t.ref&&(s=t.ref,u=E.current),void 0!==t.key&&(a=""+t.key);var c=void 0;for(i in e.type&&e.type.defaultProps&&(c=e.type.defaultProps),t)C.call(t,i)&&!S.hasOwnProperty(i)&&(o[i]=void 0===t[i]&&void 0!==c?c[i]:t[i])}if(1===(i=arguments.length-2))o.children=n;else if(1<i){c=Array(i);for(var d=0;d<i;d++)c[d]=arguments[d+2];o.children=c}return{$$typeof:l,type:e.type,key:a,ref:s,props:o,_owner:u}},createFactory:function(e){var t=T.bind(null,e);return t.type=e,t},isValidElement:N,version:"16.4.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:E,assign:r}},z={default:U},A=z&&U||z;e.exports=A.default?A.default:A},function(e,t,n){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),i={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen,isInWorker:!r};e.exports=i},function(e,t,n){"use strict";e.exports=function(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}},function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty;function i(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}e.exports=function(e,t){if(i(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(var a=0;a<n.length;a++)if(!r.call(t,n[a])||!i(e[n[a]],t[n[a]]))return!1;return!0}},function(e,t,n){"use strict";var r=n(16);e.exports=function e(t,n){return!(!t||!n)&&(t===n||!r(t)&&(r(n)?e(t,n.parentNode):"contains"in t?t.contains(n):!!t.compareDocumentPosition&&!!(16&t.compareDocumentPosition(n))))}},function(e,t,n){"use strict";var r=n(17);e.exports=function(e){return r(e)&&3==e.nodeType}},function(e,t,n){"use strict";e.exports=function(e){var t=(e?e.ownerDocument||e:document).defaultView||window;return!(!e||!("function"==typeof t.Node?e instanceof t.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName))}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){var r=n(20);"string"==typeof r&&(r=[[e.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(8)(r,i);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,'.editor {\r\n\t-webkit-touch-callout: none;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\tuser-select: none;\r\n}\r\n.grabbable {\r\n\tcursor: move; /* fallback if grab cursor is unsupported */\r\n\tcursor: grab;\r\n\tcursor: -moz-grab;\r\n\tcursor: -webkit-grab;\r\n}\r\n/* Apply a "closed-hand" cursor during drag operation. */\r\n.grabbable:active { \r\n\tcursor: grabbing;\r\n\tcursor: -moz-grabbing;\r\n\tcursor: -webkit-grabbing;\r\n}\r\n/* Sidebars */\r\n.bar {\r\n\tbackground: white;\r\n\ttransition: opacity 0.2s ease;\r\n\tdisplay: flex;\r\n\talign-items: stretch;\r\n\talign-content: flex-start;\r\n}\r\n.bar:not(.visible) {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n}\r\n.sidebar {\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\theight: 100%;\r\n\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.4);\r\n\tflex-direction: column;\r\n}\r\n.bar article,\r\n.terrain-tools {\r\n\tpadding: 1rem;\r\n\tpadding-top: 0.5rem;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n.terrain-tools label {\r\n\tmargin-bottom: 1em;\r\n}\r\n.bar article:hover {\r\n\tbackground: rgba(0, 0, 0, 0.08);\r\n}\r\n.bar article:active,\r\n.bar article.selected {\r\n\tbackground: rgba(0, 0, 0, 0.12);\r\n}\r\n.bar article canvas {\r\n\tbackground: rgba(50, 200, 255, 0.7);\r\n}\r\n.bar article:hover canvas,\r\n.bar article:active canvas,\r\n.bar article.selected canvas {\r\n\tbackground: rgba(50, 200, 255, 1);\r\n}\r\n.bar h1 {\r\n\ttext-align: center;\r\n\tfont-size: 2em;\r\n\tfont-weight: normal;\r\n\tmargin: 0.1em 0;\r\n}\r\n.bar article > h1 {\r\n\tpointer-events: none;\r\n}\r\n.bar article .title-bar {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n}\r\n.bar .name {\r\n\tfont-size: 1.2em;\r\n\tfont-weight: normal;\r\n\tfont-family: sans-serif;\r\n\tmargin: 0;\r\n\tmargin-bottom: 0.1em;\r\n}\r\n.entities-bar .name {\r\n\ttext-align: center;\r\n}\r\n.bar article .mdl-textfield {\r\n\twidth: auto;\r\n\tpadding: 0;\r\n\tpadding-bottom: 0.3rem;\r\n}\r\nbutton,\r\ncanvas,\r\nimg,\r\narticle, /* representing entities, poses, animations, animation frames - things with EntityPreviews in them */\r\n.anims > * { /* includes headings and .anim-groups */\r\n\tflex: 0 0 auto;\r\n}\r\n.anim-bar {\r\n\tflex-direction: row;\r\n\talign-items: flex-start;\r\n}\r\n.anim-bar > * {\r\n\theight: 100%;\r\n}\r\n/* TODO: refactor bars and subbars */\r\n.anim-bar > *:not(:first-child) {\r\n\tborder-left: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n.anims,\r\n.anim-group {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: stretch;\r\n}\r\n.anims,\r\n.animation-frames,\r\n.entities-bar {\r\n\toverflow-y: auto;\r\n\toverflow-x: hidden;\r\n}\r\n/* TODO: refactor bars and subbars */\r\n.animation-frames {\r\n\t/*transition: 0.1s ease;*/\r\n}\r\n.animation-frames:not(.visible) {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n\twidth: 0;\r\n\t/*transform: translate(-100%, 0);*/\r\n}\r\n.add-anim-fab {\r\n\tmargin: 0.5rem 0 !important;\r\n\talign-self: center;\r\n}\r\n.poses,\r\n.animations {\r\n\twidth: 100%;\r\n}\r\narticle.placeholder {\r\n\tpadding: 2rem;\r\n\ttext-align: center;\r\n\tbackground: rgba(128, 59, 110, 0.16);\r\n\tcolor: rgba(0, 0, 0, 0.5);\r\n\tfont-size: 1.4em;\r\n\tpointer-events: none;\r\n}\r\n\r\n.warning {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tz-index: 50;\r\n\tmargin: 15px;\r\n\tpadding: 15px;\r\n\tbackground: #FFF9C4;\r\n\tcolor: #BF360C;\r\n\tborder-radius: 2px;\r\n\ttransition: opacity 0.2s ease;\r\n}\r\n.warning:not(.show) {\r\n\tpointer-events: none;\r\n\topacity: 0;\r\n}\r\n',""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var i,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}},function(e,t,n){var r=n(23);"string"==typeof r&&(r=[[e.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(8)(r,i);r.locals&&(e.exports=r.locals)},function(e,t,n){(t=e.exports=n(7)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Arimo:400,400i,700,700i);",""]),t.push([e.i,"html, body {\r\n\tmargin: 0;\r\n\theight: 100%;\r\n}\r\nbody { display: flex; flex-direction: column }\r\n.menubar { flex: 0 0 22px }\r\ndiv.below-menubar { flex: 1 1 0; min-height: 0;}\r\n\r\n.nwjs-menu {\r\n\tfont-family: 'Helvetica Neue', HelveticaNeue, 'TeX Gyre Heros', TeXGyreHeros, FreeSans, 'Nimbus Sans L', 'Liberation Sans', Arimo, Helvetica, Arial, sans-serif;\r\n\tfont-size: 14px;\r\n\tcolor: #2c2c2c;\r\n\t-webkit-user-select: none;\r\n\tuser-select: none;\r\n\t-webkit-font-smoothing: subpixel-antialiased;\r\n\tfont-weight: 400;\r\n}\r\n\r\n.contextmenu {\r\n\tmin-width: 100px;\r\n\tbackground-color: #fafafa;\r\n\tposition: fixed;\r\n\topacity: 0;\r\n\ttransition: opacity 250ms;\r\n\tmargin: 0;\r\n\tpadding: 0 0;\r\n\tlist-style: none;\r\n\tpointer-events: none;\r\n\tborder: 1px rgba(191, 191, 191, 0.8) solid;\r\n\tbox-shadow: rgba(43, 43, 43, 0.34) 1px 1px 11px 0px;\r\n\tz-index: 2147483647;\r\n}\r\n\r\n.contextmenu {\r\n\topacity: 1;\r\n\ttransition: opacity 30ms;\r\n\tpointer-events: all;\r\n}\r\n\r\n.contextmenu.submenu {\r\n    transition: opacity 250ms;\r\n}\r\n\r\n.contextmenu.submenu {\r\n\ttransition: opacity 150ms;\r\n\ttransition-timing-function: step-end;\r\n}\r\n\r\n.menu-item.normal,\r\n.menu-item.checkbox,\r\n.menu-item.radio {\r\n\tcursor: default;\r\n\tpadding: 2px 0;\r\n\tbox-sizing: border-box;\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tflex-wrap: nowrap;\r\n\tjustify-content: flex-start;\r\n\talign-content: stretch;\r\n\talign-items: flex-start;\r\n\twidth: 100%;\r\n}\r\n\r\n.contextmenu .menu-item.active,\r\n.menu-item.normal.submenu-active {\r\n\tbackground-color: #499BFE;\r\n\tcolor: #fff;\r\n}\r\n\r\n.menu-item.normal > div,\r\n.menu-item.checkbox > div,\r\n.menu-item.radio > div {\r\n    align-self: center;\r\n    vertical-align: middle;\r\n    display: inline-flex;\r\n    justify-content: flex-start;\r\n    flex-shrink: 0;\r\n}\r\n\r\n.menu-item.normal .icon {\r\n    display: inline-flex;\r\n    vertical-align: middle;\r\n    max-width: 16px;\r\n    max-height: 16px;\r\n    align-self: center;\r\n}\r\n\r\nli.menu-item.separator {\r\n\theight: 2px;\r\n\tbackground-color: rgba(128, 128, 128, 0.2);\r\n\tmargin: 5px 0;\r\n}\r\n\r\n.menu-item .modifiers,\r\n.menu-item .icon-wrap,\r\n.menu-item .checkmark {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.menu-item .checkmark {\r\n\twidth: 22px;\r\n}\r\n\r\n.menu-item .modifiers {\r\n\tbox-sizing: border-box;\r\n\tpadding: 0 6px;\r\n\ttext-align: right;\r\n\torder: 0;\r\n    flex: 0 0 auto;\r\n    align-self: center;\r\n}\r\n\r\n.menu-item .label {\r\n    padding: 0 22px 0 0;\r\n    order: 0;\r\n    flex: 1 0 auto;\r\n    align-self: center;\r\n}\r\n\r\n.menu-item.disabled,\r\n.menu-item.disabled:hover,\r\n.contextmenu .menu-item.disabled:hover {\r\n    color: #ababab;\r\n}\r\n\r\n.menu-item.disabled:hover,\r\n.contextmenu .menu-item.disabled:hover {\r\n    background-color: transparent;\r\n}\r\n\r\n.menu-item .icon-wrap {\r\n    padding: 0 6px 0 0;\r\n    display: inline-flex;\r\n    align-self: center;\r\n}\r\n\r\n.menu-item .label-text {\r\n    align-items: center;\r\n    vertical-align: middle;\r\n}\r\n\r\n.menu-item.checkbox.checked .checkmark::before {\r\n\tcontent: '\\2714';\r\n\ttext-align: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.menu-item.radio.checked .checkmark::before {\r\n\tcontent: '\\229A';\r\n\ttext-align: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.menubar {\r\n\theight: 22px;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbackground-color: #eee;\r\n\tz-index: 2147483647;\r\n}\r\n\r\n.menubar .menu-item.normal {\r\n    display: inline-block;\r\n    width: auto;\r\n    height: 100%;\r\n}\r\n\r\n.menubar .menu-item.normal > div {\r\n    vertical-align: top;\r\n}\r\n\r\n.menubar .menu-item.normal .checkmark,\r\n.menubar .menu-item.normal .modifiers {\r\n    display: none;\r\n}\r\n\r\n.menubar .menu-item.normal .label {\r\n    padding: 0 9px;\r\n}\r\n\r\n.contextmenu.menubar-submenu {\r\n    transition: opacity 0ms;\r\n}\r\n\r\n/* Mac only?\r\n.contextmenu {\r\n    border-radius: 7px;\r\n}\r\n.contextmenu.menubar-submenu {\r\n    border-radius: 0 0 7px 7px;\r\n}\r\n*/\r\n",""])},function(e,t,n){"use strict";n.r(t);var r,i,o={};n.r(o),n.d(o,"distance",function(){return a}),n.d(o,"distanceToLineSegment",function(){return u}),n.d(o,"lineSegmentsIntersect",function(){return c}),n.d(o,"lerpPoints",function(){return d}),r=function(e,t){return Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)};var a=function(e,t){return Math.sqrt(r(e,t))};i=function(e,t,n){var i,o;return 0===(i=r(t,n))?r(e,t):(o=((e.x-t.x)*(n.x-t.x)+(e.y-t.y)*(n.y-t.y))/i,o=Math.max(0,Math.min(1,o)),r(e,{x:t.x+o*(n.x-t.x),y:t.y+o*(n.y-t.y)}))};var s,l,u=function(e,t,n){return Math.sqrt(i(e,t,n))},c=function(e,t,n,r,i,o,a,s){var l,u,c,d,f,p;return p=(+(c=a-i)*(t-o)-(d=s-o)*(e-i))/(-c*(u=r-t)+(l=n-e)*d),0<=(f=(-u*(e-i)+l*(t-o))/(-c*u+l*d))&&f<=1&&0<=p&&p<=1},d=function(e,t,n){var r,i,o;for(r in i={},e)o=e[r],i[r]="number"==typeof o?o+(t[r]-o)*n:o;return i},f=function(e,t){return(+e%(t=+t)+t)%t},p=class e{constructor(e){var t,n,r,i;if(this.points={},null!=e)for(t in({points:n}=e),n)({x:r,y:i}=n[t]),this.points[t]={x:r,y:i}}static lerp(t,n,r){var i,o,a,s,l;for(a in l=new e,s=t.points)i=s[a],o=n.points[a],l.points[a]=d(i,o,r);return l}static lerpAnimationLoop(t,n){var r,i;return r=t[f(0+~~n,t.length)],i=t[f(1+~~n,t.length)],e.lerp(r,i,f(n,1))}static alterPoints(t,n){var r,i,o,a,s,l,u;for(a in l=new e,s=t.points){for(r in i=n(o=s[a]),o)u=o[r],null==i[r]&&(i[r]=u);l.points[a]=i}return l}static copy(t){return e.alterPoints(t,function(){return{}})}static horizontallyFlip(t,n=0){return e.alterPoints(t,function(e){return{x:n-e.x,y:e.y}})}static verticallyFlip(t,n=0){return e.alterPoints(t,function(e){return{x:e.x,y:n-e.y}})}},h=class{constructor(){this.clear()}clear(){return this.points={},this.segments={}}toJSON(){var e,t,n,r,i,o,a;for(i in({points:t}=this),o={},n=this.segments)for(e in r=n[i],o[i]={},r)a=r[e],"a"!==e&&"b"!==e&&(o[i][e]=a);return{points:t,segments:o}}fromJSON(e){var t,n,r,i,o,a,s;for(a in this.points=e.points,this.segments={},r=[],n=e.segments){for(t in o={},i=n[a])s=i[t],o[t]=s;o.a=this.points[o.from],o.b=this.points[o.to],r.push(this.segments[a]=o)}return r}setPose(e){var t,n,r,i;for(n in i=[],r=e.points)t=r[n],this.points[n].x=t.x,i.push(this.points[n].y=t.y);return i}getPose(){return new p(this)}},m=class extends h{addPoint(e){if(this.points[e])throw new Error(`point/segment '${e}' already exists adding point '${e}'`);return this.points[e]={x:0,y:0,name:e}}addSegment(e){var t,n,r,i,o;if(({from:t,to:i,name:r}=e),null==i&&(i=r),this.segments[r])throw new Error(`segment '${r}' already exists adding segment '${r}'`);if(this.points[i])throw new Error(`point/segment '${r}' already exists adding segment '${r}'`);if(!this.points[t])throw new Error(`point/segment '${t}' does not exist yet adding segment '${r}'`);for(n in this.points[i]={x:0,y:0,name:i},this.segments[r]={a:this.points[t],b:this.points[i],from:t,to:i,name:r},e)null!=(o=e[n])&&(this.segments[r][n]=o);return r}stepLayout({center:e,repel:t,gravity:n,collision:r,velocity:i}={}){var o,a,s,l,u,c,d,f,p,h,m,g,y,v,_,b,x,w,k,E,C,S;for(v in d={},o={x:0,y:0},_=this.points){if(y=_[v],d[v]={x:0,y:0},e&&(l=o.x-y.x,u=o.y-y.y,s=Math.sqrt(l*l+u*u),d[v].x+=l*s/1e5,d[v].y+=u*s/1e5),t)for(g in b=this.points)l=(m=b[g]).x-y.x,u=m.y-y.y,0!==(a=5-(s=Math.sqrt(l*l+u*u)))&&(d[v].x+=l/a/1e3,d[v].y+=u/a/1e3);n&&(d[v].y+=n)}for(S in x=this.segments)l=(C=x[S]).a.x-C.b.x,u=C.a.y-C.b.y,a=(s=Math.sqrt(l*l+u*u))-(null!=(w=C.length)?w:50),a=Math.min(a,100),d[C.a.name].x-=l*a/1e3,d[C.a.name].y-=u*a/1e3,d[C.b.name].x+=l*a/1e3,d[C.b.name].y+=u*a/1e3;for(v in E=[],d)if(c=d[v],y=this.points[v],r){for(null==y.vx&&(y.vx=0),null==y.vy&&(y.vy=0),y.vx+=c.x,y.vy+=c.y,p=y.vx,h=y.vy,k=.5;Math.abs(p)>k;){if(f=Math.sign(p)*k,r({x:y.x+f,y:y.y})){if(y.vx*=.99,r({x:y.x+f,y:y.y-1}))break;y.y-=1}p-=f,y.x+=f}E.push(function(){var e;for(e=[];Math.abs(h)>k;){if(f=Math.sign(h)*k,r({x:y.x,y:y.y+f})){y.vy*=.9;break}h-=f,e.push(y.y+=f)}return e}())}else y.x+=c.x,E.push(y.y+=c.y);return E}},g={};s="function"==typeof window.require?window.require("fs"):void 0,l="function"==typeof window.require?window.require("path"):void 0;var y,v=class e{constructor(){this.structure=new m,this.x=0,this.y=0,this.id=uuid(),this.bbox_padding=2,this._class_=this.constructor.name}static initAnimation(t){return t.poses={},t.animations={},t.animation_json_path=`./animations/${t.name}.json`,e.loadAnimations(t)}static loadAnimations(e){var t,n,r,i;if(t=function({poses:t,animations:n}){var r,i,o,a,s;for(a in e.poses={},e.animations={},t)o=t[a],e.poses[a]=new p(o);for(i in s=[],n)r=n[i],s.push(e.animations[i]=function(){var e,t,n;for(n=[],e=0,t=r.length;e<t;e++)o=r[e],n.push(new p(o));return n}());return s},null!=s)try{r=s.readFileSync(e.animation_json_path)}catch(e){if("ENOENT"!==(n=e).code)throw n}else r=localStorage[`Skele2D ${e.name} animations`];return r?r?t(JSON.parse(r)):void 0:((i=new XMLHttpRequest).addEventListener("load",e=>{if(r=i.responseText)return t(JSON.parse(r))}),i.open("GET",e.animation_json_path),i.send())}static saveAnimations(e){var t,n,r,i;if(({poses:i,animations:t}=e),r=JSON.stringify({poses:i,animations:t},null,"\t"),null!=s){try{s.mkdirSync(l.dirname(e.animation_json_path))}catch(e){if("EEXIST"!==(n=e).code)throw n}return s.writeFileSync(e.animation_json_path,r)}return localStorage[`Skele2D ${e.name} animations`]=r}static fromJSON(e){var t;if("string"!=typeof e._class_)throw console.error("Erroneous entity definition:",e),new Error(`Expected entity to have a string _class_, _class_ is ${e._class_}`);if(!g[e._class_])throw new Error(`Entity class '${e._class_}' does not exist`);return(t=new g[e._class_]).fromJSON(e),t}fromJSON(e){var t,n,r,i;if(e._class_!==this._class_)throw new Error(`Tried to initialize ${this._class_} entity from JSON with _class_ ${JSON.stringify(e._class_)}`);for(t in r=[],e)i=e[t],"_class_"!==t&&((null!=(n=this[t])?n.fromJSON:void 0)?r.push(this[t].fromJSON(i)):r.push(this[t]=i));return r}resolveReferences(e){var t,n,r;if(this._refs_){for(n in r=this._refs_)t=r[n],this[n]=e.getEntityByID(t);return delete this._refs_}}toJSON(){var t,n,r;for(t in n={},this,this)r=this[t],"_refs_"!==t&&(r instanceof e?(null==n._refs_&&(n._refs_={}),n._refs_[t]=r.id):n[t]=r);return n}toWorld(e){return{x:e.x+this.x,y:e.y+this.y}}fromWorld(e){return{x:e.x-this.x,y:e.y-this.y}}bbox(){var e,t,n,r,i,o,a;for(o in n={x:1/0,y:1/0},e={x:-Infinity,y:-Infinity},a=this.structure.points)i=a[o],n.x=Math.min(n.x,i.x),n.y=Math.min(n.y,i.y),e.x=Math.max(e.x,i.x),e.y=Math.max(e.y,i.y);return isFinite(n.x)||(n.x=0),isFinite(n.y)||(n.y=0),isFinite(e.x)||(e.x=0),isFinite(e.y)||(e.y=0),n.x-=this.bbox_padding,n.y-=this.bbox_padding,e.x+=this.bbox_padding,e.y+=this.bbox_padding,r=this.toWorld(n),t=this.toWorld(e),{x:r.x,y:r.y,width:t.x-r.x,height:t.y-r.y}}initLayout(){var e,t,n,r,i,o,a,s,l,u,c,d,f,p;if(!(e=this.constructor).poses||!(t=null!=(i=null!=(o=null!=(a=e.poses.Default)?a:e.poses.Stand)?o:e.poses.Standing)?i:e.poses.Idle)){for(r in p={},f=0,s=this.structure.points)n=s[r],(c=null!=(l=r.match(/left|right/))?l[0]:void 0)&&(p[d=r.replace(/left|right/,"")]?f=p[d]:(f+=10,p[d]=f),"left"===c&&(n.x=-5.5),"right"===c&&(n.x=5.5),r.match(/lower/)&&(n.x*=.7)),n.y=f;for(var h=0;h<=2e3;h++)this.structure.stepLayout({center:!0,repel:!0});u=[];for(var m=0;m<=4e3;m++)u.push(this.structure.stepLayout());return u}this.structure.setPose(t)}step(e){}draw(e){}},_=class extends h{constructor(){super()}clear(){return super.clear(),this.id_counter=0,this.last_point_name=null,this.first_point_name=null,"function"==typeof this.onchange?this.onchange():void 0}toJSON(){var e,t,n;return{points:function(){var r,i;for(e in i=[],r=this.points)({x:t,y:n}=r[e]),i.push({x:t,y:n});return i}.call(this)}}fromJSON(e){var t,n,r,i,o,a;for(this.points={},this.segments={},this.id_counter=0,this.first_point_name=null,this.last_point_name=null,i=[],t=0,n=(r=e.points).length;t<n;t++)({x:o,y:a}=r[t]),i.push(this.addVertex(o,a));return i}addVertex(e,t){var n,r;if(n=this.last_point_name,r=++this.id_counter,null==this.first_point_name&&(this.first_point_name=r),this.points[r])throw new Error(`point/segment '${r}' already exists adding vertex '${r}'`);return this.points[r]={x:e,y:t,name:r},this.last_point_name=r,this.points[n]&&(this.segments[r]={a:this.points[n],b:this.points[r]},this.segments.closing={a:this.points[this.last_point_name],b:this.points[this.first_point_name]}),"function"==typeof this.onchange?this.onchange():void 0}pointInPolygon({x:e,y:t}){var n,r,i,o,a,s,l,u;for(o in n=!1,r=this.segments)a=(i=r[o]).a.x,l=i.a.y,s=i.b.x,l>t!=(u=i.b.y)>t&&e<(s-a)*(t-l)/(u-l)+a&&(n=!n);return n}};y=2*Math.PI;var b=class extends v{constructor(){super(),this.structure=new _,this.simplex=new SimplexNoise,this.seed=Math.random()}initLayout(){var e,t,n,r,i,o,a,s;for(30,a=[],s=e=0,i=y,o=y/15;0!==o&&(o>0?e<=i:e>=i);s=e+=o)n=30*Math.sin(s),r=30*Math.cos(s),r=(t=Math.max(r,-15))+.4*(r-t),a.push(this.structure.addVertex(n,r));return a}toJSON(){var e,t,n;for(t in e={},this,this)n=this[t],"simplex"!==t&&(e[t]=n);return e}generate(){var e,t,n,r,i;for(this.width=5e3,this.left=-2500,this.right=this.left+this.width,this.max_height=400,this.bottom=300,20,this.structure.clear(),this.structure.addVertex(this.right,this.bottom),this.structure.addVertex(this.left,this.bottom),r=[],i=e=this.left,n=this.right,20;e<=n;i=e+=20)t=this.simplex.noise2D(i/2400,0)+this.simplex.noise2D(i/500,10)/5+this.simplex.noise2D(i/50,30)/100,r.push(this.structure.addVertex(i,this.bottom-(t+1)/2*this.max_height));return r}draw(e,t){var n,r,i;for(r in e.beginPath(),i=this.structure.points)n=i[r],e.lineTo(n.x,n.y);return e.closePath(),e.fillStyle="#a5f",e.fill()}},x=n(2),w=n.n(x),k=n(0),E=n.n(k),C=n(1),S=class{constructor(){this.center_x=0,this.center_y=0,this.scale=1,this.width=1,this.height=1}easeTowards(e,t){return this.center_x+=(e.center_x-this.center_x)/(1+t/e.scale*this.scale),this.center_y+=(e.center_y-this.center_y)/(1+t/e.scale*this.scale),this.scale+=(e.scale-this.scale)/(1+t)}testRect(e,t,n,r,i=0){return this.center_x-this.width/2/this.scale-i<=e&&e<=this.center_x+this.width/2/this.scale+i&&this.center_y-this.height/2/this.scale-i<=t&&t<=this.center_y+this.height/2/this.scale+i}toWorld(e){return{x:(e.x-this.width/2)/this.scale+this.center_x,y:(e.y-this.height/2)/this.scale+this.center_y}}fromWorld(e){return{x:(e.x-this.center_x)*this.scale+this.width/2,y:(e.y-this.center_y)*this.scale+this.height/2}}},T=class extends C.Component{constructor(e){var t,n,r,i,o,a,s,l;super(),({entity:r,max_width:s,max_height:a}=e),this.entity=v.fromJSON(JSON.parse(JSON.stringify(r))),this.entity.facing_x=1,this.view=new S,t=(i=this.entity.bbox()).x+i.width/2-this.entity.x,n=i.y+i.height/2-this.entity.y,l=(o=Math.min(i.height,a))/i.height,this.view=new S,this.view.width=s,this.view.height=o,this.view.scale=l,this.view.center_x=t,this.view.center_y=n,this.view.is_preview=!0}render(){return E()("canvas",{ref:e=>{this.canvas=e}})}update(){var e,t,n,r;return e=(r=this.entity.bbox()).x+r.width/2-this.entity.x,t=r.y+r.height/2-this.entity.y,this.view.center_x=e,this.view.center_y=t,n=this.canvas.getContext("2d"),this.canvas.width=this.view.width,this.canvas.height=this.view.height,n.save(),n.translate(this.view.width/2,this.view.height/2),n.scale(this.view.scale,this.view.scale),n.translate(-this.view.center_x,-this.view.center_y),this.entity.draw(n,this.view),n.restore()}},N=class e extends C.Component{constructor(){var e,t,n,r,i;for(r in super(),this.update=this.update.bind(this),this.state={visible:!1},this.cells=[],this.entity_previews=[],g)e=g[r],n=r.replace(/[a-z][A-Z]/g,function(e){return`${e[0]} ${e[1]}`}),(i=new e).initLayout(),t={EntityClass:e,name:n,preview_entity:i},this.cells.push(t)}render(){var e,t,n,r;return({editor:t}=this.props),({visible:r}=this.state),200,100,this.entity_previews=[],E()(".bar.sidebar.entities-bar",{class:{visible:r}},function(){var r,i,o,s;for(o=this.cells,s=[],n=r=0,i=o.length;r<i;n=++r)e=o[n],s.push(E()("article.cell.grabbable",{key:n,onMouseDown:(e=>n=>{var r,i,o;return t.selected_entities=[],r={x:n.clientX,y:n.clientY},addEventListener("mousemove",i=(n=>{if(a(r,{x:n.clientX,y:n.clientY})>4)return t.undoable(()=>{var n;return(n=new e.EntityClass).initLayout(),t.world.entities.push(n),t.dragEntities([n]),removeEventListener("mousemove",i),removeEventListener("mouseup",o)})})),addEventListener("mouseup",o=(e=>(removeEventListener("mousemove",i),removeEventListener("mouseup",o))))})(e)},E()("h1.name",e.name),E()(T,{entity:e.preview_entity,max_width:200,max_height:100,ref:e=>{if(null!=e)return this.entity_previews.push(e)}})));return s}.call(this))}update(t){var n,r,i,o,a,s;if(function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,e),({editor:n}=this.props),(t=t&&0===n.dragging_entities.length&&!n.editing_entity)!==this.state.visible&&this.setState({visible:t}),t){for(s=[],i=0,o=(a=this.entity_previews).length;i<o;i++)r=a[i],s.push(r.update());return s}}},P=class extends C.Component{constructor(){super()}render(){var e,t,n,r,i,o,a,s,l;return({entity:r,EntityClass:e,name:i,type_of_anims:s,selected:a,select:o,delete_item:t,update:l,editor:n}=this.props),E()("article",{class:{selected:a},onClick:e=>{if(!e.defaultPrevented)return o(),l()}},"Current Pose"===i?E()("h1.name",i):E()(".title-bar",E()(".mdl-textfield.mdl-js-textfield.name",{ref:e=>{this.mdl_textfield_el=e}},E()("input.mdl-textfield__input",{value:i,onChange:t=>{var r;if(r=t.target.value,"animations"===s){if(e.animations[r])return void alert(`There's already an animation with the name ${r}`)}else{if("poses"!==s)return;if(e.poses[r])return void alert(`There's already a pose with the name ${r}`)}return function(e,t,n){var r,i,o,a;for(r in i={},e)a=e[r],r===t?i[n]=a:i[r]=a;for(r in e)a=e[r],delete e[r];for(r in o=[],i)a=i[r],o.push(e[r]=a)}(e[s],i,r),n.editing_entity_anim_name=r,v.saveAnimations(e),l()}}),E()("label.mdl-textfield__label","Name...")),E()("button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete",{onClick:n=>(n.preventDefault(),t(),v.saveAnimations(e))},E()("i.material-icons","delete"))),E()(T,{entity:r,max_width:200,max_height:100,ref:e=>{this.entity_preview=e}}))}componentDidMount(){if(null!=this.mdl_textfield_el)return componentHandler.upgradeElement(w.a.findDOMNode(this.mdl_textfield_el))}},M=function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")},O=class e extends C.Component{constructor(){super(...arguments),this.componentDidMount=this.componentDidMount.bind(this),this.componentDidUpdate=this.componentDidUpdate.bind(this)}render(){var e,t,n,r,i,o,a,s,l,u,c,d,f;return({entity:o,EntityClass:e,array_to_push_anims_to:r,update:f,type_of_anims:d,editor:i}=this.props),E()(".anim-group",function(){var h,m,g,y,v,_,b;if(null!=e){if("poses"===d){if(null!=e.poses){if(Object.keys(e.poses).length>0){for(c in l=0,v=[],g=e.poses)u=g[c],v.push(((t,n)=>{var a;return l+=1,a=i.editing_entity_anim_name===t&&null==i.editing_entity_animation_frame_index,E()(P,{key:l,name:t,entity:o,EntityClass:e,selected:a,editor:i,update:f,type_of_anims:d,select:()=>{if(i.editing_entity_anim_name=t,i.editing_entity_animation_frame_index=null,"Current Pose"!==t)return o.structure.setPose(e.poses[t])},delete_item:()=>(delete e.poses[t],i.editing_entity_anim_name="Current Pose",i.editing_entity_animation_frame_index=null),get_pose:()=>"Current Pose"===t||a?o.structure.getPose():e.poses[t],ref:e=>{if(null!=e)return r.push(e)}})})(c));return v}return E()("article.placeholder",{key:"placeholder"},"No poses")}return E()("article.placeholder",{key:"placeholder"},"Entity class is not initialized for animation")}if("animations"===d){if(null!=e.animations){if(Object.keys(e.animations).length>0){for(n in l=0,_=[],y=e.animations)t=y[n],_.push(((t,n)=>{var a;return l+=1,a=i.editing_entity_anim_name===t&&null!=i.editing_entity_animation_frame_index,E()(P,{key:l,name:t,entity:o,EntityClass:e,selected:a,editor:i,update:f,type_of_anims:d,select:()=>{var n;if(i.editing_entity_anim_name=t,i.editing_entity_animation_frame_index=0,u=null!=(n=e.animations[t])?n[0]:void 0)return o.structure.setPose(u)},delete_item:()=>(delete e.animations[t],i.editing_entity_anim_name="Current Pose",i.editing_entity_animation_frame_index=null),get_pose:()=>{if(n=e.animations[t])return p.lerpAnimationLoop(n,e.animations[t].length*Date.now()/1e3/2)},ref:e=>{if(null!=e)return r.push(e)}})})(n,t));return _}return E()("article.placeholder",{key:"placeholder"},"No animations")}return E()("article.placeholder",{key:"placeholder"},"Entity class is not initialized for animation")}if("animation-frames"===d){if(null!=e.animations){if(n=i.editing_entity_anim_name,null!=(s=e.animations[n])){for(b=[],a=h=0,m=s.length;h<m;a=++h)s[a],b.push(((a,s)=>{var l;return l=i.editing_entity_anim_name===n&&i.editing_entity_animation_frame_index===s,E()(P,{key:s,name:`Frame ${s}`,entity:o,EntityClass:e,selected:l,editor:i,update:f,type_of_anims:d,select:()=>(i.editing_entity_anim_name=n,i.editing_entity_animation_frame_index=s,u=e.animations[n][s],o.structure.setPose(u)),delete_item:()=>e.animations[n].splice(s,1),get_pose:()=>l?o.structure.getPose():null!=(t=e.animations[n])?t[s]:void 0,ref:e=>{if(null!=e)return r.push(e)}})})(0,a));return b}return E()("article.placeholder",{key:"placeholder"},"Error: Trying to display the frames of a non-existant animation")}return E()("article.placeholder",{key:"placeholder"},"Error: Entity class is not initialized for animation, trying to display the frames of an animation?")}return E()("article.placeholder",{key:"placeholder"},`Error: weird type_of_anims for AnimGroup ${d}`)}}.call(this),E()("button.add-anim-fab.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",{key:"add-button",ref:e=>{this.new_anim_button=e},onClick:()=>{var n,r,a;if("animation-frames"===d)t=e.animations[i.editing_entity_anim_name],a=o.structure.getPose(),t.push(a),i.editing_entity_animation_frame_index=t.length-1;else{for(r=n=function(){switch(d){case"poses":return"New Pose";case"animations":return"New Animation"}}(),l=1;null!=e[d][r];)r=`${n} ${l}`,l+=1;switch(d){case"poses":e.poses[r]=o.structure.getPose(),i.editing_entity_animation_frame_index=null;break;case"animations":e.animations[r]=[o.structure.getPose()],i.editing_entity_animation_frame_index=0}i.editing_entity_anim_name=r}return v.saveAnimations(e),f()}},E()("i.material-icons","add")))}componentDidMount(){return M(this,e),componentHandler.upgradeElement(w.a.findDOMNode(this.new_anim_button))}componentDidUpdate(){return M(this,e),componentHandler.upgradeElement(w.a.findDOMNode(this.new_anim_button))}},L=class e extends C.Component{constructor(){super(),this.update=this.update.bind(this),this.state={visible:!1}}render(){var e,t,n,r,i,o;return({editor:n}=this.props),({visible:o,EntityClass:e}=this.state),r=null!=(i=n.editing_entity)?i:this.shown_entity,t=null!=n.editing_entity_animation_frame_index,this.shown_entity=r,this.anims=[],E()(".bar.sidebar.anim-bar",{class:{visible:o}},E()(".anims",E()("h1","Poses"),E()(O,{entity:r,EntityClass:e,array_to_push_anims_to:this.anims,update:this.update,editor:n,type_of_anims:"poses"}),E()("h1","Animations"),E()(O,{entity:r,EntityClass:e,array_to_push_anims_to:this.anims,update:this.update,editor:n,type_of_anims:"animations"})),E()(".animation-frames",{class:{visible:o&&t}},E()("h1","Frames"),E()(O,{entity:r,EntityClass:e,array_to_push_anims_to:this.anims,update:this.update,editor:n,type_of_anims:"animation-frames",editing_frame_index:n.editing_entity_animation_frame_index})))}update(t){var n,r,i,o,a,s,l,u,c;if(function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,e),({editor:a}=this.props),({editing_entity_anim_name:o,editing_entity:i}=a),n=null!=i?g[i._class_]:void 0,t=t&&(null!=n?n.animations:void 0))for(s=0,l=(c=this.anims).length;s<l;s++)null!=(u=(r=c[s]).props.get_pose())&&(r.entity_preview.entity.structure.setPose(u),r.entity_preview.update());return this.setState({visible:t,EntityClass:n,editing_entity_anim_name:o})}},I=class e extends C.Component{constructor(){super(),this.update=this.update.bind(this),this.state={visible:!1}}render(){var e,t,n,r;return({editor:t}=this.props),({visible:r}=this.state),({sculpt_mode:n,brush_size:e}=t),E()(".bar.sidebar.terrain-bar",{class:{visible:r}},E()("h1","Terrain"),E()(".terrain-tools",E()("label.mdl-switch.mdl-js-switch.mdl-js-ripple-effect",{ref:e=>{this.sculpt_mode_switch=e}},E()("input.mdl-switch__input",{type:"checkbox",checked:n,onChange:e=>(t.sculpt_mode=e.target.checked,t.renderDOM())}),E()("span.mdl-switch__label","Sculpt Mode")),E()("label",E()("span.mdl-checkbox__label.mdl-slider__label","Brush Size"),E()("input.mdl-slider.mdl-js-slider",{type:"range",min:0,max:100,value:e,tabIndex:0,disabled:!n,style:{minWidth:200},ref:e=>{this.brush_size_slider=e},onChange:e=>(t.brush_size=e.target.value,t.renderDOM())}))))}componentDidMount(){return componentHandler.upgradeElement(w.a.findDOMNode(this.sculpt_mode_switch)),componentHandler.upgradeElement(w.a.findDOMNode(this.brush_size_slider))}update(t){var n,r;return function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,e),({editor:r}=this.props),({editing_entity:n}=r),t=t&&n instanceof b,this.setState({visible:t})}};n(19);class R{constructor(e={}){const t=["contextmenu","menubar"];let n=[],r=o(e.type)?e.type:"contextmenu",i=e.beforeShow;function o(e="",n=!1){return!(t.indexOf(e)<0)||(n&&console.error(`${e} is not a valid type`),!1)}Object.defineProperty(this,"items",{get:()=>n}),Object.defineProperty(this,"beforeShow",{get:()=>i}),Object.defineProperty(this,"type",{get:()=>r,set:e=>{r=o(e)?e:r}}),this.append=(e=>{if(!(e instanceof D))return console.error("appended item must be an instance of MenuItem"),!1;return n.push(e)}),this.insert=((e,t)=>e instanceof D?(n.splice(t,0,e),!0):(console.error("inserted item must be an instance of MenuItem"),!1)),this.remove=(e=>{if(!(e instanceof D))return console.error("item to be removed is not an instance of MenuItem"),!1;let t=n.indexOf(e);return t<0?(console.error("item to be removed was not found in this.items"),!1):(n.splice(t,0),!0)}),this.removeAt=(e=>(n.splice(e,0),!0)),this.node=null}createMacBuiltin(){return console.error("This method is not available in browser :("),!1}popup(e,t,n=null,r=!1){let i=!1,o=null!=n||this.submenu;if(this.submenu=r,r=r||this.menubarSubmenu,this.menubarSubmenu=r,!R._topmostMenu){R._topmostMenu=this;let e=R.contextMenuParent||document.body;R._listenerElement=e,e.addEventListener("mouseup",R._mouseHandler,!1),e.addEventListener("mousedown",R._mouseHandler,!1)}let a=this.buildMenu(o,r);if(a.jsMenu=this,this.node=a,R._currentMenuNode=a,this.node.parentNode){if(a===this.node)return;this.node.parentNode.replaceChild(a,this.node)}else{(R.contextMenuParent||document.body).appendChild(this.node)}let s=a.clientWidth,l=a.clientHeight;e+s>window.innerWidth&&(i=!0,e=o?window.innerWidth-n.parentNode.offsetLeft+2:0),t+l>window.innerHeight&&(t=window.innerHeight-l),i?(a.style.right=e+"px",a.style.left="auto"):(a.style.left=e+"px",a.style.right="auto"),a.style.top=t+"px",a.classList.add("show")}popdown(){if(this.items.forEach(e=>{e.submenu?e.submenu.popdown():e.node=null}),this.node&&"menubar"!==this.type&&(R._currentMenuNode=this.node.parentMenuNode,this.menubarSubmenu&&this.node.menuItem.classList.remove("submenu-active"),this.node.parentNode.removeChild(this.node),this.node=null),this==R._topmostMenu){R._topmostMenu=null;let e=R._listenerElement;e&&(e.removeEventListener("mouseup",R._mouseHandler,!1),e.removeEventListener("mousedown",R._mouseHandler,!1),R._listenerElement=null)}"menubar"===this.type&&this.clearActiveSubmenuStyling()}static popdownAll(){R._topmostMenu.popdown()}buildMenu(e=!1,t=!1){this.beforeShow&&this.beforeShow(this);let n=document.createElement("ul");return n.classList.add("nwjs-menu",this.type),e&&n.classList.add("submenu"),t&&n.classList.add("menubar-submenu"),n.jsMenu=this,n.parentMenuNode=R._currentMenuNode,this.items.forEach(e=>{e.beforeShow&&e.beforeShow(e),e.visible&&e.buildItem(n,"menubar"===this.type)}),n}static isDescendant(e,t){let n=t.parentNode;for(;null!==n;){if(n===e)return!0;n=n.parentNode}return!1}static _mouseHandler(e){let t=null!=R._menubarNode&&R.isDescendant(R._menubarNode,e.target),n=e.currentTarget==R._menubarNode,r=e.target;for(;r&&!r.jsMenuItem;)r=r.parentNode;if(e.type,"mousedown"!=e.type||r||R._topmostMenu&&R.popdownAll(),t==n&&r){let t=r.jsMenuItem;"mousedown"==e.type&&(t.node.classList.toggle("submenu-active"),t.submenu&&(t.node.classList.contains("submenu-active")?(r.jsMenu.node.activeItemNode=t.node,t.popupSubmenu(t.node.offsetLeft,t.node.clientHeight,!0)):(t.submenu.popdown(),r.jsMenu.node.currentSubmenu=null,r.jsMenu.node.activeItemNode=null))),"mouseup"==e.type&&t.doit(r)}}static setApplicationMenu(e,t=null){let n=R._menubarNode;if(n){let e=n.parentNode;null!=e&&e.removeChild(n),n.removeEventListener("mousedown",R._mouseHandler,!1),R._menubarNode=null}if(null!=e){null==t&&(t=R._menubarParent||document.body),R._menubarParent=t;let n=e.buildMenu();n.jsMenuItem=null,t.insertBefore(n,t.firstChild),n.addEventListener("mousedown",R._mouseHandler,!1),R._menubarNode=n,e.node=n}R._menubar=e}clearActiveSubmenuStyling(e){if(!this.node)return;let t=this.node.querySelectorAll(".submenu-active");for(let n of t)n!==e&&n.classList.remove("submenu-active")}static recursiveNodeFind(e,t){if(e.node===t)return!0;if(R.isDescendant(e.node,t))return!0;if(!(e.items.length>0))return!1;for(var n=0;n<e.items.length;n++){let r=e.items[n];if(r.node){if(r.node===t)return!0;if(R.isDescendant(r.node,t))return!0;if(r.submenu){if(recursiveNodeFind(r.submenu,t))return!0}else;}}return!1}isNodeInChildMenuTree(e=!1){return!!e&&recursiveNodeFind(this,e)}}R.contextMenuParent=null,R._currentMenuNode=null,R._keydownListener=function(e){function t(e,t,n){let r=!1,i=t;for(;;){if(!(i=i?n?i.nextSibling:i.previousSibling:null)){if(i=n?e.firstChild:e.lastChild,r||!i)return null;r=!0}if(i instanceof Element&&i.classList.contains("menu-item")&&"separator"!=i.jsMenuItem.type&&!i.classList.contains("disabled"))return i}}function n(e,n){let r=e.menuItem.parentNode,i=t(r,r.activeItemNode,n);return i&&i.jsMenuItem.select(i,!0,!0,!0),i}function r(e){e.jsMenuItem.selectSubmenu(e);let n=t(i=R._currentMenuNode,null,!0);n&&n.jsMenuItem.select(n,!0,!1)}let i=R._currentMenuNode;if(i){let o=i.activeItemNode;switch(e.keyCode){case 27:case 37:if(e.preventDefault(),e.stopPropagation(),37==e.keyCode&&i.jsMenu.menubarSubmenu&&n(i,!1))return;i.jsMenu.popdown();break;case 13:e.preventDefault(),e.stopPropagation(),o&&(o.jsMenuItem.submenu?r(o):o.jsMenuItem.doit(o));break;case 39:e.preventDefault(),e.stopPropagation(),o&&o.jsMenuItem.submenu?r(o):R._topmostMenu.menubarSubmenu&&n(i,!0);break;case 38:case 40:e.preventDefault(),e.stopPropagation();let a=t(i,i.activeItemNode,40==e.keyCode);a&&a.jsMenuItem.select(a,!0,!1)}}},R._keydownListening=!1,R._keydownListen=function(e){e!=R._keydownListening&&(e?document.addEventListener("keydown",R._keydownListener,!0):document.removeEventListener("keydown",R._keydownListener,!0)),R._keydownListening=e},R._keydownListen(!0);class D{constructor(e={}){const t=["cmd","command","super","shift","ctrl","alt"],n=["separator","checkbox","radio","normal"];let r=function(e="",t=!1){if(n.indexOf(e)<0)return t&&console.error(`${e} is not a valid type`),!1;return!0}(e.type)?e.type:"normal",i=e.submenu||null,o=e.click||null,a=d(e.modifiers)?e.modifiers:null,s=e.label||"",l=e.enabled;void 0===e.enabled&&(l=!0);let u=e.visible;void 0===e.visible&&(u=!0);let c=e.beforeShow;function d(e=""){let n=e.split("+");for(let e=0;e<n;e++){let r=n[e].trim();if(t.indexOf(r)<0)return console.error(`${r} is not a valid modifier`),!1}return!0}Object.defineProperty(this,"type",{get:()=>r}),Object.defineProperty(this,"beforeShow",{get:()=>c}),Object.defineProperty(this,"submenu",{get:()=>i,set:e=>{console.warn("submenu should be set on initialisation, changing this at runtime could be slow on some platforms."),e instanceof R?i=e:console.error("submenu must be an instance of Menu")}}),Object.defineProperty(this,"click",{get:()=>o,set:e=>{"function"==typeof e?o=e:console.error("click must be a function")}}),Object.defineProperty(this,"modifiers",{get:()=>a,set:e=>{a=d(e)?e:a}}),Object.defineProperty(this,"enabled",{get:()=>l,set:e=>{l=e}}),Object.defineProperty(this,"visible",{get:()=>u,set:e=>{u=e}}),Object.defineProperty(this,"label",{get:()=>s,set:e=>{s=e}}),this.icon=e.icon||null,this.iconIsTemplate=e.iconIsTemplate||!1,this.tooltip=e.tooltip||"",this.checked=e.checked||!1,this.key=e.key||null,this.accelerator=e.accelerator,this.node=null,this.key&&(this.key=this.key.toUpperCase())}toString(){return this.type+"["+this.label+"]"}_mouseoverHandle_menubarTop(){let e=this.node.jsMenuNode;if(e.activeItemNode&&(e.activeItemNode.classList.remove("active"),e.activeItemNode=null),e&&e.querySelector(".submenu-active")){if(this.node.classList.contains("submenu-active"))return;this.node.classList.add("submenu-active"),this.select(this.node,!0,!0,!0)}}doit(e){if(!this.submenu){if(R.popdownAll(),"checkbox"===this.type)this.checked=!this.checked;else if("radio"===this.type){this.checked=!0;for(let t=0;t<=1;t++)for(let n=e;(n=t?n.nextSibling:n.previousSibling)instanceof Element&&n.classList.contains("radio");)n.jsMenuItem.checked=!1}this.click&&this.click(this)}}select(e,t,n,r=!1){let i=e.jsMenuNode;i.activeItemNode&&(i.activeItemNode.classList.remove("active"),i.activeItemNode.classList.remove("submenu-active"),i.activeItemNode=null),i.currentSubmenu&&(i.currentSubmenu.popdown(),i.currentSubmenu=null),this.submenu&&n?this.selectSubmenu(e,r):e.classList.add("active"),this.node.jsMenuNode.activeItemNode=this.node}selectSubmenu(e,t){if(e.jsMenuNode.currentSubmenu=this.submenu,this.submenu.node)return;let n,r,i=e.parentNode;t?(n=e.offsetLeft,r=e.clientHeight):(n=i.offsetWidth+i.offsetLeft-2,r=i.offsetTop+e.offsetTop-4),this.popupSubmenu(n,r,t),e.classList.add("submenu-active")}buildItem(e,t=!1){let n=document.createElement("li");n.jsMenuNode=e,n.jsMenu=e.jsMenu,n.jsMenuItem=this,n.classList.add("menu-item",this.type),t=t||this.menuBarTopLevel||!1,this.menuBarTopLevel=t,t&&n.addEventListener("mouseenter",this._mouseoverHandle_menubarTop.bind(this));let r=document.createElement("div");if(r.classList.add("icon-wrap"),this.icon){let e=new Image;e.src=this.icon,e.classList.add("icon"),r.appendChild(e)}let i=document.createElement("div");i.classList.add("label");let o=document.createElement("div");o.classList.add("modifiers");let a=document.createElement("div");a.classList.add("checkmark"),this.checked&&!t&&n.classList.add("checked");let s="";if(this.submenu&&!t&&(s="▶︎",n.addEventListener("mouseleave",e=>{n!==e.target&&(R.isDescendant(n,e.target)||this.submenu.popdown())})),this.modifiers&&!t)if(D.useModifierSymbols){let e=this.modifiers.split("+");for(let t in D.modifierSymbols)e.indexOf(t)>-1&&(s+=D.modifierSymbols[t])}else s+=this.modifiers+"+";if(this.key&&!t&&(s+=this.key),this.accelerator&&!t){let e=this.accelerator,t= false?undefined:"Ctrl";s+=e=(e=e.replace("CommandOrControl",t)).replace("Mod+",t+"+")}this.enabled||n.classList.add("disabled"),t||"separator"==this.type||n.addEventListener("mouseenter",()=>{this.select(n,!0,!0)}),this.icon&&i.appendChild(r);let l=document.createElement("span");l.textContent=this.label,l.classList.add("label-text"),n.appendChild(a),i.appendChild(l),n.appendChild(i),o.appendChild(document.createTextNode(s)),n.appendChild(o),n.title=this.tooltip,this.node=n,e.appendChild(n)}popupSubmenu(e,t,n=!1){this.submenu.popup(e,t,this.node,n),this.submenu.node.menuItem=this.node,this.node.jsMenuNode.currentSubmenu=this.submenu}}D.modifierSymbols={shift:"⇧",ctrl:"⌃",alt:"⌥",cmd:"⌘",super:"⌘",command:"⌘"},D.keySymbols={up:"↑",esc:"⎋",tab:"⇥",left:"←",down:"↓",right:"→",pageUp:"⇞",escape:"⎋",pageDown:"⇟",backspace:"⌫",space:"Space"},D.useModifierSymbols="undefined"!=typeof navigator?/Mac/.test(navigator.platform):"undefined"!=typeof os&&"darwin"==os.platform();n(22);var j,F,U,z,A=[].indexOf;U=2*Math.PI,"undefined"!=typeof nw&&null!==nw?({Menu:j,MenuItem:F}=nw):(j=R,F=D),z="function"==typeof window.require?window.require("fs"):void 0,"function"==typeof window.require&&window.require("path");var B=class{constructor(e,t,n,r,i){var o;this.world=e,this.view=t,this.view_to=n,this.mouse=i,this.previous_mouse_world_x=-Infinity,this.previous_mouse_world_y=-Infinity,this.editing=!0,this.selected_entities=[],this.hovered_entities=[],this.selected_points=[],this.hovered_points=[],this.selection_box=null,this.editing_entity=null,this.editing_entity_anim_name=null,this.editing_entity_animation_frame_index=null,this.dragging_points=[],this.dragging_segments=[],this.dragging_entities=[],this.drag_offsets=[],this.view_drag_start_in_world=null,this.view_drag_momentum={x:0,y:0},this.last_click_time=null,this.sculpt_mode=!1,this.brush_size=50,this.sculpt_additive=!0,this.sculpting=!1,this.undos=[],this.redos=[],this.clipboard={},this.warning_message=null,this.show_warning=!1,this.warning_tid=-1,this.react_root_el=document.createElement("div"),this.react_root_el.className="react-root",document.body.appendChild(this.react_root_el),this.renderDOM(),null!=z&&(this.save_path="world.json"),this.grab_start=null,addEventListener("contextmenu",e=>{var t,n,r,i,o;if(e.preventDefault(),this.editing)return n=new j,this.hovered_entities.length&&(i=this.hovered_entities[0],A.call(this.selected_entities,i)<0)&&(this.selected_entities=function(){var e,n,r,i;for(i=[],e=0,n=(r=this.hovered_entities).length;e<n;e++)t=r[e],i.push(t);return i}.call(this)),n.append(new F({label:"Undo",click:()=>this.undo(),enabled:this.undos.length})),n.append(new F({label:"Redo",click:()=>this.redo(),enabled:this.redos.length})),n.append(new F({type:"separator"})),n.append(new F({label:"Cut",click:()=>this.cut(),enabled:this.selected_entities.length})),n.append(new F({label:"Copy",click:()=>this.copy(),enabled:this.selected_points.length||this.selected_entities.length})),n.append(new F({label:"Paste",click:()=>this.paste(),enabled:this.editing_entity?null!=this.clipboard.point_positions:null!=(o=this.clipboard.entities)?o.length:void 0})),n.append(new F({label:"Delete",click:()=>this.delete(),enabled:this.selected_entities.length})),n.append(new F({label:"Select All",click:()=>this.selectAll(),enabled:this.world.entities.length})),n.append(new F({type:"separator"})),this.editing_entity?(r=(e=>{var t,n,r;return t=g[this.editing_entity._class_],r=e(null!=(n=this.editing_entity_animation_frame_index)?t.animations[this.editing_entity_anim_name][n]:this.editing_entity.structure.getPose()),this.editing_entity.structure.setPose(r),null!=n?t.animations[this.editing_entity_anim_name][n]=r:t.poses[this.editing_entity_anim_name]=r,v.saveAnimations(t)}),n.append(new F({label:"Flip Pose Horizontally",enabled:this.editing_entity_anim_name&&"Current Pose"!==this.editing_entity_anim_name,click:()=>r(p.horizontallyFlip)})),n.append(new F({label:"Flip Pose Vertically",enabled:this.editing_entity_anim_name&&"Current Pose"!==this.editing_entity_anim_name,click:()=>r(p.verticallyFlip)})),n.append(new F({type:"separator"})),n.append(new F({label:"Finish Editing Entity",click:()=>this.finishEditingEntity()}))):n.append(new F({label:"Edit Entity",click:()=>this.editEntity(this.selected_entities[0]),enabled:this.selected_entities.length})),n.popup(e.x,e.y),!1}),o=(e=>{var t,n,i,o,a;if(e.target===r)return 1.2,i=this.view.scale,t=this.view.center_x,n=this.view.center_y,this.view.scale=this.view_to.scale,this.view.center_x=this.view_to.center_x,this.view.center_y=this.view_to.center_y,a=this.view.toWorld({x:e.clientX,y:e.clientY}),this.view_to.scale=e.detail<0||e.wheelDelta>0?1.2*this.view_to.scale:this.view_to.scale/1.2,this.view.scale=this.view_to.scale,o=this.view.toWorld({x:e.clientX,y:e.clientY}),this.view_to.center_x+=a.x-o.x,this.view_to.center_y+=a.y-o.y,this.view.scale=i,this.view.center_x=t,this.view.center_y=n}),addEventListener("mousewheel",o),addEventListener("DOMMouseScroll",o),addEventListener("keydown",e=>{if(!e.target.tagName.match(/input|textarea|select|button/i))switch(e.keyCode){case 32:case 80:return this.toggleEditing();case 46:return this.delete();case 90:if(e.ctrlKey)return e.shiftKey?this.redo():this.undo();break;case 89:if(e.ctrlKey)return this.redo();break;case 88:if(e.ctrlKey)return this.cut();break;case 67:if(e.ctrlKey)return this.copy();break;case 86:if(e.ctrlKey)return this.paste();break;case 65:if(e.ctrlKey)return this.selectAll()}})}save(){var e;return e=JSON.stringify(this.world,null,"\t"),null!=z?z.writeFileSync(this.save_path,e):localStorage["Skele2D World"]=e}load(){var e,t;return(e=null!=z?z.readFileSync(this.save_path):localStorage["Skele2D World"])?e?this.world.fromJSON(JSON.parse(e)):void 0:((t=new XMLHttpRequest).addEventListener("load",n=>{if(e=t.responseText)return this.world.fromJSON(JSON.parse(e))}),t.open("GET","world.json"),t.send())}discardSave(){return null!=z?z.unlinkSync(this.save_path):delete localStorage["Skele2D World"]}savePose(){var e;if(this.editing_entity_anim_name&&"Current Pose"!==this.editing_entity_anim_name)return e=g[this.editing_entity._class_],null!=this.editing_entity_animation_frame_index?e.animations[this.editing_entity_anim_name][this.editing_entity_animation_frame_index]=this.editing_entity.structure.getPose():e.poses[this.editing_entity_anim_name]=this.editing_entity.structure.getPose(),v.saveAnimations(e)}toJSON(){var e,t,n,r,i,o,a,s;if(a=function(){var e,n,r,i;for(i=[],e=0,n=(r=this.selected_entities).length;e<n;e++)t=r[e],i.push(t.id);return i}.call(this),e=null!=(i=this.editing_entity)?i.id:void 0,s=[],null!=this.editing_entity)for(r in o=this.editing_entity.structure.points)n=o[r],A.call(this.selected_points,n)>=0&&s.push(r);return{world:this.world,selected_entity_ids:a,editing_entity_id:e,selected_point_names:s}}fromJSON(e){var t,n,r,i,o,a,s,l,u,c;for(this.world.fromJSON(e.world),this.hovered_entities=[],this.hovered_points=[],this.selected_entities=[],this.selected_points=[],r=0,o=(l=e.selected_entity_ids).length;r<o;r++)n=l[r],null!=(t=this.world.getEntityByID(n))&&this.selected_entities.push(t);if(this.editing_entity=this.world.getEntityByID(e.editing_entity_id),null!=this.editing_entity){for(c=[],i=0,a=(u=e.selected_point_names).length;i<a;i++)s=u[i],c.push(this.selected_points.push(this.editing_entity.structure.points[s]));return c}}undoable(e){if(this.undos.push(JSON.stringify(this)),this.redos=[],null!=e)return e(),this.save()}undo(){return this.undo_or_redo(this.undos,this.redos)}redo(){return this.undo_or_redo(this.redos,this.undos)}undo_or_redo(e,t){if(0!==e.length)return t.push(JSON.stringify(this)),this.fromJSON(JSON.parse(e.pop())),this.save()}selectAll(){var e,t,n;return this.editing_entity?this.selected_points=function(){var e,r;for(n in r=[],e=this.editing_entity.structure.points)t=e[n],r.push(t);return r}.call(this):this.selected_entities=function(){var t,n,r,i;for(i=[],t=0,n=(r=this.world.entities).length;t<n;t++)e=r[t],i.push(e);return i}.call(this)}delete(){var e,t,n;if(!this.selected_points.length)return this.undoable(()=>{var e,t,n,r,i;for(n=0,r=(i=this.selected_entities).length;n<r;n++)(e=i[n]).destroyed=!0,(t=this.world.entities.indexOf(e))>=0&&this.world.entities.splice(t,1);return this.selected_entities=[],this.finishEditingEntity()});n=this.selected_points.length>1,this.undoable(()=>{var e,t,n,r,i,o,a,s;for(s in n=this.editing_entity.structure.segments)r=(a=n[s]).a,(A.call(this.selected_points,r)>=0||(i=a.b,A.call(this.selected_points,i)>=0))&&delete this.editing_entity.structure.segments[s];for(t in o=this.editing_entity.structure.points)e=o[t],A.call(this.selected_points,e)>=0&&delete this.editing_entity.structure.points[t];return this.selected_points=[],this.dragging_points=[]});try{this.editing_entity.draw(document.createElement("canvas").getContext("2d"),new View)}catch(t){return e=t,this.undo(),void(n?alert("Entity needs one or more of those points to render"):alert("Entity needs that point to render"))}try{return t=JSON.parse(JSON.stringify(this.editing_entity)),this.editing_entity.step(this.world),this.editing_entity.fromJSON(t)}catch(t){e=t,this.undo(),console.warn("Entity failed to step after deletion, with",e),n?alert("Entity needs one or more of those points to step"):alert("Entity needs that point to step")}}cut(){return this.copy(),this.delete()}copy(){var e;return this.selected_points.length?alert("Copying points is not supported"):this.clipboard.entities=function(){var t,n,r,i;for(i=[],t=0,n=(r=this.selected_entities).length;t<n;t++)e=r[t],i.push({json:JSON.stringify(e)});return i}.call(this)}paste(){return this.editing_entity?alert("Pasting points is not supported"):this.undoable(()=>{var e,t,n,r,i,o,a,s,l,u,c,d,f,p,h,m,g;for(this.selected_entities=[],p=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.clipboard.entities).length;e<t;e++)({json:l}=n[e]),delete(o=JSON.parse(l)).id,a=v.fromJSON(o),this.world.entities.push(a),this.selected_entities.push(a),r.push(a);return r}.call(this),r=function(){var e,r,o,s;for(s=[],e=0,r=p.length;e<r;e++){for(m in a=p[e],t={x:0,y:0},i=0,o=a.structure.points)h=o[m],t.x+=h.x,t.y+=h.y,i+=1;t.x/=i,t.y/=i,n=a.toWorld(t),s.push(n)}return s}(),e={x:0,y:0},s=0,c=r.length;s<c;s++)t=r[s],e.x+=t.x,e.y+=t.y;for(e.x/=r.length,e.y/=r.length,f=this.view.toWorld(this.mouse),g=[],u=0,d=p.length;u<d;u++)(a=p[u]).x+=f.x-e.x,g.push(a.y+=f.y-e.y);return g})}toggleEditing(){return this.editing=!this.editing,this.renderDOM()}step(){var e,t,n,r,i,o,s,l,c,d,f,p,h,g,y,v,_,x,w,k,E,C,S,T,N,P,M,O,L,I,R,D,j,F,U,z,B,W,$,H;if(C=this.view.toWorld(this.mouse),this.mouse.LMB.released){if((this.dragging_points.length||this.sculpting)&&(this.dragging_points=[],this.sculpting=!1,this.savePose(),this.save()),this.dragging_entities.length){for(this.save(),f=p=0,y=(O=this.dragging_entities).length;p<y;f=++p)null!=(c=O[f]).vx&&null!=c.vy&&(c.vx=(C.x+this.drag_offsets[f].x-c.x)/3,c.vy=(C.y+this.drag_offsets[f].y-c.y)/3);this.dragging_entities=[]}this.selection_box&&(this.editing_entity?this.selected_points=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.hovered_points).length;e<t;e++)c=n[e],r.push(c);return r}.call(this):this.selected_entities=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.hovered_entities).length;e<t;e++)c=n[e],r.push(c);return r}.call(this),this.selection_box=null)}if(E=8/this.view.scale,M=((e,t)=>{var n,r,i,o,a,s,l,u,c,d,f,p;return c=this.selection_box.x1-e.x,f=this.selection_box.y1-e.y,d=this.selection_box.x2-e.x,p=this.selection_box.y2-e.y,l=Math.min(c,d),a=Math.max(c,d),u=Math.min(f,p),s=Math.max(f,p),l<=(n=t.x)&&n<=a&&u<=(r=t.y)&&r<=s&&l<=(i=t.x)&&i<=a&&u<=(o=t.y)&&o<=s}),d=(e=>{var t,n,r,i,o,a,s,l,u,c,d,f,p,h,m;if(c=this.selection_box.x1-e.x,f=this.selection_box.y1-e.y,d=this.selection_box.x2-e.x,p=this.selection_box.y2-e.y,l=Math.min(c,d),a=Math.max(c,d),u=Math.min(f,p),s=Math.max(f,p),0===Object.keys(e.structure.segments).length)return!1;for(m in t=e.structure.segments)if(!(l<=(n=(h=t[m]).a.x)&&n<=a&&u<=(r=h.a.y)&&r<=s&&l<=(i=h.b.x)&&i<=a&&u<=(o=h.b.y)&&o<=s))return!1;return!0}),this.view.center_x-=this.view_drag_momentum.x,this.view.center_y-=this.view_drag_momentum.y,this.view_to.center_x-=this.view_drag_momentum.x,this.view_to.center_y-=this.view_drag_momentum.y,this.view_drag_momentum.x*=.8,this.view_drag_momentum.y*=.8,this.dragging_points=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.dragging_points).length;e<t;e++)N=n[e],r.push(this.editing_entity.structure.points[N.name]);return r}.call(this),this.selected_points=function(){var e,t,n,r;for(r=[],e=0,t=(n=this.selected_points).length;e<t;e++)N=n[e],r.push(this.editing_entity.structure.points[N.name]);return r}.call(this),this.view_drag_start_in_world)this.mouse.MMB.down?(this.view.center_x-=C.x-this.view_drag_start_in_world.x,this.view.center_y-=C.y-this.view_drag_start_in_world.y,this.view_to.center_x=this.view.center_x,this.view_to.center_y=this.view.center_y,this.view_drag_momentum.x=0,this.view_drag_momentum.y=0):(this.view_drag_momentum.x=C.x-this.view_drag_start_in_world.x,this.view_drag_momentum.y=C.y-this.view_drag_start_in_world.y,this.view_drag_start_in_world=null);else if(this.mouse.MMB.pressed)this.view_drag_start_in_world={x:C.x,y:C.y};else if(this.mouse.double_clicked)this.hovered_entities.length?(L=this.hovered_entities[0],A.call(this.selected_entities,L)>=0&&this.editEntity(this.hovered_entities[0])):this.finishEditingEntity();else if(this.dragging_entities.length)for(f=h=0,v=(R=this.dragging_entities).length;h<v;f=++h)(c=R[f]).x=C.x+this.drag_offsets[f].x,c.y=C.y+this.drag_offsets[f].y;else if(this.dragging_points.length){for(w=this.editing_entity.fromWorld(C),f=g=0,_=(D=this.dragging_points).length;g<_;f=++g)(N=D[f]).x=w.x+this.drag_offsets[f].x,N.y=w.y+this.drag_offsets[f].y;"function"==typeof(e=this.editing_entity.structure).onchange&&e.onchange()}else if(this.dragging_segments.length);else if(this.selection_box)this.selection_box.x2=C.x,this.selection_box.y2=C.y,this.editing_entity?this.hovered_points=function(){var e,t;for(P in t=[],e=this.editing_entity.structure.points)N=e[P],M(this.editing_entity,N)&&t.push(N);return t}.call(this):this.hovered_entities=function(){var e,t,n,r;for(r=[],t=0,e=(n=this.world.entities).length;t<e;t++)c=n[t],d(c)&&r.push(c);return r}.call(this);else if(this.grab_start)this.mouse.LMB.down?a(this.mouse,this.grab_start)>2&&(this.selected_points.length?this.dragPoints(this.selected_points,this.grab_start_in_world):this.selected_entities.length&&this.dragEntities(this.selected_entities,this.grab_start_in_world),this.grab_start=null):this.grab_start=null;else if(this.sculpting)if(this.mouse.LMB.down){for(P in S=C.x-this.previous_mouse_world_x,T=C.y-this.previous_mouse_world_y,w=this.editing_entity.fromWorld(C),j=this.editing_entity.structure.points)o=(s=(N=j[P]).x-w.x)*s+(l=N.y-w.y)*l,(i=Math.sqrt(o))<this.brush_size&&(N.x+=S/Math.max(1200,o)*500,N.y+=T/Math.max(1200,o)*500);"function"==typeof(t=this.editing_entity.structure).onchange&&t.onchange()}else this.sculpting=!1;else{if(this.hovered_entities=[],this.hovered_points=[],this.editing_entity)if(w=this.editing_entity.fromWorld(C),this.editing_entity instanceof b&&this.sculpt_mode)this.sculpt_additive=this.editing_entity.structure.pointInPolygon(w);else{for(P in n=Infinity,F=this.editing_entity.structure.points)N=F[P],(i=a(w,N))<E&&i<n&&(n=i,this.hovered_points=[N]);if(!this.hovered_points.length)for(H in n=Infinity,U=this.editing_entity.structure.segments)$=U[H],(i=u(w,$.a,$.b))<(null!=(z=$.width)?z:5)&&i<n&&(n=i,this.hovered_segments=[$])}else{for(n=Infinity,r=null,k=0,x=(B=this.world.entities).length;k<x;k++)c=B[k],(i=this.distanceToEntity(c,C))<E&&(i<n||!(c instanceof b)&&r instanceof b)&&(r=c,n=i);null!=r&&(this.hovered_entities=[r])}this.mouse.LMB.pressed&&(this.dragging_points=[],this.dragging_segments=[],this.editing_entity instanceof b&&this.sculpt_mode?(this.undoable(),this.sculpting=!0):this.hovered_points.length?(W=this.hovered_points[0],A.call(this.selected_points,W)>=0?this.grabPoints(this.selected_points,C):this.grabPoints(this.hovered_points,C)):(this.selected_points=[],this.hovered_entities.length?(I=this.hovered_entities[0],A.call(this.selected_entities,I)>=0?this.grabEntities(this.selected_entities,C):this.grabEntities(this.hovered_entities,C)):this.selection_box={x1:C.x,y1:C.y,x2:C.x,y2:C.y}))}if(this.editing_entity&&this.editing_entity.structure instanceof m)for(var V=0;V<=250;V++)this.editing_entity.structure.stepLayout();return this.previous_mouse_world_x=C.x,this.previous_mouse_world_y=C.y}editEntity(e){return this.editing_entity=e,this.selected_entities=[e]}finishEditingEntity(){return this.editing_entity=null,this.selected_entities=[],this.selected_points=[],this.dragging_entities=[],this.dragging_points=[],this.sculpting=!1}distanceToEntity(e,t){var n,r,i,o,s,l,c,d,f;for(f in i=e.fromWorld(t),n=Infinity,l=e.structure.segments)d=l[f],r=u(i,d.a,d.b),n=Math.min(n,r);for(s in c=e.structure.points)o=c[s],r=a(i,o),n=Math.min(n,r);return n}grabPoints(e,t){var n,r,i;if(!this.editing_entity||"Current Pose"!==this.editing_entity_anim_name||null==(n=g[this.editing_entity._class_]).poses&&null==n.animations)return this.grab_start={x:this.mouse.x,y:this.mouse.y},this.grab_start_in_world=t,this.selected_points=function(){var t,n,r;for(r=[],t=0,n=e.length;t<n;t++)i=e[t],r.push(i);return r}(),r=this.editing_entity.fromWorld(t),this.drag_offsets=function(){var e,t,n,o;for(o=[],e=0,t=(n=this.dragging_points).length;e<t;e++)i=n[e],o.push({x:i.x-r.x,y:i.y-r.y});return o}.call(this);this.warn("No pose is selected. Select a pose to edit.")}dragPoints(e,t){var n,r;return this.selected_points=function(){var t,n,i;for(i=[],t=0,n=e.length;t<n;t++)r=e[t],i.push(r);return i}(),this.undoable(),this.dragging_points=function(){var t,n,i;for(i=[],t=0,n=e.length;t<n;t++)r=e[t],i.push(r);return i}(),n=this.editing_entity.fromWorld(t),this.drag_offsets=function(){var e,t,i,o;for(o=[],e=0,t=(i=this.dragging_points).length;e<t;e++)r=i[e],o.push({x:r.x-n.x,y:r.y-n.y});return o}.call(this)}grabEntities(e,t){var n;return this.grab_start={x:this.mouse.x,y:this.mouse.y},this.grab_start_in_world=t,this.selected_entities=function(){var t,r,i;for(i=[],t=0,r=e.length;t<r;t++)n=e[t],i.push(n);return i}(),this.drag_offsets=function(){var e,r,i,o;for(o=[],e=0,r=(i=this.dragging_entities).length;e<r;e++)n=i[e],null!=t?o.push({x:n.x-t.x,y:n.y-t.y}):o.push({x:0,y:0});return o}.call(this)}dragEntities(e,t){var n;return this.selected_entities=function(){var t,r,i;for(i=[],t=0,r=e.length;t<r;t++)n=e[t],i.push(n);return i}(),this.undoable(),this.dragging_entities=function(){var t,r,i;for(i=[],t=0,r=e.length;t<r;t++)n=e[t],i.push(n);return i}(),this.drag_offsets=function(){var e,r,i,o;for(o=[],e=0,r=(i=this.dragging_entities).length;e<r;e++)n=i[e],null!=t?o.push({x:n.x-t.x,y:n.y-t.y}):o.push({x:0,y:0});return o}.call(this)}draw(e,t){var n,r,i,o,a,s,l,u,c,d,f,p,h,m,g,y,v,_;for(r=((n,r,i)=>{var o,a,s,l;for(a in l=[],s=n.structure.points)o=s[a],e.beginPath(),e.arc(o.x,o.y,r/t.scale,0,U),e.fillStyle=i,l.push(e.fill());return l}),i=((n,r,i)=>{var o,a,s,l;for(l in a=[],o=n.structure.segments)s=o[l],e.beginPath(),e.moveTo(s.a.x,s.a.y),e.lineTo(s.b.x,s.b.y),e.lineWidth=r/t.scale,e.lineCap="round",e.strokeStyle=i,a.push(e.stroke());return a}),this.editing_entity&&(e.save(),e.translate(this.editing_entity.x,this.editing_entity.y),r(this.editing_entity,3,"rgba(255, 0, 0, 1)"),i(this.editing_entity,1,"rgba(255, 170, 0, 1)"),e.restore()),a=0,u=(g=this.selected_entities).length;a<u;a++)(o=g[a])!==this.editing_entity&&(e.save(),e.translate(o.x,o.y),r(o,2,"rgba(255, 170, 0, 1)"),i(o,1,"rgba(255, 170, 0, 1)"),e.restore());for(s=0,c=(y=this.hovered_entities).length;s<c;s++)o=y[s],A.call(this.selected_entities,o)<0&&(e.save(),e.translate(o.x,o.y),r(o,2,"rgba(255, 170, 0, 0.2)"),i(o,1,"rgba(255, 170, 0, 0.5)"),e.restore());if(null!=this.editing_entity)if(this.editing_entity instanceof b&&this.sculpt_mode)h=this.view.toWorld(this.mouse),e.beginPath(),e.arc(h.x,h.y,this.brush_size,0,U),e.fillStyle="rgba(0, 155, 255, 0.1)",e.strokeStyle="rgba(0, 155, 255, 0.8)",e.lineWidth=1/t.scale,e.fill(),e.stroke();else{for(e.save(),e.translate(this.editing_entity.x,this.editing_entity.y),l=0,d=(v=this.selected_points).length;l<d;l++)m=v[l],e.beginPath(),e.arc(m.x,m.y,3/t.scale,0,U),e.fillStyle="rgba(255, 0, 0, 1)",e.fill(),e.lineWidth=1.5/t.scale,e.strokeStyle="rgba(255, 170, 0, 1)",e.stroke();e.restore()}for(p=0,f=(_=this.selected_entities).length;p<f;p++)o=_[p],e.strokeStyle="rgba(255, 170, 0, 1)",n=o.bbox(),e.lineWidth=1/t.scale,e.strokeRect(n.x,n.y,n.width,n.height);if(null!=this.selection_box)return e.save(),e.beginPath(),1===t.scale&&e.translate(.5,.5),e.rect(this.selection_box.x1,this.selection_box.y1,this.selection_box.x2-this.selection_box.x1,this.selection_box.y2-this.selection_box.y1),e.fillStyle="rgba(0, 155, 255, 0.1)",e.strokeStyle="rgba(0, 155, 255, 0.8)",e.lineWidth=1/t.scale,e.fill(),e.stroke(),e.restore()}warn(e,t=2e3){return this.warning_message=e,this.show_warning=!0,this.renderDOM(),clearTimeout(this.warning_tid),this.warning_tid=setTimeout(()=>(this.show_warning=!1,this.renderDOM()),t)}renderDOM(){var e;return e=E()(".editor",E()(N,{editor:this,ref:e=>{this.entities_bar=e}}),E()(L,{editor:this,ref:e=>{this.anim_bar=e}}),E()(I,{editor:this,ref:e=>{this.terrain_bar=e}}),E()(".warning",{class:this.show_warning?"show":void 0},this.warning_message)),w.a.render(e,this.react_root_el)}updateGUI(){var e;return this.editing_entity||(this.editing_entity_anim_name="Current Pose",this.editing_entity_animation_frame_index=null),e=this.editing,this.entities_bar.update(e),this.anim_bar.update(e),this.terrain_bar.update(e)}},W=class{constructor(e){this.x=-Infinity,this.y=-Infinity,this.LMB={down:!1,pressed:!1,released:!1},this.MMB={down:!1,pressed:!1,released:!1},this.RMB={down:!1,pressed:!1,released:!1},this.double_clicked=!1,addEventListener("mousemove",e=>(this.x=e.clientX,this.y=e.clientY)),e.addEventListener("mousedown",e=>{var t;return(t=this[`${"LMR"[e.button]}MB`]).down=!0,t.pressed=!0}),addEventListener("mouseup",e=>{var t;return(t=this[`${"LMR"[e.button]}MB`]).down=!1,t.released=!0}),e.addEventListener("dblclick",e=>{return this[`${"LMR"[e.button]}MB`].pressed=!0,this.double_clicked=!0})}resetForNextStep(){return this.LMB.pressed=!1,this.MMB.pressed=!1,this.RMB.pressed=!1,this.LMB.released=!1,this.MMB.released=!1,this.RMB.released=!1,this.double_clicked=!1}};t.default={Entity:v,Terrain:b,Structure:h,BoneStructure:m,PolygonStructure:m,Pose:p,Editor:B,View:S,Mouse:W,entityClasses:g,addEntityClass:function(e){return g[e.name]=e},helpers:o}}]).default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).Entity;

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).Terrain;

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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Can it walk and/or run and/or jump, and not much else? It might be a SimpleActor.
// SimpleActors have rectangular collision boxes and basic physics.
var Entity, SimpleActor;

Entity = __webpack_require__(1);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, TAU, Tree;

Entity = __webpack_require__(1);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Bow, Entity, TAU, addEntityClass;

Entity = __webpack_require__(1);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Arrow, Entity, TAU, addEntityClass;

Entity = __webpack_require__(1);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Editor, Mouse, Player, SavannaGrass, View, World, animate, canvas, ctx, e, editor, keyboard, mouse, terrain, view, view_smoothness, view_to, world;

Math.seedrandom("A world");

({View, Mouse, Editor} = __webpack_require__(0));

World = __webpack_require__(10);

keyboard = __webpack_require__(3);

SavannaGrass = __webpack_require__(11);

__webpack_require__(12);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(13);

__webpack_require__(14);

Player = __webpack_require__(15);

__webpack_require__(6);

__webpack_require__(7);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, Terrain, World;

Entity = __webpack_require__(1);

Terrain = __webpack_require__(2);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var SavannaGrass, Terrain, addEntityClass, lineSegmentsIntersect;

Terrain = __webpack_require__(2);

({addEntityClass} = __webpack_require__(0));

({lineSegmentsIntersect} = __webpack_require__(0).helpers);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Rock, Terrain, addEntityClass;

Terrain = __webpack_require__(2);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var SavannaTreeA, TAU, Tree, addEntityClass;

Tree = __webpack_require__(5);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Entity, GranddaddyLonglegs, TAU, addEntityClass, distance,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  indexOf = [].indexOf;

Entity = __webpack_require__(1);

({addEntityClass} = __webpack_require__(0));

({distance} = __webpack_require__(0).helpers);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Arrow, Bow, Entity, Player, Pose, SimpleActor, TAU, addEntityClass, distance, distanceToLineSegment, keyboard;

SimpleActor = __webpack_require__(4);

Entity = __webpack_require__(1);

({Pose} = __webpack_require__(0));

Bow = __webpack_require__(6);

Arrow = __webpack_require__(7);

keyboard = __webpack_require__(3);

({addEntityClass} = __webpack_require__(0));

({distance, distanceToLineSegment} = __webpack_require__(0).helpers);

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