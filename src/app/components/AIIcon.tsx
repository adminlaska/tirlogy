'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AIIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const armRef = useRef<SVGPathElement>(null);
  const ringsRef = useRef<SVGGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const bgGridRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const robot = robotRef.current;
    const head = headRef.current;
    const arm = armRef.current;
    const rings = ringsRef.current;
    const particles = particlesRef.current;
    const bgGrid = bgGridRef.current;

    if (!container || !robot || !head || !arm || !rings || !particles || !bgGrid) return;

    // 3D Einstellungen
    gsap.set([container, robot], {
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    // Haupt-Schwebeanimation
    gsap.to(robot, {
      y: -2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Kopf-Animation
    gsap.to(head, {
      scale: 1.03,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center center"
    });

    // Ringe-Rotation
    const ringElements = rings.children;
    Array.from(ringElements).forEach((ring, index) => {
      gsap.to(ring, {
        rotate: 360,
        duration: 8 + index * 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });
    });

    // Wink-Animation
    const winkTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    winkTimeline
      .to(arm, {
        rotate: 40,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      .to(arm, {
        rotate: 0,
        duration: 0.4,
        ease: "power2.inOut"
      });

    // Verbesserte Partikel Animation
    const particleElements = particles.children;
    Array.from(particleElements).forEach((particle, index) => {
      gsap.to(particle, {
        scale: 1.2,
        opacity: 0.6,
        duration: 1.5 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });

      // Zusätzliche Bewegungsanimation
      gsap.to(particle, {
        y: -2 + Math.random() * 4,
        x: -2 + Math.random() * 4,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });

    // Verbesserte Grid Animation
    const gridElements = bgGrid.children;
    Array.from(gridElements).forEach((line, index) => {
      gsap.to(line, {
        opacity: 0.3,
        duration: 1.5 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15
      });
    });

    // Hover Animation
    const handleMouseEnter = () => {
      gsap.to(robot, {
        scale: 1.1,
        y: -4,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
      gsap.to(head, {
        scale: 1.1,
        duration: 0.4
      });
      gsap.to(arm, {
        rotate: 60,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
      Array.from(ringElements).forEach(ring => {
        gsap.to(ring, {
          scale: 1.1,
          duration: 0.4
        });
      });

      Array.from(particleElements).forEach(particle => {
        gsap.to(particle, {
          scale: 1.2,
          opacity: 0.5,
          duration: 0.4
        });
      });

      Array.from(gridElements).forEach(line => {
        gsap.to(line, {
          opacity: 0.2,
          duration: 0.4
        });
      });
    };

    const handleMouseLeave = () => {
      gsap.to(robot, {
        scale: 1,
        y: -2,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(head, {
        scale: 1,
        duration: 0.4
      });
      gsap.to(arm, {
        rotate: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      Array.from(ringElements).forEach(ring => {
        gsap.to(ring, {
          scale: 1,
          duration: 0.4
        });
      });

      Array.from(particleElements).forEach(particle => {
        gsap.to(particle, {
          scale: 1,
          opacity: 0.2,
          duration: 0.4
        });
      });

      Array.from(gridElements).forEach(line => {
        gsap.to(line, {
          opacity: 0.1,
          duration: 0.4
        });
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([robot, head, arm, ...Array.from(ringElements), ...Array.from(particleElements), ...Array.from(gridElements)]);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" className="stop-primary/80" />
            <stop offset="100%" className="stop-primary/20" />
          </radialGradient>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-primary/60" />
            <stop offset="100%" className="stop-primary/20" />
          </linearGradient>
        </defs>

        {/* Verbessertes Grid */}
        <g ref={bgGridRef} className="opacity-80">
          <path d="M0 4 H24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M0 8 H24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M0 12 H24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M0 16 H24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M0 20 H24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M4 0 V24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M8 0 V24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M12 0 V24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M16 0 V24" className="stroke-primary/40" strokeWidth="0.4" />
          <path d="M20 0 V24" className="stroke-primary/40" strokeWidth="0.4" />
        </g>

        {/* Mehr Energie-Partikel */}
        <g ref={particlesRef}>
          {/* Äußere Partikel */}
          <circle cx="4" cy="4" r="0.8" className="fill-[url(#particleGradient)]" />
          <circle cx="20" cy="4" r="0.8" className="fill-[url(#particleGradient)]" />
          <circle cx="4" cy="20" r="0.8" className="fill-[url(#particleGradient)]" />
          <circle cx="20" cy="20" r="0.8" className="fill-[url(#particleGradient)]" />

          {/* Mittlere Partikel */}
          <circle cx="12" cy="4" r="0.6" className="fill-[url(#particleGradient)]" />
          <circle cx="4" cy="12" r="0.6" className="fill-[url(#particleGradient)]" />
          <circle cx="20" cy="12" r="0.6" className="fill-[url(#particleGradient)]" />
          <circle cx="12" cy="20" r="0.6" className="fill-[url(#particleGradient)]" />

          {/* Innere Partikel */}
          <circle cx="8" cy="8" r="0.5" className="fill-[url(#particleGradient)]" />
          <circle cx="16" cy="8" r="0.5" className="fill-[url(#particleGradient)]" />
          <circle cx="8" cy="16" r="0.5" className="fill-[url(#particleGradient)]" />
          <circle cx="16" cy="16" r="0.5" className="fill-[url(#particleGradient)]" />
        </g>

        <g ref={robotRef}>
          {/* Rotierende Ringe */}
          <g ref={ringsRef}>
            <circle
              cx="12"
              cy="12"
              r="10"
              className="stroke-primary/20 fill-none"
              strokeWidth="0.4"
              strokeDasharray="1 3"
            />
            <circle
              cx="12"
              cy="12"
              r="8"
              className="stroke-primary/30 fill-none"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
            <circle
              cx="12"
              cy="12"
              r="6"
              className="stroke-primary/40 fill-none"
              strokeWidth="0.6"
              strokeDasharray="1 1"
            />
          </g>

          {/* Kopf/Display */}
          <g ref={headRef}>
            <rect
              x="7"
              y="7"
              width="10"
              height="10"
              rx="2"
              className="fill-[url(#headGradient)] stroke-primary"
              strokeWidth="0.6"
            />

            {/* Augen */}
            <rect x="9" y="10" width="2" height="1" rx="0.5" className="fill-primary/90" />
            <rect x="13" y="10" width="2" height="1" rx="0.5" className="fill-primary/90" />

            {/* Lächeln */}
            <path
              d="M9.5 13.5 C9.5 15 14.5 15 14.5 13.5"
              className="stroke-primary/90"
              strokeWidth="0.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Display-Details */}
            <line x1="8" y1="9" x2="16" y2="9" className="stroke-primary/40" strokeWidth="0.4" />
          </g>

          {/* Arme */}
          <path
            ref={armRef}
            d="M17 12 L20 10"
            className="stroke-primary/90"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <path
            d="M7 12 L4 13"
            className="stroke-primary/90"
            strokeWidth="0.6"
            strokeLinecap="round"
          />

          {/* Verbindungslinien */}
          <path
            d="M8 16 L16 16"
            className="stroke-primary/40"
            strokeWidth="0.4"
            strokeDasharray="1 1"
          />
        </g>
      </svg>
    </div>
  );
} 