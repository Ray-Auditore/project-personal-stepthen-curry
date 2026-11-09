import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor, ScrollProgressBar } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Biodata } from './components/Biodata';
import { Career } from './components/Career';
import { Teams, Teammates } from './components/Teams';
import { Shoes } from './components/Shoes';
import { Footer } from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-50">
      <CustomCursor />
      <ScrollProgressBar />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <Biodata />
        <Career />
        <Teams />
        <Teammates />
        <Shoes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
