'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';
import { BlogPost } from '../lib/blogData';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Judith Hobson',
    featuredImage: '',
    tags: ''
  });

  useEffect(() => {
    fetchBlogPosts();
    // Check admin status from localStorage
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const posts = await response.json();
        setBlogPosts(posts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      if (editingPost) {
        // Update existing post
        const response = await fetch(`/api/blog/${editingPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer judith2024`
          },
          body: JSON.stringify({
            ...formData,
            tags: tagsArray
          }),
        });

        if (response.ok) {
          const updatedPost = await response.json();
          setBlogPosts(blogPosts.map(post => 
            post.id === editingPost.id ? updatedPost : post
          ));
          resetForm();
          setShowForm(false);
          alert('Blog post updated successfully!');
        } else {
          alert('Failed to update blog post. Please try again.');
        }
      } else {
        // Create new post
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer judith2024`
          },
          body: JSON.stringify({
            ...formData,
            tags: tagsArray
          }),
        });

        if (response.ok) {
          const newPost = await response.json();
          setBlogPosts([newPost, ...blogPosts]);
          resetForm();
          setShowForm(false);
          alert('Blog post created successfully!');
        } else {
          alert('Failed to create blog post. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('An error occurred while saving the blog post. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: 'Judith Hobson',
      featuredImage: '',
      tags: ''
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      featuredImage: post.featuredImage || '',
      tags: post.tags.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blog/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer judith2024`
          },
        });

        if (response.ok) {
          setBlogPosts(blogPosts.filter(post => post.id !== postId));
          alert('Blog post deleted successfully!');
        } else {
          alert('Failed to delete blog post. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('An error occurred while deleting the blog post. Please try again.');
      }
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
            <p className="mt-4 font-poppins text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-16 sm:pt-20 md:pt-24">
        {/* Blog Hero */}
        <section 
          className="bg-[#DCDCDC] py-16 sm:py-20 md:py-24 relative bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: 'url(/images/about-book.svg)' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase mb-4 sm:mb-6 drop-shadow-md">
                BLOG
              </h1>
              <p className="font-poppins text-lg sm:text-xl text-white max-w-2xl mx-auto">
                Insights, stories, and thoughts from Judith Hobson
              </p>
              {isAdmin && (
                <div className="mt-6 flex space-x-4 justify-center">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#575757] hover:bg-[#404040] text-white font-poppins font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                  >
                    New Blog
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-poppins font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Blog Post Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <h2 className="font-anton text-2xl font-bold text-black uppercase mb-6">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Brief description of the post..."
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => { resetForm(); setShowForm(false); }}
                    className="px-6 py-3 text-gray-600 font-poppins font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white font-poppins font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Blog Posts */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {post.featuredImage && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-poppins text-gray-500">
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="text-sm font-poppins text-gray-500">
                          By {post.author}
                        </span>
                      </div>
                      <h2 className="font-anton text-xl sm:text-2xl font-bold text-black uppercase mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="font-poppins text-gray-700 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-poppins rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <a
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center px-4 py-2 bg-black text-white font-poppins font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
                        >
                          Read More
                        </a>
                        {isAdmin && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="px-3 py-1 text-blue-600 font-poppins text-sm hover:bg-blue-50 rounded transition-colors duration-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="px-3 py-1 text-red-600 font-poppins text-sm hover:bg-red-50 rounded transition-colors duration-300"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-poppins text-gray-600 text-lg">
                  No blog posts yet.
                </p>
                {isAdmin && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 bg-[#575757] hover:bg-[#404040] text-white font-poppins font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                  >
                    Create Your First Post
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      <Contact />
    </div>
  );
}
