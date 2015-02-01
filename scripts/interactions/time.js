
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