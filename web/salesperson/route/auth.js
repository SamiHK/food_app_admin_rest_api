var express = require('express');
var { checkSchema, body } = require('express-validator');
const { login, register, forgetPassword, resetPassword } = require('../../common/controller/auth_controller');
var router = express.Router();

/* GET users listing. */
router.post('/login', checkSchema(authController.userLoginSchema), login);
router.post('/register', checkSchema(authController.userRegisterSchema), register);
router.post('/forget/password', forgetPassword);
router.post('/reset/password/:token', resetPassword);


module.exports = router;
