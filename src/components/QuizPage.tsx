import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { calculateQuizResult, validateEmail } from '../utils/quizScorer';
import { QuizEvaluation } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Volume2,
  Lock,
  Gift,
  ExternalLink,
} from 'lucide-react';
import { WireframePlaceholder } from './WireframePlaceholder';

export const QuizPage: React.FC = () => {
  const { quizQuestions, courses, siteConfig, addLead, setActiveView } = useCMS();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Lead capture state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Result state
  const [quizResult, setQuizResult] = useState<QuizEvaluation | null>(null);

  const qc = siteConfig.quizConfig || {
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

  const totalQuestions = quizQuestions.length;
  const isLeadCaptureStep = currentStepIndex === totalQuestions;
  const isResultStep = quizResult !== null;

  const currentQuestion = quizQuestions[currentStepIndex];

  // Speech synthesis audio helper with customizable language
  const handlePlayAudio = (phrase: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = qc.speechSynthesisLanguage || 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    if (!selectedOptionId) return;

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOptionId,
    };
    setAnswers(newAnswers);

    if (currentStepIndex + 1 < totalQuestions) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(newAnswers[quizQuestions[currentStepIndex + 1]?.id] || null);
    } else {
      // Move to lead capture step
      setCurrentStepIndex(totalQuestions);
    }
  };

  const handlePrevQuestion = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setSelectedOptionId(answers[quizQuestions[prevIndex]?.id] || null);
    }
  };

  const handleFinishQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(leadEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setIsSubmitting(true);

    const evaluation = calculateQuizResult(answers, quizQuestions, qc.levelThresholds);

    // Save lead to CMS
    addLead({
      name: leadName.trim() || 'Anonymous Student',
      email: leadEmail.trim(),
      source: 'quiz',
      quizLevel: evaluation.level,
      quizScore: evaluation.scorePercentage,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setQuizResult(evaluation);
    }, 400);
  };

  const handleRetake = () => {
    setAnswers({});
    setSelectedOptionId(null);
    setCurrentStepIndex(0);
    setQuizResult(null);
    setEmailError('');
  };

  const progressPercent = Math.round(
    isLeadCaptureStep ? 95 : ((currentStepIndex + 1) / (totalQuestions + 1)) * 100
  );

  const recommendedCourse = quizResult
    ? courses.find((c) => c.id === quizResult.recommendedCourseId) || courses[0]
    : null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Breadcrumb / Return */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#665E55] hover:text-[#1E1B18] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{qc.backButtonText || 'Back to website'}</span>
          </button>

          <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
            {qc.badgeTitle || 'Conversational Level Assessment'}
          </span>
        </div>

        {/* RESULTS SCREEN */}
        {isResultStep && quizResult ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE5D9] shadow-lg animate-fadeIn">
            {/* Header Result Badge */}
            <div className="text-center pb-8 border-b border-[#F0ECE2]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] text-xs font-bold rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{qc.resultsBadgeText || 'Assessment Completed'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] tracking-tight">
                {quizResult.title}
              </h2>

              <div className="mt-4 inline-flex items-baseline gap-2 bg-[#FAF9F5] border border-[#EAE5D9] px-4 py-2 rounded-xl">
                <span className="text-xs font-semibold text-[#665E55]">
                  {qc.resultsLevelLabel || 'Estimated CEFR Level:'}
                </span>
                <span className="text-lg font-black text-[#C73E29]">{quizResult.level}</span>
                <span className="text-xs text-[#8C827A] tabular-nums">
                  ({quizResult.scorePercentage}%)
                </span>
              </div>

              <p className="mt-5 text-sm sm:text-base text-[#57514A] leading-relaxed max-w-xl mx-auto">
                {quizResult.summary}
              </p>
            </div>

            {/* Strengths & Focus Areas */}
            <div className="py-8 border-b border-[#F0ECE2] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#EAE5D9]">
                <h4 className="text-xs font-bold text-[#2A9D8F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{qc.resultsStrengthsTitle || 'Your Strengths'}</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#443E38]">
                  {quizResult.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#2A9D8F] font-bold">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#EAE5D9]">
                <h4 className="text-xs font-bold text-[#C73E29] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{qc.resultsFocusTitle || 'Next Growth Areas'}</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#443E38]">
                  {quizResult.focusAreas.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C73E29] font-bold">→</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3-Step Action Plan */}
            <div className="py-8 border-b border-[#F0ECE2]">
              <h4 className="text-sm font-bold text-[#1E1B18] mb-4">
                {qc.resultsActionPlanTitle || 'Your Personalized 3-Step Action Plan:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {quizResult.actionPlan.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#FAF9F5] border border-[#EAE5D9] rounded-xl text-xs text-[#57514A]"
                  >
                    <span className="font-extrabold text-[#C73E29] block mb-1">
                      Step 0{idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Course Card */}
            {recommendedCourse && (
              <div className="pt-8">
                <div className="bg-gradient-to-br from-[#FAF0E6] to-[#FDF7F0] border-2 border-[#C73E29]/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-52 rounded-xl overflow-hidden bg-white shrink-0 shadow-xs border border-[#EAE5D9]">
                    <WireframePlaceholder
                      width={480}
                      height={300}
                      aspectRatio="16/10"
                      label="Recommended Course"
                      description="480 × 300 px"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C73E29] mb-1">
                      <Gift className="w-3.5 h-3.5" />
                      <span>
                        {qc.resultsRecommendedCourseBadge || 'Recommended Program for Your Level'} ({quizResult.level})
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E1B18]">
                      {recommendedCourse.title}
                    </h3>
                    <p className="text-xs text-[#57514A] mt-1 line-clamp-2">
                      {recommendedCourse.tagline}
                    </p>

                    <div className="mt-3 flex items-center justify-center md:justify-start gap-3">
                      <span className="text-xl font-black text-[#1E1B18]">
                        {recommendedCourse.price} {recommendedCourse.currency || siteConfig.currencySymbol || '€'}
                      </span>
                      {siteConfig.newsletterDiscountCode && (
                        <span className="text-xs text-[#2A9D8F] font-semibold bg-[#2A9D8F]/10 px-2.5 py-0.5 rounded-full">
                          Coupon {siteConfig.newsletterDiscountCode} available
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('courses');
                      const el = document.getElementById('courses-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full md:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{qc.resultsCourseCtaText || 'View Course Details'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Retake Button */}
            <div className="mt-8 text-center pt-6 border-t border-[#F0ECE2]">
              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#665E55] hover:text-[#1E1B18] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{qc.resultsRetakeText || 'Retake assessment with different answers'}</span>
              </button>
            </div>
          </div>
        ) : isLeadCaptureStep ? (
          /* LEAD CAPTURE STEP */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE5D9] shadow-lg animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-[#C73E29]/10 text-[#C73E29] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="text-center max-w-md mx-auto mb-8">
              <h2 className="text-2xl font-extrabold text-[#1E1B18]">
                {qc.leadTitle || "You've completed all questions!"}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#57514A]">
                {qc.leadSubtitle || 'Enter your details to calculate your estimated CEFR level and personalized roadmap.'}
              </p>
            </div>

            <form onSubmit={handleFinishQuiz} className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                  {qc.leadNameLabel || 'Your Name'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sarah or David"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#D5CFC4] focus:outline-none focus:ring-2 focus:ring-[#C73E29]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                  {qc.leadEmailLabel || 'Your Email Address'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={leadEmail}
                  onChange={(e) => {
                    setLeadEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C73E29] ${
                    emailError ? 'border-red-500' : 'border-[#D5CFC4]'
                  }`}
                />
                {emailError && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">{emailError}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#78716C] pt-1">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>{qc.leadPrivacyNotice || '100% spam-free. Only useful learning tips.'}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 px-6 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Calculating your assessment...</span>
                ) : (
                  <>
                    <span>{qc.leadSubmitButtonText || 'View My Level & Roadmap'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* QUESTION STEPPER */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE5D9] shadow-lg animate-fadeIn">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-[#665E55] mb-2 font-semibold">
                <span>
                  Question {currentStepIndex + 1} of {totalQuestions}
                </span>
                <span className="tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[#F0ECE2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C73E29] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Category & Title */}
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#C73E29] uppercase tracking-wider">
                {currentQuestion.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1 tracking-tight">
                {currentQuestion.title}
              </h3>
            </div>

            {/* Scenario Box */}
            <div className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl p-5 mb-6 text-sm text-[#332E29] leading-relaxed">
              <p className="font-medium">{currentQuestion.scenario}</p>

              {/* Native Speech Pronunciation Audio trigger */}
              {currentQuestion.audioPhrase && (
                <div className="mt-3 pt-3 border-t border-[#EAE5D9] flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(currentQuestion.audioPhrase!)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-[#C73E29] bg-[#C73E29]/10 hover:bg-[#C73E29]/20 rounded-lg transition-colors cursor-pointer"
                    title={qc.listenAudioText || 'Listen in Spanish'}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{qc.listenAudioText || 'Listen in Spanish'}</span>
                  </button>
                  <span className="text-xs text-[#78716C] italic">
                    «{currentQuestion.audioPhrase}»
                  </span>
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-[#C73E29] bg-[#FAF3F0] text-[#1E1B18] shadow-xs'
                        : 'border-[#EAE5D9] hover:border-[#D5CFC4] bg-white text-[#443E38]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-[#C73E29] bg-[#C73E29] text-white'
                          : 'border-[#D5CFC4]'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE2]">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentStepIndex === 0}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#665E55] hover:text-[#1E1B18] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{qc.previousButtonText || 'Previous'}</span>
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={!selectedOptionId}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <span>
                  {currentStepIndex + 1 === totalQuestions
                    ? qc.finishButtonText || 'Finish & View Level'
                    : qc.nextButtonText || 'Next'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
