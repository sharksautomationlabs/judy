'use client';

import AboutHeader from '../components/AboutHeader';
import AboutAbout from '../components/AboutAbout';
import PublishingPlatforms from '../components/PublishingPlatforms';
import Contact from '../components/Contact';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <AboutHeader />
      <div className="pt-16 sm:pt-20 md:pt-24">
        <AboutAbout />
        <PublishingPlatforms />
      </div>
      <Contact />
    </div>
  );
}
