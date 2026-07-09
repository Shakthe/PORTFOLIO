import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Award, Calendar, ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { Project, ProjectLink } from '@/types/content';

const LinkButton = ({ link }: { link: ProjectLink }) => {
  const isGithub = /github/i.test(link.url) || /github/i.test(link.label);
  const Icon = isGithub ? Github : ExternalLink;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground smooth-transition hover:border-primary/50 hover:text-primary"
    >
      <Icon className="h-3.5 w-3.5" />
      {link.label || (isGithub ? 'Code' : 'Live')}
    </a>
  );
};

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => (
  <Card
    className="group animate-fade-in border-0 bg-transparent glass glass-hover"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <CardHeader>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {project.icon && <div className="text-3xl">{project.icon}</div>}
          <div>
            <CardTitle className="text-xl smooth-transition group-hover:text-primary">
              {project.title}
            </CardTitle>
            {project.subtitle && (
              <p className="mt-0.5 text-sm font-medium text-primary/90">{project.subtitle}</p>
            )}
          </div>
        </div>
        <Badge variant="outline" className="shrink-0 border-primary/40 text-primary">
          {project.type}
        </Badge>
      </div>
      {project.period && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {project.period}
        </div>
      )}
    </CardHeader>

    <CardContent className="space-y-6">
      <p className="leading-relaxed text-muted-foreground">{project.description}</p>

      {project.achievements.length > 0 && (
        <div>
          <h4 className="mb-3 flex items-center font-semibold">
            <Award className="mr-2 h-4 w-4 text-primary" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start text-sm text-muted-foreground">
                <div className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></div>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {project.stats.map((stat, i) => (
            <div key={i} className="rounded-xl border border-border bg-white/[0.02] p-3 text-center">
              <div className="text-lg font-bold text-primary">{stat.value}</div>
              <div className="text-xs capitalize text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {project.technologies.length > 0 && (
        <div>
          <h4 className="mb-3 font-semibold">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} className="chip border-0 font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {project.links.map((link, i) => (
            <LinkButton key={i} link={link} />
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const CompactCard = ({ project }: { project: Project }) => (
  <Card className="group animate-fade-in border-0 bg-transparent glass glass-hover">
    <CardContent className="p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.icon && <span className="text-xl">{project.icon}</span>}
          <h3 className="text-lg font-semibold smooth-transition group-hover:text-primary">
            {project.title}
          </h3>
        </div>
        <Badge variant="outline" className="shrink-0 border-primary/40 text-xs text-primary">
          {project.type}
        </Badge>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} className="chip border-0 text-xs font-normal">
            {tech}
          </Badge>
        ))}
      </div>
      {project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link, i) => (
            <LinkButton key={i} link={link} />
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const Projects = () => {
  const { content } = useContent();
  const [showMore, setShowMore] = useState(false);
  const meta = content.sections.projects;

  const visible = content.projects.filter((p) => p.visible);
  const featured = visible.filter((p) => p.featured);
  const additional = visible.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 animate-fade-in text-center">
          <h2 className="text-4xl font-bold tracking-tight">{meta.title}</h2>
          <div className="accent-rule mx-auto mt-4 w-24"></div>
          {meta.subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">{meta.subtitle}</p>
          )}
        </div>

        {featured.length > 0 && (
          <div className="mb-12 grid gap-6 lg:grid-cols-2">
            {featured.map((project, index) => (
              <FeaturedCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {additional.length > 0 && (
          <>
            <div className="mb-8 text-center">
              <Button
                onClick={() => setShowMore(!showMore)}
                variant="outline"
                className="border-border bg-transparent smooth-transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                {showMore ? 'Show Less' : `Show More Projects (${additional.length})`}
                <ArrowUpRight
                  className={`ml-1.5 h-4 w-4 smooth-transition ${showMore ? 'rotate-90' : ''}`}
                />
              </Button>
            </div>

            {showMore && (
              <div className="grid animate-fade-in gap-5 md:grid-cols-2">
                {additional.map((project) => (
                  <CompactCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
