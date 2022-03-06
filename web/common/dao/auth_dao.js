var { query, querySingleResult, mulitpleQuery } = require('../../db');
var bcrypt = require('bcryptjs');
var { v4: uuidv4 } = require('uuid');


/**
 * 
 * @param {string} username 
 * @returns {Object}
 */
exports.getAuthUser = async (username) => {
    let params = { username: username };
    let sql = `select BIN_TO_UUID(u.id) as id, u.username, u.email, u.password, u.enabled, 
    up.profile_picture as profilePicture, u.last_login as lastLogin, ur.role_id as role,
    (case 
        when concat_ws(' ', up.first_name, up.last_name) != '' then concat_ws(' ', up.first_name, up.last_name)
        when u.username is not null then u.username
        else u.email end ) as fullName,
    bin_to_uuid(rb.id) as branchId,
    rb.name as branchName,
    bl.address_line_1 as branchAddressLine1,
    bl.formatted_address as branchFormattedAddress,
    bl.city_id as branchCityId,
    ac.name as branchCityName,
    ast.id as branchStateId,
    ast.name as branchStateName,
    acnt.id as branchCountryId,
    acnt.name as branchCountryName,
    acnt.iso3 as branchCountryShortName
    from auth_user u
    join auth_user_role ur on ur.user_id = u.id
    left join auth_user_profile up on up.id = u.id
    left join res_branch_salesperson rbs on rbs.salesperson_id = u.id
    left join res_branch rb on rb.manager_id = u.id or rb.id = rbs.branch_id 
    left join res_branch_location bl on bl.id = rb.id
    left join addr_city ac on ac.id = bl.city_id
    left join addr_state ast on ast.id = ac.state_id
    left join addr_country acnt on acnt.id = ast.country_id
    where u.email = :username or u.username = :username `;
    let user = await querySingleResult(sql, params);
    return user;
}


/**
 * 
 * @param {uuid} id 
 * @returns { Object }
 */
exports.forgetPassword = (id, token) => {
    let params = [token, id];
    let sql = "update auth_user set reset_password_token = UUID_TO_BIN(?) where id = UUID_TO_BIN(?) ";
    return query(sql, params);
}
/**
 * 
 * @param {uuid} id 
 * @returns { Object }
 */
exports.updateLastLogin = (id) => {
    let params = [id];
    let sql = "update auth_user set last_login = now() where id = UUID_TO_BIN(?) ";
    return query(sql, params);
}


/**
 * 
 * @param { Object } user 
 * @returns { Object }
 */
exports.register = async (user, role) => {
    let password = await bcrypt.hashSync(user.password);
    user.id = uuidv4();
    let params = {
        id: user.id,
        username: user.username,
        email: user.email,
        password: password,
        role: role
    };
    let sql = `insert into auth_user(id, username, email, password) values (UUID_TO_BIN(:id), :username, :email, :password);
    insert into auth_user_role (user_id, role_id) values (UUID_TO_BIN(:id), :role);
    select au.email from auth_user au where au.id = UUID_TO_BIN(:id)`;
    return mulitpleQuery(sql, params);
}

/**
 * 
 * @param { UUID } id 
 * @returns { String } password
 */
exports.updatePassword = async (id, password) => {
    password = await bcrypt.hashSync(password);
    let params = {
        id: id,
        password: password
    };
    let sql = `update auth_user set password = :password, reset_password_token = null, last_password_update = now() where id = UUID_TO_BIN(:id);
    select u.last_password_update as lastPasswordUpdate from auth_user u where u.id = UUID_TO_BIN(:id) `;
    return query(sql, params);
}

exports.enabled = async (id, enabled) => {
    let params = {
        id: id,
        enabled: enabled ? 1 : 0
    };
    let sql = `update auth_user set enabled = :enabled where id = UUID_TO_BIN(:id);
    select u.enabled from auth_user u where u.id = UUID_TO_BIN(:id)`;
    return query(sql, params);
}


