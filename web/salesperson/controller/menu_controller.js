const { sendErrorResponse } = require("../../common/util/http_util");
const { filterMenu, filterMenuItems } = require("../dao/menu_dao");

exports.filterMenu = async (req, res) => {
    // const result = validationResult(req);
    try {
        let auth_user = res.locals.user
        let menus = await filterMenu(auth_user.branchId, req.query);
        res.json(menus);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.filterMenuItem = async (req, res) => {
    // const result = validationResult(req);
    try {
        let auth_user = res.locals.user
        let menuItems = await filterMenuItems(auth_user.branchId, req.params.id, req.query);
        res.json(menuItems);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
