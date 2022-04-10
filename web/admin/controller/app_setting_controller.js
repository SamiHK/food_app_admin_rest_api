const { sendErrorResponse } = require("../../common/util/http_util");
const { saveBanner, lightLogo, darkLogo, deleteBanner, getBanner } = require("../dao/app_setting_dao");


exports.getBanner = async (req, res) => {
    try {
        let result = await getBanner();
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.saveBanner = async (req, res) => {
    try {
        let result = await saveBanner(req.file);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.deleteBanner = async (req, res) => {
    try {
        let result = await deleteBanner(req.params.name);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.lightLogo = async (req, res) => {
    try {
        let file = req.file;
        file.path = `${process.env.FILE_STORAGE_READ_PATH}/${file.filename}`
        let result = await lightLogo(file);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.darkLogo = async (req, res) => {
    try {
        let file = req.file;
        file.path = `${process.env.FILE_STORAGE_READ_PATH}/${file.filename}`
        let result = await darkLogo(file);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
