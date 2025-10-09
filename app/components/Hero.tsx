'use client';

import Header from './Header';
import HeroContent from './HeroContent';

interface HeroProps {
  className?: string;
}

export default function Hero({ className = "" }: HeroProps) {
  return (
    <section className={`relative h-[38vh] sm:h-[65vh] md:h-[85vh] lg:h-[100vh] xl:h-[100vh] flex items-center justify-center overflow-hidden pb-0 mb-0 bg-[radial-gradient(ellipse_at_center_80%,_#8A8A8A_40%,_#F5F5F5_100%)] ${className}`}>
      <Header />
      <HeroContent />
    </section>
  );
}