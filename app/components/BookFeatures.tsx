'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBookSelection } from '../contexts/BookSelectionContext';

interface BookFeaturesProps {
  className?: string;
}

export default function BookFeatures({ className = "" }: BookFeaturesProps) {
  const { state } = useBookSelection();
  const { selectedBook } = state;
  
  const getFeatures = (bookId: string) => {
    if (bookId === 'book1') {
      return [
        "Explores themes of healing, recovery, and finding hope after trauma.",
        "Addresses the challenging topic of abuse and its long-term impact on survivors.",
        "Shows the importance of counseling and professional support in the healing process.",
        "Demonstrates resilience and the power of taking life one day at a time.",
        "Provides comfort to those who have faced similar struggles and feel alone."
      ];
    } else if (bookId === 'book2') {
      return [
        "Celebrates the joy of new beginnings and life transitions in senior years.",
        "Explores the beauty of connecting with nature and wildlife in rural settings.",
        "Shows the importance of making new friends and building community connections.",
        "Addresses the challenges and surprises of adapting to country living.",
        "Demonstrates resilience and adaptability at any stage of life."
      ];
    }
    return [];
  };
  
  const features = getFeatures(selectedBook.id);
  
  const books = [0, 1, 2, 3]; // An array to map over for the stack
  const offsetPerBook = 32;    // How many pixels each book is offset to the right
  const scaleDecrement = 0.08; // How much smaller each book behind the front one gets (8%)

  return (
    <div className={`bg-white pt-20 overflow-x-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div 
          className="relative z-10 -mt-20 bg-[#575757] rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 items-center">
            
            {/* Left Column: Good Things List */}
            <div>
              <h2 className="font-anton text-5xl sm:text-6xl text-white uppercase font-bold drop-shadow-md mb-8">
                KEY THINGS
              </h2>
              
              <ul className="space-y-5">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                    viewport={{ once: false }}
                  >
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2.5 mr-4 flex-shrink-0" />
                    <p className="font-poppins text-base text-gray-300 leading-relaxed">
                      {feature}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Column: Book Stack (Bigger & Right-Fanned) */}
            <motion.div 
              className="flex justify-center lg:justify-start" // Changed to justify-start to give room
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false }}
            >
              {/* 1. Increased container size */}
              <div className="bg-[#8E8E8E] p-6 sm:p-8 rounded-2xl w-full max-w-lg">
                {/* 2. Increased height of the stack area */}
                <div className="relative w-full h-80 sm:h-[420px]">
                  
                  {/* The Corrected Book Stack */}
                  {books.map((book, index) => {
                    const booksInFront = books.length - 1 - index;
                    const scale = 1 - (booksInFront * scaleDecrement);
                    // 3. Changed to a positive translateX to fan to the right
                    const translateX = index * offsetPerBook;

                    return (
                      <div
                        key={index}
                        className="absolute inset-0"
                        style={{
                          // Added transform-origin for a cleaner fanning effect
                          transformOrigin: 'center left',
                          transform: `translateX(${translateX}px) scale(${scale})`,
                          zIndex: index, // Front book (index 3) remains on top
                        }}
                      >
                        <Image
                          src={selectedBook.featuresImage}
                          alt={`A copy of the book '${selectedBook.title}'`}
                          fill
                          className="object-contain animate-float"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}