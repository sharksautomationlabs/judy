'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useBookSelection } from '../contexts/BookSelectionContext';

interface BookHeroProps {
  className?: string;
}

// Shopping Cart Icon Component
const ShoppingCartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 mr-2" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
    />
  </svg>
);


export default function BookHero({ className = "" }: BookHeroProps) {
  const { dispatch } = useCart();
  const { state } = useBookSelection();
  const { selectedBook } = state;

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: selectedBook.id,
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedBook.price,
        image: selectedBook.heroImage
      }
    });
    // Also open the cart panel
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <section className={`bg-gray-50 py-16 sm:py-20 md:py-24 lg:py-28 overflow-x-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 items-center">
          
          {/* Left Column: Book Cover with decorative circle */}
          <motion.div 
            className="order-1 lg:order-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            {/* Reduced the size of the container to help pull the entire element left */}
            <div className="relative flex items-center justify-center lg:w-[420px] lg:h-[550px] transform translate-x-16 -translate-y-6">
              
              {/* Decorative circle: Responsive to book dimensions */}
               <div 
                 className="absolute bg-[#575757] rounded-full shadow-lg 
                            w-64 h-64 
                            sm:w-72 sm:h-72 
                            md:w-80 md:h-80 
                            lg:w-96 lg:h-96
                            transform -translate-x-32 sm:-translate-x-36 md:-translate-x-40 lg:-translate-x-44 translate-y-8" 
               />
              
              {/* Book cover container: Individual dimensions for each book */}
              {selectedBook.id === 'book1' ? (
                <div className="relative w-52 h-72 sm:w-64 sm:h-80 md:w-72 md:h-[430px] transform -translate-x-28 -translate-y-2 animate-float" style={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3), 0 15px 30px -8px rgba(0, 0, 0, 0.25)' }}>
                  <Image
                    src={selectedBook.heroImage}
                    alt={`Book Cover - ${selectedBook.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-40 h-56 sm:w-48 sm:h-64 md:w-56 md:h-72 transform -translate-x-28 -translate-y-2 animate-float" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.3), 0 20px 40px -10px rgba(0, 0, 0, 0.25)' }}>
                  <Image
                    src={selectedBook.heroImage}
                    alt={`Book Cover - ${selectedBook.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Book Details (No changes here) */}
          <motion.div 
            className="order-2 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#4A4A4A] uppercase tracking-wide font-bold mb-3 drop-shadow-sm">
              {selectedBook.title}
            </h1>
            
             <p className="font-poppins text-lg sm:text-xl text-[#575757] mb-6 font-bold opacity-80">
               By {selectedBook.author}
             </p>
            
            <p className="font-poppins text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <p className="font-poppins text-lg font-medium text-[#575757]">
                  $ {selectedBook.price.toFixed(2)}
                </p>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex items-center bg-[#575757] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#404040] transition-colors duration-300 font-poppins font-medium text-lg"
              >
                <ShoppingCartIcon />
                Add To Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}