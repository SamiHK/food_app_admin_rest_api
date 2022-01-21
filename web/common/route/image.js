const { getImage } = require('../../file_storage');

let router = require('express').Router()

router.get('/:fileName', getImage)

module.exports = router;