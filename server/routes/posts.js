const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/postController');

// Auth middleware placeholders
const protect = (req, res, next) => {
  // Simulate authenticated user for now
  req.user = { _id: '60f7b2f5c8d6b93bb4d95c55', name: 'Test User' };
  next();
};

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', protect, createPost);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET /api/posts/:slug
// @desc    Get a post by slug
// @access  Public
router.get('/:slug', getPostBySlug);

// @route   PUT /api/posts/:id
// @desc    Update a post by ID
// @access  Private
router.put('/:id', protect, updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete('/:id', protect, deletePost);

// @route   POST /api/posts/:slug/comments
// @desc    Add a comment to a post
// @access  Private
router.post('/:slug/comments', protect, addComment);

module.exports = router;
