// src/pages/BlogListPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Blog } from '../types';
import BlogPostCard from '../components/common/BlogPostCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BlogListPage = () => {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/blogs');
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      <Header />
      <main className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-12">My Blog</h1>
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
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