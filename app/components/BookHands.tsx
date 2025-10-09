'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBookSelection } from '../contexts/BookSelectionContext';

interface BookHandsProps {
  className?: string;
}

export default function BookHands({ className = "" }: BookHandsProps) {
  const { state } = useBookSelection();
  const { selectedBook } = state;

  return (
    // The parent container remains the same, providing the positioning context
    <div className={`relative h-64 sm:h-80 lg:h-96 bg-white ${className}`}>
      
        {/* Left Hand (Holding Book) - Conditional positioning based on book */}
        <motion.div
          className={`absolute z-20 left-0 w-[88px] h-[440px] sm:w-[440px] sm:h-[572px] md:w-[572px] md:h-[704px] lg:w-[704px] lg:h-[880px] ${
            selectedBook.id === 'book1' 
              ? '-bottom-55' 
              : '-bottom-65'
          }`}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }}
      >
        <Image
          src={selectedBook.handsImage} 
          alt={`Hand holding the book '${selectedBook.title}'`}
          fill
          className="object-contain drop-shadow-xl animate-book-hinge-left"
        />
      </motion.div>

        {/* Right Hand (Reaching) - Larger size for both books */}
        <motion.div
          className="absolute z-20 -bottom-50 right-0 w-[120px] h-[450px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: false }}
      >
        <Image
          src="/images/hand right.png"
          alt="Hand reaching for the book"
          fill
          className="object-contain drop-shadow-xl animate-book-hinge-right"
        />
      </motion.div>

    </div>
  );
}