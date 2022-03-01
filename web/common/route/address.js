var express = require('express');
const { getCountries, getStates, getCities } = require('../controller/address_controller');
var router = express.Router();

router.get('/countries', getCountries);
router.get('/states', getStates);
router.get('/cities', getCities);

module.exports = router;
