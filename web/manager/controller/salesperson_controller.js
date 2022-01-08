const { sendErrorResponse, getAuthorizedUserFromJwtToken } = require("../../common/util/http_util");
const { filter, available, register, get } = require("../dao/salesperson_dao")


exports.register = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let salesperson = req.body;
            salesperson = await register(salesperson);
            res.json(salesperson);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.get = async (req, res) => {
    try {
        let id = req.params.id;
        let salesperson = await get(id);
        res.json(salesperson);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.filter = async (req, res) => {
    // const result = validationResult(req);
    try {
        let options = {
            pageNumber: parseInt(req.query.number),
            pageSize: parseInt(req.query.size),
            search: req.query.search,
            branchId: getAuthorizedUserFromJwtToken(req, res).branchId
        };
        let salesperson = await filter(options);
        res.json(salesperson);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.available = async (req, res) => {
    // const result = validationResult(req);
    try {
        let options = {
            pageNumber: parseInt(req.query.number),
            pageSize: parseInt(req.query.size),
            search: req.query.search,
            // branchId: getAuthorizedUserFromJwtToken(req, res).branchId
        };
        let salesperson = await available(options);
        res.json(salesperson);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
