
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