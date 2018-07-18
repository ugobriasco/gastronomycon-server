const router = require('express').Router();

router.use('/v1.0', require('./v1.0'));
router.use('/', require('./v0.0'));

module.exports = router;
