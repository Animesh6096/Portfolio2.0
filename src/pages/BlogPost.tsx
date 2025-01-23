import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import { demoBlogs } from '../utils/blogData';
import Background3D from '../components/Background3D';

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  createdAt: string;
}

export default function BlogPost() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const post = demoBlogs.find((item) => item._id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-300">Blog post not found.</p>
      </div>
    );
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
      
      <div className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Blog</span>
        </Link>
        
        <article className="prose prose-invert prose-lg max-w-none">
          {/* Header Section */}
          <div className="flex flex-col-reverse md:flex-row gap-8 mb-12">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-purple-400 mb-4 text-sm">
                <span>By Animesh Bhattacharjee</span>
                <span>•</span>
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <time className="text-gray-400 text-sm" dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <div className="md:w-1/3">
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-300">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
