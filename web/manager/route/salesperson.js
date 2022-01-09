const { checkSchema } = require('express-validator')
const { managerRegisterSchema, salespersonRegisterSchema } = require('../../common/http_req_schema/auth_schemas')
const { filter, available, register, get } = require('../controller/salesperson_controller')

var router = require('express').Router()

router.get('', filter)
router.get('/available', available)
router.post('', checkSchema(salespersonRegisterSchema),  register)
router.get('/:id', get)

module.exports = router