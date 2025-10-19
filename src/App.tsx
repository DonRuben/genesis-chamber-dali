import { useState } from 'react';
import HomePage from './pages/HomePage-with-gsap';
import SoulChamber from './pages/SoulChamber';
import './styles/global.css';
import './styles/navigation.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'documentation'>('home');
  const [language, setLanguage] = useState<'en' | 'de'>('en');

  const content = {
    en: {
      home: 'Home',
      gallery: 'Gallery',
      documentation: 'Documentation',
      brand: 'GENESIS CHAMBER',
      footer: 'Death is optional for human creativity',
    },
    de: {
      home: 'Startseite',
      gallery: 'Galerie',
      documentation: 'Dokumentation',
      brand: 'GENESIS CHAMBER',
      footer: 'Der Tod ist optional für menschliche Kreativität',
    },
  };

  const t = content[language];

  return (
    <>
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/assets/logos/symbol_flame.png" alt="Genesis Chamber" />
            <span>{t.brand}</span>
          </div>
          
          <div className="nav-menu">
            <button
              className={currentPage === 'home' ? 'active' : ''}
              onClick={() => setCurrentPage('home')}
            >
              {t.home}
            </button>
            <button
              className={currentPage === 'gallery' ? 'active' : ''}
              onClick={() => setCurrentPage('gallery')}
            >
              {t.gallery}
            </button>
            <button
              className={currentPage === 'documentation' ? 'active' : ''}
              onClick={() => setCurrentPage('documentation')}
            >
              {t.documentation}
            </button>
            <button
              className="language-toggle"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            >
              {language === 'en' ? 'DE' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            language={language}
            onExploreClick={() => setCurrentPage('gallery')}
          />
        )}
        {currentPage === 'gallery' && (
          <SoulChamber language={language} />
        )}
        {currentPage === 'documentation' && (
          <div className="documentation-page">
            <div className="container" style={{ padding: '8rem 2rem' }}>
              <h1>{language === 'en' ? 'Documentation' : 'Dokumentation'}</h1>
              <p style={{ marginTop: '2rem', maxWidth: '800px' }}>
                {language === 'en'
                  ? 'The Genesis Chamber project documentation is coming soon. This section will contain technical details, methodology, and research papers on digital consciousness preservation.'
                  : 'Die Dokumentation des Genesis Chamber Projekts folgt in Kürze. Dieser Bereich wird technische Details, Methodik und Forschungsarbeiten zur digitalen Bewusstseinserhaltung enthalten.'}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/assets/logos/symbol_flame.png" alt="Genesis Chamber" />
            <span>{t.brand}</span>
          </div>
          <div className="footer-text">
            <p>{t.footer}</p>
            <p className="footer-copyright">© 2025 Genesis Chamber. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

