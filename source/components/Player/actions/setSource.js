"use strict";

function setSource(source) {

	var state = this.state;

	if (state.source !== source) {

		var wasPLaying = state.playing;
		var lastTime = state.currentTime;

		this.setState({
			source: source
		});

		setTimeout(function() {

			var video = this.refs.video.getDOMNode();
			video.load();
			video.currentTime = lastTime;

			if (wasPLaying) {
				video.play();
			}

		}.bind(this), 200);

	}

}

module.exports = setSource;