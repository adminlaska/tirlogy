'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MainNav } from '../components/MainNav';
import { Footer } from '../components/Footer';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  PhoneIcon,
  DocumentTextIcon,
  PlayIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "Wie lange dauert die Entwicklung meines Projekts?",
    answer: "Die Entwicklungszeit hängt von der Komplexität und dem Umfang Ihres Projekts ab. Eine einfache Website kann 2-4 Wochen dauern, während komplexe SaaS-Anwendungen 3-6 Monate benötigen können. Ich erstelle einen detaillierten Zeitplan nach unserem ersten Gespräch.",
    category: "Projektablauf"
  },
  {
    question: "Welche Technologien verwenden Sie für die Entwicklung?",
    answer: "Ich verwende moderne, bewährte Technologien: Next.js/React für Web-Entwicklung, Swift/SwiftUI für iOS-Apps, Node.js für Backend-Systeme und OpenAI/TensorFlow für KI-Integration. Die Auswahl richtet sich nach Ihren spezifischen Anforderungen.",
    category: "Technologie"
  },
  {
    question: "Bieten Sie auch laufenden Support nach der Entwicklung?",
    answer: "Ja, absolut! Ich biete verschiedene Support-Pakete an: von grundlegendem Wartungsservice bis hin zu umfassender technischer Betreuung. Updates, Bugfixes und Erweiterungen gehören zu meinem Service-Angebot.",
    category: "Support"
  },
  {
    question: "Können Sie KI in mein bestehendes System integrieren?",
    answer: "Definitiv! Ich analysiere Ihr bestehendes System und entwickle maßgeschneiderte KI-Lösungen - von Chatbots über Automatisierung bis hin zu intelligenter Datenanalyse. Die Integration erfolgt nahtlos und sicher.",
    category: "KI-Integration"
  },
  {
    question: "Wie funktioniert die Zusammenarbeit bei der Entwicklung?",
    answer: "Ich arbeite agil und transparent: regelmäßige Updates, Demo-Versionen und enger Austausch. Sie sind immer über den Fortschritt informiert und können jederzeit Feedback geben und Anpassungen vorschlagen.",
    category: "Projektablauf"
  },
  {
    question: "Was kostet die Entwicklung einer mobilen App?",
    answer: "Die Kosten variieren je nach Features und Komplexität. Eine einfache iOS-App startet ab 8.000€, komplexe Apps mit Backend-Integration ab 15.000€. Nach einem kostenlosen Beratungsgespräch erhalten Sie ein transparentes Angebot.",
    category: "Preise"
  }
];

interface SupportOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  availability: string;
  responseTime: string;
}

const supportOptions: SupportOption[] = [
  {
    title: "Live Chat",
    description: "Sofortige Hilfe bei dringenden Fragen",
    icon: <ChatBubbleLeftIcon className="w-8 h-8" />,
    action: "Chat starten",
    availability: "Mo-Fr, 9-18 Uhr",
    responseTime: "< 5 Minuten"
  },
  {
    title: "E-Mail Support",
    description: "Detaillierte Unterstützung für komplexe Themen",
    icon: <DocumentTextIcon className="w-8 h-8" />,
    action: "E-Mail senden",
    availability: "24/7",
    responseTime: "< 24 Stunden"
  },
  {
    title: "Telefon-Support",
    description: "Persönliche Beratung für Ihre Projekte",
    icon: <PhoneIcon className="w-8 h-8" />,
    action: "Termin buchen",
    availability: "Nach Vereinbarung",
    responseTime: "Individuell"
  },
  {
    title: "Video-Tutorials",
    description: "Schritt-für-Schritt Anleitungen",
    icon: <PlayIcon className="w-8 h-8" />,
    action: "Tutorials ansehen",
    availability: "24/7 verfügbar",
    responseTime: "Sofort"
  }
];

const FAQAccordion = ({ item, isOpen, onClick }: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <motion.div
    className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
    initial={false}
  >
    <button
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-300"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 pr-4">
        {item.question}
      </h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDownIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
      </motion.div>
    </button>

    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-4 pt-2">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const SupportCard = ({ option, index }: { option: SupportOption; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
  >
    {/* Hintergrund-Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

    <div className="relative z-10">
      {/* Icon */}
      <div className="w-16 h-16 bg-primary/10 dark:bg-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
        <div className="text-primary">
          {option.icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors duration-300">
        {option.title}
      </h3>

      <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
        {option.description}
      </p>

      {/* Meta-Informationen */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
          <CheckCircleIcon className="w-4 h-4 text-green-500" />
          <span>{option.availability}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
          <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
          <span>Antwortzeit: {option.responseTime}</span>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25"
      >
        {option.action}
      </motion.button>
    </div>
  </motion.div>
);

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  // Kategorien aus FAQ-Daten extrahieren
  const categories = ['Alle', ...Array.from(new Set(faqData.map(item => item.category)))];

  // FAQ-Daten nach Kategorie filtern
  const filteredFAQ = selectedCategory === 'Alle'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="support" />

      <main className="min-h-screen w-full px-6 py-24 md:py-32">
        {/* Hero Section */}
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
              Support & Hilfe
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/80 dark:text-foreground-dark/80"
            >
              Ich bin hier, um Ihnen zu helfen. Finden Sie Antworten oder kontaktieren Sie mich direkt.
            </motion.p>
          </div>
        </motion.section>

        {/* Support-Optionen */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-7xl mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-foreground dark:text-foreground-dark">
            Wie kann ich Ihnen helfen?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <SupportCard key={option.title} option={option} index={index} />
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground dark:text-foreground-dark">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-foreground/70 dark:text-foreground-dark/70">
              Finden Sie schnell Antworten auf die wichtigsten Fragen
            </p>
          </div>

          {/* Kategorie Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQ.map((item, index) => (
              <FAQAccordion
                key={index}
                item={item}
                isOpen={openFAQ === `${index}`}
                onClick={() => setOpenFAQ(openFAQ === `${index}` ? null : `${index}`)}
              />
            ))}
          </div>
        </motion.section>

        {/* Kontakt CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Hintergrund-Animationen */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 1.5, 1, 0],
                    opacity: [0, 0.8, 1, 0.8, 0],
                    transition: {
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground dark:text-foreground-dark">
                Haben Sie noch Fragen?
              </h3>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-foreground/80 dark:text-foreground-dark/80">
                Kontaktieren Sie mich direkt für eine persönliche Beratung zu Ihrem Projekt.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  Beratungstermin buchen
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors duration-300"
                >
                  E-Mail schreiben
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
} 