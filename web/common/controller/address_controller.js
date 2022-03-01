const logger = require('../../../logger');
const { CustomError } = require('../../errors');
const { getCountries, getStates, getCities } = require('../dao/address_dao');
const { sendErrorResponse } = require('../util/http_util');


exports.getCountries = async (req, res) => {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     return res.status(400).send(result);
    // } else {
        try {
            let result = await getCountries();
            res.json(result)
        } catch (e) {
            sendErrorResponse(e, res);
        }
    // }
}

exports.getStates = async (req, res) => {
    try {
        let result = await getStates(req.query.countryShortName);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getCities = async (req, res) => {
    try {
        let result = await getCities(req.query.stateId, req.query.q);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

