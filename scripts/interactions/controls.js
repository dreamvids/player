
/**
 * interactions/controls.js
 *
 * Element contenant les contrôles.
 */

DreamPlayer.prototype.setControls = function() {

	this.lastMouseMove = { x: -1, y: -1 };

	this.showControls();
	this.setTimeoutHideControls();

	this.addEvent("mousemove", "player", function(event, player) {

		if (event.pageX !== player.lastMouseMove.x && event.pageY !== player.lastMouseMove.y) {

			player.lastMouseMove.x = event.pageX;
			player.lastMouseMove.y = event.pageY;

			setTimeout(function(player) {
			
				return function() {
			
					player.showControls();
			
				};
			
			}(player), 1);

		}

	});

	this.addEvent("click", "video", function(event, player) {

		if (isTouch && (" " + player.elements.controls.className + " ").search(" show ") >= 0) {

			setTimeout(function(player) {
			
				return function() {
			
					player.hideControls();
			
				};
			
			}(player), 2);

		}

	});

};

DreamPlayer.prototype.setTimeoutHideControls = function() {

	if (this.timeoutHideControls) {

		clearTimeout(this.timeoutHideControls);

	}

	this.timeoutHideControls = setTimeout(function(player) {

		if (player && player.hideControls) {

			player.hideControls();

		}

	}, 3500, this);
};

DreamPlayer.prototype.showControls = function() {

	if ((" " + this.elements.controls.className + " ").search(" show ") <= 0) {

		this.elements.player.style.cursor = "";

		this.elements.controls.className += " show";
		this.elements.player.className += " show-settings";

	}

	this.setTimeoutHideControls();

};

DreamPlayer.prototype.hideControls = function() {

	if ((" " + this.elements.controls.className + " ").search(" show ") >= 0) {

		setTimeout(function(elements) {
		
			return function() {

				if ((" " + elements.controls.className + " ").search(" show ") <= 0) {

					elements.player.style.cursor = "none";

				}
		
			};
		
		}(this.elements), 1000);

		this.elements.controls.className = (" " + this.elements.controls.className + " ").replace("show", "");
		this.elements.player.className = (" " + this.elements.player.className + " ").replace("show-settings", "");

		this.removeClass("show-volume");

	}

};