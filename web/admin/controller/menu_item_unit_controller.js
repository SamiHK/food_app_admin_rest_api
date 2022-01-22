const { validationResult } = require("express-validator");
const { sendErrorResponse } = require("../../common/util/http_util");
const { saveUnit, getUnits, deleteUnit } = require("../dao/menu_item_unit_dao");

exports.saveUnit = async (req, res) => {
    let valid = validationResult(req);
    if(!valid.isEmpty()){
        return res.status(400).send(result);
    } else {
        try {
            let unit = req.body;
            let results = await saveUnit(unit);
            res.json(results);            
        } catch (e) {
            sendErrorResponse(e, res)
        }
    }
}

exports.getUnits = async (req, res) => {
    try {
        let unit = req.body;
        let results = await getUnits();
        res.json(results);        
    } catch (e) {
        sendErrorResponse(e, res)
    }
}

exports.deleteUnit = async (req, res) => {
    try {
        let id = req.params.id;
        let results = await deleteUnit(id);
        res.json(results);        
    } catch (e) {
        if(e.code == 'ER_ROW_IS_REFERENCED_2'){
            sendErrorResponse({
                code: 'RESTRICT',
                name: 'Restrict',
                message: 'Can not delete this unit, it is assigned to menu item'
            }, res)
        } else {
            sendErrorResponse(e, res)
        }
    }
}