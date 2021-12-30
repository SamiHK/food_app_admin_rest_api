const { validationResult } = require('express-validator');
const authDao = require('../dao/auth_dao');
const { sendErrorResponse, authenticationResponse } = require('../util/common_http');

exports.login = async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let user = await authDao.getAuthUser(req.body.username);
            authenticationResponse(req.body.username, req.body.password, user, res);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}
