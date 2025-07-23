// controllers/categoryController.js

const Category = require('../models/Category');

// @desc Get all categories
// @route GET /api/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
};

// @desc Get single category
// @route GET /api/categories/:id
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// @desc Create new category
// @route POST /api/categories
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// @desc Update category
// @route PUT /api/categories/:id
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// @desc Delete category
// @route DELETE /api/categories/:id
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};
