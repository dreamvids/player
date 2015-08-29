"use strict";

var timeout;

function hideControlTimeout() {

	var actions = this.getActions();

	if (!this.state.controlVisible) {
		actions.showControl();
	}

	if (timeout) {
		clearTimeout(timeout);
	}

	timeout = setTimeout(function() {

		actions.hideControl();

	}.bind(this), 2000);

}

module.exports = hideControlTimeout;