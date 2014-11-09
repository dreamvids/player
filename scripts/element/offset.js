
/**
 *	element/offsets.js
 *
 *	Gestion des classes d'élements.
 */

DreamPlayer.getOffsets = function(element) {

	var x = 0,
		y = 0;

	while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {

		x += element.offsetLeft - element.scrollLeft;
		y += element.offsetTop - element.scrollTop;
		
		element = element.offsetParent;

	}

	return {

		top: y, left: x

	};

}