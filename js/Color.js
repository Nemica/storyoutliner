function Color() {
	// Possible calls:
	// Color(hexWithHash)
	// Color(r, g, b)
	// Color()
	var valid = false;
	switch(arguments.length) {
		case 0:
			valid = true;
			break;
		case 1:
			if(typeof arguments[0] == "string") valid = true;
			break;
		case 3:
			if(typeof arguments[0] == "integer" && typeof arguments[1] == "integer" && typeof arguments[2] == "integer") valid = true;
			break;
	}

	if(!valid) throw new Error('Invalid Arguments');

	switch(arguments.length) {
		case 0:
			// Random color
			this.r = Math.floor(Math.random() * 255);
			this.g = Math.floor(Math.random() * 255);
			this.b = Math.floor(Math.random() * 255);
			break;
		case 1:
			// Color from #rrggbb/#rgb/rrggbb/rgb notation
			var col = arguments[0];
			if(col.indexOf('#') == 0) col = col.substr(1);
			if(col.length != 3 && col.length != 6) throw new Error('Malformed hex color ' + arguments[0]);
			if(col.length == 3) {
				col = col.charAt(0) + col.charAt(0) + col.charAt(1) + col.charAt(1) + col.charAt(2) + col.charAt(2);
			}

			this.r = parseInt(col.substr(0, 2), 16);
			this.g = parseInt(col.substr(2, 2), 16);
			this.b = parseInt(col.substr(4, 2), 16);
			break;
		case 3:
			this.r = arguments[0];
			this.g = arguments[1];
			this.b = arguments[2];
			break;
	}
}

Color.prototype.hex = function() {
	return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
};

Color.prototype.toString = function() {
	return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
};

Color.prototype.shiftBrightness = function(percent) {
	percent = 100 + percent;
	var brighten = function(c) {
		var val = Math.floor(c * percent/100);
		return val > 255 ? 255 : val;
	};
	return new Color(brighten(this.r), brighten(this.g), brighten(this.b));
};