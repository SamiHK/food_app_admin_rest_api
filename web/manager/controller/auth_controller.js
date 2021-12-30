const { hash } = require('bcryptjs');
const { validationResult } = require('express-validator');
const authDao = require('../../common/dao/auth_dao');
const { sendErrorResponse, authenticationResponse } = require('../../common/util/http_util');
const ROLE = 'MANAGER';


exports.login = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let user = await authDao.getAuthUser(req.body.username, ROLE);
            authenticationResponse(req.body.username, req.body.password, user, res);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.forgetPassword = (req, res, next) => {
    res.send(req.body);
}

exports.resetPassword = (req, res, next) => {
    res.send(req.body);
}