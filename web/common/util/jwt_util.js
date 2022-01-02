const _jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('./http_util');



exports.generateJwtToken = (payload, privateKey = process.env.secret_key) => {
    return _jwt.sign(payload, privateKey);
} 

exports.verifyJwtToken = async (token, privateKey = process.env.secret_key) => {
    return await _jwt.verify(token, privateKey);
}
