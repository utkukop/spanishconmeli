import { CEFRLevel, LevelThresholdConfig, QuizEvaluation, QuizQuestion } from '../types';

export function calculateQuizResult(
  answers: Record<string, string>,
  questions: QuizQuestion[],
  customThresholds?: LevelThresholdConfig[]
): QuizEvaluation {
  let totalPoints = 0;
  let maxPoints = 0;
  const levelCounts: Record<CEFRLevel, number> = {
    A1: 0,
    A2: 0,
    B1: 0,
    'B2+': 0,
  };

  questions.forEach((q) => {
    // Determine max points possible for this question
    const questionMax = Math.max(...q.options.map((o) => o.points), 10);
    maxPoints += questionMax;

    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const selectedOption = q.options.find((o) => o.id === selectedOptionId);
      if (selectedOption) {
        totalPoints += selectedOption.points;
        levelCounts[selectedOption.levelIndicator] =
          (levelCounts[selectedOption.levelIndicator] || 0) + 1;
      }
    }
  });

  const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  // Determine Level code based on percentage & level counts
  let level: CEFRLevel = 'A1';
  if (percentage >= 80 || levelCounts['B2+'] >= 3) {
    level = 'B2+';
  } else if (percentage >= 55 || levelCounts['B1'] >= 2) {
    level = 'B1';
  } else if (percentage >= 30 || levelCounts['A2'] >= 2) {
    level = 'A2';
  } else {
    level = 'A1';
  }

  // If user defined custom threshold info in CMS, use it!
  const customConfig = customThresholds?.find((t) => t.level === level);
  if (customConfig) {
    return {
      level,
      title: customConfig.title,
      summary: customConfig.summary,
      scorePercentage: percentage,
      totalPoints,
      maxPoints,
      strengths: customConfig.strengths,
      focusAreas: customConfig.focusAreas,
      recommendedCourseId: customConfig.recommendedCourseId,
      actionPlan: customConfig.actionPlan,
    };
  }

  // Default multilingual-friendly fallback
  let title = 'Curious Beginner (Level A1)';
  let summary =
    'You understand basic greetings and courtesy phrases, but find it challenging to build fluid sentences or follow native speech at natural speed.';
  let recommendedCourseId = 'course-group-a0a1';
  let strengths = [
    'Basic greetings and essential everyday Spanish vocabulary.',
    'High motivation and receptive ear for natural pronunciation.',
  ];
  let focusAreas = [
    'Connecting common verbs (ser, estar, tener, ir) in present tense.',
    'Responding spontaneously without translating word-for-word in your head.',
  ];
  let actionPlan = [
    'Day 1-7: Master the top 30 conversational connectors and starters.',
    'Day 8-15: Practice bite-sized 2-minute real dialogues without English subtitles.',
    'Day 16-30: Shadow short audio clips to build muscle memory and rhythm.',
  ];

  if (level === 'B2+') {
    title = 'Advanced & Natural Speaker (Level B2 / C1)';
    summary =
      'You have an extensive vocabulary and understand cultural nuances, humor, and idiomatic expressions. Your next leap is mastering subtle tone nuances and effortless spontaneity.';
    recommendedCourseId = 'course-private-1on1';
    strengths = [
      'Mastery of idioms and local conversational phrases.',
      'Instant fluency without fear of making mistakes.',
      'Strong listening comprehension at rapid native speed.',
    ];
    focusAreas = [
      'Complex past subjunctive and conditional hypotheticals.',
      'Fine-tuning colloquial street registers vs. professional nuance.',
    ];
    actionPlan = [
      'Listen to unscripted native discussions on culture and debate.',
      'Adopt spontaneous reaction expressions: "¡No me digas!", "¡Qué fuerte!", "¿En serio?".',
      'Practice dynamic storytelling with interwoven past tenses in 1-on-1 sessions.',
    ];
  } else if (level === 'B1') {
    title = 'Progressing Intermediate (Level B1)';
    summary =
      'You can maintain conversations on familiar topics and travel comfortably, but you hesitate when speaking quickly or when past tenses come into play.';
    recommendedCourseId = 'course-private-1on1';
    strengths = [
      'Solid repertoire of common verbs in present and past tenses.',
      'Ability to express ideas in everyday travel and social settings.',
    ];
    focusAreas = [
      'Intuitive distinction between Preterite and Imperfect past tenses.',
      'Overcoming hesitation and increasing listening processing speed.',
    ];
    actionPlan = [
      'Spend 10 minutes daily on vocal shadowing with authentic dialogues.',
      'Replace filler translations with native conversational pauses: "O sea", "A ver", "Pues nada".',
      'Practice targeted 1-on-1 personalized conversation drills.',
    ];
  } else if (level === 'A2') {
    title = 'Elementary Communicator (Level A2)';
    summary =
      'You recognize core structures and can order food or ask for directions, but fast speech feels overwhelming and you need time to construct sentences before speaking.';
    recommendedCourseId = 'course-group-a0a1';
    strengths = [
      'Knowledge of basic grammar and regular conjugations.',
      'Solid reading comprehension for simple dialogues.',
    ];
    focusAreas = [
      'Ear training with authentic accents and natural spoken contractions.',
      'Smooth sentence linking and melodic conversational intonation.',
    ];
    actionPlan = [
      'Practice the 10 essential street survival dialogues.',
      'Learn vocabulary in chunked phrases rather than isolated word lists.',
      'Join our small-group cohort to practice live with peers and Teacher Meli.',
    ];
  }

  return {
    level,
    title,
    summary,
    scorePercentage: percentage,
    totalPoints,
    maxPoints,
    strengths,
    focusAreas,
    recommendedCourseId,
    actionPlan,
  };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
