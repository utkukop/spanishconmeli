import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Course, QuizQuestion, ResourceItem, Testimonial } from '../types';
import {
  Save,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  FileSpreadsheet,
  Settings,
  BookOpen,
  HelpCircle,
  Users,
  MessageSquare,
  Sparkles,
  Check,
  Lock,
  ExternalLink,
  LogOut,
  Sliders,
  ChevronRight,
  Globe,
  DollarSign,
  Volume2,
} from 'lucide-react';

export const BackofficePage: React.FC = () => {
  const {
    siteConfig,
    draftData,
    hasUnpublishedChanges,
    updateDraftConfig,
    updateDraftCourses,
    addDraftCourse,
    updateDraftCourse,
    deleteDraftCourse,
    updateDraftResources,
    addDraftResource,
    deleteDraftResource,
    updateDraftTestimonials,
    addDraftTestimonial,
    deleteDraftTestimonial,
    updateDraftQuizQuestions,
    addDraftQuizQuestion,
    updateDraftQuizQuestion,
    deleteDraftQuizQuestion,
    deleteLead,
    saveAndPublish,
    discardDraft,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    isBackofficeAuthenticated,
    loginBackoffice,
    logoutBackoffice,
    exitBackoffice,
    lastPublishedAt,
  } = useCMS();

  // Authentication State
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    | 'header'
    | 'hero'
    | 'methodology'
    | 'courses'
    | 'quiz'
    | 'resources'
    | 'testimonials'
    | 'about'
    | 'footer'
    | 'leads'
    | 'backup'
  >('hero');

  // Global Notification State
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'info' } | null>(
    null
  );

  // Modal Editing States
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  // Local helper states for list inputs
  const [newBulletText, setNewBulletText] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  const showNotification = (msg: string, type: 'success' | 'info' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // If not authenticated, display secure Backoffice Login Gate
  if (!isBackofficeAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginBackoffice(passcodeInput);
      if (success) {
        setAuthError('');
        setPasscodeInput('');
      } else {
        setAuthError('Incorrect passcode. Please enter the master administrative key (e.g. meli2026).');
      }
    };

    return (
      <div className="min-h-screen bg-[#1E1B18] text-[#D5CFC4] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-[#28231F] border border-[#3E3731] rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#C73E29]/20 text-[#C73E29] border border-[#C73E29]/30 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {siteConfig.siteName || 'spanishconmeli'}
              <span className="text-[#C73E29]">.</span>
            </h1>
            <p className="text-xs text-[#A8A196] mt-1 font-medium uppercase tracking-wider">
              Backoffice CMS & Content Portal
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#EAE5D9] mb-1.5">
                Admin Master Passcode
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode (e.g. meli2026)"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  if (authError) setAuthError('');
                }}
                className="w-full px-4 py-3 text-sm rounded-xl bg-[#1E1B18] border border-[#4A423A] text-white focus:outline-none focus:ring-2 focus:ring-[#C73E29] transition-all"
              />
              {authError && <p className="text-xs text-red-400 mt-2 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#C73E29] hover:bg-[#AB3220] text-white text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Log In to Backoffice</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#3E3731] flex items-center justify-between text-xs text-[#8C827A]">
            <span>
              Demo passcode: <strong className="text-white">meli2026</strong>
            </span>
            <button
              onClick={exitBackoffice}
              className="text-[#C73E29] hover:underline font-semibold cursor-pointer"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle Save and Publish
  const handleSaveAndPublish = () => {
    saveAndPublish();
    showNotification('Published successfully! All changes are now live on the public website.', 'success');
  };

  const handleDiscardDraft = () => {
    if (
      window.confirm(
        'Are you sure you want to discard your unpublished draft changes and revert to the live version?'
      )
    ) {
      discardDraft();
      showNotification('Draft discarded. Restored last published version.', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1E1B18] flex flex-col font-sans">
      {/* Top Administration Bar */}
      <header className="sticky top-0 z-50 bg-[#1E1B18] text-white border-b border-[#332E29] px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Status Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-black tracking-tight">
              {draftData.siteConfig.siteName}
              <span className="text-[#C73E29]">.</span>
            </span>
            <span className="bg-[#2E2823] border border-[#443D36] text-[#D5CFC4] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
              Backoffice CMS
            </span>

            {/* Unpublished Status Pill */}
            {hasUnpublishedChanges ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Draft has unpublished changes</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                <Check className="w-3.5 h-3.5" />
                <span>All changes published & live</span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {hasUnpublishedChanges && (
              <button
                onClick={handleDiscardDraft}
                className="px-3 py-1.5 text-xs font-semibold text-[#A8A196] hover:text-white bg-[#2B2520] hover:bg-[#3D352F] rounded-lg transition-colors cursor-pointer"
                title="Discard uncommitted draft changes"
              >
                Discard Draft
              </button>
            )}

            {/* Primary Save & Publish Button */}
            <button
              onClick={handleSaveAndPublish}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                hasUnpublishedChanges
                  ? 'bg-[#C73E29] hover:bg-[#AB3220] text-white ring-2 ring-[#C73E29]/50 animate-bounce-subtle'
                  : 'bg-[#2A9D8F] hover:bg-[#238276] text-white'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Live</span>
            </button>

            {/* Exit to Public Website */}
            <button
              onClick={exitBackoffice}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D5CFC4] hover:text-white bg-[#2B2520] hover:bg-[#3D352F] rounded-lg transition-colors cursor-pointer"
              title="Open public website view"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Logout */}
            <button
              onClick={logoutBackoffice}
              className="p-1.5 text-[#A8A196] hover:text-red-400 rounded-lg cursor-pointer transition-colors"
              title="Log out of backoffice"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Notification Banner */}
      {notification && (
        <div
          className={`py-2.5 px-4 text-xs font-semibold text-center border-b transition-all flex items-center justify-center gap-2 ${
            notification.type === 'success'
              ? 'bg-[#2A9D8F]/15 border-[#2A9D8F]/30 text-[#19645B]'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Backoffice Content Area: Sidebar + Editor Viewport */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="bg-white rounded-2xl p-3 border border-[#EAE5D9] shadow-xs space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-[#8C827A] uppercase tracking-wider flex items-center justify-between">
              <span>Website Structure</span>
              <Globe className="w-3.5 h-3.5 text-[#8C827A]" />
            </div>

            <button
              onClick={() => setActiveTab('header')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'header'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Header & Announcement</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'hero'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Hero (Homepage Banner)</span>
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'methodology'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Methodology & Comparison</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Courses & Pricing</span>
              </div>
              <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-mono">
                {draftData.courses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4" />
                <span>Interactive Level Quiz</span>
              </div>
              <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-mono">
                {draftData.quizQuestions.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Podcasts & Free Guides</span>
              </div>
              <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-mono">
                {draftData.resources.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Student Testimonials</span>
              </div>
              <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-mono">
                {draftData.testimonials.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>About Teacher Meli</span>
            </button>

            <button
              onClick={() => setActiveTab('footer')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'footer'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Footer & Newsletter</span>
            </button>
          </div>

          {/* Data & Admin Management Box */}
          <div className="bg-white rounded-2xl p-3 border border-[#EAE5D9] shadow-xs space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-[#8C827A] uppercase tracking-wider">
              Data & System
            </div>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#C73E29] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Captured Leads</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-bold">
                {draftData.leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'backup'
                  ? 'bg-[#1E1B18] text-white shadow-xs'
                  : 'text-[#57514A] hover:bg-[#F0ECE2]'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Import / Export (JSON)</span>
            </button>
          </div>

          {/* Sync Status Info Box */}
          <div className="p-4 bg-white rounded-2xl border border-[#EAE5D9] text-xs text-[#78716C] shadow-xs">
            <p className="font-bold text-[#1E1B18] mb-1">Last Live Publication:</p>
            <p className="font-mono text-[11px] text-[#57514A]">
              {lastPublishedAt ? new Date(lastPublishedAt).toLocaleString() : 'Recently'}
            </p>
            <p className="text-[11px] text-[#A8A196] mt-2">
              All form inputs support any language (English, Spanish, Turkish, etc.).
            </p>
          </div>
        </div>

        {/* Right Editor Viewport */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5D9] shadow-xs">
          {/* TAB 1: HEADER & ANNOUNCEMENT */}
          {activeTab === 'header' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B18]">Header & Top Navigation Settings</h2>
                <p className="text-xs text-[#57514A] mt-1">
                  Manage the brand identity, top promotional announcement bar, currency symbol, and CTA button.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Brand / Website Name
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.siteName}
                      onChange={(e) => updateDraftConfig({ siteName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4] focus:ring-2 focus:ring-[#C73E29]"
                      placeholder="e.g. spanishconmeli"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span>Default Currency Symbol</span>
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.currencySymbol || '€'}
                      onChange={(e) => updateDraftConfig({ currencySymbol: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4] font-bold focus:ring-2 focus:ring-[#C73E29]"
                      placeholder="€, $, ₺, or £"
                    />
                    <p className="text-[11px] text-[#8C827A] mt-1">
                      Applied across all course cards and checkout CTAs.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Main Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={draftData.siteConfig.brandTagline}
                    onChange={(e) => updateDraftConfig({ brandTagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4]"
                    placeholder="e.g. Aprende el español real de la calle, sin rodeos"
                  />
                </div>

                {/* Announcement Bar Settings */}
                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#EAE5D9] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1E1B18]">
                        Top Announcement Bar (Promotion Ribbon)
                      </h4>
                      <p className="text-[11px] text-[#665E55]">
                        Display discount announcements or new course launches at the very top of the page.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftData.siteConfig.announcementActive}
                        onChange={(e) =>
                          updateDraftConfig({ announcementActive: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2A9D8F]" />
                    </label>
                  </div>

                  {draftData.siteConfig.announcementActive && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-[#57514A] mb-1">
                          Announcement Message
                        </label>
                        <input
                          type="text"
                          value={draftData.siteConfig.announcementText}
                          onChange={(e) => updateDraftConfig({ announcementText: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4] bg-white"
                          placeholder="e.g. Nuevo Grupo de Conversación Nivel B1 abierto"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#57514A] mb-1">
                          Link Button Text
                        </label>
                        <input
                          type="text"
                          value={draftData.siteConfig.announcementLinkText}
                          onChange={(e) =>
                            updateDraftConfig({ announcementLinkText: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4] bg-white"
                          placeholder="e.g. Ver Detalles →"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Header Primary Button Text (CTA)
                  </label>
                  <input
                    type="text"
                    value={draftData.siteConfig.headerCtaText}
                    onChange={(e) => updateDraftConfig({ headerCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4]"
                    placeholder="e.g. Hacer Test de Nivel"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B18]">Hero Section (Homepage Banner)</h2>
                <p className="text-xs text-[#57514A] mt-1">
                  Customize the main headline, introductory copy, teacher photo, key bullet points, and social proof stats.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Top Kicker / Badge Text
                  </label>
                  <input
                    type="text"
                    value={draftData.siteConfig.heroBadge}
                    onChange={(e) => updateDraftConfig({ heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4]"
                    placeholder="e.g. Método Conversacional Directo · Aprende Español Real"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Main Headline (H1)
                  </label>
                  <textarea
                    rows={2}
                    value={draftData.siteConfig.heroHeadline}
                    onChange={(e) => updateDraftConfig({ heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4]"
                    placeholder="e.g. Deja los libros aburridos. Habla español como un nativo en 90 días."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Supporting Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={draftData.siteConfig.heroSubtitle}
                    onChange={(e) => updateDraftConfig({ heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4]"
                    placeholder="Explain the unique value proposition and conversational focus..."
                  />
                </div>

                {/* Hero Image URL */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Hero Image URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={draftData.siteConfig.heroImage}
                      onChange={(e) => updateDraftConfig({ heroImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-[#D5CFC4]"
                      placeholder="Image URL or local asset path"
                    />
                    <img
                      src={draftData.siteConfig.heroImage}
                      alt="Hero preview"
                      className="w-14 h-12 rounded-xl object-cover border border-[#EAE5D9] shrink-0"
                    />
                  </div>
                </div>

                {/* Bullets List */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1.5">
                    Key Value Points (Checkmarks)
                  </label>
                  <div className="space-y-2 mb-2">
                    {draftData.siteConfig.heroBullets.map((bullet, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const updated = [...draftData.siteConfig.heroBullets];
                            updated[i] = e.target.value;
                            updateDraftConfig({ heroBullets: updated });
                          }}
                          className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = draftData.siteConfig.heroBullets.filter((_, idx) => idx !== i);
                            updateDraftConfig({ heroBullets: updated });
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Delete bullet point"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a new highlight bullet point..."
                      value={newBulletText}
                      onChange={(e) => setNewBulletText(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newBulletText.trim()) return;
                        updateDraftConfig({
                          heroBullets: [...draftData.siteConfig.heroBullets, newBulletText.trim()],
                        });
                        setNewBulletText('');
                      }}
                      className="px-3 py-2 bg-[#F0ECE2] hover:bg-[#E5DDCF] text-xs font-bold text-[#1E1B18] rounded-lg cursor-pointer"
                    >
                      Add Point
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.heroCtaPrimaryText}
                      onChange={(e) => updateDraftConfig({ heroCtaPrimaryText: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Secondary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.heroCtaSecondaryText}
                      onChange={(e) =>
                        updateDraftConfig({ heroCtaSecondaryText: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                </div>

                {/* Social Proof Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Rating Score
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.heroStatRating}
                      onChange={(e) => updateDraftConfig({ heroStatRating: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                      placeholder="e.g. 4.9/5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Number of Reviews
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.heroStatReviews}
                      onChange={(e) => updateDraftConfig({ heroStatReviews: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                      placeholder="e.g. 1,400+ Reseñas"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Community Size
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.heroStatCommunity}
                      onChange={(e) => updateDraftConfig({ heroStatCommunity: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                      placeholder="e.g. 25k+ Estudiantes"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: METHODOLOGY */}
          {activeTab === 'methodology' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B18]">
                  Methodology & Comparison (Textbook vs Real Spanish)
                </h2>
                <p className="text-xs text-[#57514A] mt-1">
                  Highlight why your conversational immersion method yields fluent speakers faster than rigid grammar books.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Section Kicker
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.methodologyKicker}
                      onChange={(e) => updateDraftConfig({ methodologyKicker: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.methodologyTitle}
                      onChange={(e) => updateDraftConfig({ methodologyTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={draftData.siteConfig.methodologySubtitle}
                    onChange={(e) => updateDraftConfig({ methodologySubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>

                {/* Comparison items editor */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider">
                      Comparison Examples (Textbook Phrase vs Real Native Speech)
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newComp = {
                          situation: 'New Everyday Situation',
                          textbook: '«Rigid textbook phrase»',
                          meliMethod: '«Natural conversational Spanish phrase»',
                        };
                        updateDraftConfig({
                          methodologyComparisons: [
                            ...(draftData.siteConfig.methodologyComparisons || []),
                            newComp,
                          ],
                        });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#C73E29] bg-[#C73E29]/10 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Comparison</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {draftData.siteConfig.methodologyComparisons?.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#FAF9F5] border border-[#EAE5D9] rounded-xl space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="Situation (e.g. Pedir una cerveza en un bar)"
                            value={c.situation}
                            onChange={(e) => {
                              const updated = [...draftData.siteConfig.methodologyComparisons];
                              updated[i].situation = e.target.value;
                              updateDraftConfig({ methodologyComparisons: updated });
                            }}
                            className="font-bold text-[#C73E29] bg-transparent border-b border-[#D5CFC4] pb-0.5 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = draftData.siteConfig.methodologyComparisons.filter(
                                (_, idx) => idx !== i
                              );
                              updateDraftConfig({ methodologyComparisons: updated });
                            }}
                            className="text-red-500 hover:text-red-700"
                            title="Delete comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-gray-500 font-bold block mb-0.5">
                              Traditional Textbook:
                            </span>
                            <input
                              type="text"
                              value={c.textbook}
                              onChange={(e) => {
                                const updated = [...draftData.siteConfig.methodologyComparisons];
                                updated[i].textbook = e.target.value;
                                updateDraftConfig({ methodologyComparisons: updated });
                              }}
                              className="w-full px-2 py-1 rounded border border-[#D5CFC4] bg-white text-gray-500"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-[#2A9D8F] font-bold block mb-0.5">
                              Real Native Spanish:
                            </span>
                            <input
                              type="text"
                              value={c.meliMethod}
                              onChange={(e) => {
                                const updated = [...draftData.siteConfig.methodologyComparisons];
                                updated[i].meliMethod = e.target.value;
                                updateDraftConfig({ methodologyComparisons: updated });
                              }}
                              className="w-full px-2 py-1 rounded border border-[#D5CFC4] bg-white text-[#1E1B18] font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1E1B18]">Course & Program Manager</h2>
                  <p className="text-xs text-[#57514A] mt-1">
                    Create new courses, edit pricing in any currency, manage syllabus modules, and configure enrollment badges.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newC: Course = {
                      id: `course-${Date.now()}`,
                      title: 'New Spanish Course',
                      tagline: 'Learn real conversational Spanish for everyday situations.',
                      level: 'A2 to B1 Level',
                      duration: '6 Weeks',
                      price: 99,
                      originalPrice: 149,
                      currency: draftData.siteConfig.currencySymbol || '€',
                      popular: false,
                      image: '/src/assets/images/course_conversational_1794405199538.jpg',
                      features: ['Live audio coaching', 'Interactive cheat sheets', 'Community access'],
                      syllabus: [{ title: 'Module 1: Everyday Foundations', desc: 'Speaking naturally from day one' }],
                      ctaText: 'Enroll Now',
                    };
                    addDraftCourse(newC);
                    setEditingCourse(newC);
                    showNotification('New course added to draft.', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {draftData.courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-20 h-14 rounded-xl object-cover border border-[#EAE5D9] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#1E1B18]">{course.title}</h4>
                          {course.badge && (
                            <span className="text-[10px] bg-[#1E1B18] text-white px-2 py-0.5 rounded-full font-bold">
                              {course.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#57514A] mt-0.5">{course.tagline}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-[#8C827A]">
                          <span className="font-bold text-[#1E1B18]">
                            {course.currency || draftData.siteConfig.currencySymbol || '€'}
                            {course.price}
                          </span>
                          <span>·</span>
                          <span>{course.level}</span>
                          <span>·</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingCourse({ ...course })}
                        className="px-3.5 py-1.5 text-xs font-bold text-[#1E1B18] bg-white border border-[#EAE5D9] hover:bg-[#F0ECE2] rounded-xl cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete the course "${course.title}"?`)) {
                            deleteDraftCourse(course.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: QUIZ BUILDER & LOCALIZATION */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1E1B18]">Interactive Level Quiz Builder</h2>
                  <p className="text-xs text-[#57514A] mt-1">
                    Manage the diagnostic assessment questions, CEFR level scoring, audio prompts, and localized text labels.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newQ: QuizQuestion = {
                      id: `q-${Date.now()}`,
                      title: 'New Conversational Assessment Scenario',
                      category: 'Real Dialogue',
                      scenario: 'You are ordering tapas at a busy café in Madrid. What is the most natural reply?',
                      audioPhrase: '¿Me pones una caña y una de bravas, porfa?',
                      options: [
                        { id: `opt-${Date.now()}-1`, text: 'Yo deseo agua, gracias.', points: 2, levelIndicator: 'A1' },
                        { id: `opt-${Date.now()}-2`, text: 'Quisiera un café con leche por favor.', points: 6, levelIndicator: 'B1' },
                        { id: `opt-${Date.now()}-3`, text: '¿Me pones una caña bien fría, porfa?', points: 10, levelIndicator: 'B2+', isCorrect: true },
                      ],
                    };
                    addDraftQuizQuestion(newQ);
                    setEditingQuestion(newQ);
                    showNotification('New question added to draft.', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>

              {/* Quiz Settings & Localization Card */}
              <div className="p-4 bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#2A9D8F]" />
                    <h3 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider">
                      Quiz Localization & Interface Text (Any Language)
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#8C827A]">
                    Customize how the quiz displays to users
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-[#57514A] mb-1">
                      Quiz Top Badge Title
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.quizConfig?.badgeTitle || ''}
                      onChange={(e) =>
                        updateDraftConfig({
                          quizConfig: {
                            ...draftData.siteConfig.quizConfig,
                            badgeTitle: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CFC4] bg-white"
                      placeholder="e.g. Test de Nivel Interactivo"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#57514A] mb-1 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span>Audio Speech Synthesis Language Code</span>
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.quizConfig?.speechSynthesisLanguage || 'es-ES'}
                      onChange={(e) =>
                        updateDraftConfig({
                          quizConfig: {
                            ...draftData.siteConfig.quizConfig,
                            speechSynthesisLanguage: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CFC4] bg-white font-mono"
                      placeholder="e.g. es-ES, es-MX, or en-US"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#57514A] mb-1">
                      Lead Capture Step Headline
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.quizConfig?.leadTitle || ''}
                      onChange={(e) =>
                        updateDraftConfig({
                          quizConfig: {
                            ...draftData.siteConfig.quizConfig,
                            leadTitle: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CFC4] bg-white"
                      placeholder="e.g. ¡Evaluación completada con éxito!"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#57514A] mb-1">
                      Lead Capture Submit Button Text
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.quizConfig?.leadSubmitButtonText || ''}
                      onChange={(e) =>
                        updateDraftConfig({
                          quizConfig: {
                            ...draftData.siteConfig.quizConfig,
                            leadSubmitButtonText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CFC4] bg-white"
                      placeholder="e.g. Ver Mi Nivel y Diagnóstico Completo →"
                    />
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#8C827A] uppercase tracking-wider">
                  Configured Assessment Questions ({draftData.quizQuestions.length})
                </div>

                {draftData.quizQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#C73E29] mb-1">
                        <span>Question {idx + 1}</span>
                        <span>·</span>
                        <span className="uppercase text-[10px] bg-[#C73E29]/10 px-2 py-0.5 rounded">
                          {q.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1E1B18]">{q.title}</h4>
                      <p className="text-xs text-[#57514A] mt-1 line-clamp-2">{q.scenario}</p>
                      {q.audioPhrase && (
                        <p className="text-[11px] text-[#2A9D8F] font-medium mt-1 flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Voice Prompt: «{q.audioPhrase}»</span>
                        </p>
                      )}
                      <p className="text-[11px] text-[#8C827A] mt-2">
                        {q.options.length} answer options configured
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingQuestion({ ...q })}
                        className="px-3.5 py-1.5 text-xs font-bold text-[#1E1B18] bg-white border border-[#EAE5D9] hover:bg-[#F0ECE2] rounded-xl cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete the question "${q.title}"?`)) {
                            deleteDraftQuizQuestion(q.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RESOURCES & PODCAST */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1E1B18]">Podcast & Free Resource Library</h2>
                  <p className="text-xs text-[#57514A] mt-1">
                    Manage podcast episodes, downloadable vocabulary cheatsheets, and free sample guides.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newRes: ResourceItem = {
                      id: `res-${Date.now()}`,
                      title: 'New Podcast Episode',
                      description: 'Friendly discussion on street idioms and common expressions.',
                      type: 'podcast',
                      durationOrPages: '15 min audio',
                      level: 'B1 Intermediate',
                      category: 'Everyday Conversation',
                      tags: ['Podcast', 'Real Spanish'],
                    };
                    addDraftResource(newRes);
                    showNotification('New resource added to draft.', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Resource</span>
                </button>
              </div>

              <div className="space-y-3">
                {draftData.resources.map((res, i) => (
                  <div
                    key={res.id}
                    className="p-4 bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#665E55] mb-1">
                        <span className="font-bold text-[#C73E29] uppercase">{res.category}</span>
                        <span>·</span>
                        <span className="font-medium">{res.type}</span>
                        <span>·</span>
                        <span>{res.durationOrPages}</span>
                      </div>
                      <input
                        type="text"
                        value={res.title}
                        onChange={(e) => {
                          const updated = [...draftData.resources];
                          updated[i].title = e.target.value;
                          updateDraftResources(updated);
                        }}
                        className="w-full font-bold text-sm text-[#1E1B18] bg-transparent border-b border-transparent hover:border-[#D5CFC4] focus:border-[#C73E29] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={res.description}
                        onChange={(e) => {
                          const updated = [...draftData.resources];
                          updated[i].description = e.target.value;
                          updateDraftResources(updated);
                        }}
                        className="w-full text-xs text-[#57514A] mt-1 bg-transparent border-b border-transparent hover:border-[#D5CFC4] focus:border-[#C73E29] focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteDraftResource(res.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
                      title="Delete resource"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1E1B18]">Student Testimonials & Reviews</h2>
                  <p className="text-xs text-[#57514A] mt-1">
                    Manage the authentic student success stories and social proof displayed across the website.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newT: Testimonial = {
                      id: `test-${Date.now()}`,
                      name: 'New Student',
                      location: 'City, Country',
                      countryFlag: '🇪🇸',
                      quote: 'Meli makes conversational Spanish effortless and enjoyable.',
                      resultAchieved: 'Ordered effortlessly on holiday',
                      rating: 5,
                      courseTaken: 'Conversational Fluency',
                    };
                    addDraftTestimonial(newT);
                    showNotification('Testimonial added to draft.', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftData.testimonials.map((t, i) => (
                  <div
                    key={t.id}
                    className="p-4 bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={t.countryFlag}
                          onChange={(e) => {
                            const updated = [...draftData.testimonials];
                            updated[i].countryFlag = e.target.value;
                            updateDraftTestimonials(updated);
                          }}
                          className="w-10 text-center text-lg bg-white border border-[#D5CFC4] rounded-lg"
                        />
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => {
                            const updated = [...draftData.testimonials];
                            updated[i].name = e.target.value;
                            updateDraftTestimonials(updated);
                          }}
                          className="font-bold text-sm text-[#1E1B18] bg-white px-2.5 py-1 rounded-lg border border-[#D5CFC4]"
                        />
                        <input
                          type="text"
                          value={t.location}
                          onChange={(e) => {
                            const updated = [...draftData.testimonials];
                            updated[i].location = e.target.value;
                            updateDraftTestimonials(updated);
                          }}
                          className="text-[#665E55] bg-white px-2 py-1 rounded-lg border border-[#D5CFC4]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteDraftTestimonial(t.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...draftData.testimonials];
                        updated[i].quote = e.target.value;
                        updateDraftTestimonials(updated);
                      }}
                      className="w-full p-2.5 rounded-xl border border-[#D5CFC4] bg-white text-[#1E1B18]"
                    />

                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#57514A]">Result Achieved:</span>
                      <input
                        type="text"
                        value={t.resultAchieved}
                        onChange={(e) => {
                          const updated = [...draftData.testimonials];
                          updated[i].resultAchieved = e.target.value;
                          updateDraftTestimonials(updated);
                        }}
                        className="flex-1 px-2.5 py-1 rounded-lg border border-[#D5CFC4] bg-white text-[#2A9D8F] font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT MELI */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B18]">About Teacher Meli</h2>
                <p className="text-xs text-[#57514A] mt-1">
                  Update personal biography, teacher credentials, photo URL, and social channel handles.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Teacher Name
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.teacherName}
                      onChange={(e) => updateDraftConfig({ teacherName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Professional Title / Subtitle
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.teacherTitle}
                      onChange={(e) => updateDraftConfig({ teacherTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Featured Quote / Motto
                  </label>
                  <input
                    type="text"
                    value={draftData.siteConfig.teacherQuote}
                    onChange={(e) => updateDraftConfig({ teacherQuote: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Biography (Paragraph 1)
                  </label>
                  <textarea
                    rows={3}
                    value={draftData.siteConfig.teacherBio}
                    onChange={(e) => updateDraftConfig({ teacherBio: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Biography (Paragraph 2)
                  </label>
                  <textarea
                    rows={3}
                    value={draftData.siteConfig.teacherBioParagraph2}
                    onChange={(e) =>
                      updateDraftConfig({ teacherBioParagraph2: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>

                {/* Teacher Photo URL */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Teacher Photo URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={draftData.siteConfig.teacherImage}
                      onChange={(e) => updateDraftConfig({ teacherImage: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                    <img
                      src={draftData.siteConfig.teacherImage}
                      alt="Teacher preview"
                      className="w-12 h-12 rounded-xl object-cover border border-[#EAE5D9] shrink-0"
                    />
                  </div>
                </div>

                {/* Socials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.instagramHandle}
                      onChange={(e) => updateDraftConfig({ instagramHandle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      YouTube Handle
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.youtubeHandle}
                      onChange={(e) => updateDraftConfig({ youtubeHandle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Spotify Handle
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.spotifyHandle}
                      onChange={(e) => updateDraftConfig({ spotifyHandle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: FOOTER */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B18]">Footer & Newsletter Settings</h2>
                <p className="text-xs text-[#57514A] mt-1">
                  Manage newsletter opt-in copy, welcome discount codes, address, and legal copyright notices.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Footer Description
                  </label>
                  <textarea
                    rows={2}
                    value={draftData.siteConfig.footerDescription}
                    onChange={(e) => updateDraftConfig({ footerDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Newsletter Headline
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.footerNewsletterTitle}
                      onChange={(e) =>
                        updateDraftConfig({ footerNewsletterTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Welcome Discount Promo Code
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.newsletterDiscountCode}
                      onChange={(e) =>
                        updateDraftConfig({ newsletterDiscountCode: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4] font-mono font-bold text-[#C73E29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    Newsletter Explanation
                  </label>
                  <input
                    type="text"
                    value={draftData.siteConfig.footerNewsletterDesc}
                    onChange={(e) =>
                      updateDraftConfig({ footerNewsletterDesc: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.footerCopyright}
                      onChange={(e) => updateDraftConfig({ footerCopyright: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                      Location / City
                    </label>
                    <input
                      type="text"
                      value={draftData.siteConfig.footerAddress}
                      onChange={(e) => updateDraftConfig({ footerAddress: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1E1B18]">Captured Student Leads & Quiz Test-Takers</h2>
                  <p className="text-xs text-[#57514A] mt-1">
                    Real-time list of visitors who completed the diagnostic quiz or opted into the newsletter.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const headers = 'ID,Name,Email,Source,Quiz_Level,Quiz_Score,Created_Date\n';
                    const rows = draftData.leads
                      .map(
                        (l) =>
                          `"${l.id}","${l.name}","${l.email}","${l.source}","${l.quizLevel || ''}","${
                            l.quizScore || ''
                          }","${l.createdAt}"`
                      )
                      .join('\n');
                    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `leads_spanishconmeli_${new Date().toISOString().slice(0, 10)}.csv`;
                    link.click();
                    URL.revokeObjectURL(url);
                    showNotification('CSV exported successfully.', 'success');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1E1B18] bg-[#F0ECE2] hover:bg-[#E5DDCF] rounded-xl transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Download CSV ({draftData.leads.length})</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-[#EAE5D9] rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] text-[#57514A] border-b border-[#EAE5D9]">
                    <tr>
                      <th className="py-3 px-4 font-bold">Name</th>
                      <th className="py-3 px-4 font-bold">Email</th>
                      <th className="py-3 px-4 font-bold">Source</th>
                      <th className="py-3 px-4 font-bold">Assessed Level</th>
                      <th className="py-3 px-4 font-bold">Score</th>
                      <th className="py-3 px-4 font-bold">Date</th>
                      <th className="py-3 px-4 text-right font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5D9] bg-white">
                    {draftData.leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#FAF9F5]">
                        <td className="py-3 px-4 font-medium text-[#1E1B18]">{lead.name}</td>
                        <td className="py-3 px-4 text-[#57514A] font-mono">{lead.email}</td>
                        <td className="py-3 px-4">
                          <span className="bg-[#F0ECE2] px-2 py-0.5 rounded text-[10px] font-bold">
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#C73E29]">
                          {lead.quizLevel || '—'}
                        </td>
                        <td className="py-3 px-4 tabular-nums">
                          {lead.quizScore !== undefined ? `${lead.quizScore}%` : '—'}
                        </td>
                        <td className="py-3 px-4 text-[#8C827A] text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => deleteLead(lead.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {draftData.leads.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#8C827A]">
                          No leads captured yet. Take the quiz on the public site to test.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B18]">Backup & Restore (Complete JSON)</h2>
                <p className="text-xs text-[#57514A] mt-1">
                  Export the entire database, courses, quiz questions, and testimonials to an offline JSON file for total portability.
                </p>
              </div>

              {/* Complete Project ZIP for Antigravity & GitHub */}
              <div className="p-5 bg-[#FAF9F5] rounded-2xl border-2 border-[#C73E29]/20 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#C73E29]">📦</span>
                  <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider">
                    Full Source Code Package (.ZIP for Antigravity & GitHub)
                  </h4>
                </div>
                <p className="text-xs text-[#57514A]">
                  Download the entire project source code (all React components, TypeScript types, assets, images, tests, README, and .gitignore) to open with Antigravity or push to GitHub.
                </p>
                <a
                  href="/spanishconmeli.zip"
                  download="spanishconmeli.zip"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Project ZIP (3.8 MB)</span>
                </a>
              </div>

              {/* Export Box */}
              <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-[#EAE5D9] space-y-3">
                <h4 className="text-xs font-bold text-[#1E1B18]">Export All Website Content (JSON)</h4>
                <p className="text-xs text-[#57514A]">
                  Downloads a comprehensive backup containing all configurations, course catalog, quiz questions, testimonials, and leads.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const json = exportDataJSON();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `spanishconmeli_backup_${new Date().toISOString().slice(0, 10)}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                    showNotification('JSON backup file downloaded.', 'success');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1E1B18] hover:bg-[#332E29] rounded-xl cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full JSON Backup</span>
                </button>
              </div>

              {/* Import Box */}
              <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-[#EAE5D9] space-y-3">
                <h4 className="text-xs font-bold text-[#1E1B18]">Import Website Content from JSON</h4>
                <textarea
                  rows={4}
                  placeholder="Paste your JSON backup data string here..."
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    if (importError) setImportError('');
                  }}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#D5CFC4] bg-white"
                />
                {importError && <p className="text-xs text-red-600">{importError}</p>}
                <button
                  type="button"
                  onClick={() => {
                    if (!importJsonText.trim()) return;
                    const ok = importDataJSON(importJsonText);
                    if (ok) {
                      setImportJsonText('');
                      showNotification('Data successfully imported into draft.', 'success');
                    } else {
                      setImportError('Invalid JSON format. Please verify your backup string.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Load & Import into Draft</span>
                </button>
              </div>

              {/* Factory Reset */}
              <div className="p-5 bg-red-50/50 rounded-2xl border border-red-200 space-y-2">
                <h4 className="text-xs font-bold text-red-800">Reset to Default Sample Data</h4>
                <p className="text-xs text-red-600 mb-2">
                  Restores the original clean starter data and sample courses.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all contents to initial default values?')) {
                      resetToDefaults();
                      showNotification('All contents reset to initial defaults.', 'info');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-700 bg-white border border-red-300 hover:bg-red-50 rounded-xl cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Course Full Editor */}
      {editingCourse && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE5D9] max-h-[88vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1E1B18] mb-4">Edit Course Program</h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold mb-1">Course Title</label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Subtitle / Tagline</label>
                <textarea
                  rows={2}
                  value={editingCourse.tagline}
                  onChange={(e) => setEditingCourse({ ...editingCourse, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Current Price</label>
                  <input
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Original Price</label>
                  <input
                    type="number"
                    value={editingCourse.originalPrice || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    placeholder="€, $, ₺, etc."
                    value={editingCourse.currency || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        currency: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4] font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Target Level</label>
                  <input
                    type="text"
                    value={editingCourse.level}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Highlight Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Best Seller, New, Most Popular"
                  value={editingCourse.badge || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingCourse.image}
                  onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              {/* Course syllabus modules */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold">Curriculum Modules</label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCourse({
                        ...editingCourse,
                        syllabus: [
                          ...editingCourse.syllabus,
                          { title: 'New Module', desc: 'Practical conversational focus' },
                        ],
                      });
                    }}
                    className="text-[11px] font-bold text-[#C73E29] hover:underline"
                  >
                    + Add Module
                  </button>
                </div>
                <div className="space-y-2">
                  {editingCourse.syllabus.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#EAE5D9] space-y-1.5"
                    >
                      <input
                        type="text"
                        value={s.title}
                        onChange={(e) => {
                          const updated = [...editingCourse.syllabus];
                          updated[idx].title = e.target.value;
                          setEditingCourse({ ...editingCourse, syllabus: updated });
                        }}
                        className="w-full px-2 py-1 text-xs font-bold rounded border border-[#D5CFC4] bg-white"
                      />
                      <input
                        type="text"
                        value={s.desc}
                        onChange={(e) => {
                          const updated = [...editingCourse.syllabus];
                          updated[idx].desc = e.target.value;
                          setEditingCourse({ ...editingCourse, syllabus: updated });
                        }}
                        className="w-full px-2 py-1 text-[11px] rounded border border-[#D5CFC4] bg-white text-[#665E55]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#EAE5D9]">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#57514A] bg-[#F0ECE2] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateDraftCourse(editingCourse);
                    setEditingCourse(null);
                    showNotification('Course updated in draft.', 'info');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl cursor-pointer"
                >
                  Save Course Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Quiz Question Full Editor */}
      {editingQuestion && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE5D9] max-h-[88vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1E1B18] mb-4">Edit Quiz Question</h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold mb-1">Question Title</label>
                <input
                  type="text"
                  value={editingQuestion.title}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, title: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Category</label>
                <input
                  type="text"
                  value={editingQuestion.category}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, category: e.target.value })
                  }
                  placeholder="e.g. Real Dialogue, Slang, Grammar, Listening, or Günlük Konuşma"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Scenario / Context</label>
                <textarea
                  rows={3}
                  value={editingQuestion.scenario}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, scenario: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>Audio Prompt Phrase (Read Aloud by Browser Speech)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ¿Me pones una caña, porfa?"
                  value={editingQuestion.audioPhrase || ''}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, audioPhrase: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CFC4]"
                />
              </div>

              {/* Answer Options */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold">Answer Options</label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingQuestion({
                        ...editingQuestion,
                        options: [
                          ...editingQuestion.options,
                          {
                            id: `opt-${Date.now()}`,
                            text: 'New answer option',
                            points: 5,
                            levelIndicator: 'B1',
                          },
                        ],
                      });
                    }}
                    className="text-[11px] font-bold text-[#C73E29] hover:underline cursor-pointer"
                  >
                    + Add Option
                  </button>
                </div>

                {editingQuestion.options.map((opt, i) => (
                  <div key={opt.id} className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAE5D9] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...editingQuestion.options];
                          newOpts[i].text = e.target.value;
                          setEditingQuestion({ ...editingQuestion, options: newOpts });
                        }}
                        className="flex-1 px-2.5 py-1 text-xs rounded border border-[#D5CFC4] bg-white"
                        placeholder="Option text..."
                      />
                      <select
                        value={opt.levelIndicator}
                        onChange={(e) => {
                          const newOpts = [...editingQuestion.options];
                          newOpts[i].levelIndicator = e.target.value as any;
                          setEditingQuestion({ ...editingQuestion, options: newOpts });
                        }}
                        className="px-2 py-1 text-xs rounded border border-[#D5CFC4] bg-white font-bold"
                      >
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2+">B2+</option>
                      </select>
                      <input
                        type="number"
                        title="Points awarded (0-10)"
                        value={opt.points}
                        onChange={(e) => {
                          const newOpts = [...editingQuestion.options];
                          newOpts[i].points = Number(e.target.value);
                          setEditingQuestion({ ...editingQuestion, options: newOpts });
                        }}
                        className="w-14 px-2 py-1 text-xs rounded border border-[#D5CFC4] bg-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newOpts = editingQuestion.options.filter((_, idx) => idx !== i);
                          setEditingQuestion({ ...editingQuestion, options: newOpts });
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#EAE5D9]">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#57514A] bg-[#F0ECE2] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateDraftQuizQuestion(editingQuestion);
                    setEditingQuestion(null);
                    showNotification('Question saved to draft.', 'info');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#C73E29] hover:bg-[#AB3220] rounded-xl cursor-pointer"
                >
                  Save Question Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
