const { sendErrorResponse } = require("../../common/util/http_util");
const { search } = require("../dao/order_dao");

exports.search = async (req, res) => {
    // const result = validationResult(req);
    try {
        let user = res.locals.user
        let results = await search(user.branchId, req.query, 
            req.query.page ? parseInt(req.query.page): 1);
        res.json(results);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
