"use strict";

var React = require("react");

var PlayPause = require("./../PlayPause");

var Control = React.createClass({

	render() {

		var props = this.props;

		return (
	
			<div className="player__control">

				<PlayPause actions={props.actions}
				           playing={props.playing} />

			</div>

		);

	}

});

module.exports = Control;