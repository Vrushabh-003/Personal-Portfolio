import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import React from 'react';
// Stubs for future pages
// import BlogPage from './pages/BlogPage';
// import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/blog" element={<BlogPage />} /> */}
        {/* <Route path="/admin" element={<AdminLoginPage />} /> */}
      </Routes>
    </Router>
  );
}
export default App;