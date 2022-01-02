const { hashSync } = require("bcryptjs");
const { v4 } = require("uuid");
const { query } = require("../../db");

const selectSalespersonById = `select BIN_TO_UUID(u.id) as id, 
u.username, u.email, u.is_email_verified as isEmailVerified,
ur.role_id as role,
bs.branch_id as branchId
from auth_user u
join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'SALESPERSON'
join res_branch_salesperson bs on bs.salesperson_id = u.id
where u.id = UUID_TO_BIN(:id)`;

exports.register = (salesperson) => {
    let params = {
        id: v4(),
        branchId: salesperson.branchId,
        username: salesperson.username,
        email: salesperson.username,
        password: hashSync(salesperson.username)
    };
    let sql = `insert into auth_user(id, username, email, password) values (UUID_TO_BIN(:id), :username, :email, :password);
    insert into auth_user_role(user_id, role_id) values (UUID_TO_BIN(:id), 'SALESPERSON');
    insert into res_branch_salesperson(branch_id, salesperson_id) values (UUID_TO_BIN(:branchId), UUID_TO_BIN(:id));
    ${selectSalespersonById}`;
    return query(sql, params);
}

exports.updateBranch = (id, branchId) => {
    let params = {
        id: id,
        branchId: branchId
    };
    let sql = `update res_branch_salesperson 
    set branch_id = UUID_TO_BIN(:branchId) 
    where salesperson_id = UUID_TO_BIN(:id));
    ${selectSalespersonById}`;
    return query(sql, params);
}

exports.filter = async (options, sortBy='username', sortOrder='asc') => {
    let params = {
        offset: options.pageNumber > 0 ? (options.pageNumber - 1) * options.pageSize : 0,
        length: options.pageSize,
        branchId: options.branchId
    }
    let whereClause = ``;
    if(options.search && options.search !== ''){
        params.search = `%${options.search}%`;
        whereClause = `and (u.email like :search 
            or u.username like :search
            or concat_ws(' ', up.first_name, up.last_name) like :search)`
    }
    let sql = `select count(u.id) as total 
    from auth_user u
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'SALESPERSON'
    left join auth_user_profile up on up.id = u.id
    join res_branch_salesperson bs on bs.salesperson_id = u.id
    where bs.branch_id = UUID_TO_BIN(:branchId) ${whereClause};
    select BIN_TO_UUID(u.id) as id, 
    u.username, u.email, u.is_email_verified as isEmailVerified, u.enabled, u.last_login as lastLogin
    ur.role_id as role,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    bs.branch_id as branchId
    from auth_user u
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'SALESPERSON'
    left join auth_user_profile up on up.id = u.id
    join res_branch_salesperson bs on bs.salesperson_id = u.id
    where bs.branch_id = UUID_TO_BIN(:branchId) ${whereClause}
    order by ${sortBy} ${sortOrder}
    limit :offset, :length`;
    return query(sql, params);
}

exports.available = async (options, sortBy='username', sortOrder='asc') => {
    let params = {
        offset: options.pageNumber > 0 ? (options.pageNumber - 1) * options.pageSize : 0,
        length: options.pageSize,
        branchId: options.branchId
    }
    let whereClause = ``;
    if(options.search && options.search !== ''){
        params.search = `%${options.search}%`;
        whereClause = `and (u.email like :search 
            or u.username like :search
            or concat_ws(' ', up.first_name, up.last_name) like :search)`
    }
    let sql = `select count(u.id) as total 
    from auth_user u
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'SALESPERSON'
    left join auth_user_profile up on up.id = u.id
    join res_branch_salesperson bs on bs.salesperson_id = u.id
    where bs.branch_id = UUID_TO_BIN(:branchId) ${whereClause};
    select BIN_TO_UUID(u.id) as id, 
    u.username, u.email, u.is_email_verified as isEmailVerified, u.enabled, u.last_login as lastLogin
    ur.role_id as role,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    bs.branch_id as branchId
    from auth_user u
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'SALESPERSON'
    left join auth_user_profile up on up.id = u.id
    join res_branch_salesperson bs on bs.salesperson_id = u.id
    where bs.branch_id = UUID_TO_BIN(:branchId) ${whereClause}
    order by ${sortBy} ${sortOrder}
    limit :offset, :length`;
    return query(sql, params);
}