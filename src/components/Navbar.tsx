import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Menu, X, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteConfig, activeView, setActiveView } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = siteConfig.navLinks || [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'quiz', label: 'Level Quiz', view: 'quiz' },
    { id: 'courses', label: 'Courses', view: 'courses' },
    { id: 'about', label: 'About Meli', view: 'about' },
    { id: 'contact', label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (viewId: typeof activeView) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Optional Dynamic Announcement Bar */}
      {siteConfig.announcementActive && siteConfig.announcementText && (
        <div className="bg-[#1E1B18] text-[#F3EFE6] text-[11px] sm:text-xs py-2 px-4 border-b border-[#332E29]">
          <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-medium">
            <span>{siteConfig.announcementText}</span>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE5D9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (100% dynamic from CMS) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer"
              aria-label={`Ir a inicio de ${siteConfig.siteName}`}
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1E1B18] group-hover:text-[#C73E29] transition-colors whitespace-nowrap">
                {siteConfig.siteName || 'spanishconmeli'}
                <span className="text-[#C73E29]">.</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean, unboxed, single-line) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57514A]">
            {navLinks.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.view)}
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
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA (Zero clutter, NO admin buttons on public view) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('quiz')}
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{siteConfig.headerCtaText || 'Take Level Quiz'}</span>
            </button>

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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#1E1B18]/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#FAF9F5] shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE5D9]">
                <span className="text-xl font-bold text-[#1E1B18]">
                  {siteConfig.siteName}
                  <span className="text-[#C73E29]">.</span>
                </span>
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
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.view)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#C73E29]/10 text-[#C73E29] font-bold'
                          : 'text-[#57514A] hover:bg-[#F0ECE2] hover:text-[#1E1B18]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#EAE5D9]">
              <button
                onClick={() => handleNavClick('quiz')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{siteConfig.headerCtaText || 'Take Free Level Quiz'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
