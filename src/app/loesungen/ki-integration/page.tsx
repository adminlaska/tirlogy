'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, ShieldCheckIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, LightBulbIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, CpuChipIcon, CommandLineIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { MainNav } from '../../components/MainNav';
import { Footer } from '../../components/Footer';
import { AIIcon } from '../../components/AIIcon';
import { WebDevIcon } from '../../components/WebDevIcon';

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

export default function KIIntegrationDetail() {
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
            <div className="relative w-full overflow-x-hidden" style={{ height: '4.5rem' }}>
              <motion.div
                className="flex whitespace-nowrap absolute z-10"
                animate={{ x: [0, '-50%'] }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  KI-Integration – Intelligente Automatisierung für dein Business
                </span>
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-8">
                  KI-Integration – Intelligente Automatisierung für dein Business
                </span>
              </motion.div>
            </div>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">Wir integrieren KI-Lösungen, die deine Prozesse automatisieren, Daten nutzbar machen und neue Möglichkeiten für dein Business schaffen.</p>
          </motion.div>
        </section>

        {/* Leistungen */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <LightBulbIcon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold text-primary">KI-Strategie & Beratung</h3>
              </div>
              <p className="text-foreground/80 mb-2">Entwicklung einer individuellen KI-Strategie für dein Unternehmen. Wir analysieren deine Prozesse und identifizieren KI-Potenziale.</p>
              <ul className="list-disc ml-5 text-foreground/70 text-sm space-y-1">
                <li>Potenzialanalyse & Use Cases</li>
                <li>Machbarkeitsstudien & Roadmap</li>
                <li>Workshops & Schulungen</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl bg-white/10 dark:bg-black/10 p-6 shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <PuzzlePieceIcon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold text-primary">KI-Integration & Implementierung</h3>
              </div>
              <p className="text-foreground/80 mb-2">Nahtlose Integration von KI-Lösungen in deine Systeme. Von Machine Learning bis Natural Language Processing.</p>
              <ul className="list-disc ml-5 text-foreground/70 text-sm space-y-1">
                <li>Automatisierung & Prozessoptimierung</li>
                <li>Chatbots, Sprach- & Bilderkennung</li>
                <li>Individuelle KI-Modelle & APIs</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Technologien & Tools mit Marquee-Animation */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Technologien & Tools</motion.h2>
          <div className="space-y-4">
            {/* Zeile 1 - KI & ML Frameworks */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef1}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth1 > 0 ? { x: [0, -contentWidth1] } : false}
                transition={contentWidth1 > 0 ? { repeat: Infinity, duration: 90, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["TensorFlow", "PyTorch", "Keras", "scikit-learn", "Hugging Face", "OpenAI", "LangChain", "Transformers", "SpaCy", "NLTK", "BERT", "GPT", "DALL-E", "Stable Diffusion", "Midjourney", "Whisper", "Llama", "Claude", "Mistral", "Perplexity", "Vertex AI", "AWS Sagemaker", "Azure AI", "Google AI Platform", "AutoML", "DeepL", "OpenCV", "YOLO", "Detectron2", "FastAI", "LightGBM", "XGBoost"]
                  .concat(["TensorFlow", "PyTorch", "Keras", "scikit-learn", "Hugging Face", "OpenAI", "LangChain", "Transformers", "SpaCy", "NLTK", "BERT", "GPT", "DALL-E", "Stable Diffusion", "Midjourney", "Whisper", "Llama", "Claude", "Mistral", "Perplexity", "Vertex AI", "AWS Sagemaker", "Azure AI", "Google AI Platform", "AutoML", "DeepL", "OpenCV", "YOLO", "Detectron2", "FastAI", "LightGBM", "XGBoost"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 2 - Cloud & Infrastructure */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef2}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth2 > 0 ? { x: [-contentWidth2, 0] } : false}
                transition={contentWidth2 > 0 ? { repeat: Infinity, duration: 120, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["AWS SageMaker", "Azure ML", "Google AI Platform", "Docker", "Kubernetes", "TensorRT", "ONNX", "MLflow", "Kubeflow", "Ray", "Dask", "Apache Spark", "Hadoop", "Elasticsearch", "Redis", "BigQuery", "Dataflow", "Vertex AI", "Cloud Functions", "Lambda", "API Gateway", "S3", "Cloud Storage", "Firestore", "Bigtable", "Pub/Sub", "Event Hubs", "Data Lake", "Synapse Analytics", "Data Factory"]
                  .concat(["AWS SageMaker", "Azure ML", "Google AI Platform", "Docker", "Kubernetes", "TensorRT", "ONNX", "MLflow", "Kubeflow", "Ray", "Dask", "Apache Spark", "Hadoop", "Elasticsearch", "Redis", "BigQuery", "Dataflow", "Vertex AI", "Cloud Functions", "Lambda", "API Gateway", "S3", "Cloud Storage", "Firestore", "Bigtable", "Pub/Sub", "Event Hubs", "Data Lake", "Synapse Analytics", "Data Factory"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
            {/* Zeile 3 - Tools & Development */}
            <div className="relative w-full overflow-x-hidden">
              <motion.div
                ref={marqueeRef3}
                className="flex gap-4 whitespace-nowrap"
                animate={contentWidth3 > 0 ? { x: [0, -contentWidth3] } : false}
                transition={contentWidth3 > 0 ? { repeat: Infinity, duration: 150, ease: 'linear' } : {}}
                style={{ willChange: 'transform' }}
              >
                {(["Python", "Jupyter", "VS Code", "PyCharm", "GitHub", "GitLab", "CI/CD", "Weights & Biases", "TensorBoard", "Grafana", "Prometheus", "FastAPI", "Flask", "Django", "Streamlit", "Gradio", "Hugging Face Spaces", "DVC", "MLflow", "Kedro", "Optuna", "Ray Tune", "Neptune", "Comet ML", "Colab", "Sagemaker Studio", "Azure Notebooks", "DataRobot", "Dataiku", "Alteryx"]
                  .concat(["Python", "Jupyter", "VS Code", "PyCharm", "GitHub", "GitLab", "CI/CD", "Weights & Biases", "TensorBoard", "Grafana", "Prometheus", "FastAPI", "Flask", "Django", "Streamlit", "Gradio", "Hugging Face Spaces", "DVC", "MLflow", "Kedro", "Optuna", "Ray Tune", "Neptune", "Comet ML", "Colab", "Sagemaker Studio", "Azure Notebooks", "DataRobot", "Dataiku", "Alteryx"]))
                  .map((tech, i) => (
                    <span key={tech + i} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">{tech}</span>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Prozess */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Step by step zur KI-Lösung</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10">
              <h4 className="font-semibold text-lg mb-2">1. Analyse & Strategie</h4>
              <p className="text-foreground/80">Wir analysieren deine Ziele, Daten und Prozesse. Du erhältst eine individuelle Beratung und eine klare Roadmap für deine KI-Integration.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10">
              <h4 className="font-semibold text-lg mb-2">2. Konzeption & Prototyping</h4>
              <p className="text-foreground/80">Gemeinsam entwickeln wir ein maßgeschneidertes Konzept und erstellen auf Wunsch Prototypen für deine KI-Lösung.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10">
              <h4 className="font-semibold text-lg mb-2">3. Entwicklung & Implementierung</h4>
              <p className="text-foreground/80">Agile Entwicklung, Integration und Anpassung der KI-Lösungen an deine Anforderungen.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl bg-white/5 dark:bg-black/5 p-6 border border-primary/10">
              <h4 className="font-semibold text-lg mb-2">4. Rollout & Support</h4>
              <p className="text-foreground/80">Sicherer Go-Live, Monitoring und kontinuierliche Optimierung – für nachhaltigen KI-Erfolg.</p>
            </motion.div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-8 text-primary">Deine Vorteile auf einen Blick</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <ChartBarIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Effizienzsteigerung</h4>
                <p className="text-foreground/80 text-sm">Automatisierung von Prozessen und Optimierung von Arbeitsabläufen durch KI.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ShieldCheckIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Datenbasierte Entscheidungen</h4>
                <p className="text-foreground/80 text-sm">Präzise Analysen und Vorhersagen für bessere Entscheidungen.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Cog6ToothIcon className="w-16 h-16 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Innovationsvorsprung</h4>
                <p className="text-foreground/80 text-sm">Setze auf modernste KI-Technologien und sichere dir einen Vorsprung im Wettbewerb.</p>
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
          className="w-full max-w-none mx-auto mt-32"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bereit für innovative KI-Lösungen?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8 text-foreground/80">
                Lass uns gemeinsam deine Vision mit künstlicher Intelligenz verwirklichen. Kontaktiere uns für ein unverbindliches Erstgespräch.
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