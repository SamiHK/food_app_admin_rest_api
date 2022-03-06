const { search, register } = require('../controller/customer_controller');

var router = require('express').Router()

router.get('/search', search)
router.post('', register)

module.exports = router;