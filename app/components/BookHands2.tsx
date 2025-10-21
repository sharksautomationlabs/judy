'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBookSelection } from '../contexts/BookSelectionContext';

interface BookHands2Props {
  className?: string;
}

export default function BookHands2({ className = "" }: BookHands2Props) {
  const { state } = useBookSelection();
  const { availableBooks } = state;
  
  // Force book 2 to be displayed
  const book2 = availableBooks.find(book => book.id === 'book2') || availableBooks[1];

  return (
    // The parent container remains the same, providing the positioning context
    <div className={`relative h-64 sm:h-80 lg:h-96 bg-white ${className}`}>
      
        {/* Left Hand (Holding Book) - Made bigger and moved more to the left */}
        <motion.div
          // Moved from -bottom-55 to -bottom-65 for lower positioning
          className="absolute z-20 -bottom-55 -left-16 w-[100px] h-[480px] sm:w-[480px] sm:h-[620px] md:w-[620px] md:h-[750px] lg:w-[750px] lg:h-[920px]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }}
      >
        <Image
          src={book2.handsImage} 
          alt={`Hand holding the book '${book2.title}'`}
          fill
          className="object-contain drop-shadow-xl animate-book-hinge-left"
        />
      </motion.div>

        {/* Right Hand (Reaching) - Larger size for book 2 */}
        <motion.div
          className="absolute z-20 -bottom-50 right-0 w-[120px] h-[450px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: false }}
      >
        <Image
          src="/images/hand right2.png"
          alt="Hand reaching for the book"
          fill
          className="object-contain drop-shadow-xl animate-book-hinge-right"
        />
      </motion.div>

    </div>
  );
}
