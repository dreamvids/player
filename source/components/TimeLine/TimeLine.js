"use strict";

var React = require("react");

var Slider = require("./Slider.js");

var TimeLine = React.createClass({

	render: function() {

		return (
	
			<div className="player__control__time-line">

				<Slider />

			</div>

		);

	}

});

module.exports = TimeLine;