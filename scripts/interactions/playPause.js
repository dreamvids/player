
/**
 *	interactions/playPause.js
 *
 *	Intéractions Play et Pause.
 */

DreamPlayer.prototype.setPlayPause = function() {

	this.addEvent("click", "video", function(event, player) {

		if (!("ontouchstart" in window)) {

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