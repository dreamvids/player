/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var error = __webpack_require__(2);
	var isset = __webpack_require__(3);

	var Player = __webpack_require__(4);

	window.DreamPlayer = function (data) {

		if (isset(data.cible) && data.cible) {

			React.render(React.createElement(Player, { data: data }), data.cible);
		} else {

			error("Aucune cible n'a été défini pour le player");
		}
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function error(message) {

		console.error("DreamPlayer:", message);
	}

	module.exports = error;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function isset(variable) {

		return typeof variable !== "undefined";
	}

	module.exports = isset;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var Player = React.createClass({ displayName: "Player",

			getInitialState: function getInitialState() {

					var data = this.props.data;

					return {

							poster: data.poster,
							sources: data.sources,
							source: data.source,
							volume: data.volume

					};
			},

			render: function render() {

					var props = this.props,
					    state = this.state;

					console.log(state.sources);

					return React.createElement("div", { className: "player" }, "poster: ", state.poster, React.createElement("br", null), React.createElement("br", null), "sources: ", JSON.stringify(state.sources), React.createElement("br", null), React.createElement("br", null), "source: ", state.source, React.createElement("br", null), React.createElement("br", null), "volume: ", state.volume, React.createElement("br", null), React.createElement("br", null));
			}

	});

	module.exports = Player;

/***/ }
/******/ ]);