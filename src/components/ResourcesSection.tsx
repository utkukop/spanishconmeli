import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, FileText, Headphones, Pause, Play, Sparkles } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const { resources, setActiveView } = useCMS();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleDownload = (title: string) => {
    setDownloadSuccessMessage(`¡Descargando "${title}"! Revisa tu carpeta de descargas.`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
              Aprende Gratis Cada Semana
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
              Podcast & Recursos Descargables
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#57514A] max-w-xl">
              Episodios de inmersión auditiva, guías en PDF y trucos prácticos para que avances a tu
              ritmo sin gastar un euro.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#C73E29] hover:text-[#AB3220] transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>¿Cuál es tu nivel? Haz el quiz →</span>
          </button>
        </div>

        {downloadSuccessMessage && (
          <div className="mb-6 p-4 bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 text-[#2A9D8F] text-xs font-semibold rounded-xl flex items-center justify-between animate-fadeIn">
            <span>{downloadSuccessMessage}</span>
            <button
              onClick={() => setDownloadSuccessMessage(null)}
              className="text-xs underline font-bold cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Featured Podcast Interactive Player Card */}
        <div className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl p-6 sm:p-8 mb-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C73E29] mb-2">
                <Headphones className="w-4 h-4" />
                <span>Episodio Destacado · Spanish with Meli Podcast</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B18] tracking-tight">
                Cómo pedir un café en España sin parecer un extraterrestre
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#57514A] leading-relaxed">
                Solo, cortado, con leche, manchado, del tiempo, con hielo... Te explico el código
                secreto de las cafeterías españolas y las frases coloquiales para pedir con
                confianza.
              </p>

              {/* Player UI */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C73E29] hover:bg-[#AB3220] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pausar Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Reproducir Demo (14 min)</span>
                    </>
                  )}
                </button>

                <div className="flex-1 min-w-[200px]">
                  <div className="flex justify-between text-[11px] text-[#665E55] mb-1 font-mono tabular-nums">
                    <span>{isPlayingAudio ? '03:42' : '00:00'}</span>
                    <span>14:18</span>
                  </div>
                  <div className="w-full h-2 bg-[#EAE5D9] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#C73E29] rounded-full transition-all duration-300 ${
                        isPlayingAudio ? 'w-1/4 animate-pulse' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-[#EAE5D9] text-xs text-[#57514A]">
              <span className="font-bold text-[#1E1B18] block mb-2">Disponible en plataformas:</span>
              <div className="space-y-2">
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF9F5] transition-colors font-medium text-[#1E1B18]"
                >
                  <span>Spotify Podcasts</span>
                  <span className="text-[#2A9D8F] font-bold">Escuchar ↗</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF9F5] transition-colors font-medium text-[#1E1B18]"
                >
                  <span>YouTube Channel</span>
                  <span className="text-[#C73E29] font-bold">Ver vídeo ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#D5CFC4] transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#665E55] mb-3">
                  <span className="font-bold text-[#C73E29] uppercase tracking-wider">
                    {res.category}
                  </span>
                  <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-[#EAE5D9]">
                    {res.level}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#1E1B18] leading-snug">{res.title}</h4>

                <p className="mt-2 text-xs text-[#57514A] leading-relaxed line-clamp-3">
                  {res.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE5D9] flex items-center justify-between text-xs">
                <span className="text-[#78716C] font-medium">{res.durationOrPages}</span>
                {res.type === 'cheatsheet' ? (
                  <button
                    onClick={() => handleDownload(res.title)}
                    className="inline-flex items-center gap-1.5 font-bold text-[#2A9D8F] hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                  </button>
                ) : (
                  <button
                    onClick={toggleAudio}
                    className="inline-flex items-center gap-1.5 font-bold text-[#C73E29] hover:underline cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Lección</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
