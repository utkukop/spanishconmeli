import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Heart, Instagram, Sparkles, Youtube, Music } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with authentic warm styling */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#EAE5D9] shadow-lg bg-[#FAF9F5] aspect-[4/3] sm:aspect-[4/3]">
              <img
                src={
                  siteConfig.teacherImage ||
                  '/src/assets/images/hero_meli_teacher_1794405197921.jpg'
                }
                alt={`Profesora ${siteConfig.teacherName}`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-[#EAE5D9] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C73E29]">
                  <Heart className="w-4 h-4 fill-current text-[#C73E29]" />
                  <span>Pasión por la enseñanza viva y el contacto humano</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Philosophy */}
          <div className="lg:col-span-7">
            <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
              Conoce a tu Profesora
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
              {siteConfig.teacherQuote ||
                '«El español no se aprende para pasar un examen, sino para conectar con personas.»'}
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#57514A] leading-relaxed">
              <p>{siteConfig.teacherBio}</p>
              {siteConfig.teacherBioParagraph2 && <p>{siteConfig.teacherBioParagraph2}</p>}
            </div>

            {/* Social channels */}
            <div className="mt-8 pt-6 border-t border-[#EAE5D9] flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold text-[#1E1B18]">Sígueme y practica a diario:</span>
              {siteConfig.instagramHandle && (
                <a
                  href={`https://instagram.com/${siteConfig.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#EAE5D9] text-xs font-semibold text-[#1E1B18] hover:text-[#C73E29] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{siteConfig.instagramHandle}</span>
                </a>
              )}
              {siteConfig.youtubeHandle && (
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#EAE5D9] text-xs font-semibold text-[#1E1B18] hover:text-[#C73E29] transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>{siteConfig.youtubeHandle}</span>
                </a>
              )}
              {siteConfig.spotifyHandle && (
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#EAE5D9] text-xs font-semibold text-[#1E1B18] hover:text-[#C73E29] transition-colors"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{siteConfig.spotifyHandle}</span>
                </a>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  setActiveView('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>¿Hablamos? Descubre tu nivel en el Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
