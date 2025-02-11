'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Header({ activePage }: { activePage?: string }) {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const headerHeight = useTransform(scrollY, [0, 100], [100, 80]);
  const headerPadding = useTransform(scrollY, [0, 100], [24, 16]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinkClass = (page: string) => {
    const baseClass = "nav-link text-sm font-mono transition-all px-4 py-2 rounded-full font-['Nimbus_Mono']";
    if (page === activePage) {
      return `${baseClass} bg-primary/10 text-primary`;
    }
    return `${baseClass} text-white/80 hover:text-white hover:bg-white/5`;
  };

  return (
    <motion.nav
      style={{ height: headerHeight }}
      className={`fixed w-full z-50 top-0 transition-colors duration-200 ${hasScrolled ? 'sm:top-0' : 'sm:top-6'
        }`}
    >
      <div className="container h-full">
        <motion.div
          style={{ padding: headerPadding }}
          className="relative w-full h-full bg-[#0A0A0A]/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/5"
        >
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div style={{ scale: logoScale }} className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-primary/0 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-150" />
                <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-[0.4,0,0.2,1] group-hover:rotate-[360deg]">
                  <Image
                    src="/tiryaki_it_fav_logo.png"
                    alt="Tirlogy Logo"
                    width={48}
                    height={48}
                    className="w-full h-full"
                    priority
                  />
                </div>
              </motion.div>
              <span className="text-xl tracking-wide technical-forest text-white">
                Tirlogy
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link
                href="/#über-mich"
                className={getNavLinkClass('über-mich')}
              >
                ÜBER MICH
              </Link>
              <Link
                href="/#dienstleistungen"
                className={getNavLinkClass('dienstleistungen')}
              >
                DIENSTLEISTUNGEN
              </Link>
              <Link
                href="/ki-modelle"
                className={getNavLinkClass('ki-modelle')}
              >
                KI-MODELLE
              </Link>
              <Link
                href="/#kontakt"
                className={getNavLinkClass('kontakt')}
              >
                KONTAKT
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
} 