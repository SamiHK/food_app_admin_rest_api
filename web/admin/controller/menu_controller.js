const { validationResult } = require("express-validator");
const { filter, get, create, update, updateSorting, createItem, items, item, updateItem, updateItemSorting, updateMenuImage, updateMenuItemImage } = require("../dao/menu_dao");
const { sendErrorResponse } = require('../../common/util/http_util');
const { CustomError } = require("../../errors");

exports.create = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menu = req.body;
            let results = await create(menu);
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

exports.createItem = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menuId = req.params.id;
            let menuItem = req.body;
            let results = await createItem(menuId, menuItem);
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

exports.update = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menu = req.body;
            let results = await update(req.params.id, menu);
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

exports.updateItem = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menuItem = req.body;
            let results = await updateItem(req.params.id, menuItem);
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


exports.updateSorting = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menus = req.body;
            let results = await updateSorting(menus);
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

exports.updateItemSorting = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let menuItems = req.body;
            let results = await updateItemSorting(menuItems);
            res.json(results);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.get = async (req, res) => {
    try {
        let menu = await get(req.params.id);
        if(menu){
            res.json(menu);
        } else {
            sendErrorResponse(new CustomError(`Menu not found by id: ${id}`, 'Not Found', 'NOT_FOUND'), res);
        }
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.item = async (req, res) => {
    try {
        let menuItem = await item(req.params.id);
        res.json(menuItem);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.items = async (req, res) => {
    try {
        let menuItems = await items(req.params.id);
        res.json(menuItems);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.filter = async (req, res) => {
    try {
        let filterParams = {};
        filterParams.pageNumber = req.query.number;
        if(!filterParams.pageNumber) filterParams.pageNumber = 0;
        filterParams.pageSize = req.query.size;
        if(!filterParams.pageSize) filterParams.pageSize = parseInt(process.env.DEFAULT_PAGE_SIZE);
        filterParams.search = req.query.search;
        let menus = await filter(filterParams);
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
            let results = await updateMenuImage(req.params.id, file);
            if(results && results.length == 4){
                let fileImg = results[3][0];
                fileImg.path = `${process.env.FILE_ACCESS_PATH}/${fileImg.name}`
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

exports.updateMenuItemImage = async (req, res) => {
    // console.log(req.file);
    let file = req.file;
    if(file){
        try {
            let results = await updateMenuItemImage(req.params.id, file);
            if(results && results.length == 4){
                let fileImg = results[3][0];
                fileImg.path = `${process.env.FILE_ACCESS_PATH}/${fileImg.name}`
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