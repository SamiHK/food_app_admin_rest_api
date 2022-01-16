var multer = require('multer');
var upload = multer({dest: '/files'})

exports.upload = async(file) => {
    return upload.single()
}
