import React from 'react';
import { useCMS } from '../context/CMSContext';
import { BrandLogo } from './BrandLogo';
import { Instagram, Mail, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';

  const navLinks = [
    { id: 'home', label: 'Home', view: 'home' as const, path: '/' },
    { id: 'courses', label: 'Courses', view: 'courses' as const, path: '/courses' },
    { id: 'about', label: 'About me', view: 'about' as const, path: '/about' },
    { id: 'contact', label: 'Contact', view: 'contact' as const, path: '/contact' },
  ];

  const handleNavClick = (view: 'home' | 'courses' | 'about' | 'contact') => {
    setActiveView(view);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="bg-[#22334A] text-[#FFF6EC] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FFF6EC]/15">
          {/* Column 1: Logo & Friendly Intro */}
          <div className="md:col-span-5 flex flex-col items-start">
            <BrandLogo variant="dark" iconSize={38} wordmarkSize="23px" />
            <p className="mt-4 text-sm text-[#FFF6EC]/80 leading-relaxed max-w-sm">
              {siteConfig.footerDescription ||
                'Warm, practical online Spanish classes for real-life conversation. ¡Vamos a hablar español!'}
            </p>
            <div className="mt-6">
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book your trial lesson · $5</span>
              </a>
            </div>
          </div>

          {/* Column 2: 4 Exact Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-base font-bold text-[#F2B134] mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-[#FFF6EC]/85">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.view);
                    }}
                    className="hover:text-[#F2B134] transition-colors cursor-pointer inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media (Instagram, Facebook, TikTok) & Email */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-base font-bold text-[#F2B134] mb-4">
              Connect with Meli
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://instagram.com/spanishconmeli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#FFF6EC]/90 hover:text-[#F2B134] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#FFF6EC]/10 flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4 text-[#F2B134]" />
                </span>
                <span>Instagram · @spanishconmeli</span>
              </a>

              <a
                href="https://facebook.com/spanishconmeli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#FFF6EC]/90 hover:text-[#F2B134] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#FFF6EC]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#F2B134]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7.2v3H10v8h3.5z" />
                  </svg>
                </span>
                <span>Facebook · @spanishconmeli</span>
              </a>

              <a
                href="https://tiktok.com/@spanishconmeli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#FFF6EC]/90 hover:text-[#F2B134] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#FFF6EC]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#F2B134]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </span>
                <span>TikTok · @spanishconmeli</span>
              </a>

              <a
                href="mailto:spanishconmeli@gmail.com"
                className="flex items-center gap-3 text-[#FFF6EC]/90 hover:text-[#F2B134] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#FFF6EC]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C8553D]" />
                </span>
                <span>spanishconmeli@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF6EC]/65">
          <p>© 2026 spanishconmeli. All rights reserved.</p>
          <p>Toronto, Ontario, Canada</p>
        </div>
      </div>
    </footer>
  );
};
