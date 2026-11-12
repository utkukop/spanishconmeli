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
  brandTagline: 'Aprende el español que realmente se habla',
  currencySymbol: '€',
  announcementActive: true,
  announcementText: '🔥 ¡Nuevo curso de Subjuntivo disponible! 15% de descuento con el código MELI15',
  announcementLinkText: 'Ver oferta',
  headerCtaText: 'Hacer Quiz de Nivel',
  navLinks: [
    { id: 'home', label: 'Inicio', view: 'home' },
    { id: 'quiz', label: 'Test de Nivel', view: 'quiz' },
    { id: 'courses', label: 'Cursos', view: 'courses' },
    { id: 'resources', label: 'Podcast & Recursos', view: 'resources' },
    { id: 'about', label: 'Sobre Meli', view: 'about' },
  ],

  // Hero Section
  heroBadge: 'Método Conversacional Directo · Más de 45.000 estudiantes',
  heroHeadline: 'Habla español real, con confianza y sin miedo a quedarte en blanco.',
  heroSubtitle:
    'Deja atrás los diálogos artificiales de libro de texto. Aprende a expresarte con naturalidad en bares, viajes y reuniones con amigos a través de micro-lecciones prácticas y conversaciones auténticas.',
  heroImage: '/src/assets/images/hero_meli_teacher_1794405197921.jpg',
  heroCtaPrimaryText: 'Hacer Test de Nivel Gratis',
  heroCtaSecondaryText: 'Ver Cursos & Precios',
  heroBullets: [
    'Español coloquial de España y Latinoamérica',
    'Audios reales sin frases robóticas',
    'Test de nivel en 3 minutos',
  ],
  heroStatRating: '4.9 / 5',
  heroStatReviews: 'más de 1.800 reseñas de estudiantes',
  heroStatCommunity: 'Comunidad en YouTube, Spotify e Instagram',

  // Methodology Section
  methodologyKicker: 'La Gran Diferencia',
  methodologyTitle: '¿Por qué tantos estudiantes se bloquean al hablar?',
  methodologySubtitle:
    'La mayoría de las escuelas enseñan un español de hace 40 años. En spanishconmeli aprendes las frases, los modismos y el ritmo que se usa hoy en día.',
  methodologyComparisons: [
    {
      situation: 'Pedir comida en un bar',
      textbook: '«¿Desea usted servirme un vaso de agua mineral fría?» (Innatural, nadie habla así)',
      meliMethod: '«¿Me pones un vaso de agua del tiempo, porfa?» (Fluido, cálido y real)',
    },
    {
      situation: 'Expresar acuerdo con un amigo',
      textbook: '«Yo concuerdo plenamente con su respetable opinión.»',
      meliMethod: '«¡Totalmente!», «Tal cual», «¡Ya te digo!»',
    },
    {
      situation: 'Hacer planes de fin de semana',
      textbook: '«¿Tiene usted la intención de realizar actividades el sábado?»',
      meliMethod: '«¿Qué plan tienes para el finde? ¿Nos tomamos unas cañas?»',
    },
  ],
  methodologyPillars: [
    {
      title: 'Inmersión Coloquial',
      desc: 'Aprende las muletillas y frases hechas que hacen que tu español suene natural y empático desde el primer minuto.',
    },
    {
      title: 'Oído Afilado',
      desc: 'Diálogos a velocidad normal de conversación para que nunca más te sientas perdido cuando un hispanohablante te hable rápido.',
    },
    {
      title: 'Cero Bloqueo',
      desc: 'Técnicas de respuesta instantánea y reformulación para que nunca te quedes callado pensando en cómo conjugar.',
    },
  ],

  // About Meli Section
  teacherName: 'Meli',
  teacherTitle: 'Tu mentora de español conversacional',
  teacherBio:
    '¡Hola! Soy Meli, profesora de español y apasionada de la comunicación real. Tras más de 8 años enseñando a miles de estudiantes internacionales, descubrí por qué tantos se quedan estancados: la escuela enseña a aprobar exámenes, pero no a pedir una caña con gracia ni a entender los chistes de una sobremesa.',
  teacherBioParagraph2:
    'He vivido en Madrid y viajado extensamente por Andalucía, México y Colombia. Sé exactamente qué modismos causan confusión, por qué la gente se bloquea ante un grupo de nativos y cómo desbloquear el habla con ejercicios relajados y llenos de humor.',
  teacherQuote: '«El español no se aprende para pasar un examen, sino para conectar con personas.»',
  teacherImage: '/src/assets/images/hero_meli_teacher_1794405197921.jpg',
  instagramHandle: '@spanishconmeli',
  youtubeHandle: 'Spanish with Meli',
  spotifyHandle: 'Spanish with Meli Podcast',

  // Footer & Newsletter
  footerDescription:
    'Aprende el español que realmente se habla. La escuela online que te enseña a hablar con la naturalidad, el ritmo y el humor de las calles de España.',
  footerCopyright: 'Todos los derechos reservados.',
  footerAddress: 'Madrid, España',
  footerNewsletterTitle: 'Carta Semanal de Español Real',
  footerNewsletterDesc:
    'Recibe 1 expresión coloquial cada martes y un 15% de descuento en tu primer curso.',
  newsletterDiscountCode: 'MELI15',

  // Quiz config
  quizConfig: INITIAL_QUIZ_CONFIG,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-conversational',
    title: 'Habla con Confianza: Conversación Real',
    tagline: 'El programa intensivo para pasar del bloqueo mental a la fluidez espontánea en 8 semanas.',
    badge: 'Más Vendido',
    level: 'Nivel A2 a B1',
    duration: '8 Semanas · Acceso de por vida',
    price: 147,
    originalPrice: 220,
    currency: '€',
    popular: true,
    image: '/src/assets/images/course_conversational_1794405199538.jpg',
    features: [
      'Más de 60 audios de conversaciones cotidianas sin guion artificial',
      'Desglose paso a paso de modismos y muletillas que usan los nativos',
      'Ejercicios interactivos de respuesta rápida (Shadowing & Fast-Reply)',
      'Comunidad privada de práctica con feedback mensual de Meli',
    ],
    syllabus: [
      { title: 'Módulo 1: Romper el hielo', desc: 'Saludos, preguntas naturales y cómo empezar una conversación sin titubear.' },
      { title: 'Módulo 2: Sobrevivir y triunfar en bares y restaurantes', desc: 'Pedir tapas, pedir la cuenta, hacer bromas y entender el ritmo veloz de los camareros.' },
      { title: 'Módulo 3: Narrar anécdotas en el pasado', desc: 'Indefinido vs Imperfecto explicado con humor y sin fórmulas memorísticas.' },
      { title: 'Módulo 4: Expresar opiniones y debatir', desc: 'Cómo estar en desacuerdo educadamente y dar argumentos con soltura.' },
    ],
    ctaText: 'Comenzar Ahora',
  },
  {
    id: 'course-subjunctive',
    title: 'El Subjuntivo Sin Dolores',
    tagline: 'Desmitifica el tema más temido del español con situaciones prácticas de la vida real.',
    badge: 'Especializado',
    level: 'Nivel B1 a B2+',
    duration: '4 Semanas · 24 Lecciones',
    price: 89,
    originalPrice: 129,
    currency: '€',
    popular: false,
    image: '/src/assets/images/course_pronunciation_1794405200687.jpg',
    features: [
      'Adiós a las listas eternas: reglas lógicas basadas en emociones e intenciones',
      'Frases hechas que disparan automáticamente el subjuntivo',
      'Tarjetas mnemotécnicas descargables y tests contextuales',
      'Certificado de finalización al aprobar los retos',
    ],
    syllabus: [
      { title: 'Lección 1: ¿Por qué existe el subjuntivo?', desc: 'La mentalidad detrás del modo de la duda y el deseo.' },
      { title: 'Lección 2: Disparadores inmediatos', desc: 'Ojalá, para que, cuando, aunque... cuándo sí y cuándo no.' },
      { title: 'Lección 3: El subjuntivo en el pasado', desc: 'Cómo usar "hubiera" y "tuviera" como un hispanohablante de toda la vida.' },
    ],
    ctaText: 'Dominar el Subjuntivo',
  },
  {
    id: 'course-fundamentals',
    title: 'Español para Viajeros y Nómadas',
    tagline: 'Todo lo que necesitas para moverte por España y Latinoamérica sin depender de Google Translate.',
    badge: 'Para Principiantes',
    level: 'Nivel A1 a A2',
    duration: 'Autoguiado · 30 Guías Clave',
    price: 49,
    originalPrice: 79,
    currency: '€',
    popular: false,
    image: '/src/assets/images/quiz_banner_travel_1794405198448.jpg',
    features: [
      'Glosario sonoro de emergencias, transporte, alojamientos y compras',
      'Diferencias de vocabulario clave entre España, México y Colombia',
      'Audio-guías descargables para escuchar en el avión o en el tren',
    ],
    syllabus: [
      { title: 'Guía 1: Llegada y transporte', desc: 'Taxis, metro, tren y preguntar direcciones sin perderte.' },
      { title: 'Guía 2: Check-in y estancia', desc: 'Resolver dudas en hoteles, Airbnb y tiendas de barrio.' },
      { title: 'Guía 3: Conectar con los lugareños', desc: 'Frases cálidas de cortesía que abren puertas de inmediato.' },
    ],
    ctaText: 'Explorar Guía',
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    type: 'podcast',
    title: 'Episodio 42: Cómo pedir un café en España sin parecer un extraterrestre',
    description:
      'Solo, cortado, con leche, manchado, del tiempo, con hielo... Te explico el código secreto de los bares españoles y la jerga que ningún diccionario incluye.',
    durationOrPages: '14 min de audio',
    level: 'A2 - B1',
    category: 'Cultura & Oído',
    audioTitle: 'Episodio 42 - Pedir café en España (Demo de audio)',
    tags: ['Podcast', 'Cultura', 'Madrid'],
  },
  {
    id: 'res-2',
    type: 'cheatsheet',
    title: 'Guía Definitiva: 25 Expresiones Coloquiales que Cambiarán tu Español',
    description:
      'Un PDF de 8 páginas con ejemplos contextuales, notas de uso y advertencias culturales para no meter la pata con modismos como "molar", "flipar" o "estar liado".',
    durationOrPages: 'PDF de 8 páginas',
    level: 'Todos los niveles',
    category: 'Glosario Descargable',
    downloadUrl: '#',
    tags: ['PDF Gratis', 'Vocabulario', 'Cheat Sheet'],
  },
  {
    id: 'res-3',
    type: 'article',
    title: 'Por vs. Para: El atajo mental que de verdad funciona',
    description:
      'Olvida las reglas de 12 puntos de la gramática tradicional. Mira estos 3 principios visuales para acertar siempre de forma instintiva.',
    durationOrPages: '5 min de lectura',
    level: 'A1 - B2',
    category: 'Gramática Simple',
    tags: ['Gramática', 'Tips'],
  },
  {
    id: 'res-4',
    type: 'podcast',
    title: 'Episodio 38: Entender el acento andaluz y caribeño sin subtítulos',
    description:
      '¿Por qué se comen las eses finales? Aprende a entrenar tu oído para no perder el hilo cuando viajas al sur o a las islas.',
    durationOrPages: '18 min de audio',
    level: 'B1 - B2',
    category: 'Comprensión Auditiva',
    audioTitle: 'Episodio 38 - Acentos y entonación real',
    tags: ['Audio', 'Acentos'],
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    location: 'Londres, Reino Unido',
    countryFlag: '🇬🇧',
    quote:
      'Llevaba 3 años estudiando con aplicaciones típicas y al llegar a Valencia me quedé muda en el primer bar. Con el curso de Meli aprendí exactamente qué decir, cómo bromear y perdí el miedo en 3 semanas.',
    resultAchieved: 'De tener pánico escénico a mantener cenas enteras en español',
    rating: 5,
    courseTaken: 'Habla con Confianza',
  },
  {
    id: 'test-2',
    name: 'Lukas Meyer',
    location: 'Berlín, Alemania',
    countryFlag: '🇩🇪',
    quote:
      'Las explicaciones de Meli sobre el subjuntivo valen oro. La forma en que descompone las emociones y los disparadores orales me ahorró meses de frustración.',
    resultAchieved: 'Superó la prueba oral B2 DELE con calificación sobresaliente',
    rating: 5,
    courseTaken: 'El Subjuntivo Sin Dolores',
  },
  {
    id: 'test-3',
    name: 'Chloe Martinez-Dupont',
    location: 'París, Francia',
    countryFlag: '🇫🇷',
    quote:
      'Lo mejor del método es que es divertido y real. No te enseña frases que nadie usa como "el perro come manzanas", sino cómo hablar como la gente joven en Madrid.',
    resultAchieved: 'Consiguió trabajo en una agencia de marketing en Barcelona',
    rating: 5,
    courseTaken: 'Habla con Confianza',
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'La Prueba del Bar de Tapas',
    category: 'Diálogo Real',
    scenario:
      'Entras a un bar lleno en Madrid. Quieres una cerveza de barril pequeña y unas aceitunas. ¿Cómo se lo pides al camarero de la forma más natural?',
    audioPhrase: '¿Me pones una caña y unas aceitunas, porfa?',
    explanation:
      'En España, "una caña" es la cerveza de barril estándar y "poner" se usa comúnmente para ordenar sin sonar distante.',
    options: [
      {
        id: 'q1_o1',
        text: 'Yo deseo tomar un vaso de cerveza con aceitunas, gracias.',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'Correcto gramaticalmente, pero suena muy acartonado y formal para un bar.',
      },
      {
        id: 'q1_o2',
        text: '¿Me pones una caña y una de aceitunas, porfa?',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: '¡Exacto! 100% natural, coloquial y amigable.',
      },
      {
        id: 'q1_o3',
        text: 'Quiero una cerveza y aceitunas, por favor.',
        points: 5,
        levelIndicator: 'A2',
        feedback: 'Se entiende perfectamente, aunque es un poco directo de principiante.',
      },
      {
        id: 'q1_o4',
        text: '¿Tiene cerveza disponible?',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'En un bar español dan por hecho que tienen cerveza; no hace falta preguntar si tienen.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'Jerga y Expresiones Callejeras',
    category: 'Jerga y Coloquialismos',
    scenario:
      'Un amigo te muestra las fotos de su viaje a Granada y te dice emocionado: "¡Tío, lo pasamos bomba, la Alhambra mola un mazo!" ¿Qué te está diciendo?',
    audioPhrase: '¡Tío, lo pasamos bomba, la Alhambra mola un mazo!',
    explanation:
      '"Pasarlo bomba" significa divertirse muchísimo y "molar un mazo" significa gustar o fascinar un montón.',
    options: [
      {
        id: 'q2_o1',
        text: 'Que hubo una explosión cerca y la Alhambra estaba cerrada.',
        points: 0,
        levelIndicator: 'A1',
        feedback: 'Cuidado con las palabras literales: "bomba" aquí es diversión.',
      },
      {
        id: 'q2_o2',
        text: 'Que fue una experiencia aburrida y costosa.',
        points: 0,
        levelIndicator: 'A1',
        feedback: 'Al revés, fue fantástico.',
      },
      {
        id: 'q2_o3',
        text: 'Que se divirtieron muchísimo y que la Alhambra le fascinó.',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: '¡Brillante! Captas a la perfección el lenguaje coloquial.',
      },
      {
        id: 'q2_o4',
        text: 'Que compraron recuerdos pesados de madera.',
        points: 2,
        levelIndicator: 'A2',
        feedback: '"Mazo" en argot madrileño significa "mucho / un montón".',
      },
    ],
  },
  {
    id: 'q3',
    title: 'Duda Cotidiana: ¿Por o Para?',
    category: 'Gramática en Contexto',
    scenario:
      'Estás en una cena y alguien te pregunta por qué estás aprendiendo español. Quieres decir: "Estudio español para viajar y por amor a la cultura."',
    audioPhrase: 'Estudio español para viajar y por amor a la cultura.',
    explanation:
      '"Para" indica finalidad u objetivo futuro, mientras que "por" expresa motivo, causa o razón interna.',
    options: [
      {
        id: 'q3_o1',
        text: 'Estudio español por viajar y para amor a la cultura.',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'Invertiste las dos preposiciones principales.',
      },
      {
        id: 'q3_o2',
        text: 'Estudio español para viajar y por amor a la cultura.',
        points: 10,
        levelIndicator: 'B1',
        isCorrect: true,
        feedback: '¡Impecable! Objetivo (viajar) lleva para; causa/motivo (amor) lleva por.',
      },
      {
        id: 'q3_o3',
        text: 'Estudio español para viajar y para amor de la cultura.',
        points: 5,
        levelIndicator: 'A2',
        feedback: 'Casi, pero "por amor" es la colocación fija adecuada.',
      },
    ],
  },
  {
    id: 'q4',
    title: 'Reacción Espontánea en una Charla',
    category: 'Diálogo Real',
    scenario:
      'Un compañero te cuenta que acaba de ganar dos entradas gratis para el concierto de Rosalía este viernes. ¿Cuál es la reacción más natural?',
    audioPhrase: '¡No me digas! ¡Qué suerte tienes!',
    explanation:
      '"¡No me digas!" y "¡Qué pasada!" son muletillas de reacción que demuestran escucha activa nativa.',
    options: [
      {
        id: 'q4_o1',
        text: 'Eso es información interesante para mí.',
        points: 1,
        levelIndicator: 'A1',
        feedback: 'Suena a respuesta de robot o traducción automática en inglés.',
      },
      {
        id: 'q4_o2',
        text: '¡No me digas! ¡Qué pasada, qué suerte tienes!',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: '¡Naturalidad absoluta! Conectas emocionalmente al instante.',
      },
      {
        id: 'q4_o3',
        text: '¡Muy bien por ti!',
        points: 4,
        levelIndicator: 'A2',
        feedback: 'Un poco formal o traducción de "Good for you".',
      },
      {
        id: 'q4_o4',
        text: 'Felicidades señor.',
        points: 2,
        levelIndicator: 'A1',
        feedback: 'Demasiado solemne para un amigo de tu edad.',
      },
    ],
  },
  {
    id: 'q5',
    title: 'El Desafío del Subjuntivo Oculto',
    category: 'Gramática en Contexto',
    scenario: 'Tu casera en España te dice: "Llámame en cuanto _____ a casa para darte las llaves nuevas."',
    audioPhrase: 'Llámame en cuanto llegues a casa.',
    explanation:
      'Las oraciones temporales referidas al futuro con "en cuanto", "cuando", "tan pronto como" exigen subjuntivo.',
    options: [
      {
        id: 'q5_o1',
        text: 'llegas',
        points: 3,
        levelIndicator: 'A2',
        feedback: 'El indicativo se usa para hábitos pasados o presentes, no para acciones futuras esperadas.',
      },
      {
        id: 'q5_o2',
        text: 'llegues',
        points: 10,
        levelIndicator: 'B2+',
        isCorrect: true,
        feedback: '¡Exacto! "En cuanto + futuro" siempre activa el presente de subjuntivo.',
      },
      {
        id: 'q5_o3',
        text: 'llegar',
        points: 1,
        levelIndicator: 'A1',
        feedback: 'Falta conjugar el verbo para la persona (tú).',
      },
    ],
  },
  {
    id: 'q6',
    title: 'Comprensión Auditiva & Ritmo Rápido',
    category: 'Comprensión Auditiva',
    scenario:
      'Escuchas a dos personas despedirse rápido en la estación: "¡Bueno, que te vaya genial, nos vemos el finde, cuídate!". ¿Cuándo se verán de nuevo?',
    audioPhrase: '¡Bueno, que te vaya genial, nos vemos el finde, cuídate!',
    explanation:
      '"El finde" es la abreviatura universal coloquial de "el fin de semana" (sábado o domingo).',
    options: [
      {
        id: 'q6_o1',
        text: 'Mañana por la mañana',
        points: 1,
        levelIndicator: 'A1',
      },
      {
        id: 'q6_o2',
        text: 'A finales de mes',
        points: 2,
        levelIndicator: 'A2',
      },
      {
        id: 'q6_o3',
        text: 'El próximo fin de semana (sábado/domingo)',
        points: 10,
        levelIndicator: 'B1',
        isCorrect: true,
        feedback: '¡Correcto! "El finde" = fin de semana.',
      },
    ],
  },
  {
    id: 'q7',
    title: 'Tu Principal Reto al Hablar',
    category: 'Objetivos & Retos',
    scenario: 'Cuando intentas tener una conversación en español con nativos hoy en día, ¿qué sientes que te frena más?',
    options: [
      {
        id: 'q7_o1',
        text: 'Me quedo en blanco y traduzco cada palabra desde mi idioma nativo.',
        points: 3,
        levelIndicator: 'A1',
        feedback: 'Necesitamos trabajar tu banco de frases automáticas ("chunks").',
      },
      {
        id: 'q7_o2',
        text: 'Entiendo bastante bien leyendo, pero cuando me hablan rápido me pierdo.',
        points: 6,
        levelIndicator: 'A2',
        feedback: 'Tu foco debe ser el entrenamiento auditivo con acentos reales.',
      },
      {
        id: 'q7_o3',
        text: 'Puedo comunicarme, pero cometo errores de gramática y me falta vocabulario variado.',
        points: 8,
        levelIndicator: 'B1',
        feedback: 'Estás a un paso de la soltura: trabajaremos modismos y fluidez.',
      },
      {
        id: 'q7_o4',
        text: 'Hablo con fluidez, pero quiero sonar 100% natural, dominar el humor y el subjuntivo fino.',
        points: 10,
        levelIndicator: 'B2+',
        feedback: '¡Estupendo! Te convienen retos avanzados de conversación y matices.',
      },
    ],
  },
];
