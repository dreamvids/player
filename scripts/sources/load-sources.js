
/**
 *	sources/load-sources.js
 *
 *	Chargement des sources de la vidéo.
 */

DreamPlayer.prototype.loadSources = function() {

	var selection = 0,
		marge = 80;

	/*for (var i = 0; i < this.settings.sources.length; i++) {

		if (this.elements.player.offsetWidth - this.settings.sources[i].format > 0) {

			selection = i;

		}

	}*/

	if (typeof this.settings.source !== "undefined") {

		selection = this.settings.source;

	}

	this.elements.srcMp4.src = this.settings.sources[selection].mp4;
	this.elements.srcWebm.src = this.settings.sources[selection].webm;

	if (this.settings.debug) {

		console.info("format", this.settings.sources[selection].format);

	}

	this.currentSource = selection;

};

DreamPlayer.prototype.setSource = function(id) {

	if (id !== this.currentSource) {

		this.lastTime = this.elements.video.currentTime;

		this.elements.srcMp4.src = this.settings.sources[id].mp4;
		this.elements.srcWebm.src = this.settings.sources[id].webm;

		this.elements.video.load();

		this.currentSource = id;

		if (_logged_) {

			marmottajax.put({

				url: _webroot_ + "account/definition",

				options: {

					definition: id

				}

			});
			
		}

	}

};