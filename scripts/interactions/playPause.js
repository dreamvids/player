
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

		player.elements["playPauseSVG1"].innerHTML = "";
		player.elements["playPauseSVG2"].innerHTML = "";

		var playPauseSVG1animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
		playPauseSVG1animate.setAttribute("attributeType", "XML");
		playPauseSVG1animate.setAttribute("attributeName", "points");
		playPauseSVG1animate.setAttribute("from", player.elements["playPauseSVG1"].getAttribute("points"));
		playPauseSVG1animate.setAttribute("to", "6,4 8,4 8,28 6,28");
		playPauseSVG1animate.setAttribute("begin", "indefinite");
		playPauseSVG1animate.setAttribute("dur", ".15s");
		player.elements["playPauseSVG1"].setAttribute("points", "6,4 8,4 8,28 6,28");

		var playPauseSVG2animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
		playPauseSVG2animate.setAttribute("attributeType", "XML");
		playPauseSVG2animate.setAttribute("attributeName", "points");
		playPauseSVG2animate.setAttribute("from", player.elements["playPauseSVG2"].getAttribute("points"));
		playPauseSVG2animate.setAttribute("to", "24,4 26,4 26,28 24,28");
		playPauseSVG2animate.setAttribute("begin", "indefinite");
		playPauseSVG2animate.setAttribute("dur", ".15s");
		player.elements["playPauseSVG2"].setAttribute("points", "24,4 26,4 26,28 24,28");

		player.elements["playPauseSVG1"].appendChild(playPauseSVG1animate);
		player.elements["playPauseSVG2"].appendChild(playPauseSVG2animate);

		playPauseSVG1animate.beginElement();
		playPauseSVG2animate.beginElement();

	});

	this.addEvent("pause", "video", function(event, player) {

		player.removeClass("playing");

		player.elements["playPauseSVG1"].innerHTML = "";
		player.elements["playPauseSVG2"].innerHTML = "";

		var playPauseSVG1animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
		playPauseSVG1animate.setAttribute("attributeType", "XML");
		playPauseSVG1animate.setAttribute("attributeName", "points");
		playPauseSVG1animate.setAttribute("from", player.elements["playPauseSVG1"].getAttribute("points"));
		playPauseSVG1animate.setAttribute("to", "6,4 28,16 6,16 6,16");
		playPauseSVG1animate.setAttribute("begin", "indefinite");
		playPauseSVG1animate.setAttribute("dur", ".15s");
		player.elements["playPauseSVG1"].setAttribute("points", "6,4 28,16 6,16 6,16");

		var playPauseSVG2animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
		playPauseSVG2animate.setAttribute("attributeType", "XML");
		playPauseSVG2animate.setAttribute("attributeName", "points");
		playPauseSVG2animate.setAttribute("from", player.elements["playPauseSVG2"].getAttribute("points"));
		playPauseSVG2animate.setAttribute("to", "6,16 28,16 6,28 6,28");
		playPauseSVG2animate.setAttribute("begin", "indefinite");
		playPauseSVG2animate.setAttribute("dur", ".15s");
		player.elements["playPauseSVG2"].setAttribute("points", "6,16 28,16 6,28 6,28");

		player.elements["playPauseSVG1"].appendChild(playPauseSVG1animate);
		player.elements["playPauseSVG2"].appendChild(playPauseSVG2animate);

		playPauseSVG1animate.beginElement();
		playPauseSVG2animate.beginElement();

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