import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import publishedContent from '@/data/content.json';
import type { SiteContent } from '@/types/content';

const DRAFT_KEY = 'portfolio:draft';

// The committed content.json is the source of truth served to every visitor.
const PUBLISHED = publishedContent as unknown as SiteContent;

interface ContentContextValue {
  content: SiteContent;
  /** true when the local draft differs from the published content.json */
  hasDraft: boolean;
  /** apply an immutable edit: mutate a draft clone in the recipe */
  mutate: (recipe: (draft: SiteContent) => void) => void;
  setContent: (next: SiteContent) => void;
  resetToPublished: () => void;
  exportJson: () => string;
  importJson: (raw: string) => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isValid(c: unknown): c is SiteContent {
  const v = c as Partial<SiteContent> | null;
  return !!(
    v &&
    v.hero &&
    v.about &&
    v.experience &&
    Array.isArray(v.projects) &&
    v.skills &&
    v.contact
  );
}

function loadInitial(): SiteContent {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValid(parsed)) return parsed;
    }
  } catch {
    /* ignore corrupt drafts and fall back to published */
  }
  return deepClone(PUBLISHED);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() => deepClone(PUBLISHED));

  // Hydrate the draft after mount so first paint always matches published.
  useEffect(() => {
    setContentState(loadInitial());
  }, []);

  const hasDraft = useMemo(
    () => JSON.stringify(content) !== JSON.stringify(PUBLISHED),
    [content],
  );

  // Persist any divergence from published; clear the key when back in sync.
  useEffect(() => {
    try {
      if (JSON.stringify(content) === JSON.stringify(PUBLISHED)) {
        localStorage.removeItem(DRAFT_KEY);
      } else {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
      }
    } catch {
      /* storage may be unavailable (private mode); edits stay in memory */
    }
  }, [content]);

  const mutate: ContentContextValue['mutate'] = (recipe) =>
    setContentState((c) => {
      const draft = deepClone(c);
      recipe(draft);
      return draft;
    });

  const setContent = (next: SiteContent) => setContentState(deepClone(next));

  const resetToPublished = () => setContentState(deepClone(PUBLISHED));

  const exportJson = () => JSON.stringify(content, null, 2);

  const importJson: ContentContextValue['importJson'] = (raw) => {
    const parsed = JSON.parse(raw);
    if (!isValid(parsed)) {
      throw new Error('Invalid content file: missing one of hero, about, experience, projects, skills, contact.');
    }
    setContentState(parsed);
  };

  const value: ContentContextValue = {
    content,
    hasDraft,
    mutate,
    setContent,
    resetToPublished,
    exportJson,
    importJson,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}
