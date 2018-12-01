const findUser = require('./user-find');
const verifyToken = require('./token-verify');

const cfg = require('../../cfg');

const activateAccount = token =>
  verifyToken(token, cfg.activation_secret).then(res => {
    if (res.status != 200) return res;
    findUser(res.email).then(user => {
      user.isActive = true;
      user.save((err, user) => {
        if (err) return { status: 500, message: 'user not updated', err };
        return { status: 200, message: 'User activated' };
      });
    });
  });

module.exports = activateAccount;
