import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Menu, X, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteConfig, activeView, setActiveView } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const calLink = siteConfig.calLink || 'https://cal.com/spanishconmeli';

  const navLinks = [
    { id: 'home', label: 'Home', view: 'home' as const, path: '/' },
    { id: 'courses', label: 'Courses', view: 'courses' as const, path: '/courses' },
    { id: 'about', label: 'About me', view: 'about' as const, path: '/about' },
    { id: 'contact', label: 'Contact', view: 'contact' as const, path: '/contact' },
  ];

  const handleNavClick = (viewId: typeof activeView) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF6EC]/95 backdrop-blur-md border-b border-[#E9DCCB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-6">
          {/* Left: Brand Wordmark "spanishconmeli" in Terracotta Playfair Display */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="font-serif text-xl sm:text-2xl font-bold text-[#C8553D] tracking-tight whitespace-nowrap shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            aria-label="spanishconmeli home"
          >
            spanishconmeli
          </a>

          {/* Right/Center: 4 Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#C8553D] font-semibold'
                      : 'text-[#22334A] hover:text-[#C8553D]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger (>= 44px touch hitbox) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#22334A] hover:bg-[#E9DCCB]/60 rounded-full transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#22334A]/45 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#FFF6EC] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#E9DCCB]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E9DCCB]">
                <span className="font-serif text-xl font-bold text-[#C8553D]">
                  spanishconmeli
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#22334A] hover:bg-[#E9DCCB]/60 rounded-full cursor-pointer"
                  aria-label="Close menu"
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
                      className={`min-h-[48px] flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#F5E7DA] text-[#C8553D] font-semibold'
                          : 'text-[#22334A] hover:bg-[#E9DCCB]/40'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E9DCCB]">
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-sm cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book your trial lesson · $5</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
