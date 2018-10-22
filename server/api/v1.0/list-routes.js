const express = require('express');
const validate = require('express-validation');
const authCtrl = require('../../auth/auth.controller');
const listCtrl = require('../../list/list.controller');
const listVal = require('../../list/list.validation');

const router = express.Router();

router
  .route('/')
  .get(
    //authCtrl.isAuthenticated,
    //authCtrl.isAdmin,
    listCtrl.getAllLists
  )
  .post(
    validate(listVal.postList),
    authCtrl.isAuthenticated,
    listCtrl.postList
  );
router
  .route('/:objID')
  .get(
    validate(listCtrl.getList),
    authCtrl.isAuthenticated,
    listCtrl.loadList,
    listCtrl.isListOwner,
    listCtrl.getList
  )
  .delete(
    validate(listVal.deleteList),
    authCtrl.isAuthenticated,
    listCtrl.isListOwner,
    listCtrl.deleteList
  )
  .put(
    validate(listVal.replaceListItem),
    authCtrl.isAuthenticated,
    listCtrl.loadList,
    listCtrl.isListOwner,
    listCtrl.replaceListItems
  );

// router.route('/list/share/:objID')
// 	.post(listCtrl.shareList);
// router.route('/list/:objID/unshare')
// 	.post(listCtrl.unshareList);

module.exports = router;
