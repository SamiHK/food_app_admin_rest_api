const { validationResult } = require('express-validator');
const { sendEmail } = require('../../email');
const { sendErrorResponse } = require('../util/http_util');
const logger = require('../../../logger');
const { updateEmail, getUserById, getUsers, getUser, getUserByEmailVerifyToken, emailVerified } = require('../dao/user_dao');
const {v4: uuidv4} = require('uuid');


exports.updateEmail = async (req, res) => {
    const userId = req.params.id;
    logger.info(`id: ${userId}`);
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let user = await getUserById(userId);
            if(user){
                let newEmail = req.body.email;
                let emailVerifyToken = uuidv4();
                let response = await updateEmail(userId, newEmail, emailVerifyToken);
                sendEmail(`${process.env.APP_NAME} - Email Changed`, user.email, 
                    `Your email has been updated to ${newEmail}. Kindly contact Admin`);
                sendEmail(`${process.env.APP_NAME} - Verify your email`, newEmail, 
                    `Verify your email by visiting the following URL ${process.env.DOMAIN}/#/verifyEmail/${emailVerifyToken}.`);
                if(response && response.length == 2)
                    res.status(200).send(response[1][0]);
                else 
                    sendErrorResponse(TypeError(`Something gone wrong`), res);

            } else {
                sendErrorResponse(TypeError(`User not found by id: ${userId}`), res);

            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.verifyEmail = async (req, res) => {
    const token = req.params.token;
    logger.info(`emailVerifyToken: ${token}`);
    try {
        let user = await getUserByEmailVerifyToken(token);
        if(user){
            let response = await emailVerified(user.id, token);
            sendEmail(`${process.env.APP_NAME} - Email Verified`, user.email, 
                `Your email has been Verified`);
            if(response && response.length == 2)
                res.status(200).send(response[1][0]);
            else 
                sendErrorResponse(TypeError(`Something gone wrong`), res);

        } else {
            sendErrorResponse(TypeError(`Invalid Token: ${token}`), res);
        }
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users)
    } catch (err) {
        res.send({
            error: err
        })        
    }
}

exports.getUser = async (req, res) => {
    try {
        usernameOrEmail = req.params.usernameOrEmail;
        console.log(`username: ${usernameOrEmail}`);
        const user = await getUser(usernameOrEmail);
        res.send(user);        
    } catch (err) {
        res.send({
            error: err
        })
    }
}