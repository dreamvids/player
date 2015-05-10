
/**
 * interactions/fullscreen.js
 *
 * Intéraction fullscreen.
 */

DreamPlayer.prototype.toggleFullscreen = function() {

	var player = this.elements.player;

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

		this.removeClass("fullscreen");

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

			this.addClass("fullscreen");

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

DreamPlayer.prototype.fullscreenChange = function(player) {

	if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

		this.addClass("fullscreen");

	}

	else {

		this.removeClass("fullscreen");

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

DreamPlayer.prototype.setFullscreen = function() {

	this.addEvent("dblclick", "video", function(event, player) {

		player.toggleFullscreen();

	});

	this.addEvent("click", "fullscreen", function(event, player) {

		player.toggleFullscreen();

	});

	document.addEventListener("webkitfullscreenchange", function(player) {
	
		return function(parameters) {
	
			player.fullscreenChange(player);
	
		};
	
	}(this), false);

	document.addEventListener("mozfullscreenchange", function(player) {
	
		return function(parameters) {
	
			player.fullscreenChange(player);
	
		};
	
	}(this), false);

	document.addEventListener("fullscreenchange", function(player) {
	
		return function(parameters) {
	
			player.fullscreenChange(player);
	
		};
	
	}(this), false);      

};