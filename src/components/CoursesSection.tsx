import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Course } from '../types';
import { Check, ChevronDown, ChevronUp, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { WireframePlaceholder } from './WireframePlaceholder';

export const CoursesSection: React.FC = () => {
  const { courses, siteConfig, setActiveView } = useCMS();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses[0]?.id || 'course-conversational'
  );
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

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
    setSelectedCourseForEnroll(course);
    setEnrollSuccess(false);
  };

  return (
    <section id="courses-section" className="py-16 md:py-24 bg-[#FAF9F5] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
            Curated Learning Programs
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            Courses Built for Natural Speaking & Real Life
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57514A]">
            Select a course below to compare curriculum, pricing, and outcomes, or take our free level assessment for a personalized recommendation.
          </p>
        </div>

        {/* Courses Interactive Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {courses.map((course) => {
            const isSelected = course.id === selectedCourseId;
            const isExpanded = expandedSyllabus[course.id];
            const currency = course.currency || siteConfig.currencySymbol || '€';

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-[#C73E29] ring-2 ring-[#C73E29] shadow-xl scale-[1.02] z-10'
                    : 'border-[#EAE5D9] shadow-xs hover:border-[#C73E29]/60 hover:shadow-md hover:scale-[1.01] opacity-90 hover:opacity-100'
                }`}
              >
                <div>
                  {/* Dimensional Wireframe Placeholder for Course Cover (800x500px) */}
                  <div className="relative">
                    <WireframePlaceholder
                      width={800}
                      height={500}
                      aspectRatio="16/10"
                      label={`${course.title}`}
                      subtitle="Recommended: 800 × 500 px graphic or photo"
                      className="rounded-b-none border-t-0 border-x-0"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      {course.badge && (
                        <span className="bg-[#1E1B18] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
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

                    <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#1E1B18] text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 z-10">
                      <Clock className="w-3.5 h-3.5 text-[#C73E29]" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Level Kicker */}
                    <div className="text-xs font-semibold text-[#C73E29] mb-1.5">
                      {course.level}
                    </div>

                    <h3 className="text-xl font-bold text-[#1E1B18] tracking-tight leading-snug">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#57514A] leading-relaxed">
                      {course.tagline}
                    </p>

                    {/* Pricing */}
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#1E1B18] tabular-nums">
                        {currency}{course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-sm text-[#8C827A] line-through tabular-nums">
                          {currency}{course.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-[#2A9D8F] font-semibold ml-auto">
                        One-time payment
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="mt-6 space-y-2.5 text-xs text-[#443E38]">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Syllabus */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#F0ECE2]">
                        <button
                          type="button"
                          onClick={(e) => toggleSyllabus(course.id, e)}
                          className="flex items-center justify-between w-full text-xs font-bold text-[#1E1B18] hover:text-[#C73E29] transition-colors cursor-pointer py-1"
                        >
                          <span>Curriculum Syllabus ({course.syllabus.length} modules)</span>
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
                                className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EAE5D9] text-xs"
                              >
                                <p className="font-bold text-[#1E1B18]">{s.title}</p>
                                <p className="text-[#665E55] mt-0.5">{s.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Selection / Enrollment Action */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={(e) => handleEnrollClick(course, e)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-[#C73E29] hover:bg-[#AB3220] text-white ring-2 ring-[#C73E29]/30'
                        : 'bg-[#1E1B18] hover:bg-[#332E29] text-white'
                    }`}
                  >
                    {isSelected
                      ? `Enroll in ${course.title} →`
                      : 'Select Plan & Enroll'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Quiz Callout Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#FAF0E6] via-[#FDF7F0] to-[#FAF0E6] border border-[#EAD7C5] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
              Not sure which level is right for you?
            </span>
            <h3 className="text-xl font-bold text-[#1E1B18] mt-1">
              Find your exact Spanish conversational level in 3 minutes
            </h3>
            <p className="text-xs sm:text-sm text-[#57514A] mt-1.5">
              Get an accurate diagnostic breakdown and discover which course will help you achieve fluent conversation fastest.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shrink-0 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take Free Level Quiz</span>
          </button>
        </div>
      </div>

      {/* Enrollment Checkout Simulation Modal */}
      {selectedCourseForEnroll && (
        <div
          className="fixed inset-0 z-50 bg-[#1E1B18]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedCourseForEnroll(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#EAE5D9]"
            onClick={(e) => e.stopPropagation()}
          >
            {!enrollSuccess ? (
              <div>
                <div className="text-xs font-semibold text-[#C73E29] mb-1">Course Enrollment</div>
                <h3 className="text-xl font-bold text-[#1E1B18]">{selectedCourseForEnroll.title}</h3>
                <p className="text-xs text-[#57514A] mt-1">{selectedCourseForEnroll.level}</p>

                <div className="my-5 p-4 bg-[#FAF9F5] rounded-xl border border-[#EAE5D9]">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#1E1B18]">
                    <span>Program Investment:</span>
                    <span className="text-xl font-bold text-[#C73E29]">
                      {selectedCourseForEnroll.currency || siteConfig.currencySymbol || '€'}
                      {selectedCourseForEnroll.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#665E55] mt-1">
                    Lifetime access · 14-day 100% money-back satisfaction guarantee
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEnrollSuccess(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B18] mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D5CFC4] focus:outline-none focus:ring-2 focus:ring-[#C73E29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B18] mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D5CFC4] focus:outline-none focus:ring-2 focus:ring-[#C73E29]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCourseForEnroll(null)}
                      className="flex-1 py-2.5 text-xs font-semibold text-[#57514A] bg-[#F0ECE2] hover:bg-[#E5DDCF] rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl transition-colors cursor-pointer"
                    >
                      Confirm Access
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#1E1B18]">Welcome to the Course!</h4>
                <p className="text-xs text-[#57514A] mt-2">
                  Your access details and welcome guide have been sent to your email. Get ready to start speaking real Spanish!
                </p>
                <button
                  onClick={() => setSelectedCourseForEnroll(null)}
                  className="mt-6 w-full py-2.5 text-xs font-bold text-white bg-[#1E1B18] hover:bg-[#332E29] rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
