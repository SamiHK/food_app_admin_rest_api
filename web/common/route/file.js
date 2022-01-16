var router = require('express').Router()
var multer = require('multer');
var upload = multer({dest: '/files'})

router.post('', upload.array('photos'), (req, res) => {
    console.log(req.body);
})

module.exports = router;