"use strict";

var React = require("react");

var Control = require("./../Control");

var Player = React.createClass({

	getInitialState() {

		var data = this.props.data;

		return {

			playing: false,

			poster: data.poster,
			sources: data.sources,
			source: data.source,
			volume: data.volume

		};

	},

	render() {

		var props = this.props,
			state = this.state;

		// console.log(state.sources);

		return (
	
			<div className="player">

				poster: {state.poster}<br /><br />

				source: {state.source}<br /><br />
				volume: {state.volume}<br /><br />

				<Control actions={this.getActions()}
				         playing={state.playing} />

			</div>

		);

	},

	getActions() {
		return {

			playPause: this.playPause

		};
	},

	playPause() {

		this.setState({

			playing: !this.state.playing

		});

	}

});

module.exports = Player;