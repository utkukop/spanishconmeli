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
import { ArrowRight, BookOpen } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isBackofficeMode,
  } = useCMS();

  // Always scroll to absolute top on route change (mobile & desktop)
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeView]);

  const handleGoToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('courses');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

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

            {/* Thin Strip Below Reviews: Spanish Guides -> Courses */}
            <section className="bg-[#FFF6EC] border-b border-[#E9DCCB]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                <a
                  href="/courses"
                  onClick={handleGoToCourses}
                  className="group min-h-[48px] flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-white border border-[#E9DCCB] hover:border-[#C8553D] transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <span className="w-9 h-9 rounded-full bg-[#F4E3D3] text-[#C8553D] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <p className="text-sm sm:text-base font-medium text-[#22334A]">
                      <span className="font-serif font-bold text-[#22334A]">Spanish Guides</span>
                      <span className="text-[#22334A]/75">, instant PDF downloads</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8553D] group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>Courses</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </section>
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
