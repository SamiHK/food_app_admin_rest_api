const { query, querySingleResult } = require("../../db");

exports.getBranches = async () => {
    let sql = `select bin_to_uuid(b.id) as id, 
        b.name, b.code,
        ac.id as cityId, ac.name as cityName,
        ast.id as stateId, ast.name as stateName,
        acnt.id as countryId, acnt.name as countryName 
        from res_branch b
        left join res_branch_location bl on bl.id = b.id
        left join addr_city ac on ac.id = bl.city_id
        left join addr_state ast on ast.id = ac.state_id
        left join addr_country acnt on acnt.id = ast.country_id 
        where b.active `;
    return query(sql);
}
