const { filterMenu, filterMenuItem } = require('../controller/menu_controller');

var router = require('express').Router()

router.get('', filterMenu)
router.get('/:id/item', filterMenuItem)

module.exports = router;