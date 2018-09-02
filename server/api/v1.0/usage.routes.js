const express = require('express');
const validate = require('express-validation');

const router = express.Router();

const { isAuthenticated, isAccountOwner, isAdmin } = require('../../auth');

const {
  getApiUsage,
  getMyApiUsage,
  deleteUserMetric
} = require('../../metrics');

router.route('/').get(isAuthenticated, isAdmin, getApiUsage);
router
  .route('/:userID')
  .get(isAuthenticated, isAccountOwner, getMyApiUsage)
  .delete(isAuthenticated, isAdmin, deleteUserMetric);

module.exports = router;
