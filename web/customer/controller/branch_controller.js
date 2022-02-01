const { sendErrorResponse } = require("../../common/util/http_util");
const { getBranches } = require("../dao/branch_dao");

exports.getBranches = async (req, res) => {
    try {
        let results = await getBranches();
        res.json(results);        
    } catch (e) {
        sendErrorResponse(e, res)
    }
}