"use strict";

var React = require("react");

var zero = require("./../../core/zero");

var Time = React.createClass({

	render() {

		var time = parseInt(this.props.children);

    	var hours   = Math.floor(time / 3600);
    	var minutes = Math.floor((time - (hours * 3600)) / 60);
    	var seconds = zero(Math.floor(time - (hours * 3600) - (minutes * 60)));

    	hours = zero(hours);
    	minutes = zero(minutes);

		var content = (hours !== "00" ? hours + ":" : "") + minutes + ":" + seconds;

		return (
	
			<div className="player__control__time">{content}</div>

		);
	}

});

module.exports = Time;