const router = require('express').Router();
const { countUsers, countGroceries, countLanguages } = require('../../metrics');
const { isAuthenticated, isAdmin } = require('../../auth');

router.route('/count/users').get(isAuthenticated, isAdmin, countUsers);
router.route('/count/groceries').get(countGroceries);
router.route('/count/languages').get(countLanguages);

module.exports = router;
