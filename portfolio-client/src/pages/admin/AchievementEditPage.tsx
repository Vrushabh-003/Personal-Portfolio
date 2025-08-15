// src/pages/admin/AchievementEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast'; // Import toast

const AchievementEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  const isNew = !id;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!isNew) {
      const fetchAchievement = async () => {
        try {
          const { data } = await axios.get(`${apiBaseUrl}/api/achievements/${id}`);
          setTitle(data.title);
          setDescription(data.description);
          setDate(new Date(data.date).toISOString().split('T')[0]);
          setImageUrl(data.imageUrl || '');
        } catch (error) {
          console.error('Failed to fetch achievement', error);
        }
      };
      fetchAchievement();
    }
  }, [id, isNew, apiBaseUrl]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const achievementData = { title, description, date, imageUrl };
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };

    const promise = isNew
        ? axios.post(`${apiBaseUrl}/api/achievements`, achievementData, config)
        : axios.put(`${apiBaseUrl}/api/achievements/${id}`, achievementData, config);
        
    toast.promise(promise, {
        loading: 'Saving achievement...',
        success: () => {
            navigate('/admin/dashboard');
            return <b>Achievement saved!</b>;
        },
        error: <b>Failed to save achievement.</b>
    });
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">{isNew ? 'Add New Achievement' : 'Edit Achievement'}</h1>
        <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded" rows={4}></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Image URL (Optional)</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Certificate URL (Optional)</label>
            <input type="text" value={certificateUrl} onChange={e => setCertificateUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">
              {isNew ? 'Create Achievement' : 'Update Achievement'}
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

export default AchievementEditPage;