var express = require('express');
var { checkSchema, body } = require('express-validator');
var router = express.Router();
var authController = require('../controller/auth_controller');

/* GET users listing. */
router.post('/admin/login', checkSchema(authController.userLoginSchema), authController.login);
router.post('/admin/register', checkSchema(authController.userRegisterSchema), authController.register);
router.post('/admin/forget/password', authController.forgetPassword);
router.post('/admin/reset/password/:token', authController.resetPassword);


module.exports = router;
