const { sendErrorResponse } = require("../../common/util/http_util");
const { CustomError } = require("../../errors");
const { search, register } = require("../dao/customer_dao");

exports.search = async (req, res) => {
    // const result = validationResult(req);
    try {
        let customers = await search(req.query.q);
        res.json(customers);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.register = async (req, res) => {
    // const result = validationResult(req);
    try {
        let results = await register(req.body);
        if(results && results.length > 1)
            res.json(results[0][1][0]);
        else 
            sendErrorResponse(new CustomError('Something gone wrong'), res)
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
