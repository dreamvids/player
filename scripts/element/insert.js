
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

		video.volume = 0;

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

		var icons = document.createElement("div");
		icons.className = "icons";

			var settings = document.createElement("div");
			settings.className = "icon icon--settings";
			elements["settings"] = settings;
	
			var settings2 = document.createElement("div");
			settings2.className = "icon icon--settings";
			elements["settings2"] = settings2;
	
			var settings3 = document.createElement("div");
			settings3.className = "icon icon--settings";
			elements["settings3"] = settings3;
	
		icons.appendChild(settings);
		icons.appendChild(settings2);
		icons.appendChild(settings3);

	player.appendChild(icons);

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