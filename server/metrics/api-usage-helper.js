const UserMetric = require('./metrics-user.model');
const User = require('../user/user.model');

const createApiUsageRecord = user_id => {
  if (!user_id) return;

  const metric = new UserMetric({
    user_id,
    api_usage: {
      current_month: new Date(),
      counter: 1,
      history: []
    }
  });
  console.log('new metric', metric);
  metric.save(function(err) {
    if (err) console.log(err);
    return metric;
  });
};

const updateApiUsageRecord = metric_id => {
  return UserMetric.findById(metric_id)
    .then(record => {
      const _history = record.api_usage.history;

      if (isLatestMonth(record.api_usage.current_month)) {
        record.api_usage.counter = record.api_usage.counter + 1;
        return record.save();
      } else {
        record.api_usage.history = [
          record.api_usage.history,
          {
            timestamp: record.api_usage.current_month,
            usage_record: record.api_usage.counter
          }
        ];
        record.api_usage.current_month = new Date();
        record.api_usage.counter = 1;
        return record.save();
      }
    })
    .catch(err => console.log(err));
};

function isLatestMonth(latest_record, now = new Date()) {
  return now.getYear() === latest_record.getYear() &&
    now.getMonth() === latest_record.getMonth()
    ? true
    : false;
}

module.exports = {
  createApiUsageRecord,
  updateApiUsageRecord
};
