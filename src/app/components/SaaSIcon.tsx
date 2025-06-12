import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SaaSIconProps {
  className?: string;
}

export const SaaSIcon: React.FC<SaaSIconProps> = ({ className }) => {
  const cloudRef = useRef<SVGGElement>(null);
  const textRef = useRef<SVGGElement>(null);
  const linesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (cloudRef.current && textRef.current && linesRef.current) {
      // Cloud Animation - sanftes Schweben
      gsap.to(cloudRef.current, {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Text Animation
      gsap.from(textRef.current, {
        y: 10,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
      });

      // Daten-Linien Animation
      gsap.to(".data-line", {
        strokeDashoffset: -30,
        duration: 3,
        repeat: -1,
        ease: "linear"
      });

      // Datenpunkte Animation
      gsap.to(".data-point", {
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });

      // Farbanimation für die Wolke
      gsap.to(".cloud-color-animation", {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Hauptgradient für Light-Mode */}
        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A5A8" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#00A5A8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0088A8" stopOpacity="1" />
        </linearGradient>

        {/* Gradient für Dark-Mode */}
        <linearGradient id="cloudGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E1E5" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#00C5C8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00A5A8" stopOpacity="1" />
        </linearGradient>

        {/* Hintergrundgradient für die Wolke - Türkis */}
        <linearGradient id="cloudBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C5C8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00A5A8" stopOpacity="0.3" />
        </linearGradient>

        {/* Hintergrundgradient für Dark-Mode */}
        <linearGradient id="cloudBgGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A5A8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#007A7D" stopOpacity="0.4" />
        </linearGradient>

        {/* Textgradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A5A8" stopOpacity="1" />
          <stop offset="100%" stopColor="#0088A8" stopOpacity="1" />
        </linearGradient>

        {/* Textgradient für Dark-Mode */}
        <linearGradient id="textGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E1E5" stopOpacity="1" />
          <stop offset="100%" stopColor="#00C5C8" stopOpacity="1" />
        </linearGradient>

        {/* Hellere Variante der Hauptfarbe für Highlights */}
        <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D8DB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C5C8" stopOpacity="0.4" />
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00A5A8" floodOpacity="0.3" />
        </filter>

        <filter id="shadowDark" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00E1E5" floodOpacity="0.3" />
        </filter>

        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="glowDark" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#00A5A8" floodOpacity="0.5" />
        </filter>

        <filter id="textShadowDark" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#00E1E5" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* Eindeutig erkennbare Wolke */}
      <g ref={cloudRef} transform="translate(0, -10) scale(1.1)">
        {/* Wolken-Hauptkörper */}
        <path
          d="M30 90C30 70 45 60 65 60C70 40 90 25 115 25C140 25 160 40 165 60C185 60 200 75 200 90C200 110 185 125 165 125H65C45 125 30 110 30 90Z"
          fill="url(#cloudBgGradient)"
          className="dark:fill-url(#cloudBgGradientDark) dark:filter-url(#shadowDark) dark:stroke-url(#cloudGradientDark)"
          filter="url(#shadow)"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
        />

        {/* Farbiger Akzent in der Wolke */}
        <path
          d="M115 40C130 40 145 45 150 55C165 55 175 65 175 80C175 95 165 105 150 105H80C65 105 55 95 55 80C55 65 65 55 80 55C85 45 100 40 115 40Z"
          fill="url(#cloudGradient)"
          className="cloud-color-animation dark:fill-url(#cloudGradientDark)"
          opacity="0.5"
        />

        {/* Zusätzliche Wolkenformen für mehr Tiefe - mit Türkistönen */}
        <ellipse cx="65" cy="75" rx="20" ry="15" fill="url(#highlightGradient)" opacity="0.7" className="dark:fill-url(#cloudGradientDark) dark:opacity-40" />
        <ellipse cx="100" cy="65" rx="25" ry="18" fill="url(#highlightGradient)" opacity="0.7" className="dark:fill-url(#cloudGradientDark) dark:opacity-40" />
        <ellipse cx="140" cy="70" rx="22" ry="16" fill="url(#highlightGradient)" opacity="0.7" className="dark:fill-url(#cloudGradientDark) dark:opacity-40" />
        <ellipse cx="170" cy="85" rx="18" ry="14" fill="url(#highlightGradient)" opacity="0.7" className="dark:fill-url(#cloudGradientDark) dark:opacity-40" />
      </g>

      {/* Datenlinien und Verbindungen innerhalb der Wolke */}
      <g ref={linesRef}>
        {/* Horizontale Datenlinien */}
        <path
          className="data-line dark:stroke-url(#cloudGradientDark)"
          d="M50 80L150 80"
          fill="none"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        <path
          className="data-line dark:stroke-url(#cloudGradientDark)"
          d="M60 95L140 95"
          fill="none"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        {/* Vertikale Datenlinien */}
        <path
          className="data-line dark:stroke-url(#cloudGradientDark)"
          d="M70 65L70 110"
          fill="none"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        <path
          className="data-line dark:stroke-url(#cloudGradientDark)"
          d="M130 65L130 110"
          fill="none"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        {/* Diagonale Datenlinien für mehr Dynamik */}
        <path
          className="data-line dark:stroke-url(#cloudGradientDark)"
          d="M70 80L130 95"
          fill="none"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        <path
          className="data-line dark:stroke-url(#cloudGradientDark)"
          d="M70 95L130 80"
          fill="none"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        {/* Datenpunkte */}
        <circle cx="70" cy="80" r="4" fill="url(#cloudGradient)" className="data-point dark:fill-url(#cloudGradientDark)" />
        <circle cx="130" cy="80" r="4" fill="url(#cloudGradient)" className="data-point dark:fill-url(#cloudGradientDark)" />
        <circle cx="70" cy="95" r="4" fill="url(#cloudGradient)" className="data-point dark:fill-url(#cloudGradientDark)" />
        <circle cx="130" cy="95" r="4" fill="url(#cloudGradient)" className="data-point dark:fill-url(#cloudGradientDark)" />
        <circle cx="100" cy="80" r="6" fill="url(#cloudGradient)" className="data-point dark:fill-url(#cloudGradientDark) dark:filter-url(#glowDark)" filter="url(#glow)" />
      </g>

      {/* SaaS Text - Klar und deutlich */}
      <g ref={textRef}>
        {/* Hintergrund für den Text - Türkis statt Weiß */}
        <rect
          x="25"
          y="140"
          width="150"
          height="50"
          rx="8"
          fill="url(#cloudBgGradient)"
          className="dark:fill-url(#cloudBgGradientDark) dark:stroke-url(#cloudGradientDark)"
          stroke="url(#cloudGradient)"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* SaaS Text - Fett und deutlich */}
        <text
          x="100"
          y="170"
          textAnchor="middle"
          fontSize="40"
          fontWeight="bold"
          fill="url(#textGradient)"
          className="dark:fill-url(#textGradientDark) dark:filter-url(#textShadowDark)"
          filter="url(#textShadow)"
        >
          SaaS
        </text>

        {/* "Software as a Service" Text */}
        <text
          x="100"
          y="185"
          textAnchor="middle"
          fontSize="12"
          fill="url(#textGradient)"
          className="dark:fill-url(#textGradientDark)"
        >
          Software as a Service
        </text>
      </g>
    </svg>
  );
}; 