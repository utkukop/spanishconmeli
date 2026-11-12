import React from 'react';
import { Check, X, MessageSquare, Headphones, Zap } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const MethodologySection: React.FC = () => {
  const { siteConfig, setActiveView } = useCMS();

  const comparisons = siteConfig.methodologyComparisons || [
    {
      situation: 'Pedir comida en un bar',
      textbook: '«¿Desea usted servirme un vaso de agua mineral fría?» (Innatural, nadie habla así)',
      meliMethod: '«¿Me pones un vaso de agua del tiempo, porfa?» (Fluido, cálido y real)',
    },
    {
      situation: 'Expresar acuerdo con un amigo',
      textbook: '«Yo concuerdo plenamente con su respetable opinión.»',
      meliMethod: '«¡Totalmente!», «Tal cual», «¡Ya te digo!»',
    },
    {
      situation: 'Hacer planes de fin de semana',
      textbook: '«¿Tiene usted la intención de realizar actividades el sábado?»',
      meliMethod: '«¿Qué plan tienes para el finde? ¿Nos tomamos unas cañas?»',
    },
  ];

  const pillars = siteConfig.methodologyPillars || [
    {
      title: 'Inmersión Coloquial',
      desc: 'Aprende las muletillas y frases hechas que hacen que tu español suene natural y empático desde el primer minuto.',
    },
    {
      title: 'Oído Afilado',
      desc: 'Diálogos a velocidad normal de conversación para que nunca más te sientas perdido cuando un hispanohablante te hable rápido.',
    },
    {
      title: 'Cero Bloqueo',
      desc: 'Técnicas de respuesta instantánea y reformulación para que nunca te quedes callado pensando en cómo conjugar.',
    },
  ];

  const pillarIcons = [<MessageSquare key="1" className="w-6 h-6" />, <Headphones key="2" className="w-6 h-6" />, <Zap key="3" className="w-6 h-6" />];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
            {siteConfig.methodologyKicker || 'La Gran Diferencia'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            {siteConfig.methodologyTitle || '¿Por qué tantos estudiantes se bloquean al hablar?'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57514A]">
            {siteConfig.methodologySubtitle ||
              `La mayoría de las escuelas enseñan un español de hace 40 años. En ${siteConfig.siteName} aprendes las frases, los modismos y el ritmo que se usa hoy en día.`}
          </p>
        </div>

        {/* Side-by-side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Traditional Textbook Card */}
          <div className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-4">
                <X className="w-5 h-5 shrink-0" />
                <span>Español tradicional de libro de texto</span>
              </div>
              <ul className="space-y-4 text-sm text-[#665E55]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Frases forzadas que te hacen sonar como un robot o traductor.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Listas eternas de gramática sin contexto práctico ni entonación.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Cero preparación para los acentos rápidos y el argot callejero.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EAE5D9] text-xs text-[#78716C] italic">
              «Sé mucha gramática en papel, pero cuando alguien me habla me quedo en blanco.»
            </div>
          </div>

          {/* Meli Method Card */}
          <div className="bg-[#FAF8F5] border-2 border-[#C73E29]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative">
            <div className="absolute -top-3 right-6 bg-[#C73E29] text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
              Método {siteConfig.siteName}
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#2A9D8F] font-bold text-sm mb-4">
                <Check className="w-5 h-5 shrink-0" />
                <span>Español vivo, coloquial y con soltura</span>
              </div>
              <ul className="space-y-4 text-sm text-[#1E1B18]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2A9D8F] font-bold shrink-0">✓</span>
                  <span>Bloques de conversación ("chunks") que salen espontáneos sin traducir.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2A9D8F] font-bold shrink-0">✓</span>
                  <span>Entrenamiento auditivo con charlas reales en cafeterías y calles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2A9D8F] font-bold shrink-0">✓</span>
                  <span>Subjuntivo y pasados explicados con emociones simples y humor.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EAE5D9] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#C73E29]">
                Resultados medibles en 30 días
              </span>
              <button
                onClick={() => {
                  setActiveView('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#1E1B18] hover:text-[#C73E29] underline cursor-pointer"
              >
                Comprobar mi nivel ahora →
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Comparison Situations */}
        {comparisons.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#665E55] text-center mb-6">
              Ejemplos de frases reales que aprenderás a dominar:
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
