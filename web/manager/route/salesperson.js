const { filter, available, register, get } = require('../controller/salesperson_controller')

var router = require('express').Router()

router.get('', filter)
router.get('/available', available)
router.post('/register', register)
router.get('/:id', get)

module.exports = router