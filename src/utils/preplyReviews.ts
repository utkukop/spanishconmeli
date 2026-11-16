export const PREPLY_TUTOR_ID = '2407129';
export const PREPLY_PROFILE_URL = `https://preply.com/es/profesor/${PREPLY_TUTOR_ID}`;

export interface PreplyReviewItem {
  id: string;
  firstName: string;
  country?: string;
  quote: string;
  rating: number;
  avatar: string | null;
  createdAt: string;
  lessonCount: number | null;
}

export interface PreplyReviewsResponse {
  profileUrl: string;
  averageRating: number;
  totalReviews: number;
  reviews: PreplyReviewItem[];
  fetchedAt: string;
  source: 'live-preply';
}

interface StudentProfileOverride {
  id?: string;
  quoteSnippet: string;
  firstName: string;
  country: string;
  avatar: string;
}

const STUDENT_PROFILE_OVERRIDES: StudentProfileOverride[] = [
  {
    id: '1383945',
    quoteSnippet: 'melissa is a really kind person',
    firstName: 'Mariagiulia',
    country: 'Italy',
    avatar: '/assets/avatars/mariagiulia.jpg',
  },
  {
    id: '640906',
    quoteSnippet: 'very dedicated to the learning experience',
    firstName: 'Natasha',
    country: 'USA',
    avatar: '/assets/avatars/natasha.jpg',
  },
  {
    id: '583853',
    quoteSnippet: 'melissa is fantastic. super involved',
    firstName: 'Logan',
    country: 'UK',
    avatar: '/assets/avatars/logan.jpg',
  },
  {
    id: '829904',
    quoteSnippet: 'already feel more confident with my spanish',
    firstName: 'Kaila',
    country: 'Australia',
    avatar: '/assets/avatars/kaila.jpg',
  },
  {
    id: '705386',
    quoteSnippet: "i can't recommend melissa enough",
    firstName: 'Fahad',
    country: 'Saudi Arabia',
    avatar: '/assets/avatars/fahad.jpg',
  },
  {
    id: '509163',
    quoteSnippet: 'she has great energy, is patient',
    firstName: 'Adam',
    country: 'USA',
    avatar: '/assets/avatars/adam.jpg',
  },
  {
    id: '506879',
    quoteSnippet: 'wonderful teacher, me encantan nuestras clases',
    firstName: 'Tanya',
    country: 'Denmark',
    avatar: '/assets/avatars/tanya.jpg',
  },
  {
    id: '583617',
    quoteSnippet: 'very patient, frienly and super fun to work with',
    firstName: 'Sophia',
    country: 'Canada',
    avatar: '/assets/avatars/sophia.jpg',
  },
  {
    id: '582892',
    quoteSnippet: 'very patient and fun to learn from',
    firstName: 'Jack',
    country: 'Ireland',
    avatar: '/assets/avatars/jack.jpg',
  },
  {
    id: '506135',
    quoteSnippet: 'proportional and patient',
    firstName: 'Daniel',
    country: 'Germany',
    avatar: '/assets/avatars/daniel.jpg',
  },
  {
    id: 'ceren-tr',
    quoteSnippet: "best gift i've ever given to myself",
    firstName: 'Ceren',
    country: 'Türkiye',
    avatar: '/assets/avatars/ceren.jpg',
  },
];

const FALLBACK_ANONYMOUS_PROFILES: Array<{ firstName: string; avatar: string }> = [
  { firstName: 'Sophia', avatar: '/assets/avatars/sophia.jpg' },
  { firstName: 'Daniel', avatar: '/assets/avatars/daniel.jpg' },
  { firstName: 'Jack', avatar: '/assets/avatars/jack.jpg' },
];

export const CEREN_REVIEW: PreplyReviewItem = {
  id: 'ceren-tr',
  firstName: 'Ceren',
  country: 'Türkiye',
  quote:
    "Melissa’s lessons were the best gift I've ever given to myself. Now I even love this language more ♥ Gracias Melissa! Look forward to having more fun together learning Spanish.😊",
  rating: 5,
  avatar: '/assets/avatars/ceren.jpg',
  createdAt: '2025-01-15T12:00:00Z',
  lessonCount: null,
};

export function enrichReviewsWithStudentProfiles(
  reviews: PreplyReviewItem[],
  includeCeren = true
): PreplyReviewItem[] {
  let anonIdx = 0;

  const enriched: PreplyReviewItem[] = reviews.map((review): PreplyReviewItem => {
    const normalizedQuote = review.quote.toLowerCase().replace(/\s+/g, ' ').trim();
    const matched = STUDENT_PROFILE_OVERRIDES.find(
      (ov) =>
        (ov.id && ov.id === review.id) ||
        normalizedQuote.includes(ov.quoteSnippet)
    );

    if (matched) {
      return {
        ...review,
        firstName: matched.firstName,
        country: matched.country,
        avatar: matched.avatar,
      };
    }

    const trimmedName = (review.firstName || '').trim();
    const isGenericName =
      !trimmedName ||
      trimmedName === 'Preply Student' ||
      trimmedName === 'Verified Student' ||
      trimmedName.toLowerCase() === 'anonymous';

    if (isGenericName) {
      const fallbackPersona =
        FALLBACK_ANONYMOUS_PROFILES[anonIdx % FALLBACK_ANONYMOUS_PROFILES.length];
      anonIdx += 1;
      return {
        ...review,
        firstName: fallbackPersona.firstName,
        avatar: review.avatar || fallbackPersona.avatar,
      };
    }

    return {
      ...review,
      firstName: trimmedName,
      avatar:
        review.avatar ||
        FALLBACK_ANONYMOUS_PROFILES[anonIdx++ % FALLBACK_ANONYMOUS_PROFILES.length].avatar,
    };
  });

  if (includeCeren) {
    const cerenIndex = enriched.findIndex(
      (r) =>
        r.id === CEREN_REVIEW.id ||
        r.quote.toLowerCase().includes("best gift i've ever given to myself")
    );
    if (cerenIndex === -1) {
      enriched.unshift(CEREN_REVIEW);
    } else if (cerenIndex > 0) {
      const [cerenItem] = enriched.splice(cerenIndex, 1);
      enriched.unshift(cerenItem);
    }
  }

  return enriched;
}

interface NextDataReview {
  id?: string | number;
  score?: number;
  content?: string;
  created?: string;
  language?: string;
  translations?: Array<{ language?: string; content?: string }>;
  reviewerInfo?: { lessonCount?: number | null };
  user?: {
    firstName?: string;
    profile?: {
      avatarUrlHttps?: string;
    };
  };
}

interface NextDataPageProps {
  reviews?: NextDataReview[];
  reviewDistribution?: {
    nr1Stars?: number;
    nr2Stars?: number;
    nr3Stars?: number;
    nr4Stars?: number;
    nr5Stars?: number;
  };
}

function sanitizeAvatarUrl(rawUrl?: string | null): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith('https://')) return null;
  if (trimmed.includes('avatar-placeholder')) return null;
  return trimmed;
}

function pickQuote(review: NextDataReview): string {
  const original = (review.content || '').trim();
  if (original) return original;
  if (Array.isArray(review.translations)) {
    const en = review.translations.find((t) => t.language === 'en')?.content?.trim();
    if (en) return en;
    const es = review.translations.find((t) => t.language === 'es')?.content?.trim();
    if (es) return es;
    const any = review.translations.find((t) => Boolean(t.content?.trim()))?.content?.trim();
    if (any) return any;
  }
  return '';
}

export function parsePreplyHtmlReviews(
  html: string,
  profileUrl = PREPLY_PROFILE_URL
): PreplyReviewsResponse {
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (nextDataMatch?.[1]) {
    try {
      const parsed = JSON.parse(nextDataMatch[1]) as {
        props?: { pageProps?: NextDataPageProps };
      };
      const pageProps = parsed?.props?.pageProps;
      const rawReviews = Array.isArray(pageProps?.reviews) ? pageProps.reviews : [];

      const seenIds = new Set<string>();
      const seenQuotes = new Set<string>();
      const parsedReviews: PreplyReviewItem[] = rawReviews
        .map((r, idx): PreplyReviewItem | null => {
          const quote = pickQuote(r);
          if (!quote) return null;
          const id = String(r.id ?? `student-${idx + 1}`);
          const normalizedQuote = quote.toLowerCase().replace(/\s+/g, ' ').trim();
          if (seenIds.has(id) || seenQuotes.has(normalizedQuote)) {
            return null;
          }
          seenIds.add(id);
          seenQuotes.add(normalizedQuote);

          const rawName = (r.user?.firstName || '').trim();
          const score = Number(r.score);
          const rating = Number.isFinite(score) ? Math.min(5, Math.max(1, score)) : 5;
          const lessonCount =
            typeof r.reviewerInfo?.lessonCount === 'number' && r.reviewerInfo.lessonCount > 0
              ? r.reviewerInfo.lessonCount
              : null;

          return {
            id,
            firstName: rawName || 'Verified Student',
            quote,
            rating,
            avatar: sanitizeAvatarUrl(r.user?.profile?.avatarUrlHttps),
            createdAt: r.created || '',
            lessonCount,
          };
        })
        .filter((item): item is PreplyReviewItem => item !== null);

      const reviews = enrichReviewsWithStudentProfiles(parsedReviews, false);

      const dist = pageProps?.reviewDistribution;
      let totalReviews = reviews.length;
      let averageRating = 5.0;

      if (dist) {
        const c1 = Number(dist.nr1Stars || 0);
        const c2 = Number(dist.nr2Stars || 0);
        const c3 = Number(dist.nr3Stars || 0);
        const c4 = Number(dist.nr4Stars || 0);
        const c5 = Number(dist.nr5Stars || 0);
        const sumCount = c1 + c2 + c3 + c4 + c5;
        if (sumCount > 0) {
          totalReviews = sumCount;
          const weighted = c1 * 1 + c2 * 2 + c3 * 3 + c4 * 4 + c5 * 5;
          averageRating = Math.round((weighted / sumCount) * 10) / 10;
        }
      } else if (reviews.length > 0) {
        const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        averageRating = Math.round(avg * 10) / 10;
      }

      if (reviews.length > 0) {
        return {
          profileUrl,
          averageRating,
          totalReviews,
          reviews,
          fetchedAt: new Date().toISOString(),
          source: 'live-preply',
        };
      }
    } catch {
      // Fallback to JSON-LD parser below
    }
  }

  // Secondary fallback: schema.org Product JSON-LD reviews
  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const match of ldMatches) {
    try {
      const ld = JSON.parse(match[1]) as {
        review?: Array<{
          author?: { name?: string };
          datePublished?: string;
          reviewBody?: string;
          reviewRating?: { ratingValue?: string | number };
        }>;
      };
      if (Array.isArray(ld.review) && ld.review.length > 0) {
        const parsedReviews: PreplyReviewItem[] = ld.review
          .map((r, idx): PreplyReviewItem | null => {
            const quote = (r.reviewBody || '').trim();
            if (!quote) return null;
            const author = (r.author?.name || '').trim();
            const firstName =
              !author || author.toLowerCase() === 'anonymous' ? 'Verified Student' : author;
            const ratingVal = Number(r.reviewRating?.ratingValue);
            return {
              id: `ld-${idx + 1}`,
              firstName,
              quote,
              rating: Number.isFinite(ratingVal) ? Math.min(5, Math.max(1, ratingVal)) : 5,
              avatar: null,
              createdAt: r.datePublished || '',
              lessonCount: null,
            };
          })
          .filter((item): item is PreplyReviewItem => item !== null);

        const reviews = enrichReviewsWithStudentProfiles(parsedReviews, false);

        if (reviews.length > 0) {
          const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
          return {
            profileUrl,
            averageRating: Math.round(avg * 10) / 10,
            totalReviews: reviews.length,
            reviews,
            fetchedAt: new Date().toISOString(),
            source: 'live-preply',
          };
        }
      }
    } catch {
      // continue checking next LD block
    }
  }

  throw new Error('Could not parse reviews from live reviews profile page.');
}

export async function fetchLivePreplyReviews(
  tutorId = PREPLY_TUTOR_ID
): Promise<PreplyReviewsResponse> {
  const safeTutorId = /^\d+$/.test(tutorId) ? tutorId : PREPLY_TUTOR_ID;
  const targetUrl = `https://preply.com/es/profesor/${safeTutorId}`;

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Preply responded with status ${response.status}`);
  }

  const html = await response.text();
  return parsePreplyHtmlReviews(html, targetUrl);
}
