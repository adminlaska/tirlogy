'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackendIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiBlockRef = useRef<SVGRectElement>(null);
  const ringsRef = useRef<SVGGElement>(null);
  const pointsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const apiBlock = apiBlockRef.current;
    const rings = ringsRef.current;
    const points = pointsRef.current;

    if (!container || !apiBlock || !rings || !points) return;

    // 3D Einstellungen
    gsap.set([container, apiBlock, rings], {
      transformPerspective: 1000
    });

    // Nahtlose API Block Animation
    gsap.to(apiBlock, {
      keyframes: [
        { scale: 1, duration: 0 },
        { scale: 1.05, duration: 2 },
        { scale: 1.1, duration: 2 },
        { scale: 1.05, duration: 2 },
        { scale: 1, duration: 2 }
      ],
      repeat: -1,
      ease: "none"
    });

    // Sanfte Rotation
    gsap.to(apiBlock, {
      rotateY: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    // Ringe Animation - flüssigere Rotation
    const ringElements = rings.querySelectorAll('.ring');
    ringElements.forEach((ring, index) => {
      gsap.to(ring, {
        rotate: -360, // Gegenläufige Rotation
        duration: 15 + index * 5,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });
    });

    // Punkte Animation - weichere Übergänge
    const pointElements = points.querySelectorAll('.point');
    pointElements.forEach((point, index) => {
      gsap.to(point, {
        scale: 1.3,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.5
      });
    });

    // Hover Animation - sanftere Übergänge
    const handleMouseEnter = () => {
      gsap.to(container, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(rings, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(container, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(rings, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([container, apiBlock, rings, points]);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        {/* API Block */}
        <rect
          ref={apiBlockRef}
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3"
          className="fill-primary/20 stroke-primary"
          strokeWidth="1.2"
        />

        {/* Rotierende Ringe */}
        <g ref={ringsRef} className="origin-center">
          <circle
            className="ring stroke-primary/30 fill-none"
            cx="12"
            cy="12"
            r="11.5"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <circle
            className="ring stroke-primary/20 fill-none"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="0.5"
            strokeDasharray="4 3"
          />
          <circle
            className="ring stroke-primary/10 fill-none"
            cx="12"
            cy="12"
            r="8.5"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
        </g>

        {/* Pulsierende Punkte */}
        <g ref={pointsRef}>
          <circle className="point fill-primary/60" cx="12" cy="0.5" r="1.2" />
          <circle className="point fill-primary/60" cx="23.5" cy="12" r="1.2" />
          <circle className="point fill-primary/60" cx="12" cy="23.5" r="1.2" />
          <circle className="point fill-primary/60" cx="0.5" cy="12" r="1.2" />
        </g>

        {/* API Text */}
        <text
          x="12"
          y="12.5"
          className="fill-primary text-[5px] font-bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          API
        </text>
      </svg>
    </div>
  );
} 