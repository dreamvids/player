"use strict";

function seekTo(time) {

	var state = this.state;

	var video = this.refs.video.getDOMNode();

	video.currentTime = time;

	this.setState({

		currentTime: time

	});

}

module.exports = seekTo;