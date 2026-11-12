import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Course } from '../types';
import { Check, ChevronDown, ChevronUp, Clock, Sparkles } from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { courses, siteConfig, setActiveView } = useCMS();
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const toggleSyllabus = (courseId: string) => {
    setExpandedSyllabus((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleEnrollClick = (course: Course) => {
    setSelectedCourseForEnroll(course);
    setEnrollSuccess(false);
  };

  return (
    <section id="courses-section" className="py-16 md:py-24 bg-[#FAF9F5] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#C73E29] uppercase tracking-wider mb-2">
            Programas Formativos
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
            Cursos diseñados para hablar y disfrutar
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57514A]">
            Elige el programa que se ajuste a tu nivel actual o haz nuestro test gratuito para recibir una
            recomendación a medida.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const isExpanded = expandedSyllabus[course.id];
            const currency = course.currency || siteConfig.currencySymbol || '€';

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  course.popular
                    ? 'border-[#C73E29] ring-2 ring-[#C73E29]/10'
                    : 'border-[#EAE5D9]'
                }`}
              >
                <div>
                  {/* Course Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F0ECE2]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {course.badge && (
                      <span className="absolute top-3 left-3 bg-[#1E1B18] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {course.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#1E1B18] text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C73E29]" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Level Kicker */}
                    <div className="text-xs font-semibold text-[#C73E29] mb-1.5">
                      {course.level}
                    </div>

                    <h3 className="text-xl font-bold text-[#1E1B18] tracking-tight leading-snug">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#57514A] leading-relaxed">
                      {course.tagline}
                    </p>

                    {/* Pricing with customizable currency */}
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#1E1B18] tabular-nums">
                        {course.price} {currency}
                      </span>
                      {course.originalPrice && (
                        <span className="text-sm text-[#8C827A] line-through tabular-nums">
                          {course.originalPrice} {currency}
                        </span>
                      )}
                      <span className="text-xs text-[#2A9D8F] font-semibold ml-auto">
                        Pago único
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="mt-6 space-y-2.5 text-xs text-[#443E38]">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Syllabus */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#F0ECE2]">
                        <button
                          onClick={() => toggleSyllabus(course.id)}
                          className="flex items-center justify-between w-full text-xs font-bold text-[#1E1B18] hover:text-[#C73E29] transition-colors cursor-pointer py-1"
                        >
                          <span>Ver temario ({course.syllabus.length} módulos)</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2.5 animate-fadeIn">
                            {course.syllabus.map((s, idx) => (
                              <div
                                key={idx}
                                className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EAE5D9] text-xs"
                              >
                                <p className="font-bold text-[#1E1B18]">{s.title}</p>
                                <p className="text-[#665E55] mt-0.5">{s.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleEnrollClick(course)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      course.popular
                        ? 'bg-[#C73E29] hover:bg-[#AB3220] text-white shadow-xs'
                        : 'bg-[#1E1B18] hover:bg-[#332E29] text-white'
                    }`}
                  >
                    {course.ctaText || 'Empezar Curso'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Quiz Banner Callout */}
        <div className="mt-14 bg-gradient-to-r from-[#FAF0E6] via-[#FDF7F0] to-[#FAF0E6] border border-[#EAD7C5] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <span className="text-xs font-bold text-[#C73E29] uppercase tracking-wider">
              ¿No estás seguro de cuál elegir?
            </span>
            <h3 className="text-xl font-bold text-[#1E1B18] mt-1">
              Descubre tu nivel exacto en 3 minutos con el Quiz
            </h3>
            <p className="text-xs sm:text-sm text-[#57514A] mt-1.5">
              Te diremos qué curso se adapta mejor a tu punto de partida y tus objetivos de fluidez.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shrink-0 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Hacer Quiz Gratis</span>
          </button>
        </div>
      </div>

      {/* Enrollment Simulation Modal */}
      {selectedCourseForEnroll && (
        <div
          className="fixed inset-0 z-50 bg-[#1E1B18]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedCourseForEnroll(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#EAE5D9]"
            onClick={(e) => e.stopPropagation()}
          >
            {!enrollSuccess ? (
              <div>
                <div className="text-xs font-semibold text-[#C73E29] mb-1">Inscripción al curso</div>
                <h3 className="text-xl font-bold text-[#1E1B18]">{selectedCourseForEnroll.title}</h3>
                <p className="text-xs text-[#57514A] mt-1">{selectedCourseForEnroll.level}</p>

                <div className="my-5 p-4 bg-[#FAF9F5] rounded-xl border border-[#EAE5D9]">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#1E1B18]">
                    <span>Total del programa:</span>
                    <span className="text-xl font-bold text-[#C73E29]">
                      {selectedCourseForEnroll.price} {selectedCourseForEnroll.currency || siteConfig.currencySymbol || '€'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#665E55] mt-1">
                    Acceso de por vida · Garantía de devolución de 14 días
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEnrollSuccess(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B18] mb-1">
                      Nombre completo
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D5CFC4] focus:outline-none focus:ring-2 focus:ring-[#C73E29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B18] mb-1">
                      Correo electrónico
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#D5CFC4] focus:outline-none focus:ring-2 focus:ring-[#C73E29]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCourseForEnroll(null)}
                      className="flex-1 py-2.5 text-xs font-semibold text-[#57514A] bg-[#F0ECE2] hover:bg-[#E5DDCF] rounded-xl transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl transition-colors cursor-pointer"
                    >
                      Confirmar Acceso
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#1E1B18]">¡Bienvenido al curso!</h4>
                <p className="text-xs text-[#57514A] mt-2">
                  Hemos enviado los datos de acceso y tu recibo a tu correo. ¡Prepárate para empezar a
                  hablar español real!
                </p>
                <button
                  onClick={() => setSelectedCourseForEnroll(null)}
                  className="mt-6 w-full py-2.5 text-xs font-bold text-white bg-[#1E1B18] hover:bg-[#332E29] rounded-xl cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
