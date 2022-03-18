const { sendErrorResponse } = require("../../common/util/http_util");
const { CustomError } = require("../../errors");
const { create, get, updateStatus, getById } = require("../dao/order_dao");


exports.create = async (req, res) => {
    // const result = validationResult(req);
    try {
        let user = res.locals.user
        let results = await create(user.id, user.branchId, req.body);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.get = async (req, res) => {
    // const result = validationResult(req);
    try {
        let user = res.locals.user
        let results = await get(user.id, user.branchId, req.params.status, 
            req.query.page ? parseInt(req.query.page): 1);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.updateStatus = async (req, res) => {
    // const result = validationResult(req);
    try {
        let user = res.locals.user
        let results = await updateStatus(user.id, req.body);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getDetail = async (req, res) => {
    // const result = validationResult(req);
    try {
        let results = await getById(req.params.id);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
