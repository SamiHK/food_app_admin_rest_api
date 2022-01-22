const { getUnits, saveUnit, deleteUnit } = require('../controller/menu_item_unit_controller');

const router = require('express').Router()

router.get('', getUnits)
router.post('', saveUnit)
router.delete('/:id', deleteUnit)

module.exports = router;