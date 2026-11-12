import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { BrandLogo } from './BrandLogo';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

const ANNOUNCEMENT_MESSAGES = [
  {
    id: 1,
    badge: 'Level Quiz',
    text: '🎯 Stop translating in your head: Learn real conversational Spanish with Meli!',
    cta: 'Take 3-min quiz →',
    view: 'quiz' as const,
    path: '/quiz',
  },
  {
    id: 2,
    badge: 'Limited Spots',
    text: '✨ New A0–A1 Small Group Cohort enrolling now! Save $35 with Early Bird ($115 USD)',
    cta: 'Explore courses →',
    view: 'courses' as const,
    path: '/courses',
  },
  {
    id: 3,
    badge: 'Free Trial',
    text: '☕ Speak naturally with confidence, not robotic textbook drills · Free 30-min trial!',
    cta: 'Book trial →',
    view: 'contact' as const,
    path: '/contact',
  },
];

export const Navbar: React.FC = () => {
  const { siteConfig, activeView, setActiveView } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);

  // 5-second interval rotating announcement messages
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', view: 'home' as const, path: '/' },
    { id: 'quiz', label: 'Level Quiz', view: 'quiz' as const, path: '/quiz' },
    { id: 'courses', label: 'Courses & Pricing', view: 'courses' as const, path: '/courses' },
    { id: 'about', label: 'About Meli', view: 'about' as const, path: '/about' },
    { id: 'contact', label: 'Contact', view: 'contact' as const, path: '/contact' },
  ];

  const handleNavClick = (viewId: typeof activeView) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const currentAnnouncement = ANNOUNCEMENT_MESSAGES[activeMessageIndex];

  return (
    <>
      {/* 5-second Rotating Global Announcement Banner */}
      <div className="bg-[#1E1B18] text-[#F3EFE6] text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-[#332E29] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <a
            href={currentAnnouncement.path}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(currentAnnouncement.view);
            }}
            className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 text-center group cursor-pointer transition-opacity duration-300"
            key={currentAnnouncement.id}
          >
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#C73E29] text-white text-[10px] font-bold uppercase tracking-wider">
              {currentAnnouncement.badge}
            </span>
            <span className="font-medium text-[#FAF9F5] group-hover:text-[#FBB040] transition-colors">
              {currentAnnouncement.text}
            </span>
            <span className="text-[#FBB040] font-bold underline ml-1 whitespace-nowrap group-hover:text-white transition-colors">
              {currentAnnouncement.cta}
            </span>
          </a>
        </div>
      </div>

      {/* Main Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE5D9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Custom Brand Logo with SVG Emblem & Typographic Wordmark */}
          <div className="flex items-center shrink-0">
            <BrandLogo />
          </div>

          {/* Zone 2: Navigation Links (Clean, semantic, direct URLs) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57514A]">
            {navLinks.map((item) => {
              const isActive = activeView === item.view;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.view);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#C73E29] font-semibold'
                      : 'hover:text-[#1E1B18]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C73E29] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/quiz"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('quiz');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{siteConfig.headerCtaText || 'Take Level Quiz'}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#57514A] hover:text-[#1E1B18] hover:bg-[#F0ECE2] rounded-lg transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú móvil' : 'Abrir menú móvil'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Responsive) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#1E1B18]/50 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#FAF9F5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE5D9]">
                <BrandLogo
                  iconSize={36}
                  wordmarkSize="22px"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#57514A] hover:text-[#1E1B18] rounded-lg cursor-pointer"
                  aria-label="Cerrar menú"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((item) => {
                  const isActive = activeView === item.view;
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.view);
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#C73E29]/10 text-[#C73E29] font-bold'
                          : 'text-[#57514A] hover:bg-[#F0ECE2] hover:text-[#1E1B18]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#EAE5D9]">
              <a
                href="/quiz"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('quiz');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Free Level Quiz</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
