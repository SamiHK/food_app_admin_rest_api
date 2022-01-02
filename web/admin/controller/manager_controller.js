var managerDao = require('../dao/manager_dao');
var { sendErrorResponse } = require('../../common/util/http_util');
var { validationResult } = require('express-validator');


exports.register = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let manager = req.body;
            await managerDao.register(manager);
            manager = await managerDao.get(manager.id);
            res.json(manager);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.get = async (req, res) => {
    try {
        let id = req.params.id;
        let manager = await managerDao.get(id);
        res.json(manager);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.filter = async (req, res, next) => {
    // const result = validationResult(req);
    try {
        let pageNumber = req.query.number;
        if(pageNumber) pageNumber = parseInt(pageNumber);
        let pageSize = req.query.size;
        if(pageSize) pageSize = parseInt(pageSize);
        let managers = await managerDao.filter(req.query.search, pageNumber, pageSize);
        res.json(managers);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.available = async (req, res) => {
    // const result = validationResult(req);
    try {
        let pageNumber = req.query.number;
        if(pageNumber) pageNumber = parseInt(pageNumber);
        let pageSize = req.query.size;
        if(pageSize) pageSize = parseInt(pageSize);
        let managers = await managerDao.available(pageNumber, pageSize);
        res.json(managers);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}


