const { filterMenu, filterMenuItem, updateMenuSorting, updateMenuItemSorting, updateMenuAvailability, updateMenuItemAvailability } = require('../controller/menu_controller');

var router = require('express').Router()

router.get('', filterMenu)
router.post('/sorting', updateMenuSorting)
router.post('/availability', updateMenuAvailability)
router.get('/:id/item', filterMenuItem)
router.post('/item/availability', updateMenuItemAvailability)
router.post('/item/sorting', updateMenuItemSorting)

module.exports = router;