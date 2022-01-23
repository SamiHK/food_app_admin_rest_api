const { validationResult } = require("express-validator");
const { getMenus, 
    getMenu, 
    getMenuItems, 
    getMenuItem} = require("../dao/menu_dao");
const { sendErrorResponse } = require('../../common/util/http_util');
const { CustomError } = require("../../errors");
const { deleteFile } = require("../../file_storage");


exports.getMenu = async (req, res) => {
    try {
        let menu = await getMenu(req.params.id);
        if(menu){
            res.json(menu);
        } else {
            sendErrorResponse(new CustomError(`Menu not found by id: ${id}`, 'Not Found', 'NOT_FOUND'), res);
        }
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getMenuItem = async (req, res) => {
    try {
        let menuItem = await getMenuItem(req.params.id);
        res.json(menuItem);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getMenuItemsByMenu = async (req, res) => {
    try {
        let menuItems = await getMenuItems(req.params.id);
        res.json(menuItems);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.getMenus = async (req, res) => {
    try {
        let filterParams = {};
        filterParams.pageNumber = req.query.number;
        if(!filterParams.pageNumber) filterParams.pageNumber = 0;
        filterParams.pageSize = req.query.size;
        if(!filterParams.pageSize) filterParams.pageSize = parseInt(process.env.DEFAULT_PAGE_SIZE);
        filterParams.search = req.query.search;
        let menus = await getMenus(filterParams);
        res.json(menus);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

