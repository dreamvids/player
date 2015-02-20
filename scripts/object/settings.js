
/**
 *	object/settings.js
 *
 *	Parsage des paramètres du player.
 */

DreamPlayer.settings = function(settings) {

	if (!settings || !settings.poster || !settings.cible || !settings.sources) {

		console.error("Erreur lors de la récupération des paramètres de la vidéo", settings);

		return false;

	}

	var returns = {

		debug: settings.debug ? settings.debug : false,
		source: typeof settings.source !== "undefined" ? settings.source : 1,
		volume: typeof settings.volume !== "undefined" ? settings.volume : 1,
		poster: settings.poster,
		cible: settings.cible,
		redirectAtEnd: typeof settings.redirectAtEnd !== "undefined" ? settings.redirectAtEnd : null,
		embed: typeof settings.embed !== "undefined" ? settings.embed : false,
		autoplay: typeof settings.autoplay !== "undefined" ? settings.autoplay : true,
		sources: []

	};

	for (var i = 0; i < settings.sources.length; i++) {

		var source = settings.sources[i];

		if (!source.format || !source.mp4 || !source.webm) {

			console.error("Erreur lors de la récupération des formats de la vidéo", source);

			return false;

		}

		else {

			returns.sources.push({

				format: source.format,
				text: source.text,
				mp4: source.mp4,
				webm: source.webm

			});

		}
		
	}

	return returns;

};