"use strict";

var React = require("react");

var PlayPause = require("./../PlayPause");
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

				<Time>{props.duration}</Time>

			</div>

		);

	}

});

module.exports = Control;