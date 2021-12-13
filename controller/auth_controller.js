const { validationResult } = require('express-validator');
const authDao = require('../dao/auth_dao');
const { sendErrorResponse, authenticationResponse } = require('../util/common_http');

_username = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'Username or email is required',
    }
}

_email = {
    in : ['body'],
    isEmail: {
        errorMessage: 'Invalid email ',
    }
}

_password = {
    in : ['body'],
    errorMessage: 'Password is required',
    notEmpty: {}
}

_confirm_password = {
    in : ['body'],
    notEmpty: {
        errorMessage : 'Confirm password is required'
    },
    custom: {
        options: (value, {req}) => {
            if( value != undefined && value != null && value != '' && value !== req.body.password ){
                throw new Error('Password confirmation is incorrect');
            } 
            return true;
        }
    }
}

exports.userLoginSchema = {
    username: _username,
    password: _password
}

exports.userRegisterSchema = {
    email: _email,
    password: _password,
    confirm_password: _confirm_password,
}


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

exports.register = async (req, res, next) => {
    let result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let dbResult = await authDao.register(req.body);
            let user = await authDao.getAuthUser(req.body.email);
            authenticationResponse(req.body.email, req.body.password, user, res);     
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