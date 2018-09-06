const express = require('express');
const validate = require('express-validation');
const authCtrl = require('../../auth/auth.controller');
const userCtrl = require('../../user/user.controller');
const userVal = require('../../user/user.validation');

const {
  postUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../../user');

const { isAuthenticated, isAccountOwner, isAdmin } = require('../../auth');

const {
  getApps,
  postApp,
  putApp,
  deleteApp,
  refreshKey
} = require('../../apps');

const router = express.Router();

router.route('/').get(isAuthenticated, isAdmin, getAllUsers);

// managing users
router
  .route('/:userID')
  .get(validate(userVal.getUser), isAuthenticated, isAccountOwner, getUser)
  .put(
    validate(userVal.updateUser),
    isAuthenticated,
    isAccountOwner,
    updateUser
  )
  .delete(
    validate(userVal.deleteUser),
    isAuthenticated,
    isAccountOwner,
    deleteUser
  );

// managing user.apps
router
  .route('/:userID/apps/')
  .get(getApps)
  .post(postApp);

router
  .route('/:userID/apps/:appID')
  .get(getApps)
  .put(putApp)
  .delete(deleteApp);

router.route('/:userID/apps/:appID/refresh').post(refreshKey);

module.exports = router;
