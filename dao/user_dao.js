var { query, querySingleResult } = require('../db');



exports.getUsers = () =>  {
    let sql = "select u.id, u.username, u.email, u.last_login, u.enabled from user u";
    return query(sql);
}

exports.getUser = (usernameOrEmail) =>  {
    let params = [usernameOrEmail, usernameOrEmail];
    let sql = "select u.id, u.username, u.email, u.last_login, u.enabled from user u where u.email = ? or u.username = ? ";
    return querySingleResult(sql, params);
}
