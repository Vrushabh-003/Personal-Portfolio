// src/pages/admin/ProjectEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const ProjectEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const isNew = !id;
  // Define the base URL from the environment variable
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!isNew) {
      const fetchProject = async () => {
        try {
          // Use the environment variable for the API URL
          const { data } = await axios.get(`${apiBaseUrl}/api/projects/${id}`);
          setTitle(data.title);
          setDescription(data.description);
          setTechnologies(data.technologies.join(', '));
          setLiveUrl(data.liveUrl || '');
          setRepoUrl(data.repoUrl || '');
          setImageUrl(data.imageUrl || '');
          setMediaType(data.mediaType || 'image');
        } catch (error) {
          console.error('Failed to fetch project', error);
        }
      };
      fetchProject();
    }
  }, [id, isNew, apiBaseUrl]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      liveUrl,
      repoUrl,
      imageUrl,
      mediaType,
    };
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (isNew) {
        // Use the environment variable for the API URL
        await axios.post(`${apiBaseUrl}/api/projects`, projectData, config);
      } else {
        // Use the environment variable for the API URL
        await axios.put(`${apiBaseUrl}/api/projects/${id}`, projectData, config);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to save project', error);
      alert('Failed to save project');
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">{isNew ? 'Add New Project' : 'Edit Project'}</h1>
        <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded" rows={4}></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Technologies (comma-separated)</label>
            <input type="text" value={technologies} onChange={e => setTechnologies(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Live Demo URL</label>
            <input type="text" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">GitHub Repo URL</label>
            <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Media Type</label>
            <select value={mediaType} onChange={e => setMediaType(e.target.value as 'image' | 'video')} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded">
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">
              {isNew ? 'Create Project' : 'Update Project'}
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

export default ProjectEditPage;