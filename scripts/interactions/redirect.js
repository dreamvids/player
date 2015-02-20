
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