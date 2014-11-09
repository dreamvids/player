
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

		if (isTouch && (" " + player.elements.controls.className + " ").search(" show ") >= 0) {

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

		this.elements.player.style.cursor = "";

		this.elements.controls.className += " show";
		this.elements.player.className += " show-settings";

	}

	this.setTimeoutHideControls();

};

DreamPlayer.prototype.hideControls = function() {

	if ((" " + this.elements.controls.className + " ").search(" show ") >= 0) {

		setTimeout(function(elements) {
		
			return function() {

				if ((" " + elements.controls.className + " ").search(" show ") <= 0) {

					elements.player.style.cursor = "none";

				}
		
			};
		
		}(this.elements), 1000);

		this.elements.controls.className = (" " + this.elements.controls.className + " ").replace("show", "");
		this.elements.player.className = (" " + this.elements.player.className + " ").replace("show-settings", "");

	}

};

/**
 * element/classes.js
 *
 * Gestion des classes d'élements.
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

DreamPlayer.addClass = function(element, name) {

	if ((" " + element.className + " ").search(" " + name + " ") < 0) {

		element.className += " " + name;

	}

}

DreamPlayer.removeClass = function(element, name) {

	while ((" " + element.className + " ").search(" " + name + " ") >= 0) {

		element.className = element.className.replace(name, "");

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

				var progressBarSpinner = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				progressBarSpinner.setAttribute("class", "progress-bar__spinner");
				progressBarSpinner.setAttribute("viewBox", "0 0 32 32");
				progressBarSpinner.setAttribute("xmlns", "http://www.w3.org/2000/svg");

					var progressBarSpinnerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
					progressBarSpinnerCircle.setAttribute("fill", "none");
					progressBarSpinnerCircle.setAttribute("stroke", "white");
					progressBarSpinnerCircle.setAttribute("stroke-width", "3");
					progressBarSpinnerCircle.setAttribute("stroke-linecap", "round");
					progressBarSpinnerCircle.setAttribute("cx", "16");
					progressBarSpinnerCircle.setAttribute("cy", "16");
					progressBarSpinnerCircle.setAttribute("r", "14");
					progressBarSpinner.appendChild(progressBarSpinnerCircle);

				var progressBarBuffer = document.createElement("div");
				progressBarBuffer.className = "progress-bar__buffer";
				progressBarBuffer.style.width = "0%";

			progressBarWrap.appendChild(progressBarViewed);
			progressBarWrap.appendChild(progressBarCurrent);
			progressBarWrap.appendChild(progressBarSpinner);
			progressBarWrap.appendChild(progressBarBuffer);

			elements["progressBar"] = progressBar;
			elements["progressBar"]["viewed"] = progressBarViewed;
			elements["progressBar"]["current"] = progressBarCurrent;
			elements["progressBar"]["spinner"] = progressBarSpinner;
			elements["progressBar"]["buffer"] = progressBarBuffer;

		controlsWrap.appendChild(progressBar);

	player.appendChild(controls);

	this.settings.cible.appendChild(player);

	return elements;

};

/**
 *	element/offsets.js
 *
 *	Gestion des classes d'élements.
 */

DreamPlayer.getOffsets = function(element) {

	var x = 0,
		y = 0;

	while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {

		x += element.offsetLeft - element.scrollLeft;
		y += element.offsetTop - element.scrollTop;
		
		element = element.offsetParent;

	}

	return {

		top: y, left: x

	};

}

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

		}

	}

};

/**
 *	events/setEvents.js
 *
 *	Intialisation d'un évenement.
 */

DreamPlayer.prototype.onEvent = function(event) {

	if (this.eventsListeners.length && typeof event !== "undefined") {

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

		if (!isTouch) {

			player.tooglePlayPause();

		}

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

DreamPlayer.prototype.timeTo = function(time) {

	var video = this.elements.video;

	video.currentTime = time;

}

DreamPlayer.prototype.changeTime = function(event) {

	var progressBar = this.elements.progressBar,
		width = progressBar.offsetWidth;

	var x = Math.max(Math.min(event.pageX - DreamPlayer.getOffsets(progressBar).left, width), 0);

	var percent = x / width * 100,
		time = percent / 100 * this.elements.video.duration;

	if (!isNaN(time)) {

		this.elements.progressBar.viewed.style.width = percent + "%";
		this.elements.progressBar.current.style.left = percent + "%";
		this.elements.progressBar.spinner.style.left = percent + "%";

		this.timeTo(time);

	}

}

DreamPlayer.prototype.setProgressBar = function() {

	this.addEvent("timeupdate", "video", function(event, player) {

		var percent = player.elements.video.currentTime / player.elements.video.duration * 100;

		player.elements.progressBar.viewed.style.width = percent + "%";
		player.elements.progressBar.current.style.left = percent + "%";
		player.elements.progressBar.spinner.style.left = percent + "%";

		player.bufferUpdate();

	});

	this.addEvent("loadedmetadata", "video", function(event, player) {

		player.bufferUpdate();

	});



	this.addEvent("mousedown", "progressBar", function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0) {

			player.progressBarClicking = true;

			DreamPlayer.addClass(player.elements.progressBar, "progress-bar--clicking");

			player.changeTime.call(player, event);

		}

	});

	this.addEvent("mouseup", "progressBar", function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0) {

			player.progressBarClicking = false;

			DreamPlayer.removeClass(player.elements.progressBar, "progress-bar--clicking");

			player.changeTime.call(player, event);

		}

	});

	this.addEvent("mousemove", "player", function(event, player) {

		if (player.progressBarClicking) {

			player.changeTime.call(player, event);

		}

	});

	this.addEvent("touchmove", "player", function(event, player) {

		if (player.progressBarClicking) {

			player.changeTime.call(player, event);

		}

	});

};

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

	var selection = "none",
		marge = 80;

	for (var i = 0; i < this.settings.sources.length; i++) {

		if (this.elements.player.offsetWidth - this.settings.sources[i].format > 0) {

			selection = i;

		}

	}

	if (selection == "none") {

		selection = 0;

	}

	this.elements.srcMp4.src = this.settings.sources[selection].mp4;
	this.elements.srcWebm.src = this.settings.sources[selection].webm;

	if (this.settings.debug) {

		console.info("format", this.settings.sources[selection].format);

	}

};