var { query, querySingleResult } = require('../../db');

/**
 * 
 * @param { UUID } id 
 * @returns { String } email
 */
 exports.updateEmail = async (id, email) => {
    let params = {
        id: id,
        email: email
    };
    let sql = `update auth_user set email = :email, is_email_verified = false where id = UUID_TO_BIN(:id);
    select u.email from auth_user u where u.email = :email and id = UUID_TO_BIN(:id)`;
    return query(sql, params);
}

exports.getUsers = () => {
    let sql = "select u.id, u.username, u.email, u.is_email_verified, u.last_login, u.enabled from auth_user u";
    return query(sql);
}

// exports.getUsersByRole = async (role, pageNumber = 0, pageSize = 20, orderByProp='created_on', order='desc') => {
//     let params = {
//         role: role
//     }
//     let sql = `select count(u.id) as total
//     from auth_user u 
//     join auth_user_role ur on ur.user_id = u.id and ur.role_id = :role`;
//     let page = await querySingleResult(sql, params);
//     page.number = pageNumber;
//     page.pageSize = pageSize;
    
//     params = {
//         role: role,
//         offset: pageNumber > 1 ? pageNumber - 1: pageNumber,
//         length: pageSize,
//         column: orderByProp,
//         order: order
//     }
//     sql = `select BIN_TO_UUID(u.id) as id, u.username, u.email, u.is_email_verified as isEmailVerified, 
//     u.last_login as lastLogin, u.enabled, u.profile_picture as profilePicture, ur.role_id as role,
//     ea.created_on as createdOn,
//     ea.updated_on as updatedOn
//     from auth_user u 
//     join auth_user_role ur on ur.user_id = u.id and ur.role_id = :role 
//     left join entity_audit ea on ea.entity_id = u.id
//     order by :column :order 
//     limit :offset, :length `;
//     page.items = await query(sql, params);
//     return page;
// }


exports.getUser = async (usernameOrEmail) => {
    let params = { username: usernameOrEmail };
    let sql = `select BIN_TO_UUID(u.id), u.username, u.email, u.is_email_verified, u.last_login, u.enabled, ur.role_id
    from auth_user u
    left join auth_user_role ur on ur.user_id = u.id
    where u.email = :username or u.username = :username `;
    let user = await querySingleResult(sql, params);
    return user;
}

exports.getUserById = async (id) => {
    let params = [id];
    let sql = `select BIN_TO_UUID(u.id), u.username, u.email, u.is_email_verified, u.last_login, u.enabled, ur.role_id
    from auth_user u
    left join auth_user_role ur on ur.user_id = u.id
    where u.id = UUID_TO_BIN(?) `;
    let user = await querySingleResult(sql, params);
    return user;
}

exports.getUserByResetPasswordToken = async (id) => {
    let params = [id];
    let sql = `select BIN_TO_UUID(u.id) as id, u.username, u.email, u.is_email_verified, u.last_login, u.enabled, ur.role_id
    from auth_user u
    left join auth_user_role ur on ur.user_id = u.id
    where u.reset_password_token = ?`;
    let user = await querySingleResult(sql, params);
    return user;
}
