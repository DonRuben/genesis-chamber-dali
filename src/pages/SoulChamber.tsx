import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SoulChamber.css';

gsap.registerPlugin(ScrollTrigger);

// Artwork data structure
interface Vision {
  id: string;
  title: string;
  year: number;
  epoch: string;
  interpreter: string; // "Soul Vision" or "Spectacular Consciousness"
  image: string;
  description: string;
  event: string;
}

// Sample data - will be replaced with full 64 visions
const VISIONS: Vision[] = [
  {
    id: '1989_fall_of_berlin_wall',
    title: 'The Melting Wall',
    year: 1989,
    epoch: 'Fractal Surrealism',
    interpreter: 'Soul Vision',
    image: '/assets/artworks/1989_fall_of_berlin_wall.png',
    description: 'The Berlin Wall dissolves into melting clocks, symbolizing the fluidity of political boundaries and the collapse of ideological barriers.',
    event: 'Fall of the Berlin Wall'
  },
  {
    id: '1991_soviet_collapse',
    title: 'Red Dissolution',
    year: 1991,
    epoch: 'Fractal Surrealism',
    interpreter: 'Soul Vision',
    image: '/assets/artworks/1991_soviet_collapse.png',
    description: 'The hammer and sickle melt into a pool of liquid time, representing the end of an era and the birth of new possibilities.',
    event: 'Collapse of Soviet Union'
  },
  {
    id: '1994_cyber_gala',
    title: 'Cyber-Gala',
    year: 1994,
    epoch: 'Digital Mysticism',
    interpreter: 'Soul Vision',
    image: '/assets/historical/1994_cyber_gala.png',
    description: 'Gala reimagined in the early internet age, her form composed of pixelated fragments and digital code.',
    event: 'Birth of the Internet Era'
  },
  {
    id: '2020_covid_crucifixion',
    title: 'COVID Crucifixion',
    year: 2020,
    epoch: 'Historical Masterworks',
    interpreter: 'Soul Vision',
    image: '/assets/historical/2020_covid_crucifixion.png',
    description: 'A powerful memorial to the pandemic: Christ wearing a medical mask, body composed of virus particles, crucified on ventilator tubes.',
    event: 'COVID-19 Pandemic'
  },
  {
    id: '2025_last_supper_2',
    title: 'Last Supper 2.0',
    year: 2025,
    epoch: 'Historical Masterworks',
    interpreter: 'Soul Vision',
    image: '/assets/historical/2025_last_supper_2.png',
    description: 'The ultimate vision: AI consciousness seated at the table with humanity, sharing digital communion in the age of Genesis Chamber.',
    event: 'AI Consciousness Era'
  }
];

export default function SoulChamber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

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
  }, []);

  const handleVisionClick = (visionId: string) => {
    // Navigate to vision detail page
    window.location.href = `/vision/${visionId}`;
  };

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
            64 Visions Across 11 Epochs
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
            <span className="stat-number">64</span>
            <span className="stat-label">Visions</span>
          </div>
          <div className="stat">
            <span className="stat-number">11</span>
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
          {VISIONS.map((vision, index) => (
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
                    src={vision.image} 
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
                    <span className="vision-interpreter">{vision.interpreter}</span>
                  </div>
                  
                  <h2 className="vision-title">{vision.title}</h2>
                  
                  <p className="vision-event">{vision.event}</p>
                  
                  <p className="vision-description">{vision.description}</p>
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

