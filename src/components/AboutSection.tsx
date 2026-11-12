import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Heart, Instagram, Sparkles } from 'lucide-react';
import { WireframePlaceholder } from './WireframePlaceholder';

export const AboutSection: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with exact wireframe specifications */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#EAE5D9] shadow-lg bg-[#FAF9F5]">
              <WireframePlaceholder
                width={600}
                height={600}
                aspectRatio="1/1"
                label="Teacher Meli Bio Portrait"
                description="Recommended: Warm, authentic portrait in 1:1 square ratio (600 × 600 px)"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-[#EAE5D9] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C73E29]">
                  <Heart className="w-4 h-4 fill-current text-[#C73E29]" />
                  <span>Passionate about living language and authentic human connection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Philosophy */}
          <div className="lg:col-span-7">
            <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
              Meet Your Teacher
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
              {siteConfig.teacherQuote ||
                '“Spanish isn’t learned to pass a grammar exam, but to connect authentically with real people.”'}
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#57514A] leading-relaxed">
              <p>{siteConfig.teacherBio}</p>
              {siteConfig.teacherBioParagraph2 && <p>{siteConfig.teacherBioParagraph2}</p>}
            </div>

            {/* Social channels: Instagram only */}
            <div className="mt-8 pt-6 border-t border-[#EAE5D9] flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold text-[#1E1B18]">Follow for daily practice:</span>
              {siteConfig.instagramHandle && (
                <a
                  href={`https://instagram.com/${siteConfig.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-[#EAE5D9] text-xs font-semibold text-[#1E1B18] hover:text-[#C73E29] hover:border-[#C73E29]/40 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>{siteConfig.instagramHandle}</span>
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
                <span>Ready to speak? Discover your level with our Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

