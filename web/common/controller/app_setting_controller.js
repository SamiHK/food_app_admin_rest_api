const { validationResult } = require('express-validator');
const { sendEmail } = require('../../email');
const { sendErrorResponse } = require('../util/http_util');
const logger = require('../../../logger');
const { get } = require('../dao/app_setting_dao');


exports.get = async (req, res) => {
    try {
        let results = await get();
        res.json(results)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
