var { validationResult } = require('express-validator');
var authDao = require('../dao/auth_dao')

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
            const user = await authDao.login(req.body.username);
            if(user){
                res.send(user);
            } else {
                res.send({
                    message: `user with email '${req.body.username}' not found`
                });            
            }
        } catch (err) {
            res.send({error: err})
        }
    }
}

exports.register = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        res.send(authDao.login(req.body.email));
    }
}

exports.forgetPassword = (req, res, next) => {
    res.send(req.body);
}

exports.resetPassword = (req, res, next) => {
    res.send(req.body);
}