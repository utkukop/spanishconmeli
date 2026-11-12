import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuizResult, validateEmail } from './quizScorer';
import { QuizQuestion } from '../types';

const mockQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Pedir en un bar de tapas',
    category: 'real_dialogue',
    scenario: 'Llegas a un bar en Madrid lleno de gente y quieres pedir una cerveza y unas aceitunas.',
    options: [
      { id: 'opt1_1', text: 'Yo quiero una cerveza por favor', points: 3, levelIndicator: 'A1' },
      { id: 'opt1_2', text: '¿Me pones una caña y una de aceitunas, porfa?', points: 10, levelIndicator: 'B2+' },
      { id: 'opt1_3', text: 'Quisiera tomar cerveza con aceitunas', points: 6, levelIndicator: 'A2' },
    ],
  },
  {
    id: 'q2',
    title: 'Expresión coloquial',
    category: 'slang',
    scenario: 'Tu amigo español te dice: "¡Esta fiesta mola un mazo!" ¿Qué significa?',
    options: [
      { id: 'opt2_1', text: 'La fiesta es aburrida', points: 0, levelIndicator: 'A1' },
      { id: 'opt2_2', text: 'La fiesta está genial / es increíble', points: 10, levelIndicator: 'B2+' },
      { id: 'opt2_3', text: 'La fiesta es ruidosa', points: 4, levelIndicator: 'A2' },
    ],
  },
  {
    id: 'q3',
    title: 'Uso de subjuntivo contextual',
    category: 'grammar',
    scenario: 'Completa la frase: "Espero que mañana no _____ tanto calor."',
    options: [
      { id: 'opt3_1', text: 'hace', points: 2, levelIndicator: 'A1' },
      { id: 'opt3_2', text: 'haga', points: 10, levelIndicator: 'B1' },
      { id: 'opt3_3', text: 'hacer', points: 0, levelIndicator: 'A1' },
    ],
  },
];

test('calculateQuizResult evaluates B2+ when answers achieve high scores', () => {
  const answers = {
    q1: 'opt1_2', // 10 pts, B2+
    q2: 'opt2_2', // 10 pts, B2+
    q3: 'opt3_2', // 10 pts, B1
  };
  const result = calculateQuizResult(answers, mockQuestions);
  assert.equal(result.level, 'B2+');
  assert.equal(result.totalPoints, 30);
  assert.equal(result.scorePercentage, 100);
  assert.equal(result.recommendedCourseId, 'course-private-1on1');
});

test('calculateQuizResult evaluates A1 when low beginner answers are picked', () => {
  const answers = {
    q1: 'opt1_1', // 3 pts
    q2: 'opt2_1', // 0 pts
    q3: 'opt3_3', // 0 pts
  };
  const result = calculateQuizResult(answers, mockQuestions);
  assert.equal(result.level, 'A1');
  assert.equal(result.totalPoints, 3);
  assert.equal(result.scorePercentage, 10);
  assert.equal(result.recommendedCourseId, 'course-group-a0a1');
});

test('calculateQuizResult handles empty or unanswered questions safely', () => {
  const emptyAnswers = {};
  const result = calculateQuizResult(emptyAnswers, mockQuestions);
  assert.equal(result.level, 'A1');
  assert.equal(result.totalPoints, 0);
  assert.equal(result.scorePercentage, 0);
  assert.ok(result.actionPlan.length > 0);
});

test('validateEmail validates valid and invalid formats correctly', () => {
  assert.equal(validateEmail('estudiante@gmail.com'), true);
  assert.equal(validateEmail('user.name+tag@domain.co'), true);
  assert.equal(validateEmail('not-an-email'), false);
  assert.equal(validateEmail('test@'), false);
  assert.equal(validateEmail('   '), false);
});
