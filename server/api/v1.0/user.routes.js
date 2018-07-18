const express = require('express');
const validate = require('express-validation');
const authCtrl = require('../../auth/auth.controller');
const userCtrl = require('../../user/user.controller');
const userVal = require('../../user/user.validation');

const router = express.Router();

router
  .route('/')
  .get(authCtrl.isAuthenticated, authCtrl.isAdmin, userCtrl.getAllUsers);
router
  .route('/:userID')
  .get(
    validate(userVal.getUser),
    authCtrl.isAuthenticated,
    authCtrl.isAccountOwner,
    userCtrl.getUser
  )
  .put(
    validate(userVal.updateUser),
    authCtrl.isAuthenticated,
    authCtrl.isAccountOwner,
    userCtrl.updateUser
  )
  .delete(
    validate(userVal.deleteUser),
    authCtrl.isAuthenticated,
    authCtrl.isAccountOwner,
    userCtrl.deleteUser
  );

module.exports = router;
