var fs = require('fs');
const logger = require('../logger');

// local disk storage
var multer = require('multer');
var multerS3 = require('multer-s3')
var crypto = require('crypto');

var S3 = require('aws-sdk/clients/s3');
const { sendErrorResponse } = require('./common/util/http_util');

var fileNameFn = (req, file, cb) => {
    crypto.randomBytes(16, function (err, raw) {
        file.id = raw.toString('hex');
        let splitFileOriginalName = file.originalname.split(".");
        cb(err, err ? undefined : `${raw.toString('hex')}.${splitFileOriginalName[splitFileOriginalName.length-1]}`);
    })
};


// const ds = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, process.env.FILE_STORAGE_WRITE_PATH);
//     },
//     filename: fileNameFn
// })

var s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const bucketName = process.env.AWS_BUCKET_NAME
var awsDs = multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function(req, file, cb){
        cb(null, {
            fieldName: file.fieldname
        })
    }, 
    key: fileNameFn,
    
})

let _multer = multer({ storage: awsDs });
let uploadSingle = (fieldName) => _multer.single(fieldName)
let getImage = async (req, res, next) => {
    try {
        let rs = s3.getObject({
            Bucket: bucketName,
            Key: req.params.fileName,
        }, (err, data) => {
            if(err) logger.error(err);
            if(data) {
                res.send(data.Body)
            }
        })
        // if(rs && rs.readable){
        //     rs.pipe(res);
        // } else {
        //     res.json(rs);
        // }
    } catch (e) {
        sendErrorResponse(e, res)
    }
    // fs.readFile(`${process.env.FILE_STORAGE_WRITE_PATH}/${req.params.fileName}`, (err, data) => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }
    //     if(data) res.send(data)
    // })
};

let deleteFile = (fileName) => {
    // console.log(path)
    s3.deleteObject({
        Key: fileName,
        Bucket: bucketName
    }, (err, data) => {
        if(err) logger.error(err);
        if(data) logger.info(`deleted ${data}`)
    })
    // fs.unlink(`${process.env.FILE_STORAGE_WRITE_PATH}/${path}`, (err) => {
    //     if(err) logger.error(err);
    // })
}





// let uploadSingle = (fieldName) => {
//     return async (req, res, next) => {
//         let file = req.file;
//         logger.info(file);
//         const fileStream = fs.createReadStream(file.path)
//         const uploadParams = {
//             Bucket: bucketName,
//             Body: fileStream,
//             Key: file.fileName
//         }
//         let r = await s3.upload(uploadParams).promise();
//         logger.info(r);
//         next();
//     }
// }

// uploads a file to s3

// downloads a file from s3

exports.uploadSingle = uploadSingle;
exports.getImage = getImage
exports.deleteFile = deleteFile