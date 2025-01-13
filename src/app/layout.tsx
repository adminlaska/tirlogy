import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiryaki IT - Webdesign & Development",
  description: "Moderne Weblösungen für Ihr Unternehmen - Webdesign, Webanwendungen und App-Entwicklung",
  icons: [
    { rel: "icon", url: "/tiryaki_it_fav_logo.png" },
    { rel: "apple-touch-icon", url: "/tiryaki_it_fav_logo.png" },
    { rel: "shortcut icon", url: "/tiryaki_it_fav_logo.png" }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="icon" href="/tiryaki_it_fav_logo.png" />
        <link rel="shortcut icon" href="/tiryaki_it_fav_logo.png" />
        <link rel="apple-touch-icon" href="/tiryaki_it_fav_logo.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
