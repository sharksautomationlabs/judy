"use client"; // Good practice for components with user interaction (links, forms)

import { 
  FaAmazon,
  FaBookOpen,
  FaShoppingCart,
  FaGoogle
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
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2">
            
            {/* Column 1: Brand & Socials */}
            <div className="space-y-4">
              <h3 className="font-anton text-3xl font-bold uppercase text-white tracking-wider">
                Judith Hobson
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 max-w-xs">
                For the last 3 years, Judith has been talking about suicide and healing people with the same problem. Through her books, she shares powerful stories of recovery, resilience, and hope, helping others find their path to healing and a better tomorrow.
              </p>
              <div className="flex space-x-3 pt-2">
                <SocialIcon href="https://www.amazon.in/Old-Little-Lady-Judith-Hobson/dp/B0FQ2LTH5Y" icon={FaAmazon} />
                <SocialIcon href="https://www.barnesandnoble.com/w/an-old-little-lady-judith-hobson/1148207673" icon={FaBookOpen} />
                <SocialIcon href="https://www.booktopia.com.au/an-old-little-lady-judith-hobson/ebook/9798330262595.html" icon={FaShoppingCart} />
                <SocialIcon href="https://books.google.com.pk/books/about/An_Old_Little_Lady.html?id=_j2R0QEACAAJ&redir_esc=y" icon={FaGoogle} />
              </div>
            </div>

            {/* Column 2: Message Form */}
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