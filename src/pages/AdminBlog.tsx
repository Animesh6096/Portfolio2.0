import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload } from 'lucide-react';
import { DEFAULT_BLOG_IMAGE } from '../utils/blogUtils';
import LoadingScreen from '../components/LoadingScreen';
import Background3D from '../components/Background3D';

function AdminBlog() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: DEFAULT_BLOG_IMAGE,
    readTime: '5 min read'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      const requiredFields = ['title', 'excerpt', 'content', 'category'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      console.log('Submitting form data:', formData); // Debug log
      
      alert('Demo mode: no backend connected. Post not saved.');
      window.location.href = '/blog';
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert(error instanceof Error ? error.message : 'Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove the handleImageChange function for now since we're using a default image
  // We'll implement proper image upload later

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Background3D />
      <div className="darker-overlay"></div> {/* Added Darker Overlay */}
      <div className="grid-background">
        <div className="purple-glow -z-30 top-0 left-0 w-[800px] h-[800px] opacity-70"></div>
        <div className="purple-glow -z-30 bottom-0 right-0 w-[800px] h-[800px] opacity-70"></div>
      </div>
      <div className="gradient-overlay opacity-80 -z-20"></div>
      <div className="vignette opacity-80 -z-10"></div> {/* Added Vignette */}

      <div className="relative z-10 container mx-auto px-8 py-20 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
            Create New Blog Post
          </h1>
        </div>

        {/* Blog Post Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-purple-300 mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-purple-300 mb-2">Category</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-purple-300 mb-2">Excerpt</label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20 h-24"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-purple-300 mb-2">Content</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20 h-64"
              required
            />
          </div>

          <div>
            <label htmlFor="readTime" className="block text-purple-300 mb-2">Read Time</label>
            <input
              type="text"
              id="readTime"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100"
              placeholder="e.g., 5 min read"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-purple-300 mb-2">Cover Image</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors text-purple-300 cursor-pointer">
                <Upload className="w-5 h-5" />
                <span>Choose File</span>
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {formData.image && (
                <span className="text-gray-300">{formData.image}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminBlog;
