// models/Category.js

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name must be less than 50 characters']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
