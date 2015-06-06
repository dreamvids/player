"use strict";

function onDraggerDrop(dragger, fn) {

	var state = this.state;

	var newState = {};

	for (name in state.dropFunctions) {
		if (state.dropFunctions.hasOwnProperty(name)) {
	
			newState[name] = value;
	
		}
	}

	newState[dragger] = fn;

	this.setState({

		dropFunctions: newState

	});

}

module.exports = onDraggerDrop;