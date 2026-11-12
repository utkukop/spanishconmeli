import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Instagram, Mail, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  const navLinks = [
    { id: 'home', label: 'Home', view: 'home' as const },
    { id: 'quiz', label: 'Level Quiz', view: 'quiz' as const },
    { id: 'courses', label: 'Courses & Pricing', view: 'courses' as const },
    { id: 'about', label: 'About Meli', view: 'about' as const },
    { id: 'contact', label: 'Contact', view: 'contact' as const },
  ];

  return (
    <footer className="bg-[#1E1B18] text-[#D5CFC4] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#332E29]">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {siteConfig.siteName}
              <span className="text-[#C73E29]">.</span>
            </span>
            <p className="mt-3 text-xs sm:text-sm text-[#A8A196] leading-relaxed max-w-sm">
              {siteConfig.footerDescription ||
                `${siteConfig.brandTagline}. An authentic Spanish school designed to get you speaking with natural rhythm, real colloquial phrases, and zero hesitation.`}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {siteConfig.instagramHandle && (
                <a
                  href={`https://instagram.com/${siteConfig.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#2B2723] hover:bg-[#C73E29] text-white flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <a
                href="mailto:spanishconmeli@gmail.com"
                className="w-10 h-10 rounded-xl bg-[#2B2723] hover:bg-[#C73E29] text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A196]">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.view);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Card */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Direct Contact
            </h4>
            <div className="p-4 rounded-2xl bg-[#2B2723] border border-[#3D3732] space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-[#D5CFC4]">
                <Mail className="w-4 h-4 text-[#C73E29] shrink-0" />
                <a
                  href="mailto:spanishconmeli@gmail.com"
                  className="hover:text-white transition-colors underline"
                >
                  spanishconmeli@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#D5CFC4]">
                <Instagram className="w-4 h-4 text-[#E1306C] shrink-0" />
                <a
                  href="https://instagram.com/spanishconmeli"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @spanishconmeli
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#A8A196]">
                <MapPin className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                <span>Toronto, Canada (Eastern Time / ET)</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#C73E29] hover:bg-[#AB3220] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Contact Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} {siteConfig.siteName}.{' '}
            {siteConfig.footerCopyright || 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{siteConfig.footerAddress || 'Toronto, Canada'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
