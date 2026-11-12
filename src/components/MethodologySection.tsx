import React from 'react';
import { Check, X, MessageSquare, Headphones, Zap } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const MethodologySection: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  const comparisons = siteConfig.methodologyComparisons || [
    {
      situation: 'Ordering tapas and a drink at a busy bar',
      textbook: '«¿Desea usted servirme un vaso de agua mineral fría?» (Stiff, robotic—nobody talks like this)',
      meliMethod: '«¿Me pones un vaso de agua del tiempo, porfa?» (Warm, natural, and effortless)',
    },
    {
      situation: 'Agreeing enthusiastically with a friend',
      textbook: '«Yo concuerdo plenamente con su respetable opinión.»',
      meliMethod: '«¡Totalmente!», «Tal cual», «¡Ya te digo!»',
    },
    {
      situation: 'Making plans for the weekend',
      textbook: '«¿Tiene usted la intención de realizar actividades el sábado?»',
      meliMethod: '«¿Qué plan tienes para el finde? ¿Nos tomamos unas cañas?»',
    },
  ];

  const pillars = siteConfig.methodologyPillars || [
    {
      title: 'Colloquial Immersion',
      desc: 'Master the natural conversational fillers and idioms that make your Spanish sound warm and spontaneous from day one.',
    },
    {
      title: 'Fast-Speech Ear Training',
      desc: 'Listen to dialogues at real native tempo so you never lose the thread when locals speak quickly.',
    },
    {
      title: 'Zero-Hesitation Fluency',
      desc: 'Techniques for instant verbal response and reformulating your thoughts without mentally conjugating verbs first.',
    },
  ];

  const pillarIcons = [
    <MessageSquare key="1" className="w-6 h-6" />,
    <Headphones key="2" className="w-6 h-6" />,
    <Zap key="3" className="w-6 h-6" />,
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
            {siteConfig.methodologyKicker || 'The Core Difference'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            {siteConfig.methodologyTitle || 'Why do so many students freeze when trying to speak?'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57514A]">
            {siteConfig.methodologySubtitle ||
              `Traditional academies teach Spanish from 40 years ago. At ${siteConfig.siteName}, you learn the phrases, slang, and conversational rhythm real native speakers use today.`}
          </p>
        </div>

        {/* Side-by-side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Traditional Textbook Card */}
          <div className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-4">
                <X className="w-5 h-5 shrink-0" />
                <span>Traditional Textbook Spanish</span>
              </div>
              <ul className="space-y-4 text-sm text-[#665E55]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Stiff, awkward phrases that make you sound like a robot or translation app.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Endless grammar tables without practical situational context or natural cadence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Zero preparation for fast-talking locals, regional accents, or everyday slang.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EAE5D9] text-xs text-[#78716C] italic">
              «I know lots of grammar on paper, but the moment someone speaks to me, my mind goes completely blank.»
            </div>
          </div>

          {/* Meli Method Card */}
          <div className="bg-[#FAF8F5] border-2 border-[#C73E29]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative">
            <div className="absolute -top-3 right-6 bg-[#C73E29] text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
              The {siteConfig.siteName} Method
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#2A9D8F] font-bold text-sm mb-4">
                <Check className="w-5 h-5 shrink-0" />
                <span>Living, Colloquial & Natural Fluency</span>
              </div>
              <ul className="space-y-4 text-sm text-[#1E1B18]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2A9D8F] font-bold shrink-0">✓</span>
                  <span>Conversational chunks that roll off your tongue automatically without mental translation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2A9D8F] font-bold shrink-0">✓</span>
                  <span>Audio training with unscripted chats recorded in real tapas bars and city streets.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2A9D8F] font-bold shrink-0">✓</span>
                  <span>Subjunctive and past tenses explained through human emotions and intuitive humor.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EAE5D9] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#C73E29]">
                Measurable results in 30 days
              </span>
              <button
                onClick={() => {
                  setActiveView('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#1E1B18] hover:text-[#C73E29] underline cursor-pointer"
              >
                Assess my level now →
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Comparison Situations */}
        {comparisons.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#665E55] text-center mb-6">
              Real Spanish phrases you will learn to master:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {comparisons.map((c, i) => (
                <div
                  key={i}
                  className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-xl p-4.5 flex flex-col justify-between"
                >
                  <div className="text-xs font-bold text-[#C73E29] mb-2">{c.situation}</div>
                  <div className="text-xs text-[#78716C] line-through mb-2">{c.textbook}</div>
                  <div className="text-xs font-semibold text-[#1E1B18] bg-white p-2.5 rounded-lg border border-[#EAE5D9]">
                    {c.meliMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Pillars */}
        {pillars.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C73E29]/10 text-[#C73E29] flex items-center justify-center shrink-0">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1E1B18]">{pillar.title}</h4>
                  <p className="mt-1 text-xs text-[#57514A] leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
