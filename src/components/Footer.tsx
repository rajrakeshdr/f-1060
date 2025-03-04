
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="#" className="text-xl font-semibold tracking-tighter">
              Simplicity
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Designed with purpose, built with precision.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex space-x-6">
              <a href="#home" className="text-sm hover:text-primary/80 transition-colors">
                Home
              </a>
              <a href="#features" className="text-sm hover:text-primary/80 transition-colors">
                Features
              </a>
              <a href="#about" className="text-sm hover:text-primary/80 transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm hover:text-primary/80 transition-colors">
                Contact
              </a>
            </nav>
            
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} Simplicity. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
