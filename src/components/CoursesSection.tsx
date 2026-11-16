import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Course } from '../types';
import {
  Check,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ZoomIn,
  X,
  Calendar,
  ArrowRight,
} from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { courses, siteConfig, setActiveView } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/melissa-anchelia-54kwyd/30min';

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses[0]?.id || 'course-group-a0a1'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>('8-lessons');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-[#FFF6EC] border-b border-[#E9DCCB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-2">
            ¡Vamos! Choose Your Format
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A] tracking-tight text-balance">
            Two warm, practical ways to learn Spanish
          </h2>
          <p className="mt-4 text-base text-[#22334A]/75 leading-relaxed">
            Pick our friendly 4–6 student beginner group or customize your schedule with 1-on-1 private lessons.
          </p>
        </div>

        {/* 2 Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {courses.map((course) => {
            const isSelected = course.id === selectedCourseId;
            const isExpanded = expandedSyllabus[course.id];
            const currency = course.currency || '$';
            const isPrivate1on1 = course.id === 'course-private-1on1' || Boolean(course.packages?.length);

            const activePackage = isPrivate1on1
              ? course.packages?.find((p) => p.id === selectedPackageId) || course.packages?.[0]
              : null;
            const displayPrice = activePackage ? activePackage.price : course.price;

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-[#C8553D] ring-2 ring-[#C8553D]/25 shadow-md'
                    : 'border-[#E9DCCB] shadow-xs hover:border-[#C8553D]/60'
                }`}
              >
                <div>
                  {/* Course Flyer Header */}
                  <div className="relative group bg-[#FFF6EC] overflow-hidden border-b border-[#E9DCCB]">
                    <img
                      src={course.image}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[290px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22334A]/55 via-transparent to-transparent pointer-events-none" />

                    {/* Top Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-[#C8553D] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 z-10">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </div>
                    )}

                    {/* Flyer Preview Actions */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage({ src: course.image, title: course.title });
                        }}
                        className="min-h-[38px] bg-white/95 hover:bg-white text-[#22334A] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-[#C8553D]" />
                        <span>View flyer</span>
                      </button>

                      {course.secondaryImage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxImage({
                              src: course.secondaryImage!,
                              title: `${course.title} – Pricing & Registration`,
                            });
                          }}
                          className="min-h-[38px] bg-[#22334A]/90 hover:bg-[#22334A] text-[#FFF6EC] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ZoomIn className="w-3.5 h-3.5 text-[#F2B134]" />
                          <span>Pricing flyer</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Unboxed Metadata */}
                    <p className="text-xs font-semibold text-[#C8553D] tracking-wide mb-2">
                      {course.level} · <span className="text-[#22334A]/65 font-normal">{course.duration}</span>
                    </p>

                    <h3 className="font-serif text-2xl font-bold text-[#22334A] leading-snug">
                      {course.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-[#22334A]/75 leading-relaxed">
                      {course.tagline}
                    </p>

                    {/* Pricing / Interactive Package Selector */}
                    {isPrivate1on1 && course.packages ? (
                      <div className="mt-6 pt-5 border-t border-[#E9DCCB]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#22334A]">
                            Choose a monthly package:
                          </span>
                          <span className="text-xs font-semibold text-[#C8553D]">
                            Free 30-min trial
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5">
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
                                className={`min-h-[76px] p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
                                  isPkgActive
                                    ? 'border-[#C8553D] bg-[#FFF6EC] text-[#22334A] ring-1 ring-[#C8553D]'
                                    : 'border-[#E9DCCB] bg-white hover:bg-[#FFF6EC]/60 text-[#22334A]/75'
                                }`}
                              >
                                <span className="block text-[11px] font-semibold">
                                  {pkg.lessonsCount} Classes
                                </span>
                                <span className="block text-base font-bold text-[#C8553D] my-0.5 tabular-nums">
                                  {currency}{pkg.price}
                                </span>
                                <span className="block text-[10px] text-[#22334A]/60 tabular-nums">
                                  {currency}{pkg.perLesson}/class
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 pt-5 border-t border-[#E9DCCB] flex items-baseline justify-between gap-4">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-3xl font-bold text-[#C8553D] tabular-nums">
                              {currency}{course.price}
                            </span>
                            {course.originalPrice && (
                              <span className="text-base text-[#22334A]/45 line-through tabular-nums">
                                {currency}{course.originalPrice}
                              </span>
                            )}
                            <span className="text-xs font-semibold text-[#22334A]">USD</span>
                          </div>
                          <span className="text-xs font-medium text-[#22334A]/75 block mt-1">
                            Early Bird price · Save $35 USD
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#22334A] bg-[#FFF6EC] px-3 py-1 rounded-full border border-[#E9DCCB]">
                          4–6 Students
                        </span>
                      </div>
                    )}

                    {/* Features */}
                    <div className="mt-6 pt-5 border-t border-[#E9DCCB]">
                      <p className="text-xs font-semibold text-[#22334A] mb-3">
                        What’s included:
                      </p>
                      <ul className="space-y-2.5 text-sm text-[#22334A]/85">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#C8553D] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Course Outline */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#E9DCCB]">
                        <button
                          type="button"
                          onClick={(e) => toggleSyllabus(course.id, e)}
                          className="min-h-[40px] flex items-center justify-between w-full text-xs font-semibold text-[#22334A] hover:text-[#C8553D] transition-colors cursor-pointer py-1"
                        >
                          <span>What we cover ({course.syllabus.length} parts)</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2.5">
                            {course.syllabus.map((s, idx) => (
                              <div
                                key={idx}
                                className="bg-[#FFF6EC] p-3.5 rounded-2xl border border-[#E9DCCB] text-xs"
                              >
                                <p className="font-semibold text-[#22334A]">{s.title}</p>
                                <p className="text-[#22334A]/75 mt-1 leading-relaxed">{s.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 sm:p-8 pt-0 space-y-2.5">
                  <button
                    type="button"
                    onClick={(e) => handleEnrollClick(course, e)}
                    className="min-h-[48px] w-full py-3.5 px-6 rounded-full text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 bg-[#22334A] hover:bg-[#192638] text-white"
                  >
                    <span>
                      {isPrivate1on1
                        ? `Inquire about ${activePackage?.label || 'Package'} (${currency}${displayPrice})`
                        : `Reserve group spot (${currency}${displayPrice} USD)`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cal.com Trial Lesson Callout Banner */}
        <div className="mt-14 max-w-5xl mx-auto bg-white border border-[#E9DCCB] rounded-3xl p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <p className="text-xs font-semibold text-[#C8553D] tracking-wide mb-1.5">
              ¡Hola! Not sure where to begin?
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A]">
              Book your trial lesson with Meli
            </h3>
            <p className="text-sm text-[#22334A]/75 mt-2 leading-relaxed">
              Let’s meet on Google Meet, chat about your Spanish goals, and find the exact class pace that feels right for you.
            </p>
          </div>
          <a
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shrink-0 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Book your trial lesson · $5</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Flyer Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#22334A]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-[#FFF6EC]">
              <span className="text-xs font-semibold truncate pr-4">{lightboxImage.title}</span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close flyer preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              referrerPolicy="no-referrer"
              className="w-auto h-auto max-h-[82vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
};
