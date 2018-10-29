const mongoose = require('mongoose');

const UserMetricSchema = new mongoose.Schema({
  user_id: String,
  api_usage: {
    current_month: Date,
    counter: Number,
    history: Array
  }
});

module.exports = mongoose.model('UserMetric', UserMetricSchema);
