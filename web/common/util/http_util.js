const logger = require('../../../logger');
const bcrypt = require('bcryptjs');
const jwtUtil = require('./jwt_util');
const { updateLastLogin } = require('../dao/auth_dao')

module.exports.notFound = (e, res) => {
    let errorMessage = {
        error: {
            name: e.name,
            type: e.type,
            code: e.code,
            message: e.message
        }
    };
    logger.error(e);
    res.status(200).json(errorMessage);
}

module.exports.emailNotFound = (email, res) => {
    let errorMessage = {
        type: 'INVALID_INPUT',
        code: 'EMAIL_NOT_REGISTERED',
        message: `This email '${email}' is not registered.`
    };
    // logger.error(e);
    // res.status(200).send(errorMessage);
    this.notFound(errorMessage, res);
}

module.exports.sendErrorResponse = (e, res, status=500) => {
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
    res.status(status).send(errorMessage);
}

module.exports.authenticationResponse = (emailOrUsername, password, user, res) => {
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            if(user && user.enabled){
                let _user = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    fullName: user.fullName,
                    role: user.role,
                    enabled: user.enabled,
                    lastLogin: user.lastLogin,
                    profilePicture: user.profilePicture,
                    token:  jwtUtil.generateJwtToken({
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role
                    })
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

getAuthorizedUserFromJwtToken = async(req, res) => {
    let authorization_bearer_token = req.headers.authorization
    if(!authorization_bearer_token){
        res.status(401).send()
    } else {
        let token = authorization_bearer_token.split(' ')[1];
        // console.log(token)
        try {
            let user = await jwtUtil.verifyJwtToken(token)
            if(user && user.id){
                return user
            } else {
                this.sendErrorResponse({
                    code: 'INVALID USER TOKEN',
                    name: 'INVALID USER TOKEN',
                    message: 'JWT TOKEN IS VALID, BUT USER IS CORRUPTED, EITHER USER IS EMPTY OR ID IS NULL'
                }, res, 401)
            }
        } catch (e) {
            this.sendErrorResponse(e, res, 401)
        }
    }

}

exports.authorizedJwtToken = async (req, res, next) => {
    let user = getAuthorizedUserFromJwtToken(req, res)
    if(user){
        next()
    }
}

exports.authorizedRoleJwtToken = async (req, res, next, ROLE) => {
    let user = await getAuthorizedUserFromJwtToken(req, res)
    if(user && user.role == ROLE){
        next()
    } else {
        this.sendErrorResponse({
            code: 'UNAUTHORIZED ACCESS',
            message: `REQUIRED ${ROLE} ROLE TO ACCESS THIS OPERATION`
        }, res)
    }
}

exports.authorizedAdminJwtToken = async (req, res, next) => {
    this.authorizedRoleJwtToken(req, res, next, 'ADMIN')
}

exports.authorizedManagerJwtToken = async (req, res, next) => {
    this.authorizedRoleJwtToken(req, res, next, 'MANAGER')
}

exports.authorizedSalespersonJwtToken = async (req, res, next) => {
    this.authorizedRoleJwtToken(req, res, next, 'SALESPERSON')
}