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

	var Control = __webpack_require__(5);

	var Player = React.createClass({ displayName: "Player",

		getInitialState: function getInitialState() {

			var data = this.props.data;

			return {

				playing: false,

				poster: data.poster,
				sources: data.sources,
				source: data.source,
				volume: data.volume

			};
		},

		render: function render() {

			var props = this.props,
			    state = this.state;

			// console.log(state.sources);

			return React.createElement("div", { className: "player" }, "poster: ", state.poster, React.createElement("br", null), React.createElement("br", null), "source: ", state.source, React.createElement("br", null), React.createElement("br", null), "volume: ", state.volume, React.createElement("br", null), React.createElement("br", null), React.createElement(Control, { actions: this.getActions(),
				playing: state.playing }));
		},

		getActions: function getActions() {
			return {

				playPause: this.playPause

			};
		},

		playPause: function playPause() {

			this.setState({

				playing: !this.state.playing

			});
		}

	});

	module.exports = Player;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var PlayPause = __webpack_require__(6);

	var Control = React.createClass({ displayName: "Control",

			render: function render() {

					var props = this.props;

					return React.createElement("div", { className: "player__control" }, React.createElement(PlayPause, { actions: props.actions,
							playing: props.playing }));
			}

	});

	module.exports = Control;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var cx = React.addons.classSet;

	var Playpause = React.createClass({ displayName: "Playpause",

			render: function render() {

					var props = this.props;

					var className = cx({

							"player__control__play-pause": true,
							"player__control__play-pause--paused": !props.playing

					});

					return React.createElement("div", { className: className, onClick: this.handleClick }, React.createElement("div", { className: "player__control__play-pause__icon" }));
			},

			handleClick: function handleClick() {

					this.props.actions.playPause();
			}

	});

	module.exports = Playpause;

/***/ }
/******/ ]);