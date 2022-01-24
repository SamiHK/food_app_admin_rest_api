const { query, querySingleResult } = require("../../db");

exports.getMenus = async (filterParams, sortBy = 'sort_order', sortOrder = 'asc') => {
    let sql = `select m.id, m.title, m.description, m.sort_order as sortOrder, 
    concat(:fileAccessPath, f.name) as primaryImg, m.is_active as isActive,
    (select count(i.id) from res_menu_item i where i.menu_id = m.id ) as totalItems
    from res_menu m
    left join file_image f on f.id = m.pri_img_id
    where m.is_active
    order by ${sortBy} ${sortOrder}`;

    let params = {
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    }

    if (filterParams.search) {
        filterParams.search = `%${filterParams.search}%`
    }

    let result = await query(sql, params);
    if (result) {
        result.forEach(f => f.isActive = !!f.isActive)
    }
    return result;
}

exports.getMenusAndItems = async (filterParams) => {
    let sql = `select rmi.id, rmi.menu_id, rm.id, rmi.title, rmi.description, rmi.price, rmi.old_price, rmi.pri_img_id,
    rm.id, rm.title, rm.description, rm.pri_img_id,
    concat(:fileAccessPath, mf.name) as mPrimaryImg,
    concat(:fileAccessPath, mif.name) as miPrimaryImg
    from res_menu_item rmi 
    join res_menu rm ON rm.id = rmi.menu_id  and rm.is_active 
    left join file_image mf on mf.id = rm.pri_img_id
    left join file_image mif on mif.id = rmi.pri_img_id
    order by rm.sort_order, rmi.sort_order`;

    let params = {
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    }

    if (filterParams.search) {
        filterParams.search = `%${filterParams.search}%`
    }

    let result = await query({ sql: sql, nestTables: true }, params);
    let menus = [];
    // f.isActive = !!f.isActive
    result.forEach(r => {
        let m = menus.find(f => f.id == r.rm.id);
        if(!m){
            m = r.rm
            m.primaryImg = r[""].mPrimaryImg;
            delete m.pri_img_id
            delete m.menu_id
            menus.push(m);
        }
        if(!m.items){
            m.items = []
        }
        r.rmi.primaryImg = r[""].miPrimaryImg;
        delete r.rmi.pri_img_id;
        r.rmi.menuId = r.rmi.menu_id
        delete r.rmi.menu_id

        r.rmi.oldPrice = r.rmi.old_price;
        delete r.rmi.old_price

        m.items.push(r.rmi)
    })
    return menus;
}

exports.getMenu = async (id) => {
    let params = [id]
    let sql = `select * from res_menu where id = ?`;
    return querySingleResult(sql, params);
}

exports.getMenuItems = async (menuId) => {
    let params = {
        menuId: menuId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    };

    let sql = `select i.id, i.menu_id as menuId, i.title, i.description, i.price, i.old_price as oldPrice,
    miu.title as unit,
    concat(:fileAccessPath, f.name) as primaryImg
    from res_menu_item i 
    left join file_image f on f.id = i.pri_img_id
    left join res_menu_item_unit miu on miu.id = i.unit_id
    where i.menu_id = :menuId
    order by i.sort_order `;
    return query(sql, params);
}

exports.getMenuItem = async (menuItemId) => {
    let params = [menuItemId]
    let sql = `select i.id, i.menu_id as menuId, i.title, i.description, i.price, i.old_price as oldPrice, i.unit_id as unitId
    from res_menu_item i where i.id = ?`;
    return querySingleResult(sql, params);
}


