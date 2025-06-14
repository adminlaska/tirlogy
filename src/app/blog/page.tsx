'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MainNav } from '../components/MainNav';
import { Footer } from '../components/Footer';
import { CalendarIcon, ClockIcon, TagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "ki-revolution-2024",
    title: "Die KI-Revolution 2024: Was wirklich wichtig ist",
    excerpt: "Ein tiefer Einblick in die neuesten KI-Entwicklungen und wie sie unser digitales Leben transformieren werden.",
    content: "...",
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
    content: "...",
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
    content: "...",
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
    content: "...",
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
    content: "...",
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
    content: "...",
    author: "Ömer Tiryaki",
    date: "2024-05-10",
    readTime: "14 min",
    tags: ["TypeScript", "JavaScript", "Development"],
    image: "/blog/typescript-patterns.jpg",
    featured: false
  }
];

const BlogCard = ({ post, index, featured = false }: {
  post: BlogPost;
  index: number;
  featured?: boolean
}) => {
  return (
    <article
      className={`group relative rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white transition-all hover:shadow-md hover:border-primary/80 ${featured ? 'p-6' : 'p-5'} flex flex-col gap-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:transition-all after:duration-300 after:opacity-0 group-hover:after:opacity-100 group-hover:after:shadow-[0_0_0_4px_rgba(0,212,255,0.15)]`}
      style={{ minWidth: featured ? 0 : undefined, maxWidth: featured ? 560 : 380 }}
    >
      <div className="flex flex-col gap-2 flex-1">
        <h2 className={`font-bold group-hover:text-primary transition-colors duration-300 mb-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>{post.title}</h2>
        <p className="mb-3 line-clamp-3 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold">
            {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <span className="text-sm text-neutral-400">{post.author}</span>
          <span className="text-xs text-neutral-500 ml-2">{post.readTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
            >
              <TagIcon className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group-hover:gap-3 transition-all duration-300"
        >
          Artikel lesen
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </article>
  );
};

const BlogCategory = ({ name, count, active, onClick }: {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
      ? 'bg-primary text-white shadow-lg shadow-primary/25'
      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary'
      }`}
  >
    {name} ({count})
  </button>
);

// Hilfs-Hook für zufällige Partikel-Positionen (Hydration Bugfix)
function useRandomParticles(count: number) {
  const [positions, setPositions] = React.useState<{ top: number, left: number }[]>([]);
  React.useEffect(() => {
    const newPositions = Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setPositions(newPositions);
  }, [count]);
  return positions;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // Kategorien aus Posts extrahieren
  const categories = [
    'Alle',
    ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))
  ];

  const getCategoryCount = (category: string) => {
    if (category === 'Alle') return blogPosts.length;
    return blogPosts.filter(post => post.tags.includes(category)).length;
  };

  // Posts filtern
  useEffect(() => {
    if (selectedCategory === 'Alle') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.tags.includes(selectedCategory)));
    }
  }, [selectedCategory]);

  const featuredPosts = filteredPosts.filter((post: BlogPost) => post.featured);
  const regularPosts = filteredPosts.filter((post: BlogPost) => !post.featured);

  // Partikel-Positionen für animierte Partikel (Hydration Bugfix)
  const particlePositions = useRandomParticles(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="blog" />

      <main className="min-h-screen w-full px-4 py-24 md:py-32">
        {/* Header-Bereich wie bei Cursor */}
        <section className="flex flex-col gap-2 text-left max-w-6xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Blog</h1>
          <p className="text-lg md:text-xl text-brand-neutrals-600 dark:text-brand-neutrals-200 max-w-2xl">Insights, Trends und praktische Tipps aus der Welt der Softwareentwicklung</p>
          <h2 className="mt-10 text-[2rem] leading-[2.625rem] font-semibold -tracking-4">Empfohlen</h2>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post: BlogPost, index: number) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-left text-foreground dark:text-foreground-dark">Alle Beiträge</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post: BlogPost, index: number) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  featured={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Section (ersetzt durch CTA von Lösungen) */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
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