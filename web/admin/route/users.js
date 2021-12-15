var express = require('express');
var router = express.Router();
var userController = require('../../controller/user_controller')

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(auth.login('g1'));
// });

router.get('/', userController.getUsers)
router.get('/:usernameOrEmail', userController.getUser)

module.exports = router;
