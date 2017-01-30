var mongoose = require('mongoose');

var SettingSchema = new mongoose.Schema({
	name: String,
	value: String,
});

module.exports = mongoose.model('Setting', SettingSchema);