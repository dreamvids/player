"use strict";

var React = require("react");
var cx = React.addons.classSet;

var on = require("../../core/on.js");

var Control = require("../Control");

var Player = React.createClass({

	getInitialState() {

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

	render() {

		var props = this.props,
			state = this.state,
			actions = this.getActions();

		var source = state.sources[state.source];

		var style = {

			height: `${state.height}px`
		
		};

		var classes = cx({

			"player": true,
			"player--fullscreen": state.fullscreen

		});

		return (
	
			<div className={classes}
			     style={style}

			     onMouseUp={actions.dragControl.bind(this, "time")}
			     onMouseMove={this.onMouseMove}>

				<video ref="video" onClick={this.handleVideoClick}>
					<source src={source.mp4} type="video/mp4" />
					<source src={source.webm} type="video/webm" />
				</video>

				<Control actions={actions}

				         visible={state.controlVisible}

				         playing={state.playing}
				         fullscreen={state.fullscreen}

				         currentTime={state.currentTime}
				         duration={state.duration}
				         buffer={state.buffer}

				         dragging={state.dragging}
				         dragFrom={state.dragFrom}
				         dragDeplacement={state.dragDeplacement} />

			</div>

		);

	},

	componentDidMount() {

		var state = this.state,
			actions = this.getActions();

		var video = this.refs.video.getDOMNode();

		video.setAttribute("autobuffer", "");
		video.setAttribute("x-webkit-airplay", "allow");
		video.preload = "auto";
		video.poster = state.poster;
		video.volume = state.volume;

		video.play();


		var events = [
			"play",
			"pause",
			"durationchange",
			"timeupdate",
			"loadedmetadata",
			"dblclick"
		];

		for (var i = 0, length = events.length; i < length; i++) {
		
			on(video, events[i], actions.videoEvents.bind(this, events[i]));
		
		}


		actions.setHeight();
		actions.hideControlTimeout();

		if (typeof window.addEventListener !== "undefined") {

			window.addEventListener("resize", actions.setHeight);

			window.addEventListener("webkitfullscreenchange", actions.fullscreenChange);
			window.addEventListener(   "mozfullscreenchange", actions.fullscreenChange);
			window.addEventListener(      "fullscreenchange", actions.fullscreenChange);

		}

	},

	componentWillUnmount() {

		var actions = this.getActions();

		if (typeof window.removeEventListener !== "undefined") {

			window.removeEventListener("resize", actions.setHeight);

		}

	},

	handleVideoClick() {

		this.getActions().playPause();

	},

	onMouseMove(event) {

		this.getActions().hideControlTimeout();
		this.getActions().dragControl("time", event);

	},

	getActions() {
		return {

			setHeight: require("./actions/setHeight.js").bind(this),

			playPause: require("./actions/playPause.js").bind(this),
			seekTo: require("./actions/seekTo.js").bind(this),
			updateBuffer: require("./actions/updateBuffer.js").bind(this),

			dragControl: require("./actions/dragControl.js").bind(this),
			onDraggerDrop: require("./actions/onDraggerDrop.js").bind(this),
			hideControlTimeout: require("./actions/hideControlTimeout.js").bind(this),
			hideControl: require("./actions/hideControl.js").bind(this),
			showControl: require("./actions/showControl.js").bind(this),

			videoEvents: require("./actions/videoEvents.js").bind(this),

			toggleFullscreen: require("./actions/toggleFullscreen.js").bind(this),
			fullscreenChange: require("./actions/fullscreenChange.js").bind(this)

		};
	}

});

module.exports = Player;