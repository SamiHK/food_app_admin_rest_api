var express = require('express');
var { checkSchema, body } = require('express-validator');
var router = express.Router();
var authController = require('../controller/auth_controller');
const { userLoginSchema, updatePasswordSchema, emailSchema, userRegisterSchema } = require('../http_req_schema/auth_schemas');

/* GET users listing. */
router.post('/login', checkSchema(userLoginSchema), authController.login);
router.post('/register', checkSchema(userRegisterSchema), authController.register);
router.post('/forget/password', authController.forgetPassword);
router.post('/reset/password/:token', checkSchema(updatePasswordSchema), authController.resetPassword);
router.post('/:id/password', checkSchema(updatePasswordSchema), authController.updatePassword);
router.get('/:id/enabled', authController.enabled);


module.exports = router;
