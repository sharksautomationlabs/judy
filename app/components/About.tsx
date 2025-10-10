"use client"; // Required for animations

import Image from 'next/image';
import { motion } from 'framer-motion'; // Import framer-motion
import Marquee from 'react-fast-marquee';

export default function About() {
  return (
    // Section Container: Sets the light gray background and ensures full screen height.
    <section className="bg-[#E6E6E6] w-full min-h-[60vh] sm:min-h-screen overflow-x-hidden pb-8 sm:pb-0 md:pb-24">
      
      {/* Top Bar: Animated marquee with the author's name continuously scrolling. */}
      <div className="w-full py-3 sm:py-4 border-y border-gray-300 overflow-hidden">
        <Marquee
          speed={50}
          gradient={false}
          className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-black"
        >
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
          <span className="mx-8">JUDITH HOBSON</span>
        </Marquee>
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
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <p className="font-poppins text-sm sm:text-base text-gray-800 leading-relaxed">
                Judith Hobson is a passionate author and advocate whose writing journey began with a deep desire to help people through their darkest times. For the last 3 years, she has been talking about suicide and healing people with the same problem, using her platform to bring hope and understanding to those who need it most.
              </p>
              
              <p className="font-poppins text-sm sm:text-base text-gray-800 leading-relaxed">
                Her work, including &ldquo;You Are Not The Only One,&rdquo; reflects her commitment to addressing the most challenging aspects of human experience. Through authentic storytelling, Judith creates meaningful connections with readers who have faced abuse, trauma, and life&apos;s greatest struggles.
              </p>
              
              <p className="font-poppins text-sm sm:text-base text-gray-800 leading-relaxed">
                Judith believes in the power of books to transform lives and provide a path to healing. She is dedicated to creating stories that inspire, comfort, and empower her audience, helping them find strength and hope in their journey forward.
              </p>
            </div>
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