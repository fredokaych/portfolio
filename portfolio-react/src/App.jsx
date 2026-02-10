import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import LimeBand from './components/LimeBand';
import Partners from './components/Partners';
import Projects from './components/Projects';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <LimeBand />
        <Partners />
        <Projects />
        <Playground />
        <Contact />

      </main>
      <Footer />
    </>
  );
}
