var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: String,
	quantity: String
});

module.exports = mongoose.model('Item', ItemSchema);