# Tirlogy - Moderne IT-Dienstleistungen

Eine moderne, responsive Website für IT-Dienstleistungen, entwickelt mit Next.js 14, TypeScript und Tailwind CSS. Inklusive KI-gestütztem Chat-Support.

## 🆕 Neueste Updates (Juni 2025)

- **Komplett überarbeitete Lösungen-Seite & Detailseiten**
  - Einheitliches, modernes Design für alle Lösungen (Webentwicklung, Mobile Apps, ModernWorkplace, KI-Integration)
  - Große, hochwertige Icons und Apple-ähnliche Optik
  - Responsive, großzügige Layouts mit max-w-7xl und modernen Abständen
- **Technologien & Tools Marquee**
  - Auf allen Detailseiten und der Hauptseite: Drei animierte Zeilen mit vielen relevanten Technologien & Tools
  - Unterschiedliche Geschwindigkeiten und Richtungen für hochwertige Animationen
  - Listen sind überall konsistent und thematisch sortiert
- **Hydration-Mismatch Bugfix**
  - Zufällige Werte (z.B. Partikel-Positionen) werden nur noch im Client generiert
  - Keine Hydration-Warnungen mehr bei animierten Hintergründen
- **CTA-Bereich**
  - Animierter Hintergrund mit Partikeln und Linien
  - Einheitliches, breites Layout auf allen Seiten
  - Light/Dark Mode Support für Linien und Farben
- **Icon-Updates**
  - SVG-Icons als React-Komponenten, currentColor für Light/Dark Mode
  - Neue und angepasste Icons für alle Lösungen
- **Text- und Struktur-Optimierungen**
  - Neutrale, moderne Ansprache
  - Individuelle Claims und keine Standardüberschriften
  - Leistungsübersichten, Prozesse und Vorteile für jede Lösung
- **Performance & UX**
  - Noch flüssigere Animationen (Framer Motion, GSAP)
  - Verbesserte Lesbarkeit und Barrierefreiheit
  - Mobile- und Tablet-Optimierung weiter verbessert

## 🚀 Features

- **Modernes Design**
  - Responsive Layout für alle Geräte
  - Dark/Light Mode
  - Animierte UI-Elemente mit Framer Motion
  - Interaktive 3D-Elemente

- **KI-Integration**
  - Intelligenter Chat-Support
  - Deutschsprachige KI-Assistenz
  - Hugging Face Integration
  - Automatische Spracherkennung

- **Technische Features**
  - SEO-optimiert
  - TypeScript
  - Tailwind CSS
  - GSAP Animationen
  - API-Routes

## 🛠 Technologie-Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Hugging Face AI
- React Three Fiber
- Heroicons

## 📦 Installation

1. Repository klonen:
```bash
git clone https://github.com/IhrUsername/tirlogy.git
cd tirlogy
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Umgebungsvariablen konfigurieren:
```bash
# .env.local erstellen
cp .env.example .env.local

# Hugging Face API-Key eintragen
# Kostenlos erhältlich unter: https://huggingface.co/settings/tokens
```

4. Entwicklungsserver starten:
```bash
npm run dev
```

## 🤖 KI-Integration

Die Website nutzt die Hugging Face API für intelligenten Chat-Support:

- Deutschsprachige KI-Assistenz
- Kostenlose API-Nutzung
- Automatische Spracherkennung
- Fallback-Mechanismen

## 🎨 Design-System

- Konsistentes Farbschema
- Responsive Typography
- Custom Animationen
- Interaktive Komponenten
- Dark/Light Mode Support

## 📱 Responsive Design

- Mobile-First Ansatz
- Tablet-optimiert
- Desktop-optimiert
- Adaptive Layouts

## 🔧 Konfiguration

### Tailwind

Anpassungen in `tailwind.config.js`:
- Custom Colors
- Responsive Breakpoints
- Typography Scale
- Animations

### Next.js

Konfiguration in `next.config.js`:
- Image Optimization
- API Routes
- Webpack Optimierungen
- Build Optimierungen

## 📈 Performance

- Optimierte Bilder
- Code Splitting
- Lazy Loading
- SSR/SSG Support
- Caching Strategien

## 🚀 Deployment

1. Build erstellen:
```bash
npm run build
```

2. Produktionsversion starten:
```bash
npm start
```

### Deployment Plattformen

- Vercel (empfohlen)
- Netlify
- AWS
- Docker Support

## 🔒 Sicherheit

- HTTPS enforced
- API-Key Schutz
- Rate Limiting
- XSS Protection
- CORS Konfiguration

## 🤝 Beitragen

1. Fork erstellen
2. Feature Branch erstellen
3. Änderungen committen
4. Push zum Branch
5. Pull Request öffnen

## 📝 Lizenz

MIT

## 🙋‍♂️ Support

Bei Fragen oder Problemen:
- GitHub Issues
- E-Mail Support
- Dokumentation
- Community Discord
