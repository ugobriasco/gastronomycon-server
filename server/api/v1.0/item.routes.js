const express = require('express');
const validate = require('express-validation');
const itemCtrl = require('../../item/item.controller');
const authCtrl = require('../../auth/auth.controller');
const itemVal = require('../../item/item.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(itemVal.postItem), authCtrl.isAuthenticated, itemCtrl.postItem)
  .get(validate(itemVal.queryItems), itemCtrl.queryItems);
router
  .route('/:objID')
  .get(validate(itemVal.getItem), itemCtrl.getItem)
  .put(
    validate(itemVal.updateItem),
    authCtrl.isAuthenticated,
    itemCtrl.updateItem
  )
  .delete(
    validate(itemVal.deleteItem),
    authCtrl.isAuthenticated,
    itemCtrl.deleteItem
  );

module.exports = router;
