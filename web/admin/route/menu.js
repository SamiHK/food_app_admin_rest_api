const { checkSchema } = require('express-validator')
const { menuSaveSchema, menuIsActiveSchema } = require('../../common/http_req_schema/menu_schema')
const { getMenus,
    getMenu,
    createMenu,
    updateMenuSorting,
    createMenuItem,
    updateMenu,
    getMenuItemsByMenu,
    getMenuItem,
    updateMenuItem,
    updateMenuItemSorting,
    updateMenuIsActive
} = require('../controller/menu_controller')

const router = require('express').Router()

router.get('', getMenus) // get all menus
router.post('', checkSchema(menuSaveSchema), createMenu) // create menu
router.post('/sorting', updateMenuSorting) // update sorting of menu
router.post('/item/sorting', updateMenuItemSorting) // update menu item by menu item id
router.get('/item/:id', getMenuItem) // get menu item by menu item id
router.post('/item/:id', updateMenuItem) // update menu item by menu item id
router.get('/:id', getMenu) // get menu by menu id
router.post('/:id', checkSchema(menuSaveSchema), updateMenu) // update menu by menu id
router.post('/:id/isActive', checkSchema(menuIsActiveSchema), updateMenuIsActive) // update menu by menu id
router.get('/:id/item', getMenuItemsByMenu) // get all menu items by menu id
router.post('/:id/item', checkSchema(menuSaveSchema), createMenuItem) // create menu item by menu id


module.exports = router;