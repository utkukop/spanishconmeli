import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Course,
  Lead,
  QuizQuestion,
  ResourceItem,
  SiteConfig,
  Testimonial,
  WebsiteData,
} from '../types';
import {
  INITIAL_COURSES,
  INITIAL_QUIZ_QUESTIONS,
  INITIAL_RESOURCES,
  INITIAL_SITE_CONFIG,
  INITIAL_TESTIMONIALS,
} from '../data/initialContent';

const STORAGE_KEYS = {
  PUBLISHED_DATA: 'spanishconmeli_published_data_v2',
  DRAFT_DATA: 'spanishconmeli_draft_data_v2',
  AUTH_SESSION: 'spanishconmeli_backoffice_auth_v2',
};

const DEFAULT_WEBSITE_DATA: WebsiteData = {
  siteConfig: INITIAL_SITE_CONFIG,
  courses: INITIAL_COURSES,
  resources: INITIAL_RESOURCES,
  testimonials: INITIAL_TESTIMONIALS,
  quizQuestions: INITIAL_QUIZ_QUESTIONS,
  leads: [
    {
      id: 'lead-demo-1',
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      source: 'quiz',
      quizLevel: 'A2',
      quizScore: 42,
      createdAt: '2026-11-10T14:22:00Z',
    },
    {
      id: 'lead-demo-2',
      name: 'James Walker',
      email: 'jwalker@example.co.uk',
      source: 'newsletter',
      createdAt: '2026-11-09T09:15:00Z',
    },
  ],
  lastPublishedAt: new Date().toISOString(),
};

interface CMSContextType {
  // Public live data
  siteConfig: SiteConfig;
  courses: Course[];
  resources: ResourceItem[];
  testimonials: Testimonial[];
  quizQuestions: QuizQuestion[];
  leads: Lead[];
  lastPublishedAt?: string;

  // Working draft data (used in Backoffice)
  draftData: WebsiteData;
  hasUnpublishedChanges: boolean;
  updateDraftConfig: (newConfig: Partial<SiteConfig>) => void;
  updateDraftCourses: (courses: Course[]) => void;
  addDraftCourse: (course: Course) => void;
  updateDraftCourse: (course: Course) => void;
  deleteDraftCourse: (id: string) => void;
  updateDraftResources: (resources: ResourceItem[]) => void;
  addDraftResource: (res: ResourceItem) => void;
  updateDraftResource: (res: ResourceItem) => void;
  deleteDraftResource: (id: string) => void;
  updateDraftTestimonials: (testimonials: Testimonial[]) => void;
  addDraftTestimonial: (t: Testimonial) => void;
  updateDraftTestimonial: (t: Testimonial) => void;
  deleteDraftTestimonial: (id: string) => void;
  updateDraftQuizQuestions: (questions: QuizQuestion[]) => void;
  addDraftQuizQuestion: (q: QuizQuestion) => void;
  updateDraftQuizQuestion: (q: QuizQuestion) => void;
  deleteDraftQuizQuestion: (id: string) => void;
  deleteLead: (id: string) => void;

  // Actions
  saveAndPublish: () => void;
  discardDraft: () => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;

  // Navigation & Routing
  activeView: 'home' | 'quiz' | 'courses' | 'resources' | 'about';
  setActiveView: (view: 'home' | 'quiz' | 'courses' | 'resources' | 'about') => void;

  // Backoffice State & Security
  isBackofficeMode: boolean;
  isBackofficeAuthenticated: boolean;
  loginBackoffice: (passcode: string) => boolean;
  logoutBackoffice: () => void;
  enterBackoffice: () => void;
  exitBackoffice: () => void;
  previewMode: 'live' | 'draft';
  setPreviewMode: (mode: 'live' | 'draft') => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load published data (what regular visitors see)
  const [publishedData, setPublishedData] = useState<WebsiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PUBLISHED_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_WEBSITE_DATA,
          ...parsed,
          siteConfig: { ...DEFAULT_WEBSITE_DATA.siteConfig, ...(parsed.siteConfig || {}) },
        };
      }
      return DEFAULT_WEBSITE_DATA;
    } catch {
      return DEFAULT_WEBSITE_DATA;
    }
  });

  // Load draft data (working state inside backoffice)
  const [draftData, setDraftData] = useState<WebsiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRAFT_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_WEBSITE_DATA,
          ...parsed,
          siteConfig: { ...DEFAULT_WEBSITE_DATA.siteConfig, ...(parsed.siteConfig || {}) },
        };
      }
      // Defaults to matching published data
      return publishedData;
    } catch {
      return publishedData;
    }
  });

  // Backoffice mode detection based on URL
  const checkIsBackofficeUrl = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const host = window.location.hostname.toLowerCase();

    return (
      path.startsWith('/admin') ||
      path.startsWith('/backoffice') ||
      search.includes('admin') ||
      search.includes('backoffice') ||
      hash.includes('backoffice') ||
      hash.includes('admin') ||
      host.startsWith('admin.') ||
      host.startsWith('backoffice.')
    );
  };

  const [isBackofficeMode, setIsBackofficeMode] = useState<boolean>(checkIsBackofficeUrl);

  const [isBackofficeAuthenticated, setIsBackofficeAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  const [previewMode, setPreviewMode] = useState<'live' | 'draft'>('live');
  const [activeView, setActiveView] = useState<'home' | 'quiz' | 'courses' | 'resources' | 'about'>('home');

  // Listen to popstate / hash / key events for secret backoffice toggle
  useEffect(() => {
    const handleUrlChange = () => {
      setIsBackofficeMode(checkIsBackofficeUrl());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open Backoffice
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsBackofficeMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Persist published data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PUBLISHED_DATA, JSON.stringify(publishedData));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [publishedData]);

  // Persist draft data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFT_DATA, JSON.stringify(draftData));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [draftData]);

  // Check if draft has changes compared to published
  const hasUnpublishedChanges =
    JSON.stringify(draftData.siteConfig) !== JSON.stringify(publishedData.siteConfig) ||
    JSON.stringify(draftData.courses) !== JSON.stringify(publishedData.courses) ||
    JSON.stringify(draftData.quizQuestions) !== JSON.stringify(publishedData.quizQuestions) ||
    JSON.stringify(draftData.resources) !== JSON.stringify(publishedData.resources) ||
    JSON.stringify(draftData.testimonials) !== JSON.stringify(publishedData.testimonials);

  // Authentication methods
  const loginBackoffice = (passcode: string): boolean => {
    const normalized = passcode.trim().toLowerCase();
    // Default admin key: meli2026 or admin
    if (normalized === 'meli2026' || normalized === 'admin' || normalized === 'meli') {
      setIsBackofficeAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutBackoffice = () => {
    setIsBackofficeAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch {}
  };

  const enterBackoffice = () => {
    setIsBackofficeMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', '#backoffice');
    } catch {}
  };

  const exitBackoffice = () => {
    setIsBackofficeMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', window.location.pathname.replace(/\/admin|\/backoffice/g, '') || '/');
    } catch {}
  };

  // Draft operations
  const updateDraftConfig = (newConfig: Partial<SiteConfig>) => {
    setDraftData((prev) => ({
      ...prev,
      siteConfig: { ...prev.siteConfig, ...newConfig },
    }));
  };

  const updateDraftCourses = (courses: Course[]) => {
    setDraftData((prev) => ({ ...prev, courses }));
  };

  const addDraftCourse = (course: Course) => {
    setDraftData((prev) => ({ ...prev, courses: [course, ...prev.courses] }));
  };

  const updateDraftCourse = (course: Course) => {
    setDraftData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => (c.id === course.id ? course : c)),
    }));
  };

  const deleteDraftCourse = (id: string) => {
    setDraftData((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== id),
    }));
  };

  const updateDraftResources = (resources: ResourceItem[]) => {
    setDraftData((prev) => ({ ...prev, resources }));
  };

  const addDraftResource = (res: ResourceItem) => {
    setDraftData((prev) => ({ ...prev, resources: [res, ...prev.resources] }));
  };

  const updateDraftResource = (res: ResourceItem) => {
    setDraftData((prev) => ({
      ...prev,
      resources: prev.resources.map((r) => (r.id === res.id ? res : r)),
    }));
  };

  const deleteDraftResource = (id: string) => {
    setDraftData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r.id !== id),
    }));
  };

  const updateDraftTestimonials = (testimonials: Testimonial[]) => {
    setDraftData((prev) => ({ ...prev, testimonials }));
  };

  const addDraftTestimonial = (t: Testimonial) => {
    setDraftData((prev) => ({ ...prev, testimonials: [t, ...prev.testimonials] }));
  };

  const updateDraftTestimonial = (t: Testimonial) => {
    setDraftData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item) => (item.id === t.id ? t : item)),
    }));
  };

  const deleteDraftTestimonial = (id: string) => {
    setDraftData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const updateDraftQuizQuestions = (quizQuestions: QuizQuestion[]) => {
    setDraftData((prev) => ({ ...prev, quizQuestions }));
  };

  const addDraftQuizQuestion = (q: QuizQuestion) => {
    setDraftData((prev) => ({ ...prev, quizQuestions: [...prev.quizQuestions, q] }));
  };

  const updateDraftQuizQuestion = (q: QuizQuestion) => {
    setDraftData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.map((item) => (item.id === q.id ? q : item)),
    }));
  };

  const deleteDraftQuizQuestion = (id: string) => {
    setDraftData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.filter((q) => q.id !== id),
    }));
  };

  // Leads
  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    setPublishedData((prev) => ({ ...prev, leads: [newLead, ...prev.leads] }));
    setDraftData((prev) => ({ ...prev, leads: [newLead, ...prev.leads] }));
  };

  const deleteLead = (id: string) => {
    setPublishedData((prev) => ({ ...prev, leads: prev.leads.filter((l) => l.id !== id) }));
    setDraftData((prev) => ({ ...prev, leads: prev.leads.filter((l) => l.id !== id) }));
  };

  // SAVE AND PUBLISH: Copies current draft directly to live published site!
  const saveAndPublish = () => {
    const now = new Date().toISOString();
    const publishedPayload: WebsiteData = {
      ...draftData,
      lastPublishedAt: now,
    };
    setPublishedData(publishedPayload);
    setDraftData(publishedPayload);
    localStorage.setItem(STORAGE_KEYS.PUBLISHED_DATA, JSON.stringify(publishedPayload));
    localStorage.setItem(STORAGE_KEYS.DRAFT_DATA, JSON.stringify(publishedPayload));
  };

  // Discard draft: restores draft to currently published state
  const discardDraft = () => {
    setDraftData(publishedData);
  };

  // Factory reset
  const resetToDefaults = () => {
    setPublishedData(DEFAULT_WEBSITE_DATA);
    setDraftData(DEFAULT_WEBSITE_DATA);
    localStorage.removeItem(STORAGE_KEYS.PUBLISHED_DATA);
    localStorage.removeItem(STORAGE_KEYS.DRAFT_DATA);
  };

  // Export / Import
  const exportDataJSON = () => {
    return JSON.stringify(draftData, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.siteConfig && Array.isArray(parsed.courses)) {
        const validated: WebsiteData = {
          ...DEFAULT_WEBSITE_DATA,
          ...parsed,
          siteConfig: { ...DEFAULT_WEBSITE_DATA.siteConfig, ...parsed.siteConfig },
        };
        setDraftData(validated);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Data to display on current view (live vs draft preview)
  const activeData = previewMode === 'draft' ? draftData : publishedData;

  return (
    <CMSContext.Provider
      value={{
        // Publicly consumed data
        siteConfig: activeData.siteConfig,
        courses: activeData.courses,
        resources: activeData.resources,
        testimonials: activeData.testimonials,
        quizQuestions: activeData.quizQuestions,
        leads: activeData.leads,
        lastPublishedAt: publishedData.lastPublishedAt,

        // Backoffice draft state
        draftData,
        hasUnpublishedChanges,
        updateDraftConfig,
        updateDraftCourses,
        addDraftCourse,
        updateDraftCourse,
        deleteDraftCourse,
        updateDraftResources,
        addDraftResource,
        updateDraftResource,
        deleteDraftResource,
        updateDraftTestimonials,
        addDraftTestimonial,
        updateDraftTestimonial,
        deleteDraftTestimonial,
        updateDraftQuizQuestions,
        addDraftQuizQuestion,
        updateDraftQuizQuestion,
        deleteDraftQuizQuestion,
        deleteLead,

        // Publishing
        saveAndPublish,
        discardDraft,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        addLead,

        // Navigation
        activeView,
        setActiveView,

        // Backoffice Routing & Auth
        isBackofficeMode,
        isBackofficeAuthenticated,
        loginBackoffice,
        logoutBackoffice,
        enterBackoffice,
        exitBackoffice,
        previewMode,
        setPreviewMode,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
