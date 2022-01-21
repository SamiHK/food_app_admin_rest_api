const S3 = require('aws-sdk/clients/s3');
var multer = require('multer');
var crypto = require('crypto');
var fs = require('fs');
const logger = require('../logger');

const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const ds = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_STORAGE_WRITE_PATH);
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, function (err, raw) {
            file.id = raw.toString('hex');
            let splitFileOriginalName = file.originalname.split(".");
            cb(err, err ? undefined : `${raw.toString('hex')}.${splitFileOriginalName[splitFileOriginalName.length-1]}`);
        })
    }
})

let _multer = multer({ storage: ds });
exports.uploadSingle = (fieldName) => _multer.single(fieldName)

exports.getImage = (req, res, next) => {
    fs.readFile(`${process.env.FILE_STORAGE_WRITE_PATH}/${req.params.fileName}`, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
        if(data) res.send(data)
    })
}

exports.deleteFile = (path) => {
    // console.log(path)
    fs.unlink(`${process.env.FILE_STORAGE_WRITE_PATH}/${path}`, (err) => {
        if(err) logger.error(err);
    })
}