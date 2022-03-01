var { query, querySingleResult } = require('../../db');
var { v4: uuidv4 } = require('uuid');

exports.filter = async (search, pageNumber = 1, pageSize = parseInt(process.env.DEFAULT_PAGE_SIZE), orderByProp = 'name', order = 'asc') => {
    let whereClause = '';
    let params = {
        offset: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
        length: pageSize,
        column: orderByProp,
        order: order
    };
    if (search) {
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
    bl.address_line_1 addressLine1, bl.city_id as cityId, bl.formatted_address formattedAddress, bl.lat, bl.lng,
    ac.name as cityName,
    ast.id as stateId, ast.name as stateName,
    acnt.id as countryId, acnt.name as countryName
    from res_branch b
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
    left join res_branch_location bl on bl.id = b.id
    left join addr_city ac on ac.id = bl.city_id
    left join addr_state ast on ast.id = ac.state_id
    left join addr_country acnt on acnt.id = ast.country_id
    ${whereClause}
    order by ${orderByProp} ${order} 
    limit :offset, :length `;
    let queryResult = await query({
        nestTables: true,
        sql: sql
    }, params);

    let branches = []

    queryResult[1].forEach(b => {
        branches.push({
            ...b[""], ...b["b"],
            address: { ...b["bl"], ...b["ac"], ...b["ast"], ...b["acnt"] }
        })
    });

    let page = {
        number: pageNumber,
        size: pageSize,
        total: 0,
        items: [],
        raw: []
    };
    Object.assign(page, queryResult[0][0][""]);
    Object.assign(page.items, branches);
    Object.assign(page.raw, queryResult[1]);
    return page;
}

exports.salesperson = async (options, orderByProp = 'fullName', order = 'asc') => {
    let whereClause = '';
    let pageNumber = options.pageNumber > 0 ? (options.pageNumber - 1) * options.pageSize : options.pageNumber;
    let pageSize = options.pageSize;
    let params = {
        branchId: options.branchId,
        offset: pageNumber,
        length: pageSize,
        column: orderByProp,
        order: order
    };
    if (options.search) {
        whereClause = `where su.username like :search 
        or su.email like :search 
        or fullName like :search `;
        params.search = `%${options.search}%`;
    }
    sql = `select count(su.id) as total
    from auth_user su
    join auth_user_role sur on sur.user_id = su.id and sur.role_id = 'SALES_PERSON'
    left join auth_user_profile sup on sup.id = su.id
    join res_branch_salesperson bs on bs.branch_id = UUID_TO_BIN(:branchId) and bs.salesperson_id = su.id
    ${whereClause};
    select BIN_TO_UUID(su.id) as id, su.username, su.email, su.enabled, su.last_login as lastLogin,
    (case
        when concat(sup.first_name, ' ', sup.last_name) is not null then concat(sup.first_name, ' ', sup.last_name)
        when su.username is not null then su.username
        else su.email 
    end) as fullName
    from auth_user su
    join auth_user_role sur on sur.user_id = su.id and sur.role_id = 'SALES_PERSON'
    left join auth_user_profile sup on sup.id = su.id
    join res_branch_salesperson bs on bs.branch_id = UUID_TO_BIN(:branchId) and bs.salesperson_id = su.id
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
    if (search) {
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
    if (!branch.id) {
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
    let params = { id: id };
    let sql = `select BIN_TO_UUID(b.id) as id, b.name, b.code, b.active, BIN_TO_UUID(b.manager_id) as managerId, 
    u.username, u.email, up.first_name as firstName, up.last_name as lastName,
    concat_ws(' ', up.first_name, up.last_name) as fullName,
    bl.formatted_address formattedAddress, bl.address_line_1 addressLine1, bl.city_id as cityId, bl.lat, bl.lng,
    ac.name as cityName, ast.id as stateId, ast.name as stateName, acnt.id as countryId, acnt.name as countryName,
    (select count(spu.id) 
    from auth_user spu 
    join auth_user_role spur on spur.user_id = spu.id and spur.role_id = 'SALES_PERSON'
    join res_branch_salesperson bs on bs.branch_id = UUID_TO_BIN(:id) and bs.salesperson_id = spu.id) as totalActiveSalespersons
    from res_branch b 
    left join auth_user u on u.id = b.manager_id
    left join auth_user_profile up on up.id = b.manager_id
    left join res_branch_location bl on bl.id = b.id
    left join addr_city ac on ac.id = bl.city_id
    left join addr_state ast on ast.id = ac.state_id
    left join addr_country acnt on acnt.id = ast.country_id
    where b.id = UUID_TO_BIN(:id);`;
    let options = {
        sql: sql,
        nestTables: true
    }
    let result = await querySingleResult(options, params);
    let branch = result['b'];
    branch.id = result[''].id;
    branch.totalActiveSalespersons = result[''].totalActiveSalespersons;
    branch.managerId = result[''].managerId;
    if (branch.managerId) {
        branch.manager = result['u'];
        Object.assign(branch.manager, result['up']);
        branch.manager.id = result[''].managerId;
        branch.manager.fullName = result[''].fullName;
    }

    if (result['bl'].formattedAddress || result['bl'].addressLine1) {
        branch.address = { ...result["bl"], ...result["ac"], ...result["ast"], ...result["acnt"] }
        // branch.location = {
        //     addressLine1: result['bl'].address_line_1,
        //     formattedAddress: result['bl'].formatted_address,
        //     latLng: {
        //         lat: result['bl'].lat,
        //         lng: result['bl'].lng,
        //     }
        // }
    }
    return branch;
}

exports.updateAddress = async (id, address) => {

    let cityId = null;

    if (address.cityId) {
        cityId = address.cityId
    } else {
        let city = await querySingleResult(`select c.id 
        from addr_city c 
        join addr_state s on s.id = c.state_id and s.name = :stateName 
        join addr_country  ac on ac.id = s.country_id and (ac.iso3 = :countryShortName or ac.iso2 = :countryShortName) 
        where c.name = :cityName`, {
            stateName: address.stateName,
            countryShortName: address.countryShortName,
            cityName: address.cityName
        });
        if (city)
            cityId = city.id
    }



    let sql = `insert into res_branch_location(id, city_id, address_line_1, formatted_address, lat, lng, address_components)
    values (UUID_TO_BIN(:id), :cityId, :addressLine1, :formattedAddress, :lat, :lng, :addressComponents)
    on duplicate key update city_id = :cityId, address_line_1 = :addressLine1, formatted_address = :formattedAddress, 
    lat = :lat, lng = :lng, address_components = :addressComponents;
    select BIN_TO_UUID(bl.id) as id, bl.formatted_address as formattedAddress, bl.address_line_1 as addressLine1, 
    bl.city_id as cityId, ac.name as cityName, ast.id as stateId, ast.name as stateName, acnt.id as countryId, acnt.name as countryName,
    JSON_OBJECT('lat', bl.lat, 'lng', bl.lng) as latLng
    from res_branch_location bl 
    left join addr_city ac on ac.id = bl.city_id
    left join addr_state ast on ast.id = ac.state_id
    left join addr_country acnt on acnt.id = ast.country_id
    where bl.id = UUID_TO_BIN(:id) `;

    let params = {
        id: id,
        cityId: cityId,
        addressLine1: address.addressLine1,
        formattedAddress: address.formattedAddress,
        addressComponents: address.address_components,
        lat: address.latLng.lat,
        lng: address.latLng.lng
    }

    return query(sql, params);
}
