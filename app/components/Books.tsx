import Image from 'next/image';

export default function Books() {
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

  return (
    <section id="books" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl md:text-5xl font-bold text-black uppercase mb-16 text-center"
          style={{ 
            fontFamily: "'Bebas Neue', 'Oswald', system-ui, sans-serif",
            fontSize: '48px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#000000',
            letterSpacing: '-0.02em'
          }}
        >
          ALL BOOKS
        </h2>
        
        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
            aria-label="Previous books"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
            aria-label="Next books"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Books Carousel */}
          <div className="flex items-center justify-center space-x-8 overflow-hidden">
            {books.map((book, index) => (
              <div key={index} className="flex-shrink-0 text-center">
                {/* Book Cover */}
                <div className="relative mb-6">
                  <div className="w-48 h-64 mx-auto shadow-2xl rounded-lg overflow-hidden">
                    <Image
                      src={book.cover}
                      alt={`${book.title} book cover`}
                      width={192}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Book Title */}
                <h3 
                  className="text-xl font-bold text-black mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#000000'
                  }}
                >
                  {book.title}
                </h3>
                
                {/* Book Author */}
                <p 
                  className="text-gray-700"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#666666'
                  }}
                >
                  {book.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
