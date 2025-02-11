'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Header } from '../components/Header';

// Komponente für ein einzelnes KI-Modell
const ModelCard = ({ title, description, features, icon }: {
  title: string;
  description: string;
  features: string[];
  icon: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-lg dark:shadow-primary/5 border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/5 flex items-center justify-center flex-shrink-0">
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="text-primary"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 text-foreground dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 dark:text-white/70 mb-4">
            {description}
          </p>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-sm text-foreground/60 dark:text-white/60">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Komponente für den Modell-Bereich
const ModelSection = ({ title, description, inputPlaceholder, onSubmit, isLoading, result, type }: {
  title: string;
  description: string;
  inputPlaceholder: string;
  onSubmit: (input: string) => Promise<void>;
  isLoading: boolean;
  result: any;
  type: 'text' | 'image' | 'video';
}) => {
  const [input, setInput] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-2xl"
    >
      {/* Header mit Logo */}
      <div className="relative flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 ring-1 ring-primary/10 dark:ring-primary/20">
            <Image
              src="/tiryaki_it_ki_playground.png"
              alt="KI-Playground Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-medium text-primary bg-primary/5 dark:bg-primary/10 rounded-full ring-1 ring-primary/20">Beta</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          className="w-full h-32 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <span className="font-semibold">Wichtiger Hinweis:</span> Dies ist eine KI-generierte Ausgabe. Die Ergebnisse können ungenau oder fehlerhaft sein. Bitte überprüfen Sie alle Informationen sorgfältig vor der Verwendung.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSubmit(input)}
          disabled={isLoading || !input.trim()}
          className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verarbeite...' : 'Generieren'}
        </button>

        {isLoading && (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {result && (
          <div className="mt-6">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Dieses Ergebnis wurde von einer KI generiert. Bitte beachten Sie:
                </p>
              </div>
              <ul className="mt-2 ml-7 list-disc text-sm text-blue-700 dark:text-blue-300">
                <li>Die Ausgabe kann Fehler oder Ungenauigkeiten enthalten</li>
                <li>Überprüfen Sie alle Fakten und Informationen</li>
                <li>Nutzen Sie das Ergebnis nur als Inspiration oder Ausgangspunkt</li>
              </ul>
            </div>
            {type === 'text' && (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{result}</p>
              </div>
            )}
            {type === 'image' && (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={result}
                  alt="Generiertes Bild"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {type === 'video' && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <video
                  src={result}
                  controls
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Neue Komponente für die KI-Modell-Karte
const AIModelCard = ({ hersteller, modelle, einsatzgebiete, besonderheiten }: {
  hersteller: string;
  modelle: string[];
  einsatzgebiete: string[];
  besonderheiten: string[];
}) => {
  const getHerstellerIcon = (name: string) => {
    switch (name) {
      case 'Hugging Face':
        return (
          <Image
            src="/icons/Hugging Face_ideEMm3Xr6_1.svg"
            alt="Hugging Face Logo"
            width={20}
            height={20}
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          />
        );
      case 'OpenAI':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="-1 -.1 949.1 959.8">
            <path d="m925.8 456.3c10.4 23.2 17 48 19.7 73.3 2.6 25.3 1.3 50.9-4.1 75.8-5.3 24.9-14.5 48.8-27.3 70.8-8.4 14.7-18.3 28.5-29.7 41.2-11.3 12.6-23.9 24-37.6 34-13.8 10-28.5 18.4-44.1 25.3-15.5 6.8-31.7 12-48.3 15.4-7.8 24.2-19.4 47.1-34.4 67.7-14.9 20.6-33 38.7-53.6 53.6-20.6 15-43.4 26.6-67.6 34.4-24.2 7.9-49.5 11.8-75 11.8-16.9.1-33.9-1.7-50.5-5.1-16.5-3.5-32.7-8.8-48.2-15.7s-30.2-15.5-43.9-25.5c-13.6-10-26.2-21.5-37.4-34.2-25 5.4-50.6 6.7-75.9 4.1-25.3-2.7-50.1-9.3-73.4-19.7-23.2-10.3-44.7-24.3-63.6-41.4s-35-37.1-47.7-59.1c-8.5-14.7-15.5-30.2-20.8-46.3s-8.8-32.7-10.6-49.6c-1.8-16.8-1.7-33.8.1-50.7 1.8-16.8 5.5-33.4 10.8-49.5-17-18.9-31-40.4-41.4-63.6-10.3-23.3-17-48-19.6-73.3-2.7-25.3-1.3-50.9 4-75.8s14.5-48.8 27.3-70.8c8.4-14.7 18.3-28.6 29.6-41.2s24-24 37.7-34 28.5-18.5 44-25.3c15.6-6.9 31.8-12 48.4-15.4 7.8-24.3 19.4-47.1 34.3-67.7 15-20.6 33.1-38.7 53.7-53.7 20.6-14.9 43.4-26.5 67.6-34.4 24.2-7.8 49.5-11.8 75-11.7 16.9-.1 33.9 1.6 50.5 5.1s32.8 8.7 48.3 15.6c15.5 7 30.2 15.5 43.9 25.5 13.7 10.1 26.3 21.5 37.5 34.2 24.9-5.3 50.5-6.6 75.8-4s50 9.3 73.3 19.6c23.2 10.4 44.7 24.3 63.6 41.4 18.9 17 35 36.9 47.7 59 8.5 14.6 15.5 30.1 20.8 46.3 5.3 16.1 8.9 32.7 10.6 49.6 1.8 16.9 1.8 33.9-.1 50.8-1.8 16.9-5.5 33.5-10.8 49.6 17.1 18.9 31 40.3 41.4 63.6zm-333.2 426.9c21.8-9 41.6-22.3 58.3-39s30-36.5 39-58.4c9-21.8 13.7-45.2 13.7-68.8v-223q-.1-.3-.2-.7-.1-.3-.3-.6-.2-.3-.5-.5-.3-.3-.6-.4l-80.7-46.6v269.4c0 2.7-.4 5.5-1.1 8.1-.7 2.7-1.7 5.2-3.1 7.6s-3 4.6-5 6.5a32.1 32.1 0 0 1 -6.5 5l-191.1 110.3c-1.6 1-4.3 2.4-5.7 3.2 7.9 6.7 16.5 12.6 25.5 17.8 9.1 5.2 18.5 9.6 28.3 13.2 9.8 3.5 19.9 6.2 30.1 8 10.3 1.8 20.7 2.7 31.1 2.7 23.6 0 47-4.7 68.8-13.8zm-455.1-151.4c11.9 20.5 27.6 38.3 46.3 52.7 18.8 14.4 40.1 24.9 62.9 31s46.6 7.7 70 4.6 45.9-10.7 66.4-22.5l193.2-111.5.5-.5q.2-.2.3-.6.2-.3.3-.6v-94l-233.2 134.9c-2.4 1.4-4.9 2.4-7.5 3.2-2.7.7-5.4 1-8.2 1-2.7 0-5.4-.3-8.1-1-2.6-.8-5.2-1.8-7.6-3.2l-191.1-110.4c-1.7-1-4.2-2.5-5.6-3.4-1.8 10.3-2.7 20.7-2.7 31.1s1 20.8 2.8 31.1c1.8 10.2 4.6 20.3 8.1 30.1 3.6 9.8 8 19.2 13.2 28.2zm-50.2-417c-11.8 20.5-19.4 43.1-22.5 66.5s-1.5 47.1 4.6 70c6.1 22.8 16.6 44.1 31 62.9 14.4 18.7 32.3 34.4 52.7 46.2l193.1 111.6q.3.1.7.2h.7q.4 0 .7-.2.3-.1.6-.3l81-46.8-233.2-134.6c-2.3-1.4-4.5-3.1-6.5-5a32.1 32.1 0 0 1 -5-6.5c-1.3-2.4-2.4-4.9-3.1-7.6-.7-2.6-1.1-5.3-1-8.1v-227.1c-9.8 3.6-19.3 8-28.3 13.2-9 5.3-17.5 11.3-25.5 18-7.9 6.7-15.3 14.1-22 22.1-6.7 7.9-12.6 16.5-17.8 25.5zm663.3 154.4c2.4 1.4 4.6 3 6.6 5 1.9 1.9 3.6 4.1 5 6.5 1.3 2.4 2.4 5 3.1 7.6.6 2.7 1 5.4.9 8.2v227.1c32.1-11.8 60.1-32.5 80.8-59.7 20.8-27.2 33.3-59.7 36.2-93.7s-3.9-68.2-19.7-98.5-39.9-55.5-69.5-72.5l-193.1-111.6q-.3-.1-.7-.2h-.7q-.3.1-.7.2-.3.1-.6.3l-80.6 46.6 233.2 134.7zm80.5-121h-.1v.1zm-.1-.1c5.8-33.6 1.9-68.2-11.3-99.7-13.1-31.5-35-58.6-63-78.2-28-19.5-61-30.7-95.1-32.2-34.2-1.4-68 6.9-97.6 23.9l-193.1 111.5q-.3.2-.5.5l-.4.6q-.1.3-.2.7-.1.3-.1.7v93.2l233.2-134.7c2.4-1.4 5-2.4 7.6-3.2 2.7-.7 5.4-1 8.1-1 2.8 0 5.5.3 8.2 1 2.6.8 5.1 1.8 7.5 3.2l191.1 110.4c1.7 1 4.2 2.4 5.6 3.3zm-505.3-103.2c0-2.7.4-5.4 1.1-8.1.7-2.6 1.7-5.2 3.1-7.6 1.4-2.3 3-4.5 5-6.5 1.9-1.9 4.1-3.6 6.5-4.9l191.1-110.3c1.8-1.1 4.3-2.5 5.7-3.2-26.2-21.9-58.2-35.9-92.1-40.2-33.9-4.4-68.3 1-99.2 15.5-31 14.5-57.2 37.6-75.5 66.4-18.3 28.9-28 62.3-28 96.5v223q.1.4.2.7.1.3.3.6.2.3.5.6.2.2.6.4l80.7 46.6zm43.8 294.7 103.9 60 103.9-60v-119.9l-103.8-60-103.9 60z" fill="currentColor" />
          </svg>
        );
      case 'DeepMind':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'EleutherAI':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 192 218">
            <path d="M0 0 C5.61233444 5.04279522 8.46293285 10.48863596 9.3515625 17.953125 C10.42447909 42.23492158 -2.31963471 68.35771454 -18.23950195 86.10229492 C-27.09929424 95.62891502 -35.70352701 104.82305178 -49.375 105.4375 C-60.40928045 105.04233293 -68.27493993 99.55194948 -76 92 C-93.04532894 73.57100544 -108.81116642 46.12226991 -108.47290039 20.57861328 C-108.21669795 14.96715496 -107.07360947 10.6785005 -104 6 C-103.63390625 5.39027344 -103.2678125 4.78054687 -102.890625 4.15234375 C-96.63482515 -4.63280727 -84.41915969 -8.36065878 -74.328125 -10.4921875 C-50.40273287 -14.1427755 -20.30302684 -15.09155471 0 0 Z M-55 -10 C-55 -9.67 -55 -9.34 -55 -9 C-51.37 -9 -47.74 -9 -44 -9 C-44 -9.33 -44 -9.66 -44 -10 C-47.63 -10 -51.26 -10 -55 -10 Z M-86.75 6.75 C-95.31105272 16.74286642 -99.69566816 28.97903028 -99.29296875 42.19140625 C-98.58410575 48.98703954 -97.49182187 55.67775729 -93 61 C-93.05800781 60.04222656 -93.11601563 59.08445312 -93.17578125 58.09765625 C-94.05303557 36.97111868 -85.71035508 18.9389825 -71.6171875 3.3671875 C-66.76629059 -1.72106216 -62.52488271 -5.34171445 -56 -8 C-56 -8.33 -56 -8.66 -56 -9 C-67.54848048 -9.71651156 -79.15503172 -1.245362 -86.75 6.75 Z M-44 -9 C-42.515 -8.01 -42.515 -8.01 -41 -7 C-23.74017292 4.91006167 -10.04818535 24.12465613 -6 45 C-5.50201707 49.66248728 -5.19574284 54.31567129 -5 59 C0.65189813 50.52215281 0.90900152 38.73355094 -1 29 C-4.87889066 15.24756948 -12.56438812 3.37338195 -25.1484375 -3.79296875 C-31.49149546 -6.905355 -36.9333788 -8.76045352 -44 -9 Z M-6 59 C-5 61 -5 61 -5 61 Z M-93 61 C-92 63 -92 63 -92 63 Z M-92 63 C-88.46540436 73.15294565 -79.89573187 79.59774038 -70.6328125 84.37109375 C-57.58722779 90.2205656 -45.5091613 89.96009706 -32 86 C-24.34387477 82.83296881 -17.60860667 78.11729425 -12 72 C-11.67 71.01 -11.34 70.02 -11 69 C-13.74667529 70.0820236 -16.40890191 71.20027849 -19.0625 72.5 C-35.92169066 79.68248021 -62.10044012 78.66191718 -79 72 C-81.88768315 70.50534875 -84.35322825 68.90567566 -87 67 C-87.66 67 -88.32 67 -89 67 C-89.66 65.68 -90.32 64.36 -91 63 C-91.33 63 -91.66 63 -92 63 Z" fill="currentColor" transform="translate(146,77)" />
            <path d="M0 0 C27.04614305 21.09210005 49.88595425 59.33318185 54.5 93.5 C55.49784424 105.32630212 54.41708885 116.61350407 47.25 126.4375 C33.65301385 142.1950242 12.2932844 145.93095004 -7.5 147.5 C-13.47649636 147.82675313 -19.45373786 147.84152076 -25.4375 147.8125 C-26.61631241 147.80976578 -26.61631241 147.80976578 -27.81893921 147.80697632 C-50.22089746 147.71961651 -74.47365871 145.30976382 -91.71484375 129.37109375 C-99.20519088 121.52016098 -101.59841267 112.03364514 -101.9375 101.375 C-101.06788049 66.90328252 -79.65028046 34.46628511 -57.5 9.5 C-56.88511719 8.80003906 -56.27023438 8.10007812 -55.63671875 7.37890625 C-40.53281674 -8.80642072 -18.58621813 -12.79969111 0 0 Z M-70.1171875 32.02734375 C-82.54421229 44.92292849 -89.23764522 61.10095332 -89.875 79 C-89.12828773 98.44323882 -81.27178748 115.38758777 -67.12890625 128.73828125 C-52.82864667 140.88778179 -35.21474356 146.00811624 -16.68261719 144.72753906 C0.11979307 142.9758784 15.876388 134.72697388 26.86572266 121.90673828 C38.1437665 107.60571362 44.10656758 90.80184418 42.5 72.5 C39.68276769 53.82052491 31.43999205 37.05476193 15.9765625 25.63671875 C-11.70170909 7.11844822 -45.51510181 8.92914731 -70.1171875 32.02734375 Z" fill="currentColor" transform="translate(119.5,38.5)" />
          </svg>
        );
      case 'NVIDIA':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 163.3 108">
            <path d="M60.9,32.2v-9.7c1-0.1,1.9-0.1,2.9-0.1c26.7-0.8,44.2,23,44.2,23S89.1,71.5,68.8,71.5c-2.7,0-5.3-0.4-7.9-1.3V40.7c10.4,1.3,12.5,5.8,18.7,16.2l13.9-11.7c0,0-10.2-13.3-27.2-13.3C64.5,31.9,62.7,32,60.9,32.2 M60.9,0v14.5l2.9-0.2c37.1-1.3,61.3,30.4,61.3,30.4S97.3,78.6,68.4,78.6c-2.5,0-5-0.2-7.5-0.7v9c2,0.2,4.1,0.4,6.2,0.4c26.9,0,46.4-13.8,65.3-30c3.1,2.5,15.9,8.6,18.6,11.2c-17.9,15-59.7,27.1-83.4,27.1c-2.3,0-4.4-0.1-6.6-0.4V108h102.3V0C163.3,0,60.9,0,60.9,0z M60.9,70.3v7.7C36,73.5,29.1,47.6,29.1,47.6s12-13.2,31.8-15.4v8.4h-0.1c-10.4-1.3-18.6,8.5-18.6,8.5S46.9,65.5,60.9,70.3 M16.7,46.5c0,0,14.7-21.8,44.2-24v-7.9C28.2,17.2,0,44.8,0,44.8s16,46.3,60.9,50.5v-8.4C27.9,82.8,16.7,46.5,16.7,46.5z" fill="currentColor" />
          </svg>
        );
      case 'Alibaba':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 125 62.5">
            <path d="M73.4,46.8c6.9-9.2,19.9-22.1,20.3-31.2C94.5,3.8,82.6-0.1,70.3,0c-8.6,0.1-17.4,2.6-23.4,4.7C26,12.1,13,23.8,4.7,36.9C-4,49.8-1.1,62.1,17.3,62.5c14.1-0.6,23.3-4.5,32.9-9.4c0.1,0-26.5,7.6-36.2,2c0,0,0,0,0,0c-1-0.6-2.1-1.4-2.4-3.6c-0.1-4.6,7.6-9.4,11.9-10.9v-8c3.2,1.2,6.6,1.9,10.2,1.9c6.9,0,13.2-2.5,18.1-6.6c0.2,0.7,0.3,1.5,0.2,2.3h1.9c0.2-2.1-0.9-3.7-0.9-3.7c-1.7-2.8-4.8-2.7-4.8-2.7s1.6,0.7,2.8,2.4c-4.5,3.8-10.3,6-16.6,6c-2.7,0-5.3-0.4-7.7-1.2l6.3-6.3l-1.7-4.6c12.7-4.4,23.3-7.8,40.7-10.9L68,6.3l2-1.2C80.5,8,87.4,10.1,87,15.7c-0.2,0.9-0.5,2-1,3.2c-3,6-12.1,16.1-15.8,20.3c-2.4,2.8-4.8,5.5-6.5,8.1c-1.7,2.6-2.8,5.1-2.9,7.4C61,73,114.6,46.2,125,39.1C109.7,45.7,93.2,52,75,53.2C69.9,53.5,70.5,50.8,73.4,46.8" fill="currentColor" />
          </svg>
        );
      case 'Huawei':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 149.9 153.1">
            <g>
              <path d="M139,44.7c0.8-12.9-12.1-24.8-12.1-24.8S102.8,49,85.3,87.3c-0.1,0.2-0.1,0.5,0.1,0.7c0.1,0.1,0.4,0.2,0.7,0.1c6.6-3.3,33.9-17.3,45.4-28.3C131.5,59.8,138.7,54,139,44.7 M108.4,15.6c0,0-3-11.2-15.2-14.2c0,0-3.5-0.9-7.3-1.4c0,0-13.6,17.6-7,83.8c0,0.3,0.2,0.5,0.4,0.5c0.2,0.1,0.5,0,0.7-0.3c4.4-6.3,24.3-35.9,28.4-53.9C108.3,30.2,110.5,21.5,108.4,15.6 M89.7,97.5c-0.1,0.1-0.1,0.5,0.1,0.7c4.4,3.2,17.8,12.5,24.2,14.3c0,0,11.9,4.1,22.2-13.7c0,0-34.6-1.2-46.1-1.6C90,97.2,89.7,97.3,89.7,97.5 M148.5,58.1c0,0-39.1,21-59.4,34.7c-0.1,0.1-0.3,0.3-0.2,0.7c0.1,0.2,0.2,0.4,0.5,0.4c7.2,0,34.7,0,35.4-0.1c0,0,3.5-0.1,7.9-1.8c0,0,9.8-3.1,14.8-14.2C147.5,77.7,152,68.6,148.5,58.1 M60.7,92.7C40.5,79.1,1.3,58.1,1.3,58.1c-3.5,10.6,1,19.6,1,19.6c5.1,11.1,14.8,14.2,14.8,14.2c4.4,1.7,7.9,1.8,7.9,1.8c0.7,0.1,28.1,0.1,35.4,0.1c0.2,0,0.4-0.2,0.5-0.4C61,93,60.9,92.8,60.7,92.7 M59.7,97.2c-11.5,0.4-46.1,1.6-46.1,1.6c10.3,17.8,22.2,13.7,22.2,13.7c6.4-1.8,19.8-11.2,24.2-14.3c0.3-0.2,0.2-0.6,0.1-0.7C60.1,97.3,59.8,97.2,59.7,97.2 M56.7,1.4c-12.2,3-15.2,14.2-15.2,14.2c-2.1,5.9,0.1,14.6,0.1,14.6c4.1,18,24,47.6,28.4,53.9c0.2,0.2,0.4,0.3,0.7,0.3c0.2,0,0.3-0.2,0.4-0.5c6.6-66.3-7-83.8-7-83.8C60.2,0.5,56.7,1.4,56.7,1.4 M22.9,19.9c0,0-13,11.9-12.1,24.8c0.4,9.3,7.6,15.1,7.6,15.1c11.5,11,38.8,25.1,45.4,28.3c0.3,0.1,0.5,0.1,0.7-0.1c0.2-0.2,0.2-0.5,0.1-0.7C47,49,22.9,19.9,22.9,19.9" fill="currentColor" />
            </g>
          </svg>
        );
      case 'Salesforce':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 273 191">
            <g fill="none" fillRule="evenodd">
              <path d="M113.258 21.277c8.777-9.144 20.998-14.818 34.513-14.818 17.965 0 33.641 10.018 41.986 24.892a58 58 0 0 1 23.733-5.046c32.404 0 58.674 26.499 58.674 59.189s-26.27 59.19-58.674 59.19c-3.957 0-7.821-.398-11.559-1.152-7.349 13.109-21.359 21.968-37.435 21.968a42.668 42.668 0 0 1-18.765-4.319C138.281 178.71 120.917 191 100.686 191c-21.073 0-39.033-13.332-45.922-32.03a45.117 45.117 0 0 1-9.338.972C20.337 159.942 0 139.392 0 114.043c0-16.99 9.136-31.823 22.715-39.758a52.55 52.55 0 0 1-4.349-20.994C18.366 24.136 42.033.5 71.227.5c17.14 0 32.373 8.148 42.031 20.777" fill="currentColor" />
              <path d="M39.42 99.289c-.171.446.061.539.116.618.511.37 1.03.638 1.554.939 2.775 1.469 5.398 1.9 8.138 1.9 5.583 0 9.051-2.968 9.051-7.748v-.094c0-4.42-3.915-6.026-7.584-7.185l-.479-.155c-2.767-.898-5.155-1.675-5.155-3.498v-.093c0-1.561 1.396-2.708 3.559-2.708 2.405 0 5.255.799 7.093 1.814 0 0 .542.35.739-.173.107-.283 1.036-2.785 1.135-3.056.106-.293-.08-.514-.271-.628-2.099-1.279-4.998-2.149-7.999-2.149l-.557.002c-5.11 0-8.678 3.09-8.678 7.512v.095c0 4.66 3.936 6.175 7.623 7.228l.592.184c2.685.824 5.004 1.536 5.004 3.425v.094c0 1.73-1.507 3.015-3.934 3.015-.941 0-3.945-.016-7.191-2.069-.393-.229-.617-.394-.92-.579-.16-.097-.56-.272-.734.252l-1.102 3.057m81.73 0c-.171.446.061.539.118.618.509.37 1.029.638 1.552.939 2.776 1.469 5.399 1.9 8.138 1.9 5.583 0 9.052-2.968 9.052-7.748v-.094c0-4.42-3.914-6.026-7.584-7.185l-.479-.155c-2.767-.898-5.156-1.675-5.156-3.498v-.093c0-1.561 1.397-2.708 3.561-2.708 2.404 0 5.253.799 7.091 1.814 0 0 .542.35.74-.173.106-.283 1.036-2.785 1.134-3.056.107-.293-.08-.514-.27-.628-2.1-1.279-4.998-2.149-7.999-2.149l-.558.002c-5.109 0-8.677 3.09-8.677 7.512v.095c0 4.66 3.935 6.175 7.623 7.228l.591.184c2.686.824 5.005 1.536 5.005 3.425v.094c0 1.73-1.508 3.015-3.933 3.015-.943 0-3.947-.016-7.192-2.069-.393-.229-.623-.387-.921-.579-.101-.064-.572-.248-.733.252l-1.103 3.057m55.795-9.364c0 2.7-.504 4.832-1.494 6.335-.984 1.49-2.469 2.215-4.54 2.215s-3.548-.724-4.516-2.213c-.977-1.504-1.473-3.637-1.473-6.337 0-2.698.496-4.823 1.473-6.311.968-1.475 2.445-2.191 4.516-2.191s3.556.717 4.54 2.192c.992 1.487 1.494 3.612 1.494 6.31m4.662-5.007c-.459-1.549-1.172-2.912-2.121-4.049-.951-1.14-2.154-2.057-3.58-2.721-1.424-.665-3.104-1.002-4.995-1.002s-3.572.337-4.997 1.002c-1.424.664-2.628 1.581-3.579 2.723-.948 1.139-1.663 2.5-2.12 4.047-.455 1.537-.686 3.222-.686 5.007 0 1.786.231 3.472.686 5.007.457 1.546 1.17 2.908 2.121 4.049.951 1.142 2.158 2.051 3.58 2.699 1.426.648 3.106.978 4.995.978 1.89 0 3.568-.33 4.993-.978 1.424-.648 2.629-1.557 3.582-2.699.949-1.137 1.662-2.501 2.121-4.049.454-1.538.685-3.223.685-5.007 0-1.783-.231-3.469-.685-5.007m38.267 12.834c-.153-.453-.595-.282-.595-.282-.677.259-1.397.499-2.167.619-.776.122-1.635.183-2.554.183-2.253 0-4.048-.671-5.329-1.997-1.287-1.327-2.01-3.471-2.002-6.371.007-2.636.645-4.622 1.789-6.136 1.134-1.504 2.866-2.276 5.169-2.276 1.923 0 3.39.223 4.927.705 0 0 .365.159.54-.322.409-1.133.711-1.939 1.147-3.184.124-.355-.18-.505-.291-.548-.604-.236-2.031-.623-3.108-.786-1.007-.154-2.184-.234-3.497-.234-1.957 0-3.702.335-5.194.999-1.489.663-2.752 1.579-3.753 2.718-1.001 1.141-1.763 2.504-2.267 4.05-.505 1.538-.76 3.226-.76 5.016 0 3.865 1.043 6.988 3.1 9.276 2.064 2.296 5.16 3.462 9.201 3.462 2.387 0 4.836-.483 6.6-1.177 0 0 .336-.162.19-.554l-1.146-3.161m8.154-10.416c.223-1.501.634-2.748 1.275-3.722.967-1.475 2.439-2.288 4.51-2.288 2.072 0 3.437.814 4.421 2.289.65.975.934 2.274 1.045 3.723l-11.251-.002zm15.689-3.297c-.397-1.494-1.375-3.003-2.018-3.693-1.015-1.094-2.009-1.86-2.996-2.283a11.51 11.51 0 0 0-4.517-.917c-1.969 0-3.758.333-5.209 1.013-1.453.682-2.674 1.614-3.631 2.772-.959 1.157-1.678 2.534-2.137 4.096-.46 1.553-.692 3.246-.692 5.034 0 1.818.241 3.513.715 5.037.479 1.537 1.248 2.886 2.286 4.009 1.037 1.127 2.372 2.011 3.967 2.627 1.587.615 3.515.934 5.726.927 4.558-.015 6.955-1.031 7.945-1.578.175-.098.34-.267.134-.754l-1.032-2.888c-.158-.431-.594-.275-.594-.275-1.131.422-2.732 1.175-6.476 1.167-2.446-.004-4.258-.727-5.397-1.856-1.165-1.155-1.737-2.851-1.834-5.247l15.772.012s.416-.004.459-.41c.017-.168.541-3.24-.471-6.793zm-142.028 3.297c.223-1.501.635-2.748 1.275-3.722.968-1.475 2.438-2.288 4.511-2.288 2.072 0 3.437.814 4.421 2.289.649.975.933 2.274 1.044 3.723l-11.251-.002zm15.689-3.297c-.396-1.494-1.375-3.003-2.017-3.693-1.015-1.094-2.008-1.86-2.996-2.283a11.522 11.522 0 0 0-4.517-.917c-1.969 0-3.758.333-5.209 1.013-1.453.682-2.674 1.614-3.633 2.772-.957 1.157-1.676 2.534-2.137 4.096-.459 1.553-.69 3.246-.69 5.034 0 1.818.239 3.513.716 5.037.478 1.537 1.248 2.886 2.284 4.009 1.038 1.127 2.372 2.011 3.967 2.627 1.588.615 3.514.934 5.727.927 4.557-.015 6.955-1.031 7.945-1.578.174-.098.34-.267.133-.754l-1.031-2.888c-.159-.431-.595-.275-.595-.275-1.13.422-2.731 1.175-6.476 1.167-2.445-.004-4.258-.727-5.397-1.856-1.164-1.155-1.737-2.851-1.834-5.247l15.773.012s.416-.004.459-.41c.017-.168.541-3.24-.472-6.793zM67.592 97.666c-.619-.494-.705-.615-.91-.936-.313-.483-.473-1.171-.473-2.052 0-1.385.46-2.383 1.408-3.053-.01.002 1.36-1.182 4.575-1.14a31.98 31.98 0 0 1 4.283.365v7.17h.002s-2.005.431-4.262.567c-3.208.193-4.633-.924-4.623-.921zm6.277-11.086c-.64-.047-1.469-.07-2.463-.07-1.351 0-2.658.168-3.885.498-1.232.332-2.34.846-3.293 1.527a7.633 7.633 0 0 0-2.289 2.602c-.559 1.041-.844 2.264-.844 3.635 0 1.399.243 2.611.723 3.601a6.543 6.543 0 0 0 2.057 2.47c.877.638 1.959 1.106 3.214 1.392 1.239.283 2.643.426 4.177.426 1.62 0 3.231-.136 4.792-.399a95.06 95.06 0 0 0 3.973-.772c.526-.121 1.106-.28 1.106-.28.39-.099.36-.516.36-.516l-.009-14.426c0-3.164-.844-5.508-2.507-6.964-1.655-1.449-4.092-2.181-7.245-2.181-1.184 0-3.086.16-4.228.389 0 0-3.444.668-4.862 1.779 0 0-.312.192-.142.627l1.117 3c.139.389.518.256.518.256s.119-.047.259-.13c3.034-1.65 6.873-1.601 6.873-1.601 1.704 0 3.017.345 3.899 1.02.861.661 1.298 1.656 1.298 3.759v.667c-1.353-.196-2.599-.309-2.599-.309zm127.235-8.127a.428.428 0 0 0-.237-.568c-.269-.102-1.61-.385-2.644-.449-1.983-.124-3.082.21-4.068.654-.978.441-2.061 1.154-2.665 1.967l-.002-1.924c0-.264-.187-.477-.453-.477h-4.044c-.262 0-.452.213-.452.477v23.532a.48.48 0 0 0 .479.479h4.145a.479.479 0 0 0 .478-.479V89.91c0-1.579.174-3.152.521-4.141.342-.979.807-1.759 1.383-2.32a4.786 4.786 0 0 1 1.948-1.172 7.681 7.681 0 0 1 2.116-.298c.825 0 1.733.212 1.733.212.304.034.473-.152.576-.426.271-.721 1.039-2.882 1.186-3.312" fill="#FFFFFE" />
              <path d="M162.201 67.548a13.258 13.258 0 0 0-1.559-.37 12.217 12.217 0 0 0-2.144-.166c-2.853 0-5.102.806-6.681 2.398-1.568 1.58-2.635 3.987-3.17 7.154l-.193 1.069h-3.581s-.437-.018-.529.459l-.588 3.28c-.041.314.094.51.514.508h3.486l-3.537 19.743c-.277 1.59-.594 2.898-.945 3.889-.346.978-.684 1.711-1.1 2.243-.403.515-.785.894-1.444 1.115-.544.183-1.17.267-1.856.267-.382 0-.89-.064-1.265-.139-.375-.074-.57-.158-.851-.276 0 0-.409-.156-.57.254-.131.335-1.06 2.89-1.17 3.206-.112.312.045.558.243.629.464.166.809.272 1.441.421.878.207 1.618.22 2.311.22 1.452 0 2.775-.204 3.872-.6 1.104-.399 2.065-1.094 2.915-2.035.919-1.015 1.497-2.078 2.05-3.528.547-1.437 1.013-3.221 1.386-5.3l3.554-20.109h5.196s.438.016.529-.459l.588-3.28c.041-.314-.093-.51-.515-.508h-5.043c.025-.114.254-1.888.833-3.558.247-.713.712-1.288 1.106-1.683a3.273 3.273 0 0 1 1.321-.822 5.48 5.48 0 0 1 1.693-.244c.475 0 .941.057 1.296.131.489.104.679.159.807.197.514.157.583.005.684-.244l1.206-3.312c.124-.356-.178-.506-.29-.55m-70.474 34.117c0 .264-.188.479-.452.479h-4.183c-.265 0-.453-.215-.453-.479V67.997c0-.263.188-.476.453-.476h4.183c.264 0 .452.213.452.476v33.668" fill="#FFFFFE" />
            </g>
          </svg>
        );
      case 'Synthesia':
        return (
          <svg width="24" height="24" viewBox="0 0 120 120" className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 90h65c15 0 25-10 27-25l3-30h-22l-3 27c-0.5 4-2.5 6-6 6h-60l-2 22zM22 68l3-27c0.5-4 2.5-6 6-6h60l2-22h-65c-15 0-25 10-27 25l-3 30h24z" fill="currentColor" />
          </svg>
        );
      case 'Mistral AI':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 256 233">
            <g>
              <rect fill="currentColor" x="186.181818" y="0" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="209.454545" y="0" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="0" y="0" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="0" y="46.5454545" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="0" y="93.0909091" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="0" y="139.636364" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="0" y="186.181818" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="23.2727273" y="0" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="209.454545" y="46.5454545" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="23.2727273" y="46.5454545" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="139.636364" y="46.5454545" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="162.909091" y="46.5454545" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="69.8181818" y="46.5454545" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="116.363636" y="93.0909091" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="162.909091" y="93.0909091" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="69.8181818" y="93.0909091" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="93.0909091" y="139.636364" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="116.363636" y="139.636364" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="209.454545" y="93.0909091" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="23.2727273" y="93.0909091" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="186.181818" y="139.636364" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="209.454545" y="139.636364" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="186.181818" y="186.181818" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="23.2727273" y="139.636364" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="209.454545" y="186.181818" width="46.5454545" height="46.5454545" />
              <rect fill="currentColor" x="23.2727273" y="186.181818" width="46.5454545" height="46.5454545" />
            </g>
          </svg>
        );
      case 'Anthropic':
      case 'Claude':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 92.2 65">
            <path d="M66.5,0H52.4l25.7,65h14.1L66.5,0z M25.7,0L0,65h14.4l5.3-13.6h26.9L51.8,65h14.4L40.5,0C40.5,0,25.7,0,25.7,0z M24.3,39.3l8.8-22.8l8.8,22.8H24.3z" fill="currentColor" />
          </svg>
        );
      case 'Meta':
      case 'Llama':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="994 994 1515 1010">
            <path d="M2079.9949,1000c-123.3911,0-219.8478,92.936-307.164,210.9931C1652.8424,1058.2153,1552.4949,1000,1432.4089,1000c-244.8276,0-432.4138,318.6207-432.4138,655.8621,0,211.0344,102.0956,344.1379,273.1035,344.1379,123.0805,0,211.6-58.0259,368.9655-333.1034,0,0,65.5973-115.8413,110.7249-195.6386q23.72,38.2978,49.9647,82.5351l73.7931,124.1379C2020.294,1918.4789,2100.3854,2000,2245.5123,2000c166.5959,0,259.31-134.9233,259.31-350.3448C2504.8227,1296.5517,2313.0069,1000,2079.9949,1000Zm-557.9308,592.4138c-127.5862,200-171.7242,244.8276-242.7587,244.8276-73.1034,0-116.5517-64.1784-116.5517-178.6207,0-244.8276,122.069-495.1724,267.5862-495.1724,78.8013,0,144.6539,45.51,245.5224,189.9131C1580.0831,1500.2723,1522.0641,1592.4138,1522.0641,1592.4138Zm481.5283-25.178-88.23-147.1481q-35.8152-58.2482-68.8384-107.23c79.52-122.7353,145.1135-183.8919,223.1261-183.8919,162.0691,0,291.7243,238.6207,291.7243,531.7241,0,111.7242-36.5935,176.5518-112.4139,176.5518C2176.29,1837.2414,2141.5738,1789.2474,2003.5924,1567.2358Z" fill="currentColor" />
          </svg>
        );
      case 'Cohere':
        return (
          <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 75 75">
            <style type="text/css">
              {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:currentColor;opacity:0.7;}
                .st1{fill-rule:evenodd;clip-rule:evenodd;fill:currentColor;opacity:0.6;}
                .st2{fill:currentColor;opacity:0.5;}`}
            </style>
            <g>
              <path className="st0" d="M24.3,44.7c2,0,6-0.1,11.6-2.4c6.5-2.7,19.3-7.5,28.6-12.5c6.5-3.5,9.3-8.1,9.3-14.3C73.8,7,66.9,0,58.3,0h-36C10,0,0,10,0,22.3S9.4,44.7,24.3,44.7z" />
              <path className="st1" d="M30.4,60c0-6,3.6-11.5,9.2-13.8l11.3-4.7C62.4,36.8,75,45.2,75,57.6C75,67.2,67.2,75,57.6,75l-12.3,0C37.1,75,30.4,68.3,30.4,60z" />
              <path className="st2" d="M12.9,47.6L12.9,47.6C5.8,47.6,0,53.4,0,60.5v1.7C0,69.2,5.8,75,12.9,75h0c7.1,0,12.9-5.8,12.9-12.9v-1.7C25.7,53.4,20,47.6,12.9,47.6z" />
            </g>
          </svg>
        );
      case 'Aleph Alpha':
        return (
          <Image
            src="/icons/Aleph Alpha.svg"
            alt="Aleph Alpha Logo"
            width={32}
            height={32}
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          />
        );
      case 'You.com':
        return (
          <svg viewBox="0 0 28 29" width="28" height="29" fill="none" className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1088 1.47023C14.7617 0.768041 13.157 0.76804 11.8099 1.47023L2.50369 6.32129C0.965066 7.12333 0 8.71541 0 10.4517V19.3543C0 21.0905 0.965067 22.6826 2.50369 23.4847L11.8099 28.3357C12.2276 28.5534 12.67 28.7036 13.1218 28.7864V22.441C13.1218 18.7405 10.1219 15.7405 6.42132 15.7405H3.35025V14.0654H6.42132C10.1219 14.0654 13.1218 11.0655 13.1218 7.3649V4.29383H14.797V7.3649C14.797 11.0655 17.7969 14.0654 21.4975 14.0654H27.9188V10.4517C27.9188 8.71541 26.9537 7.12333 25.4151 6.32129L16.1088 1.47023ZM27.9188 15.7405H21.4975C17.7969 15.7405 14.797 18.7405 14.797 22.441V28.7864C15.2488 28.7036 15.6912 28.5534 16.1088 28.3357L25.4151 23.4847C26.9537 22.6826 27.9188 21.0905 27.9188 19.3543V15.7405Z" className="fill-primary dark:fill-primary" />
          </svg>
        );
      case 'Perplexity AI':
        return (
          <Image
            src="/icons/perplexity-ai-icon.svg"
            alt="Perplexity AI Logo"
            width={32}
            height={32}
            className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
          />
        );
      case 'DGPT':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'Midjourney':
        return (
          <Image
            src="/icons/MidJourney.svg"
            alt="Midjourney Logo"
            width={32}
            height={32}
            className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
          />
        );
      case 'Stability AI':
        return (
          <Image
            src="/icons/Stability_ai.svg"
            alt="Stability AI Logo"
            width={20}
            height={20}
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          />
        );
      case 'Google DeepMind':
        return (
          <Image
            src="/icons/Google_DeepMind.svg"
            alt="Google DeepMind Logo"
            width={20}
            height={20}
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          />
        );
      case 'DeepSeek':
        return (
          <Image
            src="/icons/deepseek-color.svg"
            alt="DeepSeek Logo"
            width={20}
            height={20}
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 [&>path]:fill-primary dark:[&>path]:fill-primary"
          />
        );
      case 'Cursor AI':
        return (
          <Image
            src="/icons/Cursor_ai_icon.svg"
            alt="Cursor AI Logo"
            width={20}
            height={20}
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          />
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        translateZ: 10,
      }}
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 transform-gpu hover:shadow-[0_20px_50px_-30px_rgba(0,165,168,0.4)] dark:hover:shadow-[0_20px_50px_-30px_rgba(0,165,168,0.6)] hover:backdrop-brightness-105 dark:hover:backdrop-brightness-150 group"
    >
      <div className="p-6 relative overflow-hidden">
        {/* Glowing Orb Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-150"></div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-primary transition-colors duration-300">
              {hersteller}
            </h3>
            <div className="flex flex-wrap gap-2">
              {modelle.map((modell, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-primary bg-primary/5 dark:bg-primary/10 rounded-full ring-1 ring-primary/20 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 group-hover:ring-primary/30 transition-all duration-300"
                >
                  {modell}
                </span>
              ))}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            {getHerstellerIcon(hersteller)}
          </div>
        </div>

        {/* Einsatzgebiete */}
        <div className="mb-4 relative">
          <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 group-hover:text-primary/80 transition-colors duration-300">
            Einsatzgebiete
          </h4>
          <div className="flex flex-wrap gap-2">
            {einsatzgebiete.map((gebiet, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300"
              >
                {gebiet}
              </span>
            ))}
          </div>
        </div>

        {/* Besonderheiten */}
        <div className="relative">
          <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 group-hover:text-primary/80 transition-colors duration-300">
            Besonderheiten
          </h4>
          <ul className="space-y-1">
            {besonderheiten.map((besonderheit, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 group-hover:translate-x-1 transition-transform duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2 group-hover:scale-125 transition-transform duration-300" />
                {besonderheit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// Füge die KI-Modelle Daten hinzu
const kiModelle = [
  {
    "Hersteller": "OpenAI",
    "Modelle": ["GPT-4 Turbo", "GPT-4", "GPT-3.5"],
    "Einsatzgebiete": ["Textgenerierung", "Code-Generierung", "Chatbots"],
    "Besonderheiten": ["Plugins & Web-Suche", "Multi-Turn-Gedächtnis"]
  },
  {
    "Hersteller": "Anthropic",
    "Modelle": ["Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku"],
    "Einsatzgebiete": ["Logisches Denken", "Technische Texte"],
    "Besonderheiten": ["Optimiert für lange Dokumente", "Hohe KI-Sicherheit"]
  },
  {
    "Hersteller": "Google DeepMind",
    "Modelle": ["Gemini 1.5 Pro", "Gemini 1.5 Flash", "Gemini 1.0 Ultra", "AlphaCode"],
    "Einsatzgebiete": ["Multimodale Verarbeitung", "Code-Generierung", "Algorithmische Herausforderungen"],
    "Besonderheiten": ["Unterstützt Text, Bilder, Audio, Video", "Optimiert für komplexe Programmieraufgaben"]
  },
  {
    "Hersteller": "Mistral AI",
    "Modelle": ["Mistral 7B", "Mixtral 8x7B"],
    "Einsatzgebiete": ["Open-Source KI", "Code-Generierung"],
    "Besonderheiten": ["Kostengünstige Alternative zu GPT"]
  },
  {
    "Hersteller": "Meta",
    "Modelle": ["LLaMA 2 (7B, 13B, 70B)", "LLaMA 3"],
    "Einsatzgebiete": ["Forschung", "Open-Source KI"],
    "Besonderheiten": ["Läuft auch auf kleineren Servern"]
  },
  {
    "Hersteller": "Cohere",
    "Modelle": ["Command R+"],
    "Einsatzgebiete": ["Suchmaschinen", "Wissensmanagement"],
    "Besonderheiten": ["Optimiert für Unternehmenslösungen"]
  },
  {
    "Hersteller": "Hugging Face",
    "Modelle": ["BLOOM", "Falcon-40B"],
    "Einsatzgebiete": ["Open-Source KI"],
    "Besonderheiten": ["Freie Nutzung und Anpassung"]
  },
  {
    "Hersteller": "Aleph Alpha",
    "Modelle": ["Luminous"],
    "Einsatzgebiete": ["Europäischer Markt", "Datenschutz"],
    "Besonderheiten": ["Optimiert für europäische Datenschutzstandards"]
  },
  {
    "Hersteller": "You.com",
    "Modelle": ["YouChat"],
    "Einsatzgebiete": ["Suchmaschine mit KI"],
    "Besonderheiten": ["Kombination aus Chatbot & Websuche"]
  },
  {
    "Hersteller": "Perplexity AI",
    "Modelle": ["Perplexity AI"],
    "Einsatzgebiete": ["KI-gestützte Suche"],
    "Besonderheiten": ["Antworten mit Quellenangaben"]
  },
  {
    "Hersteller": "Cursor AI",
    "Modelle": ["Cursor AI"],
    "Einsatzgebiete": ["KI-gestützte Entwicklungsumgebung", "Code-Vervollständigung"],
    "Besonderheiten": ["Optimiert für Softwareentwicklung", "Integration mit gängigen IDEs"]
  },
  {
    "Hersteller": "Midjourney",
    "Modelle": ["Midjourney"],
    "Einsatzgebiete": ["Bildgenerierung"],
    "Besonderheiten": ["Erzeugt kreative Bilder"]
  },
  {
    "Hersteller": "Stability AI",
    "Modelle": ["Stable Diffusion"],
    "Einsatzgebiete": ["Open-Source Bildgenerierung"],
    "Besonderheiten": ["Beliebt für Kunst & Design"]
  },
  {
    "Hersteller": "Synthesia",
    "Modelle": ["Synthesia AI"],
    "Einsatzgebiete": ["KI-gestützte Videogenerierung", "Virtuelle Avatare"],
    "Besonderheiten": ["Erzeugt realistische Videos aus Text", "Beliebt für Unternehmenspräsentationen"]
  },
  {
    "Hersteller": "EleutherAI",
    "Modelle": ["GPT-NeoX-20B", "Pythia"],
    "Einsatzgebiete": ["Open-Source KI"],
    "Besonderheiten": ["Frei verfügbare Modelle für Forschung"]
  },
  {
    "Hersteller": "NVIDIA",
    "Modelle": ["Megatron-Turing NLG 530B"],
    "Einsatzgebiete": ["Hochleistungs-Sprach-KI"],
    "Besonderheiten": ["Eines der größten Modelle weltweit"]
  },
  {
    "Hersteller": "Alibaba",
    "Modelle": ["Tongyi Qianwen"],
    "Einsatzgebiete": ["Asiatische Sprachen", "Unternehmenslösungen"],
    "Besonderheiten": ["Integration in Alibaba Cloud"]
  },
  {
    "Hersteller": "Huawei",
    "Modelle": ["PanGu-Σ"],
    "Einsatzgebiete": ["Chinesische Sprach-KI"],
    "Besonderheiten": ["Starke Übersetzungsfähigkeiten"]
  },
  {
    "Hersteller": "Salesforce",
    "Modelle": ["CodeGen"],
    "Einsatzgebiete": ["Code-Generierung"],
    "Besonderheiten": ["Spezialisiert auf Softwareentwicklung"]
  },
  {
    "Hersteller": "DeepSeek",
    "Modelle": ["DeepSeek LLM"],
    "Einsatzgebiete": ["Sprachverarbeitung", "KI-Übersetzungen"],
    "Besonderheiten": ["Starke Leistung für asiatische Sprachen"]
  }
];

export default function KIModelle() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Initial check and event listener for dark mode
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const [textLoading, setTextLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [textResult, setTextResult] = useState('');
  const [imageResult, setImageResult] = useState('');

  const handleTextSubmit = async (input: string) => {
    setTextLoading(true);
    try {
      const response = await fetch('/api/generate/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setTextResult(data.result);
    } catch (error) {
      console.error('Fehler bei der Textgenerierung:', error);
    }
    setTextLoading(false);
  };

  const handleImageSubmit = async (input: string) => {
    setImageLoading(true);
    try {
      const response = await fetch('/api/generate/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setImageResult(data.result);
    } catch (error) {
      console.error('Fehler bei der Bildgenerierung:', error);
    }
    setImageLoading(false);
  };

  const models = [
    {
      title: "Mixtral-8x7B",
      description: "Ein hochmodernes Sprachmodell mit beeindruckender Leistung in verschiedenen Aufgabenbereichen.",
      features: [
        "Fortgeschrittenes Reasoning",
        "Mehrsprachige Unterstützung",
        "Code-Generierung und -Analyse",
        "Kontextverständnis"
      ],
      icon: "/icons/mixtral.svg"
    },
    {
      title: "Flan-T5",
      description: "Spezialisiert auf präzise Textgenerierung und -transformation mit hoher Qualität.",
      features: [
        "Effiziente Textverarbeitung",
        "Optimierte Antwortgenerierung",
        "Multilinguale Fähigkeiten",
        "Schnelle Verarbeitung"
      ],
      icon: "/icons/flan.svg"
    },
    {
      title: "Claude 3 Opus",
      description: "Anthropics fortschrittlichstes KI-Modell mit außergewöhnlicher Leistung und Vielseitigkeit.",
      features: [
        "Komplexe Problemlösung",
        "Kreative Textgenerierung",
        "Detaillierte Analysen",
        "Ethische Prinzipien"
      ],
      icon: "/icons/claude.svg"
    },
    {
      title: "GPT-4 Turbo",
      description: "Das leistungsstärkste Modell von OpenAI mit erweitertem Kontext und verbesserter Genauigkeit.",
      features: [
        "Erweiterte Kontextverarbeitung",
        "Präzise Antworten",
        "Vielseitige Anwendungen",
        "Aktuelle Informationen"
      ],
      icon: "/icons/gpt.svg"
    }
  ];

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 sm:top-6 safe-padding">
        <motion.div
          className="w-[90%] max-w-[1600px] mx-auto"
          animate={{
            backgroundColor: isScrolled
              ? isDark
                ? 'rgba(10, 10, 10, 0.6)'
                : 'rgba(255, 255, 255, 0.6)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderRadius: isScrolled ? '24px' : '0px',
            boxShadow: isScrolled
              ? isDark
                ? '0 0 30px 0 rgba(0, 165, 168, 0.2)'
                : '0 0 30px 0 rgba(0, 165, 168, 0.1)'
              : 'none',
            padding: isScrolled ? '8px 24px' : '0px',
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center h-16 w-full mx-auto">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 flex items-center justify-center transition-transform duration-700 ease-[0.4,0,0.2,1] group-hover:rotate-[360deg]">
                <Image
                  src="/tiryaki_it_fav_logo.png"
                  alt="Tirlogy Logo"
                  width={48}
                  height={48}
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl tracking-wide technical-forest text-foreground dark:text-foreground-dark">
                Tirlogy
              </span>
            </Link>
            <div className="flex-1" />
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/#about"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 font-['Nimbus_Mono']"
              >
                ÜBER MICH
              </Link>
              <Link
                href="/#services"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 font-['Nimbus_Mono']"
              >
                DIENSTLEISTUNGEN
              </Link>
              <Link
                href="/ki-modelle"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full bg-primary/10 text-primary font-['Nimbus_Mono']"
              >
                KI-MODELLE
              </Link>
              <Link
                href="/#contact"
                className="nav-link text-sm font-mono transition-all px-4 py-2 rounded-full hover:bg-foreground/10 dark:hover:bg-foreground-dark/10 font-['Nimbus_Mono']"
              >
                KONTAKT
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 safe-padding">
        <div className="w-[90%] max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground dark:text-foreground-dark font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
              KI-Modelle im Überblick
            </h1>
            <p className="text-lg text-foreground/70 dark:text-foreground-dark/70 max-w-3xl font-['Nimbus_Mono']">
              Entdecken Sie die führenden KI-Modelle und ihre spezifischen Einsatzgebiete. Von Sprachmodellen bis hin zu multimodalen Systemen - hier finden Sie einen umfassenden Überblick.
            </p>
          </motion.div>

          {/* KI-Modelle Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kiModelle.map((modell, index) => (
                <AIModelCard
                  key={index}
                  hersteller={modell.Hersteller}
                  modelle={modell.Modelle}
                  einsatzgebiete={modell.Einsatzgebiete}
                  besonderheiten={modell.Besonderheiten}
                />
              ))}
            </div>
          </motion.div>

          {/* KI-Modelle Testen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground dark:text-foreground-dark font-['Neue_Haas_Grotesk_Display_Pro_65_Medium']">
              KI-Modelle Testen
            </h2>
            <p className="text-lg text-foreground/70 dark:text-foreground-dark/70 max-w-3xl font-['Nimbus_Mono'] mb-8">
              Experimentieren Sie mit unseren KI-Modellen. Geben Sie einen Text ein und lassen Sie die KI Text oder Bilder generieren.
            </p>
          </motion.div>

          <div className="flex flex-col space-y-6">
            <ModelSection
              title="Text zu Text"
              description="Generieren Sie kreative Texte, Übersetzungen oder Zusammenfassungen mit unserem Sprachmodell."
              inputPlaceholder="Geben Sie einen Text ein, z.B. 'Schreibe eine kurze Geschichte über einen Roboter, der Kunst erschafft.'"
              onSubmit={handleTextSubmit}
              isLoading={textLoading}
              result={textResult}
              type="text"
            />

            <ModelSection
              title="Text zu Bild"
              description="Lassen Sie Ihre Textbeschreibungen in einzigartige Bilder umwandeln."
              inputPlaceholder="Beschreiben Sie das gewünschte Bild, z.B. 'Ein futuristischer Roboter malt ein Ölgemälde in einem modernen Atelier.'"
              onSubmit={handleImageSubmit}
              isLoading={imageLoading}
              result={imageResult}
              type="image"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border dark:border-border-dark">
        <div className="w-[90%] max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-foreground/60 dark:text-foreground-dark/60 text-sm">
              © {new Date().getFullYear()} Tirlogy. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <ThemeSwitcher />
              <Link
                href="/datenschutz"
                className="text-sm text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                Datenschutzerklärung
              </Link>
              <Link
                href="/impressum"
                className="text-sm text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 