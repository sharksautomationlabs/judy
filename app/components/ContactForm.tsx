'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
     <section className="bg-white pt-24 pb-8 sm:pt-28 sm:pb-8 md:pt-32 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Hand Image */}
          <motion.div 
            className="order-1 lg:order-1 flex justify-start lg:justify-start -ml-16 lg:-ml-42"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <div className="relative w-[640px] h-[768px] sm:w-[768px] sm:h-[1000px]">
              <Image
                src="/images/hand-left.png"
                alt="Hand reaching out"
                fill
                className="object-contain animate-float"
              />
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="order-2 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
             <div className="bg-[#E6E6E6] p-8 rounded-2xl relative overflow-hidden">
               {/* Background SVG */}
               <div className="absolute inset-0 opacity-10">
                 <Image
                   src="/images/about-book.svg"
                   alt="Book background"
                   fill
                   className="object-cover"
                 />
               </div>
               <div className="relative z-10">
                 <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl font-bold text-black uppercase mb-6">
                   Get In Touch
                 </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className={`w-full h-12 px-4 py-3 bg-white border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`w-full h-12 px-4 py-3 bg-white border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className={`w-full h-12 px-4 py-3 bg-white border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    rows={5}
                    className={`w-full px-4 py-3 bg-white border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                 <button
                   type="submit"
                   className="w-full bg-[#535353] text-white py-3 px-6 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors text-lg"
                 >
                   Send Message
                 </button>
               </form>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
