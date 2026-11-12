import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { validateEmail } from '../utils/quizScorer';
import { Instagram, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, addLead, setActiveView } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    addLead({
      name: 'Newsletter Subscriber',
      email: newsletterEmail.trim(),
      source: 'newsletter',
    });
    setNewsletterSubmitted(true);
  };

  const navLinks = [
    { id: 'home', label: 'Home', view: 'home' as const },
    { id: 'quiz', label: 'Level Quiz', view: 'quiz' as const },
    { id: 'courses', label: 'Courses & Pricing', view: 'courses' as const },
    { id: 'about', label: 'About Meli', view: 'about' as const },
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

          {/* Newsletter Lead Form */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              {siteConfig.footerNewsletterTitle || 'Weekly Real Spanish Letter'}
            </h4>
            <p className="text-xs text-[#A8A196] mb-4">
              {siteConfig.footerNewsletterDesc ||
                'Receive 1 colloquial expression every Tuesday plus 15% off your first course enrollment.'}
            </p>

            {!newsletterSubmitted ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#2B2723] border border-[#3D3732] text-white focus:outline-none focus:border-[#C73E29]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#C73E29] hover:bg-[#AB3220] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-[11px] text-red-400 font-medium">{newsletterError}</p>
                )}
                <div className="flex items-center gap-1.5 text-[10px] text-[#78716C] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>No spam ever. Unsubscribe with 1 click anytime.</span>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-[#2A9D8F]/20 border border-[#2A9D8F]/40 rounded-xl text-xs text-[#80E5D9] flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  Subscribed! Use code{' '}
                  <strong className="text-white">
                    {siteConfig.newsletterDiscountCode || 'MELI15'}
                  </strong>{' '}
                  on any course.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} {siteConfig.siteName}.{' '}
            {siteConfig.footerCopyright || 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{siteConfig.footerAddress || 'Madrid, Spain'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

