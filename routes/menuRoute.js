
const express = require('express');
const router = express.Router();
const multer = require('multer');
const menuController = require('../controllers/menuController');
const { storage } = require('../controllers/menuController');
const upload = multer({ storage: storage });

// router.post('/', menuController.createMenuItem);
router.post('/', upload.single('image'), menuController.createMenuItem);
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.post('/:id/upload', menuController.uploadImage);


module.exports = router;