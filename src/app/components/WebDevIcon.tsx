'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function WebDevIcon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animations-Timeline für die Linien
    const lines = container.querySelectorAll('.browser-line');
    lines.forEach((line, index) => {
      gsap.to(line, {
        width: '100%',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.2
      });
    });

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
    <div ref={containerRef} className="w-full h-full relative">
      <div className="absolute inset-0 bg-white dark:bg-background-dark rounded-md overflow-hidden">
        {/* Browser Controls */}
        <div className="absolute top-1 left-1 flex space-x-1">
          <div className="w-1 h-1 rounded-full bg-red-500/80" />
          <div className="w-1 h-1 rounded-full bg-yellow-500/80" />
          <div className="w-1 h-1 rounded-full bg-green-500/80" />
        </div>

        {/* URL Bar */}
        <div className="absolute top-1 right-1 w-4 h-1 rounded-full bg-primary/30" />

        {/* Browser Lines */}
        <div className="absolute inset-x-2 top-4 flex flex-col space-y-1">
          <div className="browser-line h-1 w-0 bg-gradient-to-r from-primary/50 to-primary/20" />
          <div className="browser-line h-1 w-0 bg-gradient-to-r from-primary/45 to-primary/15" />
          <div className="browser-line h-1 w-0 bg-gradient-to-r from-primary/40 to-primary/10" />
          <div className="browser-line h-1 w-0 bg-gradient-to-r from-primary/35 to-primary/5" />
        </div>
      </div>
    </div>
  );
}
