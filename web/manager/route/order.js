var express = require('express');
const { search } = require('../controller/order_controller');
var router = express.Router();

/* GET users listing. */
router.get('/search', search);

module.exports = router;
