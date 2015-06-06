"use strict";

function setHeight() {

	var state = this.state;

	var newHeight = Math.round(this.getDOMNode().offsetWidth / 16 * 9);

	if (state.height !== newHeight) {

		this.setState({

			height: newHeight

		});

	}

}

module.exports = setHeight;