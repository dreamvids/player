"use strict";

var React = require("react");
var cx = React.addons.classSet;

var Fullscreen = React.createClass({

	render() {

		var props = this.props;

		var classes = cx({

			"player__control__fullscreen": true,
			"player__control__fullscreen--is-fullscreen": props.fullscreen

		});

		return (
	
			<div className={classes}
			     onClick={this.handleClick}>
				<div className="player__control__fullscreen__icon"></div>
			</div>

		);

	},

	handleClick() {

		var props = this.props;

		props.actions.toggleFullscreen();

	}

});

module.exports = Fullscreen;