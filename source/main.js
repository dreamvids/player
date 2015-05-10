"use strict";

var React = require("react");

var error = require("./core/error.js");
var isset = require("./core/isset.js");

var Player = require("./components/Player");

window.DreamPlayer = function(data) {

	if (isset(data.cible) && data.cible) {

		React.render(<Player data={data} />, data.cible);

	}

	else {

		error("Aucune cible n'a été défini pour le player")

	}

};