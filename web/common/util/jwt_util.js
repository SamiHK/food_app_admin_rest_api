const _jwt = require('jsonwebtoken');

exports.generateJwtToken = (payload, privateKey = process.env.secret_key) => {
    return _jwt.sign(payload, privateKey, {
        expiresIn: '1d'
    });
} 

exports.verifyJwtToken = async (token, privateKey = process.env.secret_key) => {
    return await _jwt.verify(token, privateKey);
}
