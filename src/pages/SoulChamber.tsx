import { useState, useEffect } from 'react';
import './SoulChamber.css';

// Artwork data structure
interface Vision {
  id: string;
  title: string;
  year: number;
  price: string;
  filename: string;
  description_en: string;
  description_de: string;
}

interface Epoch {
  period: string;
  framework: string;
  artworks: Vision[];
}

interface ArtworksData {
  periods: Epoch[];
}

interface SoulChamberProps {
  language: 'en' | 'de';
}

export default function SoulChamber({ language }: SoulChamberProps) {
  const [artworksData, setArtworksData] = useState<ArtworksData | null>(null);
  const [allVisions, setAllVisions] = useState<Array<Vision & { epoch: string; soulInterpreter: string }>>([]);
  const [selectedVision, setSelectedVision] = useState<(Vision & { epoch: string; soulInterpreter: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load artworks data
  useEffect(() => {
    fetch('/assets/artworks.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load artworks');
        return res.json();
      })
      .then((data: ArtworksData) => {
        setArtworksData(data);
        
        const visions = data.periods.flatMap(epoch => 
          epoch.artworks.map(artwork => ({
            ...artwork,
            epoch: translateEpoch(epoch.period),
            soulInterpreter: translateSoulInterpreter(epoch.framework)
          }))
        );
        
        visions.sort((a, b) => a.year - b.year);
        setAllVisions(visions);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading artworks:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const translateEpoch = (period: string): string => {
    const translations: Record<string, string> = {
      'Fractal Surrealism': 'Fractal Surrealism Era',
      'Digital Mysticism': 'Digital Mysticism Era',
      'Social Network Dreams': 'Social Network Dreams Era',
      'AI Consciousness': 'AI Consciousness Era',
      'Historical Masterworks': 'Historical Visions',
      'Hypothetical Masterworks': 'Hypothetical Visions'
    };
    return translations[period] || period;
  };

  const translateSoulInterpreter = (framework: string): string => {
    const translations: Record<string, string> = {
      'Nano Banana': 'Soul Vision',
      'Spectacular Framework': 'Spectacular Consciousness',
      'Conceptual': 'Conceptual Vision'
    };
    return translations[framework] || framework;
  };

  if (isLoading) {
    return (
      <div className="soul-chamber loading">
        <div className="loading-content">
          <h2>Loading Soul Chamber...</h2>
          <p>Awakening consciousness...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="soul-chamber error">
        <div className="error-content">
          <h2>Error Loading Gallery</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="soul-chamber">
      {/* Header */}
      <header className="chamber-header">
        <div className="header-content">
          <h1 className="chamber-title">
            <span className="bracket">[</span>
            <span className="soul">SOUL</span>
            <span className="bracket">]</span>
            <span className="chamber-text">CHAMBER</span>
          </h1>
          <p className="chamber-subtitle">
            {language === 'en' 
              ? '64 Visions Across 11 Epochs • The Persistence of Consciousness'
              : '64 Visionen über 11 Epochen • Die Beständigkeit des Bewusstseins'}
          </p>
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="visions-grid">
        {allVisions.map((vision) => (
          <div 
            key={vision.id} 
            className="vision-card"
            onClick={() => setSelectedVision(vision)}
          >
            <div className="vision-image-container">
              <img 
                src={`/assets/artworks/${vision.filename}`}
                alt={vision.title}
                className="vision-image"
                loading="lazy"
              />
              <div className="vision-overlay">
                <div className="vision-year">{vision.year}</div>
                <div className="vision-epoch">{vision.epoch}</div>
                <div className="vision-title">{vision.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedVision && (
        <div className="lightbox" onClick={() => setSelectedVision(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedVision(null)}>
              ✕
            </button>
            <div className="lightbox-image-container">
              <img 
                src={`/assets/artworks/${selectedVision.filename}`}
                alt={selectedVision.title}
                className="lightbox-image"
              />
            </div>
            <div className="lightbox-info">
              <h2 className="lightbox-title">{selectedVision.title}</h2>
              <div className="lightbox-meta">
                <span className="meta-item">{selectedVision.year}</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">{selectedVision.epoch}</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">{selectedVision.soulInterpreter}</span>
              </div>
              <p className="lightbox-description">
                {language === 'en' ? selectedVision.description_en : selectedVision.description_de}
              </p>
              <div className="lightbox-price">{selectedVision.price}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

