
/**
 * element/classes.js
 *
 * Gestion des classes d'élements.
 */

DreamPlayer.prototype.toogleClass = function(name) {

	if ((" " + this.elements.player.className + " ").search(" " + name + " ") >= 0) {

		this.removeClass(name);

	}

	else {

		this.addClass(name);

	}

}

DreamPlayer.prototype.addClass = function(name) {

	if ((" " + this.elements.player.className + " ").search(" " + name + " ") < 0) {

		this.elements.player.className += " " + name;

	}

}

DreamPlayer.prototype.removeClass = function(name) {

	while ((" " + this.elements.player.className + " ").search(" " + name + " ") >= 0) {

		this.elements.player.className = this.elements.player.className.replace(name, "");

	}

}

DreamPlayer.addClass = function(element, name) {

	if ((" " + element.className + " ").search(" " + name + " ") < 0) {

		element.className += " " + name;

	}

}

DreamPlayer.removeClass = function(element, name) {

	while ((" " + element.className + " ").search(" " + name + " ") >= 0) {

		element.className = element.className.replace(name, "");

	}

}