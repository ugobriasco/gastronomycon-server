const {
  postApiUsage,
  getApiUsage,
  getMyApiUsage,
  deleteUserMetric,
  recordUsage
} = require('./metrics.controller');

module.exports = {
  postApiUsage,
  getApiUsage,
  getMyApiUsage,
  deleteUserMetric,
  recordUsage
};
