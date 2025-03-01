import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { BlogPost, getBlogPosts } from '../services/blogService';
import LoadingScreen from '../components/LoadingScreen';
import Background3D from '../components/Background3D';

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getBlogPosts();
        const currentPost = response.data.find(p => p._id === id);
        if (currentPost) {
          setPost(currentPost);
          // Find related posts by matching tags
          const related = response.data
            .filter(p => 
              p._id !== id && // Exclude current post
              p.tags.some(tag => currentPost.tags.includes(tag)) // Match any tag
            )
            .slice(0, 3); // Limit to 3 related posts
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <Background3D />
      <div className="darker-overlay"></div>
      <div className="grid-background opacity-20">
        <div className="purple-glow -z-30 top-0 left-0 w-[800px] h-[800px] opacity-70"></div>
        <div className="purple-glow -z-30 bottom-0 right-0 w-[800px] h-[800px] opacity-70"></div>
      </div>
      <div className="gradient-overlay opacity-80 -z-20"></div>
      <div className="vignette opacity-80 -z-10"></div>

      <div className="relative z-10 container mx-auto px-8 py-20 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Blog</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
              {post.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm">
              {post.readTime}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
            {post.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="text-sm text-gray-400 hover:text-purple-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative h-[400px] mb-12 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <article className="prose prose-invert prose-purple max-w-none mb-16">
          {/* Custom styles for code blocks */}
          <style>
            {`
              .prose pre {
                background-color: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(168, 85, 247, 0.2);
                border-radius: 0.5rem;
                padding: 1.25rem;
                margin: 1.5rem 0;
              }
              .prose code {
                color: #e9d5ff;
                background-color: rgba(168, 85, 247, 0.1);
                padding: 0.2em 0.4em;
                border-radius: 0.25rem;
                font-size: 0.875em;
              }
              .prose pre code {
                background-color: transparent;
                padding: 0;
                color: #e5e7eb;
                font-size: 0.875em;
                line-height: 1.7142857;
              }
              .prose h2 {
                color: #e9d5ff;
                margin-top: 2.5rem;
                margin-bottom: 1.5rem;
              }
              .prose h3 {
                color: #e9d5ff;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .prose p {
                color: #d1d5db;
                margin-top: 1.25rem;
                margin-bottom: 1.25rem;
              }
              .prose ul {
                color: #d1d5db;
                margin-top: 1.25rem;
                margin-bottom: 1.25rem;
              }
              .prose li {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              }
              .prose strong {
                color: #e9d5ff;
              }
              .prose a {
                color: #a855f7;
                text-decoration: none;
              }
              .prose a:hover {
                text-decoration: underline;
              }
            `}
          </style>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: post.content
            }} 
          />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-purple-400/20 pt-12">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  to={`/blog/${relatedPost._id}`}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-200 group-hover:text-purple-300 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex gap-2">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
