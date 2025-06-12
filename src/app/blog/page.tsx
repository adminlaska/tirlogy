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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ${featured ? 'md:col-span-2 lg:col-span-2' : ''
        }`}
    >
      {/* Hintergrund-Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bild */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
        <Image
          src={post.image || '/blog/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src = '/tiryaki_it_hintergrund_bild.jpg';
          }}
        />

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Meta-Informationen */}
        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('de-DE')}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Titel */}
        <h2 className={`font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors duration-300 mb-3 ${featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
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

        {/* Read More */}
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group-hover:gap-3 transition-all duration-300"
        >
          Artikel lesen
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.article>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="blog" />

      <main className="min-h-screen w-full px-6 py-24 md:py-32">
        {/* Hero Section */}
        <motion.section
          style={{ y }}
          className="container mx-auto max-w-7xl mb-16"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Tech Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/80 dark:text-foreground-dark/80"
            >
              Insights, Trends und praktische Tipps aus der Welt der Softwareentwicklung und KI
            </motion.p>
          </div>

          {/* Animierte Partikel */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.5, 1, 0],
                  opacity: [0, 0.8, 1, 0.8, 0],
                  transition: {
                    duration: 6,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }
                }}
              />
            ))}
          </div>
        </motion.section>

        {/* Kategorien Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="container mx-auto max-w-7xl mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <BlogCategory
                key={category}
                name={category}
                count={getCategoryCount(category)}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </motion.section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-7xl mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground-dark">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post: BlogPost, index: number) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  featured={true}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-7xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground-dark">
              Alle Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: BlogPost, index: number) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-7xl mt-24"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Hintergrund-Animationen */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {[...Array(3)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M${10 + i * 30},0 Q${50},${50 + i * 10} ${90 - i * 30},100`}
                    stroke="url(#newsletterGradient)"
                    strokeWidth="0.2"
                    strokeDasharray="2,2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.6,
                      transition: {
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 2
                      }
                    }}
                  />
                ))}
                <defs>
                  <linearGradient id="newsletterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground dark:text-foreground-dark">
                Bleib auf dem Laufenden
              </h3>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-foreground/80 dark:text-foreground-dark/80">
                Erhalte die neuesten Artikel und Tech-Updates direkt in dein Postfach.
              </p>

              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Deine E-Mail-Adresse"
                  className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  Abonnieren
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