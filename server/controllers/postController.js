// controllers/postController.js - CRUD controllers for Post model

const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, excerpt, category, tags, isPublished } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Title, content, and category are required.');
  }

  const post = await Post.create({
    title,
    content,
    excerpt,
    category,
    tags,
    author: req.user._id,
    isPublished: isPublished || false,
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: post,
  });
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'name email')
    .populate('category', 'name slug')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
exports.getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate('author', 'name email')
    .populate('category', 'name slug');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.incrementViewCount();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }

  const { title, content, excerpt, category, tags, isPublished } = req.body;

  post.title = title || post.title;
  post.content = content || post.content;
  post.excerpt = excerpt || post.excerpt;
  post.category = category || post.category;
  post.tags = tags || post.tags;
  post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;

  // Regenerate slug if title changes
  if (title && title !== post.title) {
    post.slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  }

  await post.save();

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: post,
  });
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully',
  });
});

// @desc    Add comment to a post
// @route   POST /api/posts/:slug/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Comment content is required.');
  }

  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.addComment(req.user._id, content);

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
    data: post,
  });
});
