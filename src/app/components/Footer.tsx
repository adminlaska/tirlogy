import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Footer() {
  return (
    <footer className="w-full bg-background dark:bg-background-dark py-8 font-mono">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-4 w-[200px]">
          <div className="relative w-fit group">
            <Link
              href="mailto:hi@tirlogy.com"
              className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors font-sans"
            >
              hi@tirlogy.com ↗
            </Link>
            <div className="absolute bottom-0 left-0 w-full h-[1px]">
              <div className="absolute inset-0 bg-foreground/60 dark:bg-foreground-dark/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          </div>
          <div className="text-xs text-foreground/40 dark:text-foreground-dark/40">
            Made by
            <div className="relative w-fit group inline-block ml-1">
              <Link href="/vision" className="text-foreground/60 dark:text-foreground-dark/60 group-hover:text-foreground dark:group-hover:text-foreground-dark transition-colors">
                Tirlogy
              </Link>
              <div className="absolute bottom-0 left-0 w-full h-[1px]">
                <div className="absolute inset-0 bg-foreground/60 dark:bg-foreground-dark/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 flex-1 justify-center max-w-[600px] mx-auto">
          <div className="flex flex-col gap-3">
            <Link href="/datenschutz" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              Impressum
            </Link>
            <Link href="/sicherheit" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              Sicherheit
            </Link>
            <Link href="/agb" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              AGB
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/vision" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              Über mich
            </Link>
            <Link href="/support" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors group inline-flex items-center">
              Support<span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 font-sans">↗</span>
            </Link>
            <Link href="/blog" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              Blog
            </Link>
            <Link href="/changelog" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors">
              Changelog
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <a href="https://github.com/tirlogy" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors group inline-flex items-center">
              GitHub<span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 font-sans">↗</span>
            </a>
            <a href="https://www.xing.com/profile/tirlogy" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors group inline-flex items-center">
              Xing<span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 font-sans">↗</span>
            </a>
            <a href="https://www.linkedin.com/company/tirlogy" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors group inline-flex items-center">
              LinkedIn<span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 font-sans">↗</span>
            </a>
            <a href="https://www.instagram.com/tirlogy" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors group inline-flex items-center">
              Instagram<span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 font-sans">↗</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[200px] items-end">
          <select
            className="bg-background dark:bg-background-dark text-xs text-foreground/60 dark:text-foreground-dark/60 border border-border dark:border-border-dark rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary"
            defaultValue="de"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
} 