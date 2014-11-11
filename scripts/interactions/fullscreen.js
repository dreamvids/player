
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

	}

}

DreamPlayer.prototype.setFullscreen = function() {

	this.addEvent("dblclick", "video", function(event, player) {

		player.toggleFullscreen();

	});

	this.addEvent("click", "fullscreen", function(event, player) {

		player.toggleFullscreen();

	});

};