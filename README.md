# Tiryaki IT Website

Eine moderne, responsive Website für IT-Dienstleistungen, entwickelt mit Next.js und Tailwind CSS.

## Features

- Modernes, dunkles Design
- Responsive Layout für alle Geräte
- Animierte UI-Elemente mit Framer Motion
- Kontaktformular mit E-Mail-Versand
- SEO-optimiert

## Technologien

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Nodemailer
- Heroicons

## Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd tiryaki-it
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Umgebungsvariablen konfigurieren:
- Kopieren Sie die Datei `.env.local.example` zu `.env.local`
- Tragen Sie Ihre SMTP-Konfiguration ein:
  ```
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=your-email@gmail.com
  SMTP_PASS=your-app-specific-password
  CONTACT_EMAIL=your-email@gmail.com
  ```

4. Entwicklungsserver starten:
```bash
npm run dev
```

Die Website ist nun unter `http://localhost:3000` verfügbar.

## E-Mail-Konfiguration

Für die E-Mail-Funktionalität benötigen Sie einen SMTP-Server. Bei Verwendung von Gmail:

1. Aktivieren Sie die 2-Faktor-Authentifizierung
2. Generieren Sie ein App-Passwort
3. Verwenden Sie dieses Passwort in der `.env.local` Datei

## Deployment

Die Website kann auf verschiedenen Plattformen deployed werden:

1. Vercel (empfohlen):
```bash
npm install -g vercel
vercel
```

2. Traditioneller Server:
```bash
npm run build
npm start
```

## Lizenz

MIT
