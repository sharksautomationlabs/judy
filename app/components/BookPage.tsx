'use client';

import Image from 'next/image';
import Header from './Header';
import BookHero from './BookHero';
import BookAbout from './BookAbout';
import BookHands from './BookHands';
import BookFeatures from './BookFeatures';
import Contact from './Contact';
import { BookSelectionProvider, useBookSelection } from '../contexts/BookSelectionContext';

interface BookPageProps {
  className?: string;
}

// Book Selection Buttons Component
function BookSelectionButtons() {
  const { state, selectBook } = useBookSelection();

  return (
    <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border">
      <h3 className="font-poppins text-sm font-bold text-gray-700 mb-3">Select Book:</h3>
      <div className="flex flex-col space-y-3">
        {state.availableBooks.map((book) => (
          <button
            key={book.id}
            onClick={() => selectBook(book.id)}
            className={`relative w-16 h-20 rounded-md overflow-hidden transition-all duration-200 ${
              state.selectedBook.id === book.id
                ? 'ring-2 ring-[#575757] shadow-lg'
                : 'hover:shadow-md'
            }`}
          >
            <Image
              src={book.heroImage}
              alt={book.title}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Book Page Content
function BookPageContent({ className = "" }: BookPageProps) {
  return (
    <div className={`bg-white min-h-screen overflow-x-hidden ${className}`}>
      <Header />
      <BookSelectionButtons />
      <BookHero />
      <BookAbout />
      <BookHands />
      <BookFeatures />
      <Contact />
    </div>
  );
}

export default function BookPage({ className = "" }: BookPageProps) {
  return (
    <BookSelectionProvider>
      <BookPageContent className={className} />
    </BookSelectionProvider>
  );
}