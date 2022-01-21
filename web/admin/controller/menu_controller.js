const { validationResult } = require("express-validator");
const { getMenus, 
    getMenu, 
    createMenu,
    updateMenu, 
    updateMenuSorting,
    createMenuItem, 
    getMenuItems, 
    getMenuItem, 
    updateMenuItem, 
    updateMenuItemSorting,
    updateMenuImage, 
    updateMenuItemImage } = require("../dao/menu_dao");
const { sendErrorResponse } = require('../../common/util/http_util');
const { CustomError } = require("../../errors");
const { deleteFile } = require("../../file_storage");

exports.createMenu = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menu = req.body;
            let results = await createMenu(menu);
            if(results && results.length == 3){
                res.json(results[2][0]);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res);
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.createMenuItem = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menuId = req.params.id;
            let menuItem = req.body;
            let results = await createMenuItem(menuId, menuItem);
            if(results && results.length == 3){
                res.json(results[2][0]);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res);
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.updateMenu = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menu = req.body;
            let results = await updateMenu(req.params.id, menu);
            if(results && results.length == 2){
                res.json(results[1][0]);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res);
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.updateMenuItem = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menuItem = req.body;
            let results = await updateMenuItem(req.params.id, menuItem);
            if(results && results.length == 2){
                res.json(results[1][0]);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res);
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}


exports.updateMenuSorting = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menus = req.body;
            let results = await updateMenuSorting(menus);
            res.json(results);
            // if(results && results.length == 2){
            // } else {
            //     sendErrorResponse(new Error('Something gone wrong'), res);
            // }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.updateMenuItemSorting = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menuItems = req.body;
            let results = await updateMenuItemSorting(menuItems);
            res.json(results);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

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

exports.updateMenuImage = async (req, res) => {
    // console.log(req.file);
    let file = req.file;
    if(file){
        try {
            // file.path = `${process.env.FILE_ACCESS_PATH}/${file.filename}`;
            // delete the existing image
            let results = await updateMenuImage(req.params.id, file);
            if(results && results.length == 5){
                let deleteFileImage = results[0][0];
                if(deleteFileImage) deleteFile(deleteFileImage.name);             
                let fileImg = results[4][0];
                // fileImg.path = `${process.env.FILE_ACCESS_PATH}/${fileImg.name}`
                res.json(fileImg);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res);
            }            
        } catch (e) {
            sendErrorResponse(e, res)
        }
    } else {
        sendErrorResponse(new Error('something gone wrong while saving file'), res)
    }
}

exports.updateMenuItemImage = async (req, res) => {
    // console.log(req.file);
    let file = req.file;
    if(file){
        try {
            // delete the existing image
            let results = await updateMenuItemImage(req.params.id, file);
            if(results && results.length == 4){
                let fileImg = results[3][0];
                // fileImg.path = `${process.env.FILE_ACCESS_PATH}/${fileImg.name}`
                res.json(results[3][0]);
            } else {
                sendErrorResponse(new Error('Something gone wrong'), res);
            }            
        } catch (e) {
            sendErrorResponse(e, res)
        }
    } else {
        sendErrorResponse(new Error('something gone wrong while saving file'), res)
    }
}