var { query, querySingleResult, mulitpleQuery } = require('../../db');


/**
 * 
 * @param {string} username 
 * @returns {Object}
 */
exports.getCountries = async () => {
    let sql = `select ac.iso3 as shortName, ac.name as name from addr_country ac `;
    return query(sql);
}

exports.getStates = async (countryShortName) => {
    params = {
        'countryShortName': countryShortName
    }
    let sql = `select s.id, s.name from addr_state s
    inner join addr_country ac on ac.id = s.country_id and ac.iso3 = :countryShortName`;
    return query(sql, params);
}

exports.getCities = async (stateId, q) => {
    params = {
        'stateId': stateId
    }
    let sql = `select * from addr_city c
    where c.state_id = :stateId`;
    if(q){
        params.q = `%q%`
        sql = `${sql} where c.name like :q`
    }
    return query(sql, params);
}


