"use strict";

var React = require("react");

var PlayPause = require("./../PlayPause");
var TimeLine = require("./../TimeLine");
var Time = require("./../Time");

var Control = React.createClass({

	render() {

		var props = this.props;

		var time = 1000;

		return (
	
			<div className="player__control">

				<PlayPause actions={props.actions}
				           playing={props.playing} />

				<Time>{props.currentTime}</Time>

				<TimeLine actions={props.actions} />

				<Time>{props.duration}</Time>

			</div>

		);

	}

});

module.exports = Control;