
/**
 *	sources/loadSources.js
 *
 *	Chargement des sources de la vidéo.
 */

DreamPlayer.prototype.loadSources = function() {

	var selection = "none";

	for (var i = 0; i < this.settings.sources.length; i++) {

		if (this.settings.sources[i].format - this.elements.player.offsetWidth > 0) {

			selection = i;

		}

	}

	if (selection == "none") {

		selection = this.settings.sources.length - 1;

	}

	this.elements.srcMp4.src = this.settings.sources[selection].mp4;
	this.elements.srcWebm.src = this.settings.sources[selection].webm;

	if (this.settings.debug) {

		console.info("format", this.settings.sources[selection].format);

	}

};