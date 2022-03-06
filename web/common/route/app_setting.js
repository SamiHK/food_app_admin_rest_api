var express = require('express');
const { get } = require('../controller/app_setting_controller');
var router = express.Router();

router.get('', get);

module.exports = router;
