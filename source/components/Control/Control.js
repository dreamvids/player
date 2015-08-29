"use strict";

var React = require("react");

var PlayPause = require("./../PlayPause");
var TimeLine = require("./../TimeLine");
var Time = require("./../Time");
var Fullscreen = require("./../Fullscreen");

var Control = React.createClass({

	render() {

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

		return (
	
			<div className={className}
			     onMouseMove={this.hideControlTimeout}
			     onMouseDown={this.hideControlTimeout}
			     onMouseUp={this.hideControlTimeout}>

				<PlayPause actions={props.actions}
				           playing={props.playing} />

				<Time>{currentTime}</Time>

				<TimeLine ref="slider"
				          actions={props.actions}

				          currentTime={props.currentTime}
				          duration={props.duration}
				          buffer={props.buffer}

				          dragging={props.dragging}
				          dragFrom={props.dragFrom}
				          dragDeplacement={props.dragDeplacement} />

				<Time>{props.duration}</Time>

				<Fullscreen fullscreen={props.fullscreen}
				            actions={props.actions} />

			</div>

		);

	},

	hideControlTimeout() {

		this.props.actions.hideControlTimeout();

	}  

});

module.exports = Control;