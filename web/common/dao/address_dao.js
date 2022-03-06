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
    let params = {
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

exports.saveUserAddress = async(customerId, address) => {
    let params = {
        customerId: customerId,
        addressLine1: address.addressLine1,
        cityName: address.cityName,
        stateName: address.stateName,
        countryName: address.countryName,
        cityId: address.cityId
    }

    let sql = `insert into auth_user_location(customer_id, address_line_1, formatted_address, city_id)
    values (UUID_TO_BIN(:customerId), :addressLine1, concat_ws(', ', :addressLine1, :cityName, :stateName, :countryName), :cityId);
    select ul.id, BIN_TO_UUID(ul.customer_id) as customerId, ul.address_line_1 as addressLine1, ul.city_id as city,
    ul.formatted_address as formattedAddress
    from auth_user_location ul where ul.customer_id = UUID_TO_BIN(:customerId)`;
    return mulitpleQuery(sql, params)
}

exports.getUserAddresses = async(customerId) => {
    let params = {
        customerId: customerId
    }

    let sql = `select ul.id, BIN_TO_UUID(ul.customer_id) as customerId, ul.address_line_1 as addressLine1, ul.city_id as city,
    ul.formatted_address as formattedAddress
    from auth_user_location ul where ul.customer_id = UUID_TO_BIN(:customerId)`;
    return query(sql, params)
}

