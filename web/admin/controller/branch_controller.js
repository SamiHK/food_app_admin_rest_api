var logger = require('../../../logger');
var branchDao = require('../dao/branch_dao');
var { sendErrorResponse } = require('../../common/util/http_util');
var { validationResult } = require('express-validator');
const { options } = require('../route/branch');


exports.available = async (req, res) => {
    try {
        let pageNumber = req.query.number;
        if(pageNumber) pageNumber = parseInt(pageNumber);
        let pageSize = req.query.size;
        if(pageSize) pageSize = parseInt(pageSize);
        let branches = await branchDao.available(pageNumber, pageSize)
        res.json(branches);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.filter = async (req, res) => {
    try {
        let pageNumber = req.query.number;
        if(pageNumber) pageNumber = parseInt(pageNumber);
        let pageSize = req.query.size;
        if(pageSize) pageSize = parseInt(pageSize);
        let branches = await branchDao.filter(req.query.search, pageNumber, pageSize)
        res.json(branches);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.salesperson = async (req, res) => {
    try {
        let options = {
            branchId: req.params.id,
            pageNumber: req.query.number ? parseInt(req.query.number) : 0,
            pageSize: req.query.size ? parseInt(req.query.size) : parseInt(process.env.DEFAULT_PAGE_SIZE),
        }
        let salesperson = await branchDao.salesperson(options)
        res.json(salesperson);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.save = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let branch = req.body;
            branch = await branchDao.save(branch);
            // branch = await userDao.getUser(branch.id);
            if(branch && branch.length == 2)
                res.json(branch[1][0]);
            else 
                sendErrorResponse(new Error('Something gone wrong while saving branch'), res);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.updateManager = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let id = req.params.id;
            let branchManager = req.body;
            await branchDao.updateManager(id, branchManager.managerId);
            let branch = await branchDao.get(id);
            res.json(branch);
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}

exports.get = async (req, res) => {
    try {
        let id = req.params.id;
        let branch = await branchDao.get(id)
        res.json(branch);
    } catch (e) {
        sendErrorResponse(e, res);
    }
}

exports.updateLocation = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let id = req.params.id;
            let address = req.body;
            let resposne = await branchDao.updateLocation(id, address);
            if(resposne && resposne.length == 2)
                res.send(resposne[1][0]);
            else {
                sendErrorResponse(new Error('Something gone wrong'))
            }
        } catch (e) {
            sendErrorResponse(e, res);
        }
    }
}