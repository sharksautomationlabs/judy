import { Hero, About, Books, Contact } from './components';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <main className="bg-white">
        <About />
        <Books />
      </main>
      <Contact />
    </div>
  );
}
