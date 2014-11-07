
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
	this.setProgressBar();

	this.setControls();

}

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

/**
 *	element/classes.js
 *
 *	Gestion des classes d'élements.
 */

DreamPlayer.prototype.toogleClass = function(name) {

	if ((" " + this.elements.player.className + " ").search(" " + name + " ") >= 0) {

		this.removeClass(name);

	}

	else {

		this.addClass(name);

	}

}

DreamPlayer.prototype.addClass = function(name) {

	if ((" " + this.elements.player.className + " ").search(" " + name + " ") < 0) {

		this.elements.player.className += " " + name;

	}

}

DreamPlayer.prototype.removeClass = function(name) {

	while ((" " + this.elements.player.className + " ").search(" " + name + " ") >= 0) {

		this.elements.player.className = this.elements.player.className.replace(name, "");

	}

}

/**
 *	element/insert.js
 *
 *	Insertion de l'élement du player.
 */

DreamPlayer.prototype.insert = function() {

	var elements = {};

	var player = document.createElement("div");
	player.className = "player";
	elements["player"] = player;

		var video = document.createElement("video");
		video.setAttribute("autoplay", "");
		video.setAttribute("autobuffer", "");
		video.setAttribute("x-webkit-airplay", "allow");
		video.setAttribute("preload", "auto");
		video.setAttribute("poster", this.settings.poster);
		elements["video"] = video;

			var srcMp4 = document.createElement("source");
			srcMp4.type = "video/mp4";
			elements["srcMp4"] = srcMp4;

			var srcWebm = document.createElement("source");
			srcWebm.type = "video/webm";
			elements["srcWebm"] = srcWebm;

		video.appendChild(srcMp4);
		video.appendChild(srcWebm);
		
	player.appendChild(video);

	var controls = document.createElement("div");
	controls.className = "controls";
	elements["controls"] = controls;

		var playPause = document.createElement("div");
		playPause.className = "play-pause";
		elements["playPause"] = playPause;

	player.appendChild(playPause);

		var settings = document.createElement("div");
		settings.className = "settings";
		elements["settings"] = settings;

	player.appendChild(settings);

		var controls = document.createElement("div");
		controls.className = "controls";
		elements["controls"] = controls;

		var controlsWrap = document.createElement("div");
		controlsWrap.className = "controls__wrap";
		controls.appendChild(controlsWrap);
		
			var progressBar = document.createElement("div");
			progressBar.className = "progress-bar";

			var progressBarWrap = document.createElement("div");
			progressBarWrap.className = "progress-bar__wrap";
			progressBar.appendChild(progressBarWrap);

				var progressBarViewed = document.createElement("div");
				progressBarViewed.className = "progress-bar__viewed";
				progressBarViewed.style.width = "0%";
			
				var progressBarCurrent = document.createElement("div");
				progressBarCurrent.className = "progress-bar__current";
				progressBarCurrent.style.left = "0%";
			
				var progressBarBuffer = document.createElement("div");
				progressBarBuffer.className = "progress-bar__buffer";
				progressBarBuffer.style.width = "0%";

			progressBarWrap.appendChild(progressBarViewed);
			progressBarWrap.appendChild(progressBarCurrent);
			progressBarWrap.appendChild(progressBarBuffer);

			elements["progressBar"] = {};
			elements["progressBar"]["viewed"] = progressBarViewed;
			elements["progressBar"]["current"] = progressBarCurrent;
			elements["progressBar"]["buffer"] = progressBarBuffer;

		controlsWrap.appendChild(progressBar);

	player.appendChild(controls);

	this.settings.cible.appendChild(player);

	player.style.height = player.offsetWidth / (16 / 9) + "px";

	return elements;

};

/**
 *	events/addEvent.js
 *
 *	Ajout d'un évenement au player.
 */

DreamPlayer.prototype.addEvent = function(name, cible, callback) {

	cible = typeof cible === "string" ? this.elements[cible] : cible;

	for (var i = 0; i < this.events.length; i++) {

		if (this.events[i].name.toLowerCase() == name.toLowerCase()) {

			var push = {

				events: [],
				callback: callback,
				that: this,
				condition: this.events[i].condition

			};

			for (var e = 0; e < this.events[i].events.length; e++) {

				push.events.push(this.events[i].events[e]);

				cible.addEventListener(this.events[i].events[e], this.onEvent, false);

			}

			if (!cible.eventsListeners) {

				cible.eventsListeners = [];

			}

			cible.eventsListeners.push(push);

			if (this.settings.debug) {

				console.info('added event "' + name + '"');

			}

		}

	}

};

/**
 *	events/setEvents.js
 *
 *	Intialisation d'un évenement.
 */

DreamPlayer.prototype.onEvent = function(event) {

	if (this.eventsListeners.length) {

		for (var i = 0; i < this.eventsListeners.length; i++) {

			for (var e = 0; e < this.eventsListeners[i].events.length; e++) {

				if (event.type == this.eventsListeners[i].events[e]) {

					if (!this.eventsListeners[i].condition || this.eventsListeners[i].condition(event, this)) {

						this.eventsListeners[i].callback(event, this.eventsListeners[i].that);

					}

				}

			}

		}

	}

}

DreamPlayer.prototype.setEvents = function() {

	this.events = [];

	for (var i = 0; i < DreamPlayer.events.length; i++) {

		var clone = {

			name: DreamPlayer.events[i].name,
			events: [],
			condition: DreamPlayer.events[i].condition ? DreamPlayer.events[i].condition : null

		};

		for (var e = 0; e < DreamPlayer.events[i].events.length; e++) {

			clone.events.push(DreamPlayer.events[i].events[e]);

		}

		this.events.push(clone);

	}

	if (this.settings.debug) {

		eventsNames = "";

		for (var i = 0; i < this.events.length; i++) {

			eventsNames += (i > 0 && i < this.events.length - 1 ? ", " : "") + (i == this.events.length - 1 ? " et " : "") + this.events[i].name;

		}

		console.info("events setted", '"' + eventsNames + '"', this.events, "- DreamPlayer.prototype.setEvents");

	}

};

DreamPlayer.events = [

	{
		name: "click",
		events: ["click"]
	},

	{
		name: "dblClick",
		events: ["dblclick"]
	},

	{
		name: "mouseDown",
		events: ["mousedown"]
	},

	{
		name: "mouseUp",
		events: ["mouseup"]
	},

	{
		name: "mouseMove",
		events: ["mousemove"]
	},

	{
		name: "mouseOut",
		events: ["mouseout"]
	},

	{
		name: "keyDown",
		events: ["keydown"]
	},

	{
		name: "canPlay",
		events: ["canplay"]
	},

	{
		name: "play",
		events: ["play"]
	},

	{
		name: "pause",
		events: ["pause"]
	},

	{
		name: "timeUpdate",
		events: ["timeupdate"]
	},

	{
		name: "loadedMetaData",
		events: ["loadedmetadata"]
	},

	{
		
		name: "mouseWheelUp",
		events: ["mousewheel", "DOMMouseScroll"],

		condition: function(event, player) {

			return event.wheelDelta > 0 || event.detail < 0;

		}

	},

	{

		name: "mouseWheelDown",
		events: ["mousewheel", "DOMMouseScroll"],

		condition: function(event, player) {

			return event.wheelDelta < 0 || event.detail > 0;

		}

	},

	{
		name: "orientationChange",
		events: ["orientationchange"]
	}

];

/**
 *	interactions/playPause.js
 *
 *	Intéractions Play et Pause.
 */

DreamPlayer.prototype.setPlayPause = function() {

	this.addEvent("click", "video", function(event, player) {

		player.tooglePlayPause();

	});

	this.addEvent("mouseDown", "playPause", function(event, player) {

		player.tooglePlayPause();

	});

	this.addEvent("play", "video", function(event, player) {

		player.addClass("playing");

	});

	this.addEvent("pause", "video", function(event, player) {

		player.removeClass("playing");

	});
	
};

DreamPlayer.prototype.play = function() {

	this.elements.video.play();

};

DreamPlayer.prototype.pause = function() {

	this.elements.video.pause();

};

DreamPlayer.prototype.tooglePlayPause = function() {

	if (this.elements.video.paused) {

		this.play();

	}

	else {

		this.pause();

	}
	
};

/**
 *	interactions/progressBar.js
 *
 *	Intéractions de la barre de progression.
 */

DreamPlayer.prototype.bufferUpdate = function() {

	var video = this.elements.video;

	if (video.buffered && video.buffered.length > 0) {

		this.elements.progressBar.buffer.style.width = video.buffered.end(video.buffered.length - 1) / video.duration * 100 + "%";

	}

}

DreamPlayer.prototype.setProgressBar = function() {

	this.addEvent("timeupdate", "video", function(event, player) {

		var percent = player.elements.video.currentTime / player.elements.video.duration * 100 + "%";

		player.elements.progressBar.viewed.style.width = percent;
		player.elements.progressBar.current.style.width = percent;

		player.bufferUpdate();

	});

	this.addEvent("loadedmetadata", "video", function(event, player) {

		player.bufferUpdate();

	});

};

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
		poster: settings.poster,
		cible: settings.cible,
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
				mp4: source.mp4,
				webm: source.webm

			});

		}
		
	}

	return returns;

};

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