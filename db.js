const mysql = require('mysql2/promise');

const dataSource = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'app_db'
};

const query = async (sql, params) => {
    var con = await mysql.createConnection(dataSource).catch(e => {
        if(e) throw e;
    });
    console.log(con);
    return con.query(sql, params);
};

const querySingleResult = async (sql, params) => {
    var result = await this.query(sql, params);
    console.log(`result: ${result}`);
    return result[0][0];
}

module.exports.query = query;
module.exports.querySingleResult = querySingleResult;