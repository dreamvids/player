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
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function error(message) {

		console.error("DreamPlayer:", message);
	}

	module.exports = error;

/***/ },
/* 3 */
/***/ function(module, exports) {

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
	var cx = React.addons.classSet;

	var on = __webpack_require__(5);

	var Control = __webpack_require__(6);

	var Player = React.createClass({ displayName: "Player",

		getInitialState: function getInitialState() {

			var data = this.props.data;

			return {

				height: 0,

				fullscreen: false,
				playing: false,
				currentTime: 0,
				duration: 0,
				buffer: 0,

				poster: data.poster,
				sources: data.sources,
				source: data.source,
				volume: data.volume,

				dragging: null,
				dragFrom: 0,
				dragDeplacement: 0,
				dropFunctions: {},

				controlVisible: true

			};
		},

		render: function render() {

			var props = this.props,
			    state = this.state,
			    actions = this.getActions();

			var source = state.sources[state.source];

			var style = {

				height: state.height + "px"

			};

			var classes = cx({

				"player": true,
				"player--fullscreen": state.fullscreen

			});

			return React.createElement("div", { className: classes,
				style: style,

				onMouseUp: actions.dragControl.bind(this, "time"),
				onMouseMove: this.onMouseMove }, React.createElement("video", { ref: "video", onClick: this.handleVideoClick }, React.createElement("source", { src: source.mp4, type: "video/mp4" }), React.createElement("source", { src: source.webm, type: "video/webm" })), React.createElement(Control, { actions: actions,

				visible: state.controlVisible,

				playing: state.playing,
				fullscreen: state.fullscreen,

				sources: state.sources,
				source: state.source,

				currentTime: state.currentTime,
				duration: state.duration,
				buffer: state.buffer,

				dragging: state.dragging,
				dragFrom: state.dragFrom,
				dragDeplacement: state.dragDeplacement }));
		},

		componentDidMount: function componentDidMount() {

			var state = this.state,
			    actions = this.getActions();

			var video = this.refs.video.getDOMNode();

			video.setAttribute("autobuffer", "");
			video.setAttribute("x-webkit-airplay", "allow");
			video.preload = "auto";
			video.poster = state.poster;
			video.volume = state.volume;

			video.play();

			var events = ["play", "pause", "durationchange", "timeupdate", "loadedmetadata", "dblclick"];

			for (var i = 0, length = events.length; i < length; i++) {

				on(video, events[i], actions.videoEvents.bind(this, events[i]));
			}

			actions.setHeight();
			actions.hideControlTimeout();

			if (typeof window.addEventListener !== "undefined") {

				window.addEventListener("resize", actions.setHeight);

				window.addEventListener("webkitfullscreenchange", actions.fullscreenChange);
				window.addEventListener("mozfullscreenchange", actions.fullscreenChange);
				window.addEventListener("fullscreenchange", actions.fullscreenChange);
			}
		},

		componentWillUnmount: function componentWillUnmount() {

			var actions = this.getActions();

			if (typeof window.removeEventListener !== "undefined") {

				window.removeEventListener("resize", actions.setHeight);
			}
		},

		handleVideoClick: function handleVideoClick() {

			this.getActions().playPause();
		},

		onMouseMove: function onMouseMove(event) {

			this.getActions().hideControlTimeout();
			this.getActions().dragControl("time", event);
		},

		getActions: function getActions() {
			return {

				setHeight: __webpack_require__(14).bind(this),

				playPause: __webpack_require__(15).bind(this),
				seekTo: __webpack_require__(16).bind(this),
				updateBuffer: __webpack_require__(17).bind(this),

				setSource: __webpack_require__(18).bind(this),

				dragControl: __webpack_require__(19).bind(this),
				onDraggerDrop: __webpack_require__(20).bind(this),
				hideControlTimeout: __webpack_require__(21).bind(this),
				hideControl: __webpack_require__(22).bind(this),
				showControl: __webpack_require__(23).bind(this),

				videoEvents: __webpack_require__(24).bind(this),

				toggleFullscreen: __webpack_require__(25).bind(this),
				fullscreenChange: __webpack_require__(26).bind(this)

			};
		}

	});

	module.exports = Player;

/***/ },
/* 5 */
/***/ function(module, exports) {

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
	var Time = __webpack_require__(10);
	var Quality = __webpack_require__(12);
	var Fullscreen = __webpack_require__(13);

	var Control = React.createClass({ displayName: "Control",

		render: function render() {

			var props = this.props;

			var className = "player__control";

			if (!props.visible) {
				className += " player__control--hide";
			}

			var time = 1000;

			var currentTime = props.currentTime;

			if (props.dragging === "time") {

				var sliderWidth = this.refs.slider.getDOMNode().offsetWidth;

				currentTime = Math.round(Math.max(Math.min(props.currentTime / props.duration + props.dragDeplacement / sliderWidth, 1), 0) * props.duration) || 0;
			}

			return React.createElement("div", { className: className,
				onMouseMove: this.hideControlTimeout,
				onMouseDown: this.hideControlTimeout,
				onMouseUp: this.hideControlTimeout }, React.createElement(PlayPause, { actions: props.actions,
				playing: props.playing }), React.createElement(Time, null, currentTime), React.createElement(TimeLine, { ref: "slider",
				actions: props.actions,

				currentTime: props.currentTime,
				duration: props.duration,
				buffer: props.buffer,

				dragging: props.dragging,
				dragFrom: props.dragFrom,
				dragDeplacement: props.dragDeplacement }), React.createElement(Time, null, props.duration), React.createElement(Quality, { actions: props.actions,
				sources: props.sources,
				source: props.source }), React.createElement(Fullscreen, { actions: props.actions,
				actions: props.actions }));
		},

		hideControlTimeout: function hideControlTimeout() {

			this.props.actions.hideControlTimeout();
		}

	});

	module.exports = Control;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var cx = React.addons.classSet;

	var PlayPause = React.createClass({ displayName: "PlayPause",

		render: function render() {

			var props = this.props;

			var className = cx({

				"player__control__play-pause": true,
				"player__control__play-pause--playing": props.playing

			});

			return React.createElement("div", { className: className, onMouseDown: this.handleMouseDown }, React.createElement("div", { className: "player__control__play-pause__icon" }));
		},

		handleMouseDown: function handleMouseDown() {

			this.props.actions.playPause();
		}

	});

	module.exports = PlayPause;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var offset = __webpack_require__(9);

	var TimeLine = React.createClass({ displayName: "TimeLine",

		render: function render() {

			var props = this.props;

			var currentPercent = Math.max(Math.min(props.currentTime / props.duration, 1), 0) * 100 || 0;

			var bufferPercent = Math.max(Math.min(props.buffer / props.duration, 1), 0) * 100 || 0;

			if (props.dragging === "time") {

				var deplacement = props.dragDeplacement;

				var sliderWidth = this.refs.slider.getDOMNode().offsetWidth;

				currentPercent = Math.max(Math.min(currentPercent / 100 + deplacement / sliderWidth, 1), 0) * 100;
			}

			return React.createElement("div", { className: "player__control__time-line",
				ref: "slider" }, React.createElement("div", { className: "player__control__time-line__slider",
				onMouseDown: this.handleMouseDown }, React.createElement("div", { className: "player__control__time-line__slider__wrap" }, React.createElement("div", { className: "player__control__time-line__slider__current",
				style: { width: currentPercent + "%" } }), React.createElement("div", { className: "player__control__time-line__slider__buffer",
				style: { width: bufferPercent + "%" } }), React.createElement("div", { className: "player__control__time-line__slider__cursor",
				style: { left: currentPercent + "%" } }))));
		},

		componentDidMount: function componentDidMount() {

			this.props.actions.onDraggerDrop("time", this.handleDrop);
		},

		handleMouseDown: function handleMouseDown(event) {

			var props = this.props,
			    actions = props.actions;

			var slider = this.refs.slider.getDOMNode();

			actions.seekTo(Math.max((event.clientX - offset(slider).left) / slider.offsetWidth * props.duration), 0);

			this.props.actions.dragControl("time", event);
		},

		handleDrop: function handleDrop(event) {

			var props = this.props,
			    actions = props.actions;

			var slider = this.refs.slider.getDOMNode();

			actions.seekTo(Math.max((event.clientX - offset(slider).left) / slider.offsetWidth * props.duration), 0);
		}

	});

	module.exports = TimeLine;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	function offset(element) {

		var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

		var x = 0,
		    y = 0;

		while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop) && element !== fullscreenElement) {

			x += element.offsetLeft - element.scrollLeft;
			y += element.offsetTop - element.scrollTop;

			element = element.offsetParent;
		}

		return {

			top: y,
			left: x

		};
	}

	module.exports = offset;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var zero = __webpack_require__(11);

	var Time = React.createClass({ displayName: "Time",

		render: function render() {

			var time = parseInt(this.props.children);

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
/* 11 */
/***/ function(module, exports) {

	"use strict";

	function zero(number) {

		return "00".substring(0, 2 - ("" + number).length) + ("" + number);
	}

	module.exports = zero;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var cx = React.addons.classSet;

	var Quality = React.createClass({ displayName: "Quality",

		getInitialState: function getInitialState() {
			return {

				open: false

			};
		},

		render: function render() {

			var props = this.props;
			var state = this.state;

			var currentSource = props.sources[props.source];

			var classes = cx({

				"player__control__quality": true,
				"player__control__quality--open": state.open,
				"player__control__quality--is-hd": currentSource.format >= 720

			});

			var menu = [];

			for (var i = props.sources.length - 1; i >= 0; i--) {

				var item = props.sources[i];

				var handleClick = function handleClick(sourceId) {

					this.props.actions.setSource(sourceId);
					this.close();
				};

				var activeClass = "";

				if (item.format === currentSource.format) {
					activeClass = "-active";
				}

				menu.push(React.createElement("div", { className: activeClass, onClick: handleClick.bind(this, i) }, item.format));
			}

			return React.createElement("div", { className: classes,
				onClick: this.handleClick }, "HD", React.createElement("div", { className: "player__control__quality__menu" }, menu));
		},

		handleClick: function handleClick() {

			var state = this.state;

			this.setState({

				open: !state.open

			});
		},

		close: function close() {
			this.setState({

				open: false

			});
		}

	});

	module.exports = Quality;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var cx = React.addons.classSet;

	var Fullscreen = React.createClass({ displayName: "Fullscreen",

		render: function render() {

			var props = this.props;

			var classes = cx({

				"player__control__fullscreen": true,
				"player__control__fullscreen--is-fullscreen": props.fullscreen

			});

			return React.createElement("div", { className: classes,
				onClick: this.handleClick }, React.createElement("div", { className: "player__control__fullscreen__icon" }));
		},

		handleClick: function handleClick() {

			var props = this.props;

			props.actions.toggleFullscreen();
		}

	});

	module.exports = Fullscreen;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	function setHeight() {

		var state = this.state;

		var newHeight = Math.round(this.getDOMNode().offsetWidth / 16 * 9);

		if (state.height !== newHeight) {

			this.setState({

				height: newHeight

			});
		}
	}

	module.exports = setHeight;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	function playPause() {

		var video = this.refs.video.getDOMNode();

		video[video.paused ? "play" : "pause"]();
	}

	module.exports = playPause;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	function seekTo(time) {

		var state = this.state;

		var video = this.refs.video.getDOMNode();

		video.currentTime = time;

		this.setState({

			currentTime: time

		});
	}

	module.exports = seekTo;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	function updateBuffer() {

		var state = this.state;

		var video = this.refs.video.getDOMNode();

		if (video.buffered && video.buffered.length > 0 && video.buffered.end) {

			var buffer = video.buffered.end(0);

			if (state.buffer !== buffer) {
				this.setState({

					buffer: buffer

				});
			}
		}
	}

	module.exports = updateBuffer;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	function setSource(source) {

		var state = this.state;

		if (state.source !== source) {

			var wasPLaying = state.playing;
			var lastTime = state.currentTime;

			this.setState({
				source: source
			});

			setTimeout((function () {

				var video = this.refs.video.getDOMNode();
				video.load();
				video.currentTime = lastTime;

				if (wasPLaying) {
					video.play();
				}
			}).bind(this), 200);
		}
	}

	module.exports = setSource;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	function dragControl(dragger, event) {

		var state = this.state,
		    actions = this.getActions();

		var offsetLeft = this.getDOMNode().offsetLeft;

		switch (event.type) {

			case "mousedown":

				this.setState({

					dragging: dragger,

					dragFrom: event.clientX - offsetLeft,
					dragDeplacement: 0

				});

				break;

			case "mousemove":
				if (state.dragging) {

					var deplacement = -(state.dragFrom - (event.clientX - offsetLeft));

					if (state.dragDeplacement !== deplacement) {
						this.setState({

							dragDeplacement: -(state.dragFrom - (event.clientX - offsetLeft))

						});
					}
				}
				break;

			case "mouseup":

				var fn = state.dropFunctions[state.dragging];

				if (fn) {

					fn(event);
				}

				this.setState({

					dragging: null

				});

				break;

		}
	}

	module.exports = dragControl;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	function onDraggerDrop(dragger, fn) {

		var state = this.state;

		var newState = {};

		for (name in state.dropFunctions) {
			if (state.dropFunctions.hasOwnProperty(name)) {

				newState[name] = value;
			}
		}

		newState[dragger] = fn;

		this.setState({

			dropFunctions: newState

		});
	}

	module.exports = onDraggerDrop;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	var timeout;

	function hideControlTimeout() {

		var actions = this.getActions();

		if (!this.state.controlVisible) {
			actions.showControl();
		}

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout((function () {

			actions.hideControl();
		}).bind(this), 2000);
	}

	module.exports = hideControlTimeout;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	function hideControl() {

		this.setState({
			controlVisible: false
		});
	}

	module.exports = hideControl;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	function showControl() {

		this.setState({
			controlVisible: true
		});
	}

	module.exports = showControl;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	function videoEvents(eventName) {

		var state = this.state,
		    actions = this.getActions();

		var video = this.refs.video.getDOMNode();

		switch (eventName) {

			case "play":

				if (state.playing !== true) {
					this.setState({

						playing: true

					});
				}

				break;

			case "pause":

				if (state.playing !== false) {
					this.setState({

						playing: false

					});
				}

				break;

			case "durationchange":

				if (state.duration !== video.duration) {
					this.setState({

						duration: video.duration

					});
				}

				actions.updateBuffer();

				break;

			case "timeupdate":

				if (state.currentTime !== video.currentTime) {
					this.setState({

						currentTime: video.currentTime

					});
				}

				actions.updateBuffer();

				break;

			case "loadedmetadata":

				actions.updateBuffer();

				break;

			case "dblclick":

				actions.toggleFullscreen();

				break;

		}
	}

	module.exports = videoEvents;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	function toggleFullscreen() {

		var state = this.state,
		    actions = this.getActions();

		var player = this.getDOMNode();

		if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}

			this.setState({

				fullscreen: false

			});

			setTimeout(function () {

				if ("orientation" in screen) {
					screen.orientation.unlock();
				} else if (screen.unLockOrientation) {
					screen.unLockOrientation();
				} else if (screen.mozUnLockOrientation) {
					screen.mozUnLockOrientation();
				} else if (screen.msUnLockOrientation) {
					screen.msUnLockOrientation();
				}
			}, 1);
		} else {

			if (player.requestFullScreen) {
				player.requestFullScreen();
			} else if (player.requestFullscreen) {
				player.requestFullscreen();
			} else if (player.webkitRequestFullScreen) {
				player.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (player.webkitRequestFullscreen) {
				player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (player.mozRequestFullScreen) {
				player.mozRequestFullScreen();
			} else if (player.msRequestFullscreen) {
				player.msRequestFullscreen();
			}

			if (player.requestFullScreen || player.requestFullscreen || player.webkitRequestFullScreen || player.webkitRequestFullscreen || player.mozRequestFullScreen || player.msRequestFullscreen) {
				this.setState({

					fullscreen: true

				});
			}

			setTimeout(function () {

				if ("orientation" in screen) {
					screen.orientation.lock("landscape");
				} else if (screen.lockOrientation) {
					screen.lockOrientation("landscape");
				} else if (screen.mozLockOrientation) {
					screen.mozLockOrientation("landscape");
				} else if (screen.msLockOrientation) {
					screen.msLockOrientation("landscape");
				}
			}, 1);
		}
	}

	module.exports = toggleFullscreen;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	function fullscreenChange() {

		if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

			this.setState({

				fullscreen: true

			});
		} else {

			this.setState({

				fullscreen: false

			});

			if ("orientation" in screen) {
				screen.orientation.unlock();
			} else if (screen.unLockOrientation) {
				screen.unLockOrientation();
			} else if (screen.mozUnLockOrientation) {
				screen.mozUnLockOrientation();
			} else if (screen.msUnLockOrientation) {
				screen.msUnLockOrientation();
			}
		}
	}

	module.exports = fullscreenChange;

/***/ }
/******/ ]);