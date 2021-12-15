const bcrypt = require('bcryptjs');
const jwtUtil = require('../util/jwtUtil')
const { updateLastLogin } = require('../dao/auth_dao')

module.exports.sendErrorResponse = (e, res) => {
    console.error(e);
    res.send({
        error: e
    })
}

module.exports.authenticationResponse = (emailOrUsername, password, user, res) => {
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            let _user = {
                id: user.id,
                email: user.email,
                username: user.username,
                profile_picture: user.profile_picture,
                enabled: user.enabled,
                last_login: user.last_login,
                token:  jwtUtil.generateToken({
                    email: user.email
                }, process.env.secret_key)
            };
            res.send(_user);
            updateLastLogin(user.id);
        } else {
            res.send({
                error: 'INVALID CREDIENTIALS',
                message: 'password does not match.'
            })
        }
    } else {
        res.send({
            message: `user with email or username '${emailOrUsername}' not found`
        });            
    }
}