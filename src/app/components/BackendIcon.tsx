'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackendIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiBlockRef = useRef<SVGGElement>(null);
  const ringsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const apiBlock = apiBlockRef.current;
    const rings = ringsRef.current;

    if (!container || !apiBlock || !rings) return;

    // Verbesserte Linien-Animation
    const ringsChildren = rings.children;
    if (ringsChildren) {
      // Äußerer Ring Animation - extrem langsam
      gsap.to(ringsChildren[0], {
        rotation: 360,
        transformOrigin: "center",
        duration: 60,
        repeat: -1,
        ease: "none"
      });

      // Mittlerer Ring Animation - extrem langsam und gegenläufig
      gsap.to(ringsChildren[1], {
        rotation: -360,
        transformOrigin: "center",
        duration: 45,
        repeat: -1,
        ease: "none"
      });

      // Innerer Ring Animation - sehr langsam
      gsap.to(ringsChildren[2], {
        rotation: 360,
        transformOrigin: "center",
        duration: 30,
        repeat: -1,
        ease: "none"
      });

      // Datenlinien Animation - sehr sanft
      const lines = [ringsChildren[3], ringsChildren[4], ringsChildren[5], ringsChildren[6]];
      lines.forEach((line, index) => {
        gsap.to(line, {
          strokeDashoffset: 15,
          duration: 6 + index * 0.8,
          repeat: -1,
          ease: "none"
        });
      });
    }

    // Hover Animation
    const handleMouseEnter = () => {
      gsap.to(container, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(container, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([container, rings]);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        {/* Rotierende Ringe und Datenlinien */}
        <g ref={ringsRef}>
          {/* Äußerer Ring */}
          <circle cx="12" cy="12" r="11" className="fill-none stroke-primary/40" strokeWidth="1.5" strokeDasharray="6 8" />

          {/* Mittlerer Ring */}
          <circle cx="12" cy="12" r="9" className="fill-none stroke-primary/40" strokeWidth="1.5" strokeDasharray="8 6" />

          {/* Innerer Ring */}
          <circle cx="12" cy="12" r="7" className="fill-none stroke-primary/40" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* Datenlinien */}
          <path d="M12,1 C17,6 17,18 12,23" className="fill-none stroke-primary/60" strokeWidth="1.2" strokeDasharray="8 6" />
          <path d="M23,12 C18,17 6,17 1,12" className="fill-none stroke-primary/60" strokeWidth="1.2" strokeDasharray="8 6" />
          <path d="M4,4 C8,8 16,16 20,20" className="fill-none stroke-primary/60" strokeWidth="1.2" strokeDasharray="8 6" />
          <path d="M20,4 C16,8 8,16 4,20" className="fill-none stroke-primary/60" strokeWidth="1.2" strokeDasharray="8 6" />
        </g>

        {/* API Block - zentriert und fixiert */}
        <g ref={apiBlockRef}>
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="3"
            className="fill-white dark:fill-background-dark stroke-primary"
            strokeWidth="1.2"
          />
          <text
            x="12"
            y="13.8"
            className="text-[6px] fill-primary font-mono font-bold text-center"
            textAnchor="middle"
          >
            API
          </text>
        </g>
      </svg>
    </div>
  );
} 