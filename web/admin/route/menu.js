const { checkSchema } = require('express-validator')
const { menuSaveSchema } = require('../../common/http_req_schema/menu_schema')
const { filter, get, create, updateSorting, createItem, update, items, item, updateItem, updateItemSorting } = require('../controller/menu_controller')

const router = require('express').Router()

router.get('', filter) // get all menus
router.post('', checkSchema(menuSaveSchema), create) // create menu
router.post('/sorting', updateSorting) // update sorting of menu
router.post('/item/sorting', updateItemSorting) // update menu item by menu item id
router.get('/item/:id', item) // get menu item by menu item id
router.post('/item/:id', updateItem) // update menu item by menu item id
router.get('/:id', get) // get menu by menu id
router.post('/:id', checkSchema(menuSaveSchema), update) // update menu by menu id
router.get('/:id/item', items) // get all menu items by menu id
router.post('/:id/item', checkSchema(menuSaveSchema), createItem) // create menu item by menu id


module.exports = router;