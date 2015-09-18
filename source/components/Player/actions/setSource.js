"use strict";

var marmottajax = require("marmottajax");

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

		marmottajax({

			url: _webroot_ + "account/definition",
			method: "put",

			parameters: {
			    definition: source
			}

		});

	}

}

module.exports = setSource;