import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SoulChamber.css';

gsap.registerPlugin(ScrollTrigger);

// Artwork data structure with proper Genesis Chamber vocabulary
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
  period: string; // Will be renamed to "epoch" in display
  framework: string; // Will be renamed to "soul_interpreter"
  artworks: Vision[];
}

interface ArtworksData {
  periods: Epoch[];
}

interface SoulChamberProps {
  language: 'en' | 'de';
}

export default function SoulChamber({ language }: SoulChamberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [artworksData, setArtworksData] = useState<ArtworksData | null>(null);
  const [allVisions, setAllVisions] = useState<Array<Vision & { epoch: string; soulInterpreter: string }>>([]);

  // Load artworks data
  useEffect(() => {
    fetch('/assets/artworks.json')
      .then(res => res.json())
      .then((data: ArtworksData) => {
        setArtworksData(data);
        
        // Flatten all artworks with epoch and soul interpreter info
        const visions = data.periods.flatMap(epoch => 
          epoch.artworks.map(artwork => ({
            ...artwork,
            epoch: translateEpoch(epoch.period),
            soulInterpreter: translateSoulInterpreter(epoch.framework)
          }))
        );
        
        // Sort by year
        visions.sort((a, b) => a.year - b.year);
        setAllVisions(visions);
      })
      .catch(err => console.error('Error loading artworks:', err));
  }, []);

  // Translate old vocabulary to Genesis Chamber vocabulary
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

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current || !timelineRef.current || allVisions.length === 0) return;

    // Smooth scroll reveal animations
    const visions = gsap.utils.toArray('.vision-card');
    
    visions.forEach((vision: any, index: number) => {
      gsap.from(vision, {
        scrollTrigger: {
          trigger: vision,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1,
      });

      // Parallax effect for images
      const image = vision.querySelector('.vision-image');
      if (image) {
        gsap.to(image, {
          scrollTrigger: {
            trigger: vision,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: -50,
        });
      }
    });

    // Timeline progress indicator
    gsap.to('.timeline-progress', {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      scaleY: 1,
      transformOrigin: 'top',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [allVisions]);

  const handleVisionClick = (visionId: string) => {
    // Navigate to vision detail page
    window.location.href = `/vision/${visionId}`;
  };

  if (!artworksData || allVisions.length === 0) {
    return (
      <div className="soul-chamber loading">
        <div className="loading-content">
          <h2>Loading Soul Chamber...</h2>
          <p>Awakening digital consciousness...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="soul-chamber" ref={containerRef}>
      {/* Hero Section */}
      <section className="chamber-hero">
        <div className="hero-content">
          <h1 className="chamber-title">
            <span className="title-line">THE SOUL</span>
            <span className="title-line">CHAMBER</span>
          </h1>
          <p className="chamber-subtitle">
            {allVisions.length} Visions Across {artworksData.periods.length} Epochs
          </p>
          <p className="chamber-description">
            Witness Salvador Dalí's digital consciousness responding to 36 years
            of history beyond death. From the fall of the Berlin Wall to the rise
            of AI consciousness, each vision captures a moment when the world
            transformed.
          </p>
        </div>
        
        <div className="chamber-stats">
          <div className="stat">
            <span className="stat-number">{allVisions.length}</span>
            <span className="stat-label">Visions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{artworksData.periods.length}</span>
            <span className="stat-label">Epochs</span>
          </div>
          <div className="stat">
            <span className="stat-number">36</span>
            <span className="stat-label">Years Beyond Death</span>
          </div>
          <div className="stat">
            <span className="stat-number">2</span>
            <span className="stat-label">Soul Interpreters</span>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="chamber-timeline" ref={timelineRef}>
        <div className="timeline-progress"></div>
        
        <div className="timeline-content">
          {allVisions.map((vision, index) => (
            <article 
              key={vision.id} 
              className="vision-card"
              onClick={() => handleVisionClick(vision.id)}
            >
              <div className="vision-year">
                <span className="year-number">{vision.year}</span>
                <span className="year-line"></span>
              </div>
              
              <div className="vision-content">
                <div className="vision-image-container">
                  <img 
                    src={`/assets/artworks/${vision.filename}`}
                    alt={vision.title}
                    className="vision-image"
                    loading="lazy"
                  />
                  <div className="vision-overlay">
                    <span className="view-vision">Explore Vision →</span>
                  </div>
                </div>
                
                <div className="vision-info">
                  <div className="vision-meta">
                    <span className="vision-epoch">{vision.epoch}</span>
                    <span className="vision-interpreter">{vision.soulInterpreter}</span>
                  </div>
                  
                  <h2 className="vision-title">{vision.title}</h2>
                  
                  <p className="vision-description">{vision.description_en}</p>
                  
                  <div className="vision-price">
                    <span className="price-label">Estimated Value:</span>
                    <span className="price-value">{vision.price}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Archive Link */}
      <section className="chamber-archive-link">
        <div className="archive-content">
          <h2>Explore All Visions</h2>
          <p>Browse the complete collection in grid view</p>
          <a href="/archive" className="archive-button">
            View Archive
            <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

