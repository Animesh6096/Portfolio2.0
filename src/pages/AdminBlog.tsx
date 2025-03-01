import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Upload } from 'lucide-react';
import { DEFAULT_BLOG_IMAGE } from '../utils/blogUtils';
import LoadingScreen from '../components/LoadingScreen';
import Background3D from '../components/Background3D';
import Navigation from '../components/Navigation';
import { createBlogPost, getAllCategories } from '../services/blogService';

function AdminBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    image: DEFAULT_BLOG_IMAGE,
    readTime: '5 min read'
  });
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process tags into array
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const postData = {
        ...formData,
        tags: tagsArray,
        category: formData.category || newCategory,
      };

      await createBlogPost(postData);
      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navigation />
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
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-purple-300 mb-2">Category</label>
            <div className="flex gap-4">
              {!showNewCategoryInput ? (
                <>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:outline-none focus:border-purple-400/40"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(true)}
                    className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                  >
                    New Category
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:outline-none focus:border-purple-400/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(false)}
                    className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                  >
                    Use Existing
                  </button>
                </>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-purple-300 mb-2">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20 h-24"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-purple-300 mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20 h-64"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-purple-300 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., React, TypeScript, Web Development"
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 text-gray-100 focus:outline-none focus:border-purple-400/40"
            />
          </div>

          <div>
            <label htmlFor="readTime" className="block text-purple-300 mb-2">Read Time</label>
            <input
              type="text"
              id="readTime"
              name="readTime"
              value={formData.readTime}
              onChange={handleInputChange}
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
                  name="image"
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
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminBlog;
