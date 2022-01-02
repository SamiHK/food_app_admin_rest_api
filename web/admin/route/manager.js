var router = require('express').Router();
var { checkSchema } = require('express-validator');
var { updatePasswordSchema, emailSchema, managerRegisterSchema } = require('../../common/http_req_schema/auth_schemas')
var authController = require('../../common/controller/auth_controller');
var managerController = require('../controller/manager_controller');

router.get('', managerController.filter);
router.post('', checkSchema(managerRegisterSchema), managerController.register);
router.get('/available', managerController.available);
router.get('/:id', managerController.get);

module.exports = router;