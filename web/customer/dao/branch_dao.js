const { query, querySingleResult } = require("../../db");

exports.getBranches = async () => {
    let sql = `select bin_to_uuid(b.id) as id, b.name, b.code from res_branch b where b.active `;
    return query(sql);
}
