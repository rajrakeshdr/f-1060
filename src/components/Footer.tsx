
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold tracking-tighter">
              SimilAI
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Intelligent answers powered by AI
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-sm hover:text-primary/80 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm hover:text-primary/80 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm hover:text-primary/80 transition-colors">
                About
              </a>
              <a href="#" className="text-sm hover:text-primary/80 transition-colors">
                Help
              </a>
              <a href="#" className="text-sm hover:text-primary/80 transition-colors">
                Blog
              </a>
            </nav>
            
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} SimilAI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
