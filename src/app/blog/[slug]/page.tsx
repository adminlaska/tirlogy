'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MainNav } from '../../components/MainNav';
import { Footer } from '../../components/Footer';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { use, useMemo, useEffect, useRef, useState } from 'react';
import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';

// Die gleichen Blog-Daten wie in der Übersicht
const blogPosts = [
  {
    id: "ki-revolution-2024",
    title: "Die KI-Revolution 2024: Was wirklich wichtig ist",
    excerpt: "Ein tiefer Einblick in die neuesten KI-Entwicklungen und wie sie unser digitales Leben transformieren werden.",
    content: `
<h2>Die KI-Revolution 2024: Was wirklich wichtig ist</h2>

<p>Künstliche Intelligenz (KI) entwickelt sich rasant weiter und prägt immer stärker unseren Alltag. Im Jahr 2024 stehen wir an einem Wendepunkt, an dem neue Technologien, Algorithmen und Anwendungsfälle unser digitales Leben nachhaltig verändern.</p>

<h3>Aktuelle Trends</h3>

<ul>
<li><strong>Generative KI</strong>: Tools wie ChatGPT, DALL·E und CoPilot revolutionieren die Art, wie wir arbeiten und kommunizieren.</li>
<li><strong>Automatisierung</strong>: Immer mehr Geschäftsprozesse werden durch KI effizienter und fehlerfreier gestaltet.</li>
<li><strong>Ethik & Verantwortung</strong>: Die Diskussion um den verantwortungsvollen Einsatz von KI ist wichtiger denn je.</li>
</ul>

<h3>Chancen für Unternehmen</h3>

<p>Unternehmen, die frühzeitig auf KI setzen, profitieren von Wettbewerbsvorteilen, effizienteren Abläufen und innovativen Produkten.</p>

<h3>Fazit</h3>

<p>Die KI-Revolution ist in vollem Gange. Entscheidend ist, die richtigen Trends zu erkennen und verantwortungsvoll zu nutzen.</p>
    `,
    author: "Ömer Tiryaki",
    date: "2024-06-01",
    readTime: "8 min",
    tags: ["KI", "Innovation", "Zukunft"],
    image: "/blog/ki-revolution-2024.jpg",
    featured: true
  },
  {
    id: "nextjs-best-practices",
    title: "Next.js 15: Die besten Performance-Optimierungen",
    excerpt: "Entdecke die neuesten Features von Next.js 15 und lerne, wie du deine Web-Apps auf das nächste Level bringst.",
    content: `
<h2>Next.js 15: Die besten Performance-Optimierungen</h2>

<p>Next.js 15 bringt viele neue Features mit, die deine Web-Apps schneller und effizienter machen. In diesem Artikel zeige ich dir die wichtigsten Optimierungen.</p>

<h3>Server Components</h3>

<p>Server Components sind der Game-Changer für Performance. Sie reduzieren die Bundle-Größe erheblich und verbessern die Ladezeiten.</p>

<h3>Image Optimization</h3>

<p>Die neue Image-Komponente optimiert Bilder automatisch für verschiedene Bildschirmgrößen und Formate.</p>

<h3>Turbopack</h3>

<p>Der neue Bundler Turbopack ist bis zu 700x schneller als Webpack und macht die Entwicklung noch angenehmer.</p>

<h3>Fazit</h3>

<p>Next.js 15 setzt neue Maßstäbe in Sachen Performance und Developer Experience.</p>
    `,
    author: "Ömer Tiryaki",
    date: "2024-05-28",
    readTime: "12 min",
    tags: ["Next.js", "React", "Performance"],
    image: "/blog/nextjs-performance.jpg",
    featured: false
  },
  {
    id: "ios-swift-ui-trends",
    title: "SwiftUI vs. UIKit: Der ultimative Vergleich 2024",
    excerpt: "Eine detaillierte Analyse der iOS-Entwicklung mit SwiftUI und UIKit - welches Framework passt zu deinem Projekt?",
    content: `
<h2>SwiftUI vs. UIKit: Der ultimative Vergleich 2024</h2>

<p>Die Wahl zwischen SwiftUI und UIKit ist eine der wichtigsten Entscheidungen bei der iOS-Entwicklung. Beide haben ihre Stärken und Schwächen.</p>

<h3>SwiftUI - Die Zukunft</h3>

<p>SwiftUI ist Apples modernes UI-Framework mit deklarativer Syntax. Es macht die Entwicklung schneller und intuitiver.</p>

<h3>UIKit - Der bewährte Standard</h3>

<p>UIKit ist ausgereift, stabil und bietet maximale Kontrolle über die UI. Für komplexe Apps oft noch die bessere Wahl.</p>

<h3>Empfehlung</h3>

<p>Für neue Projekte empfehle ich SwiftUI, aber UIKit-Kenntnisse bleiben wichtig für Legacy-Code und spezielle Anforderungen.</p>
    `,
    author: "Ömer Tiryaki",
    date: "2024-05-25",
    readTime: "10 min",
    tags: ["iOS", "SwiftUI", "Mobile Development"],
    image: "/blog/swift-ui-comparison.jpg",
    featured: false
  },
  {
    id: "saas-architektur-guide",
    title: "SaaS-Architektur: Von der Idee zur skalierbaren Plattform",
    excerpt: "Ein umfassender Guide für die Entwicklung von SaaS-Anwendungen mit modernen Cloud-Technologien.",
    content: `
<h2>SaaS-Architektur: Von der Idee zur skalierbaren Plattform</h2>

<p>Der Aufbau einer SaaS-Plattform erfordert durchdachte Architektur-Entscheidungen. In diesem Guide zeige ich dir den Weg von der Idee zur skalierbaren Lösung.</p>

<h3>Multi-Tenancy</h3>

<p>Die wichtigste Entscheidung: Wie trennst du die Daten deiner Kunden? Database-per-tenant oder Schema-per-tenant?</p>

<h3>Skalierbarkeit</h3>

<p>Von Anfang an auf Skalierbarkeit setzen: Microservices, Container, Kubernetes und Auto-Scaling sind deine Freunde.</p>

<h3>Security & Compliance</h3>

<p>Sicherheit ist kein Feature, sondern eine Grundvoraussetzung. DSGVO, SOC2 und ISO27001 sollten von Anfang an mitgedacht werden.</p>

<h3>Fazit</h3>

<p>Eine durchdachte SaaS-Architektur ist die Basis für nachhaltigen Erfolg.</p>
    `,
    author: "Ömer Tiryaki",
    date: "2024-05-20",
    readTime: "15 min",
    tags: ["SaaS", "Cloud", "Architektur"],
    image: "/blog/saas-architecture.jpg",
    featured: true
  },
  {
    id: "ai-integration-business",
    title: "KI in Unternehmen: Praktische Anwendungsfälle",
    excerpt: "Wie kleine und mittlere Unternehmen von KI-Integration profitieren können - mit realen Beispielen.",
    content: `
<h2>KI in Unternehmen: Praktische Anwendungsfälle</h2>

<p>KI ist nicht nur für Tech-Giganten. Auch kleine und mittlere Unternehmen können enorm profitieren. Hier sind praktische Beispiele.</p>

<h3>Kundenservice automatisieren</h3>

<p>Chatbots und KI-Assistenten können 80% der Kundenanfragen automatisch beantworten und den Support entlasten.</p>

<h3>Prozesse optimieren</h3>

<p>Von der Rechnungsverarbeitung bis zur Lagerverwaltung - KI kann repetitive Aufgaben übernehmen und Fehler reduzieren.</p>

<h3>Datenanalyse</h3>

<p>KI hilft dabei, aus großen Datenmengen wertvolle Insights zu gewinnen und bessere Geschäftsentscheidungen zu treffen.</p>

<h3>Fazit</h3>

<p>Der Einstieg in KI muss nicht kompliziert sein. Starte klein und skaliere schrittweise.</p>
    `,
    author: "Ömer Tiryaki",
    date: "2024-05-15",
    readTime: "6 min",
    tags: ["Business", "KI", "Automatisierung"],
    image: "/blog/ai-business-integration.jpg",
    featured: false
  },
  {
    id: "typescript-advanced-patterns",
    title: "TypeScript Advanced Patterns für Profis",
    excerpt: "Erweiterte TypeScript-Techniken, die deine Codequalität und Entwicklungsgeschwindigkeit verbessern.",
    content: `
<h2>TypeScript Advanced Patterns für Profis</h2>

<p>TypeScript bietet weit mehr als nur Type-Safety. Mit fortgeschrittenen Patterns holst du das Maximum aus der Sprache heraus.</p>

<h3>Conditional Types</h3>

<p>Conditional Types ermöglichen es, Types basierend auf Bedingungen zu erstellen. Perfekt für flexible APIs.</p>

<h3>Template Literal Types</h3>

<p>Mit Template Literal Types kannst du String-Manipulation auf Type-Ebene durchführen. Ideal für typsichere String-Operations.</p>

<h3>Branded Types</h3>

<p>Branded Types helfen dabei, primitive Types zu unterscheiden und Fehler zur Compile-Zeit zu vermeiden.</p>

<h3>Fazit</h3>

<p>Diese Patterns machen deinen Code robuster, wartbarer und entwicklerfreundlicher.</p>
    `,
    author: "Ömer Tiryaki",
    date: "2024-05-10",
    readTime: "14 min",
    tags: ["TypeScript", "JavaScript", "Development"],
    image: "/blog/typescript-patterns.jpg",
    featured: false
  },
  {
    id: "wordpress-guide",
    title: "WordPress-Entwicklung: Der ultimative Guide für moderne Websites",
    excerpt: "Erfahre alles über WordPress-Entwicklung – von der Installation bis zur professionellen Website. Schritt für Schritt erklärt.",
    content: <WordpressGuideContent />,
    author: "Tiryaki IT",
    date: "2025-01-15",
    readTime: "20 min",
    tags: ["WordPress", "Webentwicklung", "CMS", "PHP", "Tutorial"],
    image: "/images/blog/wordpress-guide.jpg",
    featured: true
  },
  {
    id: "shopify-guide",
    title: "Shopify: Der umfassende Guide für deinen erfolgreichen Online-Shop",
    excerpt: "Alles, was du über Shopify wissen musst: Von der Einrichtung bis zur Optimierung deines Shops. Schritt-für-Schritt erklärt – für Einsteiger und Profis.",
    content: `# Shopify: Der umfassende Guide für deinen erfolgreichen Online-Shop\n\nShopify ist eine der weltweit führenden E-Commerce-Plattformen ... (hier folgt der volle Artikeltext, ggf. gekürzt für Übersicht)`,
    author: "Tiryaki IT",
    date: "2025-01-16",
    readTime: "18 min",
    tags: ["Shopify", "E-Commerce", "Online-Shop", "Liquid", "Tutorial"],
    image: "/images/blog/shopify-guide.jpg",
    featured: true
  },
  {
    id: "afterbuy-guide",
    title: "Afterbuy: Multichannel, Warenwirtschaft & Automatisierung im E-Commerce",
    excerpt: "Lerne, wie du mit Afterbuy deinen Onlinehandel automatisierst, Marktplätze anbindest und Prozesse effizient steuerst. Der große Praxis-Guide für Einsteiger und Profis.",
    content: `# Afterbuy: Multichannel, Warenwirtschaft & Automatisierung im E-Commerce\n\nAfterbuy ist eine der führenden Komplettlösungen für Onlinehändler ... (hier folgt der volle Artikeltext, ggf. gekürzt für Übersicht)`,
    author: "Tiryaki IT",
    date: "2025-01-17",
    readTime: "15 min",
    tags: ["Afterbuy", "E-Commerce", "Multichannel", "Warenwirtschaft", "Automatisierung", "Tutorial"],
    image: "/images/blog/afterbuy-guide.jpg",
    featured: false
  }
];

// Moderne, coole JSX-Komponente für den WordPress-Artikel
function WordpressGuideContent() {
  return (
    <>
      <p className="text-xl text-primary font-semibold mb-8">WordPress ist das weltweit beliebteste Content Management System (CMS) und betreibt über <b>43% aller Websites</b> im Internet. In diesem umfassenden Guide erfährst du alles, was du über WordPress-Entwicklung wissen musst – von den Grundlagen bis zu fortgeschrittenen Techniken.</p>

      <h2 id="was-ist-wordpress-und-warum-ist-es-so-beliebt" className="scroll-mt-40 text-2xl font-black mb-8">Was ist WordPress und warum ist es so beliebt?</h2>
      <p>WordPress startete 2003 als einfache Blogging-Plattform und hat sich zu einem vollwertigen CMS entwickelt. Die Gründe für seine Beliebtheit:</p>

      <ol className="list-decimal ml-6 mb-8">
        <li className="mb-4">
          <b>Benutzerfreundlichkeit:</b> WordPress ist intuitiv bedienbar. Selbst ohne Programmierkenntnisse können Nutzer:
          <ul className="list-disc ml-6 mt-2">
            <li>Inhalte erstellen und bearbeiten</li>
            <li>Medien verwalten</li>
            <li>Das Design anpassen</li>
            <li>Funktionen erweitern</li>
          </ul>
        </li>
        <li className="mb-4">
          <b>Flexibilität:</b> Mit WordPress kannst du praktisch jede Art von Website erstellen:
          <ul className="list-disc ml-6 mt-2">
            <li>Blogs und Magazine: Perfekt für Content-Creator</li>
            <li>Unternehmenswebsites: Professionelle Präsenz für Firmen</li>
            <li>E-Commerce: Mit WooCommerce zum Online-Shop</li>
            <li>Portfolios: Für Kreative und Freelancer</li>
            <li>Membership-Sites: Für exklusive Inhalte</li>
            <li>Learning Management Systems: Für Online-Kurse</li>
          </ul>
        </li>
        <li className="mb-4">
          <b>Große Community:</b> Die WordPress-Community ist riesig und aktiv:
          <ul className="list-disc ml-6 mt-2">
            <li>Tausende kostenlose Themes und Plugins</li>
            <li>Umfangreiche Dokumentation</li>
            <li>Foren und Support-Communities</li>
            <li>Regelmäßige Updates und Sicherheitspatches</li>
          </ul>
        </li>
      </ol>

      <h2 id="die-wordpress-architektur-verstehen" className="scroll-mt-40 text-2xl font-black mb-8">Die WordPress-Architektur verstehen</h2>
      <p>Um WordPress effektiv zu nutzen, solltest du die Grundarchitektur verstehen:</p>
      <div className="mt-8" />
      <p className="font-bold mb-2">Core-Komponenten</p>
      <CodeBlock code={`/wordpress
├── wp-admin/          // Backend-Verwaltung
├── wp-content/        // Deine Inhalte
│   ├── themes/        // Design-Themes
│   ├── plugins/       // Erweiterungen
│   ├── uploads/       // Medien-Dateien
│   └── languages/     // Übersetzungen
├── wp-includes/       // Core-Funktionen
├── wp-config.php      // Konfiguration
└── index.php          // Einstiegspunkt`} language="bash" />

      <p className="font-bold mb-2">Die Datenbank-Struktur</p>
      <CodeBlock code={`-- Wichtigste WordPress-Tabellen
wp_posts        -- Alle Inhalte (Seiten, Beiträge, etc.)
wp_postmeta     -- Zusätzliche Post-Informationen
wp_users        -- Benutzerkonten
wp_usermeta     -- Benutzer-Metadaten
wp_options      -- Website-Einstellungen
wp_terms        -- Kategorien und Tags
wp_comments     -- Kommentare`} language="sql" />

      <h2 id="faq-1" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Was ist WordPress und wofür wird es verwendet?</h2>
      <div className="space-y-8">
        <div>
          <p>WordPress ist ein Open-Source-Content-Management-System (CMS), mit dem sich Websites, Blogs und Online-Shops einfach erstellen und verwalten lassen. Es eignet sich für Einsteiger und Profis gleichermaßen.</p>
          <p className="text-primary mt-1">Praxistipp: Nutze WordPress für Projekte, bei denen Flexibilität und Erweiterbarkeit gefragt sind.</p>
        </div>
      </div>

      <h2 id="faq-2" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Was sind Themes und Plugins?</h2>
      <div className="space-y-8">
        <div>
          <p>Themes bestimmen das Design deiner Website, Plugins erweitern die Funktionalität (z.B. SEO, Sicherheit, Shopsysteme).</p>
          <p className="text-primary mt-1">Praxistipp: Installiere nur Plugins aus vertrauenswürdigen Quellen und halte sie aktuell.</p>
        </div>
      </div>

      <h2 id="faq-3" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie installiere ich WordPress?</h2>
      <div className="space-y-8">
        <div>
          <p>WordPress kann per 1-Click-Installer beim Hoster oder manuell (Download, Upload, Datenbank anlegen, Setup ausführen) installiert werden.</p>
          <p className="text-primary mt-1">Praxistipp: Nutze für Testzwecke <a href="https://localwp.com/" target="_blank" rel="noopener noreferrer" className="underline">LocalWP</a> für lokale Installationen.</p>
        </div>
      </div>

      <h2 id="faq-4" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Welche Benutzerrollen gibt es?</h2>
      <div className="space-y-8">
        <div>
          <p>WordPress kennt Administrator, Redakteur, Autor, Mitarbeiter und Abonnent – jede Rolle hat eigene Rechte.</p>
          <p className="text-primary mt-1">Praxistipp: Gib nur vertrauenswürdigen Personen Administratorrechte.</p>
        </div>
      </div>

      <h2 id="faq-5" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie halte ich meine WordPress-Seite sicher?</h2>
      <div className="space-y-8">
        <div>
          <p>Regelmäßige Updates, starke Passwörter, Backups und Sicherheits-Plugins sind essenziell.</p>
          <p className="text-primary mt-1">Praxistipp: Aktiviere automatische Updates und nutze ein Backup-Plugin wie UpdraftPlus.</p>
        </div>
      </div>

      <h2 id="faq-6" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Was ist die WordPress REST API?</h2>
      <div className="space-y-8">
        <div>
          <p>Die REST API ermöglicht es, Inhalte von WordPress programmgesteuert (z.B. per JavaScript oder externen Apps) abzurufen und zu bearbeiten.</p>
          <p className="text-primary mt-1">Praxistipp: Nutze die API für Headless-Projekte oder mobile Apps.</p>
        </div>
      </div>

      <h2 id="faq-7" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Was bedeutet Headless WordPress?</h2>
      <div className="space-y-8">
        <div>
          <p>Bei Headless WordPress wird das Backend (WordPress) vom Frontend (z.B. Next.js) getrennt. Inhalte werden per API ausgeliefert.</p>
          <p className="text-primary mt-1">Praxistipp: Headless eignet sich für komplexe Web-Apps mit individuellen Frontends.</p>
        </div>
      </div>

      <h2 id="faq-8" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie finde ich das richtige Theme?</h2>
      <div className="space-y-8">
        <div>
          <p>Wähle ein Theme, das zu deinem Projekt passt, regelmäßig aktualisiert wird und guten Support bietet.</p>
          <p className="text-primary mt-1">Praxistipp: Teste Themes vorab in einer Staging-Umgebung.</p>
        </div>
      </div>

      <h2 id="faq-9" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie installiere ich Plugins?</h2>
      <div className="space-y-8">
        <div>
          <p>Plugins können direkt im WordPress-Backend unter "Plugins &rarr; Installieren" gesucht und installiert werden.</p>
          <p className="text-primary mt-1">Praxistipp: Deaktiviere und lösche nicht benötigte Plugins, um die Performance zu verbessern.</p>
        </div>
      </div>

      <h2 id="faq-10" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie optimiere ich die Performance meiner WordPress-Seite?</h2>
      <div className="space-y-8">
        <div>
          <p>Nutze Caching, optimiere Bilder, minimiere Plugins und setze auf ein schnelles Hosting.</p>
          <p className="text-primary mt-1">Praxistipp: Tools wie <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="underline">PageSpeed Insights</a> helfen bei der Analyse.</p>
        </div>
      </div>

      <h2 id="faq-11" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie funktioniert das Update von WordPress, Themes und Plugins?</h2>
      <div className="space-y-8">
        <div>
          <p>Updates können im Backend unter "Dashboard &rarr; Aktualisierungen" durchgeführt werden. Vorher immer ein Backup machen!</p>
          <p className="text-primary mt-1">Praxistipp: Automatische Updates für Plugins und Themes aktivieren, wenn möglich.</p>
        </div>
      </div>

      <h2 id="faq-12" className="scroll-mt-40 mt-20 mb-10 text-2xl font-bold">Wie kann ich meine WordPress-Seite sichern?</h2>
      <div className="space-y-8">
        <div>
          <p>Regelmäßige Backups sind Pflicht. Nutze dafür Plugins oder die Backup-Funktion deines Hosters.</p>
          <p className="text-primary mt-1">Praxistipp: Teste regelmäßig die Wiederherstellung deiner Backups.</p>
        </div>
      </div>
    </>
  );
}

// Themen für die Sidebar (h2-Überschriften des Artikels)
const wordpressTopics = [
  { id: 'was-ist-wordpress-und-warum-ist-es-so-beliebt', text: 'Was ist WordPress und warum ist es so beliebt?' },
  { id: 'die-wordpress-architektur-verstehen', text: 'Die WordPress-Architektur verstehen' },
  { id: 'faq-1', text: 'Was ist WordPress und wofür wird es verwendet?' },
  { id: 'faq-2', text: 'Was sind Themes und Plugins?' },
  { id: 'faq-3', text: 'Wie installiere ich WordPress?' },
  { id: 'faq-4', text: 'Welche Benutzerrollen gibt es?' },
  { id: 'faq-5', text: 'Wie halte ich meine WordPress-Seite sicher?' },
  { id: 'faq-6', text: 'Was ist die WordPress REST API?' },
  { id: 'faq-7', text: 'Was bedeutet Headless WordPress?' },
  { id: 'faq-8', text: 'Wie finde ich das richtige Theme?' },
  { id: 'faq-9', text: 'Wie installiere ich Plugins?' },
  { id: 'faq-10', text: 'Wie optimiere ich die Performance meiner WordPress-Seite?' },
  { id: 'faq-11', text: 'Wie funktioniert das Update von WordPress, Themes und Plugins?' },
  { id: 'faq-12', text: 'Wie kann ich meine WordPress-Seite sichern?' }
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.id === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Inhaltsverzeichnis (nur h2) als Sidebar
  const toc = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const div = document.createElement('div');
    div.innerHTML = post.content;
    return Array.from(div.querySelectorAll('h2')).map((el) => {
      const id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      el.setAttribute('id', id);
      return {
        text: el.textContent,
        id,
      };
    });
  }, [post.content]);

  // Sidebar-Themen dynamisch wählen (hier für WordPress-Artikel als Beispiel)
  const topics = post.id === 'wordpress-guide' ? wordpressTopics : [];

  // Active-Highlighting für die Sidebar
  const [activeId, setActiveId] = useState<string | null>(topics[0]?.id || null);
  useEffect(() => {
    if (typeof window === 'undefined' || topics.length === 0) return;
    const handleScroll = () => {
      let current = topics[0]?.id || '';
      for (const topic of topics) {
        const el = document.getElementById(topic.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = topic.id;
          }
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [topics]);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
      <MainNav activePage="blog" />
      <main className="relative flex flex-col md:flex-row max-w-6xl mx-auto pt-32 py-16 px-4 md:px-10 gap-8">
        {/* Sidebar Inhaltsverzeichnis */}
        {topics.length > 0 && (
          <aside className="hidden md:block w-48 flex-shrink-0 pt-8 sticky top-36 h-fit mr-6 max-h-[80vh] overflow-auto scrollbar-thin">
            <nav className="text-xs text-zinc-400 dark:text-zinc-500 space-y-1">
              <div className="mb-3 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px]">Themen</div>
              {topics.map((item, i) => (
                <a
                  key={i}
                  href={`#${item.id}`}
                  className={`block px-2 py-1 rounded transition-colors font-medium mb-1 hover:text-primary ${activeId === item.id ? 'text-primary font-bold' : ''}`}
                  style={{ fontSize: '13px' }}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </aside>
        )}
        {/* Hauptinhalt inkl. Newsletter/CTA-Bereich */}
        <div className="flex-1 min-w-0">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-base mb-10 transition-colors font-medium">
            <ArrowLeftIcon className="w-5 h-5" />
            Zurück zum Blog
          </Link>
          <div className="mb-6 mt-16">
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 dark:text-zinc-500 text-sm mb-2">
              <span className="uppercase tracking-widest font-semibold">{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2"><ClockIcon className="w-4 h-4" />{post.readTime} Lesezeit</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight tracking-tight text-foreground dark:text-foreground-dark">
              {post.title}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4 max-w-2xl leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">{post.author}</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-4 py-1 bg-primary/10 text-primary text-base rounded-full font-medium">
                  <TagIcon className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
            <hr className="my-8 border-zinc-200 dark:border-zinc-700" />
          </div>
          <article
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-20 prose-h2:mb-10 prose-h2:text-4xl prose-h2:font-black prose-h3:mt-12 prose-h3:mb-6 prose-p:leading-relaxed prose-p:text-foreground/90 dark:prose-p:text-foreground-dark/90 prose-p:mb-8 prose-li:my-5 prose-code:bg-zinc-900 prose-code:text-primary prose-code:rounded prose-code:px-2 prose-code:py-1 prose-pre:bg-zinc-900 prose-pre:text-primary prose-pre:rounded-xl prose-pre:p-6 prose-pre:mt-12 prose-pre:mb-12 prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-5">
            {typeof post.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : typeof post.content === 'function' ? (
              React.createElement(post.content)
            ) : (
              post.content
            )}
          </article>
          {/* Newsletter/CTA-Bereich am Ende */}
          <div className="mt-24 mb-16 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-zinc-900/60 rounded-2xl p-8 md:p-12 shadow-lg text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Neugierig auf mehr?</h3>
            <p className="mb-6 text-lg text-zinc-300 max-w-xl mx-auto">Erhalte exklusive Tipps, Guides & News rund um WordPress direkt in dein Postfach. Keine Werbung. Kein Spam. Jederzeit abbestellbar.</p>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
              <input type="email" placeholder="Deine E-Mail-Adresse" className="flex-1 px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary" required />
              <button type="submit" className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/80 transition">Jetzt abonnieren</button>
            </form>
            <div className="mt-6 text-zinc-400 text-sm">
              Oder möchtest du mehr erfahren? <span className="font-semibold text-primary">Schreib uns einfach – wir beraten dich persönlich!</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 