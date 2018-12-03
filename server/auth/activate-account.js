const User = require('../user/user.model');
const verifyToken = require('./token-verify');

const cfg = require('../../cfg');

const activateAccount = token =>
  verifyToken({ token, secret: cfg.activation_secret }).then(res => {
    if (res.status != 200) return res;

    return User.findOne({ email: res.decoded.email })
      .then(user => {
        user.isActive = true;
        user.save();
        return user;
      })
      .then(user => {
        return {
          status: 200,
          message: 'Account activated',
          email: user.email,
          isActive: user.isActive
        };
      })
      .catch(err => {
        return {
          status: 500,
          message: 'Internal error occurred. Account not activated'
        };
      });
  });

module.exports = activateAccount;
