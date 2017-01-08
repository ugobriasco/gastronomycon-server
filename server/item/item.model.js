var mongoose = require('mongoose');

/**
 * - type 					e.g. reis and reis speciality
 * 
 * - language 				e.g. en
 * -- name 					e.g. reis
 * -- sepcificity 			e.g. basmati
 * 
 * - shopping
 * --
 * -- reseller				e.g. Kaiser
 * -- price					e.g. 1
 * -- currency				e.g. EUR
 */

var ItemSchema = new mongoose.Schema({
	type: String,
	pic: String,
	name: {
		it: {
			main: String,
			spec: String
		},
		pl: {
			main: String,
			spec: String
		},
		de: {
			main: String,
			spec: String
		},
	}
	
});

module.exports = mongoose.model('Item', ItemSchema);