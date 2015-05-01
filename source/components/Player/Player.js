"use strict";

var React = require("react");

var on = require("./../../core/on");

var Control = require("./../Control");

var Player = React.createClass({

	getInitialState() {

		var data = this.props.data;

		return {

			height: 0,

			playing: false,
			currentTime: 0,
			duration: 0,

			poster: data.poster,
			sources: data.sources,
			source: data.source,
			volume: data.volume

		};

	},

	render() {

		var props = this.props,
			state = this.state;

		var style = {

			height: state.height + "px"

		};

		return (
	
			<div className="player" style={style}>

				poster: {state.poster}<br /><br />

				source: {state.source}<br /><br />
				volume: {state.volume}<br /><br />

				<Control actions={this.getActions()}
				         playing={state.playing}
				         currentTime={state.currentTime}
				         duration={state.duration} />

			</div>

		);

	},

	componentDidMount: function() {

		this.setHeight();

		if (typeof window.addEventListener !== "undefined") {

			window.addEventListener("resize", this.setHeight);

		}

	},

	componentWillUnmount: function() {

		if (typeof window.removeEventListener !== "undefined") {

			window.removeEventListener("resize", this.setHeight);

		}

	},

	setHeight: function() {

		var state = this.state;

		var newHeight = Math.round(this.getDOMNode().offsetWidth / 16 * 9);

		if (state.height !== newHeight) {

			this.setState({

				height: newHeight

			});

		}

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