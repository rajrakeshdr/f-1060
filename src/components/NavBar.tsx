import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import Button from './Button';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="py-4 bg-transparent">
      <div className="container mx-auto flex items-center justify-end px-4">
        {/* Removed visible logo and navigation items to match the provided image */}
        
        {/* Mobile Toggle - hidden in this version to match the design */}
        <button
          className="hidden md:hidden p-2 focus:outline-none text-white"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - hidden in this version */}
      <div className={cn(
        'fixed inset-0 z-40 bg-[#1a1c2e] transition-transform duration-300 ease-in-out transform md:hidden pt-20',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Mobile navigation content hidden to match the design */}
      </div>
    </nav>
  );
};

export default NavBar;
