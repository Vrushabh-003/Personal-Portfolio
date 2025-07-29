// src/pages/BlogListPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Blog } from '../types';
import BlogPostCard from '../components/common/BlogPostCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const BlogListPage = () => {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Change this line
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;
        const { data } = await axios.get(apiUrl);
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts', error);
      }
    };
    fetchPosts();
  }, []);

  // ... rest of the component
  
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      <Header />
      <main className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Blog
          </motion.h1>
          {posts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {posts.map(post => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">No blog posts yet. Check back soon!</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage;