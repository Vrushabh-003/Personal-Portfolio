// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import ProjectEditPage from './pages/admin/ProjectEditPage';
import AchievementEditPage from './pages/admin/AchievementEditPage'; 
import CustomCursor from './components/common/CustomCursor';
import BlogEditPage from './pages/admin/BlogEditPage';
import BlogListPage from './pages/BlogListPage';
import SinglePostPage from './pages/SinglePostPage';
import ExperienceEditPage from './pages/admin/ExperienceEditPage';

import { ActiveSectionProvider } from './contexts/ActiveSectionContext'

function App() {
  return (
    <Router>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          success: {
            style: {
              background: '#28a745',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#dc3545',
              color: 'white',
            },
          },
        }}
      />
      <CustomCursor />
      <ActiveSectionProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/blog" element={<BlogListPage />} /> 
        <Route path="/blog/:slug" element={<SinglePostPage />} /> 

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/project/new" element={<ProjectEditPage />} />
          <Route path="/admin/project/:id" element={<ProjectEditPage />} />
          <Route path="/admin/achievement/new" element={<AchievementEditPage />} />
          <Route path="/admin/achievement/:id" element={<AchievementEditPage />} />
          <Route path="/admin/blog/new" element={<BlogEditPage />} /> 
          <Route path="/admin/blog/:id" element={<BlogEditPage />} /> 
          <Route path="/admin/experience/new" element={<ExperienceEditPage />} />
          <Route path="/admin/experience/:id" element={<ExperienceEditPage />} />
          
        </Route>
      </Routes>
      </ActiveSectionProvider>
    </Router>
  );
}

export default App;