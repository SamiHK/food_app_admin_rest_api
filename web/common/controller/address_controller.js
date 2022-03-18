const logger = require('../../../logger');
const { CustomError } = require('../../errors');
const { getCountries, getStates, getCities, getUserAddresses, saveUserAddress } = require('../dao/address_dao');
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

exports.saveCustomerAddress = async (req, res) => {
    try {
        let result = await saveUserAddress(req.params.customerId, req.body);
        if (result && result.length > 1)
            res.json(result[0][1])
        else
            sendErrorResponse(new CustomError('Something gone wrong'), res)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.saveUserAddress = async (req, res) => {
    try {
        let result = await saveUserAddress(res.locals.user.id, req.body);
        if (result && result.length > 1)
            res.json(result[0][1])
        else
            sendErrorResponse(new CustomError('Something gone wrong'), res)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getUserAddresses = async (req, res) => {
    try {
        let result = await getUserAddresses(res.locals.user.id);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getCustomerAddress = async (req, res) => {
    try {
        let result = await getUserAddresses(req.params.customerId);
        res.json(result)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

