const router = require('express').Router()
const { uploadSingle } = require('../../file_storage');
const { updateMenuImage, updateMenuItemImage } = require('../controller/menu_controller');

router.post('/menu/:id', uploadSingle('menu'), updateMenuImage)
router.post('/menu/item/:id', uploadSingle('menuItem'), updateMenuItemImage)

module.exports = router;