'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import CartSidePanel from './CartSidePanel';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { state, dispatch } = useCart();
  
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT THE AUTHOR' },
    { href: '/books', label: 'ALL BOOKS' },
    { href: '/contact', label: 'CONTACT US' },
  ];

  // Hydration check to prevent SSR/client mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleToggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <header className={`absolute -top-2 left-0 right-0 z-30 px-4 sm:px-6 md:px-8 ${className}`}>
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

        {/* Cart Icon */}
        <button
          onClick={handleToggleCart}
          className="relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0"
          aria-label="Toggle cart"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {isHydrated && state.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {state.items.length}
            </span>
          )}
        </button>

        {/* Mobile Cart Icon */}
        <button
          onClick={handleToggleCart}
          className="md:hidden relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 mr-2"
          aria-label="Toggle cart"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {isHydrated && state.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {state.items.length}
            </span>
          )}
        </button>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0"
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
                      className="block px-6 py-4 text-lg font-semibold tracking-wider text-gray-800 hover:text-black hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-xl transition-all duration-300 group text-center focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0"
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

      {/* Cart Side Panel */}
      <CartSidePanel />
    </header>
  );
}
