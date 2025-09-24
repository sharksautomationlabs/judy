import { Navigation, Hero, About, Books, Contact } from './components';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <main className="bg-white">
        <About />
        <Books />
      </main>

      <Contact />
    </div>
  );
}
