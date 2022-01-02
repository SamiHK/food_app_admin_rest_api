var express = require('express');
const { checkSchema } = require('express-validator');
const { updateEmail } = require('../../common/controller/user_controller');
const { emailSchema } = require('../../common/http_req_schema/auth_schemas');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(auth.login('g1'));
// });

// router.get('/', userController.getUsers)
// router.get('/:usernameOrEmail', userController.getUser)
// router.post('/:id/email', checkSchema(emailSchema), updateEmail)
module.exports = router;
