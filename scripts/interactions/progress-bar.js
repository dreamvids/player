
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