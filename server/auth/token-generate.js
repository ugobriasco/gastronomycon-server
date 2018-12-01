const jwt = require('jsonwebtoken');
const cfg = require('../../cfg');

function generateToken(_user) {
  const user = {
    email: _user.email,
    userID: _user._id,
    role: _user.role
  };
  return jwt.sign(user, cfg.secret, {
    expiresIn: 10080 // in seconds
  });
}
module.exports = generateToken;
