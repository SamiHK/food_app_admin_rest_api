const { sendErrorResponse } = require("../../common/util/http_util");
const { filterMenu, filterMenuItems, updateMenuSorting, updateMenuItemSorting, updateMenuAvailability, updateMenuItemAvailability } = require("../dao/menu_dao");

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

exports.updateMenuSorting = async (req, res) => {
    // const result = validationResult(req);
    try {
        let auth_user = res.locals.user
        await updateMenuSorting(req.body, auth_user.branchId);
        res.send();
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.updateMenuItemSorting = async (req, res) => {
    // const result = validationResult(req);
    try {
        let auth_user = res.locals.user
        await updateMenuItemSorting(req.body, auth_user.branchId);
        res.send();
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.updateMenuAvailability = async (req, res) => {
    // const result = validationResult(req);
    try {
        let auth_user = res.locals.user
        let result = await updateMenuAvailability(req.body, auth_user.branchId);
        res.send(result);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.updateMenuItemAvailability = async (req, res) => {
    // const result = validationResult(req);
    try {
        let auth_user = res.locals.user
        let result = await updateMenuItemAvailability(req.body, auth_user.branchId);
        res.send(result);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}
