"use client"; // This component is interactive

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

// The book data with three items
const books = [
  {
    title: "An Old Little Lady",
    author: "By Judith Hobson",
    cover: "/images/book1.png"
  },
  {
    title: "You are not the only one",
    author: "By Judith Hobson",
    cover: "/images/book2.png"
  },
  {
    title: "An Old Little Lady",
    author: "By Judith Hobson",
    cover: "/images/book3.png"
  }
];

export default function Books() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'center',
    containScroll: 'trimSnaps'
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateCarouselState();
    emblaApi.on('select', updateCarouselState);
    emblaApi.on('reInit', updateCarouselState);
    emblaApi.on('resize', updateCarouselState);
    return () => {
      emblaApi.off('select', updateCarouselState);
      emblaApi.off('reInit', updateCarouselState);
      emblaApi.off('resize', updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="books" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#EAEAEA]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase mb-8 sm:mb-12 md:mb-16 text-center px-4">
          ALL BOOKS
        </h2>

        <div className="relative w-full">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {books.map((book, index) => (
                // CHANGE: Reduced horizontal padding from px-4 to px-2
                <div 
                  className="relative flex-[0_0_75%] sm:flex-[0_0_55%] md:flex-[0_0_45%] lg:flex-[0_0_35%] px-1" 
                  key={index}
                >
                  <div className={`transform transition-transform duration-500 ease-out w-full ${index === selectedIndex ? 'scale-100 opacity-100' : 'scale-85 opacity-50'}`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-48 h-60 sm:w-56 sm:h-70 md:w-64 md:h-80 rounded-md shadow-xl">
                        <Image
                          src={book.cover}
                          alt={`Cover of the book ${book.title}`}
                          width={256}
                          height={320}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className={`transition-opacity duration-500 mt-4 sm:mt-6 ${index === selectedIndex ? 'opacity-100' : 'opacity-0'}`}>
                        <h3 className="font-poppins text-lg sm:text-xl font-bold text-black">
                          {book.title}
                        </h3>
                        <p className="font-poppins text-sm sm:text-base text-gray-600">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollPrev} 
            disabled={!canScrollPrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition-all z-10 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button 
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition-all z-10 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}