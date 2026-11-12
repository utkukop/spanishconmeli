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
  brandTagline: 'Learn the Spanish people actually speak on the streets',
  currencySymbol: '€',
  announcementActive: true,
  announcementText: '🔥 New Subjunctive Mastery Intensive now live! 15% off with code MELI15',
  announcementLinkText: 'View course',
  headerCtaText: 'Take Level Quiz',
  navLinks: [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'quiz', label: 'Level Quiz', view: 'quiz' },
    { id: 'courses', label: 'Courses', view: 'courses' },
    { id: 'about', label: 'About Meli', view: 'about' },
  ],

  // Hero Section
  heroBadge: 'Direct Conversational Immersion · Over 45,000 Students Worldwide',
  heroHeadline: 'Speak real Spanish with confidence—never freeze up in conversation again.',
  heroSubtitle:
    'Leave behind artificial textbook dialogues and endless grammar drills. Learn to express yourself naturally in tapas bars, travels, and lively dinners with friends through bite-sized, practical lessons.',
  heroImage: '',
  heroCtaPrimaryText: 'Take Free Level Quiz',
  heroCtaSecondaryText: 'Explore Courses & Pricing',
  heroBullets: [
    'Real conversational Spanish from Spain and Latin America',
    'Authentic street dialogues without robotic grammar formulas',
    'Diagnostic level assessment in 3 minutes',
  ],
  heroStatRating: '4.9 / 5',
  heroStatReviews: 'from 1,800+ international students',
  heroStatCommunity: 'Global community on Instagram @spanishconmeli',

  // Methodology Section
  methodologyKicker: 'The Core Difference',
  methodologyTitle: 'Why do so many students freeze when trying to speak?',
  methodologySubtitle:
    'Traditional academies teach Spanish from 40 years ago. At spanishconmeli, you learn the phrases, slang, and conversational rhythm real native speakers use today.',
  methodologyComparisons: [
    {
      situation: 'Ordering tapas and a drink at a busy bar',
      textbook: '«¿Desea usted servirme un vaso de agua mineral fría?» (Stiff, robotic—nobody talks like this)',
      meliMethod: '«¿Me pones un vaso de agua del tiempo, porfa?» (Warm, natural, and effortless)',
    },
    {
      situation: 'Agreeing enthusiastically with a friend',
      textbook: '«Yo concuerdo plenamente con su respetable opinión.»',
      meliMethod: '«¡Totalmente!», «Tal cual», «¡Ya te digo!»',
    },
    {
      situation: 'Making plans for the weekend',
      textbook: '«¿Tiene usted la intención de realizar actividades el sábado?»',
      meliMethod: '«¿Qué plan tienes para el finde? ¿Nos tomamos unas cañas?»',
    },
  ],
  methodologyPillars: [
    {
      title: 'Colloquial Immersion',
      desc: 'Master the natural conversational fillers and idioms that make your Spanish sound warm and spontaneous from day one.',
    },
    {
      title: 'Fast-Speech Ear Training',
      desc: 'Listen to dialogues at real native tempo so you never lose the thread when locals speak quickly.',
    },
    {
      title: 'Zero-Hesitation Fluency',
      desc: 'Techniques for instant verbal response and reformulating your thoughts without mentally conjugating verbs first.',
    },
  ],

  // About Meli Section
  teacherName: 'Meli',
  teacherTitle: 'Your Conversational Spanish Mentor',
  teacherBio:
    "¡Hola! I'm Meli, a native Spanish teacher obsessed with genuine human communication. After over 8 years of mentoring thousands of international learners, I discovered why so many get stuck: standard schools teach you to pass exams, not how to joke with a bartender or understand stories around a dinner table.",
  teacherBioParagraph2:
    "I have lived in Madrid and traveled extensively throughout Andalusia, Mexico, and Colombia. I know precisely which idioms cause confusion, why learners freeze when speaking with groups of natives, and how to unlock spontaneous conversation with humor and zero stress.",
  teacherQuote: '«You do not learn Spanish to pass a test—you learn it to connect with real people.»',
  teacherImage: '',
  instagramHandle: '@spanishconmeli',
  youtubeHandle: '',
  spotifyHandle: '',

  // Footer & Newsletter
  footerDescription:
    'Learn the Spanish people actually speak on the street. The online school designed to give you the rhythm, humor, and natural ease of a true native speaker.',
  footerCopyright: 'All rights reserved.',
  footerAddress: 'Madrid, Spain',
  footerNewsletterTitle: 'Weekly Real Spanish Letter',
  footerNewsletterDesc:
    'Get 1 bite-sized conversational idiom every Tuesday plus a 15% discount code for your first course.',
  newsletterDiscountCode: 'MELI15',

  // Quiz config
  quizConfig: INITIAL_QUIZ_CONFIG,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-conversational',
    title: 'Speak with Confidence: Real Conversation',
    tagline: 'The intensive 8-week program to break through mental blocks and achieve spontaneous conversational flow.',
    badge: 'Most Popular',
    level: 'Levels A2 to B1',
    duration: '8 Weeks · Lifetime Access',
    price: 147,
    originalPrice: 220,
    currency: '€',
    popular: true,
    image: '',
    features: [
      '60+ authentic unscripted everyday audio dialogues',
      'Step-by-step breakdown of native idioms and fillers',
      'Fast-Reply and shadowing response drills',
      'Private student community with monthly feedback from Meli',
    ],
    syllabus: [
      { title: 'Module 1: Breaking the Ice', desc: 'Greetings, natural questions, and starting conversations with ease.' },
      { title: 'Module 2: Surviving & Thriving in Tapas Bars', desc: 'Ordering, asking for the check, banter, and understanding fast-talking servers.' },
      { title: 'Module 3: Storytelling in the Past', desc: 'Preterite vs. Imperfect explained with intuitive humor instead of grammar charts.' },
      { title: 'Module 4: Expressing Opinions & Banter', desc: 'Politely disagreeing, sharing viewpoints, and lively debate.' },
    ],
    ctaText: 'Enroll in Conversational Fluency',
  },
  {
    id: 'course-subjunctive',
    title: 'Subjunctive Without the Pain',
    tagline: 'Demystify the most feared topic in Spanish through practical real-life situations and emotions.',
    badge: 'Specialized',
    level: 'Levels B1 to B2+',
    duration: '4 Weeks · 24 Lessons',
    price: 89,
    originalPrice: 129,
    currency: '€',
    popular: false,
    image: '',
    features: [
      'Goodbye endless rules: logical triggers based on emotion, desire, and doubt',
      'Fixed conversational phrases that automatically trigger the subjunctive',
      'Downloadable mnemonic cheat sheets and contextual quizzes',
      'Certificate of completion upon finishing all challenge sets',
    ],
    syllabus: [
      { title: 'Lesson 1: Why the Subjunctive Exists', desc: 'The psychological mindset behind the mode of doubt and desire.' },
      { title: 'Lesson 2: Immediate Triggers', desc: 'Ojalá, para que, cuando, aunque... clear visual decision rules.' },
      { title: 'Lesson 3: Past Subjunctive in Real Talk', desc: 'How to use "hubiera" and "tuviera" like a lifelong native speaker.' },
    ],
    ctaText: 'Master the Subjunctive',
  },
  {
    id: 'course-fundamentals',
    title: 'Spanish for Travelers & Digital Nomads',
    tagline: 'Everything you need to navigate Spain and Latin America without relying on Google Translate.',
    badge: 'Beginner Friendly',
    level: 'Levels A1 to A2',
    duration: 'Self-Paced · 30 Core Guides',
    price: 49,
    originalPrice: 79,
    currency: '€',
    popular: false,
    image: '',
    features: [
      'Audio vocabulary guide for emergencies, transit, stays, and dining',
      'Essential vocabulary differences between Spain, Mexico, and Colombia',
      'Offline audio cheat sheets ready for planes, trains, and taxis',
    ],
    syllabus: [
      { title: 'Guide 1: Arrival & Transit', desc: 'Taxis, metro, airport navigation, and asking directions.' },
      { title: 'Guide 2: Stays & Accommodations', desc: 'Check-in, neighborhood shops, and handling queries in hotels and Airbnbs.' },
      { title: 'Guide 3: Connecting with Locals', desc: 'Warm courteous expressions that open doors instantly.' },
    ],
    ctaText: 'Explore Traveler Guide',
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
      'I spent 3 years on typical apps and completely froze the first time I walked into a café in Valencia. With Meli’s course, I learned exactly what to say, how to banter, and lost my fear of speaking within 3 weeks.',
    resultAchieved: 'Went from stage fright to enjoying full dinner conversations in Spanish',
    rating: 5,
    courseTaken: 'Speak with Confidence',
  },
  {
    id: 'test-2',
    name: 'Lukas Meyer',
    location: 'Berlin, Germany',
    countryFlag: '🇩🇪',
    quote:
      'Meli’s breakdown of the subjunctive is pure gold. The way she connects it to emotional triggers instead of 15 confusing rules saved me months of frustration.',
    resultAchieved: 'Passed the DELE B2 oral exam with top marks',
    rating: 5,
    courseTaken: 'Subjunctive Without the Pain',
  },
  {
    id: 'test-3',
    name: 'Chloe Martinez-Dupont',
    location: 'Paris, France',
    countryFlag: '🇫🇷',
    quote:
      'The best thing about this method is that it is genuine and funny. You do not learn phrases no one says like "the bear eats apples", but how people our age talk in Madrid bars.',
    resultAchieved: 'Landed a marketing role in Barcelona and speaks daily with local colleagues',
    rating: 5,
    courseTaken: 'Speak with Confidence',
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
