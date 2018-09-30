const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  user_id: String,
  application_name: String,
  api_key: String
});

AppSchema.index({ api_key: 'text' });

module.exports = mongoose.model('App', AppSchema);
