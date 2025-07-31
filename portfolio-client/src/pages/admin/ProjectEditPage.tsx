// src/pages/admin/ProjectEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Media } from '../../types'; // Import the Media type

const ProjectEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    // State for existing fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    
    // New state for handling multiple media items
    const [media, setMedia] = useState<Media[]>([{ url: '', type: 'image' }]);

    const isNew = !id;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (!isNew) {
            const fetchProject = async () => {
                try {
                    const { data } = await axios.get(`${apiBaseUrl}/api/projects/${id}`);
                    setTitle(data.title);
                    setDescription(data.description);
                    setTechnologies(data.technologies.join(', '));
                    setLiveUrl(data.liveUrl || '');
                    setRepoUrl(data.repoUrl || '');
                    // Set the media array, ensuring there's at least one empty field if none exist
                    setMedia(data.media && data.media.length > 0 ? data.media : [{ url: '', type: 'image' }]);
                } catch (error) {
                    console.error('Failed to fetch project', error);
                }
            };
            fetchProject();
        }
    }, [id, isNew, apiBaseUrl]);

    // Handlers for the new dynamic media fields
    const handleMediaChange = (index: number, field: keyof Media, value: string) => {
        const newMedia = [...media];
        newMedia[index] = { ...newMedia[index], [field]: value as 'image' | 'video' };
        setMedia(newMedia);
    };

    const addMediaField = () => {
        setMedia([...media, { url: '', type: 'image' }]);
    };

    const removeMediaField = (index: number) => {
        const newMedia = media.filter((_, i) => i !== index);
        setMedia(newMedia);
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = {
            title,
            description,
            technologies: technologies.split(',').map(tech => tech.trim()),
            liveUrl,
            repoUrl,
            // Filter out any media items where the URL is empty before submitting
            media: media.filter(item => item.url.trim() !== ''),
        };
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            if (isNew) {
                await axios.post(`${apiBaseUrl}/api/projects`, projectData, config);
            } else {
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
                <form onSubmit={submitHandler} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    {/* Original form fields */}
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
                        <label className="block mb-1 font-medium">Live Demo URL</label>
                        <input type="text" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">GitHub Repo URL</label>
                        <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"/>
                    </div>

                    {/* New dynamic section for multiple media */}
                    <div className="space-y-4 border-t border-gray-300 dark:border-gray-600 pt-6">
                        <label className="block font-medium text-lg">Project Media</label>
                        {media.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-center gap-2 p-3 border rounded-md border-gray-300 dark:border-gray-600">
                                <input
                                    type="text"
                                    placeholder="Media URL (Image or Video)"
                                    value={item.url}
                                    onChange={e => handleMediaChange(index, 'url', e.target.value)}
                                    className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"
                                />
                                <select
                                    value={item.type}
                                    onChange={e => handleMediaChange(index, 'type', e.target.value)}
                                    className="w-full sm:w-auto p-2 bg-gray-200 dark:bg-gray-700 rounded"
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                                <button type="button" onClick={() => removeMediaField(index)} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addMediaField} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
                            Add Media
                        </button>
                    </div>

                    {/* Form action buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-300 dark:border-gray-600">
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
