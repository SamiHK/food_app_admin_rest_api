const { query, mulitpleQuery } = require("../../db");
const { v4: uuidV4 } = require('uuid');

exports.search = async (q) => {
    let sql = `select BIN_TO_UUID(up.id) as id, up.first_name as firstName, up.last_name as lastName,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    up.cell_number as cellNumber
    from auth_user_profile up 
    where concat_ws(' ', up.first_name, up.last_name) like :q or up.cell_number like :q
    limit 5`
    let params = {
        q: `%${q}%`
    }
    return query(sql, params);
}

exports.register = async (c) => {
    let sql = `insert into auth_user_profile(id, first_name, last_name, cell_number) 
    values (UUID_TO_BIN(:id), :firstName, :lastName, :cellNumber);
    select BIN_TO_UUID(up.id) as id, up.first_name as firstName, up.last_name as lastName,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    up.cell_number as cellNumber
    from auth_user_profile up where up.id = UUID_TO_BIN(:id)`
    let params = {
        id: uuidV4(),
        firstName: c.firstName,
        lastName: c.lastName,
        cellNumber: c.cellNumber
    }
    return mulitpleQuery(sql, params);
}

