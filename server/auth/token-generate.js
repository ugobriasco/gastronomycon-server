const jwt = require('jsonwebtoken');
const cfg = require('../cfg');

function generateToken(user) {
  return jwt.sign({ user }, cfg.secret, {
    expiresIn: 10080 // in seconds
  });
}
module.exports = generateToken;
