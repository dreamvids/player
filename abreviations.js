var list = require("postcss/lib/list");

module.exports = function(css, processor) {

	var propsChange = {

		bg: "background",
		p: "position",
		d: "display",
		w: "width",
		h: "height"

	};

	var displays = {

		"0":  "none",
		"n":  "none",
		"i":  "inline",
		"b":  "block",
		"ib": "inline-block",
		"f":  "flex",
		"if": "inline-flex",
		"it": "inline-table",
		"li": "list-item",
		"it": "inline-table",
		"t":  "table"
		
	};

	var positions = {

		"a": "absolute",
		"r": "relative",
		"f": "fixed",
		"s": "static",
		"i": "inherit"
		
	};

	css.eachDecl(function(decl) {

		if (propsChange[decl.prop]) {

			decl.prop = propsChange[decl.prop];

		}

		if (decl.prop === "display") {

			decl.value = displays[decl.value] || decl.value;

		}

		if (decl.prop === "position") {

			var values = list.space(decl.value);
			var length = values.length;

			var position = positions[values[0]] || values[0];

			if (length === 1) {

				decl.value = position;

			}

			if (length === 2) {

				decl.cloneBefore({ prop: "position", value: position });
				decl.cloneBefore({ prop: "top",    value: values[1] });
				decl.cloneBefore({ prop: "right",  value: values[1] });
				decl.cloneBefore({ prop: "bottom", value: values[1] });
				decl.cloneBefore({ prop: "left",   value: values[1] });

				decl.removeSelf();

			}

			else if (length === 3) {

				decl.cloneBefore({ prop: "position", value: position });
				decl.cloneBefore({ prop: "top",    value: values[1] });
				decl.cloneBefore({ prop: "right",  value: values[2] });
				decl.cloneBefore({ prop: "bottom", value: values[1] });
				decl.cloneBefore({ prop: "left",   value: values[2] });

				decl.removeSelf();

			}

			else if (length === 5) {

				decl.cloneBefore({ prop: "position", value: position });
				decl.cloneBefore({ prop: "top",    value: values[1] });
				decl.cloneBefore({ prop: "right",  value: values[2] });
				decl.cloneBefore({ prop: "bottom", value: values[3] });
				decl.cloneBefore({ prop: "left",   value: values[4] });

				decl.removeSelf();

			}

		}

	});

};