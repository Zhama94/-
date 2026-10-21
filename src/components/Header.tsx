import React, { useState } from 'react';
import { Language } from '../types';
import { Menu, X, Globe, PhoneCall } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  companyName: string;
  navLabels: {
    services: string;
    about: string;
    process: string;
    regions: string;
    faq: string;
    contact: string;
    requestBtn: string;
  };
  onRequestClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  companyName,
  navLabels,
  onRequestClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'Русский', flag: 'RU' },
    { code: 'kg', label: 'Кыргызча', flag: 'KG' },
    { code: 'en', label: 'English', flag: 'EN' },
  ];

  const currentLangLabel = languages.find((l) => l.code === currentLang)?.flag || 'RU';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Contract: Brand Wordmark | 4-5 single line links | 1 primary CTA + language switch */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap flex items-center gap-2 group"
            >
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-sm shadow-md group-hover:bg-amber-400 transition-colors">
                ОК
              </span>
              <span className="tracking-tight hover:text-amber-300 transition-colors">
                {companyName}
              </span>
            </a>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#services"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {navLabels.services}
            </a>
            <a
              href="#process"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {navLabels.process}
            </a>
            <a
              href="#about"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {navLabels.about}
            </a>
            <a
              href="#regions"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {navLabels.regions}
            </a>
            <a
              href="#faq"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {navLabels.faq}
            </a>
            <a
              href="#contact"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {navLabels.contact}
            </a>
          </nav>

          {/* Zone 3: Language switch + 1 primary action button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language dropdown button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Сменить язык"
                aria-expanded={langMenuOpen}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLangLabel}</span>
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 rounded-lg bg-slate-800 border border-slate-700 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentLang === lang.code
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="font-mono text-[10px] opacity-75">{lang.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onRequestClick}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              {navLabels.requestBtn}
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              {navLabels.services}
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              {navLabels.process}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              {navLabels.about}
            </a>
            <a
              href="#regions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              {navLabels.regions}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              {navLabels.faq}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              {navLabels.contact}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    currentLang === lang.code
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestClick();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg"
            >
              {navLabels.requestBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
