var express = require('express');
var { checkSchema, body } = require('express-validator');
var router = express.Router();
var authController = require('../controller/auth_controller');
var { userLoginSchema } = require('../../common/http_req_schema/auth_schemas')

/* GET users listing. */
router.post('/login', checkSchema(userLoginSchema), authController.login);
router.post('/forget/password', authController.forgetPassword);
router.post('/reset/password/:token', authController.resetPassword);


module.exports = router;
