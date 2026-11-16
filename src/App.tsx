import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeFeaturedPrograms } from './components/HomeFeaturedPrograms';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CoursesPage } from './components/CoursesPage';
import { GroupLessonsPage } from './components/GroupLessonsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { BackofficePage } from './components/BackofficePage';
import { SpanishSpeakingWorldSection } from './components/SpanishSpeakingWorldSection';

const AppContent: React.FC = () => {
  const {
    activeView,
    isBackofficeMode,
  } = useCMS();

  // Always scroll to absolute top on route change (mobile & desktop)
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeView]);

  if (isBackofficeMode) {
    return <BackofficePage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EC] text-[#22334A]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'courses' ? (
          <CoursesPage />
        ) : activeView === 'group-lessons' ? (
          <GroupLessonsPage />
        ) : activeView === 'about' ? (
          <AboutPage />
        ) : activeView === 'contact' ? (
          <ContactPage />
        ) : (
          /* HOME VIEW */
          <div>
            <Hero />
            <HomeFeaturedPrograms />
            <TestimonialsSection />
            <SpanishSpeakingWorldSection />
          </div>
        )}
      </main>

      <Footer />
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
