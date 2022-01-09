var { query, querySingleResult } = require('../../db');
var { v4: uuidv4} = require('uuid');
var bcrypt = require('bcryptjs');
const { managerRegisterSchema } = require('../../common/http_req_schema/auth_schemas');

exports.register = async (user) => {
    user.id = uuidv4();
    let params = {
        id: user.id,
        username: user.username,
        email: user.username,
        password: bcrypt.hashSync(user.username)
    }
    let sql = `insert into auth_user(id, username, email, is_email_verified, password) values (UUID_TO_BIN(:id), :username, :email, false, :password);
    insert into auth_user_role(user_id, role_id) values (UUID_TO_BIN(:id), 'MANAGER')`;
    return query(sql, params);
}

exports.get = async (id) => {
    let params = {id: id}
    let sql = `select BIN_TO_UUID(u.id) as id, u.username, u.email, u.enabled, u.last_login as lastLogin, 
    u.last_password_update as lastPasswordUpdate,
    up.first_name as firstName, up.last_name as lastName, concat_ws(' ', up.first_name, up.last_name) as fullName, 
    up.profile_picture as profilePicture,
    ur.role_id as role,
    BIN_TO_UUID(b.id) as branchId,
    b.name, b.code
    from auth_user u 
    left join auth_user_role ur on ur.user_id = u.id
    left join auth_user_profile up on up.id = u.id
    left join res_branch b on b.manager_id = u.id
    where u.id = UUID_TO_BIN(:id);`;
    let options = {
        sql: sql,
        nestTables: true
    }
    let result = await querySingleResult(options, params);
    let manager = result['u'];
    manager.id = result[''].id;
    manager.role = result['ur'].role;
    Object.assign(manager, result['up']);
    manager.fullName = result[''].fullName;
    manager.branchId = result[''].branchId;
    if(manager.branchId){
        manager.branch = result['b'];
        manager.salespersons = await query(`select BIN_TO_UUID(sp.id) as id, sp.username, sp.email, concat_ws(' ', spf.first_name, spf.last_name) as fullName
        from auth_user sp
        join auth_user_role spr on spr.user_id = sp.id and spr.role_id = 'SALES_PERSON'
        left join auth_user_profile spf on spf.id = sp.id
        join res_branch_salesperson bs on bs.salesperson_id = sp.id and bs.branch_id = UUID_TO_BIN(:branchId)`, {
            branchId: manager.branchId
        })
    }
    return manager;
}

exports.filter = async (search, pageNumber = 0, pageSize = 10, sortBy='username', sortOrder='desc') => {
    let whereClause = ''
    let params = {};
    if(search) {
        whereClause = `where u.username like :search 
        or u.email like :search 
        or concat_ws(' ', up.first_name, up.last_name) like :search`;
        params.search = `%${search}%`;
    }
    let sql = `select count(u.id) as total
    from auth_user u 
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'MANAGER'
    left join auth_user_profile up on up.id = u.id
    ${whereClause}`;

    let page = await querySingleResult(sql, params);
    page.number = pageNumber;
    page.size = pageSize;

    Object.assign(params, {
        offset: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
        length: pageSize
    })
    
    sql = `select BIN_TO_UUID(u.id) as id, u.username as username, u.email as email, u.is_email_verified as isEmailVerified, 
    u.last_login as lastLogin, u.enabled as enabled, 
    up.first_name as firstName, up.last_name as lastName,
    concat_ws(' ', up.first_name, up.last_name) as fullName, 
    up.profile_picture as profilePicture, 
    ur.role_id as role,
    b.id as branchId,
    concat(b.code, ' (', b.name, ')') as branch,
    b.name as branchName,
    b.code as branchCode,
    ea.created_on as createdOn,
    ea.updated_on as updatedOn
    from auth_user u 
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'MANAGER' 
    left join auth_user_profile up on up.id = u.id
    left join res_branch b on b.manager_id = u.id
    left join entity_audit ea on ea.entity_id = u.id
    ${whereClause}
    order by ${sortBy} ${sortOrder} 
    limit :offset, :length `;
    page.items = await query(sql, params);
    return page;
}

exports.available = async (pageNumber = 0, pageSize = 100, sortBy='username', sortOrder='asc') => {
    let sql = `select count(u.id) as total
    from auth_user u 
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'MANAGER'
    where u.enabled = 1 
    and u.id not in (select b.manager_id from res_branch b where b.manager_id is not null) `;
    let page = await querySingleResult(sql);
    page.number = pageNumber;
    page.size = pageSize;

    
    params = {
        offset: pageNumber > 1 ? pageNumber - 1: pageNumber,
        length: pageSize
    }
    sql = `select BIN_TO_UUID(u.id) as id, u.username as username, u.email as email,  
    up.first_name as firstName, up.last_name as lastName,
    (case when concat_ws(' ', up.first_name, up.last_name) != '' then concat_ws(' ', up.first_name, up.last_name)
    when u.username is not null then u.username else u.email end)
     as fullName,
    up.profile_picture as profilePicture
    from auth_user u 
    join auth_user_role ur on ur.user_id = u.id and ur.role_id = 'MANAGER' 
    left join auth_user_profile up on up.id = u.id 
    where u.enabled = 1 
    and u.id not in (select b.manager_id from res_branch b where b.manager_id is not null)
    order by ${sortBy} ${sortOrder} 
    limit :offset, :length `;
    page.items = await query(sql, params);
    return page;
}
