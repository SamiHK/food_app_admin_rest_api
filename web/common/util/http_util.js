const logger = require('../../../logger');
const bcrypt = require('bcryptjs');
const jwtUtil = require('./jwt_util');
const { updateLastLogin } = require('../dao/auth_dao')

module.exports.notFound = (e, res) => {
    let errorMessage = {
        error: {
            type: e.name,
            code: e.code,
            message: e.message
        }
    };
    logger.error(e);
    res.status(200).send(errorMessage);
}

module.exports.emailNotFound = (email, res) => {
    let errorMessage = {
        error: {
            type: 'INVALID_INPUT',
            code: 'EMAIL_NOT_REGISTERED',
            message: `This email '${email}' is not registered.`
        }
    };
    // logger.error(e);
    // res.status(200).send(errorMessage);
    this.notFound(errorMessage, res);
}

module.exports.sendErrorResponse = (e, res) => {
    let errorMessage = {
        error: {
            type: e.name,
            code: e.code,
            message: e.message,
            // stack: e.stack,
            sql: e.sql,
            sqlMessage: e.sqlMessage
        }
    };
    logger.error(e);
    res.status(500).send(errorMessage);
}

module.exports.authenticationResponse = (emailOrUsername, password, user, res) => {
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            if(user && user.enabled){
                let _user = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    enabled: user.enabled,
                    lastLogin: user.lastLogin,
                    profilePicture: user.profilePicture,
                    token:  jwtUtil.generateToken({
                        email: user.email
                    }, process.env.secret_key)
                };
                res.send(_user);
                updateLastLogin(user.id);    
            } else {
                sendErrorResponse({
                    type: 'ACC_DEACTIVATED',
                    code: 'ACC_DEACTIVATED',
                    error: 'Account Deactivated',
                    message: 'your account is deactivated. kindly contact with admin'}, res);
            }   
        } else {
            res.send({
                error: 'INVALID CREDIENTIALS',
                message: 'password does not match.'
            });
        }    
    } else {
        res.send({
            error: 'USER NOT FOUND',
            message: `user with email or username '${emailOrUsername}' not found`
        });            
    }
}