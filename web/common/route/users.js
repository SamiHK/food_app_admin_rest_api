var router = require('express').Router();
const { checkSchema } = require('express-validator');
const { getUserAddresses, saveUserAddress } = require('../controller/address_controller');
const { updateEmail, verifyEmail } = require('../controller/user_controller');
const { emailSchema } = require('../http_req_schema/auth_schemas');

router.get('/addresses', getUserAddresses);
router.post('/addresses', saveUserAddress);
router.get('/email/:token', verifyEmail);
router.post('/:id/email', checkSchema(emailSchema), updateEmail);


module.exports = router;
