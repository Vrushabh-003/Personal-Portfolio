// src/pages/admin/ExperienceEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const ExperienceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const isNew = !id;
  // Define the base URL from the environment variable
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!isNew) {
      const fetchExperience = async () => {
        // Use the environment variable for the API URL
        const { data } = await axios.get(`${apiBaseUrl}/api/experiences/${id}`);
        setTitle(data.title);
        setCompany(data.company);
        setLocation(data.location);
        setStartDate(new Date(data.startDate).toISOString().split('T')[0]);
        setEndDate(data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '');
        setDescription(data.description.join('\n'));
      };
      fetchExperience();
    }
  }, [id, isNew, apiBaseUrl]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const experienceData = { title, company, location, startDate, endDate: endDate || null, description: description.split('\n') };
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    try {
      if (isNew) {
        // Use the environment variable for the API URL
        await axios.post(`${apiBaseUrl}/api/experiences`, experienceData, config);
      } else {
        // Use the environment variable for the API URL
        await axios.put(`${apiBaseUrl}/api/experiences/${id}`, experienceData, config);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Failed to save experience');
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">{isNew ? 'Add New Experience' : 'Edit Experience'}</h1>
        <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Form fields */}
          <input type="text" placeholder="Job Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <input type="date" placeholder="End Date (optional)" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <textarea placeholder="Description (one point per line)" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded" rows={5}></textarea>
          <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">Save</button>
        </form>
      </div>
    </div>
  );
};
export default ExperienceEditPage;