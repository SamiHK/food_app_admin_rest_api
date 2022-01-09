const { validationResult } = require("express-validator");
const { sendErrorResponse, } = require("../../common/util/http_util");
const { filter, available, register, get } = require("../dao/salesperson_dao")


exports.register = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            // console.log(res.locals.user)
            let salesperson = req.body;
            salesperson.branchId = res.locals.user.branchId
            let result = await register(salesperson);
            if(result && result.length == 4){
                res.json(result[3][0]);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res)
            }
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
        let auth_user = res.locals.user
        let options = {
            pageNumber: parseInt(req.query.number),
            pageSize: parseInt(req.query.size),
            search: req.query.search,
            branchId: auth_user.branchId
        };
        if(!options.pageNumber) options.pageNumber = 0;
        if(!options.pageSize) options.pageSize = parseInt(process.env.DEFAULT_PAGE_SIZE);
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
