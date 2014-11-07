
/**
 *	events/addEvent.js
 *
 *	Ajout d'un évenement au player.
 */

DreamPlayer.prototype.addEvent = function(name, cible, callback) {

	cible = typeof cible === "string" ? this.elements[cible] : cible;

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

				cible.addEventListener(this.events[i].events[e], this.onEvent, false);

			}

			if (!cible.eventsListeners) {

				cible.eventsListeners = [];

			}

			cible.eventsListeners.push(push);

			if (this.settings.debug) {

				console.info('added event "' + name + '"');

			}

		}

	}

};