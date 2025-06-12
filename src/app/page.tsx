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
import { ModernWorkplaceIcon } from './components/ModernWorkplaceIcon';
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

  // Code Lab States
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [typedCode, setTypedCode] = useState('');
  const [showCursor, setShowCursor] = useState(true);

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

  useEffect(() => {
    const codeString = `async function createInnovation() {
      // Fetch innovation data
      try {
        const response = await fetch('https://api.tirlogy.com/innovation');
        const data = await response.json();
        // Log the result
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
    }`;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < codeString.length) {
        setTypedCode(codeString.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Cursor blinken
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
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

  // Code Lab Functions
  const handleRunCode = () => {
    if (isCompleted) {
      window.open('https://tirlogy.de/vision', '_blank');
      return;
    }

    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setOutput(JSON.stringify({ success: 'Innovation created!' }, null, 2));
      setIsRunning(false);
      setIsCompleted(true);
    }, 1500);
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
                  <ModernWorkplaceIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
                  ModernWorkplace
                </h3>
                <p className="text-sm text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
                  Transformation zu digitalen Arbeitsplätzen der Zukunft. Microsoft 365 Integration, Cloud-Migration und moderne Collaboration-Tools. Effiziente Remote-Work-Lösungen für maximale Produktivität und Flexibilität.
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
                  description: "In intensiven Gesprächen tauchen wir tief in Deine Vision ein. Wir analysieren Deine Zielgruppe, definieren Kernfunktionen und identifizieren technische Anforderungen. Hier entstehen die Grundpfeiler Deines erfolgreichen digitalen Produkts."
                },
                {
                  step: 2,
                  title: "Strategie & Architektur",
                  description: "Mit modernsten Tools entwickeln wir eine maßgeschneiderte Strategie. Die Systemarchitektur wird auf Skalierbarkeit und Zukunftssicherheit ausgelegt. Technologie-Stack und Entwicklungs-Roadmap werden präzise auf Deine Anforderungen abgestimmt."
                },
                {
                  step: 3,
                  title: "Design & Entwicklung",
                  description: "Dein Projekt nimmt Gestalt an. Modernste Frameworks und eine zukunftssichere Architektur bilden das Fundament. Agile Entwicklungszyklen ermöglichen kontinuierliches Feedback. State-of-the-Art UI/UX-Design sorgt für begeisterte Nutzer."
                },
                {
                  step: 4,
                  title: "Testing & Optimierung",
                  description: "Umfassende Tests garantieren Dir höchste Qualität. Performance-Optimierung und Sicherheitsaudits schaffen eine robuste Basis. Usability-Tests mit echten Nutzern verfeinern Deine User Experience. Code-Reviews und automatisierte Tests sichern Deine technische Exzellenz."
                },
                {
                  step: 5,
                  title: "Launch & Evolution",
                  description: "Der Go-Live ist erst der Anfang. Kontinuierliche Updates, proaktives Monitoring und schneller Support halten Dein Produkt an der Spitze. Analysen und Nutzer-Feedback treiben die stetige Evolution voran. Dein Erfolg ist unser gemeinsames Ziel."
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

      {/* Code Lab Section */}
      <section className="section relative overflow-hidden py-10 bg-transparent">
        <div className="section-inner max-w-[1200px] mx-auto">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {/* Window Controls */}
            <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-[#1E1E1E] border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/90" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                  <div className="w-3 h-3 rounded-full bg-green-500/90" />
                </div>
                <div className="flex items-center ml-2">
                  <Image
                    src="/tiryaki_it_ki_playground.png"
                    alt="Logo"
                    width={16}
                    height={16}
                    className="w-4 h-4 mr-2 brightness-0 dark:invert"
                  />
                  <span className="text-sm text-zinc-600 dark:text-gray-400">Create Innovation</span>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="p-6 font-mono text-sm bg-zinc-50 dark:bg-[#1E1E1E] border-b border-zinc-200 dark:border-zinc-800 h-[300px] overflow-y-auto">
              <pre className="text-zinc-800 dark:text-[#D4D4D4] whitespace-pre-wrap">
                {typedCode.split('\n').map((line, index, array) => (
                  <div key={index}>
                    {line.split(' ').map((word, wordIndex, wordArray) => {
                      const isLastWordInLastLine = index === array.length - 1 && wordIndex === wordArray.length - 1;
                      const wordContent = (
                        <>
                          {word.match(/^(async|function|try|catch|await|const|return)$/) ? (
                            <span className="text-primary dark:text-[#569CD6]">{word}</span>
                          ) : word.match(/^(createInnovation|fetch|json|log|error)$/) ? (
                            <span className="text-primary/80 dark:text-[#DCDCAA]">{word}</span>
                          ) : word.startsWith('//') ? (
                            <span className="text-primary/60 dark:text-[#6A9955]">{word}</span>
                          ) : word.match(/^'.*'$/) ? (
                            <span className="text-primary/70 dark:text-[#CE9178]">{word}</span>
                          ) : (
                            word
                          )}
                          {isLastWordInLastLine ? (
                            <span className={`inline-block w-[2px] h-[1.2em] align-middle ${showCursor ? 'bg-primary dark:bg-white' : 'bg-transparent'}`} />
                          ) : ' '}
                        </>
                      );
                      return <span key={wordIndex}>{wordContent}</span>;
                    })}
                  </div>
                ))}
              </pre>
            </div>

            {/* Terminal Output */}
            <div className="p-6 font-mono text-sm bg-white dark:bg-[#1E1E1E] h-[200px] overflow-y-auto">
              <div className="text-zinc-500 dark:text-gray-400 mb-2">$ node script.js</div>
              {output ? (
                <>
                  <div className="text-primary dark:text-green-400">{'{'}"success": "Innovation created!"{'}'}</div>
                  <div className="mt-2 text-zinc-500 dark:text-gray-400">To get your innovation, click on "Get Innovation"</div>
                </>
              ) : isRunning ? (
                <div className="text-primary dark:text-blue-400">Running...</div>
              ) : (
                <div className="text-zinc-400 dark:text-gray-500">Click "Run Code" to execute</div>
              )}
            </div>

            {/* Run Button Container */}
            <div className="p-6 bg-white dark:bg-[#1E1E1E] border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={handleRunCode}
                className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-lg 
                relative overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white dark:hover:text-white
                before:absolute before:content-[''] before:bg-primary 
                before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                before:w-0 before:h-0 before:rounded-full before:opacity-0
                before:transition-all before:duration-500 before:ease-out
                hover:before:w-[300px] hover:before:h-[300px] hover:before:opacity-100
                active:scale-95"
              >
                <span className="relative z-10 font-medium">{isCompleted ? "Get Innovation" : isRunning ? "Running..." : "Run Code"}</span>
              </button>
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
    1: "In intensiven Gesprächen tauchen wir tief in Deine Vision ein. Wir analysieren Deine Zielgruppe, definieren Kernfunktionen und identifizieren technische Anforderungen. Hier entstehen die Grundpfeiler Deines erfolgreichen digitalen Produkts.",
    2: "Mit modernsten Tools entwickeln wir eine maßgeschneiderte Strategie. Die Systemarchitektur wird auf Skalierbarkeit und Zukunftssicherheit ausgelegt. Technologie-Stack und Entwicklungs-Roadmap werden präzise auf Deine Anforderungen abgestimmt.",
    3: "Dein Projekt nimmt Gestalt an. Modernste Frameworks und eine zukunftssichere Architektur bilden das Fundament. Agile Entwicklungszyklen ermöglichen kontinuierliches Feedback. State-of-the-Art UI/UX-Design sorgt für begeisterte Nutzer.",
    4: "Umfassende Tests garantieren Dir höchste Qualität. Performance-Optimierung und Sicherheitsaudits schaffen eine robuste Basis. Usability-Tests mit echten Nutzern verfeinern Deine User Experience. Code-Reviews und automatisierte Tests sichern Deine technische Exzellenz.",
    5: "Der Go-Live ist erst der Anfang. Kontinuierliche Updates, proaktives Monitoring und schneller Support halten Dein Produkt an der Spitze. Analysen und Nutzer-Feedback treiben die stetige Evolution voran. Dein Erfolg ist unser gemeinsames Ziel."
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

// ... existing code ...
{/* Technologie-Showcase Section */ }
<section className="py-20 sm:py-32 section bg-gradient-to-b from-background to-background/50 dark:from-background-dark dark:to-background-dark/50">
  <div className="w-[90%] max-w-[1600px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground dark:text-white">
        Technologie-Stack
      </h2>
      <p className="text-foreground/70 dark:text-white max-w-2xl mx-auto font-['Nimbus_Mono']">
        Moderne Technologien für moderne Lösungen. Hier sind einige der Tools und Frameworks, mit denen ich arbeite.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Web Development Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
        className="group relative p-8 rounded-xl bg-white/50 dark:bg-foreground-dark/5 backdrop-blur-sm border border-primary/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative z-10">
          <div className="w-16 h-16 mb-6">
            <WebDevIcon />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white">Web Development</h3>
          <div className="space-y-2 text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
            <p>Next.js & React</p>
            <p>TypeScript</p>
            <p>Tailwind CSS</p>
            <p>Node.js</p>
          </div>
        </div>
      </motion.div>

      {/* Mobile Development Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
        className="group relative p-8 rounded-xl bg-white/50 dark:bg-foreground-dark/5 backdrop-blur-sm border border-primary/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative z-10">
          <div className="w-16 h-16 mb-6">
            <IOSIcon />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white">Mobile Development</h3>
          <div className="space-y-2 text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
            <p>iOS (Swift & SwiftUI)</p>
            <p>React Native</p>
            <p>Flutter</p>
            <p>Native APIs</p>
          </div>
        </div>
      </motion.div>

      {/* AI & ML Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
        className="group relative p-8 rounded-xl bg-white/50 dark:bg-foreground-dark/5 backdrop-blur-sm border border-primary/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative z-10">
          <div className="w-16 h-16 mb-6">
            <AIIcon />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white">KI & Machine Learning</h3>
          <div className="space-y-2 text-foreground/70 dark:text-white/70 font-['Nimbus_Mono']">
            <p>OpenAI & LangChain</p>
            <p>TensorFlow & PyTorch</p>
            <p>Computer Vision</p>
            <p>NLP & LLMs</p>
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-16 text-center"
    >
      <Link
        href="/vision"
        className="group inline-flex items-center gap-2 text-foreground/70 dark:text-white/70 hover:text-primary dark:hover:text-primary transition-colors duration-300 font-['Nimbus_Mono']"
      >
        <span>Mehr über meine Vision erfahren</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </motion.div>
  </div>
</section>
// ... existing code ...

