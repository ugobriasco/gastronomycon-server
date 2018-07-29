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

module.exports = {
  postLogin,
  postSignUp,
  validateSignupCode,
  postUpdatePassword,
  postForgot,
  postReset,
  isAuthenticated,
  isAdmin,
  isAccountOwner
};
