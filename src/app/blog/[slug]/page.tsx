'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MainNav } from '../../components/MainNav';
import { Footer } from '../../components/Footer';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { use } from 'react';

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
  }
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.id === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="blog" />

      <main className="max-w-4xl mx-auto py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Zurück zum Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-foreground-dark">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 dark:text-foreground-dark/60 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <span>{post.author}</span>
            </div>

            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime} Lesezeit</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:text-foreground dark:prose-headings:text-foreground-dark
            prose-p:text-foreground/80 dark:prose-p:text-foreground-dark/80
            prose-li:text-foreground/80 dark:prose-li:text-foreground-dark/80
            prose-strong:text-foreground dark:prose-strong:text-foreground-dark
            prose-a:text-primary hover:prose-a:text-primary/80
          ">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 