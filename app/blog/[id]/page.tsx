'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Contact from '../../components/Contact';
import { motion } from 'framer-motion';
import { BlogPost } from '../../lib/blogData';

export default function BlogPostPage() {
  const params = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlogPost(params.id as string);
    }
  }, [params.id]);

  const fetchBlogPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      
      if (response.ok) {
        const post = await response.json();
        setBlogPost(post);
      } else {
        setBlogPost(null);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setBlogPost(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Header />
        <div className="pt-16 sm:pt-20 md:pt-24">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 font-poppins text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Header />
        <div className="pt-16 sm:pt-20 md:pt-24">
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto"
            >
              <h1 className="font-anton text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
              <p className="font-poppins text-xl text-gray-600 mb-8">
                The blog post you&apos;re looking for doesn&apos;t exist or may have been removed.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-black text-white font-poppins font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-16 sm:pt-20 md:pt-24">
        {/* Blog Post Hero */}
        <section className="bg-[#E6E6E6] py-16 sm:py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase mb-6">
                {blogPost.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-gray-600 mb-6">
                <span className="font-poppins">
                  By {blogPost.author}
                </span>
                <span className="font-poppins">
                  {formatDate(blogPost.publishedAt)}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-poppins rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Post Content */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
            >
              {/* Featured Image - Left Side */}
              {blogPost.featuredImage && (
                <div className="order-2 lg:order-1">
                  <div className="sticky top-8">
                    <img
                      src={blogPost.featuredImage}
                      alt={blogPost.title}
                      className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto lg:mx-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Blog Content - Right Side */}
              <div className={`order-1 lg:order-2 ${blogPost.featuredImage ? 'lg:pl-8' : ''}`}>
                <article className="prose prose-lg max-w-none">
                  <div className="font-poppins text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {blogPost.content}
                  </div>
                </article>

                {/* Back to Blog */}
                <div className="mt-12">
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-black text-white font-poppins font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Contact />
    </div>
  );
}
