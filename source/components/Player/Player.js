"use strict";

var React = require("react");

var Player = React.createClass({

	getInitialState: function() {

		var data = this.props.data;

		return {

			poster: data.poster,
			sources: data.sources,
			source: data.source,
			volume: data.volume

		};

	},

	render: function() {

		var props = this.props,
			state = this.state;

		console.log(state.sources);

		return (
	
			<div className="player">

				poster: {state.poster}<br /><br />
				sources: {JSON.stringify(state.sources)}<br /><br />

				source: {state.source}<br /><br />
				volume: {state.volume}<br /><br />

			</div>

		);

	}

});

module.exports = Player;