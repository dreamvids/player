"use strict";

function dragControl(dragger, event) {

	var state = this.state,
		actions = this.getActions();

	var offsetLeft = this.getDOMNode().offsetLeft;

	switch(event.type) {

		case "mousedown":

			this.setState({

				dragging: dragger,

				dragFrom: event.clientX - offsetLeft,
				dragDeplacement: 0

			});

		break;

		case "mousemove":
			if (state.dragging) {

				var deplacement = -(state.dragFrom - (event.clientX - offsetLeft));

				if (state.dragDeplacement !== deplacement) {
					this.setState({

						dragDeplacement: -(state.dragFrom - (event.clientX - offsetLeft))

					});
				}

			}
		break;

		case "mouseup":

			var fn = state.dropFunctions[state.dragging];

			if (fn) {

				fn(event);

			}

			this.setState({

				dragging: null

			});

		break;

	}

}

module.exports = dragControl;