import Link from 'next/link';

export default function Navigation() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      
      {/* Main Header */}
      <header 
        id="main-header"
        role="banner"
        className="relative sticky top-0 z-50 h-24 md:h-20 lg:h-24 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(240,240,241,0.9),rgba(220,220,220,0.85))]"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,241,0.9) 30%, rgba(220,220,220,0.85) 100%),
            radial-gradient(ellipse at 50% 70%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 100%)
          `,
          backgroundColor: '#e9e9ea'
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link 
              href="/" 
              aria-label="Homepage"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-[0.02em] uppercase hover:opacity-80 transition-opacity duration-200"
              style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
            >
              LOGO
            </Link>
            
            {/* Desktop Navigation */}
            <nav 
              role="navigation" 
              aria-label="Primary navigation"
              className="hidden md:flex items-center space-x-7"
            >
              <Link 
                href="/" 
                className="text-sm font-semibold uppercase tracking-[0.12em] text-[#333333] hover:text-black hover:-translate-y-0.5 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-3"
                style={{ fontFamily: "'Inter', system-ui" }}
                aria-current="page"
              >
                HOME
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-semibold uppercase tracking-[0.12em] text-[#333333] hover:text-black hover:-translate-y-0.5 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-3"
                style={{ fontFamily: "'Inter', system-ui" }}
              >
                ABOUT THE AUTHOR
              </Link>
              <Link 
                href="/books" 
                className="text-sm font-semibold uppercase tracking-[0.12em] text-[#333333] hover:text-black hover:-translate-y-0.5 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-3"
                style={{ fontFamily: "'Inter', system-ui" }}
              >
                ALL BOOKS
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-semibold uppercase tracking-[0.12em] text-[#333333] hover:text-black hover:-translate-y-0.5 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-3"
                style={{ fontFamily: "'Inter', system-ui" }}
              >
                CONTACT US
              </Link>
            </nav>
            
            {/* Mobile Hamburger Menu */}
            <button 
              aria-controls="mobile-nav-drawer" 
              aria-expanded="false" 
              aria-label="Open navigation menu"
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-3 rounded"
            >
              <span className="w-6 h-0.5 bg-black transition-all duration-320 ease-[cubic-bezier(0.22,1,0.36,1)]"></span>
              <span className="w-6 h-0.5 bg-black transition-all duration-320 ease-[cubic-bezier(0.22,1,0.36,1)]"></span>
              <span className="w-6 h-0.5 bg-black transition-all duration-320 ease-[cubic-bezier(0.22,1,0.36,1)]"></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Drawer */}
      <div 
        id="mobile-nav-drawer" 
        className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-out z-50"
        style={{ display: 'none' }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-bold">Menu</span>
            <button 
              aria-label="Close navigation menu"
              className="w-8 h-8 flex items-center justify-center"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-base font-semibold uppercase tracking-wider text-black py-2"
              aria-current="page"
            >
              HOME
            </Link>
            <Link 
              href="/about" 
              className="text-base font-semibold uppercase tracking-wider text-black py-2"
            >
              ABOUT THE AUTHOR
            </Link>
            <Link 
              href="/books" 
              className="text-base font-semibold uppercase tracking-wider text-black py-2"
            >
              ALL BOOKS
            </Link>
            <Link 
              href="/contact" 
              className="text-base font-semibold uppercase tracking-wider text-black py-2"
            >
              CONTACT US
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
