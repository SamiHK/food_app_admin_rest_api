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


exports.lightLogo = async (file) => {
    let sql = `update app_setting set prop_value = :value where prop_key = 'LOGO_LIGHT'`;
    let params = {
        value : file.path
    }
    return query(sql, params)
}

exports.darkLogo = async (file) => {
    let sql = `update app_setting set prop_value = :value where prop_key = 'LOGO_DARK'`;
    let params = {
        value : file.path
    }
    return query(sql, params)
}

exports.saveBanner = async (file) => {
    let sql = `insert into app_web_banner (id, name, mime_type, path) values (unhex(:id), :name, :mime_type, :path)`;
    let params = {
        id: file.id,
        name: file.filename,
        mime_type: file.mimetype,
        path: file.path
    }
    return query(sql, params)
}

exports.deleteBanner = async (name) => {
    let sql = `delete from app_web_banner where name = :name`;
    let params = {
        name: name,
    }
    return query(sql, params)
}

exports.getBanner = async () => {
    let sql = `select * from app_web_banner b`;
    return query(sql)
}




