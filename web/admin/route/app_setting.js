var express = require('express');
const { uploadSingle } = require('../../file_storage');
var router = express.Router();
const { saveBanner, lightLogo, darkLogo, deleteBanner, getBanner } = require('../controller/app_setting_controller');


// router.get('/banner', saveBanner);
router.get('/banner', getBanner);
router.post('/banner', uploadSingle('banner'), saveBanner);
router.delete('/banner', deleteBanner);
router.post('/lightLogo', uploadSingle('lightLogo'), lightLogo);
router.post('/darkLogo', uploadSingle('darkLogo'), darkLogo);

module.exports = router;
