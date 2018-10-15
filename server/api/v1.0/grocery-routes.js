const router = require('express').Router();

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
  .get(queryGroceries)
  .post(postGrocery);

router
  .route('/id/:GID')
  .get(getGroceryId)
  .put(updateGrocery)
  .delete(deleteGrocery);

router.route('/all').get(getAllGroceries);

module.exports = router;
