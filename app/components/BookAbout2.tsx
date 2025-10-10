'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBookSelection } from '../contexts/BookSelectionContext';

interface BookAbout2Props {
  className?: string;
}

export default function BookAbout2({ className = "" }: BookAbout2Props) {
  const { state } = useBookSelection();
  const { availableBooks } = state;
  
  // Force book 2 to be displayed
  const book2 = availableBooks.find(book => book.id === 'book2') || availableBooks[1];

  return (
    // 1. Reduced vertical padding (py-*) for a shorter section height
    <section 
      className={`bg-[#DCDCDC] py-12 sm:py-16 md:py-20 lg:py-24 relative bg-cover bg-center overflow-hidden overflow-x-hidden ${className}`} 
      style={{ backgroundImage: 'url(/images/about-book.svg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Text Container - No changes needed here */}
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          <div className="space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white uppercase font-bold drop-shadow-md">
              ABOUT THE BOOK
            </h2>
          
            <p className="font-poppins text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {book2.description}
            </p>
          </div>
        </motion.div>

        {/* Book Image Container - Moved more to the right */}
        <motion.div 
          className="hidden lg:flex absolute top-0 h-full items-center -right-20"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: false }}
        >
          <div className={`relative transform rotate-6 drop-shadow-xl animate-float ${
            book2.id === 'book1' 
              ? 'w-[600px] h-[600px]' 
              : 'w-[500px] h-[500px]'
          }`}>
            <Image
              src={book2.aboutImage}
              alt={`3D view of the book ${book2.title}`}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Fallback for mobile - No changes needed here */}
      <motion.div 
        className="lg:hidden flex justify-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className={`relative transform rotate-6 drop-shadow-xl animate-float ${
          book2.id === 'book1' 
            ? 'w-80 h-80' 
            : 'w-64 h-64'
        }`}>
          <Image
            src={book2.aboutImage}
            alt={`3D view of the book ${book2.title}`}
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

    </section>
  );
}
