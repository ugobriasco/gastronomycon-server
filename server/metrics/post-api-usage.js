// const User = require('../user/user.model');
// const UserMetrics = require('./metrics-user.model');
//
// const postApiUsage = (req, res, next) => {
//   // Look for a registered user or guest user
//   User.findById(req.decoded.user._id)
//     .then(user => {
//       let updatedUser = user;
//       const usageRecord = { foo: 'bar' };
//       updatedUser.metrics.api_usage = usageRecord;
//       console.log(updatedUser);
//       return updatedUser;
//     })
//     .then(user => user.save())
//     .then(() => next())
//     .catch(err => console.log(err));
// };
//
// function updateApiUsage(usageRecord) {
//   const NOW = new Date();
//   return usageRecord;
// }
// module.exports = { postApiUsage };
