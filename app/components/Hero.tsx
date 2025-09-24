import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 min-h-screen flex items-center justify-center">
      <div className="relative w-full">
        {/* Large JUDY text with portrait overlay - matching PDF layout */}
        <div className="relative flex items-center justify-center">
          {/* Left side: JU */}
          <span 
            className="text-[20rem] md:text-[24rem] lg:text-[28rem] font-bold text-white leading-none tracking-tight"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            JU
          </span>
          
          {/* Center: Portrait overlapping the text */}
          <div className="relative mx-16 w-[500px] h-[600px] flex items-center justify-center">
            {/* Portrait image - perfectly centered */}
            <div className="z-20 absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/judy.png"
                alt="Judith Hobson Portrait"
                width={500}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* DY text behind the portrait */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span 
                className="text-[20rem] md:text-[24rem] lg:text-[28rem] font-bold text-white leading-none tracking-tight"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                DY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}