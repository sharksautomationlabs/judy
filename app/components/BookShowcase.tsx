'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BookShowcaseProps {
  className?: string;
}

export default function BookShowcase({ className = "" }: BookShowcaseProps) {
  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-[#E6E6E6] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-4xl h-96 sm:h-[500px] md:h-[600px] shadow-2xl rounded-lg overflow-hidden animate-float">
            <Image
              src="/images/book1.png"
              alt="Book showcase"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
