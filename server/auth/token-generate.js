const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

const generatePasswordResetToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, buf) => {
      const token = buf.toString('hex');
      if (err) reject(err);
      resolve(token);
    })
  );

module.exports = { generateToken, generatePasswordResetToken };
