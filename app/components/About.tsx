"use client"; // Required for animations

import Image from 'next/image';
import { motion } from 'framer-motion'; // Import framer-motion

export default function About() {
  return (
    // Section Container: Sets the light gray background and ensures full screen height.
    <section className="bg-[#E6E6E6] w-full min-h-[60vh] sm:min-h-screen overflow-x-hidden pb-8 sm:pb-0 md:pb-24">
      
      {/* Top Bar: A static, non-animated bar with the author's name repeated. */}
      <div className="w-full py-3 sm:py-4 border-y border-gray-300">
        <div className="flex items-center justify-around max-w-screen-xl mx-auto px-2 sm:px-4">
          {/* We show a different number of names based on screen size for a clean look */}
          <span className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-black hidden xl:block">JUDITH HOBSON</span>
          <span className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-black hidden lg:block">JUDITH HOBSON</span>
          <span className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-black">JUDITH HOBSON</span>
          <span className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-black hidden sm:block">JUDITH HOBSON</span>
          <span className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-black hidden md:block">JUDITH HOBSON</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-screen-xl mx-auto pt-4 pb-2 sm:py-16 md:py-24 lg:pb-8 px-4 sm:px-6 md:px-8">
        {/* 
          Layout Grid: A 2-column grid on large screens that automatically stacks 
          into a single column on smaller screens. This is a much cleaner approach.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 sm:gap-y-12 lg:gap-y-16 gap-x-8 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase mb-4 sm:mb-6">
              ABOUT ME
            </h2>
            <p className="font-poppins text-sm sm:text-base text-gray-800 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <Image
              src="/images/about.png" // Ensure this path is correct
              alt="Portrait of Judith Hobson"
              width={600}
              height={600}
              className="object-cover w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[600px] lg:h-[600px]"
            />
          </motion.div>
        </div>
      </main>
    </section>
  );
}