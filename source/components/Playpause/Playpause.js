"use strict";

var React = require("react");
var cx = React.addons.classSet;

var PlayPause = React.createClass({

	render() {

		var props = this.props;

		var className = cx({

			"player__control__play-pause": true,
			"player__control__play-pause--playing": props.playing

		});

		return (
	
			<div className={className} onMouseDown={this.handleMouseDown}>
				<div className="player__control__play-pause__icon"></div>
			</div>

		);

	},

	handleMouseDown() {

		this.props.actions.playPause();

	}

});

module.exports = PlayPause;