'use client';
import React, { useRef, useEffect, useState } from 'react';
import { MainNav } from '../../components/MainNav';
import { Footer } from '../../components/Footer';
import { WebDevIcon } from '../../components/WebDevIcon';
import { AIIcon } from '../../components/AIIcon';
import { IOSIcon } from '../../components/IOSIcon';
import { ModernWorkplaceIcon } from '../../components/ModernWorkplaceIcon';
import { motion } from 'framer-motion';
import { ChartBarIcon, ShieldCheckIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import WordPressIcon from '@/components/icons/WordPressIcon';

function useRandomParticles(count: number) {
  const [positions, setPositions] = useState<{ top: number, left: number }[]>([]);
  useEffect(() => {
    const newPositions = Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setPositions(newPositions);
  }, [count]);
  return positions;
}

export default function WebentwicklungDetail() {
  // Marquee-Logik für Zeile 1
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const [contentWidth1, setContentWidth1] = useState(0);

  useEffect(() => {
    if (marqueeRef1.current) {
      setContentWidth1(marqueeRef1.current.scrollWidth / 2);
    }
  }, []);

  // Marquee-Logik für Zeile 2
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const [contentWidth2, setContentWidth2] = useState(0);

  useEffect(() => {
    if (marqueeRef2.current) {
      setContentWidth2(marqueeRef2.current.scrollWidth / 2);
    }
  }, []);

  // Marquee-Logik für Zeile 3
  const marqueeRef3 = useRef<HTMLDivElement>(null);
  const [contentWidth3, setContentWidth3] = useState(0);

  useEffect(() => {
    if (marqueeRef3.current) {
      setContentWidth3(marqueeRef3.current.scrollWidth / 2);
    }
  }, []);

  // Partikel-Positionen für CTA-Bereich (Hydration Bugfix)
  const particlePositions = useRandomParticles(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="loesungen" />
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 pt-32">
        {/* Hero */}
        <section className="mb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <WebDevIcon className="w-16 h-16 text-primary drop-shadow-lg" />
            </div>
            <div className="relative w-full overflow-x-hidden" style={{ height: '4.5rem' }}>
              <motion.div
                className="flex whitespace-nowrap absolute z-10"
                animate={{ x: [0, '-50%'] }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  Webentwicklung – Deine digitale Zukunft
                </span>
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  Webentwicklung – Deine digitale Zukunft
                </span>
              </motion.div>
            </div>
            <p className="text-xl md:text-2xl text-foreground/80 dark:text-foreground-dark/80 max-w-2xl mx-auto">Von der individuellen Programmierung bis zu WordPress, Shopify & Afterbuy – wir entwickeln moderne, performante und skalierbare Weblösungen für dein Business.</p>
          </motion.div>
        </section>

        {/* Leistungen */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10 text-foreground">
              <div className="flex items-center gap-3 mb-3">
                <CodeBracketIcon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold text-primary dark:text-primary">Individuelle Webentwicklung</h3>
              </div>
              <p className="text-foreground/80 dark:text-foreground-dark mb-2">Maßgeschneiderte Webanwendungen und Websites mit modernen Frameworks wie <b>React</b>, <b>Next.js</b> und <b>TypeScript</b>. Perfekt für Startups, Unternehmen und digitale Produkte mit besonderen Anforderungen.</p>
              <ul className="list-disc ml-5 text-foreground/70 dark:text-foreground-dark text-sm space-y-1">
                <li>Single-Page-Apps & Portale</li>
                <li>APIs & Backend-Integration</li>
                <li>Performance & SEO-Optimierung</li>
                <li>Responsives, barrierefreies Design</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10 text-foreground">
              <div className="flex items-center gap-3 mb-3">
                <WordPressIcon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold text-primary dark:text-primary">WordPress, Shopify & Afterbuy</h3>
              </div>
              <p className="text-foreground/80 dark:text-foreground-dark mb-2">Schnelle, flexible und kosteneffiziente Lösungen für Content-Management, E-Commerce und Automatisierung. Wir holen das Maximum aus <b>WordPress</b>, <b>Shopify</b> und <b>Afterbuy</b> heraus – individuell angepasst auf dein Business.</p>
              <ul className="list-disc ml-5 text-foreground/70 dark:text-foreground-dark text-sm space-y-1">
                <li>WordPress: Themes, Plugins, SEO, Wartung</li>
                <li>Shopify: Store-Setup, Custom-Apps, Payment</li>
                <li>Afterbuy: Automatisierung, Schnittstellen, Beratung</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Technologien */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Technologien & Tools</motion.h2>
          {/* Nahtlose Marquee-Animation für alle Zeilen */}
          <div className="space-y-4">
            {/* Zeile 1 */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef1}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth1 > 0 ? { x: [0, -contentWidth1] } : false}
                transition={contentWidth1 > 0 ? { repeat: Infinity, duration: 60, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["React", "Next.js", "TypeScript", "Vue.js", "Angular", "Svelte", "Tailwind CSS", "Material UI", "Bootstrap", "HTML5", "CSS3", "SCSS"]
                  .concat(["React", "Next.js", "TypeScript", "Vue.js", "Angular", "Svelte", "Tailwind CSS", "Material UI", "Bootstrap", "HTML5", "CSS3", "SCSS"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 2 (invertiert) */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef2}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth2 > 0 ? { x: [-contentWidth2, 0] } : false}
                transition={contentWidth2 > 0 ? { repeat: Infinity, duration: 75, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Node.js", "Express", "NestJS", "Python", "Django", "FastAPI", "PHP", "Laravel", "Ruby on Rails", "Java", "Spring Boot", ".NET"]
                  .concat(["Node.js", "Express", "NestJS", "Python", "Django", "FastAPI", "PHP", "Laravel", "Ruby on Rails", "Java", "Spring Boot", ".NET"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 3 */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef3}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth3 > 0 ? { x: [0, -contentWidth3] } : false}
                transition={contentWidth3 > 0 ? { repeat: Infinity, duration: 100, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase", "Supabase", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "GitHub Actions", "CI/CD", "WordPress", "Shopify", "Afterbuy", "Contentful", "Strapi", "Sanity", "WooCommerce", "Magento", "GraphQL", "REST", "WebSockets", "OpenAI", "Stripe", "Algolia", "Elasticsearch", "Figma", "Jira", "Slack", "SEO-Tools"]
                  .concat(["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase", "Supabase", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "GitHub Actions", "CI/CD", "WordPress", "Shopify", "Afterbuy", "Contentful", "Strapi", "Sanity", "WooCommerce", "Magento", "GraphQL", "REST", "WebSockets", "OpenAI", "Stripe", "Algolia", "Elasticsearch", "Figma", "Jira", "Slack", "SEO-Tools"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Prozess */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Step by step kommen wir gemeinsam ans Ziel.</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">1. Beratung & Strategie</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Wir analysieren deine Ziele, Zielgruppe und Anforderungen. Du erhältst eine ehrliche, individuelle Beratung und eine klare Roadmap für dein Projekt.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">2. Design & Prototyping</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Modernes, responsives UI/UX-Design – auf Wunsch mit interaktiven Prototypen. Du bist in jeden Schritt eingebunden und gibst Feedback.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">3. Entwicklung & Testing</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Agile Entwicklung mit modernen Tools. Regelmäßige Demos, automatisierte Tests und höchste Code-Qualität sind Standard.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">4. Launch & Support</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Sicherer Go-Live, Hosting, Monitoring und Support. Auch nach dem Launch sind wir für dich da – mit Updates, Wartung und Optimierung.</p>
            </motion.div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Deine Vorteile auf einen Blick</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <ChartBarIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Performance & SEO</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Schnelle Ladezeiten, Top-Rankings bei Google und optimale User Experience – von Anfang an mitgedacht.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ShieldCheckIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Sicherheit & Skalierbarkeit</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Modernste Sicherheitsstandards, DSGVO-Konformität und Lösungen, die mit deinem Business wachsen.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Cog6ToothIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Wartung & Support</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Regelmäßige Updates, Monitoring und persönlicher Support – für einen sorgenfreien Betrieb deiner Website.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Individuelle Beratung</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Du erhältst keine Lösung von der Stange, sondern ein Konzept, das exakt zu deinen Zielen passt.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (1:1 übernommen von Haupt-Lösungen-Seite) */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-none mx-auto mt-32"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl px-4 md:px-12 py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
            </div>
            {/* Technische Animationen im Hintergrund */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animierte Linien */}
              <svg className="w-full h-full text-primary/20 dark:text-primary/30" viewBox="0 0 100 100" preserveAspectRatio="none">
                {[...Array(5)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M${10 + i * 20},0 Q${50},${50 + i * 10} ${90 - i * 20},100`}
                    stroke="currentColor"
                    strokeWidth="0.2"
                    strokeDasharray="1,1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.6,
                      transition: {
                        duration: 2.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1
                      }
                    }}
                  />
                ))}
              </svg>
              {/* Digitale Partikel (Hydration Bugfix) */}
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/30"
                  style={{
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 1.5, 1, 0],
                    opacity: [0, 0.8, 1, 0.8, 0],
                    transition: {
                      duration: 4,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }
                  }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bereit für dein nächstes Projekt?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8 text-foreground/80 dark:text-foreground-dark/80">
                Lass uns gemeinsam deine Vision in die Realität umsetzen. Kontaktiere mich für ein unverbindliches Erstgespräch.
              </p>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a
                  href="/#kontakt"
                  className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-medium transition-all bg-primary rounded-full hover:bg-primary/90"
                >
                  {/* Animierter Hintergrund-Effekt */}
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Kreiere deine Innovation</span>
                  <span className="relative invisible">Kreiere deine Innovation</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
} 