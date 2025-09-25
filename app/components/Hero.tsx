"use client"; // Required for animations

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import framer-motion
import { useState } from 'react';

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '#', label: 'HOME' },
    { href: '#', label: 'ABOUT' },
    { href: '#', label: 'ALL BOOKS' },
    { href: '#', label: 'CONTACT US' },
  ];

  return (
    <section className="relative h-[38vh] sm:h-[65vh] md:h-[85vh] lg:h-[100vh] xl:h-[100vh] flex items-center justify-center overflow-hidden pb-0 mb-0 bg-[radial-gradient(ellipse_at_center_80%,_#8A8A8A_40%,_#F5F5F5_100%)]">
      {/* Navigation Header */}
      <header className="absolute -top-2 left-0 right-0 z-30 px-4 sm:px-6 md:px-8">
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
                <Link href={link.href} className="text-sm font-semibold tracking-wider text-black hover:text-gray-600 transition-colors duration-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0.0, 0.2, 1],
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="md:hidden absolute top-full left-4 right-4 z-50 bg-[#E6E6E6] shadow-2xl border border-gray-300 rounded-2xl overflow-hidden"
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="p-2">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <Link
                        href={link.href}
                        className="block px-6 py-4 text-base font-semibold tracking-wider text-gray-800 hover:text-black hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-xl transition-all duration-300 group text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center justify-center">
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.label}
                          </span>
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </header>

      <div className="relative w-full flex items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-30">
        <motion.h1
          className="absolute inset-0 flex items-center justify-center text-white font-medium select-none pointer-events-none font-anton"
          style={{
            fontSize: 'clamp(80px, 25vw, 450px)',
            lineHeight: '0.8',
          }}
        >
          {/* 
            CHANGE: `viewport={{ once: false }}` makes the animation replay every time it enters the screen.
          */}
          <motion.span
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }} // This makes it replay
            style={{ letterSpacing: '0.05em' }}
          >
            JU
          </motion.span>
          
          <span style={{ letterSpacing: '0.2em', marginLeft: '0.4em' }}></span>
          
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }} // This makes it replay
            style={{ letterSpacing: '0.05em' }}
          >
            DY
          </motion.span>
        </motion.h1>

        {/* 
          CHANGE: `viewport={{ once: false }}` makes the animation replay every time it enters the screen.
        */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: false }} // This makes it replay
          className="relative z-10 w-[300px] h-[400px] sm:w-[400px] sm:h-[533px] md:w-[550px] md:h-[733px] lg:w-[650px] lg:h-[867px] xl:w-[950px] xl:h-[1200px] mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16"
        >
          <Image
            src="/images/judy.png" // Make sure this path is correct
            alt="Portrait of Judy"
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}