// Shape of all editable site content.
// The source of truth lives in src/data/content.json (committed to the repo).
// The admin panel edits an in-browser draft and can publish a new content.json.

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: string;
  icon?: string; // emoji
  featured: boolean; // true = large hero card, false = compact card
  visible: boolean; // false = hidden from the public site
  stats: ProjectStat[];
  links: ProjectLink[];
}

export interface HeroContent {
  greeting: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  cvUrl: string;
}

export interface AboutHighlight {
  id: string;
  icon: string; // icon-registry key
  title: string;
  subtitle: string;
  description: string;
  highlight: boolean; // emphasised (gradient) card
}

export interface AboutContent {
  intro: string;
  highlights: AboutHighlight[];
  journeyTitle: string;
  journey: string[];
  interestsTitle: string;
  interests: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  icon: string; // icon-registry key
  bullets: string[]; // supports **bold** segments
  technologies: string[];
  visible: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ExperienceContent {
  items: ExperienceItem[];
  stats: StatItem[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // icon-registry key
  skills: Skill[];
}

export interface SkillsContent {
  categories: SkillCategory[];
  expertiseTitle: string;
  expertise: string[];
  noteTitle: string;
  note: string; // supports **bold** segments
}

export interface ContactInfo {
  id: string;
  icon: string; // icon-registry key
  label: string;
  value: string;
  link: string; // may be empty
}

export interface ContactSocial {
  id: string;
  icon: string; // icon-registry key
  label: string;
  username: string;
  url: string;
}

export interface ContactContent {
  infoTitle: string;
  info: ContactInfo[];
  socialTitle: string;
  socials: ContactSocial[];
}

export interface SectionMeta {
  title: string;
  subtitle: string;
}

export interface SiteContent {
  hero: HeroContent;
  sections: {
    about: SectionMeta;
    experience: SectionMeta;
    projects: SectionMeta;
    skills: SectionMeta;
    contact: SectionMeta;
  };
  about: AboutContent;
  experience: ExperienceContent;
  projects: Project[];
  skills: SkillsContent;
  contact: ContactContent;
  footer: {
    tagline: string;
  };
}
