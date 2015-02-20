
/**
 *	main.js
 *
 *	Fichier JavaScript principal.
 */

var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
	isTouch = false,
	canSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");

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
	this.setTimeIndicator();
	this.setSpinner();
	this.setFullscreen();
	this.setVolume();
	this.setQualitys();
	this.setRedirectAtEnd();

	this.setControls();

	console.log(this.settings.embed);

	if (this.settings.embed) {

		this.elements.player.style.height = "100%";

		console.log(this.elements.video);
		this.elements.video.style.height = "100%";

	}

	else {

		this.elements.player.style.height = this.elements.player.offsetWidth / (16 / 9) + "px";

		window.addEventListener("resize", function(player) {
		
			return function() {
		
				player.style.height = player.offsetWidth / (16 / 9) + "px";
		
			};
		
		}(this.elements.player), false);

	}

	

	this.loadSources();

}