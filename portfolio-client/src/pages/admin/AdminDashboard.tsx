// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Project, Achievement, Blog, Experience, Leadership } from '../../types';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [leadershipRoles, setLeadershipRoles] = useState<Leadership[]>([]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [projectsRes, experiencesRes, achievementsRes, blogsRes, leadershipRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/projects/all`, config),
        axios.get(`${apiBaseUrl}/api/experiences`, config),
        axios.get(`${apiBaseUrl}/api/achievements`, config),
        axios.get(`${apiBaseUrl}/api/blogs`, config),
        axios.get(`${apiBaseUrl}/api/leadership`, config)
      ]);
      setProjects(projectsRes.data);
      setExperiences(experiencesRes.data);
      setAchievements(achievementsRes.data);
      setBlogs(blogsRes.data);
      setLeadershipRoles(leadershipRes.data);
    } catch (error) { console.error("Failed to fetch data", error); }
  };

  useEffect(() => { if (token) { fetchData(); } }, [token]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const createDeleteHandler = (itemType: string, plural: string) => async (id: string) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      const promise = axios.delete(`${apiBaseUrl}/api/${plural}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      
      toast.promise(promise, {
        loading: `Deleting ${itemType}...`,
        success: () => {
          fetchData();
          return <b>{`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted!`}</b>;
        },
        error: <b>Could not delete.</b>
      });
    }
  };

  const createReorderHandler = (plural: string, items: any[], setItems: Function) => async (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newItems.length) return;

    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);

    const orderedIds = newItems.map(item => item._id);
    const promise = axios.put(`${apiBaseUrl}/api/${plural}/reorder`, { orderedIds }, { headers: { Authorization: `Bearer ${token}` } });
    
    toast.promise(promise, {
        loading: 'Saving order...',
        success: <b>Order saved!</b>,
        error: (err) => {
            fetchData();
            return <b>Failed to reorder.</b>;
        }
    });
  };

  const handleProjectDelete = createDeleteHandler('project', 'projects');
  const handleExperienceDelete = createDeleteHandler('experience', 'experiences');
  const handleAchievementDelete = createDeleteHandler('achievement', 'achievements');
  const handleBlogDelete = createDeleteHandler('blog post', 'blogs');
  const handleLeadershipDelete = createDeleteHandler('leadership role', 'leadership');

  const handleProjectReorder = createReorderHandler('projects', projects, setProjects);
  const handleExperienceReorder = createReorderHandler('experiences', experiences, setExperiences);
  const handleAchievementReorder = createReorderHandler('achievements', achievements, setAchievements);
  const handleBlogReorder = createReorderHandler('blogs', blogs, setBlogs);
  const handleLeadershipReorder = createReorderHandler('leadership', leadershipRoles, setLeadershipRoles);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Manage Leadership</h2><Link to="/admin/leadership/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New Role</Link></div>
          <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Role</th><th className="p-2">Organization</th><th className="p-2">Actions</th></tr></thead>
            <tbody>{leadershipRoles.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700"><td className="p-2 font-medium">{item.role}</td><td className="p-2">{item.organization}</td><td className="p-2 flex items-center gap-2">
                <button onClick={() => handleLeadershipReorder(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-50 text-xl">↑</button>
                <button onClick={() => handleLeadershipReorder(index, 'down')} disabled={index === leadershipRoles.length - 1} className="p-1 disabled:opacity-50 text-xl">↓</button>
                <Link to={`/admin/leadership/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                <button onClick={() => handleLeadershipDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
              </td></tr>))}</tbody>
          </table></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Manage Projects</h2><Link to="/admin/project/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New Project</Link></div>
          <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Actions</th></tr></thead>
            <tbody>{projects.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700"><td className="p-2 font-medium">{item.title}</td><td className="p-2 flex items-center gap-2">
                <button onClick={() => handleProjectReorder(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-50 text-xl">↑</button>
                <button onClick={() => handleProjectReorder(index, 'down')} disabled={index === projects.length - 1} className="p-1 disabled:opacity-50 text-xl">↓</button>
                <Link to={`/admin/project/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                <button onClick={() => handleProjectDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
              </td></tr>))}</tbody>
          </table></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Manage Experience</h2><Link to="/admin/experience/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New Experience</Link></div>
           <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Company</th><th className="p-2">Actions</th></tr></thead>
            <tbody>{experiences.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700"><td className="p-2 font-medium">{item.title}</td><td className="p-2">{item.company}</td><td className="p-2 flex items-center gap-2">
                <button onClick={() => handleExperienceReorder(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-50 text-xl">↑</button>
                <button onClick={() => handleExperienceReorder(index, 'down')} disabled={index === experiences.length - 1} className="p-1 disabled:opacity-50 text-xl">↓</button>
                <Link to={`/admin/experience/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                <button onClick={() => handleExperienceDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
              </td></tr>))}</tbody>
          </table></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Manage Achievements</h2><Link to="/admin/achievement/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New Achievement</Link></div>
           <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Actions</th></tr></thead>
            <tbody>{achievements.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700"><td className="p-2 font-medium">{item.title}</td><td className="p-2 flex items-center gap-2">
                <button onClick={() => handleAchievementReorder(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-50 text-xl">↑</button>
                <button onClick={() => handleAchievementReorder(index, 'down')} disabled={index === achievements.length - 1} className="p-1 disabled:opacity-50 text-xl">↓</button>
                <Link to={`/admin/achievement/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                <button onClick={() => handleAchievementDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
              </td></tr>))}</tbody>
          </table></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Manage Blogs</h2><Link to="/admin/blog/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Create New Post</Link></div>
           <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="border-b border-gray-300 dark:border-gray-700"><th className="p-2">Title</th><th className="p-2">Actions</th></tr></thead>
            <tbody>{blogs.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700"><td className="p-2 font-medium">{item.title}</td><td className="p-2 flex items-center gap-2">
                <button onClick={() => handleBlogReorder(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-50 text-xl">↑</button>
                <button onClick={() => handleBlogReorder(index, 'down')} disabled={index === blogs.length - 1} className="p-1 disabled:opacity-50 text-xl">↓</button>
                <Link to={`/admin/blog/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</Link>
                <button onClick={() => handleBlogDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
              </td></tr>))}</tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;