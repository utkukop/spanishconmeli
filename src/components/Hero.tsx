import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, CheckCircle2, Sparkles, Star, Users, Volume2 } from 'lucide-react';
import { WireframePlaceholder } from './WireframePlaceholder';

export const Hero: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  const bullets = siteConfig.heroBullets || [
    'Real conversational Spanish from Spain and Latin America',
    'Authentic street dialogues without robotic grammar formulas',
    'Diagnostic level assessment in 3 minutes',
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
              <span>2026 Edition</span>
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
                <span>{siteConfig.heroCtaPrimaryText || 'Take Free Level Quiz'}</span>
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
                <span>{siteConfig.heroCtaSecondaryText || 'Explore Courses & Pricing'}</span>
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
                <span>({siteConfig.heroStatReviews || '1,800+ student reviews'})</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-[#C73E29]" />
                <span>
                  {siteConfig.heroStatCommunity || 'Community on Instagram @spanishconmeli'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dimensional Wireframe Placeholder for Hero Teacher Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <WireframePlaceholder
                width={600}
                height={750}
                aspectRatio="4/5"
                label="Teacher Meli Hero Portrait Photo"
                subtitle="Recommended: 600 × 750 px transparent cut-out or studio portrait"
                className="shadow-xl"
              />

              {/* Floating micro trust card */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-[#EAE5D9] rounded-xl p-3.5 shadow-lg flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-lg bg-[#C73E29]/10 text-[#C73E29] flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18]">100% Street-Smart Spanish</p>
                  <p className="text-[11px] text-[#665E55]">Zero robotic memorization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
