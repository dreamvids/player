
/**
 * interactions/fullscreen.js
 *
 * Intéraction fullscreen.
 */

DreamPlayer.prototype.toggleFullscreen = function() {

	if (document.webkitIsFullScreen || document.mozFullscreen) {

		if (document.cancelFullScreen) {

			document.cancelFullScreen();

		}

		else if (document.webkitCancelFullScreen) {

			document.webkitCancelFullScreen();

		}

		else if (document.mozCancelFullScreen){

			document.mozCancelFullScreen();

		}

		this.removeClass("fullscreen");

	}

	else {

		if (this.elements.player.requestFullScreen) {

			this.elements.player.requestFullScreen();

		}

		else if (this.elements.player.webkitRequestFullScreen) {

			this.elements.player.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);

		}

		else if (this.elements.player.mozRequestFullScreen){

			this.elements.player.mozRequestFullScreen();

		}

		if (this.elements.player.requestFullScreen || this.elements.player.webkitRequestFullScreen || this.elements.player.mozRequestFullScreen) {

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