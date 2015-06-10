"use strict";

function fullscreenChange() {

	if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

		this.setState({

			fullscreen: true

		});

	}

	else {

		this.setState({

			fullscreen: false

		});

		if ("orientation" in screen) {
			screen.orientation.unlock();
		}

		else if (screen.unLockOrientation) {
			screen.unLockOrientation();
		}

		else if (screen.mozUnLockOrientation) {
			screen.mozUnLockOrientation();
		}

		else if (screen.msUnLockOrientation) {
			screen.msUnLockOrientation();
		}

	}

}

module.exports = fullscreenChange;