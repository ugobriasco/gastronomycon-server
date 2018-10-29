const router = require('express').Router();
const { countUsers, countGroceries } = require('../../metrics');

router.route('/count/users').get(countUsers);
router.route('/count/groceries').get(countGroceries);

module.exports = router;
