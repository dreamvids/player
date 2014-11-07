
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