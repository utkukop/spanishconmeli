import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, CheckCircle2, Sparkles, Star, Users, Volume2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  const bullets = siteConfig.heroBullets || [
    'Español coloquial de España y Latinoamérica',
    'Audios reales sin frases robóticas',
    'Test de nivel en 3 minutos',
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EAE5D9]">
      {/* Subtle warm atmospheric glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 bg-[#E76F51]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Unboxed editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C73E29] mb-4">
              <span>{siteConfig.heroBadge}</span>
              <span aria-hidden="true">·</span>
              <span>Edición 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1E1B18] leading-[1.15] text-balance">
              {siteConfig.heroHeadline}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#57514A] leading-relaxed max-w-2xl">
              {siteConfig.heroSubtitle}
            </p>

            {/* Micro feature checklist */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#443E38]">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveView('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{siteConfig.heroCtaPrimaryText || 'Hacer Test de Nivel Gratis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveView('courses');
                  const el = document.getElementById('courses-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1E1B18] bg-[#EFE9DD] hover:bg-[#E5DDCF] rounded-xl transition-colors cursor-pointer"
              >
                <span>{siteConfig.heroCtaSecondaryText || 'Ver Cursos & Precios'}</span>
              </button>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 pt-6 border-t border-[#EAE5D9] flex flex-wrap items-center gap-6 text-xs text-[#665E55]">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#1E1B18]">
                  {siteConfig.heroStatRating || '4.9 / 5'}
                </span>
                <span>({siteConfig.heroStatReviews || 'más de 1.800 reseñas'})</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-[#C73E29]" />
                <span>
                  {siteConfig.heroStatCommunity || 'Comunidad en YouTube, Spotify e Instagram'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Teacher Portrait with Natural Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#EAE5D9] bg-white aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src={
                    siteConfig.heroImage ||
                    '/src/assets/images/hero_meli_teacher_1794405197921.jpg'
                  }
                  alt={`Profesora ${siteConfig.teacherName} enseñando español`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim for text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base sm:text-lg">{siteConfig.teacherName}</p>
                      <p className="text-xs text-white/80">{siteConfig.teacherTitle}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveView('quiz');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 text-xs font-bold bg-[#C73E29] hover:bg-[#AB3220] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Empezar Quiz
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating micro trust card */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-[#EAE5D9] rounded-xl p-3.5 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C73E29]/10 text-[#C73E29] flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18]">Español 100% natural</p>
                  <p className="text-[11px] text-[#665E55]">Sin traducciones forzadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
