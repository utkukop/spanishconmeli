import React, { useEffect, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Mail, Instagram, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';

export const ContactPage: React.FC = () => {
  const { siteConfig, addLead } = useCMS();
  const calLink = siteConfig.calLink || 'https://cal.com/spanishconmeli';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill message cleanly if coming from Spanish Guide ("Buy & download") or specific course inquiry
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const courseParam = params.get('course');
      if (courseParam) {
        setMessage(
          `¡Hola Meli! I'm interested in ${courseParam}. Please let me know how I can get started!`
        );
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await sendContactEmail({
        name: trimmedName,
        email: trimmedEmail,
        subject: 'Contact page inquiry',
        message: trimmedMessage,
      });

      if (!res.success) {
        setIsSubmitting(false);
        setErrorMessage(res.error || 'Failed to send message. Please try again.');
        return;
      }

      addLead({
        name: trimmedName,
        email: trimmedEmail,
        source: 'newsletter',
      });

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMessage('Connection error. Please check your internet and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6EC] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Title & Intro matching 05 Contact wireframe */}
        <div className="mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#22334A] tracking-tight">
            ¡Hablemos!
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#22334A]/80 max-w-xl leading-relaxed">
            Have a question before booking? Send me a message and I&apos;ll reply within 24 hours.
          </p>
        </div>

        {/* 2-Column Layout: Left Form + Right Warm Sand Info Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Clean 3-Field Form */}
          <div className="md:col-span-7">
            {!submitSuccess ? (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 bg-[#C8553D]/10 border border-[#C8553D]/30 rounded-xl text-xs sm:text-sm text-[#C8553D] font-semibold"
                  >
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[50px] px-4 py-3 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white text-[#22334A] placeholder:text-[#22334A]/45 focus:outline-none focus:ring-2 focus:ring-[#C8553D] focus:border-[#C8553D] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[50px] px-4 py-3 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white text-[#22334A] placeholder:text-[#22334A]/45 focus:outline-none focus:ring-2 focus:ring-[#C8553D] focus:border-[#C8553D] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3.5 text-sm sm:text-base rounded-xl border border-[#E9DCCB] bg-white text-[#22334A] placeholder:text-[#22334A]/45 focus:outline-none focus:ring-2 focus:ring-[#C8553D] focus:border-[#C8553D] transition-all leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[48px] w-full sm:w-auto px-8 py-3 text-sm sm:text-base font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E9DCCB] p-7 sm:p-9 shadow-xs">
                <div className="flex items-center gap-3 text-[#2B7A4B] mb-3">
                  <CheckCircle2 className="w-7 h-7 shrink-0" />
                  <h2 className="font-serif text-2xl font-bold text-[#22334A]">
                    Thank you! I&apos;ll get back to you soon.
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#22334A]/75 leading-relaxed">
                  Your message has been sent to Meli, and an automatic confirmation is on its way to your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 min-h-[46px] px-6 py-2.5 text-sm font-semibold text-[#22334A] bg-[#FFF6EC] hover:bg-[#E9DCCB]/60 border border-[#E9DCCB] rounded-full transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Warm Sand Side Box */}
          <div className="md:col-span-5">
            <div className="bg-[#F4E3D3]/80 border border-[#E9DCCB] rounded-2xl p-6 sm:p-8 space-y-5">
              <a
                href="mailto:spanishconmeli@gmail.com"
                className="flex items-center gap-3.5 text-sm sm:text-base text-[#22334A] hover:text-[#C8553D] transition-colors font-medium break-all"
              >
                <Mail className="w-5 h-5 text-[#22334A] shrink-0" />
                <span>spanishconmeli@gmail.com</span>
              </a>

              <a
                href="https://instagram.com/spanishconmeli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-sm sm:text-base text-[#22334A] hover:text-[#C8553D] transition-colors font-medium"
              >
                <Instagram className="w-5 h-5 text-[#22334A] shrink-0" />
                <span>@spanishconmeli</span>
              </a>

              <div className="flex items-center gap-3.5 text-sm sm:text-base text-[#22334A] font-medium">
                <Clock className="w-5 h-5 text-[#22334A] shrink-0" />
                <span>Reply within 24 h</span>
              </div>

              <div className="pt-4 border-t border-[#E9DCCB] space-y-3">
                <p className="text-sm text-[#22334A]/85 flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-[#C8553D] shrink-0" />
                  <span>Prefer to chat live?</span>
                </p>
                <a
                  href={calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] w-full inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer"
                >
                  Book a trial lesson
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
