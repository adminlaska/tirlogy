'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MainNav } from '../../components/MainNav';
import { Footer } from '../../components/Footer';
import { ModernWorkplaceIcon } from '../../components/ModernWorkplaceIcon';
import { motion } from 'framer-motion';
import { ChartBarIcon, ShieldCheckIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import OneDriveIcon from '@/components/icons/OneDriveIcon';
import Microsoft365Icon from '@/components/icons/Microsoft365Icon';

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

export default function ModernWorkplaceDetail() {
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
  const particlePositions = useRandomParticles(12);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90">
      <MainNav activePage="loesungen" />
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 pt-32">
        {/* Hero */}
        <section className="mb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <ModernWorkplaceIcon className="w-16 h-16 text-primary drop-shadow-lg" />
            </div>
            <div className="relative w-full overflow-x-hidden" style={{ height: '4.5rem' }}>
              <motion.div
                className="flex whitespace-nowrap absolute z-10"
                animate={{ x: [0, '-50%'] }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  ModernWorkplace – Digital zusammenarbeiten
                </span>
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  ModernWorkplace – Digital zusammenarbeiten
                </span>
              </motion.div>
            </div>
            <p className="text-xl md:text-2xl text-foreground/80 dark:text-foreground-dark/80 max-w-2xl mx-auto">Effiziente, sichere und flexible Arbeitsplätze für dein Team – mit Microsoft 365, Cloud, Collaboration & Automatisierung.</p>
          </motion.div>
        </section>

        {/* Leistungsübersicht (Platzhalter) */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10 text-foreground">
              <div className="flex items-center gap-3 mb-3">
                <OneDriveIcon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold text-primary dark:text-primary">Microsoft 365 & Cloud</h3>
              </div>
              <p className="text-foreground/80 dark:text-foreground-dark mb-2">Alle Tools für produktives Arbeiten: Teams, SharePoint, OneDrive, Exchange, Azure und mehr. Sicher, skalierbar und überall verfügbar.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10 text-foreground">
              <div className="flex items-center gap-3 mb-3">
                <Microsoft365Icon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold text-primary dark:text-primary">Digitale Workflows & Automatisierung</h3>
              </div>
              <p className="text-foreground/80 dark:text-foreground-dark mb-2">Nahtlose Integration von Microsoft Power Platform, SharePoint, Teams und weiteren Microsoft 365 Tools für optimierte Geschäftsprozesse und effiziente Teamarbeit.</p>
            </motion.div>
          </div>
        </section>

        {/* Technologien & Tools mit Marquee-Animation */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Technologien & Tools</motion.h2>
          <div className="space-y-4">
            {/* Zeile 1 - Microsoft 365 & Cloud */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef1}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth1 > 0 ? { x: [0, -contentWidth1] } : false}
                transition={contentWidth1 > 0 ? { repeat: Infinity, duration: 90, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Microsoft 365", "Azure", "SharePoint", "Teams", "OneDrive", "Exchange Online", "Power Platform", "Power Apps", "Power Automate", "Power BI", "Dynamics 365", "Windows 365", "Microsoft Graph", "Azure AD", "Intune", "Yammer", "Planner", "Forms", "Stream", "Delve", "Sway", "Bookings", "Whiteboard", "Lists", "To Do", "Outlook", "Viva", "Kaizala", "Visio", "Project"]
                  .concat(["Microsoft 365", "Azure", "SharePoint", "Teams", "OneDrive", "Exchange Online", "Power Platform", "Power Apps", "Power Automate", "Power BI", "Dynamics 365", "Windows 365", "Microsoft Graph", "Azure AD", "Intune", "Yammer", "Planner", "Forms", "Stream", "Delve", "Sway", "Bookings", "Whiteboard", "Lists", "To Do", "Outlook", "Viva", "Kaizala", "Visio", "Project"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 2 - Collaboration & Security */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef2}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth2 > 0 ? { x: [-contentWidth2, 0] } : false}
                transition={contentWidth2 > 0 ? { repeat: Infinity, duration: 120, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Microsoft Teams", "SharePoint Online", "OneDrive for Business", "Microsoft Defender", "Azure Information Protection", "Conditional Access", "Multi-Factor Authentication", "Zero Trust", "Compliance Center", "Data Loss Prevention", "eDiscovery", "Retention Policies", "IRM", "Azure Sentinel", "Microsoft Purview", "Defender for Endpoint", "Defender for Identity", "Defender for Office 365", "Defender for Cloud Apps", "Endpoint Manager", "Windows Autopilot", "Intune", "BitLocker", "Advanced Threat Protection", "Cloud App Security", "Secure Score", "Privileged Identity Management"]
                  .concat(["Microsoft Teams", "SharePoint Online", "OneDrive for Business", "Microsoft Defender", "Azure Information Protection", "Conditional Access", "Multi-Factor Authentication", "Zero Trust", "Compliance Center", "Data Loss Prevention", "eDiscovery", "Retention Policies", "IRM", "Azure Sentinel", "Microsoft Purview", "Defender for Endpoint", "Defender for Identity", "Defender for Office 365", "Defender for Cloud Apps", "Endpoint Manager", "Windows Autopilot", "Intune", "BitLocker", "Advanced Threat Protection", "Cloud App Security", "Secure Score", "Privileged Identity Management"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 3 - Tools & Integration */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef3}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth3 > 0 ? { x: [0, -contentWidth3] } : false}
                transition={contentWidth3 > 0 ? { repeat: Infinity, duration: 150, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Power Automate", "Power Apps", "Power BI", "SharePoint Framework", "Microsoft Graph API", "Azure DevOps", "GitHub Enterprise", "Visual Studio", "VS Code", "Teams Toolkit", "SharePoint Designer", "PowerShell", "Azure CLI", "Microsoft 365 Admin Center", "Microsoft Endpoint Manager", "Windows Autopilot", "Defender for Endpoint", "Defender for Identity", "Defender for Office 365", "Defender for Cloud Apps", "Logic Apps", "Data Factory", "Synapse Analytics", "Dataverse", "Common Data Service", "ServiceNow", "SAP Integration", "Salesforce Integration", "Zapier", "Make (Integromat)"]
                  .concat(["Power Automate", "Power Apps", "Power BI", "SharePoint Framework", "Microsoft Graph API", "Azure DevOps", "GitHub Enterprise", "Visual Studio", "VS Code", "Teams Toolkit", "SharePoint Designer", "PowerShell", "Azure CLI", "Microsoft 365 Admin Center", "Microsoft Endpoint Manager", "Windows Autopilot", "Defender for Endpoint", "Defender for Identity", "Defender for Office 365", "Defender for Cloud Apps", "Logic Apps", "Data Factory", "Synapse Analytics", "Dataverse", "Common Data Service", "ServiceNow", "SAP Integration", "Salesforce Integration", "Zapier", "Make (Integromat)"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Prozess (Platzhalter) */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Step by step zum Modern Workplace</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">1. Beratung & Analyse</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Wir analysieren deine Arbeitsweise, Ziele und Anforderungen. Du erhältst eine individuelle Beratung und eine klare Roadmap für deinen Modern Workplace.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">2. Konzept & Planung</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Gemeinsam entwickeln wir ein maßgeschneidertes Konzept für die digitale Zusammenarbeit und wählen die passenden Tools aus.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">3. Umsetzung & Integration</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Wir implementieren die Lösungen, schulen dein Team und sorgen für eine reibungslose Integration in den Arbeitsalltag.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10 text-foreground">
              <h4 className="font-semibold text-lg mb-2 dark:text-foreground-dark">4. Rollout & Support</h4>
              <p className="text-foreground/80 dark:text-foreground-dark">Sicherer Rollout, Support und kontinuierliche Optimierung – für einen nachhaltigen Modern Workplace.</p>
            </motion.div>
          </div>
        </section>

        {/* Vorteile (Platzhalter) */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Deine Vorteile auf einen Blick</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <ChartBarIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Effizienz & Produktivität</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Digitale Tools und Automatisierung steigern die Effizienz und erleichtern die Zusammenarbeit im Team.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ShieldCheckIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Sicherheit & Compliance</h4>
                <p className="text-foreground/80 text-sm dark:text-foreground-dark/80">Modernste Sicherheitsstandards, DSGVO-Konformität und zuverlässiger Datenschutz für dein Unternehmen.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Cog6ToothIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Flexibilität & Skalierbarkeit</h4>
                <p className="text-foreground/80 text-sm">Arbeite von überall, skaliere dein Team und passe die Tools flexibel an deine Anforderungen an.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Individuelle Beratung</h4>
                <p className="text-foreground/80 text-sm">Du erhältst keine Lösung von der Stange, sondern ein Konzept, das exakt zu deinen Zielen passt.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bereit für deinen Modern Workplace?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8 text-foreground/80">
                Lass uns gemeinsam die digitale Zusammenarbeit in deinem Unternehmen auf das nächste Level bringen. Kontaktiere mich für ein unverbindliches Erstgespräch.
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