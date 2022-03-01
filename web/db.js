var logger = require('../logger');
const mysql = require('mysql2/promise');

const dataSource = {
    host: process.env.PRI_DB_HOST,
    port: process.env.PRI_DB_PORT,
    database: process.env.PRI_DB_NAME,
    user: process.env.PRI_DB_USER,
    password: process.env.PRI_DB_PASSWORD,
    namedPlaceholders: true,
    multipleStatements: true
};

var connection;

async function getConnection(){
    // console.log(`db_connection`, connection);
    if(!connection){
        connection = await (mysql.createPool(dataSource)).getConnection().catch(e => {
            console.error(e);
            throw e;
        });
        // connection.config.namedPlaceholders = true;
        // connection.config.nestTables = true;
        // logger.info(`new db_connection: ${connection}`);
    }
    return connection;
}

exports.query = async (sql, params) => {
    return (await this.mulitpleQuery(sql, params))[0]; // to get only query result
};

exports.mulitpleQuery = async (sql, params) => {
    let con = await getConnection();
    let result = con.query(sql, params);
    con.release();
    return result; // return all result of queries
};


exports.querySingleResult = async (sql, params) => {
    var result = await this.query(sql, params);
    if(result && result.length > 1) {
        logger.error(`size: ${result.length}, result: ${result}`)
        throw Error('more than 1 records found');
    }
    return result[0]; // return first row in query result
}