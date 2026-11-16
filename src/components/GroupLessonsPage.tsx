import React, { useMemo, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { sendGroupWaitlistEmail } from '../services/emailService';
import {
  BEST_TIME_SLOTS,
  LEVEL_OPTIONS,
  convertBestTimesToToronto,
  detectUserTimezone,
  formatTorontoTimestamp,
  getTimezoneOptions,
} from '../utils/timezoneConverter';
import { ArrowLeft, Check, ChevronDown, Clock, Globe } from 'lucide-react';

export const GroupLessonsPage: React.FC = () => {
  const { setActiveView, addLead } = useCMS();

  const detectedTz = useMemo(() => detectUserTimezone(), []);
  const timezoneOptions = useMemo(() => getTimezoneOptions(detectedTz), [detectedTz]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [timezone, setTimezone] = useState(detectedTz);
  const [bestTimes, setBestTimes] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    email: string;
    level: string;
    timezone: string;
    bestTimes: string[];
    torontoTime: string;
  } | null>(null);

  const torontoPreview = useMemo(
    () => convertBestTimesToToronto(timezone, bestTimes),
    [timezone, bestTimes]
  );

  const toggleBestTime = (slotId: string) => {
    setBestTimes((prev) =>
      prev.includes(slotId) ? prev.filter((item) => item !== slotId) : [...prev, slotId]
    );
  };

  const handleBackToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('courses');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!level) {
      setErrorMessage('Please select your current Spanish level.');
      return;
    }
    if (!timezone) {
      setErrorMessage('Please confirm your time zone.');
      return;
    }
    if (bestTimes.length === 0) {
      setErrorMessage('Please select at least one time that works for you.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const torontoTime = convertBestTimesToToronto(timezone, bestTimes);
    const submittedAtToronto = formatTorontoTimestamp();

    try {
      const result = await sendGroupWaitlistEmail({
        name: trimmedName,
        email: trimmedEmail,
        level,
        timezone,
        bestTimes,
        torontoTime,
        submittedAtToronto,
      });

      if (!result.success) {
        setIsSubmitting(false);
        setErrorMessage(result.error || 'Could not submit right now. Please try again.');
        return;
      }

      addLead({
        name: trimmedName,
        email: trimmedEmail,
        source: 'course_waitlist',
        waitlistLevel: level,
        timezone,
        bestTimes: [...bestTimes],
        torontoTime,
      });

      setSubmittedRecord({
        name: trimmedName,
        email: trimmedEmail,
        level,
        timezone,
        bestTimes: [...bestTimes],
        torontoTime,
      });

      setName('');
      setEmail('');
      setLevel('');
      setBestTimes([]);
    } catch {
      setErrorMessage('Connection error. Please check your internet and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF6EC] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Subtle back link */}
        <a
          href="/courses"
          onClick={handleBackToCourses}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C8553D] hover:underline mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </a>

        {/* Title & Intro matching 03 Group Lessons waitlist */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A] tracking-tight">
          Group Lessons: coming soon
        </h1>

        <p className="mt-3 text-base text-[#22334A]/85 leading-relaxed">
          Small groups, relaxed conversation practice and a friendly community of learners. I&apos;m opening the first groups soon!
        </p>

        <p className="mt-4 text-sm sm:text-base font-medium text-[#22334A]">
          Join the waitlist and be the first to know.
        </p>

        {/* Form Card / Clean Stacked Fields */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-[#C8553D]/10 border border-[#C8553D]/35 text-xs sm:text-sm font-semibold text-[#C8553D]"
            >
              {errorMessage}
            </div>
          )}

          {/* 1. Name */}
          <div>
            <label htmlFor="waitlist-name" className="sr-only">
              Name
            </label>
            <input
              id="waitlist-name"
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[50px] px-4 py-3 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white text-[#22334A] placeholder:text-[#22334A]/45 focus:outline-none focus:ring-2 focus:ring-[#F2B134] focus:border-[#F2B134] transition-all"
            />
          </div>

          {/* 2. Email */}
          <div>
            <label htmlFor="waitlist-email" className="sr-only">
              Email
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[50px] px-4 py-3 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white text-[#22334A] placeholder:text-[#22334A]/45 focus:outline-none focus:ring-2 focus:ring-[#F2B134] focus:border-[#F2B134] transition-all"
            />
          </div>

          {/* 3. Level (dropdown) */}
          <div className="relative">
            <label htmlFor="waitlist-level" className="sr-only">
              Level
            </label>
            <select
              id="waitlist-level"
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={`w-full min-h-[50px] px-4 py-3 pr-10 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#F2B134] focus:border-[#F2B134] transition-all cursor-pointer ${
                level ? 'text-[#22334A]' : 'text-[#22334A]/45'
              }`}
            >
              <option value="" disabled>
                Level (dropdown)
              </option>
              {LEVEL_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="text-[#22334A]">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#22334A]/60 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* 4. Time zone (auto-detected and pre-selected) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="waitlist-timezone"
                className="text-xs font-semibold text-[#22334A]/80 flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-[#C8553D]" />
                <span>Time zone</span>
              </label>
              <span className="text-[11px] font-medium text-[#22334A]/60">
                {timezone === detectedTz ? 'Auto-detected from your device' : 'Custom time zone'}
              </span>
            </div>
            <div className="relative">
              <select
                id="waitlist-timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full min-h-[50px] px-4 py-3 pr-10 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white text-[#22334A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#F2B134] focus:border-[#F2B134] transition-all cursor-pointer"
              >
                {timezoneOptions.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#22334A]/60 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 5. Best times for you (in your time zone) - multi-select */}
          <div className="bg-white rounded-xl border border-[#E9DCCB] p-4 sm:p-5">
            <p className="text-sm sm:text-base font-medium text-[#22334A] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C8553D] shrink-0" />
              <span>Best times for you (in your time zone)</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BEST_TIME_SLOTS.map((slot) => {
                const isChecked = bestTimes.includes(slot.id);
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => toggleBestTime(slot.id)}
                    aria-pressed={isChecked}
                    className={`min-h-[46px] px-3.5 py-2.5 rounded-xl border text-left text-sm font-medium flex items-center gap-3 transition-all cursor-pointer ${
                      isChecked
                        ? 'border-[#F2B134] bg-[#FFF6EC] text-[#22334A] ring-1 ring-[#F2B134]'
                        : 'border-[#E9DCCB] bg-white hover:bg-[#FFF6EC]/60 text-[#22334A]/85'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#F2B134] border-[#F2B134] text-white'
                          : 'border-[#E9DCCB] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>
                    <span>{slot.label}</span>
                  </button>
                );
              })}
            </div>

            {torontoPreview && (
              <p className="mt-3 pt-3 border-t border-[#E9DCCB]/70 text-xs text-[#22334A]/70 leading-relaxed">
                <span className="font-semibold text-[#C8553D]">Toronto time equivalent:</span>{' '}
                {torontoPreview}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#22334A]/75 pt-0.5">
            Choose all that work for you. This helps me create groups at the right time.
          </p>

          {/* 6. Mustard Join the waitlist Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-[48px] w-full sm:w-auto px-8 py-3 text-sm sm:text-base font-semibold text-white bg-[#F2B134] hover:bg-[#de9f23] rounded-full shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? 'Joining waitlist...' : 'Join the waitlist'}
            </button>
          </div>
        </form>

        {/* Confirmation Message matching wireframe */}
        {submittedRecord && (
          <div className="mt-6 space-y-4">
            <p className="text-sm sm:text-base font-semibold text-[#2B7A4B] flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              <span>You&apos;re on the list! I&apos;ll email you when group lessons open.</span>
            </p>

            <div className="bg-white rounded-2xl border border-[#E9DCCB] p-5 text-xs sm:text-sm text-[#22334A]/85 space-y-1.5">
              <p className="font-serif font-bold text-[#22334A] text-base mb-2">
                Confirmation summary sent to {submittedRecord.email}
              </p>
              <p>
                <strong>Name:</strong> {submittedRecord.name}
              </p>
              <p>
                <strong>Level:</strong> {submittedRecord.level}
              </p>
              <p>
                <strong>Time zone:</strong> {submittedRecord.timezone}
              </p>
              <p>
                <strong>Best times:</strong> {submittedRecord.bestTimes.join(', ')}
              </p>
              <p className="text-xs text-[#22334A]/65 pt-1">
                <strong>Toronto time equivalent:</strong> {submittedRecord.torontoTime}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
