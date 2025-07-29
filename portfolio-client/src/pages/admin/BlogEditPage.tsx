// src/pages/admin/BlogEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const BlogEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const isNew = !id;

  // Define the base URL from the environment variable
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!isNew) {
      const fetchBlog = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get(`${apiBaseUrl}/api/blogs/${id}`, config);
          setTitle(data.title);
          setContent(data.content);
          setImageUrl(data.imageUrl || '');
        } catch (error) {
          console.error('Failed to fetch blog post', error);
        }
      };
      fetchBlog();
    }
  }, [id, isNew, token, apiBaseUrl]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = { title, content, imageUrl };
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };

    try {
      if (isNew) {
        await axios.post(`${apiBaseUrl}/api/blogs`, blogData, config);
      } else {
        await axios.put(`${apiBaseUrl}/api/blogs/${id}`, blogData, config);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      // In a real app, provide more specific user feedback
      alert('Failed to save blog post');
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{isNew ? 'Create New Post' : 'Edit Post'}</h1>
        <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Cover Image URL</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Content (Markdown supported)</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded" rows={15}></textarea>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">
              {isNew ? 'Publish Post' : 'Update Post'}
            </button>
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BlogEditPage;
