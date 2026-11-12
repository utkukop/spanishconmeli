import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Course } from '../types';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  CheckCircle2,
  ZoomIn,
  X,
  Gift,
  ArrowRight,
} from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { courses, setActiveView } = useCMS();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses[0]?.id || 'course-group-a0a1'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>('8-lessons');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});
  
  // Lightbox modal state for viewing full flyers
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const toggleSyllabus = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSyllabus((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleEnrollClick = (course: Course, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCourseId(course.id);

    if (course.id === 'course-private-1on1') {
      const activePkg = course.packages?.find((p) => p.id === selectedPackageId);
      const tierLabel = activePkg ? activePkg.label : 'Private Lessons';
      setActiveView(
        'contact',
        `subject=${encodeURIComponent('Private lessons & free trial')}&course=${encodeURIComponent(
          `Online Spanish Private Lessons (${tierLabel})`
        )}`
      );
    } else {
      setActiveView(
        'contact',
        `subject=${encodeURIComponent('Course enrollment')}&course=${encodeURIComponent(
          'A0–A1 Small Group Spanish Cohort ($115 USD Early Bird)'
        )}`
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="courses-section" className="py-16 md:py-24 bg-[#FAF9F5] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
            Curated Learning Programs
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            2 Proven Formats to Speak Spanish with Real Confidence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57514A]">
            Whether you thrive in an intimate beginner group or want tailored 1-on-1 private lessons with Teacher Meli, choose your preferred format below.
          </p>
        </div>

        {/* 2 Focused Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {courses.map((course) => {
            const isSelected = course.id === selectedCourseId;
            const isExpanded = expandedSyllabus[course.id];
            const currency = course.currency || '$';
            const isPrivate1on1 = course.id === 'course-private-1on1' || Boolean(course.packages?.length);

            // Calculate active package price for 1-on-1
            const activePackage = isPrivate1on1
              ? course.packages?.find((p) => p.id === selectedPackageId) || course.packages?.[0]
              : null;
            const displayPrice = activePackage ? activePackage.price : course.price;

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-[#C73E29] ring-2 ring-[#C73E29] shadow-xl scale-[1.01] z-10'
                    : 'border-[#EAE5D9] shadow-sm hover:border-[#C73E29]/60 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Flyer Media Banner with Lightbox Zoom Trigger */}
                  <div className="relative group bg-[#FAF0E6] overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full max-h-[300px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      {course.badge && (
                        <span className="bg-[#1E1B18]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                          {course.badge}
                        </span>
                      )}
                      {isSelected && (
                        <span className="bg-[#C73E29] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 animate-fadeIn">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </span>
                      )}
                    </div>

                    {/* Click-to-enlarge flyer action */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage({ src: course.image, title: course.title });
                      }}
                      className="absolute bottom-3 left-3 bg-white/95 hover:bg-white text-[#1E1B18] text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all hover:scale-105 z-10 cursor-pointer"
                      title="View full flyer"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#C73E29]" />
                      <span>View Flyer</span>
                    </button>

                    {/* Secondary Flyer thumbnail if available */}
                    {course.secondaryImage && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage({ src: course.secondaryImage!, title: `${course.title} - Pricing & Details` });
                        }}
                        className="absolute bottom-3 right-3 bg-[#1E1B18]/90 hover:bg-[#1E1B18] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all hover:scale-105 z-10 cursor-pointer"
                        title="View pricing flyer"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-[#F4A261]" />
                        <span>Pricing Flyer</span>
                      </button>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Level Kicker */}
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C73E29] uppercase tracking-wider mb-2">
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#665E55] lowercase font-normal">{course.duration}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#1E1B18] tracking-tight leading-snug">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#57514A] leading-relaxed">
                      {course.tagline}
                    </p>

                    {/* PRICING & TIER SECTION */}
                    {isPrivate1on1 && course.packages ? (
                      /* Interactive Monthly Package Selector for 1-on-1 Private Lessons */
                      <div className="mt-6 pt-5 border-t border-[#F0ECE2]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                            Select Lesson Package:
                          </span>
                          <span className="text-xs font-semibold text-[#2A9D8F] flex items-center gap-1">
                            <Gift className="w-3.5 h-3.5" />
                            <span>Free 30-Min Trial</span>
                          </span>
                        </div>

                        {/* Package Pills */}
                        <div className="grid grid-cols-3 gap-2">
                          {course.packages.map((pkg) => {
                            const isPkgActive = pkg.id === selectedPackageId;
                            return (
                              <button
                                key={pkg.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPackageId(pkg.id);
                                }}
                                className={`p-2.5 rounded-xl text-center border-2 transition-all cursor-pointer ${
                                  isPkgActive
                                    ? 'border-[#C73E29] bg-[#FAF3F0] text-[#1E1B18] shadow-xs'
                                    : 'border-[#EAE5D9] bg-[#FAF9F5] hover:border-[#D5CFC4] text-[#57514A]'
                                }`}
                              >
                                <span className="block text-[11px] font-bold">
                                  {pkg.lessonsCount} Classes
                                </span>
                                <span className="block text-base font-extrabold text-[#C73E29] my-0.5">
                                  {currency}{pkg.price}
                                </span>
                                <span className="block text-[10px] text-[#78716C]">
                                  {currency}{pkg.perLesson}/class
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Group Cohort Pricing with Early Bird Highlight */
                      <div className="mt-6 pt-5 border-t border-[#F0ECE2] flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-[#C73E29] tabular-nums">
                              {currency}{course.price}
                            </span>
                            {course.originalPrice && (
                              <span className="text-base text-[#8C827A] line-through tabular-nums">
                                {currency}{course.originalPrice}
                              </span>
                            )}
                            <span className="text-xs font-bold text-[#1E1B18]">USD</span>
                          </div>
                          <span className="text-xs font-semibold text-[#2A9D8F] block mt-0.5">
                            Early Bird: Save $35 USD (Limited spots!)
                          </span>
                        </div>
                        <span className="text-xs text-[#665E55] bg-[#FAF0E6] px-2.5 py-1 rounded-lg border border-[#EAD7C5] font-medium">
                          10-Week Cohort
                        </span>
                      </div>
                    )}

                    {/* Features List matching Flyer */}
                    <div className="mt-6 pt-5 border-t border-[#F0ECE2]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-3">
                        What’s included in this program:
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#443E38]">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Syllabus */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#F0ECE2]">
                        <button
                          type="button"
                          onClick={(e) => toggleSyllabus(course.id, e)}
                          className="flex items-center justify-between w-full text-xs font-bold text-[#1E1B18] hover:text-[#C73E29] transition-colors cursor-pointer py-1"
                        >
                          <span>Course Outline & Structure ({course.syllabus.length} Phases)</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2.5 animate-fadeIn">
                            {course.syllabus.map((s, idx) => (
                              <div
                                key={idx}
                                className="bg-[#FAF9F5] p-3 rounded-xl border border-[#EAE5D9] text-xs"
                              >
                                <p className="font-bold text-[#1E1B18]">{s.title}</p>
                                <p className="text-[#665E55] mt-1">{s.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action -> Redirects directly to /contact with course pre-selected */}
                <div className="p-6 sm:p-8 pt-0">
                  <button
                    type="button"
                    onClick={(e) => handleEnrollClick(course, e)}
                    className={`w-full py-3.5 px-6 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#C73E29] hover:bg-[#AB3220] text-white ring-2 ring-[#C73E29]/30'
                        : 'bg-[#1E1B18] hover:bg-[#332E29] text-white'
                    }`}
                  >
                    <span>
                      {isPrivate1on1
                        ? `Inquire & Book ${activePackage?.label || 'Package'} (${currency}${displayPrice})`
                        : `Reserve Group Spot (${currency}${displayPrice} USD)`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Quiz Callout Banner */}
        <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-r from-[#FAF0E6] via-[#FDF7F0] to-[#FAF0E6] border border-[#EAD7C5] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
              Not sure which format fits your level?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1">
              Find your exact Spanish conversational level in 3 minutes
            </h3>
            <p className="text-xs sm:text-sm text-[#57514A] mt-1.5 leading-relaxed">
              Take Teacher Meli's interactive CEFR assessment for a diagnostic breakdown and a personalized 3-step action roadmap.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shrink-0 shadow-sm transition-transform hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take Free Level Quiz</span>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL for Fullscreen Flyer Viewing (Mobile Optimized) */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-bold truncate pr-4">{lightboxImage.title}</span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close flyer preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="w-auto h-auto max-h-[82vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
};
