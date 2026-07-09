import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Linkedin, ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const { hero } = content;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const viewCV = () => {
    if (hero.cvUrl) window.open(hero.cvUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Profile Image */}
          <div className="flex animate-fade-in-left justify-center lg:order-last lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-primary opacity-25 blur-3xl"></div>
              <div className="relative rounded-full p-[2px] glass">
                <img
                  src="23110329.jpg"
                  alt={hero.name}
                  className="h-72 w-72 rounded-full object-cover smooth-transition hover:scale-[1.03] sm:h-80 sm:w-80"
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="animate-fade-in-right text-center lg:text-left">
            <div className="space-y-6">
              <div>
                <h1 className="mb-3 text-5xl font-extrabold tracking-tight lg:text-6xl">
                  {hero.greeting}{' '}
                  <span className="text-gradient">{hero.name}</span>
                </h1>
                <p className="mb-2 text-xl text-foreground/90 lg:text-2xl">{hero.role}</p>
                <p className="text-base text-muted-foreground lg:text-lg">{hero.tagline}</p>
              </div>

              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {hero.bio}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="hero-gradient font-semibold text-primary-foreground smooth-transition hover:scale-[1.03] elegant-shadow"
                >
                  Hire Me
                </Button>
                {hero.cvUrl && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={viewCV}
                    className="border-border bg-transparent smooth-transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    View CV
                    <ArrowUpRight className="ml-1.5 h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 lg:justify-start">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="border-border bg-transparent smooth-transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <a href="https://github.com/Shakthe" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="border-border bg-transparent smooth-transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <a href="https://leetcode.com/u/shakthe/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="border-border bg-transparent smooth-transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <a href="https://www.linkedin.com/in/shakthevell-m-39301329a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
