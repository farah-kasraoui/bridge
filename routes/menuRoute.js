
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/', menuController.createMenuItem);
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.post('/:id/upload', menuController.uploadImage);

module.exports = router;