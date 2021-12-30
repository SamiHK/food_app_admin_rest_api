var router = require('express').Router();
const { updateUserProfile } = require('../controller/user_profile_controller');

router.post('/:id', updateUserProfile);

module.exports = router;