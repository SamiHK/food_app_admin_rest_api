const { query, mulitpleQuery } = require("../../db");

exports.create = async (customerId, branchId, o) => {
    let sql = `insert into res_order(branch_id, customer_id, is_delivery,
         customer_location_id, items, status, sub_total, delivery_charges) 
    values (UUID_TO_BIN(:branchId), 
        UUID_TO_BIN(:customerId), :isDelivery, :customerLocationId, :items, :status, :subTotal, :deliveryCharges)`
    let params = {
        branchId: branchId,
        customerId: customerId,
        items: JSON.stringify(o.items),
        status: o.orderStatus,
        subTotal: o.subTotal,
        isDelivery: true,
        deliveryCharges: o.deliveryCharges
    }
    params.customerLocationId = o.address.id

    return query(sql, params);
}

exports.getById = async (id) => {
    let sql = `select ro.id, 
    BIN_TO_UUID(ro.salesperson_id) as salespersonId,
    BIN_TO_UUID(ro.branch_id) as branchId,
    BIN_TO_UUID(ro.customer_id) as customerId,
    concat_ws(' ', up.first_name, up.last_name) as customerFullName,
    ul.formatted_address as formattedAddress,
    ro.is_delivery as isDelivery,
    ro.sub_total as subTotal,
    ro.items as items,
    ro.status as status,
    ro.created_on as createdOn,
    ro.updated_on as updatedOn
    from res_order ro
    left join auth_user_profile up on up.id = ro.customer_id
    left join auth_user_location ul on ul.id = ro.customer_location_id
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
            ...s["ro"], ...s[""]
        }
        order.customer = {
            id: order.customerId,
            fullName: order.customerFullName
        }
        if (order.isDelivery) {
            order.address = { ...s["ul"] }
        }
        order.customerId = undefined
        order.customerFullName = undefined
        orders.push(order)
    })

    return orders[0]

}

exports.get = async (salespersonId, branchId, status) => {
    let sql = `
    select ro.status, count(ro.id) as total 
    from res_order ro
    where ro.salesperson_id = UUID_TO_BIN(:salespersonId)
    and ro.branch_id = UUID_TO_BIN(:branchId)
    group by ro.status;
    select ro.id, 
    BIN_TO_UUID(ro.salesperson_id) as salespersonId,
    BIN_TO_UUID(ro.branch_id) as branchId,
    BIN_TO_UUID(ro.customer_id) as customerId,
    concat_ws(' ', up.first_name, up.last_name) as customerFullName,
    ul.formatted_address as formattedAddress,
    ro.is_delivery as isDelivery,
    ro.sub_total as subTotal,
    ro.items as items,
    ro.created_on as createdOn,
    ro.updated_on as updatedOn
    from res_order ro
    left join auth_user_profile up on up.id = ro.customer_id
    left join auth_user_location ul on ul.id = ro.customer_location_id
    where ro.salesperson_id = UUID_TO_BIN(:salespersonId)
    and ro.branch_id = UUID_TO_BIN(:branchId)
    and ro.status = :status
    order by ro.created_on desc, updated_on desc`
    let params = {
        branchId: branchId,
        salespersonId: salespersonId,
        status: status
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
    results[1].forEach(s => {
        let order = {
            ...s["ro"], ...s[""]
        }
        order.customer = {
            id: order.customerId,
            fullName: order.customerFullName
        }
        if (order.isDelivery) {
            order.address = { ...s["ul"] }
        }
        order.customerId = undefined
        order.customerFullName = undefined
        orders.push(order)
    })

    return {
        orderStatus: orderStatus,
        orders: orders
    }

}

