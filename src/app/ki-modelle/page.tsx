'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Header } from '../components/Header';

// Komponente für ein einzelnes KI-Modell
const ModelCard = ({ title, description, features, icon }: {
  title: string;
  description: string;
  features: string[];
  icon: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-lg dark:shadow-primary/5 border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/5 flex items-center justify-center flex-shrink-0">
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="text-primary"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 text-foreground dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 dark:text-white/70 mb-4">
            {description}
          </p>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-sm text-foreground/60 dark:text-white/60">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Komponente für den Modell-Bereich
const ModelSection = ({ title, description, inputPlaceholder, onSubmit, isLoading, result, type }: {
  title: string;
  description: string;
  inputPlaceholder: string;
  onSubmit: (input: string) => Promise<void>;
  isLoading: boolean;
  result: any;
  type: 'text' | 'image' | 'video';
}) => {
  const [input, setInput] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-2xl"
    >
      {/* Header mit Logo */}
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
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-medium text-primary bg-primary/5 dark:bg-primary/10 rounded-full ring-1 ring-primary/20">Beta</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          className="w-full h-32 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <span className="font-semibold">Wichtiger Hinweis:</span> Dies ist eine KI-generierte Ausgabe. Die Ergebnisse können ungenau oder fehlerhaft sein. Bitte überprüfen Sie alle Informationen sorgfältig vor der Verwendung.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSubmit(input)}
          disabled={isLoading || !input.trim()}
          className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verarbeite...' : 'Generieren'}
        </button>

        {isLoading && (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {result && (
          <div className="mt-6">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Dieses Ergebnis wurde von einer KI generiert. Bitte beachten Sie:
                </p>
              </div>
              <ul className="mt-2 ml-7 list-disc text-sm text-blue-700 dark:text-blue-300">
                <li>Die Ausgabe kann Fehler oder Ungenauigkeiten enthalten</li>
                <li>Überprüfen Sie alle Fakten und Informationen</li>
                <li>Nutzen Sie das Ergebnis nur als Inspiration oder Ausgangspunkt</li>
              </ul>
            </div>
            {type === 'text' && (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{result}</p>
              </div>
            )}
            {type === 'image' && (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={result}
                  alt="Generiertes Bild"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {type === 'video' && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <video
                  src={result}
                  controls
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function KIModelle() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Initial check and event listener for dark mode
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const [textLoading, setTextLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [textResult, setTextResult] = useState('');
  const [imageResult, setImageResult] = useState('');

  const handleTextSubmit = async (input: string) => {
    setTextLoading(true);
    try {
      const response = await fetch('/api/generate/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setTextResult(data.result);
    } catch (error) {
      console.error('Fehler bei der Textgenerierung:', error);
    }
    setTextLoading(false);
  };

  const handleImageSubmit = async (input: string) => {
    setImageLoading(true);
    try {
      const response = await fetch('/api/generate/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setImageResult(data.result);
    } catch (error) {
      console.error('Fehler bei der Bildgenerierung:', error);
    }
    setImageLoading(false);
  };

  const models = [
    {
      title: "Mixtral-8x7B",
      description: "Ein hochmodernes Sprachmodell mit beeindruckender Leistung in verschiedenen Aufgabenbereichen.",
      features: [
        "Fortgeschrittenes Reasoning",
        "Mehrsprachige Unterstützung",
        "Code-Generierung und -Analyse",
        "Kontextverständnis"
      ],
      icon: "/icons/mixtral.svg"
    },
    {
      title: "Flan-T5",
      description: "Spezialisiert auf präzise Textgenerierung und -transformation mit hoher Qualität.",
      features: [
        "Effiziente Textverarbeitung",
        "Optimierte Antwortgenerierung",
        "Multilinguale Fähigkeiten",
        "Schnelle Verarbeitung"
      ],
      icon: "/icons/flan.svg"
    },
    {
      title: "Claude 3 Opus",
      description: "Anthropics fortschrittlichstes KI-Modell mit außergewöhnlicher Leistung und Vielseitigkeit.",
      features: [
        "Komplexe Problemlösung",
        "Kreative Textgenerierung",
        "Detaillierte Analysen",
        "Ethische Prinzipien"
      ],
      icon: "/icons/claude.svg"
    },
    {
      title: "GPT-4 Turbo",
      description: "Das leistungsstärkste Modell von OpenAI mit erweitertem Kontext und verbesserter Genauigkeit.",
      features: [
        "Erweiterte Kontextverarbeitung",
        "Präzise Antworten",
        "Vielseitige Anwendungen",
        "Aktuelle Informationen"
      ],
      icon: "/icons/gpt.svg"
    }
  ];

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 sm:top-6 safe-padding">
        <motion.div
          className="w-[90%] max-w-[1600px] mx-auto"
          animate={{
            backgroundColor: isScrolled
              ? isDark
                ? 'rgba(10, 10, 10, 0.6)'
                : 'rgba(255, 255, 255, 0.6)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderRadius: isScrolled ? '24px' : '0px',
            boxShadow: isScrolled
              ? isDark
                ? '0 0 30px 0 rgba(0, 165, 168, 0.2)'
                : '0 0 30px 0 rgba(0, 165, 168, 0.1)'
              : 'none',
            padding: isScrolled ? '8px 24px' : '0px',
          }}
          transition={{ duration: 0.2 }}
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
            <div className="flex-1" />
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/#about"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 font-['Nimbus_Mono']"
              >
                ÜBER MICH
              </Link>
              <Link
                href="/#services"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 font-['Nimbus_Mono']"
              >
                DIENSTLEISTUNGEN
              </Link>
              <Link
                href="/ki-modelle"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full bg-primary/10 text-primary font-['Nimbus_Mono']"
              >
                KI-MODELLE
              </Link>
              <Link
                href="/#contact"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 font-['Nimbus_Mono']"
              >
                KONTAKT
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 safe-padding">
        <div className="w-[90%] max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground dark:text-foreground-dark font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
              KI-Modelle Testen
            </h1>
            <p className="text-lg text-foreground/70 dark:text-foreground-dark/70 max-w-3xl font-['Nimbus_Mono']">
              Experimentieren Sie mit unseren KI-Modellen. Geben Sie einen Text ein und lassen Sie die KI Text, Bilder oder Videos generieren.
            </p>
          </motion.div>

          <div className="flex flex-col space-y-6">
            <ModelSection
              title="Text zu Text"
              description="Generieren Sie kreative Texte, Übersetzungen oder Zusammenfassungen mit unserem Sprachmodell."
              inputPlaceholder="Geben Sie einen Text ein, z.B. 'Schreibe eine kurze Geschichte über einen Roboter, der Kunst erschafft.'"
              onSubmit={handleTextSubmit}
              isLoading={textLoading}
              result={textResult}
              type="text"
            />

            <ModelSection
              title="Text zu Bild"
              description="Lassen Sie Ihre Textbeschreibungen in einzigartige Bilder umwandeln."
              inputPlaceholder="Beschreiben Sie das gewünschte Bild, z.B. 'Ein futuristischer Roboter malt ein Ölgemälde in einem modernen Atelier.'"
              onSubmit={handleImageSubmit}
              isLoading={imageLoading}
              result={imageResult}
              type="image"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border dark:border-border-dark">
        <div className="w-[90%] max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-foreground/60 dark:text-foreground-dark/60 text-sm">
              © {new Date().getFullYear()} Tirlogy. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <ThemeSwitcher />
              <Link
                href="/datenschutz"
                className="text-sm text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                Datenschutzerklärung
              </Link>
              <Link
                href="/impressum"
                className="text-sm text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 