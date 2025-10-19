import { useState } from 'react';
import './styles/global.css';
import './styles/navigation.css';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'de'>('en');

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
            <button className="active">
              {language === 'en' ? 'Home' : 'Startseite'}
            </button>
            <button>
              {language === 'en' ? 'Gallery' : 'Galerie'}
            </button>
            <button>
              {language === 'en' ? 'Documentation' : 'Dokumentation'}
            </button>
            <button 
              onClick={() => setLanguage(prev => prev === 'en' ? 'de' : 'en')}
              className="language-toggle"
            >
              {language === 'en' ? 'DE' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#F27123' }}>
          GENESIS CHAMBER
        </h1>
        <p style={{ fontSize: '2rem', marginBottom: '3rem', color: '#E9E7E4' }}>
          Salvador Dalí: The First Digital Soul
        </p>
        <p style={{ fontSize: '1.2rem', color: '#BFBFBF', maxWidth: '800px', margin: '0 auto' }}>
          {language === 'en' 
            ? 'The Genesis Chamber website is loading. This is a test deployment to verify React is working correctly. Full content will be added once the deployment issue is resolved.' 
            : 'Die Genesis Chamber Website wird geladen. Dies ist eine Test-Bereitstellung, um zu überprüfen, ob React korrekt funktioniert. Der vollständige Inhalt wird hinzugefügt, sobald das Bereitstellungsproblem gelöst ist.'}
        </p>
        <div style={{ marginTop: '3rem', padding: '1rem 2rem', background: '#F27123', color: '#1B1D22', display: 'inline-block', borderRadius: '4px' }}>
          ✓ React is rendering successfully
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer" style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid #5C5C5C' }}>
        <div className="footer-content">
          <img src="/assets/logos/symbol_flame.png" alt="Genesis Chamber" style={{ width: '40px', marginBottom: '1rem' }} />
          <p style={{ color: '#BFBFBF' }}>
            {language === 'en' 
              ? 'Where death ends, Genesis begins' 
              : 'Wo der Tod endet, beginnt Genesis'}
          </p>
          <p style={{ color: '#5C5C5C', marginTop: '1rem' }}>
            Built with Genesis Chamber Soul Simulation Neural Framework Digital
          </p>
        </div>
      </footer>
    </div>
  );
}

