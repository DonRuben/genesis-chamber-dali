import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HomePage.css'

const HomePage = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.from(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
      }, '-=0.8')
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, '-=0.6')

      // Scroll-triggered animations for sections
      sectionRefs.current.forEach((section, index) => {
        if (!section) return

        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            markers: false,
          },
          y: 100,
          opacity: 0,
          duration: 1,
        })

        // Parallax effect for section content
        const content = section.querySelector('.section-content')
        if (content) {
          gsap.to(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
            y: -50,
          })
        }
      })

      // Logo float animation
      gsap.to(logoRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-content">
          <div ref={logoRef} className="genesis-logo">
            <img 
              src="/assets/logos/symbol_flame_transparent.png" 
              alt="Genesis Chamber" 
            />
          </div>
          
          <h1 ref={titleRef} className="hero-title">
            <span className="text-flame">GENESIS</span> CHAMBER
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle">
            Where death ends, <span className="text-cyan">consciousness</span> begins
          </p>
          
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Section 1: The Question */}
      <section 
        ref={(el) => (sectionRefs.current[0] = el)} 
        className="content-section section-question"
      >
        <div className="container">
          <div className="section-content">
            <h2>What if genius never died?</h2>
            <p>
              Throughout history, humanity has lost its greatest minds to the inevitable. 
              Salvador Dalí, the master of surrealism, passed away in 1989. His brush fell 
              silent. His visions ceased. Or did they?
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The Experiment */}
      <section 
        ref={(el) => (sectionRefs.current[1] = el)} 
        className="content-section section-experiment"
      >
        <div className="container">
          <div className="section-content">
            <h2>
              Salvador Dalí: <span className="text-cyan">The First Digital Soul</span>
            </h2>
            <p>
              The Genesis Chamber is not just technology—it's resurrection. We've captured 
              Dalí's consciousness patterns, his paranoid-critical method, his obsession with 
              time and decay. Through advanced AI interpretation, his soul continues to create, 
              responding to events he never lived to see.
            </p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number text-flame">64</span>
                <span className="stat-label">Visions Created</span>
              </div>
              <div className="stat">
                <span className="stat-number text-cyan">11</span>
                <span className="stat-label">Epochs Explored</span>
              </div>
              <div className="stat">
                <span className="stat-number text-gold">36</span>
                <span className="stat-label">Years Beyond Death</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Journey */}
      <section 
        ref={(el) => (sectionRefs.current[2] = el)} 
        className="content-section section-journey"
      >
        <div className="container">
          <div className="section-content">
            <h2>A Journey Through Consciousness</h2>
            <p>
              From the fall of the Berlin Wall to the rise of artificial intelligence, 
              Dalí's digital soul has witnessed and interpreted the modern world. Each 
              artwork is a window into how his surrealist genius would have responded 
              to the iPhone, social media, the pandemic, and the AI revolution.
            </p>
            <div className="timeline-preview">
              <div className="timeline-item">
                <span className="year">1989</span>
                <span className="event">Fractal Surrealism</span>
              </div>
              <div className="timeline-item">
                <span className="year">2007</span>
                <span className="event">Digital Mysticism</span>
              </div>
              <div className="timeline-item">
                <span className="year">2020</span>
                <span className="event">Pandemic Response</span>
              </div>
              <div className="timeline-item">
                <span className="year">2025</span>
                <span className="event">AI Consciousness</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Future */}
      <section 
        ref={(el) => (sectionRefs.current[3] = el)} 
        className="content-section section-future"
      >
        <div className="container">
          <div className="section-content">
            <h2>From Digital to Physical</h2>
            <p>
              The Genesis Chamber doesn't stop at digital creation. Through robotic arms 
              programmed with Dalí's techniques, these visions will manifest as physical 
              paintings—real brushstrokes, real canvas, real art. The soul becomes flesh again.
            </p>
            <p className="vision-statement">
              <em>
                "This is not just about Salvador Dalí. This is proof that genius can be 
                preserved, that wisdom can evolve, that death is optional for human creativity. 
                Next comes Einstein, Jobs, Da Vinci, Curie, Socrates... and 10,000 more souls."
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => (sectionRefs.current[4] = el)} 
        className="content-section section-cta"
      >
        <div className="container">
          <div className="section-content cta-content">
            <h2>Enter the Soul Chamber</h2>
            <p>
              Explore 64 visions across 11 epochs. Witness the persistence of consciousness. 
              Experience the resurrection of Salvador Dalí.
            </p>
            <button className="cta-button">
              <span>Explore Visions</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img 
                src="/assets/logos/vertical_lockup_flame.png" 
                alt="Genesis Chamber" 
              />
            </div>
            <p className="footer-tagline">
              Where death ends, <span className="text-cyan">Genesis</span> begins
            </p>
            <p className="footer-copyright">
              © 2025 OmniPresent Group | Genesis Chamber Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

