"use strict";

function seekTo(time) {

	var state = this.state;
	var actions = this.getActions();

	var video = this.refs.video.getDOMNode();

	video.currentTime = time;

	this.setState({

		currentTime: time

	});
	
	actions.cancelRedirectingInterval();

}

module.exports = seekTo;