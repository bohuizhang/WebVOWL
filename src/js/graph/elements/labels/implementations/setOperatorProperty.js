var BaseLabel = require("../BaseLabel.js");

module.exports = (function () {

	var o = function (graph) {
		BaseLabel.apply(this, arguments);

		this.markerType("special")
			.labelVisible(false)
			.linkType("special")
			.styleClass("setoperatorproperty")
			.type("setOperatorProperty");
	};
	o.prototype = Object.create(BaseLabel.prototype);
	o.prototype.constructor = o;

	return o;
}());
