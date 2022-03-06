const { sendErrorResponse } = require("../../common/util/http_util");
const { CustomError } = require("../../errors");
const { create, get } = require("../dao/order_dao");


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
        let results = await get(user.id, user.branchId, req.params.status);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
