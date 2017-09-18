var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const ListSchema = new mongoose.Schema({
	ownerID: {type: String, required: true},
	allowedUsers: Array,
	items: Array
});

module.exports = mongoose.model('List', ListSchema);