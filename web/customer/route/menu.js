const { checkSchema } = require('express-validator')
const { getMenus,
    getMenu,
    getMenuItemsByMenu,
    getMenuItem} = require('../controller/menu_controller')

const router = require('express').Router()

router.get('', getMenus) // get all menus
router.get('/item/:id', getMenuItem) // get menu item by menu item id
router.get('/:id', getMenu) // get menu by menu id
router.get('/:id/item', getMenuItemsByMenu) // get all menu items by menu id


module.exports = router;