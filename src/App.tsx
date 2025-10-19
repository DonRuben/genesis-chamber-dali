import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomePage from './pages/HomePage';
import SoulChamber from './pages/SoulChamber';
import './styles/global.css';
import './styles/navigation.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -80 });
      setActiveSection(sectionId);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'de' : 'en');
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/assets/logos/symbol_flame.png" alt="Genesis Chamber" />
            <span>GENESIS CHAMBER</span>
          </div>
          
          <div className="nav-links">
            <button 
              onClick={() => scrollToSection('home')}
              className={activeSection === 'home' ? 'active' : ''}
            >
              {language === 'en' ? 'Home' : 'Startseite'}
            </button>
            <button 
              onClick={() => scrollToSection('soul-chamber')}
              className={activeSection === 'soul-chamber' ? 'active' : ''}
            >
              {language === 'en' ? 'Gallery' : 'Galerie'}
            </button>
            <button 
              onClick={() => scrollToSection('documentation')}
              className={activeSection === 'documentation' ? 'active' : ''}
            >
              {language === 'en' ? 'Documentation' : 'Dokumentation'}
            </button>
            <button 
              onClick={toggleLanguage}
              className="language-toggle"
            >
              {language === 'en' ? 'DE' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section id="home">
          <HomePage language={language} onExploreClick={() => scrollToSection('soul-chamber')} />
        </section>
        
        <section id="soul-chamber">
          <SoulChamber language={language} />
        </section>
        
        <section id="documentation" className="documentation-section">
          <div className="documentation-content">
            <h2>{language === 'en' ? 'Documentation' : 'Dokumentation'}</h2>
            <p>{language === 'en' 
              ? 'Complete Genesis Chamber documentation coming soon...' 
              : 'Vollständige Genesis Chamber Dokumentation folgt in Kürze...'}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <img src="/assets/logos/symbol_flame.png" alt="Genesis Chamber" className="footer-logo" />
          <p>
            {language === 'en' 
              ? 'Where death ends, Genesis begins' 
              : 'Wo der Tod endet, beginnt Genesis'}
          </p>
          <p className="footer-copyright">
            © 2025 OmniPresent Group | Genesis Chamber Project
          </p>
        </div>
      </footer>
    </div>
  );
}

