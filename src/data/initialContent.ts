import { Course, QuizConfig, QuizQuestion, ResourceItem, SiteConfig, Testimonial } from '../types';

export const INITIAL_QUIZ_CONFIG: QuizConfig = {
  badgeTitle: 'Conversational Level Assessment',
  backButtonText: 'Back to website',
  listenAudioText: 'Listen in Spanish',
  previousButtonText: 'Previous',
  nextButtonText: 'Next',
  finishButtonText: 'Finish & View Level',
  leadTitle: "You've completed all questions!",
  leadSubtitle: 'Enter your details to calculate your estimated level, strengths breakdown, and custom action roadmap.',
  leadNameLabel: 'Your Name',
  leadEmailLabel: 'Your Email Address',
  leadSubmitButtonText: 'View My Level & Roadmap',
  leadPrivacyNotice: '100% spam-free. Only useful learning tips and resources.',
  resultsBadgeText: 'Assessment Completed',
  resultsLevelLabel: 'Estimated CEFR Level:',
  resultsStrengthsTitle: 'Your Strengths',
  resultsFocusTitle: 'Next Growth Areas',
  resultsActionPlanTitle: 'Your Personalized 3-Step Action Plan:',
  resultsRecommendedCourseBadge: 'Recommended Program for Your Level',
  resultsCourseCtaText: 'View Course Details',
  resultsRetakeText: 'Retake the assessment with different answers',
  speechSynthesisLanguage: 'es-ES',
};

export const INITIAL_SITE_CONFIG: SiteConfig = {
  // General & Header
  siteName: 'spanishconmeli',
  brandTagline: '¡Hola! Real-life Spanish taught with warmth and confidence.',
  currencySymbol: '$',
  announcementActive: false,
  announcementText: '',
  announcementLinkText: '',
  headerCtaText: 'Book your trial lesson · $5',
  calLink: 'https://cal.com/melissa-anchelia-54kwyd/30min',
  navLinks: [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'courses', label: 'Courses', view: 'courses' },
    { id: 'about', label: 'About me', view: 'about' },
    { id: 'contact', label: 'Contact', view: 'contact' },
  ],

  // Hero Section
  heroBadge: '¡Hola! Live Online Spanish Classes',
  heroHeadline: 'Speak real Spanish with warmth and confidence. ¡Hablemos!',
  heroSubtitle:
    'Leave stiff textbook drills behind. Learn how people actually speak over coffee, travels, and dinners with friends through friendly live classes with Meli.',
  heroImage: '',
  heroCtaPrimaryText: 'Book your trial lesson · $5',
  heroCtaSecondaryText: 'Explore courses',
  heroBullets: [
    'Friendly live lessons in small groups or 1-on-1',
    'Practical Spanish for real-life conversations',
    'Free 30-minute trial lesson to get started',
  ],
  heroStatRating: '4.9 / 5',
  heroStatReviews: 'from happy international students',
  heroStatCommunity: 'Daily Spanish on Instagram @spanishconmeli',

  // Methodology / Conversation Section
  methodologyKicker: '¡Hablemos!',
  methodologyTitle: 'Why do so many students freeze when trying to speak?',
  methodologySubtitle:
    'Most classrooms focus on memorizing rules. With Meli, you practice the natural phrases, rhythm, and confidence real native speakers use every day.',
  methodologyComparisons: [
    {
      situation: 'Ordering coffee or tapas at a lively café',
      textbook: '«¿Desea usted servirme un vaso de agua mineral fría?»',
      meliMethod: '«¿Me pones un café con leche, porfa?»',
    },
    {
      situation: 'Agreeing warmly with a friend',
      textbook: '«Concuerdo plenamente con su respetable opinión.»',
      meliMethod: '«¡Totalmente! ¡Claro que sí!»',
    },
    {
      situation: 'Making weekend plans',
      textbook: '«¿Tiene usted la intención de realizar actividades el sábado?»',
      meliMethod: '«¿Qué plan tienes este finde? ¡Vamos a tomar algo!»',
    },
  ],
  methodologyPillars: [
    {
      title: 'Speak from Day One',
      desc: 'Warm, judgment-free live practice so you feel comfortable forming sentences right away.',
    },
    {
      title: 'Real-Life Vocabulary',
      desc: 'Learn the everyday expressions and natural fillers locals actually use in conversation.',
    },
    {
      title: 'Your Pace, Your Goals',
      desc: 'Choose an intimate 4–6 student beginner group or flexible 1-on-1 private lessons tailored to you.',
    },
  ],

  // About Meli Section
  teacherName: 'Meli',
  teacherTitle: 'Your Native Spanish Teacher',
  teacherBio:
    "¡Hola! I'm Meli, a native Spanish teacher who believes learning a language should feel like catching up with a friend over coffee—not sitting through a stressful exam.",
  teacherBioParagraph2:
    "Whether you're starting completely from scratch in a supportive small group or polishing your fluency in 1-on-1 private classes, my goal is to help you speak naturally, laugh in Spanish, and feel genuinely at home in any conversation.",
  teacherQuote: '«You don’t learn Spanish to pass a test—you learn it to connect with real people.»',
  teacherImage: '',
  instagramHandle: '@spanishconmeli',
  youtubeHandle: '',
  spotifyHandle: '',

  // Footer
  footerDescription:
    'Warm, practical online Spanish classes for real-life conversation. ¡Vamos a hablar español!',
  footerCopyright: '© 2026 spanishconmeli. All rights reserved.',
  footerAddress: 'Toronto, Ontario, Canada',
  footerNewsletterTitle: '',
  footerNewsletterDesc: '',
  newsletterDiscountCode: '',

  // Quiz config (kept for internal type compatibility)
  quizConfig: INITIAL_QUIZ_CONFIG,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-group-a0a1',
    title: 'A0–A1 Small Group Spanish Cohort',
    tagline: 'From zero to basic practical Spanish in small, engaging groups of 4–6 students with live weekly classes.',
    badge: 'Small Groups · 4–6 Students',
    level: 'A0–A1 Level',
    duration: '10 Weeks · 75 min / week',
    price: 115,
    originalPrice: 150,
    regularPrice: 150,
    earlyBirdPrice: 115,
    currency: '$',
    popular: true,
    image: '/assets/aistudio/1_5c6929e2.jfif',
    secondaryImage: '/assets/aistudio/2_b2d4e231.jfif',
    features: [
      'A0–A1 level: From zero to basic Spanish',
      'Small groups: 4–6 students for plenty of speaking practice',
      '10 weeks: 1 live class per week',
      '75 minutes each: Live and interactive classes',
      'Online via Google Meet: Join comfortably from anywhere',
      'Materials included: Weekly materials and practice activities',
      'Practical Spanish for real-life situations',
      'Early Bird Special: $115 USD (Save $35 USD from $150 regular price)',
    ],
    syllabus: [
      { title: 'Weeks 1–3: The Essentials & First Words', desc: 'Introductions, sounds, survival vocabulary, and asking questions naturally.' },
      { title: 'Weeks 4–7: Everyday Real Situations', desc: 'Ordering at cafés, asking directions, making plans, and daily routine conversations.' },
      { title: 'Weeks 8–10: Expressing Opinions & Live Scenarios', desc: 'Connecting sentences, sharing thoughts, and interactive live speaking roleplays.' },
    ],
    ctaText: 'Reserve Group Spot ($115 USD)',
  },
  {
    id: 'course-private-1on1',
    title: 'Online Spanish Private Lessons',
    tagline: 'Personalized 1-on-1 Spanish classes tailored to your pace, schedule, and individual goals.',
    badge: 'Free 30-Min Trial Included',
    level: 'All Levels',
    duration: 'Flexible · 1-Hour Live Classes',
    price: 80,
    currency: '$',
    popular: false,
    image: '/assets/aistudio/3_2987371e.jfif',
    secondaryImage: '/assets/aistudio/4_0bf6d073.jfif',
    packages: [
      { id: '4-lessons', lessonsCount: 4, price: 80, perLesson: 20, label: '4 Lessons / Month', popular: false },
      { id: '8-lessons', lessonsCount: 8, price: 144, perLesson: 18, label: '8 Lessons / Month', popular: true },
      { id: '12-lessons', lessonsCount: 12, price: 192, perLesson: 16, label: '12 Lessons / Month', popular: false },
    ],
    features: [
      'One-to-one lessons: Personalized Spanish classes',
      'Flexible schedule: Choose the days and times that work for you',
      '1-hour classes: Live, interactive lessons on Google Meet',
      'Grammar, vocabulary, conversation, and pronunciation',
      'Materials included: Shared after each lesson with practice activities',
      'Support for your questions between lessons',
      'Free 30-minute trial lesson before choosing a package',
    ],
    syllabus: [
      { title: 'Trial Chat & Custom Plan', desc: 'Assessing your goals and building a friendly, realistic speaking roadmap.' },
      { title: 'Live 1-on-1 Practice', desc: 'Real conversation, gentle feedback, and natural pronunciation tips.' },
      { title: 'Between-Class Support', desc: 'Weekly curated activities and quick help whenever questions come up.' },
    ],
    ctaText: 'Inquire & Reserve Package',
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    location: 'London, United Kingdom',
    countryFlag: '🇬🇧',
    quote:
      'I spent 3 years on apps and completely froze the first time I walked into a café in Valencia. With Meli, I learned what to actually say and lost my fear of speaking within weeks.',
    resultAchieved: 'Went from stage fright to full dinner conversations',
    rating: 5,
    courseTaken: '1-on-1 Private Lessons',
  },
  {
    id: 'test-2',
    name: 'Lukas Meyer',
    location: 'Toronto, Canada',
    countryFlag: '🇨🇦',
    quote:
      'Meli makes every class feel warm and relaxed. Instead of endless drills, we talk about real life and laugh a lot—my confidence skyrocketed.',
    resultAchieved: 'Started speaking comfortably on trips to Mexico & Spain',
    rating: 5,
    courseTaken: '1-on-1 Private Lessons',
  },
  {
    id: 'test-3',
    name: 'Chloe Dupont',
    location: 'Montreal, Canada',
    countryFlag: '🇨🇦',
    quote:
      'The small group classes are so encouraging! Having only a few students meant I got to speak every single session without ever feeling overwhelmed.',
    resultAchieved: 'Built a real beginner foundation from zero in 10 weeks',
    rating: 5,
    courseTaken: 'A0–A1 Small Group Cohort',
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'The Tapas Bar Test',
    category: 'Real Dialogue',
    scenario:
      'You walk into a buzzing café in Madrid. You want a small draft beer and an order of olives. What is the most natural way to order from the bartender?',
    audioPhrase: '¿Me pones una caña y unas aceitunas, porfa?',
    explanation:
      'In Spain, "una caña" is the universal term for small draft beer, and "poner" is standard for ordering warmly without sounding distant.',
    options: [
      {
        id: 'q1_o1',
        text: 'Yo deseo tomar un vaso de cerveza con aceitunas, gracias.',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'Grammatically sound, but stiff and overly formal for an everyday bar.',
      },
      {
        id: 'q1_o2',
        text: '¿Me pones una caña y una de aceitunas, porfa?',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: 'Spot on! 100% natural, colloquial, and friendly.',
      },
      {
        id: 'q1_o3',
        text: 'Quiero una cerveza y aceitunas, por favor.',
        points: 5,
        levelIndicator: 'A2',
        feedback: 'Understood, but slightly blunt and typical of early beginners.',
      },
      {
        id: 'q1_o4',
        text: '¿Tiene cerveza disponible?',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'In Spain bars always have beer; asking if it is available sounds awkward.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'Street Slang & Idioms',
    category: 'Street Slang',
    scenario:
      'A friend shows you photos from Granada and excitedly says: "¡Tío, lo pasamos bomba, la Alhambra mola un mazo!" What did they mean?',
    audioPhrase: '¡Tío, lo pasamos bomba, la Alhambra mola un mazo!',
    explanation:
      '"Pasarlo bomba" means to have an absolute blast, and "molar un mazo" means to love something intensely.',
    options: [
      {
        id: 'q2_o1',
        text: 'There was an explosion nearby and the monument was closed.',
        points: 0,
        levelIndicator: 'A1',
        feedback: 'Beware of literal traps: "bomba" in this context means great fun.',
      },
      {
        id: 'q2_o2',
        text: 'It was a boring and expensive trip.',
        points: 0,
        levelIndicator: 'A1',
        feedback: 'Quite the opposite: they were ecstatic.',
      },
      {
        id: 'q2_o3',
        text: 'They had an absolute blast and found the Alhambra incredible.',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: 'Brilliant! You grasp colloquial idioms like a local.',
      },
      {
        id: 'q2_o4',
        text: 'They purchased heavy wooden souvenirs.',
        points: 2,
        levelIndicator: 'A2',
        feedback: '"Mazo" in colloquial Spanish means "a ton / a lot".',
      },
    ],
  },
  {
    id: 'q3',
    title: 'Everyday Dilemma: Por vs. Para?',
    category: 'Grammar in Context',
    scenario:
      'At a dinner, someone asks why you are learning Spanish. You want to say: "I study Spanish to travel and out of love for the culture."',
    audioPhrase: 'Estudio español para viajar y por amor a la cultura.',
    explanation:
      '"Para" expresses future purpose or goal, while "por" conveys motivation, cause, or internal reason.',
    options: [
      {
        id: 'q3_o1',
        text: 'Estudio español por viajar y para amor a la cultura.',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'Inverted prepositions: purpose takes para, cause takes por.',
      },
      {
        id: 'q3_o2',
        text: 'Estudio español para viajar y por amor a la cultura.',
        points: 10,
        levelIndicator: 'B1',
        isCorrect: true,
        feedback: 'Flawless! Goal (travel) takes para; motivation (love) takes por.',
      },
      {
        id: 'q3_o3',
        text: 'Estudio español para viajar y para amor de la cultura.',
        points: 5,
        levelIndicator: 'A2',
        feedback: 'Close, but "por amor" is the fixed natural collocation.',
      },
    ],
  },
  {
    id: 'q4',
    title: 'Spontaneous Reaction in Dialogue',
    category: 'Real Dialogue',
    scenario:
      'A colleague tells you they just won two free tickets to a sold-out concert this Friday. What is the most natural reply?',
    audioPhrase: '¡No me digas! ¡Qué suerte tienes!',
    explanation:
      '"¡No me digas!" and "¡Qué pasada!" are conversational reactions that prove active native listening.',
    options: [
      {
        id: 'q4_o1',
        text: 'Eso es información interesante para mí.',
        points: 1,
        levelIndicator: 'A1',
        feedback: 'Sounds like automated machine translation.',
      },
      {
        id: 'q4_o2',
        text: '¡No me digas! ¡Qué pasada, qué suerte tienes!',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: 'Total natural ease! Connects emotionally right away.',
      },
      {
        id: 'q4_o3',
        text: '¡Muy bien por ti!',
        points: 4,
        levelIndicator: 'A2',
        feedback: 'Literal translation of "Good for you", sounds a bit dry.',
      },
      {
        id: 'q4_o4',
        text: 'Felicidades señor.',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'Far too formal for a friend or peer.',
      },
    ],
  },
  {
    id: 'q5',
    title: 'The Hidden Subjunctive Challenge',
    category: 'Grammar in Context',
    scenario: 'Your host in Madrid says: "Call me as soon as you _____ home so I can hand you the spare keys."',
    audioPhrase: 'Llámame en cuanto llegues a casa.',
    explanation:
      'Time clauses referring to a future anticipated event with "en cuanto", "cuando", or "tan pronto como" require the subjunctive.',
    options: [
      {
        id: 'q5_o1',
        text: 'llegas',
        points: 3,
        levelIndicator: 'A2',
        feedback: 'Indicative is used for habitual or past actions, not expected future actions.',
      },
      {
        id: 'q5_o2',
        text: 'llegues',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: 'Spot on! "En cuanto + future" triggers the present subjunctive.',
      },
      {
        id: 'q5_o3',
        text: 'llegar',
        points: 1,
        levelIndicator: 'A1',
        feedback: 'Needs to be conjugated for "tú".',
      },
    ],
  },
  {
    id: 'q6',
    title: 'Fast-Paced Listening Comprehension',
    category: 'Listening',
    scenario:
      'You overhear two locals saying goodbye at the station: "¡Bueno, que te vaya genial, nos vemos el finde, cuídate!". When will they meet again?',
    audioPhrase: '¡Bueno, que te vaya genial, nos vemos el finde, cuídate!',
    explanation:
      '"El finde" is the universal conversational shorthand for "el fin de semana" (the weekend).',
    options: [
      {
        id: 'q6_o1',
        text: 'Tomorrow morning',
        points: 1,
        levelIndicator: 'A1',
      },
      {
        id: 'q6_o2',
        text: 'At the end of the month',
        points: 2,
        levelIndicator: 'A2',
      },
      {
        id: 'q6_o3',
        text: 'This coming weekend (Saturday / Sunday)',
        points: 10,
        levelIndicator: 'B1',
        isCorrect: true,
        feedback: 'Correct! "El finde" = weekend.',
      },
    ],
  },
  {
    id: 'q7',
    title: 'Your Main Speaking Hurdle',
    category: 'Goals & Mindset',
    scenario: 'When trying to hold a Spanish conversation with native speakers today, what holds you back most?',
    options: [
      {
        id: 'q7_o1',
        text: 'I freeze up and translate every single word word-by-word from English.',
        points: 3,
        levelIndicator: 'A1',
        feedback: 'We will train your mental bank of automatic conversational chunks.',
      },
      {
        id: 'q7_o2',
        text: 'I understand quite well when reading, but when locals speak fast I get lost.',
        points: 6,
        levelIndicator: 'A2',
        feedback: 'Your focus will be fast-speech audio training with real accents.',
      },
      {
        id: 'q7_o3',
        text: 'I can communicate my point, but make grammar errors and lack varied vocabulary.',
        points: 8,
        levelIndicator: 'B1',
        feedback: 'You are close to flow: idioms and spontaneity will get you there.',
      },
      {
        id: 'q7_o4',
        text: 'I speak with flow, but want to sound 100% natural, master humor and subtle nuances.',
        points: 10,
        levelIndicator: 'B2+',
        feedback: 'Awesome! Advanced debate, cultural nuance, and high-level conversational challenges suit you best.',
      },
    ],
  },
];
