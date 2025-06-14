'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MainNav } from '../../components/MainNav';
import { Footer } from '../../components/Footer';
import { motion } from 'framer-motion';
import { ChartBarIcon, DevicePhoneMobileIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

function useRandomParticles(count: number) {
  const [positions, setPositions] = useState<{ top: number, left: number }[]>([]);
  useEffect(() => {
    const newPositions = Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setPositions(newPositions);
  }, [count]);
  return positions;
}

// SVG-Komponente für das minimalistische App Store Icon (Pfad, currentColor)
const AppStoreIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.19561 17.9419C8.17916 17.8283 8.15424 17.721 8.12259 17.6199L13.0086 17.62C13.5103 17.62 15.0845 17.62 15.0845 17.62L16.6599 20.166C17.4445 21.4612 19.1208 21.8626 20.4127 21.1447C21.6984 20.4302 22.2096 18.8255 21.5081 17.5079C22.6326 17.1804 23.5 16.167 23.5 14.8911C23.5 13.3302 22.2019 12.1625 20.7232 12.1625H18.285L15.7663 8.19601C15.7579 8.1829 15.7494 8.16991 15.7407 8.15706C15.5909 7.93663 15.3333 7.66027 14.9364 7.50564L16.0696 5.61675C16.873 4.27757 16.3712 2.59271 15.0445 1.85544C14.0656 1.31148 12.8662 1.4103 12.0012 2.05332C11.1358 1.40866 9.93499 1.30962 8.95551 1.85374C7.62853 2.59092 7.12707 4.27612 7.93045 5.61513L8.77693 7.02606L5.69565 12.1624H3.27681C1.79797 12.1624 0.5 13.3304 0.5 14.8911C0.5 16.1673 1.36776 17.1809 2.49263 17.5081C1.79005 18.8259 2.30118 20.4317 3.58739 21.1465C4.87202 21.8602 6.53684 21.4672 7.32697 20.189L7.80626 19.4609C8.02423 19.1416 8.12435 18.8253 8.17039 18.5871C8.19412 18.4643 8.20469 18.3563 8.20891 18.2699C8.21103 18.2263 8.21159 18.1873 8.21128 18.1536C8.2112 18.1451 8.2106 18.1488 8.20996 18.1527C8.20933 18.1566 8.20865 18.1608 8.2084 18.1536C8.20771 18.1421 8.20689 18.1241 8.20594 18.1031C8.20342 18.0478 8.19997 17.9721 8.19561 17.9419ZM6.06008 19.3855L6.56197 18.6231C6.72497 18.3899 6.71106 18.1567 6.71106 18.1567C6.60854 17.4482 5.19191 17.3002 5.19191 17.3002C4.58993 17.2454 4.28899 17.5366 4.16705 17.7053L3.84856 18.1567C3.49597 18.7445 3.70532 19.4959 4.31591 19.8353C4.92662 20.1746 5.70749 19.9732 6.06008 19.3855ZM17.7112 13.6625H20.7232C21.4284 13.6625 22 14.2125 22 14.8911C22 15.5698 21.4284 16.1199 20.7232 16.1199H19.2017C18.9721 16.1204 19.0098 16.2432 19.0316 16.2884L20.1513 18.155C20.504 18.7428 20.2947 19.4942 19.6841 19.8336C19.0733 20.173 18.2924 19.9715 17.9399 19.3839L14.0043 13.0237C13.7651 12.5669 13.079 11.0557 13.6798 9.72651C13.6798 9.72651 14.1831 8.53365 14.5 9.00009L17.379 13.534L17.3812 13.5377C17.4165 13.5787 17.506 13.6492 17.7112 13.6625ZM13.0086 16.12C13.6307 16.12 13.4699 15.3329 13.4699 15.3329C13.2252 13.7186 11.4333 13.6627 11.4333 13.6627L9.7231 13.6624C9.55392 13.6478 9.56087 13.565 9.58361 13.5122L14.7833 4.84506C15.1359 4.25734 14.9267 3.50596 14.316 3.16665C13.7053 2.82723 12.9244 3.02869 12.5718 3.61631L12.0005 4.56862L11.4282 3.61461C11.0756 3.02689 10.2947 2.82563 9.68403 3.16495C9.07333 3.50416 8.86409 4.25575 9.21668 4.84337L10.4508 6.90039C10.4606 6.91834 10.5184 7.03208 10.4503 7.15241L6.71371 13.3812L6.71106 13.3799C6.71106 13.3799 6.60159 13.6367 6.13942 13.6624H3.27681C2.57164 13.6624 2 14.2125 2 14.8911C2 15.5698 2.57164 16.1199 3.27681 16.1199L13.0086 16.12Z" />
  </svg>
);

// SVG-Komponente für das minimalistische Play Store Icon (nur Linien, currentColor)
const PlayStoreIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth={3} stroke="currentColor" fill="none">
    <path d="M12.36,53.33V10.67a1,1,0,0,1,1.56-.91L51.11,31a1,1,0,0,1,0,1.81L13.93,54.24A1.05,1.05,0,0,1,12.36,53.33Z" />
    <line x1="12.36" y1="10.67" x2="42.07" y2="38.02" />
    <line x1="12.36" y1="53.33" x2="41.24" y2="25.35" />
  </svg>
);

export default function MobileAppsDetail() {
  const particlePositions = useRandomParticles(12);
  // Marquee-Logik für Zeile 1
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const [contentWidth1, setContentWidth1] = useState(0);
  useEffect(() => {
    if (marqueeRef1.current) {
      setContentWidth1(marqueeRef1.current.scrollWidth / 2);
    }
  }, []);
  // Marquee-Logik für Zeile 2
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const [contentWidth2, setContentWidth2] = useState(0);
  useEffect(() => {
    if (marqueeRef2.current) {
      setContentWidth2(marqueeRef2.current.scrollWidth / 2);
    }
  }, []);
  // Marquee-Logik für Zeile 3
  const marqueeRef3 = useRef<HTMLDivElement>(null);
  const [contentWidth3, setContentWidth3] = useState(0);
  useEffect(() => {
    if (marqueeRef3.current) {
      setContentWidth3(marqueeRef3.current.scrollWidth / 2);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="loesungen" />
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 pt-32">
        {/* Hero */}
        <section className="mb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Icons entfernt, damit unter dem Header keine Icons mehr angezeigt werden */}
            <div className="relative w-full overflow-x-hidden" style={{ height: '4.5rem' }}>
              <motion.div
                className="flex whitespace-nowrap absolute z-10"
                animate={{ x: [0, '-50%'] }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  Mobile Apps – Deine App für iOS & Android
                </span>
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  Mobile Apps – Deine App für iOS & Android
                </span>
              </motion.div>
            </div>
            <p className="text-xl md:text-2xl text-foreground/80 dark:text-foreground-dark/80 max-w-2xl mx-auto">Wir entwickeln moderne, performante und nutzerzentrierte Apps für Apple und Android – von der Idee bis zum Launch im App Store & Play Store.</p>
          </motion.div>
        </section>

        {/* Leistungsübersicht: iOS & Android */}
        <section className="mb-20 grid md:grid-cols-2 gap-8">
          {/* iOS */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10 flex flex-col h-full text-foreground">
            <div className="flex items-center gap-3 mb-3">
              <AppStoreIcon className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold text-primary dark:text-primary">Apple (iOS) Entwicklung</h3>
            </div>
            <ul className="list-disc ml-5 text-foreground/70 dark:text-foreground-dark text-sm space-y-1 mb-2">
              <li>Native Entwicklung mit Swift & SwiftUI</li>
              <li>Unterstützung für iPhone, iPad, Apple Watch & Apple TV</li>
              <li>Widgets, App Clips, Push-Notifications, Siri-Integration</li>
              <li>Apple Design Guidelines & Human Interface Principles</li>
              <li>App Store Optimierung & Review-Prozess</li>
              <li>Integration von Apple APIs (Health, Maps, Pay, uvm.)</li>
              <li>Höchste Performance, Sicherheit & User Experience</li>
            </ul>
          </motion.div>
          {/* Android */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10 flex flex-col h-full text-foreground">
            <div className="flex items-center gap-3 mb-3">
              <PlayStoreIcon className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold text-primary dark:text-primary">Android Entwicklung</h3>
            </div>
            <ul className="list-disc ml-5 text-foreground/70 dark:text-foreground-dark text-sm space-y-1 mb-2">
              <li>Native Entwicklung mit Kotlin & Java</li>
              <li>Unterstützung für Smartphones, Tablets, Wearables & TV</li>
              <li>Widgets, Material Design, Push-Notifications, Google Services</li>
              <li>Google Play Store Optimierung & Review-Prozess</li>
              <li>Integration von Google APIs (Maps, Pay, Firebase, uvm.)</li>
              <li>Große Gerätevielfalt & flexible Anpassungen</li>
              <li>Hohe Reichweite, Performance & Sicherheit</li>
            </ul>
          </motion.div>
        </section>

        {/* Cross-Platform */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Cross-Platform Entwicklung</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">React Native</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Schnelle Entwicklung für iOS & Android mit einer Codebasis. Native Performance, große Community, viele Integrationen.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">Flutter</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Moderne UI-Entwicklung mit Dart. Hohe Flexibilität, schnelle Animationen, für iOS & Android.</p>
            </motion.div>
          </div>
        </section>

        {/* Technologien & Tools mit Marquee-Animation */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Technologien & Tools</motion.h2>
          <div className="space-y-4">
            {/* Zeile 1 - Frontend & UI */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef1}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth1 > 0 ? { x: [0, -contentWidth1] } : false}
                transition={contentWidth1 > 0 ? { repeat: Infinity, duration: 90, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Swift", "Kotlin", "React Native", "Flutter", "Dart", "Java", "Objective-C", "TypeScript", "JavaScript", "Redux", "MobX", "React Navigation", "Expo", "Native Base", "React Native Paper", "Lottie", "Reanimated", "Gesture Handler", "Material UI", "Tailwind CSS", "Styled Components", "React Query", "Zustand", "Formik", "Yup", "React Hook Form", "React Native Elements", "React Native Vector Icons", "React Native Maps", "React Native SVG", "React Native Web", "React Native Reanimated", "React Native Gesture Handler"]
                  .concat(["Swift", "Kotlin", "React Native", "Flutter", "Dart", "Java", "Objective-C", "TypeScript", "JavaScript", "Redux", "MobX", "React Navigation", "Expo", "Native Base", "React Native Paper", "Lottie", "Reanimated", "Gesture Handler", "Material UI", "Tailwind CSS", "Styled Components", "React Query", "Zustand", "Formik", "Yup", "React Hook Form", "React Native Elements", "React Native Vector Icons", "React Native Maps", "React Native SVG", "React Native Web", "React Native Reanimated", "React Native Gesture Handler"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 2 - Backend & Services */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef2}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth2 > 0 ? { x: [-contentWidth2, 0] } : false}
                transition={contentWidth2 > 0 ? { repeat: Infinity, duration: 120, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Firebase", "AWS Amplify", "GraphQL", "REST APIs", "Node.js", "Express", "NestJS", "MongoDB", "PostgreSQL", "Redis", "Socket.io", "Push Notifications", "OneSignal", "RevenueCat", "Stripe", "PayPal", "App Center", "Crashlytics", "Analytics", "Google APIs", "Apple APIs", "App Store Connect", "Play Console", "TestFlight", "Internal Testing", "Azure Functions", "Supabase", "Prisma", "Sequelize", "TypeORM", "Hasura", "Apollo Client"]
                  .concat(["Firebase", "AWS Amplify", "GraphQL", "REST APIs", "Node.js", "Express", "NestJS", "MongoDB", "PostgreSQL", "Redis", "Socket.io", "Push Notifications", "OneSignal", "RevenueCat", "Stripe", "PayPal", "App Center", "Crashlytics", "Analytics", "Google APIs", "Apple APIs", "App Store Connect", "Play Console", "TestFlight", "Internal Testing", "Azure Functions", "Supabase", "Prisma", "Sequelize", "TypeORM", "Hasura", "Apollo Client"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 3 - Tools & Testing */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef3}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth3 > 0 ? { x: [0, -contentWidth3] } : false}
                transition={contentWidth3 > 0 ? { repeat: Infinity, duration: 150, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Xcode", "Android Studio", "VS Code", "Figma", "Jest", "Detox", "Appium", "Cypress", "GitHub Actions", "Bitrise", "Fastlane", "CodePush", "Sentry", "Firebase Analytics", "Mixpanel", "Amplitude", "App Store Connect", "Play Console", "TestFlight", "Internal Testing", "Notion", "Slack", "Trello", "Jira", "Monday.com", "Asana", "Bitbucket", "GitHub", "GitLab", "CI/CD", "Prettier", "ESLint", "Lighthouse"]
                  .concat(["Xcode", "Android Studio", "VS Code", "Figma", "Jest", "Detox", "Appium", "Cypress", "GitHub Actions", "Bitrise", "Fastlane", "CodePush", "Sentry", "Firebase Analytics", "Mixpanel", "Amplitude", "App Store Connect", "Play Console", "TestFlight", "Internal Testing", "Notion", "Slack", "Trello", "Jira", "Monday.com", "Asana", "Bitbucket", "GitHub", "GitLab", "CI/CD", "Prettier", "ESLint", "Lighthouse"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Prozess */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Step by step zur erfolgreichen App</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2">1. Beratung & Strategie</h4>
              <p className="text-foreground/80">Wir analysieren deine Ziele, Zielgruppe und Anforderungen. Du erhältst eine ehrliche, individuelle Beratung und eine klare Roadmap für dein App-Projekt.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2">2. UI/UX-Design & Prototyping</h4>
              <p className="text-foreground/80">Modernes, responsives App-Design – auf Wunsch mit interaktiven Prototypen. Du bist in jeden Schritt eingebunden und gibst Feedback.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2">3. Entwicklung & Testing</h4>
              <p className="text-foreground/80">Agile Entwicklung mit modernen Tools. Regelmäßige Demos, automatisierte Tests und höchste Code-Qualität sind Standard.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2">4. Launch & Support</h4>
              <p className="text-foreground/80">Sicherer Go-Live im App Store & Play Store, Hosting, Monitoring und Support. Auch nach dem Launch sind wir für dich da – mit Updates, Wartung und Optimierung.</p>
            </motion.div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Deine Vorteile auf einen Blick</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <DevicePhoneMobileIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Plattformübergreifend & nativ</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Ob iOS, Android oder Cross-Platform – wir finden die beste Lösung für dein Projekt.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ChartBarIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Performance & User Experience</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Schnelle Ladezeiten, intuitive Bedienung und modernes Design – für begeisterte Nutzer.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Cog6ToothIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Wartung & Support</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Regelmäßige Updates, Monitoring und persönlicher Support – für einen sorgenfreien Betrieb deiner App.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Individuelle Beratung</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Du erhältst keine Lösung von der Stange, sondern ein Konzept, das exakt zu deinen Zielen passt.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (wie auf den anderen Detailseiten) */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl mx-auto mt-32 px-0"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl px-4 md:px-12 py-12 text-center relative overflow-hidden">
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
              {/* Digitale Partikel (Hydration Bugfix) */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bereit für deine App-Idee?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8 text-foreground/80">
                Lass uns gemeinsam deine mobile Vision verwirklichen. Kontaktiere mich für ein unverbindliches Erstgespräch.
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