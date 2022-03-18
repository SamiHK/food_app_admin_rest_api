const { sendErrorResponse } = require("../../common/util/http_util");
const { create, get, getById, cancelOrder } = require("../dao/order_dao");


exports.create = async (req, res) => {
    // const result = validationResult(req);
    try {
        let user = res.locals.user
        let results = await create(user.id, req.body.branchId, req.body);
        if (results && results.insertId > 0) {
            results = await getById(results.insertId)
        }
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

exports.get = async (req, res) => {
    // const result = validationResult(req);
    try {
        let user = res.locals.user
        let results = await get(user.id, req.params.status);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.cancelOrder = async (req, res) => {
    // const result = validationResult(req);
    try {
        let results = await cancelOrder(req.params.id);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
