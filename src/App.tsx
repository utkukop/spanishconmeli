import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MethodologySection } from './components/MethodologySection';
import { HomeFeaturedPrograms } from './components/HomeFeaturedPrograms';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CoursesPage } from './components/CoursesPage';
import { AboutPage } from './components/AboutPage';
import { QuizPage } from './components/QuizPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { BackofficePage } from './components/BackofficePage';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isBackofficeMode,
  } = useCMS();

  // Scroll to absolute top whenever active view changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeView]);

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
          <CoursesPage />
        ) : activeView === 'about' ? (
          <AboutPage />
        ) : activeView === 'contact' ? (
          <ContactPage />
        ) : (
          /* HOME VIEW */
          <div>
            <Hero />
            <MethodologySection />
            <HomeFeaturedPrograms />
            <TestimonialsSection />
          </div>
        )}
      </main>

      <Footer />

      {/* Floating Action Button for Students: Quick Quiz trigger (Only if not on quiz) */}
      {activeView !== 'quiz' && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2 items-end">
          <a
            href="/quiz"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('quiz');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C73E29] hover:bg-[#AB3220] text-white text-xs font-bold rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
            title="Take Level Quiz"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Level Quiz</span>
          </a>
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
