'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MainNav } from '../components/MainNav';
import { Footer } from '../components/Footer';
import { WebDevIcon } from '../components/WebDevIcon';
import { IOSIcon } from '../components/IOSIcon';
import { ModernWorkplaceIcon } from '../components/ModernWorkplaceIcon';
import { AIIcon } from '../components/AIIcon';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Hilfs-Hook für zufällige Partikel-Positionen (wie auf den anderen Detailseiten)
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

export default function Loesungen() {
  const solutionsRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Animation für die Lösungskarten
      const cards = document.querySelectorAll('.solution-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const solutions = [
    {
      title: 'Webentwicklung',
      shortDescription: 'Moderne, responsive Websites und Web-Anwendungen mit modernsten Technologien für maximale Performance und Benutzererfahrung.',
      fullDescription: 'Entwicklung maßgeschneiderter Weblösungen von einfachen Landing Pages bis zu komplexen Enterprise-Anwendungen. Mit Fokus auf Performance, SEO-Optimierung und responsive Design erreichen wir höchste Standards. Unsere Full-Stack-Entwicklung umfasst sowohl Frontend als auch Backend, um eine nahtlose und skalierbare Lösung zu gewährleisten.',
      icon: (
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/5 border border-primary/10">
          <WebDevIcon className="w-8 h-8 text-primary" />
        </div>
      ),
      features: [
        'Responsive Design für alle Geräte',
        'Full-Stack Entwicklung',
        'Performance-Optimierung & Core Web Vitals',
        'SEO-freundliche Implementierung',
        'Sichere Backend-Integration',
        'Content Management Systeme'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'WordPress', 'Shopify', 'Afterbuy', 'GraphQL', 'Docker', 'GitHub Actions', 'Vercel', 'Stripe', 'Go', 'AWS']
    },
    {
      title: 'Mobile Apps',
      shortDescription: 'Native und Cross-Platform Mobile Apps für iOS und Android mit intuitiven Benutzeroberflächen und erstklassiger User Experience.',
      fullDescription: 'Entwicklung leistungsstarker mobiler Anwendungen, die deine Nutzer begeistern. Von nativen iOS/Android Apps bis zu Cross-Platform-Lösungen bieten wir vollständige Mobile-Entwicklung. Inklusive App Store Optimierung, Offline-Funktionalität und nahtloser Integration mit Backend-Services.',
      icon: (
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/5 border border-primary/10">
          <IOSIcon className="w-8 h-8 text-primary" />
        </div>
      ),
      features: [
        'Native iOS & Android Entwicklung',
        'Cross-Platform mit React Native',
        'Offline-Funktionalität & Sync',
        'Push-Notifications & Analytics',
        'App Store Optimierung',
        'Backend-Integration & APIs'
      ],
      technologies: [
        'Swift', 'Kotlin', 'React Native', 'Flutter', 'Dart', 'Java', 'Objective-C', 'Expo',
        'Firebase', 'GraphQL', 'REST APIs', 'Node.js', 'App Center', 'Crashlytics', 'Xcode', 'Android Studio'
      ]
    },
    {
      title: 'ModernWorkplace',
      shortDescription: 'Transformation zu digitalen Arbeitsplätzen der Zukunft mit Microsoft 365 Integration und modernen Collaboration-Tools.',
      fullDescription: 'Revolutioniere deine Arbeitsweise mit modernen Workplace-Lösungen. Von Microsoft 365 Integration über Cloud-Migration bis zu maßgeschneiderten Collaboration-Plattformen. Schaffe effiziente Remote-Work-Umgebungen und steigere die Produktivität deines Teams durch digitale Transformation.',
      icon: (
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/5 border border-primary/10">
          <ModernWorkplaceIcon className="w-8 h-8 text-primary" />
        </div>
      ),
      features: [
        'Microsoft 365 Integration & Setup',
        'Cloud-Migration & Hybrid-Lösungen',
        'Collaboration-Plattformen',
        'Remote-Work Infrastruktur',
        'Workflow-Automatisierung',
        'Security & Compliance'
      ],
      technologies: [
        'Microsoft 365', 'Azure', 'SharePoint', 'Teams', 'OneDrive', 'Exchange Online', 'Power Platform', 'Power Apps',
        'Power Automate', 'Power BI', 'Visual Studio', 'VS Code', 'GitHub', 'Azure DevOps', 'ServiceNow', 'SAP Integration'
      ]
    },
    {
      title: 'KI-Integration',
      shortDescription: 'Integration modernster KI-Technologien in deine Systeme für intelligente Automatisierung und Datenanalyse.',
      fullDescription: 'Nutze die Kraft künstlicher Intelligenz für dein Unternehmen. Von intelligenten Chatbots über Prozessautomatisierung bis zu prädiktiver Analyse. Wir integrieren modernste KI-Modelle nahtlos in deine bestehenden Systeme und entwickeln maßgeschneiderte KI-Lösungen für deine spezifischen Anforderungen.',
      icon: (
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/5 border border-primary/10">
          <AIIcon className="w-8 h-8 text-primary" />
        </div>
      ),
      features: [
        'Intelligente Chatbots & Assistenten',
        'Automatisierte Datenanalyse',
        'Prozessautomatisierung mit KI',
        'Custom AI Model Training',
        'Natural Language Processing',
        'Computer Vision Lösungen'
      ],
      technologies: [
        'OpenAI', 'LangChain', 'TensorFlow', 'Hugging Face', 'Python', 'PyTorch', 'Keras', 'scikit-learn',
        'AWS Sagemaker', 'Azure AI', 'Google AI Platform', 'Docker', 'Kubernetes', 'MLflow', 'Jupyter', 'VS Code'
      ]
    }
  ];

  // Partikel-Positionen für CTA-Bereich (Hydration Bugfix)
  const particlePositions = useRandomParticles(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="loesungen" />

      <main className="min-h-screen w-full px-6 py-24 md:py-32">
        {/* Hero-Bereich */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto max-w-7xl mb-24"
        >
          <div className="text-center mb-16">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Deine Lösungen
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/80"
            >
              Digitale Lösungen, die dein Business auf das nächste Level bringen.
            </motion.p>
          </div>


        </motion.section>

        {/* Aufklappbare Lösungen */}
        <section ref={solutionsRef} className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="solution-card bg-white/5 dark:bg-black/5 backdrop-blur-md rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Card Header - Always Visible */}
                <div
                  className="p-6 cursor-pointer group"
                  onClick={() => toggleCard(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {solution.icon}
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {solution.title}
                        </h3>
                        <p className="text-foreground/70 text-sm mt-1">
                          {solution.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {expandedCard === index ? (
                        <ChevronUpIcon className="w-6 h-6 text-primary" />
                      ) : (
                        <ChevronDownIcon className="w-6 h-6 text-foreground/50 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === index ? 'auto' : 0,
                    opacity: expandedCard === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-primary/10">
                    <div className="pt-6 space-y-6">
                      {/* Detailed Description */}
                      <div>
                        <p className="text-foreground/80 leading-relaxed">
                          {solution.fullDescription}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Features */}
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-primary/80 mb-4 font-semibold">
                            Features & Services
                          </h4>
                          <ul className="space-y-2">
                            {solution.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                <span className="text-sm text-foreground/80">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-primary/80 mb-4 font-semibold">
                            Technologien & Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {solution.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4 border-t border-primary/5">
                        <Link href={
                          index === 0 ? "/loesungen/webentwicklung" :
                            index === 1 ? "/loesungen/mobile-apps" :
                              index === 2 ? "/loesungen/modernworkplace" :
                                "/loesungen/ki-integration"
                        }>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-medium transition-all duration-300"
                          >
                            <span>Mehr Details & Beratung</span>
                            <svg
                              className="w-4 h-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA-Bereich */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-7xl mt-32"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center relative overflow-hidden">
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

              {/* Digitale Partikel */}
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
              <p className="text-xl max-w-2xl mx-auto mb-8 text-foreground/80">
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