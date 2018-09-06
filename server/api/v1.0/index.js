const express = require('express');

const {
  postLogin,
  validateSignupCode,
  postSignUp,
  postReset,
  postForgot,
  isAuthenticated,
  isAccountOwner,
  isAdmin
} = require('../../auth');
const {
  getApiUsage,
  getMyApiUsage,
  deleteUserMetric
} = require('../../metrics');
const apiDoc = require('./api-doc.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message:
      'Welcome in Grocerybot, the datasource of your multilingual grocery applications, following the api documentation',
    apiDoc
  });
});

router.use('/items', require('./item.routes'));
router.use('/users', require('./user.routes'));
router.use('/lists', require('./list.routes'));
router.use('/settings', require('./setting.routes'));
router.use('/usage', require('./usage.routes'));

router.route('/login').post(postLogin);
router.route('/signup').post(validateSignupCode, postSignUp);
router.route('/reset/:token').post(postReset);
router.route('/forgot').post(postForgot);

router.all('*', function(req, res) {
  res.status(404).send({ message: '** no hunicorns here**' });
});

module.exports = router;
