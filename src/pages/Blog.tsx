import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import { demoBlogs } from '../utils/blogData';
import Background3D from '../components/Background3D';

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Background3D />
      <div className="darker-overlay"></div> {/* Added Darker Overlay */}
      <div className="grid-background opacity-20">
        {/* ...any background elements... */}
        <div className="purple-glow -z-30 top-0 left-0 w-[800px] h-[800px] opacity-70"></div>
        <div className="purple-glow -z-30 bottom-0 right-0 w-[800px] h-[800px] opacity-70"></div>
        <div className="purple-glow -z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-60"></div>
        
        {/* Additional glows */}
        <div className="purple-glow -z-30 top-1/4 right-1/4 w-[600px] h-[600px] opacity-50"></div>
        <div className="purple-glow -z-30 bottom-1/4 left-1/4 w-[600px] h-[600px] opacity-50"></div>
      </div>
      <div className="gradient-overlay opacity-80 -z-20"></div>
      <div className="vignette opacity-80 -z-10"></div> {/* Added Vignette */}
      <div className="container mx-auto px-8 py-20 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
            <Link
              to="/blog/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors text-purple-300"
            >
              <span>Create Post</span>
              <Plus className="w-5 h-5" />
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
            Technical Blog
          </h1>
          <p className="text-gray-300 text-xl">
            Thoughts, insights, and explorations in technology
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoBlogs.map((post, index) => (
            <article key={post._id} className="rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-purple-400/20 hover:border-purple-400/40 card-zoom">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover rounded mb-4"
              />
              <div className="mb-2 text-sm text-purple-400">{post.category}</div>
              <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
                {post.title}
              </h2>
              <p className="text-gray-300 line-clamp-3 mb-2">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post._id}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
