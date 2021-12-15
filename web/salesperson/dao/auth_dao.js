var { query, querySingleResult } = require('../db');
var bcrypt = require('bcryptjs');
var { v4: uuidv4} = require('uuid');
var binnaryUUID = require('binary-uuid');


/**
 * 
 * @param {string} username 
 * @returns {Object}
 */
exports.getAuthUser = async (username) => {
    let params = [username, username];
    let sql = "select u.id, u.username, u.email, u.password, u.profile_picture, u.enabled,"+
    " u.last_login "+
    " from user u"+
    " where u.email = ? or u.username = ? ";
    let user = await querySingleResult(sql, params);
    if(user){
        user.id = binnaryUUID.fromBinaryUUID(user.id);
    }
    return user;
}


/**
 * 
 * @param {uuid} id 
 * @returns { Object }
 */
exports.updateLastLogin = (id) => {
    let params = [binnaryUUID.toBinaryUUID(id)];
    let sql = "update user set last_login = now() where id = ? ";
    return query(sql, params);
}


/**
 * 
 * @param { Object } user 
 * @returns { Object }
 */
exports.register = async (user) =>  {
    let password = await bcrypt.hashSync(user.password);
    user.id = uuidv4();
    let params = {id: binnaryUUID.toBinaryUUID(user.id),
        username: user.username,
        email: user.email,
        password: password};
    let sql = "insert into user(id, username, email, password) values (:id, :username, :email, :password)";
    return query(sql, params);
}


