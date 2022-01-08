var { query, querySingleResult } = require('../../db');
var {v4: uuidv4} = require('uuid');

exports.filter = async (search, pageNumber = 1, pageSize = 10, orderByProp='name', order='asc') => {
    let whereClause = '';
    let params = {
        offset: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
        length: pageSize,
        column: orderByProp,
        order: order
    };
    if(search) {
        whereClause = `where b.name like :search 
        or b.code like :search `;
        params.search = `%${search}%`;
    }
    sql = `select count(b.id) as total
    from res_branch b
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
    ${whereClause};
    select BIN_TO_UUID(b.id) as id, b.name, b.code, 
    BIN_TO_UUID(b.manager_id) as managerId, u.username as managerUsername, u.email as managerEmail, 
    (case
        when concat(up.first_name, ' ', up.last_name) is not null then concat(up.first_name, ' ', up.last_name)
        when u.username is not null then u.username
        else u.email 
    end) as managerFullName,
    bl.formatted_address as branchAddress
    from res_branch b
    left join res_branch_location bl on bl.id = b.id
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
    ${whereClause}
    order by ${orderByProp} ${order} 
    limit :offset, :length `;
    let queryResult = await query(sql, params);
    let page = {
        number: pageNumber,
        size: pageSize,
        total: 0,
        items: []
    };
    Object.assign(page, queryResult[0][0]);
    Object.assign(page.items, queryResult[1]);
    return page;
}

exports.available = async (search, pageNumber = 1, pageSize = 100) => {
    let whereClause = '';
    let params = {
        offset: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
        length: pageSize
    };
    if(search) {
        whereClause = `and ( b.name like :search 
        or b.code like :search `;
        params.search = `%${search}%)`;
    }
    sql = `select count(b.id) as total
    from res_branch b
    where b.manager_id is null ${whereClause};
    select BIN_TO_UUID(b.id) as id, b.name, b.code
    from res_branch b 
    where b.manager_id is null ${whereClause}
    order by b.name 
    limit :offset, :length `;
    let queryResult = await query(sql, params);
    let page = {
        number: pageNumber,
        size: pageSize,
        total: 0,
        items: []
    };
    Object.assign(page, queryResult[0][0]);
    Object.assign(page.items, queryResult[1]);
    return page;
}

exports.save = async (branch) => {
    let sql = null;
    if(!branch.id){
        branch.id = uuidv4();
        sql = `insert into res_branch (id, name, code, manager_id) 
        values (UUID_TO_BIN(:id), :name, :code, UUID_TO_BIN(:managerId));`;
    } else {
        sql = `update res_branch set
         name = :name,
         code = :code,
         manager_id = UUID_TO_BIN(:managerId)
         where id = UUID_TO_BIN(:id);`;
    }
    let params = {
        id: branch.id,
        name: branch.name,
        code: branch.code,
        managerId: branch.managerId
    };
    sql = sql.concat(` select BIN_TO_UUID(b.id) as id, b.name, b.code from res_branch b where b.id = UUID_TO_BIN(:id)`)
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
    let sql = `select BIN_TO_UUID(b.id) as id, b.name, b.code, b.active, BIN_TO_UUID(b.manager_id) as managerId, 
    u.username, u.email, up.first_name as firstName, up.last_name as lastName,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    bl.*
    from res_branch b 
    left join res_branch_location bl on bl.id = b.id
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
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

    if(result['bl'].id){
        branch.location = {
            addressLine1: result['bl'].address_line_1,
            formattedAddress: result['bl'].formatted_address,
            latLng: {
                lat: result['bl'].lat,
                lng: result['bl'].lng,
            }
        }
    }
    return branch;
}

exports.updateLocation = async(id, location) => {
    let city = await querySingleResult(`select c.id 
    from addr_city c 
    join addr_state s on s.id = c.state_id and s.name = :stateName 
    join addr_country  ac on ac.id = s.country_id and (ac.iso3 = :countryShortName or ac.iso2 = :countryShortName) 
    where c.name = :cityName`, {
        stateName: location.stateName, 
        countryShortName: location.countryShortName, 
        cityName: location.cityName});


    let sql = `insert into res_branch_location(id, city_id, address_line_1, formatted_address, lat, lng, address_components)
    values (UUID_TO_BIN(:id), :cityId, :addressLine1, :formattedAddress, :lat, :lng, :addressComponents)
    on duplicate key update city_id = :cityId, address_line_1 = :addressLine1, formatted_address = :formattedAddress, 
    lat = :lat, lng = :lng, address_components = :addressComponents;
    select BIN_TO_UUID(bl.id) as id, bl.formatted_address as formattedAddress, bl.address_line_1 as addressLine1, 
    bl.city_id as cityId,
    JSON_OBJECT('lat', bl.lat, 'lng', bl.lng) as latLng
    from res_branch_location bl where bl.id = UUID_TO_BIN(:id)`;
    let params = {
        id: id,
        cityId: city && city.id ? city.id: null,
        addressLine1: location.addressLine1,
        formattedAddress: location.formattedAddress,
        addressComponents: location.address_components,
        lat: location.latLng.lat,
        lng: location.latLng.lng
    }
    return query(sql, params);
}
