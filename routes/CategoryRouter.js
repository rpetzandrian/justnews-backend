const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { uploadImageCategory } = require('../helpers/Upload');

router.get('/', categoryController.getAllCategory);
router.post('/', uploadImageCategory, categoryController.addCategory);
router.get('/:id', categoryController.getCategoryById);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;