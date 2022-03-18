var express = require('express');
var { checkSchema, body } = require('express-validator');
const { create, get, updateStatus, getDetail } = require('../controller/order_controller');
var router = express.Router();

/* GET users listing. */
router.post('', create);
router.get('/detail/:id', getDetail);
router.put('/status', updateStatus);
router.get('/:status', get);

module.exports = router;
