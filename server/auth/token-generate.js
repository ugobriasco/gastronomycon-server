const jwt = require('jsonwebtoken');
const cfg = require('../../cfg');

function generateToken(_user, _secret, _expire) {
  const user = {
    email: _user.email,
    userID: _user._id,
    role: _user.role
  };
  const secret = _secret || cfg.secret;
  const expiresIn = _expire || 10080; // in seconds

  return jwt.sign(user, secret, { expiresIn });
}
module.exports = generateToken;
