var { query, querySingleResult } = require('../../db');
var {v4: uuidv4} = require('uuid');

exports.filter = async (search, pageNumber = 1, pageSize = 10, orderByProp='name', order='asc') => {
    let whereClause = ''
    let params = {};
    if(search) {
        whereClause = `where b.name like :search 
        or b.code like :search 
        or b.address like :search`;
        params.search = `%${search}%`;
    }

    let sql = `select count(b.id) as total
    from res_branch b ${whereClause}`;
    let page = await querySingleResult(sql, params);
    page.number = pageNumber;
    page.size = pageSize;
    Object.assign(params, {
        offset: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
        length: pageSize,
        column: orderByProp,
        order: order
    })
    sql = `select BIN_TO_UUID(b.id) as id, b.name, b.code, b.address,
    BIN_TO_UUID(b.manager_id) as managerId, u.username as managerUsername, u.email as managerEmail, 
    (case
        when concat(up.first_name, ' ', up.last_name) is not null then concat(up.first_name, ' ', up.last_name)
        when u.username is not null then u.username
        else u.email 
    end) as managerFullName
    from res_branch b
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
    ${whereClause}
    order by ${orderByProp} ${order} 
    limit :offset, :length `;
    page.items = await query(sql, params);
    return page;
}

exports.available = async (pageNumber = 1, pageSize = 100) => {
    let sql = `select count(b.id) as total
    from res_branch b 
    where b.manager_id is null `;
    let page = await querySingleResult(sql);
    page.number = pageNumber;
    page.size = pageSize;
    params = {
        offset: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
        length: pageSize
    }
    sql = `select BIN_TO_UUID(b.id) as id, b.name, b.code, b.address,
    BIN_TO_UUID(b.manager_id) as managerId, u.username as managerUsername, u.email as managerEmail, 
    (case
        when concat(up.first_name, ' ', up.last_name) is not null then concat(up.first_name, ' ', up.last_name)
        when u.username is not null then u.username
        else u.email 
    end) as managerFullName
    from res_branch b
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on u.id = b.manager_id
    where b.manager_id is null
    order by name
    limit :offset, :length `;
    page.items = await query(sql, params);
    return page;
}

exports.save = async (branch) => {
    let sql = null;
    if(!branch.id){
        branch.id = uuidv4();
        sql = `insert into res_branch (id, name, code, address, city_id, manager_id) 
        values (UUID_TO_BIN(:id), :name, :code, :address, :cityId, UUID_TO_BIN(:managerId));
        `;
    } else {
        sql = `update res_branch set
         name = :name,
         code = :code,
         address = :address,
         city_id = :cityId,
         manager_id = UUID_TO_BIN(:managerId)
         where id = UUID_TO_BIN(:id);`;
    }
    let params = {
        id: branch.id,
        name: branch.name,
        code: branch.code,
        address: branch.address,
        cityId: branch.cityId,
        managerId: branch.managerId
    };
    sql = sql.concat(` select * from res_branch where id = UUID_TO_BIN(:id)`)
    return query(sql, params);
} 

exports.updateManager = async (id, managerId) => {
    let params = {
        id: id,
        managerId: managerId
    }
    let sql = `update res_branch set manager_id = null where manager_id = UUID_TO_BIN(:managerId); 
    update res_branch set manager_id = UUID_TO_BIN(:managerId) where id = UUID_TO_BIN(:id)`;
    return query(sql, params);
} 

exports.get = async (id) => {
    let params = [id];
    let sql = `select BIN_TO_UUID(b.id) as id, b.name, b.code, b.active, b.city_id as cityId, 
    b.address, BIN_TO_UUID(b.manager_id) as managerId, 
    u.username, u.email, up.first_name as firstName, up.last_name as lastName,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    c.*, s.*, ct.*
    from res_branch b 
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
    left join addr_city c on c.id = b.city_id
    left join addr_state s on s.id = c.state_id
    left join addr_country ct on ct.id = s.country_id
    where b.id = UUID_TO_BIN(?)`;
    let options = {
        sql: sql,
        nestTables: true
    }
    let result = await querySingleResult(options, params);
    let branch = result['b'];
    branch.id = result[''].id;
    branch.managerId = result[''].managerId;
    if(branch.managerId){
        branch.manager = result['u'];
        Object.assign(branch.manager, result['up']);
        branch.manager.id = result[''].managerId;
        branch.manager.fullName = result[''].fullName;
    }
    if(branch.cityId){
        branch.city = result['c'];
        branch.city.state = result['s'];
        branch.city.state.country = result['ct'];
    }

    return branch;
}
