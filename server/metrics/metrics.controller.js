const UserMetric = require('./metrics-user.model');
const User = require('../user/user.model');
const {
  createApiUsageRecord,
  updateApiUsageRecord,
  deleteApiUsageRecord
} = require('./api-usage-helper');

const getApiUsage = function(req, res) {
  UserMetric.find(function(err, metrics) {
    if (err) res.status(500).send(err);
    res.json({ data: metrics });
  });
};

const postApiUsage = (req, res, next) => {
  const userID = req.decoded.user._id;
  UserMetric.findOne({ user_id: userID })
    .then(metric => {
      console.log('metric not found!', metric);
      if (metric === null) {
        return createApiUsageRecord(userID);
      } else {
        return updateApiUsageRecord(metric._id);
      }
    })
    .then(() => next())
    .catch(err => console.log(err));
};

const deleteUserMetric = function(req, res) {
  UserMetric.findByIdAndRemove(req.params.objID, function(err) {
    if (err) res.status(500).send(err);
    res.json({ message: 'Metric ' + req.params.objID + ' removed' });
  });
};

module.exports = { postApiUsage, getApiUsage, deleteUserMetric };
