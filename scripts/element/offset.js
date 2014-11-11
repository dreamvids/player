
/**
 *	element/offsets.js
 *
 *	Gestion des classes d'élements.
 */

DreamPlayer.getOffsets = function(element) {

	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

	var x = 0,
		y = 0;

	while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop) && element !== fullscreenElement) {

		x += element.offsetLeft - element.scrollLeft;
		y += element.offsetTop - element.scrollTop;
		
		element = element.offsetParent;

	}

	return {

		top: y,
		left: x

	};

}