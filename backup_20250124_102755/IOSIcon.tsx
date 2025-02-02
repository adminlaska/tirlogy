'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SwiftIcon } from './SwiftIcon';

export function IOSIcon({ className }: { className?: string }) {
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
      gsap.killTweensOf(container);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C5C8]/1 to-transparent dark:from-[#00C5C8]/2 dark:to-transparent rounded-md overflow-hidden">
        {/* React-Style Ringe */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-md animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-0 border-2 border-primary/15 rounded-md animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          <div className="absolute inset-0 border-2 border-primary/10 rounded-md animate-spin" style={{ animationDuration: '16s' }} />
        </div>

        {/* Swift Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <SwiftIcon />
          </div>
        </div>

        {/* Glüh-Effekt */}
        <div className="absolute inset-0 bg-primary/5 rounded-md blur-lg animate-glow" />
      </div>
    </div>
  );
}
