'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AIIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<SVGSVGElement>(null);
  const bgRef = useRef<SVGSVGElement>(null);
  const rightArmRef = useRef<SVGPathElement>(null);
  const platformRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !robotRef.current || !bgRef.current || !rightArmRef.current || !platformRef.current) return;

    gsap.killTweensOf([containerRef.current, robotRef.current, bgRef.current, rightArmRef.current, platformRef.current]);

    // Minimale Schwebung für den Bot
    gsap.to(robotRef.current, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Dynamische Wink-Animation
    const winkTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1
    });

    // Schnelle Winkbewegung
    winkTl.to(rightArmRef.current, {
      rotate: -60,
      transformOrigin: "20% 90%",
      duration: 0.2,
      ease: "power2.out"
    })
      .to(rightArmRef.current, {
        rotate: -40,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(rightArmRef.current, {
        rotate: -60,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(rightArmRef.current, {
        rotate: -40,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(rightArmRef.current, {
        rotate: 0,
        duration: 0.2,
        ease: "back.out(2)"
      });

    // Plattform-Animation
    gsap.to(platformRef.current, {
      scaleX: 1.1,
      scaleY: 0.9,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animierte Bodenlinien
    gsap.utils.toArray('.grid-line').forEach((line: any, i) => {
      gsap.to(line, {
        strokeDashoffset: -30,
        duration: 2,
        repeat: -1,
        ease: "none",
        delay: i * 0.1
      });
    });

    // Hover-Animation
    const handleMouseEnter = () => {
      gsap.to(robotRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(robotRef.current, {
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
      gsap.killTweensOf([containerRef.current, robotRef.current, bgRef.current, rightArmRef.current, platformRef.current]);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer flex items-center justify-center">
      {/* Animierter 3D Boden */}
      <svg ref={bgRef} viewBox="0 0 240 280" className="absolute w-full h-full">
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid-Linien - an der weißen Linie nach unten */}
        {[...Array(20)].map((_, i) => (
          <line
            key={`grid-h-${i}`}
            className="grid-line"
            x1="0"
            y1={260 + i * 2}
            x2="240"
            y2={260 + i * 2}
            stroke="url(#gridGradient)"
            strokeWidth="1"
            strokeDasharray="5 3"
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <line
            key={`grid-v-${i}`}
            className="grid-line"
            x1={20 + i * 20}
            y1="260"
            x2={20 + i * 20 + 40}
            y2="300"
            stroke="url(#gridGradient)"
            strokeWidth="1"
            strokeDasharray="5 3"
          />
        ))}

        {/* Schwebende Plattform - an neue Position angepasst */}
        <g ref={platformRef} transform="translate(120, 265)">
          <ellipse
            cx="0"
            cy="0"
            rx="70"
            ry="15"
            fill="#0D9488"
            fillOpacity="0.2"
          />
          <ellipse
            cx="0"
            cy="-2"
            rx="60"
            ry="12"
            fill="#0D9488"
            fillOpacity="0.15"
          />
          <ellipse
            cx="0"
            cy="-4"
            rx="50"
            ry="8"
            fill="#0D9488"
            fillOpacity="0.1"
          />
        </g>
      </svg>

      {/* Bot */}
      <svg ref={robotRef} viewBox="0 0 240 280" className="relative z-10 w-4/5 h-4/5">
        {/* Kopf */}
        <path
          d="M60 80 
             C60 60 180 60 180 80
             L180 160
             C180 180 60 180 60 160
             Z"
          fill="#0D9488"
          stroke="#0D9488"
          strokeWidth="2"
        />

        {/* Gesicht */}
        <path
          d="M70 90
             C70 70 170 70 170 90
             L170 150
             C170 170 70 170 70 150
             Z"
          fill="#0F766E"
        />

        {/* Augen */}
        <circle cx="105" cy="110" r="8" fill="#2DD4BF" />
        <circle cx="135" cy="110" r="8" fill="#2DD4BF" />

        {/* Mund */}
        <path
          d="M100 130 Q120 138 140 130"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Körper */}
        <path
          d="M90 180 
             C90 170 150 170 150 180
             L150 240
             C150 260 90 260 90 240
             Z"
          fill="#0D9488"
          stroke="#0D9488"
          strokeWidth="2"
        />

        {/* Linker Arm */}
        <path
          d="M85 190 Q65 200 70 220"
          fill="#0D9488"
          stroke="#0D9488"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Rechter Arm (winkend) - längerer Pfad */}
        <path
          ref={rightArmRef}
          d="M155 190 Q195 195 205 155"
          fill="#0D9488"
          stroke="#0D9488"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default AIIcon;

