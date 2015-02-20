
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

		if (this.settings.autoplay) {

			video.setAttribute("autoplay", "");

		}

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

		if (canSVG && !isFirefox) {

			playPause.className = "play-pause play-pause--svg";

			var playPauseSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			playPauseSVG.setAttribute("class", "play-pause__svg");
			playPauseSVG.setAttribute("viewBox", "0 0 32 32");
			playPauseSVG.setAttribute("fill", "white");
			playPauseSVG.setAttribute("stroke", "white");
			playPauseSVG.setAttribute("stroke-linejoin", "round");
			playPauseSVG.setAttribute("stroke-width", "8");
			playPauseSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");

				var playPauseSVG1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
				playPauseSVG1.setAttribute("points", "6,4 28,16 6,16 6,16");
				playPauseSVG.appendChild(playPauseSVG1);
				elements["playPauseSVG1"] = playPauseSVG1;

				var playPauseSVG2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
				playPauseSVG2.setAttribute("points", "6,16 28,16 6,28 6,28");
				playPauseSVG.appendChild(playPauseSVG2);
				elements["playPauseSVG2"] = playPauseSVG2;

			playPause.appendChild(playPauseSVG);
			elements["playPauseSVG"] = playPause;

		}

		elements["playPause"] = playPause;

	player.appendChild(playPause);

		var redirectMessage = document.createElement("div");
		redirectMessage.className = "redirect-message";
		redirectMessage.style.display = "none";
		redirectMessage.setAttribute("message", "Redirection de la vidéo dans {seconds}");
		elements["redirectMessage"] = redirectMessage;

	player.appendChild(redirectMessage);

	var redirectCancel = document.createElement("button");
		redirectCancel.className = "redirect-cancel";
		redirectCancel.style.display = "none";
		redirectCancel.innerHTML = "Rester sur cette page";
		elements["redirectCancel"] = redirectCancel;

	player.appendChild(redirectCancel);

		var qualitys = document.createElement("div");
		qualitys.className = "qualitys";
		elements["qualitys"] = qualitys;

	player.appendChild(qualitys);

		var icons = document.createElement("div");
		icons.className = "icons";

			var volume = document.createElement("div");
			volume.className = "icon icon--volume";
			elements["volumeIcon"] = volume;
	
			var settings = document.createElement("div");
			settings.className = "icon icon--settings";
			elements["settings"] = settings;
	
			var fullscreen = document.createElement("div");
			fullscreen.className = "icon icon--fullscreen";
			elements["fullscreen"] = fullscreen;
	
		icons.appendChild(fullscreen);
		icons.appendChild(settings);
		icons.appendChild(volume);

	player.appendChild(icons);

		var volumeSlide = document.createElement("div");
		volumeSlide.className = "volume-slide";

		var volumeSlideWrap = document.createElement("div");
		volumeSlideWrap.className = "volume-slide__wrap";
		volumeSlide.appendChild(volumeSlideWrap);

			var volumeSlideBar = document.createElement("div");
			volumeSlideBar.className = "volume-slide__bar";
			volumeSlideBar.style.width = "0%";
		
			var volumeSlideDot = document.createElement("div");
			volumeSlideDot.className = "volume-slide__dot";
			volumeSlideDot.style.left = "0%";

		volumeSlideWrap.appendChild(volumeSlideBar);
		volumeSlideWrap.appendChild(volumeSlideDot);

		elements["volumeSlide"] = volumeSlide;
		elements["volumeSlide"]["bar"] = volumeSlideBar;
		elements["volumeSlide"]["dot"] = volumeSlideDot;

	player.appendChild(volumeSlide);

		var controls = document.createElement("div");
		controls.className = "controls";
		elements["controls"] = controls;

		var controlsWrap = document.createElement("div");
		controlsWrap.className = "controls__wrap";
		controls.appendChild(controlsWrap);
		
			var time = document.createElement("div");
			time.className = "time";
			time.innerHTML = "00:00";

			elements["time"] = time;
			
		controlsWrap.appendChild(time);

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

	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

	var x = 0,
		y = 0;

	while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop) && element !== fullscreenElement) {

		x += element.offsetLeft - element.scrollLeft;
		y += element.offsetTop - element.scrollTop;
		
		element = element.offsetParent;

	}

	return {

		top: y,
		left: x

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

			if (cible) {

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
		name: "loadeddata",
		events: ["loadeddata"]
	},

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
		name: "mouseOver",
		events: ["mouseover"]
	},

	{
		name: "mouseOut",
		events: ["mouseout"]
	},

	{
		name: "touchstart",
		events: ["touchstart"]
	},

	{
		name: "touchmove",
		events: ["touchmove"]
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
		name: "ended",
		events: ["ended"]
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
 * interactions/controls.js
 *
 * Element contenant les contrôles.
 */

DreamPlayer.prototype.setControls = function() {

	this.lastMouseMove = { x: -1, y: -1 };

	this.showControls();
	this.setTimeoutHideControls();

	this.addEvent("mousemove", "player", function(event, player) {

		if (event.pageX !== player.lastMouseMove.x && event.pageY !== player.lastMouseMove.y) {

			player.lastMouseMove.x = event.pageX;
			player.lastMouseMove.y = event.pageY;

			setTimeout(function(player) {
			
				return function() {
			
					player.showControls();
			
				};
			
			}(player), 1);

		}

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

	}, 3500, this);
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

		this.removeClass("show-volume");

	}

};

/**
 * interactions/fullscreen.js
 *
 * Intéraction fullscreen.
 */

DreamPlayer.prototype.toggleFullscreen = function() {

	var player = this.elements.player;

	if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

		if (document.exitFullscreen) {

			document.exitFullscreen();

		}

		else if (document.webkitCancelFullScreen) {

			document.webkitCancelFullScreen();

		}

		else if (document.mozCancelFullScreen){

			document.mozCancelFullScreen();

		}

		else if (document.msExitFullscreen){

			document.msExitFullscreen();

		}

		this.removeClass("fullscreen");

	}

	else {

		if (player.requestFullScreen) {

			player.requestFullScreen();

		}

		else if (player.requestFullscreen) {

			player.requestFullscreen();

		}

		else if (player.webkitRequestFullScreen) {

			player.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);

		}

		else if (player.webkitRequestFullscreen) {

			player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

		}

		else if (player.mozRequestFullScreen){

			player.mozRequestFullScreen();

		}

		else if (player.msRequestFullscreen){

			player.msRequestFullscreen();

		}

		if (player.requestFullScreen || player.requestFullscreen || player.webkitRequestFullScreen || player.webkitRequestFullscreen || player.mozRequestFullScreen || player.msRequestFullscreen) {

			this.addClass("fullscreen");

		}

	}

}

DreamPlayer.prototype.fullscreenChange = function(player) {

	if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

		this.addClass("fullscreen");

	}

	else {

		this.removeClass("fullscreen");

	}

}

DreamPlayer.prototype.setFullscreen = function() {

	this.addEvent("dblclick", "video", function(event, player) {

		player.toggleFullscreen();

	});

	this.addEvent("click", "fullscreen", function(event, player) {

		player.toggleFullscreen();

	});

	document.addEventListener("webkitfullscreenchange", function(player) {
	
		return function(parameters) {
	
			player.fullscreenChange(player);
	
		};
	
	}(this), false);

	document.addEventListener("mozfullscreenchange", function(player) {
	
		return function(parameters) {
	
			player.fullscreenChange(player);
	
		};
	
	}(this), false);

	document.addEventListener("fullscreenchange", function(player) {
	
		return function(parameters) {
	
			player.fullscreenChange(player);
	
		};
	
	}(this), false);      

};

/**
 *	interactions/play-pause.js
 *
 *	Intéractions Play et Pause.
 */

DreamPlayer.prototype.setPlayPause = function() {

	this.addEvent("click", "video", function(event, player) {

		if (!isTouch) {

			player.showControls();
			player.tooglePlayPause();

		}

	});

	this.addEvent("mouseDown", "playPause", function(event, player) {

		player.tooglePlayPause();

	});

	this.addEvent("play", "video", function(event, player) {

		player.addClass("playing");

		if (player.elements.playPauseSVG) {

			player.elements.playPauseSVG1.innerHTML = "";
			player.elements.playPauseSVG2.innerHTML = "";

			var playPauseSVG1animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
			playPauseSVG1animate.setAttribute("attributeType", "XML");
			playPauseSVG1animate.setAttribute("attributeName", "points");
			playPauseSVG1animate.setAttribute("from", player.elements.playPauseSVG1.getAttribute("points"));
			playPauseSVG1animate.setAttribute("to", "26,4 26,28 24,28 24,4");
			playPauseSVG1animate.setAttribute("begin", "indefinite");
			playPauseSVG1animate.setAttribute("dur", ".18s");
			player.elements.playPauseSVG1.setAttribute("points", "6,4 8,4 8,28 6,28");

			var playPauseSVG2animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
			playPauseSVG2animate.setAttribute("attributeType", "XML");
			playPauseSVG2animate.setAttribute("attributeName", "points");
			playPauseSVG2animate.setAttribute("from", player.elements.playPauseSVG2.getAttribute("points"));
			playPauseSVG2animate.setAttribute("to", "6,4 8,4 8,28 6,28");
			playPauseSVG2animate.setAttribute("begin", "indefinite");
			playPauseSVG2animate.setAttribute("dur", ".18s");
			player.elements.playPauseSVG2.setAttribute("points", "24,4 26,4 26,28 24,28");

			player.elements.playPauseSVG1.appendChild(playPauseSVG1animate);
			player.elements.playPauseSVG2.appendChild(playPauseSVG2animate);

			playPauseSVG1animate.beginElement();
			playPauseSVG2animate.beginElement();

		}

	});

	this.addEvent("pause", "video", function(event, player) {

		player.removeClass("playing");

		if (player.elements.playPauseSVG) {

			player.elements.playPauseSVG1.innerHTML = "";
			player.elements.playPauseSVG2.innerHTML = "";
	
			var playPauseSVG1animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
			playPauseSVG1animate.setAttribute("attributeType", "XML");
			playPauseSVG1animate.setAttribute("attributeName", "points");
			playPauseSVG1animate.setAttribute("from", player.elements.playPauseSVG1.getAttribute("points"));
			playPauseSVG1animate.setAttribute("to", "6,4 28,16 6,16 6,16");
			playPauseSVG1animate.setAttribute("begin", "indefinite");
			playPauseSVG1animate.setAttribute("dur", ".18s");
			player.elements.playPauseSVG1.setAttribute("points", "6,4 28,16 6,16 6,16");
	
			var playPauseSVG2animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
			playPauseSVG2animate.setAttribute("attributeType", "XML");
			playPauseSVG2animate.setAttribute("attributeName", "points");
			playPauseSVG2animate.setAttribute("from", player.elements.playPauseSVG2.getAttribute("points"));
			playPauseSVG2animate.setAttribute("to", "6,16 28,16 6,28 6,28");
			playPauseSVG2animate.setAttribute("begin", "indefinite");
			playPauseSVG2animate.setAttribute("dur", ".18s");
			player.elements.playPauseSVG2.setAttribute("points", "6,16 28,16 6,28 6,28");
	
			player.elements.playPauseSVG1.appendChild(playPauseSVG1animate);
			player.elements.playPauseSVG2.appendChild(playPauseSVG2animate);
	
			playPauseSVG1animate.beginElement();
			playPauseSVG2animate.beginElement();

		}

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
 * interactions/progress-bar.js
 *
 * Intéractions de la barre de progression.
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

	var pageX = event.touches ? event.touches[0].pageX : event.pageX;

	var progressBar = this.elements.progressBar,
		width = progressBar.offsetWidth;

	var x = Math.max(Math.min(pageX - DreamPlayer.getOffsets(progressBar).left, width), 0);

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

	this.addEvent("touchstart", "progressBar", function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0) {

			player.progressBarClicking = true;

			DreamPlayer.addClass(player.elements.progressBar, "progress-bar--clicking");

			player.changeTime.call(player, event);

		}

	});

	this.addEvent("mouseup", document.body, function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0 && player.progressBarClicking) {

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
 * interactions/qualitys.js
 *
 * Intéraction qualités.
 */

DreamPlayer.prototype.toggleQualitys = function() {

	if ((" " + this.elements.player.className + " ").search("show-qualitys") > -1) {

		this.hideQualitys();

	}

	else {

		this.showQualitys();

	}

};

DreamPlayer.prototype.showQualitys = function() {

	this.elements.qualitys.style.display = "block";

	this.addClass("show-qualitys");

};

DreamPlayer.prototype.hideQualitys = function() {

	this.removeClass("show-qualitys");

	setTimeout(function(player, element) {
	
		return function() {

			if ((" " + player.className + " ").search("show-qualitys") === -1) {

				element.style.display = "none";

			}
	
		};
	
	}(this.elements.player, this.elements.qualitys), 500);

};

DreamPlayer.prototype.setQualitys = function() {

	this.volume(this.settings.volume);

	this.addEvent("click", "settings", function(event, player) {

		player.toggleQualitys();

	});

	for (var i = 0; i < this.settings.sources.length; i++) {

		var quality = document.createElement("div");
		quality.className = "quality";
		quality.innerHTML = this.settings.sources[i].text;
		quality.setAttribute("data-format", this.settings.sources[i].format);
		this.elements.qualitys.appendChild(quality);
		this.elements["quality" + this.settings.sources[i].format] = quality;

		this.addEvent("click", "quality" + this.settings.sources[i].format, function(i) {
		
			return function(event, player) {

				player.hideQualitys();
				player.setSource(i);

			};
		
		}(i));

	}

	this.addEvent("loadeddata", "video", function(event, player) {
	
		if (player.lastTime) {

			player.elements.video.currentTime = player.lastTime;

			player.lastTime = null;

		}
	
	});

};

/**
 * interactions/redirect.js
 *
 * Redirection en playlist.
 */

DreamPlayer.prototype.reviewRedirectTime = function() {

	this.elements.redirectMessage.innerHTML = this.elements.redirectMessage.getAttribute("message").replace("{seconds}", Math.max(Math.round(this.redirectTime / 1000), 0));

	if (this.redirectTime < 10) {

		window.location.href = this.settings.redirectAtEnd;

	}

}

DreamPlayer.prototype.cancelRedirect = function() {

	if (this.redirectInterval) {

		clearInterval(this.redirectInterval);

		this.redirectTime = 5000;

		this.elements.redirectMessage.style.display = "none";
		this.elements.redirectCancel.style.display = "none";

	}

}

DreamPlayer.prototype.willRedirect = function() {

	this.reviewRedirectTime();

	this.elements.redirectMessage.style.display = "";
	this.elements.redirectCancel.style.display = "";

	this.redirectInterval = setInterval(function(player) {
	
		return function() {
			
			player.redirectTime -= 1000;

			player.reviewRedirectTime();
	
		};
	
	}(this), 1000);

}

DreamPlayer.prototype.setRedirectAtEnd = function() {

	this.redirectTime = 5000;

	if (this.settings.redirectAtEnd) {

		this.addEvent("ended", "video", function(event, player) {
	
			player.willRedirect();
	
		});

		this.addEvent("play", "video", function(event, player) {
	
			player.cancelRedirect();
	
		});

		this.addEvent("click", "redirectCancel", function(event, player) {
	
			player.cancelRedirect();
	
		});

	}  

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
 * interactions/time.js
 *
 * Intéractions du temps.
 */

DreamPlayer.prototype.timeToString = function(time) {

    var minutes = Math.floor(time / 60);
    minutes = '00'.substring(0, 2 - ('' + minutes).length) + ('' + minutes);

    var seconds = Math.floor(time - minutes * 60);
    seconds = '00'.substring(0, 2 - ('' + seconds).length) + ('' + seconds);

    var hours = Math.floor(time / 3600);
    hours = '00'.substring(0, 2 - ('' + hours).length) + ('' + hours);

    return (hours != '00' ? hours + ':' : '') + minutes + ':' + seconds;

};

DreamPlayer.prototype.setTimeIndicator = function() {

	this.addEvent("timeupdate", "video", function(event, player) {

		player.elements.time.innerHTML = player.timeToString(player.elements.video.currentTime);

	});

};

/**
 * interactions/volume.js
 *
 * Intéraction volume.
 */

DreamPlayer.prototype.volume = function(volume) {

	if (!volume) {

		var volume = 1;

	}

	this.elements.volumeSlide.bar.style.width = volume * 100 + "%";
	this.elements.volumeSlide.dot.style.left = volume * 100 + "%";

	if (volume > 1) {

		volume = 1;

	}

	else if (volume < 0) {

		volume = 0;

	}

	this.elements.video.volume = volume;

	if (volume <= 0.05) {

		this.addClass("muted");

	}

	else {

		this.removeClass("muted");

	}

};

DreamPlayer.prototype.sendVolume = function() {

	if (_logged_) {

		marmottajax.put({

			url: _webroot_ + "account/volume",

			options: {

				volume: this.elements.video.volume

			}

		});
		
	}

};

DreamPlayer.prototype.changeVolume = function(event) {

	var pageX = event.touches ? event.touches[0].pageX : event.pageX;

	var volumeSlide = this.elements.volumeSlide,
		width = volumeSlide.offsetWidth;

	var x = Math.max(Math.min(pageX - DreamPlayer.getOffsets(volumeSlide).left, width), 0);

	var volume = x / width;

	if (!isNaN(volume)) {

		this.elements.volumeSlide.bar.style.width = (volume * 100) + "%";

		this.volume(volume);

	}

};

DreamPlayer.prototype.hideVolume = function() {

	if (this.hideVolumeTimeout) {

		clearTimeout(this.hideVolumeTimeout);

	}

	this.hideVolumeTimeout = setTimeout(function(player) {
	
		return function() {
	
			player.removeClass("show-volume");
	
		};
	
	}(this), 3500);

};

DreamPlayer.prototype.setVolume = function() {

	this.volume(this.settings.volume);

	this.addEvent("click", "volumeIcon", function(event, player) {

		if ((" " + player.elements.player.className + " ").search(" show-volume ") >= 0) {

			player.hideVolume();

			player.removeClass("show-volume");

		}

		else {

			clearTimeout(this.hideVolumeTimeout);

			player.addClass("show-volume");

		}

	});

	this.addEvent("mouseOver", "volumeIcon", function(event, player) {

		clearTimeout(this.hideVolumeTimeout);

		player.addClass("show-volume");

	});

	this.addEvent("mouseout", "volumeIcon", function(event, player) {

		player.hideVolume();

	});

	this.addEvent("mouseover", "volumeSlide", function(event, player) {

		clearTimeout(this.hideVolumeTimeout);

		player.addClass("show-volume");

	});

	this.addEvent("mousemove", "volumeSlide", function(event, player) {

		clearTimeout(this.hideVolumeTimeout);

		player.addClass("show-volume");

	});


	this.addEvent("mousedown", "volumeSlide", function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0) {

			player.volumeSlideClicking = true;

			DreamPlayer.addClass(player.elements.volumeSlide, "volume-slide--clicking");

			player.changeVolume.call(player, event);

		}

	});

	this.addEvent("touchstart", "volumeSlide", function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0) {

			player.volumeSlideClicking = true;

			DreamPlayer.addClass(player.elements.volumeSlide, "volume-slide--clicking");

			player.changeVolume.call(player, event);

		}

	});

	this.addEvent("mouseup", document.body, function(event, player) {

		if ((" " + player.elements.controls.className + " ").search(" show ") >= 0 && player.volumeSlideClicking) {

			player.volumeSlideClicking = false;

			DreamPlayer.removeClass(player.elements.volumeSlide, "volume-slide--clicking");

			player.changeVolume.call(player, event);

			player.sendVolume();

		}

	});

	this.addEvent("mousemove", "player", function(event, player) {

		if (player.volumeSlideClicking) {

			player.changeVolume.call(player, event);

		}

	});

	this.addEvent("touchmove", "player", function(event, player) {

		if (player.volumeSlideClicking) {

			player.changeVolume.call(player, event);

		}

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