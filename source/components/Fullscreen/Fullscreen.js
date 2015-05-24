"use strict";

var React = require("react");

var Fullscreen = React.createClass({

	render() {

		var props = this.props,
		    state = this.state;

		return (
	
			<div className="player__control__fullscreen">
				<div className="player__control__fullscreen__icon"></div>
			</div>

		);

	}

});

module.exports = Fullscreen;