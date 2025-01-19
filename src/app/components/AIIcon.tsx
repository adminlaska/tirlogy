'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AIIcon() {
  const containerRef = useRef<SVGGElement>(null);
  const brainRef = useRef<SVGGElement>(null);
  const neuronsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !brainRef.current || !neuronsRef.current) return;

    gsap.killTweensOf([containerRef.current, brainRef.current, neuronsRef.current]);

    // Gehirn-Puls Animation
    gsap.to(brainRef.current, {
      scale: 1.03,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Neuronale Verbindungen Animation
    const neurons = neuronsRef.current.children;
    Array.from(neurons).forEach((neuron, index) => {
      gsap.fromTo(neuron,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: -100,
          duration: 25,
          delay: index * 0.8,
          repeat: -1,
          ease: "none"
        }
      );
    });

    return () => {
      gsap.killTweensOf([containerRef.current, brainRef.current, neuronsRef.current]);
    };
  }, []);

  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="stop-primary" />
          <stop offset="100%" className="stop-primary/80" />
        </linearGradient>
      </defs>

      <g ref={containerRef} className="dark:opacity-90">
        {/* Neuronale Verbindungen */}
        <g ref={neuronsRef} className="stroke-primary/50 dark:stroke-primary/40">
          {/* Linke Gehirnhälfte Verbindungen */}
          <path
            d="M4 12 C6 8, 8 6, 12 6"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />
          <path
            d="M4 14 C7 12, 9 10, 12 10"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />
          <path
            d="M4 16 C8 16, 10 14, 12 14"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />

          {/* Rechte Gehirnhälfte Verbindungen */}
          <path
            d="M20 12 C18 8, 16 6, 12 6"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />
          <path
            d="M20 14 C17 12, 15 10, 12 10"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />
          <path
            d="M20 16 C16 16, 14 14, 12 14"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />
        </g>

        {/* Gehirn */}
        <g ref={brainRef}>
          {/* Linke Gehirnhälfte */}
          <path
            d="M6 8 C4 10, 4 14, 6 16 C8 18, 11 18, 12 16"
            className="fill-background stroke-primary dark:fill-background-dark"
            strokeWidth="0.8"
          />

          {/* Rechte Gehirnhälfte */}
          <path
            d="M18 8 C20 10, 20 14, 18 16 C16 18, 13 18, 12 16"
            className="fill-background stroke-primary dark:fill-background-dark"
            strokeWidth="0.8"
          />

          {/* Zentrale Verbindung */}
          <rect
            x="11"
            y="8"
            width="2"
            height="8"
            className="fill-primary/20 stroke-primary dark:fill-primary/30"
            strokeWidth="0.6"
          />

          {/* Neuronale Knotenpunkte */}
          <circle cx="12" cy="6" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
          <circle cx="12" cy="10" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
          <circle cx="12" cy="14" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
          <circle cx="8" cy="12" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
          <circle cx="16" cy="12" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
        </g>
      </g>
    </svg>
  );
} 