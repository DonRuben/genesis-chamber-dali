import './styles/global.css';

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem'
    }}>
      <h1 style={{ color: '#F27123', fontSize: '4rem' }}>GENESIS CHAMBER</h1>
      <p style={{ color: '#E9E7E4', fontSize: '1.5rem', textAlign: 'center' }}>
        Salvador Dalí: The First Digital Soul
      </p>
      <p style={{ color: '#BFBFBF', fontSize: '1rem' }}>
        If you can see this, React is working. The issue was with Lenis/GSAP or component imports.
      </p>
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem 2rem',
        background: '#F27123',
        color: '#1B1D22',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Website loading successfully ✓
      </div>
    </div>
  );
}

