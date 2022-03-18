const { query, mulitpleQuery } = require("../../db");

exports.create = async (customerId, branchId, o) => {
    let sql = `insert into res_order(branch_id, customer_id, is_delivery,
         customer_location_id, items, status, sub_total, delivery_charges, gst) 
    values (UUID_TO_BIN(:branchId), 
        UUID_TO_BIN(:customerId), :isDelivery, :customerLocationId, :items, :status, :subTotal, :deliveryCharges, :gst)`
    let params = {
        branchId: branchId,
        customerId: customerId,
        items: JSON.stringify(o.items),
        status: o.status,
        subTotal: o.subTotal,
        isDelivery: true,
        deliveryCharges: o.deliveryCharges,
        gst: o.gst
    }
    params.customerLocationId = o.address.id

    return query(sql, params);
}

exports.getById = async (id) => {
    let sql = `select ro.id, 
    BIN_TO_UUID(ro.salesperson_id) as salespersonId,
    BIN_TO_UUID(ro.branch_id) as branchId,
    rb.name as branchName,
    BIN_TO_UUID(ro.customer_id) as customerId,
    (case 
        when concat_ws(' ', up.first_name, up.last_name) != '' then concat_ws(' ', up.first_name, up.last_name)
        when au.username is not null then au.username
        else au.email end ) as customerFullName,
    ul.formatted_address as formattedAddress,
    ro.is_delivery as isDelivery,
    ro.sub_total as subTotal,
    ro.delivery_charges as deliveryCharges,
    ro.gst as gst,
    (ro.sub_total + (ro.sub_total*(ro.gst/100)) + ro.delivery_charges) as total, 
    ro.items as items,
    ro.status as status,
    ro.created_on as createdOn,
    ro.updated_on as updatedOn
    from res_order ro
    left join auth_user_profile up on up.id = ro.customer_id
    left join auth_user au on au.id = ro.customer_id
    left join auth_user_location ul on ul.id = ro.customer_location_id
    left join res_branch rb on rb.id = ro.branch_id
    where ro.id = :id`
    let params = {
        id: id
    }
    let results = await mulitpleQuery({
        nestTables: true,
        sql: sql
    }, params);

    // results = results[0]
    let orders = []
    results[0].forEach(s => {
        let order = {
            ...s["ro"], ...s[""], ...s["rb"]
        }
        order.customer = {
            id: order.customerId,
            fullName: order.customerFullName
        }
        if (order.isDelivery) {
            order.address = { ...s["ul"] }
        }
        if(order.branchId){
            order.branch = {
                id: order.branchId,
                name: order.branchName
            }
            order.branchName = undefined
        }
        order.customerId = undefined
        order.customerFullName = undefined
        orders.push(order)
    })

    return orders[0]

}

exports.get = async (customerId, status, page = 1) => {
    let orderStatusSQL = `select ro.status, count(ro.id) as total 
    from res_order ro
    join auth_user au on au.id = ro.customer_id
    left join auth_user_profile up on up.id = ro.customer_id
    where au.id = UUID_TO_BIN(:customerId)
    group by ro.status`;

    let ordersSQL = `from res_order ro
    join auth_user au on au.id = ro.customer_id
    left join auth_user_profile up on up.id = ro.customer_id
    left join auth_user_location ul on ul.id = ro.customer_location_id
    join res_branch rb on rb.id = ro.branch_id
    where au.id = UUID_TO_BIN(:customerId)
    and ro.status = :status`;

    let ordersPageCountSql = `select count(ro.id) as _count ${ordersSQL}`;

    let ordersPageSQL = `
    select ro.id, 
    BIN_TO_UUID(ro.branch_id) as branchId,
    rb.name as branchName,
    up.cell_number as cellNumber,
    ul.formatted_address as formattedAddress,
    ro.is_delivery as isDelivery,
    ro.sub_total as subTotal,
    ro.delivery_charges as deliveryCharges,
    ro.gst,
    (ro.sub_total + (ro.sub_total*(ro.gst/100)) + ro.delivery_charges) as total, 
    ro.items as items,
    ro.status as status,
    ro.created_on as createdOn,
    ro.updated_on as updatedOn
    ${ordersSQL}
    order by ro.created_on desc, updated_on desc
    limit :offset, :length`;

    let sql = `${orderStatusSQL};
    ${ordersPageCountSql};
    ${ordersPageSQL};`;
    let length = parseInt(process.env.DEFAULT_PAGE_SIZE)
    let params = {
        customerId: customerId,
        status: status,
        offset: page ? (page-1) * length : 1,
        length: length
    }
    let results = await mulitpleQuery({
        nestTables: true,
        sql: sql
    }, params);

    results = results[0]
    let orderStatus = []
    results[0].forEach(s => {
        orderStatus.push({ ...s["ro"], ...s[""] })
    });
    let orders = []
    results[2].forEach(s => {
        let order = {
            ...s["ro"], ...s[""]
        }
        if (order.isDelivery) {
            order.address = { ...s["ul"] }
        }
        if(order.branchId){
            order.branch = s["rb"]
            order.branch.id = order.branchId
            order.branch.name = order.branch.branchName
            order.branch.branchName = undefined
        }
        if(s["up"].cellNumber){
            order.customer = {
                cellNumber: s["up"].cellNumber
            }
        }
        order.customerId = undefined
        order.customerFullName = undefined
        order.salespersonFullName = undefined
        orders.push(order)
    })

    return {
        orderStatus: orderStatus,
        page: {
            number: page,
            size: length,
            items: orders,
            total: results[1][0][""]._count
        }
    }

}

exports.cancelOrder = async(orderId) => {
    let sql = `update res_order ro set ro.status = 'CANCELED' where ro.id = :orderId`;
    return query(sql, {orderId: orderId});
}
