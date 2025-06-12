'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ModernWorkplaceIconProps {
  className?: string;
}

export const ModernWorkplaceIcon: React.FC<ModernWorkplaceIconProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollContentRef.current) return;

    // Schnelles kontinuierliches nach-unten-Scrollen
    gsap.fromTo(scrollContentRef.current,
      { y: 0 },
      {
        y: -24,
        duration: 8,
        repeat: -1,
        ease: "none"
      }
    );

    // Hover-Animation
    const handleMouseEnter = () => {
      gsap.to(containerRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([containerRef.current, scrollContentRef.current]);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative cursor-pointer ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-lg overflow-hidden">

        <svg viewBox="0 0 48 48" className="w-full h-full">
          <defs>
            {/* Firmenfarben Gradients */}
            <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#115E59" />
            </linearGradient>

            <linearGradient id="monitorGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>

            <linearGradient id="standGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#115E59" />
            </linearGradient>

            <linearGradient id="standGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>

            {/* Clip für Scroll-Bereich */}
            <clipPath id="screenClip">
              <rect x="7" y="11" width="34" height="16" rx="0" />
            </clipPath>

            {/* Schatten-Filter */}
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#14B8A6" floodOpacity="0.2" />
            </filter>

            <filter id="dropShadowDark" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2DD4BF" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Monitor Stand - Realistischer */}
          <ellipse
            cx="24"
            cy="36"
            rx="10"
            ry="2"
            fill="url(#standGradient)"
            className="dark:fill-url(#standGradientDark)"
            opacity="0.8"
          />

          {/* Monitor Neck */}
          <rect
            x="22"
            y="29"
            width="4"
            height="8"
            rx="2"
            fill="url(#standGradient)"
            className="dark:fill-url(#standGradientDark)"
          />

          {/* Monitor Back (3D Effekt) */}
          <rect
            x="4"
            y="8"
            width="40"
            height="22"
            rx="3"
            fill="url(#standGradient)"
            className="dark:fill-url(#standGradientDark) dark:filter-url(#dropShadowDark)"
            filter="url(#dropShadow)"
          />

          {/* Monitor Screen Frame */}
          <rect
            x="5"
            y="9"
            width="38"
            height="20"
            rx="2"
            fill="url(#monitorGradient)"
            className="dark:fill-url(#monitorGradientDark)"
          />

          {/* Screen Innenrahmen */}
          <rect
            x="6"
            y="10"
            width="36"
            height="18"
            rx="1"
            fill="#1F2937"
            className="dark:fill-gray-900"
          />

          {/* Screen Content Bereich */}
          <rect
            x="7"
            y="11"
            width="34"
            height="16"
            rx="0.5"
            fill="#F8FAFC"
            className="dark:fill-gray-800"
          />

          {/* Scrollbarer Inhalt */}
          <g clipPath="url(#screenClip)">
            <g ref={scrollContentRef}>
              {/* Content Block 1 */}
              <rect x="9" y="13" width="30" height="2.5" rx="1" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.9" />
              <rect x="9" y="17" width="26" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.7" />
              <rect x="9" y="19" width="28" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />
              <rect x="9" y="21" width="24" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />

              {/* Content Block 2 */}
              <rect x="9" y="25" width="30" height="2.5" rx="1" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.9" />
              <rect x="9" y="29" width="26" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.7" />
              <rect x="9" y="31" width="28" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />
              <rect x="9" y="33" width="24" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />

              {/* Duplizierter Content Block 1 für nahtlosen Loop */}
              <rect x="9" y="37" width="30" height="2.5" rx="1" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.9" />
              <rect x="9" y="41" width="26" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.7" />
              <rect x="9" y="43" width="28" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />
              <rect x="9" y="45" width="24" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />

              {/* Duplizierter Content Block 2 für nahtlosen Loop */}
              <rect x="9" y="49" width="30" height="2.5" rx="1" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.9" />
              <rect x="9" y="53" width="26" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.7" />
              <rect x="9" y="55" width="28" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />
              <rect x="9" y="57" width="24" height="1" rx="0.5" fill="url(#monitorGradient)" className="dark:fill-url(#monitorGradientDark)" opacity="0.6" />
            </g>
          </g>



          {/* Power LED */}
          <circle
            cx="24"
            cy="31"
            r="0.5"
            fill="#10B981"
            opacity="0.8"
          />

        </svg>

      </div>
    </div>
  );
}; 