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
  let title = 'Principiante Curioso (Nivel A1)';
  let summary =
    'Conoces palabras y frases básicas de cortesía, pero todavía te cuesta construir oraciones fluidas o entender a nativos cuando hablan a ritmo normal.';
  let recommendedCourseId = 'course-fundamentals';
  let strengths = [
    'Entendimiento de saludos y vocabulario cotidiano esencial.',
    'Gran motivación y oído receptivo para la pronunciación.',
  ];
  let focusAreas = [
    'Conectar verbos frecuentes (ser, estar, tener, ir) en presente.',
    'Automatizar respuestas automáticas sin traducir mentalmente palabra por palabra.',
  ];
  let actionPlan = [
    'Día 1-7: Practica los 50 conectores coloquiales más usados.',
    'Día 8-15: Escucha micro-diálogos reales de 2 minutos sin subtítulos en inglés.',
    'Día 16-30: Graba notas de voz diarias de 30 segundos simulando situaciones de viaje.',
  ];

  if (level === 'B2+') {
    title = 'Conversador Avanzado y Natural (Nivel B2 / C1)';
    summary =
      'Tienes un vocabulario amplio y entiendes matices culturales, doble sentido y expresiones idiomáticas. Tu próximo reto es afinar el subjuntivo sutil y la entonación nativa.';
    recommendedCourseId = 'course-subjunctive';
    strengths = [
      'Dominio de modismos y jerga local española / latinoamericana.',
      'Fluidez inmediata sin miedo a cometer errores.',
      'Excelente comprensión auditiva a velocidad rápida.',
    ];
    focusAreas = [
      'Subjuntivo imperfecto y frases condicionales complejas.',
      'Afinar conectores de registro informal vs profesional.',
    ];
    actionPlan = [
      'Escucha podcasts nativos sin guion (temas de humor y debate).',
      'Incorpora expresiones de reacción espontánea: "¡No me digas!", "¡Qué fuerte!", "¿En serio?".',
      'Practica storytelling y anécdotas con tiempos del pasado entrelazados.',
    ];
  } else if (level === 'B1') {
    title = 'Intermedio en Despegue (Nivel B1)';
    summary =
      'Puedes mantener conversaciones sobre temas familiares y viajar con comodidad, pero te bloqueas al hablar rápido o cuando entran en juego los pasados y el subjuntivo.';
    recommendedCourseId = 'course-conversational';
    strengths = [
      'Buen repertorio de verbos en presente y pasado.',
      'Capacidad de hacerte entender en situaciones cotidianas de viaje y ocio.',
    ];
    focusAreas = [
      'Diferenciar pretérito indefinido vs imperfecto de forma intuitiva.',
      'Perder el miedo escénico y mejorar la velocidad de procesamiento auditivo.',
    ];
    actionPlan = [
      'Dedica 10 minutos al día a la técnica de "Shadowing" con los audios de Meli.',
      'Elimina las muletillas de traducción y adopta muletillas nativas: "O sea", "A ver", "Pues nada".',
      'Aplica el método de 3 preguntas de seguimiento en cada conversación.',
    ];
  } else if (level === 'A2') {
    title = 'Principiante con Base (Nivel A2)';
    summary =
      'Reconoces estructuras básicas y puedes pedir comida o dar indicaciones, pero la velocidad nativa te sobrepasa y necesitas tiempo para pensar antes de hablar.';
    recommendedCourseId = 'course-conversational';
    strengths = [
      'Conocimiento de gramática elemental y conjugaciones regulares.',
      'Buena comprensión lectora básica.',
    ];
    focusAreas = [
      'Entrenamiento auditivo con acentos reales y contracciones orales.',
      'Pronunciación de la "R" vibrante y la entonación melódica del español.',
    ];
    actionPlan = [
      'Practica los 10 diálogos esenciales de supervivencia en la calle.',
      'Aprende vocabulario por bloques de frases fijas ("chunks") y no palabras sueltas.',
      'Repite en voz alta los episodios del podcast para calentar los músculos vocales.',
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
