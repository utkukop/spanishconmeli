import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useCMS();

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F5] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
            Historias Reales de Estudiantes
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            De no atreverse a hablar, a disfrutar cada conversación
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57514A]">
            Descubre cómo otros estudiantes superaron la barrera del miedo y la vergüenza gracias al
            método conversacional de Meli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE5D9] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#EAE5D9]" />
                </div>

                <p className="text-sm text-[#332E29] leading-relaxed italic">«{t.quote}»</p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F0ECE2]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={t.location}>
                    {t.countryFlag}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1B18]">{t.name}</h4>
                    <p className="text-xs text-[#78716C]">{t.location}</p>
                  </div>
                </div>

                <div className="mt-3 bg-[#FAF9F5] px-3 py-1.5 rounded-lg border border-[#EAE5D9] text-[11px] font-semibold text-[#2A9D8F]">
                  ✓ {t.resultAchieved}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
