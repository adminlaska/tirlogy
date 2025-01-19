import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registriere GSAP Plugins nur im Browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Optimierte Performance-Einstellungen
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8
});

export function initTimelineAnimations() {
  // Stelle sicher, dass wir im Browser sind
  if (typeof window === 'undefined') return;

  // Timeline Linie Animation
  const line = document.querySelector('#timeline-line');
  if (line) {
    gsap.fromTo(line,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#timeline-container',
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // Timeline Schritte Animation
  const steps = document.querySelectorAll('.timeline-step');
  steps.forEach((step, index) => {
    const card = step.querySelector('.timeline-card');
    const cardContent = step.querySelector('.timeline-card > div');
    const point = step.querySelector('.timeline-point');
    const number = step.querySelector('.timeline-number');

    if (!card || !cardContent || !point || !number) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    });

    const isEven = index % 2 === 0;
    const xOffset = isEven ? -30 : 30;
    const rotateY = isEven ? 5 : -5; // Deutlich reduzierter Einknick-Winkel

    // Basis-Transformationen für subtilen 3D-Effekt
    gsap.set([card, cardContent], {
      perspective: 1000,
      transformStyle: 'preserve-3d',
      transformOrigin: isEven ? 'right center' : 'left center'
    });

    // Animationssequenz
    timeline
      .from(point, {
        scale: 0,
        duration: 0.4
      })
      .from(cardContent, {
        x: xOffset,
        rotateY: rotateY,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.2')
      .from(number, {
        scale: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }, '-=0.3');

    // Hover-Animation
    card.addEventListener('mouseenter', () => {
      gsap.to(cardContent, {
        rotateY: isEven ? 2 : -2,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(cardContent, {
        rotateY: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    });
  });
}

export function initParticles() {
  if (typeof window === 'undefined') return;

  const container = document.getElementById('particles-container');
  if (!container) return;

  // Optimierte Partikel-Einstellungen
  const particleCount = 20;
  const particles: HTMLDivElement[] = [];

  // Partikel-Pool erstellen
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full';
    container.appendChild(particle);
    particles.push(particle);
  }

  // Animation der Partikel
  function animateParticle(particle: HTMLDivElement) {
    const startX = Math.random() * window.innerWidth;
    const endX = startX + (Math.random() - 0.5) * 200;
    const duration = 3 + Math.random() * 2;

    gsap.fromTo(particle,
      {
        x: startX,
        y: window.innerHeight + 10,
        opacity: 0.2
      },
      {
        y: -10,
        x: endX,
        opacity: 0,
        duration: duration,
        ease: 'none',
        onComplete: () => animateParticle(particle)
      }
    );
  }

  // Starte Animationen mit Verzögerung
  particles.forEach((particle, i) => {
    gsap.delayedCall(i * 0.3, animateParticle, [particle]);
  });

  // Cleanup-Funktion
  return () => {
    particles.forEach(particle => {
      gsap.killTweensOf(particle);
      particle.remove();
    });
  };
} 