'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MainNav } from '../components/MainNav';
import { Footer } from '../components/Footer';
import { FaLinkedin, FaXing } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Vision() {
  const socialLinks = [
    {
      name: 'E-Mail Kontakt',
      username: 'hi@tirlogy.com',
      href: 'mailto:hi@tirlogy.com',
      icon: <MdEmail className="w-10 h-10 text-primary" />
    },
    {
      name: 'LinkedIn Profil',
      username: 'Ömer Tiryaki',
      href: 'https://linkedin.com/in/ömer-tiryaki',
      icon: <FaLinkedin className="w-10 h-10 text-primary" />
    },
    {
      name: 'XING Business',
      username: 'Ömer Tiryaki',
      href: 'https://www.xing.com/profile/oemer_tiryaki',
      icon: <FaXing className="w-10 h-10 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="vision" />

      <main className="min-h-screen w-full px-6 py-24 md:py-32">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto max-w-7xl"
        >
          <div className="relative flex flex-col md:flex-row items-start gap-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-72 h-72 relative flex-shrink-0 mx-auto md:mx-0"
            >
              <div className="relative w-full h-full">
                <div className="absolute -inset-1 bg-primary/10 rounded-[30px] blur-xl" />
                <Image
                  src="/me_oemer_tiryaki.JPG"
                  alt="Ömer Tiryaki"
                  fill
                  className="rounded-3xl object-cover object-center relative"
                  sizes="(max-width: 768px) 288px, 288px"
                  priority
                  quality={100}
                />
              </div>
            </motion.div>

            <div className="flex-1 space-y-10">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-start justify-start text-left"
                >
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold tracking-tight technical-forest"
                  >
                    <motion.div
                      className="relative inline-flex gap-3 md:gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-foreground dark:text-foreground-dark"
                      >
                        Hey,
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-foreground dark:text-foreground-dark"
                      >
                        ich bin
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative inline-block"
                      >
                        <span className="relative">
                          <span
                            className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-xl"
                            style={{ opacity: 0.5 }}
                          />
                          <span className="relative bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            Ömer
                          </span>
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                          />
                        </span>
                      </motion.span>
                    </motion.div>
                  </motion.h1>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="prose prose-lg dark:prose-invert max-w-none font-mono space-y-8"
                >
                  <p className="text-base leading-7 font-mono">
                    Stell dir vor, du triffst jemanden, der komplett vernarrt
                    in Technologie ist - das bin ich!
                    Schon als Kind hab ich alles auseinandergenommen,
                    um zu verstehen, wie es funktioniert.
                    {"\n"}
                    Meine Eltern fanden das nicht immer so toll,
                    aber hey, irgendwie musste ich ja lernen! 😄
                  </p>

                  <p className="text-base leading-7 font-mono">
                    Kommt dir das bekannt vor? Überall stolpert man über KI, ChatGPT
                    und allerlei neue Apps – aber so richtig durchblicken können
                    nur die Wenigsten.
                    {"\n"}
                    Viele sind schnell eingeschüchtert, aber das muss wirklich nicht sein!
                    {"\n"}
                    Ich bin davon überzeugt, dass jede*r Technologie verstehen kann,
                    solange man sie verständlich erklärt. 💡
                  </p>

                  <p className="text-base leading-7 font-mono">
                    Darum gibt's bei Tirlogy nicht nur spannende Einblicke in
                    aktuelle Tech-Trends und KI-Anwendungen, sondern auch
                    kompetente Unterstützung bei allen IT-Fragen.
                    {"\n"}
                    Ob du gerade dein eigenes Business startest, ein Unternehmen führst
                    oder einfach nur neugierig auf digitale Möglichkeiten bist:
                    Gemeinsam finden wir heraus, wie du Websites, Mobile Apps
                    (vor allem für iOS), Backend-Lösungen und KI-Integrationen
                    optimal für dich einsetzen kannst. ✨
                  </p>

                  <p className="text-base leading-7 font-mono">
                    Und weißt du was? Das Beste daran ist, dass wir die Zukunft
                    nicht nur miterleben, sondern aktiv mitgestalten können.
                    {"\n"}
                    Ich bin gespannt auf deine Ideen und freue mich darauf,
                    dir zu zeigen, wie leicht Technologie sein kann,
                    wenn man nur die richtigen Werkzeuge an der Hand hat.
                    {"\n"}
                    Also, lass uns gemeinsam die digitale Welt rocken! 🚀
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 dark:bg-foreground-dark/5 backdrop-blur-sm border border-primary/10 transition-transform duration-300 perspective-1000"
                    initial={false}
                    whileHover={{
                      transform: "translate3d(0px, -2px, 20px) rotateX(1deg)",
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 animate-shimmer" />
                      </div>
                    </div>
                    <div className="relative z-10">
                      {link.icon}
                    </div>
                    <div className="relative z-10">
                      <motion.p
                        className="font-medium text-foreground/80 dark:text-foreground-dark/80 group-hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </motion.p>
                      <motion.p
                        className="text-xs text-foreground/50 dark:text-foreground-dark/50"
                      >
                        {link.username}
                      </motion.p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
} 