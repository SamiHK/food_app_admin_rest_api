var { query, querySingleResult } = require('../db');



exports.login = async (username) =>  {
    let params = [username, username];
    let sql = "select * from user u where u.email = ? or u.username = ? ";
    return querySingleResult(sql, params);
}
