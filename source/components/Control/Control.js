"use strict";

var React = require("react");

var PlayPause = require("./../PlayPause");
var TimeLine = require("./../TimeLine");
var Time = require("./../Time");
var Fullscreen = require("./../Fullscreen");

var Control = React.createClass({

	render() {

		var props = this.props;

		var time = 1000;

		return (
	
			<div className="player__control">

				<PlayPause actions={props.actions}
				           playing={props.playing} />

				<Time>{props.currentTime}</Time>

				<TimeLine actions={props.actions}

				          currentTime={props.currentTime}
				          duration={props.duration}
				          buffer={props.buffer}

				          dragging={props.dragging}
				          dragFrom={props.dragFrom}
				          dragDeplacement={props.dragDeplacement} />

				<Time>{props.duration}</Time>

				<Fullscreen actions={props.actions} />

			</div>

		);

	}

});

module.exports = Control;