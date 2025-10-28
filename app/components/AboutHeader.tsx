'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface AboutHeaderProps {
  className?: string;
}

export default function AboutHeader({ className = "" }: AboutHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT THE AUTHOR' },
    { href: '/books', label: 'ALL BOOKS' },
    { href: '/contact', label: 'CONTACT US' },
    { href: '/blog', label: 'BLOGS' }
  ];

  return (
    <header className={`absolute -top-2 left-0 right-0 z-30 px-4 sm:px-6 md:px-8 bg-[#E6E6E6] ${className}`}>
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto" style={{ fontFamily: 'var(--font-poppins)' }}>
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-base font-semibold tracking-wider text-black hover:text-gray-600 transition-colors duration-300 focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0" style={{ outline: 'none', boxShadow: 'none' }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200"
        >
          <ul className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block text-base font-semibold tracking-wider text-black hover:text-gray-600 transition-colors duration-300 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
