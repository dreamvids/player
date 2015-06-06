"use strict";

function videoEvents(eventName) {

	var state = this.state,
		actions = this.getActions();

	var video = this.refs.video.getDOMNode();

	switch(eventName) {

		case "play":

			if (state.playing !== true) {
				this.setState({

					playing: true

				});
			}

		break;

		case "pause":

			if (state.playing !== false) {
				this.setState({

					playing: false

				});
			}

		break;

		case "durationchange":

			if (state.duration !== video.duration) {
				this.setState({

					duration: video.duration

				});
			}
			
			actions.updateBuffer();

		break;

		case "timeupdate":

			if (state.currentTime !== video.currentTime) {
				this.setState({

					currentTime: video.currentTime

				});
			}

			actions.updateBuffer();

		break;

		case "loadedmetadata":

			actions.updateBuffer();

		break;

	}

}

module.exports = videoEvents;