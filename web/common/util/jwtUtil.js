const _jwt = require('jsonwebtoken')



exports.generateToken = (payload, password) => {
    return _jwt.sign(payload, password);
} 

exports.verify = async (token, password) => {
    return await _jwt.verify(token, password);
} 