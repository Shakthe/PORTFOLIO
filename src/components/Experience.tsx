import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Icon } from '@/lib/icons';
import { Emphasis } from '@/lib/richtext';

const Experience = () => {
  const { content } = useContent();
  const meta = content.sections.experience;
  const items = content.experience.items.filter((i) => i.visible);
  const stats = content.experience.stats;

  return (
    <section id="experience" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 animate-fade-in text-center">
          <h2 className="text-4xl font-bold tracking-tight">{meta.title}</h2>
          <div className="accent-rule mx-auto mt-4 w-24"></div>
          {meta.subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">{meta.subtitle}</p>
          )}
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="animate-fade-in border-0 bg-transparent glass glass-hover">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary">
                      <Icon name={item.icon} className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="mb-1 text-2xl font-bold text-foreground">{item.role}</h3>
                        <p className="mb-2 text-xl font-semibold text-primary">{item.company}</p>
                      </div>
                      <div className="flex flex-col text-muted-foreground lg:items-end">
                        {item.period && (
                          <div className="mb-1 flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {item.period}
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {item.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {item.bullets.length > 0 && (
                      <div className="mb-6 space-y-3">
                        {item.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start">
                            <div className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></div>
                            <p className="text-muted-foreground">
                              <Emphasis text={bullet} />
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} className="chip border-0 font-normal">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {stats.length > 0 && (
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="grid gap-5 md:grid-cols-3">
              {stats.map((stat) => (
                <Card
                  key={stat.id}
                  className="animate-fade-in border-0 bg-transparent text-center glass glass-hover"
                >
                  <CardContent className="p-6">
                    <div className="mb-2 text-3xl font-bold text-primary">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
