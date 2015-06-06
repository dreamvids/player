"use strict";

function playPause() {

	var video = this.refs.video.getDOMNode();

	video[video.paused ? "play": "pause"]();

}

module.exports = playPause;