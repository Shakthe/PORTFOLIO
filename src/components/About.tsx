import { Card, CardContent } from '@/components/ui/card';
import { Cpu } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Icon } from '@/lib/icons';

const About = () => {
  const { content } = useContent();
  const { about } = content;
  const meta = content.sections.about;

  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 animate-fade-in text-center">
          <h2 className="text-4xl font-bold tracking-tight">{meta.title}</h2>
          <div className="accent-rule mx-auto mt-4 w-24"></div>
          {meta.subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {meta.subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {about.highlights.map((item, index) => (
            <Card
              key={item.id}
              className={`animate-fade-in border-0 bg-transparent glass glass-hover ${
                item.highlight ? 'ring-1 ring-primary/40' : ''
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.highlight ? 'bg-gradient-primary text-primary-foreground' : 'chip'
                  }`}
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-2 font-medium text-primary">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-left">
            <h3 className="mb-6 text-2xl font-bold tracking-tight">{about.journeyTitle}</h3>
            <div className="space-y-4">
              {about.journey.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-right">
            <Card className="border-0 bg-transparent glass">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center">
                  <Cpu className="mr-3 h-7 w-7 text-primary" />
                  <h3 className="text-xl font-semibold">{about.interestsTitle}</h3>
                </div>
                <ul className="space-y-3">
                  {about.interests.map((interest) => (
                    <li key={interest} className="flex items-center text-foreground/90">
                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-primary"></div>
                      {interest}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
