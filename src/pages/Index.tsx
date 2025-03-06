
import React, { useEffect, useRef } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SearchSection from '@/components/SearchSection';
import SampleQueries from '@/components/SampleQueries';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Index = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateGrid = () => {
      if (!gridRef.current) return;
      
      const gridCells = Array.from(gridRef.current.children);
      const totalCells = gridCells.length;
      const rows = 30;
      const cols = 12;
      
      // Clear any existing highlights
      gridCells.forEach(cell => {
        cell.classList.remove('bg-white/20', 'transition-colors');
        cell.classList.add('transition-colors', 'duration-1000');
      });
      
      // Start highlighting from bottom right
      const startAnimation = () => {
        let currentIndex = 0;
        
        const highlightInterval = setInterval(() => {
          if (currentIndex >= totalCells) {
            clearInterval(highlightInterval);
            
            // Reset after some time
            setTimeout(() => {
              gridCells.forEach(cell => {
                cell.classList.remove('bg-white/20');
              });
              
              // Restart animation after a delay
              setTimeout(startAnimation, 5000);
            }, 3000);
            
            return;
          }
          
          // Calculate positions to create a diagonal-like wave from bottom right to top left
          for (let i = 0; i < 15; i++) {
            const cellToHighlight = totalCells - 1 - (currentIndex + i * cols);
            if (cellToHighlight >= 0 && cellToHighlight < totalCells) {
              const cell = gridCells[cellToHighlight];
              cell.classList.add('bg-white/20');
              
              // Remove highlight after some time
              setTimeout(() => {
                cell.classList.remove('bg-white/20');
              }, 3000);
            }
          }
          
          currentIndex += 15;
        }, 100);
      };
      
      startAnimation();
    };
    
    // Start the animation
    animateGrid();
    
    // Clean up
    return () => {
      if (gridRef.current) {
        const gridCells = Array.from(gridRef.current.children);
        gridCells.forEach(cell => {
          cell.classList.remove('bg-white/20', 'transition-colors');
        });
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-[#1a1c2e] text-white relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div ref={gridRef} className="w-full h-full grid grid-cols-12 grid-rows-[repeat(30,1fr)]">
          {Array.from({ length: 12 * 30 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-gray-500/20 transition-colors duration-1000"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavBar />
          <div className="flex-1 overflow-auto">
            <Hero />
            <SearchSection />
            <SampleQueries />
            <Footer />
          </div>
        </div>
        
        {/* Collapsible Panel */}
        <CollapsiblePanel>
          <h3 className="text-lg font-medium mb-4">Resources</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Documentation</h4>
              <p className="text-sm text-gray-400">Access guides and API references</p>
            </div>
            <div className="p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Examples</h4>
              <p className="text-sm text-gray-400">See code samples and demos</p>
            </div>
            <div className="p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Community</h4>
              <p className="text-sm text-gray-400">Join forums and discussions</p>
            </div>
          </div>
        </CollapsiblePanel>
      </div>
      
      {/* Sign In Button - Fixed to bottom left */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={cn(
                "fixed left-6 bottom-6 z-20",
                "flex items-center justify-center p-3",
                "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700",
                "text-white rounded-full shadow-lg",
                "border border-gray-700/50 transition-all duration-200",
                "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label="Sign In"
            >
              <UserRound size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sign In</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Index;
