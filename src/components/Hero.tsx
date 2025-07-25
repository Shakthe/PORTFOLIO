import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Download, Linkedin } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const viewCV = () => {
    window.open('https://drive.google.com/file/d/1pTpv1LKwZC6B4LZAG6ij4jQElVYbb_20/view?usp=sharing', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
              <img
                src="23110329.jpg"
                alt="Shakthevell M"
                className="relative w-80 h-80 object-cover rounded-full border-4 border-primary/20 card-shadow hover:scale-105 smooth-transition"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-in-right">
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  Hi, I'm{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Shakthevell
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground mb-2">
                  Computer Science Undergraduate
                </p>
                <p className="text-lg text-muted-foreground">
                  IoT Enthusiast | Full-Stack Developer | Competitive Programmer
                </p>
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl">
                Passionate about building intelligent hardware and scalable software solutions. 
                Currently pursuing B.Tech in Computer Science (IoT) at Shiv Nadar University with an 8.1 GPA.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  className="hero-gradient hover:scale-105 smooth-transition elegant-shadow"
                >
                  Hire Me
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={viewCV}
                  className="hover:bg-primary hover:text-primary-foreground smooth-transition"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View CV
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground smooth-transition">
                  <a href="https://github.com/Shakthe" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground smooth-transition">
                  <a href="https://leetcode.com/u/shakthe/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground smooth-transition">
                  <a href="https://www.linkedin.com/in/shakthevell-m-39301329a/" target="_blank" rel="noopener noreferrer">
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