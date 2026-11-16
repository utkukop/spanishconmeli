import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Mail, Instagram, MapPin, Send, CheckCircle2, Calendar } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';

export const ContactPage: React.FC = () => {
  const { siteConfig, setActiveView, addLead } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/spanishconmeli';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Course enrollment');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill from URL query parameters if coming from Courses page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const courseParam = params.get('course');
      const subjectParam = params.get('subject');

      if (subjectParam) {
        if (subjectParam.toLowerCase().includes('private')) {
          setSubject('Private lessons & free trial');
        } else if (subjectParam.toLowerCase().includes('pdf') || subjectParam.toLowerCase().includes('guide')) {
          setSubject('Spanish Guides (PDF)');
        } else if (
          subjectParam.toLowerCase().includes('group') ||
          subjectParam.toLowerCase().includes('enrollment')
        ) {
          setSubject('Course enrollment');
        }
      }

      if (courseParam) {
        setMessage(
          `¡Hola Meli! I would like to inquire about ${courseParam}. Please let me know the upcoming schedule and how to reserve my spot!`
        );
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all fields with a valid email address.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      addLead({
        name: name.trim(),
        email: email.trim(),
        source: 'newsletter',
      });

      const res = await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
      });

      setIsSubmitting(false);
      if (res.success) {
        setSubmitSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage(res.error || 'Failed to send email. Please try again later.');
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Connection error. Please check your internet and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6EC] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-[#C8553D] tracking-wide mb-3">
            ¡Hola! Get in Touch
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#22334A] tracking-tight text-balance">
            Let’s talk about your Spanish goals
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#22334A]/75 leading-relaxed">
            Have a question about 1:1 classes, group lessons waitlist, or Spanish guides? Send a message or book your trial lesson directly.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Cal.com Quick Booking + Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cal.com Booking Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DCCB] shadow-xs">
              <p className="text-xs font-semibold text-[#C8553D] tracking-wide mb-2 flex items-center gap-2">
                <span className="inline-block w-5 h-0.5 bg-[#F2B134] rounded-full" />
                <span>Start Speaking From Day One</span>
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#22334A]">
                Ready to jump right in?
              </h2>
              <p className="mt-2 text-sm text-[#22334A]/75 leading-relaxed">
                Pick a convenient day and time on Meli’s calendar for your $5 trial lesson on Google Meet.
              </p>
              <div className="mt-5">
                <a
                  href={calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book your trial lesson · $5</span>
                </a>
              </div>
            </div>

            {/* Direct Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DCCB] shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#22334A]">
                Direct contact &amp; Social media
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-[#FFF6EC] border border-[#E9DCCB] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#C8553D]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#22334A]">Email</p>
                    <a
                      href="mailto:spanishconmeli@gmail.com"
                      className="text-sm text-[#C8553D] hover:underline font-medium"
                    >
                      spanishconmeli@gmail.com
                    </a>
                    <p className="text-xs text-[#22334A]/60 mt-0.5">Usually replies within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-[#FFF6EC] border border-[#E9DCCB] flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4 text-[#C8553D]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#22334A]">Instagram</p>
                    <a
                      href="https://instagram.com/spanishconmeli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#C8553D] hover:underline font-medium"
                    >
                      @spanishconmeli
                    </a>
                    <p className="text-xs text-[#22334A]/60 mt-0.5">Daily Spanish tips &amp; DMs</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-[#FFF6EC] border border-[#E9DCCB] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#C8553D]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7.2v3H10v8h3.5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#22334A]">Facebook</p>
                    <a
                      href="https://facebook.com/spanishconmeli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#C8553D] hover:underline font-medium"
                    >
                      @spanishconmeli
                    </a>
                    <p className="text-xs text-[#22334A]/60 mt-0.5">Community updates &amp; classes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-[#FFF6EC] border border-[#E9DCCB] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#C8553D]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#22334A]">TikTok</p>
                    <a
                      href="https://tiktok.com/@spanishconmeli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#C8553D] hover:underline font-medium"
                    >
                      @spanishconmeli
                    </a>
                    <p className="text-xs text-[#22334A]/60 mt-0.5">Short conversational Spanish videos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-[#FFF6EC] border border-[#E9DCCB] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#F2B134]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#22334A]">Location</p>
                    <p className="text-sm text-[#22334A]/85 font-medium">Toronto, Ontario, Canada</p>
                    <p className="text-xs text-[#22334A]/60 mt-0.5">
                      Online classes accommodating North America, Europe &amp; Latin America
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DCCB] shadow-xs">
              {!submitSuccess ? (
                <div>
                  <div className="mb-6">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A]">
                      Send a message
                    </h2>
                    <p className="text-sm text-[#22334A]/70 mt-1.5">
                      Fill out the form below and you will receive an automatic confirmation by email.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-5 p-4 bg-[#C8553D]/10 border border-[#C8553D]/30 rounded-2xl text-xs text-[#C8553D] font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#22334A] mb-1.5">
                        Full Name <span className="text-[#C8553D]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. Alex Taylor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-3 text-sm rounded-2xl border border-[#E9DCCB] bg-[#FFF6EC]/50 text-[#22334A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8553D] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#22334A] mb-1.5">
                        Email Address <span className="text-[#C8553D]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-3 text-sm rounded-2xl border border-[#E9DCCB] bg-[#FFF6EC]/50 text-[#22334A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8553D] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[#22334A] mb-1.5">
                        Topic
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-3 text-sm rounded-2xl border border-[#E9DCCB] bg-[#FFF6EC]/50 text-[#22334A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8553D] transition-all cursor-pointer font-medium"
                      >
                        <option value="Course enrollment">Group Lessons Waitlist &amp; Course Enrollment</option>
                        <option value="Private lessons & free trial">Private lessons &amp; $5 trial lesson</option>
                        <option value="Spanish Guides (PDF)">Spanish Guides (Instant PDF Downloads)</option>
                        <option value="General question">General question</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[#22334A] mb-1.5">
                        Your Message <span className="text-[#C8553D]">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell Meli a bit about your current Spanish and what you'd love to learn..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-2xl border border-[#E9DCCB] bg-[#FFF6EC]/50 text-[#22334A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8553D] transition-all leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-[48px] w-full mt-2 py-3.5 px-6 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#F2B134]/20 text-[#C8553D] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#22334A]">
                    ¡Gracias! Message sent
                  </h3>
                  <p className="mt-3 text-sm text-[#22334A]/75 leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out to <strong>spanishconmeli</strong>. An automatic confirmation is on its way to your inbox, and Meli will reply personally soon!
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="min-h-[46px] w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#22334A] bg-[#FFF6EC] hover:bg-[#E9DCCB]/50 border border-[#E9DCCB] rounded-full transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                    <a
                      href="/courses"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveView('courses');
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                      }}
                      className="min-h-[46px] w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer text-center inline-flex items-center justify-center"
                    >
                      Explore courses
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
