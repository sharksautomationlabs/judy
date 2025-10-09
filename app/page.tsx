import Hero from './components/Hero';
import About from './components/About';
import Books from './components/Books';
import Contact from './components/Contact';
import BookAbout from './components/BookAbout';
import BookAbout2 from './components/BookAbout2';
import BookHands from './components/BookHands';
import BookHands2 from './components/BookHands2';
import { BookSelectionProvider } from './contexts/BookSelectionContext';

export default function Home() {
  return (
    <BookSelectionProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Hero />
        <main className="bg-white">
          <About />
          <Books />
          <BookAbout />
        </main>
        <BookHands />
        <BookAbout2 />
        <BookHands2 />
        <Contact />
      </div>
    </BookSelectionProvider>
  );
}





