import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wrench } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Icon } from '@/lib/icons';
import { Emphasis } from '@/lib/richtext';

const Skills = () => {
  const { content } = useContent();
  const { skills } = content;
  const meta = content.sections.skills;

  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 animate-fade-in text-center">
          <h2 className="text-4xl font-bold tracking-tight">{meta.title}</h2>
          <div className="accent-rule mx-auto mt-4 w-24"></div>
          {meta.subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">{meta.subtitle}</p>
          )}
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          {skills.categories.map((category, categoryIndex) => (
            <Card
              key={category.id}
              className="animate-fade-in border-0 bg-transparent glass glass-hover"
              style={{ animationDelay: `${categoryIndex * 0.08}s` }}
            >
              <CardContent className="p-6">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                    <Icon name={category.icon} className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5 bg-white/[0.06]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="animate-fade-in border-0 bg-transparent glass">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center">
                <Wrench className="mr-3 h-7 w-7 text-primary" />
                <h3 className="text-2xl font-semibold">{skills.expertiseTitle}</h3>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {skills.expertise.map((item, index) => (
                  <Badge
                    key={index}
                    className="chip justify-center border-0 p-3 text-center font-normal smooth-transition hover:bg-primary hover:text-primary-foreground"
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              {skills.note && (
                <div className="mt-8 rounded-xl border border-border bg-white/[0.02] p-6">
                  {skills.noteTitle && (
                    <h4 className="mb-3 text-center font-semibold">{skills.noteTitle}</h4>
                  )}
                  <p className="text-center text-muted-foreground">
                    <Emphasis text={skills.note} />
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
