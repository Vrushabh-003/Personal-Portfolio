// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Project, Achievement, Blog } from '../../types';

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // A single function to fetch all data
  const fetchData = async () => {
    try {
      const [projectsRes, achievementsRes, blogsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/projects'),
        axios.get('http://localhost:5000/api/achievements'),
        axios.get('http://localhost:5000/api/blogs')
      ]);
      setProjects(projectsRes.data);
      setAchievements(achievementsRes.data);
      setBlogs(blogsRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  // A single useEffect to run on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProjectDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
        fetchData(); // Refetch all data
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  const handleAchievementDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/achievements/${id}`, config);
        fetchData(); // Refetch all data
      } catch (error) {
        console.error('Failed to delete achievement', error);
      }
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, config);
        fetchData(); // Refetch all data
      } catch (error) {
        console.error('Failed to delete blog post', error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Logout
          </button>
        </div>
        
        {/* Projects Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Manage Projects</h2>
            <Link to="/admin/project/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add New Project
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Actions</th></tr></thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-medium">{project.title}</td>
                    <td className="p-2 flex gap-2">
                      <Link to={`/admin/project/${project._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                      <button onClick={() => handleProjectDelete(project._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold">Manage Achievements</h2>
             <Link to="/admin/achievement/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New Achievement</Link>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
              <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Actions</th></tr></thead>
              <tbody>
                {achievements.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-medium">{item.title}</td>
                    <td className="p-2 flex gap-2">
                       <Link to={`/admin/achievement/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                       <button onClick={() => handleAchievementDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold">Manage Blogs</h2>
             <Link to="/admin/blog/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Create New Post</Link>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
              <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Actions</th></tr></thead>
              <tbody>
                {blogs.map((post) => (
                  <tr key={post._id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-medium">{post.title}</td>
                    <td className="p-2 flex gap-2">
                       <Link to={`/admin/blog/${post._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                       <button onClick={() => handleBlogDelete(post._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;