const router = require('express').Router();
const { countUsers, countGroceries, countLanguages } = require('../../metrics');

router.route('/count/users').get(countUsers);
router.route('/count/groceries').get(countGroceries);
router.route('/count/languages').get(countLanguages);

module.exports = router;
