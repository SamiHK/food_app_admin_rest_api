var express = require('express');
var { checkSchema, body } = require('express-validator');
const { create, get } = require('../controller/order_controller');
var router = express.Router();

/* GET users listing. */
router.post('', create);
router.get('/:status', get);

module.exports = router;
