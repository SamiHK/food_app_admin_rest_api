var { query, querySingleResult } = require('../db');
var bcrypt = require('bcryptjs');
var uuidUtil = require('../util/uuidUtil')
var { v4: uuidv4, parse, stringify} = require('uuid');


/**
 * 
 * @param {string} username 
 * @returns {Object}
 */

exports.getAuthUser = async (username) =>  {
    let params = [username, username];
    let sql = "select * from user u where u.email = ? or u.username = ? ";
    let user = await querySingleResult(sql, params);
    if(user){
        console.log(`user.id: ${user.id}`);
        user.id = stringify(user.id);
        console.log(`user.id: ${user.id}`);
    }
    return user;
}

exports.updateLastLogin = (id) => {
    let params = [id];
    let sql = "update user set last_login = now() where id = unhex(replace(?, '-', '')) ";
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
    console.log(`user.id: ${user.id}`);
    let params = [user.id, user.username, user.email, password];
    let sql = "insert into user(id, username, email, password) values (unhex(replace(?, '-', '')), ?, ?, ?)";
    return query(sql, params);
}


