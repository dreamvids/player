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

	var on = __webpack_require__(5);

	var Control = __webpack_require__(6);

	var Player = React.createClass({ displayName: "Player",

			getInitialState: function getInitialState() {

					var data = this.props.data;

					return {

							height: 0,

							playing: false,
							currentTime: 0,
							duration: 0,

							poster: data.poster,
							sources: data.sources,
							source: data.source,
							volume: data.volume

					};
			},

			render: function render() {

					var props = this.props,
					    state = this.state;

					var style = {

							height: state.height + "px"

					};

					return React.createElement("div", { className: "player", style: style }, "poster: ", state.poster, React.createElement("br", null), React.createElement("br", null), "source: ", state.source, React.createElement("br", null), React.createElement("br", null), "volume: ", state.volume, React.createElement("br", null), React.createElement("br", null), React.createElement(Control, { actions: this.getActions(),
							playing: state.playing,
							currentTime: state.currentTime,
							duration: state.duration }));
			},

			componentDidMount: function componentDidMount() {

					this.setHeight();

					if (typeof window.addEventListener !== "undefined") {

							window.addEventListener("resize", this.setHeight);
					}
			},

			componentWillUnmount: function componentWillUnmount() {

					if (typeof window.removeEventListener !== "undefined") {

							window.removeEventListener("resize", this.setHeight);
					}
			},

			setHeight: function setHeight() {

					var state = this.state;

					var newHeight = Math.round(this.getDOMNode().offsetWidth / 16 * 9);

					if (state.height !== newHeight) {

							this.setState({

									height: newHeight

							});
					}
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

	function on(element, event, fn) {

		if (!(typeof element.nodeName === "string" || element === window || element === document) || typeof event !== "string" || typeof fn !== "function") {

			console.error("Invalid arguments `on`", {

				element: element,
				event: event,
				fn: fn

			});

			return;
		}

		var that = {

			element: element,
			event: event.split(" ").join(""),
			fn: fn,
			_bind: element

		};

		that.bind = function (bind) {

			this._bind = bind;
		};

		if (typeof that.element.addEventListener !== "undefined") {

			that.element.addEventListener(that.event, (function (that) {

				return function (event) {

					that.fn.call(that._bind, event);
				};
			})(that), false);
		} else if (typeof that.element.attachEvent !== "undefined") {

			that.element.attachEvent("on" + that.event, (function (that) {

				return function (event) {

					that.fn.call(that._bind, event);
				};
			})(that));
		}

		return that;
	}

	module.exports = on;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var PlayPause = __webpack_require__(7);
	var TimeLine = __webpack_require__(8);
	var Time = __webpack_require__(9);

	var Control = React.createClass({ displayName: "Control",

					render: function render() {

									var props = this.props;

									var time = 1000;

									return React.createElement("div", { className: "player__control" }, React.createElement(PlayPause, { actions: props.actions,
													playing: props.playing }), React.createElement(Time, null, props.currentTime), React.createElement(TimeLine, { actions: props.actions }), React.createElement(Time, null, props.duration));
					}

	});

	module.exports = Control;

/***/ },
/* 7 */
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var Slider = __webpack_require__(10);

	var TimeLine = React.createClass({ displayName: "TimeLine",

		render: function render() {

			return React.createElement("div", { className: "player__control__time-line" }, React.createElement(Slider, null));
		}

	});

	module.exports = TimeLine;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var zero = __webpack_require__(11);

	var Time = React.createClass({ displayName: "Time",

			render: function render() {

					var time = parseInt(this.props.children) / 1000;

					var hours = Math.floor(time / 3600);
					var minutes = Math.floor((time - hours * 3600) / 60);
					var seconds = zero(Math.floor(time - hours * 3600 - minutes * 60));

					hours = zero(hours);
					minutes = zero(minutes);

					var content = (hours !== "00" ? hours + ":" : "") + minutes + ":" + seconds;

					return React.createElement("div", { className: "player__control__time" }, content);
			}

	});

	module.exports = Time;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var Slider = React.createClass({ displayName: "Slider",

			render: function render() {

					var props = this.props;

					var percent = 20;

					return React.createElement("div", { className: "player__control__time-line__slider" }, React.createElement("div", { className: "player__control__time-line__slider__wrap" }, React.createElement("div", { className: "player__control__time-line__slider__current",
							style: { width: percent + "%" } }), React.createElement("div", { className: "player__control__time-line__slider__cursor",
							style: { left: percent + "%" } })));
			}

	});

	module.exports = Slider;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function zero(number) {

		return "00".substring(0, 2 - ("" + number).length) + ("" + number);
	}

	module.exports = zero;

/***/ }
/******/ ]);