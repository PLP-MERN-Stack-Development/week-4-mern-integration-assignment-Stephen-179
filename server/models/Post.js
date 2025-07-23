// models/Post.js - Mongoose model for blog posts (improved)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    featuredImage: {
      type: String,
      default: '/uploads/default-post.jpg',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      maxlength: [250, 'Excerpt cannot exceed 250 characters'],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Indexes for faster search on title and tags
PostSchema.index({ title: 'text', tags: 'text', content: 'text' });

// Slug generation before save
PostSchema.pre('validate', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
      .trim();
  }
  next();
});

// Virtual URL for frontend linking
PostSchema.virtual('url').get(function () {
  return `/posts/${this.slug}`;
});

// Add comment method
PostSchema.methods.addComment = async function (userId, content) {
  this.comments.push({ user: userId, content });
  await this.save();
  return this;
};

// Increment view count method
PostSchema.methods.incrementViewCount = async function () {
  this.viewCount += 1;
  await this.save();
  return this;
};

module.exports = model('Post', PostSchema);
