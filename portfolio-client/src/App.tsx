import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
// import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/blog" element={<BlogPage />} /> */}
        <Route path="/login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}
export default App;