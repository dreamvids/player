
/**
 * interactions/volume.js
 *
 * Intéraction volume.
 */

DreamPlayer.prototype.volume = function(volume) {

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