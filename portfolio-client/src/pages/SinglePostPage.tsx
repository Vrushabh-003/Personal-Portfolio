// src/pages/SinglePostPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Blog } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const SinglePostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Corrected line: Use the environment variable for the API URL
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/blogs/slug/${slug}`;
        const { data } = await axios.get(apiUrl);
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      <Header />
      <main className="py-20 pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Posted on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" />}
          <article className="prose dark:prose-invert lg:prose-xl max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SinglePostPage;