import {
  GraduationCap,
  Award,
  Code,
  Cpu,
  Database,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Building,
  Star,
  Rocket,
  Globe,
  Briefcase,
  Trophy,
  BookOpen,
  Terminal,
  Server,
  Cloud,
  PenTool,
  LucideIcon,
} from 'lucide-react';

// Registry of icons that can be referenced by name from content.json.
// Add a line here to make a new icon selectable in the admin panel.
export const ICONS: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  award: Award,
  trophy: Trophy,
  code: Code,
  terminal: Terminal,
  cpu: Cpu,
  database: Database,
  server: Server,
  cloud: Cloud,
  wrench: Wrench,
  pen: PenTool,
  book: BookOpen,
  mail: Mail,
  phone: Phone,
  map: MapPin,
  github: Github,
  linkedin: Linkedin,
  link: ExternalLink,
  building: Building,
  briefcase: Briefcase,
  rocket: Rocket,
  globe: Globe,
  star: Star,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Code;
  return <Cmp className={className} />;
}
