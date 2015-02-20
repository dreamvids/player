
/**
 *	events/setEvents.js
 *
 *	Intialisation d'un évenement.
 */

DreamPlayer.prototype.onEvent = function(event) {

	if (this.eventsListeners.length && typeof event !== "undefined") {

		for (var i = 0; i < this.eventsListeners.length; i++) {

			for (var e = 0; e < this.eventsListeners[i].events.length; e++) {

				if (event.type == this.eventsListeners[i].events[e]) {

					if (!this.eventsListeners[i].condition || this.eventsListeners[i].condition(event, this)) {

						this.eventsListeners[i].callback(event, this.eventsListeners[i].that);

					}

				}

			}

		}

	}

}

DreamPlayer.prototype.setEvents = function() {

	this.events = [];

	for (var i = 0; i < DreamPlayer.events.length; i++) {

		var clone = {

			name: DreamPlayer.events[i].name,
			events: [],
			condition: DreamPlayer.events[i].condition ? DreamPlayer.events[i].condition : null

		};

		for (var e = 0; e < DreamPlayer.events[i].events.length; e++) {

			clone.events.push(DreamPlayer.events[i].events[e]);

		}

		this.events.push(clone);

	}

	if (this.settings.debug) {

		eventsNames = "";

		for (var i = 0; i < this.events.length; i++) {

			eventsNames += (i > 0 && i < this.events.length - 1 ? ", " : "") + (i == this.events.length - 1 ? " et " : "") + this.events[i].name;

		}

		console.info("events setted", '"' + eventsNames + '"', this.events, "- DreamPlayer.prototype.setEvents");

	}

};

DreamPlayer.events = [

	{
		name: "loadeddata",
		events: ["loadeddata"]
	},

	{
		name: "click",
		events: ["click"]
	},

	{
		name: "dblClick",
		events: ["dblclick"]
	},

	{
		name: "mouseDown",
		events: ["mousedown"]
	},

	{
		name: "mouseUp",
		events: ["mouseup"]
	},

	{
		name: "mouseMove",
		events: ["mousemove"]
	},

	{
		name: "mouseOver",
		events: ["mouseover"]
	},

	{
		name: "mouseOut",
		events: ["mouseout"]
	},

	{
		name: "touchstart",
		events: ["touchstart"]
	},

	{
		name: "touchmove",
		events: ["touchmove"]
	},

	{
		name: "keyDown",
		events: ["keydown"]
	},

	{
		name: "canPlay",
		events: ["canplay"]
	},

	{
		name: "play",
		events: ["play"]
	},

	{
		name: "pause",
		events: ["pause"]
	},

	{
		name: "ended",
		events: ["ended"]
	},

	{
		name: "timeUpdate",
		events: ["timeupdate"]
	},

	{
		name: "loadedMetaData",
		events: ["loadedmetadata"]
	},

	{
		
		name: "mouseWheelUp",
		events: ["mousewheel", "DOMMouseScroll"],

		condition: function(event, player) {

			return event.wheelDelta > 0 || event.detail < 0;

		}

	},

	{

		name: "mouseWheelDown",
		events: ["mousewheel", "DOMMouseScroll"],

		condition: function(event, player) {

			return event.wheelDelta < 0 || event.detail > 0;

		}

	},

	{
		name: "orientationChange",
		events: ["orientationchange"]
	}

];