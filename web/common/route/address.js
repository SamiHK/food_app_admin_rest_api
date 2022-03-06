var express = require('express');
const { getCountries, getStates, getCities, saveCustomerAddress, getCustomerAddress } = require('../controller/address_controller');
var router = express.Router();

router.get('/countries', getCountries);
router.get('/states', getStates);
router.get('/cities', getCities);
router.get('/customer/:customerId', getCustomerAddress);
router.post('/customer/:customerId', saveCustomerAddress);

module.exports = router;
