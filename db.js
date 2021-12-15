const mysql = require('mysql2/promise');

const dataSource = {
    host: process.env.PRI_DB_HOST,
    port: process.env.PRI_DB_PORT,
    database: process.env.PRI_DB_NAME,
    user: process.env.PRI_DB_USER,
    password: process.env.PRI_DB_PASSWORD,
    namedPlaceholders: true
};

function getConnection() {
    return mysql.createConnection(dataSource).catch(e => {
        if(e) throw e;
    })
}

module.exports.query = async (sql, params) => {
    let con = await getConnection();
    // console.log(con);
    let result = await con.query(sql, params);
    return result[0];
};


module.exports.querySingleResult = async (sql, params) => {
    var result = await this.query(sql, params);
    // console.log(`result: ${result}`);
    return result[0];
}