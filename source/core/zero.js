"use strict";

function zero(number) {

	return "00".substring(0, 2 - ("" + number).length) + ("" + number);

}

module.exports = zero;