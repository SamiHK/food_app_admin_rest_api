var { query } = require('../../db')

exports.saveUnit = async (unit) => {
    let sql = `insert into res_menu_item_unit(id, title) values(:id, :title) on duplicate key update title = :title;
    select * from res_menu_item_unit where id = :id`;
    let params = {
        id: unit.id, title: unit.title
    };
    return query(sql, params);
}

exports.getUnits = async (unit) => {
    let sql = `select * from  res_menu_item_unit order by title`;
    return query(sql);
}


exports.deleteUnit = async (id) => {
    let sql = `delete from res_menu_item_unit where id = :id`;
    let params = {
        id: id
    };
    return query(sql, params);
}