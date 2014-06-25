
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

		controls.appendChild(playPause);

			var settings = document.createElement("div");
			settings.className = "settings";
			elements["settings"] = settings;

		controls.appendChild(settings);
		
			var progressBar = document.createElement("div");
			progressBar.className = "progress-bar";

				var progressBarViewed = document.createElement("div");
				progressBarViewed.className = "viewed";
			
				var progressBarCurrent = document.createElement("div");
				progressBarCurrent.className = "current";
			
				var progressBarBuffer = document.createElement("div");
				progressBarBuffer.className = "buffer";

			progressBar.appendChild(progressBarViewed);
			progressBar.appendChild(progressBarCurrent);
			progressBar.appendChild(progressBarBuffer);
			elements["progressBar"] = {};
			elements["progressBar"]["viewed"] = progressBarViewed;
			elements["progressBar"]["current"] = progressBarCurrent;
			elements["progressBar"]["buffer"] = progressBarBuffer;

		controls.appendChild(progressBar);

	player.appendChild(controls);

	this.settings.cible.appendChild(player);

	player.style.height = player.offsetWidth / (16 / 9) + "px";

	return elements;

};