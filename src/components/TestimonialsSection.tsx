import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import type { PreplyReviewItem, PreplyReviewsResponse } from '../utils/preplyReviews';

const PREPLY_URL = 'https://preply.com/es/profesor/2407129';
const SESSION_CACHE_KEY = 'scm_preply_reviews_v2';
const SESSION_CACHE_TTL_MS = 15 * 60 * 1000;

const FALLBACK_REVIEWS: PreplyReviewItem[] = [
  {
    id: '1383945',
    firstName: 'Mariagiulia',
    quote:
      "Melissa is a really kind person. She's prepared for what she's teaching and always knows how to organize the lesson so it is as effective as possible. Tools like games and videos make learning easier.",
    rating: 5,
    avatar: 'https://avatars.preply.com/i/logos/i/logos/cc902b73-964d-488d-8b56-97fa9d3d1795.jpg',
    createdAt: '2024-12-08T17:54:24.309239+00:00',
    lessonCount: 71,
  },
  {
    id: '640906',
    firstName: 'Preply Student',
    quote:
      'Melissa is an excellent tutor! She is very dedicated to the learning experience by having slideshows, practice quizzes, games, and homework. My Spanish has greatly improved because of her and I could not be happier!',
    rating: 5,
    avatar: null,
    createdAt: '2023-06-27T11:59:02.620967+00:00',
    lessonCount: 21,
  },
  {
    id: '509163',
    firstName: 'Adam',
    quote:
      'Melissa is an amazing teacher, she has great energy, is patient & explains things clearly. Lessons are always fun & full of laughs & joy! Thank you Melissa :)',
    rating: 5,
    avatar: 'https://avatars.preply.com/i/logos/i/logos/7609619.bb09422abb.jpeg',
    createdAt: '2023-01-25T09:43:54.782495+00:00',
    lessonCount: 14,
  },
];

function deduplicateReviews(items: PreplyReviewItem[]): PreplyReviewItem[] {
  const seenIds = new Set<string>();
  const seenQuotes = new Set<string>();
  return items.filter((item) => {
    const normalizedQuote = item.quote.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!normalizedQuote || seenIds.has(item.id) || seenQuotes.has(normalizedQuote)) {
      return false;
    }
    seenIds.add(item.id);
    seenQuotes.add(normalizedQuote);
    return true;
  });
}

const StudentAvatar: React.FC<{ name: string; avatar: string | null }> = ({ name, avatar }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (avatar && !imgFailed) {
    return (
      <img
        src={avatar}
        alt={`${name} — Preply student`}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="w-10 h-10 rounded-full object-cover border border-[#E9DCCB] shrink-0 bg-[#E9DCCB]/40"
      />
    );
  }

  const initial = (name.trim()[0] || 'S').toUpperCase();
  return (
    <div
      aria-hidden="true"
      className="w-10 h-10 rounded-full bg-[#C8553D] text-[#FFF6EC] font-serif font-bold text-sm flex items-center justify-center border border-[#E9DCCB] shrink-0"
    >
      {initial}
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<PreplyReviewItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            data: PreplyReviewsResponse;
            expiresAt: number;
          };
          if (parsed?.data?.reviews?.length && Date.now() < parsed.expiresAt) {
            return deduplicateReviews(parsed.data.reviews);
          }
        }
      } catch {
        // ignore storage errors
      }
    }
    return [];
  });

  const [meta, setMeta] = useState<{
    averageRating: number;
    totalReviews: number;
    profileUrl: string;
  }>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            data: PreplyReviewsResponse;
            expiresAt: number;
          };
          if (parsed?.data?.reviews?.length && Date.now() < parsed.expiresAt) {
            return {
              averageRating: parsed.data.averageRating,
              totalReviews: parsed.data.totalReviews,
              profileUrl: parsed.data.profileUrl || PREPLY_URL,
            };
          }
        }
      } catch {
        // ignore
      }
    }
    return { averageRating: 5.0, totalReviews: 10, profileUrl: PREPLY_URL };
  });

  const [isLoading, setIsLoading] = useState<boolean>(reviews.length === 0);
  const [cardsPerPage, setCardsPerPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 3 : 1;
    }
    return 3;
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updateCardsPerPage = () => {
      const next = window.innerWidth >= 768 ? 3 : 1;
      setCardsPerPage((prev) => {
        if (prev !== next) {
          setCurrentPage(0);
        }
        return next;
      });
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLivePreplyReviews() {
      const endpoints = ['/api/preply-reviews', '/.netlify/functions/preply-reviews'];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, { signal: controller.signal });
          if (!res.ok) continue;
          const payload = (await res.json()) as PreplyReviewsResponse;
          if (Array.isArray(payload.reviews) && payload.reviews.length > 0) {
            const uniqueReviews = deduplicateReviews(payload.reviews);
            setReviews(uniqueReviews);
            setMeta({
              averageRating: payload.averageRating || 5.0,
              totalReviews: payload.totalReviews || uniqueReviews.length,
              profileUrl: payload.profileUrl || PREPLY_URL,
            });
            setCurrentPage(0);
            try {
              sessionStorage.setItem(
                SESSION_CACHE_KEY,
                JSON.stringify({
                  data: { ...payload, reviews: uniqueReviews },
                  expiresAt: Date.now() + SESSION_CACHE_TTL_MS,
                })
              );
            } catch {
              // ignore storage quota errors
            }
            setIsLoading(false);
            return;
          }
        } catch (err) {
          if ((err as Error)?.name === 'AbortError') return;
        }
      }

      setReviews((prev) => (prev.length > 0 ? prev : FALLBACK_REVIEWS));
      setIsLoading(false);
    }

    loadLivePreplyReviews();
    return () => controller.abort();
  }, []);

  const activeReviews = useMemo(
    () => deduplicateReviews(reviews.length > 0 ? reviews : FALLBACK_REVIEWS),
    [reviews]
  );

  // Non-overlapping pagination so every single review appears strictly once
  const totalPages = Math.max(1, Math.ceil(activeReviews.length / cardsPerPage));
  const safePage = currentPage % totalPages;
  const pageStart = safePage * cardsPerPage;
  const visibleReviews = activeReviews.slice(pageStart, pageStart + cardsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 sm:py-16 bg-[#22334A] text-[#FFF6EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row: Mustard Title + Rating Summary + Preply Profile Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2B134]">
              What my students say
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#FFF6EC]/75">
              ★★★★★ {meta.averageRating.toFixed(1)} average · {meta.totalReviews} verified student reviews on Preply
            </p>
          </div>

          <a
            href={meta.profileUrl || PREPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FFF6EC]/90 hover:text-[#F2B134] underline underline-offset-4 transition-colors"
          >
            <span>Read all my reviews on Preply</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[0, 1, 2].map((skeletonIdx) => (
              <div
                key={skeletonIdx}
                className={`bg-[#FFF6EC]/95 rounded-2xl p-6 border border-[#E9DCCB] min-h-[276px] animate-pulse flex flex-col justify-between ${
                  skeletonIdx > 0 ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div className="space-y-3">
                  <div className="h-3.5 w-24 bg-[#E9DCCB] rounded-full" />
                  <div className="h-3 w-full bg-[#E9DCCB]/70 rounded-full" />
                  <div className="h-3 w-11/12 bg-[#E9DCCB]/70 rounded-full" />
                  <div className="h-3 w-4/5 bg-[#E9DCCB]/70 rounded-full" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E9DCCB]">
                  <div className="w-10 h-10 rounded-full bg-[#E9DCCB]" />
                  <div className="h-3.5 w-24 bg-[#E9DCCB] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Dynamic Carousel with Left & Right Navigation Arrows */}
            <div className="relative flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reviews"
                className="min-w-[44px] min-h-[44px] rounded-full bg-[#FFF6EC]/10 hover:bg-[#F2B134] text-[#FFF6EC] hover:text-[#22334A] border border-[#FFF6EC]/20 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Non-overlapping cards; equal minimum height (272px) and synced row stretch on Read more */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
                {visibleReviews.map((review) => {
                  const isExpanded = Boolean(expandedIds[review.id]);
                  const isLong = review.quote.length > 175;
                  return (
                    <div
                      key={review.id}
                      className="min-h-[276px] bg-[#FFF6EC] text-[#22334A] rounded-2xl p-5 sm:p-6 border border-[#E9DCCB] shadow-sm flex flex-col justify-between transition-all duration-200"
                    >
                      <div>
                        {/* Navy Stars */}
                        <div className="flex items-center gap-0.5 text-[#22334A] mb-3">
                          {[...Array(Math.round(review.rating || 5))].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p
                          className={`text-sm text-[#22334A]/90 leading-relaxed ${
                            !isExpanded ? 'line-clamp-4' : ''
                          }`}
                        >
                          “{review.quote}”
                        </p>

                        {isLong && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(review.id)}
                            className="mt-1.5 text-xs font-semibold text-[#C8553D] hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {/* Student Picture + First Name */}
                      <div className="mt-5 pt-4 border-t border-[#E9DCCB] flex items-center gap-3">
                        <StudentAvatar name={review.firstName} avatar={review.avatar} />
                        <div className="min-w-0">
                          <p className="font-serif text-sm font-bold text-[#22334A] truncate">
                            {review.firstName}
                          </p>
                          <p className="text-[11px] text-[#22334A]/65 truncate">
                            {review.lessonCount
                              ? `${review.lessonCount} lessons · Preply`
                              : 'Verified Preply student'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next reviews"
                className="min-w-[44px] min-h-[44px] rounded-full bg-[#FFF6EC]/10 hover:bg-[#F2B134] text-[#FFF6EC] hover:text-[#22334A] border border-[#FFF6EC]/20 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot Indicators matching unique pages */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, pageIdx) => (
                  <button
                    key={pageIdx}
                    type="button"
                    onClick={() => setCurrentPage(pageIdx)}
                    aria-label={`Show reviews page ${pageIdx + 1} of ${totalPages}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      safePage === pageIdx
                        ? 'w-6 bg-[#F2B134]'
                        : 'w-2 bg-[#FFF6EC]/35 hover:bg-[#FFF6EC]/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
