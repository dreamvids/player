"use strict";

var React = require("react");

var offset = require("../../core/offset.js");

var TimeLine = React.createClass({
	
	render() {

		var props = this.props;

		var currentPercent = Math.max(Math.min(props.currentTime / props.duration, 1), 0) * 100 || 0;

		var bufferPercent = Math.max(Math.min(props.buffer / props.duration, 1), 0) * 100 || 0;

		if (props.dragging === "time") {

			var deplacement = props.dragDeplacement;

			var sliderWidth = this.refs.slider.getDOMNode().offsetWidth;

			currentPercent = Math.max(Math.min(currentPercent / 100 + deplacement / sliderWidth, 1), 0) * 100;

		}

		return (
	
			<div className="player__control__time-line">

				<div className="player__control__time-line__slider"
				     onMouseDown={this.handleMouseDown}
				     ref="slider">

					<div className="player__control__time-line__slider__wrap">

						<div className="player__control__time-line__slider__current"
						     style={{ width: currentPercent + "%" }}></div>

						<div className="player__control__time-line__slider__buffer"
						     style={{ width: bufferPercent + "%" }}></div>

						<div className="player__control__time-line__slider__cursor"
						     style={{ left: currentPercent + "%" }}></div>

					</div>

				</div>

			</div>

		);

	},

	componentDidMount() {

		this.props.actions.onDraggerDrop("time", this.handleDrop);

	},

	handleMouseDown(event) {

		var props = this.props,
			actions = props.actions;

		var slider = this.refs.slider.getDOMNode();

		actions.seekTo((event.clientX - offset(slider).left) / slider.offsetWidth * props.duration);

		this.props.actions.dragControl("time", event);

	},

	handleDrop(event) {

		var props = this.props,
			actions = props.actions;

		var slider = this.refs.slider.getDOMNode();

		actions.seekTo((event.clientX - offset(slider).left) / slider.offsetWidth * props.duration);

	}

});

module.exports = TimeLine;