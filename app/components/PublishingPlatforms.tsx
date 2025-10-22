'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

interface PublishingPlatformsProps {
  className?: string;
}

export default function PublishingPlatforms({ className = "" }: PublishingPlatformsProps) {
  return (
    <motion.div 
      className={`mt-16 sm:mt-20 md:mt-24 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false }}
    >
      <h3 className="font-anton text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase text-center mb-8 sm:mb-12">
        OUR PUBLISHED BOOKS ARE AVAILABLE ON
      </h3>
      
      {/* Publishing Platforms Marquee */}
      <div className="w-full py-6 sm:py-8 overflow-hidden">
        <Marquee
          speed={40}
          gradient={false}
          className="flex items-center space-x-8"
        >
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/amazon-logo.png"
              alt="Amazon"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/amazon-kindle-logo.png"
              alt="Amazon Kindle"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/apple-books-logo.png"
              alt="Apple Books"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/barnes-noble-logo.png"
              alt="Barnes & Noble"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/kobo-logo.png"
              alt="Kobo"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-16 mx-8">
            <Image
              src="/images/publishing-platforms/Booktopia-logo.png"
              alt="Booktopia"
              width={120}
              height={60}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-16 mx-8">
            <Image
              src="/images/publishing-platforms/indigo-logo.png"
              alt="Indigo"
              width={120}
              height={60}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/Lulu-logo.png"
              alt="Lulu"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/amazon-logo.png"
              alt="Amazon"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/amazon-kindle-logo.png"
              alt="Amazon Kindle"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/apple-books-logo.png"
              alt="Apple Books"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/barnes-noble-logo.png"
              alt="Barnes & Noble"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/kobo-logo.png"
              alt="Kobo"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-16 mx-8">
            <Image
              src="/images/publishing-platforms/Booktopia-logo.png"
              alt="Booktopia"
              width={120}
              height={60}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-16 mx-8">
            <Image
              src="/images/publishing-platforms/indigo-logo.png"
              alt="Indigo"
              width={120}
              height={60}
              className="object-contain h-full w-auto"
            />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-12 mx-8">
            <Image
              src="/images/publishing-platforms/Lulu-logo.png"
              alt="Lulu"
              width={100}
              height={50}
              className="object-contain h-full w-auto"
            />
          </div>
        </Marquee>
      </div>
    </motion.div>
  );
}
