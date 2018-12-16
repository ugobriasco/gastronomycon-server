const User = require('../user/user.model');
const verifyToken = require('./token-verify');
const generateToken = require('./token-generate');

const cfg = require('../../cfg');

const activateAccount = token =>
  verifyActivationToken(token).then(res => {
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

const generateActivationToken = user => {
  const token = generateToken(user, cfg.activation_secret);
  return token.replace('.', 'TAA'); //GH Pages do not accept dots in url encoded links
  //return token;
};

const verifyActivationToken = token => {
  const compliantToken = token.replace('TAA', '.'); //Reverse mapping due to GH Pages restriction
  return verifyToken({
    token: compliantToken,
    secret: cfg.activation_secret
  }).then(res => {
    console.log(res);
    return res;
  });
};

module.exports = { activateAccount, generateActivationToken };
