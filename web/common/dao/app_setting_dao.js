var { query, querySingleResult } = require('../../db');

/**
 * 
 * @param { UUID } id 
 * @returns { String } email
 */
exports.get = async () => {
    let sql = `select pas.id as settingId, pas.title as settingTitle, pas.prop_key as settingKey, 
    as2.id as id, as2.title as title, as2.prop_key as propKey, as2.prop_value as propVal
    from app_setting as2 
    left join app_setting pas on pas.id = as2.setting_id 
    where as2.setting_id is not null`;
    let appsetting = {}
    let results = await query(sql);
    return results;
}





