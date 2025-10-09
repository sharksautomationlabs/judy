'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroContentProps {
  className?: string;
}

export default function HeroContent({ className = "" }: HeroContentProps) {
  return (
    <div className={`relative w-full flex items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-30 ${className}`}>
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
          src="/images/judy.png"
          alt="Portrait of Judy"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
