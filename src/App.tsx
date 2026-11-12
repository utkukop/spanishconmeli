import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MethodologySection } from './components/MethodologySection';
import { CoursesSection } from './components/CoursesSection';
import { ResourcesSection } from './components/ResourcesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { QuizPage } from './components/QuizPage';
import { Footer } from './components/Footer';
import { BackofficePage } from './components/BackofficePage';
import { Shield, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isBackofficeMode,
    isBackofficeAuthenticated,
    enterBackoffice,
    siteConfig,
  } = useCMS();

  // If in Backoffice route / mode, render dedicated administration portal
  if (isBackofficeMode) {
    return <BackofficePage />;
  }

  // PUBLIC WEBSITE (Users see only this clean educational interface)
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E1B18]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'quiz' ? (
          <QuizPage />
        ) : activeView === 'courses' ? (
          <div>
            <div className="bg-[#FAF0E6] py-10 px-4 text-center border-b border-[#EAE5D9]">
              <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
                Catálogo Formativo
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-2">
                Aprende Español Conversacional con {siteConfig.teacherName || 'Meli'}
              </h1>
              <p className="mt-3 text-sm text-[#57514A] max-w-xl mx-auto">
                Programas estructurados paso a paso para ganar fluidez y naturalidad sin memorizar
                gramática aburrida.
              </p>
            </div>
            <CoursesSection />
            <MethodologySection />
          </div>
        ) : activeView === 'resources' ? (
          <div>
            <div className="bg-[#FAF0E6] py-10 px-4 text-center border-b border-[#EAE5D9]">
              <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
                Biblioteca Abierta
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-2">
                Podcast & Recursos Gratuitos
              </h1>
              <p className="mt-3 text-sm text-[#57514A] max-w-xl mx-auto">
                Lecciones auditivas, guías descargables en PDF y tips de pronunciación directa.
              </p>
            </div>
            <ResourcesSection />
          </div>
        ) : activeView === 'about' ? (
          <div>
            <AboutSection />
            <TestimonialsSection />
          </div>
        ) : (
          /* HOME VIEW */
          <div>
            <Hero />
            <MethodologySection />
            <CoursesSection />
            <ResourcesSection />
            <TestimonialsSection />
            <AboutSection />
          </div>
        )}
      </main>

      <Footer />

      {/* Floating Action Button for Students: Quick Quiz trigger (Only if not on quiz) */}
      {activeView !== 'quiz' && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2 items-end">


          <button
            onClick={() => {
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C73E29] hover:bg-[#AB3220] text-white text-xs font-bold rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
            title="Hacer Quiz de Nivel"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quiz de Nivel</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
