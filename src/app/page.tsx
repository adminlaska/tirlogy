'use client';

import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { FormEvent, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-6">
        <div className="container max-w-7xl">
          <motion.div
            className="w-fit mx-auto px-6"
            animate={{
              backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.75)' : 'rgb(0, 0, 0)',
              backdropFilter: isScrolled ? 'blur(12px)' : 'none',
              borderRadius: isScrolled ? '24px' : '0px',
              boxShadow: isScrolled ? '0 0 30px 0 rgba(0, 165, 168, 0.3)' : 'none',
              paddingLeft: isScrolled ? 32 : 6,
              paddingRight: isScrolled ? 32 : 6
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center h-16 w-[850px]">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 flex items-center justify-center transition-transform duration-700 ease-[0.4,0,0.2,1] group-hover:rotate-[360deg]">
                  <Image
                    src="/tiryaki_it_fav_logo.png"
                    alt="Tiryaki IT Logo"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-lg tracking-wide text-white technical-forest">
                  Tiryaki IT
                </span>
              </Link>
              <div className="flex-1" />
              <div className="flex items-center space-x-6">
                <Link
                  href="#about"
                  className="text-sm font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-all px-4 py-2 rounded-full"
                >
                  ÜBER MICH
                </Link>
                <Link
                  href="#services"
                  className="text-sm font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-all px-4 py-2 rounded-full"
                >
                  DIENSTLEISTUNGEN
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-all px-4 py-2 rounded-full"
                >
                  KONTAKT
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-32">
        <div className="container max-w-[98%] mx-auto">
          <div className="relative w-full rounded-3xl overflow-hidden min-h-[700px]">
            <div className="absolute inset-0">
              <Image
                src="/tiryaki_it_hintergrund_bild.jpg"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
            </div>
            <div className="relative py-40 px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                  Moderne Weblösungen für Ihr Unternehmen
                </h1>
                <p className="text-xl text-gray-200 mb-8 drop-shadow-lg">
                  Ich erstelle moderne Webseiten, Webanwendungen und Apps mit den neuesten Technologien.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="#contact" className="btn btn-primary">
                    Projekt starten
                  </Link>
                  <Link href="#services" className="btn btn-outline">
                    Mehr erfahren
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="section bg-black">
        <div className="container">
          <h2 className="heading text-center">Meine Dienstleistungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ServiceCard
              icon={
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#00A5A8', stopOpacity: 0.2 }} />
                          <stop offset="100%" style={{ stopColor: '#4db2bc', stopOpacity: 0.1 }} />
                        </linearGradient>
                      </defs>
                      <g>
                        {/* Browser Window Frame */}
                        <rect x="10" y="10" width="80" height="80" rx="4" className="fill-none stroke-[#00A5A8] stroke-2">
                          <animate
                            attributeName="stroke-dashoffset"
                            values="330;165;0;-165;-330"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-dasharray"
                            values="330,0"
                            dur="0.1s"
                            fill="freeze"
                          />
                        </rect>

                        {/* Browser Controls with smoother animation */}
                        <circle cx="20" cy="16" r="2" className="fill-[#00A5A8]">
                          <animate
                            attributeName="r"
                            values="1.5;2;2.5;2;1.5"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx="28" cy="16" r="2" className="fill-[#4db2bc]">
                          <animate
                            attributeName="r"
                            values="1.5;2.5;1.5"
                            dur="2s"
                            begin="0.3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx="36" cy="16" r="2" className="fill-white opacity-50">
                          <animate
                            attributeName="r"
                            values="1.5;2.5;1.5"
                            dur="2s"
                            begin="0.6s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* URL Bar */}
                        <rect x="45" y="14" width="40" height="4" rx="2" className="fill-[#00A5A8] opacity-30">
                          <animate
                            attributeName="width"
                            values="35;40;35"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </rect>

                        {/* Code Lines */}
                        {[...Array(5)].map((_, i) => {
                          // Predefined line lengths for each row
                          const lineLengths = [65, 70, 60, 72, 68];
                          return (
                            <g key={i}>
                              <line
                                x1="20"
                                y1={38 + i * 8}
                                x2={lineLengths[i]}
                                y2={38 + i * 8}
                                className="stroke-[#00A5A8]"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <animate
                                  attributeName="x2"
                                  values={`${60 + Math.random() * 15};${75 - Math.random() * 15};${60 + Math.random() * 15}`}
                                  dur="3s"
                                  begin={`${i * 0.5}s`}
                                  repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="opacity"
                                  values="0.2;1;0.2"
                                  dur="3s"
                                  begin={`${i * 0.5}s`}
                                  repeatCount="indefinite"
                                />
                              </line>
                            </g>
                          );
                        })}
                      </g>
                    </svg>
                  </div>
                </div>
              }
              title="Webdesign"
              description="Moderne und responsive Webseiten mit benutzerfreundlichem Design."
            />
            <ServiceCard
              icon={
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#00A5A8', stopOpacity: 0.2 }} />
                          <stop offset="100%" style={{ stopColor: '#4db2bc', stopOpacity: 0.1 }} />
                        </linearGradient>
                      </defs>
                      <g>
                        {/* Central Hub */}
                        <circle cx="50" cy="50" r="25" className="fill-none stroke-[#00A5A8] stroke-2">
                          <animate
                            attributeName="r"
                            values="23;25;23"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-dasharray"
                            values="0,160;160,0"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Rotating Outer Ring */}
                        <circle cx="50" cy="50" r="35" className="fill-none stroke-[#4db2bc] stroke-1">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 50 50"
                            to="360 50 50"
                            dur="10s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Data Points */}
                        {[0, 72, 144, 216, 288].map((angle, i) => (
                          <g key={i}>
                            <circle
                              cx={50 + Math.cos(angle * Math.PI / 180) * 25}
                              cy={50 + Math.sin(angle * Math.PI / 180) * 25}
                              r="4"
                              className="fill-[#00A5A8]"
                            >
                              <animate
                                attributeName="r"
                                values="2;4;2"
                                dur="2s"
                                begin={`${i * 0.4}s`}
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.3;1;0.3"
                                dur="2s"
                                begin={`${i * 0.4}s`}
                                repeatCount="indefinite"
                              />
                            </circle>

                            {/* Connection Lines */}
                            <line
                              x1="50"
                              y1="50"
                              x2={50 + Math.cos(angle * Math.PI / 180) * 25}
                              y2={50 + Math.sin(angle * Math.PI / 180) * 25}
                              className="stroke-[#00A5A8]"
                              strokeWidth="1"
                            >
                              <animate
                                attributeName="stroke-dashoffset"
                                values="30;0;-30"
                                dur="4s"
                                begin={`${i * 0.8}s`}
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="stroke-dasharray"
                                values="30,30"
                                dur="0.1s"
                                fill="freeze"
                              />
                            </line>

                            {/* Additional Connecting Lines */}
                            <line
                              x1={50 + Math.cos(angle * Math.PI / 180) * 25}
                              y1={50 + Math.sin(angle * Math.PI / 180) * 25}
                              x2={50 + Math.cos(((angle + 72) % 360) * Math.PI / 180) * 25}
                              y2={50 + Math.sin(((angle + 72) % 360) * Math.PI / 180) * 25}
                              className="stroke-[#00A5A8]"
                              strokeWidth="1"
                              opacity="0.3"
                            >
                              <animate
                                attributeName="stroke-dashoffset"
                                values="30;0;-30"
                                dur="4s"
                                begin={`${i * 0.8 + 0.4}s`}
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="stroke-dasharray"
                                values="30,30"
                                dur="0.1s"
                                fill="freeze"
                              />
                            </line>
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>
                </div>
              }
              title="Webanwendungen"
              description="Maßgeschneiderte Webanwendungen mit modernsten Technologien."
            />
            <ServiceCard
              icon={
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#00A5A8', stopOpacity: 0.2 }} />
                          <stop offset="100%" style={{ stopColor: '#4db2bc', stopOpacity: 0.1 }} />
                        </linearGradient>
                      </defs>
                      <g>
                        {/* iPhone Frame */}
                        <rect x="30" y="10" width="40" height="80" rx="8" className="fill-none stroke-[#00A5A8] stroke-2">
                          <animate
                            attributeName="stroke-dashoffset"
                            values="250;125;0;-125;-250"
                            dur="8s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-dasharray"
                            values="250,250"
                            dur="0.1s"
                            fill="freeze"
                          />
                        </rect>

                        {/* Screen */}
                        <rect x="34" y="18" width="32" height="64" rx="6" className="fill-none stroke-[#00A5A8] stroke-[1]" />

                        {/* Dynamic Island */}
                        <rect x="44" y="20" width="12" height="3" rx="1.5" className="fill-[#00A5A8]">
                          <animate
                            attributeName="width"
                            values="12;14;12"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </rect>

                        {/* Inner Frame Pattern */}
                        <path
                          d="M34,26 L66,26 M34,38 L66,38 M34,50 L66,50 M34,62 L66,62 M34,74 L66,74"
                          className="stroke-[#00A5A8] stroke-[1]"
                          strokeLinecap="round"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="64;32;0;-32;-64"
                            dur="6s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-dasharray"
                            values="32,32"
                            dur="0.1s"
                            fill="freeze"
                          />
                        </path>

                        {/* Vertical Lines */}
                        <path
                          d="M42,18 L42,82 M50,18 L50,82 M58,18 L58,82"
                          className="stroke-[#00A5A8] stroke-[1] opacity-30"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="64;32;0;-32;-64"
                            dur="8s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-dasharray"
                            values="32,32"
                            dur="0.1s"
                            fill="freeze"
                          />
                        </path>

                        {/* Home Bar */}
                        <rect x="44" y="78" width="12" height="1.5" rx="0.75" className="fill-[#00A5A8]">
                          <animate
                            attributeName="opacity"
                            values="0.3;1;0.3"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </rect>
                      </g>
                    </svg>
                  </div>
                </div>
              }
              title="iOS App-Entwicklung"
              description="Native iOS Apps für iPhone und iPad, optimiert für das Apple Ökosystem."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading">Über mich</h2>
              <p className="text-gray-400 mb-6">
                Als leidenschaftlicher Webentwickler konzentriere ich mich darauf, moderne und effiziente digitale Lösungen zu schaffen. Mit einem tiefen Verständnis für aktuelle Technologien und Best Practices entwickle ich Anwendungen, die nicht nur gut aussehen, sondern auch optimal funktionieren.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Technologien</h3>
                <div className="grid grid-cols-2 gap-4">
                  <TechItem>Next.js & React</TechItem>
                  <TechItem>TypeScript</TechItem>
                  <TechItem>Node.js</TechItem>
                  <TechItem>Tailwind CSS</TechItem>
                  <TechItem>REST APIs</TechItem>
                  <TechItem>React Native</TechItem>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-background-light p-8 rounded-lg border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-6">Warum mit mir arbeiten?</h3>
              <div className="space-y-4">
                <BenefitItem title="Moderne Technologien">
                  Entwicklung mit den neuesten und bewährtesten Technologien für optimale Performance.
                </BenefitItem>
                <BenefitItem title="Responsive Design">
                  Ihre Webseite wird auf allen Geräten perfekt aussehen und funktionieren.
                </BenefitItem>
                <BenefitItem title="SEO-Optimierung">
                  Implementierung von Best Practices für bessere Sichtbarkeit in Suchmaschinen.
                </BenefitItem>
                <BenefitItem title="Kontinuierliche Betreuung">
                  Auch nach dem Launch stehe ich Ihnen mit Rat und Tat zur Seite.
                </BenefitItem>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-black">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading">Kontakt</h2>
            <p className="subheading">
              Haben Sie ein Projekt im Sinn? Lassen Sie uns darüber sprechen!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-black p-8 rounded-lg border border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#00A5A8] focus:border-[#00A5A8]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#00A5A8] focus:border-[#00A5A8]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Betreff
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#00A5A8] focus:border-[#00A5A8]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#00A5A8] focus:border-[#00A5A8]"
              ></textarea>
            </div>

            {formStatus.type && (
              <div
                className={`p-4 rounded-lg ${formStatus.type === 'success'
                  ? 'bg-green-900/50 border border-green-500'
                  : 'bg-red-900/50 border border-red-500'
                  }`}
              >
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Tiryaki IT. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </main>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rotationX = (e.clientY - centerY) / 10;
      const rotationY = (centerX - e.clientX) / 10;

      gsap.to(card, {
        duration: 0.5,
        rotationX,
        rotationY,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center"
      });

      // Animate the gradient
      gsap.to(card.querySelector('.gradient-overlay'), {
        duration: 0.5,
        opacity: 1,
        ease: "power2.out"
      });

      // Scale and color change for icon
      gsap.to(card.querySelector('.icon-container'), {
        duration: 0.3,
        scale: 1.1,
        color: "#00A5A8",
        ease: "back.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out"
      });

      gsap.to(card.querySelector('.gradient-overlay'), {
        duration: 0.5,
        opacity: 0,
        ease: "power2.out"
      });

      gsap.to(card.querySelector('.icon-container'), {
        duration: 0.3,
        scale: 1,
        ease: "back.out"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative p-8 rounded-3xl bg-black border border-gray-800 overflow-hidden group cursor-pointer"
      style={{ transform: 'perspective(1000px)' }}
    >
      <div className="gradient-overlay absolute inset-0 opacity-0 bg-gradient-to-br from-[#00A5A8]/20 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="icon-container text-white mb-6 transform-gpu">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00A5A8] transition-colors">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{description}</p>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[url('/tiryaki_it_hintergrund_bild.jpg')] opacity-5" />
      </div>
    </div>
  );
}

function TechItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-[#00A5A8] rounded-full" />
      <span>{children}</span>
    </div>
  );
}

function BenefitItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-bold text-[#00A5A8] mb-1">{title}</h4>
      <p className="text-gray-400">{children}</p>
    </div>
  );
}
