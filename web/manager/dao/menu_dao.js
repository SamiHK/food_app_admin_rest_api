const { query } = require("../../db");

exports.filterMenu = async (branchId, filterParams)=> {
    let params = {
        branchId: branchId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    }
    let sql = `select rm.id, rm.title, rm.description, 
    concat(:fileAccessPath, '/', fi.name) as primaryImg,
    if(rbm.is_include is null, true, rbm.is_include) isInclude,
    if(rbm.is_available is null, true, rbm.is_available) isAvailable,
    (select count(i.id) from res_menu_item i where i.menu_id = rm.id ) as totalItems,
    if(rbm.sort_order is null, rm.sort_order, rbm.sort_order) sortOrder
    from res_menu rm 
    left join file_image fi on fi.id = rm.pri_img_id 
    left join res_branch_menu rbm on rbm.menu_id = rm.id and rbm.branch_id = uuid_to_bin(:branchId) 
    where rm.is_active
    order by isAvailable desc, sortOrder`;
    results = await query(sql, params)
    results.forEach(r => {
        r.isAvailable = !!r.isAvailable;
        r.isInclude = !!r.isInclude;
    })
    return results;
}

exports.filterMenuItems = async (branchId, menuId, filterParams)=> {
    let params = {
        branchId: branchId,
        menuId: menuId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    }
    let sql = `select rmi.id, rmi.title, rmi.description, rmi.price, rmi.old_price as oldPrice,
    concat(:fileAccessPath, '/', fi.name) as primaryImg,
    if(rbm.is_available is null, true, rbm.is_available) isMenuAvailable,
    if(rbmi.is_include is null, true, rbmi.is_include) isInclude,
    if(rbmi.is_available is null, true, rbmi.is_available) isAvailable,
    if(rbmi.sort_order is null, rmi.sort_order, rbm.sort_order) sortOrder
    from res_menu_item rmi
    left join file_image fi on fi.id = rmi.pri_img_id 
    left join res_branch_menu rbm on rbm.menu_id = rmi.menu_id and rbm.branch_id = uuid_to_bin(:branchId) 
    left join res_branch_menu_item rbmi on rbmi.menu_item_id = rmi.id and rbmi.branch_id = rbm.branch_id
    where rmi.menu_id = :menuId
    order by sortOrder`;
    let results = await query(sql, params);
    results.forEach(r => {
        r.isMenuAvailable = !!r.isMenuAvailable;
        r.isAvailable = !!r.isAvailable;
        r.isInclude = !!r.isInclude;
    })

    return results
}

exports.updateMenuSorting = async(menus, branchId) => {
    if(menus){
        menus.forEach(m => {
            let params = {
                menuId: m.id,
                sortOrder: m.sortOrder,
                branchId: branchId
            }
            query(`insert into res_branch_menu (branch_id, menu_id, sort_order)
             values (:branchId, :menuId, :sortOrder)
             on duplicate key set sort_order = :sortOrder`, params);
        });
    }
}

exports.updateMenuAvailability = async(menu, branchId) => {
    let params = {
        menuId: menu.id,
        isAvailable: menu.isAvailable,
        branchId: branchId
    }
    return query(`insert into res_branch_menu (branch_id, menu_id, is_available)
        values (UUID_TO_BIN(:branchId), :menuId, :isAvailable)
        on duplicate key update is_available = :isAvailable`, params);
}

exports.updateMenuItemSorting = async(menuItems, branchId) => {
    if(menuItems){
        menuItems.forEach(m => {
            let params = {
                menuItemId: m.id,
                sortOrder: m.sortOrder,
                branchId: branchId
            }
            query(`insert into res_branch_menu_item (branch_id, menu_item_id, sort_order)
             values (:branchId, :menuItemId, :sortOrder)
             on duplicate key update sort_order = :sortOrder`, params);
        });
    }
}

exports.updateMenuItemAvailability = async(menuItem, branchId) => {
    let params = {
        menuItemId: menuItem.id,
        isAvailable: menuItem.isAvailable,
        branchId: branchId
    }
    return query(`insert into res_branch_menu_item (branch_id, menu_item_id, is_available)
        values (UUID_TO_BIN(:branchId), :menuItemId, :isAvailable)
        on duplicate key update is_available = :isAvailable`, params);
}
