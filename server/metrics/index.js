const {
  postApiUsage,
  getApiUsage,
  getMyApiUsage,
  deleteUserMetric
} = require('./metrics.controller');

module.exports = { postApiUsage, getApiUsage, getMyApiUsage, deleteUserMetric };
