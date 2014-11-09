
/**
 *	interactions/spinner.js
 *
 *	Spinner loader.
 */

DreamPlayer.prototype.setSpinner = function() {

	if (isFirefox) {

		this.elements.progressBar.spinner.parentNode.removeChild(this.elements.progressBar.spinner);

		return false;

	}

	this.elements.progressBar.spinner.style.opacity = 1;

	this.elements.video.addEventListener("waiting", function(player) {
	
		return function() {

			player.elements.progressBar.spinner.style.opacity = 1;
	
		};
	
	}(this), false);

	this.elements.video.addEventListener("seeking", function(player) {
	
		return function() {

			player.elements.progressBar.spinner.style.opacity = 1;
	
		};
	
	}(this), false);

	this.addEvent("play", "video", function(event, player) {

		player.elements.progressBar.spinner.style.opacity = 0;

	});

	this.elements.video.addEventListener("seeked", function(player) {
	
		return function() {

			player.elements.progressBar.spinner.style.opacity = 0;
	
		};
	
	}(this), false);

};