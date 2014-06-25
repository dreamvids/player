
/**
 *	main.js
 *
 *	Fichier JavaScript principal.
 */

var DreamPlayer = function(settings) {

	this.settings = DreamPlayer.settings(settings);

	if (!this.settings) {

		console.error("Une erreur est survenu lors de la création du player.");

		return false;

	}

	this.elements = this.insert();

	this.setEvents();

	this.loadSources();

	this.setPlayPause();

	this.setControls();

}