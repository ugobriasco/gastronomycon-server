var mongoose = require('mongoose');

var SettingSchema = new mongoose.Schema({
	name: String,
	value: String,
	enabled: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Setting', SettingSchema);