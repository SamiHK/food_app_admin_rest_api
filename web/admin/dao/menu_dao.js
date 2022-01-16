const { query, querySingleResult } = require("../../db");

exports.create = async (menu) => {
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

exports.createItem = async (menuId, menuItem) => {
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

exports.update = async (id, menu) => {
    let params = {
        id: id,
        title: menu.title,
        description: menu.description
    }
    
    let sql = `update res_menu set title = :title, description = :description where id = :id;
    select * from res_menu where id = :id;`;       
    return query(sql, params);
}

exports.updateItem = async (menuItemId, menuItem) => {
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

exports.updateSorting = async (menus) => {

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

exports.updateItemSorting = async (menuItems) => {

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

exports.get = async (id) => {
    let params = [id]
    let sql = `select * from res_menu where id = ?`;
    return querySingleResult(sql, params);
}

exports.item = async (menuItemId) => {
    let params = [menuItemId]
    let sql = `select i.id, i.menu_id as menuId, i.title, i.description, i.price, i.old_price as oldPrice
    from res_menu_item i where i.id = ?`;
    return querySingleResult(sql, params);
}

exports.items = async (menuId) => {
    let params = [menuId]
    let sql = `select i.id, i.menu_id as menuId, i.title, i.description, i.price, i.old_price as oldPrice
    from res_menu_item i 
    where i.menu_id = ?
    order by i.sort_order `;
    return query(sql, params);
}

exports.filter = async (filterParams, sortBy='sort_order', sortOrder='asc') => {
    let sql = `select m.id, m.title, m.description, m.sort_order as sortOrder from res_menu m
    order by ${sortBy} ${sortOrder}`;
    // let params = {
    //     offset: filterParams.pageNumber && filterParams.pageNumber > 0 ? (filterParams.pageNumber - 1) * filterParams.pageSize: 0,
    //     length: filterParams.pageSize
    // }

    if(filterParams.search){
        filterParams.search = `%${filterParams.search}%`
    }

    return query(sql);
}
