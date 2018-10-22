const router = require('express').Router();
const authCtrl = require('../../auth/auth.controller');
const { hasApiKey, isAuthenticated, isAdmin } = require('../../auth');

const {
  postGrocery,
  updateGrocery,
  deleteGrocery,
  getAllGroceries,
  getGroceryId,
  queryGroceries
} = require('../../grocery');

router
  .route('/')
  .get(hasApiKey, queryGroceries)
  .post(isAuthenticated, isAdmin, postGrocery);

router
  .route('/id/:GID')
  .get(isAuthenticated, getGroceryId)
  .put(isAuthenticated, isAdmin, updateGrocery)
  .delete(isAuthenticated, isAdmin, deleteGrocery);

router.route('/all').get(isAuthenticated, isAdmin, getAllGroceries);

module.exports = router;
