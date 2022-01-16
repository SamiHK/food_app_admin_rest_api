var router = require('express').Router()
var multer = require('multer');
var crypto = require('crypto')
const { sendErrorResponse } = require('../../common/util/http_util');
const { updateMenuImage, updateMenuItemImage } = require('../controller/menu_controller');
const ds = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_STORAGE)
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, function (err, raw) {
            file.id = raw.toString('hex')
            let splitFileOriginalName = file.originalname.split(".");
            cb(err, err ? undefined : `${raw.toString('hex')}.${splitFileOriginalName[splitFileOriginalName.length-1]}`)
        })
    }
})
var upload = multer({ storage: ds })

router.post('/menu', upload.single('menu'), (req, res) => {
    console.log(req.file);
    // console.log(req);
    let file = req.file;
    file.originalname
    file.mimetype
    if (file) {
        let ext = file.mimetype.split('/')[1]
        res.json({
            path: `${process.env.FILE_ACCESS_PATH}/${req.file.filename}`
        })
    } else {
        sendErrorResponse(new Error('something gone wrong while saving file'), res)
    }
})

router.post('/menu/:id', upload.single('menu'), updateMenuImage)
router.post('/menu/item/:id', upload.single('menuItem'), updateMenuItemImage)

module.exports = router;