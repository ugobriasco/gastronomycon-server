const UserMetric = require('./metrics-user.model');
const User = require('../user/user.model');

const postApiUsage = (req, res, next) => {
  const userID = req.decoded.user._id;

  UserMetric.findOne({ user_id: userID })
    .then(metric => {
      console.log('here the metric found!', metric);
      if (metric === null) return createMetric(userID);
      metric.current_month = new Date();
      metric.counter = metric.counter++;
      // return metric.save().catch(err => console.log(err));
    })
    .then(() => next())
    .catch(err => console.log(err));
};

const createMetric = user_id => {
  if (!user_id) return;
  return User.findById(user_id)
    .then(user => {
      let metric = new UserMetric();
      if (!user) return;
      const NOW = new Date();
      return (metric = {
        user_id: user._id,
        current_month: NOW,
        counter: 1
      });
    })
    .then(metric => {
      console.log('new metric', metric);
      // return metric.save().catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = { postApiUsage };
