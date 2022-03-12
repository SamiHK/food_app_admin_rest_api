const { off } = require("../../../logger");
const { query, mulitpleQuery } = require("../../db");

exports.create = async (salespersonId, branchId, o) => {
    let sql = `insert into res_order(branch_id, salesperson_id, customer_id, is_delivery,
         customer_location_id, items, status, sub_total, delivery_charges, gst) 
    values (UUID_TO_BIN(:branchId), UUID_TO_BIN(:salespersonId), 
        UUID_TO_BIN(:customerId), :isDelivery, :customerLocationId, :items, :status, :subTotal, :deliveryCharges, :gst);`
    let params = {
        branchId: branchId,
        salespersonId: salespersonId,
        customerId: o.customer ? o.customer.id : null,
        isDelivery: o.isDelivery != undefined || o.isDelivery != null ? true: o.isDelivery,
        items: JSON.stringify(o.items),
        status: o.status,
        subTotal: o.subTotal,
        deliveryCharges: o.deliveryCharges,
        gst: o.gst
    }
    if (o.isDelivery && o.address) {
        params.customerLocationId = o.address.id
    } else {
        params.customerLocationId = null
    }
    return query(sql, params);
}

exports.get = async (salespersonId, branchId, status) => {
    let sql = `
    select ro.status, count(ro.id) as total 
    from res_order ro
    where (ro.salesperson_id = UUID_TO_BIN(:salespersonId) or ro.salesperson_id is null)
    and ro.branch_id = UUID_TO_BIN(:branchId)
    group by ro.status;
    select ro.id, 
    BIN_TO_UUID(ro.salesperson_id) as salespersonId,
    BIN_TO_UUID(ro.branch_id) as branchId,
    BIN_TO_UUID(ro.customer_id) as customerId,
    (case 
        when concat_ws(' ', up.first_name, up.last_name) != '' then concat_ws(' ', up.first_name, up.last_name)
        when au.username is not null then au.username
        else au.email end ) as customerFullName,
    ul.formatted_address as formattedAddress,
    ro.is_delivery as isDelivery,
    ro.sub_total as subTotal,
    ro.delivery_charges as deliveryCharges,
    ro.gst,
    (ro.sub_total + (ro.sub_total*(ro.gst/100)) + ro.delivery_charges) as total, 
    ro.items as items,
    ro.created_on as createdOn,
    ro.updated_on as updatedOn
    from res_order ro
    left join auth_user au on au.id = ro.customer_id
    left join auth_user_profile up on up.id = ro.customer_id
    left join auth_user_location ul on ul.id = ro.customer_location_id
    where (ro.salesperson_id = UUID_TO_BIN(:salespersonId) or ro.salesperson_id is null)
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
        if(order.customerId){
            order.customer = {
                id: order.customerId,
                fullName: order.customerFullName
            }
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

