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
    if(e.code == 'ER_DUP_ENTRY'){
        res.status(409).json(e);
    } else {
        res.status(status).json(e);
    }
    logger.error(e);
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
                    branchId: user.branchId,
                    enabled: user.enabled,
                    lastLogin: user.lastLogin,
                    profilePicture: user.profilePicture,
                    token:  jwtUtil.generateJwtToken({
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        branchId: user.branchId
                    })
                };
                res.send(_user);
                updateLastLogin(user.id);    
            } else {
                this.sendErrorResponse({
                    type: 'ACC_DEACTIVATED',
                    code: 'ACC_DEACTIVATED',
                    error: 'Account Deactivated',
                    message: 'your account is deactivated. kindly contact with admin'}, res);
            }   
        } else {
            this.sendErrorResponse({
                code: 'INVALID_CREDIENTIIALS',
                name: 'Invalid password',
                message: 'password does not match'
            }, res);
        }    
    } else {
        this.sendErrorResponse({
            code: 'USER_NOT_FOUND',
            name: 'User not found',
            message: `user with email or username '${emailOrUsername}' not found`
        }, res);            
    }
}

exports.getAuthorizedUserFromJwtToken = async(req, res) => {
    let authorization_bearer_token = req.headers.authorization
    if(!authorization_bearer_token){
        res.status(401).send({
            code: 'UNAUHTORIZED_REQUEST',
            name: 'Unauthorized Request',
            message: 'Jwt Token is missing in request headers'
        })
    } else {
        let token = authorization_bearer_token.split(' ')[1];
        // console.log(token)
        try {
            let user = await jwtUtil.verifyJwtToken(token)
            if(user && user.id){
                return user
            } else {
                this.sendErrorResponse({
                    name: 'Invalid JsonWebToken Payload',
                    message: 'Jwt token is valid, but payload of user is corrupted. Either payload is empty or user id is null.'
                }, res, 401)
            }
        } catch (e) {
            this.sendErrorResponse(e, res, 401)
        }
    }

}

exports.authorizedJwtToken = async (req, res, next) => {
    let user = this.getAuthorizedUserFromJwtToken(req, res)
    if(user){
        next()
    }
}

exports.authorizedRoleJwtToken = async (req, res, next, ROLE) => {
    let user = await this.getAuthorizedUserFromJwtToken(req, res)
    if(user){
        if(user && user.role == ROLE){
            res.locals.user = user;
            next()
        } else {
            this.sendErrorResponse({
                code: 'UNAUTHORIZED ACCESS',
                name: `Unauthorized access for role ${user.role}`,
                message: `Required ${ROLE} role to access this operation`
            }, res)
        }
    }
}

exports.authorizedAdminJwtToken = async (req, res, next) => {
    this.authorizedRoleJwtToken(req, res, next, 'ADMIN')
}

exports.authorizedManagerJwtToken = async (req, res, next) => {
    this.authorizedRoleJwtToken(req, res, next, 'MANAGER')
}

exports.authorizedSalespersonJwtToken = async (req, res, next) => {
    this.authorizedRoleJwtToken(req, res, next, 'SALES_PERSON')
}