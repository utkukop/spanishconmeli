export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2+';

export interface QuizOption {
  id: string;
  text: string;
  points: number; // points towards score (0 to 10)
  levelIndicator: CEFRLevel;
  feedback?: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: string;
  title: string;
  category: string; // can be custom e.g., 'Real Dialogue', 'Slang', 'Grammar', 'Günlük Konuşma'
  scenario: string;
  audioPhrase?: string; // for speech synthesis
  options: QuizOption[];
  explanation?: string;
}

export interface LevelThresholdConfig {
  level: CEFRLevel;
  title: string;
  summary: string;
  recommendedCourseId: string;
  strengths: string[];
  focusAreas: string[];
  actionPlan: string[];
}

export interface QuizConfig {
  badgeTitle: string;
  backButtonText: string;
  listenAudioText: string;
  previousButtonText: string;
  nextButtonText: string;
  finishButtonText: string;
  leadTitle: string;
  leadSubtitle: string;
  leadNameLabel: string;
  leadEmailLabel: string;
  leadSubmitButtonText: string;
  leadPrivacyNotice: string;
  resultsBadgeText: string;
  resultsLevelLabel: string;
  resultsStrengthsTitle: string;
  resultsFocusTitle: string;
  resultsActionPlanTitle: string;
  resultsRecommendedCourseBadge: string;
  resultsCourseCtaText: string;
  resultsRetakeText: string;
  speechSynthesisLanguage: string; // e.g. 'es-ES', 'en-US', 'tr-TR'
  levelThresholds?: LevelThresholdConfig[];
}

export interface QuizEvaluation {
  level: CEFRLevel;
  title: string;
  summary: string;
  scorePercentage: number;
  totalPoints: number;
  maxPoints: number;
  strengths: string[];
  focusAreas: string[];
  recommendedCourseId: string;
  actionPlan: string[];
}

export interface CoursePackage {
  id: string;
  lessonsCount: number;
  price: number;
  perLesson: number;
  label: string;
  popular?: boolean;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  badge?: string;
  level: string; // e.g., 'A0–A1 Level' or 'All Levels'
  duration: string;
  price: number;
  originalPrice?: number;
  regularPrice?: number;
  earlyBirdPrice?: number;
  currency?: string; // e.g., '$', '€'
  image: string;
  secondaryImage?: string;
  features: string[];
  syllabus: { title: string; desc: string }[];
  ctaText: string;
  popular?: boolean;
  packages?: CoursePackage[];
}

export interface ResourceItem {
  id: string;
  type: 'podcast' | 'article' | 'cheatsheet';
  title: string;
  description: string;
  durationOrPages: string;
  level: string;
  category: string;
  audioSampleUrl?: string;
  audioTitle?: string;
  downloadUrl?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  countryFlag: string;
  quote: string;
  resultAchieved: string;
  rating: number;
  courseTaken: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: 'quiz' | 'newsletter' | 'course_waitlist';
  quizLevel?: CEFRLevel;
  quizScore?: number;
  createdAt: string;
}

export interface ComparisonItem {
  situation: string;
  textbook: string;
  meliMethod: string;
}

export interface PillarItem {
  title: string;
  desc: string;
  iconType?: string;
}

export interface NavLinkItem {
  id: string;
  label: string;
  view: 'home' | 'quiz' | 'courses' | 'resources' | 'about';
}

export interface SiteConfig {
  // General & Header
  siteName: string;
  brandTagline: string;
  currencySymbol: string; // e.g. '€', '$', '₺'
  announcementActive: boolean;
  announcementText: string;
  announcementLinkText: string;
  headerCtaText: string;
  navLinks: NavLinkItem[];

  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaPrimaryText: string;
  heroCtaSecondaryText: string;
  heroBullets: string[];
  heroStatRating: string;
  heroStatReviews: string;
  heroStatCommunity: string;

  // Methodology Section
  methodologyKicker: string;
  methodologyTitle: string;
  methodologySubtitle: string;
  methodologyComparisons: ComparisonItem[];
  methodologyPillars: PillarItem[];

  // About Meli Section
  teacherName: string;
  teacherTitle: string;
  teacherBio: string;
  teacherBioParagraph2: string;
  teacherQuote: string;
  teacherImage: string;
  instagramHandle: string;
  youtubeHandle: string;
  spotifyHandle: string;

  // Footer & Newsletter
  footerDescription: string;
  footerCopyright: string;
  footerAddress: string;
  footerNewsletterTitle: string;
  footerNewsletterDesc: string;
  newsletterDiscountCode: string;

  // Customizable Quiz UI & Localization
  quizConfig: QuizConfig;
}

export interface WebsiteData {
  siteConfig: SiteConfig;
  courses: Course[];
  resources: ResourceItem[];
  testimonials: Testimonial[];
  quizQuestions: QuizQuestion[];
  leads: Lead[];
  lastPublishedAt?: string;
}
