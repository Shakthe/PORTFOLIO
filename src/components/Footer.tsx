import { Github, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Shakthevell M</p>
            <p className="text-sm opacity-80">Computer Science Undergraduate | IoT Enthusiast</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Shakthe" target="_blank" rel="noopener noreferrer" 
               className="hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/shakthevell-m-39301329a/" target="_blank" rel="noopener noreferrer"
               className="hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://leetcode.com/u/shakthe/" target="_blank" rel="noopener noreferrer"
               className="hover:text-primary transition-colors">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-6 pt-6 text-center">
          <p className="text-sm opacity-80">&copy; 2025 Shakthevell M. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;