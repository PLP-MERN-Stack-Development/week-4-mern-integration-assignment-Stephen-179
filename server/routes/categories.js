const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// @route POST /api/categories
router.post('/', createCategory);

// @route GET /api/categories
router.get('/', getCategories);

// @route PUT /api/categories/:id
router.put('/:id', updateCategory);

// @route DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

module.exports = router;
