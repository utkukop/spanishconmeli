import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MethodologySection } from './components/MethodologySection';
import { CoursesSection } from './components/CoursesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { QuizPage } from './components/QuizPage';
import { Footer } from './components/Footer';
import { BackofficePage } from './components/BackofficePage';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isBackofficeMode,
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
                Curriculum & Programs
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-2">
                Master Conversational Spanish with {siteConfig.teacherName || 'Meli'}
              </h1>
              <p className="mt-3 text-sm text-[#57514A] max-w-xl mx-auto">
                Step-by-step structured programs designed to build speaking confidence and natural rhythm without dry textbook drills.
              </p>
            </div>
            <CoursesSection />
            <MethodologySection />
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
            title="Take Level Quiz"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Level Quiz</span>
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

