const jwt = require('jsonwebtoken');
const cfg = require('../../cfg');

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    if (!token) resolve({ status: 400, message: 'No token provided' });
    return jwt.verify(token, cfg.secret, (err, decoded) => {
      if (err) {
        resolve({ status: 401, message: 'Token authentication failed' });
      } else {
        resolve({ status: 200, message: 'Token authenticated', decoded });
      }
    });
  });
};

module.exports = verifyToken;
