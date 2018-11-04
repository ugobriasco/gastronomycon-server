const jwt = require('jsonwebtoken');
const getConfig = require('../../util/get-config');

const cfg = getConfig();

function generateToken(user) {
  return jwt.sign({ user }, cfg.secret, {
    expiresIn: 10080 // in seconds
  });
}
module.exports = generateToken;
