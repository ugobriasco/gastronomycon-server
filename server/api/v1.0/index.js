const express = require('express');

const authCtrl = require('../../auth/auth.controller');
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

router.route('/login').post(authCtrl.postLogin);
router.route('/signup').post(authCtrl.validateSignupCode, authCtrl.postSignUp);
router.route('/reset/:token').post(authCtrl.postReset);
router.route('/forgot').post(authCtrl.postForgot);

router.all('*', function(req, res) {
  res.status(404).send({ message: '** no hunicorns here**' });
});

module.exports = router;
