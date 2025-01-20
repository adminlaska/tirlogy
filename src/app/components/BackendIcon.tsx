'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackendIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerBlockRef = useRef<SVGGElement>(null);
  const circuitRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !centerBlockRef.current || !circuitRef.current) return;

    gsap.killTweensOf([containerRef.current, centerBlockRef.current, circuitRef.current]);

    // Zentrale Block Animation
    gsap.to(centerBlockRef.current, {
      scale: 1.03,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Circuit Pfade Animation
    const paths = circuitRef.current.children;
    Array.from(paths).forEach((path, index) => {
      gsap.fromTo(path,
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

    // Hover Animation für Container
    const handleMouseEnter = () => {
      gsap.to(containerRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([containerRef.current, centerBlockRef.current, circuitRef.current]);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-primary" />
            <stop offset="100%" className="stop-primary/80" />
          </linearGradient>
        </defs>

        <g className="dark:opacity-90">
          {/* Circuit Pfade */}
          <g ref={circuitRef} className="stroke-primary/50 dark:stroke-primary/40">
            {/* Horizontale Pfade */}
            <path
              d="M2 8 L6 8 Q7 8 7 9 L7 11 Q7 12 8 12 L16 12 Q17 12 17 11 L17 9 Q17 8 18 8 L22 8"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            <path
              d="M2 12 L7 12 Q8 12 8 13 L8 15 Q8 16 9 16 L15 16 Q16 16 16 15 L16 13 Q16 12 17 12 L22 12"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            <path
              d="M2 16 L6 16 Q7 16 7 15 L7 13 Q7 12 8 12 L16 12 Q17 12 17 13 L17 15 Q17 16 18 16 L22 16"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />

            {/* Vertikale Pfade */}
            <path
              d="M8 2 L8 6 Q8 7 9 7 L11 7 Q12 7 12 8 L12 16 Q12 17 11 17 L9 17 Q8 17 8 18 L8 22"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            <path
              d="M16 2 L16 6 Q16 7 15 7 L13 7 Q12 7 12 8 L12 16 Q12 17 13 17 L15 17 Q16 17 16 18 L16 22"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
          </g>

          {/* Zentraler Block */}
          <g ref={centerBlockRef}>
            {/* Äußerer Block */}
            <rect
              x="5"
              y="5"
              width="14"
              height="14"
              rx="3"
              className="fill-background stroke-primary dark:fill-background-dark"
              strokeWidth="0.8"
            />

            {/* Innerer Block */}
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="2"
              className="fill-primary/20 stroke-primary dark:fill-primary/30"
              strokeWidth="0.6"
            />

            {/* API Text */}
            <text
              x="12"
              y="13"
              className="text-[4.5px] font-bold fill-primary text-center"
              textAnchor="middle"
            >
              API
            </text>

            {/* Verbindungspunkte */}
            <circle cx="12" cy="6" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
            <circle cx="12" cy="18" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
            <circle cx="6" cy="12" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
            <circle cx="18" cy="12" r="0.7" className="fill-primary/60 dark:fill-primary/50" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default BackendIcon; 