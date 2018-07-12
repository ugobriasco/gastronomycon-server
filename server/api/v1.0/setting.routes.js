const express = require('express');
const validate = require('express-validation');
const authCtrl = require('../../auth/auth.controller');
const settingCtrl = require('../../setting/setting.controller');

const router = express.Router();

router
  .route('/')
  .post(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.postSetting)
  .get(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.getAllSettings);
router
  .route('/:name')
  .get(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.getSetting)
  .put(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.putSetting);
router
  .route('/:objID')
  .delete(
    authCtrl.isAuthenticated,
    authCtrl.isAdmin,
    settingCtrl.deleteSetting
  );

module.exports = router;
