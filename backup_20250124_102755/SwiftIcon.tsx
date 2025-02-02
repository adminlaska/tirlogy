'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SwiftIcon() {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    // Sanfte Puls-Animation
    gsap.to(icon, {
      scale: 1.03,
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Hover-Animation
    const handleMouseEnter = () => {
      gsap.to(icon, {
        scale: 1.05,
        opacity: 1,
        duration: 0.3,
        ease: "power1.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, {
        scale: 1,
        opacity: 0.9,
        duration: 0.3,
        ease: "power1.inOut"
      });
    };

    icon.addEventListener('mouseenter', handleMouseEnter);
    icon.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      icon.removeEventListener('mouseenter', handleMouseEnter);
      icon.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(icon);
    };
  }, []);

  return (
    <svg
      ref={iconRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-full h-full"
    >
      <path
        d="M63.93 17.608a17.91 17.91 0 0 0-.405-3.78c-.5-2.553-1.828-4.893-3.8-6.7a12.05 12.05 0 0 0-3.447-2.258c-1.243-.6-2.57-1-3.94-1.22-1.354-.25-2.85-.25-4.203-.368h-33.45a24.7 24.7 0 0 0-3.113.251c-1.027.114-2.033.36-3 .736l-.95.368a17.47 17.47 0 0 0-2.585 1.589c-.264.25-.545.368-.81.602a10.91 10.91 0 0 0-2.48 3.044C1.09 11.02.63 12.258.405 13.544A35.75 35.75 0 0 0 0 17.307V46.46a17.91 17.91 0 0 0 .405 3.78c.5 2.553 1.828 4.893 3.8 6.7a12.06 12.06 0 0 0 3.394 2.191c1.243.6 2.57 1 3.94 1.22 1.354.25 2.85.25 4.203.368h32.466a24.49 24.49 0 0 0 4.203-.368c1.344-.22 2.648-.627 3.87-1.204a15.54 15.54 0 0 0 3.517-2.191 10.9 10.9 0 0 0 2.445-3.044c.67-1.138 1.128-2.377 1.354-3.663a35.75 35.75 0 0 0 .405-3.78v-28.85z"
        className="fill-primary/10"
      />
      <path
        d="M42.737 47.713c-5.698 2.96-13.525 3.26-21.386.234C15.218 45.6 9.967 41.557 6.28 36.34c1.72 1.22 3.592 2.232 5.575 3.01 8.125 3.345 16.268 3.194 21.984 0-7.545-5.46-14.34-11.798-20.225-18.866a21.17 21.17 0 0 1-2.708-3.345c6.18 4.937 12.754 9.41 19.663 13.38-5.032-4.852-9.66-10.07-13.84-15.605C23.7 21.277 31.363 26.917 39.59 31.74l.88.468a15.18 15.18 0 0 0 .616-1.673c1.9-6.222-.264-13.296-5.012-19.15 10.992 5.97 17.5 17.193 14.79 26.593 0 .25-.14.502-.23.753l.088.1c5.434 6.105 3.94 12.56 3.254 11.34-2.972-5.1-8.477-3.53-11.238-2.46z"
        className="fill-primary/70"
      />
    </svg>
  );
} 