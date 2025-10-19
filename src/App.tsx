import { useState } from 'react';
import './styles/global.css';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'de'>('en');

  return (
    <div className="app" style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>GENESIS CHAMBER</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        {language === 'en' ? 'Testing basic rendering...' : 'Teste grundlegendes Rendering...'}
      </p>
      <button 
        onClick={() => setLanguage(prev => prev === 'en' ? 'de' : 'en')}
        style={{ 
          padding: '1rem 2rem', 
          fontSize: '1rem', 
          background: '#ff6b35', 
          border: 'none', 
          color: '#fff',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Switch to {language === 'en' ? 'DE' : 'EN'}
      </button>
      <div style={{ marginTop: '2rem' }}>
        <p>If you can see this, React is rendering correctly.</p>
        <p>The issue is likely with Lenis smooth scroll or GSAP configuration.</p>
      </div>
    </div>
  );
}

