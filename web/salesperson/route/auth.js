var express = require('express');
var { checkSchema, body } = require('express-validator');
var router = express.Router();
var authController = require('../controller/auth_controller');

/* GET users listing. */
router.post('/login', checkSchema(authController.userLoginSchema), authController.login);
router.post('/register', checkSchema(authController.userRegisterSchema), authController.register);
router.post('/forget/password', authController.forgetPassword);
router.post('/reset/password/:token', authController.resetPassword);


module.exports = router;
