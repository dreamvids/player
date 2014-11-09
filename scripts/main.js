
/**
 *	main.js
 *
 *	Fichier JavaScript principal.
 */

var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
	isTouch = false;

window.addEventListener("touchstart", function setIsTouch() {

    isTouch = true;

    window.removeEventListener('touchstart', setIsTouch);

}, false);

var DreamPlayer = function(settings) {

	this.settings = DreamPlayer.settings(settings);

	if (!this.settings) {

		console.error("Une erreur est survenu lors de la création du player.");

		return false;

	}

	this.elements = this.insert();

	this.setEvents();

	this.setPlayPause();
	this.setProgressBar();
	this.setSpinner();

	this.setControls();

	this.elements.player.style.height = this.elements.player.offsetWidth / (16 / 9) + "px";

	window.addEventListener("resize", function(player) {
	
		return function() {
	
			player.style.height = player.offsetWidth / (16 / 9) + "px";
	
		};
	
	}(this.elements.player), false);

	this.loadSources();

}