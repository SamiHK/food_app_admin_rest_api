const { validationResult } = require('express-validator');
const { sendEmail } = require('../../email');
const { sendErrorResponse } = require('../util/http_util');
const logger = require('../../../logger');
const { updateEmail, getUserById, getUsers, getUser } = require('../dao/user_dao');


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
                let response = await updateEmail(userId, req.body.email);
                sendEmail('Email Updated', user.email, 'Your email has been updated. Kindly contact Admin');
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