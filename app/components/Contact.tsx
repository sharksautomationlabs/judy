"use client"; // Good practice for components with user interaction (links, forms)

import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

// A reusable component for social media icons for cleaner code.
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9D9D9] text-[#575757] transition-opacity hover:opacity-80"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export default function Footer() {
  return (
    <div className="bg-white pt-12 overflow-x-hidden"> 
      <footer className="bg-[#575757] rounded-t-[40px] text-gray-200 font-poppins">
        
        <div className="mx-auto max-w-7xl px-8 py-16 sm:px-12">
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Column 1: Brand & Socials */}
            <div className="space-y-4">
              <h3 className="font-anton text-3xl font-bold uppercase text-white tracking-wider">
                Judith Hobson
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 max-w-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              </p>
              <div className="flex space-x-3 pt-2">
                <SocialIcon href="#" icon={FaInstagram} />
                <SocialIcon href="#" icon={FaTwitter} />
                <SocialIcon href="#" icon={FaFacebookF} />
                <SocialIcon href="#" icon={FaLinkedinIn} />
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Contact Us:
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="h-4 w-4 flex-shrink-0" />
                  <span>434-738-6339</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="h-4 w-4 flex-shrink-0" />
                  <span>jh797985@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>261 Friendship Drive Walstonburg NC 27888</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Message Form */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Leave a Message
              </h4>
              <form className="space-y-4">
                <textarea
                  placeholder="ENTER YOUR MESSAGE"
                  rows={4}
                  className="w-full rounded-2xl border-none bg-[#D9D9D9] p-4 text-sm text-[#575757] placeholder-[#777777] focus:outline-none focus:ring-2 focus:ring-white"
                ></textarea>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#333333] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-black"
                >
                  Enter
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-400/30">
          <div className="mx-auto max-w-7xl px-8 py-5 text-center">
            <p className="text-xs text-gray-400">
              Copyright © 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}