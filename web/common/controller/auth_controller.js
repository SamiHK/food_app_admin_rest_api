const logger = require('../../../logger');
const { validationResult } = require('express-validator');
const authDao = require('../dao/auth_dao');
const userDao = require('../dao/user_dao');
const { sendErrorResponse, authenticationResponse, notFound, emailNotFound } = require('../util/http_util');
const { sendEmail } = require('../../email');
const { v4: uuidv4 } = require('uuid');
const { CustomError } = require('../../errors');


exports.login = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
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

exports.forgetPassword = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(result);
    } else {
        try {
            let user = await authDao.getAuthUser(req.body.username);
            if (user) {
                let token = uuidv4();
                await authDao.forgetPassword(user.id, token);
                sendEmail(`${process.env.APP_NAME} - Reset Password link`, user.email, `click this URL ${process.env.DOMAIN}/#/reset/password/${token} to reset your password.`);
                res.status(200).send();
            } else {
                emailNotFound(req.body.email, res);
            }
            // authenticationResponse(req.body.username, req.body.password, user, res);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.updatePassword = async (req, res) => {
    let userId = req.params.id;
    logger.info(`id: ${userId}`);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(result);
    } else {
        try {
            let user = await userDao.getUserById(userId);
            if (user) {
                let result = await authDao.updatePassword(userId, req.body.password);
                sendEmail(`${process.env.APP_NAME} - Password Updated`, user.email, 'Your account password has been updated.');
                if(result && result.length == 2)
                    res.status(200).json(result[1][0]);
                else 
                    sendErrorResponse(new CustomError(`Something gone wrong`), res);

            } else {
                sendErrorResponse(new CustomError(`User not found by id: ${userId}`), res);
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}


exports.resetPassword = async (req, res) => {
    let token = req.params.token;
    logger.info(`token: ${token}`);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(result);
    } else {
        try {
            let user = await userDao.getUserByResetPasswordToken(token);
            if (user) {
                await authDao.updatePassword(user.id, req.body.password);
                sendEmail(`${process.env.APP_NAME} - Password Updated`, user.email, 'Your account password has been updated');
                res.status(200).send();
            } else {
                notFound({
                    type: 'INVALID_OR_EXPIRED',
                    code: 'INVALID_OR_EXPIRED',
                    message: 'Reset password link either invalid or expired'
                }, res);
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.enabled = async (req, res) => {
    let id = req.params.id;
    let enabled = req.query.enabled == 'true';
    logger.info(`id: ${id}`);
    try {
        let user = await userDao.getUserById(id);
        if (user) {
            let response = await authDao.enabled(id, enabled);
            if(response && response.length == 2){
                if(enabled)
                    sendEmail(`${process.env.APP_NAME} - Account Activated`, user.email, 'Your account has been activated. Login now');
                else 
                    sendEmail(`${process.env.APP_NAME} - Account Deactivated`, user.email, 'Your account has been deactivated. contact Admin');
                res.status(200).send(response[1][0]);
            } else {
                sendErrorResponse(new CustomError('Something gone wrong while updating enable status of user'));
            }
        } else {
            notFound({
                type: 'INVALID_OR_EXPIRED',
                code: 'INVALID_OR_EXPIRED',
                message: 'Reset password link either invalid or expired'
            }, res);
        }
    } catch (e) {
        sendErrorResponse(e, res);
    }
}