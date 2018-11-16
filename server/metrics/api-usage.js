const UserMetric = require('./user-metrics-model');
const { User } = require('../user');
const {
  createApiUsageRecord,
  updateApiUsageRecord
} = require('./api-usage-helper');

const getApiUsage = (req, res) => {
  UserMetric.find(function(err, metrics) {
    if (err) res.status(500).send(err);
    res.json({ data: metrics });
  });
};

const getMyApiUsage = (req, res) => {
  const userID = req.params.userID;

  UserMetric.findOne({ user_id: userID })
    .then(metric => {
      if (!metric) {
        return createApiUsageRecord(userID);
        return res
          .status(201)
          .send({ message: 'No usage metric found, metric initialized' });
      } else {
        return res.json({ data: metric });
      }
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

//Middelware which posts usage if JWT headers is provided
const postApiUsage = (req, res, next) => {
  const userID = req.decoded.user._id;
  UserMetric.findOne({ user_id: userID })
    .then(metric => {
      if (metric === null) {
        console.log(`No metric for user ${userID} found.`, metric);
        return createApiUsageRecord(userID);
      } else {
        return updateApiUsageRecord(metric._id);
      }
    })
    .then(() => next())
    .catch(err => console.log(err));
};

// Tick api usage for a given user
const recordUsage = user_id => {
  UserMetric.findOne({ user_id })
    .then(metric => {
      if (metric === null) {
        console.log(`No metric for user ${userID} found.`, metric);
        return createApiUsageRecord(userID);
      } else {
        return updateApiUsageRecord(metric._id);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteUserMetric = function(req, res) {
  UserMetric.findByIdAndRemove(req.params.objID, function(err) {
    if (err) res.status(500).send(err);
    res.json({ message: 'Metric ' + req.params.objID + ' removed' });
  });
};

module.exports = {
  postApiUsage,
  getApiUsage,
  getMyApiUsage,
  deleteUserMetric,
  recordUsage
};
