"use strict";

var React = require("react");
var cx = React.addons.classSet;

var Quality = React.createClass({

	getInitialState: function () {
	    return {
	        
	    	open: false

	    };
	},

	render() {

		var props = this.props;
		var state = this.state;

		var currentSource = props.sources[props.source];

		var classes = cx({

			"player__control__quality": true,
			"player__control__quality--open": state.open,
			"player__control__quality--is-hd": currentSource.format >= 720

		});

		var menu = [];

		for (var i = props.sources.length - 1; i >= 0; i--) {

			var item = props.sources[i];

			var handleClick = function(sourceId) {

				this.props.actions.setSource(sourceId);
				this.close();

			};

			var activeClass = "";

			if (item.format === currentSource.format) {
				activeClass = "-active";
			}

			menu.push(
				<div className={activeClass} onClick={handleClick.bind(this, i)}>{item.format}</div>
			);

		}

		return (
	
			<div className={classes}
			     onClick={this.handleClick}>
				
				HD

				<div className="player__control__quality__menu">
					{menu}
				</div>

			</div>

		);

	},

	handleClick() {

		var state = this.state;

		this.setState({

			open: !state.open

		});

	},

	close() {
		this.setState({

			open: false

		});
	}

});

module.exports = Quality;