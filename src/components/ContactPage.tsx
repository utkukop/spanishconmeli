import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Mail, Instagram, MapPin, Send, CheckCircle2, Sparkles, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';

export const ContactPage: React.FC = () => {
  const { setActiveView, addLead } = useCMS();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Course enrollment');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill from query params if coming from Courses or another page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const courseParam = params.get('course');
      const subjectParam = params.get('subject');

      if (subjectParam) {
        if (subjectParam.toLowerCase().includes('private')) {
          setSubject('Private lessons & free trial');
        } else if (
          subjectParam.toLowerCase().includes('group') ||
          subjectParam.toLowerCase().includes('enrollment')
        ) {
          setSubject('Course enrollment');
        }
      }

      if (courseParam) {
        setMessage(
          `Hi Meli! I would like to inquire about ${courseParam}. Please let me know the upcoming schedule and how to reserve my spot!`
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
      // Record lead in CMS context
      addLead({
        name: name.trim(),
        email: email.trim(),
        source: 'newsletter',
      });

      // Dispatch via Netlify serverless function (Resend API)
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
    <div className="min-h-screen bg-[#FAF9F5] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Top Breadcrumb */}
        <div className="mb-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#665E55] hover:text-[#1E1B18] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to website</span>
          </a>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C73E29]/10 text-[#C73E29] text-xs font-bold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1B18] tracking-tight">
            Let’s Chat About Your Spanish Journey
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57514A] leading-relaxed">
            Have questions about an upcoming small-group cohort, booking a free 30-minute private trial, or tailored lessons? Send a message and Meli will reply personally within 24 hours.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Info & Teacher Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5D9] shadow-sm">
              <h3 className="text-lg font-bold text-[#1E1B18] mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C73E29]" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAE5D9]">
                  <Mail className="w-5 h-5 text-[#C73E29] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1E1B18]">Email Teacher Meli</p>
                    <a
                      href="mailto:spanishconmeli@gmail.com"
                      className="text-xs text-[#57514A] hover:text-[#C73E29] transition-colors underline font-medium"
                    >
                      spanishconmeli@gmail.com
                    </a>
                    <p className="text-[11px] text-[#8C827A] mt-0.5">Average reply time: under 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAE5D9]">
                  <Instagram className="w-5 h-5 text-[#E1306C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1E1B18]">Instagram DMs</p>
                    <a
                      href="https://instagram.com/spanishconmeli"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#57514A] hover:text-[#C73E29] transition-colors font-medium"
                    >
                      @spanishconmeli
                    </a>
                    <p className="text-[11px] text-[#8C827A] mt-0.5">Daily colloquial reels & direct messages</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAE5D9]">
                  <MapPin className="w-5 h-5 text-[#2A9D8F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1E1B18]">Location & Timezone</p>
                    <p className="text-xs text-[#57514A] font-medium">Toronto, Canada (Eastern Time / ET)</p>
                    <p className="text-[11px] text-[#8C827A] mt-0.5">Flexible times available across North American and European timezones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="bg-gradient-to-br from-[#FAF0E6] to-[#FDF7F0] rounded-3xl p-6 border border-[#EAD7C5]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C73E29] mb-2">
                <Clock className="w-4 h-4" />
                <span>Free 30-Minute Trial Lesson</span>
              </div>
              <p className="text-xs sm:text-sm text-[#57514A] leading-relaxed">
                Interested in 1-on-1 private lessons? Select <strong>"Private lessons & free trial"</strong> in the subject dropdown to arrange your complimentary introductory session with Teacher Meli!
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE5D9] shadow-md">
              {!submitSuccess ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1E1B18] tracking-tight">
                      Send a Message
                    </h2>
                    <p className="text-xs sm:text-sm text-[#57514A] mt-1">
                      Fill out the form below. An automatic confirmation will be sent to your email.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-[#1E1B18] mb-1.5">
                        Full Name <span className="text-[#C73E29]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. David Miller"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#D5CFC4] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C73E29] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#1E1B18] mb-1.5">
                        Email Address <span className="text-[#C73E29]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#D5CFC4] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C73E29] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-[#1E1B18] mb-1.5">
                        Inquiry Subject
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#D5CFC4] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C73E29] transition-all cursor-pointer font-medium text-[#1E1B18]"
                      >
                        <option value="Course enrollment">Course enrollment (Small Group Cohort)</option>
                        <option value="Private lessons & free trial">Private lessons & free 30-min trial</option>
                        <option value="General question">General question / Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#1E1B18] mb-1.5">
                        Your Message <span className="text-[#C73E29]">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell Meli about your current Spanish level, your speaking goals, or any questions you have..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#D5CFC4] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C73E29] transition-all leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 px-6 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Success Feedback State */
                <div className="text-center py-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#2A9D8F]/15 text-[#2A9D8F] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1E1B18]">
                    Your message has been sent successfully!
                  </h3>
                  <p className="mt-3 text-sm text-[#57514A] leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out to <strong>Spanish con Meli</strong>. We have received your message and an automatic confirmation has been sent to your email. Meli will get back to you as soon as possible!
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#1E1B18] bg-[#F0ECE2] hover:bg-[#E5DDCF] rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another Message
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
                      className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Explore Courses & Pricing
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
