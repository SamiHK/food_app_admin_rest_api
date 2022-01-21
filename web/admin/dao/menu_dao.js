const { query, querySingleResult } = require("../../db");

exports.createMenu = async (menu) => {
    let params = {
        title: menu.title,
        description: menu.description
    }

    let sql = `insert into res_menu(title, description) 
    values (:title, :description);
    update res_menu set sort_order = LAST_INSERT_ID() where id = LAST_INSERT_ID();
    select * from res_menu where id = LAST_INSERT_ID();`;
    return query(sql, params);
}

exports.createMenuItem = async (menuId, menuItem) => {
    let params = {
        title: menuItem.title,
        description: menuItem.description,
        price: menuItem.price,
        oldPrice: menuItem.oldPrice,
        menuId: menuId
    }

    let sql = `insert into res_menu_item(menu_id, title, description, price, old_price) 
    values (:menuId, :title, :description, :price, :oldPrice);
    update res_menu_item set sort_order = LAST_INSERT_ID() where id = LAST_INSERT_ID();
    select * from res_menu_item where id = LAST_INSERT_ID();`;
    return query(sql, params);
}

exports.updateMenu = async (id, menu) => {
    let params = {
        id: id,
        title: menu.title,
        description: menu.description
    }
    
    let sql = `update res_menu set title = :title, description = :description where id = :id;
    select * from res_menu where id = :id;`;       
    return query(sql, params);
}

exports.updateMenuItem = async (menuItemId, menuItem) => {
    let params = {
        title: menuItem.title,
        description: menuItem.description,
        price: menuItem.price,
        oldPrice: menuItem.oldPrice,
        id: menuItemId
    }

    let sql = `update res_menu_item 
    set title = :title,
    description = :description,
    price = :price,
    old_price = :oldPrice
    where id = :id;
    select * from res_menu_item where id = :id`;
    return query(sql, params);
}

exports.updateMenuSorting = async (menus) => {

    // let params = [];
    menus.forEach(m => {
        let params = {
            id: m.id,
            sortOrder: m.sortOrder
        }
        let sql = `insert into res_menu (id, sort_order)
        values (:id, :sortOrder) 
        ON DUPLICATE KEY update 
        sort_order = :sortOrder`;       
        query(sql, params);
    });
    
}

exports.updateMenuItemSorting = async (menuItems) => {

    // let params = [];
    menuItems.forEach(m => {
        let params = {
            id: m.id,
            sortOrder: m.sortOrder
        }
        let sql = `update res_menu_item 
        set sort_order = :sortOrder
        where id = :id`;       
        query(sql, params);
    });
    
}

exports.getMenu = async (id) => {
    let params = [id]
    let sql = `select * from res_menu where id = ?`;
    return querySingleResult(sql, params);
}

exports.getMenuItem = async (menuItemId) => {
    let params = [menuItemId]
    let sql = `select i.id, i.menu_id as menuId, i.title, i.description, i.price, i.old_price as oldPrice
    from res_menu_item i where i.id = ?`;
    return querySingleResult(sql, params);
}

exports.getMenuItems = async (menuId) => {
    let params = {
        menuId: menuId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    };

    let sql = `select i.id, i.menu_id as menuId, i.title, i.description, i.price, i.old_price as oldPrice,
    concat(:fileAccessPath, '/', f.name) as primaryImg
    from res_menu_item i 
    left join file_image f on f.id = i.pri_img_id
    where i.menu_id = :menuId
    order by i.sort_order `;
    return query(sql, params);
}

exports.getMenus = async (filterParams, sortBy='sort_order', sortOrder='asc') => {
    let sql = `select m.id, m.title, m.description, m.sort_order as sortOrder, 
    concat(:fileAccessPath, f.name) as primaryImg,
    (select count(i.id) from res_menu_item i where i.menu_id = m.id ) as totalItems
    from res_menu m
    left join file_image f on f.id = m.pri_img_id
    order by ${sortBy} ${sortOrder}`;
    // let params = {
    //     offset: filterParams.pageNumber && filterParams.pageNumber > 0 ? (filterParams.pageNumber - 1) * filterParams.pageSize: 0,
    //     length: filterParams.pageSize
    // }

    let params = {
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    }

    if(filterParams.search){
        filterParams.search = `%${filterParams.search}%`
    }

    return query(sql, params);
}


exports.updateMenuImage = async (menuId, file) => {
    let sql = `select f.name, f.path from file_image f 
    join res_menu m on m.pri_img_id = f.id and m.id = :menuId;
    delete file_image
    from file_image 
    join res_menu on res_menu.pri_img_id = file_image.id 
    where res_menu.id = :menuId;
    insert into file_image (id, path, mime_type, name) values (unhex(:fileId), :path, :mimeType, :name);
    update res_menu set pri_img_id = unhex(:fileId) where id = :menuId;
    select lower(hex(f.id)) as id, f.name, f.mime_type as mimeType, path, concat(:fileAccessPath, f.name) as primaryImg
    from file_image f
    join res_menu m on m.pri_img_id = f.id and m.id = :menuId`;
    let params = {
        fileId: file.id,
        name: file.filename,
        mimeType: file.mimetype,
        path: file.path,
        menuId: menuId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    } 
    return query(sql, params);
}

exports.updateMenuItemImage = async (menuItemId, file) => {
    let sql = `delete file_image
    from file_image 
    join res_menu_item on res_menu_item.pri_img_id = file_image.id 
    where res_menu_item.id = :menuItemId;
    insert into file_image (id, path, mime_type, name) values (unhex(:fileId), :path, :mimeType, :name);
    update res_menu_item set pri_img_id = unhex(:fileId) where id = :menuItemId;
    select lower(hex(f.id)) as id, f.name, f.mime_type as mimeType, f.path, concat(:fileAccessPath, f.name) as primaryImg
    from file_image f
    join res_menu_item m on m.pri_img_id = f.id and m.id = :menuItemId`;
    let params = {
        fileId: file.id,
        name: file.filename,
        mimeType: file.mimetype,
        path: file.path,
        menuItemId: menuItemId,
        fileAccessPath: process.env.FILE_STORAGE_READ_PATH
    } 
    return query(sql, params);
}