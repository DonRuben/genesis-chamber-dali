import './SoulChamber.css';

interface SoulChamberProps {
  language: 'en' | 'de';
}

export default function SoulChamber({ language }: SoulChamberProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1B1D22',
      color: 'white',
      padding: '8rem 2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#F27123', marginBottom: '2rem' }}>
        [SOUL] CHAMBER
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        {language === 'en' 
          ? 'Gallery is loading... Testing React routing'
          : 'Galerie lädt... React-Routing wird getestet'}
      </p>
      <p style={{ fontSize: '1rem', opacity: 0.7 }}>
        If you can see this text, React routing is working!
      </p>
    </div>
  );
}

