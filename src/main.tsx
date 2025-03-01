import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Blog from './pages/Blog';
import AdminBlog from './pages/AdminBlog';
import BlogPost from './pages/BlogPost';
import BusinessCard from './pages/BusinessCard';
import './index.css';

const root = document.getElementById('root');

if (root) {
  console.log('Rendering root with routes');
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/admin" element={<AdminBlog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/business-card" element={<BusinessCard />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
