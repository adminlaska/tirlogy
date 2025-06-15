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
  },
  {
    id: "wordpress-guide",
    title: "WordPress-Entwicklung: Der ultimative Guide für moderne Websites",
    excerpt: "Erfahre alles über WordPress-Entwicklung – von der Installation bis zur professionellen Website. Schritt für Schritt erklärt.",
    content: `<h1>WordPress-Entwicklung: Der ultimative Guide für moderne Websites</h1>
<p>WordPress ist das weltweit beliebteste Content Management System (CMS) und betreibt über <b>43% aller Websites</b> im Internet. In diesem umfassenden Guide erfährst du alles, was du über WordPress-Entwicklung wissen musst - von den Grundlagen bis zu fortgeschrittenen Techniken.</p>
<h2>Was ist WordPress und warum ist es so beliebt?</h2>
<p>WordPress startete 2003 als einfache Blogging-Plattform und hat sich zu einem vollwertigen CMS entwickelt. Die Gründe für seine Beliebtheit:</p>
<h3>1. <b>Benutzerfreundlichkeit</b></h3>
<p>WordPress ist intuitiv bedienbar. Selbst ohne Programmierkenntnisse können Nutzer:</p>
<ul><li>Inhalte erstellen und bearbeiten</li><li>Medien verwalten</li><li>Das Design anpassen</li><li>Funktionen erweitern</li></ul>
<h3>2. <b>Flexibilität</b></h3>
<p>Mit WordPress kannst du praktisch jede Art von Website erstellen:</p>
<ul><li><b>Blogs und Magazine</b>: Perfekt für Content-Creator</li><li><b>Unternehmenswebsites</b>: Professionelle Präsenz für Firmen</li><li><b>E-Commerce</b>: Mit WooCommerce zum Online-Shop</li><li><b>Portfolios</b>: Für Kreative und Freelancer</li><li><b>Membership-Sites</b>: Für exklusive Inhalte</li><li><b>Learning Management Systems</b>: Für Online-Kurse</li></ul>
<h3>3. <b>Große Community</b></h3>
<p>Die WordPress-Community ist riesig und aktiv:</p>
<ul><li>Tausende kostenlose Themes und Plugins</li><li>Umfangreiche Dokumentation</li><li>Foren und Support-Communities</li><li>Regelmäßige Updates und Sicherheitspatches</li></ul>
<h2>Die WordPress-Architektur verstehen</h2>
<p>Um WordPress effektiv zu nutzen, solltest du die Grundarchitektur verstehen:</p>
<h3>Core-Komponenten</h3>
<pre><code>// WordPress-Verzeichnisstruktur
/wordpress
├── wp-admin/          // Backend-Verwaltung
├── wp-content/        // Deine Inhalte
│   ├── themes/        // Design-Themes
│   ├── plugins/       // Erweiterungen
│   ├── uploads/       // Medien-Dateien
│   └── languages/     // Übersetzungen
├── wp-includes/       // Core-Funktionen
├── wp-config.php      // Konfiguration
└── index.php          // Einstiegspunkt
</code></pre>
<h3>Die Datenbank-Struktur</h3>
<p>WordPress nutzt MySQL/MariaDB mit folgenden Haupttabellen:</p>
<pre><code>-- Wichtigste WordPress-Tabellen
wp_posts        -- Alle Inhalte (Seiten, Beiträge, etc.)
wp_postmeta     -- Zusätzliche Post-Informationen
wp_users        -- Benutzerkonten
wp_usermeta     -- Benutzer-Metadaten
wp_options      -- Website-Einstellungen
wp_terms        -- Kategorien und Tags
wp_comments     -- Kommentare
</code></pre>
<h2>WordPress Installation und Setup</h2>
<h3>Schritt 1: Voraussetzungen prüfen</h3>
<p>Für WordPress benötigst du:</p>
<ul><li><b>PHP</b> Version 7.4 oder höher</li><li><b>MySQL</b> Version 5.7+ oder <b>MariaDB</b> Version 10.3+</li><li><b>HTTPS</b> Support (SSL-Zertifikat)</li><li><b>Apache</b> oder <b>Nginx</b> Webserver</li></ul>
<h3>Schritt 2: Installation</h3>
<pre><code># WordPress herunterladen
wget https://wordpress.org/latest.zip
unzip latest.zip

# Dateien ins Webverzeichnis verschieben
mv wordpress/* /var/www/html/

# Berechtigungen setzen
chown -R www-data:www-data /var/www/html/
chmod -R 755 /var/www/html/
</code></pre>
<h3>Schritt 3: Datenbank einrichten</h3>
<pre><code>-- Datenbank erstellen
CREATE DATABASE wordpress_db;

-- Benutzer erstellen und Rechte vergeben
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'sicheres_passwort';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
</code></pre>
<h3>Schritt 4: wp-config.php konfigurieren</h3>
<pre><code>// wp-config.php Beispiel
define('DB_NAME', 'wordpress_db');
define('DB_USER', 'wp_user');
define('DB_PASSWORD', 'sicheres_passwort');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');

// Sicherheitsschlüssel (von https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'unique-phrase-here');
define('SECURE_AUTH_KEY',  'unique-phrase-here');
// ... weitere Keys

// Debugging (nur für Entwicklung!)
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
</code></pre>
<h2>Theme-Entwicklung: Dein eigenes Design</h2>
<p>Ein minimales WordPress-Theme benötigt nur zwei Dateien:</p>
<pre><code>/my-theme/
├── style.css       // Theme-Informationen und Styles
└── index.php       // Haupt-Template
</code></pre>
<h3>style.css - Theme-Header</h3>
<pre><code>/*
Theme Name: Mein Custom Theme
Theme URI: https://example.com
Author: Dein Name
Author URI: https://example.com
Description: Ein modernes WordPress Theme
Version: 1.0
License: GPL v2 or later
Text Domain: mein-theme
*/

/* Deine CSS-Styles hier */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}
</code></pre>
<h3>functions.php - Theme-Funktionen</h3>
<pre><code>&lt;?php
// Theme-Setup
function mein_theme_setup() {
    // Theme-Features aktivieren
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
    ));
    
    // Menüs registrieren
    register_nav_menus(array(
        'primary' => __('Hauptmenü', 'mein-theme'),
        'footer' => __('Footer-Menü', 'mein-theme')
    ));
}
add_action('after_setup_theme', 'mein_theme_setup');

// Styles und Scripts einbinden
function mein_theme_scripts() {
    // CSS
    wp_enqueue_style('mein-theme-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // JavaScript
    wp_enqueue_script('mein-theme-script', 
        get_template_directory_uri() . '/js/main.js', 
        array('jquery'), '1.0.0', true
    );
}
add_action('wp_enqueue_scripts', 'mein_theme_scripts');

// Widget-Bereiche registrieren
function mein_theme_widgets_init() {
    register_sidebar(array(
        'name' => __('Sidebar', 'mein-theme'),
        'id' => 'sidebar-1',
        'description' => __('Haupt-Sidebar', 'mein-theme'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
}
add_action('widgets_init', 'mein_theme_widgets_init');
</code></pre>
<!-- ... Rest des Artikels analog einfügen ... -->`,
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

const BlogCard = ({ post, index, featured = false }: {
  post: BlogPost;
  index: number;
  featured?: boolean
}) => {
  return (
    <Link href={`/blog/${post.id}`} className="block">
      <article
        className={`group relative rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white transition-all hover:shadow-md hover:border-primary/80 ${featured ? 'p-6' : 'p-5'} flex flex-col gap-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:transition-all after:duration-300 after:opacity-0 group-hover:after:opacity-100 group-hover:after:shadow-[0_0_0_4px_rgba(0,212,255,0.15)] cursor-pointer`}
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
          <div className="inline-flex items-center gap-2 text-primary font-medium text-sm">
            Artikel lesen
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </article>
    </Link>
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