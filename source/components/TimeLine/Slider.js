"use strict";

var React = require("react");

var Slider = React.createClass({

	render: function() {

		var props = this.props;

		var percent = 20;

		return (
	
			<div className="player__control__time-line__slider">
				<div className="player__control__time-line__slider__wrap">

					<div className="player__control__time-line__slider__current"
					     style={{ width: percent + "%" }}></div>

					<div className="player__control__time-line__slider__cursor"
					     style={{ left: percent + "%" }}></div>

				</div>
			</div>

		);

	}

});

module.exports = Slider;