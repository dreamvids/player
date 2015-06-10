"use strict";

function toggleFullscreen() {

	var state = this.state,
		actions = this.getActions();

	var player = this.getDOMNode();

	if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

		if (document.exitFullscreen) {
			document.exitFullscreen();
		}

		else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}

		else if (document.mozCancelFullScreen){
			document.mozCancelFullScreen();
		}

		else if (document.msExitFullscreen){
			document.msExitFullscreen();
		}

		this.setState({

			fullscreen: false

		});

		setTimeout(function() {

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
		
		}, 1);

	}

	else {

		if (player.requestFullScreen) {
			player.requestFullScreen();
		}

		else if (player.requestFullscreen) {
			player.requestFullscreen();
		}

		else if (player.webkitRequestFullScreen) {
			player.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}

		else if (player.webkitRequestFullscreen) {
			player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}

		else if (player.mozRequestFullScreen){
			player.mozRequestFullScreen();
		}

		else if (player.msRequestFullscreen){
			player.msRequestFullscreen();
		}

		if (player.requestFullScreen || player.requestFullscreen || player.webkitRequestFullScreen || player.webkitRequestFullscreen || player.mozRequestFullScreen || player.msRequestFullscreen) {
			this.setState({

				fullscreen: true

			});
		}

		setTimeout(function() {

			if ("orientation" in screen) {
				screen.orientation.lock("landscape");
			}

			else if (screen.lockOrientation) {
				screen.lockOrientation("landscape");
			}

			else if (screen.mozLockOrientation) {
				screen.mozLockOrientation("landscape");
			}

			else if (screen.msLockOrientation) {
				screen.msLockOrientation("landscape");
			}
		
		}, 1);

	}

}

module.exports = toggleFullscreen;