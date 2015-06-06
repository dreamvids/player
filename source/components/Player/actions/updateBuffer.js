"use strict";

function updateBuffer() {

	var state = this.state;

	var video = this.refs.video.getDOMNode();

	if (video.buffered && video.buffered.length > 0 && video.buffered.end) {

		var buffer = video.buffered.end(0);

		if (state.buffer !== buffer) {
			this.setState({

				buffer: buffer

			});
		}

	}

}

module.exports = updateBuffer;