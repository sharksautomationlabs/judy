import Image from 'next/image';

export default function About() {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#e6e6e6' }}>
      {/* Top Navigation Bar - Full Width */}
      <nav 
        role="navigation" 
        aria-label="Author quick links"
        className="w-full bg-transparent relative z-70"
        style={{ height: '56px' }}
      >
        <div className="h-full flex items-center justify-evenly px-6">
          {/* Desktop/Tablet - Show all 5 labels */}
          <div className="hidden md:flex w-full justify-evenly">
            {[1, 2, 3, 4, 5].map((order) => (
              <a
                key={order}
                href="/author"
                className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#111111] opacity-95 hover:-translate-y-0.5 transition-transform duration-160 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                style={{
                  fontFamily: "'Inter', 'Oswald', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#111111',
                  opacity: 0.95
                }}
              >
                JUDITH HOBSON
              </a>
            ))}
          </div>
          
          {/* Mobile - Show single centered label */}
          <div className="flex md:hidden w-full justify-center">
            <a
              href="/author"
              aria-label="Author"
              className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#111111] opacity-95 hover:-translate-y-0.5 transition-transform duration-160 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              style={{
                fontFamily: "'Inter', 'Oswald', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#111111',
                opacity: 0.95
              }}
            >
              JUDITH HOBSON
            </a>
          </div>
        </div>
      </nav>

      {/* Main About Me Section - TRULY FULL WIDTH */}
      <main className="w-full py-20 lg:py-32">
        {/* Desktop Layout - Two Column with NO horizontal padding */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:min-h-[80vh]">
          {/* Left Column - Text starts at far left edge */}
          <div className="pl-8 lg:pl-16 xl:pl-24">
            <h2 
              className="text-8xl lg:text-9xl xl:text-[10rem] font-extrabold text-black uppercase mb-8 leading-none"
              style={{ 
                fontFamily: "'Bebas Neue', 'Oswald', system-ui, sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#000000',
                letterSpacing: '-0.02em'
              }}
            >
              ABOUT ME
            </h2>
            <p 
              className="text-lg xl:text-xl leading-relaxed max-w-2xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#333333'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Right Column - Image flush against right edge */}
          <div className="flex justify-end">
            <div 
              className="rounded-full overflow-hidden"
              style={{
                width: '400px',
                height: '400px',
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
              }}
            >
              <Image
                src="/images/judy.png"
                alt="Author portrait"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Tablet Layout - Stacked */}
        <div className="hidden md:block lg:hidden">
          <div className="text-center space-y-12 px-8">
            <h2 
              className="text-6xl md:text-7xl font-extrabold text-black uppercase"
              style={{ 
                fontFamily: "'Bebas Neue', 'Oswald', system-ui, sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#000000',
                letterSpacing: '-0.02em'
              }}
            >
              ABOUT ME
            </h2>
            <div className="flex justify-center">
              <div 
                className="rounded-full overflow-hidden"
                style={{
                  width: '300px',
                  height: '300px',
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                }}
              >
                <Image
                  src="/images/judy.png"
                  alt="Author portrait"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p 
              className="text-base leading-relaxed max-w-3xl mx-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#333333'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="block md:hidden">
          <div className="text-center space-y-8 px-6">
            <h2 
              className="text-4xl font-extrabold text-black uppercase"
              style={{ 
                fontFamily: "'Bebas Neue', 'Oswald', system-ui, sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#000000',
                letterSpacing: '-0.02em'
              }}
            >
              ABOUT ME
            </h2>
            <div className="flex justify-center">
              <div 
                className="rounded-full overflow-hidden"
                style={{
                  width: '250px',
                  height: '250px',
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                }}
              >
                <Image
                  src="/images/judy.png"
                  alt="Author portrait"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#333333'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}