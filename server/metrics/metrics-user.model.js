const mongoose = require('mongoose');

const UserMetricSchema = new mongoose.Schema({
  user_id: String,
  api_usage: {
    current_month: String
  }
});

module.exports = mongoose.model('UserMetric', UserMetricSchema);
