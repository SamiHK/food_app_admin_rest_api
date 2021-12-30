var router = require('express').Router();
var { checkSchema } = require('express-validator');
var branchController = require('../controller/branch_controller');
var { branchSaveSchema } = require('../../common/http_req_schema/branch_schema');

router.post('', checkSchema(branchSaveSchema), branchController.save);
router.get('', branchController.filter);
router.get('/available', branchController.available);
router.get('/:id', branchController.get);
router.post('/:id/manager', branchController.updateManager);
module.exports = router;