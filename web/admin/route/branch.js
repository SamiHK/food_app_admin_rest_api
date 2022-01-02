var router = require('express').Router();
var { checkSchema } = require('express-validator');
var branchController = require('../controller/branch_controller');
var { branchSaveSchema, branchAddressSchema } = require('../../common/http_req_schema/branch_schema');

router.post('', checkSchema(branchSaveSchema), branchController.save);
router.get('', branchController.filter);
router.get('/available', branchController.available);
router.get('/:id', branchController.get);
router.post('/:id/manager', branchController.updateManager);
router.post('/:id/address', checkSchema(branchAddressSchema), branchController.updateAddress);
module.exports = router;