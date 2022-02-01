const { getBranches } = require('../controller/branch_controller');

var router = require('express').Router();

router.get('', getBranches);

module.exports = router;