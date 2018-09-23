const {
  postLogin,
  postSignUp,
  validateSignupCode,
  postUpdatePassword,
  postForgot,
  postReset,
  isAuthenticated,
  isAdmin,
  isAccountOwner
} = require('./auth.controller');
const { hasApiKey } = require('./has-api-key');

module.exports = {
  postLogin,
  postSignUp,
  validateSignupCode,
  postUpdatePassword,
  postForgot,
  postReset,
  isAuthenticated,
  isAdmin,
  isAccountOwner,
  hasApiKey
};
