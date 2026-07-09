import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import {
  Lock,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  Download,
  RotateCcw,
  LogOut,
  Eye,
  EyeOff,
  UploadCloud,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type {
  SiteContent,
  Project,
  ExperienceItem,
  AboutHighlight,
  SkillCategory,
  StatItem,
  ContactInfo,
  ContactSocial,
} from '@/types/content';
import { ICON_NAMES } from '@/lib/icons';

// Client-side gate only — hides the editor UI. Real publish protection is the
// server-side ADMIN_PASSWORD check in api/publish.js.
const ADMIN_PASSWORD = '131105';
const SESSION_KEY = 'portfolio:admin';

const uid = (prefix = 'id') => `${prefix}-${crypto.randomUUID?.() ?? Date.now().toString(36)}`;

// shared list helpers (operate on the mutate draft) --------------------------
function moveInArray<T>(arr: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// factories ------------------------------------------------------------------
const newProject = (): Project => ({
  id: uid('proj'),
  title: 'New Project',
  subtitle: '',
  period: '',
  description: 'Describe what this project does and the impact it had.',
  achievements: [],
  technologies: [],
  type: 'Web Development',
  icon: '🚀',
  featured: true,
  visible: true,
  stats: [],
  links: [],
});

const newExperience = (): ExperienceItem => ({
  id: uid('exp'),
  role: 'New Role',
  company: 'Company Name',
  period: '',
  location: '',
  icon: 'briefcase',
  bullets: [],
  technologies: [],
  visible: true,
});

const newHighlight = (): AboutHighlight => ({
  id: uid('hl'),
  icon: 'star',
  title: 'New Highlight',
  subtitle: '',
  description: '',
  highlight: false,
});

const newCategory = (): SkillCategory => ({
  id: uid('cat'),
  title: 'New Category',
  icon: 'code',
  skills: [],
});

const newStat = (): StatItem => ({ id: uid('stat'), value: '', label: '' });
const newInfo = (): ContactInfo => ({ id: uid('info'), icon: 'link', label: '', value: '', link: '' });
const newSocial = (): ContactSocial => ({ id: uid('soc'), icon: 'link', label: '', username: '', url: '' });

// =========================================================================
const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [pwd, setPwd] = useState('');

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
      toast.success('Welcome back 👋');
    } else {
      toast.error('Wrong password');
    }
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-sm space-y-5 rounded-2xl p-8 glass">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl chip">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Enter your password to edit the site</p>
            </div>
          </div>
          <Input
            type="password"
            inputMode="numeric"
            autoFocus
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            className="text-center"
          />
          <Button type="submit" className="w-full hero-gradient font-semibold text-primary-foreground">
            Unlock
          </Button>
          <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  return (
    <AdminEditor
      onLogout={() => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      }}
    />
  );
};

// =========================================================================
const AdminEditor = ({ onLogout }: { onLogout: () => void }) => {
  const { content, hasDraft, mutate, resetToPublished, exportJson, importJson } = useContent();
  const [publishing, setPublishing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded content.json');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importJson(String(reader.result));
        toast.success('Content imported');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADMIN_PASSWORD, content }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Publish failed (${res.status})`);
      toast.success('Published! Live for everyone in ~30s.', { duration: 6000 });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Publish failed', {
        description: 'If running locally, use Export instead — publishing works on Vercel.',
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Sticky action bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-bold">Site Editor</span>
            {hasDraft ? (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-400">
                Unpublished changes
              </span>
            ) : (
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                All published
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link to="/" target="_blank">
                <Eye className="mr-1.5 h-4 w-4" />
                Preview
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent" onClick={() => fileRef.current?.click()}>
              <Upload className="mr-1.5 h-4 w-4" />
              Import
            </Button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImport} />
            <Button variant="outline" size="sm" className="bg-transparent" onClick={handleExport}>
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
            {hasDraft && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent text-muted-foreground"
                onClick={() => {
                  resetToPublished();
                  toast('Reverted to published version');
                }}
              >
                <RotateCcw className="mr-1.5 h-4 w-4" />
                Discard
              </Button>
            )}
            <Button
              size="sm"
              className="hero-gradient font-semibold text-primary-foreground"
              onClick={handlePublish}
              disabled={publishing}
            >
              <UploadCloud className="mr-1.5 h-4 w-4" />
              {publishing ? 'Publishing…' : 'Publish'}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl space-y-4 px-4 py-8">
        {/* HERO -------------------------------------------------------- */}
        <Section title="Hero" defaultOpen>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Greeting">
              <Input value={content.hero.greeting} onChange={(e) => mutate((d) => void (d.hero.greeting = e.target.value))} />
            </Field>
            <Field label="Name (highlighted)">
              <Input value={content.hero.name} onChange={(e) => mutate((d) => void (d.hero.name = e.target.value))} />
            </Field>
          </div>
          <Field label="Role">
            <Input value={content.hero.role} onChange={(e) => mutate((d) => void (d.hero.role = e.target.value))} />
          </Field>
          <Field label="Tagline">
            <Input value={content.hero.tagline} onChange={(e) => mutate((d) => void (d.hero.tagline = e.target.value))} />
          </Field>
          <Field label="Bio">
            <Textarea rows={3} value={content.hero.bio} onChange={(e) => mutate((d) => void (d.hero.bio = e.target.value))} />
          </Field>
          <Field label="CV / Resume URL">
            <Input value={content.hero.cvUrl} onChange={(e) => mutate((d) => void (d.hero.cvUrl = e.target.value))} />
          </Field>
        </Section>

        {/* SECTION HEADINGS ------------------------------------------- */}
        <Section title="Section headings">
          {(['about', 'experience', 'projects', 'skills', 'contact'] as const).map((key) => (
            <div key={key} className="rounded-xl border border-border p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{key}</p>
              <div className="space-y-2">
                <Input
                  value={content.sections[key].title}
                  placeholder="Title"
                  onChange={(e) => mutate((d) => void (d.sections[key].title = e.target.value))}
                />
                <Input
                  value={content.sections[key].subtitle}
                  placeholder="Subtitle (optional)"
                  onChange={(e) => mutate((d) => void (d.sections[key].subtitle = e.target.value))}
                />
              </div>
            </div>
          ))}
        </Section>

        {/* ABOUT ------------------------------------------------------- */}
        <Section title="About">
          <Field label="Intro paragraph">
            <Textarea rows={3} value={content.about.intro} onChange={(e) => mutate((d) => void (d.about.intro = e.target.value))} />
          </Field>

          <ListHeader
            label="Highlight cards"
            onAdd={() => mutate((d) => void d.about.highlights.push(newHighlight()))}
          />
          {content.about.highlights.map((hl, i) => (
            <ItemCard
              key={hl.id}
              title={hl.title || 'Untitled'}
              subtitle={hl.highlight ? 'emphasised' : ''}
              first={i === 0}
              last={i === content.about.highlights.length - 1}
              onUp={() => mutate((d) => moveInArray(d.about.highlights, i, -1))}
              onDown={() => mutate((d) => moveInArray(d.about.highlights, i, 1))}
              onRemove={() => mutate((d) => void d.about.highlights.splice(i, 1))}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Icon">
                  <IconSelect value={hl.icon} onChange={(v) => mutate((d) => void (d.about.highlights[i].icon = v))} />
                </Field>
                <Field label="Title">
                  <Input value={hl.title} onChange={(e) => mutate((d) => void (d.about.highlights[i].title = e.target.value))} />
                </Field>
              </div>
              <Field label="Subtitle">
                <Input value={hl.subtitle} onChange={(e) => mutate((d) => void (d.about.highlights[i].subtitle = e.target.value))} />
              </Field>
              <Field label="Description">
                <Input value={hl.description} onChange={(e) => mutate((d) => void (d.about.highlights[i].description = e.target.value))} />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={hl.highlight} onCheckedChange={(v) => mutate((d) => void (d.about.highlights[i].highlight = v))} />
                Emphasised (gradient) card
              </label>
            </ItemCard>
          ))}

          <Field label="Journey heading">
            <Input value={content.about.journeyTitle} onChange={(e) => mutate((d) => void (d.about.journeyTitle = e.target.value))} />
          </Field>
          <Field label="Journey paragraphs">
            <StringList
              items={content.about.journey}
              multiline
              onChange={(next) => mutate((d) => void (d.about.journey = next))}
            />
          </Field>
          <Field label="Interests heading">
            <Input value={content.about.interestsTitle} onChange={(e) => mutate((d) => void (d.about.interestsTitle = e.target.value))} />
          </Field>
          <Field label="Core interests">
            <StringList items={content.about.interests} onChange={(next) => mutate((d) => void (d.about.interests = next))} />
          </Field>
        </Section>

        {/* EXPERIENCE -------------------------------------------------- */}
        <Section title={`Experience (${content.experience.items.length})`}>
          <ListHeader
            label="Internships / roles"
            addLabel="Add role (top)"
            onAdd={() => mutate((d) => void d.experience.items.unshift(newExperience()))}
          />
          {content.experience.items.map((exp, i) => (
            <ItemCard
              key={exp.id}
              title={exp.role || 'Untitled'}
              subtitle={`${exp.company}${exp.visible ? '' : ' · hidden'}`}
              first={i === 0}
              last={i === content.experience.items.length - 1}
              onUp={() => mutate((d) => moveInArray(d.experience.items, i, -1))}
              onDown={() => mutate((d) => moveInArray(d.experience.items, i, 1))}
              onRemove={() => {
                if (window.confirm(`Delete "${exp.role} @ ${exp.company}"?`)) {
                  mutate((d) => void d.experience.items.splice(i, 1));
                  toast('Role deleted');
                }
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Role / title">
                  <Input value={exp.role} onChange={(e) => mutate((d) => void (d.experience.items[i].role = e.target.value))} />
                </Field>
                <Field label="Company">
                  <Input value={exp.company} onChange={(e) => mutate((d) => void (d.experience.items[i].company = e.target.value))} />
                </Field>
                <Field label="Period">
                  <Input value={exp.period} placeholder="May 2025 – July 2025" onChange={(e) => mutate((d) => void (d.experience.items[i].period = e.target.value))} />
                </Field>
                <Field label="Location">
                  <Input value={exp.location} placeholder="Chennai, On-Site" onChange={(e) => mutate((d) => void (d.experience.items[i].location = e.target.value))} />
                </Field>
                <Field label="Icon">
                  <IconSelect value={exp.icon} onChange={(v) => mutate((d) => void (d.experience.items[i].icon = v))} />
                </Field>
              </div>
              <Field label="Bullet points (use **text** for bold)">
                <StringList
                  items={exp.bullets}
                  multiline
                  onChange={(next) => mutate((d) => void (d.experience.items[i].bullets = next))}
                />
              </Field>
              <Field label="Technologies">
                <StringList items={exp.technologies} onChange={(next) => mutate((d) => void (d.experience.items[i].technologies = next))} />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={exp.visible} onCheckedChange={(v) => mutate((d) => void (d.experience.items[i].visible = v))} />
                Visible on site
              </label>
            </ItemCard>
          ))}

          <ListHeader label="Highlight stats" onAdd={() => mutate((d) => void d.experience.stats.push(newStat()))} />
          {content.experience.stats.map((stat, i) => (
            <div key={stat.id} className="flex items-center gap-2">
              <Input className="w-24" value={stat.value} placeholder="30%" onChange={(e) => mutate((d) => void (d.experience.stats[i].value = e.target.value))} />
              <Input value={stat.label} placeholder="Workflow Efficiency" onChange={(e) => mutate((d) => void (d.experience.stats[i].label = e.target.value))} />
              <IconTrash onClick={() => mutate((d) => void d.experience.stats.splice(i, 1))} />
            </div>
          ))}
        </Section>

        {/* PROJECTS ---------------------------------------------------- */}
        <Section title={`Projects (${content.projects.length})`} defaultOpen>
          <ListHeader
            label="Projects"
            addLabel="Add project (top)"
            onAdd={() => {
              mutate((d) => void d.projects.unshift(newProject()));
              toast.success("Added — it's at the top");
            }}
          />
          {content.projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              first={index === 0}
              last={index === content.projects.length - 1}
              onChange={(patch) => mutate((d) => void Object.assign(d.projects[index], patch))}
              onUp={() => mutate((d) => moveInArray(d.projects, index, -1))}
              onDown={() => mutate((d) => moveInArray(d.projects, index, 1))}
              onRemove={() => {
                if (window.confirm(`Delete "${project.title}"?`)) {
                  mutate((d) => void d.projects.splice(index, 1));
                  toast('Project deleted');
                }
              }}
            />
          ))}
        </Section>

        {/* SKILLS ------------------------------------------------------ */}
        <Section title="Skills">
          <ListHeader label="Categories" onAdd={() => mutate((d) => void d.skills.categories.push(newCategory()))} />
          {content.skills.categories.map((cat, ci) => (
            <ItemCard
              key={cat.id}
              title={cat.title || 'Untitled'}
              subtitle={`${cat.skills.length} skills`}
              first={ci === 0}
              last={ci === content.skills.categories.length - 1}
              onUp={() => mutate((d) => moveInArray(d.skills.categories, ci, -1))}
              onDown={() => mutate((d) => moveInArray(d.skills.categories, ci, 1))}
              onRemove={() => mutate((d) => void d.skills.categories.splice(ci, 1))}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Category title">
                  <Input value={cat.title} onChange={(e) => mutate((d) => void (d.skills.categories[ci].title = e.target.value))} />
                </Field>
                <Field label="Icon">
                  <IconSelect value={cat.icon} onChange={(v) => mutate((d) => void (d.skills.categories[ci].icon = v))} />
                </Field>
              </div>
              <Field label="Skills (name + level %)">
                <div className="space-y-2">
                  {cat.skills.map((sk, si) => (
                    <div key={si} className="flex items-center gap-2">
                      <Input value={sk.name} placeholder="Skill" onChange={(e) => mutate((d) => void (d.skills.categories[ci].skills[si].name = e.target.value))} />
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        className="w-20"
                        value={sk.level}
                        onChange={(e) => mutate((d) => void (d.skills.categories[ci].skills[si].level = Number(e.target.value)))}
                      />
                      <IconTrash onClick={() => mutate((d) => void d.skills.categories[ci].skills.splice(si, 1))} />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="bg-transparent" onClick={() => mutate((d) => void d.skills.categories[ci].skills.push({ name: '', level: 80 }))}>
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add skill
                  </Button>
                </div>
              </Field>
            </ItemCard>
          ))}

          <Field label="Expertise heading">
            <Input value={content.skills.expertiseTitle} onChange={(e) => mutate((d) => void (d.skills.expertiseTitle = e.target.value))} />
          </Field>
          <Field label="Areas of expertise">
            <StringList items={content.skills.expertise} onChange={(next) => mutate((d) => void (d.skills.expertise = next))} />
          </Field>
          <Field label="Note heading">
            <Input value={content.skills.noteTitle} onChange={(e) => mutate((d) => void (d.skills.noteTitle = e.target.value))} />
          </Field>
          <Field label="Note (use **text** for bold)">
            <Textarea rows={3} value={content.skills.note} onChange={(e) => mutate((d) => void (d.skills.note = e.target.value))} />
          </Field>
        </Section>

        {/* CONTACT ----------------------------------------------------- */}
        <Section title="Contact">
          <Field label="Contact info heading">
            <Input value={content.contact.infoTitle} onChange={(e) => mutate((d) => void (d.contact.infoTitle = e.target.value))} />
          </Field>
          <ListHeader label="Contact details" onAdd={() => mutate((d) => void d.contact.info.push(newInfo()))} />
          {content.contact.info.map((info, i) => (
            <div key={info.id} className="space-y-2 rounded-xl border border-border p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <IconSelect value={info.icon} onChange={(v) => mutate((d) => void (d.contact.info[i].icon = v))} />
                <Input value={info.label} placeholder="Label (e.g. Email)" onChange={(e) => mutate((d) => void (d.contact.info[i].label = e.target.value))} />
              </div>
              <Input value={info.value} placeholder="Value shown" onChange={(e) => mutate((d) => void (d.contact.info[i].value = e.target.value))} />
              <div className="flex items-center gap-2">
                <Input value={info.link} placeholder="Link (mailto:… / tel:… / https://…) — optional" onChange={(e) => mutate((d) => void (d.contact.info[i].link = e.target.value))} />
                <IconTrash onClick={() => mutate((d) => void d.contact.info.splice(i, 1))} />
              </div>
            </div>
          ))}

          <Field label="Social heading">
            <Input value={content.contact.socialTitle} onChange={(e) => mutate((d) => void (d.contact.socialTitle = e.target.value))} />
          </Field>
          <ListHeader label="Social links" onAdd={() => mutate((d) => void d.contact.socials.push(newSocial()))} />
          {content.contact.socials.map((soc, i) => (
            <div key={soc.id} className="space-y-2 rounded-xl border border-border p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <IconSelect value={soc.icon} onChange={(v) => mutate((d) => void (d.contact.socials[i].icon = v))} />
                <Input value={soc.label} placeholder="Label (e.g. GitHub)" onChange={(e) => mutate((d) => void (d.contact.socials[i].label = e.target.value))} />
              </div>
              <Input value={soc.username} placeholder="Handle (e.g. @shakthe)" onChange={(e) => mutate((d) => void (d.contact.socials[i].username = e.target.value))} />
              <div className="flex items-center gap-2">
                <Input value={soc.url} placeholder="https://…" onChange={(e) => mutate((d) => void (d.contact.socials[i].url = e.target.value))} />
                <IconTrash onClick={() => mutate((d) => void d.contact.socials.splice(i, 1))} />
              </div>
            </div>
          ))}
        </Section>

        {/* FOOTER ------------------------------------------------------ */}
        <Section title="Footer">
          <Field label="Footer tagline">
            <Input value={content.footer.tagline} onChange={(e) => mutate((d) => void (d.footer.tagline = e.target.value))} />
          </Field>
        </Section>
      </div>
    </div>
  );
};

// ===== reusable building blocks ==========================================
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const Section = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-2xl glass">
      <button className="flex w-full items-center justify-between p-5" onClick={() => setOpen((o) => !o)}>
        <h2 className="text-lg font-bold">{title}</h2>
        <ChevronRight className={`h-5 w-5 text-muted-foreground smooth-transition ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div className="space-y-4 border-t border-border p-5">{children}</div>}
    </section>
  );
};

const ListHeader = ({ label, onAdd, addLabel = 'Add' }: { label: string; onAdd: () => void; addLabel?: string }) => (
  <div className="flex items-center justify-between pt-2">
    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
    <Button size="sm" className="hero-gradient font-semibold text-primary-foreground" onClick={onAdd}>
      <Plus className="mr-1 h-3.5 w-3.5" />
      {addLabel}
    </Button>
  </div>
);

const IconTrash = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="shrink-0 text-muted-foreground hover:text-destructive" aria-label="Delete">
    <Trash2 className="h-4 w-4" />
  </button>
);

const IconSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
  >
    {ICON_NAMES.map((name) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </select>
);

const ItemCard = ({
  title,
  subtitle,
  first,
  last,
  onUp,
  onDown,
  onRemove,
  children,
}: {
  title: string;
  subtitle?: string;
  first: boolean;
  last: boolean;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-0 bg-transparent glass">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <button disabled={first} onClick={onUp} className="text-muted-foreground disabled:opacity-30 hover:text-primary" aria-label="Move up">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button disabled={last} onClick={onDown} className="text-muted-foreground disabled:opacity-30 hover:text-primary" aria-label="Move down">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button className="flex-1 text-left" onClick={() => setOpen((o) => !o)}>
            <div className="font-semibold">{title}</div>
            {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
          </button>
          <IconTrash onClick={onRemove} />
        </div>
        {open && <div className="mt-4 space-y-4 border-t border-border pt-4">{children}</div>}
      </CardContent>
    </Card>
  );
};

const StringList = ({
  items,
  onChange,
  placeholder,
  multiline = false,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) => {
  const set = (i: number, v: string) => {
    const n = [...items];
    n[i] = v;
    onChange(n);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const n = [...items];
    [n[i], n[j]] = [n[j], n[i]];
    onChange(n);
  };
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline ? (
            <Textarea rows={2} value={it} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} />
          ) : (
            <Input value={it} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} />
          )}
          <div className="flex flex-col pt-1">
            <button disabled={i === 0} onClick={() => move(i, -1)} className="text-muted-foreground disabled:opacity-30 hover:text-primary">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button disabled={i === items.length - 1} onClick={() => move(i, 1)} className="text-muted-foreground disabled:opacity-30 hover:text-primary">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button onClick={() => onChange(items.filter((_, x) => x !== i))} className="pt-1.5 text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="bg-transparent" onClick={() => onChange([...items, ''])}>
        <Plus className="mr-1 h-3.5 w-3.5" />
        Add
      </Button>
    </div>
  );
};

// ---- project row (detailed editor) --------------------------------------
const csvToArray = (s: string) => s.split(',').map((l) => l.trim()).filter(Boolean);
const arrayToCsv = (a: string[]) => a.join(', ');
const linesToArray = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const arrayToLines = (a: string[]) => a.join('\n');

const ProjectRow = ({
  project,
  first,
  last,
  onChange,
  onUp,
  onDown,
  onRemove,
}: {
  project: Project;
  first: boolean;
  last: boolean;
  onChange: (patch: Partial<Project>) => void;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className={`border-0 bg-transparent glass ${!project.visible ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <button disabled={first} onClick={onUp} className="text-muted-foreground disabled:opacity-30 hover:text-primary" aria-label="Move up">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button disabled={last} onClick={onDown} className="text-muted-foreground disabled:opacity-30 hover:text-primary" aria-label="Move down">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <span className="text-2xl">{project.icon}</span>
          <button className="flex-1 text-left" onClick={() => setOpen((o) => !o)}>
            <div className="font-semibold">{project.title || 'Untitled'}</div>
            <div className="text-xs text-muted-foreground">
              {project.type}
              {project.featured ? ' · featured' : ''}
              {!project.visible ? ' · hidden' : ''}
            </div>
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => onChange({ featured: !project.featured })} title="Toggle featured" className={project.featured ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
              <Star className="h-4 w-4" fill={project.featured ? 'currentColor' : 'none'} />
            </button>
            <button onClick={() => onChange({ visible: !project.visible })} title="Toggle visible" className="text-muted-foreground hover:text-foreground">
              {project.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <IconTrash onClick={onRemove} />
          </div>
        </div>

        {open && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <Input value={project.title} onChange={(e) => onChange({ title: e.target.value })} />
              </Field>
              <Field label="Icon (emoji)">
                <Input value={project.icon ?? ''} onChange={(e) => onChange({ icon: e.target.value })} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Type / category">
                <Input value={project.type} onChange={(e) => onChange({ type: e.target.value })} />
              </Field>
              <Field label="Period">
                <Input value={project.period ?? ''} onChange={(e) => onChange({ period: e.target.value })} />
              </Field>
            </div>
            <Field label="Subtitle">
              <Input value={project.subtitle ?? ''} onChange={(e) => onChange({ subtitle: e.target.value })} />
            </Field>
            <Field label="Description">
              <Textarea rows={3} value={project.description} onChange={(e) => onChange({ description: e.target.value })} />
            </Field>
            <Field label="Technologies (comma separated)">
              <Input value={arrayToCsv(project.technologies)} onChange={(e) => onChange({ technologies: csvToArray(e.target.value) })} />
            </Field>
            <Field label="Achievements (one per line)">
              <Textarea rows={4} value={arrayToLines(project.achievements)} onChange={(e) => onChange({ achievements: linesToArray(e.target.value) })} />
            </Field>
            <Field label="Stats — one per line as label: value">
              <Textarea
                rows={2}
                value={project.stats.map((s) => `${s.label}: ${s.value}`).join('\n')}
                onChange={(e) =>
                  onChange({
                    stats: linesToArray(e.target.value)
                      .map((line) => {
                        const [label, ...rest] = line.split(':');
                        return { label: label.trim(), value: rest.join(':').trim() };
                      })
                      .filter((s) => s.label && s.value),
                  })
                }
              />
            </Field>
            <Field label="Links — one per line as label | url">
              <Textarea
                rows={2}
                value={project.links.map((l) => `${l.label} | ${l.url}`).join('\n')}
                onChange={(e) =>
                  onChange({
                    links: linesToArray(e.target.value)
                      .map((line) => {
                        const [label, ...rest] = line.split('|');
                        return { label: label.trim(), url: rest.join('|').trim() };
                      })
                      .filter((l) => l.url),
                  })
                }
              />
            </Field>
            <div className="flex flex-wrap gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={project.featured} onCheckedChange={(v) => onChange({ featured: v })} />
                Featured (large card)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={project.visible} onCheckedChange={(v) => onChange({ visible: v })} />
                Visible on site
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Admin;
