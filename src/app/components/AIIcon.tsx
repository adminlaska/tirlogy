'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AIIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const armRef = useRef<SVGPathElement>(null);
  const bgDotsRef = useRef<SVGGElement>(null);
  const energyFieldRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const robot = robotRef.current;
    const head = headRef.current;
    const arm = armRef.current;
    const dots = bgDotsRef.current;
    const field = energyFieldRef.current;

    if (!container || !robot || !head || !arm || !dots || !field) return;

    gsap.killTweensOf([robot, head, arm, dots, field]);

    // Basis-Transformationen
    gsap.set(arm, { transformOrigin: "0 center" });
    gsap.set(head, { transformOrigin: "center center" });
    gsap.set(robot, { transformOrigin: "center center" });

    // Schwebeanimation
    gsap.to(robot, {
      y: -2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Kopf leichte Bewegung
    gsap.to(head, {
      scale: 1.03,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Wink-Animation
    const winkTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.5
    });

    winkTl
      .to(arm, {
        rotation: 35,
        duration: 0.3,
        ease: "power1.out"
      })
      .to(arm, {
        rotation: 20,
        duration: 0.15
      })
      .to(arm, {
        rotation: 30,
        duration: 0.15
      })
      .to(arm, {
        rotation: 0,
        duration: 0.25,
        ease: "power1.inOut"
      });

    // Hintergrund-Animation
    const dotElements = dots.children;
    const lines = Array.from(dotElements).slice(6); // Verbindungslinien
    const points = Array.from(dotElements).slice(0, 6); // Hexagon-Punkte

    // Punkte pulsieren
    points.forEach((point, index) => {
      gsap.to(point, {
        scale: 1.5,
        opacity: 0.5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Linien animieren
    lines.forEach((line, index) => {
      gsap.to(line, {
        opacity: 0.2,
        strokeDasharray: "2 2",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1
      });
    });

    // Energie-Ring Animation
    gsap.to(field.children[0], {
      strokeDashoffset: 6,
      duration: 4,
      repeat: -1,
      ease: "none"
    });

    // Hover-Effekte
    container.addEventListener('mouseenter', () => {
      gsap.to(robot, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
      winkTl.timeScale(1.5);
    });

    container.addEventListener('mouseleave', () => {
      gsap.to(robot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      winkTl.timeScale(1);
    });

    return () => {
      gsap.killTweensOf([robot, head, arm, dots, field]);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-primary/70" />
            <stop offset="100%" className="stop-primary/30" />
          </linearGradient>
        </defs>

        {/* Hintergrund */}
        <g ref={bgDotsRef} className="dots">
          {/* Hexagon-Punkte */}
          <circle cx="12" cy="4" r="1" className="fill-primary/30" />
          <circle cx="20" cy="12" r="1" className="fill-primary/30" />
          <circle cx="12" cy="20" r="1" className="fill-primary/30" />
          <circle cx="4" cy="12" r="1" className="fill-primary/30" />
          <circle cx="8" cy="8" r="1" className="fill-primary/30" />
          <circle cx="16" cy="16" r="1" className="fill-primary/30" />

          {/* Verbindungslinien */}
          <line x1="12" y1="4" x2="20" y2="12" className="stroke-primary/20" strokeWidth="0.5" />
          <line x1="20" y1="12" x2="12" y2="20" className="stroke-primary/20" strokeWidth="0.5" />
          <line x1="12" y1="20" x2="4" y2="12" className="stroke-primary/20" strokeWidth="0.5" />
          <line x1="4" y1="12" x2="12" y2="4" className="stroke-primary/20" strokeWidth="0.5" />
          <line x1="8" y1="8" x2="16" y2="16" className="stroke-primary/20" strokeWidth="0.5" />
        </g>

        {/* Energie-Ring */}
        <g ref={energyFieldRef}>
          <circle cx="12" cy="12" r="10" className="fill-none stroke-primary/30" strokeWidth="0.5" strokeDasharray="2" />
        </g>

        {/* Robot Group */}
        <g ref={robotRef}>
          {/* Vergrößerter Roboterkörper */}
          <rect x="6" y="4" width="12" height="16" rx="3" className="fill-white dark:fill-background-dark stroke-primary/20" strokeWidth="0.5" />

          {/* Vergrößerter Kopf/Display */}
          <g ref={headRef}>
            <rect x="5" y="5" width="14" height="14" rx="3" className="fill-white dark:fill-[url(#headGradient)] stroke-primary" strokeWidth="0.6" />

            {/* Größere Augen */}
            <rect x="8" y="9" width="3" height="1.5" rx="0.75" className="fill-primary" />
            <rect x="13" y="9" width="3" height="1.5" rx="0.75" className="fill-primary" />

            {/* Größeres Lächeln */}
            <path d="M8.5 13.5 C8.5 16 15.5 16 15.5 13.5" className="stroke-primary" strokeWidth="0.6" strokeLinecap="round" fill="none" />

            {/* Display-Details */}
            <line x1="7" y1="7.5" x2="17" y2="7.5" className="stroke-primary/40" strokeWidth="0.4" />
          </g>

          {/* Längere Arme */}
          <path ref={armRef} d="M19 12 L22 10" className="stroke-primary" strokeWidth="0.6" strokeLinecap="round" />
          <path d="M5 12 L2 13" className="stroke-primary" strokeWidth="0.6" strokeLinecap="round" />

          {/* Verbindungslinien */}
          <path d="M6 18 L18 18" className="stroke-primary/40" strokeWidth="0.4" strokeDasharray="1 1" />
        </g>
      </svg>
    </div>
  );
} 