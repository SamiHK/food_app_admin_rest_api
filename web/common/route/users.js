var router = require('express').Router();
const { checkSchema } = require('express-validator');
const { updateEmail, verifyEmail } = require('../controller/user_controller');
const { emailSchema } = require('../http_req_schema/auth_schemas');

router.get('/email/:token', verifyEmail);
router.post('/:id/email', checkSchema(emailSchema), updateEmail);


module.exports = router;
