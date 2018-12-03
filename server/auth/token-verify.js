const jwt = require('jsonwebtoken');
const cfg = require('../../cfg');

const verifyToken = ({ token, secret }) => {
  return new Promise((resolve, reject) => {
    if (!token) resolve({ status: 400, message: 'No token provided' });
    const _secret = secret || cfg.secret;
    return jwt.verify(token, _secret, (err, decoded) => {
      if (err) {
        resolve({ status: 401, message: 'Token authentication failed' });
      } else {
        resolve({ status: 200, message: 'Token authenticated', decoded });
      }
    });
  });
};

module.exports = verifyToken;
