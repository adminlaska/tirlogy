'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { FormEvent } from 'react';
import gsap from 'gsap';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { initTimelineAnimations, initParticles } from './components/TimelineAnimations';
import { SwiftIcon } from './components/SwiftIcon';
import { BackendIcon } from './components/BackendIcon';
import { WebDevIcon } from './components/WebDevIcon';
import { IOSIcon } from './components/IOSIcon';
import { AIIcon } from './components/AIIcon';
import { MainNav } from './components/MainNav';
import { Footer } from './components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // KI-Chat States
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'assistant' | 'user', content: string }>>([
    {
      role: 'assistant',
      content: 'Hallo! Ich bin dein KI-Assistent. Wie kann ich dir helfen?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Optimierte Scroll-Handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialisiere Animationen nur einmal
    const cleanup = initParticles();
    initTimelineAnimations();

    return () => {
      if (cleanup) cleanup();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Ihre Nachricht wurde erfolgreich gesendet!',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || 'Ein Fehler ist aufgetreten.');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Chat Funktionen
  const scrollToBottom = () => {
    const chatContainer = document.querySelector('#chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    const lastMessage = chatMessages[chatMessages.length - 1];
    if (lastMessage?.role === 'assistant' && !isTyping && lastMessage.content.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [chatMessages, isTyping]);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...chatMessages,
            { role: 'user', content: userMessage }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('API-Anfrage fehlgeschlagen');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, data]);
    } catch (error) {
      console.error('Chat Error:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 sm:pt-32 section">
        <div className="w-[90%] max-w-[1600px] mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[500px] sm:min-h-[700px] flex items-center">
            <div className="absolute inset-0">
              <Image
                src="/tiryaki_it_hintergrund_bild.jpg"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent dark:from-background-dark/85 dark:via-background-dark/40" />
            </div>
            <div className="relative w-full py-12 sm:py-20 lg:py-32 px-4 sm:px-12 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground dark:text-white font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                  Code trifft auf Design.
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-foreground/90 dark:text-white/80 mb-6 sm:mb-8 font-['Nimbus_Mono'] max-w-2xl">
                  Von der Konzeption bis zur Implementierung – ich entwickle skalierbare
                  und zukunftssichere Lösungen, die Ihr Unternehmen digital voranbringen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="group relative px-8 py-3 overflow-hidden rounded-lg text-sm sm:text-base font-['Nimbus_Mono'] bg-primary/5 text-foreground dark:text-white border border-primary/20 transition-all duration-500 ease-out hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/5" style={{ transform: 'translateX(-100%)', animation: 'slideRight 2s ease-in-out infinite' }} />
                    <span className="relative z-10">Projekt starten</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('services')}
                    className="group relative px-8 py-3 overflow-hidden rounded-lg text-sm sm:text-base font-['Nimbus_Mono'] bg-primary/5 text-foreground dark:text-white border border-primary/20 transition-all duration-500 ease-out hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/5" style={{ transform: 'translateX(-100%)', animation: 'slideRight 2s ease-in-out infinite' }} />
                    <span className="relative z-10">Mehr erfahren</span>
                  </button>
                </div>

                <style jsx>{`
                  @keyframes slideRight {
                    0% {
                      transform: translateX(-100%);
                    }
                    50% {
                      transform: translateX(100%);
                    }
                    100% {
                      transform: translateX(-100%);
                    }
                  }
                `}</style>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="section">
        <div className="section-inner">
          <div className="relative flex justify-center mb-8 sm:mb-12">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120px] w-full sm:w-[500px] mx-auto">
              <div className="absolute inset-0 bg-foreground opacity-[0.03] blur-[130px]" />
              <div className="absolute inset-0 bg-[#00A5A8] opacity-[0.1] blur-[65px]" />
            </div>
            <h2 className="heading text-2xl sm:text-3xl lg:text-4xl text-center relative z-10 font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
              Professionelle IT-Lösungen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group service-card rounded-2xl p-8 animate-float">
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-xl service-icon flex items-center justify-center">
                  <WebDevIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                  Webentwicklung
                </h3>
                <p className="text-sm text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
                  Maßgeschneiderte Webanwendungen mit Next.js und React. Von responsiven Websites bis zu komplexen Enterprise-Lösungen. Mit Fokus auf Performance, SEO und modernstem UI/UX-Design.
                </p>
              </div>
            </div>

            <div className="group service-card rounded-2xl p-8 animate-float" style={{ animationDelay: '0.1s' }}>
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-xl service-icon flex items-center justify-center">
                  <IOSIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                  Mobile Apps
                </h3>
                <p className="text-sm text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
                  Professionelle iOS-Entwicklung mit Swift und SwiftUI. Native Apps mit höchster Performance und intuitivem Design. Cross-Platform-Lösungen mit React Native für maximale Reichweite.
                </p>
              </div>
            </div>

            <div className="group service-card rounded-2xl p-8 animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-xl service-icon flex items-center justify-center">
                  <BackendIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                  Backend & APIs
                </h3>
                <p className="text-sm text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
                  Hochskalierbare Microservices und RESTful APIs. Cloud-native Architekturen mit Node.js, Express und TypeScript. Sichere Authentifizierung und optimiertes Datenmanagement.
                </p>
              </div>
            </div>

            <div className="group service-card rounded-2xl p-8 animate-float" style={{ animationDelay: '0.3s' }}>
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-xl service-icon flex items-center justify-center">
                  <AIIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                  KI-Integration
                </h3>
                <p className="text-sm text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
                  Integration modernster KI-Technologien in Ihre Systeme. Von intelligenten Chatbots über Prozessautomatisierung bis zu prädiktiver Analyse. Mit OpenAI, LangChain und TensorFlow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background with blur */}
            <div className="absolute inset-0 bg-white/95 dark:bg-[#0A0A0A]/50 backdrop-blur-lg" />

            {/* Gradient overlays */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
                {/* Left Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="heading text-2xl sm:text-3xl lg:text-4xl font-['Neue_Haas_Grotesk_Display_Pro_65_Medium'] mb-2">
                        Über mich
                      </h2>
                      <div className="w-20 h-1 bg-primary rounded-full mb-6" />
                      <p className="text-base sm:text-lg text-foreground/80 dark:text-foreground-dark/80 font-['Nimbus_Mono'] leading-relaxed">
                        Als Full-Stack Entwickler mit Fokus auf moderne Webtechnologien
                        unterstütze ich Unternehmen dabei, ihre digitale Präsenz auf das
                        nächste Level zu bringen.
                      </p>
                    </motion.div>
                  </div>

                  {/* Experience Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="group relative p-6 rounded-xl bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-border-dark overflow-hidden"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Animated circle decoration */}
                      <div className="absolute -right-4 -top-4 w-20 h-20">
                        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                        <div className="absolute inset-2 bg-primary/5 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      </div>

                      <div className="relative z-10">
                        <motion.h4
                          className="text-2xl font-bold text-primary mb-3"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          5+
                        </motion.h4>
                        <p className="text-sm text-foreground/60 dark:text-foreground-dark/60 font-['Nimbus_Mono']">
                          Jahre Erfahrung in der Webentwicklung
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="group relative p-6 rounded-xl bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-border-dark overflow-hidden"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Animated circle decoration */}
                      <div className="absolute -left-4 -top-4 w-20 h-20">
                        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        <div className="absolute inset-2 bg-primary/5 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                      </div>

                      <div className="relative z-10">
                        <motion.h4
                          className="text-2xl font-bold text-primary mb-3"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          50+
                        </motion.h4>
                        <p className="text-sm text-foreground/60 dark:text-foreground-dark/60 font-['Nimbus_Mono']">
                          Erfolgreich abgeschlossene Projekte
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-primary font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                      Expertise
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-['Nimbus_Mono'] text-foreground/80 dark:text-foreground-dark/80">Frontend Development</h4>
                        <div className="space-y-2">
                          <SkillBar skill="React/Next.js" level={95} />
                          <SkillBar skill="TypeScript" level={90} />
                          <SkillBar skill="UI/UX Design" level={85} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-['Nimbus_Mono'] text-foreground/80 dark:text-foreground-dark/80">Backend Development</h4>
                        <div className="space-y-2">
                          <SkillBar skill="Node.js" level={90} />
                          <SkillBar skill="REST APIs" level={95} />
                          <SkillBar skill="Datenbanken" level={85} />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-primary font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                      Technologie-Stack
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <TechItem>Next.js</TechItem>
                      <TechItem>React</TechItem>
                      <TechItem>TypeScript</TechItem>
                      <TechItem>Node.js</TechItem>
                      <TechItem>Swift</TechItem>
                      <TechItem>SwiftUI</TechItem>
                      <TechItem>TensorFlow</TechItem>
                      <TechItem>PyTorch</TechItem>
                      <TechItem>OpenAI API</TechItem>
                      <TechItem>LangChain</TechItem>
                      <TechItem>REST APIs</TechItem>
                      <TechItem>GSAP</TechItem>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Lab Section */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#1E1E1E] border border-primary/10"
            >
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#2D2D2D] border-b border-primary/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-600 dark:text-white/60 text-sm font-['Nimbus_Mono']">Create Innovation</span>
                <div className="w-20" />
              </div>

              {/* Editor Content */}
              <div className="p-6 relative h-[500px] flex flex-col">
                {(() => {
                  const code = [
                    'const innovate = async () => {',
                    '  const result = await createInnovation();',
                    '  return {',
                    "    success: 'Innovation created!'",
                    '  };',
                    '}'
                  ];

                  const [text, setText] = useState('');
                  const [currentLine, setCurrentLine] = useState(0);
                  const [currentChar, setCurrentChar] = useState(0);
                  const [isRunning, setIsRunning] = useState(false);
                  const [output, setOutput] = useState<string | null>(null);

                  useEffect(() => {
                    if (currentLine >= code.length) return;

                    const timer = setTimeout(() => {
                      if (currentChar < code[currentLine].length) {
                        setText(prev => prev + code[currentLine][currentChar]);
                        setCurrentChar(prev => prev + 1);
                      } else {
                        setText(prev => prev + '\n');
                        setCurrentLine(prev => prev + 1);
                        setCurrentChar(0);
                      }
                    }, 50);

                    return () => clearTimeout(timer);
                  }, [currentLine, currentChar]);

                  const handleRunCode = () => {
                    setIsRunning(true);
                    setOutput(null);

                    // Simuliere Code-Ausführung
                    setTimeout(() => {
                      setOutput(JSON.stringify({ success: 'Innovation created!' }, null, 2));
                      setIsRunning(false);
                    }, 1500);
                  };

                  const lines = text.split('\n');

                  return (
                    <>
                      <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        <div className="space-y-4">
                          {lines.map((line, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start gap-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-gray-400 dark:text-white/30 font-mono text-sm w-4 text-right select-none">
                                {index + 1}
                              </div>
                              <div className="flex-1 font-mono relative">
                                {Array.from(line).map((char, charIndex) => (
                                  <span
                                    key={charIndex}
                                    className={
                                      line.startsWith('const') && charIndex < 5 ? 'text-blue-600 dark:text-[#569CD6]' :
                                        line.includes('async') && line.substring(charIndex, charIndex + 5) === 'async' ? 'text-purple-600 dark:text-[#C586C0]' :
                                          line.includes('await') && line.substring(charIndex, charIndex + 5) === 'await' ? 'text-blue-600 dark:text-[#569CD6]' :
                                            line.includes('return') && line.substring(charIndex, charIndex + 6) === 'return' ? 'text-purple-600 dark:text-[#C586C0]' :
                                              line.includes('success') && line.substring(charIndex, charIndex + 7) === 'success' ? 'text-cyan-600 dark:text-[#9CDCFE]' :
                                                (char === "'" || line.includes("'") && line[charIndex - 1] === "'") ? 'text-orange-600 dark:text-[#CE9178]' :
                                                  'text-gray-800 dark:text-white'
                                    }
                                  >
                                    {char}
                                  </span>
                                ))}
                                {index === currentLine && (
                                  <motion.span
                                    className="inline-block w-[2px] h-[1.2em] bg-primary ml-[1px] relative top-[2px]"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                  />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Output Section */}
                        {output && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-gray-50 dark:bg-[#1E1E1E] rounded-lg border border-primary/20"
                          >
                            <div className="font-mono text-cyan-600 dark:text-[#9CDCFE]">Output:</div>
                            <pre className="font-mono text-orange-600 dark:text-[#CE9178] mt-2">{output}</pre>
                          </motion.div>
                        )}
                      </div>

                      {/* Run Button - Now fixed at bottom */}
                      <div className="pt-4 mt-auto border-t border-primary/10">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="w-full px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg font-['Nimbus_Mono'] text-sm hover:bg-primary/20 transition-colors relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isRunning ? (
                            <>
                              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                              <span className="relative">Running...</span>
                            </>
                          ) : (
                            'Run Code'
                          )}
                        </motion.button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KI-Playground Section */}
      <section className="section">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-2xl"
          >
            {/* Hintergrund-Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent dark:from-primary/5" />

            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 ring-1 ring-primary/10 dark:ring-primary/20">
                  <Image
                    src="/tiryaki_it_ki_playground.png"
                    alt="KI-Playground Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">KI-Assistent</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Testen Sie unseren KI-Chat</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-medium text-primary bg-primary/5 dark:bg-primary/10 rounded-full ring-1 ring-primary/20">Beta</span>
              </div>
            </div>

            {/* Chat Container */}
            <div className="p-6">
              <div
                id="chat-messages"
                className="space-y-4 max-h-[450px] overflow-y-auto mb-4 scroll-smooth pr-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex gap-3 ${message.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${message.role === 'assistant'
                      ? 'bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 ring-1 ring-primary/10 dark:ring-primary/20'
                      : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}>
                      {message.role === 'assistant' ? (
                        <Image
                          src="/tiryaki_it_ki_playground.png"
                          alt="KI-Assistent"
                          width={28}
                          height={28}
                          className="w-full h-full object-cover"
                          priority
                        />
                      ) : (
                        <svg className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === 'assistant'
                      ? 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800'
                      : 'bg-primary/5 dark:bg-primary/10'
                      } rounded-2xl px-4 py-3 shadow-sm`}>
                      <p className="text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center ring-1 ring-primary/10 dark:ring-primary/20 flex-shrink-0">
                      <Image
                        src="/tiryaki_it_ki_playground.png"
                        alt="KI-Assistent"
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl px-4 py-3 shadow-sm border border-zinc-100 dark:border-zinc-800">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-1.5 h-1.5 bg-primary/40 dark:bg-primary/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-1.5 h-1.5 bg-primary/40 dark:bg-primary/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-1.5 h-1.5 bg-primary/40 dark:bg-primary/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Container */}
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Schreiben Sie eine Nachricht..."
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-[15px]"
                />
                <button
                  onClick={handleChatSubmit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors group"
                >
                  <svg className="w-5 h-5 text-primary transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-4 space-y-1.5">
                <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <span className="inline-block w-4 h-4">⚡</span>
                  <span>KI-BETA: Diese Funktion befindet sich in der Testphase</span>
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <span className="inline-block w-4 h-4">⚠️</span>
                  <span>Hinweis: KI-Antworten können Fehler enthalten. Bitte überprüfen Sie wichtige Informationen.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="section relative overflow-hidden min-h-screen py-20 bg-transparent">
        <div className="section-inner max-w-[1200px]" id="timeline-container">
          {/* Timeline Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="heading text-2xl sm:text-3xl lg:text-4xl mb-4 font-['Neue_Haas_Grotesk_Display_Pro_65_Medium'] text-foreground dark:text-foreground-dark">
              Von der Idee zur Realität
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 dark:text-foreground-dark/60 max-w-2xl mx-auto font-['Nimbus_Mono']">
              Ein strukturierter Prozess für erfolgreiche Projekte
            </p>
          </motion.div>

          {/* 3D Timeline Container */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary to-primary/0 transform -translate-x-1/2" id="timeline-line" />
            <div className="relative space-y-24">
              {[
                {
                  step: 1,
                  title: "Vision & Discovery",
                  description: "In intensiven Gesprächen tauchen wir tief in Ihre Vision ein. Wir analysieren Ihre Zielgruppe, definieren Kernfunktionen und identifizieren technische Anforderungen. Hier entstehen die Grundpfeiler Ihres erfolgreichen digitalen Produkts."
                },
                {
                  step: 2,
                  title: "Strategie & Architektur",
                  description: "Mit modernsten Tools entwickeln wir eine maßgeschneiderte Strategie. Die Systemarchitektur wird auf Skalierbarkeit und Zukunftssicherheit ausgelegt. Technologie-Stack und Entwicklungs-Roadmap werden präzise auf Ihre Anforderungen abgestimmt."
                },
                {
                  step: 3,
                  title: "Design & Entwicklung",
                  description: "Ihr Projekt nimmt Gestalt an. Modernste Frameworks und eine zukunftssichere Architektur bilden das Fundament. Agile Entwicklungszyklen ermöglichen kontinuierliches Feedback. State-of-the-Art UI/UX-Design sorgt für begeisterte Nutzer."
                },
                {
                  step: 4,
                  title: "Testing & Optimierung",
                  description: "Umfassende Tests garantieren höchste Qualität. Performance-Optimierung und Sicherheitsaudits schaffen eine robuste Basis. Usability-Tests mit echten Nutzern verfeinern die User Experience. Code-Reviews und automatisierte Tests sichern die technische Exzellenz."
                },
                {
                  step: 5,
                  title: "Launch & Evolution",
                  description: "Der Go-Live ist erst der Anfang. Kontinuierliche Updates, proaktives Monitoring und schneller Support halten Ihr Produkt an der Spitze. Analysen und Nutzer-Feedback treiben die stetige Evolution voran. Ihr Erfolg ist unser gemeinsames Ziel."
                }
              ].map((item, index) => (
                <div key={item.step} className="timeline-step" data-step={item.step}>
                  <div className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Timeline Point */}
                    <div className="absolute left-1/2 top-1/2 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-primary rounded-full animate-pulse" />
                        <div className="absolute inset-[-4px] bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                    {/* Content Card */}
                    <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="timeline-card rounded-2xl p-8">
                        {/* Glowing Number */}
                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg timeline-number">
                          {item.step}
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-col gap-6">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                              {getStepIcon(item.step)}
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                              <h3 className="text-2xl font-bold">
                                {item.title}
                              </h3>
                              <p className="text-base leading-relaxed font-['Nimbus_Mono']">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="section-inner">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background with blur */}
            <div className="absolute inset-0 bg-white/75 dark:bg-[#0A0A0A]/75 backdrop-blur-lg" />

            {/* Gradient overlays */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mb-16"
              >
                {/* Content */}
                <div className="relative">
                  <div className="flex flex-col items-start">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h2 className="heading text-2xl sm:text-3xl lg:text-4xl mb-2 font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                        Lassen Sie uns über Ihr Projekt sprechen
                      </h2>
                      <div className="w-20 h-1 bg-primary rounded-full mb-6" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="max-w-xl"
                    >
                      <p className="text-base sm:text-lg text-foreground/80 dark:text-foreground-dark/80 font-['Nimbus_Mono'] leading-relaxed">
                        Ich freue mich darauf, mehr über Ihre Ideen zu erfahren und gemeinsam die perfekte Lösung zu entwickeln.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                {/* Contact Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-2 space-y-4"
                >
                  {/* Email Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group p-6 bg-white dark:bg-[#0A0A0A] rounded-xl border border-border dark:border-border-dark overflow-hidden relative hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold">E-Mail</h3>
                      </div>
                      <a href="mailto:kontakt@tiryaki.eu" className="text-foreground/60 dark:text-foreground-dark/60 hover:text-primary transition-colors font-['Nimbus_Mono']">
                        kontakt@tiryaki.eu
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group p-6 bg-white dark:bg-[#0A0A0A] rounded-xl border border-border dark:border-border-dark overflow-hidden relative hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 005.516 5.516l.774-1.548a1 1 0 011.21-.502l4.435.74a1 1 0 01.836.986V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold">Telefon</h3>
                      </div>
                      <a href="tel:01634895658" className="text-foreground/60 dark:text-foreground-dark/60 hover:text-primary transition-colors font-['Nimbus_Mono']">
                        0163 489 5658
                      </a>
                    </div>
                  </motion.div>

                  {/* WhatsApp Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group p-6 bg-white dark:bg-[#0A0A0A] rounded-xl border border-border dark:border-border-dark overflow-hidden relative hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.48-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9h.01M8 15h.01M16 9h.01M16 15h.01" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold">WhatsApp</h3>
                      </div>
                      <a
                        href="https://wa.me/491634895658"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 dark:text-foreground-dark/60 hover:text-primary transition-colors font-['Nimbus_Mono']"
                      >
                        WhatsApp Chat öffnen
                      </a>
                      <p className="mt-2 text-xs text-foreground/40 dark:text-foreground-dark/40 font-['Nimbus_Mono']">
                        Hinweis: Beim Kontakt via WhatsApp können Kosten durch die Nutzung des Internets entstehen, die abhängig von Ihrem persönlichen Netzanbieter sind.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:col-span-3"
                >
                  <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl border border-border dark:border-border-dark relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <label htmlFor="name" className="block text-sm font-['Nimbus_Mono'] text-foreground/80 dark:text-foreground-dark/80 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-background/50 dark:bg-background-dark/50 backdrop-blur-sm border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <label htmlFor="email" className="block text-sm font-['Nimbus_Mono'] text-foreground/80 dark:text-foreground-dark/80 mb-2">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-background/50 dark:bg-background-dark/50 backdrop-blur-sm border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label htmlFor="subject" className="block text-sm font-['Nimbus_Mono'] text-foreground/80 dark:text-foreground-dark/80 mb-2">
                        Betreff
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-background/50 dark:bg-background-dark/50 backdrop-blur-sm border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label htmlFor="message" className="block text-sm font-['Nimbus_Mono'] text-foreground/80 dark:text-foreground-dark/80 mb-2">
                        Nachricht
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 bg-background/50 dark:bg-background-dark/50 backdrop-blur-sm border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                      ></textarea>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative font-['Nimbus_Mono']">
                          {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                        </span>
                      </button>
                    </motion.div>
                    {formStatus.type && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${formStatus.type === 'success'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                          }`}
                      >
                        {formStatus.message}
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    const iconContainer = iconRef.current;

    if (!card || !content || !iconContainer) return;

    const iconTl = gsap.timeline({ repeat: -1 });
    const tl = gsap.timeline({ paused: true });

    // Initiale 3D-Einstellungen
    gsap.set(card, {
      transformPerspective: 1000,
      transformStyle: "preserve-3d"
    });

    // Icon-Animation
    iconTl.to(iconContainer, {
      rotateY: 360,
      duration: 20,
      ease: "none"
    });

    // Hover-Animation
    tl.to(card, {
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out"
    })
      .to(content, {
        y: -15,
        z: 80,
        duration: 0.4,
        ease: "power2.out"
      }, 0)
      .to(iconContainer, {
        scale: 1.2,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

    // Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const maxRotation = 10;
      const rotateX = (mouseY / (rect.height / 2)) * -maxRotation;
      const rotateY = (mouseX / (rect.width / 2)) * maxRotation;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      tl.play();
      const cardBg = card.querySelector('.card-bg');
      if (cardBg) {
        gsap.to(cardBg, {
          opacity: 1,
          scale: 1.1,
          duration: 0.4
        });
      }
    };

    const handleMouseLeave = () => {
      tl.reverse();
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      });

      const cardBg = card.querySelector('.card-bg');
      const glare = card.querySelector('.glare');

      if (cardBg) {
        gsap.to(cardBg, {
          opacity: 0,
          scale: 1,
          duration: 0.4
        });
      }

      if (glare) {
        gsap.to(glare, {
          opacity: 0,
          scale: 1,
          duration: 0.4
        });
      }
    };

    // Event Listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      iconTl.kill();
      tl.kill();
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative min-h-[350px] p-8 rounded-2xl bg-gradient-to-br from-background-light/20 via-background-light/10 to-transparent dark:from-background-dark/20 dark:via-background-dark/10 dark:to-transparent backdrop-blur-lg border border-white/5 overflow-hidden cursor-pointer transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="card-bg absolute inset-0 opacity-0 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="glare absolute w-[200%] h-[200%] bg-gradient-radial from-white/40 via-white/10 to-transparent rounded-full blur-2xl opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={iconRef}
          className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center backdrop-blur-sm mb-6 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 rounded-xl" />
          <div className="relative z-10 transform-gpu">
            {icon}
          </div>
        </div>

        <h3
          className="text-xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 dark:from-foreground-dark dark:via-foreground-dark/90 dark:to-foreground-dark/80 bg-clip-text text-transparent"
          style={{ transform: 'translateZ(30px)' }}
        >
          {title}
        </h3>
        <p
          className="text-foreground/60 dark:text-foreground-dark/60 font-['Nimbus_Mono'] leading-relaxed"
          style={{ transform: 'translateZ(20px)' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// Skill Bar Component
function SkillBar({ skill, level }: { skill: string; level: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground/80 dark:text-foreground-dark/80 font-['Nimbus_Mono']">{skill}</span>
        <span className="text-sm text-primary font-['Nimbus_Mono']">{level}%</span>
      </div>
      <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}

// Tech Item Component
function TechItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#00A5A8]" />
      <span className="text-foreground/60 dark:text-foreground-dark/80 font-['Nimbus_Mono']">{children}</span>
    </div>
  );
}

function BenefitItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-bold text-[#00A5A8] mb-1">{title}</h4>
      <p className="text-gray-400 font-['Nimbus_Mono']">{children}</p>
    </div>
  );
}

// Helper functions for step content
function getStepTitle(step: number) {
  const titles = {
    1: "Vision & Discovery",
    2: "Strategie & Architektur",
    3: "Design & Entwicklung",
    4: "Testing & Optimierung",
    5: "Launch & Evolution"
  };
  return titles[step as keyof typeof titles];
}

function getStepDescription(step: number) {
  const descriptions = {
    1: "In intensiven Gesprächen tauchen wir tief in Ihre Vision ein. Wir analysieren Ihre Zielgruppe, definieren Kernfunktionen und identifizieren technische Anforderungen. Hier entstehen die Grundpfeiler Ihres erfolgreichen digitalen Produkts.",
    2: "Mit modernsten Tools entwickeln wir eine maßgeschneiderte Strategie. Die Systemarchitektur wird auf Skalierbarkeit und Zukunftssicherheit ausgelegt. Technologie-Stack und Entwicklungs-Roadmap werden präzise auf Ihre Anforderungen abgestimmt.",
    3: "Ihr Projekt nimmt Gestalt an. Modernste Frameworks und eine zukunftssichere Architektur bilden das Fundament. Agile Entwicklungszyklen ermöglichen kontinuierliches Feedback. State-of-the-Art UI/UX-Design sorgt für begeisterte Nutzer.",
    4: "Umfassende Tests garantieren höchste Qualität. Performance-Optimierung und Sicherheitsaudits schaffen eine robuste Basis. Usability-Tests mit echten Nutzern verfeinern die User Experience. Code-Reviews und automatisierte Tests sichern die technische Exzellenz.",
    5: "Der Go-Live ist erst der Anfang. Kontinuierliche Updates, proaktives Monitoring und schneller Support halten Ihr Produkt an der Spitze. Analysen und Nutzer-Feedback treiben die stetige Evolution voran. Ihr Erfolg ist unser gemeinsames Ziel."
  };
  return descriptions[step as keyof typeof descriptions];
}

// Helper function for step icons
function getStepIcon(step: number) {
  const icons = {
    1: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    2: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01M9 15h.01M16 9h.01M16 15h.01" />,
    3: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    4: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    5: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[step as keyof typeof icons]}
    </svg>
  );
}

