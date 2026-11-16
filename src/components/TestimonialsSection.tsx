import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import avatar1 from '../assets/images/student_avatar_1_1794828749928.jpg';
import avatar2 from '../assets/images/student_avatar_2_1794828750367.jpg';
import avatar3 from '../assets/images/student_avatar_3_1794828753214.jpg';

const PREPLY_URL = 'https://preply.in/MELISSA4ES7826110102?ts=17948010';

interface PreplyReview {
  id: string;
  firstName: string;
  quote: string;
  avatar: string;
}

const PREPLY_REVIEWS: PreplyReview[] = [
  {
    id: 'preply-1',
    firstName: 'Sofia',
    quote:
      '“Melissa es una persona realmente amable. Está preparada para lo que enseña y siempre sabe cómo organizar la lección para que sea lo más efectiva posible.”',
    avatar: avatar1,
  },
  {
    id: 'preply-2',
    firstName: 'Daniel',
    quote:
      '“Melissa is an excellent tutor! She is very dedicated to the learning experience by having slideshows, practice quizzes, games, and homework. My Spanish has greatly improved.”',
    avatar: avatar2,
  },
  {
    id: 'preply-3',
    firstName: 'Claire',
    quote:
      '“Melissa es una maestra increíble, tiene una gran energía, es paciente y explica las cosas con claridad. ¡Las lecciones siempre son divertidas y efectivas!”',
    avatar: avatar3,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + PREPLY_REVIEWS.length) % PREPLY_REVIEWS.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % PREPLY_REVIEWS.length);
  };

  // Rotate array so left/right buttons dynamically cycle cards in both directions
  const orderedReviews = [
    PREPLY_REVIEWS[startIndex % PREPLY_REVIEWS.length],
    PREPLY_REVIEWS[(startIndex + 1) % PREPLY_REVIEWS.length],
    PREPLY_REVIEWS[(startIndex + 2) % PREPLY_REVIEWS.length],
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#22334A] text-[#FFF6EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row: Mustard Title + Read all my reviews on Preply link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2B134]">
            What my students say
          </h2>

          <a
            href={PREPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FFF6EC]/90 hover:text-[#F2B134] underline underline-offset-4 transition-colors"
          >
            <span>Read all my reviews on Preply</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Dynamic Carousel with Left & Right Navigation Arrows */}
        <div className="relative flex items-center gap-2 sm:gap-4">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="min-w-[44px] min-h-[44px] rounded-full bg-[#FFF6EC]/10 hover:bg-[#F2B134] text-[#FFF6EC] hover:text-[#22334A] border border-[#FFF6EC]/20 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 3 Review Cards on Desktop, 1 Active Card on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
            {orderedReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className={`bg-[#FFF6EC] text-[#22334A] rounded-2xl p-5 sm:p-6 border border-[#E9DCCB] shadow-sm flex flex-col justify-between transition-all duration-200 ${
                  idx > 0 ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div>
                  {/* 5 Navy Stars */}
                  <div className="flex items-center gap-0.5 text-[#22334A] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[#22334A]/90 leading-relaxed line-clamp-4">
                    {review.quote}
                  </p>
                </div>

                {/* Student Picture + First Name */}
                <div className="mt-5 pt-4 border-t border-[#E9DCCB] flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={`${review.firstName} — Preply student`}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#E9DCCB] shrink-0"
                  />
                  <div>
                    <p className="font-serif text-sm font-bold text-[#22334A]">
                      {review.firstName}
                    </p>
                    <p className="text-[11px] text-[#22334A]/60">Preply student</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="min-w-[44px] min-h-[44px] rounded-full bg-[#FFF6EC]/10 hover:bg-[#F2B134] text-[#FFF6EC] hover:text-[#22334A] border border-[#FFF6EC]/20 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-5">
          {PREPLY_REVIEWS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setStartIndex(i)}
              aria-label={`Show review ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                startIndex === i ? 'w-6 bg-[#F2B134]' : 'w-2 bg-[#FFF6EC]/35'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
