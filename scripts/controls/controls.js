
/**
 *	controls/controls.js
 *
 *	Element contenant les contrôles.
 */

DreamPlayer.prototype.setControls = function() {

	this.addEvent("mouseMove", "player", function(event, player) {

		player.showControls();

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

	if (this.elements.controls.className.search("show") <= 0) {

		this.elements.controls.className += " show";
		this.setTimeoutHideControls();

	}

};

DreamPlayer.prototype.hideControls = function() {

	if (this.elements.controls.className.search("show") >= 0) {

		this.elements.controls.className = this.elements.controls.className.replace(" show", "");

	}

};