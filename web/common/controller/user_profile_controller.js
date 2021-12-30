var { validationResult } = require('express-validator');
const { getUserById } = require('../dao/user_dao');
const { updateUserProfile } = require('../dao/user_profile_dao');
const { sendErrorResponse } = require('../util/http_util');

exports.updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    // logger.info(`id: ${userId}`);
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let user = await getUserById(userId);
            if(user){
                let userProfile = req.body;
                userProfile.id = userId;
                let result = await updateUserProfile(userProfile);
                if(result && result.length == 2)
                    res.status(200).send(result[1][0]);
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