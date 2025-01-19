'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SwiftIcon } from './SwiftIcon';

export function IOSIcon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hover-Animation
    const handleMouseEnter = () => {
      gsap.to(container, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(container, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* React-Style Ringe */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 border-2 border-primary/20 rounded-lg animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 border-2 border-primary/15 rounded-lg animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 border-2 border-primary/10 rounded-lg animate-spin" style={{ animationDuration: '16s' }} />
      </div>

      {/* Swift Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SwiftIcon />
      </div>

      {/* Glüh-Effekt */}
      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg animate-glow" />
    </div>
  );
}
