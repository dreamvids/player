
/**
 *	controls/controls.js
 *
 *	Element contenant les contrôles.
 */

DreamPlayer.prototype.setControls = function() {

	this.addEvent("mousemove", "player", function(event, player) {

		setTimeout(function(player) {
		
			return function() {
		
				player.showControls();
		
			};
		
		}(player), 1);

	});

	this.addEvent("click", "video", function(event, player) {

		if (!!("ontouchstart" in window) && (" " + player.elements.controls.className + " ").search(" show ") >= 0) {

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

	}, 2500, this);
};

DreamPlayer.prototype.showControls = function() {

	if ((" " + this.elements.controls.className + " ").search(" show ") <= 0) {

		this.elements.controls.className += " show";
		this.elements.player.className += " show-settings";
		this.setTimeoutHideControls();

	}

};

DreamPlayer.prototype.hideControls = function() {

	if ((" " + this.elements.controls.className + " ").search(" show ") >= 0) {

		this.elements.controls.className = (" " + this.elements.controls.className + " ").replace("show", "");
		this.elements.player.className = (" " + this.elements.player.className + " ").replace("show-settings", "");

	}

};