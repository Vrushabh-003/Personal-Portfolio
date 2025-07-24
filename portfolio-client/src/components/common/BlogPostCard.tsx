// src/components/common/BlogPostCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../../types';
import { motion } from 'framer-motion';

interface BlogPostCardProps {
  post: Blog;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <Link to={`/blog/${post.slug}`}>
        <img className="w-full h-56 object-cover" src={post.imageUrl || 'https://via.placeholder.com/400x250?text=Blog+Post'} alt={post.title} />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogPostCard;