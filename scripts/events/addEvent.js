
/**
 *	events/addEvent.js
 *
 *	Ajout d'un évenement au player.
 */

DreamPlayer.prototype.addEvent = function(name, cible, callback) {

	for (var i = 0; i < this.events.length; i++) {

		if (this.events[i].name.toLowerCase() == name.toLowerCase()) {

			var push = {

				events: [],
				callback: callback,
				that: this,
				condition: this.events[i].condition

			};

			for (var e = 0; e < this.events[i].events.length; e++) {

				push.events.push(this.events[i].events[e]);

				this.elements[cible].addEventListener(this.events[i].events[e], this.onEvent, false);

			}

			if (!this.elements[cible].eventsListeners) {

				this.elements[cible].eventsListeners = [];

			}

			this.elements[cible].eventsListeners.push(push);

			if (this.settings.debug) {

				console.info('added event "' + name + '"');

			}

		}

	}

};