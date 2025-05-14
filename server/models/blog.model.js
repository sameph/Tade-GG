import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    maxlength: 500,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  author: {
    type: String,
    required: true,
    default: 'Tade GG',
  },
  category: {
    type: String,
    default: 'General'
  },
  tags: {
    type: [String],
    default: [],
  },
  mainImage: {
    url: {
      type: String,
    },
  }
}, {
  timestamps: true
});

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
