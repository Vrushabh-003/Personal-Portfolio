// src/pages/admin/LeadershipEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const LeadershipEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  const isNew = !id;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!isNew) {
      const fetchLeadershipRole = async () => {
        try {
          const { data } = await axios.get(`${apiBaseUrl}/api/leadership/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRole(data.role);
          setOrganization(data.organization);
          setDescription(data.description);
          setCertificateUrl(data.certificateUrl || '');
        } catch (error) {
          console.error('Failed to fetch leadership role', error);
        }
      };
      fetchLeadershipRole();
    }
  }, [id, isNew, token, apiBaseUrl]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const leadershipData = { role, organization, description };
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };

    const promise = isNew
      ? axios.post(`${apiBaseUrl}/api/leadership`, leadershipData, config)
      : axios.put(`${apiBaseUrl}/api/leadership/${id}`, leadershipData, config);

    toast.promise(promise, {
      loading: 'Saving leadership role...',
      success: () => {
        navigate('/admin/dashboard');
        return <b>Leadership role saved!</b>;
      },
      error: <b>Failed to save leadership role.</b>
    });
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">{isNew ? 'Add New Leadership Role' : 'Edit Leadership Role'}</h1>
        <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <input type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <input type="text" placeholder="Organization" value={organization} onChange={e => setOrganization(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded" rows={5}></textarea>
          <input type="text" placeholder="Certificate URL (optional)" value={certificateUrl} onChange={e => setCertificateUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
          <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">Save</button>
        </form>
      </div>
    </div>
  );
};

export default LeadershipEditPage;