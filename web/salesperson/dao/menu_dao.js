const { query } = require("../../db");

exports.filterMenu = async (branchId, filterParams)=> {
    let params = {
        branchId: branchId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    }
    let sql = `select rm.id, rm.title, rm.description, 
    concat(:fileAccessPath, fi.name) as primaryImg,
    if(rbm.is_include is null, true, rbm.is_include) isInclude,
    (select
		count(rmi_.id)
	from
		res_menu_item rmi_
	left join res_branch_menu_item rbmi_ on
		rbmi_.menu_item_id = rmi_.id
		and rbmi_.branch_id = uuid_to_bin(:branchId) 
	where
		if(rbmi_.is_available is null,
		true,
		rbmi_.is_available)
		and rmi_.menu_id = rm.id ) as totalItems,
    if(rbm.sort_order is null, rm.sort_order, rbm.sort_order) sortOrder
    from res_menu rm 
    left join file_image fi on fi.id = rm.pri_img_id 
    left join res_branch_menu rbm on rbm.menu_id = rm.id and rbm.branch_id = uuid_to_bin(:branchId)
    where rm.is_active and if(rbm.is_available is null, false, rbm.is_available)
    order by sortOrder`;
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
    concat(:fileAccessPath, fi.name) as primaryImg,
    if(rbm.is_available is null, true, rbm.is_available) isMenuAvailable,
    if(rbmi.is_include is null, true, rbmi.is_include) isInclude,
    if(rbmi.is_available is null, true, rbmi.is_available) isAvailable,
    if(rbmi.sort_order is null, rmi.sort_order, rbm.sort_order) sortOrder
    from res_menu_item rmi
    left join file_image fi on fi.id = rmi.pri_img_id 
    left join res_branch_menu rbm on rbm.menu_id = rmi.menu_id and rbm.branch_id = uuid_to_bin(:branchId) 
    left join res_branch_menu_item rbmi on rbmi.menu_item_id = rmi.id and rbmi.branch_id = rbm.branch_id
    where rmi.menu_id = :menuId and if(rbmi.is_available is null, true, rbmi.is_available)
    order by sortOrder`;
    let results = await query(sql, params);
    results.forEach(r => {
        r.isMenuAvailable = !!r.isMenuAvailable;
        r.isAvailable = !!r.isAvailable;
        r.isInclude = !!r.isInclude;
    })

    return results
}

