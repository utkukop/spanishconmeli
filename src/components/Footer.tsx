import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { validateEmail } from '../utils/quizScorer';
import { Instagram, Youtube, Music, Check, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, addLead, setActiveView, enterBackoffice } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(newsletterEmail)) {
      setNewsletterError('Por favor introduce un correo válido');
      return;
    }
    setNewsletterError('');
    addLead({
      name: 'Suscriptor Newsletter',
      email: newsletterEmail.trim(),
      source: 'newsletter',
    });
    setNewsletterSubmitted(true);
  };

  const navLinks = siteConfig.navLinks || [
    { id: 'home', label: 'Inicio', view: 'home' },
    { id: 'quiz', label: 'Test de Nivel', view: 'quiz' },
    { id: 'courses', label: 'Cursos', view: 'courses' },
    { id: 'resources', label: 'Podcast & Recursos', view: 'resources' },
    { id: 'about', label: 'Sobre Meli', view: 'about' },
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
                `${siteConfig.brandTagline}. La escuela online que te enseña a hablar con la naturalidad, el ritmo y el humor de las calles de España.`}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {siteConfig.instagramHandle && (
                <a
                  href={`https://instagram.com/${siteConfig.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#2B2723] hover:bg-[#C73E29] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.youtubeHandle && (
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#2B2723] hover:bg-[#C73E29] text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {siteConfig.spotifyHandle && (
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#2B2723] hover:bg-[#C73E29] text-white flex items-center justify-center transition-colors"
                  aria-label="Spotify Podcast"
                >
                  <Music className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explorar
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
              {siteConfig.footerNewsletterTitle || 'Carta Semanal de Español Real'}
            </h4>
            <p className="text-xs text-[#A8A196] mb-4">
              {siteConfig.footerNewsletterDesc ||
                'Recibe 1 expresión coloquial cada martes y un 15% de descuento en tu primer curso.'}
            </p>

            {!newsletterSubmitted ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
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
                    aria-label="Suscribirse a la newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-[11px] text-red-400 font-medium">{newsletterError}</p>
                )}
                <div className="flex items-center gap-1.5 text-[10px] text-[#78716C] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sin spam. Cancela cuando quieras con 1 clic.</span>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-[#2A9D8F]/20 border border-[#2A9D8F]/40 rounded-xl text-xs text-[#80E5D9] flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  ¡Suscrito! Usa el cupón{' '}
                  <strong className="text-white">
                    {siteConfig.newsletterDiscountCode || 'MELI15'}
                  </strong>{' '}
                  en cualquier curso.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Team Access */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} {siteConfig.siteName}.{' '}
            {siteConfig.footerCopyright || 'Todos los derechos reservados.'}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{siteConfig.footerAddress || 'Madrid, España'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
