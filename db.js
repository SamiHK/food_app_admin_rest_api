const mysql = require('mysql2/promise');

const dataSource = {
    host: process.env.PRI_DB_HOST,
    port: process.env.PRI_DB_PORT,
    database: process.env.PRI_DB_NAME,
    user: process.env.PRI_DB_USER,
    password: process.env.PRI_DB_PASSWORD,
    namedPlaceholders: true
};

var connection;

async function getConnection(){
    if(!!connection){
        connection = await (mysql.createPool(dataSource)).getConnection().catch(e => {
            console.error(e);
            throw e;
        });
        connection.config.namedPlaceholders = true;
        connection.config.nestTables = true;
    }
    return connection;
}

module.exports.callQuery = async (sql, params) => {
    let dbCon = await getConnection();
    let result = dbCon.query(sql, params);
    return result[0]; // return only result data/rows, 
};


module.exports.querySingleResult = async (sql, params) => {
    var result = await this.callQuery(sql, params);
    if(result && result.length > 1) {
        console.log(`size: ${result.length}, result: ${result}`)
        throw Error('more than 1 records found');
    }
    return result[0]; // return first result
}