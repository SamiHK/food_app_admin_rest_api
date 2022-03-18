const { off } = require("../../../logger");
const { query, mulitpleQuery, querySingleResult } = require("../../db");


exports.search = async (branchId, queryParams, page=1) => {

    let length = parseInt(process.env.DEFAULT_PAGE_SIZE)
    let params = {
        branchId: branchId,
        offset: page ? (page-1) * length : 1,
        length: length
    }

    let ordersSQL = `from res_order ro
    left join auth_user au on au.id = ro.customer_id
    left join auth_user_profile up on up.id = ro.customer_id
    left join auth_user_location ul on ul.id = ro.customer_location_id
    left join auth_user sau on sau.id = ro.salesperson_id
    left join auth_user_profile saup on saup.id = ro.salesperson_id
    where ro.branch_id = UUID_TO_BIN(:branchId)`;

    if(queryParams){
        if(queryParams.salespersonId){
            params.salespersonId = queryParams.salespersonId
            ordersSQL += ` and ro.salesperson_id = UUID_TO_BIN(:salespersonId) `
        }
    }

    let ordersPageCountSql = `select count(ro.id) as _count ${ordersSQL}`;

    let ordersPageSQL = `select ro.id, 
    BIN_TO_UUID(ro.salesperson_id) as salespersonId,
    BIN_TO_UUID(ro.branch_id) as branchId,
    BIN_TO_UUID(ro.customer_id) as customerId,
    (case 
        when concat_ws(' ', up.first_name, up.last_name) != '' then concat_ws(' ', up.first_name, up.last_name)
        when au.username is not null then au.username
        else au.email end ) as customerFullName,
    (case 
        when concat_ws(' ', saup.first_name, saup.last_name) != '' then concat_ws(' ', saup.first_name, saup.last_name)
        when sau.username is not null then sau.username
        else sau.email end ) as salespersonFullName,
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

    let sql = `${ordersPageCountSql};
    ${ordersPageSQL};`;
    

    let results = await mulitpleQuery({
        nestTables: true,
        sql: sql
    }, params);

    results = results[0]

    let orders = []
    results[1].forEach(s => {
        let order = {
            ...s["ro"], ...s[""]
        }
        if(order.customerId){
            order.customer = {
                id: order.customerId,
                fullName: order.customerFullName,
                ...s["up"]
            }
            order.customerId = undefined
            order.customerFullName = undefined
        }
        if(order.salespersonId){
            order.salesperson = {
                id: order.salespersonId,
                fullName: order.salespersonFullName,
            }
            order.salespersonId = undefined
            order.salespersonFullName = undefined
        }
        if (order.isDelivery) {
            order.address = { ...s["ul"] }
        }
        order.isDelivery = !!order.isDelivery
        orders.push(order)
    })

    return {
            number: page,
            size: length,
            items: orders,
            total: results[0][0][""]._count
    }

}
