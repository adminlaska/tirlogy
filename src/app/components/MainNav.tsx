'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';

export function MainNav({ activePage }: { activePage?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('theme-change', checkDarkMode);

    // Initial checks
    handleScroll();
    checkDarkMode();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('theme-change', checkDarkMode);
    };
  }, []);

  const getNavLinkClass = (page: string) => {
    const baseClass = "nav-link text-sm font-mono transition-all px-4 py-2 rounded-full font-['Nimbus_Mono']";
    if (page === activePage) {
      return `${baseClass} bg-primary/10 text-primary`;
    }
    return `${baseClass} text-foreground/80 dark:text-foreground-dark/80 hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 hover:text-foreground dark:hover:text-foreground-dark`;
  };

  return (
    <nav className="fixed w-full z-50 top-0 sm:top-6 safe-padding">
      <motion.div
        className={`w-[90%] max-w-[1600px] mx-auto ${isScrolled ? 'dark:bg-[rgba(10,10,10,0.75)] bg-[rgba(255,255,255,0.75)]' : ''
          }`}
        animate={{
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderRadius: isScrolled ? '24px' : '0px',
          boxShadow: isScrolled
            ? isDark
              ? '0 0 30px 0 rgba(0, 165, 168, 0.25)'
              : '0 0 20px 0 rgba(0, 165, 168, 0.2)'
            : 'none',
          padding: isScrolled ? '8px 24px' : '0px',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="flex items-center h-16 w-full mx-auto">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 flex items-center justify-center transition-transform duration-700 ease-[0.4,0,0.2,1] group-hover:rotate-[360deg]">
              <Image
                src="/tiryaki_it_fav_logo.png"
                alt="Tirlogy Logo"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-lg tracking-wide technical-forest text-foreground dark:text-foreground-dark">
              Tirlogy
            </span>
          </Link>

          {/* Zentriertes Menü */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/#vision"
                className={getNavLinkClass('vision')}
              >
                VISION
              </Link>
              <Link
                href="/#loesungen"
                className={getNavLinkClass('loesungen')}
              >
                LÖSUNGEN
              </Link>
              <Link
                href="/ki-modelle"
                className={getNavLinkClass('ki-modelle')}
              >
                KI-MODELLE
              </Link>
              <Link
                href="/blog"
                className={getNavLinkClass('blog')}
              >
                BLOG
              </Link>
              <Link
                href="/support"
                className={getNavLinkClass('support')}
              >
                SUPPORT
              </Link>
              <Link
                href="/#kontakt"
                className={getNavLinkClass('kontakt')}
              >
                KONTAKT
              </Link>
            </div>
          </div>

          {/* Rechte Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-mono rounded-md border border-foreground/20 dark:border-foreground-dark/20 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all duration-300"
            >
              Anmelden
            </Link>
            <Link
              href="/start"
              className="group relative px-6 py-2 text-sm font-mono rounded-md overflow-hidden"
            >
              <span className="relative z-10 text-white font-medium">
                Innovation Starten
              </span>
              <div className="absolute inset-0 bg-[#00A5A8]/50 dark:bg-[#00A5A8]/50 transition-all duration-300 ease-out" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#2dd4bf] opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300 ease-out"
                style={{
                  animation: 'none',
                  backgroundSize: '200% 100%',
                  animationPlayState: 'paused'
                }}
              />
              {/* Dark Mode Hover Effekte */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#2dd4bf] opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300 ease-out"
                style={{
                  animation: 'gradientFlow 2s linear infinite',
                  backgroundSize: '200% 100%',
                  animationPlayState: 'var(--play-state, paused)'
                }}
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100"
                style={{
                  animation: 'shine-reverse 2s infinite',
                  animationPlayState: 'var(--play-state, paused)'
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#5eead4]/40 via-[#2dd4bf]/30 to-[#0d9488]/40 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300 ease-out blur-md"
              />
              {/* Light Mode Effekte */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C5C8]/40 via-[#00A5A8]/30 to-[#0082CC]/40 opacity-100 dark:opacity-0 transition-all duration-300 ease-out" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#00C5C8] via-[#00A5A8] to-[#0082CC] opacity-0 group-hover:opacity-70 dark:group-hover:opacity-0 transition-all duration-300 ease-out"
                style={{
                  animation: 'gradientFlow 2s linear infinite',
                  backgroundSize: '200% 100%',
                  animationPlayState: 'var(--play-state, paused)'
                }}
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-60 dark:group-hover:opacity-0"
                style={{
                  animation: 'shine-reverse 2s infinite',
                  animationPlayState: 'var(--play-state, paused)'
                }}
              />
              <style jsx>{`
                .group:hover {
                  --play-state: running;
                }
              `}</style>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
} 